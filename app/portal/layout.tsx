export const runtime = "edge";

import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/get-current-user";
import PortalShell from "@/components/portal/PortalShell";

type PortalLayoutProps = {
  children: ReactNode;
};

export default async function PortalLayout({
  children,
}: PortalLayoutProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  const metadata = user.user_metadata;
  const fullName =
    metadata &&
    typeof metadata === "object" &&
    "full_name" in metadata &&
    typeof metadata.full_name === "string"
      ? metadata.full_name
      : null;

  const userLabel = fullName || user.email || "Account";

  return <PortalShell userLabel={userLabel}>{children}</PortalShell>;
}