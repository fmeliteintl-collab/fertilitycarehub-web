import CountryWebPageSchema from "../../components/CountryWebPageSchema";
import Breadcrumbs from "../../components/Breadcrumbs";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "United States IVF Regulations & Fertility Law 2026 | FertilityCareHub",
  description:
    "Structured analysis of IVF regulations, donor laws, surrogacy policy, and fertility access rules in the United States. Updated regulatory insights for intended parents.",
  alternates: {
    canonical: "https://fertilitycarehub.com/countries/united-states",
  },
  openGraph: {
    title: "United States IVF Regulations & Fertility Law 2026",
    description:
      "In-depth fertility law analysis covering IVF, donor gametes, surrogacy, and access regulations in the United States.",
    url: "https://fertilitycarehub.com/countries/united-states",
    siteName: "FertilityCareHub",
    type: "article",
  },
};
export default function UnitedStatesPage() {
  return (
    <main className="min-h-screen bg-[#F5F1E8] text-[#1A1A1A]">
      <Breadcrumbs
  items={[
    { name: "Home", href: "/" },
    { name: "Countries", href: "/countries" },
    { name: "United States", href: "/countries/united-states" },
  ]}
/>
<CountryWebPageSchema
  countryName="United States"
  countrySlug="united-states"
  title="United States: Fertility Jurisdiction Assessment"
  description="Strategic jurisdiction assessment and regulatory clarity for fertility care in the United States."
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
            Review United States Strategy Privately
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
            United States
          </h1>

          <p className="mt-6 max-w-3xl mx-auto text-lg leading-relaxed text-[#2A2A2A]">
            The United States is the premium benchmark for breadth and capability. The strategic
            advantage is not that every clinic is elite — it’s that the U.S. offers a concentration
            of top-tier centers, advanced labs, and highly specialized pathways. When complexity is
            high or when you want maximum optionality, the U.S. is often the cleanest decision.
            This dossier explains when it’s worth it — and when it’s not.
          </p>
        </div>
      </section>

      {/* Two-column decision block */}
      <section className="max-w-6xl mx-auto px-6 pb-10">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-[#E5DDC8] bg-[#FAF7F1] p-8">
            <h2 className="text-xl font-medium">When the U.S. is the right choice</h2>
            <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-[#2A2A2A] list-disc pl-5">
              <li>
                Your case is complex and you want the broadest access to{" "}
                <strong>advanced lab capability</strong> and specialist depth.
              </li>
              <li>
                You want maximum optionality across pathways (including high-complexity male factor,
                advanced testing, and highly specialized protocols).
              </li>
              <li>
                You want strong infrastructure for international coordination and a high probability
                of finding a clinic model that fits your exact needs.
              </li>
              <li>
                Legal clarity is central to your plan (including state-level frameworks where relevant).
              </li>
              <li>
                You are willing to pay for premium execution when the outcome and risk profile justify it.
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-[#E5DDC8] bg-[#FAF7F1] p-8">
            <h2 className="text-xl font-medium">When it’s not</h2>
            <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-[#2A2A2A] list-disc pl-5">
              <li>
                Cost is your dominant decision variable and your case can be handled with equal quality
                in a lower-cost market.
              </li>
              <li>
                You want one predictable national framework — in the U.S., some rules and coverage are
                state-dependent.
              </li>
              <li>
                You want a purely “price-led” decision; the U.S. is a quality-and-capability decision.
              </li>
              <li>
                You prefer minimal planning. The U.S. works best with structured coordination and document readiness.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Framework */}
      <section className="max-w-6xl mx-auto px-6 pb-12">
        <div className="rounded-2xl border border-[#E5DDC8] bg-[#FAF7F1] p-8">
          <h2 className="text-2xl font-medium">Advisor framework: how to evaluate the U.S.</h2>

          <div className="mt-6 grid md:grid-cols-3 gap-6">
            <div>
              <div className="text-xs tracking-[0.25em] text-[#6A6256]">CENTER DEPTH</div>
              <p className="mt-3 text-[15px] leading-relaxed text-[#2A2A2A]">
                The U.S. advantage is top-end capability — multidisciplinary depth, lab specialization,
                and advanced protocols. We focus on finding the right center model for your profile.
              </p>
            </div>

            <div>
              <div className="text-xs tracking-[0.25em] text-[#6A6256]">PATHWAY DESIGN</div>
              <p className="mt-3 text-[15px] leading-relaxed text-[#2A2A2A]">
                A good U.S. plan is engineered: what happens locally vs on-site, how many trips, when monitoring occurs,
                and how records flow. We reduce wasted travel and eliminate ambiguity.
              </p>
            </div>

            <div>
              <div className="text-xs tracking-[0.25em] text-[#6A6256]">TOTAL COST MAP</div>
              <p className="mt-3 text-[15px] leading-relaxed text-[#2A2A2A]">
                Costs must be mapped as a system: base cycle, lab add-ons, meds/monitoring, storage, and travel cadence.
                Your deliverable is a bounded all-in range aligned to your risk tolerance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core sections */}
      <section className="max-w-6xl mx-auto px-6 pb-12">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-[#E5DDC8] bg-[#FAF7F1] p-8">
            <h3 className="text-xl font-medium">Clinic selection (how we think)</h3>
            <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-[#2A2A2A] list-disc pl-5">
              <li>
                We look for high-discipline operations: consistent protocols, strong lab staffing, and clean communication cadence.
              </li>
              <li>
                We prioritize clinics that can demonstrate fit for your pathway (not generic “highest success” marketing).
              </li>
              <li>
                We confirm what is included vs optional — and how the clinic handles international patients.
              </li>
              <li>
                We shortlist intentionally (typically 4–5), then structure the decision based on your constraints.
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-[#E5DDC8] bg-[#FAF7F1] p-8">
            <h3 className="text-xl font-medium">Legal and governance (strategic view)</h3>
            <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-[#2A2A2A] list-disc pl-5">
              <li>
                The U.S. can offer strong legal clarity in certain pathways, but rules can be state-dependent.
              </li>
              <li>
                We treat governance as a risk variable: jurisdiction choice, contracts (if relevant), and documentation readiness.
              </li>
              <li>
                The deliverable is not “legal advice” — it’s a structured risk map and a clear coordination plan.
              </li>
            </ul>
            <p className="mt-5 text-sm text-[#6A6256]">
              Note: legal specifics depend on pathway and jurisdiction; we coordinate with vetted partners where needed.
            </p>
          </div>

          <div className="rounded-2xl border border-[#E5DDC8] bg-[#FAF7F1] p-8">
            <h3 className="text-xl font-medium">Cost structure (strategic view)</h3>
            <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-[#2A2A2A] list-disc pl-5">
              <li>
                The U.S. is premium-priced. We only recommend it when capability, complexity, or risk reduction justify it.
              </li>
              <li>
                We map total cost as a system: base cycle + lab add-ons + meds/monitoring + storage + travel cadence.
              </li>
              <li>
                We avoid publishing numbers unless verified and updated; in advisory, we provide a decision-grade range.
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-[#E5DDC8] bg-[#FAF7F1] p-8">
            <h3 className="text-xl font-medium">Logistics and travel (including accommodation)</h3>
            <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-[#2A2A2A] list-disc pl-5">
              <li>
                The U.S. can be efficient if you structure remote consults and do on-site only when medically necessary.
              </li>
              <li>
                We include <strong>accommodation</strong> as part of execution: 2–3 vetted options near clinic access,
                chosen for comfort, predictability, and low friction.
              </li>
              <li>
                The goal is calm logistics during a high-stakes process — not “deal hunting.”
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
              <li>Price-table comparisons (we build a bounded cost map aligned to your plan).</li>
              <li>Generic success-rate claims without context (we evaluate fit, not marketing).</li>
            </ul>
            <ul className="space-y-3 text-[15px] leading-relaxed text-[#2A2A2A] list-disc pl-5">
              <li>DIY bureaucracy playbooks (we coordinate with trusted partners).</li>
              <li>Static numbers without verification (we prioritize accuracy and updates).</li>
              <li>One-size-fits-all pathways (your constraints define the plan).</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="rounded-2xl border border-[#E5DDC8] bg-[#FAF7F1] p-10 text-center">
          <h3 className="text-2xl font-medium">Private advisory, not a public database.</h3>
          <p className="mt-4 max-w-2xl mx-auto text-[15px] leading-relaxed text-[#2A2A2A]">
            If the U.S. is on your shortlist, the decisive step is aligning your complexity and pathway to the right
            center model, then mapping cost and logistics into a clean execution plan. We curate the shortlist and
            structure the route.
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
    <Link href="/countries/canada" className="border border-[#E5DDC8] p-6 rounded-xl hover:border-[#B89B5E] transition">
      <h3 className="text-lg font-medium">Canada</h3>
      <p className="text-sm text-[#6A6256] mt-2">Ethics-forward governance model with tight regulatory boundaries.</p>
    </Link>
    <Link href="/countries/united-kingdom" className="border border-[#E5DDC8] p-6 rounded-xl hover:border-[#B89B5E] transition">
      <h3 className="text-lg font-medium">United Kingdom</h3>
      <p className="text-sm text-[#6A6256] mt-2">Highly regulated environment prioritizing governance and oversight.</p>
    </Link>
    <Link href="/countries/spain" className="border border-[#E5DDC8] p-6 rounded-xl hover:border-[#B89B5E] transition">
      <h3 className="text-lg font-medium">Spain</h3>
      <p className="text-sm text-[#6A6256] mt-2">Established EU ecosystem often chosen for execution consistency.</p>
    </Link>
  </div>
</section>
    </main>
  );
}
