"use client";

import { useEffect, useState } from "react";
import { getCurrentUserPlan, upsertCurrentUserPlan } from "@/lib/plans/user-plans";
import { EMPTY_USER_PLAN_INPUT, type UserPlanInput } from "@/types/plan";

export default function MyPlanPage() {
  const [plan, setPlan] = useState<UserPlanInput>(EMPTY_USER_PLAN_INPUT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadPlan() {
      try {
        const existing = await getCurrentUserPlan();

        if (existing) {
          setPlan({
            pathway_type: existing.pathway_type,
            family_structure: existing.family_structure,
            treatment_goal: existing.treatment_goal,
            donor_needed: existing.donor_needed,
            surrogate_needed: existing.surrogate_needed,
            priorities: existing.priorities,
            constraints: existing.constraints,
            target_timeline: existing.target_timeline,
            budget_range: existing.budget_range,
            notes: existing.notes,
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadPlan();
  }, []);

  async function handleSave() {
    try {
      setSaving(true);
      setMessage(null);

      await upsertCurrentUserPlan(plan);

      setMessage("Plan saved successfully.");
    } catch (error) {
      console.error(error);
      setMessage("Failed to save plan.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="p-6">Loading your plan...</div>;
  }

  return (
    <div className="p-6 space-y-6 max-w-2xl">

      <h1 className="text-2xl font-semibold">My Fertility Plan</h1>

      {/* Pathway */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Pathway Type
        </label>
        <input
          className="border rounded p-2 w-full"
          value={plan.pathway_type ?? ""}
          onChange={(e) =>
            setPlan({ ...plan, pathway_type: e.target.value })
          }
          placeholder="IVF / Donor / Surrogacy"
        />
      </div>

      {/* Family Structure */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Family Structure
        </label>
        <input
          className="border rounded p-2 w-full"
          value={plan.family_structure ?? ""}
          onChange={(e) =>
            setPlan({ ...plan, family_structure: e.target.value })
          }
          placeholder="Single / Couple / Same-sex couple"
        />
      </div>

      {/* Treatment Goal */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Treatment Goal
        </label>
        <input
          className="border rounded p-2 w-full"
          value={plan.treatment_goal ?? ""}
          onChange={(e) =>
            setPlan({ ...plan, treatment_goal: e.target.value })
          }
          placeholder="Primary objective"
        />
      </div>

      {/* Timeline */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Target Timeline
        </label>
        <input
          className="border rounded p-2 w-full"
          value={plan.target_timeline ?? ""}
          onChange={(e) =>
            setPlan({ ...plan, target_timeline: e.target.value })
          }
          placeholder="6 months / 12 months"
        />
      </div>

      {/* Budget */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Budget Range
        </label>
        <input
          className="border rounded p-2 w-full"
          value={plan.budget_range ?? ""}
          onChange={(e) =>
            setPlan({ ...plan, budget_range: e.target.value })
          }
          placeholder="$20k–$40k"
        />
      </div>

      {/* Notes */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Notes
        </label>
        <textarea
          className="border rounded p-2 w-full"
          rows={4}
          value={plan.notes ?? ""}
          onChange={(e) =>
            setPlan({ ...plan, notes: e.target.value })
          }
        />
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="bg-black text-white px-4 py-2 rounded"
      >
        {saving ? "Saving..." : "Save Plan"}
      </button>

      {message && (
        <p className="text-sm text-gray-600">{message}</p>
      )}
    </div>
  );
}