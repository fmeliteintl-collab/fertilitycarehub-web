"use server";

import type { UserPlan, UserPlanInput } from "@/types/plan";
import {
  calculateAdvisoryReadiness,
  determineExecutionStage,
  buildNextActionWithContext,
  generateAdvisorySignals,
  getTimelineCounts,
  type AdvisorySignal,
  type NextActionWithContext,
  type ExecutionStageResult,
  type ReadinessResult,
  type AdvisoryStage,
} from "./plan-intelligence";

// Flexible plan type
type PlanData = UserPlan | UserPlanInput | null | undefined;

// Type for plan with primary_country
type PlanWithPrimary = PlanData & {
  primary_country?: string | null;
};

// ==================== NEW TYPES (Portal-Level) ====================

export type SystemStage = "planning" | "decision" | "execution" | "completion";

export type PrimaryBlocker = 
  | "missing_pathway"
  | "missing_family_structure"
  | "missing_country_selection"
  | "missing_primary_country"
  | "timeline_not_started"
  | "timeline_incomplete"
  | "documents_required"
  | null;

export type ExecutionStatus = "blocked" | "ready" | "active" | "complete";

export type UnifiedNextAction = NextActionWithContext & {
  type: "critical" | "high" | "medium" | "low";
  label: string;
};

export type SplitReadiness = {
  planning: number;
  execution: number;
  advisory: number;
  overall: number;
};

export type EnhancedSignals = {
  blockers: Array<{
    id: string;
    message: string;
    resolution: string;
    href: string;
    severity: "blocking" | "warning";
  }>;
  risks: Array<{
    id: string;
    message: string;
    mitigation: string;
  }>;
  insights: Array<{
    id: string;
    message: string;
    type: "positive" | "info";
  }>;
};

export type FlowStepStatus = "complete" | "active" | "locked";

export interface UnifiedFlowStep {
  id: string;
  number: number;
  title: string;
  module: "my-plan" | "countries" | "timeline" | "documents" | "advisory";
  status: FlowStepStatus;
  statusLabel: string;
  directive: string;
  whyMatters: string;
  systemInsight: string;
  riskIfDelayed?: string;
  estimatedEffort?: string;
  cta?: { label: string; href: string; variant: "primary" | "secondary" };
  unlocks?: string[];
  isLocked: boolean;
  lockReason?: string;
}

// ==================== CORE PORTAL INTELLIGENCE ====================

export interface PortalIntelligence {
  // 1. System State
  stage: SystemStage;
  executionStatus: ExecutionStatus;
  primaryBlocker: PrimaryBlocker;
  
  // 2. Unified Data
  flowSteps: UnifiedFlowStep[];
  nextAction: UnifiedNextAction;
  readiness: SplitReadiness;
  signals: EnhancedSignals;
  
  // 3. Legacy Compatibility
  advisoryReadiness: ReadinessResult;
  executionStage: ExecutionStageResult;
  rawSignals: AdvisorySignal[];
  
  // 4. Quick Flags
  flags: {
    hasPathway: boolean;
    hasFamilyStructure: boolean;
    hasCountries: boolean;
    hasPrimaryCountry: boolean;
    hasTimeline: boolean;
    hasActiveTimeline: boolean;
    hasDocuments: boolean;
    timelineComplete: boolean;
    timelineProgress: number;
    advisoryReady: boolean;
    canExecute: boolean;
    countryCount: number;
  };
}

