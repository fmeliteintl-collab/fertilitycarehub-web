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

type PortalAuthDetails = {
  authUrl: string;
  buttonText: string;
  instructionText: string;
  secondaryInstructionText: string;
  supportText: string;
};

type WebhookEventStatus = "processing" | "completed" | "failed" | "skipped";

type WebhookEventLog = {
  id: string;
  event_type: string;
  email: string | null;
  status: WebhookEventStatus;
  portal_access_result: string | null;
  email_result: string | null;
  error_message: string | null;
  processed_at: string | null;
  created_at: string;
  updated_at: string | null;
};

type WebhookEventUpdate = {
  status: WebhookEventStatus;
  email?: string | null;
  portalAccessResult?: string | null;
  emailResult?: string | null;
  errorMessage?: string | null;
  processedAt?: string | null;
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

function getErrorMessage(err: unknown): string {
  if (err instanceof Error) {
    return err.message;
  }

  return "Unknown error";
}

function createSecurePortalSetupToken(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);

  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function createPortalSetupToken(params: {
  email: string;
  supabaseUrl: string;
  supabaseServiceRoleKey: string;
}): Promise<string> {
  const token = createSecurePortalSetupToken();

  const response = await fetch(`${params.supabaseUrl}/rest/v1/portal_setup_tokens`, {
    method: "POST",
    headers: {
      ...getSupabaseHeaders(params.supabaseServiceRoleKey),
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      email: params.email,
      token,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Portal setup token creation failed: ${errorText}`);
  }

  return token;
}

function getWebhookEventLogUrl(params: {
  supabaseUrl: string;
  eventId: string;
}): string {
  return `${params.supabaseUrl}/rest/v1/stripe_webhook_events?id=eq.${encodeURIComponent(
    params.eventId
  )}&select=id,event_type,email,status,portal_access_result,email_result,error_message,processed_at,created_at,updated_at`;
}

async function getWebhookEventLog(params: {
  eventId: string;
  supabaseUrl: string;
  supabaseServiceRoleKey: string;
}): Promise<WebhookEventLog | null> {
  const response = await fetch(
    getWebhookEventLogUrl({
      supabaseUrl: params.supabaseUrl,
      eventId: params.eventId,
    }),
    {
      method: "GET",
      headers: getSupabaseHeaders(params.supabaseServiceRoleKey),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Stripe webhook event lookup failed: ${errorText}`);
  }

  const rows = (await response.json()) as WebhookEventLog[];

  if (rows.length === 0) {
    return null;
  }

  return rows[0];
}

async function createWebhookEventLog(params: {
  eventId: string;
  eventType: string;
  email: string | null;
  supabaseUrl: string;
  supabaseServiceRoleKey: string;
}): Promise<boolean> {
  const response = await fetch(`${params.supabaseUrl}/rest/v1/stripe_webhook_events`, {
    method: "POST",
    headers: {
      ...getSupabaseHeaders(params.supabaseServiceRoleKey),
      Prefer: "return=representation",
    },
    body: JSON.stringify({
      id: params.eventId,
      event_type: params.eventType,
      email: params.email,
      status: "processing",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }),
  });

  if (response.status === 409) {
    return false;
  }

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Stripe webhook event log creation failed: ${errorText}`);
  }

  return true;
}

async function updateWebhookEventLog(params: {
  eventId: string;
  supabaseUrl: string;
  supabaseServiceRoleKey: string;
  update: WebhookEventUpdate;
}): Promise<void> {
  const now = new Date().toISOString();

  const body: Record<string, string | null> = {
    status: params.update.status,
    updated_at: now,
  };

  if ("email" in params.update) {
    body.email = params.update.email ?? null;
  }

  if ("portalAccessResult" in params.update) {
    body.portal_access_result = params.update.portalAccessResult ?? null;
  }

  if ("emailResult" in params.update) {
    body.email_result = params.update.emailResult ?? null;
  }

  if ("errorMessage" in params.update) {
    body.error_message = params.update.errorMessage ?? null;
  }

  if ("processedAt" in params.update) {
    body.processed_at = params.update.processedAt ?? null;
  }

  const response = await fetch(
    `${params.supabaseUrl}/rest/v1/stripe_webhook_events?id=eq.${encodeURIComponent(
      params.eventId
    )}`,
    {
      method: "PATCH",
      headers: {
        ...getSupabaseHeaders(params.supabaseServiceRoleKey),
        Prefer: "return=minimal",
      },
      body: JSON.stringify(body),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Stripe webhook event log update failed: ${errorText}`);
  }
}

