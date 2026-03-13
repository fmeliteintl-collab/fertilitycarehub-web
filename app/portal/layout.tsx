import type { ReactNode } from "react";
import PortalSidebar from "@/components/portal/PortalSidebar";

type PortalLayoutProps = {
  children: ReactNode;
};

export default function PortalLayout({ children }: PortalLayoutProps) {
  return (
    <div className="flex min-h-screen bg-stone-50">
      {/* Sidebar */}
      <div className="hidden w-72 lg:block">
        <PortalSidebar />
      </div>

      {/* Main Area */}
      <div className="flex flex-1 flex-col">
        <main className="flex-1 px-6 py-8 sm:px-10 lg:px-12">{children}</main>
      </div>
    </div>
  );
}