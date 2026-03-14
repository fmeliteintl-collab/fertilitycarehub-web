import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/get-current-user";
import PortalSidebar from "@/components/portal/PortalSidebar";

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

  return (
    <div className="flex min-h-screen bg-stone-50">
      <div className="hidden w-72 lg:block">
        <PortalSidebar />
      </div>

      <div className="flex flex-1 flex-col">
        <main className="flex-1 px-6 py-8 sm:px-10 lg:px-12">{children}</main>
      </div>
    </div>
  );
}