"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { getCurrentUserPlan } from "@/lib/plans/user-plans";
import {
  EMPTY_USER_PLAN_INPUT,
  type UserPlanInput,
} from "@/types/plan";
import {
  getPortalIntelligence,
} from "@/lib/intelligence/portal-intelligence";
import { DashboardSkeleton } from "@/app/components/skeletons";

export const runtime = "edge";

// === UTILITY COMPONENTS ===

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

function PriorityBadge({ priority }: { priority: string }) {
  const styles = {
    critical: "bg-[#c4a7a7] text-[#5c3a3a] border border-[#b39393]",
    high: "bg-[#d4c4a8] text-[#5c4a3a] border border-[#c4b498]",
    medium: "bg-[#e8e0d0] text-[#6a5a4a] border border-[#d8d0c0]",
    low: "bg-stone-200 text-stone-600",
  };

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${styles[priority as keyof typeof styles]}`}>
      {priority} Priority
    </span>
  );
}

// === GUIDED FLOW COMPONENTS ===

interface FlowStep {
  id: string;
  number: number;
  title: string;
  module: "my-plan" | "countries" | "timeline" | "documents" | "advisory";
  status: "complete" | "active" | "locked";
  directive: string;
  whyMatters: string;
  statusLabel: string;
  systemInsight: string;
  riskIfDelayed?: string;
  estimatedEffort?: string;
  cta?: { label: string; href: string; variant: "primary" | "secondary" };
  unlocks?: string[];
  isLocked?: boolean;
  lockReason?: string;
}

function GuidedFlowStep({
  step,
  isLast,
}: {
  step: FlowStep;
  isLast: boolean;
}) {
  const statusStyles = {
    complete: {
      circle: "bg-[#6a7a6a] text-white",
      line: "bg-[#6a7a6a]",
      title: "text-stone-500",
      bg: "bg-stone-50",
      border: "border-stone-200",
    },
    active: {
      circle: "bg-[#3a3a3a] text-white ring-4 ring-[#3a3a3a]/20",
      line: "bg-stone-300",
      title: "text-stone-900",
      bg: "bg-white",
      border: "border-2 border-[#3a3a3a]",
    },
    locked: {
      circle: "bg-stone-200 text-stone-400",
      line: "bg-stone-200",
      title: "text-stone-400",
      bg: "bg-stone-50",
      border: "border-stone-200 border-dashed",
    },
  };

  const style = statusStyles[step.status];

  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${style.circle}`}>
          {step.status === "complete" ? "✓" : step.number}
        </div>
        {!isLast && <div className={`mt-2 w-0.5 flex-1 ${style.line}`} />}
      </div>

      <div className={`flex-1 rounded-xl border p-5 ${style.bg} ${style.border}`}>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className={`text-lg font-semibold ${style.title}`}>
                {step.title}
              </h3>
              {step.status === "active" && (
                <span className="rounded-full bg-[#c4a7a7] px-2 py-0.5 text-xs font-bold text-[#5c3a3a]">
                  {step.statusLabel}
                </span>
              )}
              {step.status === "locked" && (
                <span className="rounded-full bg-stone-200 px-2 py-0.5 text-xs font-medium text-stone-500">
                  LOCKED
                </span>
              )}
            </div>

            <p className={`text-base font-medium ${step.status === "active" ? "text-stone-900" : "text-stone-600"}`}>
              {step.directive}
            </p>

            <div className="mt-3 rounded-lg bg-stone-50 border border-stone-200 p-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">
                System Insight
              </p>
              <p className="text-sm text-stone-600">{step.systemInsight}</p>
            </div>

            {step.riskIfDelayed && step.status !== "complete" && (
              <div className="mt-3 rounded-lg bg-[#faf6f6] border border-[#e8d8d8] px-3 py-2">
                <p className="text-xs font-bold text-[#8a6a6a] uppercase tracking-wider">
                  Risk if delayed
                </p>
                <p className="text-sm text-[#6a4a4a] mt-1">{step.riskIfDelayed}</p>
              </div>
            )}

            {step.estimatedEffort && step.status === "active" && (
              <p className="mt-3 text-xs text-stone-500">
                Estimated effort: {step.estimatedEffort}
              </p>
            )}

            {step.unlocks && step.unlocks.length > 0 && step.status !== "complete" && (
              <div className="mt-4">
                <p className="text-xs font-bold uppercase tracking-wider text-[#4a5a4a] mb-2">
                  ✓ Unlocks
                </p>
                <div className="flex flex-wrap gap-2">
                  {step.unlocks.map((unlock, idx) => (
                    <span key={idx} className="inline-flex items-center rounded-md bg-[#f0f4f0] px-2 py-1 text-xs font-medium text-[#4a5a4a]">
                      {unlock}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {step.cta && step.status !== "complete" && (
            <Link
              href={step.cta.href}
              className={`mt-4 inline-flex shrink-0 items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition lg:mt-0 ${
                step.cta.variant === "primary"
                  ? "bg-[#3a3a3a] text-white hover:bg-[#2a2a2a] shadow-lg shadow-stone-900/20"
                  : "border-2 border-stone-300 text-stone-600 hover:border-stone-400 hover:bg-stone-50"
              } ${step.status === "locked" ? "opacity-50 pointer-events-none" : ""}`}
            >
              {step.cta.label} →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

// === READINESS BREAKDOWN ===

interface ReadinessItem {
  label: string;
  complete: boolean;
  points: number;
}

function ReadinessBreakdown({ 
  items,
  total,
}: { 
  items: ReadinessItem[];
  total: number;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-stone-400 uppercase tracking-wider">Advisory Readiness</span>
        <span className="text-3xl font-bold text-white">{Math.round(total)}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-stone-700">
        <div 
          className="h-2 rounded-full bg-[#6a7a6a] transition-all duration-500"
          style={{ width: `${total}%` }}
        />
      </div>
      <div className="space-y-2 text-sm">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`h-2 w-2 rounded-full ${item.complete ? "bg-[#6a7a6a]" : "bg-stone-600"}`} />
              <span className={item.complete ? "text-stone-300" : "text-stone-500"}>
                {item.label}
              </span>
            </div>
            <span className={item.complete ? "text-stone-300 text-xs" : "text-stone-600 text-xs"}>
              {item.complete ? "Complete" : "Not started"}
            </span>
          </div>
        ))}
      </div>
      {total < 70 && (
        <p className="text-xs text-stone-400 mt-2 pt-2 border-t border-stone-700">
          Threshold for optimal advisory: 70%
        </p>
      )}
    </div>
  );
}

// === MAIN DASHBOARD ===

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
            primary_country: existing.primary_country ?? null,
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
        if (isMounted) setIsError(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    void loadPlan();
    return () => { isMounted = false; };
  }, []);

  // SINGLE SOURCE OF TRUTH - Portal Intelligence
  const intelligence = useMemo(() => getPortalIntelligence(plan, 0), [plan]);

  // Destructure for clean access
  const {
    stage,
    executionStatus,
    primaryBlocker,
    flowSteps,
    nextAction,
    readiness,
    signals,
    advisoryReadiness,
    executionStage,
    flags,
  } = intelligence;

  // Build readiness items for display from split readiness
  const readinessItems: ReadinessItem[] = [
    { label: "Planning foundation", complete: readiness.planning >= 70, points: 25 },
    { label: "Execution readiness", complete: readiness.execution >= 70, points: 25 },
    { label: "Advisory readiness", complete: readiness.advisory >= 70, points: 25 },
    { label: "Overall progress", complete: readiness.overall >= 70, points: 25 },
  ];

  const readinessTotal = readiness.overall;

  if (loading) return <DashboardSkeleton />;
  if (isError) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
        <p className="text-red-800">Failed to load dashboard. Please refresh.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* === 1. COMMAND HEADER (HERO) === */}
      <div className="rounded-2xl border-2 border-[#3a3a3a] bg-[#3a3a3a] p-8 text-white shadow-xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-stone-400">
              FertilityCareHub Planning System
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">
              {stage === "planning" ? "Planning Phase — Foundation Required" :
               stage === "decision" ? "Decision Phase — Commit to Execute" :
               stage === "execution" ? "Execution Phase — Active Progress" :
               "Planning Complete"}
            </h1>
            <p className="mt-3 max-w-2xl text-stone-300 leading-relaxed">
              {primaryBlocker 
                ? `Execution blocked: ${primaryBlocker.replace(/_/g, " ")}. Complete this step to proceed.`
                : "Complete required steps to unlock execution, reduce delays, and move toward treatment with precision."}
            </p>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${flags.hasPathway ? "bg-[#6a7a6a]" : "bg-stone-600"}`} />
                <span className={flags.hasPathway ? "text-stone-300" : "text-stone-500"}>
                  Pathway {flags.hasPathway ? "defined" : "not defined"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${flags.hasPrimaryCountry ? "bg-[#6a7a6a]" : flags.hasCountries ? "bg-[#d4c4a8]" : "bg-stone-600"}`} />
                <span className={flags.hasPrimaryCountry ? "text-stone-300" : flags.hasCountries ? "text-[#d4c4a8]" : "text-stone-500"}>
                  {flags.hasPrimaryCountry 
                    ? `Primary: ${plan.primary_country}` 
                    : flags.hasCountries 
                      ? `${flags.countryCount} shortlisted — decision needed` 
                      : "No countries selected"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${flags.hasTimeline ? "bg-[#6a7a6a]" : flags.hasPrimaryCountry ? "bg-[#c4a7a7]" : "bg-stone-600"}`} />
                <span className={flags.hasTimeline ? "text-stone-300" : flags.hasPrimaryCountry ? "text-[#c4a7a7]" : "text-stone-500"}>
                  Timeline {flags.hasTimeline ? "initiated" : flags.hasPrimaryCountry ? "not started (blocking)" : "locked"}
                </span>
              </div>
            </div>
          </div>
          <div className="lg:border-l lg:border-stone-600 lg:pl-8 lg:min-w-[280px]">
            <ReadinessBreakdown 
              items={readinessItems}
              total={readinessTotal}
            />
          </div>
        </div>
      </div>

      {/* === 2. NEXT ACTION (PRIMARY DRIVER) === */}
      <section className="rounded-2xl border-2 border-[#c4a7a7] bg-white p-8 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-[#c4a7a7]" />

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <PriorityBadge priority={nextAction.type} />
                <span className="text-sm font-bold text-[#c4a7a7] uppercase tracking-wider">
                  {nextAction.label}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-stone-900">
                {nextAction.title}
              </h2>
              <p className="mt-2 text-lg text-stone-700 font-medium">
                {nextAction.body}
              </p>
            </div>
            <Link
              href={nextAction.href}
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#3a3a3a] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#2a2a2a] shadow-lg shadow-stone-900/20"
            >
              {nextAction.cta} →
            </Link>
          </div>

          <div className="grid gap-4 lg:grid-cols-3 pt-6 border-t border-stone-200">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                Why this matters
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                {nextAction.explanation}
              </p>
            </div>
            <div className="rounded-lg bg-[#faf6f6] border border-[#e8d8d8] p-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#8a6a6a] mb-2">
                If ignored
              </h3>
              <p className="text-sm text-[#6a4a4a] leading-relaxed">
                {nextAction.stakes}
              </p>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#4a5a4a] mb-2">
                This will unlock
              </h3>
              <ul className="space-y-1">
                {nextAction.unlocks.map((unlock, idx) => (
                  <li key={idx} className="text-sm text-stone-700 flex items-center gap-2">
                    <span className="text-[#6a7a6a]">✓</span>
                    {unlock}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* === 3. EXECUTION PATH (GUIDED FLOW) === */}
      <section className="rounded-2xl border border-stone-300 bg-white p-8 shadow-sm">
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-wider text-stone-500">
            Execution Path
          </p>
          <h2 className="mt-2 text-2xl font-bold text-stone-900">
            Step-by-Step Execution Path
          </h2>
          <p className="mt-2 text-stone-600">
            Complete each required step to unlock the next phase. Dependencies enforce proper sequencing.
          </p>
          {primaryBlocker && (
            <p className="mt-2 text-sm font-medium text-[#c4a7a7]">
              ⚠ Current blocker: {primaryBlocker.replace(/_/g, " ")}
            </p>
          )}
        </div>
        <div className="space-y-6">
          {flowSteps.map((step, idx) => (
            <GuidedFlowStep 
              key={step.id} 
              step={step as FlowStep} 
              isLast={idx === flowSteps.length - 1} 
            />
          ))}
        </div>
      </section>

      {/* === 4. SYSTEM SIGNALS (BLOCKERS) === */}
      {(signals.blockers.length > 0 || signals.risks.length > 0 || signals.insights.length > 0) && (
        <section className="rounded-2xl border border-stone-300 bg-white p-8 shadow-sm">
          <h2 className="text-lg font-bold text-stone-900 mb-6 flex items-center gap-2">
            <span className="text-[#c4a7a7]">⚠</span> System Signals
          </h2>
          <div className="space-y-4">
            {signals.blockers.map((signal) => (
              <div key={signal.id} className="flex gap-3 items-start">
                <span className="text-[#c4a7a7] font-bold">⚠</span>
                <div className="flex-1">
                  <p className="font-medium text-stone-900">{signal.message}</p>
                  <p className="text-sm text-stone-600">→ {signal.resolution}</p>
                </div>
                <Link 
                  href={signal.href} 
                  className="text-sm font-bold text-[#5c3a3a] underline hover:text-[#3a2a2a] shrink-0"
                >
                  Resolve →
                </Link>
              </div>
            ))}
            {signals.risks.map((risk) => (
              <div key={risk.id} className="flex gap-3 items-start">
                <span className="text-[#d4c4a8] font-bold">⚠</span>
                <div>
                  <p className="font-medium text-stone-900">{risk.message}</p>
                  <p className="text-sm text-stone-600">→ Mitigation: {risk.mitigation}</p>
                </div>
              </div>
            ))}
            {signals.insights.map((insight) => (
              <div key={insight.id} className="flex gap-3 items-start">
                <span className="text-[#6a7a6a] font-bold">✓</span>
                <div>
                  <p className="font-medium text-stone-900">{insight.message}</p>
                </div>
              </div>
            ))}
            <div className="mt-4 pt-4 border-t border-stone-200">
              <p className="text-sm font-bold text-stone-900">
                System stage: <span className="text-[#4a5a4a] capitalize">{stage}</span> | 
                Execution status: <span className={executionStatus === "blocked" ? "text-[#c4a7a7]" : "text-[#6a7a6a]"}>{executionStatus}</span>
              </p>
            </div>
          </div>
        </section>
      )}

      {/* === 5. ADVISORY READINESS === */}
      <section className="rounded-2xl border border-stone-300 bg-stone-100 p-8 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex-1">
            <p className="text-sm font-bold uppercase tracking-wider text-stone-500">
              Readiness Breakdown
            </p>
            <p className="mt-1 text-sm text-stone-600">
              Planning: {readiness.planning}% | Execution: {readiness.execution}% | Advisory: {readiness.advisory}%
            </p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <span className={flags.hasPathway ? "text-[#6a7a6a]" : "text-stone-400"}>✓</span>
                  <span className={flags.hasPathway ? "text-stone-700" : "text-stone-400"}>Pathway clarity</span>
                </span>
                <span className={flags.hasPathway ? "text-[#6a7a6a] text-xs" : "text-stone-400 text-xs"}>
                  {flags.hasPathway ? "Complete" : "Not started"}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <span className={flags.hasPrimaryCountry ? "text-[#6a7a6a]" : flags.hasCountries ? "text-[#d4c4a8]" : "text-stone-400"}>✓</span>
                  <span className={flags.hasPrimaryCountry ? "text-stone-700" : flags.hasCountries ? "text-[#5c4a3a]" : "text-stone-400"}>
                    {flags.hasPrimaryCountry ? "Primary country committed" : flags.hasCountries ? "Shortlisted only" : "Country selection"}
                  </span>
                </span>
                <span className={flags.hasPrimaryCountry ? "text-[#6a7a6a] text-xs" : flags.hasCountries ? "text-[#d4c4a8] text-xs" : "text-stone-400 text-xs"}>
                  {flags.hasPrimaryCountry ? "Committed" : flags.hasCountries ? "Decision needed" : "Not started"}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <span className={flags.hasTimeline ? "text-[#6a7a6a]" : "text-[#c4a7a7]"}>{flags.hasTimeline ? "✓" : "✗"}</span>
                  <span className={flags.hasTimeline ? "text-stone-700" : "text-stone-500"}>Timeline readiness</span>
                </span>
                <span className={flags.hasTimeline ? "text-[#6a7a6a] text-xs" : "text-[#c4a7a7] text-xs"}>
                  {flags.hasTimeline ? `${flags.timelineProgress}% complete` : "Not started"}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <span className={flags.timelineComplete ? "text-[#6a7a6a]" : flags.hasTimeline ? "text-[#d4c4a8]" : "text-[#c4a7a7]"}>
                    {flags.timelineComplete ? "✓" : flags.hasTimeline ? "◐" : "✗"}
                  </span>
                  <span className={flags.timelineComplete ? "text-stone-700" : flags.hasTimeline ? "text-[#5c4a3a]" : "text-stone-500"}>
                    Execution readiness
                  </span>
                </span>
                <span className={flags.timelineComplete ? "text-[#6a7a6a] text-xs" : flags.hasTimeline ? "text-[#d4c4a8] text-xs" : "text-[#c4a7a7] text-xs"}>
                  {flags.timelineComplete ? "Ready" : flags.hasTimeline ? "In progress" : "Blocked"}
                </span>
              </div>
            </div>
            {readinessTotal < 70 && (
              <p className="mt-4 text-sm text-[#8a6a6a]">
                System Recommendation: {primaryBlocker 
                  ? `Resolve ${primaryBlocker.replace(/_/g, " ")} to unlock execution.`
                  : "Complete timeline setup before entering advisory to maximize value."}
              </p>
            )}
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className={`text-4xl font-bold ${readinessTotal >= 70 ? "text-[#4a5a4a]" : "text-stone-900"}`}>
                {readinessTotal}%
              </p>
              <p className="text-sm font-bold uppercase text-stone-500">
                {advisoryReadiness.stage} stage
              </p>
            </div>
            <div className={`flex h-20 w-20 items-center justify-center rounded-full border-4 ${
              readinessTotal >= 70 ? "border-[#6a7a6a]" : "border-stone-300"
            }`}>
              <div className={`flex h-14 w-14 items-center justify-center rounded-full text-sm font-bold ${
                advisoryReadiness.stage === "optimal" ? "bg-[#8a9a8a] text-white" :
                advisoryReadiness.stage === "ready" ? "bg-[#6a7a6a] text-white" :
                advisoryReadiness.stage === "developing" ? "bg-[#d4c4a8] text-[#5c4a3a]" :
                "bg-stone-300 text-stone-600"
              }`}>
                {advisoryReadiness.score}/{advisoryReadiness.maxScore}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-stone-600">Progress to advisory eligibility</span>
            <span className="font-bold text-stone-900">{readinessTotal}% / 70% required</span>
          </div>
          <div className="h-3 w-full rounded-full bg-stone-200">
            <div className={`h-3 rounded-full transition-all ${
              advisoryReadiness.stage === "optimal" ? "bg-[#8a9a8a]" :
              advisoryReadiness.stage === "ready" ? "bg-[#6a7a6a]" :
              advisoryReadiness.stage === "developing" ? "bg-[#d4c4a8]" :
              "bg-stone-400"
            }`} style={{ width: `${readinessTotal}%` }} />
          </div>
          <p className="mt-3 text-xs text-stone-500">
            Threshold for optimal advisory: 70%
          </p>
        </div>
      </section>

      {/* === 6. METRICS (LIGHT) === */}
      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-bold text-stone-500 uppercase tracking-wider">Execution Progress</p>
          <div className="mt-4">
            <p className="text-4xl font-bold text-stone-900">{flags.timelineProgress}%</p>
          </div>
          <p className="mt-3 text-sm text-stone-600">
            {flags.hasTimeline ? (
              <span>{advisoryReadiness.ready.length} ready • {advisoryReadiness.missing.length} pending</span>
            ) : (
              <span className="text-[#8a6a6a] font-medium">Not initiated</span>
            )}
          </p>
          {!flags.hasTimeline && (
            <p className="mt-2 text-xs text-[#8a6a6a]">Blocking: All execution phases</p>
          )}
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-bold text-stone-500 uppercase tracking-wider">System Stage</p>
          <p className="mt-3 text-lg font-bold text-stone-900 capitalize">
            {stage}
          </p>
          <p className="mt-2 text-xs text-stone-500">
            {executionStatus === "blocked" ? "Resolve blockers to proceed" : 
             executionStatus === "ready" ? "Ready to begin execution" :
             executionStatus === "active" ? "Execution in progress" : "Complete"}
          </p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-bold text-stone-500 uppercase tracking-wider">Country Status</p>
          <p className="mt-3 text-lg font-bold text-stone-900">
            {flags.hasPrimaryCountry 
              ? plan.primary_country 
              : flags.hasCountries 
                ? `${flags.countryCount} shortlisted` 
                : "None"}
          </p>
          {flags.hasPrimaryCountry ? (
            <p className="mt-2 text-xs text-[#6a7a6a]">Primary committed — execution authorized</p>
          ) : flags.hasCountries ? (
            <p className="mt-2 text-xs text-[#d4c4a8]">Selection needed to unlock timeline</p>
          ) : (
            <p className="mt-2 text-xs text-stone-400">Start with country research</p>
          )}
        </div>
      </section>

      {/* === 7. SUPPORTING (STAGE / STATUS) === */}
      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-stone-100">
            <StageBadge stage={executionStage.stage} />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-stone-900">
              {stage === "planning" ? "Stage 01 — Foundation Building" :
               stage === "decision" ? "Stage 02 — Decision & Commitment" :
               stage === "execution" ? "Stage 03 — Active Execution" :
               "Stage 04 — Completion"}
            </h2>
            <p className="mt-1 text-sm text-stone-600">
              <span className="font-medium">Current focus:</span> {
                stage === "planning" ? "Define pathway and explore options" :
                stage === "decision" ? "Commit to primary jurisdiction and generate timeline" :
                stage === "execution" ? "Progress through timeline and validate with advisory" :
                "Maintain execution momentum and track milestones"
              }
            </p>
            <p className="mt-2 text-sm text-stone-600">
              <span className="font-medium">Execution status:</span> <span className={executionStatus === "blocked" ? "text-[#c4a7a7] font-medium" : "text-[#6a7a6a] font-medium"}>{executionStatus}</span>
              {primaryBlocker && <span className="text-stone-500"> — {primaryBlocker.replace(/_/g, " ")}</span>}
            </p>
          </div>
        </div>
      </section>

      {/* === ADVISORY CTA (UPGRADED) === */}
      <section className="rounded-2xl border border-stone-200 bg-stone-50 p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-bold text-stone-500 uppercase tracking-wider">Advisory Status</p>
            <p className="mt-1 text-lg font-bold text-stone-900">
              {flags.advisoryReady ? "Ready for validation" : flags.timelineComplete ? "Ready for validation" : "Complete timeline first"}
            </p>
            <p className="mt-1 text-sm text-stone-600">
              {flags.advisoryReady 
                ? "Ensure jurisdiction, legal pathway, and clinic strategy are correct before execution."
                : primaryBlocker
                  ? `Blocked: ${primaryBlocker.replace(/_/g, " ")}`
                  : `Complete ${70 - readinessTotal}% more to unlock advisory eligibility`}
            </p>
          </div>
          <Link
            href="/portal/advisory"
            className={`inline-flex shrink-0 rounded-xl px-4 py-2 text-sm font-bold transition ${
              flags.advisoryReady || flags.timelineComplete
                ? "bg-[#3a3a3a] text-white hover:bg-[#2a2a2a]"
                : "border-2 border-stone-300 text-stone-400 cursor-not-allowed"
            }`}
          >
            {flags.advisoryReady || flags.timelineComplete ? "Validate Your Strategy →" : "Locked"}
          </Link>
        </div>
      </section>

    </div>
  );
}