"use client";

import { useEffect, useMemo, useState } from "react";
import {
  getCurrentUserPlan,
  upsertCurrentUserPlan,
} from "@/lib/plans/user-plans";
import {
  EMPTY_USER_PLAN_INPUT,
  type TimelineItem,
  type TimelineItemStatus,
  type UserPlanInput,
  type TimelinePhase,
  PHASE_METADATA,
  PHASE_ORDER,
} from "@/types/plan";
import {
  calculateTimelineReadiness,
  determineExecutionStage,
  getDisplayValue,
} from "@/lib/intelligence/plan-intelligence";

export const runtime = "edge";

// === PREMIUM: Status Pill Component (replaces dropdown) ===
function StatusPill({
  value,
  onChange,
  isLocked,
}: {
  value: TimelineItemStatus;
  onChange: (status: TimelineItemStatus) => void;
  isLocked: boolean;
}) {
  if (isLocked) {
    return (
      <span className="inline-flex items-center rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-500">
        Locked
      </span>
    );
  }

  const statuses: { value: TimelineItemStatus; label: string; color: string }[] = [
    { value: "Upcoming", label: "Upcoming", color: "bg-stone-100 text-stone-600" },
    { value: "In Progress", label: "In Progress", color: "bg-[#faf8f3] text-[#8a7a5a] border-[#d4c4a8]" },
    { value: "Completed", label: "Completed", color: "bg-[#f0f4f0] text-[#4a5a4a]" },
    { value: "Blocked", label: "Blocked", color: "bg-[#faf6f6] text-[#8a6a6a] border-[#c4a7a7]" },
  ];

  return (
    <div className="flex items-center gap-1">
      {statuses.map((status) => (
        <button
          key={status.value}
          type="button"
          onClick={() => onChange(status.value)}
          className={`rounded-full px-2.5 py-1 text-xs font-medium transition ${
            value === status.value 
              ? `${status.color} border` 
              : "bg-transparent text-stone-400 hover:text-stone-600"
          }`}
        >
          {status.label}
        </button>
      ))}
    </div>
  );
}

// === PREMIUM: Phase Badge with Visual Hierarchy ===
function PhaseBadge({
  phase,
  isLocked,
  isActive,
  completion,
}: {
  phase: TimelinePhase;
  isLocked: boolean;
  isActive: boolean;
  completion: number;
}) {
  const phaseNum = PHASE_ORDER.indexOf(phase) + 1;

  if (isLocked) {
    return (
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-stone-200 text-sm font-semibold text-stone-400">
        {phaseNum}
      </span>
    );
  }

  if (completion === 100) {
    return (
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#6a7a6a] text-sm font-semibold text-white">
        ✓
      </span>
    );
  }

  if (isActive) {
    return (
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#3a3a3a] text-sm font-semibold text-white ring-2 ring-[#3a3a3a] ring-offset-2">
        {phaseNum}
      </span>
    );
  }

  return (
    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-stone-300 text-sm font-semibold text-stone-600">
      {phaseNum}
    </span>
  );
}

// === PREMIUM: Priority Indicator (subtle) ===
function PriorityIndicator({ priority }: { priority: string }) {
  const styles = {
    high: "bg-[#c4a7a7]/20 text-[#6a4a4a]",
    medium: "bg-[#d4c4a8]/20 text-[#6a5a4a]",
    low: "bg-stone-100 text-stone-500",
  };

  return (
    <span
      className={`rounded-full px-2 py-0.5 text-xs font-medium ${styles[priority as keyof typeof styles]}`}
    >
      {priority}
    </span>
  );
}

// === PREMIUM: Phase Completion Calculation ===
function calculatePhaseCompletion(items: TimelineItem[]): number {
  if (items.length === 0) return 0;
  const completed = items.filter((i) => i.status === "Completed").length;
  return Math.round((completed / items.length) * 100);
}