async function logOnboardingEvent(params: {
  email: string | null;
  eventType: string;
  eventSource: string;
  status?: string;
  metadata?: Record<string, unknown>;
  supabaseUrl: string;
  supabaseServiceRoleKey: string;
}): Promise<void> {
  const response = await fetch(`${params.supabaseUrl}/rest/v1/onboarding_events`, {
    method: "POST",
    headers: {
      ...getSupabaseHeaders(params.supabaseServiceRoleKey),
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      email: params.email,
      event_type: params.eventType,
      event_source: params.eventSource,
      status: params.status ?? "completed",
      metadata: params.metadata ?? {},
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Onboarding event logging failed: ${errorText}`);
  }
}

async function prepareWebhookEventProcessing(params: {
  eventId: string;
  eventType: string;
  email: string | null;
  supabaseUrl: string;
  supabaseServiceRoleKey: string;
}): Promise<{
  shouldProcess: boolean;
  reason:
    | "new_event"
    | "retry_failed_event"
    | "already_completed"
    | "already_processing"
    | "already_skipped"
    | "duplicate_insert";
  existingStatus: WebhookEventStatus | null;
}> {
  const existingEvent = await getWebhookEventLog({
    eventId: params.eventId,
    supabaseUrl: params.supabaseUrl,
    supabaseServiceRoleKey: params.supabaseServiceRoleKey,
  });

  if (existingEvent?.status === "completed") {
    return {
      shouldProcess: false,
      reason: "already_completed",
      existingStatus: existingEvent.status,
    };
  }

  if (existingEvent?.status === "processing") {
    return {
      shouldProcess: false,
      reason: "already_processing",
      existingStatus: existingEvent.status,
    };
  }

  if (existingEvent?.status === "skipped") {
    return {
      shouldProcess: false,
      reason: "already_skipped",
      existingStatus: existingEvent.status,
    };
  }

  if (existingEvent?.status === "failed") {
    await updateWebhookEventLog({
      eventId: params.eventId,
      supabaseUrl: params.supabaseUrl,
      supabaseServiceRoleKey: params.supabaseServiceRoleKey,
      update: {
        status: "processing",
        email: params.email,
        errorMessage: null,
        portalAccessResult: null,
        emailResult: null,
        processedAt: null,
      },
    });

    return {
      shouldProcess: true,
      reason: "retry_failed_event",
      existingStatus: existingEvent.status,
    };
  }

  const created = await createWebhookEventLog({
    eventId: params.eventId,
    eventType: params.eventType,
    email: params.email,
    supabaseUrl: params.supabaseUrl,
    supabaseServiceRoleKey: params.supabaseServiceRoleKey,
  });

  if (!created) {
    return {
      shouldProcess: false,
      reason: "duplicate_insert",
      existingStatus: null,
    };
  }

  return {
    shouldProcess: true,
    reason: "new_event",
    existingStatus: null,
  };
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
  setupToken: string | null;
}): PortalAuthDetails {
  const encodedEmail = encodeURIComponent(params.email);

  if (params.portalAccessStatus === "portal_access_granted_new_profile") {
    const encodedSetupToken = encodeURIComponent(params.setupToken ?? "");

    return {
      authUrl: `https://fertilitycarehub.com/auth/setup?token=${encodedSetupToken}`,
      buttonText: "Set up your portal access",
      instructionText:
        "Your FertilityCareHub planning workspace is now ready.",
      secondaryInstructionText:
        "This is where your fertility strategy, country comparison, and timeline planning will be organized moving forward.",
      supportText:
        "If you already have a password for this email, use the login page instead.",
    };
  }

  return {
    authUrl: `https://fertilitycarehub.com/auth/login?email=${encodedEmail}`,
    buttonText: "Log in to your workspace",
    instructionText:
      "Your FertilityCareHub planning workspace is now ready.",
    secondaryInstructionText:
      "Log in with the same email address you used at checkout to continue your planning.",
    supportText:
      "If you cannot remember your password, use the recovery option on the login page.",
  };
}

async function sendOnboardingEmail(params: {
  email: string;
  fullName: string | null;
  resendApiKey: string;
  portalAccessStatus: PortalAccessStatus;
  supabaseUrl: string;
  supabaseServiceRoleKey: string;
}): Promise<{ status: "email_sent" | "email_failed"; email: string }> {
  const firstName = params.fullName?.split(" ")[0] ?? "";
  const setupToken =
    params.portalAccessStatus === "portal_access_granted_new_profile"
      ? await createPortalSetupToken({
          email: params.email,
          supabaseUrl: params.supabaseUrl,
          supabaseServiceRoleKey: params.supabaseServiceRoleKey,
        })
      : null;

  const authDetails = getPortalAuthDetails({
    email: params.email,
    portalAccessStatus: params.portalAccessStatus,
    setupToken,
  });

  const greeting = firstName ? `Hi ${firstName},` : "Hi,";

  const plainTextBody = `${greeting}

Your FertilityCareHub planning workspace is now ready.

This is where your fertility strategy, country comparison, and timeline planning will be organized moving forward.

To get started, please set up your access here:
${authDetails.authUrl}

If you did not request this, you can safely ignore this email.

— FertilityCareHub`;

  const emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Your FertilityCareHub planning workspace</title>
</head>
<body style="margin:0;padding:0;background-color:#ffffff;font-family:Georgia,'Times New Roman',serif;-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#ffffff;">
    <tr>
      <td align="center" style="padding:48px 24px 32px;">
        <table role="presentation" width="520" cellpadding="0" cellspacing="0" border="0" style="max-width:520px;width:100%;">
          <tr>
            <td style="padding-bottom:32px;border-bottom:1px solid #e5e5e5;">
              <p style="margin:0;color:#1a1a1a;font-size:15px;font-weight:400;letter-spacing:0.02em;font-family:Georgia,serif;">FertilityCareHub</p>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 0 24px;">
              <p style="margin:0 0 20px;color:#1a1a1a;font-size:16px;line-height:1.6;font-family:Georgia,serif;">${greeting}</p>

              <p style="margin:0 0 20px;color:#333333;font-size:15px;line-height:1.7;font-family:Georgia,serif;">Your FertilityCareHub planning workspace is now ready.</p>

              <p style="margin:0 0 28px;color:#333333;font-size:15px;line-height:1.7;font-family:Georgia,serif;">This is where your fertility strategy, country comparison, and timeline planning will be organized moving forward.</p>

              <p style="margin:0 0 12px;color:#333333;font-size:15px;line-height:1.7;font-family:Georgia,serif;">To get started:</p>

              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;">
                <tr>
                  <td style="border-bottom:1px solid #1a1a1a;padding-bottom:2px;">
                    <a href="${authDetails.authUrl}" style="color:#1a1a1a;text-decoration:none;font-size:15px;font-family:Georgia,serif;">${authDetails.buttonText}</a>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 20px;color:#666666;font-size:13px;line-height:1.6;font-family:Georgia,serif;">If the link does not work, copy and paste this into your browser:<br>
              <span style="color:#1a1a1a;word-break:break-all;">${authDetails.authUrl}</span></p>

              <p style="margin:0 0 4px;color:#333333;font-size:15px;line-height:1.7;font-family:Georgia,serif;">${authDetails.secondaryInstructionText}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 0 32px;border-top:1px solid #e5e5e5;">
              <p style="margin:0 0 8px;color:#666666;font-size:13px;line-height:1.6;font-family:Georgia,serif;">If you did not request this, you can safely ignore this email.</p>
              <p style="margin:0;color:#999999;font-size:12px;line-height:1.5;font-family:Georgia,serif;">— FertilityCareHub</p>
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
        subject: "Your FertilityCareHub planning workspace",
        text: plainTextBody,
        html: emailHtml,
        headers: {
          "List-Unsubscribe": "<mailto:onboarding@fertilitycarehub.com?subject=unsubscribe>",
        },
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
    const errorMessage = getErrorMessage(err);
    console.error("Webhook verification failed:", errorMessage);
    return new NextResponse(`Webhook Error: ${errorMessage}`, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({
      received: true,
      ignored: true,
      eventId: event.id,
      eventType: event.type,
    });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const customerEmail = session.customer_details?.email?.trim().toLowerCase() ?? null;

  let processingDecision: Awaited<ReturnType<typeof prepareWebhookEventProcessing>>;

  try {
    processingDecision = await prepareWebhookEventProcessing({
      eventId: event.id,
      eventType: event.type,
      email: customerEmail,
      supabaseUrl,
      supabaseServiceRoleKey,
    });
  } catch (err: unknown) {
    const errorMessage = getErrorMessage(err);
    console.error("Webhook idempotency check failed:", errorMessage);

    return new NextResponse(`Webhook Idempotency Error: ${errorMessage}`, {
      status: 500,
    });
  }

  if (!processingDecision.shouldProcess) {
    return NextResponse.json({
      received: true,
      duplicate: true,
      eventId: event.id,
      eventType: event.type,
      reason: processingDecision.reason,
      existingStatus: processingDecision.existingStatus,
    });
  }

  if (!customerEmail) {
    await updateWebhookEventLog({
      eventId: event.id,
      supabaseUrl,
      supabaseServiceRoleKey,
      update: {
        status: "skipped",
        email: null,
        portalAccessResult: "missing_customer_email",
        emailResult: "skipped",
        errorMessage: null,
        processedAt: new Date().toISOString(),
      },
    });

    await logOnboardingEvent({
      email: null,
      eventType: "webhook_skipped",
      eventSource: "stripe_webhook",
      status: "skipped",
      metadata: {
        stripe_event_id: event.id,
        stripe_session_id: session.id,
        reason: "missing_customer_email",
      },
      supabaseUrl,
      supabaseServiceRoleKey,
    });

    return NextResponse.json({
      received: true,
      eventId: event.id,
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
      supabaseUrl,
      supabaseServiceRoleKey,
    });

    await updateWebhookEventLog({
      eventId: event.id,
      supabaseUrl,
      supabaseServiceRoleKey,
      update: {
        status: "completed",
        email: portalResult.email,
        portalAccessResult: portalResult.status,
        emailResult: emailResult.status,
        errorMessage: null,
        processedAt: new Date().toISOString(),
      },
    });

    await logOnboardingEvent({
      email: portalResult.email,
      eventType: "payment_completed",
      eventSource: "stripe_webhook",
      status: "completed",
      metadata: {
        stripe_event_id: event.id,
        stripe_session_id: session.id,
        portal_access_result: portalResult.status,
      },
      supabaseUrl,
      supabaseServiceRoleKey,
    });

    await logOnboardingEvent({
      email: portalResult.email,
      eventType: "setup_link_sent",
      eventSource: "stripe_webhook",
      status: emailResult.status === "email_sent" ? "completed" : "failed",
      metadata: {
        stripe_event_id: event.id,
        stripe_session_id: session.id,
        email_result: emailResult.status,
        delivery_provider: "resend",
      },
      supabaseUrl,
      supabaseServiceRoleKey,
    });

    return NextResponse.json({
      received: true,
      eventId: event.id,
      portalAccess: portalResult.status,
      email: portalResult.email,
      emailSent: emailResult.status,
    });
  } catch (err: unknown) {
    const errorMessage = getErrorMessage(err);
    console.error("Portal access automation failed:", errorMessage);

    try {
      await updateWebhookEventLog({
        eventId: event.id,
        supabaseUrl,
        supabaseServiceRoleKey,
        update: {
          status: "failed",
          email: customerEmail,
          portalAccessResult: "failed",
          emailResult: "not_sent",
          errorMessage,
          processedAt: new Date().toISOString(),
        },
      });
    } catch (logErr: unknown) {
      console.error("Failed to update failed webhook log:", getErrorMessage(logErr));
    }

    await logOnboardingEvent({
      email: customerEmail,
      eventType: "webhook_failed",
      eventSource: "stripe_webhook",
      status: "failed",
      metadata: {
        stripe_event_id: event.id,
        stripe_session_id: session.id,
        error: errorMessage,
      },
      supabaseUrl,
      supabaseServiceRoleKey,
    });

    return new NextResponse(`Portal Access Error: ${errorMessage}`, {
      status: 500,
    });
  }
}