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
  buildSmartNextStep,
  generateAdvisorySignals,
  getGlobalNextAction,
  getTimelineCounts,
  getDisplayValue,
  type AdvisorySignal,
} from "@/lib/intelligence/plan-intelligence";
import { DashboardSkeleton } from "@/app/components/skeletons";

export const runtime = "edge";

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

  const smartNextStep = useMemo(
    () => buildSmartNextStep(plan),
    [plan]
  );

  const globalNextAction = useMemo(
    () => getGlobalNextAction(plan, advisoryReadiness.score),
    [plan, advisoryReadiness.score]
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

  // Execution Risk Detection
  const riskSignals = useMemo(() => {
    const risks: string[] = [];

    if (!plan.pathway_type) {
      risks.push("No defined pathway — planning cannot proceed.");
    }

    if ((plan.shortlisted_countries ?? []).length === 0) {
      risks.push("No shortlisted countries — decision layer incomplete.");
    }

    if ((plan.timeline_items ?? []).length === 0) {
      risks.push("No execution timeline — no structured plan exists.");
    }

    return risks;
  }, [plan]);

  const blockingSignals = useMemo(
    () => advisorySignals.filter((s: AdvisorySignal) => s.type === "blocking"),
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
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-stone-500">
          Dashboard
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900">
          System Overview
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-stone-600">
          Your fertility planning system at a glance. Track readiness, review
          signals, and navigate toward execution.
        </p>
      </div>

      {/* System Overview */}
      <section className="rounded-2xl border border-stone-200 bg-stone-50 p-6 shadow-sm">
        <p className="text-sm font-medium text-stone-500">System Status</p>
        <p className="mt-1 text-lg font-semibold text-stone-900">
          Your planning system is{" "}
          {systemHealth >= 70 ? "well structured" : "still developing"}
        </p>
        <p className="mt-1 text-sm text-stone-600">
          Continue progressing through modules to move toward execution
          readiness.
        </p>
        <div className="mt-4 flex items-center gap-2">
          <div className="h-2 w-32 rounded-full bg-stone-200">
            <div
              className="h-2 rounded-full bg-stone-900"
              style={{ width: `${systemHealth}%` }}
            />
          </div>
          <span className="text-sm font-medium text-stone-700">
            {systemHealth}% health
          </span>
        </div>
      </section>

      {/* Global Next Action */}
      {globalNextAction.href !== "/portal" && (
        <section className="rounded-2xl border border-stone-200 bg-stone-50 p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-medium text-stone-500">
                Current Priority
              </p>
              <p className="mt-1 text-lg font-semibold text-stone-900">
                {globalNextAction.title}
              </p>
              <p className="mt-1 text-sm text-stone-600">
                {globalNextAction.body}
              </p>
            </div>
            <Link
              href={globalNextAction.href}
              className="inline-flex shrink-0 rounded-xl bg-stone-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-stone-800"
            >
              {globalNextAction.cta}
            </Link>
          </div>
        </section>
      )}

      {/* Execution Risks */}
      {riskSignals.length > 0 && (
        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-stone-900">
            Execution Risks
          </h2>
          {riskSignals.map((risk, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-red-200 bg-red-50 p-4"
            >
              <p className="text-sm text-red-800">{risk}</p>
            </div>
          ))}
        </section>
      )}

      {/* Advisory Readiness */}
      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-stone-900">
              Advisory Readiness
            </h2>
            <p className="mt-1 text-sm text-stone-600">
              Planning maturity for meaningful advisory engagement
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-3xl font-semibold text-stone-900">
                {advisoryReadiness.percentage}%
              </p>
              <p className="text-sm capitalize text-stone-500">
                {advisoryReadiness.stage} stage
              </p>
            </div>
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-stone-100">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full text-xs font-medium ${
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

      {/* Blocking Signals */}
      {blockingSignals.length > 0 && (
        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-stone-900">
            Action Required
          </h2>
          {blockingSignals.map((signal, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-red-200 bg-red-50 p-4"
            >
              <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="font-medium text-red-900">{signal.message}</p>
                  {signal.action && (
                    <p className="mt-1 text-sm text-red-700">{signal.action}</p>
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
              Execution Stage:{" "}
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

      {/* Smart Next Step */}
      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-medium text-stone-500">Smart Next Step</p>
            <p className="mt-1 text-lg font-semibold text-stone-900">
              {smartNextStep.step}
            </p>
            <p className="mt-1 text-sm text-stone-600">
              {smartNextStep.context}
            </p>
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

      {/* Quick Stats Grid */}
      <section className="grid gap-6 lg:grid-cols-4">
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-stone-500">Pathway</p>
          <p className="mt-2 text-lg font-semibold text-stone-900">
            {getDisplayValue(plan.pathway_type, "Not defined")}
          </p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-stone-500">
            Shortlisted Countries
          </p>
          <p className="mt-2 text-lg font-semibold text-stone-900">
            {shortlistedCountries.length > 0
              ? shortlistedCountries.length
              : "None"}
          </p>
          <p className="mt-2 text-sm text-stone-600">
            {shortlistedCountries.length === 0 ? (
              <Link href="/portal/countries" className="text-stone-900 underline">
                Build shortlist →
              </Link>
            ) : (
              shortlistedCountries.join(", ")
            )}
          </p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-stone-500">
            Timeline Progress
          </p>
          <p className="mt-2 text-3xl font-semibold text-stone-900">
            {timelineCounts.completed}/{timelineCounts.total}
          </p>
          <p className="mt-2 text-sm text-stone-600">
            {timelineCounts.total === 0 ? (
              <Link href="/portal/timeline" className="text-stone-900 underline">
                Generate timeline →
              </Link>
            ) : (
              `${timelineCounts.inProgress} in progress`
            )}
          </p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-stone-500">Target Timeline</p>
          <p className="mt-2 text-lg font-semibold text-stone-900">
            {getDisplayValue(plan.target_timeline, "Not set")}
          </p>
        </div>
      </section>

      {/* Advisory Snapshot Card */}
      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
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
            className="inline-flex shrink-0 rounded-xl bg-stone-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-stone-800"
          >
            Manage Advisory →
          </Link>
        </div>
        {plan.advisory_next_step && (
          <div className="mt-4 rounded-xl bg-stone-50 p-3">
            <p className="text-sm text-stone-600">
              <span className="font-medium">Next step:</span>{" "}
              {plan.advisory_next_step}
            </p>
          </div>
        )}
      </section>
    </div>
  );
}