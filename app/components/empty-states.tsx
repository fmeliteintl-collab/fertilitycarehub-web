export function EmptyTimeline() {
  return (
    <div className="rounded-2xl border border-dashed border-stone-300 bg-stone-50 p-8 text-center">
      <p className="text-stone-500">No timeline items yet</p>
      <p className="mt-1 text-sm text-stone-400">
        Generate a timeline from your planning context to get started
      </p>
    </div>
  );
}

export function EmptyCountries() {
  return (
    <div className="rounded-2xl border border-dashed border-stone-300 bg-stone-50 p-8 text-center">
      <p className="text-stone-500">No countries shortlisted</p>
      <p className="mt-1 text-sm text-stone-400">
        Select 2-4 countries that match your pathway and budget
      </p>
    </div>
  );
}