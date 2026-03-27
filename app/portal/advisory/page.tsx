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
  generateAdvisorySignals,
  getTimelineCounts,
  getDisplayValue,
  getDefaultTasksForStage,
  type AdvisorySignal,
} from "@/lib/intelligence/plan-intelligence";
import { DashboardSkeleton } from "@/app/components/skeletons";

import { 
  Globe, 
  Target, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  TrendingUp,
  MapPin,
  FileText,
  ChevronRight,
  Plus,
  Trash2,
  Compass,
  Award,
  Zap,
  MessageSquare,
  Briefcase,
  HelpCircle,
  AlertCircle,
  Clock,
  Shield
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

// Premium colored globe icon component
function ColoredGlobe({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Ocean - deep blue gradient */}
      <defs>
        <radialGradient id="oceanGrad" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#4A90D9" />
          <stop offset="100%" stopColor="#1E4A7A" />
        </radialGradient>
        <linearGradient id="landGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7CB342" />
          <stop offset="50%" stopColor="#558B2F" />
          <stop offset="100%" stopColor="#33691E" />
        </linearGradient>
      </defs>

      {/* Base sphere */}
      <circle cx="12" cy="12" r="10" fill="url(#oceanGrad)" stroke="#1E4A7A" strokeWidth="0.5"/>

      {/* Continents - stylized landmasses */}
      <path d="M8 4c-1 1-2 3-2 5 0 2 1 3 2 4s2 1 3 0c1-1 1-3 0-4s-2-3-3-5z" fill="url(#landGrad)" opacity="0.9"/>
      <path d="M14 6c1 0 2 1 3 2s1 3 0 4-2 2-3 1c-1-1-1-3 0-5 0-1 0-2 0-2z" fill="url(#landGrad)" opacity="0.9"/>
      <path d="M6 14c0 1 1 3 2 4s3 2 4 1c1-1 0-3-1-4s-3-2-5-1z" fill="url(#landGrad)" opacity="0.85"/>
      <path d="M16 15c1 1 2 2 2 3s-1 2-2 2-2-1-2-2 1-2 2-3z" fill="url(#landGrad)" opacity="0.85"/>

      {/* Grid lines for globe effect */}
      <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5"/>
      <line x1="12" y1="2" x2="12" y2="22" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5"/>
      <line x1="2" y1="12" x2="22" y2="12" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5"/>

      {/* Highlight for 3D effect */}
      <ellipse cx="8" cy="8" rx="3" ry="2" fill="rgba(255,255,255,0.15)" transform="rotate(-45 8 8)"/>
    </svg>
  );
}

// Stage configuration with premium styling
const STAGE_CONFIG: Record<string, { 
  num: string; 
  icon: React.ElementType; 
  color: string;
  bgColor: string;
  borderColor: string;
  gradient: string;
}> = {
  foundation: { 
    num: "01", 
    icon: Compass, 
    color: "text-stone-600",
    bgColor: "bg-stone-100",
    borderColor: "border-stone-200",
    gradient: "from-stone-50 to-stone-100"
  },
  shortlist: { 
    num: "02", 
    icon: Globe, 
    color: "text-[#2E5C8A]",
    bgColor: "bg-[#EBF4FA]",
    borderColor: "border-[#C5DFF5]",
    gradient: "from-[#f8fbfd] to-[#EBF4FA]"
  },
  sequencing: { 
    num: "03", 
    icon: TrendingUp, 
    color: "text-[#8a7a5a]",
    bgColor: "bg-[#faf8f3]",
    borderColor: "border-[#e8e4d8]",
    gradient: "from-[#fdfcfa] to-[#faf8f3]"
  },
  "advisory-active": { 
    num: "04", 
    icon: Target, 
    color: "text-[#6a5a5a]",
    bgColor: "bg-[#faf6f6]",
    borderColor: "border-[#e8e0e0]",
    gradient: "from-[#fdfbfa] to-[#faf6f6]"
  },
  completion: { 
    num: "05", 
    icon: Award, 
    color: "text-[#4a6a5a]",
    bgColor: "bg-[#f6faf8]",
    borderColor: "border-[#d8e8e0]",
    gradient: "from-[#fafdfb] to-[#f6faf8]"
  },
};

