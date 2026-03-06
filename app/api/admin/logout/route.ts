export const runtime = 'edge';

import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json(
    { success: true },
    { status: 200 }
  );

  // Clear the cookie
  response.cookies.set("FCH_ADMIN_AUTH", "", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}