"use client";

import { useRouter } from "next/navigation";

type PortalTopBarProps = {
  userLabel?: string;
};

export default function PortalTopBar({ userLabel }: PortalTopBarProps) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    router.push("/auth/login");
    router.refresh();
  }

  return (
    <header className="border-b border-stone-200 bg-white px-4 py-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
              FertilityCareHub
            </p>
            <span className="rounded-full border border-stone-300 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-stone-600">
              Portal
            </span>
          </div>

          <h1 className="mt-2 text-lg font-semibold text-stone-900 sm:text-xl">
            Planning Workspace
          </h1>

          {userLabel ? (
            <p className="mt-1 truncate text-sm text-stone-500">
              Signed in as {userLabel}
            </p>
          ) : null}
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-100"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}