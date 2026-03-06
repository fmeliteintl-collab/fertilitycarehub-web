export const runtime = 'edge';

import { NextResponse } from "next/server";

// Try multiple possible environment variable names
const POSSIBLE_TOKEN_NAMES = [
  'ADMIN_DASH_TOKEN',
  'ADMIN_TOKEN', 
  'ADMIN_DASH_TOKEN_PREVIEW',
  'ADMIN_TOKEN_PREVIEW'
];

export async function POST(request: Request) {
  try {
    // Find which environment variable is set
    let foundToken: string | undefined;
    let foundName: string | undefined;
    
    for (const name of POSSIBLE_TOKEN_NAMES) {
      const value = process.env[name];
      if (value) {
        foundToken = value;
        foundName = name;
        break;
      }
    }

    // If no token found, return error with available env vars (names only, not values)
    if (!foundToken) {
      const availableEnvVars = Object.keys(process.env)
        .filter(key => key.includes('ADMIN') || key.includes('TOKEN'))
        .join(', ');
      
      return NextResponse.json(
        { 
          error: "No admin token configured",
          debug: {
            checkedVariables: POSSIBLE_TOKEN_NAMES,
            availableMatchingVars: availableEnvVars || 'None found',
            totalEnvVars: Object.keys(process.env).length
          }
        },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json(
        { error: "Token required" },
        { status: 400 }
      );
    }

    // Detailed comparison
    const trimmedInput = token.trim();
    const trimmedEnv = foundToken.trim();
    
    if (trimmedInput !== trimmedEnv) {
      return NextResponse.json(
        { 
          error: "Invalid token",
          debug: {
            envVarName: foundName,
            inputLength: trimmedInput.length,
            envLength: trimmedEnv.length,
            inputFirst3: trimmedInput.substring(0, 3),
            envFirst3: trimmedEnv.substring(0, 3),
            match: trimmedInput === trimmedEnv
          }
        },
        { status: 401 }
      );
    }

    // Success - set cookie
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
  } catch (err) {
    return NextResponse.json(
      { 
        error: "Internal server error",
        message: err instanceof Error ? err.message : String(err)
      },
      { status: 500 }
    );
  }
}