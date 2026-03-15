"use client";

import { useEffect, useMemo, useState } from "react";
import {
  getCurrentUserPlan,
  upsertCurrentUserPlan,
} from "@/lib/plans/user-plans";
import {
  EMPTY_USER_PLAN_INPUT,
  type TimelineItem,
  type TimelineItemStatus,
  type UserPlanInput,
} from "@/types/plan";

export const runtime = "edge";

const DEFAULT_TIMELINE_ITEMS: TimelineItem[] = [
  {
    id: "timeline-1",
    title: "Define pathway priorities",
    category: "Planning",
    status: "Completed",
    description:
      "Clarify treatment direction, country fit criteria, and the main strategic pathway for the case.",
  },
  {
    id: "timeline-2",
    title: "Reduce shortlist to top countries",
    category: "Research",
    status: "In Progress",
    description:
      "Compare leading jurisdictions by legal fit, treatment structure, timing, and travel practicality.",
  },
  {
    id: "timeline-3",
    title: "Prepare advisory intake notes",
    category: "Advisory",
    status: "Upcoming",
    description:
      "Organize the current case summary, constraints, and main decision questions before the next advisory step.",
  },
  {
    id: "timeline-4",
    title: "Review travel and documentation needs",
    category: "Logistics",
    status: "Upcoming",
    description:
      "Outline expected travel planning, documentation requirements, and timing risks for shortlisted jurisdictions.",
  },
];

const STATUS_OPTIONS: TimelineItemStatus[] = [
  "Completed",
  "In Progress",
  "Upcoming",
];

