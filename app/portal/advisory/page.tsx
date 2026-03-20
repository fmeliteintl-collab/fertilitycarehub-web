"use client";

import { useEffect, useMemo, useState } from "react";
import {
  getCurrentUserPlan,
  upsertCurrentUserPlan,
} from "@/lib/plans/user-plans";
import {
  EMPTY_USER_PLAN_INPUT,
  type TimelineItem,
  type UserPlanInput,
} from "@/types/plan";

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

function getDisplayValue(value: string | null | undefined, fallback: string) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : fallback;
}

function countTimelineItems(
  timelineItems: TimelineItem[],
  status: TimelineItem["status"]
) {
  return timelineItems.filter((item) => item.status === status).length;
}

function buildRecommendedFocus(plan: UserPlanInput) {
  const shortlistedCountries = plan.shortlisted_countries ?? [];
  const completedCount = countTimelineItems(
    plan.timeline_items,
    "Completed"
  );
  const inProgressCount = countTimelineItems(
    plan.timeline_items,
    "In Progress"
  );

  if (shortlistedCountries.length === 0) {
    return "Build and refine a shortlist before moving deeper into advisory review.";
  }

  if (inProgressCount > 0) {
    return "Use advisory time to resolve the active planning questions that are currently blocking execution.";
  }

  if (completedCount >= 3) {
    return "Your planning base is becoming structured enough for a deeper comparative advisory review.";
  }

  if (plan.surrogate_needed) {
    return "Focus advisory on legal structure, execution complexity, and cross-border coordination for a surrogacy pathway.";
  }

  if (plan.donor_needed) {
    return "Focus advisory on donor-pathway compatibility, jurisdiction fit, and treatment constraints.";
  }

  return "Use advisory to pressure-test your shortlist, execution timing, and next strategic decision.";
}

