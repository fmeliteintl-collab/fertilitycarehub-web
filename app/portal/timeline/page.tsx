export const runtime = "edge";

const timelineItems = [
  {
    title: "Define pathway priorities",
    category: "Planning",
    status: "Completed",
    description:
      "Clarify treatment direction, country fit criteria, and the main strategic pathway for the case.",
  },
  {
    title: "Reduce shortlist to top countries",
    category: "Research",
    status: "In Progress",
    description:
      "Compare leading jurisdictions by legal fit, treatment structure, timing, and travel practicality.",
  },
  {
    title: "Prepare advisory intake notes",
    category: "Advisory",
    status: "Upcoming",
    description:
      "Organize the current case summary, constraints, and main decision questions before the next advisory step.",
  },
  {
    title: "Review travel and documentation needs",
    category: "Logistics",
    status: "Upcoming",
    description:
      "Outline expected travel planning, documentation requirements, and timing risks for shortlisted jurisdictions.",
  },
];

export default function PortalTimelinePage() {
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
          steps, and milestone checkpoints. This will evolve into your working
          execution timeline for the portal.
        </p>
      </div>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-stone-500">Completed</p>
          <p className="mt-2 text-3xl font-semibold text-stone-900">1</p>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            One timeline milestone has already been completed.
          </p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-stone-500">In Progress</p>
          <p className="mt-2 text-3xl font-semibold text-stone-900">1</p>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            One active planning item is currently being worked through.
          </p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-stone-500">Upcoming</p>
          <p className="mt-2 text-3xl font-semibold text-stone-900">2</p>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            Two next-phase items are ready to be organized and scheduled.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-stone-900">
            Current Timeline
          </h2>
          <p className="mt-1 text-sm text-stone-600">
            This is the V1 timeline UI. Database connection will be added in the
            timeline backend step.
          </p>
        </div>

        <div className="space-y-4">
          {timelineItems.map((item, index) => (
            <article
              key={item.title}
              className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-900 text-sm font-semibold text-white">
                    {index + 1}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-lg font-semibold text-stone-900">
                        {item.title}
                      </h3>
                      <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-700">
                        {item.category}
                      </span>
                      <span className="rounded-full border border-stone-300 px-3 py-1 text-xs font-medium text-stone-700">
                        {item.status}
                      </span>
                    </div>

                    <p className="mt-3 max-w-3xl text-sm leading-6 text-stone-600">
                      {item.description}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className="rounded-xl border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
                >
                  Update Step
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}