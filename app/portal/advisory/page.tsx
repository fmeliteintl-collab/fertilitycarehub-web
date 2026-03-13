import PortalHeader from "@/components/portal/PortalHeader";

export default function PortalAdvisoryPage() {
  return (
    <div className="space-y-10">
      <PortalHeader
        title="Advisory"
        description="Review your advisory status, pathway notes, and next recommended actions."
      />

      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-stone-900">
          Advisory Workspace
        </h2>
        <p className="mt-2 text-sm leading-6 text-stone-600">
          This module will connect the planning portal to consultation and
          advisory workflow data.
        </p>
      </div>
    </div>
  );
}