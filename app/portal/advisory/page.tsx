"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  getCurrentUserPlan,
  upsertCurrentUserPlan,
} from "@/lib/plans/user-plans";
import {
  EMPTY_USER_PLAN_INPUT,
  type TimelineItem,
  type UserPlanInput,
} from "@/types/plan";

export const runtime = "edge";

const ADVISORY_STATUS_OPTIONS = [
  "Not Started",
  "Considering",
  "Ready for Strategy Session",
  "In Advisory",
  "Completed",
] as const;

const ADVISORY_PATHWAY_OPTIONS = [
  "Strategy Session",
  "Comprehensive Advisory Package",
  "Undecided",
] as const;

type AdvisorySignal = {
  type: "blocking" | "attention" | "ready";
  message: string;
  action?: string;
  link?: string;
};

function getDisplayValue(value: string | null | undefined, fallback: string) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : fallback;
}

function countTimelineItems(
  timelineItems: TimelineItem[],
  status: TimelineItem["status"]
) {
  return timelineItems.filter((item) => item.status === status).length;
}

// ==================== INTELLIGENCE FUNCTIONS ====================

function calculateAdvisoryReadiness(plan: UserPlanInput): {
  score: number;
  maxScore: number;
  percentage: number;
  stage: "insufficient" | "developing" | "ready" | "optimal";
} {
  let score = 0;
  const maxScore = 100;

  // Core planning foundation (30 points)
  if (plan.pathway_type && plan.pathway_type !== "Not sure yet") score += 10;
  if (plan.family_structure) score += 10;
  if (plan.treatment_goal) score += 10;

  // Country shortlist maturity (25 points)
  const shortlistCount = plan.shortlisted_countries?.length ?? 0;
  if (shortlistCount >= 2 && shortlistCount <= 4) score += 25;
  else if (shortlistCount === 1) score += 15;
  else if (shortlistCount > 4) score += 10;

  // Timeline progress (20 points)
  const completedCount = countTimelineItems(plan.timeline_items ?? [], "Completed");
  const inProgressCount = countTimelineItems(plan.timeline_items ?? [], "In Progress");
  if (completedCount >= 3) score += 20;
  else if (completedCount >= 1 || inProgressCount >= 1) score += 10;

  // Advisory context (15 points)
  if (plan.advisory_status && plan.advisory_status !== "Not Started") score += 5;
  if (plan.advisory_pathway && plan.advisory_pathway !== "Undecided") score += 5;
  if (plan.advisory_notes && plan.advisory_notes.trim().length > 20) score += 5;

  // Constraints clarity (10 points)
  if (plan.constraints && plan.constraints.length > 0) score += 5;
  if (plan.priorities && plan.priorities.length > 0) score += 5;

  let stage: "insufficient" | "developing" | "ready" | "optimal";
  if (score < 30) stage = "insufficient";
  else if (score < 60) stage = "developing";
  else if (score < 85) stage = "ready";
  else stage = "optimal";

  return { score, maxScore, percentage: Math.round((score / maxScore) * 100), stage };
}

