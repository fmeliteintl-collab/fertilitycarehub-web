export type AdvisoryStage = "intake" | "strategy" | "decision" | "execution" | null;

export type AdvisoryTaskStatus = "pending" | "in_progress" | "done";

export interface AdvisoryTask {
  id: string;
  user_id: string;
  stage: AdvisoryStage;
  title: string;
  description: string | null;
  status: AdvisoryTaskStatus;
  sort_order: number;
  created_at: string;
  updated_at: string;
  completed_at: string | null;
}

export interface AdvisoryStageConfig {
  key: Exclude<AdvisoryStage, null>;
  label: string;
  description: string;
  color: string;
}

export const ADVISORY_STAGES: AdvisoryStageConfig[] = [
  {
    key: "intake",
    label: "Intake & Alignment",
    description: "Confirm goals, constraints, and pathway foundation",
    color: "#6a7a6a",
  },
  {
    key: "strategy",
    label: "Strategy Design",
    description: "Country validation, timeline sequencing, risk identification",
    color: "#8a9a8a",
  },
  {
    key: "decision",
    label: "Decision Support",
    description: "Narrow choices, final recommendations, execution planning",
    color: "#d4c4a8",
  },
  {
    key: "execution",
    label: "Execution Guidance",
    description: "Document prep, clinic coordination, timeline tracking",
    color: "#c4a7a7",
  },
];