export default function PortalTimelinePage() {
  const [plan, setPlan] = useState<UserPlanInput>(EMPTY_USER_PLAN_INPUT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

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
            timeline_items:
              existing.timeline_items.length > 0
                ? existing.timeline_items
                : DEFAULT_TIMELINE_ITEMS,
            target_timeline: existing.target_timeline,
            budget_range: existing.budget_range,
            notes: existing.notes,
            advisory_status: existing.advisory_status ?? null,
advisory_pathway: existing.advisory_pathway ?? null,
advisory_notes: existing.advisory_notes ?? null,
advisory_next_step: existing.advisory_next_step ?? null,
          });
        } else {
          setPlan((current) => ({
            ...current,
            timeline_items: DEFAULT_TIMELINE_ITEMS,
          }));
        }
      } catch (error: unknown) {
        console.error(error);

        if (isMounted) {
          setIsError(true);
          setMessage("Failed to load your timeline.");
          setPlan((current) => ({
            ...current,
            timeline_items: DEFAULT_TIMELINE_ITEMS,
          }));
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    void loadPlan();

    return () => {
      isMounted = false;
    };
  }, []);

  const timelineItems = plan.timeline_items;

  const completedCount = useMemo(
    () => timelineItems.filter((item) => item.status === "Completed").length,
    [timelineItems]
  );

  const inProgressCount = useMemo(
    () => timelineItems.filter((item) => item.status === "In Progress").length,
    [timelineItems]
  );

  const upcomingCount = useMemo(
    () => timelineItems.filter((item) => item.status === "Upcoming").length,
    [timelineItems]
  );

  function updateTimelineItem(
    itemId: string,
    field: keyof TimelineItem,
    value: string
  ) {
    setMessage(null);
    setIsError(false);

    setPlan((current) => ({
      ...current,
      timeline_items: current.timeline_items.map((item) =>
        item.id === itemId ? { ...item, [field]: value } : item
      ),
    }));
  }

  function addTimelineItem() {
    setMessage(null);
    setIsError(false);

    setPlan((current) => ({
      ...current,
      timeline_items: [
        ...current.timeline_items,
        {
          id: `timeline-${Date.now()}`,
          title: "New planning step",
          category: "Planning",
          status: "Upcoming",
          description: "",
        },
      ],
    }));
  }

  function removeTimelineItem(itemId: string) {
    setMessage(null);
    setIsError(false);

    setPlan((current) => ({
      ...current,
      timeline_items: current.timeline_items.filter((item) => item.id !== itemId),
    }));
  }

  async function handleSaveTimeline() {
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

  if (loading) {
    return <div className="p-6">Loading your timeline...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-stone-500">
          Timeline
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900">
          Planning Timeline
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-stone-600">
          Organize your fertility planning process into clear stages, next
          steps, and milestone checkpoints. This is now your saved working
          execution timeline inside the portal.
        </p>
      </div>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-stone-500">Completed</p>
          <p className="mt-2 text-3xl font-semibold text-stone-900">
            {completedCount}
          </p>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            Timeline milestones you have already completed.
          </p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-stone-500">In Progress</p>
          <p className="mt-2 text-3xl font-semibold text-stone-900">
            {inProgressCount}
          </p>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            Active planning items currently being worked through.
          </p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-stone-500">Upcoming</p>
          <p className="mt-2 text-3xl font-semibold text-stone-900">
            {upcomingCount}
          </p>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            Next-phase items still waiting to be executed.
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-stone-900">
              Manage Timeline
            </h2>
            <p className="mt-1 text-sm text-stone-600">
              Update statuses, edit descriptions, add steps, and save your
              personal planning timeline.
            </p>
          </div>

          <button
            type="button"
            onClick={addTimelineItem}
            className="rounded-xl border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
          >
            Add Step
          </button>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button
            type="button"
            onClick={handleSaveTimeline}
            disabled={saving}
            className="rounded-xl bg-stone-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Timeline"}
          </button>

          {message ? (
            <p
              className={`text-sm ${
                isError ? "text-red-600" : "text-green-700"
              }`}
            >
              {message}
            </p>
          ) : null}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-stone-900">
            Current Timeline
          </h2>
          <p className="mt-1 text-sm text-stone-600">
            These steps are now stored in your private planning workspace.
          </p>
        </div>

        <div className="space-y-4">
          {timelineItems.map((item, index) => (
            <article
              key={item.id}
              className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
            >
              <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-stone-900 text-sm font-semibold text-white">
                    {index + 1}
                  </div>

                  <div className="w-full space-y-4">
                    <div className="grid gap-4 lg:grid-cols-3">
                      <div className="lg:col-span-2">
                        <label className="mb-1 block text-sm font-medium text-stone-700">
                          Step Title
                        </label>
                        <input
                          className="w-full rounded-xl border border-stone-300 px-3 py-2 text-sm text-stone-900"
                          value={item.title}
                          onChange={(e) =>
                            updateTimelineItem(item.id, "title", e.target.value)
                          }
                          placeholder="Enter timeline step title"
                        />
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-stone-700">
                          Status
                        </label>
                        <select
                          className="w-full rounded-xl border border-stone-300 px-3 py-2 text-sm text-stone-900"
                          value={item.status}
                          onChange={(e) =>
                            updateTimelineItem(
                              item.id,
                              "status",
                              e.target.value as TimelineItemStatus
                            )
                          }
                        >
                          {STATUS_OPTIONS.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid gap-4 lg:grid-cols-3">
                      <div>
                        <label className="mb-1 block text-sm font-medium text-stone-700">
                          Category
                        </label>
                        <input
                          className="w-full rounded-xl border border-stone-300 px-3 py-2 text-sm text-stone-900"
                          value={item.category}
                          onChange={(e) =>
                            updateTimelineItem(
                              item.id,
                              "category",
                              e.target.value
                            )
                          }
                          placeholder="Planning / Research / Advisory"
                        />
                      </div>

                      <div className="lg:col-span-2">
                        <label className="mb-1 block text-sm font-medium text-stone-700">
                          Description
                        </label>
                        <textarea
                          className="w-full rounded-xl border border-stone-300 px-3 py-2 text-sm text-stone-900"
                          rows={3}
                          value={item.description}
                          onChange={(e) =>
                            updateTimelineItem(
                              item.id,
                              "description",
                              e.target.value
                            )
                          }
                          placeholder="Describe the milestone, requirement, or planning action."
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => removeTimelineItem(item.id)}
                        className="rounded-xl border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
                      >
                        Remove Step
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}