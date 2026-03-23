"use client";

import { useEffect, useMemo, useState } from "react";  // Removed unused 'Link'
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
  getTimelineCounts,
  determineExecutionStage,
  getDisplayValue,
} from "@/lib/intelligence/plan-intelligence";

export const runtime = "edge";

// Phase badge component
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

// Priority indicator
function PriorityIndicator({ priority }: { priority: string }) {
  const styles = {
    high: "bg-[#c4a7a7] text-[#5c3a3a]",
    medium: "bg-[#d4c4a8] text-[#5c4a3a]",
    low: "bg-stone-200 text-stone-600",
  };

  return (
    <span
      className={`rounded-full px-2 py-0.5 text-xs font-medium ${styles[priority as keyof typeof styles]}`}
    >
      {priority}
    </span>
  );
}

// Status selector
function StatusSelector({
  value,
  onChange,
  isLocked,
}: {
  value: TimelineItemStatus;
  onChange: (status: TimelineItemStatus) => void;
  isLocked: boolean;
}) {
  const options: TimelineItemStatus[] = [
    "Completed",
    "In Progress",
    "Upcoming",
    "Blocked",
  ];

  if (isLocked) {
    return (
      <span className="inline-flex items-center rounded-lg bg-stone-100 px-3 py-1.5 text-sm text-stone-500">
        Locked
      </span>
    );
  }

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as TimelineItemStatus)}
      className="rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-sm text-stone-900 focus:border-[#3a3a3a] focus:outline-none"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}

// Calculate phase completion percentage
function calculatePhaseCompletion(items: TimelineItem[]): number {
  if (items.length === 0) return 0;
  const completed = items.filter((i) => i.status === "Completed").length;
  return Math.round((completed / items.length) * 100);
}

// Check if phase is locked
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
        reason:
          "Country shortlist required. Complete Phase 1 and select countries first.",
      };
    }
    if (previousCompletion < 50) {
      return {
        isLocked: true,
        reason: `Complete at least 50% of ${PHASE_METADATA[previousPhase].name} first (${previousCompletion}%)`,
      };
    }
    return { isLocked: false };
  }

  if (previousCompletion < 60) {
    return {
      isLocked: true,
      reason: `Complete ${PHASE_METADATA[previousPhase].name} first (${previousCompletion}% done, need 60%)`,
    };
  }

  return { isLocked: false };
}

// Generate dynamic phase-based timeline
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
      ? `Selected: ${countries.join(", ")}. Validate legal fit for your pathway.`
      : "Identify 2-3 jurisdictions that support your required treatment structure.",
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
    description:
      "Analyze legal structures, parental rights, and cross-border execution risks.",
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
    lockReason:
      countries.length === 0 ? "Complete country comparison first" : undefined,
  });

  // Phase 2: Preparation (conditional items based on pathway)
  if (surrogate) {
    items.push({
      id: "p2-s1",
      title: "Assess surrogacy legal pathway",
      category: "Legal",
      status: "Upcoming",
      description:
        "Understand legal structure, parental rights, and cross-border execution risks.",
      phase: "preparation",
      priority: "high",
      dependencies: ["p1-4"],
      isLocked: true,
    });

    items.push({
      id: "p2-s2",
      title: "Identify surrogacy agencies",
      category: "Research",
      status: "Upcoming",
      description:
        "Research and shortlist reputable surrogacy agencies in your target country.",
      phase: "preparation",
      priority: "high",
      dependencies: ["p2-s1"],
      isLocked: true,
    });
  }

  if (donor) {
    items.push({
      id: "p2-d1",
      title: "Confirm donor pathway constraints",
      category: "Medical",
      status: "Upcoming",
      description:
        "Review donor eligibility, anonymity rules, and clinic matching processes.",
      phase: "preparation",
      priority: "high",
      dependencies: ["p1-4"],
      isLocked: true,
    });

    if (countries.includes("Greece") || countries.includes("Spain")) {
      items.push({
        id: "p2-d2",
        title: "Review EU donor anonymity regulations",
        category: "Legal",
        status: "Upcoming",
        description: "Understand GDPR implications and donor privacy frameworks.",
        phase: "preparation",
        priority: "medium",
        dependencies: ["p2-d1"],
        isLocked: true,
      });
    }
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
    description:
      "Engage fertility lawyer in target jurisdiction for pathway validation.",
    phase: "preparation",
    priority: "high",
    dependencies: ["p1-4"],
    isLocked: true,
  });

  items.push({
    id: "p2-3",
    title: "Medical record compilation",
    category: "Medical",
    status: "Upcoming",
    description:
      "Gather fertility history, test results, and referral documentation.",
    phase: "preparation",
    priority: "medium",
    dependencies: ["p2-1"],
    isLocked: true,
  });

  items.push({
    id: "p2-4",
    title: "Financial planning and budget lock",
    category: "Finance",
    status: "Upcoming",
    description:
      "Validate budget against full pathway cost including travel, legal, and contingency.",
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
    description:
      "Check passport validity, visa requirements, and travel restrictions.",
    phase: "pre-treatment",
    priority: "high",
    dependencies: ["p2-4"],
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
    description:
      "Align travel dates with treatment cycle and donor/surrogate availability.",
    phase: "pre-treatment",
    priority: "high",
    dependencies: ["p3-1", "p3-2"],
    isLocked: true,
  });

  if (
    plan.target_timeline?.includes("6 months") ||
    plan.target_timeline?.includes("urgent")
  ) {
    items.push({
      id: "p3-exp",
      title: "Expedited clinic booking (priority timeline)",
      category: "Medical",
      status: "Upcoming",
      description:
        "Request priority scheduling due to accelerated timeline requirements.",
      phase: "pre-treatment",
      priority: "high",
      dependencies: ["p3-3"],
      isLocked: true,
    });
  }

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
    description:
      "Coordinate safe return with medical clearance and documentation.",
    phase: "post-treatment",
    priority: "medium",
    dependencies: ["p5-1"],
    isLocked: true,
  });

  return items;
}

