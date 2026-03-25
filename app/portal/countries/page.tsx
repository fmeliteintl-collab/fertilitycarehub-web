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

// === NEW: Decision Engine Types ===
type FitLevel = "high" | "moderate" | "low";
type CountryRole = "lead" | "comparator" | "watchlist";

interface CountryDecisionProfile {
  name: CountryName;
  fit: FitLevel;
  role: CountryRole;
  whyFit: string[];
  watchouts: string[];
  action: string;
  score: number;
}

interface DecisionEngineOutput {
  primary: CountryDecisionProfile | null;
  comparator: CountryDecisionProfile | null;
  allProfiles: CountryDecisionProfile[];
  guidance: string;
}

// === Enhanced Country Content ===
const COUNTRY_CONTENT: Record<CountryName, {
  status: string;
  summary: string;
  notes: string;
  baseScore: number;
}> = {
  Spain: {
    status: "Strong fit",
    summary:
      "Commonly shortlisted for IVF planning due to established treatment infrastructure and international familiarity.",
    notes:
      "Evaluate legal fit, donor framework, and timeline practicality against your personal pathway.",
    baseScore: 85,
  },
  Greece: {
    status: "Needs review",
    summary:
      "May offer strategic advantages depending on treatment type, budget range, and timing priorities.",
    notes:
      "Compare regulatory comfort, logistics, and legal pathway alignment before prioritizing.",
    baseScore: 70,
  },
  Portugal: {
    status: "Watchlist",
    summary:
      "Useful to keep on the shortlist while comparing structure, availability, and overall pathway suitability.",
    notes:
      "Assess planning complexity, travel factors, and broader advisory fit before moving higher.",
    baseScore: 65,
  },
  India: {
    status: "Under review",
    summary:
      "May be worth considering depending on pathway type, legal structure, and broader logistics planning.",
    notes:
      "Review regulatory fit, timeline predictability, and cross-border practicality.",
    baseScore: 60,
  },
  Mexico: {
    status: "Under review",
    summary:
      "Can be useful to compare for accessibility, cost dynamics, and practical treatment planning.",
    notes:
      "Assess legal clarity, donor or surrogate pathway implications, and travel simplicity.",
    baseScore: 55,
  },
  Turkey: {
    status: "Under review",
    summary:
      "Relevant for comparison depending on your treatment priorities and broader planning criteria.",
    notes:
      "Consider legal structure, medical fit, and operational logistics before elevating priority.",
    baseScore: 50,
  },
  "Czech Republic": {
    status: "Under review",
    summary:
      "Often relevant in international fertility discussions and may deserve structured comparison.",
    notes:
      "Review treatment structure, donor framework, and planning practicality.",
    baseScore: 60,
  },
  "Costa Rica": {
    status: "Under review",
    summary:
      "Potential shortlist candidate depending on your goals, travel needs, and budget structure.",
    notes:
      "Assess pathway compatibility, legal framework, and overall coordination complexity.",
    baseScore: 45,
  },
  China: {
    status: "Under review",
    summary:
      "May be relevant for research comparison depending on jurisdiction goals and eligibility profile.",
    notes:
      "Review legal fit, accessibility, and advisory practicality before prioritizing.",
    baseScore: 40,
  },
  UK: {
    status: "Under review",
    summary:
      "Important comparison jurisdiction for structure, regulation, and broader pathway context.",
    notes:
      "Evaluate timing, eligibility, legal constraints, and cross-border feasibility.",
    baseScore: 75,
  },
  US: {
    status: "Under review",
    summary:
      "A major comparison market that may be relevant depending on pathway type and budget range.",
    notes:
      "Assess cost intensity, treatment structure, legal environment, and execution practicality.",
    baseScore: 70,
  },
};

// === Utility Functions ===
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

