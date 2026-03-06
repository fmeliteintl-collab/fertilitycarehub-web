import { NextResponse } from "next/server";

export const runtime = "edge";

const ADMIN_TOKEN = process.env.ADMIN_DASH_TOKEN;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { token } = body as { token?: string };

    if (!token) {
      return NextResponse.json({ error: "Token required" }, { status: 400 });
    }

    if (!ADMIN_TOKEN || token !== ADMIN_TOKEN) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const response = NextResponse.json({ success: true }, { status: 200 });

    response.cookies.set("FCH_ADMIN_AUTH", "1", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}