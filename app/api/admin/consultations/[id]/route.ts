import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

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

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }  // <-- Changed to Promise
) {
  try {
    // Check for admin session cookie
    const cookieHeader = request.headers.get("cookie");
    const adminSession = cookieHeader
      ?.split(";")
      .find((c) => c.trim().startsWith("admin_session="))
      ?.split("=")[1];

    if (!adminSession || adminSession !== ADMIN_TOKEN) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json(
        { error: "Status required" },
        { status: 400 }
      );
    }

    // Await the params Promise
    const { id } = await params;  // <-- Added await here

    const { data, error } = await supabase
      .from("consultation_requests")
      .update({ status })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to update status" },
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