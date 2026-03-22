export const runtime = "edge";

import Link from "next/link";
import { getCurrentUserPlanServer } from "@/lib/plans/user-plans-server";
import { getCurrentUserDocumentsServer } from "@/lib/documents/user-documents-server";

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

type PortalPlan = Awaited<ReturnType<typeof getCurrentUserPlanServer>>;

function getDisplayValue(value: string | null | undefined, fallback: string) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : fallback;
}

function getTimelineCounts(plan: PortalPlan) {
  const timelineItems = plan?.timeline_items ?? [];

  return {
    total: timelineItems.length,
    completed: timelineItems.filter((item) => item.status === "Completed")
      .length,
    inProgress: timelineItems.filter((item) => item.status === "In Progress")
      .length,
    upcoming: timelineItems.filter((item) => item.status === "Upcoming").length,
  };
}

function getNextAction(plan: PortalPlan, documentCount: number) {
  const shortlistCount = plan?.shortlisted_countries?.length ?? 0;
  const timelineCounts = getTimelineCounts(plan);

  const hasPathway = Boolean(plan?.pathway_type?.trim());
  const hasTreatmentGoal = Boolean(plan?.treatment_goal?.trim());
  const hasNotes = Boolean(plan?.notes?.trim());
  const hasMyPlanBasics = hasPathway || hasTreatmentGoal || hasNotes;

  const hasAdvisoryStatus = Boolean(plan?.advisory_status?.trim());
  const hasAdvisoryNextStep = Boolean(plan?.advisory_next_step?.trim());
  const hasTimeline = timelineCounts.total > 0;
  const hasActiveExecution =
    timelineCounts.inProgress > 0 || timelineCounts.completed > 0;

  if (!hasMyPlanBasics) {
    return {
      title: "Start your planning workspace",
      body: "Complete My Plan first so the portal can begin reflecting your pathway, priorities, and case direction.",
      href: "/portal/my-plan",
      cta: "Start My Plan",
    };
  }

  if (hasMyPlanBasics && shortlistCount === 0) {
    return {
      title: "Build your first shortlist",
      body: "Your planning profile exists, but the system needs shortlisted countries before comparison and execution guidance become meaningful.",
      href: "/portal/countries",
      cta: "Open Countries",
    };
  }

  if (shortlistCount > 0 && !hasTimeline) {
    return {
      title: "Turn research into execution",
      body: "You now have a real shortlist. Generate or create your timeline so the workspace moves from comparison into planning action.",
      href: "/portal/timeline",
      cta: "Open Timeline",
    };
  }

  if (hasTimeline && !hasActiveExecution) {
    return {
      title: "Activate the planning timeline",
      body: "Your timeline exists, but nothing is currently moving. Review the steps and mark the real next phase as in progress.",
      href: "/portal/timeline",
      cta: "Review Timeline",
    };
  }

  if (hasTimeline && documentCount === 0) {
    return {
      title: "Support the plan with documents",
      body: "Your execution structure is forming, but your document vault is still empty. Add core records so the workspace becomes operational.",
      href: "/portal/documents",
      cta: "Open Documents",
    };
  }

  if (shortlistCount > 0 && hasTimeline && !hasAdvisoryStatus) {
    return {
      title: "Define your advisory stage",
      body: "You have enough planning structure in place to set your advisory direction and clarify where you are in the decision-support process.",
      href: "/portal/advisory",
      cta: "Open Advisory",
    };
  }

  if (hasAdvisoryStatus && !hasAdvisoryNextStep) {
    return {
      title: "Define the next decision step",
      body: "Your advisory stage is saved, but the system still needs a concrete next action so planning, review, and execution stay aligned.",
      href: "/portal/advisory",
      cta: "Update Advisory",
    };
  }

  if (
    shortlistCount > 0 &&
    hasTimeline &&
    documentCount > 0 &&
    hasAdvisoryStatus &&
    hasAdvisoryNextStep
  ) {
    return {
      title: "Review strategic readiness",
      body: "Your core planning system is active. Review timeline progress, shortlist quality, and advisory direction to determine the highest-value next move.",
      href: "/portal/timeline",
      cta: "Review Timeline",
    };
  }

  return {
    title: "Continue strengthening the workspace",
    body: "Your portal is progressing well. Review the modules to identify the next missing dependency or execution gap.",
    href: "/portal",
    cta: "Review Dashboard",
  };
}
function calculateProgress(plan: PortalPlan, documentCount: number) {
  let score = 0;
  const completed: string[] = [];
  const remaining: string[] = [];

  const hasMyPlanBasics = Boolean(
    plan?.pathway_type?.trim() ||
      plan?.treatment_goal?.trim() ||
      plan?.notes?.trim()
  );

  if (hasMyPlanBasics) {
    score += 20;
    completed.push("My Plan started");
  } else {
    remaining.push("Complete My Plan");
  }

  if ((plan?.shortlisted_countries ?? []).length > 0) {
    score += 20;
    completed.push("Countries shortlisted");
  } else {
    remaining.push("Add shortlisted countries");
  }

  if ((plan?.timeline_items ?? []).length > 0) {
    score += 20;
    completed.push("Timeline created");
  } else {
    remaining.push("Create timeline");
  }

  if (documentCount > 0) {
    score += 15;
    completed.push("Documents added");
  } else {
    remaining.push("Add documents");
  }

  if (plan?.advisory_status?.trim()) {
    score += 15;
    completed.push("Advisory status saved");
  } else {
    remaining.push("Set advisory status");
  }

  if (plan?.advisory_next_step?.trim()) {
    score += 10;
    completed.push("Advisory next step defined");
  } else {
    remaining.push("Define advisory next step");
  }

  return {
    score,
    completed,
    remaining,
  };
}
function calculateAdvisoryReadiness(plan: PortalPlan, documentCount: number) {
  const shortlistCount = plan?.shortlisted_countries?.length ?? 0;
  const timelineCounts = getTimelineCounts(plan);

  const hasPathway = Boolean(plan?.pathway_type?.trim());
  const hasTreatmentGoal = Boolean(plan?.treatment_goal?.trim());
  const hasNotes = Boolean(plan?.notes?.trim());
  const hasMyPlanBasics = hasPathway || hasTreatmentGoal || hasNotes;

  const hasShortlist = shortlistCount > 0;
  const hasTimeline = timelineCounts.total > 0;
  const hasActiveTimeline =
    timelineCounts.inProgress > 0 || timelineCounts.completed > 0;
  const hasDocuments = documentCount > 0;
  const hasAdvisoryStatus = Boolean(plan?.advisory_status?.trim());
  const hasAdvisoryNextStep = Boolean(plan?.advisory_next_step?.trim());

  let score = 0;
  const ready: string[] = [];
  const missing: string[] = [];

  if (hasMyPlanBasics) {
    score += 20;
    ready.push("Planning basics saved");
  } else {
    missing.push("Complete My Plan basics");
  }

  if (hasShortlist) {
    score += 20;
    ready.push("Shortlist established");
  } else {
    missing.push("Create country shortlist");
  }

  if (hasTimeline) {
    score += 15;
    ready.push("Timeline created");
  } else {
    missing.push("Create planning timeline");
  }

  if (hasActiveTimeline) {
    score += 15;
    ready.push("Timeline has active progress");
  } else {
    missing.push("Mark timeline steps in progress");
  }

  if (hasDocuments) {
    score += 10;
    ready.push("Documents added");
  } else {
    missing.push("Upload key documents");
  }

  if (hasAdvisoryStatus) {
    score += 10;
    ready.push("Advisory status defined");
  } else {
    missing.push("Set advisory status");
  }

  if (hasAdvisoryNextStep) {
    score += 10;
    ready.push("Advisory next step defined");
  } else {
    missing.push("Define advisory next step");
  }

  let label = "Low";
  let summary =
    "Your workspace needs more planning structure before advisory is fully supported.";

  if (score >= 80) {
    label = "High";
    summary =
      "Your workspace is well-prepared for advisory and strategic decision support.";
  } else if (score >= 50) {
    label = "Moderate";
    summary =
      "Your workspace has a good base, but a few missing elements still limit advisory readiness.";
  }

  return {
    score,
    label,
    summary,
    ready,
    missing,
  };
}
function getSystemSignals(plan: PortalPlan, documentCount: number) {
  const signals: string[] = [];

  const shortlist = plan?.shortlisted_countries ?? [];
  const timelineCounts = getTimelineCounts(plan);

  const hasTimeline = timelineCounts.total > 0;
  const hasActiveTimeline =
    timelineCounts.inProgress > 0 || timelineCounts.completed > 0;

  const hasDocuments = documentCount > 0;
  const hasAdvisoryStatus = Boolean(plan?.advisory_status?.trim());
  const hasAdvisoryNextStep = Boolean(plan?.advisory_next_step?.trim());

  // 🔹 Shortlist signal
  if (shortlist.length >= 3) {
    signals.push(
      "Your shortlist includes multiple countries. Consider narrowing to 2–3 for deeper comparison."
    );
  }

  // 🔹 Timeline signals
  if (hasTimeline && !hasActiveTimeline) {
    signals.push(
      "Your timeline exists, but no step is currently active. Execution has not started."
    );
  }

  if (!hasTimeline) {
    signals.push(
      "You have not created a timeline yet. Planning is still in research phase."
    );
  }

  // 🔹 Documents signal
  if (!hasDocuments) {
    signals.push(
      "No documents have been uploaded. Your workspace is not yet operational."
    );
  }

  // 🔹 Advisory signals
  if (hasAdvisoryStatus && !hasAdvisoryNextStep) {
    signals.push(
      "Advisory status is set, but no next step is defined."
    );
  }

  if (!hasAdvisoryStatus) {
    signals.push(
      "Advisory stage is not yet defined."
    );
  }

  return signals;
}
function buildOnboardingChecklist(plan: PortalPlan, documentCount: number) {
  return [
    {
      label: "Complete My Plan",
      done: Boolean(
        plan?.pathway_type?.trim() ||
          plan?.treatment_goal?.trim() ||
          plan?.notes?.trim()
      ),
      href: "/portal/my-plan",
    },
    {
      label: "Add shortlisted countries",
      done: (plan?.shortlisted_countries ?? []).length > 0,
      href: "/portal/countries",
    },
    {
      label: "Generate or create timeline",
      done: (plan?.timeline_items ?? []).length > 0,
      href: "/portal/timeline",
    },
    {
      label: "Add at least one document",
      done: documentCount > 0,
      href: "/portal/documents",
    },
    {
      label: "Save advisory status",
      done: Boolean(plan?.advisory_status?.trim()),
      href: "/portal/advisory",
    },
    {
      label: "Define advisory next step",
      done: Boolean(plan?.advisory_next_step?.trim()),
      href: "/portal/advisory",
    },
  ];
}

