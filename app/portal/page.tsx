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
  type PortalIntelligence,
} from "@/lib/intelligence/portal-intelligence";
import { DashboardSkeleton } from "@/app/components/skeletons";

export const runtime = "edge";

// === TYPES ===

type StepStatus = "complete" | "active" | "locked";

type PriorityLevel = "critical" | "high" | "medium" | "low";

// === UTILITY COMPONENTS ===

function StageBadge({ stage }: { stage: string }) {
  const stageNum: Record<string, string> = {
    foundation: "01",
    shortlist: "02",
    sequencing: "03",
    "advisory-active": "04",
    completion: "05",
  };

  return (
    <span className="inline-flex items-center justify-center rounded-lg bg-stone-200 px-3 py-1.5 text-xs font-semibold tracking-wider text-stone-700">
      STAGE {stageNum[stage] ?? "01"}
    </span>
  );
}

function PriorityBadge({ priority }: { priority: PriorityLevel }) {
  const styles: Record<PriorityLevel, string> = {
    critical: "bg-[#c4a7a7] text-[#5c3a3a] border border-[#b39393]",
    high: "bg-[#d4c4a8] text-[#5c4a3a] border border-[#c4b498]",
    medium: "bg-[#e8e0d0] text-[#6a5a4a] border border-[#d8d0c0]",
    low: "bg-stone-200 text-stone-600",
  };

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${styles[priority]}`}>
      {priority} Priority
    </span>
  );
}

function StatusDot({ status }: { status: "complete" | "active" | "pending" | "blocked" }) {
  const styles = {
    complete: "bg-[#6a7a6a]",
    active: "bg-[#3a3a3a] animate-pulse",
    pending: "bg-stone-300",
    blocked: "bg-[#c4a7a7]",
  };

  return <div className={`h-2 w-2 rounded-full ${styles[status]}`} />;
}

// === PREMIUM: EXECUTIVE SUMMARY COMPONENT ===

function ExecutiveSummary({
  stage,
  primaryBlocker,
  readinessTotal,
  flags,
}: {
  stage: PortalIntelligence["stage"];
  primaryBlocker: PortalIntelligence["primaryBlocker"];
  readinessTotal: number;
  flags: PortalIntelligence["flags"];
}) {
  // PREMIUM: Audit-aligned strategic interpretation
  const getStrategicInterpretation = () => {
    if (stage === "planning" && !flags.hasPathway) {
      return "Planning foundation not yet established. Define your pathway to unlock country matching and timeline generation.";
    }
    if (stage === "planning" && flags.hasPathway && !flags.hasCountries) {
      return "Pathway defined. Your planning foundation is strong, but country selection is required to proceed with execution planning.";
    }
    if (stage === "decision" && flags.hasCountries) {
      return "You are in shortlist validation. Your planning foundation is strong, but country commitment is needed to unlock execution.";
    }
    if (stage === "decision" && !flags.hasTimeline) {
      return "Generate your execution timeline to transition from planning to active execution.";
    }
    if (stage === "execution" && flags.hasTimeline && !flags.timelineComplete) {
      return "Active execution phase. Maintain milestone momentum and validate key decisions with advisory as needed.";
    }
    if (stage === "execution" && flags.timelineComplete) {
      return "Execution infrastructure complete. Focus shifts to decision quality, clinic coordination, and advisory validation.";
    }
    if (stage === "completion") {
      return "Planning complete. Monitor execution progress and maintain advisory alignment.";
    }
    return "Complete required steps to unlock execution, reduce delays, and move toward treatment with precision.";
  };

  const getStageTitle = () => {
    if (stage === "planning") return "Foundation Building";
    if (stage === "decision") return "Decision & Commitment";
    if (stage === "execution") return "Active Execution";
    return "Execution Complete";
  };

  const getPrimaryAction = () => {
    if (!flags.hasPathway) {
      return { label: "Define Pathway", href: "/portal/my-plan", enabled: true };
    }
    if (!flags.hasCountries) {
      return { label: "Select Countries", href: "/portal/countries", enabled: true };
    }
    if (!flags.hasTimeline) {
      return { label: "Generate Timeline", href: "/portal/timeline", enabled: true };
    }
    if (flags.advisoryReady) {
      return { label: "Validate Strategy", href: "/portal/advisory", enabled: true };
    }
    return { label: "Review Progress", href: "/portal/timeline", enabled: true };
  };

  const primaryAction = getPrimaryAction();

  return (
    <div className="rounded-2xl bg-[#2a2a2a] p-8 text-white shadow-2xl">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        {/* Left: Case Status */}
        <div className="flex-1 space-y-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400">
              Case Status
            </p>
            <h1 className="mt-2 text-3xl font-light tracking-tight text-white">
              {getStageTitle()}
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-stone-300">
              {getStrategicInterpretation()}
            </p>
          </div>

          {/* PREMIUM: Key Blockers */}
          {primaryBlocker && (
            <div className="rounded-xl bg-[#3a2a2a] border border-[#5c3a3a] p-4">
              <div className="flex items-center gap-2 text-[#c4a7a7]">
                <span className="text-lg">⚠</span>
                <span className="text-sm font-semibold uppercase tracking-wider">Current Blocker</span>
              </div>
              <p className="mt-1 text-stone-200">
                {primaryBlocker.replace(/_/g, " ")}
              </p>
            </div>
          )}

          {/* PREMIUM: Quick Stats */}
          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <StatusDot status={flags.hasPathway ? "complete" : "blocked"} />
              <span className={flags.hasPathway ? "text-stone-300" : "text-stone-500"}>
                Pathway {flags.hasPathway ? "defined" : "required"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <StatusDot status={flags.hasCountries ? "active" : "blocked"} />
              <span className={
                flags.hasCountries ? "text-[#d4c4a8]" : "text-stone-500"
              }>
                {flags.hasCountries 
                  ? `${flags.countryCount} shortlisted` 
                  : "Countries required"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <StatusDot status={flags.hasTimeline ? "complete" : flags.hasCountries ? "active" : "pending"} />
              <span className={flags.hasTimeline ? "text-stone-300" : "text-stone-500"}>
                Timeline {flags.hasTimeline ? `${flags.timelineProgress}%` : flags.hasCountries ? "ready" : "locked"}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Readiness & Primary Action */}
        <div className="lg:w-72 lg:border-l lg:border-stone-700 lg:pl-8 space-y-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-stone-400">
              Advisory Readiness
            </p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-5xl font-light text-white">{Math.round(readinessTotal)}</span>
              <span className="text-xl text-stone-500">%</span>
            </div>
            <div className="mt-3 h-1.5 w-full rounded-full bg-stone-700">
              <div 
                className="h-1.5 rounded-full bg-[#6a7a6a] transition-all duration-700"
                style={{ width: `${readinessTotal}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-stone-500">
              {readinessTotal >= 70 ? "Optimal for advisory" : `${70 - Math.round(readinessTotal)}% to optimal threshold`}
            </p>
          </div>

          <Link
            href={primaryAction.href}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#2a2a2a] transition hover:bg-stone-100"
          >
            {primaryAction.label} →
          </Link>

          {readinessTotal < 70 && (
            <p className="text-xs text-stone-500 leading-relaxed">
              Complete foundation steps to unlock full advisory capabilities.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// === PREMIUM: PRIMARY ACTION CARD ===

function PrimaryActionCard({
  title,
  body,
  explanation,
  stakes,
  unlocks,
  href,
  cta,
  priority,
  label,
}: {
  title: string;
  body: string;
  explanation: string;
  stakes: string;
  unlocks: string[];
  href: string;
  cta: string;
  priority: PriorityLevel;
  label: string;
}) {
  return (
    <section className="rounded-2xl border-2 border-[#c4a7a7] bg-white p-8 shadow-lg relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-[#c4a7a7]" />
      
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <PriorityBadge priority={priority} />
              <span className="text-xs font-bold text-[#c4a7a7] uppercase tracking-wider">
                {label}
              </span>
            </div>
            <h2 className="text-xl font-semibold text-stone-900">
              {title}
            </h2>
            <p className="mt-2 text-base text-stone-600 leading-relaxed">
              {body}
            </p>
          </div>
          <Link
            href={href}
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#3a3a3a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2a2a2a] lg:mt-0"
          >
            {cta} →
          </Link>
        </div>

        <div className="grid gap-6 border-t border-stone-100 pt-6 lg:grid-cols-3">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2">
              Why This Matters
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              {explanation}
            </p>
          </div>
          <div className="rounded-lg bg-[#faf6f6] p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#8a6a6a] mb-2">
              If Delayed
            </h3>
            <p className="text-sm text-[#6a4a4a] leading-relaxed">
              {stakes}
            </p>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#4a5a4a] mb-2">
              Unlocks
            </h3>
            <ul className="space-y-1.5">
              {unlocks.map((unlock, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-stone-700">
                  <span className="mt-0.5 text-[#6a7a6a]">✓</span>
                  <span>{unlock}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// === PREMIUM: GUIDED FLOW STEP ===

function GuidedFlowStep({
  step,
  isLast,
}: {
  step: PortalIntelligence["flowSteps"][number];
  isLast: boolean;
}) {
  const getStatusStyles = (status: StepStatus) => {
    const styles = {
      complete: {
        circle: "bg-[#6a7a6a] text-white",
        line: "bg-[#6a7a6a]",
        title: "text-stone-500",
        subtitle: "text-stone-400",
        bg: "bg-stone-50",
        border: "border-stone-200",
        opacity: "opacity-70",
      },
      active: {
        circle: "bg-[#3a3a3a] text-white ring-4 ring-[#3a3a3a]/10",
        line: "bg-stone-200",
        title: "text-stone-900",
        subtitle: "text-stone-700",
        bg: "bg-white",
        border: "border-2 border-[#3a3a3a]",
        opacity: "opacity-100",
      },
      locked: {
        circle: "bg-stone-200 text-stone-400",
        line: "bg-stone-200",
        title: "text-stone-400",
        subtitle: "text-stone-400",
        bg: "bg-stone-50",
        border: "border-stone-200 border-dashed",
        opacity: "opacity-50",
      },
    };
    return styles[status];
  };

  const style = getStatusStyles(step.status);

  return (
    <div className={`flex gap-4 ${style.opacity}`}>
      <div className="flex flex-col items-center">
        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${style.circle}`}>
          {step.status === "complete" ? "✓" : step.number}
        </div>
        {!isLast && <div className={`mt-2 w-0.5 flex-1 ${style.line}`} />}
      </div>

      <div className={`mb-6 flex-1 rounded-xl border p-5 ${style.bg} ${style.border}`}>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className={`text-base font-semibold ${style.title}`}>
                {step.title}
              </h3>
              {step.status === "active" && (
                <span className="rounded-full bg-[#3a3a3a] px-2.5 py-0.5 text-xs font-medium text-white">
                  Current
                </span>
              )}
              {step.status === "locked" && (
                <span className="rounded-full bg-stone-200 px-2.5 py-0.5 text-xs font-medium text-stone-500">
                  Locked
                </span>
              )}
            </div>

            <p className={`text-sm font-medium ${style.subtitle}`}>
              {step.directive}
            </p>

            {/* PREMIUM: Only show insights for active step to reduce noise */}
            {step.status === "active" && step.systemInsight && (
              <div className="mt-3 rounded-lg bg-stone-50 border border-stone-100 p-3">
                <p className="text-xs font-medium text-stone-500 mb-1">
                  System Insight
                </p>
                <p className="text-sm text-stone-600">{step.systemInsight}</p>
              </div>
            )}

            {step.status === "active" && step.riskIfDelayed && (
              <div className="mt-3 rounded-lg bg-[#faf6f6] border border-[#e8d8d8] px-3 py-2">
                <p className="text-xs font-semibold text-[#8a6a6a] uppercase tracking-wider">
                  Risk if delayed
                </p>
                <p className="text-sm text-[#6a4a4a] mt-1">{step.riskIfDelayed}</p>
              </div>
            )}

            {step.status === "active" && step.unlocks && step.unlocks.length > 0 && (
              <div className="mt-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#4a5a4a] mb-2">
                  Unlocks
                </p>
                <div className="flex flex-wrap gap-2">
                  {step.unlocks.map((unlock, idx) => (
                    <span key={idx} className="inline-flex items-center rounded-md bg-[#f0f4f0] px-2.5 py-1 text-xs font-medium text-[#4a5a4a]">
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
              className={`mt-4 inline-flex shrink-0 items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition lg:mt-0 ${
                step.cta.variant === "primary"
                  ? "bg-[#3a3a3a] text-white hover:bg-[#2a2a2a]"
                  : "border border-stone-300 text-stone-600 hover:border-stone-400 hover:bg-stone-50"
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

// === PREMIUM: SYSTEM INTELLIGENCE ===

function SystemInsights({
  signals,
  executionStatus,
  stage,
}: {
  signals: PortalIntelligence["signals"];
  executionStatus: PortalIntelligence["executionStatus"];
  stage: PortalIntelligence["stage"];
}) {
  const hasContent = signals.blockers.length > 0 || signals.risks.length > 0 || signals.insights.length > 0;
  if (!hasContent) return null;

  return (
    <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-500 mb-4">
        System Intelligence
      </h2>
      
      <div className="space-y-3">
        {signals.blockers.map((signal) => (
          <div key={signal.id} className="flex gap-3 items-start rounded-lg bg-[#faf6f6] p-3 border border-[#e8d8d8]">
            <span className="text-[#c4a7a7] font-bold shrink-0">⚠</span>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-stone-900 text-sm">{signal.message}</p>
              <p className="text-sm text-stone-600 mt-1">→ {signal.resolution}</p>
            </div>
            <Link 
              href={signal.href} 
              className="text-sm font-semibold text-[#5c3a3a] hover:text-[#3a2a2a] shrink-0 underline underline-offset-2"
            >
              Resolve
            </Link>
          </div>
        ))}
        
        {signals.risks.map((risk) => (
          <div key={risk.id} className="flex gap-3 items-start rounded-lg bg-[#faf8f0] p-3 border border-[#e8e0d0]">
            <span className="text-[#d4c4a8] font-bold shrink-0">⚠</span>
            <div>
              <p className="font-medium text-stone-900 text-sm">{risk.message}</p>
              <p className="text-sm text-stone-600 mt-1">→ Mitigation: {risk.mitigation}</p>
            </div>
          </div>
        ))}
        
        {signals.insights.map((insight) => (
          <div key={insight.id} className="flex gap-3 items-start rounded-lg bg-[#f4f6f4] p-3 border border-[#e0e8e0]">
            <span className="text-[#6a7a6a] font-bold shrink-0">✓</span>
            <p className="font-medium text-stone-900 text-sm">{insight.message}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-stone-100">
        <p className="text-xs text-stone-500">
          System: <span className="font-medium text-stone-700 capitalize">{stage}</span> | 
          Status: <span className={executionStatus === "blocked" ? "font-medium text-[#c4a7a7]" : "font-medium text-[#6a7a6a]"}>{executionStatus}</span>
        </p>
      </div>
    </section>
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

    // STEP 7: Refresh when window regains focus (user may have updated data in another tab/page)
    const handleFocus = () => {
      if (isMounted) void loadPlan();
    };
    window.addEventListener('focus', handleFocus);

    return () => { 
      isMounted = false;
      window.removeEventListener('focus', handleFocus);
    };
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
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      
      {/* === 1. PREMIUM: EXECUTIVE SUMMARY === */}
      <ExecutiveSummary
        stage={stage}
        primaryBlocker={primaryBlocker}
        readinessTotal={readinessTotal}
        flags={flags}
      />

      {/* === 2. PREMIUM: PRIMARY ACTION === */}
      <PrimaryActionCard
        title={nextAction.title}
        body={nextAction.body}
        explanation={nextAction.explanation}
        stakes={nextAction.stakes}
        unlocks={nextAction.unlocks}
        href={nextAction.href}
        cta={nextAction.cta}
        priority={nextAction.type as PriorityLevel}
        label={nextAction.label}
      />

      {/* === 3. EXECUTION PATH === */}
      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
            Execution Path
          </p>
          <h2 className="mt-1 text-lg font-semibold text-stone-900">
            Step-by-Step Progression
          </h2>
          {primaryBlocker && (
            <p className="mt-2 text-sm text-[#c4a7a7]">
              Current blocker: {primaryBlocker.replace(/_/g, " ")}
            </p>
          )}
        </div>
        <div className="space-y-2">
          {flowSteps.map((step, idx) => (
            <GuidedFlowStep 
              key={step.id} 
              step={step} 
              isLast={idx === flowSteps.length - 1} 
            />
          ))}
        </div>
      </section>

      {/* === 4. SYSTEM INTELLIGENCE === */}
      <SystemInsights
        signals={signals}
        executionStatus={executionStatus}
        stage={stage}
      />

      {/* === 5. READINESS BREAKDOWN === */}
      <section className="rounded-2xl border border-stone-200 bg-stone-50 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Planning Readiness
            </p>
            <p className="text-sm text-stone-600 mt-1">
              {readinessTotal >= 70 
                ? "Optimal for advisory engagement" 
                : `${70 - readinessTotal}% to advisory threshold`}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className={`text-3xl font-light ${readinessTotal >= 70 ? "text-[#4a5a4a]" : "text-stone-900"}`}>
                {readinessTotal}%
              </p>
            </div>
            <div className={`flex h-12 w-12 items-center justify-center rounded-full border-2 ${
              readinessTotal >= 70 ? "border-[#6a7a6a]" : "border-stone-300"
            }`}>
              <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                advisoryReadiness.stage === "optimal" ? "bg-[#8a9a8a] text-white" :
                advisoryReadiness.stage === "ready" ? "bg-[#6a7a6a] text-white" :
                advisoryReadiness.stage === "developing" ? "bg-[#d4c4a8] text-[#5c4a3a]" :
                "bg-stone-300 text-stone-600"
              }`}>
                {advisoryReadiness.score}
              </div>
            </div>
          </div>
        </div>

        <div className="h-2 w-full rounded-full bg-stone-200">
          <div className={`h-2 rounded-full transition-all ${
            advisoryReadiness.stage === "optimal" ? "bg-[#8a9a8a]" :
            advisoryReadiness.stage === "ready" ? "bg-[#6a7a6a]" :
            advisoryReadiness.stage === "developing" ? "bg-[#d4c4a8]" :
            "bg-stone-400"
          }`} style={{ width: `${readinessTotal}%` }} />
        </div>

        {/* Collapsible details - only show if user needs to know what's missing */}
        {readinessTotal < 70 && (
          <div className="mt-4 pt-4 border-t border-stone-200">
            <p className="text-xs text-stone-500 mb-2">Readiness breakdown:</p>
            <div className="grid grid-cols-3 gap-4 text-xs">
              <div>
                <span className={readiness.planning >= 70 ? "text-[#6a7a6a]" : "text-stone-400"}>
                  Planning: {readiness.planning}%
                </span>
              </div>
              <div>
                <span className={readiness.execution >= 70 ? "text-[#6a7a6a]" : "text-stone-400"}>
                  Execution: {readiness.execution}%
                </span>
              </div>
              <div>
                <span className={readiness.advisory >= 70 ? "text-[#6a7a6a]" : "text-stone-400"}>
                  Advisory: {readiness.advisory}%
                </span>
              </div>
            </div>
            {primaryBlocker && (
              <p className="mt-3 text-xs text-[#8a6a6a]">
                Next: {primaryBlocker.replace(/_/g, " ")}
              </p>
            )}
          </div>
        )}
      </section>

      {/* === 6. METRICS === */}
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
            {flags.hasCountries 
              ? `${flags.countryCount} shortlisted` 
              : "None"}
          </p>
          {flags.hasCountries ? (
            <p className="mt-2 text-xs text-[#d4c4a8]">Selection needed to unlock timeline</p>
          ) : (
            <p className="mt-2 text-xs text-stone-400">Start with country research</p>
          )}
        </div>
      </section>

      {/* === 7. STAGE STATUS === */}
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

      {/* === ADVISORY CTA === */}
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