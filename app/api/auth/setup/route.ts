import { getRequestContext } from "@cloudflare/next-on-pages";
import { NextRequest, NextResponse } from "next/server";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export const runtime = "edge";

type AuthSetupEnv = {
  SUPABASE_URL?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
};

type ConsumedSetupToken = {
  email: string;
  profile_id: string;
};

function getEnv(): AuthSetupEnv {
  try {
    const context = getRequestContext();
    return context.env as AuthSetupEnv;
  } catch {
    return {
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    };
  }
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Unknown error";
}

async function logOnboardingEvent(params: {
  supabaseAdmin: SupabaseClient;
  email: string | null;
  eventType: string;
  status?: string;
  metadata?: Record<string, unknown>;
}): Promise<void> {
  try {
    const { error } = await params.supabaseAdmin
      .from("onboarding_events")
      .insert({
        email: params.email,
        event_type: params.eventType,
        event_source: "auth_setup",
        status: params.status ?? "completed",
        metadata: params.metadata ?? {},
      });

    if (error) {
      console.error("Onboarding event logging failed:", error.message);
    }
  } catch (error: unknown) {
    console.error(
      "Onboarding event logging exception:",
      getErrorMessage(error)
    );
  }
}

function getConsumedTokenRow(data: unknown): ConsumedSetupToken | null {
  if (!Array.isArray(data) || data.length !== 1) {
    return null;
  }

  const row = data[0] as Partial<ConsumedSetupToken>;

  if (
    typeof row.email !== "string" ||
    row.email.length === 0 ||
    typeof row.profile_id !== "string" ||
    row.profile_id.length === 0
  ) {
    return null;
  }

  return {
    email: row.email,
    profile_id: row.profile_id,
  };
}

export async function POST(request: NextRequest) {
  const env = getEnv();
  const supabaseUrl = env.SUPABASE_URL;
  const supabaseServiceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) {
    return NextResponse.json(
      { error: "Portal setup is temporarily unavailable." },
      { status: 500 }
    );
  }

  if (!supabaseServiceRoleKey) {
    return NextResponse.json(
      { error: "Portal setup is temporarily unavailable." },
      { status: 500 }
    );
  }

  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  let normalizedEmail: string | null = null;

  try {
    const body = (await request.json()) as {
      token?: unknown;
      password?: unknown;
    };

    const token =
      typeof body.token === "string" ? body.token.trim() : "";
    const password =
      typeof body.password === "string" ? body.password : "";

    if (!token || !password) {
      await logOnboardingEvent({
        supabaseAdmin,
        email: null,
        eventType: "setup_failed",
        status: "failed",
        metadata: { reason: "missing_token_or_password" },
      });

      return NextResponse.json(
        { error: "Missing setup token or password." },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      await logOnboardingEvent({
        supabaseAdmin,
        email: null,
        eventType: "setup_failed",
        status: "failed",
        metadata: { reason: "password_too_short" },
      });

      return NextResponse.json(
        { error: "Password must be at least 8 characters." },
        { status: 400 }
      );
    }

    const { data: consumedTokenData, error: consumeError } =
      await supabaseAdmin.rpc("consume_portal_setup_token", {
        p_token: token,
      });

    if (consumeError) {
      console.error(
        "Portal setup token consumption failed:",
        consumeError.message
      );

      await logOnboardingEvent({
        supabaseAdmin,
        email: null,
        eventType: "setup_failed",
        status: "failed",
        metadata: { reason: "token_consumption_failed" },
      });

      return NextResponse.json(
        {
          error:
            "This setup link is invalid, expired, already used, or no longer eligible.",
        },
        { status: 400 }
      );
    }

    const consumedToken = getConsumedTokenRow(consumedTokenData);

    if (!consumedToken) {
      await logOnboardingEvent({
        supabaseAdmin,
        email: null,
        eventType: "setup_failed",
        status: "failed",
        metadata: {
          reason: "token_invalid_expired_used_or_ineligible",
        },
      });

      return NextResponse.json(
        {
          error:
            "This setup link is invalid, expired, already used, or no longer eligible.",
        },
        { status: 400 }
      );
    }

    normalizedEmail = consumedToken.email.trim().toLowerCase();

    const { error: updateError } =
      await supabaseAdmin.auth.admin.updateUserById(
        consumedToken.profile_id,
        {
          password,
          email_confirm: true,
        }
      );

    if (updateError) {
      console.error(
        "Portal Auth user password update failed:",
        updateError.message
      );

      await logOnboardingEvent({
        supabaseAdmin,
        email: normalizedEmail,
        eventType: "setup_failed",
        status: "failed",
        metadata: {
          reason: "auth_user_update_failed",
          profile_id: consumedToken.profile_id,
        },
      });

      return NextResponse.json(
        {
          error:
            "We could not complete portal setup. Please request a new setup link or contact the advisory team.",
        },
        { status: 500 }
      );
    }

    await logOnboardingEvent({
      supabaseAdmin,
      email: normalizedEmail,
      eventType: "setup_completed",
      status: "completed",
      metadata: {
        user_status: "existing_auth_user_updated",
        profile_id: consumedToken.profile_id,
        token_consumption: "atomic",
      },
    });

    return NextResponse.json({
      success: true,
      email: normalizedEmail,
    });
  } catch (error: unknown) {
    console.error("Portal setup failed:", getErrorMessage(error));

    await logOnboardingEvent({
      supabaseAdmin,
      email: normalizedEmail,
      eventType: "setup_failed",
      status: "failed",
      metadata: { reason: "unexpected_error" },
    });

    return NextResponse.json(
      { error: "Unable to complete portal setup." },
      { status: 500 }
    );
  }
}
