"use client";

import type { TimelineItem, UserPlan, UserPlanInput } from "@/types/plan";

// Flexible plan type that accepts both UserPlan and UserPlanInput
type PlanData = UserPlan | UserPlanInput | null | undefined;

// ==================== TYPES ====================

export type ExecutionStage = 
  | "foundation" 
  | "shortlist" 
  | "sequencing" 
  | "advisory-active" 
  | "completion";

export type PriorityLevel = "critical" | "high" | "medium" | "low";

export type AdvisorySignalType = "blocking" | "attention" | "ready";

export type NextAction = {
  title: string;
  body: string;
  href: string;
  cta: string;
  priority: PriorityLevel;
};

export type AdvisorySignal = {
  type: AdvisorySignalType;
  message: string;
  action?: string;
  link?: string;
};

export type ReadinessResult = {
  score: number;
  maxScore: number;
  percentage: number;
  stage: "insufficient" | "developing" | "ready" | "optimal";
  ready: string[];
  missing: string[];
};

export type ProgressResult = {
  score: number;
  completed: string[];
  remaining: string[];
};

export type TimelineCounts = {
  total: number;
  completed: number;
  inProgress: number;
  upcoming: number;
};

export type ExecutionStageResult = {
  stage: ExecutionStage;
  description: string;
  nextActions: string[];
};

export type SystemSignal = {
  message: string;
  severity: "info" | "warning" | "success";
};

// ==================== HELPER FUNCTIONS ====================

export function getTimelineCounts(timelineItems: TimelineItem[] | undefined | null): TimelineCounts {
  const items = timelineItems ?? [];
  return {
    total: items.length,
    completed: items.filter((item) => item.status === "Completed").length,
    inProgress: items.filter((item) => item.status === "In Progress").length,
    upcoming: items.filter((item) => item.status === "Upcoming").length,
  };
}

export function countTimelineItems(
  timelineItems: TimelineItem[],
  status: TimelineItem["status"]
): number {
  return timelineItems.filter((item) => item.status === status).length;
}

export function getDisplayValue(value: string | null | undefined, fallback: string): string {
  const trimmed = value?.trim();
  return trimmed ? trimmed : fallback;
}

// ==================== CORE INTELLIGENCE ====================

export function calculatePlanningProgress(
  plan: PlanData,
  documentCount: number
): ProgressResult {
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

  return { score, completed, remaining };
}

export function calculateAdvisoryReadiness(
  plan: PlanData,
  documentCount: number
): ReadinessResult {
  const timelineCounts = getTimelineCounts(plan?.timeline_items);
  const shortlistCount = plan?.shortlisted_countries?.length ?? 0;

  const hasPathway = Boolean(plan?.pathway_type?.trim());
  const hasTreatmentGoal = Boolean(plan?.treatment_goal?.trim());
  const hasNotes = Boolean(plan?.notes?.trim());
  const hasMyPlanBasics = hasPathway || hasTreatmentGoal || hasNotes;
  const hasTimeline = timelineCounts.total > 0;
  const hasActiveTimeline = timelineCounts.inProgress > 0 || timelineCounts.completed > 0;
  const hasAdvisoryStatus = Boolean(plan?.advisory_status?.trim());
  const hasAdvisoryNextStep = Boolean(plan?.advisory_next_step?.trim());

  let score = 0;
  const ready: string[] = [];
  const missing: string[] = [];

  // Core planning foundation (30 points)
  if (hasMyPlanBasics) {
    score += 10;
    ready.push("Planning basics saved");
  } else {
    missing.push("Complete My Plan basics");
  }

  if (hasPathway && plan?.pathway_type !== "Not sure yet") {
    score += 10;
    ready.push("Pathway type defined");
  } else {
    missing.push("Define pathway type");
  }

  if (plan?.family_structure) {
    score += 10;
    ready.push("Family structure defined");
  } else {
    missing.push("Define family structure");
  }

  // Country shortlist maturity (25 points)
  if (shortlistCount >= 2 && shortlistCount <= 4) {
    score += 25;
    ready.push("Optimal country shortlist (2-4)");
  } else if (shortlistCount === 1) {
    score += 15;
    ready.push("Single country shortlisted");
    missing.push("Consider adding 1-3 more countries for comparison");
  } else if (shortlistCount > 4) {
    score += 10;
    ready.push("Broad shortlist established");
    missing.push("Narrow shortlist to 2-4 countries for depth");
  } else {
    missing.push("Create country shortlist");
  }

  // Timeline progress (20 points)
  if (hasActiveTimeline) {
    score += 20;
    ready.push("Timeline has active progress");
  } else if (hasTimeline) {
    score += 10;
    ready.push("Timeline created");
    missing.push("Activate timeline steps");
  } else {
    missing.push("Create planning timeline");
  }

  // Document readiness (10 points)
  if (documentCount > 0) {
    score += 10;
    ready.push("Document foundation established");
  } else {
    missing.push("Add supporting documents");
  }

  // Advisory context (15 points)
  if (hasAdvisoryStatus) {
    score += 5;
    ready.push("Advisory status defined");
  } else {
    missing.push("Set advisory status");
  }

  if (hasAdvisoryNextStep) {
    score += 5;
    ready.push("Advisory next step defined");
  } else {
    missing.push("Define advisory next step");
  }

  if (plan?.advisory_notes && plan.advisory_notes.trim().length > 20) {
    score += 5;
    ready.push("Advisory context documented");
  } else {
    missing.push("Add advisory notes");
  }

  // Constraints clarity (10 points)
  if (plan?.constraints && plan.constraints.length > 0) {
    score += 5;
    ready.push("Constraints defined");
  } else {
    missing.push("Define constraints");
  }

  if (plan?.priorities && plan.priorities.length > 0) {
    score += 5;
    ready.push("Priorities defined");
  } else {
    missing.push("Define priorities");
  }

  const maxScore = 100;
  const percentage = Math.round((score / maxScore) * 100);

  let stage: "insufficient" | "developing" | "ready" | "optimal";
  if (score < 30) stage = "insufficient";
  else if (score < 60) stage = "developing";
  else if (score < 85) stage = "ready";
  else stage = "optimal";

  return { score, maxScore, percentage, stage, ready, missing };
}

