"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  getCurrentUserPlan,
  upsertCurrentUserPlan,
} from "@/lib/plans/user-plans";
import { EMPTY_USER_PLAN_INPUT, type UserPlanInput } from "@/types/plan";

import type { NextAction } from "@/lib/intelligence/plan-intelligence";
export const runtime = "edge";

const AVAILABLE_COUNTRIES = [
  "Spain",
  "Greece",
  "Portugal",
  "India",
  "Mexico",
  "Turkey",
  "Czech Republic",
  "Costa Rica",
  "China",
  "UK",
  "US",
] as const;

type CountryName = (typeof AVAILABLE_COUNTRIES)[number];

type CountryContent = {
  status: string;
  summary: string;
  notes: string;
};

type RecommendationBadge = {
  label: string;
};

type RecommendedCountry = {
  name: CountryName;
  score: number;
  reasons: string[];
};

const COUNTRY_CONTENT: Record<CountryName, CountryContent> = {
  Spain: {
    status: "Strong fit",
    summary:
      "Commonly shortlisted for IVF planning due to established treatment infrastructure and international familiarity.",
    notes:
      "Evaluate legal fit, donor framework, and timeline practicality against your personal pathway.",
  },
  Greece: {
    status: "Needs review",
    summary:
      "May offer strategic advantages depending on treatment type, budget range, and timing priorities.",
    notes:
      "Compare regulatory comfort, logistics, and legal pathway alignment before prioritizing.",
  },
  Portugal: {
    status: "Watchlist",
    summary:
      "Useful to keep on the shortlist while comparing structure, availability, and overall pathway suitability.",
    notes:
      "Assess planning complexity, travel factors, and broader advisory fit before moving higher.",
  },
  India: {
    status: "Under review",
    summary:
      "May be worth considering depending on pathway type, legal structure, and broader logistics planning.",
    notes:
      "Review regulatory fit, timeline predictability, and cross-border practicality.",
  },
  Mexico: {
    status: "Under review",
    summary:
      "Can be useful to compare for accessibility, cost dynamics, and practical treatment planning.",
    notes:
      "Assess legal clarity, donor or surrogate pathway implications, and travel simplicity.",
  },
  Turkey: {
    status: "Under review",
    summary:
      "Relevant for comparison depending on your treatment priorities and broader planning criteria.",
    notes:
      "Consider legal structure, medical fit, and operational logistics before elevating priority.",
  },
  "Czech Republic": {
    status: "Under review",
    summary:
      "Often relevant in international fertility discussions and may deserve structured comparison.",
    notes:
      "Review treatment structure, donor framework, and planning practicality.",
  },
  "Costa Rica": {
    status: "Under review",
    summary:
      "Potential shortlist candidate depending on your goals, travel needs, and budget structure.",
    notes:
      "Assess pathway compatibility, legal framework, and overall coordination complexity.",
  },
  China: {
    status: "Under review",
    summary:
      "May be relevant for research comparison depending on jurisdiction goals and eligibility profile.",
    notes:
      "Review legal fit, accessibility, and advisory practicality before prioritizing.",
  },
  UK: {
    status: "Under review",
    summary:
      "Important comparison jurisdiction for structure, regulation, and broader pathway context.",
    notes:
      "Evaluate timing, eligibility, legal constraints, and cross-border feasibility.",
  },
  US: {
    status: "Under review",
    summary:
      "A major comparison market that may be relevant depending on pathway type and budget range.",
    notes:
      "Assess cost intensity, treatment structure, legal environment, and execution practicality.",
  },
};

function getErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof Error && error.message.trim().length > 0) {
    return error.message;
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof error.message === "string" &&
    error.message.trim().length > 0
  ) {
    return error.message;
  }

  return fallback;
}

function getPlanText(plan: UserPlanInput): string {
  return [
    plan.pathway_type,
    plan.family_structure,
    plan.treatment_goal,
    plan.target_timeline,
    plan.budget_range,
    plan.notes,
    ...(plan.priorities ?? []),
    ...(plan.constraints ?? []),
  ]
    .filter((value): value is string => typeof value === "string")
    .join(" ")
    .toLowerCase();
}