function getReadinessSummary(plan: PortalPlan, documentCount: number) {
  const shortlistCount = plan?.shortlisted_countries?.length ?? 0;
  const timelineCounts = getTimelineCounts(plan);

  if (
    shortlistCount > 0 &&
    timelineCounts.total > 0 &&
    documentCount > 0 &&
    plan?.advisory_status?.trim()
  ) {
    return {
      title: "Core workspace established",
      body: "Your planning, country shortlist, timeline, documents, and advisory layer are all active. The portal is now functioning as a real working system.",
    };
  }

  if (shortlistCount > 0 && timelineCounts.total > 0) {
    return {
      title: "Planning structure established",
      body: "You have a real shortlist and timeline in place. Strengthen the workspace further with documents and a defined advisory status.",
    };
  }

  if (
    Boolean(
      plan?.pathway_type?.trim() ||
        plan?.treatment_goal?.trim() ||
        plan?.notes?.trim()
    )
  ) {
    return {
      title: "Planning foundation started",
      body: "Your workspace has begun to take shape. The next gains come from shortlisting countries and turning planning into execution steps.",
    };
  }

  return {
    title: "Workspace not yet established",
    body: "Start with My Plan to give the rest of the portal the context it needs to become useful and connected.",
  };
}

export default async function PortalDashboardPage() {
  const [plan, documents] = await Promise.all([
  getCurrentUserPlanServer(),
  getCurrentUserDocumentsServer(),
]);
  const documentCount = documents.length;
  const shortlistedCountries = plan?.shortlisted_countries ?? [];
  const shortlistedCountriesText =
    shortlistedCountries.length > 0
      ? shortlistedCountries.join(", ")
      : "No shortlisted countries yet";

  const timelineCounts = getTimelineCounts(plan);
  const pathwayType = getDisplayValue(plan?.pathway_type, "Not set yet");
  const advisoryStatus = getDisplayValue(plan?.advisory_status, "Not set");
  const advisoryPathway = getDisplayValue(plan?.advisory_pathway, "Undecided");
  const advisoryNextStep = getDisplayValue(
    plan?.advisory_next_step,
    "No advisory next step saved yet"
  );
  const planningNotes =
    plan?.notes?.trim() ||
    "No planning notes saved yet. Add your priorities and case context in My Plan.";
function getModuleStatuses(plan: PortalPlan, documentCount: number) {
  const timelineCounts = getTimelineCounts(plan);

  return [
    {
      label: "My Plan",
      value:
        plan?.pathway_type?.trim() ||
        plan?.treatment_goal?.trim() ||
        plan?.notes?.trim()
          ? "Started"
          : "Not started",
      href: "/portal/my-plan",
    },
    {
      label: "Countries",
      value:
        (plan?.shortlisted_countries ?? []).length > 0
          ? `${plan?.shortlisted_countries?.length ?? 0} shortlisted`
          : "No shortlist yet",
      href: "/portal/countries",
    },
    {
      label: "Timeline",
      value:
        timelineCounts.total > 0
          ? `${timelineCounts.completed}/${timelineCounts.total} completed`
          : "Not created",
      href: "/portal/timeline",
    },
    {
      label: "Documents",
      value: documentCount > 0 ? `${documentCount} saved` : "No documents yet",
      href: "/portal/documents",
    },
    {
      label: "Advisory",
      value: getDisplayValue(plan?.advisory_status, "Not set"),
      href: "/portal/advisory",
    },
    {
      label: "Settings",
      value: "Available",
      href: "/portal/settings",
    },
  ];
}
  const nextAction = getNextAction(plan, documentCount);
const progress = calculateProgress(plan, documentCount);
const advisoryReadiness = calculateAdvisoryReadiness(plan, documentCount);
const systemSignals = getSystemSignals(plan, documentCount);
const onboardingChecklist = buildOnboardingChecklist(plan, documentCount);
const readinessSummary = getReadinessSummary(plan, documentCount);
const moduleStatuses = getModuleStatuses(plan, documentCount);

  const completedChecklistCount = onboardingChecklist.filter(
    (item) => item.done
  ).length;

  const quickStats = [
    {
      label: "Pathway Type",
      value: pathwayType,
    },
    {
      label: "Shortlisted Countries",
      value: String(shortlistedCountries.length),
    },
    {
      label: "Documents",
      value: String(documentCount),
    },
    {
      label: "Advisory Status",
      value: advisoryStatus,
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

      <section className="grid gap-6 lg:grid-cols-4">
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

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-stone-500">
            System Readiness
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-stone-900">
            {readinessSummary.title}
          </h2>
          <p className="mt-3 text-sm leading-6 text-stone-600">
            {readinessSummary.body}
          </p>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <div className="rounded-xl bg-stone-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
                Shortlist
              </p>
              <p className="mt-2 text-sm leading-6 text-stone-700">
                {shortlistedCountriesText}
              </p>
            </div>

            <div className="rounded-xl bg-stone-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
                Advisory Pathway
              </p>
              <p className="mt-2 text-sm leading-6 text-stone-700">
                {advisoryPathway}
              </p>
            </div>
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

      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-stone-500">
              Planning Progress
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-stone-900">
              {progress.score}%
            </h2>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              Your workspace completion score based on planning data already
              saved across the portal.
            </p>
          </div>

          <div className="max-w-xl text-sm text-stone-600">
            {progress.remaining.length > 0
              ? `Still to complete: ${progress.remaining.join(", ")}.`
              : "Your core planning workspace is fully established."}
          </div>
        </div>

        <div className="mt-5 h-3 w-full overflow-hidden rounded-full bg-stone-200">
          <div
            className="h-full rounded-full bg-stone-900 transition-all"
            style={{ width: `${progress.score}%` }}
          />
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl bg-stone-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
              Completed
            </p>
            <p className="mt-2 text-sm leading-6 text-stone-700">
              {progress.completed.length > 0
                ? progress.completed.join(", ")
                : "Nothing completed yet."}
            </p>
          </div>

          <div className="rounded-xl bg-stone-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
              Missing
            </p>
            <p className="mt-2 text-sm leading-6 text-stone-700">
              {progress.remaining.length > 0
                ? progress.remaining.join(", ")
                : "No major gaps detected in the core workflow."}
            </p>
          </div>
        </div>
      </section>
<section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
  <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
    <div>
      <p className="text-sm font-medium uppercase tracking-[0.18em] text-stone-500">
        Advisory Readiness
      </p>
      <h2 className="mt-2 text-3xl font-semibold text-stone-900">
        {advisoryReadiness.score}%
      </h2>
      <p className="mt-2 text-sm leading-6 text-stone-600">
        {advisoryReadiness.summary}
      </p>
    </div>

    <div className="rounded-xl bg-stone-50 px-4 py-3 text-sm font-medium text-stone-700">
      Readiness Level: {advisoryReadiness.label}
    </div>
  </div>

  <div className="mt-5 h-3 w-full overflow-hidden rounded-full bg-stone-200">
    <div
      className="h-full rounded-full bg-stone-900 transition-all"
      style={{ width: `${advisoryReadiness.score}%` }}
    />
  </div>

  <div className="mt-5 grid gap-4 lg:grid-cols-2">
    <div className="rounded-xl bg-stone-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
        Supporting Signals
      </p>
      <p className="mt-2 text-sm leading-6 text-stone-700">
        {advisoryReadiness.ready.length > 0
          ? advisoryReadiness.ready.join(", ")
          : "No supporting signals yet."}
      </p>
    </div>

    <div className="rounded-xl bg-stone-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
        Missing Before Strong Advisory Readiness
      </p>
      <p className="mt-2 text-sm leading-6 text-stone-700">
        {advisoryReadiness.missing.length > 0
          ? advisoryReadiness.missing.join(", ")
          : "No major advisory readiness gaps detected."}
      </p>
    </div>
  </div>
</section>
<section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
  <div>
    <p className="text-sm font-medium uppercase tracking-[0.18em] text-stone-500">
      System Signals
    </p>
    <h2 className="mt-2 text-xl font-semibold text-stone-900">
      Key Observations
    </h2>
    <p className="mt-2 text-sm text-stone-600">
      These signals highlight important patterns or gaps in your current planning workspace.
    </p>
  </div>

  <div className="mt-5 space-y-3">
    {systemSignals.length > 0 ? (
      systemSignals.map((signal, index) => (
        <div
          key={index}
          className="rounded-xl border border-stone-200 px-4 py-3 text-sm text-stone-700 bg-stone-50"
        >
          {signal}
        </div>
      ))
    ) : (
      <p className="text-sm text-stone-500">
        No major signals detected. Your workspace is well-structured.
      </p>
    )}
  </div>
</section>
      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-stone-500">
              First-Run Guidance
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-stone-900">
              Onboarding Checklist
            </h2>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              Complete the core setup steps to turn this workspace into a fully
              functioning planning environment.
            </p>
          </div>

          <div className="text-sm text-stone-600">
            {completedChecklistCount} of {onboardingChecklist.length} completed
          </div>
        </div>

        <div className="mt-6 grid gap-4">
          {onboardingChecklist.map((item) => (
            <div
              key={item.label}
              className="flex flex-col gap-3 rounded-xl border border-stone-200 p-4 lg:flex-row lg:items-center lg:justify-between"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
                    item.done
                      ? "bg-stone-900 text-white"
                      : "border border-stone-300 bg-white text-stone-700"
                  }`}
                >
                  {item.done ? "✓" : ""}
                </span>
                <p className="text-sm font-medium text-stone-900">
                  {item.label}
                </p>
              </div>

              <Link
                href={item.href}
                className="inline-flex rounded-xl border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
              >
                {item.done ? "Review" : "Complete"}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-stone-500">Timeline Completed</p>
          <p className="mt-2 text-3xl font-semibold text-stone-900">
            {timelineCounts.completed}
          </p>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            Milestones already completed in your planning workflow.
          </p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-stone-500">In Progress</p>
          <p className="mt-2 text-3xl font-semibold text-stone-900">
            {timelineCounts.inProgress}
          </p>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            Active planning items currently being worked through.
          </p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-stone-500">Upcoming</p>
          <p className="mt-2 text-3xl font-semibold text-stone-900">
            {timelineCounts.upcoming}
          </p>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            Next-phase timeline items waiting to be executed.
          </p>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-stone-900">
            Planning Summary
          </h2>
          <p className="mt-3 text-sm leading-6 text-stone-600">
            {planningNotes}
          </p>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <div className="rounded-xl bg-stone-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
                Advisory Next Step
              </p>
              <p className="mt-2 text-sm leading-6 text-stone-700">
                {advisoryNextStep}
              </p>
            </div>

            <div className="rounded-xl bg-stone-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
                Timeline Summary
              </p>
              <p className="mt-2 text-sm leading-6 text-stone-700">
                {timelineCounts.total > 0
                  ? `${timelineCounts.completed} completed, ${timelineCounts.inProgress} in progress, ${timelineCounts.upcoming} upcoming`
                  : "No timeline created yet"}
              </p>
            </div>
          </div>

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
            <Link
              href="/portal/advisory"
              className="inline-flex rounded-xl border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
            >
              Review Advisory
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-stone-900">
            Module Status
          </h2>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            Quick visibility into the current state of each major portal area.
          </p>

          <div className="mt-5 space-y-3">
            {moduleStatuses.map(
  (item: { label: string; value: string; href: string }) => (
              <div
                key={item.label}
                className="flex items-center justify-between rounded-xl border border-stone-200 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-stone-900">
                    {item.label}
                  </p>
                  <p className="text-sm text-stone-600">{item.value}</p>
                </div>

                <Link
                  href={item.href}
                  className="rounded-xl border border-stone-300 px-3 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
                >
                  Open
                </Link>
              </div>
            ))}
          </div>
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