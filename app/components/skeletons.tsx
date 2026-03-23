export function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-32 rounded-2xl bg-stone-200" />
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="h-24 rounded-2xl bg-stone-200" />
        <div className="h-24 rounded-2xl bg-stone-200" />
        <div className="h-24 rounded-2xl bg-stone-200" />
      </div>
    </div>
  );
}

export function TimelineSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-32 rounded-2xl bg-stone-200 animate-pulse" />
      ))}
    </div>
  );
}