function generateAdvisorySignals(plan: UserPlanInput): AdvisorySignal[] {
  const signals: AdvisorySignal[] = [];
  const shortlistCount = plan.shortlisted_countries?.length ?? 0;
  const completedCount = countTimelineItems(plan.timeline_items ?? [], "Completed");
  const inProgressCount = countTimelineItems(plan.timeline_items ?? [], "In Progress");

  // Blocking signals
  if (!plan.pathway_type || plan.pathway_type === "Not sure yet") {
    signals.push({
      type: "blocking",
      message: "Pathway type not defined",
      action: "Define your pathway in My Plan first",
      link: "/portal/my-plan",
    });
  }

  if (shortlistCount === 0) {
    signals.push({
      type: "blocking",
      message: "No countries shortlisted",
      action: "Build a shortlist in Countries to enable advisory focus",
      link: "/portal/countries",
    });
  }

  // Attention signals
  if (shortlistCount > 4) {
    signals.push({
      type: "attention",
      message: "Broad country shortlist may dilute advisory depth",
      action: "Narrow to 2-4 countries for more targeted guidance",
      link: "/portal/countries",
    });
  }

  if (completedCount === 0 && inProgressCount === 0 && shortlistCount > 0) {
    signals.push({
      type: "attention",
      message: "Timeline not yet activated",
      action: "Generate a timeline to structure advisory sequencing",
      link: "/portal/timeline",
    });
  }

  if (plan.advisory_status === "Ready for Strategy Session" && !plan.advisory_next_step) {
    signals.push({
      type: "attention",
      message: "Ready status but no next step defined",
      action: "Clarify your immediate next action below",
    });
  }

  // Ready signals
  if (shortlistCount >= 2 && shortlistCount <= 4 && completedCount >= 2) {
    signals.push({
      type: "ready",
      message: "Planning foundation is solid for advisory engagement",
    });
  }

  if (plan.advisory_pathway !== "Undecided" && plan.advisory_status === "In Advisory") {
    signals.push({
      type: "ready",
      message: "Active advisory pathway with clear direction",
    });
  }

  return signals;
}

function determineExecutionStage(plan: UserPlanInput): {
  stage: "foundation" | "shortlist" | "sequencing" | "advisory-active" | "completion";
  description: string;
  nextActions: string[];
} {
  const shortlistCount = plan.shortlisted_countries?.length ?? 0;
  const completedCount = countTimelineItems(plan.timeline_items ?? [], "Completed");
  const status = plan.advisory_status ?? "Not Started";

  if (status === "Completed") {
    return {
      stage: "completion",
      description: "Advisory engagement completed. Execute on your established plan.",
      nextActions: ["Review timeline milestones", "Update progress as execution advances"],
    };
  }

  if (status === "In Advisory") {
    return {
      stage: "advisory-active",
      description: "Active advisory engagement. Focus on decision support and pathway refinement.",
      nextActions: ["Prepare questions for next advisory touchpoint", "Update notes with new constraints or learnings"],
    };
  }

  if (status === "Ready for Strategy Session") {
    return {
      stage: "sequencing",
      description: "Planning foundation established. Ready to initiate formal advisory.",
      nextActions: ["Book strategy session", "Prepare case context and priority questions", "Review shortlisted countries one final time"],
    };
  }

  if (shortlistCount >= 2 && completedCount >= 2) {
    return {
      stage: "sequencing",
      description: "Strong planning base. Advisory will add strategic sequencing and execution clarity.",
      nextActions: ["Consider upgrading advisory status", "Define specific advisory questions", "Evaluate pathway options"],
    };
  }

  if (shortlistCount > 0) {
    return {
      stage: "shortlist",
      description: "Country shortlist established. Build timeline and refine constraints before advisory.",
      nextActions: ["Generate timeline from shortlist", "Complete more planning milestones", "Define constraints and priorities"],
    };
  }

  return {
    stage: "foundation",
    description: "Early planning phase. Establish core parameters before advisory engagement.",
    nextActions: ["Define pathway type and family structure", "Build initial country shortlist", "Set timeline goals"],
  };
}

