"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  getCurrentUserPlan,
  upsertCurrentUserPlan,
} from "@/lib/plans/user-plans";
import {
  getUserAdvisoryTasks,
  createAdvisoryTask,
  updateAdvisoryTaskStatus,
  deleteAdvisoryTask,
} from "@/lib/advisory/tasks";
import { getAdvisoryStage, updateAdvisoryStage } from "@/lib/advisory/stage";
import {
  EMPTY_USER_PLAN_INPUT,
  type UserPlanInput,
} from "@/types/plan";
import { ADVISORY_STAGES, type AdvisoryTask, type AdvisoryStage } from "@/types/advisory";
import {
  calculateAdvisoryReadiness,
  determineExecutionStage,
  buildSmartNextStep,
  buildRecommendedFocus,
  generateAdvisorySignals,
  getTimelineCounts,
  getDisplayValue,
  getDefaultTasksForStage,
  type AdvisorySignal,
} from "@/lib/intelligence/plan-intelligence";
import { DashboardSkeleton } from "@/app/components/skeletons";

// NOTE: Run this command to install icons:
// npm install lucide-react
import { 
  Globe, 
  Target, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  TrendingUp,
  MapPin,
  Calendar,
  FileText,
  ChevronRight,
  Plus,
  Trash2,
  Flag,
  Compass,
  Award,
  Zap
} from "lucide-react";

export const runtime = "edge";

const ADVISORY_STATUS_OPTIONS = [
  "Not Started",
  "Considering",
  "Ready for Strategy Session",
  "In Advisory",
  "Completed",
] as const;

const ADVISORY_PATHWAY_OPTIONS = [
  "Strategy Session",
  "Comprehensive Advisory Package",
  "Undecided",
] as const;

// Stage configuration with icons and colors
const STAGE_CONFIG: Record<string, { 
  num: string; 
  icon: React.ElementType; 
  color: string;
  bgColor: string;
  borderColor: string;
}> = {
  foundation: { 
    num: "01", 
    icon: Compass, 
    color: "text-stone-600",
    bgColor: "bg-stone-100",
    borderColor: "border-stone-200"
  },
  shortlist: { 
    num: "02", 
    icon: Globe, 
    color: "text-[#5a6a5a]",
    bgColor: "bg-[#f0f4f0]",
    borderColor: "border-[#d0d8d0]"
  },
  sequencing: { 
    num: "03", 
    icon: TrendingUp, 
    color: "text-[#8a7a5a]",
    bgColor: "bg-[#faf8f3]",
    borderColor: "border-[#e8e4d8]"
  },
  "advisory-active": { 
    num: "04", 
    icon: Target, 
    color: "text-[#6a5a5a]",
    bgColor: "bg-[#faf6f6]",
    borderColor: "border-[#e8e0e0]"
  },
  completion: { 
    num: "05", 
    icon: Award, 
    color: "text-[#4a6a5a]",
    bgColor: "bg-[#f6faf8]",
    borderColor: "border-[#d8e8e0]"
  },
};

// Premium stage badge with icon
function StageBadge({ stage, showIcon = false }: { stage: string; showIcon?: boolean }) {
  const config = STAGE_CONFIG[stage] || STAGE_CONFIG.foundation;
  const Icon = config.icon;
  
  return (
    <div className={`inline-flex items-center gap-2 rounded-full ${config.bgColor} ${config.borderColor} border px-3 py-1.5`}>
      {showIcon && <Icon className={`w-3.5 h-3.5 ${config.color}`} />}
      <span className="text-[10px] font-bold tracking-[0.15em] text-stone-500 uppercase">Stage</span>
      <span className={`text-xs font-bold ${config.color}`}>{config.num}</span>
    </div>
  );
}

