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

// === DIRECTIVE TONE COMPONENTS ===

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

// Readiness score with real breakdown
function ReadinessBreakdown({ 
  hasPathway, 
  hasCountries, 
  hasTimeline, 
  timelineProgress 
}: { 
  hasPathway: boolean; 
  hasCountries: boolean; 
  hasTimeline: boolean;
  timelineProgress: number;
}) {
  const items = [
    { label: "Pathway defined", value: hasPathway, points: 25 },
    { label: "Countries selected", value: hasCountries, points: 25 },
    { label: "Timeline generated", value: hasTimeline, points: 25 },
    { label: "Timeline progress", value: timelineProgress >= 50, points: 25, isProgress: true, progressValue: timelineProgress },
  ];

  const total = items.reduce((acc, item) => {
    if (item.isProgress && item.progressValue !== undefined) {
      return acc + (item.progressValue * item.points / 100);
    }
    return acc + (item.value ? item.points : 0);
  }, 0);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-stone-600">Planning Readiness</span>
        <span className="text-2xl font-bold text-stone-900">{Math.round(total)}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-stone-200">
        <div 
          className="h-2 rounded-full bg-[#4a5a4a] transition-all duration-500"
          style={{ width: `${total}%` }}
        />
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <div className={`h-1.5 w-1.5 rounded-full ${item.value ? "bg-[#6a7a6a]" : "bg-stone-300"}`} />
            <span className={item.value ? "text-stone-700" : "text-stone-400"}>
              {item.label}: {item.isProgress ? `${Math.round(item.progressValue ?? 0)}%` : item.value ? "✓" : "—"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// === GUIDED FLOW WITH DIRECTIVE TONE ===

interface FlowStep {
  id: string;
  number: number;
  title: string;
  module: "my-plan" | "countries" | "timeline" | "documents" | "advisory";
  status: "complete" | "active" | "locked";
  description: string;
  directive: string;
  whyMatters: string;
  blockers?: string[];
  cta?: { label: string; href: string; variant: "primary" | "secondary" };
  unlocks?: string[];
  ignoredConsequences?: string;
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
                <span className="rounded-full bg-[#3a3a3a] px-2 py-0.5 text-xs font-bold text-white">
                  REQUIRED NOW
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

            <div className="mt-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">
                Why this matters
              </p>
              <p className="text-sm text-stone-600">{step.whyMatters}</p>
            </div>

            {step.blockers && step.blockers.length > 0 && (
              <div className="mt-4 rounded-lg bg-[#faf6f6] border border-[#e8d8d8] px-4 py-3">
                <p className="text-xs font-bold text-[#8a6a6a] uppercase tracking-wider mb-2">
                  ⚠️ Blocking your progress
                </p>
                <ul className="space-y-1">
                  {step.blockers.map((blocker, idx) => (
                    <li key={idx} className="text-sm text-[#6a4a4a]">
                      • {blocker}
                    </li>
                  ))}
                </ul>
                {step.ignoredConsequences && (
                  <p className="mt-2 text-xs text-[#8a6a6a] italic border-t border-[#e8d8d8] pt-2">
                    If ignored: {step.ignoredConsequences}
                  </p>
                )}
              </div>
            )}

            {step.unlocks && step.unlocks.length > 0 && step.status !== "complete" && (
              <div className="mt-4">
                <p className="text-xs font-bold uppercase tracking-wider text-[#4a5a4a] mb-2">
                  ✓ Completing this unlocks
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

// === COMPUTED FLOW WITH DIRECTIVE LOGIC ===

function computeFlowSteps(plan: UserPlanInput): FlowStep[] {
  const hasPathway = !!plan.pathway_type?.trim();
  const hasCountries = (plan.shortlisted_countries || []).length > 0;
  const countryCount = plan.shortlisted_countries?.length || 0;
  const hasTimeline = (plan.timeline_items || []).length > 0;
  const hasInProgressTimeline = plan.timeline_items?.some((i) => i.status === "In Progress");
  const timelineCompleted = hasTimeline && plan.timeline_items?.every((i) => i.status === "Completed");
  const timelineProgress = hasTimeline 
    ? Math.round((plan.timeline_items?.filter(i => i.status === "Completed").length || 0) / (plan.timeline_items?.length || 1) * 100)
    : 0;
  const advisoryReady = calculateAdvisoryReadiness(plan, 0).percentage >= 70;

  const steps: FlowStep[] = [
    {
      id: "my-plan",
      number: 1,
      title: "Define Your Pathway",
      module: "my-plan",
      status: hasPathway ? "complete" : "active",
      description: hasPathway ? "Foundation established" : "Required foundation",
      directive: hasPathway 
        ? "Pathway locked — proceed to country selection" 
        : "You must define your treatment pathway before any planning can begin",
      whyMatters: "Your pathway determines legal eligibility, cost structures, and which countries are viable options. Without this, all downstream decisions are guesswork.",
      cta: hasPathway 
        ? undefined 
        : { label: "Define Pathway Now", href: "/portal/my-plan", variant: "primary" },
      unlocks: hasPathway ? undefined : ["Country matching engine", "Legal pathway analysis", "Cost modeling"],
      ignoredConsequences: hasPathway ? undefined : "You cannot proceed to country selection or timeline generation. System remains locked.",
    },
    {
      id: "countries",
      number: 2,
      title: "Select Countries",
      module: "countries",
      status: hasCountries ? "complete" : hasPathway ? "active" : "locked",
      description: hasCountries ? `${countryCount} countries selected` : "Required selection",
      directive: hasCountries
        ? `Countries locked (${countryCount}) — proceed to timeline generation`
        : hasPathway 
          ? "Select 2-3 countries to unlock timeline generation"
          : "Complete Step 1 first",
      whyMatters: "Jurisdiction determines your legal rights, timeline speed, donor availability, and total cost. This is the most consequential decision in your plan.",
      blockers: !hasPathway && !hasCountries ? ["Pathway must be defined first"] : undefined,
      cta: hasCountries || !hasPathway
        ? undefined
        : { label: "Select Countries Now", href: "/portal/countries", variant: "primary" },
      unlocks: hasCountries ? undefined : ["Phase-based timeline", "Document requirements", "Legal pathway mapping"],
      ignoredConsequences: !hasPathway 
        ? "System remains locked. No planning possible." 
        : "Timeline generation blocked. You cannot proceed to execution planning.",
    },
    {
      id: "timeline",
      number: 3,
      title: "Build Execution Timeline",
      module: "timeline",
      status: timelineCompleted ? "complete" : hasTimeline ? "active" : hasCountries ? "active" : "locked",
      description: timelineCompleted 
        ? "Execution ready" 
        : hasTimeline 
          ? `${timelineProgress}% complete` 
          : "Required roadmap",
      directive: timelineCompleted
        ? "Timeline complete — advisory unlocked"
        : hasTimeline
          ? "Continue executing timeline tasks"
          : hasCountries
            ? "Generate your phase-based execution roadmap now"
            : "Complete Step 2 first",
      whyMatters: "Without a structured timeline, you miss critical deadlines, underestimate preparation time, and risk treatment delays that can cost months.",
      blockers: !hasCountries ? ["Countries must be selected first"] : undefined,
      cta: hasTimeline || !hasCountries
        ? hasTimeline && !timelineCompleted 
          ? { label: "Continue Timeline", href: "/portal/timeline", variant: "primary" }
          : undefined
        : { label: "Generate Timeline Now", href: "/portal/timeline", variant: "primary" },
      unlocks: hasTimeline && !timelineCompleted
        ? ["Document preparation system", "Advisory eligibility", "Execution tracking"]
        : undefined,
      ignoredConsequences: !hasCountries
        ? "No roadmap possible. You risk missing critical preparation windows."
        : "Execution planning blocked. Treatment start date remains unknown.",
    },
    {
      id: "documents",
      number: 4,
      title: "Prepare Documentation",
      module: "documents",
      status: "locked",
      description: "Execution preparation",
      directive: "Document preparation unlocks after timeline activation",
      whyMatters: "Medical records, legal forms, and travel documents require lead time. Delays here directly delay treatment start.",
      blockers: !hasInProgressTimeline ? ["Timeline must be activated first"] : undefined,
      ignoredConsequences: "You risk arriving at clinics unprepared, delaying treatment cycles, or missing legal filing deadlines.",
    },
    {
      id: "advisory",
      number: 5,
      title: "Advisory & Execution",
      module: "advisory",
      status: timelineCompleted ? "active" : advisoryReady ? "active" : "locked",
      description: timelineCompleted 
        ? "Ready for execution" 
        : advisoryReady 
          ? "Advisory recommended" 
          : "Requires readiness",
      directive: timelineCompleted
        ? "Enter advisory for final execution validation"
        : advisoryReady
          ? "Advisory recommended — validate your plan before proceeding"
          : `Complete ${70 - Math.min(70, timelineProgress)}% more timeline progress`,
      whyMatters: "At this stage, incorrect decisions cost months and thousands. Advisory validates your country choice, legal pathway, and clinic strategy.",
      blockers: !advisoryReady && !timelineCompleted
        ? [`Timeline ${70 - Math.min(70, timelineProgress)}% incomplete`] 
        : undefined,
      cta: advisoryReady || timelineCompleted
        ? { label: "Enter Advisory", href: "/portal/advisory", variant: "primary" }
        : undefined,
      ignoredConsequences: "Proceeding without validation risks choosing wrong jurisdiction, underestimating costs, or selecting incompatible clinics.",
    },
  ];

  return steps;
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
    return () => { isMounted = false; };
  }, []);

  const timelineItems = useMemo(() => plan.timeline_items ?? [], [plan.timeline_items]);
  const timelineCounts = useMemo(() => getTimelineCounts(timelineItems), [timelineItems]);
  const advisoryReadiness = useMemo(() => calculateAdvisoryReadiness(plan, 0), [plan]);
  const advisorySignals = useMemo(() => generateAdvisorySignals(plan), [plan]);
  const executionStage = useMemo(() => determineExecutionStage(plan), [plan]);
  const flowSteps = useMemo(() => computeFlowSteps(plan), [plan]);
  const nextAction = useMemo(() => buildNextActionWithContext(plan), [plan]);

  const hasPathway = !!plan.pathway_type?.trim();
  const hasCountries = (plan.shortlisted_countries || []).length > 0;
  const hasTimeline = (plan.timeline_items || []).length > 0;
  const timelineProgress = hasTimeline 
    ? Math.round(timelineCounts.completed / timelineCounts.total * 100) 
    : 0;

  const blockingSignals = useMemo(
    () => advisorySignals.filter((s: AdvisorySignal) => s.type === "blocking"),
    [advisorySignals]
  );

  const attentionSignals = useMemo(
    () => advisorySignals.filter((s: AdvisorySignal) => s.type === "attention"),
    [advisorySignals]
  );

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
      
      {/* === TIER 1: EXECUTIVE AUTHORITY HEADER === */}
      <div className="rounded-2xl border-2 border-[#3a3a3a] bg-[#3a3a3a] p-8 text-white shadow-xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-stone-400">
              FertilityCareHub Planning System
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">
              {hasPathway ? "Your Planning Command Center" : "Begin Your Planning Journey"}
            </h1>
            <p className="mt-3 max-w-2xl text-stone-300 leading-relaxed">
              {hasPathway 
                ? "Track execution readiness, manage dependencies, and navigate toward treatment with precision."
                : "Most patients choose the wrong fertility path. We built a system to prevent that. Start by defining your pathway below."}
            </p>
          </div>
          <div className="lg:border-l lg:border-stone-600 lg:pl-8">
            <ReadinessBreakdown 
              hasPathway={hasPathway} 
              hasCountries={hasCountries} 
              hasTimeline={hasTimeline}
              timelineProgress={timelineProgress}
            />
          </div>
        </div>
      </div>

      {/* === TIER 1: NEXT REQUIRED ACTION - THE COMMAND === */}
      <section className="rounded-2xl border-2 border-[#c4a7a7] bg-white p-8 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-[#c4a7a7]" />
        
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <PriorityBadge priority={nextAction.priority} />
                <span className="text-sm font-bold text-[#c4a7a7] uppercase tracking-wider">
                  Required Action
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
                ⚠️ If ignored
              </h3>
              <p className="text-sm text-[#6a4a4a] leading-relaxed">
                {nextAction.stakes}
              </p>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#4a5a4a] mb-2">
                ✓ Unlocks
              </h3>
              <ul className="space-y-1">
                {nextAction.unlocks.map((unlock, idx) => (
                  <li key={idx} className="text-sm text-stone-700 flex items-center gap-2">
                    <span className="text-[#6a7a6a]">→</span>
                    {unlock}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* === TIER 1: GUIDED FLOW - THE DECISION JOURNEY === */}
      <section className="rounded-2xl border border-stone-300 bg-white p-8 shadow-sm">
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-wider text-stone-500">
            Your Decision Journey
          </p>
          <h2 className="mt-2 text-2xl font-bold text-stone-900">
            Step-by-Step Execution Path
          </h2>
          <p className="mt-2 text-stone-600">
            Complete each required step to unlock the next phase. Skipping steps blocks downstream progress.
          </p>
        </div>
        <div className="space-y-6">
          {flowSteps.map((step, idx) => (
            <GuidedFlowStep key={step.id} step={step} isLast={idx === flowSteps.length - 1} />
          ))}
        </div>
      </section>

      {/* === TIER 2: EXECUTION RISKS === */}
      {(blockingSignals.length > 0 || attentionSignals.length > 0) && (
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
            <span className="text-[#c4a7a7]">⚠️</span> Execution Risks Requiring Action
          </h2>
          <div className="space-y-3">
            {blockingSignals.map((signal, idx) => (
              <div key={`blocking-${idx}`} className="rounded-xl border-2 border-[#c4a7a7] bg-[#faf6f6] p-5">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="font-bold text-[#5c3a3a]">{signal.message}</p>
                    {signal.action && <p className="mt-1 text-sm text-[#7a5a5a]">{signal.action}</p>}
                  </div>
                  {signal.link && (
                    <Link href={signal.link} className="text-sm font-bold text-[#5c3a3a] underline hover:text-[#3a2a2a] shrink-0">
                      Resolve Immediately →
                    </Link>
                  )}
                </div>
              </div>
            ))}
            {attentionSignals.map((signal, idx) => (
              <div key={`attention-${idx}`} className="rounded-xl border border-[#d4c4a8] bg-[#faf8f3] p-5">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="font-bold text-[#5c4a3a]">{signal.message}</p>
                    {signal.action && <p className="mt-1 text-sm text-[#7a6a5a]">{signal.action}</p>}
                  </div>
                  {signal.link && (
                    <Link href={signal.link} className="text-sm font-bold text-[#5c4a3a] underline hover:text-[#3a2a2a] shrink-0">
                      Address →
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* === TIER 2: ADVISORY READINESS === */}
      <section className="rounded-2xl border border-stone-300 bg-stone-100 p-8 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-stone-500">
              Advisory Readiness
            </p>
            <p className="mt-1 text-sm text-stone-600">
              Planning maturity required for meaningful advisory engagement
            </p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className={`text-4xl font-bold ${advisoryReadiness.percentage >= 70 ? "text-[#4a5a4a]" : "text-stone-900"}`}>
                {advisoryReadiness.percentage}%
              </p>
              <p className="text-sm font-bold uppercase text-stone-500">
                {advisoryReadiness.stage} stage
              </p>
            </div>
            <div className={`flex h-20 w-20 items-center justify-center rounded-full border-4 ${
              advisoryReadiness.percentage >= 70 ? "border-[#6a7a6a]" : "border-stone-300"
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
            <span className="font-bold text-stone-900">{advisoryReadiness.percentage}% / 70% required</span>
          </div>
          <div className="h-3 w-full rounded-full bg-stone-200">
            <div className={`h-3 rounded-full transition-all ${
              advisoryReadiness.stage === "optimal" ? "bg-[#8a9a8a]" :
              advisoryReadiness.stage === "ready" ? "bg-[#6a7a6a]" :
              advisoryReadiness.stage === "developing" ? "bg-[#d4c4a8]" :
              "bg-stone-400"
            }`} style={{ width: `${advisoryReadiness.percentage}%` }} />
          </div>
          {advisoryReadiness.percentage < 70 && (
            <p className="mt-3 text-sm text-[#8a6a6a]">
              Complete more timeline tasks to unlock advisory. At this stage, incorrect decisions cost months and thousands.
            </p>
          )}
        </div>
      </section>

      {/* === TIER 3: QUICK STATS === */}
      <section className="grid gap-6 lg:grid-cols-4">
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm lg:col-span-2">
          <p className="text-sm font-bold text-stone-500 uppercase tracking-wider">Timeline Execution</p>
          <div className="mt-4 flex items-baseline gap-3">
            <p className="text-4xl font-bold text-stone-900">{timelineCounts.completed}</p>
            <span className="text-2xl text-stone-400">/</span>
            <p className="text-2xl font-medium text-stone-500">{timelineCounts.total}</p>
          </div>
          <p className="mt-3 text-sm text-stone-600">
            {timelineCounts.total === 0 ? (
              <span className="text-[#8a6a6a] font-medium">Timeline not generated — countries required</span>
            ) : (
              <span>{timelineCounts.inProgress} in progress • {timelineCounts.upcoming} upcoming</span>
            )}
          </p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-bold text-stone-500 uppercase tracking-wider">Pathway</p>
          <p className="mt-3 text-lg font-bold text-stone-900">
            {getDisplayValue(plan.pathway_type, "Not defined")}
          </p>
          {!hasPathway && (
            <p className="mt-2 text-xs text-[#8a6a6a]">Required — blocks all planning</p>
          )}
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-bold text-stone-500 uppercase tracking-wider">Countries</p>
          <p className="mt-3 text-lg font-bold text-stone-900">
            {hasCountries ? `${plan.shortlisted_countries?.length} selected` : "None"}
          </p>
          {!hasCountries && hasPathway && (
            <p className="mt-2 text-xs text-[#8a6a6a]">Required — unlocks timeline</p>
          )}
        </div>
      </section>

      {/* === TIER 3: EXECUTION STAGE === */}
      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-stone-100">
            <StageBadge stage={executionStage.stage} />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-stone-900 capitalize">
              {executionStage.stage.replace("-", " ")} Phase
            </h2>
            <p className="mt-1 text-sm text-stone-600">{executionStage.description}</p>
          </div>
        </div>
      </section>

      {/* === TIER 3: ADVISORY SNAPSHOT === */}
      <section className="rounded-2xl border border-stone-200 bg-stone-50 p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-bold text-stone-500 uppercase tracking-wider">Advisory Status</p>
            <p className="mt-1 text-lg font-bold text-stone-900">
              {plan.advisory_status || "Not Started"}
            </p>
            <p className="mt-1 text-sm text-stone-600">
              {plan.advisory_pathway && plan.advisory_pathway !== "Undecided"
                ? `Pathway: ${plan.advisory_pathway}`
                : advisoryReadiness.percentage >= 70 
                  ? "Ready for advisory engagement"
                  : "Complete timeline progress first"}
            </p>
          </div>
          <Link
            href="/portal/advisory"
            className={`inline-flex shrink-0 rounded-xl px-4 py-2 text-sm font-bold transition ${
              advisoryReadiness.percentage >= 70
                ? "bg-[#3a3a3a] text-white hover:bg-[#2a2a2a]"
                : "border-2 border-stone-300 text-stone-400 cursor-not-allowed"
            }`}
          >
            {advisoryReadiness.percentage >= 70 ? "Enter Advisory →" : "Locked"}
          </Link>
        </div>
      </section>

    </div>
  );
}