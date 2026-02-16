import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export const runtime = "edge";

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || "";

// Build-safe guard (prevents build crash if env missing during build)
const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

export async function POST(req: Request) {
  console.log("API HIT: /api/subscribe");

  if (!supabase) {
    console.error("Supabase client not initialized. Missing SUPABASE_URL or SUPABASE_ANON_KEY.");
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
  }

  try {
    const { email } = await req.json();
    console.log("Processing email:", email);

    if (!email) {
      return NextResponse.json({ error: "Email missing" }, { status: 400 });
    }

    const { error } = await supabase.from("subscribers").insert([{ email }]);

    if (error) {
      console.error("Supabase Insert Error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Route Crash:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}