export function calculateTimelineReadiness(
  plan: PlanData
): ReadinessResult {
  const shortlistCount = plan?.shortlisted_countries?.length ?? 0;
  const timelineCounts = getTimelineCounts(plan?.timeline_items);

  let score = 0;
  const maxScore = 100;
  const ready: string[] = [];
  const missing: string[] = [];

  // Foundation (40 points)
  if (plan?.pathway_type && plan.pathway_type !== "Not sure yet") {
    score += 15;
    ready.push("Pathway defined");
  } else {
    missing.push("Define pathway type");
  }

  if (plan?.family_structure) {
    score += 10;
    ready.push("Family structure defined");
  } else {
    missing.push("Define family structure");
  }

  if (plan?.treatment_goal) {
    score += 10;
    ready.push("Treatment goal defined");
  } else {
    missing.push("Define treatment goal");
  }

  if (plan?.target_timeline) {
    score += 5;
    ready.push("Target timeline set");
  } else {
    missing.push("Set target timeline");
  }

  // Shortlist quality (30 points)
  if (shortlistCount >= 2 && shortlistCount <= 4) {
    score += 30;
    ready.push("Viable country shortlist");
  } else if (shortlistCount === 1) {
    score += 20;
    ready.push("Single country selected");
    missing.push("Consider additional countries for comparison");
  } else if (shortlistCount > 4) {
    score += 15;
    ready.push("Multiple countries shortlisted");
    missing.push("Narrow shortlist for focused planning");
  } else {
    missing.push("Build country shortlist");
  }

  // Timeline activation (20 points)
  if (timelineCounts.completed > 0) {
    score += 20;
    ready.push("Timeline execution started");
  } else if (timelineCounts.inProgress > 0) {
    score += 15;
    ready.push("Timeline activated");
  } else if (timelineCounts.total > 0) {
    score += 10;
    ready.push("Timeline generated");
    missing.push("Begin timeline execution");
  } else {
    missing.push("Generate timeline");
  }

  // Constraints clarity (10 points)
  if (plan?.constraints && plan.constraints.length > 0) {
    score += 5;
    ready.push("Constraints documented");
  } else {
    missing.push("Document constraints");
  }

  if (plan?.priorities && plan.priorities.length > 0) {
    score += 5;
    ready.push("Priorities documented");
  } else {
    missing.push("Document priorities");
  }

  const percentage = Math.round((score / maxScore) * 100);

  let stage: "insufficient" | "developing" | "ready" | "optimal";
  if (score < 30) stage = "insufficient";
  else if (score < 60) stage = "developing";
  else if (score < 85) stage = "ready";
  else stage = "optimal";

  return { score, maxScore, percentage, stage, ready, missing };
}

// ==================== GLOBAL NEXT ACTION ====================

