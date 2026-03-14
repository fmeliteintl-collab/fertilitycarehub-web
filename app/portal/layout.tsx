export const runtime = "edge";

import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/get-current-user";
import PortalSidebar from "@/components/portal/PortalSidebar";
import PortalTopBar from "@/components/portal/PortalTopBar";

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

  return (
    <div className="flex min-h-screen bg-stone-50">
      <div className="hidden w-72 lg:block">
        <PortalSidebar />
      </div>

      <div className="flex flex-1 flex-col">
        <PortalTopBar userLabel={userLabel} />
        <main className="flex-1 px-6 py-8 sm:px-10 lg:px-12">{children}</main>
      </div>
    </div>
  );
}