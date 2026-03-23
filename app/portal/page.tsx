"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { getCurrentUserPlan } from "@/lib/plans/user-plans";
import {
  EMPTY_USER_PLAN_INPUT,
  type UserPlanInput,
} from "@/types/plan";
import {
  calculateAdvisoryReadiness,
  determineExecutionStage,
  buildNextActionWithContext,
  generateAdvisorySignals,
  getTimelineCounts,
  getDisplayValue,
  type AdvisorySignal,
} from "@/lib/intelligence/plan-intelligence";
import { DashboardSkeleton } from "@/app/components/skeletons";

export const runtime = "edge";

// Stage badge component for institutional tone
function StageBadge({ stage }: { stage: string }) {
  const stageNum = {
    foundation: "01",
    shortlist: "02",
    sequencing: "03",
    "advisory-active": "04",
    completion: "05",
  }[stage] || "01";

  return (
    <span className="inline-flex items-center justify-center rounded-lg bg-stone-200 px-3 py-1.5 text-xs font-semibold tracking-wider text-stone-700">
      STAGE {stageNum}
    </span>
  );
}

// Priority badge with muted institutional colors
function PriorityBadge({ priority }: { priority: string }) {
  const styles = {
    critical: "bg-[#c4a7a7] text-[#5c3a3a]",
    high: "bg-[#d4c4a8] text-[#5c4a3a]",
    medium: "bg-[#e8e0d0] text-[#6a5a4a]",
    low: "bg-stone-200 text-stone-600",
  };

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${styles[priority as keyof typeof styles]}`}>
      {priority} Priority
    </span>
  );
}

export default function PortalDashboardPage() {
  const [plan, setPlan] = useState<UserPlanInput>(EMPTY_USER_PLAN_INPUT);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);

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
            advisory_stage: existing.advisory_stage ?? null,
            target_timeline: existing.target_timeline,
            budget_range: existing.budget_range,
            notes: existing.notes,
          });
        }
      } catch (error: unknown) {
        console.error(error);
        if (isMounted) {
          setIsError(true);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    void loadPlan();

    return () => {
      isMounted = false;
    };
  }, []);

  const timelineItems = useMemo(
    () => plan.timeline_items ?? [],
    [plan.timeline_items]
  );

  const timelineCounts = useMemo(
    () => getTimelineCounts(timelineItems),
    [timelineItems]
  );

  const advisoryReadiness = useMemo(
    () => calculateAdvisoryReadiness(plan, 0),
    [plan]
  );

  const advisorySignals = useMemo(
    () => generateAdvisorySignals(plan),
    [plan]
  );

  const executionStage = useMemo(
    () => determineExecutionStage(plan),
    [plan]
  );

  // NEW: Use enhanced next action with context
  const nextAction = useMemo(
    () => buildNextActionWithContext(plan),
    [plan]
  );

  const shortlistedCountries = plan.shortlisted_countries ?? [];

  // System Health Score
  const systemHealth = useMemo(() => {
    const hasPathway = !!plan.pathway_type?.trim();
    const hasCountries = (plan.shortlisted_countries ?? []).length > 0;
    const hasTimeline = (plan.timeline_items ?? []).length > 0;

    let score = 0;
    if (hasPathway) score += 33;
    if (hasCountries) score += 33;
    if (hasTimeline) score += 34;

    return score;
  }, [plan]);

  const blockingSignals = useMemo(
    () => advisorySignals.filter((s: AdvisorySignal) => s.type === "blocking"),
    [advisorySignals]
  );

  const attentionSignals = useMemo(
    () => advisorySignals.filter((s: AdvisorySignal) => s.type === "attention"),
    [advisorySignals]
  );

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
        <p className="text-red-800">Failed to load dashboard. Please refresh.</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* TIER 1: Executive Header */}
      <div className="rounded-2xl border border-stone-300 bg-stone-100 p-8 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-stone-500">
          Dashboard
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-stone-900">
          Planning Status
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-stone-600">
          Your fertility planning system at a glance. Track readiness, review
          signals, and navigate toward execution.
        </p>
      </div>

      {/* TIER 1: System Status */}
      <section className="rounded-2xl border border-stone-300 bg-stone-100 p-8 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium uppercase tracking-wider text-stone-500">
              System Status
            </p>
            <p className="mt-2 text-xl font-semibold text-stone-900">
              Your planning system is{" "}
              <span className="text-[#4a5a4a]">
                {systemHealth >= 70 ? "well structured" : "still developing"}
              </span>
            </p>
            <p className="mt-2 text-sm text-stone-600">
              Continue progressing through modules to move toward execution readiness.
            </p>
          </div>
          <div className="flex items-center gap-4 lg:border-l lg:border-stone-300 lg:pl-8">
            <div className="h-3 w-40 rounded-full bg-stone-200">
              <div
                className="h-3 rounded-full bg-[#4a5a4a]"
                style={{ width: `${systemHealth}%` }}
              />
            </div>
            <span className="text-sm font-semibold text-stone-700">
              {systemHealth}% health
            </span>
          </div>
        </div>
      </section>

      {/* TIER 1: Next Action with Full Context - THE DECISION ENGINE */}
      <section className="rounded-2xl border-2 border-[#3a3a3a] bg-stone-100 p-8 shadow-md">
        <div className="flex flex-col gap-6">
          {/* Header row */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <PriorityBadge priority={nextAction.priority} />
                <span className="text-sm font-medium text-stone-500 uppercase tracking-wider">
                  {nextAction.module}
                </span>
              </div>
              <h2 className="text-2xl font-semibold text-stone-900">
                {nextAction.title}
              </h2>
              <p className="mt-2 text-base text-stone-600">
                {nextAction.body}
              </p>
            </div>
            <Link
              href={nextAction.href}
              className="inline-flex rounded-xl bg-[#3a3a3a] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#2a2a2a] shrink-0"
            >
              {nextAction.cta}
            </Link>
          </div>

          {/* Explanation */}
          <div className="pt-6 border-t border-stone-300">
            <h3 className="text-sm font-semibold text-stone-700 uppercase tracking-wider mb-2">
              Why this matters
            </h3>
            <p className="text-base text-stone-600 leading-relaxed">
              {nextAction.explanation}
            </p>
          </div>

          {/* Stakes */}
          <div className="rounded-xl border border-[#c4a7a7] bg-[#faf6f6] p-5">
            <h3 className="text-sm font-semibold text-[#5c3a3a] uppercase tracking-wider mb-2">
              What&apos;s at stake
            </h3>
            <p className="text-base text-[#5c3a3a] leading-relaxed">
              {nextAction.stakes}
            </p>
          </div>

          {/* Unlocks */}
          <div className="pt-2">
            <h3 className="text-sm font-semibold text-[#4a5a4a] uppercase tracking-wider mb-3">
              Completing this unlocks
            </h3>
            <ul className="grid gap-2 lg:grid-cols-2">
              {nextAction.unlocks.map((unlock, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-stone-700">
                  <span className="text-[#6a7a6a] font-bold mt-0.5">→</span>
                  {unlock}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* TIER 1: Execution Risks */}
      {(blockingSignals.length > 0 || attentionSignals.length > 0) && (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-stone-900">
            Execution Risks
          </h2>
          <div className="space-y-3">
            {blockingSignals.map((signal, idx) => (
              <div
                key={`blocking-${idx}`}
                className="rounded-xl border border-[#c4a7a7] bg-[#faf6f6] p-5"
              >
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="font-medium text-[#5c3a3a]">{signal.message}</p>
                    {signal.action && (
                      <p className="mt-1 text-sm text-[#7a5a5a]">{signal.action}</p>
                    )}
                  </div>
                  {signal.link && (
                    <Link
                      href={signal.link}
                      className="text-sm font-medium text-[#5c3a3a] underline hover:text-[#3a2a2a] shrink-0"
                    >
                      Resolve →
                    </Link>
                  )}
                </div>
              </div>
            ))}
            {attentionSignals.map((signal, idx) => (
              <div
                key={`attention-${idx}`}
                className="rounded-xl border border-[#d4c4a8] bg-[#faf8f3] p-5"
              >
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="font-medium text-[#5c4a3a]">{signal.message}</p>
                    {signal.action && (
                      <p className="mt-1 text-sm text-[#7a6a5a]">{signal.action}</p>
                    )}
                  </div>
                  {signal.link && (
                    <Link
                      href={signal.link}
                      className="text-sm font-medium text-[#5c4a3a] underline hover:text-[#3a2a2a] shrink-0"
                    >
                      Address →
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TIER 1: Advisory Readiness */}
      <section className="rounded-2xl border border-stone-300 bg-stone-100 p-8 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-stone-500">
              Advisory Readiness
            </p>
            <p className="mt-1 text-sm text-stone-600">
              Planning maturity for meaningful advisory engagement
            </p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-4xl font-semibold text-stone-900">
                {advisoryReadiness.percentage}%
              </p>
              <p className="text-sm capitalize text-stone-500">
                {advisoryReadiness.stage} stage
              </p>
            </div>
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-stone-200">
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-full text-sm font-semibold ${
                  advisoryReadiness.stage === "optimal"
                    ? "bg-[#8a9a8a] text-white"
                    : advisoryReadiness.stage === "ready"
                    ? "bg-[#6a7a6a] text-white"
                    : advisoryReadiness.stage === "developing"
                    ? "bg-[#d4c4a8] text-[#5c4a3a]"
                    : "bg-stone-300 text-stone-600"
                }`}
              >
                {advisoryReadiness.score}/{advisoryReadiness.maxScore}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 h-2.5 w-full rounded-full bg-stone-200">
          <div
            className={`h-2.5 rounded-full transition-all ${
              advisoryReadiness.stage === "optimal"
                ? "bg-[#8a9a8a]"
                : advisoryReadiness.stage === "ready"
                ? "bg-[#6a7a6a]"
                : advisoryReadiness.stage === "developing"
                ? "bg-[#d4c4a8]"
                : "bg-stone-400"
            }`}
            style={{ width: `${advisoryReadiness.percentage}%` }}
          />
        </div>
      </section>

      {/* TIER 2: Execution Stage */}
      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-stone-100">
            <StageBadge stage={executionStage.stage} />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-stone-900">
              <span className="capitalize">
                {executionStage.stage.replace("-", " ")}
              </span>
            </h2>
            <p className="mt-1 text-sm text-stone-600">
              {executionStage.description}
            </p>
          </div>
        </div>
      </section>

      {/* TIER 2: Quick Stats */}
      <section className="grid gap-6 lg:grid-cols-4">
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm lg:col-span-2">
          <p className="text-sm font-medium text-stone-500">Timeline Progress</p>
          <div className="mt-4 flex items-baseline gap-3">
            <p className="text-4xl font-semibold text-stone-900">
              {timelineCounts.completed}
            </p>
            <span className="text-2xl text-stone-400">/</span>
            <p className="text-2xl font-medium text-stone-500">
              {timelineCounts.total}
            </p>
          </div>
          <p className="mt-3 text-sm text-stone-600">
            {timelineCounts.total === 0 ? (
              <Link href="/portal/timeline" className="text-stone-900 underline">
                Generate timeline →
              </Link>
            ) : (
              `${timelineCounts.inProgress} in progress • ${timelineCounts.upcoming} upcoming`
            )}
          </p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-stone-500">Pathway</p>
          <p className="mt-3 text-lg font-semibold text-stone-900">
            {getDisplayValue(plan.pathway_type, "Not defined")}
          </p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-stone-500">Shortlisted</p>
          <p className="mt-3 text-lg font-semibold text-stone-900">
            {shortlistedCountries.length > 0
              ? `${shortlistedCountries.length} countries`
              : "None"}
          </p>
          {shortlistedCountries.length === 0 && (
            <p className="mt-2 text-sm text-stone-600">
              <Link href="/portal/countries" className="text-stone-900 underline">
                Build shortlist →
              </Link>
            </p>
          )}
        </div>
      </section>

      {/* TIER 3: Advisory Snapshot */}
      <section className="rounded-2xl border border-stone-200 bg-stone-50 p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-medium text-stone-500">Advisory Status</p>
            <p className="mt-1 text-lg font-semibold text-stone-900">
              {plan.advisory_status || "Not Started"}
            </p>
            <p className="mt-1 text-sm text-stone-600">
              {plan.advisory_pathway && plan.advisory_pathway !== "Undecided"
                ? `Pathway: ${plan.advisory_pathway}`
                : "No pathway selected"}
            </p>
          </div>
          <Link
            href="/portal/advisory"
            className="inline-flex shrink-0 rounded-xl bg-[#3a3a3a] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#2a2a2a]"
          >
            Manage Advisory →
          </Link>
        </div>
      </section>
    </div>
  );
}