export function getGlobalNextAction(
  plan: PlanData,
  documentCount: number
): NextAction {
  const shortlistCount = plan?.shortlisted_countries?.length ?? 0;
  const timelineCounts = getTimelineCounts(plan?.timeline_items);

  const hasPathway = Boolean(plan?.pathway_type?.trim());

  const hasAdvisoryStatus = Boolean(plan?.advisory_status?.trim());
  const hasAdvisoryNextStep = Boolean(plan?.advisory_next_step?.trim());
  const hasTimeline = timelineCounts.total > 0;
  const hasActiveExecution = timelineCounts.inProgress > 0 || timelineCounts.completed > 0;

  // CRITICAL: Foundation gaps
  if (!hasPathway || plan?.pathway_type === "Not sure yet") {
    return {
      title: "Define your pathway type",
      body: "Your planning workspace needs a clear fertility pathway before other modules can provide meaningful guidance. This is the foundation for all subsequent recommendations.",
      href: "/portal/my-plan",
      cta: "Start My Plan",
      priority: "critical",
    };
  }

  if (!plan?.family_structure) {
    return {
      title: "Define family structure",
      body: "Family structure is essential for country compatibility assessment and pathway planning.",
      href: "/portal/my-plan",
      cta: "Complete My Plan",
      priority: "critical",
    };
  }

  // CRITICAL: No shortlist
  if (shortlistCount === 0) {
    return {
      title: "Build your country shortlist",
      body: "Country selection is the prerequisite for timeline generation, advisory focus, and execution planning. Start with 2-4 countries that match your pathway and constraints.",
      href: "/portal/countries",
      cta: "Open Countries",
      priority: "critical",
    };
  }

  // HIGH: Timeline generation
  if (!hasTimeline) {
    return {
      title: "Generate your execution timeline",
      body: "You have a viable shortlist. Now transform research into actionable planning with a structured timeline based on your selected countries.",
      href: "/portal/timeline",
      cta: "Generate Timeline",
      priority: "high",
    };
  }

  // HIGH: Timeline activation
  if (!hasActiveExecution) {
    return {
      title: "Activate your timeline",
      body: "Your timeline exists but no steps are in progress. Mark your current phase as active to enable progress tracking and advisory alignment.",
      href: "/portal/timeline",
      cta: "Review Timeline",
      priority: "high",
    };
  }

  // HIGH: Document foundation
  if (documentCount === 0) {
    return {
      title: "Establish document foundation",
      body: "Execution readiness requires document preparation. Begin with identity records, medical summaries, and any existing advisory materials.",
      href: "/portal/documents",
      cta: "Open Documents",
      priority: "high",
    };
  }

  // MEDIUM: Advisory engagement
  if (!hasAdvisoryStatus) {
    return {
      title: "Define advisory stage",
      body: "Your planning structure is established. Set your advisory status to unlock structured decision support and pathway guidance.",
      href: "/portal/advisory",
      cta: "Open Advisory",
      priority: "medium",
    };
  }

  if (hasAdvisoryStatus && !hasAdvisoryNextStep) {
    return {
      title: "Clarify next advisory step",
      body: "Your advisory stage is set, but the specific next action is undefined. This limits execution momentum. Specify your immediate next step.",
      href: "/portal/advisory",
      cta: "Update Advisory",
      priority: "medium",
    };
  }

  // MEDIUM: Shortlist optimization
  if (shortlistCount > 4) {
    return {
      title: "Narrow your country shortlist",
      body: `You have ${shortlistCount} countries shortlisted. Reducing to 2-4 will enable deeper comparative analysis and clearer decision-making.`,
      href: "/portal/countries",
      cta: "Refine Shortlist",
      priority: "medium",
    };
  }

  // LOW: Continuous refinement
  if (plan?.advisory_status === "Ready for Strategy Session" && plan?.advisory_pathway === "Undecided") {
    return {
      title: "Select advisory pathway",
      body: "You are ready for advisory engagement. Choose between a focused Strategy Session or Comprehensive Advisory Package.",
      href: "/portal/advisory",
      cta: "Choose Pathway",
      priority: "low",
    };
  }

  // OPTIMAL: System active
  return {
    title: "Maintain execution momentum",
    body: "Your planning system is fully established. Focus on timeline progress, document updates, and advisory check-ins as your situation evolves.",
    href: "/portal/timeline",
    cta: "Review Progress",
    priority: "low",
  };
}

// ==================== EXECUTION STAGES ====================

export function determineExecutionStage(
  plan: PlanData
): ExecutionStageResult {
  const shortlistCount = plan?.shortlisted_countries?.length ?? 0;
  const timelineCounts = getTimelineCounts(plan?.timeline_items);
  const status = plan?.advisory_status ?? "Not Started";

  if (status === "Completed") {
    return {
      stage: "completion",
      description: "Advisory engagement completed. Execute on your established plan with periodic reviews.",
      nextActions: ["Review timeline milestones", "Update progress as execution advances", "Schedule periodic plan reviews"],
    };
  }

  if (status === "In Advisory") {
    return {
      stage: "advisory-active",
      description: "Active advisory engagement. Focus on decision support, pathway refinement, and execution preparation.",
      nextActions: ["Prepare for next advisory touchpoint", "Document new constraints or learnings", "Update timeline based on advisory guidance"],
    };
  }

  if (status === "Ready for Strategy Session") {
    return {
      stage: "sequencing",
      description: "Planning foundation established. Ready to initiate formal advisory engagement.",
      nextActions: ["Book strategy session", "Prepare case context and priority questions", "Finalize country shortlist"],
    };
  }

  if (shortlistCount >= 2 && timelineCounts.completed >= 2) {
    return {
      stage: "sequencing",
      description: "Strong planning base with execution progress. Advisory will add strategic sequencing and decision clarity.",
      nextActions: ["Consider upgrading advisory status", "Define specific advisory questions", "Evaluate pathway options"],
    };
  }

  if (shortlistCount > 0 && timelineCounts.total > 0) {
    return {
      stage: "shortlist",
      description: "Country shortlist and timeline established. Build execution momentum before advisory engagement.",
      nextActions: ["Activate timeline steps", "Add supporting documents", "Define advisory objectives"],
    };
  }

  if (shortlistCount > 0) {
    return {
      stage: "shortlist",
      description: "Country shortlist established. Generate timeline to structure execution planning.",
      nextActions: ["Generate execution timeline", "Define timeline constraints", "Prepare document foundation"],
    };
  }

  return {
    stage: "foundation",
    description: "Early planning phase. Establish core parameters before country selection and advisory engagement.",
    nextActions: ["Define pathway type and family structure", "Set treatment goals", "Establish timeline targets"],
  };
}

