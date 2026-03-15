export const runtime = "edge";

import Link from "next/link";

const dashboardCards = [
  {
    title: "My Plan",
    description:
      "Capture fertility pathway priorities, constraints, timeline goals, and planning notes.",
    href: "/portal/my-plan",
    cta: "Open My Plan",
  },
  {
    title: "Countries",
    description:
      "Review your shortlist, compare jurisdiction fit, and organize country-level planning notes.",
    href: "/portal/countries",
    cta: "View Countries",
  },
  {
    title: "Timeline",
    description:
      "Track the planning journey from research and advisory steps to logistics and execution.",
    href: "/portal/timeline",
    cta: "View Timeline",
  },
  {
    title: "Documents",
    description:
      "Prepare your document vault for identity records, medical summaries, and advisory notes.",
    href: "/portal/documents",
    cta: "Open Documents",
  },
  {
    title: "Advisory",
    description:
      "Review available advisory pathways and prepare for structured support and decision guidance.",
    href: "/portal/advisory",
    cta: "Open Advisory",
  },
  {
    title: "Settings",
    description:
      "Manage your account area and prepare for future profile and portal preferences.",
    href: "/portal/settings",
    cta: "Open Settings",
  },
];

const quickStats = [
  { label: "Core Modules Built", value: "5" },
  { label: "Authenticated Portal", value: "Live" },
  { label: "Next Priority", value: "Data Testing" },
];

export default function PortalDashboardPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-stone-500">
          Dashboard
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900">
          Planning Workspace Overview
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-stone-600">
          This portal is now structured as a private fertility planning
          workspace. Use it to organize your planning profile, shortlist
          countries, track milestones, prepare documents, and manage advisory
          next steps.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {quickStats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
          >
            <p className="text-sm font-medium text-stone-500">{stat.label}</p>
            <p className="mt-2 text-3xl font-semibold text-stone-900">
              {stat.value}
            </p>
          </div>
        ))}
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-stone-900">
            Portal Modules
          </h2>
          <p className="mt-1 text-sm text-stone-600">
            Your core V1 planning modules are now in place. The next major stage
            is validating authenticated flows and connecting more persistent
            data.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {dashboardCards.map((card) => (
            <article
              key={card.title}
              className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-stone-900">
                {card.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-stone-600">
                {card.description}
              </p>

              <Link
                href={card.href}
                className="mt-5 inline-flex rounded-xl border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
              >
                {card.cta}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-stone-900">Next Build Focus</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-stone-600">
          Tomorrow’s first task is to complete the email-confirmed login test,
          then verify the end-to-end planning flow:
          signup, login, portal access, My Plan save, and database write into
          user_plans.
        </p>
      </section>
    </div>
  );
}