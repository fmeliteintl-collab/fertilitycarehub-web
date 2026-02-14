import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "edge";

// Using || "" instead of ! prevents the build from crashing if keys are missing during compilation
const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || "";

// Only initialize the client if both keys are present
const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

export async function POST(req: Request) {
  // If the database client isn't ready (common during build/validation), return a 500 error
  if (!supabase) {
    console.error("Supabase client not initialized. Check Cloudflare Variables.");
    return NextResponse.json({ error: "Server Configuration Error" }, { status: 500 });
  }

  try {
    const body = await req.json();
    const email = body.email;

    if (!email) {
      return NextResponse.json({ error: "Email missing" }, { status: 400 });
    }

    // Attempt to insert the email into the 'subscribers' table
    const { data, error } = await supabase
      .from("subscribers")
      .insert([{ email }]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Invalid request format" }, { status: 400 });
  }
}