function getPlanningBadges(plan: UserPlanInput): RecommendationBadge[] {
  const badges: RecommendationBadge[] = [];

  if (plan.pathway_type?.trim()) {
    badges.push({ label: `Pathway: ${plan.pathway_type.trim()}` });
  }

  if (plan.family_structure?.trim()) {
    badges.push({ label: `Family: ${plan.family_structure.trim()}` });
  }

  if (plan.donor_needed) {
    badges.push({ label: "Donor review needed" });
  }

  if (plan.surrogate_needed) {
    badges.push({ label: "Surrogacy review needed" });
  }

  if (plan.target_timeline?.trim()) {
    badges.push({ label: `Timeline: ${plan.target_timeline.trim()}` });
  }

  if (plan.budget_range?.trim()) {
    badges.push({ label: `Budget: ${plan.budget_range.trim()}` });
  }

  return badges;
}

function getRecommendedCountries(plan: UserPlanInput): RecommendedCountry[] {
  const planText = getPlanText(plan);

  const results = AVAILABLE_COUNTRIES.map((country) => {
    let score = 0;
    const reasons: string[] = [];

    if (plan.shortlisted_countries.includes(country)) {
      score += 10;
      reasons.push("Already saved in your shortlist");
    }

    if (plan.donor_needed) {
      if (
        country === "Spain" ||
        country === "Greece" ||
        country === "Portugal" ||
        country === "Czech Republic"
      ) {
        score += 3;
        reasons.push("Matches donor-related planning review");
      }
    }

    if (plan.surrogate_needed) {
      if (country === "US" || country === "Mexico" || country === "Greece") {
        score += 3;
        reasons.push("Relevant to surrogate-related planning review");
      }
    }

    if (
      planText.includes("budget") ||
      planText.includes("cost") ||
      planText.includes("affordable") ||
      planText.includes("lower cost")
    ) {
      if (
        country === "India" ||
        country === "Mexico" ||
        country === "Turkey" ||
        country === "Greece" ||
        country === "Czech Republic" ||
        country === "Portugal"
      ) {
        score += 2;
        reasons.push("Worth reviewing for budget-sensitive planning");
      }
    }

    if (
      planText.includes("legal") ||
      planText.includes("clarity") ||
      planText.includes("regulation") ||
      planText.includes("certainty")
    ) {
      if (
        country === "UK" ||
        country === "US" ||
        country === "Spain" ||
        country === "Portugal"
      ) {
        score += 2;
        reasons.push("Worth reviewing for structure and planning clarity");
      }
    }

    if (
      planText.includes("timeline") ||
      planText.includes("fast") ||
      planText.includes("quick") ||
      planText.includes("soon")
    ) {
      if (
        country === "Spain" ||
        country === "Greece" ||
        country === "Mexico" ||
        country === "Portugal"
      ) {
        score += 1;
        reasons.push("May fit a shorter planning horizon");
      }
    }

    if (
      planText.includes("ivf") ||
      planText.includes("donor") ||
      planText.includes("embryo")
    ) {
      if (
        country === "Spain" ||
        country === "Greece" ||
        country === "Portugal" ||
        country === "Czech Republic"
      ) {
        score += 1;
        reasons.push("Frequently compared in IVF-oriented planning");
      }
    }

    return {
      name: country,
      score,
      reasons: Array.from(new Set(reasons)),
    };
  });

  return results
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));
}

// Countries-specific next action (contextual to shortlist management)
function getCountriesNextAction(plan: UserPlanInput): NextAction {
  const shortlistCount = plan.shortlisted_countries.length;
  const hasPlanningBasics = Boolean(
    plan.pathway_type?.trim() ||
      plan.treatment_goal?.trim() ||
      plan.notes?.trim()
  );

  if (!hasPlanningBasics) {
    return {
      title: "Strengthen planning inputs",
      body: "Add more detail in My Plan so shortlist guidance becomes sharper and more relevant.",
      href: "/portal/my-plan",
      cta: "Go to My Plan",
      priority: "medium",
    };
  }

  if (shortlistCount === 0) {
    return {
      title: "Build your first shortlist",
      body: "Select 2–3 countries that deserve deeper comparison based on fit, structure, and execution practicality.",
      href: "#manage-shortlist",
      cta: "Select Countries",
      priority: "high",
    };
  }

  if (shortlistCount === 1) {
    return {
      title: "Pressure-test your lead country",
      body: "Your shortlist is very narrow. Add one or two comparison countries to improve decision quality before committing.",
      href: "#manage-shortlist",
      cta: "Add Countries",
      priority: "medium",
    };
  }

  if (shortlistCount <= 3) {
    return {
      title: "Deepen shortlist comparison",
      body: "Your shortlist is focused. This is the right stage to compare legal fit, treatment structure, timing, and logistics more seriously.",
      href: "/portal/timeline",
      cta: "Open Timeline",
      priority: "low",
    };
  }

  return {
    title: "Narrow shortlist complexity",
    body: "Your shortlist is broad. Reduce it to 2–3 stronger candidates so planning becomes easier and more actionable.",
    href: "#manage-shortlist",
    cta: "Refine Shortlist",
    priority: "medium",
  };
}

