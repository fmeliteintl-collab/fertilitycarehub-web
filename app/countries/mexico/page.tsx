import CountryWebPageSchema from "../../components/CountryWebPageSchema";
import Breadcrumbs from "../../components/Breadcrumbs";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mexico IVF Regulations & Fertility Law 2026 | FertilityCareHub",
  description:
    "Structured analysis of IVF regulations, donor laws, surrogacy policy, and fertility access rules in Mexico. Updated regulatory insights for intended parents.",
  alternates: {
    canonical: "https://fertilitycarehub.com/countries/mexico",
  },
  openGraph: {
    title: "Mexico IVF Regulations & Fertility Law 2026",
    description:
      "In-depth fertility law analysis covering IVF, donor gametes, surrogacy, and access regulations in Mexico.",
    url: "https://fertilitycarehub.com/countries/mexico",
    siteName: "FertilityCareHub",
    type: "article",
  },
};
export default function MexicoPage() {
  return (
    <main className="min-h-screen bg-[#F5F1E8] text-[#1A1A1A]">
      <Breadcrumbs
  items={[
    { name: "Home", href: "/" },
    { name: "Countries", href: "/countries" },
    { name: "Mexico", href: "/countries/mexico" },
  ]}
/>
<CountryWebPageSchema
  countryName="Mexico"
  countrySlug="mexico"
  title="Mexico: Fertility Jurisdiction Assessment"
  description="Strategic jurisdiction assessment and regulatory clarity for cross-border fertility care in Mexico."
/>
      {/* Top utility bar */}
      <div className="max-w-6xl mx-auto px-6 pt-10">
        <div className="flex items-center justify-between">
          <Link
            href="/countries"
            className="text-sm tracking-wide text-[#6A6256] hover:text-[#1A1A1A]"
          >
            ← Back to countries
          </Link>

          <Link
            href="/consultation"
            className="inline-flex items-center justify-center rounded-full border border-[#B89B5E] px-5 py-2 text-sm tracking-wide text-[#1A1A1A] hover:bg-[#F0E7D6]"
          >
            Review Mexico Strategy Privately
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-14 pb-10">
        <div className="text-center">
          <div className="text-xs tracking-[0.28em] text-[#6A6256]">
            STRATEGIC ADVISORY DOSSIER
          </div>

          <h1 className="mt-5 text-5xl md:text-6xl leading-tight font-medium">
            Mexico
          </h1>

          <p className="mt-6 max-w-3xl mx-auto text-lg leading-relaxed text-[#2A2A2A]">
            Mexico is often a strategic option because of proximity and cost structure — especially
            for North American patients. The advantage is not “Mexico in general.” The advantage is a
            carefully vetted clinic model and a pathway designed to avoid variability. This dossier
            outlines when Mexico is the right call, when it isn’t, and how to evaluate it with precision.
          </p>
        </div>
      </section>

      {/* Two-column decision block */}
      <section className="max-w-6xl mx-auto px-6 pb-10">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-[#E5DDC8] bg-[#FAF7F1] p-8">
            <h2 className="text-xl font-medium">When Mexico is the right choice</h2>
            <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-[#2A2A2A] list-disc pl-5">
              <li>
                You want a pathway where <strong>proximity</strong> reduces travel friction (US/Canada patients).
              </li>
              <li>
                You’re optimizing for <strong>cost structure</strong>, but you still want strong standards and clean execution.
              </li>
              <li>
                You want a clinic that supports <strong>compressed travel</strong> and remote coordination where possible.
              </li>
              <li>
                You are comfortable with private-pay medicine and want a curated shortlist rather than a mass directory.
              </li>
              <li>
                You want a plan that is structured like a project: milestones, documentation, timing, and accountability.
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-[#E5DDC8] bg-[#FAF7F1] p-8">
            <h2 className="text-xl font-medium">When it’s not</h2>
            <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-[#2A2A2A] list-disc pl-5">
              <li>
                You need the deepest possible multidisciplinary “top-of-stack” capability for a highly complex case.
              </li>
              <li>
                You prefer a market where reporting, governance, and public outcomes data are your primary decision filter.
              </li>
              <li>
                You are unwilling to do vetting; Mexico works when you select the right clinic model and avoid variability.
              </li>
              <li>
                You want a one-size-fits-all pathway; Mexico requires <strong>precision clinic selection</strong>.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Framework */}
      <section className="max-w-6xl mx-auto px-6 pb-12">
        <div className="rounded-2xl border border-[#E5DDC8] bg-[#FAF7F1] p-8">
          <h2 className="text-2xl font-medium">Advisor framework: how to evaluate Mexico</h2>

          <div className="mt-6 grid md:grid-cols-3 gap-6">
            <div>
              <div className="text-xs tracking-[0.25em] text-[#6A6256]">VETTING</div>
              <p className="mt-3 text-[15px] leading-relaxed text-[#2A2A2A]">
                Mexico is not “pick any clinic.” The value is unlocked only when clinic standards,
                lab practice, and workflow quality are confirmed. We curate a shortlist and explain why.
              </p>
            </div>

            <div>
              <div className="text-xs tracking-[0.25em] text-[#6A6256]">EXECUTION</div>
              <p className="mt-3 text-[15px] leading-relaxed text-[#2A2A2A]">
                Your plan should be built like a project: remote coordination, monitoring cadence,
                procedure timing, recovery, and a clean follow-up plan to reduce avoidable trips.
              </p>
            </div>

            <div>
              <div className="text-xs tracking-[0.25em] text-[#6A6256]">RISK MODEL</div>
              <p className="mt-3 text-[15px] leading-relaxed text-[#2A2A2A]">
                Your job is not to find the cheapest number. Your job is to minimize risk while achieving
                a bounded, decision-grade cost range.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core sections */}
      <section className="max-w-6xl mx-auto px-6 pb-12">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-[#E5DDC8] bg-[#FAF7F1] p-8">
            <h3 className="text-xl font-medium">Clinic model and quality signals</h3>
            <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-[#2A2A2A] list-disc pl-5">
              <li>
                Prefer clinics with clear lab leadership, consistent embryology staffing, and a disciplined process map.
              </li>
              <li>
                Confirm communication cadence: who manages you, how fast results are returned, and what escalation looks like.
              </li>
              <li>
                Ask for inclusion clarity (what’s included, what’s optional, and what’s priced separately).
              </li>
              <li>
                Prioritize clinics that handle international patients regularly and have structured coordination.
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-[#E5DDC8] bg-[#FAF7F1] p-8">
            <h3 className="text-xl font-medium">Cost structure (strategic view)</h3>
            <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-[#2A2A2A] list-disc pl-5">
              <li>
                Mexico can offer attractive cost structure — but only after you map the full pathway:
                base cycle, lab add-ons, meds/monitoring, and travel cadence.
              </li>
              <li>
                The objective is a <strong>bounded all-in range</strong> you can commit to.
              </li>
              <li>
                We do not publish numbers unless verified and updated; advisory provides the clean band and logic.
              </li>
            </ul>
            <p className="mt-5 text-sm text-[#6A6256]">
              Note: “lowest price” is rarely the best decision in high-stakes medicine. We optimize for quality and execution.
            </p>
          </div>

          <div className="rounded-2xl border border-[#E5DDC8] bg-[#FAF7F1] p-8">
            <h3 className="text-xl font-medium">Governance and documentation</h3>
            <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-[#2A2A2A] list-disc pl-5">
              <li>
                Treat documentation as part of the plan: records, tests, and timelines should be set before travel.
              </li>
              <li>
                Confirm what can be done remotely vs what requires on-site presence to avoid wasted trips.
              </li>
              <li>
                If privacy matters, structure the pathway to minimize unnecessary data handling and third-party exposure.
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-[#E5DDC8] bg-[#FAF7F1] p-8">
            <h3 className="text-xl font-medium">Logistics and travel (including accommodation)</h3>
            <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-[#2A2A2A] list-disc pl-5">
              <li>
                Mexico can be very efficient for short trips if the clinic supports compressed scheduling.
              </li>
              <li>
                We include <strong>accommodation</strong> as part of execution: 2–3 vetted options near clinic access,
                chosen for comfort, predictability, and low friction.
              </li>
              <li>
                We avoid hotel price grids. The objective is calm, predictable logistics during a high-stakes process.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* What we exclude */}
      <section className="max-w-6xl mx-auto px-6 pb-12">
        <div className="rounded-2xl border border-[#E5DDC8] bg-[#FAF7F1] p-8">
          <h3 className="text-xl font-medium">What we deliberately exclude (the private filter)</h3>
          <div className="mt-5 grid md:grid-cols-2 gap-6">
            <ul className="space-y-3 text-[15px] leading-relaxed text-[#2A2A2A] list-disc pl-5">
              <li>Exhaustive clinic lists (we curate a shortlist, not a directory).</li>
              <li>DIY travel bureaucracy instructions (we coordinate with trusted partners).</li>
              <li>Public encyclopedias and broad claims (we focus on decision-grade guidance).</li>
            </ul>
            <ul className="space-y-3 text-[15px] leading-relaxed text-[#2A2A2A] list-disc pl-5">
              <li>Hotel price comparison tables (we recommend a small vetted shortlist).</li>
              <li>Static numbers without verification (we prioritize accuracy and updates).</li>
              <li>One-size-fits-all pathways (clinic selection + pathway fit is everything).</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="rounded-2xl border border-[#E5DDC8] bg-[#FAF7F1] p-10 text-center">
          <h3 className="text-2xl font-medium">Private advisory, not a public database.</h3>
          <p className="mt-4 max-w-2xl mx-auto text-[15px] leading-relaxed text-[#2A2A2A]">
            If Mexico is on your shortlist, the decisive step is clinic vetting and a pathway that removes variability.
            We’ll curate the shortlist, map the plan, and provide a clean execution route.
          </p>

          <div className="mt-7 flex items-center justify-center">
            <Link
              href="/consultation"
              className="inline-flex items-center justify-center rounded-full border border-[#B89B5E] px-6 py-3 text-sm tracking-wide text-[#1A1A1A] hover:bg-[#F0E7D6]"
            >
              Request Private Advisory Review
            </Link>
          </div>

          <div className="mt-3 text-xs tracking-wide text-[#6A6256]">
            Discreet, structured guidance aligned to your profile and jurisdictional constraints.
          </div>
        </div>
      </section>
    </main>
  );
}
