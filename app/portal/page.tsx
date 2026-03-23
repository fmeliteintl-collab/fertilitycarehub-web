"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  getCurrentUserPlan,
  upsertCurrentUserPlan,
} from "@/lib/plans/user-plans";
import {
  EMPTY_USER_PLAN_INPUT,
  type UserPlanInput,
} from "@/types/plan";
import {
  calculateAdvisoryReadiness,
  determineExecutionStage,
  buildSmartNextStep,
  buildRecommendedFocus,
  generateAdvisorySignals,
  getGlobalNextAction,
  getTimelineCounts,
  getDisplayValue,
  type AdvisorySignal,
} from "@/lib/intelligence/plan-intelligence";
import { DashboardSkeleton } from "@/app/components/skeletons";

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

  const globalNextAction = useMemo(
    () => getGlobalNextAction(plan, 0),
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
          executionStage.stage === "sequencing" &&
          currentPathway === "Undecided",
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
          executionStage.stage === "advisory-active" &&
          currentPathway === "Undecided",
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

  if (loading) {
    return <DashboardSkeleton />;
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
          planning into structured decision support.
        </p>
      </div>

      {globalNextAction.href !== "/portal/advisory" && (
        <section className="rounded-2xl border border-stone-200 bg-stone-50 p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-medium text-stone-500">
                Current Global Priority
              </p>
              <p className="mt-1 text-lg font-semibold text-stone-900">
                {globalNextAction.title}
              </p>
              <p className="mt-1 text-sm text-stone-600">
                {globalNextAction.body}
              </p>
            </div>
            <Link
              href={globalNextAction.href}
              className="inline-flex shrink-0 rounded-xl bg-stone-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-stone-800"
            >
              {globalNextAction.cta}
            </Link>
          </div>
        </section>
      )}

      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-stone-900">
              Advisory Readiness
            </h2>
            <p className="mt-1 text-sm text-stone-600">
              Measures planning maturity for meaningful advisory engagement
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-3xl font-semibold text-stone-900">
                {advisoryReadiness.percentage}%
              </p>
              <p className="text-sm capitalize text-stone-500">
                {advisoryReadiness.stage} stage
              </p>
            </div>
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-stone-100">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full text-xs font-medium ${
                  advisoryReadiness.stage === "optimal"
                    ? "bg-green-100 text-green-800"
                    : advisoryReadiness.stage === "ready"
                    ? "bg-blue-100 text-blue-800"
                    : advisoryReadiness.stage === "developing"
                    ? "bg-amber-100 text-amber-800"
                    : "bg-stone-100 text-stone-600"
                }`}
              >
                {advisoryReadiness.score}/{advisoryReadiness.maxScore}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 h-2 w-full rounded-full bg-stone-100">
          <div
            className={`h-2 rounded-full transition-all ${
              advisoryReadiness.stage === "optimal"
                ? "bg-green-500"
                : advisoryReadiness.stage === "ready"
                ? "bg-blue-500"
                : advisoryReadiness.stage === "developing"
                ? "bg-amber-500"
                : "bg-stone-400"
            }`}
            style={{ width: `${advisoryReadiness.percentage}%` }}
          />
        </div>
      </section>

      {advisorySignals.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-900">
            Advisory Signals
          </h2>

          {blockingSignals.length > 0 && (
            <div className="space-y-2">
              {blockingSignals.map((signal, idx) => (
                <div
                  key={`blocking-${idx}`}
                  className="rounded-xl border border-red-200 bg-red-50 p-4"
                >
                  <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <p className="font-medium text-red-900">
                        {signal.message}
                      </p>
                      {signal.action && (
                        <p className="mt-1 text-sm text-red-700">
                          {signal.action}
                        </p>
                      )}
                    </div>
                    {signal.link && (
                      <Link
                        href={signal.link}
                        className="text-sm font-medium text-red-800 underline hover:text-red-900"
                      >
                        Go to module →
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {attentionSignals.length > 0 && (
            <div className="space-y-2">
              {attentionSignals.map((signal, idx) => (
                <div
                  key={`attention-${idx}`}
                  className="rounded-xl border border-amber-200 bg-amber-50 p-4"
                >
                  <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <p className="font-medium text-amber-900">
                        {signal.message}
                      </p>
                      {signal.action && (
                        <p className="mt-1 text-sm text-amber-700">
                          {signal.action}
                        </p>
                      )}
                    </div>
                    {signal.link && (
                      <Link
                        href={signal.link}
                        className="text-sm font-medium text-amber-800 underline hover:text-amber-900"
                      >
                        Go to module →
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {readySignals.length > 0 && (
            <div className="space-y-2">
              {readySignals.map((signal, idx) => (
                <div
                  key={`ready-${idx}`}
                  className="rounded-xl border border-green-200 bg-green-50 p-4"
                >
                  <p className="font-medium text-green-900">
                    {signal.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-stone-100 text-xl">
            {executionStage.stage === "foundation" && "🏗️"}
            {executionStage.stage === "shortlist" && "🌍"}
            {executionStage.stage === "sequencing" && "⚡"}
            {executionStage.stage === "advisory-active" && "🎯"}
            {executionStage.stage === "completion" && "✅"}
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-stone-900">
              Execution Stage:{" "}
              <span className="capitalize">
                {executionStage.stage.replace("-", " ")}
              </span>
            </h2>
            <p className="mt-1 text-sm text-stone-600">
              {executionStage.description}
            </p>

            <div className="mt-4">
              <p className="text-sm font-medium text-stone-700">
                Recommended Actions:
              </p>
              <ul className="mt-2 space-y-1">
                {executionStage.nextActions.map((action, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-sm text-stone-600"
                  >
                    <span className="text-stone-400">•</span>
                    {action}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-medium text-stone-500">
              Smart Next Step
            </p>
            <p className="mt-1 text-lg font-semibold text-stone-900">
              {smartNextStep.step}
            </p>
            <p className="mt-1 text-sm text-stone-600">
              {smartNextStep.context}
            </p>
          </div>
          <span
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
              smartNextStep.priority === "high"
                ? "bg-red-100 text-red-800"
                : smartNextStep.priority === "medium"
                ? "bg-amber-100 text-amber-800"
                : "bg-stone-100 text-stone-600"
            }`}
          >
            {smartNextStep.priority} priority
          </span>
        </div>
      </section>

      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium text-stone-500">
          Recommended Advisory Focus
        </p>
        <p className="mt-2 text-lg font-semibold text-stone-900">
          {recommendedFocus}
        </p>
        <p className="mt-2 text-sm text-stone-600">
          Generated from your current planning, shortlist, and timeline state.
        </p>
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
            {shortlistedCountries.length === 0 ? (
              <Link href="/portal/countries" className="text-stone-900 underline">
                Build shortlist →
              </Link>
            ) : (
              "Pulled from your saved country planning."
            )}
          </p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-stone-500">
            Timeline Completed
          </p>
          <p className="mt-2 text-3xl font-semibold text-stone-900">
            {timelineCounts.completed}
          </p>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            {timelineCounts.completed === 0 && timelineCounts.total === 0 ? (
              <Link href="/portal/timeline" className="text-stone-900 underline">
                Generate timeline →
              </Link>
            ) : (
              "Completed milestones."
            )}
          </p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-stone-500">
            Timeline In Progress
          </p>
          <p className="mt-2 text-3xl font-semibold text-stone-900">
            {timelineCounts.inProgress}
          </p>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            Active planning items.
          </p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-stone-500">
            Timeline Upcoming
          </p>
          <p className="mt-2 text-3xl font-semibold text-stone-900">
            {timelineCounts.upcoming}
          </p>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            Remaining milestones.
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
              onChange={(e) => updatePlanField("advisory_notes", e.target.value)}
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
            {saving ? "Saving..." : hasUnsavedChanges ? "Save Advisory" : "Saved"}
          </button>

          {message ? (
            <p className={`text-sm ${isError ? "text-red-600" : "text-green-700"}`}>
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
              className={`rounded-2xl border p-6 shadow-sm ${
                item.recommended
                  ? "border-stone-900 bg-stone-50"
                  : "border-stone-200 bg-white"
              }`}
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
                    {item.recommended && (
                      <span className="rounded-full bg-stone-900 px-3 py-1 text-xs font-medium text-white">
                        Recommended
                      </span>
                    )}
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
          This advisory layer is now informed by the rest of your portal workspace.
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
            <p className="text-sm font-medium text-stone-500">Planning Notes</p>
            <p className="mt-2 text-base font-semibold text-stone-900">
              {getDisplayValue(plan.notes, "No planning notes saved yet")}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}