function getPlanningBadges(plan: UserPlanInput): { label: string }[] {
  const badges: { label: string }[] = [];

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

// === NEW: Decision Engine Core ===
function computeDecisionProfiles(plan: UserPlanInput): DecisionEngineOutput {
  const planText = getPlanText(plan);
  const shortlisted = plan.shortlisted_countries as CountryName[];

  if (shortlisted.length === 0) {
    return {
      primary: null,
      comparator: null,
      allProfiles: [],
      guidance: "Build your shortlist to activate jurisdiction decision support.",
    };
  }

  // Score each shortlisted country
  const profiles: CountryDecisionProfile[] = shortlisted.map((country) => {
    let score = COUNTRY_CONTENT[country].baseScore;
    const whyFit: string[] = [];
    const watchouts: string[] = [];

    // Pathway alignment scoring
    if (plan.pathway_type?.toLowerCase().includes("ivf")) {
      if (["Spain", "Greece", "Portugal", "Czech Republic"].includes(country)) {
        score += 10;
        whyFit.push("Strong match with IVF pathway");
      }
    }

    // Donor pathway scoring
    if (plan.donor_needed) {
      if (["Spain", "Greece", "Portugal", "Czech Republic"].includes(country)) {
        score += 8;
        whyFit.push("High compatibility with donor-related planning");
      } else {
        watchouts.push("Donor pathway may require additional legal review");
      }
    }

    // Surrogacy scoring
    if (plan.surrogate_needed) {
      if (["US", "Mexico", "Greece"].includes(country)) {
        score += 8;
        whyFit.push("Relevant to surrogate-related pathway structure");
      } else if (["Spain", "Portugal"].includes(country)) {
        watchouts.push("Surrogacy legally restricted — verify eligibility");
        score -= 15;
      }
    }

    // Budget sensitivity
    if (planText.includes("budget") || planText.includes("cost")) {
      if (["India", "Mexico", "Turkey", "Greece", "Czech Republic"].includes(country)) {
        score += 5;
        whyFit.push("Worth reviewing for budget-sensitive planning");
      }
      if (["US", "UK"].includes(country)) {
        watchouts.push("Higher cost jurisdiction — verify budget alignment");
      }
    }

    // Legal clarity preference
    if (planText.includes("legal") || planText.includes("clarity")) {
      if (["UK", "US", "Spain", "Portugal"].includes(country)) {
        score += 5;
        whyFit.push("Established legal framework for international patients");
      }
    }

    // Timeline urgency
    if (planText.includes("fast") || planText.includes("quick") || planText.includes("soon")) {
      if (["Spain", "Greece", "Mexico"].includes(country)) {
        score += 3;
        whyFit.push("May fit shorter planning horizon");
      }
    }

    // Infrastructure
    if (["Spain", "Greece", "US", "UK", "Czech Republic"].includes(country)) {
      whyFit.push("Established infrastructure for international coordination");
    }

    // Default watchouts if none specific
    if (watchouts.length === 0) {
      watchouts.push("Legal structure alignment with your specific case");
      watchouts.push("Timeline realism based on clinic selection");
      watchouts.push("Cost vs logistics trade-offs");
    }

    // Determine fit level
    let fit: FitLevel = "moderate";
    if (score >= 80) fit = "high";
    else if (score < 60) fit = "low";

    return {
      name: country,
      fit,
      role: "watchlist", // Will be determined after sorting
      whyFit: whyFit.length > 0 ? whyFit : ["Relevant to your planning criteria"],
      watchouts,
      action: "",
      score,
    };
  });

  // Sort by score descending
  profiles.sort((a, b) => b.score - a.score);

  // Assign roles
  if (profiles.length > 0) {
    profiles[0].role = "lead";
    profiles[0].action = profiles.length === 1 
      ? "Add comparator country to validate choice"
      : "Validate against comparator before finalizing";
  }

  if (profiles.length > 1) {
    profiles[1].role = "comparator";
    profiles[1].action = "Retain for comparison — do not prioritize yet";
  }

  profiles.slice(2).forEach(p => {
    p.role = "watchlist";
    p.action = "Evaluate before keeping in shortlist";
  });

  const primary = profiles[0] || null;
  const comparator = profiles[1] || null;

  // Generate guidance
  let guidance = "";
  if (profiles.length === 1) {
    guidance = "Your shortlist is narrow. Add a comparator country to improve decision quality.";
  } else if (profiles.length === 2) {
    guidance = "Strong comparison pair. Focus on differentiating legal structure and timeline before finalizing.";
  } else if (profiles.length === 3) {
    guidance = "You are now in the comparison stage. Narrow your shortlist to 1–2 countries before moving to execution planning.";
  } else {
    guidance = "Your shortlist is broad. Reduce to 2–3 countries to enable deeper comparison.";
  }

  return {
    primary,
    comparator,
    allProfiles: profiles,
    guidance,
  };
}

// === Legacy recommendation function (enhanced) ===
function getRecommendedCountries(plan: UserPlanInput): CountryDecisionProfile[] {
  const planText = getPlanText(plan);

  const results = AVAILABLE_COUNTRIES.map((country) => {
    let score = COUNTRY_CONTENT[country].baseScore;
    const whyFit: string[] = [];
    const watchouts: string[] = [];

    if (plan.shortlisted_countries.includes(country)) {
      score += 10;
      whyFit.push("Already saved in your shortlist");
    }

    if (plan.donor_needed) {
      if (["Spain", "Greece", "Portugal", "Czech Republic"].includes(country)) {
        score += 8;
        whyFit.push("Matches donor-related planning review");
      }
    }

    if (plan.surrogate_needed) {
      if (["US", "Mexico", "Greece"].includes(country)) {
        score += 8;
        whyFit.push("Relevant to surrogate-related planning review");
      } else if (["Spain", "Portugal"].includes(country)) {
        watchouts.push("Surrogacy restrictions may apply");
      }
    }

    if (planText.includes("budget") || planText.includes("cost")) {
      if (["India", "Mexico", "Turkey", "Greece", "Czech Republic", "Portugal"].includes(country)) {
        score += 5;
        whyFit.push("Worth reviewing for budget-sensitive planning");
      }
    }

    if (planText.includes("legal") || planText.includes("clarity")) {
      if (["UK", "US", "Spain", "Portugal"].includes(country)) {
        score += 5;
        whyFit.push("Worth reviewing for structure and planning clarity");
      }
    }

    if (planText.includes("timeline") || planText.includes("fast") || planText.includes("quick")) {
      if (["Spain", "Greece", "Mexico", "Portugal"].includes(country)) {
        score += 3;
        whyFit.push("May fit a shorter planning horizon");
      }
    }

    if (planText.includes("ivf") || planText.includes("donor") || planText.includes("embryo")) {
      if (["Spain", "Greece", "Portugal", "Czech Republic"].includes(country)) {
        score += 3;
        whyFit.push("Frequently compared in IVF-oriented planning");
      }
    }

    let fit: FitLevel = "moderate";
    if (score >= 80) fit = "high";
    else if (score < 60) fit = "low";

    let role: CountryRole = "watchlist";
    if (score >= 75) role = "comparator";

    return {
      name: country,
      fit,
      role,
      whyFit: whyFit.length > 0 ? whyFit : ["Relevant to your planning context"],
      watchouts: watchouts.length > 0 ? watchouts : ["Requires deeper legal and logistics comparison before elevation"],
      action: score >= 75 ? "Keep as comparison country" : "Do not prioritize yet",
      score,
    };
  });

  return results
    .filter((item) => item.score > 50)
    .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));
}