export function getPortalIntelligence(plan: PlanData, documentCount: number = 0): PortalIntelligence {
  // ===== BASE DERIVED STATE =====
  const hasPathway = Boolean(plan?.pathway_type?.trim() && plan.pathway_type !== "Not sure yet");
  const hasFamilyStructure = Boolean(plan?.family_structure);
  const countryCount = plan?.shortlisted_countries?.length ?? 0;
  const hasCountries = countryCount > 0;
  const typedPlan = plan as PlanWithPrimary;
  const hasPrimaryCountry = Boolean(typedPlan?.primary_country?.trim());
  const primaryCountryName = typedPlan?.primary_country ?? null;
  const timelineCounts = getTimelineCounts(plan?.timeline_items);
  const hasTimeline = timelineCounts.total > 0;
  const hasActiveTimeline = timelineCounts.inProgress > 0 || timelineCounts.completed > 0;
  const timelineComplete = hasTimeline && timelineCounts.completed === timelineCounts.total && timelineCounts.total > 0;
  const timelineProgress = hasTimeline 
    ? Math.round((timelineCounts.completed / timelineCounts.total) * 100) 
    : 0;
  const hasDocuments = documentCount > 0;

  // ===== EXISTING INTELLIGENCE (imported) =====
  const advisoryReadiness = calculateAdvisoryReadiness(plan, documentCount);
  const executionStage = determineExecutionStage(plan);
  const rawSignals = generateAdvisorySignals(plan);
  const baseNextAction = buildNextActionWithContext(plan, documentCount);

  // ===== SPLIT READINESS =====
  const readiness: SplitReadiness = {
    planning: calculatePlanningReadinessScore(plan),
    execution: calculateExecutionReadinessScore(plan, timelineProgress, documentCount),
    advisory: advisoryReadiness.percentage,
    overall: Math.round(
      (calculatePlanningReadinessScore(plan) * 0.3) +
      (calculateExecutionReadinessScore(plan, timelineProgress, documentCount) * 0.4) +
      (advisoryReadiness.percentage * 0.3)
    ),
  };

  // ===== PRIMARY BLOCKER =====
  const primaryBlocker = determinePrimaryBlocker({
    hasPathway,
    hasFamilyStructure,
    hasCountries,
    hasPrimaryCountry,
    hasTimeline,
    timelineComplete,
    readiness,
  });

  // ===== EXECUTION STATUS =====
  const executionStatus = determineExecutionStatus({
    primaryBlocker,
    hasTimeline,
    hasActiveTimeline,
    timelineComplete,
    readiness,
  });

  // ===== SYSTEM STAGE =====
  const stage = determineSystemStage({
    hasPathway,
    hasCountries,
    hasPrimaryCountry,
    hasTimeline,
    timelineComplete,
    executionStatus,
    advisoryStage: plan?.advisory_stage ?? null,
  });

  // ===== UNIFIED FLOW STEPS =====
  const flowSteps = buildUnifiedFlowSteps({
    hasPathway,
    hasFamilyStructure,
    hasCountries,
    countryCount,
    hasPrimaryCountry,
    primaryCountryName,
    hasTimeline,
    timelineComplete,
    timelineProgress,
    readiness,
    advisoryReady: advisoryReadiness.percentage >= 70,
    hasDocuments,
  });

  // ===== UNIFIED NEXT ACTION =====
  const nextAction = buildUnifiedNextAction({
    baseAction: baseNextAction,
    primaryBlocker,
    stage,
    executionStatus,
    hasTimeline,
    timelineProgress,
    timelineComplete,
    readiness,
  });

  // ===== ENHANCED SIGNALS =====
  const signals = buildEnhancedSignals({
    hasPathway,
    hasCountries,
    countryCount,
    hasPrimaryCountry,
    hasTimeline,
    timelineProgress,
    timelineComplete,
    hasDocuments,
    primaryBlocker,
    readiness,
    rawSignals,
    stage,
  });

  return {
    stage,
    executionStatus,
    primaryBlocker,
    flowSteps,
    nextAction,
    readiness,
    signals,
    advisoryReadiness,
    executionStage,
    rawSignals,
    flags: {
      hasPathway,
      hasFamilyStructure,
      hasCountries,
      hasPrimaryCountry,
      hasTimeline,
      hasActiveTimeline,
      hasDocuments,
      timelineComplete,
      timelineProgress,
      advisoryReady: advisoryReadiness.percentage >= 70,
      canExecute: executionStatus === "ready" || executionStatus === "active",
      countryCount,
    },
  };
}

// ==================== HELPER FUNCTIONS ====================

function calculatePlanningReadinessScore(plan: PlanData): number {
  let score = 0;
  if (plan?.pathway_type && plan.pathway_type !== "Not sure yet") score += 40;
  if (plan?.family_structure) score += 30;
  if ((plan?.priorities?.length ?? 0) > 0) score += 15;
  if ((plan?.constraints?.length ?? 0) > 0) score += 15;
  return score;
}

