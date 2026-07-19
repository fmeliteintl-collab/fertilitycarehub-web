import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "edge";

type PortalSetupToken = {
  email: string;
  used: boolean | null;
  expires_at: string;
};

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL ?? "",
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? ""
);

async function logOnboardingEvent(params: {
  email: string | null;
  eventType: string;
  status?: string;
  metadata?: Record<string, unknown>;
}) {
  await supabaseAdmin.from("onboarding_events").insert({
    email: params.email,
    event_type: params.eventType,
    event_source: "auth_setup",
    status: params.status ?? "completed",
    metadata: params.metadata ?? {},
  });
}

export async function POST(request: NextRequest) {
  let normalizedEmail: string | null = null;

  try {
    const body = (await request.json()) as {
      token?: string;
      password?: string;
    };

    const token = body.token?.trim();
    const password = body.password?.trim();

    if (!token || !password) {
      await logOnboardingEvent({
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

    const { data: tokenRow, error: tokenError } = await supabaseAdmin
      .from("portal_setup_tokens")
      .select("email, used, expires_at")
      .eq("token", token)
      .single<PortalSetupToken>();

    if (tokenError || !tokenRow) {
      await logOnboardingEvent({
        email: null,
        eventType: "setup_failed",
        status: "failed",
        metadata: { reason: "invalid_token" },
      });

      return NextResponse.json(
        { error: "This setup link is invalid." },
        { status: 400 }
      );
    }

    normalizedEmail = tokenRow.email.trim().toLowerCase();

    if (tokenRow.used) {
      await logOnboardingEvent({
        email: normalizedEmail,
        eventType: "setup_failed",
        status: "failed",
        metadata: { reason: "token_already_used" },
      });

      return NextResponse.json(
        { error: "This setup link has already been used." },
        { status: 400 }
      );
    }

    if (new Date(tokenRow.expires_at).getTime() < Date.now()) {
      await logOnboardingEvent({
        email: normalizedEmail,
        eventType: "setup_failed",
        status: "failed",
        metadata: { reason: "token_expired" },
      });

      return NextResponse.json(
        { error: "This setup link has expired." },
        { status: 400 }
      );
    }

    const { data: profile, error: profileError } = await supabaseAdmin
      .from("profiles")
      .select("portal_access")
      .eq("email", normalizedEmail)
      .single<{ portal_access: boolean | null }>();

    if (profileError || !profile?.portal_access) {
      await logOnboardingEvent({
        email: normalizedEmail,
        eventType: "setup_failed",
        status: "failed",
        metadata: { reason: "portal_access_not_active" },
      });

      return NextResponse.json(
        { error: "Portal access has not been activated for this email." },
        { status: 403 }
      );
    }

    const { data: usersList, error: usersError } =
      await supabaseAdmin.auth.admin.listUsers();

    if (usersError) {
      await logOnboardingEvent({
        email: normalizedEmail,
        eventType: "setup_failed",
        status: "failed",
        metadata: { reason: "user_lookup_failed" },
      });

      return NextResponse.json(
        { error: "Unable to verify portal user." },
        { status: 500 }
      );
    }

    const existingUser = usersList.users.find(
      (user) => user.email?.toLowerCase() === normalizedEmail
    );

    if (existingUser) {
      const { error: updateError } =
        await supabaseAdmin.auth.admin.updateUserById(existingUser.id, {
          password,
          email_confirm: true,
        });

      if (updateError) {
        await logOnboardingEvent({
          email: normalizedEmail,
          eventType: "setup_failed",
          status: "failed",
          metadata: {
            reason: "existing_user_update_failed",
            error: updateError.message,
          },
        });

        return NextResponse.json(
          { error: updateError.message },
          { status: 400 }
        );
      }
    } else {
      const { error: createError } =
        await supabaseAdmin.auth.admin.createUser({
          email: normalizedEmail,
          password,
          email_confirm: true,
        });

      if (createError) {
        await logOnboardingEvent({
          email: normalizedEmail,
          eventType: "setup_failed",
          status: "failed",
          metadata: {
            reason: "new_user_create_failed",
            error: createError.message,
          },
        });

        return NextResponse.json(
          { error: createError.message },
          { status: 400 }
        );
      }
    }

    await supabaseAdmin
      .from("portal_setup_tokens")
      .update({ used: true })
      .eq("token", token);

    await logOnboardingEvent({
      email: normalizedEmail,
      eventType: "setup_completed",
      status: "completed",
      metadata: {
        user_status: existingUser ? "existing_user_updated" : "new_user_created",
      },
    });

    return NextResponse.json({
      success: true,
      email: normalizedEmail,
    });
  } catch {
    await logOnboardingEvent({
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