// Build phase metadata with lock status
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
};

function buildPhaseMeta(
  items: TimelineItem[],
  plan: UserPlanInput
): PhaseMeta[] {
  // Group items by phase
  const phaseMap = new Map<TimelinePhase, TimelineItem[]>();
  PHASE_ORDER.forEach((phase) => phaseMap.set(phase, []));

  items.forEach((item) => {
    const phaseItems = phaseMap.get(item.phase) || [];
    phaseItems.push(item);
    phaseMap.set(item.phase, phaseItems);
  });

  // Build metadata
  return PHASE_ORDER.map((phase, index) => {
    const phaseItems = phaseMap.get(phase) || [];
    const lockStatus = checkPhaseLock(phase, phaseMap, plan);
    const completionPercentage = calculatePhaseCompletion(phaseItems);

    const unlocksDesc: Record<TimelinePhase, string> = {
      planning: "Clinic identification, legal consultation, and preparation phase",
      preparation: "Travel planning, documentation, and pre-treatment coordination",
      "pre-treatment": "Begin treatment cycle, monitoring, and medical procedures",
      treatment: "Recovery, follow-up, and post-treatment legal processes",
      "post-treatment": "Completion and return to home country with full documentation",
    };

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
    };
  });
}

// Get next actionable item
function getNextPhaseAction(
  phases: PhaseMeta[],
  plan: UserPlanInput  // Kept as it's required by function signature
): {
  item: TimelineItem | null;
  phase: PhaseMeta | null;
  context: string;
} {
  // plan parameter used in future expansion for conditional logic
  void plan;  // Explicitly mark as intentionally unused for now
  
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
          context: `Active ${inProgress.category.toLowerCase()} task in ${phase.name}`,
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
          context: `Next ${nextUpcoming.category.toLowerCase()} task in ${phase.name}`,
        };
      }
    }
  }

  const firstLocked = phases.find((p) => p.isLocked);
  return {
    item: null,
    phase: firstLocked || null,
    context: firstLocked
      ? `${firstLocked.name} is locked: ${firstLocked.lockReason}`
      : "All phases complete",
  };
}