function calculateExecutionReadinessScore(plan: PlanData, timelineProgress: number, documentCount: number): number {
  let score = 0;
  const countryCount = plan?.shortlisted_countries?.length ?? 0;
  
  // Countries (40 points)
  if (countryCount >= 2 && countryCount <= 4) score += 40;
  else if (countryCount === 1) score += 25;
  else if (countryCount > 4) score += 20;
  
  // Timeline (40 points)
  if (timelineProgress >= 80) score += 40;
  else if (timelineProgress >= 50) score += 30;
  else if (timelineProgress > 0) score += 20;
  else if ((plan?.timeline_items?.length ?? 0) > 0) score += 10;
  
  // Documents (20 points)
  if (documentCount >= 3) score += 20;
  else if (documentCount > 0) score += 10;
  
  return score;
}

function determinePrimaryBlocker(params: {
  hasPathway: boolean;
  hasFamilyStructure: boolean;
  hasCountries: boolean;
  hasPrimaryCountry: boolean;
  hasTimeline: boolean;
  timelineComplete: boolean;
  readiness: SplitReadiness;
}): PrimaryBlocker {
  if (!params.hasPathway) return "missing_pathway";
  if (!params.hasFamilyStructure) return "missing_family_structure";
  if (!params.hasCountries) return "missing_country_selection";
  if (!params.hasPrimaryCountry && params.hasCountries) return "missing_primary_country";
  if (!params.hasTimeline) return "timeline_not_started";
  if (!params.timelineComplete && params.hasTimeline && params.readiness.execution < 60) return "timeline_incomplete";
  return null;
}

function determineExecutionStatus(params: {
  primaryBlocker: PrimaryBlocker;
  hasTimeline: boolean;
  hasActiveTimeline: boolean;
  timelineComplete: boolean;
  readiness: SplitReadiness;
}): ExecutionStatus {
  if (params.primaryBlocker === "missing_pathway" || 
      params.primaryBlocker === "missing_family_structure" ||
      params.primaryBlocker === "missing_country_selection" ||
      params.primaryBlocker === "missing_primary_country") {
    return "blocked";
  }
  if (!params.hasTimeline) return "blocked";
  if (params.timelineComplete) return "complete";
  if (params.hasActiveTimeline) return "active";
  return "ready";
}

function determineSystemStage(params: {
  hasPathway: boolean;
  hasCountries: boolean;
  hasPrimaryCountry: boolean;
  hasTimeline: boolean;
  timelineComplete: boolean;
  executionStatus: ExecutionStatus;
  advisoryStage: AdvisoryStage;
}): SystemStage {
  if (!params.hasPathway || !params.hasCountries) return "planning";
  if (!params.hasPrimaryCountry || !params.hasTimeline) return "decision";
  if (params.executionStatus === "complete") return "completion";
  return "execution";
}

interface FlowStepParams {
  hasPathway: boolean;
  hasFamilyStructure: boolean;
  hasCountries: boolean;
  countryCount: number;
  hasPrimaryCountry: boolean;
  primaryCountryName: string | null;
  hasTimeline: boolean;
  timelineComplete: boolean;
  timelineProgress: number;
  readiness: SplitReadiness;
  advisoryReady: boolean;
  hasDocuments: boolean;
}

