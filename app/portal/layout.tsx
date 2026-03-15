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
    <div className="min-h-screen bg-stone-50 lg:flex">
      <div className="hidden lg:block lg:w-72 lg:shrink-0">
        <PortalSidebar />
      </div>

      <div className="flex min-h-screen flex-1 flex-col">
        <PortalTopBar userLabel={userLabel} />

        <main className="flex-1 px-4 py-5 sm:px-6 sm:py-6 md:px-8 lg:px-10 lg:py-8 xl:px-12">
          <div className="mx-auto w-full max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}