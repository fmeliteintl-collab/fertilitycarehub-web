import Link from "next/link";

type PortalHeaderProps = {
  title: string;
  description: string;
};

export default function PortalHeader({
  title,
  description,
}: PortalHeaderProps) {
  return (
    <header className="border-b border-stone-200 bg-white px-6 py-5 sm:px-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">
            FertilityCareHub Portal
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-stone-900">
            {title}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600">
            {description}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/compare"
            className="rounded-xl border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 transition-colors hover:border-stone-400 hover:text-stone-900"
          >
            Compare Countries
          </Link>

          <Link
            href="/consultation"
            className="rounded-xl bg-stone-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-stone-800"
          >
            Request Advisory
          </Link>
        </div>
      </div>
    </header>
  );
}