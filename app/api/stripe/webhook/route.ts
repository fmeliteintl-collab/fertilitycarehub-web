import { getRequestContext } from "@cloudflare/next-on-pages";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "edge";

type WebhookEnv = {
  STRIPE_SECRET_KEY?: string;
  STRIPE_WEBHOOK_SECRET?: string;
  SUPABASE_URL?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
  RESEND_API_KEY?: string;
};

type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  portal_access: boolean | null;
};

type SupabaseAuthUser = {
  id: string;
  email?: string;
};

type SupabaseCreateUserResponse = {
  id?: string;
  email?: string;
  user?: SupabaseAuthUser;
};

type PortalAccessStatus =
  | "portal_access_granted_existing_profile"
  | "portal_access_granted_new_profile";

type PortalAccessResult = {
  status: PortalAccessStatus;
  email: string;
  fullName: string | null;
};

function getEnv(): WebhookEnv {
  try {
    const context = getRequestContext();
    return context.env as WebhookEnv;
  } catch {
    return {
      STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
      STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
      RESEND_API_KEY: process.env.RESEND_API_KEY,
    };
  }
}

function getSupabaseHeaders(serviceRoleKey: string): HeadersInit {
  return {
    apikey: serviceRoleKey,
    Authorization: `Bearer ${serviceRoleKey}`,
    "Content-Type": "application/json",
  };
}

function getAuthUserId(payload: SupabaseCreateUserResponse): string | null {
  if (typeof payload.id === "string" && payload.id.length > 0) {
    return payload.id;
  }

  if (typeof payload.user?.id === "string" && payload.user.id.length > 0) {
    return payload.user.id;
  }

  return null;
}

async function createSupabaseAuthUser(params: {
  email: string;
  fullName: string;
  supabaseUrl: string;
  supabaseServiceRoleKey: string;
}): Promise<string> {
  const response = await fetch(`${params.supabaseUrl}/auth/v1/admin/users`, {
    method: "POST",
    headers: getSupabaseHeaders(params.supabaseServiceRoleKey),
    body: JSON.stringify({
      email: params.email,
      email_confirm: true,
      user_metadata: {
        full_name: params.fullName,
        portal_access: true,
        source: "stripe_checkout",
      },
    }),
  });

  const responseText = await response.text();

  if (!response.ok) {
    throw new Error(`Supabase auth user creation failed: ${responseText}`);
  }

  const payload = JSON.parse(responseText) as SupabaseCreateUserResponse;
  const userId = getAuthUserId(payload);

  if (!userId) {
    throw new Error("Supabase auth user creation succeeded but no user id was returned");
  }

  return userId;
}

