import PortalHeader from "@/components/portal/PortalHeader";

export default function MyPlanPage() {
  return (
    <div className="space-y-10">
      <PortalHeader
        title="My Plan"
        description="Define your fertility pathway priorities, timeline goals, and planning constraints."
      />

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-stone-900">
            Treatment Goal
          </h2>

          <p className="mt-2 text-sm text-stone-600">
            Define the primary treatment pathway you are planning.
          </p>

          <select className="mt-4 w-full rounded-lg border border-stone-300 p-2 text-sm">
            <option>Select pathway</option>
            <option>IVF with own eggs</option>
            <option>IVF with donor eggs</option>
            <option>Surrogacy</option>
            <option>Embryo donation</option>
          </select>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-stone-900">
            Target Timeline
          </h2>

          <p className="mt-2 text-sm text-stone-600">
            When would you ideally like treatment to begin?
          </p>

          <select className="mt-4 w-full rounded-lg border border-stone-300 p-2 text-sm">
            <option>Select timeline</option>
            <option>Immediately</option>
            <option>Within 6 months</option>
            <option>Within 12 months</option>
            <option>Exploratory planning stage</option>
          </select>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-stone-900">
            Budget Range
          </h2>

          <p className="mt-2 text-sm text-stone-600">
            Estimated total budget for treatment and travel.
          </p>

          <select className="mt-4 w-full rounded-lg border border-stone-300 p-2 text-sm">
            <option>Select budget range</option>
            <option>$20k - $40k</option>
            <option>$40k - $80k</option>
            <option>$80k - $120k</option>
            <option>$120k+</option>
          </select>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-stone-900">
            Notes
          </h2>

          <p className="mt-2 text-sm text-stone-600">
            Capture key planning considerations or constraints.
          </p>

          <textarea
            rows={5}
            className="mt-4 w-full rounded-lg border border-stone-300 p-3 text-sm"
            placeholder="Add planning notes..."
          />
        </div>
      </div>
    </div>
  );
}