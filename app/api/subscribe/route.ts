import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "edge";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  const body = await req.json();
  console.log("BODY:", body);

  const email = body.email;
  console.log("EMAIL:", email);

  if (!email) {
    return Response.json({ error: "Email missing" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("subscribers")
    .insert([{ email }]);

  if (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return Response.json({ success: true });
}