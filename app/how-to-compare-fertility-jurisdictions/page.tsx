import Breadcrumbs from "../components/Breadcrumbs";
import CountryWebPageSchema from "../components/CountryWebPageSchema";
import Link from "next/link";

export default function CompareFertilityJurisdictionsPage() {
  return (
    <main className="min-h-screen bg-[#F5F1E8] text-[#1A1A1A]">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Guides", href: "/how-to-compare-fertility-jurisdictions" },
          ]}
        />

        <CountryWebPageSchema
          countryName="Guides"
          countrySlug="how-to-compare-fertility-jurisdictions"
          title="How to Compare Fertility Jurisdictions Strategically"
          description="A structured framework to compare fertility destinations based on governance, donor pathway, eligibility friction, and execution risk."
        />

        <h1 className="text-3xl font-semibold mb-6">
          How to Compare Fertility Jurisdictions Strategically
        </h1>

        <p className="text-[#6A6256] leading-relaxed mb-8">
          Choosing a fertility destination is not about marketing claims or
          headline pricing. It requires structured comparison across governance,
          donor policy, eligibility, access friction, and execution reliability.
        </p>

        <h2 className="text-xl font-semibold mt-10 mb-4">
          1. Governance & Regulatory Oversight
        </h2>
        <p className="text-[#6A6256] leading-relaxed">
          Evaluate how the jurisdiction regulates clinics, donor anonymity,
          reporting standards, and enforcement consistency.
        </p>

        <h2 className="text-xl font-semibold mt-10 mb-4">
          2. Donor Pathway Structure
        </h2>
        <p className="text-[#6A6256] leading-relaxed">
          Compare availability, anonymity frameworks, waiting times, and
          screening protocols.
        </p>

        <h2 className="text-xl font-semibold mt-10 mb-4">
          3. Access & Eligibility Friction
        </h2>
        <p className="text-[#6A6256] leading-relaxed">
          Age caps, marital status rules, documentation requirements, and
          cross-border acceptance all matter.
        </p>

        <h2 className="text-xl font-semibold mt-10 mb-4">
          4. Execution Risk & Logistics
        </h2>
        <p className="text-[#6A6256] leading-relaxed">
          Travel cadence, lab standards, clinic maturity, and continuity of care
          affect outcome probability.
        </p>

        <div className="mt-14 border-t border-[#E5DDC8] pt-8">
          <h3 className="text-lg font-semibold mb-4">Explore Country Dossiers</h3>

          <div className="flex flex-wrap gap-4">
            <Link href="/countries/spain" className="underline">
              Spain
            </Link>
            <Link href="/countries/greece" className="underline">
              Greece
            </Link>
            <Link href="/countries/united-states" className="underline">
              United States
            </Link>
            <Link href="/countries/canada" className="underline">
              Canada
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}