function buildSmartNextStep(plan: UserPlanInput): {
  step: string;
  context: string;
  priority: "high" | "medium" | "low";
} {
  const shortlistCount = plan.shortlisted_countries?.length ?? 0;
  const completedCount = countTimelineItems(plan.timeline_items ?? [], "Completed");
  const status = plan.advisory_status ?? "Not Started";
  const pathway = plan.advisory_pathway ?? "Undecided";

  // High priority: Foundation gaps
  if (!plan.pathway_type || plan.pathway_type === "Not sure yet") {
    return {
      step: "Define your pathway type in My Plan",
      context: "Advisory requires a clear pathway to provide relevant guidance",
      priority: "high",
    };
  }

  if (shortlistCount === 0) {
    return {
      step: "Shortlist 2-4 countries in the Countries module",
      context: "Country selection is prerequisite for meaningful advisory",
      priority: "high",
    };
  }

  // High priority: Ready to engage
  if (status === "Ready for Strategy Session" && pathway === "Undecided") {
    return {
      step: "Select your preferred advisory pathway below",
      context: "Choose between Strategy Session or Comprehensive Package",
      priority: "high",
    };
  }

  if (status === "Ready for Strategy Session" && pathway !== "Undecided" && !plan.advisory_next_step) {
    return {
      step: "Book your strategy session",
      context: `You have selected ${pathway}. Initiate booking to begin advisory.`,
      priority: "high",
    };
  }

  // Medium priority: Timeline activation
  if (completedCount === 0 && shortlistCount > 0) {
    return {
      step: "Generate your execution timeline",
      context: "Timeline provides advisory context for sequencing recommendations",
      priority: "medium",
    };
  }

  // Medium priority: Advisory progression
  if (status === "Considering" && shortlistCount >= 2) {
    return {
      step: "Upgrade status to 'Ready for Strategy Session'",
      context: "Your planning is sufficiently developed for advisory engagement",
      priority: "medium",
    };
  }

  if (status === "In Advisory" && !plan.advisory_notes) {
    return {
      step: "Add advisory notes with current questions or concerns",
      context: "Document context to maximize advisory session value",
      priority: "medium",
    };
  }

  // Low priority: Refinement
  if (shortlistCount > 4) {
    return {
      step: "Narrow country shortlist to 2-4 options",
      context: "Focused shortlist enables deeper comparative analysis",
      priority: "low",
    };
  }

  if (plan.advisory_next_step) {
    return {
      step: plan.advisory_next_step,
      context: "Your defined next step from previous planning",
      priority: "low",
    };
  }

  return {
    step: "Review and refine your planning context",
    context: "Continuous refinement improves advisory outcomes",
    priority: "low",
  };
}

function buildRecommendedFocus(plan: UserPlanInput): string {
  const shortlistedCountries = plan.shortlisted_countries ?? [];
  const completedCount = countTimelineItems(plan.timeline_items ?? [], "Completed");
  const inProgressCount = countTimelineItems(plan.timeline_items ?? [], "In Progress");
  const status = plan.advisory_status ?? "Not Started";

  if (status === "In Advisory") {
    return "Focus on execution sequencing, risk mitigation, and decision validation with your advisory framework.";
  }

  if (status === "Ready for Strategy Session") {
    return "Prepare structured questions around your shortlisted countries and timeline constraints.";
  }

  if (shortlistedCountries.length === 0) {
    return "Build and refine a shortlist before moving deeper into advisory review.";
  }

  if (inProgressCount > 0) {
    return "Use advisory time to resolve the active planning questions that are currently blocking execution.";
  }

  if (completedCount >= 3) {
    return "Your planning base is becoming structured enough for a deeper comparative advisory review.";
  }

  if (plan.surrogate_needed) {
    return "Focus advisory on legal structure, execution complexity, and cross-border coordination for a surrogacy pathway.";
  }

  if (plan.donor_needed) {
    return "Focus advisory on donor-pathway compatibility, jurisdiction fit, and treatment constraints.";
  }

  return "Use advisory to pressure-test your shortlist, execution timing, and next strategic decision.";
}

// ==================== COMPONENT ====================