// Premium circular progress with icon
function ProgressRing({ 
  percentage, 
  score, 
  maxScore, 
  stage 
}: { 
  percentage: number; 
  score: number; 
  maxScore: number; 
  stage: string;
}) {
  const circumference = 2 * Math.PI * 26;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  const stageColors = {
    optimal: "stroke-[#6a7a6a]",
    ready: "stroke-[#7a8a7a]",
    developing: "stroke-[#c4b49a]",
    early: "stroke-stone-400",
  };

  return (
    <div className="relative flex items-center justify-center">
      <svg className="transform -rotate-90 w-20 h-20">
        <circle
          cx="40"
          cy="40"
          r="26"
          stroke="currentColor"
          strokeWidth="3"
          fill="transparent"
          className="text-stone-200"
        />
        <circle
          cx="40"
          cy="40"
          r="26"
          stroke="currentColor"
          strokeWidth="3"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={`${stageColors[stage as keyof typeof stageColors] || stageColors.early} transition-all duration-1000 ease-out`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-lg font-bold text-stone-800">{score}</span>
        <span className="text-[10px] text-stone-400 font-medium">/{maxScore}</span>
      </div>
    </div>
  );
}

export default function PortalAdvisoryPage() {
  const [plan, setPlan] = useState<UserPlanInput>(EMPTY_USER_PLAN_INPUT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [hasLoadedInitialData, setHasLoadedInitialData] = useState(false);

  const [advisoryStage, setAdvisoryStage] = useState<AdvisoryStage>(null);
  const [tasks, setTasks] = useState<AdvisoryTask[]>([]);
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");

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
            primary_country: existing.primary_country ?? null,
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
        if (isMounted) {
          setIsError(true);
          setMessage("Failed to load advisory workspace.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
          setHasLoadedInitialData(true);
        }
      }
    }

    void loadPlan();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    async function loadAdvisoryData() {
      if (plan.advisory_status !== "In Advisory") return;

      setLoadingTasks(true);
      try {
        const [stage, userTasks] = await Promise.all([
          getAdvisoryStage(),
          getUserAdvisoryTasks(),
        ]);
        setAdvisoryStage(stage);
        setTasks(userTasks);
      } catch (error) {
        console.error("Failed to load advisory data:", error);
      } finally {
        setLoadingTasks(false);
      }
    }

    loadAdvisoryData();
  }, [plan.advisory_status]);

  function updatePlanField<K extends keyof UserPlanInput>(
    field: K,
    value: UserPlanInput[K]
  ) {
    setPlan((current) => ({
      ...current,
      [field]: value,
    }));

    if (hasLoadedInitialData) {
      setHasUnsavedChanges(true);
      setMessage(null);
      setIsError(false);
    }
  }

  async function handleSave() {
    try {
      setSaving(true);
      setMessage(null);
      setIsError(false);

      await upsertCurrentUserPlan(plan);

      setHasUnsavedChanges(false);
      setMessage("Advisory workspace saved successfully.");
    } catch (error: unknown) {
      console.error(error);
      setIsError(true);
      setMessage("Failed to save advisory workspace.");
    } finally {
      setSaving(false);
    }
  }

  async function handleStageChange(newStage: AdvisoryStage) {
    try {
      await updateAdvisoryStage(newStage);
      setAdvisoryStage(newStage);
    } catch (error) {
      console.error("Failed to update stage:", error);
    }
  }

  async function handleAddDefaultTasks() {
    if (!advisoryStage) return;

    try {
      const defaults = getDefaultTasksForStage(advisoryStage);
      for (const task of defaults) {
        await createAdvisoryTask({
          stage: task.stage,
          title: task.title,
          description: task.description,
          status: "pending",
          sort_order: 0,
        });
      }
      const updated = await getUserAdvisoryTasks();
      setTasks(updated);
    } catch (error) {
      console.error("Failed to add default tasks:", error);
    }
  }

  async function handleCreateTask(e: React.FormEvent) {
    e.preventDefault();
    if (!advisoryStage || !newTaskTitle.trim()) return;

    try {
      await createAdvisoryTask({
        stage: advisoryStage,
        title: newTaskTitle,
        description: newTaskDescription,
        status: "pending",
        sort_order: tasks.length,
      });
      setNewTaskTitle("");
      setNewTaskDescription("");
      const updated = await getUserAdvisoryTasks();
      setTasks(updated);
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  }

  async function handleToggleTask(taskId: string, currentStatus: string) {
    const newStatus = currentStatus === "done" ? "pending" : "done";
    try {
      await updateAdvisoryTaskStatus(taskId, newStatus as AdvisoryTask["status"]);
      setTasks(tasks.map(t => t.id === taskId ? { ...t, status: newStatus as AdvisoryTask["status"] } : t));
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  }

  async function handleDeleteTask(taskId: string) {
    try {
      await deleteAdvisoryTask(taskId);
      setTasks(tasks.filter(t => t.id !== taskId));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  }

  const currentStatus = plan.advisory_status ?? "Not Started";
  const currentPathway = plan.advisory_pathway ?? "Undecided";

  const timelineItems = useMemo(
    () => plan.timeline_items ?? [],
    [plan.timeline_items]
  );

  const timelineCounts = useMemo(
    () => getTimelineCounts(timelineItems),
    [timelineItems]
  );

  const advisoryReadiness = useMemo(
    () => calculateAdvisoryReadiness(plan, 0),
    [plan]
  );

  const advisorySignals = useMemo(
    () => generateAdvisorySignals(plan),
    [plan]
  );

  const executionStage = useMemo(
    () => determineExecutionStage(plan),
    [plan]
  );

  const smartNextStep = useMemo(
    () => buildSmartNextStep(plan),
    [plan]
  );

  const recommendedFocus = useMemo(
    () => buildRecommendedFocus(plan),
    [plan]
  );

  const shortlistedCountries = plan.shortlisted_countries ?? [];

  const blockingSignals = useMemo(
    () => advisorySignals.filter((s: AdvisorySignal) => s.type === "blocking"),
    [advisorySignals]
  );

  const attentionSignals = useMemo(
    () => advisorySignals.filter((s: AdvisorySignal) => s.type === "attention"),
    [advisorySignals]
  );

  const readySignals = useMemo(
    () => advisorySignals.filter((s: AdvisorySignal) => s.type === "ready"),
    [advisorySignals]
  );

  const advisoryItems = useMemo(
    () => [
      {
        title: "Strategy Session",
        status:
          currentPathway === "Strategy Session" ? "Selected" : "Available",
        description:
          "A focused advisory session to clarify pathway direction, shortlist logic, and next-step planning priorities.",
        recommended:
          executionStage.stage === "sequencing" && currentPathway === "Undecided",
      },
      {
        title: "Comprehensive Advisory Package",
        status:
          currentPathway === "Comprehensive Advisory Package"
            ? "Selected"
            : "Core Offer",
        description:
          "A more structured advisory pathway designed for deeper planning, comparative review, and guided decision support.",
        recommended:
          executionStage.stage === "advisory-active" && currentPathway === "Undecided",
      },
      {
        title: "Current Advisory Status",
        status: currentStatus,
        description:
          plan.advisory_notes?.trim() ||
          "This area reflects your saved advisory stage, notes, and next actions.",
        recommended: false,
      },
    ],
    [currentPathway, currentStatus, plan.advisory_notes, executionStage.stage]
  );

  const currentStageTasks = useMemo(() => 
    tasks.filter(t => t.stage === advisoryStage),
    [tasks, advisoryStage]
  );

  const taskProgress = useMemo(() => {
    const total = currentStageTasks.length;
    const done = currentStageTasks.filter(t => t.status === "done").length;
    return { total, done, percentage: total > 0 ? Math.round((done / total) * 100) : 0 };
  }, [currentStageTasks]);

  const stageConfig = STAGE_CONFIG[executionStage.stage] || STAGE_CONFIG.foundation;
  const StageIcon = stageConfig.icon;

  if (loading) {
    return <DashboardSkeleton />;
  }

  // FIXED: Added 'critical' to priorityStyles to handle all PriorityLevel types
  const priorityStyles: Record<string, string> = {
    critical: "bg-rose-100 text-rose-700 border-rose-200",
    high: "bg-rose-100 text-rose-700 border-rose-200",
    medium: "bg-amber-100 text-amber-700 border-amber-200",
    low: "bg-stone-100 text-stone-600 border-stone-200",
  };

  return (
    <div className="space-y-8">
      {/* TIER 1: Executive Header */}
      <div className="rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-bold tracking-[0.2em] text-stone-400 uppercase">Advisory</span>
              <span className="w-8 h-px bg-stone-300"></span>
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-stone-900">
              Advisory Workspace
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-500">
              Manage your advisory pathway, review support formats, and move from
              planning into structured decision support.
            </p>
          </div>
          <Link
            href="/portal"
            className="group inline-flex items-center gap-2 rounded-full border border-stone-300 px-4 py-2 text-sm font-medium text-stone-600 transition hover:border-stone-400 hover:text-stone-900 hover:bg-stone-50"
          >
            <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-0.5 transition-transform" />
            Back to Dashboard
          </Link>
        </div>
      </div>

      {/* NEW: Advisory Active Mode - Stage Header */}
      {plan.advisory_status === "In Advisory" && (
        <section className="rounded-2xl border border-stone-800 bg-gradient-to-br from-stone-900 to-stone-800 p-8 shadow-lg text-white">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <p className="text-xs font-medium tracking-wider text-stone-400 uppercase">
                    Active Advisory Engagement
                  </p>
                  <h2 className="mt-1 text-2xl font-semibold text-white">
                    {advisoryStage ? ADVISORY_STAGES.find(s => s.key === advisoryStage)?.label : "Select Your Stage"}
                  </h2>
                  <p className="mt-1 text-sm text-stone-400 max-w-lg">
                    {advisoryStage ? ADVISORY_STAGES.find(s => s.key === advisoryStage)?.description : "Choose your current advisory stage to see relevant tasks"}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 min-w-[220px]">
                <div className="relative">
                  <select
                    value={advisoryStage ?? ""}
                    onChange={(e) => handleStageChange(e.target.value as AdvisoryStage)}
                    className="w-full appearance-none rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm font-medium text-white focus:outline-none focus:border-white/40 cursor-pointer"
                  >
                    <option value="" className="bg-stone-800 text-stone-300">Select stage...</option>
                    {ADVISORY_STAGES.map((stage) => (
                      <option key={stage.key} value={stage.key} className="bg-stone-800 text-white">
                        {stage.label}
                      </option>
                    ))}
                  </select>
                  <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 rotate-90 pointer-events-none" />
                </div>

                {taskProgress.total > 0 && (
                  <div className="flex items-center gap-3 px-1">
                    <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-500"
                        style={{ width: `${taskProgress.percentage}%` }}
                      />
                    </div>
                    <span className="text-xs text-stone-400 tabular-nums">{taskProgress.done}/{taskProgress.total}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* NEW: Advisory Tasks Section */}
      {plan.advisory_status === "In Advisory" && advisoryStage && (
        <section className="rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-stone-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-stone-900">
                  Stage Tasks
                </h2>
                <p className="text-sm text-stone-500">
                  Complete these tasks to progress through {ADVISORY_STAGES.find(s => s.key === advisoryStage)?.label}
                </p>
              </div>
            </div>
            <button
              onClick={handleAddDefaultTasks}
              className="inline-flex items-center gap-2 rounded-full border border-stone-300 px-4 py-2 text-sm font-medium text-stone-600 hover:border-stone-400 hover:bg-stone-50 transition"
            >
              <Plus className="w-4 h-4" />
              Add Defaults
            </button>
          </div>

          <div className="space-y-3 mb-6">
            {loadingTasks ? (
              <div className="flex items-center justify-center py-8 text-stone-500">
                <div className="w-5 h-5 border-2 border-stone-300 border-t-stone-600 rounded-full animate-spin mr-2"></div>
                Loading tasks...
              </div>
            ) : currentStageTasks.length === 0 ? (
              <div className="rounded-xl border border-dashed border-stone-300 bg-stone-50 p-8 text-center">
                <Target className="w-8 h-8 text-stone-300 mx-auto mb-3" />
                <p className="text-stone-600 font-medium">No tasks for this stage yet.</p>
                <p className="text-stone-400 text-sm mt-1">Add default tasks or create custom ones below.</p>
              </div>
            ) : (
              currentStageTasks.map((task) => (
                <div
                  key={task.id}
                  className={`group rounded-xl border p-4 flex items-start gap-4 transition-all hover:shadow-sm ${
                    task.status === "done"
                      ? "border-emerald-200 bg-emerald-50/50"
                      : "border-stone-200 bg-white hover:border-stone-300"
                  }`}
                >
                  <button
                    onClick={() => handleToggleTask(task.id, task.status)}
                    className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                      task.status === "done"
                        ? "bg-emerald-500 border-emerald-500 text-white"
                        : "border-stone-300 hover:border-stone-400 text-transparent"
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className={`font-medium text-sm ${task.status === "done" ? "line-through text-stone-400" : "text-stone-900"}`}>
                      {task.title}
                    </p>
                    {task.description && (
                      <p className={`text-sm mt-1 ${task.status === "done" ? "text-stone-300" : "text-stone-500"}`}>
                        {task.description}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-stone-400 hover:text-rose-500 hover:bg-rose-50 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          <form onSubmit={handleCreateTask} className="pt-6 border-t border-stone-100">
            <h3 className="text-sm font-medium text-stone-700 mb-3">Add Custom Task</h3>
            <div className="grid gap-3 lg:grid-cols-2">
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="Task title..."
                className="rounded-xl border border-stone-200 px-4 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-400 focus:ring-4 focus:ring-stone-100 transition-all"
              />
              <input
                type="text"
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
                placeholder="Description (optional)..."
                className="rounded-xl border border-stone-200 px-4 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-400 focus:ring-4 focus:ring-stone-100 transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={!newTaskTitle.trim()}
              className="mt-3 inline-flex items-center gap-2 rounded-xl bg-stone-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-stone-800 disabled:opacity-40 transition-all"
            >
              <Plus className="w-4 h-4" />
              Add Task
            </button>
          </form>
        </section>
      )}

      {/* TIER 1: Advisory Readiness */}
      <section className="rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-4 h-4 text-stone-400" />
              <p className="text-xs font-bold tracking-[0.15em] text-stone-400 uppercase">
                Advisory Readiness
              </p>
            </div>
            <p className="text-sm text-stone-500">
              Measures planning maturity for meaningful advisory engagement
            </p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-4xl font-semibold text-stone-900 tabular-nums">
                {advisoryReadiness.percentage}%
              </p>
              <p className="text-sm font-medium text-stone-400 capitalize">
                {advisoryReadiness.stage} stage
              </p>
            </div>
            <ProgressRing 
              percentage={advisoryReadiness.percentage}
              score={advisoryReadiness.score}
              maxScore={advisoryReadiness.maxScore}
              stage={advisoryReadiness.stage}
            />
          </div>
        </div>

        <div className="mt-6 h-2 w-full rounded-full bg-stone-100 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${
              advisoryReadiness.stage === "optimal"
                ? "bg-gradient-to-r from-emerald-500 to-emerald-400"
                : advisoryReadiness.stage === "ready"
                ? "bg-gradient-to-r from-[#6a7a6a] to-[#8a9a8a]"
                : advisoryReadiness.stage === "developing"
                ? "bg-gradient-to-r from-amber-400 to-amber-300"
                : "bg-stone-400"
            }`}
            style={{ width: `${advisoryReadiness.percentage}%` }}
          />
        </div>
      </section>

      {/* TIER 1: Advisory Signals */}
      {advisorySignals.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <Sparkles className="w-4 h-4 text-stone-400" />
            <h2 className="text-sm font-bold tracking-[0.15em] text-stone-400 uppercase">
              Advisory Signals
            </h2>
          </div>

          {blockingSignals.length > 0 && (
            <div className="space-y-3">
              {blockingSignals.map((signal, idx) => (
                <div
                  key={`blocking-${idx}`}
                  className="rounded-xl border-l-4 border-rose-400 bg-rose-50/50 p-5"
                >
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center shrink-0">
                        <Flag className="w-4 h-4 text-rose-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-rose-900 text-sm">
                          {signal.message}
                        </p>
                        {signal.action && (
                          <p className="mt-0.5 text-sm text-rose-700/70">
                            {signal.action}
                          </p>
                        )}
                      </div>
                    </div>
                    {signal.link && (
                      <Link
                        href={signal.link}
                        className="inline-flex items-center gap-1 text-sm font-medium text-rose-700 hover:text-rose-900 transition"
                      >
                        Go to module <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {attentionSignals.length > 0 && (
            <div className="space-y-3">
              {attentionSignals.map((signal, idx) => (
                <div
                  key={`attention-${idx}`}
                  className="rounded-xl border-l-4 border-amber-400 bg-amber-50/50 p-5"
                >
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
                        <Sparkles className="w-4 h-4 text-amber-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-amber-900 text-sm">
                          {signal.message}
                        </p>
                        {signal.action && (
                          <p className="mt-0.5 text-sm text-amber-700/70">
                            {signal.action}
                          </p>
                        )}
                      </div>
                    </div>
                    {signal.link && (
                      <Link
                        href={signal.link}
                        className="inline-flex items-center gap-1 text-sm font-medium text-amber-700 hover:text-amber-900 transition"
                      >
                        Go to module <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {readySignals.length > 0 && (
            <div className="space-y-3">
              {readySignals.map((signal, idx) => (
                <div
                  key={`ready-${idx}`}
                  className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-5"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    </div>
                    <p className="font-semibold text-emerald-900 text-sm pt-1.5">{signal.message}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* TIER 2: Execution Stage */}
      <section className={`rounded-2xl border ${stageConfig.borderColor} ${stageConfig.bgColor} p-6`}>
        <div className="flex items-start gap-4">
          <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm ${stageConfig.borderColor} border`}>
            <StageIcon className={`w-7 h-7 ${stageConfig.color}`} />
          </div>
          <div className="flex-1 pt-1">
            <StageBadge stage={executionStage.stage} />
            <h2 className="mt-2 text-xl font-semibold text-stone-900 capitalize">
              {executionStage.stage.replace("-", " ")}
            </h2>
            <p className="mt-1 text-sm text-stone-600 leading-relaxed">
              {executionStage.description}
            </p>

            <div className="mt-4">
              <p className="text-xs font-bold tracking-wide text-stone-400 uppercase mb-2">
                Recommended Actions
              </p>
              <div className="flex flex-wrap gap-2">
                {executionStage.nextActions.map((action, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-stone-200 text-sm text-stone-700 shadow-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-400"></span>
                    {action}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TIER 2: Recommended Focus & Smart Next Step */}
      <div className="grid lg:grid-cols-2 gap-6">
        <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Compass className="w-4 h-4 text-stone-400" />
            <p className="text-xs font-bold tracking-[0.15em] text-stone-400 uppercase">
              Recommended Focus
            </p>
          </div>
          <p className="text-lg font-semibold text-stone-900 leading-snug">
            {recommendedFocus}
          </p>
          <p className="mt-2 text-sm text-stone-500">
            Generated from your current planning, shortlist, and timeline state.
          </p>
        </section>

        <section className="rounded-2xl border border-stone-800 bg-gradient-to-br from-stone-900 to-stone-800 p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <p className="text-xs font-bold tracking-[0.15em] text-stone-400 uppercase">
                Smart Next Step
              </p>
            </div>
            {/* FIXED: Using Record<string, string> type with fallback */}
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
              priorityStyles[smartNextStep.priority] || priorityStyles.medium
            }`}>
              {smartNextStep.priority}
            </span>
          </div>
          <p className="text-lg font-semibold leading-snug">
            {smartNextStep.step}
          </p>
          <p className="mt-2 text-sm text-stone-400">
            {smartNextStep.context}
          </p>
        </section>
      </div>

      {/* TIER 1: Advisory Pathways */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 px-1">
          <MapPin className="w-4 h-4 text-stone-400" />
          <h2 className="text-sm font-bold tracking-[0.15em] text-stone-400 uppercase">
            Advisory Pathways
          </h2>
          <span className="flex-1 h-px bg-stone-200 ml-2"></span>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {advisoryItems.slice(0, 2).map((item) => (
            <article
              key={item.title}
              className={`group rounded-2xl border p-6 transition-all duration-300 hover:shadow-md ${
                item.recommended
                  ? "border-amber-300 bg-gradient-to-br from-amber-50/50 to-white shadow-sm"
                  : item.status === "Selected"
                  ? "border-emerald-300 bg-emerald-50/30"
                  : "border-stone-200 bg-white hover:border-stone-300"
              }`}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-stone-900">
                    {item.title}
                  </h3>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`rounded-full px-3 py-1 text-xs font-medium border ${
                      item.status === "Selected"
                        ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                        : "bg-stone-100 text-stone-600 border-stone-200"
                    }`}>
                      {item.status}
                    </span>
                    {item.recommended && (
                      <span className="rounded-full bg-amber-400 text-amber-950 px-3 py-1 text-xs font-bold shadow-sm">
                        Best Fit
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-sm leading-relaxed text-stone-600 flex-1">
                  {item.description}
                </p>

                {item.recommended && (
                  <div className="mt-4 pt-4 border-t border-amber-200/50">
                    <p className="text-xs text-amber-700/80 font-medium flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Recommended for your current stage
                    </p>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* TIER 2: Advisory Settings */}
      <section className="rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-4 h-4 text-stone-400" />
            <h2 className="text-sm font-bold tracking-[0.15em] text-stone-400 uppercase">
              Advisory Settings
            </h2>
          </div>
          <p className="text-sm text-stone-500">
            Manage your advisory stage, preferred pathway, notes, and next action.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xs font-bold tracking-wide text-stone-400 uppercase mb-4">
            Advisory Position
          </h3>
          <div className="grid gap-4 lg:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-stone-700">
                Advisory Status
              </label>
              <div className="relative">
                <select
                  className="w-full appearance-none rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-900 focus:outline-none focus:border-stone-400 focus:bg-white transition-all cursor-pointer"
                  value={plan.advisory_status ?? "Not Started"}
                  onChange={(e) =>
                    updatePlanField("advisory_status", e.target.value)
                  }
                >
                  {ADVISORY_STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 rotate-90 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-stone-700">
                Preferred Advisory Pathway
              </label>
              <div className="relative">
                <select
                  className="w-full appearance-none rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-900 focus:outline-none focus:border-stone-400 focus:bg-white transition-all cursor-pointer"
                  value={plan.advisory_pathway ?? "Undecided"}
                  onChange={(e) =>
                    updatePlanField("advisory_pathway", e.target.value)
                  }
                >
                  {ADVISORY_PATHWAY_OPTIONS.map((pathway) => (
                    <option key={pathway} value={pathway}>
                      {pathway}
                    </option>
                  ))}
                </select>
                <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 rotate-90 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xs font-bold tracking-wide text-stone-400 uppercase mb-4">
            Notes & Next Action
          </h3>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-stone-700">
                Advisory Notes
              </label>
              <textarea
                className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-400 focus:bg-white transition-all resize-none"
                rows={4}
                value={plan.advisory_notes ?? ""}
                onChange={(e) =>
                  updatePlanField("advisory_notes", e.target.value)
                }
                placeholder="Add pathway questions, strategic concerns, legal or logistical issues, or case context for advisory review."
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-stone-700">
                Next Advisory Step
              </label>
              <input
                type="text"
                className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-400 focus:bg-white transition-all"
                value={plan.advisory_next_step ?? ""}
                onChange={(e) =>
                  updatePlanField("advisory_next_step", e.target.value)
                }
                placeholder="Clarify pathway questions / Book strategy session / Compare shortlisted countries"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-stone-100">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving || !hasUnsavedChanges}
            className="inline-flex items-center gap-2 rounded-xl bg-stone-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60 shadow-lg shadow-stone-900/10"
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Saving...
              </>
            ) : hasUnsavedChanges ? (
              "Save Changes"
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Saved
              </>
            )}
          </button>

          {message ? (
            <p
              className={`text-sm font-medium ${
                isError ? "text-rose-600" : "text-emerald-600"
              }`}
            >
              {message}
            </p>
          ) : (
            <p className="text-sm text-stone-400">
              {hasUnsavedChanges ? "Unsaved changes" : "All changes saved"}
            </p>
          )}
        </div>
      </section>

      {/* TIER 3: Cross-Module Context */}
      <section className="grid gap-4 lg:grid-cols-4">
        {[
          { 
            label: "Shortlisted Countries", 
            value: shortlistedCountries.length > 0 ? shortlistedCountries.join(", ") : "No shortlist yet",
            icon: MapPin,
            action: shortlistedCountries.length === 0 ? { text: "Build shortlist", href: "/portal/countries" } : null
          },
          { 
            label: "Timeline Completed", 
            value: timelineCounts.completed.toString(),
            icon: CheckCircle2,
            subtext: "Completed milestones",
            action: timelineCounts.completed === 0 && timelineCounts.total === 0 ? { text: "Generate timeline", href: "/portal/timeline" } : null
          },
          { 
            label: "Timeline In Progress", 
            value: timelineCounts.inProgress.toString(),
            icon: TrendingUp,
            subtext: "Active planning items"
          },
          { 
            label: "Timeline Upcoming", 
            value: timelineCounts.upcoming.toString(),
            icon: Calendar,
            subtext: "Remaining milestones"
          },
        ].map((item, idx) => (
          <div key={idx} className="rounded-2xl border border-stone-200 bg-white p-5 hover:shadow-sm transition-all">
            <div className="flex items-center gap-2 mb-3">
              <item.icon className="w-4 h-4 text-stone-400" />
              <span className="text-[10px] font-bold tracking-wide text-stone-400 uppercase">{item.label}</span>
            </div>
            <p className="text-lg font-semibold text-stone-900 mb-1">
              {item.value}
            </p>
            {item.action ? (
              <Link href={item.action.href} className="inline-flex items-center gap-1 text-xs text-stone-500 hover:text-stone-900 transition">
                {item.action.text} <ArrowRight className="w-3 h-3" />
              </Link>
            ) : (
              <p className="text-xs text-stone-400">{item.subtext}</p>
            )}
          </div>
        ))}
      </section>

      {/* TIER 3: Planning Context Snapshot */}
      <section className="rounded-2xl border border-stone-200 bg-stone-50 p-6">
        <div className="flex items-center gap-2 mb-6">
          <FileText className="w-4 h-4 text-stone-400" />
          <h2 className="text-sm font-bold tracking-[0.15em] text-stone-400 uppercase">
            Planning Context Snapshot
          </h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-4">
          {[
            { label: "Pathway", value: getDisplayValue(plan.pathway_type, "Not yet specified") },
            { label: "Target Timeline", value: getDisplayValue(plan.target_timeline, "Not yet defined") },
            { label: "Budget Range", value: getDisplayValue(plan.budget_range, "Not yet defined") },
            { label: "Planning Notes", value: getDisplayValue(plan.notes, "No notes saved yet") },
          ].map((item, idx) => (
            <div key={idx} className="rounded-xl border border-stone-200 bg-white p-4">
              <p className="text-[10px] font-bold tracking-wide text-stone-400 uppercase mb-2">{item.label}</p>
              <p className="text-sm font-medium text-stone-900 leading-relaxed">{item.value}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}