export default function PortalAdvisoryPage() {
  const [plan, setPlan] = useState<UserPlanInput>(EMPTY_USER_PLAN_INPUT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [hasLoadedInitialData, setHasLoadedInitialData] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadPlan() {
      try {
        const existing = await getCurrentUserPlan();

        if (!isMounted) {
          return;
        }

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

  const currentStatus = plan.advisory_status ?? "Not Started";
  const currentPathway = plan.advisory_pathway ?? "Undecided";
  const nextStep =
    plan.advisory_next_step?.trim() ||
    "Clarify pathway questions and determine the best advisory format.";

  const shortlistedCountries = plan.shortlisted_countries ?? [];
  const timelineItems = useMemo(
  () => plan.timeline_items ?? [],
  [plan.timeline_items]
);

  const completedCount = useMemo(
    () => countTimelineItems(timelineItems, "Completed"),
    [timelineItems]
  );

  const inProgressCount = useMemo(
    () => countTimelineItems(timelineItems, "In Progress"),
    [timelineItems]
  );

  const upcomingCount = useMemo(
    () => countTimelineItems(timelineItems, "Upcoming"),
    [timelineItems]
  );

  const recommendedFocus = useMemo(() => buildRecommendedFocus(plan), [plan]);

  const advisoryItems = useMemo(
    () => [
      {
        title: "Strategy Session",
        status: currentPathway === "Strategy Session" ? "Selected" : "Available",
        description:
          "A focused advisory session to clarify pathway direction, shortlist logic, and next-step planning priorities.",
      },
      {
        title: "Comprehensive Advisory Package",
        status:
          currentPathway === "Comprehensive Advisory Package"
            ? "Selected"
            : "Core Offer",
        description:
          "A more structured advisory pathway designed for deeper planning, comparative review, and guided decision support.",
      },
      {
        title: "Current Advisory Status",
        status: currentStatus,
        description:
          plan.advisory_notes?.trim() ||
          "This area reflects your saved advisory stage, notes, and next actions.",
      },
    ],
    [currentPathway, currentStatus, plan.advisory_notes]
  );

  if (loading) {
    return <div className="p-6">Loading advisory workspace...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-stone-500">
          Advisory
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900">
          Advisory Workspace
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-stone-600">
          Track your advisory pathway, review support formats, and move from
          planning into structured decision support using your saved portal
          context.
        </p>
      </div>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-stone-500">Current Status</p>
          <p className="mt-2 text-3xl font-semibold text-stone-900">
            {currentStatus}
          </p>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            Your saved advisory stage for this planning workspace.
          </p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-stone-500">
            Recommended Next Step
          </p>
          <p className="mt-2 text-lg font-semibold text-stone-900">
            {nextStep}
          </p>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            Use this as the immediate next advisory action for your case.
          </p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-stone-500">
            Recommended Advisory Focus
          </p>
          <p className="mt-2 text-lg font-semibold text-stone-900">
            {recommendedFocus}
          </p>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            This is generated from your current planning, shortlist, and
            timeline state.
          </p>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-4">
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-stone-500">
            Shortlisted Countries
          </p>
          <p className="mt-2 text-lg font-semibold text-stone-900">
            {shortlistedCountries.length > 0
              ? shortlistedCountries.join(", ")
              : "No shortlist yet"}
          </p>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            Pulled directly from your saved country planning.
          </p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-stone-500">
            Timeline Completed
          </p>
          <p className="mt-2 text-3xl font-semibold text-stone-900">
            {completedCount}
          </p>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            Completed timeline milestones in your workspace.
          </p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-stone-500">
            Timeline In Progress
          </p>
          <p className="mt-2 text-3xl font-semibold text-stone-900">
            {inProgressCount}
          </p>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            Active planning items still being worked through.
          </p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-stone-500">
            Timeline Upcoming
          </p>
          <p className="mt-2 text-3xl font-semibold text-stone-900">
            {upcomingCount}
          </p>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            Remaining milestones still waiting for execution.
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div>
          <h2 className="text-xl font-semibold text-stone-900">
            Advisory Settings
          </h2>
          <p className="mt-1 text-sm text-stone-600">
            Save your current advisory stage, preferred pathway, notes, and next
            action.
          </p>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-stone-700">
              Advisory Status
            </label>
            <select
              className="w-full rounded-xl border border-stone-300 px-3 py-2 text-sm text-stone-900"
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
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-stone-700">
              Preferred Advisory Pathway
            </label>
            <select
              className="w-full rounded-xl border border-stone-300 px-3 py-2 text-sm text-stone-900"
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
          </div>

          <div className="lg:col-span-2">
            <label className="mb-1 block text-sm font-medium text-stone-700">
              Advisory Notes
            </label>
            <textarea
              className="w-full rounded-xl border border-stone-300 px-3 py-2 text-sm text-stone-900"
              rows={4}
              value={plan.advisory_notes ?? ""}
              onChange={(e) =>
                updatePlanField("advisory_notes", e.target.value)
              }
              placeholder="Add pathway questions, strategic concerns, legal or logistical issues, or case context for advisory review."
            />
          </div>

          <div className="lg:col-span-2">
            <label className="mb-1 block text-sm font-medium text-stone-700">
              Next Advisory Step
            </label>
            <input
              className="w-full rounded-xl border border-stone-300 px-3 py-2 text-sm text-stone-900"
              value={plan.advisory_next_step ?? ""}
              onChange={(e) =>
                updatePlanField("advisory_next_step", e.target.value)
              }
              placeholder="Clarify pathway questions / Book strategy session / Compare shortlisted countries"
            />
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving || !hasUnsavedChanges}
            className="rounded-xl bg-stone-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving
              ? "Saving..."
              : hasUnsavedChanges
                ? "Save Advisory"
                : "Saved"}
          </button>

          {message ? (
            <p
              className={`text-sm ${
                isError ? "text-red-600" : "text-green-700"
              }`}
            >
              {message}
            </p>
          ) : (
            <p className="text-sm text-stone-500">
              {hasUnsavedChanges ? "Unsaved changes" : "All changes saved"}
            </p>
          )}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-stone-900">
            Advisory Pathways
          </h2>
          <p className="mt-1 text-sm text-stone-600">
            These cards reflect your saved advisory workspace context.
          </p>
        </div>

        <div className="space-y-4">
          {advisoryItems.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-lg font-semibold text-stone-900">
                      {item.title}
                    </h3>
                    <span className="rounded-full border border-stone-300 px-3 py-1 text-xs font-medium text-stone-700">
                      {item.status}
                    </span>
                  </div>

                  <p className="mt-3 max-w-3xl text-sm leading-6 text-stone-600">
                    {item.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-stone-900">
          Planning Context Snapshot
        </h2>
        <p className="mt-1 text-sm text-stone-600">
          This advisory layer is now informed by the rest of your portal
          workspace.
        </p>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
            <p className="text-sm font-medium text-stone-500">Pathway</p>
            <p className="mt-2 text-base font-semibold text-stone-900">
              {getDisplayValue(plan.pathway_type, "Not yet specified")}
            </p>
          </div>

          <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
            <p className="text-sm font-medium text-stone-500">Target Timeline</p>
            <p className="mt-2 text-base font-semibold text-stone-900">
              {getDisplayValue(plan.target_timeline, "Not yet defined")}
            </p>
          </div>

          <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
            <p className="text-sm font-medium text-stone-500">Budget Range</p>
            <p className="mt-2 text-base font-semibold text-stone-900">
              {getDisplayValue(plan.budget_range, "Not yet defined")}
            </p>
          </div>

          <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
            <p className="text-sm font-medium text-stone-500">
              Planning Notes
            </p>
            <p className="mt-2 text-base font-semibold text-stone-900">
              {getDisplayValue(plan.notes, "No planning notes saved yet")}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}