// === PREMIUM: Phase Lock Check ===
function checkPhaseLock(
  phase: TimelinePhase,
  phaseMap: Map<TimelinePhase, TimelineItem[]>,
  plan: UserPlanInput
): { isLocked: boolean; reason?: string } {
  const phaseIndex = PHASE_ORDER.indexOf(phase);

  if (phaseIndex === 0) return { isLocked: false };

  const previousPhase = PHASE_ORDER[phaseIndex - 1];
  const previousItems = phaseMap.get(previousPhase) || [];
  const previousCompletion = calculatePhaseCompletion(previousItems);

  if (phase === "preparation") {
    const hasCountries = (plan.shortlisted_countries || []).length > 0;
    if (!hasCountries) {
      return {
        isLocked: true,
        reason: "Country shortlist required",
      };
    }
    if (previousCompletion < 50) {
      return {
        isLocked: true,
        reason: `Complete ${PHASE_METADATA[previousPhase].name} first`,
      };
    }
    return { isLocked: false };
  }

  if (previousCompletion < 60) {
    return {
      isLocked: true,
      reason: `Complete ${PHASE_METADATA[previousPhase].name} first`,
    };
  }

  return { isLocked: false };
}

// === PREMIUM: Generate Timeline Items ===
function generatePhaseBasedTimeline(plan: UserPlanInput): TimelineItem[] {
  const items: TimelineItem[] = [];
  const countries = plan.shortlisted_countries || [];
  const hasCountries = countries.length > 0;
  const donor = plan.donor_needed;
  const surrogate = plan.surrogate_needed;

  // Phase 1: Planning & Decision
  items.push({
    id: "p1-1",
    title: "Define pathway structure",
    category: "Planning",
    status: plan.pathway_type ? "Completed" : "In Progress",
    description: `Confirm your treatment direction: ${plan.pathway_type || "IVF pathway to be defined"}`,
    phase: "planning",
    priority: "high",
    dependencies: [],
    isLocked: false,
    estimatedDuration: "1-2 days",
  });

  items.push({
    id: "p1-2",
    title: hasCountries
      ? "Validate shortlisted countries"
      : "Build country shortlist",
    category: "Research",
    status: hasCountries ? "Completed" : "Upcoming",
    description: hasCountries
      ? `Selected: ${countries.join(", ")}. Validate legal fit.`
      : "Identify 2-3 jurisdictions supporting your treatment structure.",
    phase: "planning",
    priority: "high",
    dependencies: ["p1-1"],
    isLocked: !plan.pathway_type,
    lockReason: plan.pathway_type ? undefined : "Complete pathway definition first",
  });

  items.push({
    id: "p1-3",
    title: "Compare legal pathways",
    category: "Legal",
    status: hasCountries ? "In Progress" : "Upcoming",
    description: "Analyze legal structures, parental rights, and cross-border risks.",
    phase: "planning",
    priority: "high",
    dependencies: ["p1-2"],
    isLocked: !hasCountries,
    lockReason: hasCountries ? undefined : "Select countries first",
  });

  items.push({
    id: "p1-4",
    title: "Lock final country decision",
    category: "Decision",
    status: countries.length === 1 ? "Completed" : "Upcoming",
    description:
      countries.length === 1
        ? `Committed to: ${countries[0]}`
        : "Narrow to single jurisdiction for execution planning.",
    phase: "planning",
    priority: "high",
    dependencies: ["p1-3"],
    isLocked: countries.length === 0,
    lockReason: countries.length === 0 ? "Complete country comparison first" : undefined,
  });

  // Phase 2: Preparation
  if (surrogate) {
    items.push({
      id: "p2-s1",
      title: "Assess surrogacy legal pathway",
      category: "Legal",
      status: "Upcoming",
      description: "Understand legal structure, parental rights, and cross-border risks.",
      phase: "preparation",
      priority: "high",
      dependencies: ["p1-4"],
      isLocked: true,
    });
  }

  if (donor) {
    items.push({
      id: "p2-d1",
      title: "Confirm donor pathway constraints",
      category: "Medical",
      status: "Upcoming",
      description: "Review donor eligibility, anonymity rules, and clinic matching.",
      phase: "preparation",
      priority: "high",
      dependencies: ["p1-4"],
      isLocked: true,
    });
  }

  items.push({
    id: "p2-1",
    title: "Clinic identification and outreach",
    category: "Medical",
    status: "Upcoming",
    description: "Research and contact 2-3 clinics in your target country.",
    phase: "preparation",
    priority: "high",
    dependencies: ["p1-4"],
    isLocked: true,
  });

  items.push({
    id: "p2-2",
    title: "Initial legal consultation",
    category: "Legal",
    status: "Upcoming",
    description: "Engage fertility lawyer in target jurisdiction for pathway validation.",
    phase: "preparation",
    priority: "high",
    dependencies: ["p1-4"],
    isLocked: true,
  });

  items.push({
    id: "p2-3",
    title: "Financial planning and budget lock",
    category: "Finance",
    status: "Upcoming",
    description: "Validate budget against full pathway cost including travel and legal.",
    phase: "preparation",
    priority: "high",
    dependencies: ["p2-1", "p2-2"],
    isLocked: true,
  });

  // Phase 3: Pre-Treatment
  items.push({
    id: "p3-1",
    title: "Travel documentation review",
    category: "Logistics",
    status: "Upcoming",
    description: "Check passport validity, visa requirements, and travel restrictions.",
    phase: "pre-treatment",
    priority: "high",
    dependencies: ["p2-3"],
    isLocked: true,
  });

  items.push({
    id: "p3-2",
    title: "Medical documentation preparation",
    category: "Logistics",
    status: "Upcoming",
    description: "Prepare translated medical records and clinic intake forms.",
    phase: "pre-treatment",
    priority: "high",
    dependencies: ["p2-3"],
    isLocked: true,
  });

  items.push({
    id: "p3-3",
    title: "Cycle scheduling and coordination",
    category: "Medical",
    status: "Upcoming",
    description: "Align travel dates with treatment cycle and availability.",
    phase: "pre-treatment",
    priority: "high",
    dependencies: ["p3-1", "p3-2"],
    isLocked: true,
  });

  // Phase 4: Treatment
  items.push({
    id: "p4-1",
    title: "Begin treatment cycle",
    category: "Medical",
    status: "Upcoming",
    description: "Start stimulation protocol and monitoring appointments.",
    phase: "treatment",
    priority: "high",
    dependencies: ["p3-3"],
    isLocked: true,
  });

  items.push({
    id: "p4-2",
    title: "Ongoing monitoring and adjustments",
    category: "Medical",
    status: "Upcoming",
    description: "Regular scans, bloodwork, and protocol optimization.",
    phase: "treatment",
    priority: "high",
    dependencies: ["p4-1"],
    isLocked: true,
  });

  items.push({
    id: "p4-3",
    title: "Egg retrieval / embryo creation",
    category: "Medical",
    status: "Upcoming",
    description: "Procedure day and laboratory fertilization process.",
    phase: "treatment",
    priority: "high",
    dependencies: ["p4-2"],
    isLocked: true,
  });

  items.push({
    id: "p4-4",
    title: "Embryo transfer",
    category: "Medical",
    status: "Upcoming",
    description: "Transfer procedure and post-transfer care instructions.",
    phase: "treatment",
    priority: "high",
    dependencies: ["p4-3"],
    isLocked: true,
  });

  // Phase 5: Post-Treatment
  items.push({
    id: "p5-1",
    title: "Recovery and monitoring period",
    category: "Medical",
    status: "Upcoming",
    description: "Two-week wait and early pregnancy monitoring.",
    phase: "post-treatment",
    priority: "high",
    dependencies: ["p4-4"],
    isLocked: true,
  });

  items.push({
    id: "p5-2",
    title: "Legal registration (if applicable)",
    category: "Legal",
    status: "Upcoming",
    description: "Birth registration and parental order applications.",
    phase: "post-treatment",
    priority: "high",
    dependencies: ["p5-1"],
    isLocked: true,
  });

  items.push({
    id: "p5-3",
    title: "Return travel planning",
    category: "Logistics",
    status: "Upcoming",
    description: "Coordinate safe return with medical clearance.",
    phase: "post-treatment",
    priority: "medium",
    dependencies: ["p5-1"],
    isLocked: true,
  });

  return items;
}

