import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Spain vs Portugal IVF Regulations (2026) | Cross-Border Fertility Comparison",
  description:
    "Structured comparison of Spain and Portugal IVF regulations under the FCH Global Fertility Intelligence Framework™️.",
  alternates: {
    canonical:
      "https://fertilitycarehub.com/compare/spain-vs-portugal-ivf-regulations",
  },
};

export default function SpainVsPortugalPage() {
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
                  name: "Spain vs Portugal IVF Regulations (2026)",
                  item: "https://fertilitycarehub.com/compare/spain-vs-portugal-ivf-regulations",
                },
              ],
            }),
          }}
        />

        {/* Breadcrumb */}
        <nav className="text-sm text-[#6A6256] mb-6" aria-label="Breadcrumb">
          <Link href="/" className="underline textUnderlineOffset-4">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/compare" className="underline textUnderlineOffset-4">
            Compare
          </Link>
          <span className="mx-2">/</span>
          <span aria-current="page">Spain vs Portugal</span>
        </nav>

        <h1 className="text-4xl font-medium leading-tight">
          Spain vs Portugal IVF Regulations (2026 Framework Overview)
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-[#2A2A2A]">
          Spain and Portugal are frequently evaluated for cross-border fertility
          treatment within Southern Europe. While both jurisdictions permit
          donor-assisted IVF, structural differences exist in donor governance,
          legal oversight mechanisms, infrastructure distribution, and execution
          coordination.
        </p>

        {/* Regulatory */}
        <section className="mt-16">
          <h2 className="text-2xl font-medium">Regulatory Alignment</h2>
          <p className="mt-4 text-[#6A6256] leading-relaxed">
            Spain operates under consolidated national legislation governing
            assisted reproductive technologies, including defined donor anonymity
            provisions. Portugal permits donor-assisted treatment within a
            regulated national framework that includes oversight mechanisms and
            defined eligibility parameters.
          </p>
        </section>

        {/* Clinical */}
        <section className="mt-12">
          <h2 className="text-2xl font-medium">Clinical Infrastructure Depth</h2>
          <p className="mt-4 text-[#6A6256] leading-relaxed">
            Both Spain and Portugal maintain licensed fertility clinics serving
            domestic and international patients. Infrastructure concentration and
            international patient familiarity may vary by metropolitan center and
            institutional scale within each country.
          </p>
        </section>

        {/* Governance */}
        <section className="mt-12">
          <h2 className="text-2xl font-medium">Governance & Donor Structure</h2>
          <p className="mt-4 text-[#6A6256] leading-relaxed">
            Spain enforces anonymous donor structures under national law. Portugal
            permits donor-assisted pathways under defined governance rules, with
            structural considerations potentially influenced by donor type,
            disclosure policies, and case profile.
          </p>
        </section>

        {/* Execution */}
        <section className="mt-12">
          <h2 className="text-2xl font-medium">Execution Complexity</h2>
          <p className="mt-4 text-[#6A6256] leading-relaxed">
            Execution complexity in both jurisdictions depends on treatment
            pathway, documentation structure, marital status, and coordination
            logistics. Operational friction is often case-specific rather than
            jurisdiction-specific.
          </p>
        </section>

        {/* Summary */}
        <section className="mt-16 border-t border-[#E5DDC8] pt-12">
          <h2 className="text-2xl font-medium">Structural Position Summary</h2>
          <p className="mt-4 text-[#6A6256] leading-relaxed">
            Spain and Portugal present structured regulatory environments for
            cross-border fertility treatment. Suitability depends on donor
            structure, long-term storage considerations, citizenship exposure,
            and timeline sensitivity within each individual case profile.
          </p>
        </section>

        {/* Related comparisons */}
        <section className="mt-12 border-t border-[#E5DDC8] pt-10">
          <h2 className="text-lg font-medium">Related comparisons</h2>
          <ul className="mt-4 space-y-2 text-sm text-[#6A6256]">
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
                href="/compare/spain-vs-czech-republic-ivf-regulations"
                className="underline textUnderlineOffset-4"
              >
                Spain vs Czech Republic IVF Regulations
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