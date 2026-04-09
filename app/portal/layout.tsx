export const runtime = "edge";

import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient } from "@supabase/ssr";
import { getCurrentUser } from "@/lib/auth/get-current-user";
import PortalShell from "@/components/portal/PortalShell";

type PortalLayoutProps = {
  children: ReactNode;
};

type ProfileAccessRow = {
  portal_access: boolean | null;
};

function getUserLabel(user: Awaited<ReturnType<typeof getCurrentUser>>) {
  const metadata = user?.user_metadata;

  const fullName =
    metadata &&
    typeof metadata === "object" &&
    "full_name" in metadata &&
    typeof metadata.full_name === "string"
      ? metadata.full_name
      : null;

  return fullName || user?.email || "Account";
}

async function getServerSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase environment variables.");
  }

  const cookieStore = await cookies();

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set() {},
      remove() {},
    },
  });
}

export default async function PortalLayout({
  children,
}: PortalLayoutProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  const supabase = await getServerSupabaseClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("portal_access")
    .eq("id", user.id)
    .maybeSingle<ProfileAccessRow>();

  if (error) {
    console.error("Failed to verify portal access:", error);
    redirect("/consultation");
  }

  const hasPortalAccess = data?.portal_access === true;

  if (!hasPortalAccess) {
    redirect("/auth/signup");
  }

  const userLabel = getUserLabel(user);

  return <PortalShell userLabel={userLabel}>{children}</PortalShell>;
}