import CountryWebPageSchema from "../../components/CountryWebPageSchema";
import Breadcrumbs from "../../components/Breadcrumbs";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Greece IVF Regulations & Fertility Law 2026 | FertilityCareHub",
  description:
    "Structured analysis of IVF regulations, donor laws, surrogacy policy, and fertility access rules in Greece. Updated regulatory insights for intended parents.",
  alternates: {
    canonical: "https://fertilitycarehub.com/countries/greece",
  },
  openGraph: {
    title: "Greece IVF Regulations & Fertility Law 2026",
    description:
      "In-depth fertility law analysis covering IVF, donor gametes, surrogacy, and access regulations in Greece.",
    url: "https://fertilitycarehub.com/countries/greece",
    siteName: "FertilityCareHub",
    type: "article",
  },
};
export default function GreecePage() {
  return (
    <main className="min-h-screen bg-[#F5F1E8] text-[#1A1A1A]">
      <Breadcrumbs
  items={[
    { name: "Home", href: "/" },
    { name: "Countries", href: "/countries" },
    { name: "Greece", href: "/countries/greece" },
  ]}
/>
<CountryWebPageSchema
  countryName="Greece"
  countrySlug="greece"
  title="Greece: Fertility Jurisdiction Assessment"
  description="Strategic jurisdiction assessment and regulatory clarity for cross-border fertility care in Greece."
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
            Review Greece Strategy Privately
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
            Greece
          </h1>

          <p className="mt-6 max-w-3xl mx-auto text-lg leading-relaxed text-[#2A2A2A]">
            Greece is often the “quietly optimal” European option: comparatively accessible,
            typically cost-favorable versus Western Europe, and frequently strong for donor pathways.
            The advantage is not that Greece is permissive in every dimension — it’s that outcomes can
            be excellent when you select the right clinic model and align the pathway to your profile.
          </p>
        </div>
      </section>

      {/* Two-column decision block */}
      <section className="max-w-6xl mx-auto px-6 pb-10">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-[#E5DDC8] bg-[#FAF7F1] p-8">
            <h2 className="text-xl font-medium">When Greece is the right choice</h2>
            <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-[#2A2A2A] list-disc pl-5">
              <li>
                You want a European setting with <strong>strong value</strong> and a wide range of
                private-clinic options.
              </li>
              <li>
                Your pathway benefits from <strong>donor planning</strong>, and you want a clinic that
                runs donor workflows efficiently.
              </li>
              <li>
                You want <strong>shorter lead times</strong> relative to some higher-demand markets.
              </li>
              <li>
                You are comfortable with a <strong>private-pay environment</strong> and you want clarity on
                total cost structure upfront.
              </li>
              <li>
                You want a country where a “curated shortlist” of clinics (not a database) can deliver
                an excellent outcome with strong oversight.
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-[#E5DDC8] bg-[#FAF7F1] p-8">
            <h2 className="text-xl font-medium">When it’s not</h2>
            <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-[#2A2A2A] list-disc pl-5">
              <li>
                You require the most conservative, governance-heavy structure and public reporting norms
                as your primary filter.
              </li>
              <li>
                Your case is highly complex and needs a “top-of-stack” multidisciplinary center with very
                broad specialist depth (some clients prefer the US for this).
              </li>
              <li>
                You prefer a pathway where every administrative layer is standardized across the entire country;
                Greece can vary by clinic model.
              </li>
              <li>
                You want a fully DIY process — Greece works best with <strong>structured planning</strong> and
                clear vetting.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Framework */}
      <section className="max-w-6xl mx-auto px-6 pb-12">
        <div className="rounded-2xl border border-[#E5DDC8] bg-[#FAF7F1] p-8">
          <h2 className="text-2xl font-medium">Advisor framework: how to evaluate Greece</h2>

          <div className="mt-6 grid md:grid-cols-3 gap-6">
            <div>
              <div className="text-xs tracking-[0.25em] text-[#6A6256]">CLINIC MODEL</div>
              <p className="mt-3 text-[15px] leading-relaxed text-[#2A2A2A]">
                The biggest determinant is <strong>clinic selection</strong>: lab standards, physician cadence,
                donor coordination, and transparency norms. Greece rewards a curated shortlist.
              </p>
            </div>

            <div>
              <div className="text-xs tracking-[0.25em] text-[#6A6256]">PATHWAY FIT</div>
              <p className="mt-3 text-[15px] leading-relaxed text-[#2A2A2A]">
                Align donor needs, timeline tolerance, and travel cadence with a clinic’s workflow.
                When matched correctly, Greece can be both efficient and high-quality.
              </p>
            </div>

            <div>
              <div className="text-xs tracking-[0.25em] text-[#6A6256]">TRANSPARENCY</div>
              <p className="mt-3 text-[15px] leading-relaxed text-[#2A2A2A]">
                Insist on clarity: what’s included, what’s not, and how add-ons are priced.
                The goal is a <strong>clean cost map</strong>, not surprises.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core sections */}
      <section className="max-w-6xl mx-auto px-6 pb-12">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-[#E5DDC8] bg-[#FAF7F1] p-8">
            <h3 className="text-xl font-medium">Clinic standards and lab signals</h3>
            <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-[#2A2A2A] list-disc pl-5">
              <li>
                Prefer clinics with demonstrated <strong>lab leadership</strong> and consistent embryology staffing.
              </li>
              <li>
                Ask for an explicit process map: stimulation, monitoring, retrieval, lab, transfer, follow-up cadence.
              </li>
              <li>
                Confirm reporting clarity (even if not a public-reporting regime): success framing, denominators,
                and what “success” means per pathway.
              </li>
              <li>
                Prioritize mature donor coordination workflows if donor is central to your plan.
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-[#E5DDC8] bg-[#FAF7F1] p-8">
            <h3 className="text-xl font-medium">Cost structure (strategic view)</h3>
            <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-[#2A2A2A] list-disc pl-5">
              <li>
                Greece is often attractive because the “all-in” private pathway can be more predictable than
                Western Europe — <strong>if</strong> you confirm inclusions.
              </li>
              <li>
                Separate costs into: base cycle, lab add-ons, donor coordination, meds/monitoring, and travel cadence.
              </li>
              <li>
                Your goal is a <strong>bounded range</strong> you can commit to, not a theoretical minimum.
              </li>
            </ul>
            <p className="mt-5 text-sm text-[#6A6256]">
              Note: we keep numbers out of the public dossier unless verified and updated. In advisory, we provide
              a clean band and the decision logic behind it.
            </p>
          </div>

          <div className="rounded-2xl border border-[#E5DDC8] bg-[#FAF7F1] p-8">
            <h3 className="text-xl font-medium">Eligibility and governance notes</h3>
            <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-[#2A2A2A] list-disc pl-5">
              <li>
                Treat governance as a <strong>clinic + pathway</strong> question, not only a country question.
              </li>
              <li>
                Confirm what documentation is required, what can be coordinated remotely, and what must be done on-site.
              </li>
              <li>
                If your situation is sensitive (timing, privacy, donor pathway complexity), we structure the plan so you
                avoid avoidable friction.
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-[#E5DDC8] bg-[#FAF7F1] p-8">
            <h3 className="text-xl font-medium">Logistics and travel (including accommodation)</h3>
            <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-[#2A2A2A] list-disc pl-5">
              <li>
                Greece is typically travel-friendly; plan around monitoring cadence and transfer timing.
              </li>
              <li>
                We include <strong>accommodation</strong> as part of the plan: 2–3 vetted options near clinic access,
                chosen for predictability, comfort, and low friction.
              </li>
              <li>
                We avoid “hotel price comparison tables.” Instead: a small, reliable shortlist aligned to your travel style.
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
              <li>Exhaustive clinic lists (we curate a shortlist, not 300 options).</li>
              <li>DIY visa/playbook instructions (we provide trusted coordination, not bureaucracy).</li>
              <li>Public “database style” treatment encyclopedias (we focus on strategic decisions).</li>
            </ul>
            <ul className="space-y-3 text-[15px] leading-relaxed text-[#2A2A2A] list-disc pl-5">
              <li>Hotel price grids (we recommend 2–3 vetted options; the goal is smooth execution).</li>
              <li>Overly broad claims without verification (we prioritize accuracy and updated intel).</li>
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
            If Greece is on your shortlist, the decisive step is selecting the right clinic model and structuring the
            pathway around your profile. We’ll map the plan, vet the shortlist, and provide a clean execution route.
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
    <Link href="/countries/spain" className="border border-[#E5DDC8] p-6 rounded-xl hover:border-[#B89B5E] transition">
      <h3 className="text-lg font-medium">Spain</h3>
      <p className="text-sm text-[#6A6256] mt-2">Mature infrastructure with established donor pathways and clinic depth.</p>
    </Link>
    <Link href="/countries/portugal" className="border border-[#E5DDC8] p-6 rounded-xl hover:border-[#B89B5E] transition">
      <h3 className="text-lg font-medium">Portugal</h3>
      <p className="text-sm text-[#6A6256] mt-2">Modern environment with specific access and governance nuances.</p>
    </Link>
    <Link href="/countries/czech-republic" className="border border-[#E5DDC8] p-6 rounded-xl hover:border-[#B89B5E] transition">
      <h3 className="text-lg font-medium">Czech Republic</h3>
      <p className="text-sm text-[#6A6256] mt-2">Often evaluated for cost-efficiency and clinic density.</p>
    </Link>
  </div>
</section>
    </main>
  );
}