function buildUnifiedFlowSteps(params: FlowStepParams): UnifiedFlowStep[] {
  const steps: UnifiedFlowStep[] = [
    {
      id: "my-plan",
      number: 1,
      title: "Define Your Pathway",
      module: "my-plan",
      status: params.hasPathway ? "complete" : "active",
      statusLabel: "REQUIRED NOW",
      directive: params.hasPathway 
        ? "Pathway defined — foundation established" 
        : "Define your treatment pathway to begin planning",
      whyMatters: "Your pathway determines legal eligibility, cost structures, and which countries are viable options.",
      systemInsight: "All downstream decisions depend on this foundation. Without pathway clarity, country matching and timeline generation are disabled.",
      cta: params.hasPathway 
        ? undefined 
        : { label: "Define Pathway", href: "/portal/my-plan", variant: "primary" },
      unlocks: params.hasPathway ? undefined : ["Country matching engine", "Legal pathway analysis", "Cost modeling"],
      isLocked: false,
    },
    {
      id: "countries",
      number: 2,
      title: params.hasPrimaryCountry ? "Country Committed" : "Select Countries",
      module: "countries",
      status: params.hasCountries 
        ? params.hasPrimaryCountry ? "complete" : "active"
        : params.hasPathway ? "active" : "locked",
      statusLabel: params.hasPrimaryCountry ? "COMMITTED" : params.hasCountries ? "DECISION NEEDED" : "REQUIRED NOW",
      directive: params.hasPrimaryCountry
        ? `Primary: ${params.primaryCountryName} (${params.countryCount} backup options)`
        : params.hasCountries
          ? `${params.countryCount} shortlisted — commit to primary jurisdiction`
          : "Select jurisdictions for your treatment plan",
      whyMatters: params.hasPrimaryCountry 
        ? "Primary jurisdiction commitment enables execution planning."
        : "Jurisdiction determines your legal rights, timeline speed, donor availability, and total cost.",
      systemInsight: params.hasPrimaryCountry
        ? "Primary country locked. Execution can now proceed with legal and clinic coordination."
        : "Country selection activates the timeline generation engine. Each jurisdiction has unique legal requirements.",
      riskIfDelayed: params.hasPrimaryCountry ? undefined : "Limited clinic availability; legal pathway complexity increases with delayed decisions.",
      cta: params.hasCountries || !params.hasPathway
        ? params.hasCountries && !params.hasPrimaryCountry
          ? { label: "Commit to Primary", href: "/portal/countries", variant: "primary" }
          : undefined
        : { label: "Select Countries", href: "/portal/countries", variant: "primary" },
      unlocks: params.hasPrimaryCountry 
        ? ["Execution authorization", "Clinic coordination", "Legal documentation"]
        : params.hasCountries 
          ? ["Timeline generation", "Document requirements"]
          : ["Phase-based timeline", "Document requirements", "Legal pathway mapping"],
      isLocked: !params.hasPathway,
      lockReason: !params.hasPathway ? "Complete pathway definition first" : undefined,
    },
    {
      id: "timeline",
      number: 3,
      title: "Build Execution Timeline",
      module: "timeline",
      status: params.timelineComplete ? "complete" : params.hasTimeline ? "active" : params.hasPrimaryCountry ? "active" : "locked",
      statusLabel: params.timelineComplete ? "COMPLETE" : params.hasTimeline ? "IN PROGRESS" : "REQUIRED NOW",
      directive: params.timelineComplete
        ? "Timeline complete — execution ready"
        : params.hasTimeline
          ? `Timeline in progress (${params.timelineProgress}%)`
          : params.hasPrimaryCountry
            ? "Initiate execution timeline — blocking all downstream phases"
            : "Commit to primary country to unlock timeline",
      whyMatters: "Without a structured timeline, treatment scheduling, legal preparation, and clinic coordination remain unstructured.",
      systemInsight: params.hasPrimaryCountry
        ? "Execution cannot begin without structured timeline. All downstream phases depend on this step."
        : "Timeline locked until primary jurisdiction is committed.",
      riskIfDelayed: "Treatment scheduling delays of 3–8 weeks; missed scheduling windows increase risk.",
      estimatedEffort: "15–20 minutes to initialize",
      cta: params.hasTimeline
        ? params.timelineComplete 
          ? undefined
          : { label: "Continue Timeline", href: "/portal/timeline", variant: "primary" }
        : params.hasPrimaryCountry
          ? { label: "Start Timeline Execution", href: "/portal/timeline", variant: "primary" }
          : undefined,
      unlocks: params.timelineComplete
        ? ["Document preparation system", "Advisory eligibility", "Execution tracking"]
        : ["Document preparation system", "Advisory eligibility"],
      isLocked: !params.hasPrimaryCountry,
      lockReason: !params.hasPrimaryCountry ? "Commit to primary country first" : undefined,
    },
    {
      id: "documents",
      number: 4,
      title: "Prepare Documentation",
      module: "documents",
      status: params.timelineComplete ? "active" : params.hasTimeline ? "active" : "locked",
      statusLabel: params.timelineComplete ? "READY" : params.hasTimeline ? "AVAILABLE" : "LOCKED",
      directive: params.timelineComplete
        ? "Document preparation ready — requirements generated"
        : params.hasTimeline
          ? "Complete timeline to unlock full document requirements"
          : "Timeline must be initiated before document requirements are generated",
      whyMatters: "Document requirements vary by jurisdiction and pathway.",
      systemInsight: "Document requirements dynamically generated based on selected countries and pathway.",
      riskIfDelayed: "Arriving at clinics unprepared delays treatment cycles.",
      cta: params.timelineComplete
        ? { label: "Prepare Documents", href: "/portal/documents", variant: "primary" }
        : undefined,
      unlocks: params.timelineComplete ? ["Clinic application readiness", "Legal process initiation"] : undefined,
      isLocked: !params.hasTimeline,
      lockReason: !params.hasTimeline ? "Generate timeline first" : undefined,
    },
    {
      id: "advisory",
      number: 5,
      title: "Advisory & Execution",
      module: "advisory",
      status: params.timelineComplete ? "active" : params.advisoryReady ? "active" : "locked",
      statusLabel: params.timelineComplete ? "RECOMMENDED" : params.advisoryReady ? "AVAILABLE" : "LOCKED",
      directive: params.timelineComplete
        ? "Validate strategy with advisory before execution"
        : params.advisoryReady
          ? "Advisory available — validate your plan"
          : "Complete timeline setup to unlock advisory",
      whyMatters: "At this stage, incorrect decisions cost months and thousands.",
      systemInsight: "Advisory becomes high-value after timeline and country decisions are structured.",
      riskIfDelayed: "Proceeding without validation risks choosing wrong jurisdiction or clinics.",
      cta: params.advisoryReady || params.timelineComplete
        ? { label: "Validate Strategy", href: "/portal/advisory", variant: "primary" }
        : undefined,
      unlocks: ["Expert validation", "Clinic matching", "Execution roadmap"],
      isLocked: !params.advisoryReady && !params.timelineComplete,
      lockReason: !params.advisoryReady ? "Reach 70% readiness or complete timeline" : undefined,
    },
  ];

  return steps;
}