// === Next Action (Upgraded) ===
function getCountriesNextAction(plan: UserPlanInput, decisionEngine: DecisionEngineOutput): NextAction {
  const shortlistCount = plan.shortlisted_countries.length;
  const hasPlanningBasics = Boolean(
    plan.pathway_type?.trim() ||
      plan.treatment_goal?.trim() ||
      plan.notes?.trim()
  );

  if (!hasPlanningBasics) {
    return {
      title: "Strengthen planning inputs",
      body: "Add more detail in My Plan so jurisdiction guidance becomes sharper and more relevant.",
      href: "/portal/my-plan",
      cta: "Go to My Plan",
      priority: "medium",
    };
  }

  if (shortlistCount === 0) {
    return {
      title: "Build your jurisdiction shortlist",
      body: "Select 2–3 countries for structured comparison. This is the foundation of your execution planning.",
      href: "#manage-shortlist",
      cta: "Select Countries",
      priority: "high",
    };
  }

  if (shortlistCount === 1) {
    return {
      title: "Add a comparator jurisdiction",
      body: "Your shortlist is very narrow. Add one comparison country to improve decision quality before committing.",
      href: "#manage-shortlist",
      cta: "Add Comparator",
      priority: "high",
    };
  }

  if (shortlistCount >= 2 && shortlistCount <= 3) {
    if (decisionEngine.primary && !decisionEngine.comparator) {
      return {
        title: "Narrow Your Jurisdiction Selection",
        body: "You have a strong shortlist. At this stage, your goal is to reduce uncertainty and move toward a primary jurisdiction.",
        href: "#decision-engine",
        cta: "Review Decision Engine",
        priority: "high",
      };
    }
    return {
      title: "Narrow Your Jurisdiction Selection",
      body: "You have a strong shortlist. Compare your shortlisted countries and identify a lead jurisdiction before execution planning.",
      href: "/portal/timeline",
      cta: "Proceed to Timeline",
      priority: "high",
    };
  }

  return {
    title: "Reduce shortlist complexity",
    body: "Your shortlist is broad. Reduce it to 2–3 stronger candidates so planning becomes easier and more actionable.",
    href: "#manage-shortlist",
    cta: "Refine Shortlist",
    priority: "medium",
  };
}

