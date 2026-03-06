export const runtime = 'edge';

import { NextResponse } from "next/server";

// Hardcoded token for testing - use exactly this to login
const ADMIN_TOKEN = "testtoken123";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json(
        { error: "Token required" },
        { status: 400 }
      );
    }

    // Debug info
    if (token !== ADMIN_TOKEN) {
      return NextResponse.json(
        { 
          error: "Invalid token",
          debug: {
            expected: ADMIN_TOKEN,
            received: token,
            match: token === ADMIN_TOKEN
          }
        },
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