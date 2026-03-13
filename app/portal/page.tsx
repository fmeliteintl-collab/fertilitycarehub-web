import PortalHeader from "@/components/portal/PortalHeader";
import Link from "next/link";

export default function PortalDashboardPage() {
  return (
    <div className="space-y-10">
      <PortalHeader
        title="Dashboard"
        description="Overview of your fertility planning workspace, next steps, and advisory progress."
      />

      {/* Dashboard Cards */}
      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-stone-900">
            Planning Profile
          </h2>
          <p className="mt-2 text-sm text-stone-600">
            Define your treatment goals, timeline priorities, and pathway
            considerations.
          </p>

          <Link
            href="/portal/my-plan"
            className="mt-4 inline-block text-sm font-medium text-stone-900 underline"
          >
            View Plan
          </Link>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-stone-900">
            Country Shortlist
          </h2>

          <p className="mt-2 text-sm text-stone-600">
            Save and evaluate jurisdictions that align with your fertility
            pathway.
          </p>

          <Link
            href="/portal/countries"
            className="mt-4 inline-block text-sm font-medium text-stone-900 underline"
          >
            Manage Countries
          </Link>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-stone-900">
            Planning Timeline
          </h2>

          <p className="mt-2 text-sm text-stone-600">
            Track key research, advisory, legal, and treatment milestones.
          </p>

          <Link
            href="/portal/timeline"
            className="mt-4 inline-block text-sm font-medium text-stone-900 underline"
          >
            View Timeline
          </Link>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-stone-900">
            Document Vault
          </h2>

          <p className="mt-2 text-sm text-stone-600">
            Store planning documents, legal paperwork, and clinic notes in one
            secure place.
          </p>

          <Link
            href="/portal/documents"
            className="mt-4 inline-block text-sm font-medium text-stone-900 underline"
          >
            Open Documents
          </Link>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-stone-900">
            Advisory Workspace
          </h2>

          <p className="mt-2 text-sm text-stone-600">
            Track advisory progress, strategy notes, and upcoming actions.
          </p>

          <Link
            href="/portal/advisory"
            className="mt-4 inline-block text-sm font-medium text-stone-900 underline"
          >
            View Advisory
          </Link>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-stone-900">
            Account Settings
          </h2>

          <p className="mt-2 text-sm text-stone-600">
            Manage profile details and account preferences.
          </p>

          <Link
            href="/portal/settings"
            className="mt-4 inline-block text-sm font-medium text-stone-900 underline"
          >
            Open Settings
          </Link>
        </div>
      </section>
    </div>
  );
}