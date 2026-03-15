export type TimelineItemStatus = "Completed" | "In Progress" | "Upcoming";

export type TimelineItem = {
  id: string;
  title: string;
  category: string;
  status: TimelineItemStatus;
  description: string;
};

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
  timeline_items: TimelineItem[];
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
  timeline_items: TimelineItem[];
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
  timeline_items: [],
  target_timeline: null,
  budget_range: null,
  notes: null,
};