// Countries-specific readiness scoring
function getShortlistReadiness(plan: UserPlanInput) {
  const shortlistCount = plan.shortlisted_countries.length;
  const hasPlanningBasics = Boolean(
    plan.pathway_type?.trim() ||
      plan.treatment_goal?.trim() ||
      plan.notes?.trim()
  );

  let score = 0;
  const strengths: string[] = [];
  const gaps: string[] = [];

  if (hasPlanningBasics) {
    score += 25;
    strengths.push("Planning context is saved");
  } else {
    gaps.push("Add more planning detail in My Plan");
  }

  if (shortlistCount > 0) {
    score += 25;
    strengths.push("At least one country is shortlisted");
  } else {
    gaps.push("Create your shortlist");
  }

  if (shortlistCount >= 2 && shortlistCount <= 3) {
    score += 30;
    strengths.push("Shortlist is in a strong comparison range");
  } else if (shortlistCount === 1) {
    gaps.push("Add 1–2 comparison countries");
  } else if (shortlistCount > 3) {
    gaps.push("Narrow shortlist to 2–3 countries");
  }

  if (plan.donor_needed || plan.surrogate_needed) {
    score += 20;
    strengths.push("Pathway complexity is flagged for deeper review");
  }

  let label = "Low";
  let summary =
    "Your shortlist needs more structure before it becomes a strong decision set.";

  if (score >= 70) {
    label = "High";
    summary =
      "Your shortlist is in a strong range for serious comparison and deeper decision support.";
  } else if (score >= 40) {
    label = "Moderate";
    summary =
      "Your shortlist has a useful base, but it still needs refinement before it becomes fully decision-ready.";
  }

  return {
    score,
    label,
    summary,
    strengths,
    gaps,
  };
}

function getCountrySignals(plan: UserPlanInput) {
  const signals: string[] = [];
  const shortlistCount = plan.shortlisted_countries.length;
  const hasPlanningBasics = Boolean(
    plan.pathway_type?.trim() ||
      plan.treatment_goal?.trim() ||
      plan.notes?.trim()
  );

  if (!hasPlanningBasics) {
    signals.push(
      "Your shortlist guidance is limited because planning details are still thin."
    );
  }

  if (shortlistCount === 0) {
    signals.push(
      "No countries are currently shortlisted. This page is still in exploration mode."
    );
  }

  if (shortlistCount === 1) {
    signals.push(
      "Only one country is shortlisted. Add comparison options to improve decision quality."
    );
  }

  if (shortlistCount >= 4) {
    signals.push(
      "Your shortlist is broad. Reducing it to 2–3 countries will make deeper comparison easier."
    );
  }

  if (plan.donor_needed) {
    signals.push(
      "Donor pathway is part of this case. Country comparison should account for donor-related structure and constraints."
    );
  }

  if (plan.surrogate_needed) {
    signals.push(
      "Surrogacy review is part of this case. Country selection should be pressure-tested for legal and execution complexity."
    );
  }

  if (shortlistCount >= 2 && shortlistCount <= 3) {
    signals.push(
      "Your shortlist is in a strong range for deeper legal, timing, and logistics comparison."
    );
  }

  return signals;
}

