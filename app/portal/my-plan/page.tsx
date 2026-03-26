"use client";

import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import {
  getCurrentUserPlan,
  upsertCurrentUserPlan,
} from "@/lib/plans/user-plans";
import { EMPTY_USER_PLAN_INPUT, type UserPlanInput } from "@/types/plan";

// === PREMIUM: Option Types ===
type Option = { value: string; label: string; description?: string };

const PATHWAY_OPTIONS: Option[] = [
  { value: "IVF", label: "IVF", description: "In vitro fertilization using own or partner gametes" },
  { value: "IVF with Donor Eggs", label: "IVF with Donor Eggs", description: "IVF using donor oocytes" },
  { value: "IVF with Donor Sperm", label: "IVF with Donor Sperm", description: "IVF using donor sperm" },
  { value: "Donor Embryo", label: "Donor Embryo", description: "Embryo adoption or donation" },
  { value: "Surrogacy", label: "Surrogacy", description: "Gestational carrier with your embryos" },
  { value: "Surrogacy with Donor", label: "Surrogacy with Donor", description: "Gestational carrier with donor gametes" },
  { value: "Not sure yet", label: "Not sure yet", description: "Still exploring pathway options" },
];

const FAMILY_OPTIONS: Option[] = [
  { value: "Single woman", label: "Single woman" },
  { value: "Single man", label: "Single man" },
  { value: "Heterosexual couple", label: "Heterosexual couple" },
  { value: "Same-sex female couple", label: "Same-sex female couple" },
  { value: "Same-sex male couple", label: "Same-sex male couple" },
  { value: "Other", label: "Other" },
];

const TIMELINE_OPTIONS: Option[] = [
  { value: "Within 3 months", label: "Within 3 months", description: "Accelerated timeline" },
  { value: "3–6 months", label: "3–6 months", description: "Standard planning horizon" },
  { value: "6–12 months", label: "6–12 months", description: "Extended preparation window" },
  { value: "12+ months", label: "12+ months", description: "Long-term planning" },
  { value: "Exploratory", label: "Exploratory", description: "No fixed timeline yet" },
];

const BUDGET_OPTIONS: Option[] = [
  { value: "Under $20k", label: "Under $20k", description: "Budget-conscious planning" },
  { value: "$20k–$40k", label: "$20k–$40k", description: "Moderate investment range" },
  { value: "$40k–$60k", label: "$40k–$60k", description: "Comprehensive budget" },
  { value: "$60k–$100k", label: "$60k–$100k", description: "Premium pathway budget" },
  { value: "$100k+", label: "$100k+", description: "Unlimited budget for optimal outcomes" },
  { value: "Flexible", label: "Flexible", description: "Budget secondary to outcome" },
];

const PRIORITY_OPTIONS = [
  "Success rates",
  "Cost efficiency",
  "Legal clarity",
  "Timeline speed",
  "Donor availability",
  "Clinic reputation",
  "Travel convenience",
  "Language accessibility",
  "Cultural fit",
];

const CONSTRAINT_OPTIONS = [
  "Budget limitations",
  "Travel restrictions",
  "Time constraints",
  "Documentation gaps",
  "Medical complications",
  "Legal restrictions",
  "Age factors",
  "Previous failed cycles",
];

// === PREMIUM: Components ===

function SectionCard({
  title,
  description,
  children,
  isActive,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  isActive?: boolean;
}) {
  return (
    <div className={`rounded-2xl border bg-white p-6 shadow-sm transition-all ${
      isActive ? "border-[#3a3a3a] ring-1 ring-[#3a3a3a]" : "border-stone-200"
    }`}>
      <h3 className="text-lg font-semibold text-stone-900">{title}</h3>
      {description && (
        <p className="mt-1 text-sm text-stone-600">{description}</p>
      )}
      <div className="mt-4">{children}</div>
    </div>
  );
}

function PillSelector({
  options,
  value,
  onChange,
  allowClear,
}: {
  options: Option[];
  value: string | null;
  onChange: (value: string) => void;
  allowClear?: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
            value === option.value
              ? "bg-[#3a3a3a] text-white"
              : "border border-stone-300 bg-white text-stone-700 hover:border-stone-400"
          }`}
        >
          {option.label}
        </button>
      ))}
      {allowClear && value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="rounded-full px-4 py-2 text-sm font-medium text-stone-400 hover:text-stone-600 transition"
        >
          Clear
        </button>
      )}
    </div>
  );
}

function TogglePill({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`flex flex-col items-start gap-1 rounded-xl border p-4 text-left transition-all w-full ${
        checked
          ? "border-[#3a3a3a] bg-stone-50"
          : "border-stone-200 bg-white hover:border-stone-300"
      }`}
    >
      <div className="flex items-center gap-3 w-full">
        <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition ${
          checked ? "border-[#3a3a3a] bg-[#3a3a3a]" : "border-stone-300"
        }`}>
          {checked && <span className="text-white text-xs">✓</span>}
        </div>
        <span className={`font-medium ${checked ? "text-stone-900" : "text-stone-700"}`}>
          {label}
        </span>
      </div>
      {description && (
        <p className={`text-sm pl-8 ${checked ? "text-stone-600" : "text-stone-500"}`}>
          {description}
        </p>
      )}
    </button>
  );
}

