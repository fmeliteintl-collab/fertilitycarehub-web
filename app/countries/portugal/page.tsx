import CountryWebPageSchema from "../../components/CountryWebPageSchema";
import Breadcrumbs from "../../components/Breadcrumbs";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portugal IVF Regulations & Fertility Law 2026 | FertilityCareHub",
  description:
    "Structured analysis of IVF regulations, donor laws, surrogacy policy, and fertility access rules in Portugal. Updated regulatory insights for intended parents.",
  alternates: {
    canonical: "https://fertilitycarehub.com/countries/portugal",
  },
  openGraph: {
    title: "Portugal IVF Regulations & Fertility Law 2026",
    description:
      "In-depth fertility law analysis covering IVF, donor gametes, surrogacy, and access regulations in Portugal.",
    url: "https://fertilitycarehub.com/countries/portugal",
    siteName: "FertilityCareHub",
    type: "article",
  },
};
export default function PortugalPage() {
  return (
    <main className="min-h-screen bg-[#F5F1E8] text-[#1A1A1A]">
      <Breadcrumbs
  items={[
    { name: "Home", href: "/" },
    { name: "Countries", href: "/countries" },
    { name: "Portugal", href: "/countries/portugal" },
  ]}
/>
<CountryWebPageSchema
  countryName="Portugal"
  countrySlug="portugal"
  title="Portugal: Fertility Jurisdiction Assessment"
  description="Strategic jurisdiction assessment and regulatory clarity for cross-border fertility care in Portugal."
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
            Review Portugal Strategy Privately
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
            Portugal
          </h1>

          <p className="mt-6 max-w-3xl mx-auto text-lg leading-relaxed text-[#2A2A2A]">
            Portugal is a modern, regulation-forward European option with a growing clinic ecosystem.
            The advantage is often “balanced execution”: a structured environment, improving maturity,
            and a patient experience that can be excellent when you select the right clinic model.
            This dossier outlines when Portugal is strategically strong — and when another country is
            the cleaner choice.
          </p>
        </div>
      </section>

      {/* Two-column decision block */}
      <section className="max-w-6xl mx-auto px-6 pb-10">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-[#E5DDC8] bg-[#FAF7F1] p-8">
            <h2 className="text-xl font-medium">When Portugal is the right choice</h2>
            <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-[#2A2A2A] list-disc pl-5">
              <li>
                You want a European option that feels <strong>modern and structured</strong>, with
                improving clinic maturity.
              </li>
              <li>
                You value a pathway where <strong>governance and documentation</strong> are handled clearly,
                and you want fewer “grey areas.”
              </li>
              <li>
                You want a strong <strong>patient experience</strong> and a clinic that communicates well and
                plans proactively.
              </li>
              <li>
                You want a market that can be <strong>strategically efficient</strong> when the clinic model is right
                (good logistics, good planning cadence).
              </li>
              <li>
                You prefer a curated shortlist over a broad database — and want the selection logic explained.
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-[#E5DDC8] bg-[#FAF7F1] p-8">
            <h2 className="text-xl font-medium">When it’s not</h2>
            <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-[#2A2A2A] list-disc pl-5">
              <li>
                Your primary objective is the <strong>fastest possible timeline</strong> and you want maximum scheduling
                flexibility regardless of clinic demand.
              </li>
              <li>
                Your case is highly complex and you want the deepest possible multidisciplinary capability
                (some clients prefer the US for this).
              </li>
              <li>
                You are optimizing for the most permissive donor ecosystem as the top variable — another country may fit better.
              </li>
              <li>
                You want a fully DIY process; Portugal performs best with structured planning and coordination.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Framework */}
      <section className="max-w-6xl mx-auto px-6 pb-12">
        <div className="rounded-2xl border border-[#E5DDC8] bg-[#FAF7F1] p-8">
          <h2 className="text-2xl font-medium">Advisor framework: how to evaluate Portugal</h2>

          <div className="mt-6 grid md:grid-cols-3 gap-6">
            <div>
              <div className="text-xs tracking-[0.25em] text-[#6A6256]">CLINIC MATURITY</div>
              <p className="mt-3 text-[15px] leading-relaxed text-[#2A2A2A]">
                Portugal’s advantage comes from choosing clinics with strong operational cadence:
                consistent protocols, clean timelines, and good patient communication. We prioritize
                <strong> repeatable execution</strong>, not marketing.
              </p>
            </div>

            <div>
              <div className="text-xs tracking-[0.25em] text-[#6A6256]">PATHWAY FIT</div>
              <p className="mt-3 text-[15px] leading-relaxed text-[#2A2A2A]">
                The right pathway is defined by your profile: timeline tolerance, donor needs, privacy,
                and travel cadence. Portugal is strong when your plan benefits from a <strong>structured framework</strong>.
              </p>
            </div>

            <div>
              <div className="text-xs tracking-[0.25em] text-[#6A6256]">TRANSPARENCY</div>
              <p className="mt-3 text-[15px] leading-relaxed text-[#2A2A2A]">
                We require clarity: what’s included, what’s optional, and how add-ons are priced. Your
                deliverable is a <strong>bounded cost map</strong> — not surprises.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core sections */}
      <section className="max-w-6xl mx-auto px-6 pb-12">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-[#E5DDC8] bg-[#FAF7F1] p-8">
            <h3 className="text-xl font-medium">Clinic standards and patient experience</h3>
            <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-[#2A2A2A] list-disc pl-5">
              <li>
                Prefer clinics with a disciplined process map: monitoring cadence, retrieval/transfer scheduling,
                and clear communication checkpoints.
              </li>
              <li>
                Ask what is standardized vs customized — you want a plan that can adapt without becoming unpredictable.
              </li>
              <li>
                Confirm how the clinic handles out-of-country coordination (records, remote consults, and travel compression).
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-[#E5DDC8] bg-[#FAF7F1] p-8">
            <h3 className="text-xl font-medium">Cost structure (strategic view)</h3>
            <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-[#2A2A2A] list-disc pl-5">
              <li>
                Portugal can be attractive when you want a clean private-pay pathway with a rational cost structure —
                but always confirm inclusions.
              </li>
              <li>
                Separate costs into: base cycle, lab add-ons, meds/monitoring, and travel cadence.
              </li>
              <li>
                Your goal is a <strong>decision-grade range</strong> you can commit to, not a theoretical minimum.
              </li>
            </ul>
            <p className="mt-5 text-sm text-[#6A6256]">
              Note: we avoid publishing numbers unless verified and updated. In advisory, we provide a clear band
              and the logic behind it.
            </p>
          </div>

          <div className="rounded-2xl border border-[#E5DDC8] bg-[#FAF7F1] p-8">
            <h3 className="text-xl font-medium">Governance and eligibility</h3>
            <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-[#2A2A2A] list-disc pl-5">
              <li>
                Confirm eligibility and documentation early — Portugal is best when administration is handled upfront.
              </li>
              <li>
                If privacy matters, structure coordination to minimize exposure and reduce unnecessary third-party handling.
              </li>
              <li>
                Treat governance as part of your risk model: predictable rules are an advantage when your case has constraints.
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-[#E5DDC8] bg-[#FAF7F1] p-8">
            <h3 className="text-xl font-medium">Logistics and travel (including accommodation)</h3>
            <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-[#2A2A2A] list-disc pl-5">
              <li>
                Plan travel around monitoring cadence and transfer timing; Portugal can work well with compressed trips.
              </li>
              <li>
                We include <strong>accommodation</strong> as part of the plan: 2–3 vetted options near clinic access,
                chosen for comfort, predictability, and low friction.
              </li>
              <li>
                We avoid hotel price tables. The objective is execution quality, not “deal hunting.”
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
              <li>Exhaustive clinic lists (we curate a shortlist, not a database).</li>
              <li>DIY administrative/visa playbooks (we coordinate with trusted partners).</li>
              <li>Overly broad treatment encyclopedias (we focus on strategic decisions).</li>
            </ul>
            <ul className="space-y-3 text-[15px] leading-relaxed text-[#2A2A2A] list-disc pl-5">
              <li>Hotel price grids (we recommend 2–3 vetted options for smooth execution).</li>
              <li>Unverified claims and static numbers (we prioritize accuracy and updates).</li>
              <li>One-size-fits-all advice (pathway fit is the product).</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="rounded-2xl border border-[#E5DDC8] bg-[#FAF7F1] p-10 text-center">
          <h3 className="text-2xl font-medium">Private advisory, not a public database.</h3>
          <p className="mt-4 max-w-2xl mx-auto text-[15px] leading-relaxed text-[#2A2A2A]">
            If Portugal is on your shortlist, the decisive step is aligning your pathway to the right clinic model,
            timelines, and governance constraints. We’ll structure the plan, curate the shortlist, and provide a clean
            execution route.
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
      {/* Comparison guide CTA */}
<section className="mt-10 border border-[#E5DDC8] bg-white/60 rounded-xl p-5">
  <h3 className="text-lg font-medium">Compare destinations before choosing</h3>
  <p className="mt-2 text-sm text-[#6A6256] leading-relaxed">
    Use our structured framework to compare governance, donor pathway, eligibility friction,
    timeline realism, and execution risk across countries.
  </p>
  <Link
    href="/how-to-compare-fertility-jurisdictions"
    className="inline-block mt-3 underline text-sm"
  >
    Read the comparison guide →
  </Link>
</section>
      <section className="mt-16 border-t border-[#E5DDC8] pt-10">
  <h2 className="text-2xl font-semibold mb-6">Compare Other Jurisdictions</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <Link href="/countries/spain" className="border border-[#E5DDC8] p-6 rounded-xl hover:border-[#B89B5E] transition">
      <h3 className="text-lg font-medium">Spain</h3>
      <p className="text-sm text-[#6A6256] mt-2">A mature ecosystem with predictable execution and donor depth.</p>
    </Link>
    <Link href="/countries/greece" className="border border-[#E5DDC8] p-6 rounded-xl hover:border-[#B89B5E] transition">
      <h3 className="text-lg font-medium">Greece</h3>
      <p className="text-sm text-[#6A6256] mt-2">Often considered for access flexibility and streamlined pathways.</p>
    </Link>
    <Link href="/countries/united-kingdom" className="border border-[#E5DDC8] p-6 rounded-xl hover:border-[#B89B5E] transition">
      <h3 className="text-lg font-medium">United Kingdom</h3>
      <p className="text-sm text-[#6A6256] mt-2">Highly regulated governance-first model when oversight is the priority.</p>
    </Link>
  </div>
</section>
    </main>
  );
}
