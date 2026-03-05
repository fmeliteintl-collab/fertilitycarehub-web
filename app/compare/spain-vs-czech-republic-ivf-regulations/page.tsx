import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Spain vs Czech Republic IVF Regulations (2026) | Cross-Border Fertility Comparison",
  description:
    "Structured comparison of Spain and the Czech Republic IVF regulations under the FCH Global Fertility Intelligence Framework™️.",
  alternates: {
    canonical:
      "https://fertilitycarehub.com/compare/spain-vs-czech-republic-ivf-regulations",
  },
};

export default function SpainVsCzechRepublicPage() {
  return (
    <main className="min-h-screen bg-[#F5F1E8] text-[#1A1A1A]">
      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Breadcrumb JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
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
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Spain vs Czech Republic IVF Regulations (2026)",
                  item: "https://fertilitycarehub.com/compare/spain-vs-czech-republic-ivf-regulations",
                },
              ],
            }),
          }}
        />

        {/* Breadcrumb UI */}
        <nav className="text-sm text-[#6A6256] mb-6" aria-label="Breadcrumb">
          <Link href="/" className="underline textUnderlineOffset-4">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/compare" className="underline textUnderlineOffset-4">
            Compare
          </Link>
          <span className="mx-2">/</span>
          <span aria-current="page">Spain vs Czech Republic</span>
        </nav>

        <h1 className="text-4xl font-medium leading-tight">
          Spain vs Czech Republic IVF Regulations (2026 Framework Overview)
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-[#2A2A2A]">
          Spain and the Czech Republic are frequently evaluated for cross-border
          fertility treatment in Europe. While both jurisdictions support
          donor-assisted IVF pathways, structural differences can emerge across
          regulatory alignment, donor governance, clinical infrastructure
          transparency, and execution complexity.
        </p>

        {/* Regulatory */}
        <section className="mt-16">
          <h2 className="text-2xl font-medium">Regulatory Alignment</h2>
          <p className="mt-4 text-[#6A6256] leading-relaxed">
            Spain operates under consolidated national legislation governing
            assisted reproductive technologies, with defined eligibility and donor
            governance structures. The Czech Republic permits comparable fertility
            treatment pathways within a national regulatory framework that may
            involve different procedural requirements depending on pathway type
            and case profile.
          </p>
        </section>

        {/* Clinical */}
        <section className="mt-12">
          <h2 className="text-2xl font-medium">Clinical Infrastructure Depth</h2>
          <p className="mt-4 text-[#6A6256] leading-relaxed">
            Spain maintains a mature private fertility sector with high clinic
            density in major cities and established international patient
            operations. The Czech Republic also supports an established fertility
            clinic ecosystem, though infrastructure concentration, laboratory
            capacity, and international patient throughput can vary by region and
            provider scale.
          </p>
        </section>

        {/* Governance */}
        <section className="mt-12">
          <h2 className="text-2xl font-medium">Governance & Donor Structure</h2>
          <p className="mt-4 text-[#6A6256] leading-relaxed">
            Spain enforces anonymous donor structures under national law. The
            Czech Republic permits donor-assisted pathways under defined
            governance parameters, with structural considerations influenced by
            pathway type, documentation structure, and case variables such as
            partner status and treatment configuration.
          </p>
        </section>

        {/* Execution */}
        <section className="mt-12">
          <h2 className="text-2xl font-medium">Execution Complexity</h2>
          <p className="mt-4 text-[#6A6256] leading-relaxed">
            Execution complexity in both jurisdictions depends on the intended
            pathway, documentation friction, coordination logistics, and timeline
            sensitivity. In practice, operational risk is often driven more by
            case structure and coordination load than by jurisdiction alone.
          </p>
        </section>

        {/* Summary */}
        <section className="mt-16 border-t border-[#E5DDC8] pt-12">
          <h2 className="text-2xl font-medium">Structural Position Summary</h2>
          <p className="mt-4 text-[#6A6256] leading-relaxed">
            Spain and the Czech Republic each present viable regulatory
            environments for cross-border fertility treatment. Final suitability
            is contingent upon donor pathway constraints, storage horizon,
            citizenship exposure, financial planning, and execution risk within
            the client’s specific case profile.
          </p>
        </section>

        {/* Related comparisons */}
        <section className="mt-12 border-t border-[#E5DDC8] pt-10">
          <h2 className="text-lg font-medium">Related comparisons</h2>
          <ul className="mt-4 space-y-2 text-sm text-[#6A6256]">
            <li>
              <Link
                href="/compare/spain-vs-portugal-ivf-regulations"
                className="underline textUnderlineOffset-4"
              >
                Spain vs Portugal IVF Regulations
              </Link>
            </li>
            <li>
              <Link
                href="/compare/spain-vs-greece-ivf-regulations"
                className="underline textUnderlineOffset-4"
              >
                Spain vs Greece IVF Regulations
              </Link>
            </li>
            <li>
              <Link
                href="/compare/spain-vs-italy-ivf-regulations"
                className="underline textUnderlineOffset-4"
              >
                Spain vs Italy IVF Regulations
              </Link>
            </li>
            <li>
              <Link
                href="/compare/spain-vs-north-cyprus-ivf-regulations"
                className="underline textUnderlineOffset-4"
              >
                Spain vs North Cyprus IVF Regulations
              </Link>
            </li>
          </ul>
        </section>

        {/* CTA */}
        <section className="mt-16 text-center">
          <p className="text-sm text-[#6A6256]">
            For structured comparative modeling across jurisdictions, see the{" "}
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