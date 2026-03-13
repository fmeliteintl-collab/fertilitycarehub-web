import PortalHeader from "@/components/portal/PortalHeader";

export default function PortalSettingsPage() {
  return (
    <div className="space-y-10">
      <PortalHeader
        title="Settings"
        description="Manage your profile details, account preferences, and future portal settings."
      />

      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-stone-900">
          Account Settings
        </h2>
        <p className="mt-2 text-sm leading-6 text-stone-600">
          This area will later support profile management and user preferences.
        </p>
      </div>
    </div>
  );
}