// === PREMIUM: Build Phase Metadata ===
type PhaseMeta = {
  id: TimelinePhase;
  name: string;
  order: number;
  description: string;
  isLocked: boolean;
  lockReason?: string;
  unlocksDescription: string;
  completionPercentage: number;
  items: TimelineItem[];
  skippedImpact: string;
};

function buildPhaseMeta(
  items: TimelineItem[],
  plan: UserPlanInput
): PhaseMeta[] {
  const phaseMap = new Map<TimelinePhase, TimelineItem[]>();
  PHASE_ORDER.forEach((phase) => phaseMap.set(phase, []));

  items.forEach((item) => {
    const phaseItems = phaseMap.get(item.phase) || [];
    phaseItems.push(item);
    phaseMap.set(item.phase, phaseItems);
  });

  const unlocksDesc: Record<TimelinePhase, string> = {
    planning: "Clinic identification, legal consultation, and preparation phase",
    preparation: "Travel planning, documentation, and pre-treatment coordination",
    "pre-treatment": "Begin treatment cycle, monitoring, and medical procedures",
    treatment: "Recovery, follow-up, and post-treatment legal processes",
    "post-treatment": "Completion and return to home country with full documentation",
  };

  const skippedImpact: Record<TimelinePhase, string> = {
    planning: "Without clear direction, clinic selection and legal pathways remain undefined, causing costly mid-process changes.",
    preparation: "Skipping preparation risks clinic misalignment, legal gaps, and budget surprises during execution.",
    "pre-treatment": "Without proper documentation and scheduling, treatment cycles face delays and logistical failures.",
    treatment: "Treatment cannot proceed without pre-treatment completion. Medical and legal sequencing is mandatory.",
    "post-treatment": "Skipping post-treatment risks citizenship issues, legal non-compliance, and unsafe travel.",
  };

  return PHASE_ORDER.map((phase, index) => {
    const phaseItems = phaseMap.get(phase) || [];
    const lockStatus = checkPhaseLock(phase, phaseMap, plan);
    const completionPercentage = calculatePhaseCompletion(phaseItems);

    return {
      id: phase,
      name: PHASE_METADATA[phase].name,
      order: index + 1,
      description: PHASE_METADATA[phase].description,
      isLocked: lockStatus.isLocked,
      lockReason: lockStatus.reason,
      unlocksDescription: unlocksDesc[phase],
      completionPercentage,
      items: phaseItems,
      skippedImpact: skippedImpact[phase],
    };
  });
}

