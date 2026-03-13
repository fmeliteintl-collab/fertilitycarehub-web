import PortalHeader from "@/components/portal/PortalHeader";

export default function PortalTimelinePage() {
  return (
    <div className="space-y-10">
      <PortalHeader
        title="Timeline"
        description="Track research, legal, advisory, travel, and treatment milestones in one place."
      />

      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-stone-900">
          Timeline Planner
        </h2>
        <p className="mt-2 text-sm leading-6 text-stone-600">
          This module will support task planning, milestone tracking, and
          fertility journey sequencing.
        </p>
      </div>
    </div>
  );
}