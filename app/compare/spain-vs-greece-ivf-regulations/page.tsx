import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Spain vs Greece IVF Regulations (2026) | Cross-Border Fertility Comparison",
  description:
    "Structured comparison of Spain and Greece IVF regulations under the FCH Global Fertility Intelligence Framework™️.",
  alternates: {
    canonical:
      "https://fertilitycarehub.com/compare/spain-vs-greece-ivf-regulations",
  },
};

export default function SpainVsGreecePage() {
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
          name: "Spain vs Greece IVF Regulations (2026)",
          item: "https://fertilitycarehub.com/compare/spain-vs-greece-ivf-regulations",
        },
      ],
    }),
  }}
/>
        {/* Breadcrumb */}
        <div className="text-sm text-[#6A6256] mb-6">
          <Link href="/" className="underline textUnderlineOffset-4">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/compare" className="underline textUnderlineOffset-4">
            Compare
          </Link>
        </div>

        <h1 className="text-4xl font-medium leading-tight">
          Spain vs Greece IVF Regulations (2026 Framework Overview)
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-[#2A2A2A]">
          Spain and Greece are frequently compared for cross-border fertility
          treatment. While both jurisdictions permit donor-assisted IVF,
          structural differences exist in regulatory alignment, donor governance,
          clinical infrastructure transparency, and execution complexity.
        </p>

        {/* Regulatory */}
        <section className="mt-16">
          <h2 className="text-2xl font-medium">Regulatory Alignment</h2>
          <p className="mt-4 text-[#6A6256] leading-relaxed">
            Spain operates under consolidated national legislation governing
            assisted reproductive technologies, including defined donor anonymity
            provisions. Greece permits comparable treatment pathways within a
            regulatory framework that may involve procedural distinctions
            depending on case structure and eligibility profile.
          </p>
        </section>

        {/* Clinical */}
        <section className="mt-12">
          <h2 className="text-2xl font-medium">Clinical Infrastructure Depth</h2>
          <p className="mt-4 text-[#6A6256] leading-relaxed">
            Both Spain and Greece maintain established fertility clinics serving
            international patients. Infrastructure concentration, laboratory
            capacity, and international familiarity vary by city and provider
            within each jurisdiction.
          </p>
        </section>

        {/* Governance */}
        <section className="mt-12">
          <h2 className="text-2xl font-medium">Governance & Donor Structure</h2>
          <p className="mt-4 text-[#6A6256] leading-relaxed">
            Spain enforces anonymous donor structures under national law. Greece
            permits donor-assisted pathways under defined governance parameters,
            with regulatory interpretation potentially influenced by pathway type
            and documentation structure.
          </p>
        </section>

        {/* Execution */}
        <section className="mt-12">
          <h2 className="text-2xl font-medium">Execution Complexity</h2>
          <p className="mt-4 text-[#6A6256] leading-relaxed">
            Execution complexity in both jurisdictions depends on treatment
            pathway, documentation requirements, marital status, and coordination
            logistics. Operational friction varies more by case profile than by
            jurisdiction alone.
          </p>
        </section>

        {/* Summary */}
        <section className="mt-16 border-t border-[#E5DDC8] pt-12">
          <h2 className="text-2xl font-medium">Structural Position Summary</h2>
          <p className="mt-4 text-[#6A6256] leading-relaxed">
            Spain and Greece present structurally viable regulatory environments
            for cross-border fertility treatment. Suitability is contingent upon
            donor structure, storage horizon, citizenship exposure, financial
            planning, and timeline sensitivity within each individual case
            profile.
          </p>
        </section>
        {/* Related comparisons */}
<section className="mt-12 border-t border-[#E5DDC8] pt-10">
  <h2 className="text-lg font-medium">Related comparisons</h2>
  <ul className="mt-4 space-y-2 text-sm text-[#6A6256]">
    <li>
      <Link href="/compare/spain-vs-portugal-ivf-regulations" className="underline textUnderlineOffset-4">
        Spain vs Portugal IVF Regulations
      </Link>
    </li>
    <li>
      <Link href="/compare/spain-vs-greece-ivf-regulations" className="underline textUnderlineOffset-4">
        Spain vs Greece IVF Regulations
      </Link>
    </li>
    <li>
      <Link href="/compare/spain-vs-italy-ivf-regulations" className="underline textUnderlineOffset-4">
        Spain vs Italy IVF Regulations
      </Link>
    </li>
    <li>
      <Link href="/compare/spain-vs-czech-republic-ivf-regulations" className="underline textUnderlineOffset-4">
        Spain vs Czech Republic IVF Regulations
      </Link>
    </li>
    <li>
      <Link href="/compare/spain-vs-north-cyprus-ivf-regulations" className="underline textUnderlineOffset-4">
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