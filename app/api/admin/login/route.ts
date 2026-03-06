export const runtime = 'edge';

import { NextResponse } from "next/server";

const ADMIN_TOKEN = process.env.ADMIN_DASH_TOKEN?.trim(); // Add .trim() here

export async function POST(request: Request) {
  if (!ADMIN_TOKEN) {
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json(
        { error: "Token required" },
        { status: 400 }
      );
    }

    if (token.trim() !== ADMIN_TOKEN) { // Already has .trim()
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 401 }
      );
    }

    const response = NextResponse.json(
      { success: true },
      { status: 200 }
    );

    response.cookies.set("FCH_ADMIN_AUTH", "1", {
      httpOnly: true,
      secure: true,
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