// === PREMIUM: Get Next Action ===
function getNextPhaseAction(
  phases: PhaseMeta[],
  plan: UserPlanInput
): {
  item: TimelineItem | null;
  phase: PhaseMeta | null;
  context: string;
} {
  void plan;

  for (const phase of phases) {
    if (phase.isLocked) continue;

    const incompleteItems = phase.items.filter(
      (i) => i.status !== "Completed" && !i.isLocked
    );

    if (incompleteItems.length > 0) {
      const inProgress = incompleteItems.find((i) => i.status === "In Progress");
      if (inProgress) {
        return {
          item: inProgress,
          phase,
          context: `Active in ${phase.name}`,
        };
      }

      const nextUpcoming = incompleteItems
        .filter((i) => i.status === "Upcoming")
        .sort((a, b) => {
          const weight = { high: 3, medium: 2, low: 1 };
          return weight[b.priority] - weight[a.priority];
        })[0];

      if (nextUpcoming) {
        return {
          item: nextUpcoming,
          phase,
          context: `Next in ${phase.name}`,
        };
      }
    }
  }

  const firstLocked = phases.find((p) => p.isLocked);
  return {
    item: null,
    phase: firstLocked || null,
    context: firstLocked
      ? `${firstLocked.name} locked`
      : "All phases complete",
  };
}

// === PREMIUM: Grouped Signals ===
interface GroupedSignals {
  blockers: string[];
  warnings: string[];
  ready: string[];
}

function getGroupedSignals(
  plan: UserPlanInput,
  phases: PhaseMeta[]
): GroupedSignals {
  const signals: GroupedSignals = {
    blockers: [],
    warnings: [],
    ready: [],
  };

  const hasPathway = !!plan.pathway_type?.trim();
  const hasCountries = (plan.shortlisted_countries || []).length > 0;
  const allItems = phases.flatMap((p) => p.items);
  const hasInProgress = allItems.some((i) => i.status === "In Progress");

  if (!hasPathway) {
    signals.blockers.push("Planning context missing — timeline exists without defined pathway");
  }

  if (hasPathway && !hasCountries) {
    signals.blockers.push("Country shortlist missing — timeline generated but no countries selected");
  }

  const lockedPhases = phases.filter((p) => p.isLocked);
  if (lockedPhases.length > 0 && hasPathway) {
    signals.warnings.push(`${lockedPhases.length} phase(s) locked — complete current phase to proceed`);
  }

  if (hasInProgress) {
    signals.ready.push("Timeline is active — execution planning in progress");
  }

  return signals;
}

