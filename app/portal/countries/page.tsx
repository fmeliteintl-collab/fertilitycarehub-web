import PortalHeader from "@/components/portal/PortalHeader";

export default function PortalCountriesPage() {
  return (
    <div className="space-y-10">
      <PortalHeader
        title="Countries"
        description="Save, review, and compare jurisdictions relevant to your fertility pathway."
      />

      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-stone-900">
          Country Shortlist
        </h2>
        <p className="mt-2 text-sm leading-6 text-stone-600">
          This module will allow users to shortlist countries, rank options,
          and track planning notes for each jurisdiction.
        </p>
      </div>
    </div>
  );
}