// Timeline signals detection
function detectTimelineSignals(
  plan: UserPlanInput,
  phases: PhaseMeta[]
): { type: "blocking" | "attention" | "ready"; message: string }[] {
  const signals: { type: "blocking" | "attention" | "ready"; message: string }[] =
    [];

  const hasPathway = !!plan.pathway_type?.trim();
  const hasCountries = (plan.shortlisted_countries || []).length > 0;
  const allItems = phases.flatMap((p) => p.items);
  const hasInProgress = allItems.some((i) => i.status === "In Progress");

  if (!hasPathway && allItems.length > 0) {
    signals.push({
      type: "blocking",
      message:
        "Planning context missing — timeline exists without a defined pathway. Return to My Plan to define your case.",
    });
  }

  if (hasPathway && !hasCountries) {
    signals.push({
      type: "blocking",
      message:
        "Country shortlist missing — timeline generated but no countries selected. Visit Countries to shortlist before execution planning.",
    });
  }

  const lockedPhases = phases.filter((p) => p.isLocked);
  if (lockedPhases.length > 0 && hasPathway) {
    signals.push({
      type: "attention",
      message: `${lockedPhases.length} phase(s) locked. Complete current phase to unlock next steps.`,
    });
  }

  if (hasInProgress) {
    signals.push({
      type: "ready",
      message: "Timeline is active — execution planning in progress.",
    });
  }

  return signals;
}

