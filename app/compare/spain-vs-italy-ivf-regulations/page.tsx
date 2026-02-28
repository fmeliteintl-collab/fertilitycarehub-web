import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Spain vs Italy IVF Regulations (2026) | Cross-Border Fertility Comparison",
  description:
    "Structured comparison of Spain and Italy IVF regulations under the FCH Global Fertility Intelligence Framework™️.",
  alternates: {
    canonical: "https://fertilitycarehub.com/compare/spain-vs-italy-ivf-regulations",
  },
};

export default function SpainVsItalyPage() {
  return (
    <main className="min-h-screen bg-[#F5F1E8] text-[#1A1A1A]">
      <div className="max-w-5xl mx-auto px-6 py-16">
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
          Spain vs Italy IVF Regulations (2026 Framework Overview)
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-[#2A2A2A]">
          Spain and Italy are often evaluated side-by-side by intended parents
          comparing Southern European pathways. Both jurisdictions support IVF,
          but structural differences exist across regulatory alignment, donor
          governance, clinical infrastructure transparency, and execution
          complexity.
        </p>

        {/* Regulatory */}
        <section className="mt-16">
          <h2 className="text-2xl font-medium">Regulatory Alignment</h2>
          <p className="mt-4 text-[#6A6256] leading-relaxed">
            Spain operates under consolidated national legislation governing
            assisted reproductive technologies, with established operational norms
            for international care pathways. Italy permits IVF within a regulated
            framework that has historically included tighter pathway constraints,
            and practical access may vary depending on eligibility profile and
            treatment structure.
          </p>
        </section>

        {/* Clinical */}
        <section className="mt-12">
          <h2 className="text-2xl font-medium">Clinical Infrastructure Depth</h2>
          <p className="mt-4 text-[#6A6256] leading-relaxed">
            Spain maintains a dense private fertility sector with extensive
            laboratory capacity and long-standing international patient
            familiarity. Italy has established clinics and expertise as well,
            though infrastructure concentration, wait-time dynamics, and
            cross-border readiness may vary by region and provider type.
          </p>
        </section>

        {/* Governance */}
        <section className="mt-12">
          <h2 className="text-2xl font-medium">Governance & Donor Structure</h2>
          <p className="mt-4 text-[#6A6256] leading-relaxed">
            Donor governance is a key differentiator in Southern Europe. Spain
            applies structured donor governance under national law, supporting
            donor-assisted pathways within defined parameters. Italy’s donor
            governance environment may involve additional structural constraints
            and pathway-specific compliance considerations, making case variables
            decisive for feasibility.
          </p>
        </section>

        {/* Execution */}
        <section className="mt-12">
          <h2 className="text-2xl font-medium">Execution Complexity</h2>
          <p className="mt-4 text-[#6A6256] leading-relaxed">
            Execution complexity in both jurisdictions depends on treatment type,
            documentation requirements, travel cadence, and coordination load.
            Operational friction may be driven more by pathway eligibility and
            clinic process design than by jurisdiction alone.
          </p>
        </section>

        {/* Summary */}
        <section className="mt-16 border-t border-[#E5DDC8] pt-12">
          <h2 className="text-2xl font-medium">Structural Position Summary</h2>
          <p className="mt-4 text-[#6A6256] leading-relaxed">
            Spain and Italy can both be viable in cross-border fertility planning,
            but suitability is contingent upon donor structure, storage horizon,
            citizenship exposure, financial planning, and timeline sensitivity.
            For donor-assisted pathways, governance rules and operational readiness
            typically drive the decision more than geography.
          </p>
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