// Premium stage badge
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

// Premium circular progress
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
    optimal: "stroke-emerald-600",
    ready: "stroke-[#5a7a6a]",
    developing: "stroke-amber-500",
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

// Signal card component
function SignalCard({ signal, variant }: { signal: AdvisorySignal; variant: "blocking" | "attention" | "ready" }) {
  const styles = {
    blocking: {
      border: "border-l-4 border-rose-400",
      bg: "bg-rose-50/50",
      iconBg: "bg-rose-100",
      iconColor: "text-rose-600",
      text: "text-rose-900",
      subtext: "text-rose-700/70",
      link: "text-rose-700 hover:text-rose-900",
      Icon: AlertCircle
    },
    attention: {
      border: "border-l-4 border-amber-400",
      bg: "bg-amber-50/50",
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      text: "text-amber-900",
      subtext: "text-amber-700/70",
      link: "text-amber-700 hover:text-amber-900",
      Icon: HelpCircle
    },
    ready: {
      border: "border-l-4 border-emerald-400",
      bg: "bg-emerald-50/50",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      text: "text-emerald-900",
      subtext: "text-emerald-700/70",
      link: "text-emerald-700 hover:text-emerald-900",
      Icon: CheckCircle2
    }
  };

  const style = styles[variant];
  const Icon = style.Icon;

  return (
    <div className={`rounded-xl ${style.border} ${style.bg} p-5`}>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-3">
          <div className={`w-8 h-8 rounded-lg ${style.iconBg} flex items-center justify-center shrink-0`}>
            <Icon className={`w-4 h-4 ${style.iconColor}`} />
          </div>
          <div>
            <p className={`font-semibold ${style.text} text-sm`}>
              {signal.message}
            </p>
            {signal.action && (
              <p className={`mt-0.5 text-sm ${style.subtext}`}>
                {signal.action}
              </p>
            )}
          </div>
        </div>
        {signal.link && (
          <Link
            href={signal.link}
            className={`inline-flex items-center gap-1 text-sm font-medium ${style.link} transition`}
          >
            Go to module <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </div>
  );
}

// Narrative interpretation block
function NarrativeBlock({ 
  readiness, 
  isInAdvisory 
}: { 
  readiness: { percentage: number; stage: string }; 
  isInAdvisory: boolean;
}) {
  const getNarrative = () => {
    if (isInAdvisory) {
      return {
        title: "Active Advisory Engagement",
        subtitle: "You are currently in structured advisory support.",
        interpretation: "Your planning foundation is established and you are receiving guided decision support. Focus on completing current workstreams and maintaining momentum through your advisory stage.",
        tone: "active" as const
      };
    }

    if (readiness.percentage >= 75) {
      return {
        title: "Ready for Advisory Engagement",
        subtitle: "Your planning foundation is strong.",
        interpretation: "You have built sufficient context across pathway definition, country evaluation, and timeline planning. Advisory support will now add strategic value rather than fill gaps.",
        tone: "ready" as const
      };
    }

    if (readiness.percentage >= 50) {
      return {
        title: "Building Advisory Readiness",
        subtitle: "Continue strengthening your planning foundation.",
        interpretation: "Your planning is developing well. Complete your country shortlist validation and timeline sequencing to maximize the value of advisory engagement when you are ready.",
        tone: "developing" as const
      };
    }

    return {
      title: "Foundation Building Phase",
      subtitle: "Establish core planning elements first.",
      interpretation: "Advisory support is most valuable once you have defined your pathway type, family context, and initial country interests. Focus on completing your planning profile and shortlist first.",
      tone: "early" as const
    };
  };

  const narrative = getNarrative();

  const toneStyles = {
    active: "from-stone-900 to-stone-800 text-white",
    ready: "from-emerald-800 to-emerald-700 text-white",
    developing: "from-amber-800 to-amber-700 text-white",
    early: "from-stone-700 to-stone-600 text-white"
  };

  return (
    <div className={`rounded-2xl bg-gradient-to-br ${toneStyles[narrative.tone]} p-8 shadow-lg`}>
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
          <MessageSquare className="w-6 h-6 text-white/80" />
        </div>
        <div className="flex-1">
          <p className="text-xs font-medium tracking-wider text-white/60 uppercase">
            Advisory Interpretation
          </p>
          <h3 className="mt-1 text-xl font-semibold text-white">
            {narrative.title}
          </h3>
          <p className="mt-1 text-sm text-white/70">
            {narrative.subtitle}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-white/80 max-w-3xl">
            {narrative.interpretation}
          </p>
        </div>
      </div>
    </div>
  );
}

// Workstream section for active advisory
function WorkstreamSection({ 
  title, 
  icon: Icon, 
  items, 
  emptyText,
  variant = "default"
}: { 
  title: string; 
  icon: React.ElementType; 
  items: AdvisoryTask[];
  emptyText: string;
  variant?: "default" | "critical" | "question";
}) {
  const variantStyles = {
    default: "border-stone-200 bg-white",
    critical: "border-rose-200 bg-rose-50/30",
    question: "border-amber-200 bg-amber-50/30"
  };

  return (
    <div className={`rounded-2xl border ${variantStyles[variant]} p-6`}>
      <div className="flex items-center gap-3 mb-5">
        <div className={`w-10 h-10 rounded-xl ${variant === "default" ? "bg-stone-100" : variant === "critical" ? "bg-rose-100" : "bg-amber-100"} flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${variant === "default" ? "text-stone-600" : variant === "critical" ? "text-rose-600" : "text-amber-600"}`} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-stone-900">{title}</h3>
          <p className="text-sm text-stone-500">{items.length} active</p>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-stone-300 bg-stone-50/50 p-6 text-center">
          <p className="text-sm text-stone-500">{emptyText}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((task) => (
            <div
              key={task.id}
              className={`group rounded-xl border p-4 flex items-start gap-3 transition-all hover:shadow-sm ${
                task.status === "done"
                  ? "border-emerald-200 bg-emerald-50/30"
                  : "border-stone-200 bg-white hover:border-stone-300"
              }`}
            >
              <div className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                task.status === "done"
                  ? "bg-emerald-500 border-emerald-500 text-white"
                  : "border-stone-300 text-transparent"
              }`}>
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Pathway card for pre-advisory state
function PathwayCard({ 
  title, 
  description, 
  isSelected, 
  isRecommended,
  onSelect,
  suitability
}: { 
  title: string; 
  description: string; 
  isSelected: boolean;
  isRecommended: boolean;
  onSelect: () => void;
  suitability: "ideal" | "suitable" | "not-yet";
}) {
  const suitabilityStyles = {
    ideal: "border-emerald-300 bg-emerald-50/30",
    suitable: "border-stone-300 bg-white",
    "not-yet": "border-stone-200 bg-stone-50/50 opacity-70"
  };

  return (
    <div 
      onClick={onSelect}
      className={`group rounded-2xl border-2 p-6 cursor-pointer transition-all duration-300 hover:shadow-md ${
        isSelected ? "border-stone-900 bg-stone-50" : suitabilityStyles[suitability]
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className={`text-lg font-semibold ${isSelected ? "text-stone-900" : "text-stone-800"}`}>
          {title}
        </h3>
        <div className="flex flex-col items-end gap-2">
          {isSelected && (
            <span className="rounded-full bg-stone-900 text-white px-3 py-1 text-xs font-medium">
              Selected
            </span>
          )}
          {isRecommended && !isSelected && (
            <span className="rounded-full bg-amber-100 text-amber-800 border border-amber-200 px-3 py-1 text-xs font-medium">
              Recommended
            </span>
          )}
        </div>
      </div>

      <p className="text-sm leading-relaxed text-stone-600 mb-4">
        {description}
      </p>

      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${
          suitability === "ideal" ? "bg-emerald-500" : 
          suitability === "suitable" ? "bg-amber-500" : "bg-stone-400"
        }`} />
        <span className="text-xs text-stone-500">
          {suitability === "ideal" ? "Ideal for your current stage" : 
           suitability === "suitable" ? "Suitable with preparation" : "Complete planning foundation first"}
        </span>
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
  const isInAdvisory = currentStatus === "In Advisory";

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

  // Determine pathway suitability
  const getPathwaySuitability = (): "ideal" | "suitable" | "not-yet" => {
    if (isInAdvisory) return "ideal";
    if (advisoryReadiness.percentage >= 75) return "ideal";
    if (advisoryReadiness.percentage >= 50) return "suitable";
    return "not-yet";
  };

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Executive Header */}
      <div className="rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center shadow-lg">
                <ColoredGlobe className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold tracking-[0.2em] text-stone-400 uppercase">Private Advisory Layer</span>
              </div>
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-stone-900">
              {isInAdvisory ? "Advisory Engagement" : "Advisory Readiness"}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-500">
              {isInAdvisory 
                ? "Structured decision support and strategic guidance for your fertility planning journey."
                : "Assess your readiness for advisory engagement and explore structured support pathways."}
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

      {/* Narrative Interpretation Block */}
      <NarrativeBlock 
        readiness={advisoryReadiness}
        isInAdvisory={isInAdvisory}
      />

      {/* PRE-ADVISORY MODE */}
      {!isInAdvisory && (
        <>
          {/* Readiness Assessment */}
          <section className="rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-4 h-4 text-stone-400" />
                  <p className="text-xs font-bold tracking-[0.15em] text-stone-400 uppercase">
                    Advisory Readiness
                  </p>
                </div>
                <p className="text-sm text-stone-500 max-w-md">
                  Measures planning maturity across pathway definition, country evaluation, and timeline sequencing.
                </p>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-4xl font-semibold text-stone-900 tabular-nums">
                    {advisoryReadiness.percentage}%
                  </p>
                  <p className="text-sm font-medium text-stone-400 capitalize">
                    {advisoryReadiness.stage} readiness
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
                    ? "bg-gradient-to-r from-emerald-600 to-emerald-400"
                    : advisoryReadiness.stage === "ready"
                    ? "bg-gradient-to-r from-[#5a7a6a] to-[#7a9a8a]"
                    : advisoryReadiness.stage === "developing"
                    ? "bg-gradient-to-r from-amber-500 to-amber-300"
                    : "bg-stone-400"
                }`}
                style={{ width: `${advisoryReadiness.percentage}%` }}
              />
            </div>
          </section>

          {/* Advisory Pathways */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 px-1">
              <Briefcase className="w-4 h-4 text-stone-400" />
              <h2 className="text-sm font-bold tracking-[0.15em] text-stone-400 uppercase">
                Advisory Pathways
              </h2>
              <span className="flex-1 h-px bg-stone-200 ml-2"></span>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <PathwayCard
                title="Strategy Session"
                description="A focused advisory session to clarify pathway direction, validate country shortlist logic, and establish next-step planning priorities. Ideal for those with established planning foundations seeking targeted guidance."
                isSelected={currentPathway === "Strategy Session"}
                isRecommended={executionStage.stage === "sequencing" && currentPathway === "Undecided"}
                onSelect={() => updatePlanField("advisory_pathway", "Strategy Session")}
                suitability={getPathwaySuitability()}
              />
              <PathwayCard
                title="Comprehensive Advisory Package"
                description="A structured advisory pathway for complex planning scenarios requiring deeper comparative review, legal coordination, and guided decision support across multiple jurisdictions and timeline phases."
                isSelected={currentPathway === "Comprehensive Advisory Package"}
                isRecommended={executionStage.stage === "advisory-active" && currentPathway === "Undecided"}
                onSelect={() => updatePlanField("advisory_pathway", "Comprehensive Advisory Package")}
                suitability={getPathwaySuitability()}
              />
            </div>
          </section>

          {/* Advisory Signals */}
          {advisorySignals.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center gap-2 px-1">
                <Sparkles className="w-4 h-4 text-stone-400" />
                <h2 className="text-sm font-bold tracking-[0.15em] text-stone-400 uppercase">
                  Planning Intelligence
                </h2>
              </div>

              <div className="space-y-3">
                {blockingSignals.map((signal, idx) => (
                  <SignalCard key={`blocking-${idx}`} signal={signal} variant="blocking" />
                ))}
                {attentionSignals.map((signal, idx) => (
                  <SignalCard key={`attention-${idx}`} signal={signal} variant="attention" />
                ))}
                {readySignals.map((signal, idx) => (
                  <SignalCard key={`ready-${idx}`} signal={signal} variant="ready" />
                ))}
              </div>
            </section>
          )}

          {/* Current Execution Stage */}
          <section className={`rounded-2xl border ${stageConfig.borderColor} bg-gradient-to-br ${stageConfig.gradient} p-6`}>
            <div className="flex items-start gap-4">
              <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm ${stageConfig.borderColor} border`}>
                <stageConfig.icon className={`w-7 h-7 ${stageConfig.color}`} />
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
                    Recommended Focus
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

          {/* Smart Next Step */}
          <section className="rounded-2xl border border-stone-800 bg-gradient-to-br from-stone-900 to-stone-800 p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <p className="text-xs font-bold tracking-[0.15em] text-stone-400 uppercase">
                  Strategic Next Step
                </p>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                smartNextStep.priority === "critical" ? "bg-rose-500/20 text-rose-300 border-rose-500/30" :
                smartNextStep.priority === "high" ? "bg-amber-500/20 text-amber-300 border-amber-500/30" :
                "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
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

          {/* Advisory Settings */}
          <section className="rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-stone-400" />
                <h2 className="text-sm font-bold tracking-[0.15em] text-stone-400 uppercase">
                  Advisory Position
                </h2>
              </div>
              <p className="text-sm text-stone-500">
                Define your current advisory status and preferences.
              </p>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-stone-700">
                  Current Advisory Status
                </label>
                <div className="relative">
                  <select
                    className="w-full appearance-none rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-900 focus:outline-none focus:border-stone-400 focus:bg-white transition-all cursor-pointer"
                    value={currentStatus}
                    onChange={(e) => updatePlanField("advisory_status", e.target.value)}
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
                  Preferred Pathway
                </label>
                <div className="relative">
                  <select
                    className="w-full appearance-none rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-900 focus:outline-none focus:border-stone-400 focus:bg-white transition-all cursor-pointer"
                    value={currentPathway}
                    onChange={(e) => updatePlanField("advisory_pathway", e.target.value)}
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

            <div className="mt-6">
              <label className="mb-2 block text-sm font-medium text-stone-700">
                Advisory Notes & Context
              </label>
              <textarea
                className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-400 focus:bg-white transition-all resize-none"
                rows={4}
                value={plan.advisory_notes ?? ""}
                onChange={(e) => updatePlanField("advisory_notes", e.target.value)}
                placeholder="Document your pathway questions, strategic concerns, or specific areas where advisory support would be most valuable."
              />
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-stone-100 mt-6">
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
                <p className={`text-sm font-medium ${isError ? "text-rose-600" : "text-emerald-600"}`}>
                  {message}
                </p>
              ) : (
                <p className="text-sm text-stone-400">
                  {hasUnsavedChanges ? "Unsaved changes" : "All changes saved"}
                </p>
              )}
            </div>
          </section>
        </>
      )}

      {/* ACTIVE ADVISORY MODE */}
      {isInAdvisory && (
        <>
          {/* Active Advisory Header */}
          <section className="rounded-2xl border border-stone-800 bg-gradient-to-br from-stone-900 to-stone-800 p-8 shadow-lg text-white">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center">
                    <Briefcase className="w-7 h-7 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-xs font-medium tracking-wider text-stone-400 uppercase">
                      Active Advisory Engagement
                    </p>
                    <h2 className="mt-1 text-2xl font-semibold text-white">
                      {advisoryStage ? ADVISORY_STAGES.find(s => s.key === advisoryStage)?.label : "Select Advisory Stage"}
                    </h2>
                    <p className="mt-1 text-sm text-stone-400 max-w-lg">
                      {advisoryStage ? ADVISORY_STAGES.find(s => s.key === advisoryStage)?.description : "Choose your current advisory stage to access relevant workstreams and tasks."}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-3 min-w-[240px]">
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
                      <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
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

          {/* Workstreams Grid */}
          {advisoryStage && (
            <div className="grid gap-6 lg:grid-cols-3">
              <WorkstreamSection
                title="Current Priorities"
                icon={Target}
                items={currentStageTasks.filter(t => t.status === "pending").slice(0, 3)}
                emptyText="No active priorities. Add tasks to track key objectives."
                variant="critical"
              />
              <WorkstreamSection
                title="Strategic Questions"
                icon={HelpCircle}
                items={[]}
                emptyText="Document strategic questions as they arise during advisory."
                variant="question"
              />
              <WorkstreamSection
                title="Required Inputs"
                icon={FileText}
                items={currentStageTasks.filter(t => t.status === "pending").slice(3, 6)}
                emptyText="Track documents, decisions, or information needed."
              />
            </div>
          )}

          {/* Task Management */}
          {advisoryStage && (
            <section className="rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-stone-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-stone-900">
                      Active Workstream
                    </h2>
                    <p className="text-sm text-stone-500">
                      Tasks and deliverables for {ADVISORY_STAGES.find(s => s.key === advisoryStage)?.label}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleAddDefaultTasks}
                  className="inline-flex items-center gap-2 rounded-full border border-stone-300 px-4 py-2 text-sm font-medium text-stone-600 hover:border-stone-400 hover:bg-stone-50 transition"
                >
                  <Plus className="w-4 h-4" />
                  Add Default Tasks
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

          {/* Advisory Notes & Context */}
          <section className="rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="w-4 h-4 text-stone-400" />
                <h2 className="text-sm font-bold tracking-[0.15em] text-stone-400 uppercase">
                  Advisory Context
                </h2>
              </div>
              <p className="text-sm text-stone-500">
                Document strategic questions, decisions, and context for your advisory engagement.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-stone-700">
                  Strategic Notes
                </label>
                <textarea
                  className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-400 focus:bg-white transition-all resize-none"
                  rows={4}
                  value={plan.advisory_notes ?? ""}
                  onChange={(e) => updatePlanField("advisory_notes", e.target.value)}
                  placeholder="Document pathway questions, strategic concerns, legal or logistical issues, or case context for advisory review."
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-stone-700">
                  Next Advisory Action
                </label>
                <input
                  type="text"
                  className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-400 focus:bg-white transition-all"
                  value={plan.advisory_next_step ?? ""}
                  onChange={(e) => updatePlanField("advisory_next_step", e.target.value)}
                  placeholder="e.g., Schedule strategy session / Review country comparison / Prepare document package"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-stone-100 mt-6">
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
                <p className={`text-sm font-medium ${isError ? "text-rose-600" : "text-emerald-600"}`}>
                  {message}
                </p>
              ) : (
                <p className="text-sm text-stone-400">
                  {hasUnsavedChanges ? "Unsaved changes" : "All changes saved"}
                </p>
              )}
            </div>
          </section>
        </>
      )}

      {/* Planning Context Footer */}
      <section className="rounded-2xl border border-stone-200 bg-stone-50 p-6">
        <div className="flex items-center gap-2 mb-6">
          <Clock className="w-4 h-4 text-stone-400" />
          <h2 className="text-sm font-bold tracking-[0.15em] text-stone-400 uppercase">
            Planning Context
          </h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-4">
          {[
            { 
              label: "Shortlisted Countries", 
              value: shortlistedCountries.length > 0 ? shortlistedCountries.join(", ") : "No shortlist yet",
              icon: MapPin,
              action: shortlistedCountries.length === 0 ? { text: "Build shortlist", href: "/portal/countries" } : null
            },
            { 
              label: "Timeline Progress", 
              value: `${timelineCounts.completed}/${timelineCounts.total}`,
              icon: CheckCircle2,
              subtext: timelineCounts.total > 0 ? "Milestones completed" : "No timeline generated",
              action: timelineCounts.total === 0 ? { text: "Generate timeline", href: "/portal/timeline" } : null
            },
            { 
              label: "Current Stage", 
              value: executionStage.stage.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase()),
              icon: Compass,
              subtext: "Execution phase"
            },
            { 
              label: "Pathway Type", 
              value: getDisplayValue(plan.pathway_type, "Not yet specified"),
              icon: Target,
              subtext: "Treatment direction"
            },
          ].map((item, idx) => (
            <div key={idx} className="rounded-xl border border-stone-200 bg-white p-4 hover:shadow-sm transition-all">
              <div className="flex items-center gap-2 mb-3">
                <item.icon className="w-4 h-4 text-stone-400" />
                <span className="text-[10px] font-bold tracking-wide text-stone-400 uppercase">{item.label}</span>
              </div>
              <p className="text-sm font-medium text-stone-900 mb-1 truncate">
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
        </div>
      </section>
    </div>
  );
}