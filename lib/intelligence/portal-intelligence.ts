import type { UserPlan, UserPlanInput } from "@/types/plan";
import {
  buildNextActionWithContext,
  calculateAdvisoryReadiness,
  determineExecutionStage,
  generateAdvisorySignals,
  getTimelineCounts,
  type AdvisorySignal,
  type ExecutionStageResult,
  type NextActionWithContext,
  type ReadinessResult,
} from "./plan-intelligence";

type PlanData = UserPlan | UserPlanInput | null | undefined;

export type SystemStage = "planning" | "decision" | "execution" | "completion";

export type PrimaryBlocker =
  | "missing_pathway"
  | "missing_family_structure"
  | "missing_country_selection"
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

export interface PortalIntelligence {
  stage: SystemStage;
  executionStatus: ExecutionStatus;
  primaryBlocker: PrimaryBlocker;
  flowSteps: UnifiedFlowStep[];
  nextAction: UnifiedNextAction;
  readiness: SplitReadiness;
  signals: EnhancedSignals;
  advisoryReadiness: ReadinessResult;
  executionStage: ExecutionStageResult;
  rawSignals: AdvisorySignal[];
  flags: {
    hasPathway: boolean;
    hasFamilyStructure: boolean;
    hasCountries: boolean;
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

export function getPortalIntelligence(
  plan: PlanData,
  documentCount = 0,
): PortalIntelligence {
  const hasPathway = Boolean(
    plan?.pathway_type?.trim() && plan.pathway_type !== "Not sure yet",
  );
  const hasFamilyStructure = Boolean(plan?.family_structure);
  const countryCount = plan?.shortlisted_countries?.length ?? 0;
  const hasCountries = countryCount > 0;

  const timelineCounts = getTimelineCounts(plan?.timeline_items);
  const hasTimeline = timelineCounts.total > 0;
  const hasActiveTimeline =
    timelineCounts.inProgress > 0 || timelineCounts.completed > 0;
  const timelineComplete =
    hasTimeline &&
    timelineCounts.completed === timelineCounts.total &&
    timelineCounts.total > 0;
  const timelineProgress = hasTimeline
    ? Math.round((timelineCounts.completed / timelineCounts.total) * 100)
    : 0;
  const hasDocuments = documentCount > 0;

  const advisoryReadiness = calculateAdvisoryReadiness(plan, documentCount);
  const executionStage = determineExecutionStage(plan);
  const rawSignals = generateAdvisorySignals(plan);
  const baseNextAction = buildNextActionWithContext(plan, documentCount);

  const planningReadiness = calculatePlanningReadinessScore(plan);
  const executionReadiness = calculateExecutionReadinessScore(
    plan,
    timelineProgress,
    documentCount,
  );

  const readiness: SplitReadiness = {
    planning: planningReadiness,
    execution: executionReadiness,
    advisory: advisoryReadiness.percentage,
    overall: Math.round(
      planningReadiness * 0.3 +
        executionReadiness * 0.4 +
        advisoryReadiness.percentage * 0.3,
    ),
  };

  const primaryBlocker = determinePrimaryBlocker({
    hasPathway,
    hasFamilyStructure,
    hasCountries,
    hasTimeline,
    timelineComplete,
    readiness,
  });

  const executionStatus = determineExecutionStatus({
    primaryBlocker,
    hasTimeline,
    hasActiveTimeline,
    timelineComplete,
  });

  const stage = determineSystemStage({
    hasPathway,
    hasCountries,
    hasTimeline,
    executionStatus,
  });

  const flowSteps = buildUnifiedFlowSteps({
    hasPathway,
    hasFamilyStructure,
    hasCountries,
    countryCount,
    hasTimeline,
    timelineComplete,
    timelineProgress,
    advisoryReady: advisoryReadiness.percentage >= 70,
  });

  const nextAction = buildUnifiedNextAction({
    baseAction: baseNextAction,
    primaryBlocker,
    stage,
  });

  const signals = buildEnhancedSignals({
    hasCountries,
    countryCount,
    hasTimeline,
    timelineProgress,
    timelineComplete,
    primaryBlocker,
    readiness,
    rawSignals,
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
      hasTimeline,
      hasActiveTimeline,
      hasDocuments,
      timelineComplete,
      timelineProgress,
      advisoryReady: advisoryReadiness.percentage >= 70,
      canExecute:
        executionStatus === "ready" || executionStatus === "active",
      countryCount,
    },
  };
}

function calculatePlanningReadinessScore(plan: PlanData): number {
  let score = 0;

  if (plan?.pathway_type && plan.pathway_type !== "Not sure yet") score += 40;
  if (plan?.family_structure) score += 30;
  if ((plan?.priorities?.length ?? 0) > 0) score += 15;
  if ((plan?.constraints?.length ?? 0) > 0) score += 15;

  return score;
}

function calculateExecutionReadinessScore(
  plan: PlanData,
  timelineProgress: number,
  documentCount: number,
): number {
  let score = 0;
  const countryCount = plan?.shortlisted_countries?.length ?? 0;

  if (countryCount >= 2 && countryCount <= 4) score += 40;
  else if (countryCount === 1) score += 25;
  else if (countryCount > 4) score += 20;

  if (timelineProgress >= 80) score += 40;
  else if (timelineProgress >= 50) score += 30;
  else if (timelineProgress > 0) score += 20;
  else if ((plan?.timeline_items?.length ?? 0) > 0) score += 10;

  if (documentCount >= 3) score += 20;
  else if (documentCount > 0) score += 10;

  return score;
}

function determinePrimaryBlocker(params: {
  hasPathway: boolean;
  hasFamilyStructure: boolean;
  hasCountries: boolean;
  hasTimeline: boolean;
  timelineComplete: boolean;
  readiness: SplitReadiness;
}): PrimaryBlocker {
  if (!params.hasPathway) return "missing_pathway";
  if (!params.hasFamilyStructure) return "missing_family_structure";
  if (!params.hasCountries) return "missing_country_selection";
  if (!params.hasTimeline) return "timeline_not_started";
  if (
    !params.timelineComplete &&
    params.hasTimeline &&
    params.readiness.execution < 60
  ) {
    return "timeline_incomplete";
  }

  return null;
}

function determineExecutionStatus(params: {
  primaryBlocker: PrimaryBlocker;
  hasTimeline: boolean;
  hasActiveTimeline: boolean;
  timelineComplete: boolean;
}): ExecutionStatus {
  if (
    params.primaryBlocker === "missing_pathway" ||
    params.primaryBlocker === "missing_family_structure" ||
    params.primaryBlocker === "missing_country_selection"
  ) {
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
  hasTimeline: boolean;
  executionStatus: ExecutionStatus;
}): SystemStage {
  if (!params.hasPathway || !params.hasCountries) return "planning";
  if (!params.hasTimeline) return "decision";
  if (params.executionStatus === "complete") return "completion";

  return "execution";
}

interface FlowStepParams {
  hasPathway: boolean;
  hasFamilyStructure: boolean;
  hasCountries: boolean;
  countryCount: number;
  hasTimeline: boolean;
  timelineComplete: boolean;
  timelineProgress: number;
  advisoryReady: boolean;
}

function buildUnifiedFlowSteps(params: FlowStepParams): UnifiedFlowStep[] {
  const familyStructureText = params.hasFamilyStructure
    ? "Pathway and family structure established."
    : "Pathway defined, but family structure still needs confirmation.";

  return [
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
      whyMatters:
        "Your pathway determines legal eligibility, cost structures, and which countries are viable options.",
      systemInsight: params.hasPathway
        ? familyStructureText
        : "All downstream decisions depend on this foundation. Without pathway clarity, country matching and timeline generation are disabled.",
      cta: params.hasPathway
        ? undefined
        : {
            label: "Define Pathway",
            href: "/portal/my-plan",
            variant: "primary",
          },
      unlocks: params.hasPathway
        ? undefined
        : [
            "Country matching engine",
            "Legal pathway analysis",
            "Cost modeling",
          ],
      isLocked: false,
    },
    {
      id: "countries",
      number: 2,
      title: "Select Countries",
      module: "countries",
      status: params.hasCountries
        ? "complete"
        : params.hasPathway
          ? "active"
          : "locked",
      statusLabel: params.hasCountries
        ? "COMPLETE"
        : "REQUIRED NOW",
      directive: params.hasCountries
        ? `${params.countryCount} shortlisted — ready for timeline generation`
        : "Select jurisdictions for your treatment plan",
      whyMatters:
        "Jurisdiction determines your legal rights, timeline speed, donor availability, and total cost.",
      systemInsight: params.hasCountries
        ? "Country selection complete. Timeline generation is now available."
        : "Country selection activates the timeline generation engine. Each jurisdiction has unique legal requirements.",
      riskIfDelayed: params.hasCountries
        ? undefined
        : "Limited clinic availability; legal pathway complexity increases with delayed decisions.",
      cta:
        params.hasCountries || !params.hasPathway
          ? undefined
          : {
              label: "Select Countries",
              href: "/portal/countries",
              variant: "primary",
            },
      unlocks: params.hasCountries
        ? ["Timeline generation", "Document requirements"]
        : [
            "Phase-based timeline",
            "Document requirements",
            "Legal pathway mapping",
          ],
      isLocked: !params.hasPathway,
      lockReason: !params.hasPathway
        ? "Complete pathway definition first"
        : undefined,
    },
    {
      id: "timeline",
      number: 3,
      title: "Build Execution Timeline",
      module: "timeline",
      status: params.timelineComplete
        ? "complete"
        : params.hasTimeline
          ? "active"
          : params.hasCountries
            ? "active"
            : "locked",
      statusLabel: params.timelineComplete
        ? "COMPLETE"
        : params.hasTimeline
          ? "IN PROGRESS"
          : "REQUIRED NOW",
      directive: params.timelineComplete
        ? "Timeline complete — execution ready"
        : params.hasTimeline
          ? `Timeline in progress (${params.timelineProgress}%)`
          : params.hasCountries
            ? "Initiate execution timeline — blocking all downstream phases"
            : "Select countries to unlock timeline",
      whyMatters:
        "Without a structured timeline, treatment scheduling, legal preparation, and clinic coordination remain unstructured.",
      systemInsight: params.hasCountries
        ? "Execution cannot begin without structured timeline. All downstream phases depend on this step."
        : "Timeline locked until countries are selected.",
      riskIfDelayed:
        "Treatment scheduling delays of 3–8 weeks; missed scheduling windows increase risk.",
      estimatedEffort: "15–20 minutes to initialize",
      cta: params.hasTimeline
        ? params.timelineComplete
          ? undefined
          : {
              label: "Continue Timeline",
              href: "/portal/timeline",
              variant: "primary",
            }
        : params.hasCountries
          ? {
              label: "Start Timeline Execution",
              href: "/portal/timeline",
              variant: "primary",
            }
          : undefined,
      unlocks: params.timelineComplete
        ? [
            "Document preparation system",
            "Advisory eligibility",
            "Execution tracking",
          ]
        : ["Document preparation system", "Advisory eligibility"],
      isLocked: !params.hasCountries,
      lockReason: !params.hasCountries
        ? "Select countries first"
        : undefined,
    },
    {
      id: "documents",
      number: 4,
      title: "Prepare Documentation",
      module: "documents",
      status: params.timelineComplete
        ? "active"
        : params.hasTimeline
          ? "active"
          : "locked",
      statusLabel: params.timelineComplete
        ? "READY"
        : params.hasTimeline
          ? "AVAILABLE"
          : "LOCKED",
      directive: params.timelineComplete
        ? "Document preparation ready — requirements generated"
        : params.hasTimeline
          ? "Complete timeline to unlock full document requirements"
          : "Timeline must be initiated before document requirements are generated",
      whyMatters:
        "Document requirements vary by jurisdiction and pathway.",
      systemInsight:
        "Document requirements dynamically generated based on selected countries and pathway.",
      riskIfDelayed:
        "Arriving at clinics unprepared delays treatment cycles.",
      cta: params.timelineComplete
        ? {
            label: "Prepare Documents",
            href: "/portal/documents",
            variant: "primary",
          }
        : undefined,
      unlocks: params.timelineComplete
        ? ["Clinic application readiness", "Legal process initiation"]
        : undefined,
      isLocked: !params.hasTimeline,
      lockReason: !params.hasTimeline ? "Generate timeline first" : undefined,
    },
    {
      id: "advisory",
      number: 5,
      title: "Advisory & Execution",
      module: "advisory",
      status: params.timelineComplete
        ? "active"
        : params.advisoryReady
          ? "active"
          : "locked",
      statusLabel: params.timelineComplete
        ? "RECOMMENDED"
        : params.advisoryReady
          ? "AVAILABLE"
          : "LOCKED",
      directive: params.timelineComplete
        ? "Validate strategy with advisory before execution"
        : params.advisoryReady
          ? "Advisory available — validate your plan"
          : "Complete timeline setup to unlock advisory",
      whyMatters:
        "At this stage, incorrect decisions cost months and thousands.",
      systemInsight:
        "Advisory becomes high-value after timeline and country decisions are structured.",
      riskIfDelayed:
        "Proceeding without validation risks choosing wrong jurisdiction or clinics.",
      cta:
        params.advisoryReady || params.timelineComplete
          ? {
              label: "Validate Strategy",
              href: "/portal/advisory",
              variant: "primary",
            }
          : undefined,
      unlocks: ["Expert validation", "Clinic matching", "Execution roadmap"],
      isLocked: !params.advisoryReady && !params.timelineComplete,
      lockReason:
        !params.advisoryReady && !params.timelineComplete
          ? "Reach 70% readiness or complete timeline"
          : undefined,
    },
  ];
}

function buildUnifiedNextAction(params: {
  baseAction: NextActionWithContext;
  primaryBlocker: PrimaryBlocker;
  stage: SystemStage;
}): UnifiedNextAction {
  if (
    params.primaryBlocker === "timeline_not_started" &&
    params.stage === "decision"
  ) {
    return {
      ...params.baseAction,
      title: "Generate Execution Timeline",
      body: "Countries selected. Now transform your planning into executable steps with structured timeline generation.",
      explanation:
        "Timeline structure determines the sequence of legal, medical, and logistical steps. Without it, execution timing cannot be coordinated.",
      stakes:
        "Clinic scheduling, legal filing deadlines, and travel coordination all depend on timeline structure. Delays here compound downstream.",
      unlocks: [
        "Clinic appointment sequencing",
        "Legal documentation timing",
        "Budget flow planning",
        "Advisory engagement readiness",
      ],
      priority: "critical",
      type: "critical",
      module: "timeline",
      href: "/portal/timeline",
      cta: "Generate Timeline →",
      label: "EXECUTION BLOCKED — TIMELINE REQUIRED",
    };
  }

  return {
    ...params.baseAction,
    type: params.baseAction.priority,
    label:
      params.baseAction.priority === "critical"
        ? "REQUIRED ACTION"
        : params.baseAction.priority === "high"
          ? "RECOMMENDED ACTION"
          : params.baseAction.priority === "medium"
            ? "SUGGESTED ACTION"
            : "OPTIONAL ACTION",
  };
}

function buildEnhancedSignals(params: {
  hasCountries: boolean;
  countryCount: number;
  hasTimeline: boolean;
  timelineProgress: number;
  timelineComplete: boolean;
  primaryBlocker: PrimaryBlocker;
  readiness: SplitReadiness;
  rawSignals: AdvisorySignal[];
}): EnhancedSignals {
  const blockers: EnhancedSignals["blockers"] = [];
  const risks: EnhancedSignals["risks"] = [];
  const insights: EnhancedSignals["insights"] = [];

  if (params.primaryBlocker === "missing_pathway") {
    blockers.push({
      id: "missing_pathway",
      message: "Fertility pathway not defined",
      resolution:
        "Define your pathway in My Plan to enable country matching",
      href: "/portal/my-plan",
      severity: "blocking",
    });
  } else if (params.primaryBlocker === "missing_family_structure") {
    blockers.push({
      id: "missing_family_structure",
      message: "Family structure not defined",
      resolution:
        "Complete family structure for accurate country recommendations",
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
  } else if (params.primaryBlocker === "timeline_not_started") {
    blockers.push({
      id: "timeline_not_started",
      message: "Execution timeline not generated",
      resolution: "Generate timeline to structure execution steps",
      href: "/portal/timeline",
      severity: "blocking",
    });
  }

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

  if (
    params.hasTimeline &&
    params.timelineProgress < 30 &&
    !params.timelineComplete
  ) {
    risks.push({
      id: "stalled_timeline",
      message: "Timeline initiated but progress stalled",
      mitigation: "Activate at least one step to maintain momentum",
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

  params.rawSignals.forEach((signal, index) => {
    if (
      signal.type === "blocking" &&
      !blockers.find((blocker) => blocker.message === signal.message)
    ) {
      blockers.push({
        id: `raw-${index}`,
        message: signal.message,
        resolution: signal.action || "Address this issue",
        href: signal.link || "/portal",
        severity: "blocking",
      });
    }
  });

  return { blockers, risks, insights };
}