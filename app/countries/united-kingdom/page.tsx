import CountryWebPageSchema from "../../components/CountryWebPageSchema";
import Breadcrumbs from "../../components/Breadcrumbs";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "United Kingdom IVF Regulations & Fertility Law 2026 | FertilityCareHub",
  description:
    "Structured analysis of IVF regulations, donor laws, surrogacy policy, and fertility access rules in the United Kingdom. Updated regulatory insights for intended parents.",
  alternates: {
    canonical: "https://fertilitycarehub.com/countries/united-kingdom",
  },
  openGraph: {
    title: "United Kingdom IVF Regulations & Fertility Law 2026",
    description:
      "In-depth fertility law analysis covering IVF, donor gametes, surrogacy, and access regulations in the United Kingdom.",
    url: "https://fertilitycarehub.com/countries/united-kingdom",
    siteName: "FertilityCareHub",
    type: "article",
  },
};
export default function UnitedKingdomPage() {
  return (
    <main className="min-h-screen bg-[#F5F1E8] text-[#1A1A1A]">
      <Breadcrumbs
  items={[
    { name: "Home", href: "/" },
    { name: "Countries", href: "/countries" },
    { name: "United Kingdom", href: "/countries/united-kingdom" },
  ]}
/>
<CountryWebPageSchema
  countryName="United Kingdom"
  countrySlug="united-kingdom"
  title="United Kingdom: Fertility Jurisdiction Assessment"
  description="Strategic jurisdiction assessment and regulatory clarity for fertility care under the UK's regulatory framework."
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
            Review United Kingdom Strategy Privately
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
            United Kingdom
          </h1>

          <p className="mt-6 max-w-3xl mx-auto text-lg leading-relaxed text-[#2A2A2A]">
            The United Kingdom is governance-forward and highly regulated under the HFEA framework.
            The strategic advantage is clarity — licensing, donor rules, and structured reporting.
            This market works best when oversight and regulatory transparency are your primary decision variables.
            This dossier explains when the UK is the right strategic fit — and when it may not be.
          </p>
        </div>
      </section>

      {/* Two-column decision block */}
      <section className="max-w-6xl mx-auto px-6 pb-10">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-[#E5DDC8] bg-[#FAF7F1] p-8">
            <h2 className="text-xl font-medium">When the UK is the right choice</h2>
            <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-[#2A2A2A] list-disc pl-5">
              <li>
                You value <strong>strong regulatory oversight</strong> and transparent reporting structures.
              </li>
              <li>
                Governance and ethical framework are central to your decision model.
              </li>
              <li>
                You want a market with clearly defined donor and licensing rules.
              </li>
              <li>
                You prefer operating within a tightly regulated national system rather than a variable private market.
              </li>
              <li>
                You want predictability in documentation and compliance processes.
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-[#E5DDC8] bg-[#FAF7F1] p-8">
            <h2 className="text-xl font-medium">When it’s not</h2>
            <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-[#2A2A2A] list-disc pl-5">
              <li>
                You are optimizing primarily for lowest cost.
              </li>
              <li>
                You want highly flexible donor or pathway structures beyond UK regulatory scope.
              </li>
              <li>
                You require rapid scheduling without waiting periods.
              </li>
              <li>
                You prefer a market with broader commercial variability.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Framework */}
      <section className="max-w-6xl mx-auto px-6 pb-12">
        <div className="rounded-2xl border border-[#E5DDC8] bg-[#FAF7F1] p-8">
          <h2 className="text-2xl font-medium">Advisor framework: how to evaluate the UK</h2>

          <div className="mt-6 grid md:grid-cols-3 gap-6">
            <div>
              <div className="text-xs tracking-[0.25em] text-[#6A6256]">REGULATION</div>
              <p className="mt-3 text-[15px] leading-relaxed text-[#2A2A2A]">
                The UK’s HFEA structure creates transparency. The strategic question is whether
                that structure aligns with your specific pathway and flexibility needs.
              </p>
            </div>

            <div>
              <div className="text-xs tracking-[0.25em] text-[#6A6256]">CLINIC MODEL</div>
              <p className="mt-3 text-[15px] leading-relaxed text-[#2A2A2A]">
                We evaluate clinics based on operational discipline, lab quality, and communication cadence —
                not marketing reputation alone.
              </p>
            </div>

            <div>
              <div className="text-xs tracking-[0.25em] text-[#6A6256]">PATHWAY FIT</div>
              <p className="mt-3 text-[15px] leading-relaxed text-[#2A2A2A]">
                The UK works best when your pathway aligns cleanly with regulatory and donor constraints.
                Fit is more important than headline success metrics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core sections */}
      <section className="max-w-6xl mx-auto px-6 pb-12">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-[#E5DDC8] bg-[#FAF7F1] p-8">
            <h3 className="text-xl font-medium">Governance and legal clarity</h3>
            <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-[#2A2A2A] list-disc pl-5">
              <li>
                The UK’s regulatory oversight reduces ambiguity.
              </li>
              <li>
                Documentation and licensing are structured and transparent.
              </li>
              <li>
                Governance strength can reduce long-term uncertainty in certain pathways.
              </li>
            </ul>
            <p className="mt-5 text-sm text-[#6A6256]">
              Note: Specific pathway implications depend on individual circumstances.
            </p>
          </div>

          <div className="rounded-2xl border border-[#E5DDC8] bg-[#FAF7F1] p-8">
            <h3 className="text-xl font-medium">Cost structure (strategic view)</h3>
            <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-[#2A2A2A] list-disc pl-5">
              <li>
                The UK is typically a mid-to-premium cost market within Europe.
              </li>
              <li>
                Costs should be evaluated as a full pathway: base cycle, lab add-ons, medications, and logistics.
              </li>
              <li>
                We provide bounded ranges within advisory, not public price lists.
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-[#E5DDC8] bg-[#FAF7F1] p-8">
            <h3 className="text-xl font-medium">Logistics and travel (including accommodation)</h3>
            <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-[#2A2A2A] list-disc pl-5">
              <li>
                International coordination is straightforward but requires structured planning.
              </li>
              <li>
                We include <strong>accommodation</strong> recommendations near clinic access —
                typically 2–3 vetted options focused on comfort and predictability.
              </li>
              <li>
                The goal is minimal friction during a medically and emotionally significant process.
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-[#E5DDC8] bg-[#FAF7F1] p-8">
            <h3 className="text-xl font-medium">Clinic selection approach</h3>
            <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-[#2A2A2A] list-disc pl-5">
              <li>
                We shortlist selectively (typically 4–5), not exhaustively.
              </li>
              <li>
                We prioritize operational discipline and lab capability.
              </li>
              <li>
                Decision support is structured around your personal constraints and jurisdiction.
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
              <li>Exhaustive clinic directories.</li>
              <li>Generic marketing claims without fit analysis.</li>
              <li>DIY regulatory navigation instructions.</li>
            </ul>
            <ul className="space-y-3 text-[15px] leading-relaxed text-[#2A2A2A] list-disc pl-5">
              <li>Hotel comparison grids.</li>
              <li>Static pricing tables without verification.</li>
              <li>One-size-fits-all pathway templates.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="rounded-2xl border border-[#E5DDC8] bg-[#FAF7F1] p-10 text-center">
          <h3 className="text-2xl font-medium">Private advisory, not a public database.</h3>
          <p className="mt-4 max-w-2xl mx-auto text-[15px] leading-relaxed text-[#2A2A2A]">
            If the United Kingdom is on your shortlist, the decisive step is verifying pathway fit
            and clinic alignment within its regulatory structure. We curate, structure, and guide the execution.
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
      <section className="mt-16 border-t border-[#E5DDC8] pt-10">
  <h2 className="text-2xl font-semibold mb-6">Compare Other Jurisdictions</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <Link href="/countries/canada" className="border border-[#E5DDC8] p-6 rounded-xl hover:border-[#B89B5E] transition">
      <h3 className="text-lg font-medium">Canada</h3>
      <p className="text-sm text-[#6A6256] mt-2">Ethics-forward governance model with tight regulatory boundaries.</p>
    </Link>
    <Link href="/countries/united-states" className="border border-[#E5DDC8] p-6 rounded-xl hover:border-[#B89B5E] transition">
      <h3 className="text-lg font-medium">United States</h3>
      <p className="text-sm text-[#6A6256] mt-2">Premium breadth and capability for complex or high-structure cases.</p>
    </Link>
    <Link href="/countries/spain" className="border border-[#E5DDC8] p-6 rounded-xl hover:border-[#B89B5E] transition">
      <h3 className="text-lg font-medium">Spain</h3>
      <p className="text-sm text-[#6A6256] mt-2">Mature EU clinic ecosystem with predictable execution and donor depth.</p>
    </Link>
  </div>
</section>
    </main>
  );
}
