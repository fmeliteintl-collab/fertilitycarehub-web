"use client";

import { useState, type ReactNode } from "react";
import PortalSidebar from "@/components/portal/PortalSidebar";
import PortalTopBar from "@/components/portal/PortalTopBar";

type PortalShellProps = {
  userLabel: string;
  children: ReactNode;
};

export default function PortalShell({
  userLabel,
  children,
}: PortalShellProps) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  function openMobileNav() {
    setIsMobileNavOpen(true);
  }

  function closeMobileNav() {
    setIsMobileNavOpen(false);
  }

  return (
    <div className="min-h-screen bg-stone-50 lg:flex">
      <div className="hidden lg:block lg:w-72 lg:shrink-0">
        <PortalSidebar />
      </div>

      {isMobileNavOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close navigation"
            onClick={closeMobileNav}
            className="absolute inset-0 bg-black/30"
          />
          <div className="relative h-full w-80 max-w-[85vw] bg-white shadow-xl">
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b border-stone-200 px-4 py-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
                    FertilityCareHub
                  </p>
                  <p className="mt-1 text-base font-semibold text-stone-900">
                    Portal Menu
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeMobileNav}
                  className="rounded-lg border border-stone-300 px-3 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-100"
                >
                  Close
                </button>
              </div>

              <div className="min-h-0 flex-1">
                <PortalSidebar />
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div className="flex min-h-screen flex-1 flex-col">
        <PortalTopBar userLabel={userLabel} onMenuClick={openMobileNav} />

        <main className="flex-1 px-4 py-5 sm:px-6 sm:py-6 md:px-8 lg:px-10 lg:py-8 xl:px-12">
          <div className="mx-auto w-full max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}