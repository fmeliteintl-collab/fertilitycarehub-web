import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    const clean = email.trim().toLowerCase();

    // TEMP: proves it works (shows in Cloudflare logs / server logs)
    console.log("NEW SUBSCRIBER:", clean);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}