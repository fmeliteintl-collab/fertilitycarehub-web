import PortalHeader from "@/components/portal/PortalHeader";

export default function PortalDocumentsPage() {
  return (
    <div className="space-y-10">
      <PortalHeader
        title="Documents"
        description="Store and organize planning documents, records, and administrative files."
      />

      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-stone-900">Document Vault</h2>
        <p className="mt-2 text-sm leading-6 text-stone-600">
          This module will connect to Supabase Storage for secure document
          organization and retrieval.
        </p>
      </div>
    </div>
  );
}