// === Readiness (Upgraded) ===
function getShortlistReadiness(plan: UserPlanInput, decisionEngine: DecisionEngineOutput) {
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
    strengths.push("At least one jurisdiction shortlisted");
  } else {
    gaps.push("Create your jurisdiction shortlist");
  }

  if (shortlistCount >= 2 && shortlistCount <= 3) {
    score += 30;
    strengths.push("Shortlist is in optimal comparison range (2–3)");
  } else if (shortlistCount === 1) {
    gaps.push("Add 1–2 comparison countries");
  } else if (shortlistCount > 3) {
    gaps.push("Narrow shortlist to 2–3 jurisdictions");
  }

  if (decisionEngine.primary?.fit === "high") {
    score += 20;
    strengths.push("Lead jurisdiction shows strong planning alignment");
  }

  let label = "Low";
  let summary = "Your shortlist needs more structure before it becomes a strong decision set.";

  if (score >= 70) {
    label = "High";
    summary = "Your shortlist is in a strong range for serious comparison and deeper decision support.";
  } else if (score >= 40) {
    label = "Moderate";
    summary = "Your shortlist has a useful base, but it still needs refinement before it becomes fully decision-ready.";
  }

  return {
    score,
    label,
    summary,
    strengths,
    gaps,
  };
}

// === Signals (Upgraded) ===
function getCountrySignals(plan: UserPlanInput, decisionEngine: DecisionEngineOutput): string[] {
  const signals: string[] = [];
  const shortlistCount = plan.shortlisted_countries.length;
  const hasPlanningBasics = Boolean(
    plan.pathway_type?.trim() ||
      plan.treatment_goal?.trim() ||
      plan.notes?.trim()
  );

  if (!hasPlanningBasics) {
    signals.push("Your jurisdiction guidance is limited because planning details are still thin.");
  }

  if (shortlistCount === 0) {
    signals.push("No jurisdictions are currently shortlisted. This page is in exploration mode.");
  }

  if (shortlistCount === 1) {
    signals.push("Only one jurisdiction shortlisted. Add comparison options to improve decision quality.");
  }

  if (shortlistCount >= 4) {
    signals.push("Your shortlist is broad. Reducing it to 2–3 jurisdictions will make deeper comparison easier.");
  }

  if (decisionEngine.allProfiles.length >= 2) {
    const differentiated = decisionEngine.allProfiles.filter(p => p.fit !== decisionEngine.allProfiles[0].fit).length > 0;
    if (!differentiated) {
      signals.push("⚠ Countries in shortlist are not yet clearly differentiated → Increase comparison depth before narrowing");
    }
  }

  if (plan.donor_needed) {
    signals.push("Donor pathway is part of this case. Jurisdiction comparison should account for donor-related structure and constraints.");
  }

  if (plan.surrogate_needed) {
    signals.push("Surrogacy review is part of this case. Jurisdiction selection should be pressure-tested for legal and execution complexity.");
  }

  if (shortlistCount >= 2 && shortlistCount <= 3) {
    signals.push("Your shortlist is in a strong range for deeper legal, timing, and logistics comparison.");
  }

  return signals;
}

