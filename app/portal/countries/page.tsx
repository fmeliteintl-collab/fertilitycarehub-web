"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  getCurrentUserPlan,
  upsertCurrentUserPlan,
} from "@/lib/plans/user-plans";
import { EMPTY_USER_PLAN_INPUT, type UserPlanInput } from "@/types/plan";

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

const COUNTRY_CONTENT: Record<
  string,
  { status: string; summary: string; notes: string }
> = {
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

export default function PortalCountriesPage() {
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
            target_timeline: existing.target_timeline,
            budget_range: existing.budget_range,
            notes: existing.notes,
          });
        }
      } catch (error: unknown) {
        console.error(error);

        if (isMounted) {
          setIsError(true);
          setMessage("Failed to load your shortlist.");
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

  const shortlistedCountries = useMemo(
    () =>
      plan.shortlisted_countries.map((countryName) => ({
        name: countryName,
        status: COUNTRY_CONTENT[countryName]?.status ?? "Saved",
        summary:
          COUNTRY_CONTENT[countryName]?.summary ??
          "Saved to your personal shortlist for ongoing evaluation.",
        notes:
          COUNTRY_CONTENT[countryName]?.notes ??
          "Continue reviewing this jurisdiction against your legal, medical, and logistical needs.",
      })),
    [plan.shortlisted_countries]
  );

  const topPriority =
    shortlistedCountries.length > 0 ? shortlistedCountries[0].name : "None yet";

  function toggleCountry(countryName: string) {
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
  }

  async function handleSaveShortlist() {
    try {
      setSaving(true);
      setMessage(null);
      setIsError(false);

      await upsertCurrentUserPlan(plan);

      setMessage("Shortlist saved successfully.");
    } catch (error: unknown) {
      console.error(error);
      setIsError(true);
      setMessage("Failed to save shortlist.");
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
            Refine your shortlist
          </p>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            Save only the countries that still match your legal fit, treatment
            structure, logistics, and timing priorities.
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
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
          {AVAILABLE_COUNTRIES.map((country) => {
            const isSelected = plan.shortlisted_countries.includes(country);

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
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button
            type="button"
            onClick={handleSaveShortlist}
            disabled={saving}
            className="rounded-xl bg-stone-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Shortlist"}
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
                    onClick={() => toggleCountry(country.name)}
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