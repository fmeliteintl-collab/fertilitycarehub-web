import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export const runtime = "edge";

async function assertAdmin(req: Request) {
  const cookieStore = await cookies();
  const authed = cookieStore.get("FCH_ADMIN_AUTH")?.value?.trim();

  if (authed === "1") {
    return true;
  }

  const token = req.headers.get("authorization")?.replace("Bearer ", "") ?? "";
  const expected = process.env.ADMIN_DASH_TOKEN ?? "";

  return Boolean(token && expected && token === expected);
}

export async function GET(req: Request) {
  if (!(await assertAdmin(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data, error } = await supabase
    .from("consultation_requests")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}