export default function PortalTimelinePage() {
  const [plan, setPlan] = useState<UserPlanInput>(EMPTY_USER_PLAN_INPUT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const [expandedPhases, setExpandedPhases] = useState<Set<TimelinePhase>>(new Set());

  useEffect(() => {
    let isMounted = true;

    async function loadPlan() {
      try {
        const existing = await getCurrentUserPlan();

        if (!isMounted) return;

        if (existing) {
          const normalizedItems =
            existing.timeline_items.length > 0
              ? existing.timeline_items.map((item) => ({
                  ...item,
                  phase: (item.phase as TimelinePhase) || "planning",
                  priority: (item.priority as "high" | "medium" | "low") || "medium",
                  dependencies: item.dependencies || [],
                  isLocked: item.isLocked ?? false,
                }))
              : [];

          setPlan({
            ...existing,
            timeline_items: normalizedItems,
          });

          // PREMIUM: Auto-expand only current active phase
          if (normalizedItems.length > 0) {
            const phases = buildPhaseMeta(normalizedItems, existing);
            const activePhase = phases.find(
              (p) => !p.isLocked && p.completionPercentage < 100 && p.completionPercentage > 0
            ) || phases.find((p) => !p.isLocked);
            if (activePhase) {
              setExpandedPhases(new Set([activePhase.id]));
            }
          }
        }

        setMessage(null);
        setIsError(false);
      } catch (error: unknown) {
        console.error(error);
        if (isMounted) {
          setIsError(true);
          setMessage("Failed to load your timeline.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    void loadPlan();
    return () => {
      isMounted = false;
    };
  }, []);

  const phases = useMemo(() => buildPhaseMeta(plan.timeline_items, plan), [plan]);
  const allItems = useMemo(() => phases.flatMap((p) => p.items), [phases]);
  const readiness = useMemo(() => calculateTimelineReadiness(plan), [plan]);
  const nextAction = useMemo(() => getNextPhaseAction(phases, plan), [phases, plan]);
  // Timeline counts available via getTimelineCounts(allItems) if needed
  const groupedSignals = useMemo(() => getGroupedSignals(plan, phases), [plan, phases]);
  const executionStageResult = useMemo(() => determineExecutionStage(plan), [plan]);

  const activePhase = phases.find(
    (p) => !p.isLocked && p.completionPercentage < 100
  );

  function togglePhase(phaseId: TimelinePhase) {
    setExpandedPhases((prev) => {
      const next = new Set(prev);
      if (next.has(phaseId)) {
        next.delete(phaseId);
      } else {
        next.add(phaseId);
      }
      return next;
    });
  }

  function updateItemStatus(itemId: string, newStatus: TimelineItemStatus) {
    setMessage(null);
    setIsError(false);

    setPlan((current) => ({
      ...current,
      timeline_items: current.timeline_items.map((item) =>
        item.id === itemId ? { ...item, status: newStatus } : item
      ),
    }));
  }

  function handleGenerateTimeline() {
    setMessage(null);
    setIsError(false);

    const generatedTasks = generatePhaseBasedTimeline(plan);

    setPlan((current) => ({
      ...current,
      timeline_items: generatedTasks,
    }));

    const newPhases = buildPhaseMeta(generatedTasks, plan);
    const activePhase = newPhases.find(
      (p) => !p.isLocked && p.completionPercentage < 100 && p.completionPercentage > 0
    ) || newPhases.find((p) => !p.isLocked);
    if (activePhase) {
      setExpandedPhases(new Set([activePhase.id]));
    }

    setMessage("Timeline generated. Review phases and activate your first task.");
  }

  async function handleSave() {
    try {
      setSaving(true);
      setMessage(null);
      setIsError(false);

      await upsertCurrentUserPlan(plan);
      setMessage("Timeline saved.");
    } catch (error: unknown) {
      console.error(error);
      setIsError(true);
      setMessage("Failed to save timeline.");
    } finally {
      setSaving(false);
    }
  }

  const planningContext = useMemo(
    () => ({
      pathwayType: getDisplayValue(plan.pathway_type, "Not specified"),
      shortlistedCountries:
        (plan.shortlisted_countries || []).length > 0
          ? plan.shortlisted_countries.join(", ")
          : "None selected",
      targetTimeline: getDisplayValue(plan.target_timeline, "Not defined"),
      budgetRange: getDisplayValue(plan.budget_range, "Not defined"),
    }),
    [plan.pathway_type, plan.shortlisted_countries, plan.target_timeline, plan.budget_range]
  );

  if (loading) {
    return (
      <div className="space-y-8 max-w-6xl">
        <div className="h-32 animate-pulse rounded-2xl bg-stone-100" />
        <div className="grid gap-6 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-40 animate-pulse rounded-2xl bg-stone-100" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl">
      {/* === PREMIUM: EXECUTIVE OVERVIEW HEADER === */}
      <section className="rounded-2xl border-2 border-[#3a3a3a] bg-[#3a3a3a] p-8 text-white shadow-xl">
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-stone-400">
              Execution Roadmap
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">
              {activePhase 
                ? `Currently in ${activePhase.name}`
                : "Generate your execution timeline"}
            </h1>
            <p className="mt-3 text-base text-stone-300 max-w-3xl leading-relaxed">
              {activePhase
                ? `${activePhase.description}. Complete this phase to unlock ${activePhase.unlocksDescription}.`
                : "Your fertility journey organized into five strategic phases. Each phase unlocks the next."}
            </p>
          </div>

          {/* Execution Stage Summary */}
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="rounded-xl bg-stone-800/50 p-4 border border-stone-700">
              <p className="text-xs font-bold uppercase tracking-wider text-stone-400">Execution Stage</p>
              <p className="mt-1 text-lg font-semibold capitalize">
                {executionStageResult.stage.replace(/-/g, " ")}
              </p>
              <p className="mt-1 text-xs text-stone-400">
                {executionStageResult.description.slice(0, 60)}...
              </p>
            </div>
            <div className="rounded-xl bg-stone-800/50 p-4 border border-stone-700">
              <p className="text-xs font-bold uppercase tracking-wider text-stone-400">Readiness</p>
              <p className="mt-1 text-lg font-semibold">{readiness.percentage}%</p>
              <p className="mt-1 text-xs text-stone-400 capitalize">{readiness.stage}</p>
            </div>
            <div className="rounded-xl bg-stone-800/50 p-4 border border-stone-700">
              <p className="text-xs font-bold uppercase tracking-wider text-stone-400">Current Focus</p>
              <p className="mt-1 text-lg font-semibold truncate">
                {nextAction.item?.title || nextAction.context}
              </p>
              <p className="mt-1 text-xs text-stone-400">
                {nextAction.phase?.name || "All phases"}
              </p>
            </div>
          </div>

          {/* Primary Action */}
          {allItems.length === 0 ? (
            <button
              type="button"
              onClick={handleGenerateTimeline}
              className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-stone-900 transition hover:bg-stone-100 w-fit"
            >
              Generate Timeline
            </button>
          ) : (
            <div className="flex items-center gap-4">
              <a
                href={nextAction.item ? `#phase-${nextAction.phase?.id}` : "#phases"}
                className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-stone-900 transition hover:bg-stone-100"
              >
                {nextAction.item ? "Continue Current Phase" : "Review All Phases"}
              </a>
              <span className="text-sm text-stone-400">
                {nextAction.item?.title || nextAction.context}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* === PREMIUM: GROUPED SIGNALS === */}
      {(groupedSignals.blockers.length > 0 || groupedSignals.warnings.length > 0 || groupedSignals.ready.length > 0) && (
        <section className="grid gap-4 lg:grid-cols-3">
          {groupedSignals.blockers.length > 0 && (
            <div className="rounded-xl border border-[#c4a7a7] bg-[#faf6f6] p-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#8a6a6a] mb-2">
                Blockers
              </h3>
              <ul className="space-y-1">
                {groupedSignals.blockers.map((signal, idx) => (
                  <li key={idx} className="text-sm text-[#6a4a4a] flex items-start gap-2">
                    <span className="text-[#c4a7a7]">•</span>
                    {signal}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {groupedSignals.warnings.length > 0 && (
            <div className="rounded-xl border border-[#d4c4a8] bg-[#faf8f3] p-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#8a7a5a] mb-2">
                Attention
              </h3>
              <ul className="space-y-1">
                {groupedSignals.warnings.map((signal, idx) => (
                  <li key={idx} className="text-sm text-[#6a5a4a] flex items-start gap-2">
                    <span className="text-[#b4a080]">•</span>
                    {signal}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {groupedSignals.ready.length > 0 && (
            <div className="rounded-xl border border-[#a7c4a7] bg-[#f0f4f0] p-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#4a5a4a] mb-2">
                Ready
              </h3>
              <ul className="space-y-1">
                {groupedSignals.ready.map((signal, idx) => (
                  <li key={idx} className="text-sm text-[#4a5a4a] flex items-start gap-2">
                    <span className="text-[#6a7a6a]">•</span>
                    {signal}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      {/* === PREMIUM: VISUAL ROADMAP SPINE === */}
      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-stone-900 mb-4">Journey Overview</h2>
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute top-4 left-0 right-0 h-0.5 bg-stone-200" />
          <div className="relative grid grid-cols-5 gap-2">
            {phases.map((phase, idx) => {
              const isCompleted = phase.completionPercentage === 100;
              const isActive = !phase.isLocked && phase.completionPercentage < 100 && phase.completionPercentage > 0;
              // Phase status: completed, active, or upcoming

              return (
                <button
                  key={phase.id}
                  onClick={() => togglePhase(phase.id)}
                  className="flex flex-col items-center gap-2 text-center group"
                >
                  <div className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition ${
                    isCompleted 
                      ? "bg-[#6a7a6a] text-white" 
                      : isActive 
                        ? "bg-[#3a3a3a] text-white ring-2 ring-[#3a3a3a] ring-offset-2" 
                        : "bg-stone-200 text-stone-500 group-hover:bg-stone-300"
                  }`}>
                    {isCompleted ? "✓" : idx + 1}
                  </div>
                  <div className="space-y-1">
                    <p className={`text-xs font-medium ${
                      isActive ? "text-stone-900" : "text-stone-500"
                    }`}>
                      {phase.name}
                    </p>
                    <p className="text-[10px] text-stone-400">
                      {isCompleted ? "Complete" : isActive ? `${phase.completionPercentage}%` : phase.isLocked ? "Locked" : "Pending"}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* === PREMIUM: PHASE DETAILS (COLLAPSIBLE) === */}
      <section id="phases" className="space-y-4">
        {phases.map((phase) => {
          const isExpanded = expandedPhases.has(phase.id);
          const isActive = !phase.isLocked && phase.completionPercentage < 100;
          const isCompleted = phase.completionPercentage === 100;

          return (
            <div
              key={phase.id}
              id={`phase-${phase.id}`}
              className={`rounded-2xl border shadow-sm transition-all ${
                isActive
                  ? "border-[#3a3a3a] bg-white"
                  : isCompleted
                    ? "border-stone-200 bg-stone-50/50"
                    : phase.isLocked
                      ? "border-stone-200 bg-stone-50"
                      : "border-stone-200 bg-white"
              }`}
            >
              {/* Phase Header */}
              <button
                onClick={() => togglePhase(phase.id)}
                className="flex w-full items-center justify-between p-6 text-left"
              >
                <div className="flex items-center gap-4">
                  <PhaseBadge
                    phase={phase.id}
                    isLocked={phase.isLocked}
                    isActive={isActive}
                    completion={phase.completionPercentage}
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3
                        className={`text-lg font-semibold ${
                          phase.isLocked ? "text-stone-400" : "text-stone-900"
                        }`}
                      >
                        {phase.name}
                      </h3>
                      {isActive && (
                        <span className="rounded-full bg-[#3a3a3a] px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                          Current
                        </span>
                      )}
                      {isCompleted && (
                        <span className="rounded-full bg-[#6a7a6a] px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                          Complete
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-stone-600">
                      {phase.isLocked ? phase.lockReason : phase.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-stone-900">
                      {phase.items.filter((i) => i.status === "Completed").length} /{" "}
                      {phase.items.length}
                    </p>
                    <p className="text-xs text-stone-500">tasks</p>
                  </div>
                  <svg
                    className={`h-5 w-5 text-stone-400 transition-transform ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>

              {/* Phase Content (Collapsible) */}
              {isExpanded && (
                <div className="border-t border-stone-200 px-6 pb-6">
                  {/* PREMIUM: Phase Purpose Summary */}
                  <div className="mt-6 grid gap-4 lg:grid-cols-2">
                    <div className="rounded-xl bg-[#f0f4f0] border border-[#d8e0d8] p-4">
                      <p className="text-xs font-bold uppercase tracking-wider text-[#4a5a4a] mb-2">
                        What this unlocks
                      </p>
                      <p className="text-sm text-[#4a5a4a]">
                        {phase.unlocksDescription}
                      </p>
                    </div>
                    <div className="rounded-xl bg-[#faf6f6] border border-[#e8d8d8] p-4">
                      <p className="text-xs font-bold uppercase tracking-wider text-[#8a6a6a] mb-2">
                        If skipped
                      </p>
                      <p className="text-sm text-[#6a4a4a]">
                        {phase.skippedImpact}
                      </p>
                    </div>
                  </div>

                  {phase.isLocked ? (
                    <div className="mt-6 py-8 text-center">
                      <p className="text-stone-500">
                        Complete previous phases to unlock {phase.name.toLowerCase()}
                      </p>
                    </div>
                  ) : (
                    <div className="mt-6 space-y-3">
                      {phase.items.map((item, idx) => (
                        <div
                          key={item.id}
                          className={`rounded-xl border p-4 transition ${
                            item.status === "Completed"
                              ? "border-stone-200 bg-stone-50/70"
                              : item.status === "In Progress"
                                ? "border-[#d4c4a8] bg-[#faf8f3]"
                                : item.status === "Blocked"
                                  ? "border-[#c4a7a7] bg-[#faf6f6]"
                                  : "border-stone-200 bg-white"
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                              item.status === "Completed"
                                ? "bg-[#6a7a6a] text-white"
                                : item.status === "In Progress"
                                  ? "bg-[#3a3a3a] text-white"
                                  : "bg-stone-200 text-stone-600"
                            }`}>
                              {idx + 1}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-4">
                                <div className="min-w-0">
                                  <h4
                                    className={`font-semibold ${
                                      item.status === "Completed"
                                        ? "text-stone-500 line-through"
                                        : "text-stone-900"
                                    }`}
                                  >
                                    {item.title}
                                  </h4>
                                  <p className="mt-1 text-sm text-stone-600">
                                    {item.description}
                                  </p>
                                </div>
                                <StatusPill
                                  value={item.status}
                                  onChange={(status) =>
                                    updateItemStatus(item.id, status)
                                  }
                                  isLocked={item.isLocked}
                                />
                              </div>

                              <div className="mt-3 flex items-center gap-3">
                                <PriorityIndicator priority={item.priority} />
                                <span className="text-xs text-stone-500">
                                  {item.category}
                                </span>
                                {item.estimatedDuration && (
                                  <span className="text-xs text-stone-400">
                                    ~{item.estimatedDuration}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </section>

      {/* === PREMIUM: PLANNING CONTEXT (COMPACT) === */}
      <section className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-stone-500">Pathway:</span>
            <span className="text-sm font-semibold text-stone-900">{planningContext.pathwayType}</span>
          </div>
          <div className="h-4 w-px bg-stone-200 hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-stone-500">Countries:</span>
            <span className="text-sm font-semibold text-stone-900 truncate max-w-[200px]">{planningContext.shortlistedCountries}</span>
          </div>
          <div className="h-4 w-px bg-stone-200 hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-stone-500">Timeline:</span>
            <span className="text-sm font-semibold text-stone-900">{planningContext.targetTimeline}</span>
          </div>
        </div>
      </section>

      {/* === PREMIUM: ACTIONS === */}
      <section className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div>
          <h3 className="font-semibold text-stone-900">Manage Timeline</h3>
          <p className="text-sm text-stone-600">
            Regenerate from your latest planning context or save current progress
          </p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleGenerateTimeline}
            className="rounded-xl border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
          >
            Regenerate from Plan
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="rounded-xl bg-[#3a3a3a] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#2a2a2a] disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Progress"}
          </button>
        </div>
        {message && (
          <p className={`w-full text-sm ${isError ? "text-red-600" : "text-green-700"}`}>
            {message}
          </p>
        )}
      </section>
    </div>
  );
}