// ==================== SYSTEM SIGNALS ====================

export function generateSystemSignals(
  plan: PlanData,
  documentCount: number
): SystemSignal[] {
  const signals: SystemSignal[] = [];
  const shortlist = plan?.shortlisted_countries ?? [];
  const timelineCounts = getTimelineCounts(plan?.timeline_items);

  const hasTimeline = timelineCounts.total > 0;
  const hasActiveTimeline = timelineCounts.inProgress > 0 || timelineCounts.completed > 0;
  const hasDocuments = documentCount > 0;
  const hasAdvisoryStatus = Boolean(plan?.advisory_status?.trim());
  const hasAdvisoryNextStep = Boolean(plan?.advisory_next_step?.trim());
  const pathway = plan?.pathway_type?.toLowerCase() ?? "";

  // Strategic shortlist signal
  if (shortlist.length >= 3 && shortlist.length <= 4) {
    signals.push({
      message: "Your shortlist has good breadth for comparison. Ensure you have sufficient depth on each country's legal and logistical requirements.",
      severity: "info",
    });
  } else if (shortlist.length > 4) {
    signals.push({
      message: "Your shortlist spans multiple jurisdictions. Consider narrowing to 2–4 to reduce decision complexity and improve comparison depth.",
      severity: "warning",
    });
  }

  // Pathway-specific signals
  if (shortlist.length > 0 && pathway.includes("surrogate")) {
    signals.push({
      message: "Your pathway involves surrogacy. Ensure shortlisted countries are aligned with legal structure and cross-border requirements.",
      severity: "info",
    });
  }

  if (shortlist.length > 0 && pathway.includes("donor")) {
    signals.push({
      message: "Donor pathway selected. Verify donor availability and anonymity laws in your shortlisted countries.",
      severity: "info",
    });
  }

  // Timeline maturity
  if (hasTimeline && !hasActiveTimeline) {
    signals.push({
      message: "Your timeline is defined, but no step is currently active. Planning has not yet transitioned into execution.",
      severity: "warning",
    });
  }

  if (!hasTimeline && shortlist.length > 0) {
    signals.push({
      message: "You have shortlisted countries but no timeline. Consider generating a timeline to structure your execution planning.",
      severity: "warning",
    });
  }

  // Documents maturity
  if (!hasDocuments) {
    signals.push({
      message: "No documents are currently stored. This may slow execution once you move forward.",
      severity: "warning",
    });
  } else if (documentCount < 2) {
    signals.push({
      message: "Limited document set available. Consider expanding your document vault to support planning decisions.",
      severity: "info",
    });
  }

  // Advisory clarity
  if (hasAdvisoryStatus && !hasAdvisoryNextStep) {
    signals.push({
      message: "Your advisory stage is defined, but the next step is unclear. This may slow decision momentum.",
      severity: "warning",
    });
  }

  if (!hasAdvisoryStatus && hasTimeline && hasDocuments) {
    signals.push({
      message: "Advisory stage is not yet defined. Consider setting your advisory status to enable structured decision support.",
      severity: "info",
    });
  }

  // High readiness signal
  if (
    shortlist.length >= 2 &&
    shortlist.length <= 4 &&
    hasTimeline &&
    hasActiveTimeline &&
    hasDocuments &&
    hasAdvisoryStatus &&
    hasAdvisoryNextStep
  ) {
    signals.push({
      message: "Your workspace is structurally complete. Focus should now shift to decision quality and execution readiness.",
      severity: "success",
    });
  }

  return signals;
}

// ==================== ADVISORY SIGNALS ====================

