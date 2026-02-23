import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: Request) {
  const expected = (process.env.ADMIN_DASH_TOKEN ?? "").trim();
  if (!expected) {
    return NextResponse.json(
      { error: "Server missing ADMIN_DASH_TOKEN." },
      { status: 500 }
    );
  }

  const body = (await req.json().catch(() => null)) as { token?: string } | null;
  const provided = (body?.token ?? "").trim();

  if (!provided || provided !== expected) {
    return NextResponse.json({ error: "Invalid token." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });

  // IMPORTANT: cookie stores only "1" (not the secret token)
  res.cookies.set("FCH_ADMIN_TOKEN", "1", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 14, // 14 days
  });

  return res;
}