import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fertility Jurisdiction Comparisons (2026) | FertilityCareHub",
  description:
    "Structured jurisdiction comparisons under the FCH Global Fertility Intelligence Framework™️.",
  alternates: {
    canonical: "https://fertilitycarehub.com/compare",
  },
};

export default function CompareIndexPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://fertilitycarehub.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Compare",
        item: "https://fertilitycarehub.com/compare",
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#F5F1E8] text-[#1A1A1A]">
      {/* Breadcrumb JSON-LD */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Breadcrumb UI */}
        <div className="text-sm text-[#6A6256]">
          <Link href="/" className="underline textUnderlineOffset-4">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span>Compare</span>
        </div>

        <h1 className="mt-6 text-4xl font-medium leading-tight">
          Jurisdiction Comparison Briefs
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-[#2A2A2A]">
          Structured cross-border fertility comparisons evaluated under the FCH
          Global Fertility Intelligence Framework™️. These overviews provide
          regulatory and structural context. Final suitability depends on
          individual case modeling.
        </p>

        <div className="mt-12 space-y-6">
          <Link
            href="/compare/spain-vs-greece-ivf-regulations"
            className="block border border-[#E5DDC8] p-6 rounded-xl hover:bg-[#EFE9DB] transition"
          >
            <h2 className="text-xl font-medium">
              Spain vs Greece IVF Regulations (2026)
            </h2>
            <p className="mt-2 text-sm text-[#6A6256]">
              Regulatory alignment, donor governance, infrastructure depth, and
              execution complexity overview.
            </p>
          </Link>

          <Link
            href="/compare/spain-vs-portugal-ivf-regulations"
            className="block border border-[#E5DDC8] p-6 rounded-xl hover:bg-[#EFE9DB] transition"
          >
            <h2 className="text-xl font-medium">
              Spain vs Portugal IVF Regulations (2026)
            </h2>
            <p className="mt-2 text-sm text-[#6A6256]">
              Comparative structural overview across donor framework, governance
              posture, and operational modeling.
            </p>
          </Link>

          <Link
            href="/compare/spain-vs-italy-ivf-regulations"
            className="block border border-[#E5DDC8] p-6 rounded-xl hover:bg-[#EFE9DB] transition"
          >
            <h2 className="text-xl font-medium">
              Spain vs Italy IVF Regulations (2026)
            </h2>
            <p className="mt-2 text-sm text-[#6A6256]">
              Structural comparison focused on donor legality, regulatory
              stability, and procedural alignment.
            </p>
          </Link>

          <Link
            href="/compare/spain-vs-czech-republic-ivf-regulations"
            className="block border border-[#E5DDC8] p-6 rounded-xl hover:bg-[#EFE9DB] transition"
          >
            <h2 className="text-xl font-medium">
              Spain vs Czech Republic IVF Regulations (2026)
            </h2>
            <p className="mt-2 text-sm text-[#6A6256]">
              Framework overview of governance posture, infrastructure depth, and
              execution considerations.
            </p>
          </Link>

          <Link
            href="/compare/spain-vs-north-cyprus-ivf-regulations"
            className="block border border-[#E5DDC8] p-6 rounded-xl hover:bg-[#EFE9DB] transition"
          >
            <h2 className="text-xl font-medium">
              Spain vs North Cyprus IVF Regulations (2026)
            </h2>
            <p className="mt-2 text-sm text-[#6A6256]">
              Comparative overview emphasizing regulatory predictability, donor
              governance structure, and operational risk.
            </p>
          </Link>
        </div>

        <section className="mt-16 text-center">
          <p className="text-sm text-[#6A6256]">
            For structured jurisdiction modeling aligned to your case profile,
            see the{" "}
            <Link href="/advisory" className="underline textUnderlineOffset-4">
              Global Fertility Intelligence Brief™️
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  );
}