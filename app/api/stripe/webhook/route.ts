import { getRequestContext } from "@cloudflare/next-on-pages";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "edge";

type StripeWebhookEnv = {
  STRIPE_SECRET_KEY?: string;
  STRIPE_WEBHOOK_SECRET?: string;
};

function getStripeEnv(): StripeWebhookEnv {
  try {
    const context = getRequestContext();
    return context.env as StripeWebhookEnv;
  } catch {
    return {
      STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
      STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    };
  }
}

export async function POST(req: Request) {
  const stripeEnv = getStripeEnv();

  const stripeSecretKey = stripeEnv.STRIPE_SECRET_KEY;
  const stripeWebhookSecret = stripeEnv.STRIPE_WEBHOOK_SECRET;

  // DIAGNOSTIC LOGGING
  console.log("=== WEBHOOK DIAGNOSTICS ===");
  console.log("Secret exists:", !!stripeWebhookSecret);
  console.log("Secret length:", stripeWebhookSecret?.length);
  console.log("Secret starts with whsec_:", stripeWebhookSecret?.startsWith("whsec_"));
  console.log("Secret has whitespace:", /\s/.test(stripeWebhookSecret || ""));
  console.log("Secret first 10 chars:", stripeWebhookSecret?.substring(0, 10));
  console.log("Secret last 10 chars:", stripeWebhookSecret?.substring(stripeWebhookSecret.length - 10));
  console.log("==========================");

  if (!stripeSecretKey) {
    return new NextResponse("Missing STRIPE_SECRET_KEY", { status: 500 });
  }

  if (!stripeWebhookSecret) {
    return new NextResponse("Missing STRIPE_WEBHOOK_SECRET", { status: 500 });
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
      console.log("Webhook verification failed:", err.message);
      return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
    }
    return new NextResponse("Webhook Error", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const customerEmail = session.customer_details?.email ?? null;
    console.log("Payment received from:", customerEmail);
  }

  return NextResponse.json({ received: true });
}