function TagInput({
  tags,
  availableTags,
  onAdd,
  onRemove,
  placeholder,
}: {
  tags: string[];
  availableTags: string[];
  onAdd: (tag: string) => void;
  onRemove: (tag: string) => void;
  placeholder?: string;
}) {
  const [input, setInput] = useState("");
  const filtered = availableTags.filter(
    (t) => t.toLowerCase().includes(input.toLowerCase()) && !tags.includes(t)
  );

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 rounded-full bg-[#3a3a3a] px-3 py-1 text-sm text-white"
          >
            {tag}
            <button
              type="button"
              onClick={() => onRemove(tag)}
              className="ml-1 text-white/70 hover:text-white"
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <div className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:border-[#3a3a3a] focus:outline-none"
        />
        {input && filtered.length > 0 && (
          <div className="absolute z-10 mt-1 w-full rounded-lg border border-stone-200 bg-white shadow-lg">
            {filtered.slice(0, 5).map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  onAdd(tag);
                  setInput("");
                }}
                className="block w-full px-3 py-2 text-left text-sm hover:bg-stone-50"
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {availableTags
          .filter((t) => !tags.includes(t))
          .slice(0, 6)
          .map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => onAdd(tag)}
              className="rounded-full border border-stone-200 px-3 py-1 text-xs text-stone-600 hover:border-stone-400 hover:text-stone-900 transition"
            >
              + {tag}
            </button>
          ))}
      </div>
    </div>
  );
}