// === Shortlist Quality Bar ===
function getShortlistQuality(shortlistCount: number): { status: string; message: string } {
  if (shortlistCount === 0) {
    return { status: "empty", message: "No countries selected" };
  }
  if (shortlistCount === 1) {
    return { status: "narrow", message: "Too narrow — add comparator" };
  }
  if (shortlistCount >= 2 && shortlistCount <= 3) {
    return { status: "optimal", message: "Ideal for comparison" };
  }
  return { status: "broad", message: "Too broad — reduce complexity" };
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
            advisory_stage: existing.advisory_stage ?? null,
            primary_country: existing.primary_country ?? null,
          });

          setLastSavedAt(
            "updated_at" in existing && typeof existing.updated_at === "string"
              ? existing.updated_at
              : "created_at" in existing && typeof existing.created_at === "string"
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
    return () => { isMounted = false; };
  }, []);

  // === NEW: Decision Engine ===
  const decisionEngine = useMemo(() => computeDecisionProfiles(plan), [plan]);

  const recommendedCountries = useMemo(() => getRecommendedCountries(plan), [plan]);
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

      const aRecommendation = recommendedCountries.find((country) => country.name === a)?.score ?? 0;
      const bRecommendation = recommendedCountries.find((country) => country.name === b)?.score ?? 0;

      if (aRecommendation !== bRecommendation) {
        return bRecommendation - aRecommendation;
      }

      return a.localeCompare(b);
    });
  }, [plan.shortlisted_countries, recommendedCountries]);

  const countriesNextAction = useMemo(() => getCountriesNextAction(plan, decisionEngine), [plan, decisionEngine]);
  const shortlistReadiness = useMemo(() => getShortlistReadiness(plan, decisionEngine), [plan, decisionEngine]);
  const countrySignals = useMemo(() => getCountrySignals(plan, decisionEngine), [plan, decisionEngine]);
  const planningBadges = useMemo(() => getPlanningBadges(plan), [plan]);
  const shortlistQuality = useMemo(() => getShortlistQuality(plan.shortlisted_countries.length), [plan.shortlisted_countries.length]);

  const shortlistReadyForTimeline = plan.shortlisted_countries.length >= 2 && plan.shortlisted_countries.length <= 3;
  const formattedLastSaved = lastSavedAt !== null ? new Date(lastSavedAt).toLocaleString() : null;

  function toggleCountry(countryName: CountryName) {
    setMessage(null);
    setIsError(false);

    setPlan((current) => {
      const alreadySelected = current.shortlisted_countries.includes(countryName);

      return {
        ...current,
        shortlisted_countries: alreadySelected
          ? current.shortlisted_countries.filter((country) => country !== countryName)
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
    return <div className="p-6">Loading your jurisdiction shortlist...</div>;
  }

  return (
    <div className="space-y-8">
      {/* === HEADER === */}
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

      {/* === NEW: JURISDICTION DECISION ENGINE === */}
      {decisionEngine.primary && (
        <section id="decision-engine" className="rounded-2xl border-2 border-[#3a3a3a] bg-[#3a3a3a] p-8 text-white shadow-xl">
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-stone-400">
                Jurisdiction Decision Engine
              </p>
              <h2 className="mt-2 text-2xl font-bold">
                Primary Recommendation: {decisionEngine.primary.name}
              </h2>
              <div className="mt-2 flex items-center gap-2">
                <span className="rounded-full bg-[#6a7a6a] px-3 py-1 text-xs font-bold uppercase">
                  Confidence: {decisionEngine.primary.fit === "high" ? "High" : "Moderate"}
                </span>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-stone-300 mb-3">
                  Why this leads
                </h3>
                <ul className="space-y-2">
                  {decisionEngine.primary.whyFit.map((reason, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-stone-200">
                      <span className="text-[#6a7a6a]">•</span>
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#c4a7a7] mb-3">
                  Pressure-test before finalizing
                </h3>
                <ul className="space-y-2">
                  {decisionEngine.primary.watchouts.map((watchout, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-stone-300">
                      <span className="text-[#c4a7a7]">•</span>
                      {watchout}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {decisionEngine.comparator && (
              <div className="rounded-xl bg-stone-800/50 p-4 border border-stone-700">
                <h3 className="text-sm font-bold uppercase tracking-wider text-stone-300 mb-2">
                  Best comparator: {decisionEngine.comparator.name}
                </h3>
                <p className="text-sm text-stone-400">
                  Similar pathway structure. Compare for potential differences in legal clarity and execution flow.
                </p>
              </div>
            )}

            <div className="rounded-xl bg-stone-800/30 p-4 border border-stone-700">
              <h3 className="text-sm font-bold uppercase tracking-wider text-stone-300 mb-2">
                Decision guidance
              </h3>
              <p className="text-sm text-stone-300">
                {decisionEngine.guidance}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* === STATS GRID === */}
      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-stone-500">Saved Jurisdictions</p>
          <p className="mt-2 text-3xl font-semibold text-stone-900">
            {plan.shortlisted_countries.length}
          </p>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            Your active shortlist reflects jurisdictions under review.
          </p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-stone-500">Lead Jurisdiction</p>
          <p className="mt-2 text-3xl font-semibold text-stone-900">
            {decisionEngine.primary?.name || "None yet"}
          </p>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            Lead jurisdiction is determined based on planning alignment and system scoring.
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

      {/* === PLANNING CONTEXT === */}
      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div>
          <h2 className="text-xl font-semibold text-stone-900">
            Planning Context
          </h2>
          <p className="mt-1 text-sm text-stone-600">
            Your saved plan shapes jurisdiction recommendations and decision scoring.
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
              Add planning details in My Plan to improve jurisdiction guidance.
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
            Last saved: {formattedLastSaved}
          </p>
        ) : null}
      </section>

      {/* === SHORTLIST QUALITY BAR === */}
      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-stone-900">
              Shortlist Quality
            </h2>
            <p className="mt-1 text-sm text-stone-600">
              Optimal Range: 2–3 jurisdictions
            </p>
          </div>
          <div className={`rounded-xl px-4 py-2 text-sm font-bold ${
            shortlistQuality.status === "optimal" 
              ? "bg-[#f0f4f0] text-[#4a5a4a]" 
              : shortlistQuality.status === "narrow"
                ? "bg-[#faf6f6] text-[#8a6a6a]"
                : "bg-[#faf8f3] text-[#8a7a5a]"
          }`}>
            Current: {plan.shortlisted_countries.length} — {shortlistQuality.message}
          </div>
        </div>
      </section>

      {/* === READINESS === */}
      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-stone-900">
              Decision Readiness
            </h2>
            <p className="mt-1 text-sm text-stone-600">
              Readiness for jurisdiction decision and execution planning.
            </p>
          </div>

          <div className={`rounded-xl px-4 py-3 text-sm font-bold ${
            shortlistReadiness.label === "High" 
              ? "bg-[#f0f4f0] text-[#4a5a4a]" 
              : shortlistReadiness.label === "Moderate"
                ? "bg-[#faf8f3] text-[#8a7a5a]"
                : "bg-[#faf6f6] text-[#8a6a6a]"
          }`}>
            {shortlistReadiness.label} Readiness
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
                ? shortlistReadiness.strengths.join("; ")
                : "No strong signals detected yet."}
            </p>
          </div>

          <div className="rounded-xl bg-stone-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
              Gaps to Improve
            </p>
            <p className="mt-2 text-sm leading-6 text-stone-700">
              {shortlistReadiness.gaps.length > 0
                ? shortlistReadiness.gaps.join("; ")
                : "No major gaps detected."}
            </p>
          </div>
        </div>
      </section>

      {/* === TIMELINE CTA === */}
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

      {/* === SIGNALS === */}
      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div>
          <h2 className="text-xl font-semibold text-stone-900">
            Country Signals
          </h2>
          <p className="mt-1 text-sm text-stone-600">
            Observations highlighting shortlist patterns and comparison risks.
          </p>
        </div>

        <div className="mt-5 space-y-3">
          {countrySignals.length > 0 ? (
            countrySignals.map((signal, idx) => (
              <div
                key={idx}
                className={`rounded-xl border px-4 py-3 text-sm ${
                  signal.includes("⚠") 
                    ? "border-[#c4a7a7] bg-[#faf6f6] text-[#6a4a4a]" 
                    : "border-stone-200 bg-stone-50 text-stone-700"
                }`}
              >
                {signal}
              </div>
            ))
          ) : (
            <p className="text-sm text-stone-500">
              No major signals detected.
            </p>
          )}
        </div>
      </section>

      {/* === SUGGESTED COUNTRIES (DECISION CARDS) === */}
      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div>
          <h2 className="text-xl font-semibold text-stone-900">
            Suggested Jurisdictions
          </h2>
          <p className="mt-1 text-sm text-stone-600">
            Decision support recommendations based on your planning profile.
          </p>
        </div>

        {recommendedCountries.length === 0 ? (
          <div className="mt-5 rounded-xl border border-dashed border-stone-300 bg-stone-50 p-4 text-sm text-stone-600">
            Save more detail in My Plan to unlock jurisdiction guidance.
          </div>
        ) : (
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            {recommendedCountries.slice(0, 4).map((country) => (
              <div
                key={country.name}
                className="rounded-xl border border-stone-200 bg-stone-50 p-4"
              >
                <div className="flex items-center justify-between gap-3 mb-3">
                  <h3 className="text-lg font-semibold text-stone-900">
                    {country.name}
                  </h3>
                  <div className="flex gap-2">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                      country.fit === "high" 
                        ? "bg-[#f0f4f0] text-[#4a5a4a]" 
                        : country.fit === "moderate"
                          ? "bg-[#faf8f3] text-[#8a7a5a]"
                          : "bg-[#faf6f6] text-[#8a6a6a]"
                    }`}>
                      {country.fit === "high" ? "Strong Fit" : country.fit === "moderate" ? "Moderate Fit" : "Low Fit"}
                    </span>
                    <span className="rounded-full bg-white px-2 py-0.5 text-xs font-medium text-stone-600">
                      {country.role === "comparator" ? "Comparator" : "Watchlist"}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                      Why this fits
                    </p>
                    <ul className="space-y-1">
                      {country.whyFit.slice(0, 2).map((reason, idx) => (
                        <li key={idx} className="text-sm text-stone-700">• {reason}</li>
                      ))}
                    </ul>
                  </div>

                  {country.watchouts.length > 0 && (
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-[#8a6a6a] mb-1">
                        Watchouts
                      </p>
                      <ul className="space-y-1">
                        {country.watchouts.slice(0, 2).map((watchout, idx) => (
                          <li key={idx} className="text-sm text-stone-600">• {watchout}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="pt-2 border-t border-stone-200">
                    <p className="text-xs font-medium text-stone-600">
                      <span className="font-bold">Action:</span> {country.action}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* === MANAGE SHORTLIST === */}
      <section id="manage-shortlist" className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div>
          <h2 className="text-xl font-semibold text-stone-900">
            Manage Shortlist
          </h2>
          <p className="mt-1 text-sm text-stone-600">
            Select jurisdictions to keep in your active planning shortlist.
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

      {/* === CURRENT SHORTLIST (UPGRADED CARDS) === */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-stone-900">
            Current Shortlist
          </h2>
          <p className="mt-1 text-sm text-stone-600">
            Jurisdictions currently saved to your planning workspace.
          </p>
        </div>

        {decisionEngine.allProfiles.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-6 text-sm text-stone-600">
            No jurisdictions saved yet. Select one or more countries above and save your shortlist.
          </div>
        ) : (
          <div className="grid gap-6">
            {decisionEngine.allProfiles.map((profile) => (
              <article
                key={profile.name}
                className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-semibold text-stone-900">
                        {profile.name}
                      </h3>
                      <div className="flex gap-2">
                        <span className={`rounded-full px-3 py-1 text-xs font-bold ${
                          profile.fit === "high" 
                            ? "bg-[#f0f4f0] text-[#4a5a4a]" 
                            : profile.fit === "moderate"
                              ? "bg-[#faf8f3] text-[#8a7a5a]"
                              : "bg-[#faf6f6] text-[#8a6a6a]"
                        }`}>
                          {profile.fit === "high" ? "Strong Fit" : profile.fit === "moderate" ? "Moderate Fit" : "Needs Review"}
                        </span>
                        <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-700">
                          {profile.role === "lead" ? "Lead Jurisdiction" : profile.role === "comparator" ? "Comparator" : "Watchlist"}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                          Why this fits your case
                        </p>
                        <ul className="space-y-1">
                          {profile.whyFit.map((reason, idx) => (
                            <li key={idx} className="text-sm text-stone-700 flex items-start gap-2">
                              <span className="text-[#6a7a6a]">•</span>
                              {reason}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="rounded-lg bg-[#faf6f6] border border-[#e8d8d8] p-3">
                        <p className="text-xs font-bold uppercase tracking-wider text-[#8a6a6a] mb-2">
                          Pressure-test
                        </p>
                        <ul className="space-y-1">
                          {profile.watchouts.map((watchout, idx) => (
                            <li key={idx} className="text-sm text-[#6a4a4a] flex items-start gap-2">
                              <span className="text-[#c4a7a7]">•</span>
                              {watchout}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm">
                        <div>
                          <span className="font-medium text-stone-500">System position:</span>
                          <span className="ml-2 text-stone-700">
                            {profile.role === "lead" ? "Currently leading your shortlist" : 
                             profile.role === "comparator" ? "Comparator country" : "Under review"}
                          </span>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-stone-200">
                        <p className="text-sm text-stone-700">
                          <span className="font-bold">Recommended action:</span> {profile.action}
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleCountry(profile.name)}
                    className="rounded-xl border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}