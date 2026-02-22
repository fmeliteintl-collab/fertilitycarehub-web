// app/api/admin/consultations/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "edge";

function assertAdmin(req: NextRequest) {
  // Support BOTH header styles (so your UI can send either)
  const token =
    req.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ||
    req.headers.get("x-admin-token") ||
    "";

  const expected = process.env.ADMIN_DASH_TOKEN || "";
  return Boolean(token && expected && token === expected);
}

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    if (!assertAdmin(req)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;

    const body = await req.json().catch(() => ({}));
    const status = body?.status as string | undefined;

    if (!status) {
      return NextResponse.json({ error: "Missing status" }, { status: 400 });
    }

    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { error } = await supabase
      .from("consultation_requests")
      .update({ status })
      .eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
} catch (e: unknown) {
  const message = e instanceof Error ? e.message : "Unexpected error.";
  return NextResponse.json({ error: message }, { status: 500 });
}
}