import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "edge";

// Small helper (works even if process/env behaves differently in edge)
function getEnv(key: string): string {
  // @ts-ignore
  return (typeof process !== "undefined" && process?.env?.[key]) ? (process.env[key] as string) : "";
}

// Prefer server vars, fallback to NEXT_PUBLIC vars (more reliable on Cloudflare builds)
const supabaseUrl =
  getEnv("SUPABASE_URL") || getEnv("NEXT_PUBLIC_SUPABASE_URL");

const supabaseAnonKey =
  getEnv("SUPABASE_ANON_KEY") || getEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");

const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      })
    : null;

export async function POST(req: Request) {
  if (!supabase) {
    return NextResponse.json(
      {
        error: "Server Configuration Error",
        details: {
          hasUrl: Boolean(supabaseUrl),
          hasKey: Boolean(supabaseAnonKey),
          expectedEnv: [
            "SUPABASE_URL / SUPABASE_ANON_KEY (server)",
            "or NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY (fallback)",
          ],
        },
      },
      { status: 500 }
    );
  }

  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email missing" }, { status: 400 });
    }

    const cleanedEmail = email.trim().toLowerCase();

    // Optional basic validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanedEmail)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Insert and return the inserted row
    const { data, error } = await supabase
      .from("subscribers")
      .insert([{ email: cleanedEmail }])
      .select("id, created_at, email")
      .single();

    // If you added a UNIQUE constraint on email, you can treat duplicates as success:
    if (error) {
      // Postgres unique violation code = 23505
      // @ts-ignore
      if (error.code === "23505") {
        return NextResponse.json({ success: true, alreadySubscribed: true }, { status: 200 });
      }

      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request format" }, { status: 400 });
  }
}