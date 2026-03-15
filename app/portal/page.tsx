export const runtime = "edge";

import Link from "next/link";
import { getCurrentUserPlan } from "@/lib/plans/user-plans";
import { getCurrentUserDocuments } from "@/lib/documents/user-documents";

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

function getNextAction(plan: Awaited<ReturnType<typeof getCurrentUserPlan>>) {
  if (!plan) {
    return {
      title: "Start your planning workspace",
      body: "Complete My Plan first so the portal can begin reflecting your priorities, timing, and pathway direction.",
      href: "/portal/my-plan",
      cta: "Start My Plan",
    };
  }

  if ((plan.shortlisted_countries ?? []).length === 0) {
    return {
      title: "Build your country shortlist",
      body: "Add your first shortlisted jurisdictions so your planning workspace can reflect real comparison options.",
      href: "/portal/countries",
      cta: "Open Countries",
    };
  }

  if ((plan.timeline_items ?? []).length === 0) {
    return {
      title: "Create your planning timeline",
      body: "Add your first milestones so your portal starts tracking execution, not just research.",
      href: "/portal/timeline",
      cta: "Open Timeline",
    };
  }

  return {
    title: "Strengthen your document vault",
    body: "Upload or log your essential planning documents so your workspace becomes a complete command center.",
    href: "/portal/documents",
    cta: "Open Documents",
  };
}

export default async function PortalDashboardPage() {
  const [plan, documents] = await Promise.all([
    getCurrentUserPlan(),
    getCurrentUserDocuments(),
  ]);

  const shortlistedCountriesCount = plan?.shortlisted_countries?.length ?? 0;
  const timelineItems = plan?.timeline_items ?? [];

  const completedCount = timelineItems.filter(
    (item) => item.status === "Completed"
  ).length;
  const inProgressCount = timelineItems.filter(
    (item) => item.status === "In Progress"
  ).length;
  const upcomingCount = timelineItems.filter(
    (item) => item.status === "Upcoming"
  ).length;

  const documentCount = documents.length;
  const pathwayType = plan?.pathway_type?.trim() || "Not set yet";
  const planningNotes =
    plan?.notes?.trim() ||
    "No planning notes saved yet. Add your priorities and case context in My Plan.";
  const nextAction = getNextAction(plan);

  const quickStats = [
    {
      label: "Pathway Type",
      value: pathwayType,
    },
    {
      label: "Shortlisted Countries",
      value: String(shortlistedCountriesCount),
    },
    {
      label: "Documents",
      value: String(documentCount),
    },
  ];

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
          This portal is now structured as your private fertility planning
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

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-stone-500">Timeline Completed</p>
          <p className="mt-2 text-3xl font-semibold text-stone-900">
            {completedCount}
          </p>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            Milestones already completed in your planning workflow.
          </p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-stone-500">In Progress</p>
          <p className="mt-2 text-3xl font-semibold text-stone-900">
            {inProgressCount}
          </p>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            Active planning items currently being worked through.
          </p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-stone-500">Upcoming</p>
          <p className="mt-2 text-3xl font-semibold text-stone-900">
            {upcomingCount}
          </p>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            Next-phase timeline items waiting to be executed.
          </p>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-stone-900">
            Planning Summary
          </h2>
          <p className="mt-3 text-sm leading-6 text-stone-600">
            {planningNotes}
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/portal/my-plan"
              className="inline-flex rounded-xl border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
            >
              Update My Plan
            </Link>
            <Link
              href="/portal/timeline"
              className="inline-flex rounded-xl border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
            >
              Review Timeline
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-stone-900">Next Action</h2>
          <p className="mt-3 text-lg font-semibold text-stone-900">
            {nextAction.title}
          </p>
          <p className="mt-3 text-sm leading-6 text-stone-600">
            {nextAction.body}
          </p>

          <Link
            href={nextAction.href}
            className="mt-5 inline-flex rounded-xl bg-stone-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-stone-800"
          >
            {nextAction.cta}
          </Link>
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-stone-900">
            Portal Modules
          </h2>
          <p className="mt-1 text-sm text-stone-600">
            Your core planning modules are now connected to real user data and
            can be used as an active private workspace.
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
    </div>
  );
}