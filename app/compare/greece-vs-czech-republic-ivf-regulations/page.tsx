import type { Metadata } from "next";
import Link from "next/link";

const baseUrl = "https://fertilitycarehub.com";
const pageUrl = `${baseUrl}/compare/greece-vs-czech-republic-ivf-regulations`;

export const metadata: Metadata = {
  title:
    "Greece vs Czech Republic IVF Regulations (2026) | FertilityCareHub",
  description:
    "Compare Greece and the Czech Republic across fertility regulation, donor pathways, clinic operations, cost structure, logistics, documentation, and execution risk.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title:
      "Greece vs Czech Republic IVF Regulations (2026) | FertilityCareHub",
    description:
      "A structured cross-border fertility comparison covering governance, donor pathways, clinic operations, logistics, and execution complexity.",
    url: pageUrl,
    siteName: "FertilityCareHub",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Greece vs Czech Republic IVF Regulations (2026) | FertilityCareHub",
    description:
      "Compare Greece and the Czech Republic for cross-border fertility planning.",
  },
};

const comparisonRows = [
  {
    factor: "Strategic positioning",
    greece:
      "Often evaluated for donor-pathway strength, private-clinic choice, cost value, and potentially shorter lead times.",
    czechRepublic:
      "Often evaluated for disciplined clinic operations, predictable coordination, and lower logistical ambiguity.",
  },
  {
    factor: "Clinic selection",
    greece:
      "Clinic model and pathway fit are central because operating style and coordination quality can vary by provider.",
    czechRepublic:
      "A structured shortlist remains important, with emphasis on stable laboratory teams, written plans, and consistent protocols.",
  },
  {
    factor: "Donor pathways",
    greece:
      "Frequently considered where donor-assisted treatment is a major part of the intended pathway.",
    czechRepublic:
      "Can support donor-assisted planning, but pathway constraints and documentation should be confirmed before treatment.",
  },
  {
    factor: "Cost structure",
    greece:
      "Can offer attractive private-pay value when inclusions, add-ons, medications, and travel are mapped in advance.",
    czechRepublic:
      "Often presents a value-structured pathway when full-cycle costs and operational quality are assessed together.",
  },
  {
    factor: "Logistics",
    greece:
      "Travel can be manageable, but monitoring cadence, transfer timing, and clinic-specific coordination should be planned carefully.",
    czechRepublic:
      "Central European logistics can be comparatively predictable when records, monitoring, travel windows, and follow-up are organized early.",
  },
  {
    factor: "Execution risk",
    greece:
      "Execution risk is reduced through careful clinic vetting, transparent pricing, and confirmation of pathway-specific requirements.",
    czechRepublic:
      "Execution risk is reduced through operational discipline, documentation readiness, and clearly assigned international-patient coordination.",
  },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Greece vs Czech Republic IVF Regulations (2026)",
  description:
    "A structured fertility jurisdiction comparison covering governance, donor pathways, clinic operations, costs, logistics, documentation, and execution risk.",
  mainEntityOfPage: pageUrl,
  publisher: {
    "@type": "Organization",
    name: "FertilityCareHub",
    url: baseUrl,
  },
  about: [
    {
      "@type": "Country",
      name: "Greece",
    },
    {
      "@type": "Country",
      name: "Czech Republic",
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: baseUrl,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Compare",
      item: `${baseUrl}/compare`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Greece vs Czech Republic IVF Regulations",
      item: pageUrl,
    },
  ],
};

