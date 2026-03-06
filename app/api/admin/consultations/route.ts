export const runtime = 'edge';

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// REMOVE THIS LINE: const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

export async function GET(request: Request) {
  try {
    const cookieHeader = request.headers.get("cookie");
    const authed = cookieHeader
      ?.split(";")
      .find((c) => c.trim().startsWith("FCH_ADMIN_AUTH="))
      ?.split("=")[1];

    if (authed !== "1") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { data, error } = await supabase
      .from("consultation_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to fetch data" },
        { status: 500 }
      );
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}