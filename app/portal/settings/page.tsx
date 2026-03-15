export const runtime = "edge";

const settingsSections = [
  {
    title: "Account Identity",
    description:
      "This area will later show profile details such as full name, email, and account metadata pulled from Supabase.",
    status: "Planned",
  },
  {
    title: "Portal Preferences",
    description:
      "Future options will include personal planning preferences, portal defaults, and workflow customizations.",
    status: "Planned",
  },
  {
    title: "Security",
    description:
      "Password updates, session management, and account protections will be added in a later auth hardening step.",
    status: "Planned",
  },
];

export default function PortalSettingsPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-stone-500">
          Settings
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900">
          Account & Portal Settings
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-stone-600">
          Manage your account area and prepare for future personalization,
          profile controls, and security settings inside the FertilityCareHub
          portal.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-stone-500">Account State</p>
          <p className="mt-2 text-3xl font-semibold text-stone-900">Active</p>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            Your portal access is active and connected to the authenticated app
            shell.
          </p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-stone-500">Preferences</p>
          <p className="mt-2 text-3xl font-semibold text-stone-900">Coming</p>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            Personalization and planning defaults will be introduced in a later
            phase.
          </p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-stone-500">Security</p>
          <p className="mt-2 text-3xl font-semibold text-stone-900">Basic</p>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            Core authentication is active. Advanced account controls will be
            added later.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-stone-900">
            Settings Areas
          </h2>
          <p className="mt-1 text-sm text-stone-600">
            This is the V1 settings UI. Editable account controls will be added
            after authenticated data testing is complete.
          </p>
        </div>

        <div className="space-y-4">
          {settingsSections.map((section) => (
            <article
              key={section.title}
              className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-lg font-semibold text-stone-900">
                      {section.title}
                    </h3>
                    <span className="rounded-full border border-stone-300 px-3 py-1 text-xs font-medium text-stone-700">
                      {section.status}
                    </span>
                  </div>

                  <p className="mt-3 max-w-3xl text-sm leading-6 text-stone-600">
                    {section.description}
                  </p>
                </div>

                <button
                  type="button"
                  className="rounded-xl border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
                >
                  View Area
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}