export default function GreeceVsCzechRepublicPage() {
  return (
    <main className="min-h-screen bg-[#F5F1E8] text-[#1A1A1A]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-6 sm:py-14 lg:px-8">
        <nav aria-label="Breadcrumb" className="text-sm text-[#6A6256]">
          <Link href="/" className="underline underline-offset-4">
            Home
          </Link>

          <span className="mx-2" aria-hidden="true">
            /
          </span>

          <Link href="/compare" className="underline underline-offset-4">
            Compare
          </Link>

          <span className="mx-2" aria-hidden="true">
            /
          </span>

          <span aria-current="page">Greece vs Czech Republic</span>
        </nav>

        <section className="border-b border-[#E5DDC8] pb-12 pt-10 text-center sm:pb-16 sm:pt-14">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#7B6A3A]">
            FertilityCareHub comparison brief
          </p>

          <h1 className="mx-auto mt-4 max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.03em] sm:text-5xl lg:text-6xl">
            Greece vs Czech Republic IVF Regulations
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-[#5F584D] sm:text-lg">
            A structured comparison of two established European fertility
            destinations across pathway fit, donor planning, clinic operations,
            cost structure, logistics, documentation, and execution risk.
          </p>

          <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-[#6A6256]">
            This brief does not rank either jurisdiction. Suitability depends on
            the patient profile, intended treatment pathway, eligibility,
            documentation, medical complexity, budget, timeline, and legal
            circumstances.
          </p>
        </section>

        <section className="py-12 sm:py-16">
          <div className="grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-6 sm:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#7B6A3A]">
                Greece
              </p>

              <h2 className="mt-4 text-2xl font-semibold">
                Flexible private-clinic market with strong pathway potential
              </h2>

              <p className="mt-5 leading-8 text-[#5F584D]">
                Greece is often considered for its combination of private-clinic
                choice, donor-pathway experience, cost value, and potentially
                efficient treatment planning. The principal decision variable is
                frequently the clinic model: laboratory standards, donor
                coordination, physician access, transparency, and international
                patient support should be assessed carefully.
              </p>

              <Link
                href="/countries/greece"
                className="mt-6 inline-block font-medium text-[#715F33] underline underline-offset-4"
              >
                Read the Greece dossier →
              </Link>
            </article>

            <article className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-6 sm:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#7B6A3A]">
                Czech Republic
              </p>

              <h2 className="mt-4 text-2xl font-semibold">
                Operationally structured market with predictable coordination
              </h2>

              <p className="mt-5 leading-8 text-[#5F584D]">
                The Czech Republic is often considered for mature cross-border
                clinic operations, organized international-patient workflows,
                disciplined planning, and comparatively predictable logistics.
                The strongest pathways are usually those supported by complete
                records, clear timelines, transparent inclusions, and defined
                follow-up responsibilities.
              </p>

              <Link
                href="/countries/czech-republic"
                className="mt-6 inline-block font-medium text-[#715F33] underline underline-offset-4"
              >
                Read the Czech Republic dossier →
              </Link>
            </article>
          </div>
        </section>

        <section className="border-t border-[#E5DDC8] py-12 sm:py-16">
          <div className="max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#7B6A3A]">
              Decision framework
            </p>

            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              Side-by-side structural comparison
            </h2>

            <p className="mt-5 leading-8 text-[#5F584D]">
              These factors are intended to help identify the questions that
              require confirmation before clinic-level selection begins.
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-[#E5DDC8] bg-white/60">
            <div className="hidden grid-cols-[0.7fr_1fr_1fr] border-b border-[#E5DDC8] bg-[#EEE5D2] px-6 py-4 text-sm font-semibold md:grid">
              <div>Factor</div>
              <div>Greece</div>
              <div>Czech Republic</div>
            </div>

            {comparisonRows.map((row) => (
              <div
                key={row.factor}
                className="grid gap-4 border-b border-[#E5DDC8] px-6 py-6 last:border-b-0 md:grid-cols-[0.7fr_1fr_1fr]"
              >
                <h3 className="font-semibold">{row.factor}</h3>

                <div>
                  <p className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-[#7B6A3A] md:hidden">
                    Greece
                  </p>
                  <p className="text-sm leading-7 text-[#625A4C]">
                    {row.greece}
                  </p>
                </div>

                <div>
                  <p className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-[#7B6A3A] md:hidden">
                    Czech Republic
                  </p>
                  <p className="text-sm leading-7 text-[#625A4C]">
                    {row.czechRepublic}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-[#E5DDC8] py-12 sm:py-16">
          <div className="grid gap-6 lg:grid-cols-2">
            <article className="rounded-2xl border border-[#D8C89F] bg-[#EEE5D2] p-6 sm:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#7B6A3A]">
                Greece may deserve closer review when
              </p>

              <ul className="mt-5 space-y-3 text-sm leading-7 text-[#5F584D]">
                <li>
                  Donor-assisted treatment is central to the intended pathway.
                </li>
                <li>
                  Private-clinic choice and shorter lead-time potential are
                  important.
                </li>
                <li>
                  Cost value matters, provided the complete pathway is priced
                  transparently.
                </li>
                <li>
                  The patient is comfortable conducting detailed clinic-level
                  due diligence.
                </li>
              </ul>
            </article>

            <article className="rounded-2xl border border-[#D8C89F] bg-[#EEE5D2] p-6 sm:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#7B6A3A]">
                Czech Republic may deserve closer review when
              </p>

              <ul className="mt-5 space-y-3 text-sm leading-7 text-[#5F584D]">
                <li>
                  Operational predictability and organized coordination are
                  primary decision factors.
                </li>
                <li>
                  The patient values documented timelines and clearly assigned
                  responsibilities.
                </li>
                <li>
                  Central European travel logistics align well with the intended
                  treatment plan.
                </li>
                <li>
                  Cost and execution quality are being assessed together rather
                  than through headline pricing alone.
                </li>
              </ul>
            </article>
          </div>
        </section>

        <section className="border-t border-[#E5DDC8] py-12 sm:py-16">
          <div className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-6 sm:p-8">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#7B6A3A]">
              Questions to confirm before deciding
            </p>

            <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">
              Move from country preference to pathway verification
            </h2>

            <div className="mt-7 grid gap-4 md:grid-cols-2">
              {[
                "Is the intended treatment pathway permitted and available for the patient profile?",
                "What identity, relationship, consent, and medical documents are required?",
                "How are donor matching, screening, waiting times, and replacement policies structured?",
                "Which monitoring steps can be completed at home, and which require travel?",
                "What is included in the quoted cycle price, and which items remain variable?",
                "Who coordinates the case before treatment, during travel, and after the procedure?",
              ].map((question) => (
                <div
                  key={question}
                  className="rounded-xl border border-[#E5DDC8] bg-[#FAF7F1] p-5 text-sm leading-7 text-[#5F584D]"
                >
                  {question}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[#E5DDC8] py-12 sm:py-16">
          <div className="grid gap-5 md:grid-cols-3">
            <Link
              href="/compare/spain-vs-greece-ivf-regulations"
              className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-6 transition hover:border-[#B89B5E] hover:bg-white"
            >
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#7B6A3A]">
                Related comparison
              </p>
              <h3 className="mt-3 text-xl font-semibold">
                Spain vs Greece
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#625A4C]">
                Compare two established Southern European fertility markets.
              </p>
            </Link>

            <Link
              href="/compare/spain-vs-czech-republic-ivf-regulations"
              className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-6 transition hover:border-[#B89B5E] hover:bg-white"
            >
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#7B6A3A]">
                Related comparison
              </p>
              <h3 className="mt-3 text-xl font-semibold">
                Spain vs Czech Republic
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#625A4C]">
                Compare mature clinic depth with structured Central European
                operations.
              </p>
            </Link>

            <Link
              href="/how-to-compare-fertility-jurisdictions"
              className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-6 transition hover:border-[#B89B5E] hover:bg-white"
            >
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#7B6A3A]">
                Planning framework
              </p>
              <h3 className="mt-3 text-xl font-semibold">
                How to Compare Jurisdictions
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#625A4C]">
                Use a structured method before narrowing your clinic shortlist.
              </p>
            </Link>
          </div>
        </section>

        <section className="border-t border-[#E5DDC8] py-12 sm:py-16">
          <div className="rounded-2xl bg-[#1A1A1A] px-6 py-10 text-center text-white sm:px-10 sm:py-14">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#D4BE82]">
              Private strategic advisory
            </p>

            <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-semibold sm:text-4xl">
              Compare both jurisdictions against your actual pathway
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-8 text-[#D4D0C8]">
              FertilityCareHub can structure a focused comparison around
              treatment needs, donor requirements, eligibility, timeline,
              documentation, cost exposure, travel, and execution risk.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/advisory"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#B89B5E] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#A88B50]"
              >
                View Advisory Tiers
              </Link>

              <Link
                href="/consultation"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#D4BE82] px-6 py-3 text-sm font-medium text-[#F2E4BC] transition hover:bg-[#2D2D2D]"
              >
                Request Client Intake
              </Link>
            </div>
          </div>
        </section>

        <section className="border-t border-[#E5DDC8] py-10">
          <p className="mx-auto max-w-4xl text-center text-sm leading-7 text-[#6A6256]">
            This comparison provides general strategic and educational
            information only. It does not constitute medical, legal, or
            financial advice. Regulations, eligibility rules, clinic policies,
            donor availability, treatment costs, and operational requirements
            may change and should be independently confirmed.
          </p>

          <div className="mt-4 text-center">
            <Link
              href="/disclaimer"
              className="font-medium text-[#715F33] underline underline-offset-4"
            >
              Read the full disclaimer
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
