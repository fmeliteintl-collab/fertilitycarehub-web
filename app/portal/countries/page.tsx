import Link from "next/link";

export const runtime = "edge";

const shortlistedCountries = [
  {
    name: "Spain",
    status: "Strong fit",
    summary:
      "Commonly shortlisted for IVF planning due to established treatment infrastructure and international familiarity.",
    notes:
      "Evaluate legal fit, donor framework, and timeline practicality against your personal pathway.",
  },
  {
    name: "Greece",
    status: "Needs review",
    summary:
      "May offer strategic advantages depending on treatment type, budget range, and timing priorities.",
    notes:
      "Compare regulatory comfort, logistics, and legal pathway alignment before prioritizing.",
  },
  {
    name: "Portugal",
    status: "Watchlist",
    summary:
      "Useful to keep on the shortlist while comparing structure, availability, and overall pathway suitability.",
    notes:
      "Assess planning complexity, travel factors, and broader advisory fit before moving higher.",
  },
];

export default function PortalCountriesPage() {
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
          your fertility planning pathway. This area will become your working
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
          <p className="mt-2 text-3xl font-semibold text-stone-900">3</p>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            Your active shortlist currently includes three jurisdictions under
            review.
          </p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-stone-500">Top Priority</p>
          <p className="mt-2 text-3xl font-semibold text-stone-900">Spain</p>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            Highest current fit based on planning value, treatment structure,
            and advisory relevance.
          </p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-stone-500">Next Action</p>
          <p className="mt-2 text-lg font-semibold text-stone-900">
            Narrow shortlist to top 2
          </p>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            Refine your shortlist by legal fit, treatment structure, travel
            practicality, and pathway compatibility.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-stone-900">
            Current Shortlist
          </h2>
          <p className="mt-1 text-sm text-stone-600">
            These are working shortlist cards for V1. Database connection will
            be added after the shortlist module backend step.
          </p>
        </div>

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
                  className="rounded-xl border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
                >
                  Edit Notes
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
      </section>
    </div>
  );
}