export default function PortalAdvisoryPage() {
  const [plan, setPlan] = useState<UserPlanInput>(EMPTY_USER_PLAN_INPUT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [hasLoadedInitialData, setHasLoadedInitialData] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadPlan() {
      try {
        const existing = await getCurrentUserPlan();

        if (!isMounted) return;

        if (existing) {
          setPlan({
            pathway_type: existing.pathway_type,
            family_structure: existing.family_structure,
            treatment_goal: existing.treatment_goal,
            donor_needed: existing.donor_needed,
            surrogate_needed: existing.surrogate_needed,
            priorities: existing.priorities ?? [],
            constraints: existing.constraints ?? [],
            shortlisted_countries: existing.shortlisted_countries ?? [],
            timeline_items: existing.timeline_items ?? [],
            advisory_status: existing.advisory_status ?? null,
            advisory_pathway: existing.advisory_pathway ?? null,
            advisory_notes: existing.advisory_notes ?? null,
            advisory_next_step: existing.advisory_next_step ?? null,
            target_timeline: existing.target_timeline,
            budget_range: existing.budget_range,
            notes: existing.notes,
          });
        }
      } catch (error: unknown) {
        console.error(error);
        if (isMounted) {
          setIsError(true);
          setMessage("Failed to load advisory workspace.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
          setHasLoadedInitialData(true);
        }
      }
    }

    void loadPlan();

    return () => {
      isMounted = false;
    };
  }, []);

  function updatePlanField<K extends keyof UserPlanInput>(
    field: K,
    value: UserPlanInput[K]
  ) {
    setPlan((current) => ({
      ...current,
      [field]: value,
    }));

    if (hasLoadedInitialData) {
      setHasUnsavedChanges(true);
      setMessage(null);
      setIsError(false);
    }
  }

  async function handleSave() {
    try {
      setSaving(true);
      setMessage(null);
      setIsError(false);

      await upsertCurrentUserPlan(plan);

      setHasUnsavedChanges(false);
      setMessage("Advisory workspace saved successfully.");
    } catch (error: unknown) {
      console.error(error);
      setIsError(true);
      setMessage("Failed to save advisory workspace.");
    } finally {
      setSaving(false);
    }
  }

  // ==================== COMPUTED INTELLIGENCE ====================

  const currentStatus = plan.advisory_status ?? "Not Started";
  const currentPathway = plan.advisory_pathway ?? "Undecided";

  const timelineItems = useMemo(() => plan.timeline_items ?? [], [plan.timeline_items]);
  const completedCount = useMemo(() => countTimelineItems(timelineItems, "Completed"), [timelineItems]);
  const inProgressCount = useMemo(() => countTimelineItems(timelineItems, "In Progress"), [timelineItems]);
  const upcomingCount = useMemo(() => countTimelineItems(timelineItems, "Upcoming"), [timelineItems]);

  const advisoryReadiness = useMemo(() => calculateAdvisoryReadiness(plan), [plan]);
  const advisorySignals = useMemo(() => generateAdvisorySignals(plan), [plan]);
    const executionStage = useMemo(() => determineExecutionStage(plan), [plan]);
  const smartNextStep = useMemo(() => buildSmartNextStep(plan), [plan]);
  const recommendedFocus = useMemo(() => buildRecommendedFocus(plan), [plan]);

  const shortlistedCountries = plan.shortlisted_countries ?? [];

  const blockingSignals = advisorySignals.filter((s) => s.type === "blocking");
  const attentionSignals = advisorySignals.filter((s) => s.type === "attention");
  const readySignals = advisorySignals.filter((s) => s.type === "ready");

  const advisoryItems = useMemo(
    () => [
      {
        title: "Strategy Session",
        status: currentPathway === "Strategy Session" ? "Selected" : "Available",
        description:
          "A focused advisory session to clarify pathway direction, shortlist logic, and next-step planning priorities.",
        recommended: executionStage.stage === "sequencing" && currentPathway === "Undecided",
      },
      {
        title: "Comprehensive Advisory Package",
        status: currentPathway === "Comprehensive Advisory Package" ? "Selected" : "Core Offer",
        description:
          "A more structured advisory pathway designed for deeper planning, comparative review, and guided decision support.",
        recommended: executionStage.stage === "advisory-active" && currentPathway === "Undecided",
      },
      {
        title: "Current Advisory Status",
        status: currentStatus,
        description:
          plan.advisory_notes?.trim() ||
          "This area reflects your saved advisory stage, notes, and next actions.",
        recommended: false,
      },
    ],
    [currentPathway, currentStatus, plan.advisory_notes, executionStage.stage]
  );

  if (loading) {
    return <div className="p-6">Loading advisory workspace...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-stone-500">
          Advisory
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900">
          Advisory Workspace
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-stone-600">
          Track your advisory pathway, review support formats, and move from planning into structured decision support.
        </p>
      </div>

      {/* Advisory Readiness Score */}
      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-stone-900">Advisory Readiness</h2>
            <p className="mt-1 text-sm text-stone-600">
              Measures planning maturity for meaningful advisory engagement
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-3xl font-semibold text-stone-900">
                {advisoryReadiness.percentage}%
              </p>
              <p className="text-sm text-stone-500 capitalize">
                {advisoryReadiness.stage} stage
              </p>
            </div>
            <div className="h-16 w-16 rounded-full border-4 border-stone-100 flex items-center justify-center">
              <div
                className={`h-12 w-12 rounded-full flex items-center justify-center text-xs font-medium ${
                  advisoryReadiness.stage === "optimal"
                    ? "bg-green-100 text-green-800"
                    : advisoryReadiness.stage === "ready"
                    ? "bg-blue-100 text-blue-800"
                    : advisoryReadiness.stage === "developing"
                    ? "bg-amber-100 text-amber-800"
                    : "bg-stone-100 text-stone-600"
                }`}
              >
                {advisoryReadiness.score}/{advisoryReadiness.maxScore}
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 h-2 w-full rounded-full bg-stone-100">
          <div
            className={`h-2 rounded-full transition-all ${
              advisoryReadiness.stage === "optimal"
                ? "bg-green-500"
                : advisoryReadiness.stage === "ready"
                ? "bg-blue-500"
                : advisoryReadiness.stage === "developing"
                ? "bg-amber-500"
                : "bg-stone-400"
            }`}
            style={{ width: `${advisoryReadiness.percentage}%` }}
          />
        </div>
      </section>

      {/* Advisory Signals */}
      {advisorySignals.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-900">Advisory Signals</h2>
          
          {blockingSignals.length > 0 && (
            <div className="space-y-2">
              {blockingSignals.map((signal, idx) => (
                <div
                  key={`blocking-${idx}`}
                  className="rounded-xl border border-red-200 bg-red-50 p-4"
                >
                  <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <p className="font-medium text-red-900">{signal.message}</p>
                      {signal.action && (
                        <p className="text-sm text-red-700 mt-1">{signal.action}</p>
                      )}
                    </div>
                    {signal.link && (
                      <Link
                        href={signal.link}
                        className="text-sm font-medium text-red-800 underline hover:text-red-900"
                      >
                        Go to module →
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {attentionSignals.length > 0 && (
            <div className="space-y-2">
              {attentionSignals.map((signal, idx) => (
                <div
                  key={`attention-${idx}`}
                  className="rounded-xl border border-amber-200 bg-amber-50 p-4"
                >
                  <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <p className="font-medium text-amber-900">{signal.message}</p>
                      {signal.action && (
                        <p className="text-sm text-amber-700 mt-1">{signal.action}</p>
                      )}
                    </div>
                    {signal.link && (
                      <Link
                        href={signal.link}
                        className="text-sm font-medium text-amber-800 underline hover:text-amber-900"
                      >
                        Go to module →
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {readySignals.length > 0 && (
            <div className="space-y-2">
              {readySignals.map((signal, idx) => (
                <div
                  key={`ready-${idx}`}
                  className="rounded-xl border border-green-200 bg-green-50 p-4"
                >
                  <p className="font-medium text-green-900">{signal.message}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Execution Stage */}
      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-stone-100 text-xl">
            {executionStage.stage === "foundation" && "🏗️"}
            {executionStage.stage === "shortlist" && "🌍"}
            {executionStage.stage === "sequencing" && "⚡"}
            {executionStage.stage === "advisory-active" && "🎯"}
            {executionStage.stage === "completion" && "✅"}
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-stone-900">
              Execution Stage: <span className="capitalize">{executionStage.stage.replace("-", " ")}</span>
            </h2>
            <p className="mt-1 text-sm text-stone-600">{executionStage.description}</p>
            
            <div className="mt-4">
              <p className="text-sm font-medium text-stone-700">Recommended Actions:</p>
              <ul className="mt-2 space-y-1">
                {executionStage.nextActions.map((action, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-stone-600">
                    <span className="text-stone-400">•</span>
                    {action}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Next Step */}
      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-medium text-stone-500">Smart Next Step</p>
            <p className="mt-1 text-lg font-semibold text-stone-900">{smartNextStep.step}</p>
            <p className="mt-1 text-sm text-stone-600">{smartNextStep.context}</p>
          </div>
          <span
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
              smartNextStep.priority === "high"
                ? "bg-red-100 text-red-800"
                : smartNextStep.priority === "medium"
                ? "bg-amber-100 text-amber-800"
                : "bg-stone-100 text-stone-600"
            }`}
          >
            {smartNextStep.priority} priority
          </span>
        </div>
      </section>

      {/* Recommended Focus */}
      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium text-stone-500">Recommended Advisory Focus</p>
        <p className="mt-2 text-lg font-semibold text-stone-900">{recommendedFocus}</p>
        <p className="mt-2 text-sm text-stone-600">
          Generated from your current planning, shortlist, and timeline state.
        </p>
      </section>

      {/* Cross-Module Context */}
      <section className="grid gap-6 lg:grid-cols-4">
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-stone-500">Shortlisted Countries</p>
          <p className="mt-2 text-lg font-semibold text-stone-900">
            {shortlistedCountries.length > 0 ? shortlistedCountries.join(", ") : "No shortlist yet"}
          </p>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            {shortlistedCountries.length === 0 ? (
              <Link href="/portal/countries" className="text-stone-900 underline">
                Build shortlist →
              </Link>
            ) : (
              "Pulled from your saved country planning."
            )}
          </p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-stone-500">Timeline Completed</p>
          <p className="mt-2 text-3xl font-semibold text-stone-900">{completedCount}</p>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            {completedCount === 0 && timelineItems.length === 0 ? (
              <Link href="/portal/timeline" className="text-stone-900 underline">
                Generate timeline →
              </Link>
            ) : (
              "Completed milestones."
            )}
          </p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-stone-500">Timeline In Progress</p>
          <p className="mt-2 text-3xl font-semibold text-stone-900">{inProgressCount}</p>
          <p className="mt-2 text-sm leading-6 text-stone-600">Active planning items.</p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-stone-500">Timeline Upcoming</p>
          <p className="mt-2 text-3xl font-semibold text-stone-900">{upcomingCount}</p>
          <p className="mt-2 text-sm leading-6 text-stone-600">Remaining milestones.</p>
        </div>
      </section>

      {/* Advisory Settings Form */}
      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div>
          <h2 className="text-xl font-semibold text-stone-900">Advisory Settings</h2>
          <p className="mt-1 text-sm text-stone-600">
            Save your current advisory stage, preferred pathway, notes, and next action.
          </p>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-stone-700">
              Advisory Status
            </label>
            <select
              className="w-full rounded-xl border border-stone-300 px-3 py-2 text-sm text-stone-900"
              value={plan.advisory_status ?? "Not Started"}
              onChange={(e) => updatePlanField("advisory_status", e.target.value)}
            >
              {ADVISORY_STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-stone-700">
              Preferred Advisory Pathway
            </label>
            <select
              className="w-full rounded-xl border border-stone-300 px-3 py-2 text-sm text-stone-900"
              value={plan.advisory_pathway ?? "Undecided"}
              onChange={(e) => updatePlanField("advisory_pathway", e.target.value)}
            >
              {ADVISORY_PATHWAY_OPTIONS.map((pathway) => (
                <option key={pathway} value={pathway}>
                  {pathway}
                </option>
              ))}
            </select>
          </div>

          <div className="lg:col-span-2">
            <label className="mb-1 block text-sm font-medium text-stone-700">
              Advisory Notes
            </label>
            <textarea
              className="w-full rounded-xl border border-stone-300 px-3 py-2 text-sm text-stone-900"
              rows={4}
              value={plan.advisory_notes ?? ""}
              onChange={(e) => updatePlanField("advisory_notes", e.target.value)}
              placeholder="Add pathway questions, strategic concerns, legal or logistical issues, or case context for advisory review."
            />
          </div>

          <div className="lg:col-span-2">
            <label className="mb-1 block text-sm font-medium text-stone-700">
              Next Advisory Step
            </label>
            <input
              className="w-full rounded-xl border border-stone-300 px-3 py-2 text-sm text-stone-900"
              value={plan.advisory_next_step ?? ""}
              onChange={(e) => updatePlanField("advisory_next_step", e.target.value)}
              placeholder="Clarify pathway questions / Book strategy session / Compare shortlisted countries"
            />
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving || !hasUnsavedChanges}
            className="rounded-xl bg-stone-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Saving..." : hasUnsavedChanges ? "Save Advisory" : "Saved"}
          </button>

          {message ? (
            <p className={`text-sm ${isError ? "text-red-600" : "text-green-700"}`}>
              {message}
            </p>
          ) : (
            <p className="text-sm text-stone-500">
              {hasUnsavedChanges ? "Unsaved changes" : "All changes saved"}
            </p>
          )}
        </div>
      </section>

      {/* Advisory Pathways */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-stone-900">Advisory Pathways</h2>
          <p className="mt-1 text-sm text-stone-600">
            These cards reflect your saved advisory workspace context.
          </p>
        </div>

        <div className="space-y-4">
          {advisoryItems.map((item) => (
            <article
              key={item.title}
              className={`rounded-2xl border p-6 shadow-sm ${
                item.recommended
                  ? "border-stone-900 bg-stone-50"
                  : "border-stone-200 bg-white"
              }`}
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-lg font-semibold text-stone-900">
                      {item.title}
                    </h3>
                    <span className="rounded-full border border-stone-300 px-3 py-1 text-xs font-medium text-stone-700">
                      {item.status}
                    </span>
                    {item.recommended && (
                      <span className="rounded-full bg-stone-900 px-3 py-1 text-xs font-medium text-white">
                        Recommended
                      </span>
                    )}
                  </div>

                  <p className="mt-3 max-w-3xl text-sm leading-6 text-stone-600">
                    {item.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Planning Context Snapshot */}
      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-stone-900">Planning Context Snapshot</h2>
        <p className="mt-1 text-sm text-stone-600">
          This advisory layer is now informed by the rest of your portal workspace.
        </p>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
            <p className="text-sm font-medium text-stone-500">Pathway</p>
            <p className="mt-2 text-base font-semibold text-stone-900">
              {getDisplayValue(plan.pathway_type, "Not yet specified")}
            </p>
          </div>

          <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
            <p className="text-sm font-medium text-stone-500">Target Timeline</p>
            <p className="mt-2 text-base font-semibold text-stone-900">
              {getDisplayValue(plan.target_timeline, "Not yet defined")}
            </p>
          </div>

          <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
            <p className="text-sm font-medium text-stone-500">Budget Range</p>
            <p className="mt-2 text-base font-semibold text-stone-900">
              {getDisplayValue(plan.budget_range, "Not yet defined")}
            </p>
          </div>

          <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
            <p className="text-sm font-medium text-stone-500">Planning Notes</p>
            <p className="mt-2 text-base font-semibold text-stone-900">
              {getDisplayValue(plan.notes, "No planning notes saved yet")}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}