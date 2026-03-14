"use client";

import { useRouter } from "next/navigation";

type PortalHeaderProps = {
  userLabel?: string;
};

export default function PortalHeader({ userLabel }: PortalHeaderProps) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    router.push("/auth/login");
    router.refresh();
  }

  return (
    <header className="flex items-center justify-between border-b border-stone-200 bg-white px-6 py-4">
      <div>
        <h1 className="text-lg font-semibold text-stone-900">
          FertilityCareHub Portal
        </h1>
        {userLabel ? (
          <p className="mt-1 text-sm text-stone-500">{userLabel}</p>
        ) : null}
      </div>

      <button
        onClick={handleLogout}
        className="rounded-lg border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-100"
      >
        Logout
      </button>
    </header>
  );
}