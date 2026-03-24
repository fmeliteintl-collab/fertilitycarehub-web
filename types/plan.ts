export type TimelineItemStatus = "Completed" | "In Progress" | "Upcoming" | "Blocked";

export type TimelinePhase = 
  | "planning" 
  | "preparation" 
  | "pre-treatment" 
  | "treatment" 
  | "post-treatment";

export type TimelineItem = {
  id: string;
  title: string;
  category: string;
  status: TimelineItemStatus;
  description: string;
  phase: TimelinePhase;
  priority: "high" | "medium" | "low";
  dependencies: string[];
  isLocked: boolean;
  lockReason?: string;
  estimatedDuration?: string;
};

export interface PhaseMeta {
  id: TimelinePhase;
  name: string;
  order: number;
  description: string;
  isLocked: boolean;
  lockReason?: string;
  unlocksDescription: string;
  completionPercentage: number;
  items: TimelineItem[];
}

export type UserPlan = {
  id: string;
  user_id: string;
  pathway_type: string | null;
  family_structure: string | null;
  treatment_goal: string | null;
  donor_needed: boolean;
  surrogate_needed: boolean;
  priorities: string[];
  constraints: string[];
  shortlisted_countries: string[];
  primary_country: string | null; // ADDED: Committed jurisdiction for execution
  timeline_items: TimelineItem[];
  advisory_status: string | null;
  advisory_pathway: string | null;
  advisory_notes: string | null;
  advisory_next_step: string | null;
  advisory_stage: "intake" | "strategy" | "decision" | "execution" | null;
  target_timeline: string | null;
  budget_range: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type UserPlanInput = {
  pathway_type: string | null;
  family_structure: string | null;
  treatment_goal: string | null;
  donor_needed: boolean;
  surrogate_needed: boolean;
  priorities: string[];
  constraints: string[];
  shortlisted_countries: string[];
  primary_country: string | null; // ADDED: Committed jurisdiction for execution
  timeline_items: TimelineItem[];
  advisory_status: string | null;
  advisory_pathway: string | null;
  advisory_notes: string | null;
  advisory_next_step: string | null;
  advisory_stage: "intake" | "strategy" | "decision" | "execution" | null;
  target_timeline: string | null;
  budget_range: string | null;
  notes: string | null;
};

export const EMPTY_USER_PLAN_INPUT: UserPlanInput = {
  pathway_type: null,
  family_structure: null,
  treatment_goal: null,
  donor_needed: false,
  surrogate_needed: false,
  priorities: [],
  constraints: [],
  shortlisted_countries: [],
  primary_country: null, // ADDED
  timeline_items: [],
  advisory_status: null,
  advisory_pathway: null,
  advisory_notes: null,
  advisory_next_step: null,
  advisory_stage: null,
  target_timeline: null,
  budget_range: null,
  notes: null,
};

export const PHASE_ORDER: TimelinePhase[] = [
  "planning",
  "preparation",
  "pre-treatment",
  "treatment",
  "post-treatment",
];

export const PHASE_METADATA: Record<TimelinePhase, { name: string; description: string }> = {
  planning: {
    name: "Planning & Decision",
    description: "Define your pathway, compare countries, and lock your strategic direction",
  },
  preparation: {
    name: "Preparation",
    description: "Clinic identification, legal consultation, and initial medical review",
  },
  "pre-treatment": {
    name: "Pre-Treatment",
    description: "Travel planning, documentation preparation, and cycle scheduling",
  },
  treatment: {
    name: "Treatment",
    description: "Begin treatment cycle, monitoring, procedures, and embryo transfer",
  },
  "post-treatment": {
    name: "Post-Treatment",
    description: "Recovery, follow-up, legal registration, and return planning",
  },
};