export default function PortalTimelinePage() {
  const [plan, setPlan] = useState<UserPlanInput>(EMPTY_USER_PLAN_INPUT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const [expandedPhases, setExpandedPhases] = useState<Set<TimelinePhase>>(
    new Set()
  );

  useEffect(() => {
    let isMounted = true;

    async function loadPlan() {
      try {
        const existing = await getCurrentUserPlan();

        if (!isMounted) return;

        if (existing) {
          // Normalize items to new structure
          const normalizedItems =
            existing.timeline_items.length > 0
              ? existing.timeline_items.map((item) => ({
                  ...item,
                  phase: (item.phase as TimelinePhase) || "planning",
                  priority:
                    (item.priority as "high" | "medium" | "low") || "medium",
                  dependencies: item.dependencies || [],
                  isLocked: item.isLocked ?? false,
                }))
              : [];

          setPlan({
            ...existing,
            timeline_items: normalizedItems,
          });

          // Auto-expand first unlocked phase
          if (normalizedItems.length > 0) {
            const phases = buildPhaseMeta(normalizedItems, existing);
            const firstUnlocked = phases.find((p) => !p.isLocked);
            if (firstUnlocked) {
              setExpandedPhases(new Set([firstUnlocked.id]));
            }
          }
        }
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

  // Compute phases
  const phases = useMemo(
    () => buildPhaseMeta(plan.timeline_items, plan),
    [plan]
  );

  const allItems = useMemo(() => phases.flatMap((p) => p.items), [phases]);

  const readiness = useMemo(
    () => calculateTimelineReadiness(plan),
    [plan]
  );

  const nextAction = useMemo(() => getNextPhaseAction(phases, plan), [phases, plan]);

  const timelineCounts = useMemo(() => getTimelineCounts(allItems), [allItems]);

  const signals = useMemo(() => detectTimelineSignals(plan, phases), [plan, phases]);

  const executionStageResult = useMemo(
    () => determineExecutionStage(plan),
    [plan]
  );

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

    // Auto-expand first unlocked
    const newPhases = buildPhaseMeta(generatedTasks, plan);
    const firstUnlocked = newPhases.find((p) => !p.isLocked);
    if (firstUnlocked) {
      setExpandedPhases(new Set([firstUnlocked.id]));
    }

    setMessage(
      "Timeline regenerated from your planning context. Review phases and activate your first task."
    );
  }

  async function handleSave() {
    try {
      setSaving(true);
      setMessage(null);
      setIsError(false);

      await upsertCurrentUserPlan(plan);
      setMessage("Timeline saved successfully.");
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
      pathwayType: getDisplayValue(plan.pathway_type, "Not yet specified"),
      shortlistedCountries:
        (plan.shortlisted_countries || []).length > 0
          ? plan.shortlisted_countries.join(", ")
          : "No countries shortlisted yet",
      targetTimeline: getDisplayValue(plan.target_timeline, "Not yet defined"),
      budgetRange: getDisplayValue(plan.budget_range, "Not yet defined"),
    }),
    [
      plan.pathway_type,
      plan.shortlisted_countries,
      plan.target_timeline,
      plan.budget_range,
    ]
  );

  if (loading) {
    return (
      <div className="space-y-8">
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
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-stone-500">
          Timeline
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900">
          Execution Roadmap
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-stone-600">
          Your fertility journey organized into five strategic phases. Complete
          each phase to unlock the next. Tasks are dynamically generated based
          on your pathway, country selection, and treatment requirements.
        </p>
      </div>

      {/* Executive Summary Cards */}
      <section className="grid gap-6 lg:grid-cols-3">
        {/* Readiness Card */}
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-stone-500">
              Overall Readiness
            </p>
            <span className="text-2xl font-semibold text-stone-900">
              {readiness.percentage}%
            </span>
          </div>
          <p className="mt-2 text-base font-semibold capitalize text-stone-900">
            {readiness.stage.replace("-", " ")}
          </p>
          <div className="mt-4 h-2 w-full rounded-full bg-stone-100">
            <div
              className="h-2 rounded-full bg-stone-600 transition-all"
              style={{ width: `${readiness.percentage}%` }}
            />
          </div>
          <p className="mt-3 text-sm text-stone-600">
            {activePhase
              ? `Currently in: ${activePhase.name}`
              : "Generate timeline to begin"}
          </p>
        </div>

        {/* Next Action Card */}
        <div className="rounded-2xl border-2 border-[#3a3a3a] bg-stone-50 p-6 shadow-sm">
          <p className="text-sm font-medium text-stone-500">Current Focus</p>
          <p className="mt-2 text-base font-semibold text-stone-900">
            {nextAction.item?.title || nextAction.context}
          </p>
          <p className="mt-2 text-sm text-stone-600">
            {nextAction.phase
              ? `${nextAction.phase.name} • ${nextAction.item?.category || "Phase locked"}`
              : nextAction.context}
          </p>
          {nextAction.item && (
            <div className="mt-3 flex items-center gap-2">
              <PriorityIndicator priority={nextAction.item.priority} />
              <span className="text-xs text-stone-500">
                {nextAction.item.estimatedDuration || "Duration TBD"}
              </span>
            </div>
          )}
        </div>

        {/* Phase Progress Card */}
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-stone-500">Phase Progress</p>
          <div className="mt-3 flex items-baseline gap-2">
            <p className="text-3xl font-semibold text-stone-900">
              {phases.filter((p) => p.completionPercentage === 100).length}
            </p>
            <span className="text-lg text-stone-400">/</span>
            <p className="text-lg font-medium text-stone-500">5</p>
          </div>
          <p className="mt-2 text-sm text-stone-600">
            {activePhase
              ? `Currently in: ${activePhase.name}`
              : "All phases complete"}
          </p>
          <div className="mt-3 flex gap-1">
            {phases.map((p) => (
              <div
                key={p.id}
                className={`h-1.5 flex-1 rounded-full ${
                  p.completionPercentage === 100
                    ? "bg-[#6a7a6a]"
                    : p.isLocked
                      ? "bg-stone-200"
                      : "bg-[#d4c4a8]"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Execution Stage */}
      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-stone-100">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-600">
              STAGE
            </span>
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold capitalize text-stone-900">
              {executionStageResult.stage.replace(/-/g, " ")}
            </h2>
            <p className="mt-1 text-sm text-stone-600">
              {executionStageResult.description}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {executionStageResult.nextActions.slice(0, 3).map((indicator) => (
                <span
                  key={indicator}
                  className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-600"
                >
                  {indicator}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Signals */}
      {signals.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-900">
            Timeline Signals
          </h2>
          {signals.map((signal, idx) => (
            <div
              key={idx}
              className={`rounded-xl border p-4 ${
                signal.type === "blocking"
                  ? "border-[#c4a7a7] bg-[#faf6f6]"
                  : signal.type === "attention"
                    ? "border-[#d4c4a8] bg-[#faf8f3]"
                    : "border-stone-200 bg-white"
              }`}
            >
              <p
                className={`text-sm ${
                  signal.type === "blocking"
                    ? "text-[#5c3a3a]"
                    : signal.type === "attention"
                      ? "text-[#5c4a3a]"
                      : "text-stone-800"
                }`}
              >
                {signal.type === "blocking" && "🚫 "}
                {signal.type === "attention" && "⚠️ "}
                {signal.type === "ready" && "✓ "}
                {signal.message}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* Phase Navigation */}
      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-stone-900">Phase Overview</h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-5">
          {phases.map((phase) => (
            <button
              key={phase.id}
              onClick={() => togglePhase(phase.id)}
              className={`flex flex-col items-center gap-3 rounded-xl border p-4 text-left transition hover:bg-stone-50 ${
                expandedPhases.has(phase.id)
                  ? "border-[#3a3a3a] bg-stone-50"
                  : "border-stone-200"
              }`}
            >
              <PhaseBadge
                phase={phase.id}
                isLocked={phase.isLocked}
                isActive={
                  !phase.isLocked &&
                  phase.completionPercentage < 100 &&
                  phase.completionPercentage > 0
                }
                completion={phase.completionPercentage}
              />
              <div className="text-center">
                <p
                  className={`text-sm font-semibold ${
                    phase.isLocked ? "text-stone-400" : "text-stone-900"
                  }`}
                >
                  {phase.name}
                </p>
                <p className="mt-1 text-xs text-stone-500">
                  {phase.isLocked ? "Locked" : `${phase.completionPercentage}% complete`}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Phase Details */}
      <section className="space-y-6">
        {phases.map((phase) => {
          const isExpanded = expandedPhases.has(phase.id);
          const isActive =
            !phase.isLocked && phase.completionPercentage < 100;

          return (
            <div
              key={phase.id}
              className={`rounded-2xl border shadow-sm transition-all ${
                isActive
                  ? "border-[#3a3a3a] bg-white"
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
                    <h3
                      className={`text-lg font-semibold ${
                        phase.isLocked ? "text-stone-400" : "text-stone-900"
                      }`}
                    >
                      {phase.name}
                    </h3>
                    <p className="mt-1 text-sm text-stone-600">
                      {phase.isLocked
                        ? `🔒 ${phase.lockReason}`
                        : phase.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-stone-900">
                      {phase.items.filter((i) => i.status === "Completed").length} /{" "}
                      {phase.items.length}
                    </p>
                    <p className="text-xs text-stone-500">tasks complete</p>
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

              {/* Phase Content */}
              {isExpanded && (
                <div className="border-t border-stone-200 px-6 pb-6">
                  {phase.isLocked ? (
                    <div className="py-8 text-center">
                      <p className="text-stone-500">
                        Complete previous phases to unlock {phase.name.toLowerCase()}
                      </p>
                      <p className="mt-2 text-sm text-stone-400">
                        Unlocks: {phase.unlocksDescription}
                      </p>
                    </div>
                  ) : (
                    <div className="mt-6 space-y-4">
                      {phase.items.map((item, idx) => (
                        <div
                          key={item.id}
                          className={`rounded-xl border p-4 transition ${
                            item.status === "Completed"
                              ? "border-stone-200 bg-stone-50"
                              : item.status === "In Progress"
                                ? "border-[#d4c4a8] bg-[#faf8f3]"
                                : "border-stone-200 bg-white"
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-stone-900 text-xs font-semibold text-white">
                              {idx + 1}
                            </div>
                            <div className="flex-1 space-y-3">
                              <div className="flex items-start justify-between gap-4">
                                <div>
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
                                <StatusSelector
                                  value={item.status}
                                  onChange={(status) =>
                                    updateItemStatus(item.id, status)
                                  }
                                  isLocked={item.isLocked}
                                />
                              </div>

                              <div className="flex items-center gap-3">
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

                              {item.dependencies.length > 0 && (
                                <p className="text-xs text-stone-400">
                                  Depends on: {item.dependencies.join(", ")}
                                </p>
                              )}
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

      {/* Planning Context */}
      <section className="grid gap-6 lg:grid-cols-4">
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-stone-500">Pathway</p>
          <p className="mt-2 text-lg font-semibold text-stone-900">
            {planningContext.pathwayType}
          </p>
        </div>
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-stone-500">Countries</p>
          <p className="mt-2 text-lg font-semibold text-stone-900">
            {planningContext.shortlistedCountries}
          </p>
        </div>
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-stone-500">Target Timeline</p>
          <p className="mt-2 text-lg font-semibold text-stone-900">
            {planningContext.targetTimeline}
          </p>
        </div>
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-stone-500">Budget Range</p>
          <p className="mt-2 text-lg font-semibold text-stone-900">
            {planningContext.budgetRange}
          </p>
        </div>
      </section>

      {/* Task Counts */}
      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-stone-500">Completed</p>
          <p className="mt-2 text-3xl font-semibold text-stone-900">
            {timelineCounts.completed}
          </p>
        </div>
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-stone-500">In Progress</p>
          <p className="mt-2 text-3xl font-semibold text-stone-900">
            {timelineCounts.inProgress}
          </p>
        </div>
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-stone-500">Upcoming</p>
          <p className="mt-2 text-3xl font-semibold text-stone-900">
            {timelineCounts.upcoming}
          </p>
        </div>
      </section>

      {/* Actions */}
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