export default function PortalCountriesPage() {
  const [plan, setPlan] = useState<UserPlanInput>(EMPTY_USER_PLAN_INPUT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);

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
            target_timeline: existing.target_timeline,
            budget_range: existing.budget_range,
            notes: existing.notes,
            advisory_status: existing.advisory_status ?? null,
            advisory_pathway: existing.advisory_pathway ?? null,
            advisory_notes: existing.advisory_notes ?? null,
            advisory_next_step: existing.advisory_next_step ?? null,
          });

          setLastSavedAt(
            "updated_at" in existing && typeof existing.updated_at === "string"
              ? existing.updated_at
              : "created_at" in existing &&
                  typeof existing.created_at === "string"
                ? existing.created_at
                : null
          );
        }

        setMessage(null);
        setIsError(false);
      } catch (error: unknown) {
        console.error(error);

        if (isMounted) {
          setIsError(true);
          setMessage(getErrorMessage(error, "Failed to load your shortlist."));
        }
      } finally {
        if (isMounted) {
          setLoading(false);
          setHasUnsavedChanges(false);
        }
      }
    }

    void loadPlan();

    return () => {
      isMounted = false;
    };
  }, []);

  const shortlistedCountries = useMemo(
    () =>
      plan.shortlisted_countries.map((countryName) => ({
        name: countryName,
        status:
          COUNTRY_CONTENT[countryName as CountryName]?.status ?? "Saved",
        summary:
          COUNTRY_CONTENT[countryName as CountryName]?.summary ??
          "Saved to your personal shortlist for ongoing evaluation.",
        notes:
          COUNTRY_CONTENT[countryName as CountryName]?.notes ??
          "Continue reviewing this jurisdiction against your legal, medical, and logistical needs.",
      })),
    [plan.shortlisted_countries]
  );

  const recommendedCountries = useMemo(
    () => getRecommendedCountries(plan),
    [plan]
  );

  const recommendedCountryNames = useMemo(
    () => new Set(recommendedCountries.map((country) => country.name)),
    [recommendedCountries]
  );

  const sortedCountries = useMemo(() => {
    return [...AVAILABLE_COUNTRIES].sort((a, b) => {
      const aSelected = plan.shortlisted_countries.includes(a);
      const bSelected = plan.shortlisted_countries.includes(b);

      if (aSelected !== bSelected) {
        return aSelected ? -1 : 1;
      }

      const aRecommendation =
        recommendedCountries.find((country) => country.name === a)?.score ?? 0;
      const bRecommendation =
        recommendedCountries.find((country) => country.name === b)?.score ?? 0;

      if (aRecommendation !== bRecommendation) {
        return bRecommendation - aRecommendation;
      }

      return a.localeCompare(b);
    });
  }, [plan.shortlisted_countries, recommendedCountries]);

  const topPriority =
    shortlistedCountries.length > 0 ? shortlistedCountries[0].name : "None yet";

  const countriesNextAction = useMemo(() => getCountriesNextAction(plan), [plan]);
  const shortlistReadiness = useMemo(() => getShortlistReadiness(plan), [plan]);
  const countrySignals = useMemo(() => getCountrySignals(plan), [plan]);
  const planningBadges = useMemo(() => getPlanningBadges(plan), [plan]);
  
  const shortlistReadyForTimeline =
    plan.shortlisted_countries.length >= 2 &&
    plan.shortlisted_countries.length <= 3;

  const formattedLastSaved =
    lastSavedAt !== null ? new Date(lastSavedAt).toLocaleString() : null;

  function toggleCountry(countryName: CountryName) {
    setMessage(null);
    setIsError(false);

    setPlan((current) => {
      const alreadySelected =
        current.shortlisted_countries.includes(countryName);

      return {
        ...current,
        shortlisted_countries: alreadySelected
          ? current.shortlisted_countries.filter(
              (country) => country !== countryName
            )
          : [...current.shortlisted_countries, countryName],
      };
    });

    setHasUnsavedChanges(true);
  }

  async function handleSaveShortlist() {
    try {
      setSaving(true);
      setMessage(null);
      setIsError(false);

      await upsertCurrentUserPlan(plan);

      setMessage("Shortlist saved successfully.");
      setHasUnsavedChanges(false);
      setLastSavedAt(new Date().toISOString());
    } catch (error: unknown) {
      console.error(error);
      setIsError(true);
      setMessage(getErrorMessage(error, "Failed to save shortlist."));
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="p-6">Loading your shortlist...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-stone-500">
          Countries
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900">
          Country Shortlist
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-stone-600">
          Save, compare, and organize the jurisdictions that best align with
          your fertility planning pathway. This area is now your working
          shortlist for advisory preparation and decision support.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/compare"
            className="rounded-xl bg-stone-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-stone-800"
          >
            Compare Countries
          </Link>
          <Link
            href="/countries"
            className="rounded-xl border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
          >
            Explore Country Research
          </Link>
        </div>
      </div>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-stone-500">Saved Countries</p>
          <p className="mt-2 text-3xl font-semibold text-stone-900">
            {shortlistedCountries.length}
          </p>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            Your active shortlist reflects the jurisdictions you want to keep
            under review.
          </p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-stone-500">Top Priority</p>
          <p className="mt-2 text-3xl font-semibold text-stone-900">
            {topPriority}
          </p>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            The first country in your saved shortlist is treated as your current
            lead jurisdiction.
          </p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-stone-500">Next Action</p>
          <p className="mt-2 text-lg font-semibold text-stone-900">
            {countriesNextAction.title}
          </p>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            {countriesNextAction.body}
          </p>
          {countriesNextAction.cta && (
            <a
              href={countriesNextAction.href}
              className="mt-4 inline-block rounded-xl bg-stone-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-stone-800"
            >
              {countriesNextAction.cta}
            </a>
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div>
          <h2 className="text-xl font-semibold text-stone-900">
            Planning Context
          </h2>
          <p className="mt-1 text-sm text-stone-600">
            Your saved plan now shapes how this shortlist is organized and which
            countries are surfaced first.
          </p>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {planningBadges.length > 0 ? (
            planningBadges.map((badge) => (
              <span
                key={badge.label}
                className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-700"
              >
                {badge.label}
              </span>
            ))
          ) : (
            <p className="text-sm text-stone-600">
              Add more planning details in My Plan to improve shortlist guidance.
            </p>
          )}
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl bg-stone-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
              Current Goal
            </p>
            <p className="mt-2 text-sm leading-6 text-stone-700">
              {plan.treatment_goal?.trim() || "No treatment goal saved yet."}
            </p>
          </div>

          <div className="rounded-xl bg-stone-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
              Current Constraints
            </p>
            <p className="mt-2 text-sm leading-6 text-stone-700">
              {plan.constraints.length > 0
                ? plan.constraints.join(", ")
                : "No constraints saved yet."}
            </p>
          </div>
        </div>

        {formattedLastSaved ? (
          <p className="mt-4 text-xs text-stone-500">
            Last shortlist-related plan save: {formattedLastSaved}
          </p>
        ) : null}
      </section>

      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-stone-900">
              Shortlist Readiness
            </h2>
            <p className="mt-1 text-sm text-stone-600">
              This score reflects how decision-ready your shortlist is based on
              planning context, shortlist shape, and pathway complexity.
            </p>
          </div>

          <div className="rounded-xl bg-stone-50 px-4 py-3 text-sm font-medium text-stone-700">
            Readiness Level: {shortlistReadiness.label}
          </div>
        </div>

        <div className="mt-5">
          <p className="text-3xl font-semibold text-stone-900">
            {shortlistReadiness.score}%
          </p>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            {shortlistReadiness.summary}
          </p>
        </div>

        <div className="mt-5 h-3 w-full overflow-hidden rounded-full bg-stone-200">
          <div
            className="h-full rounded-full bg-stone-900 transition-all"
            style={{ width: `${shortlistReadiness.score}%` }}
          />
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl bg-stone-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
              Supporting Signals
            </p>
            <p className="mt-2 text-sm leading-6 text-stone-700">
              {shortlistReadiness.strengths.length > 0
                ? shortlistReadiness.strengths.join(", ")
                : "No strong shortlist signals detected yet."}
            </p>
          </div>

          <div className="rounded-xl bg-stone-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
              Gaps to Improve
            </p>
            <p className="mt-2 text-sm leading-6 text-stone-700">
              {shortlistReadiness.gaps.length > 0
                ? shortlistReadiness.gaps.join(", ")
                : "No major shortlist gaps detected."}
            </p>
          </div>
        </div>
      </section>

      {shortlistReadyForTimeline && (
        <section className="rounded-2xl border border-stone-900 bg-stone-900 p-6 text-white shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-white/70">
                Next Step
              </p>
              <h2 className="mt-2 text-xl font-semibold">
                Your shortlist is ready for execution planning
              </h2>
              <p className="mt-2 text-sm text-white/80">
                You now have a focused shortlist. Move to the timeline to start
                structuring execution, logistics, and next actions.
              </p>
            </div>

            <a
              href="/portal/timeline"
              className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-medium text-stone-900 transition hover:bg-stone-100"
            >
              Open Timeline
            </a>
          </div>
        </section>
      )}

      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div>
          <h2 className="text-xl font-semibold text-stone-900">
            Country Signals
          </h2>
          <p className="mt-1 text-sm text-stone-600">
            These observations highlight important shortlist patterns and comparison
            risks in your current planning state.
          </p>
        </div>

        <div className="mt-5 space-y-3">
          {countrySignals.length > 0 ? (
            countrySignals.map((signal) => (
              <div
                key={signal}
                className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-700"
              >
                {signal}
              </div>
            ))
          ) : (
            <p className="text-sm text-stone-500">
              No major shortlist signals detected.
            </p>
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div>
          <h2 className="text-xl font-semibold text-stone-900">
            Suggested Countries from My Plan
          </h2>
          <p className="mt-1 text-sm text-stone-600">
            These are soft recommendations inferred from your saved pathway,
            timing, budget, and planning priorities.
          </p>
        </div>

        {recommendedCountries.length === 0 ? (
          <div className="mt-5 rounded-xl border border-dashed border-stone-300 bg-stone-50 p-4 text-sm text-stone-600">
            Save more detail in My Plan to unlock stronger shortlist guidance.
          </div>
        ) : (
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            {recommendedCountries.slice(0, 4).map((country) => (
              <div
                key={country.name}
                className="rounded-xl border border-stone-200 bg-stone-50 p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold text-stone-900">
                    {country.name}
                  </h3>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-stone-700">
                    Suggested
                  </span>
                </div>

                <ul className="mt-3 space-y-2 text-sm leading-6 text-stone-700">
                  {country.reasons.map((reason) => (
                    <li key={reason}>• {reason}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </section>

      <section id="manage-shortlist" className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div>
          <h2 className="text-xl font-semibold text-stone-900">
            Manage Shortlist
          </h2>
          <p className="mt-1 text-sm text-stone-600">
            Select the countries you want to keep in your active planning
            shortlist.
          </p>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          {sortedCountries.map((country) => {
            const isSelected = plan.shortlisted_countries.includes(country);
            const isRecommended = recommendedCountryNames.has(country);

            return (
              <button
                key={country}
                type="button"
                onClick={() => toggleCountry(country)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  isSelected
                    ? "bg-stone-900 text-white"
                    : "border border-stone-300 bg-white text-stone-700 hover:bg-stone-50"
                }`}
              >
                {country}
                {isRecommended ? " • Suggested" : ""}
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
          <button
            type="button"
            onClick={handleSaveShortlist}
            disabled={saving || !hasUnsavedChanges}
            className="rounded-xl bg-stone-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving
              ? "Saving..."
              : hasUnsavedChanges
                ? "Save Shortlist"
                : "Saved"}
          </button>

          <p
            className={`text-sm ${
              hasUnsavedChanges ? "text-amber-600" : "text-stone-500"
            }`}
          >
            {hasUnsavedChanges ? "Unsaved changes" : "All changes saved"}
          </p>

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
            Current Shortlist
          </h2>
          <p className="mt-1 text-sm text-stone-600">
            These countries are currently saved to your private planning
            workspace.
          </p>
        </div>

        {shortlistedCountries.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-6 text-sm text-stone-600">
            No countries saved yet. Select one or more countries above and save
            your shortlist.
          </div>
        ) : (
          <div className="grid gap-6">
            {shortlistedCountries.map((country) => (
              <article
                key={country.name}
                className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-semibold text-stone-900">
                        {country.name}
                      </h3>
                      <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-700">
                        {country.status}
                      </span>
                    </div>

                    <p className="mt-3 max-w-3xl text-sm leading-6 text-stone-600">
                      {country.summary}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      toggleCountry(country.name as CountryName)
                    }
                    className="rounded-xl border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
                  >
                    Remove
                  </button>
                </div>

                <div className="mt-5 rounded-xl bg-stone-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
                    Planning Notes
                  </p>
                  <p className="mt-2 text-sm leading-6 text-stone-700">
                    {country.notes}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}