import { getRequestContext } from "@cloudflare/next-on-pages";
import { NextResponse } from "next/server";

export const runtime = "edge";

type ResendSetupEnv = {
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

type RateLimitClaim = {
  allowed: boolean;
  retry_after_seconds: number;
};

type CreatedSetupToken = {
  token: string;
  createdAt: string;
};

const GENERIC_SUCCESS_MESSAGE =
  "If this email is connected to advisory access, a secure setup link will be sent shortly.";

function getEnv(): ResendSetupEnv {
  try {
    const context = getRequestContext();
    return context.env as ResendSetupEnv;
  } catch {
    return {
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

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Unknown error";
}

function createSecurePortalSetupToken(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);

  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function normalizeEmail(email: unknown): string | null {
  if (typeof email !== "string") {
    return null;
  }

  const normalized = email.trim().toLowerCase();

  if (!normalized || !normalized.includes("@")) {
    return null;
  }

  return normalized;
}

async function createRateLimitKey(email: string): Promise<string> {
  const encodedEmail = new TextEncoder().encode(email);
  const digest = await crypto.subtle.digest("SHA-256", encodedEmail);

  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
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
  try {
    const response = await fetch(
      `${params.supabaseUrl}/rest/v1/onboarding_events`,
      {
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
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Onboarding event logging failed: ${errorText}`);
    }
  } catch (error: unknown) {
    console.error(
      "Onboarding event logging exception:",
      getErrorMessage(error)
    );
  }
}

async function claimResendRateLimit(params: {
  rateKey: string;
  supabaseUrl: string;
  supabaseServiceRoleKey: string;
}): Promise<RateLimitClaim> {
  const response = await fetch(
    `${params.supabaseUrl}/rest/v1/rpc/claim_portal_setup_resend`,
    {
      method: "POST",
      headers: getSupabaseHeaders(params.supabaseServiceRoleKey),
      body: JSON.stringify({
        p_rate_key: params.rateKey,
        p_window_seconds: 900,
        p_max_requests: 3,
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Resend rate-limit claim failed: ${errorText}`);
  }

  const rows = (await response.json()) as RateLimitClaim[];

  if (rows.length !== 1) {
    throw new Error("Resend rate-limit claim returned an unexpected result.");
  }

  return rows[0];
}

async function getPaidProfile(params: {
  email: string;
  supabaseUrl: string;
  supabaseServiceRoleKey: string;
}): Promise<Profile | null> {
  const lookupUrl = `${params.supabaseUrl}/rest/v1/profiles?email=eq.${encodeURIComponent(
    params.email
  )}&select=id,email,full_name,portal_access&limit=1`;

  const response = await fetch(lookupUrl, {
    method: "GET",
    headers: getSupabaseHeaders(params.supabaseServiceRoleKey),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Profile lookup failed: ${errorText}`);
  }

  const profiles = (await response.json()) as Profile[];

  if (profiles.length === 0 || profiles[0].portal_access !== true) {
    return null;
  }

  return profiles[0];
}

async function createPortalSetupToken(params: {
  email: string;
  supabaseUrl: string;
  supabaseServiceRoleKey: string;
}): Promise<CreatedSetupToken> {
  const token = createSecurePortalSetupToken();

  const response = await fetch(
    `${params.supabaseUrl}/rest/v1/portal_setup_tokens?select=token,created_at`,
    {
      method: "POST",
      headers: {
        ...getSupabaseHeaders(params.supabaseServiceRoleKey),
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        email: params.email,
        token,
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Portal setup token creation failed: ${errorText}`);
  }

  const rows = (await response.json()) as Array<{
    token?: unknown;
    created_at?: unknown;
  }>;

  const createdToken = rows[0];

  if (
    rows.length !== 1 ||
    typeof createdToken?.token !== "string" ||
    typeof createdToken.created_at !== "string"
  ) {
    throw new Error("Portal setup token creation returned an invalid result.");
  }

  return {
    token: createdToken.token,
    createdAt: createdToken.created_at,
  };
}

async function markTokenUsed(params: {
  token: string;
  supabaseUrl: string;
  supabaseServiceRoleKey: string;
}): Promise<void> {
  const response = await fetch(
    `${params.supabaseUrl}/rest/v1/portal_setup_tokens?token=eq.${encodeURIComponent(
      params.token
    )}&used=eq.false`,
    {
      method: "PATCH",
      headers: {
        ...getSupabaseHeaders(params.supabaseServiceRoleKey),
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        used: true,
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Portal setup token invalidation failed: ${errorText}`);
  }
}

async function expireOlderUnusedTokens(params: {
  email: string;
  createdAt: string;
  supabaseUrl: string;
  supabaseServiceRoleKey: string;
}): Promise<void> {
  const response = await fetch(
    `${params.supabaseUrl}/rest/v1/portal_setup_tokens?email=eq.${encodeURIComponent(
      params.email
    )}&used=eq.false&created_at=lt.${encodeURIComponent(params.createdAt)}`,
    {
      method: "PATCH",
      headers: {
        ...getSupabaseHeaders(params.supabaseServiceRoleKey),
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        used: true,
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Older token expiry failed: ${errorText}`);
  }
}

async function sendSetupEmail(params: {
  email: string;
  fullName: string | null;
  token: string;
  resendApiKey: string;
}): Promise<void> {
  const firstName = params.fullName?.split(" ")[0] ?? "there";
  const setupUrl = `https://fertilitycarehub.com/auth/setup?token=${encodeURIComponent(
    params.token
  )}`;

  const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Set up your FertilityCareHub portal</title>
</head>
<body style="margin:0;padding:0;background-color:#f8f9fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f8f9fa;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08);">
          <tr>
            <td style="padding:48px 40px 32px;background-color:#0f172a;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:600;">FertilityCareHub</h1>
              <p style="margin:8px 0 0;color:#94a3b8;font-size:14px;">Secure portal setup</p>
            </td>
          </tr>
          <tr>
            <td style="padding:40px;">
              <h2 style="margin:0 0 16px;color:#0f172a;font-size:20px;font-weight:600;">Hello, ${firstName}</h2>

              <p style="margin:0 0 20px;color:#475569;font-size:15px;line-height:1.6;">
                We received your request for a new FertilityCareHub portal setup link.
              </p>

              <p style="margin:0 0 20px;color:#475569;font-size:15px;line-height:1.6;">
                Please use the secure button below to create your portal password and access your private planning workspace.
              </p>

              <table cellpadding="0" cellspacing="0" border="0" style="margin:0 0 24px;">
                <tr>
                  <td style="border-radius:8px;background-color:#0f172a;">
                    <a href="${setupUrl}" style="display:inline-block;padding:14px 32px;color:#ffffff;text-decoration:none;font-size:15px;font-weight:500;border-radius:8px;">
                      Set Up Your Portal
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 16px;color:#475569;font-size:14px;line-height:1.6;">
                This setup link is private, time-sensitive, and intended only for the paid advisory client associated with this email address.
              </p>

              <p style="margin:0;color:#94a3b8;font-size:13px;">
                If you did not request this link, you can ignore this message.
              </p>
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

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${params.resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "FertilityCareHub <onboarding@fertilitycarehub.com>",
      to: params.email,
      subject: "Set up your FertilityCareHub portal",
      html: emailHtml,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Resend setup email failed: ${errorText}`);
  }
}

export async function POST(req: Request) {
  const env = getEnv();

  const supabaseUrl = env.SUPABASE_URL;
  const supabaseServiceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY;
  const resendApiKey = env.RESEND_API_KEY;

  if (!supabaseUrl) {
    return new NextResponse("Missing SUPABASE_URL", { status: 500 });
  }

  if (!supabaseServiceRoleKey) {
    return new NextResponse("Missing SUPABASE_SERVICE_ROLE_KEY", {
      status: 500,
    });
  }

  if (!resendApiKey) {
    return new NextResponse("Missing RESEND_API_KEY", { status: 500 });
  }

  let email: string | null = null;
  let createdToken: CreatedSetupToken | null = null;

  try {
    const body = (await req.json()) as { email?: unknown };
    email = normalizeEmail(body.email);

    if (!email) {
      await logOnboardingEvent({
        email: null,
        eventType: "setup_link_resend_failed",
        eventSource: "resend_setup_link",
        status: "failed",
        metadata: { reason: "invalid_email" },
        supabaseUrl,
        supabaseServiceRoleKey,
      });

      return NextResponse.json(
        {
          ok: false,
          message: "Please enter a valid email address.",
        },
        { status: 400 }
      );
    }

    const rateKey = await createRateLimitKey(email);
    const rateLimit = await claimResendRateLimit({
      rateKey,
      supabaseUrl,
      supabaseServiceRoleKey,
    });

    if (!rateLimit.allowed) {
      await logOnboardingEvent({
        email,
        eventType: "setup_link_resend_rate_limited",
        eventSource: "resend_setup_link",
        status: "not_sent",
        metadata: {
          retry_after_seconds: rateLimit.retry_after_seconds,
          rate_limit_window_seconds: 900,
          rate_limit_max_requests: 3,
        },
        supabaseUrl,
        supabaseServiceRoleKey,
      });

      return NextResponse.json({
        ok: true,
        message: GENERIC_SUCCESS_MESSAGE,
      });
    }

    const profile = await getPaidProfile({
      email,
      supabaseUrl,
      supabaseServiceRoleKey,
    });

    if (!profile) {
      await logOnboardingEvent({
        email,
        eventType: "setup_link_resend_attempt",
        eventSource: "resend_setup_link",
        status: "not_sent",
        metadata: {
          reason: "profile_not_found_or_portal_access_inactive",
        },
        supabaseUrl,
        supabaseServiceRoleKey,
      });

      return NextResponse.json({
        ok: true,
        message: GENERIC_SUCCESS_MESSAGE,
      });
    }

    createdToken = await createPortalSetupToken({
      email,
      supabaseUrl,
      supabaseServiceRoleKey,
    });

    try {
      await sendSetupEmail({
        email,
        fullName: profile.full_name,
        token: createdToken.token,
        resendApiKey,
      });
    } catch (deliveryError: unknown) {
      try {
        await markTokenUsed({
          token: createdToken.token,
          supabaseUrl,
          supabaseServiceRoleKey,
        });
      } catch (invalidationError: unknown) {
        console.error(
          "Failed to invalidate undelivered setup token:",
          getErrorMessage(invalidationError)
        );
      }

      throw deliveryError;
    }

    try {
      await expireOlderUnusedTokens({
        email,
        createdAt: createdToken.createdAt,
        supabaseUrl,
        supabaseServiceRoleKey,
      });
    } catch (cleanupError: unknown) {
      console.error(
        "Setup email was delivered, but older-token cleanup failed:",
        getErrorMessage(cleanupError)
      );

      await logOnboardingEvent({
        email,
        eventType: "setup_link_old_token_cleanup_failed",
        eventSource: "resend_setup_link",
        status: "warning",
        metadata: {
          profile_id: profile.id,
          error: getErrorMessage(cleanupError),
        },
        supabaseUrl,
        supabaseServiceRoleKey,
      });
    }

    await logOnboardingEvent({
      email,
      eventType: "setup_link_resent",
      eventSource: "resend_setup_link",
      status: "completed",
      metadata: {
        profile_id: profile.id,
        delivery_provider: "resend",
        older_unused_tokens_expired_after_delivery: true,
        delivery_safe_rotation: true,
      },
      supabaseUrl,
      supabaseServiceRoleKey,
    });

    return NextResponse.json({
      ok: true,
      message: GENERIC_SUCCESS_MESSAGE,
    });
  } catch (error: unknown) {
    console.error("Resend setup link failed:", getErrorMessage(error));

    await logOnboardingEvent({
      email,
      eventType: "setup_link_resend_failed",
      eventSource: "resend_setup_link",
      status: "failed",
      metadata: {
        reason: "unexpected_error",
        error: getErrorMessage(error),
        generated_token_invalidated_after_failure: createdToken !== null,
      },
      supabaseUrl,
      supabaseServiceRoleKey,
    });

    return NextResponse.json(
      {
        ok: false,
        message:
          "We could not resend the setup link right now. Please try again or contact the advisory team.",
      },
      { status: 500 }
    );
  }
}
