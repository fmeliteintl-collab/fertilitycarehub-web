"use client";

import { useEffect, useState } from "react";
import {
  getCurrentUserPlan,
  upsertCurrentUserPlan,
} from "@/lib/plans/user-plans";
import { EMPTY_USER_PLAN_INPUT, type UserPlanInput } from "@/types/plan";

export default function MyPlanPage() {
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
            target_timeline: existing.target_timeline,
            budget_range: existing.budget_range,
            notes: existing.notes,
          });
        }
      } catch (error: unknown) {
        console.error(error);

        if (isMounted) {
          setIsError(true);
          setMessage("Failed to load your plan.");
        }
      } finally {
        if (isMounted) setLoading(false);
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
  }

  async function handleSave() {
    try {
      setSaving(true);
      setMessage(null);
      setIsError(false);

      await upsertCurrentUserPlan(plan);

      setMessage("Plan saved successfully.");
    } catch (error: unknown) {
      console.error(error);
      setIsError(true);
      setMessage("Failed to save plan.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="p-6">Loading your plan...</div>;
  }

  return (
    <div className="max-w-3xl space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold">My Fertility Plan</h1>
        <p className="mt-2 text-sm text-gray-600">
          Save your pathway details, priorities, timeline, and notes so your
          plan is available when you return.
        </p>
      </div>

      <div className="space-y-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        {/* Pathway Type */}
        <div>
          <label className="mb-1 block text-sm font-medium">Pathway Type</label>
          <input
            className="w-full rounded-lg border border-gray-300 p-2"
            value={plan.pathway_type ?? ""}
            onChange={(e) => updatePlanField("pathway_type", e.target.value)}
            placeholder="IVF / Donor / Surrogacy"
          />
        </div>

        {/* Family Structure */}
        <div>
          <label className="mb-1 block text-sm font-medium">
            Family Structure
          </label>
          <input
            className="w-full rounded-lg border border-gray-300 p-2"
            value={plan.family_structure ?? ""}
            onChange={(e) =>
              updatePlanField("family_structure", e.target.value)
            }
            placeholder="Single / Couple / Same-sex couple"
          />
        </div>

        {/* Treatment Goal */}
        <div>
          <label className="mb-1 block text-sm font-medium">
            Treatment Goal
          </label>
          <input
            className="w-full rounded-lg border border-gray-300 p-2"
            value={plan.treatment_goal ?? ""}
            onChange={(e) => updatePlanField("treatment_goal", e.target.value)}
            placeholder="Primary objective"
          />
        </div>

        {/* Donor Needed */}
        <div>
          <label className="mb-1 block text-sm font-medium">
            Donor Needed
          </label>
          <select
            className="w-full rounded-lg border border-gray-300 p-2"
            value={plan.donor_needed ? "yes" : "no"}
            onChange={(e) =>
              updatePlanField("donor_needed", e.target.value === "yes")
            }
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>

        {/* Surrogate Needed */}
        <div>
          <label className="mb-1 block text-sm font-medium">
            Surrogate Needed
          </label>
          <select
            className="w-full rounded-lg border border-gray-300 p-2"
            value={plan.surrogate_needed ? "yes" : "no"}
            onChange={(e) =>
              updatePlanField("surrogate_needed", e.target.value === "yes")
            }
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>

        {/* Priorities */}
        <div>
          <label className="mb-1 block text-sm font-medium">Priorities</label>
          <textarea
            className="w-full rounded-lg border border-gray-300 p-2"
            rows={3}
            value={(plan.priorities ?? []).join(", ")}
            onChange={(e) =>
              updatePlanField(
                "priorities",
                e.target.value.split(",").map((p) => p.trim())
              )
            }
            placeholder="cost, success rates, legal clarity, donor access"
          />
        </div>

        {/* Constraints */}
        <div>
          <label className="mb-1 block text-sm font-medium">Constraints</label>
          <textarea
            className="w-full rounded-lg border border-gray-300 p-2"
            rows={3}
            value={(plan.constraints ?? []).join(", ")}
            onChange={(e) =>
              updatePlanField(
                "constraints",
                e.target.value.split(",").map((p) => p.trim())
              )
            }
            placeholder="budget, travel limitations, documentation"
          />
        </div>

        {/* Timeline */}
        <div>
          <label className="mb-1 block text-sm font-medium">
            Target Timeline
          </label>
          <input
            className="w-full rounded-lg border border-gray-300 p-2"
            value={plan.target_timeline ?? ""}
            onChange={(e) => updatePlanField("target_timeline", e.target.value)}
            placeholder="6 months / 12 months"
          />
        </div>

        {/* Budget */}
        <div>
          <label className="mb-1 block text-sm font-medium">
            Budget Range
          </label>
          <input
            className="w-full rounded-lg border border-gray-300 p-2"
            value={plan.budget_range ?? ""}
            onChange={(e) => updatePlanField("budget_range", e.target.value)}
            placeholder="$20k–$40k"
          />
        </div>

        {/* Notes */}
        <div>
          <label className="mb-1 block text-sm font-medium">Notes</label>
          <textarea
            className="w-full rounded-lg border border-gray-300 p-2"
            rows={5}
            value={plan.notes ?? ""}
            onChange={(e) => updatePlanField("notes", e.target.value)}
            placeholder="Planning notes, clinic questions, country ideas..."
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="rounded-lg bg-black px-4 py-2 text-white disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Plan"}
          </button>

          {message && (
            <p
              className={`text-sm ${
                isError ? "text-red-600" : "text-green-700"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}