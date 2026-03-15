"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type PortalNavItem = {
  href: string;
  label: string;
  shortLabel: string;
};

type PortalSidebarProps = {
  onNavigate?: () => void;
};

const NAV_ITEMS: PortalNavItem[] = [
  { href: "/portal", label: "Dashboard", shortLabel: "Home" },
  { href: "/portal/my-plan", label: "My Plan", shortLabel: "Plan" },
  { href: "/portal/countries", label: "Countries", shortLabel: "Countries" },
  { href: "/portal/timeline", label: "Timeline", shortLabel: "Timeline" },
  { href: "/portal/documents", label: "Documents", shortLabel: "Documents" },
  { href: "/portal/advisory", label: "Advisory", shortLabel: "Advisory" },
  { href: "/portal/settings", label: "Settings", shortLabel: "Settings" },
];

function isActivePath(pathname: string, href: string): boolean {
  if (href === "/portal") {
    return pathname === "/portal";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function PortalSidebar({ onNavigate }: PortalSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-full flex-col border-r border-stone-200 bg-white">
      <div className="border-b border-stone-200 px-6 py-6">
        <Link href="/portal" className="block" onClick={onNavigate}>
          <div className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">
            FertilityCareHub
          </div>
          <div className="mt-2 text-xl font-semibold text-stone-900">
            Planning Portal
          </div>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            Your private workspace for cross-border fertility planning.
          </p>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-6">
        <div className="mb-3 px-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-400">
            Workspace
          </p>
        </div>

        <ul className="space-y-2">
          {NAV_ITEMS.map((item) => {
            const isActive = isActivePath(pathname, item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  aria-current={isActive ? "page" : undefined}
                  className={[
                    "group flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all",
                    isActive
                      ? "bg-stone-900 text-white shadow-sm"
                      : "text-stone-700 hover:bg-stone-100 hover:text-stone-900",
                  ].join(" ")}
                >
                  <span>{item.label}</span>

                  <span
                    className={[
                      "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em]",
                      isActive
                        ? "bg-white/15 text-white"
                        : "bg-stone-100 text-stone-500 group-hover:bg-stone-200",
                    ].join(" ")}
                  >
                    {item.shortLabel}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-stone-200 px-6 py-5">
        <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
          Portal V1
        </p>
        <p className="mt-2 text-sm leading-6 text-stone-600">
          Structured planning, shortlist management, timelines, documents, and
          advisory workflow.
        </p>
      </div>
    </aside>
  );
}