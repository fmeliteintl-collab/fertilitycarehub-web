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

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      token?: string;
      password?: string;
    };

    const token = body.token?.trim();
    const password = body.password?.trim();

    if (!token || !password) {
      return NextResponse.json(
        { error: "Missing setup token or password." },
        { status: 400 }
      );
    }

    if (password.length < 8) {
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
      return NextResponse.json(
        { error: "This setup link is invalid." },
        { status: 400 }
      );
    }

    if (tokenRow.used) {
      return NextResponse.json(
        { error: "This setup link has already been used." },
        { status: 400 }
      );
    }

    if (new Date(tokenRow.expires_at).getTime() < Date.now()) {
      return NextResponse.json(
        { error: "This setup link has expired." },
        { status: 400 }
      );
    }

    const normalizedEmail = tokenRow.email.trim().toLowerCase();

    const { data: profile, error: profileError } = await supabaseAdmin
      .from("profiles")
      .select("portal_access")
      .eq("email", normalizedEmail)
      .single<{ portal_access: boolean | null }>();

    if (profileError || !profile?.portal_access) {
      return NextResponse.json(
        { error: "Portal access has not been activated for this email." },
        { status: 403 }
      );
    }

    const { data: usersList, error: usersError } =
      await supabaseAdmin.auth.admin.listUsers();

    if (usersError) {
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

    return NextResponse.json({
      success: true,
      email: normalizedEmail,
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to complete portal setup." },
      { status: 500 }
    );
  }
}