function buildUnifiedNextAction(params: {
  baseAction: NextActionWithContext;
  primaryBlocker: PrimaryBlocker;
  stage: SystemStage;
  executionStatus: ExecutionStatus;
  hasTimeline: boolean;
  timelineProgress: number;
  timelineComplete: boolean;
  readiness: SplitReadiness;
}): UnifiedNextAction {
  // Override with blocker-aware messaging if execution is blocked
  if (params.primaryBlocker === "missing_primary_country" && params.stage === "decision") {
    return {
      ...params.baseAction,
      title: "Commit to Primary Jurisdiction",
      body: "You have shortlisted countries but haven't committed to a primary jurisdiction. Execution is blocked until you select your primary destination.",
      explanation: "Multiple countries provide optionality, but execution requires commitment. Primary jurisdiction selection unlocks timeline generation, legal documentation requirements, and clinic coordination.",
      stakes: "Without primary country commitment, you cannot generate execution timelines, receive jurisdiction-specific legal guidance, or begin clinic outreach. This creates indefinite planning loops.",
      unlocks: [
        "Timeline generation with jurisdiction-specific sequencing",
        "Legal documentation requirements",
        "Clinic eligibility verification",
        "Advisory with execution focus"
      ],
      priority: "critical",
      type: "critical",
      module: "countries",
      href: "/portal/countries",
      cta: "Commit to Primary Country →",
      label: "EXECUTION BLOCKED — DECISION REQUIRED",
    };
  }

  if (params.primaryBlocker === "timeline_not_started" && params.stage === "decision") {
    return {
      ...params.baseAction,
      title: "Generate Execution Timeline",
      body: "Primary jurisdiction selected. Now transform your planning into executable steps with structured timeline generation.",
      explanation: "Timeline structure determines the sequence of legal, medical, and logistical steps. Without it, execution timing cannot be coordinated.",
      stakes: "Clinic scheduling, legal filing deadlines, and travel coordination all depend on timeline structure. Delays here compound downstream.",
      unlocks: [
        "Clinic appointment sequencing",
        "Legal documentation timing",
        "Budget flow planning",
        "Advisory engagement readiness"
      ],
      priority: "critical",
      type: "critical",
      module: "timeline",
      href: "/portal/timeline",
      cta: "Generate Timeline →",
      label: "EXECUTION BLOCKED — TIMELINE REQUIRED",
    };
  }

  // Enhance base action with unified fields
  return {
    ...params.baseAction,
    type: params.baseAction.priority,
    label: params.baseAction.priority === "critical" ? "REQUIRED ACTION" :
           params.baseAction.priority === "high" ? "RECOMMENDED ACTION" :
           params.baseAction.priority === "medium" ? "SUGGESTED ACTION" : "OPTIONAL ACTION",
  };
}