async function grantPortalAccessByEmail(params: {
  email: string;
  supabaseUrl: string;
  supabaseServiceRoleKey: string;
}): Promise<PortalAccessResult> {
  const normalizedEmail = params.email.trim().toLowerCase();

  if (!normalizedEmail) {
    throw new Error("Customer email is empty");
  }

  const lookupUrl = `${params.supabaseUrl}/rest/v1/profiles?email=eq.${encodeURIComponent(
    normalizedEmail
  )}&select=id,email,full_name,portal_access`;

  const lookupResponse = await fetch(lookupUrl, {
    method: "GET",
    headers: getSupabaseHeaders(params.supabaseServiceRoleKey),
  });

  if (!lookupResponse.ok) {
    const errorText = await lookupResponse.text();
    throw new Error(`Supabase profile lookup failed: ${errorText}`);
  }

  const profiles = (await lookupResponse.json()) as Profile[];

  if (profiles.length > 0) {
    const profile = profiles[0];

    const updateUrl = `${params.supabaseUrl}/rest/v1/profiles?email=eq.${encodeURIComponent(
      normalizedEmail
    )}`;

    const updateResponse = await fetch(updateUrl, {
      method: "PATCH",
      headers: {
        ...getSupabaseHeaders(params.supabaseServiceRoleKey),
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

    return {
      status: "portal_access_granted_existing_profile",
      email: normalizedEmail,
      fullName: profile.full_name,
    };
  }

  const fallbackFullName = normalizedEmail.split("@")[0];
  const authUserId = await createSupabaseAuthUser({
    email: normalizedEmail,
    fullName: fallbackFullName,
    supabaseUrl: params.supabaseUrl,
    supabaseServiceRoleKey: params.supabaseServiceRoleKey,
  });

  const insertResponse = await fetch(`${params.supabaseUrl}/rest/v1/profiles`, {
    method: "POST",
    headers: {
      ...getSupabaseHeaders(params.supabaseServiceRoleKey),
      Prefer: "return=representation",
    },
    body: JSON.stringify({
      id: authUserId,
      email: normalizedEmail,
      full_name: fallbackFullName,
      portal_access: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }),
  });

  if (!insertResponse.ok) {
    const errorText = await insertResponse.text();
    throw new Error(`Supabase profile creation failed: ${errorText}`);
  }

  return {
    status: "portal_access_granted_new_profile",
    email: normalizedEmail,
    fullName: fallbackFullName,
  };
}

function getPortalAuthDetails(params: {
  email: string;
  portalAccessStatus: PortalAccessStatus;
}) {
  const encodedEmail = encodeURIComponent(params.email);

  if (params.portalAccessStatus === "portal_access_granted_new_profile") {
    return {
      authUrl: `https://fertilitycarehub.com/auth/login?email=${encodedEmail}`,
      buttonText: "Set Up Your Portal Login",
      instructionText:
        "Your private workspace is unlocked. Please use this same email address to complete your secure portal login setup.",
      secondaryInstructionText:
        "If this is your first time signing in, use the password setup or recovery option on the login page for this email address.",
    };
  }

  return {
    authUrl: `https://fertilitycarehub.com/auth/login?email=${encodedEmail}`,
    buttonText: "Log In to Your Portal",
    instructionText:
      "Your private workspace is unlocked. Please log in using the same email address you used at checkout.",
    secondaryInstructionText:
      "Once signed in, you will be taken to your private planning portal.",
  };
}

async function sendOnboardingEmail(params: {
  email: string;
  fullName: string | null;
  resendApiKey: string;
  portalAccessStatus: PortalAccessStatus;
}): Promise<{ status: "email_sent" | "email_failed"; email: string }> {
  const firstName = params.fullName?.split(" ")[0] ?? "there";

  const authDetails = getPortalAuthDetails({
    email: params.email,
    portalAccessStatus: params.portalAccessStatus,
  });

  const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to FertilityCareHub</title>
</head>
<body style="margin:0;padding:0;background-color:#f8f9fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f8f9fa;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08);">
          <tr>
            <td style="padding:48px 40px 32px;background-color:#0f172a;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:600;letter-spacing:-0.02em;">FertilityCareHub</h1>
              <p style="margin:8px 0 0;color:#94a3b8;font-size:14px;">Your private fertility planning portal</p>
            </td>
          </tr>
          <tr>
            <td style="padding:40px;">
              <h2 style="margin:0 0 16px;color:#0f172a;font-size:20px;font-weight:600;">Welcome, ${firstName}</h2>

              <p style="margin:0 0 20px;color:#475569;font-size:15px;line-height:1.6;">Your payment has been confirmed and your private portal access has been unlocked.</p>

              <p style="margin:0 0 20px;color:#475569;font-size:15px;line-height:1.6;">${authDetails.instructionText}</p>
              
              <div style="background-color:#f1f5f9;border-radius:8px;padding:20px;margin:0 0 24px;">
                <p style="margin:0 0 12px;color:#0f172a;font-size:14px;font-weight:600;">What you can do now:</p>
                <ul style="margin:0;padding-left:20px;color:#475569;font-size:14px;line-height:1.8;">
                  <li>Review your personalized planning brief</li>
                  <li>Explore country options and shortlist jurisdictions</li>
                  <li>Track your treatment timeline and milestones</li>
                  <li>Access strategic advisory insights</li>
                  <li>Manage your document vault</li>
                </ul>
              </div>

              <table cellpadding="0" cellspacing="0" border="0" style="margin:0 0 24px;">
                <tr>
                  <td style="border-radius:8px;background-color:#0f172a;">
                    <a href="${authDetails.authUrl}" style="display:inline-block;padding:14px 32px;color:#ffffff;text-decoration:none;font-size:15px;font-weight:500;border-radius:8px;">${authDetails.buttonText}</a>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 16px;color:#475569;font-size:14px;line-height:1.6;">${authDetails.secondaryInstructionText}</p>

              <p style="margin:0 0 16px;color:#475569;font-size:14px;line-height:1.6;">If you have any questions or need guidance at any stage, simply reply to this email. Our team is here to support your journey.</p>
              
              <p style="margin:0;color:#94a3b8;font-size:13px;">This is an automated message from FertilityCareHub. Please do not share this email.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 40px;border-top:1px solid #e2e8f0;text-align:center;">
              <p style="margin:0;color:#94a3b8;font-size:12px;">FertilityCareHub — Private. Strategic. Yours.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${params.resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "FertilityCareHub <onboarding@fertilitycarehub.com>",
        to: params.email,
        subject: "Your FertilityCareHub Portal is Ready",
        html: emailHtml,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Resend email failed:", errorText);
      return { status: "email_failed", email: params.email };
    }

    return { status: "email_sent", email: params.email };
  } catch (err) {
    console.error("Resend email exception:", err);
    return { status: "email_failed", email: params.email };
  }
}

export async function POST(req: Request) {
  const env = getEnv();

  const stripeSecretKey = env.STRIPE_SECRET_KEY;
  const stripeWebhookSecret = env.STRIPE_WEBHOOK_SECRET;
  const supabaseUrl = env.SUPABASE_URL;
  const supabaseServiceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY;
  const resendApiKey = env.RESEND_API_KEY;

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
    return new NextResponse("Missing SUPABASE_SERVICE_ROLE_KEY", { status: 500 });
  }

  if (!resendApiKey) {
    return new NextResponse("Missing RESEND_API_KEY", { status: 500 });
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
    event = await stripe.webhooks.constructEventAsync(body, sig, stripeWebhookSecret);
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

    if (!customerEmail) {
      return NextResponse.json({
        received: true,
        portalAccess: "missing_customer_email",
        emailSent: "skipped",
      });
    }

    try {
      const portalResult = await grantPortalAccessByEmail({
        email: customerEmail,
        supabaseUrl,
        supabaseServiceRoleKey,
      });

      const emailResult = await sendOnboardingEmail({
        email: portalResult.email,
        fullName: portalResult.fullName,
        resendApiKey,
        portalAccessStatus: portalResult.status,
      });

      return NextResponse.json({
        received: true,
        portalAccess: portalResult.status,
        email: portalResult.email,
        emailSent: emailResult.status,
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Portal access automation failed:", err.message);
        return new NextResponse(`Portal Access Error: ${err.message}`, { status: 500 });
      }

      console.error("Portal access automation failed");
      return new NextResponse("Portal Access Error", { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}