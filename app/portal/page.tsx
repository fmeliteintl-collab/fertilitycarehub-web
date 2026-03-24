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

// === FLOW LOGIC ===

function computeFlowSteps(plan: UserPlanInput): FlowStep[] {
  const hasPathway = !!plan.pathway_type?.trim();
  const hasCountries = (plan.shortlisted_countries || []).length > 0;
  const countryCount = plan.shortlisted_countries?.length || 0;
  const hasTimeline = (plan.timeline_items || []).length > 0;
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
      statusLabel: "REQUIRED NOW",
      directive: hasPathway 
        ? "Pathway defined — foundation established" 
        : "Define your treatment pathway to begin planning",
      whyMatters: "Your pathway determines legal eligibility, cost structures, and which countries are viable options.",
      systemInsight: "All downstream decisions depend on this foundation. Without pathway clarity, country matching and timeline generation are disabled.",
      cta: hasPathway 
        ? undefined 
        : { label: "Define Pathway", href: "/portal/my-plan", variant: "primary" },
      unlocks: hasPathway ? undefined : ["Country matching engine", "Legal pathway analysis", "Cost modeling"],
    },
    {
      id: "countries",
      number: 2,
      title: "Select Countries",
      module: "countries",
      status: hasCountries ? "complete" : hasPathway ? "active" : "locked",
      statusLabel: "REQUIRED NOW",
      directive: hasCountries
        ? `${countryCount} countries selected — ready for timeline`
        : "Select jurisdictions for your treatment plan",
      whyMatters: "Jurisdiction determines your legal rights, timeline speed, donor availability, and total cost.",
      systemInsight: "Country selection activates the timeline generation engine. Each jurisdiction has unique legal requirements that affect document preparation and clinic eligibility.",
      riskIfDelayed: "Limited clinic availability in preferred jurisdictions; legal pathway complexity increases with delayed decisions.",
      cta: hasCountries || !hasPathway
        ? undefined
        : { label: "Select Countries", href: "/portal/countries", variant: "primary" },
      unlocks: hasCountries ? undefined : ["Phase-based timeline", "Document requirements", "Legal pathway mapping"],
    },
    {
      id: "timeline",
      number: 3,
      title: "Build Execution Timeline",
      module: "timeline",
      status: timelineCompleted ? "complete" : hasTimeline ? "active" : hasCountries ? "active" : "locked",
      statusLabel: "REQUIRED NOW",
      directive: timelineCompleted
        ? "Timeline complete — execution ready"
        : hasTimeline
          ? `Timeline in progress (${timelineProgress}%)`
          : "Initiate execution timeline — blocking all downstream phases",
      whyMatters: "Without a structured timeline, treatment scheduling, legal preparation, and clinic coordination remain unstructured and prone to delays.",
      systemInsight: "Execution cannot begin without a structured timeline. All downstream phases — documentation, advisory, and treatment coordination — depend on this step.",
      riskIfDelayed: "Treatment scheduling delays of 3–8 weeks are common without early timeline structuring. Missed scheduling windows and underestimated preparation time increase risk of delays (weeks to months).",
      estimatedEffort: "15–20 minutes to initialize timeline",
      cta: hasTimeline || !hasCountries
        ? hasTimeline && !timelineCompleted 
          ? { label: "Continue Timeline", href: "/portal/timeline", variant: "primary" }
          : undefined
        : { label: "Start Timeline Execution", href: "/portal/timeline", variant: "primary" },
      unlocks: hasTimeline && !timelineCompleted
        ? ["Document preparation system", "Advisory eligibility", "Execution tracking"]
        : undefined,
    },
    {
      id: "documents",
      number: 4,
      title: "Prepare Documentation",
      module: "documents",
      status: timelineCompleted ? "active" : hasTimeline ? "active" : "locked",
      statusLabel: timelineCompleted ? "READY" : "LOCKED",
      directive: timelineCompleted
        ? "Document preparation ready — requirements generated"
        : hasTimeline
          ? "Complete timeline to unlock document requirements"
          : "Timeline must be initiated before document requirements are generated",
      whyMatters: "Document requirements vary by jurisdiction and pathway. Premature preparation leads to incomplete or incorrect documentation.",
      systemInsight: "Document requirements are dynamically generated based on your selected countries and pathway. Requirements include medical records, legal forms, and travel documentation with jurisdiction-specific variations.",
      riskIfDelayed: "Arriving at clinics unprepared delays treatment cycles; missing legal filing deadlines can block treatment entirely.",
      cta: timelineCompleted
        ? { label: "Prepare Documents", href: "/portal/documents", variant: "primary" }
        : undefined,
      unlocks: timelineCompleted ? ["Clinic application readiness", "Legal process initiation", "Travel preparation"] : undefined,
    },
    {
      id: "advisory",
      number: 5,
      title: "Advisory & Execution",
      module: "advisory",
      status: timelineCompleted ? "active" : advisoryReady ? "active" : "locked",
      statusLabel: timelineCompleted ? "RECOMMENDED" : advisoryReady ? "AVAILABLE" : "LOCKED",
      directive: timelineCompleted
        ? "Validate strategy with advisory before execution"
        : advisoryReady
          ? "Advisory available — validate your plan"
          : "Complete timeline setup to unlock advisory",
      whyMatters: "At this stage, incorrect decisions cost months and thousands. Advisory validates your country choice, legal pathway, and clinic strategy.",
      systemInsight: "Advisory becomes high-value after timeline and country decisions are structured. Incorrect jurisdiction or clinic decisions at this stage can result in financial loss, legal complications, and delays of several months.",
      riskIfDelayed: "Proceeding without validation risks choosing wrong jurisdiction, underestimating costs, or selecting incompatible clinics.",
      cta: advisoryReady || timelineCompleted
        ? { label: "Validate Strategy with Advisory", href: "/portal/advisory", variant: "primary" }
        : undefined,
      unlocks: ["Expert validation", "Clinic matching", "Execution roadmap refinement"],
    },
  ];

  return steps;
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

  const readinessItems: ReadinessItem[] = [
    { label: "Pathway clarity", complete: hasPathway, points: 25 },
    { label: "Country selection", complete: hasCountries, points: 25 },
    { label: "Timeline readiness", complete: hasTimeline, points: 25 },
    { label: "Timeline progress", complete: timelineProgress >= 50, points: 25 },
  ];

  const readinessTotal = readinessItems.reduce((acc, item) => {
    return acc + (item.complete ? item.points : 0);
  }, 0);

  const blockingSignals = useMemo(
    () => advisorySignals.filter((s: AdvisorySignal) => s.type === "blocking"),
    [advisorySignals]
  );

  const attentionSignals = useMemo(
    () => advisorySignals.filter((s: AdvisorySignal) => s.type === "attention"),
    [advisorySignals]
  );

  // Determine next action display based on directive logic
  const getNextActionDisplay = () => {
    if (!hasTimeline) {
      return {
        priority: "critical" as const,
        label: "REQUIRED ACTION — EXECUTION BLOCKED",
        title: "Initiate Execution Timeline",
        body: "Your plan cannot progress to execution without a structured timeline.",
        explanation: "Without a defined timeline, treatment scheduling, legal preparation, and clinic coordination remain unstructured and prone to delays.",
        stakes: "Missed scheduling windows, underestimated preparation time, increased risk of treatment delays (weeks to months).",
        unlocks: ["Document preparation system", "Advisory eligibility", "Execution tracking"],
        cta: "Start Timeline Execution",
        href: "/portal/timeline",
      };
    }

    if (timelineProgress > 30 && timelineProgress < 100) {
      return {
        priority: "high" as const,
        label: "REQUIRED ACTION — CONTINUE EXECUTION",
        title: "Continue Timeline Execution",
        body: `Your timeline is ${timelineProgress}% complete. Continue execution to unlock advisory and documentation phases.`,
        explanation: "Completing timeline tasks builds execution momentum and prepares you for advisory validation.",
        stakes: "Incomplete timeline blocks document preparation system and delays advisory eligibility.",
        unlocks: ["Document preparation system", "Advisory eligibility", "Execution tracking"],
        cta: "Continue Timeline",
        href: "/portal/timeline",
      };
    }

    if (readinessTotal >= 70) {
      return {
        priority: "high" as const,
        label: "RECOMMENDED — VALIDATE STRATEGY",
        title: "Validate Your Strategy",
        body: "Your plan has reached advisory readiness threshold. Validate jurisdiction, legal pathway, and clinic strategy before execution.",
        explanation: "At this stage, incorrect decisions cost months and thousands. Advisory validates your country choice, legal pathway, and clinic strategy.",
        stakes: "Proceeding without validation risks choosing wrong jurisdiction, underestimating costs, or selecting incompatible clinics.",
        unlocks: ["Expert validation", "Clinic matching", "Execution roadmap refinement"],
        cta: "Validate Your Strategy",
        href: "/portal/advisory",
      };
    }

    return {
      priority: nextAction.priority as "critical" | "high" | "medium" | "low",
      label: "REQUIRED ACTION",
      title: nextAction.title,
      body: nextAction.body,
      explanation: nextAction.explanation,
      stakes: nextAction.stakes,
      unlocks: nextAction.unlocks,
      cta: nextAction.cta,
      href: nextAction.href,
    };
  };

  const nextActionDisplay = getNextActionDisplay();

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
              Your Planning System Is Active
            </h1>
            <p className="mt-3 max-w-2xl text-stone-300 leading-relaxed">
              Complete required steps to unlock execution, reduce delays, and move toward treatment with precision.
            </p>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${hasPathway ? "bg-[#6a7a6a]" : "bg-stone-600"}`} />
                <span className={hasPathway ? "text-stone-300" : "text-stone-500"}>
                  Pathway {hasPathway ? "defined" : "not defined"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${hasCountries ? "bg-[#6a7a6a]" : "bg-stone-600"}`} />
                <span className={hasCountries ? "text-stone-300" : "text-stone-500"}>
                  Countries {hasCountries ? "selected" : "not selected"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${hasTimeline ? "bg-[#6a7a6a]" : "bg-[#c4a7a7]"}`} />
                <span className={hasTimeline ? "text-stone-300" : "text-[#c4a7a7]"}>
                  Timeline {hasTimeline ? "initiated" : "not initiated (blocking execution)"}
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
                <PriorityBadge priority={nextActionDisplay.priority} />
                <span className="text-sm font-bold text-[#c4a7a7] uppercase tracking-wider">
                  {nextActionDisplay.label}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-stone-900">
                {nextActionDisplay.title}
              </h2>
              <p className="mt-2 text-lg text-stone-700 font-medium">
                {nextActionDisplay.body}
              </p>
            </div>
            <Link
              href={nextActionDisplay.href}
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#3a3a3a] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#2a2a2a] shadow-lg shadow-stone-900/20"
            >
              {nextActionDisplay.cta} →
            </Link>
          </div>

          <div className="grid gap-4 lg:grid-cols-3 pt-6 border-t border-stone-200">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                Why this matters
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                {nextActionDisplay.explanation}
              </p>
            </div>
            <div className="rounded-lg bg-[#faf6f6] border border-[#e8d8d8] p-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#8a6a6a] mb-2">
                If ignored
              </h3>
              <p className="text-sm text-[#6a4a4a] leading-relaxed">
                {nextActionDisplay.stakes}
              </p>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#4a5a4a] mb-2">
                This will unlock
              </h3>
              <ul className="space-y-1">
                {nextActionDisplay.unlocks.map((unlock, idx) => (
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
        </div>
        <div className="space-y-6">
          {flowSteps.map((step, idx) => (
            <GuidedFlowStep key={step.id} step={step} isLast={idx === flowSteps.length - 1} />
          ))}
        </div>
      </section>

      {/* === 4. SYSTEM SIGNALS (BLOCKERS) === */}
      {(blockingSignals.length > 0 || attentionSignals.length > 0 || !hasTimeline) && (
        <section className="rounded-2xl border border-stone-300 bg-white p-8 shadow-sm">
          <h2 className="text-lg font-bold text-stone-900 mb-6 flex items-center gap-2">
            <span className="text-[#c4a7a7]">⚠</span> System Signals
          </h2>
          <div className="space-y-4">
            {!hasTimeline && (
              <div className="flex gap-3 items-start">
                <span className="text-[#c4a7a7] font-bold">⚠</span>
                <div>
                  <p className="font-medium text-stone-900">Timeline not initiated</p>
                  <p className="text-sm text-stone-600">→ Blocking execution phases</p>
                </div>
              </div>
            )}
            {hasTimeline && timelineProgress < 30 && (
              <div className="flex gap-3 items-start">
                <span className="text-[#d4c4a8] font-bold">⚠</span>
                <div>
                  <p className="font-medium text-stone-900">Documents not yet structured</p>
                  <p className="text-sm text-stone-600">→ Will delay clinic applications once timeline begins</p>
                </div>
              </div>
            )}
            {hasCountries && (
              <div className="flex gap-3 items-start">
                <span className="text-[#6a7a6a] font-bold">✓</span>
                <div>
                  <p className="font-medium text-stone-900">Country shortlist established ({plan.shortlisted_countries?.length} selected)</p>
                  <p className="text-sm text-stone-600">→ Strong foundation for execution</p>
                </div>
              </div>
            )}
            {blockingSignals.map((signal, idx) => (
              <div key={`blocking-${idx}`} className="flex gap-3 items-start">
                <span className="text-[#c4a7a7] font-bold">⚠</span>
                <div className="flex-1">
                  <p className="font-medium text-stone-900">{signal.message}</p>
                  {signal.action && <p className="text-sm text-stone-600">→ {signal.action}</p>}
                </div>
                {signal.link && (
                  <Link href={signal.link} className="text-sm font-bold text-[#5c3a3a] underline hover:text-[#3a2a2a] shrink-0">
                    Resolve →
                  </Link>
                )}
              </div>
            ))}
            {attentionSignals.map((signal, idx) => (
              <div key={`attention-${idx}`} className="flex gap-3 items-start">
                <span className="text-[#d4c4a8] font-bold">⚠</span>
                <div className="flex-1">
                  <p className="font-medium text-stone-900">{signal.message}</p>
                  {signal.action && <p className="text-sm text-stone-600">→ {signal.action}</p>}
                </div>
                {signal.link && (
                  <Link href={signal.link} className="text-sm font-bold text-[#5c4a3a] underline hover:text-[#3a2a2a] shrink-0">
                    Address →
                  </Link>
                )}
              </div>
            ))}
            <div className="mt-4 pt-4 border-t border-stone-200">
              <p className="text-sm font-bold text-stone-900">
                Next system priority: <span className="text-[#c4a7a7]">{!hasTimeline ? "Initiate timeline" : timelineProgress < 50 ? "Continue timeline execution" : "Complete timeline for advisory"}</span>
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
              Advisory Readiness
            </p>
            <p className="mt-1 text-sm text-stone-600">
              Current readiness: {readinessTotal}%
            </p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <span className={hasPathway ? "text-[#6a7a6a]" : "text-stone-400"}>✓</span>
                  <span className={hasPathway ? "text-stone-700" : "text-stone-400"}>Pathway clarity</span>
                </span>
                <span className={hasPathway ? "text-[#6a7a6a] text-xs" : "text-stone-400 text-xs"}>
                  {hasPathway ? "Complete" : "Not started"}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <span className={hasCountries ? "text-[#6a7a6a]" : "text-stone-400"}>✓</span>
                  <span className={hasCountries ? "text-stone-700" : "text-stone-400"}>Country selection</span>
                </span>
                <span className={hasCountries ? "text-[#6a7a6a] text-xs" : "text-stone-400 text-xs"}>
                  {hasCountries ? "Strong" : "Not started"}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <span className={hasTimeline ? "text-[#6a7a6a]" : "text-[#c4a7a7]"}>✗</span>
                  <span className={hasTimeline ? "text-stone-700" : "text-stone-500"}>Timeline readiness</span>
                </span>
                <span className={hasTimeline ? "text-[#6a7a6a] text-xs" : "text-[#c4a7a7] text-xs"}>
                  {hasTimeline ? "In progress" : "Not started"}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <span className={timelineProgress > 0 ? "text-[#6a7a6a]" : "text-[#c4a7a7]"}>✗</span>
                  <span className={timelineProgress > 0 ? "text-stone-700" : "text-stone-500"}>Document readiness</span>
                </span>
                <span className={timelineProgress > 0 ? "text-[#6a7a6a] text-xs" : "text-[#c4a7a7] text-xs"}>
                  {timelineProgress > 0 ? "In progress" : "Not started"}
                </span>
              </div>
            </div>
            {readinessTotal < 70 && (
              <p className="mt-4 text-sm text-[#8a6a6a]">
                System Recommendation: Complete timeline setup before entering advisory to maximize value and avoid premature strategy decisions.
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
            <p className="text-4xl font-bold text-stone-900">{timelineProgress}%</p>
          </div>
          <p className="mt-3 text-sm text-stone-600">
            {hasTimeline ? (
              <span>{timelineCounts.inProgress} in progress • {timelineCounts.upcoming} upcoming</span>
            ) : (
              <span className="text-[#8a6a6a] font-medium">Not initiated</span>
            )}
          </p>
          {!hasTimeline && (
            <p className="mt-2 text-xs text-[#8a6a6a]">Blocking: All execution phases</p>
          )}
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-bold text-stone-500 uppercase tracking-wider">Pathway</p>
          <p className="mt-3 text-lg font-bold text-stone-900">
            {getDisplayValue(plan.pathway_type, "Not defined")}
          </p>
          {hasPathway && (
            <p className="mt-2 text-xs text-[#6a7a6a]">Confidence: High</p>
          )}
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-bold text-stone-500 uppercase tracking-wider">Country Selection</p>
          <p className="mt-3 text-lg font-bold text-stone-900">
            {hasCountries ? `${plan.shortlisted_countries?.length} shortlisted` : "None"}
          </p>
          {hasCountries && (
            <p className="mt-2 text-xs text-[#6a7a6a]">Ready for execution planning</p>
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
              Stage 02 — Planning Consolidation
            </h2>
            <p className="mt-1 text-sm text-stone-600">
              <span className="font-medium">Objective:</span> Transition from planning to execution by structuring timeline and preparing documentation.
            </p>
            <p className="mt-2 text-sm text-stone-600">
              <span className="font-medium">System Focus:</span> Build execution momentum before entering advisory
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
              {readinessTotal >= 70 ? "Ready for validation" : "Complete timeline first"}
            </p>
            <p className="mt-1 text-sm text-stone-600">
              {readinessTotal >= 70 
                ? "Ensure jurisdiction, legal pathway, and clinic strategy are correct before execution."
                : `Complete ${70 - readinessTotal}% more to unlock advisory eligibility`}
            </p>
          </div>
          <Link
            href="/portal/advisory"
            className={`inline-flex shrink-0 rounded-xl px-4 py-2 text-sm font-bold transition ${
              readinessTotal >= 70
                ? "bg-[#3a3a3a] text-white hover:bg-[#2a2a2a]"
                : "border-2 border-stone-300 text-stone-400 cursor-not-allowed"
            }`}
          >
            {readinessTotal >= 70 ? "Validate Your Strategy →" : "Locked"}
          </Link>
        </div>
      </section>

    </div>
  );
}