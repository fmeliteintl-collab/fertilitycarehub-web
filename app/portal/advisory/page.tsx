export const runtime = "edge";

const advisoryItems = [
  {
    title: "Strategy Session",
    status: "Available",
    description:
      "A focused advisory session to clarify pathway direction, shortlist logic, and next-step planning priorities.",
  },
  {
    title: "Comprehensive Advisory Package",
    status: "Core Offer",
    description:
      "A more structured advisory pathway designed for deeper planning, comparative review, and guided decision support.",
  },
  {
    title: "Current Advisory Status",
    status: "Not Started",
    description:
      "This area will later reflect the user’s actual advisory stage, case notes, and strategic next actions.",
  },
];

export default function PortalAdvisoryPage() {
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
          Track your advisory pathway, review available support formats, and
          prepare for structured fertility planning decisions with
          FertilityCareHub.
        </p>
      </div>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-stone-500">Current Status</p>
          <p className="mt-2 text-3xl font-semibold text-stone-900">
            Not Started
          </p>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            No advisory engagement has been linked to this account yet.
          </p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-stone-500">Recommended Next Step</p>
          <p className="mt-2 text-lg font-semibold text-stone-900">
            Clarify pathway questions
          </p>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            Identify the main legal, logistical, and treatment-planning
            questions to prepare for advisory review.
          </p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-stone-500">Portal Role</p>
          <p className="mt-2 text-lg font-semibold text-stone-900">
            Planning + decision support
          </p>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            This workspace will later connect portal planning data with advisory
            case progress and structured next actions.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-stone-900">
            Advisory Pathways
          </h2>
          <p className="mt-1 text-sm text-stone-600">
            This is the V1 advisory UI. Case linkage and account-specific
            advisory records will be connected in a later backend step.
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

                <button
                  type="button"
                  className="rounded-xl border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
                >
                  View Details
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}