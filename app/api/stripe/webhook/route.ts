import { getRequestContext } from "@cloudflare/next-on-pages";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "edge";

type StripeWebhookEnv = {
  STRIPE_SECRET_KEY?: string;
  STRIPE_WEBHOOK_SECRET?: string;
  SUPABASE_URL?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
};

function getStripeEnv(): StripeWebhookEnv {
  try {
    const context = getRequestContext();
    return context.env as StripeWebhookEnv;
  } catch {
    return {
      STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
      STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    };
  }
}

async function grantPortalAccessByEmail(params: {
  email: string;
  supabaseUrl: string;
  supabaseServiceRoleKey: string;
}) {
  const normalizedEmail = params.email.trim().toLowerCase();

  if (!normalizedEmail) {
    throw new Error("Customer email is empty");
  }

  const lookupUrl = `${params.supabaseUrl}/rest/v1/profiles?email=eq.${encodeURIComponent(
    normalizedEmail
  )}&select=id,email,portal_access`;

  const lookupResponse = await fetch(lookupUrl, {
    method: "GET",
    headers: {
      apikey: params.supabaseServiceRoleKey,
      Authorization: `Bearer ${params.supabaseServiceRoleKey}`,
      "Content-Type": "application/json",
    },
  });

  if (!lookupResponse.ok) {
    const errorText = await lookupResponse.text();
    throw new Error(`Supabase profile lookup failed: ${errorText}`);
  }

  const profiles = (await lookupResponse.json()) as Array<{
    id: string;
    email: string;
    portal_access: boolean | null;
  }>;

  if (profiles.length === 0) {
    console.log("No existing profile found for paid email:", normalizedEmail);
    return {
      status: "profile_not_found" as const,
      email: normalizedEmail,
    };
  }

  const updateUrl = `${params.supabaseUrl}/rest/v1/profiles?email=eq.${encodeURIComponent(
    normalizedEmail
  )}`;

  const updateResponse = await fetch(updateUrl, {
    method: "PATCH",
    headers: {
      apikey: params.supabaseServiceRoleKey,
      Authorization: `Bearer ${params.supabaseServiceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify({
      portal_access: true,
      updated_at: new Date().toISOString(),
    }),
  });

  if (!updateResponse.ok) {
    const errorText = await updateResponse.text();
    throw new Error(`Supabase portal access update failed: ${errorText}`);
  }

  console.log("Portal access granted for:", normalizedEmail);

  return {
    status: "portal_access_granted" as const,
    email: normalizedEmail,
  };
}

export async function POST(req: Request) {
  const stripeEnv = getStripeEnv();

  const stripeSecretKey = stripeEnv.STRIPE_SECRET_KEY;
  const stripeWebhookSecret = stripeEnv.STRIPE_WEBHOOK_SECRET;
  const supabaseUrl = stripeEnv.SUPABASE_URL;
  const supabaseServiceRoleKey = stripeEnv.SUPABASE_SERVICE_ROLE_KEY;

  if (!stripeSecretKey) {
    return new NextResponse("Missing STRIPE_SECRET_KEY", { status: 500 });
  }

  if (!stripeWebhookSecret) {
    return new NextResponse("Missing STRIPE_WEBHOOK_SECRET", { status: 500 });
  }

  if (!supabaseUrl) {
    return new NextResponse("Missing SUPABASE_URL", { status: 500 });
  }

  if (!supabaseServiceRoleKey) {
    return new NextResponse("Missing SUPABASE_SERVICE_ROLE_KEY", {
      status: 500,
    });
  }

  const stripe = new Stripe(stripeSecretKey);

  const body = await req.text();
  const headerList = await headers();
  const sig = headerList.get("stripe-signature");

  if (!sig) {
    return new NextResponse("Missing stripe-signature header", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = await stripe.webhooks.constructEventAsync(
      body,
      sig,
      stripeWebhookSecret
    );
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Webhook verification failed:", err.message);
      return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
    }

    return new NextResponse("Webhook Error", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const customerEmail = session.customer_details?.email ?? null;

    console.log("Payment received from:", customerEmail);

    if (!customerEmail) {
      console.log("Checkout session completed without customer email");
      return NextResponse.json({
        received: true,
        portalAccess: "missing_customer_email",
      });
    }

    try {
      const portalAccessResult = await grantPortalAccessByEmail({
        email: customerEmail,
        supabaseUrl,
        supabaseServiceRoleKey,
      });

      return NextResponse.json({
        received: true,
        portalAccess: portalAccessResult.status,
        email: portalAccessResult.email,
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Portal access automation failed:", err.message);
        return new NextResponse(`Portal Access Error: ${err.message}`, {
          status: 500,
        });
      }

      console.error("Portal access automation failed");
      return new NextResponse("Portal Access Error", { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}