function buildEnhancedSignals(params: {
  hasPathway: boolean;
  hasCountries: boolean;
  countryCount: number;
  hasPrimaryCountry: boolean;
  hasTimeline: boolean;
  timelineProgress: number;
  timelineComplete: boolean;
  hasDocuments: boolean;
  primaryBlocker: PrimaryBlocker;
  readiness: SplitReadiness;
  rawSignals: AdvisorySignal[];
  stage: SystemStage;
}): EnhancedSignals {
  const blockers: EnhancedSignals["blockers"] = [];
  const risks: EnhancedSignals["risks"] = [];
  const insights: EnhancedSignals["insights"] = [];

  // Convert primary blocker to enhanced blocker
  if (params.primaryBlocker === "missing_pathway") {
    blockers.push({
      id: "missing_pathway",
      message: "Fertility pathway not defined",
      resolution: "Define your pathway in My Plan to enable country matching",
      href: "/portal/my-plan",
      severity: "blocking",
    });
  } else if (params.primaryBlocker === "missing_family_structure") {
    blockers.push({
      id: "missing_family_structure",
      message: "Family structure not defined",
      resolution: "Complete family structure for accurate country recommendations",
      href: "/portal/my-plan",
      severity: "blocking",
    });
  } else if (params.primaryBlocker === "missing_country_selection") {
    blockers.push({
      id: "missing_country_selection",
      message: "No countries shortlisted",
      resolution: "Research and shortlist 2-4 jurisdictions",
      href: "/portal/countries",
      severity: "blocking",
    });
  } else if (params.primaryBlocker === "missing_primary_country") {
    blockers.push({
      id: "missing_primary_country",
      message: "Primary jurisdiction not committed",
      resolution: "Select primary country from your shortlist to unlock execution",
      href: "/portal/countries",
      severity: "blocking",
    });
  } else if (params.primaryBlocker === "timeline_not_started") {
    blockers.push({
      id: "timeline_not_started",
      message: "Execution timeline not generated",
      resolution: "Generate timeline to structure execution steps",
      href: "/portal/timeline",
      severity: "blocking",
    });
  }

  // Risks
  if (params.hasCountries && params.countryCount === 1) {
    risks.push({
      id: "single_country_risk",
      message: "Single-country dependency creates vulnerability",
      mitigation: "Add 1-2 backup jurisdictions for optionality",
    });
  }
  if (params.hasCountries && params.countryCount > 4) {
    risks.push({
      id: "broad_shortlist_risk",
      message: "Broad shortlist dilutes focus",
      mitigation: "Narrow to 2-4 countries for deeper analysis",
    });
  }
  if (params.hasTimeline && params.timelineProgress < 30 && !params.timelineComplete) {
    risks.push({
      id: "stalled_timeline",
      message: "Timeline initiated but progress stalled",
      mitigation: "Activate at least one step to maintain momentum",
    });
  }

  // Insights
  if (params.hasPrimaryCountry) {
    insights.push({
      id: "primary_committed",
      message: "Primary jurisdiction committed — execution authorized",
      type: "positive",
    });
  }
  if (params.timelineComplete) {
    insights.push({
      id: "timeline_complete",
      message: "Timeline complete — ready for advisory validation",
      type: "positive",
    });
  }
  if (params.readiness.overall >= 70) {
    insights.push({
      id: "high_readiness",
      message: `Planning readiness at ${params.readiness.overall}% — optimal for advisory`,
      type: "positive",
    });
  }

  // Convert raw signals
  params.rawSignals.forEach((signal, idx) => {
    if (signal.type === "blocking" && !blockers.find(b => b.message === signal.message)) {
      blockers.push({
        id: `raw-${idx}`,
        message: signal.message,
        resolution: signal.action || "Address this issue",
        href: signal.link || "/portal",
        severity: "blocking",
      });
    }
  });

  return { blockers, risks, insights };
}