// === PREMIUM: Live Planning Summary ===
function PlanningSummary({ plan }: { plan: UserPlanInput }) {
  const indicators = useMemo(() => {
    const items: { label: string; value: string; status: "complete" | "partial" | "empty" }[] = [];

    items.push({
      label: "Pathway",
      value: plan.pathway_type || "Not selected",
      status: plan.pathway_type ? "complete" : "empty",
    });

    items.push({
      label: "Family",
      value: plan.family_structure || "Not defined",
      status: plan.family_structure ? "complete" : "empty",
    });

    items.push({
      label: "Timeline",
      value: plan.target_timeline || "Not set",
      status: plan.target_timeline ? "complete" : "empty",
    });

    items.push({
      label: "Budget",
      value: plan.budget_range || "Not defined",
      status: plan.budget_range ? "complete" : "empty",
    });

    const hasDonor = plan.donor_needed;
    const hasSurrogate = plan.surrogate_needed;
    items.push({
      label: "Specialized",
      value: hasDonor && hasSurrogate 
        ? "Donor + Surrogate" 
        : hasDonor 
          ? "Donor required" 
          : hasSurrogate 
            ? "Surrogate required" 
            : "Standard pathway",
      status: hasDonor || hasSurrogate ? "partial" : "complete",
    });

    return items;
  }, [plan]);

  const completionScore = indicators.filter(i => i.status === "complete").length;
  const totalScore = indicators.length;
  const percentage = Math.round((completionScore / totalScore) * 100);

  return (
    <div className="rounded-2xl border-2 border-[#3a3a3a] bg-[#3a3a3a] p-6 text-white shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-stone-400">
            Planning Brief
          </p>
          <h2 className="mt-1 text-2xl font-bold">
            {percentage === 100 ? "Complete Profile" : percentage >= 60 ? "Developing Profile" : "Foundation Building"}
          </h2>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold">{percentage}%</p>
          <p className="text-xs text-stone-400">Complete</p>
        </div>
      </div>

      <div className="h-2 w-full rounded-full bg-stone-700 mb-4">
        <div 
          className="h-full rounded-full bg-white transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {indicators.map((item) => (
          <div 
            key={item.label}
            className={`rounded-lg px-3 py-2 ${
              item.status === "complete" 
                ? "bg-[#6a7a6a]/30" 
                : item.status === "partial"
                  ? "bg-[#d4c4a8]/20"
                  : "bg-stone-800/50"
            }`}
          >
            <p className="text-xs text-stone-400 uppercase tracking-wider">{item.label}</p>
            <p className={`text-sm font-medium truncate ${
              item.status === "empty" ? "text-stone-500" : "text-white"
            }`}>
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// === PREMIUM: Autosave Hook ===
function useAutosave(
  plan: UserPlanInput,
  hasLoaded: boolean,
  onSave: () => Promise<void>
) {
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const prevPlanRef = useRef<string | null>(null);

  useEffect(() => {
    if (!hasLoaded) return;

    // Check if plan actually changed
    const planStr = JSON.stringify(plan);

    if (planStr === prevPlanRef.current) return;

    prevPlanRef.current = planStr;

    const timer = setTimeout(async () => {
      setSaveStatus("saving");
      try {
        await onSave();
        setSaveStatus("saved");
        setLastSaved(new Date());
        setTimeout(() => setSaveStatus("idle"), 2000);
      } catch {
        setSaveStatus("error");
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [plan, hasLoaded, onSave]);

  return { saveStatus, lastSaved };
}

export default function MyPlanPage() {
  const [plan, setPlan] = useState<UserPlanInput>(EMPTY_USER_PLAN_INPUT);
  const [loading, setLoading] = useState(true);
  const [hasLoadedInitialData, setHasLoadedInitialData] = useState(false);
  // Active section tracking for future enhancement

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
            target_timeline: existing.target_timeline,
            budget_range: existing.budget_range,
            notes: existing.notes,
            advisory_status: existing.advisory_status ?? null,
            advisory_pathway: existing.advisory_pathway ?? null,
            advisory_notes: existing.advisory_notes ?? null,
            advisory_next_step: existing.advisory_next_step ?? null,
            advisory_stage: existing.advisory_stage,
            primary_country: existing.primary_country ?? null,
          });
        }
      } catch (error: unknown) {
        console.error(error);
      } finally {
        if (isMounted) {
          setLoading(false);
          setHasLoadedInitialData(true);
        }
      }
    }

    void loadPlan();
    return () => { isMounted = false; };
  }, []);

  const handleSave = useCallback(async () => {
    try {
      await upsertCurrentUserPlan(plan);
    } catch (error: unknown) {
      console.error(error);
      throw error;
    }
  }, [plan]);

  const { saveStatus, lastSaved } = useAutosave(plan, hasLoadedInitialData, handleSave);

  function updatePlanField<K extends keyof UserPlanInput>(
    field: K,
    value: UserPlanInput[K]
  ) {
    setPlan((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function addTag(field: "priorities" | "constraints", tag: string) {
    const current = plan[field];
    if (!current.includes(tag)) {
      updatePlanField(field, [...current, tag]);
    }
  }

  function removeTag(field: "priorities" | "constraints", tag: string) {
    updatePlanField(
      field,
      plan[field].filter((t) => t !== tag)
    );
  }

  if (loading) {
    return (
      <div className="max-w-4xl space-y-6 p-6">
        <div className="h-32 animate-pulse rounded-2xl bg-stone-100" />
        <div className="h-64 animate-pulse rounded-2xl bg-stone-100" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6 p-6">
      {/* === PREMIUM: Executive Header === */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-stone-500">
            My Plan
          </p>
          <h1 className="mt-2 text-3xl font-bold text-stone-900">
            Planning Brief
          </h1>
          <p className="mt-2 text-sm text-stone-600 max-w-xl">
            Define your fertility pathway, family context, and execution parameters. 
            This brief guides all downstream recommendations.
          </p>
        </div>

        {/* Subtle Autosave Indicator */}
        <div className="text-right">
          {saveStatus === "saving" && (
            <span className="text-xs text-stone-400">Saving...</span>
          )}
          {saveStatus === "saved" && (
            <span className="text-xs text-[#6a7a6a]">Saved</span>
          )}
          {saveStatus === "error" && (
            <span className="text-xs text-[#c4a7a7]">Save failed</span>
          )}
          {saveStatus === "idle" && lastSaved && (
            <span className="text-xs text-stone-400">
              Saved {lastSaved.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          )}
        </div>
      </div>

      {/* === PREMIUM: Live Planning Summary === */}
      <PlanningSummary plan={plan} />

      {/* === PREMIUM: Planning Profile Sections === */}
      <div className="space-y-6">

        {/* Pathway Direction */}
        <SectionCard
          title="Pathway Direction"
          description="Select your fertility treatment approach"
          isActive={false}
        >
          <div className="space-y-4">
            <PillSelector
              options={PATHWAY_OPTIONS}
              value={plan.pathway_type}
              onChange={(value) => updatePlanField("pathway_type", value)}
              allowClear
            />

            {(plan.pathway_type?.includes("Donor") || plan.pathway_type?.includes("Surrogacy")) && (
              <div className="rounded-lg bg-[#faf8f3] border border-[#d4c4a8] p-3">
                <p className="text-sm text-[#6a5a4a]">
                  <span className="font-medium">Note:</span> Your selected pathway involves third-party reproduction. 
                  Country selection and legal frameworks become especially critical.
                </p>
              </div>
            )}
          </div>
        </SectionCard>

        {/* Family Context */}
        <SectionCard
          title="Family Context"
          description="Define your family structure for pathway compatibility"
          isActive={false}
        >
          <PillSelector
            options={FAMILY_OPTIONS}
            value={plan.family_structure}
            onChange={(value) => updatePlanField("family_structure", value)}
            allowClear
          />
        </SectionCard>

        {/* Treatment Requirements */}
        <SectionCard
          title="Treatment Requirements"
          description="Indicate if your pathway requires donor or surrogate components"
          isActive={false}
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <TogglePill
              label="Donor Required"
              description="Eggs, sperm, or embryos from donor"
              checked={plan.donor_needed}
              onChange={(checked) => updatePlanField("donor_needed", checked)}
            />
            <TogglePill
              label="Surrogate Required"
              description="Gestational carrier"
              checked={plan.surrogate_needed}
              onChange={(checked) => updatePlanField("surrogate_needed", checked)}
            />
          </div>
        </SectionCard>

        {/* Execution Parameters */}
        <SectionCard
          title="Execution Parameters"
          description="Set your timeline and budget expectations"
          isActive={false}
        >
          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-stone-700">
                Target Timeline
              </label>
              <PillSelector
                options={TIMELINE_OPTIONS}
                value={plan.target_timeline}
                onChange={(value) => updatePlanField("target_timeline", value)}
                allowClear
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-stone-700">
                Budget Range
              </label>
              <PillSelector
                options={BUDGET_OPTIONS}
                value={plan.budget_range}
                onChange={(value) => updatePlanField("budget_range", value)}
                allowClear
              />
            </div>
          </div>
        </SectionCard>

        {/* Strategic Priorities */}
        <SectionCard
          title="Strategic Priorities"
          description="What matters most in your planning decisions"
          isActive={false}
        >
          <TagInput
            tags={plan.priorities}
            availableTags={PRIORITY_OPTIONS}
            onAdd={(tag) => addTag("priorities", tag)}
            onRemove={(tag) => removeTag("priorities", tag)}
            placeholder="Type to search or select below..."
          />
        </SectionCard>

        {/* Constraints & Considerations */}
        <SectionCard
          title="Constraints & Considerations"
          description="Factors that limit or complicate your options"
          isActive={false}
        >
          <TagInput
            tags={plan.constraints}
            availableTags={CONSTRAINT_OPTIONS}
            onAdd={(tag) => addTag("constraints", tag)}
            onRemove={(tag) => removeTag("constraints", tag)}
            placeholder="Type to search or select below..."
          />
        </SectionCard>

        {/* Treatment Goal */}
        <SectionCard
          title="Treatment Goal"
          description="Your primary objective and success criteria"
          isActive={false}
        >
          <textarea
            className="w-full rounded-lg border border-stone-300 p-3 text-sm focus:border-[#3a3a3a] focus:outline-none min-h-[80px]"
            value={plan.treatment_goal ?? ""}
            onChange={(e) => updatePlanField("treatment_goal", e.target.value)}
            placeholder="e.g., Single live birth, genetic connection to both partners..."
          />
        </SectionCard>

        {/* Planning Notes */}
        <SectionCard
          title="Planning Notes"
          description="Additional context, questions, or considerations"
          isActive={false}
        >
          <textarea
            className="w-full rounded-lg border border-stone-300 p-3 text-sm focus:border-[#3a3a3a] focus:outline-none min-h-[120px]"
            value={plan.notes ?? ""}
            onChange={(e) => updatePlanField("notes", e.target.value)}
            placeholder="Clinic questions, country considerations, timing constraints, or any other relevant details..."
          />
        </SectionCard>
      </div>

      {/* === PREMIUM: Manual Save (Backup) === */}
      <div className="flex items-center justify-between rounded-xl border border-stone-200 bg-stone-50 p-4">
        <p className="text-sm text-stone-600">
          Changes are saved automatically. You can also save manually if needed.
        </p>
        <button
          type="button"
          onClick={handleSave}
          disabled={saveStatus === "saving"}
          className="rounded-lg bg-[#3a3a3a] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#2a2a2a] disabled:opacity-60"
        >
          {saveStatus === "saving" ? "Saving..." : "Save Now"}
        </button>
      </div>
    </div>
  );
}