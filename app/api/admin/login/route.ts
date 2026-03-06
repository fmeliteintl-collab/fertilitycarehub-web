export const runtime = 'edge';

import { NextResponse } from "next/server";

const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { token } = body;

    // Debug logging (remove after fixing)
    console.log("Received token:", token);
    console.log("Expected token:", ADMIN_TOKEN);
    console.log("Match:", token === ADMIN_TOKEN);

    if (!token) {
      return NextResponse.json(
        { error: "Token required" },
        { status: 400 }
      );
    }

    if (token !== ADMIN_TOKEN) {
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