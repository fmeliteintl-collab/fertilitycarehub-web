export const runtime = "edge";

const documents = [
  {
    name: "Passport Copy",
    type: "Identity",
    status: "Uploaded",
    note: "Primary identity document placeholder for travel and intake preparation.",
  },
  {
    name: "Medical Summary",
    type: "Medical",
    status: "Pending",
    note: "Will hold medical background notes and treatment history summary.",
  },
  {
    name: "Consultation Notes",
    type: "Advisory",
    status: "Draft",
    note: "Working notes from advisory preparation and pathway discussions.",
  },
];

export default function PortalDocumentsPage() {
  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-stone-500">
          Documents
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900">
          Document Vault
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-stone-600">
          Organize the records, notes, and supporting files needed for fertility
          planning, advisory preparation, and cross-border treatment logistics.
        </p>
      </div>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-stone-500">Uploaded</p>
          <p className="mt-2 text-3xl font-semibold text-stone-900">1</p>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            One file is already marked as uploaded in this V1 placeholder vault.
          </p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-stone-500">Pending</p>
          <p className="mt-2 text-3xl font-semibold text-stone-900">1</p>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            One key supporting document is still pending collection.
          </p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-stone-500">Draft Notes</p>
          <p className="mt-2 text-3xl font-semibold text-stone-900">1</p>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            One advisory-related note set is currently in working draft status.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-stone-900">
            Current Document List
          </h2>
          <p className="mt-1 text-sm text-stone-600">
            This is the V1 vault UI. Supabase Storage and real upload flows will
            be connected in a later backend step.
          </p>
        </div>

        <div className="space-y-4">
          {documents.map((document) => (
            <article
              key={document.name}
              className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-lg font-semibold text-stone-900">
                      {document.name}
                    </h3>
                    <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-700">
                      {document.type}
                    </span>
                    <span className="rounded-full border border-stone-300 px-3 py-1 text-xs font-medium text-stone-700">
                      {document.status}
                    </span>
                  </div>

                  <p className="mt-3 max-w-3xl text-sm leading-6 text-stone-600">
                    {document.note}
                  </p>
                </div>

                <button
                  type="button"
                  className="rounded-xl border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
                >
                  Manage File
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}