export function generateAdvisorySignals(
  plan: PlanData
): AdvisorySignal[] {
  const signals: AdvisorySignal[] = [];
  const shortlistCount = plan?.shortlisted_countries?.length ?? 0;
  const timelineCounts = getTimelineCounts(plan?.timeline_items);
  const completedCount = timelineCounts.completed;
  const inProgressCount = timelineCounts.inProgress;

  // Blocking signals
  if (!plan?.pathway_type || plan.pathway_type === "Not sure yet") {
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

  if (plan?.advisory_status === "Ready for Strategy Session" && !plan?.advisory_next_step) {
    signals.push({
      type: "attention",
      message: "Ready status but no next step defined",
      action: "Clarify your immediate next action",
    });
  }

  // Ready signals
  if (shortlistCount >= 2 && shortlistCount <= 4 && completedCount >= 2) {
    signals.push({
      type: "ready",
      message: "Planning foundation is solid for advisory engagement",
    });
  }

  if (plan?.advisory_pathway !== "Undecided" && plan?.advisory_status === "In Advisory") {
    signals.push({
      type: "ready",
      message: "Active advisory pathway with clear direction",
    });
  }

  return signals;
}

// ==================== SMART NEXT STEP (ADVISORY) ====================

export function buildSmartNextStep(plan: PlanData): {
  step: string;
  context: string;
  priority: PriorityLevel;
} {
  const shortlistCount = plan?.shortlisted_countries?.length ?? 0;
  const timelineCounts = getTimelineCounts(plan?.timeline_items);
  const completedCount = timelineCounts.completed;
  const status = plan?.advisory_status ?? "Not Started";
  const pathway = plan?.advisory_pathway ?? "Undecided";

  // Critical: Foundation gaps
  if (!plan?.pathway_type || plan.pathway_type === "Not sure yet") {
    return {
      step: "Define your pathway type in My Plan",
      context: "Advisory requires a clear pathway to provide relevant guidance",
      priority: "critical",
    };
  }

  if (shortlistCount === 0) {
    return {
      step: "Shortlist 2-4 countries in the Countries module",
      context: "Country selection is prerequisite for meaningful advisory",
      priority: "critical",
    };
  }

  // Critical: Ready to engage
  if (status === "Ready for Strategy Session" && pathway === "Undecided") {
    return {
      step: "Select your preferred advisory pathway",
      context: "Choose between Strategy Session or Comprehensive Package",
      priority: "critical",
    };
  }

  if (status === "Ready for Strategy Session" && pathway !== "Undecided" && !plan?.advisory_next_step) {
    return {
      step: "Book your strategy session",
      context: `You have selected ${pathway}. Initiate booking to begin advisory.`,
      priority: "critical",
    };
  }

  // Medium: Timeline activation
  if (completedCount === 0 && shortlistCount > 0) {
    return {
      step: "Generate your execution timeline",
      context: "Timeline provides advisory context for sequencing recommendations",
      priority: "medium",
    };
  }

  // Medium: Advisory progression
  if (status === "Considering" && shortlistCount >= 2) {
    return {
      step: "Upgrade status to 'Ready for Strategy Session'",
      context: "Your planning is sufficiently developed for advisory engagement",
      priority: "medium",
    };
  }

  if (status === "In Advisory" && !plan?.advisory_notes) {
    return {
      step: "Add advisory notes with current questions or concerns",
      context: "Document context to maximize advisory session value",
      priority: "medium",
    };
  }

  // Low: Refinement
  if (shortlistCount > 4) {
    return {
      step: "Narrow country shortlist to 2-4 options",
      context: "Focused shortlist enables deeper comparative analysis",
      priority: "low",
    };
  }

  if (plan?.advisory_next_step) {
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

// ==================== RECOMMENDED FOCUS ====================

export function buildRecommendedFocus(plan: PlanData): string {
  const shortlistedCountries = plan?.shortlisted_countries ?? [];
  const timelineCounts = getTimelineCounts(plan?.timeline_items);
  const completedCount = timelineCounts.completed;
  const inProgressCount = timelineCounts.inProgress;
  const status = plan?.advisory_status ?? "Not Started";

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

  if (plan?.surrogate_needed) {
    return "Focus advisory on legal structure, execution complexity, and cross-border coordination for a surrogacy pathway.";
  }

  if (plan?.donor_needed) {
    return "Focus advisory on donor-pathway compatibility, jurisdiction fit, and treatment constraints.";
  }

  return "Use advisory to pressure-test your shortlist, execution timing, and next strategic decision.";
}

// ==================== ONBOARDING CHECKLIST ====================

export function buildOnboardingChecklist(
  plan: PlanData,
  documentCount: number
) {
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

// ==================== MODULE STATUSES ====================

export function getModuleStatuses(
  plan: PlanData,
  documentCount: number
) {
  const timelineCounts = getTimelineCounts(plan?.timeline_items);

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

// ==================== READINESS SUMMARY ====================

export function getReadinessSummary(
  plan: PlanData,
  documentCount: number
) {
  const shortlistCount = plan?.shortlisted_countries?.length ?? 0;
  const timelineCounts = getTimelineCounts(plan?.timeline_items);

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

// ==================== ADVISORY STAGE INTELLIGENCE (NEW) ====================

export type AdvisoryStage = "intake" | "strategy" | "decision" | "execution" | null;

export function getCurrentAdvisoryStage(plan: PlanData): AdvisoryStage {
  const stage = plan?.advisory_stage;
  if (stage === "intake" || stage === "strategy" || stage === "decision" || stage === "execution") {
    return stage;
  }
  return null;
}

export function getAdvisoryStageProgress(plan: PlanData): {
  current: AdvisoryStage;
  next: AdvisoryStage;
  canAdvance: boolean;
} {
  const current = getCurrentAdvisoryStage(plan);
  const stages: Array<"intake" | "strategy" | "decision" | "execution"> = ["intake", "strategy", "decision", "execution"];
  
  if (!current) {
    return { current: null, next: "intake", canAdvance: false };
  }
  
  const currentIndex = stages.indexOf(current);
  const next = currentIndex < stages.length - 1 ? stages[currentIndex + 1] : null;
  
  // Can advance if readiness is sufficient
  const readiness = calculateAdvisoryReadiness(plan, 0);
  const canAdvance = readiness.percentage >= 70;
  
  return { current, next, canAdvance };
}

export function getDefaultTasksForStage(stage: AdvisoryStage): Array<{
  title: string;
  description: string;
  stage: AdvisoryStage;
}> {
  const defaults: Record<string, Array<{ title: string; description: string; stage: AdvisoryStage }>> = {
    intake: [
      { title: "Confirm fertility pathway", description: "Validate your selected pathway aligns with goals", stage: "intake" },
      { title: "Define family structure", description: "Document current family composition and plans", stage: "intake" },
      { title: "List constraints", description: "Identify legal, financial, and timeline constraints", stage: "intake" },
    ],
    strategy: [
      { title: "Validate country shortlist", description: "Review shortlisted countries for pathway compatibility", stage: "strategy" },
      { title: "Generate execution timeline", description: "Create structured timeline for selected countries", stage: "strategy" },
      { title: "Identify risk factors", description: "Document potential risks and mitigation strategies", stage: "strategy" },
    ],
    decision: [
      { title: "Narrow to final country", description: "Select primary and backup jurisdiction", stage: "decision" },
      { title: "Finalize clinic selection", description: "Identify preferred clinics in selected countries", stage: "decision" },
      { title: "Confirm budget allocation", description: "Validate budget range and payment sequencing", stage: "decision" },
    ],
    execution: [
      { title: "Prepare document package", description: "Compile required identity and medical records", stage: "execution" },
      { title: "Initiate clinic contact", description: "Begin formal engagement with selected clinics", stage: "execution" },
      { title: "Track timeline milestones", description: "Monitor progress against planned sequence", stage: "execution" },
    ],
  };
  
  return stage ? (defaults[stage] ?? []) : [];
}

// ==================== ENHANCED DECISION INTELLIGENCE (NEW) ====================

export interface NextActionWithContext {
  title: string;
  body: string;
  href: string;
  cta: string;
  explanation: string;
  stakes: string;
  unlocks: string[];
  priority: PriorityLevel;
  module: "plan" | "countries" | "timeline" | "advisory" | "documents";
}

export function buildNextActionWithContext(plan: PlanData): NextActionWithContext {
  const shortlistCount = plan?.shortlisted_countries?.length ?? 0;
  const timelineCounts = getTimelineCounts(plan?.timeline_items);
  const documentCount = 0; // Will be passed as param in real implementation

  const hasPathway = Boolean(plan?.pathway_type?.trim());
  const hasCountries = shortlistCount > 0;
  const hasTimeline = timelineCounts.total > 0;

  // CRITICAL: No pathway
  if (!hasPathway) {
    return {
      title: "Define your fertility pathway",
      body: "Your planning foundation is incomplete.",
      href: "/portal/my-plan",
      cta: "Complete Pathway Setup →",
      explanation: "Pathway selection (IVF, surrogacy, donor, etc.) determines every downstream decision: legal jurisdiction availability, timeline constraints, cost structure, and clinic requirements. Without this anchor, country shortlisting and timeline sequencing lack strategic coherence.",
      stakes: "Without a defined pathway, you cannot evaluate country compatibility or receive accurate timeline estimates. This creates decision paralysis and increases risk of misaligned clinic selection.",
      unlocks: [
        "Jurisdiction-specific legal framework evaluation",
        "Accurate timeline and cost modeling",
        "Clinic compatibility assessment",
        "Advisory pathway recommendations"
      ],
      priority: "critical",
      module: "plan",
    };
  }

  // CRITICAL: No countries
  if (!hasCountries) {
    return {
      title: "Build your country shortlist",
      body: "Jurisdiction selection is required for legal and logistical planning.",
      href: "/portal/countries",
      cta: "Research Countries →",
      explanation: "Each jurisdiction has distinct legal frameworks for your pathway: parentage laws, citizenship transmission, clinic regulations, and donor/surrogate availability. Comparative analysis prevents costly misalignment between expectations and legal reality.",
      stakes: "Without jurisdiction comparison, you risk selecting a destination that conflicts with your legal needs, timeline constraints, or budget parameters. Reversing this decision mid-process creates significant cost and delay.",
      unlocks: [
        "Legal framework compatibility analysis",
        "Clinic and provider shortlisting",
        "Budget validation by jurisdiction",
        "Timeline feasibility assessment"
      ],
      priority: "critical",
      module: "countries",
    };
  }

  // HIGH: Only 1 country
  if (shortlistCount === 1) {
    return {
      title: "Expand your country shortlist",
      body: "Single-jurisdiction planning increases risk.",
      href: "/portal/countries",
      cta: "Add Comparison Countries →",
      explanation: "Relying on one jurisdiction creates vulnerability: legal changes, clinic waitlists, or personal circumstances can invalidate your plan. A 2-3 country shortlist provides optionality and negotiating leverage.",
      stakes: "Single-country dependency leaves no fallback if your chosen jurisdiction becomes unavailable or unsuitable. This risk compounds if timelines shift or legal frameworks change during your planning period.",
      unlocks: [
        "Comparative legal analysis",
        "Backup jurisdiction readiness",
        "Cross-border cost optimization",
        "Risk mitigation through optionality"
      ],
      priority: "high",
      module: "countries",
    };
  }

  // CRITICAL: No timeline
  if (!hasTimeline) {
    return {
      title: "Generate your execution timeline",
      body: "Timeline structure enables clinic coordination and legal sequencing.",
      href: "/portal/timeline",
      cta: "Build Timeline →",
      explanation: "Execution sequencing determines the order of legal, medical, and logistical steps across jurisdictions. Without structured timeline: clinic appointments cannot be booked, legal documentation cannot be timed, and budget flows cannot be planned.",
      stakes: "Without timeline structure, you cannot coordinate multi-jurisdictional logistics, book clinic appointments with confidence, or validate budget timing. This creates scheduling conflicts and cost overruns.",
      unlocks: [
        "Clinic appointment sequencing",
        "Legal documentation timing",
        "Budget flow planning",
        "Travel and logistics coordination",
        "Advisory engagement readiness"
      ],
      priority: "critical",
      module: "timeline",
    };
  }

  // HIGH: Advisory consideration
  if (shortlistCount >= 2 && hasTimeline && !plan?.advisory_status) {
    return {
      title: "Consider structured advisory",
      body: "Your planning foundation is solid. Advisory engagement can optimize complex decisions.",
      href: "/portal/advisory",
      cta: "Explore Advisory →",
      explanation: "With pathway defined, countries shortlisted, and timeline structured, you have reached the decision point where jurisdiction-specific nuances become critical: clinic selection, legal documentation sequencing, and contingency planning benefit from structured guidance.",
      stakes: "At this stage, mis-sequencing legal steps or selecting suboptimal clinics creates costs that advisory engagement could prevent. The complexity of cross-border coordination now exceeds self-guided planning efficiency.",
      unlocks: [
        "Jurisdiction-specific clinic recommendations",
        "Legal sequencing validation",
        "Contingency planning for edge cases",
        "Cost optimization through experience",
        "Document and compliance review"
      ],
      priority: "high",
      module: "advisory",
    };
  }

  // MEDIUM: Documents
  if (documentCount === 0) {
    return {
      title: "Upload planning documents",
      body: "Document organization supports advisory engagement and compliance tracking.",
      href: "/portal/documents",
      cta: "Manage Documents →",
      explanation: "Medical records, legal documents, and correspondence create the paper trail required for multi-jurisdictional processes. Centralized document management enables advisory review and prevents compliance gaps.",
      stakes: "Missing or disorganized documentation delays clinic applications, legal processes, and travel arrangements. Last-minute document gathering under time pressure increases error risk.",
      unlocks: [
        "Advisory document review",
        "Compliance readiness verification",
        "Application submission preparation",
        "Cross-border documentation tracking"
      ],
      priority: "medium",
      module: "documents",
    };
  }

  // Default: Review
  return {
    title: "Review and refine your plan",
    body: "Your planning foundation is complete. Regular review ensures alignment.",
    href: "/portal/my-plan",
    cta: "Review Plan →",
    explanation: "With pathway, countries, and timeline established, your planning system is operational. Periodic review ensures continued alignment with your priorities, constraints, and timeline as circumstances evolve.",
    stakes: "Static planning becomes outdated as clinic availability, legal frameworks, and personal circumstances change. Without periodic review, you may execute against obsolete assumptions.",
    unlocks: [
      "Continued plan optimization",
      "Priority and constraint adjustment",
      "Advisory engagement as needed"
    ],
    priority: "low",
    module: "plan",
  };
}

// Legacy wrapper for backward compatibility
export function getGlobalNextActionWithContext(
  plan: PlanData
): NextActionWithContext {
  return buildNextActionWithContext(plan);
}

export function getDecisionSummary(plan: PlanData, documentCount: number) {
  const nextAction = buildNextActionWithContext(plan);
  const readiness = calculateAdvisoryReadiness(plan, documentCount);
  const stage = determineExecutionStage(plan);
  const signals = generateAdvisorySignals(plan);

  return {
    nextAction,
    readiness,
    stage,
    blockers: signals.filter(s => s.type === "blocking"),
    warnings: signals.filter(s => s.type === "attention"),
    canProceed: readiness.percentage >= 60 && signals.filter(s => s.type === "blocking").length === 0,
  };
}

// ==================== PRIMARY GUIDANCE (NEW) ====================

export interface PrimaryGuidance {
  headline: string;
  explanation: string;
  consequence: string;
  nextStagePreview: string;
  priority: "critical" | "high" | "medium" | "low";
  relatedTasks: string[];
  actionCta: string;
  actionHref: string;
}

export function getPrimaryGuidance(
  plan: PlanData,
  currentStage: AdvisoryStage
): PrimaryGuidance {
  const shortlistCount = plan?.shortlisted_countries?.length ?? 0;
  const hasTimeline = (plan?.timeline_items ?? []).length > 0;
  const hasPathway = Boolean(plan?.pathway_type?.trim());

  // INTAKE STAGE
  if (currentStage === "intake" || !currentStage) {
    if (!hasPathway) {
      return {
        headline: "Define your fertility pathway",
        explanation: "Pathway selection determines every downstream decision: legal jurisdiction availability, timeline constraints, and cost structure.",
        consequence: "Without this foundation, country recommendations and timeline estimates will lack strategic coherence.",
        nextStagePreview: "Once defined, you'll move to Strategy stage to build your country shortlist.",
        priority: "critical",
        relatedTasks: ["Confirm fertility pathway", "Define family structure", "List constraints"],
        actionCta: "Complete Pathway Setup →",
        actionHref: "/portal/my-plan",
      };
    }
    return {
      headline: "Complete your planning foundation",
      explanation: "Family structure and constraints define the boundaries for all subsequent decisions.",
      consequence: "Incomplete foundation leads to mismatched country recommendations and timeline conflicts.",
      nextStagePreview: "Once complete, you'll advance to Strategy stage for country selection.",
      priority: "high",
      relatedTasks: ["Define family structure", "List constraints", "Set target timeline"],
      actionCta: "Complete My Plan →",
      actionHref: "/portal/my-plan",
    };
  }

  // STRATEGY STAGE
  if (currentStage === "strategy") {
    if (shortlistCount === 0) {
      return {
        headline: "Build your country shortlist",
        explanation: "Jurisdiction selection is required for legal and logistical planning. Each country has distinct frameworks for your pathway.",
        consequence: "Without jurisdiction comparison, you risk selecting a destination that conflicts with your legal needs or budget.",
        nextStagePreview: "Once shortlisted, you'll generate your execution timeline.",
        priority: "critical",
        relatedTasks: ["Validate country shortlist", "Research legal frameworks", "Compare costs"],
        actionCta: "Research Countries →",
        actionHref: "/portal/countries",
      };
    }
    if (shortlistCount === 1) {
      return {
        headline: "Expand your country shortlist",
        explanation: "Single-jurisdiction planning creates vulnerability. A 2-3 country shortlist provides optionality and negotiating leverage.",
        consequence: "No fallback if your chosen jurisdiction becomes unavailable or unsuitable.",
        nextStagePreview: "With 2+ countries, you'll generate your execution timeline.",
        priority: "high",
        relatedTasks: ["Add comparison countries", "Validate pathway compatibility", "Assess risk factors"],
        actionCta: "Add Countries →",
        actionHref: "/portal/countries",
      };
    }
    if (!hasTimeline) {
      return {
        headline: "Generate your execution timeline",
        explanation: "Timeline structure enables clinic coordination and legal sequencing across jurisdictions.",
        consequence: "Without structured timeline, clinic appointments cannot be booked and budget flows cannot be planned.",
        nextStagePreview: "Once timeline is set, you'll move to Decision stage for final selection.",
        priority: "critical",
        relatedTasks: ["Generate execution timeline", "Identify risk factors", "Map legal sequencing"],
        actionCta: "Build Timeline →",
        actionHref: "/portal/timeline",
      };
    }
    return {
      headline: "Validate your strategy foundation",
      explanation: "Review shortlisted countries and timeline for pathway compatibility before committing to decisions.",
      consequence: "Unvalidated strategy leads to costly mid-process changes.",
      nextStagePreview: "Once validated, you'll advance to Decision stage.",
      priority: "medium",
      relatedTasks: ["Validate country shortlist", "Review timeline feasibility", "Confirm budget allocation"],
      actionCta: "Review Strategy →",
      actionHref: "/portal/advisory",
    };
  }

  // DECISION STAGE
  if (currentStage === "decision") {
    if (shortlistCount > 1) {
      return {
        headline: "Narrow to your final country",
        explanation: "Select primary and backup jurisdiction based on validated criteria: legal fit, cost, timeline, and clinic quality.",
        consequence: "Indecision delays execution and may result in lost clinic availability or changed legal frameworks.",
        nextStagePreview: "Once selected, you'll move to Execution stage for document preparation and clinic contact.",
        priority: "critical",
        relatedTasks: ["Narrow to final country", "Finalize clinic selection", "Confirm budget allocation"],
        actionCta: "Finalize Selection →",
        actionHref: "/portal/countries",
      };
    }
    return {
      headline: "Finalize clinic and legal sequencing",
      explanation: "Identify preferred clinics and confirm documentation requirements for your selected jurisdiction.",
      consequence: "Incomplete preparation causes delays and compliance gaps.",
      nextStagePreview: "Once finalized, you'll begin execution with document preparation.",
      priority: "high",
      relatedTasks: ["Finalize clinic selection", "Confirm legal documentation", "Validate budget sequencing"],
      actionCta: "Complete Decision →",
      actionHref: "/portal/advisory",
    };
  }

  // EXECUTION STAGE
  if (currentStage === "execution") {
    return {
      headline: "Execute your plan",
      explanation: "Begin formal clinic engagement and track progress against your planned sequence.",
      consequence: "Poor execution coordination wastes planning investment.",
      nextStagePreview: "Track milestones and adjust as circumstances evolve.",
      priority: "medium",
      relatedTasks: ["Prepare document package", "Initiate clinic contact", "Track timeline milestones"],
      actionCta: "View Timeline →",
      actionHref: "/portal/timeline",
    };
  }

  // Fallback
  return {
    headline: "Review and refine your plan",
    explanation: "Your planning foundation is established. Regular review ensures continued alignment.",
    consequence: "Static planning becomes outdated as circumstances change.",
    nextStagePreview: "Continue optimizing your plan.",
    priority: "low",
    relatedTasks: ["Review plan alignment", "Update priorities", "Check timeline"],
    actionCta: "Review Plan →",
    actionHref: "/portal/my-plan",
  };
}