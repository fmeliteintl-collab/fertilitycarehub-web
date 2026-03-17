import { getSupabaseServerClient } from "@/lib/supabase/server";

export async function getCurrentUser() {
  const supabase = await getSupabaseServerClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    const isMissingSession =
      error.name === "AuthSessionMissingError" ||
      error.message.toLowerCase().includes("auth session missing");

    if (isMissingSession) {
      return null;
    }

    throw error;
  }

  return user ?? null;
}