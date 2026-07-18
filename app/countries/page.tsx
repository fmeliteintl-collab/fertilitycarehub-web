import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "../components/Breadcrumbs";

const baseUrl = "https://fertilitycarehub.com";
const pageUrl = `${baseUrl}/countries`;

export const metadata: Metadata = {
  title: "Fertility Treatment Countries and Jurisdiction Dossiers",
  description:
    "Explore FertilityCareHub country dossiers covering fertility regulation, donor pathways, clinical infrastructure, access, logistics, costs, and cross-border planning.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Fertility Treatment Countries and Jurisdiction Dossiers",
    description:
      "Explore structured fertility jurisdiction dossiers covering regulation, access, donor pathways, clinical infrastructure, logistics, costs, and execution risk.",
    url: pageUrl,
    siteName: "FertilityCareHub",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fertility Treatment Countries and Jurisdiction Dossiers",
    description:
      "Structured international fertility intelligence by country.",
  },
};

const countries = [
  {
    slug: "spain",
    name: "Spain",
    status: "Published",
    region: "Europe",
    oneLiner:
      "A mature European destination with established international-patient pathways and significant donor-treatment experience.",
    focus:
      "Donor access, clinic governance, eligibility, success-rate interpretation, costs, and travel execution.",
  },
  {
    slug: "greece",
    name: "Greece",
    status: "Published",
    region: "Europe",
    oneLiner:
      "A prominent European treatment destination where regulation, donor access, clinic quality, costs, and travel planning require careful comparison.",
    focus:
      "Eligibility, donor pathways, clinic selection, pricing transparency, timelines, and international coordination.",
  },
  {
    slug: "portugal",
    name: "Portugal",
    status: "Published",
    region: "Europe",
    oneLiner:
      "A regulated European option with growing international visibility, strong private care, and pathway-specific access considerations.",
    focus:
      "Regulatory fit, clinic capability, donor rules, documentation, cost exposure, and treatment logistics.",
  },
  {
    slug: "czech-republic",
    name: "Czech Republic",
    status: "Published",
    region: "Europe",
    oneLiner:
      "A well-established Central European destination where donor access, eligibility, clinic quality, costs, and logistics should be assessed together.",
    focus:
      "Eligibility, donor-treatment structure, laboratory governance, pricing, travel planning, and continuity of care.",
  },
  {
    slug: "united-kingdom",
    name: "United Kingdom",
    status: "Published",
    region: "Europe",
    oneLiner:
      "A highly regulated system shaped by HFEA oversight, NHS and private access, donor rules, waiting times, and transparent clinic reporting.",
    focus:
      "HFEA licensing, NHS eligibility, private treatment, donor pathways, waiting times, and total cost.",
  },
  {
    slug: "canada",
    name: "Canada",
    status: "Published",
    region: "North America",
    oneLiner:
      "A regulated, ethics-forward system where provincial access, clinic capacity, funding, and continuity of care shape the pathway.",
    focus:
      "Provincial funding, clinic access, donor restrictions, wait times, costs, and domestic continuity of care.",
  },
  {
    slug: "united-states",
    name: "United States",
    status: "Published",
    region: "North America",
    oneLiner:
      "A large and highly varied fertility market with broad specialist depth, higher costs, and important state-level considerations.",
    focus:
      "State-level law, specialist capability, donor and surrogacy pathways, clinic quality, insurance, and cost exposure.",
  },
  {
    slug: "india",
    name: "India",
    status: "Published",
    region: "Asia",
    oneLiner:
      "A large and diverse treatment market where regulation, clinic governance, costs, documentation, and execution discipline are decisive.",
    focus:
      "Eligibility, treatment restrictions, clinic vetting, laboratory standards, documentation, pricing, and travel execution.",
  },
  {
    slug: "turkey",
    name: "Turkey",
    status: "Published",
    region: "Europe and Asia",
    oneLiner:
      "A major private medical market where eligibility, clinic quality, treatment restrictions, costs, and travel execution must be confirmed carefully.",
    focus:
      "Legal treatment scope, patient eligibility, clinic governance, pricing, medications, travel, and follow-up.",
  },
  {
    slug: "mexico",
    name: "Mexico",
    status: "Published",
    region: "North America",
    oneLiner:
      "A geographically accessible treatment market where state-level variation, clinic governance, pricing, and continuity of care require close review.",
    focus:
      "State-level legal context, clinic standards, communication, costs, travel convenience, and post-treatment coordination.",
  },
  {
    slug: "china",
    name: "China",
    status: "Published",
    region: "Asia",
    oneLiner:
      "A tightly controlled fertility system where lawful treatment scope, patient eligibility, institutional access, documentation, and coordination come first.",
    focus:
      "Eligibility, institutional access, documentation, lawful treatment scope, governance, communication, and continuity.",
  },
];

const evaluationFactors = [
  {
    number: "01",
    title: "Regulation and eligibility",
    description:
      "Confirm what treatment is legally permitted, who is eligible, and which approvals, relationships, or documents are required.",
  },
  {
    number: "02",
    title: "Clinic and laboratory governance",
    description:
      "Assess licensing, medical leadership, embryology quality systems, inspection history, reporting, and continuity of responsibility.",
  },
  {
    number: "03",
    title: "Donor and family-building pathways",
    description:
      "Compare donor access, identity rules, consent, parenthood, surrogacy, storage, and pathway-specific restrictions.",
  },
  {
    number: "04",
    title: "Costs and financial exposure",
    description:
      "Separate treatment, medication, testing, laboratory services, storage, travel, legal work, and contingency costs.",
  },
  {
    number: "05",
    title: "Timeline and execution",
    description:
      "Evaluate waiting times, monitoring, medication, travel windows, communication, documentation, and follow-up.",
  },
  {
    number: "06",
    title: "Personal pathway fit",
    description:
      "Choose the jurisdiction aligned with your medical needs, legal status, donor requirements, timeline, budget, and tolerance for complexity.",
  },
];

const comparisonQuestions = [
  "Is the required treatment lawful and accessible for your personal circumstances?",
  "Does the country offer the donor, parenthood, or family-building pathway you need?",
  "Can the clinic demonstrate appropriate licensing, governance, laboratory capability, and transparent reporting?",
  "Are the quoted costs complete enough to estimate the full pathway rather than only the base cycle?",
  "Can monitoring, medication, travel, accommodation, procedures, recovery, and follow-up be coordinated safely?",
  "What happens if treatment is delayed, cancelled, unsuccessful, or requires another cycle?",
];

const collectionPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "FertilityCareHub Country Intelligence",
  description:
    "Structured fertility jurisdiction dossiers covering regulation, eligibility, donor pathways, clinical infrastructure, costs, logistics, documentation, and execution risk.",
  url: pageUrl,
  isPartOf: {
    "@type": "WebSite",
    name: "FertilityCareHub",
    url: baseUrl,
  },
  hasPart: countries.map((country) => ({
    "@type": "WebPage",
    name: `${country.name} Fertility Jurisdiction Dossier`,
    url: `${baseUrl}/countries/${country.slug}`,
    description: country.oneLiner,
  })),
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Published FertilityCareHub Country Dossiers",
  numberOfItems: countries.length,
  itemListElement: countries.map((country, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: country.name,
    url: `${baseUrl}/countries/${country.slug}`,
  })),
};

export default function CountriesPage() {
  return (
    <main className="min-h-screen bg-[#F5F1E8] text-[#1A1A1A]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionPageSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListSchema),
        }}
      />

      <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-6 sm:py-14 lg:px-8">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Countries", href: "/countries" },
          ]}
        />

        <section className="border-b border-[#E5DDC8] pb-12 pt-14 text-center sm:pb-16 sm:pt-20">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-[#7B6A3A]">
            FertilityCareHub Country Intelligence
          </p>

          <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.03em] sm:text-5xl lg:text-6xl">
            Global Fertility Jurisdiction Dossiers
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-[#5F584D] sm:text-lg">
            Explore structured country intelligence covering fertility
            regulation, eligibility, donor pathways, clinical infrastructure,
            clinic and laboratory governance, logistics, documentation, costs,
            and execution risk.
          </p>

          <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-[#6A6256]">
            These dossiers are designed as strategic planning resources rather
            than public clinic rankings, promotional destination lists, or
            substitutes for individualized medical and legal advice.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="#country-dossiers"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#1A1A1A] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#343434]"
            >
              Explore Country Dossiers
            </Link>

            <Link
              href="/how-to-compare-fertility-jurisdictions"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#B89B5E] px-6 py-3 text-sm font-medium text-[#1A1A1A] transition hover:bg-[#EEE5D2]"
            >
              Use the Comparison Framework
            </Link>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="grid gap-6 lg:grid-cols-2">
            <article className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-6 sm:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#7B6A3A]">
                Before choosing a destination
              </p>

              <h2 className="mt-3 text-2xl font-semibold">
                Compare countries before comparing clinics
              </h2>

              <p className="mt-4 text-sm leading-7 text-[#5F584D]">
                Use the strategic comparison framework to identify which
                jurisdictions fit your legal, medical, donor, financial,
                documentation, timeline, and logistical requirements before
                evaluating individual providers.
              </p>

              <p className="mt-4 text-sm leading-7 text-[#5F584D]">
                A strong clinic cannot solve a jurisdiction mismatch. Country
                fit should therefore be established before marketing claims,
                headline success rates, package prices, or travel convenience
                influence the decision.
              </p>

              <Link
                href="/how-to-compare-fertility-jurisdictions"
                className="mt-6 inline-block font-medium text-[#715F33] underline underline-offset-4"
              >
                Read the jurisdiction comparison guide →
              </Link>
            </article>

            <article className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-6 sm:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#7B6A3A]">
                Browse the knowledge library
              </p>

              <h2 className="mt-3 text-2xl font-semibold">
                Build decision quality with structured guides
              </h2>

              <p className="mt-4 text-sm leading-7 text-[#5F584D]">
                Explore planning guides covering clinic selection, success-rate
                interpretation, hidden costs, travel preparation, donor
                pathways, documentation, and cross-border decision risk.
              </p>

              <p className="mt-4 text-sm leading-7 text-[#5F584D]">
                Use the Guides Library alongside each country dossier to test
                assumptions, identify missing information, and prepare stronger
                questions for clinics and licensed professionals.
              </p>

              <Link
                href="/guides"
                className="mt-6 inline-block font-medium text-[#715F33] underline underline-offset-4"
              >
                Browse all fertility guides →
              </Link>
            </article>
          </div>
        </section>

        <section className="border-t border-[#E5DDC8] py-12 sm:py-16">
          <div className="rounded-2xl border border-[#D8C89F] bg-[#EEE5D2] p-6 sm:p-8">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#7B6A3A]">
              Independent methodology
            </p>

            <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">
              FCH Global Fertility Intelligence Framework
            </h2>

            <p className="mt-5 max-w-4xl text-sm leading-7 text-[#5F584D]">
              Country dossiers are developed using the FCH Global Fertility
              Intelligence Framework. Jurisdictions are considered across
              regulatory alignment, access, donor policy, clinical
              infrastructure, clinic and laboratory governance, coordination
              burden, documentation, cost exposure, and execution complexity.
            </p>

            <p className="mt-4 max-w-4xl text-sm leading-7 text-[#5F584D]">
              The objective is not to identify a universally best destination.
              It is to determine which jurisdiction is most aligned with a
              specific treatment pathway, personal profile, timeline, budget,
              legal position, and tolerance for operational risk.
            </p>

            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {evaluationFactors.map((factor) => (
                <article
                  key={factor.title}
                  className="rounded-2xl border border-[#D8C89F] bg-white/50 p-5"
                >
                  <p className="text-xs font-medium tracking-[0.14em] text-[#7B6A3A]">
                    {factor.number}
                  </p>

                  <h3 className="mt-3 text-lg font-semibold">{factor.title}</h3>

                  <p className="mt-3 text-sm leading-7 text-[#5F584D]">
                    {factor.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="country-dossiers"
          aria-labelledby="country-dossiers-heading"
          className="scroll-mt-24 border-t border-[#E5DDC8] py-12 sm:py-16"
        >
          <div className="max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#7B6A3A]">
              Eleven published dossiers
            </p>

            <h2
              id="country-dossiers-heading"
              className="mt-4 text-3xl font-semibold sm:text-4xl"
            >
              Explore Fertility Treatment Countries
            </h2>

            <p className="mt-5 leading-8 text-[#5F584D]">
              Begin with the countries most relevant to your pathway, then
              compare a focused shortlist rather than treating every
              destination as equally suitable.
            </p>

            <p className="mt-4 text-sm leading-7 text-[#6A6256]">
              Each dossier explains strategic fit, regulatory structure,
              eligibility, donor pathways, clinic assessment, cost planning,
              documentation, travel, and the circumstances in which another
              jurisdiction may be more appropriate.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {countries.map((country) => (
              <Link
                key={country.slug}
                href={`/countries/${country.slug}`}
                aria-label={`View the ${country.name} fertility jurisdiction dossier`}
                className="group flex h-full flex-col rounded-2xl border border-[#E5DDC8] bg-white/60 p-6 transition hover:border-[#B89B5E] hover:bg-white"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold">{country.name}</h3>

                    <p className="mt-2 text-xs font-medium uppercase tracking-[0.13em] text-[#7B6A3A]">
                      {country.region}
                    </p>
                  </div>

                  <span className="rounded-full border border-[#D8C89F] bg-[#EEE5D2] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-[#6F5E31]">
                    {country.status}
                  </span>
                </div>

                <p className="mt-4 text-xs font-medium uppercase tracking-[0.14em] text-[#7B6A3A]">
                  Strategic advisory dossier
                </p>

                <p className="mt-4 text-sm leading-7 text-[#625A4C]">
                  {country.oneLiner}
                </p>

                <div className="mt-5 border-t border-[#E5DDC8] pt-4">
                  <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#7B6A3A]">
                    Assessment focus
                  </p>

                  <p className="mt-2 text-sm leading-7 text-[#625A4C]">
                    {country.focus}
                  </p>
                </div>

                <span className="mt-6 font-medium text-[#715F33] underline-offset-4 group-hover:underline">
                  View dossier →
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="border-t border-[#E5DDC8] py-12 sm:py-16">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#7B6A3A]">
                Shortlist discipline
              </p>

              <h2 className="mt-4 text-3xl font-semibold">
                Questions every country comparison should answer
              </h2>

              <p className="mt-5 leading-8 text-[#5F584D]">
                Destination decisions become more reliable when each country is
                tested against the same legal, medical, financial, and
                operational questions.
              </p>
            </div>

            <div className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-6 sm:p-8">
              <ol className="space-y-5">
                {comparisonQuestions.map((question, index) => (
                  <li key={question} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#D8C89F] bg-[#EEE5D2] text-xs font-semibold text-[#6F5E31]">
                      {index + 1}
                    </span>

                    <p className="pt-1 text-sm leading-7 text-[#5F584D]">
                      {question}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="border-t border-[#E5DDC8] py-12 sm:py-16">
          <div className="grid gap-6 lg:grid-cols-2">
            <article className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-6 sm:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#7B6A3A]">
                Compare jurisdictions
              </p>

              <h2 className="mt-3 text-2xl font-semibold">
                Review country-to-country differences directly
              </h2>

              <p className="mt-4 text-sm leading-7 text-[#5F584D]">
                Review available country comparisons and evaluate regulatory,
                donor, clinical, financial, timeline, documentation, and
                logistical differences across shortlisted jurisdictions.
              </p>

              <p className="mt-4 text-sm leading-7 text-[#5F584D]">
                Comparison briefs help reveal trade-offs that are difficult to
                see when destinations are researched separately.
              </p>

              <Link
                href="/compare"
                className="mt-6 inline-block font-medium text-[#715F33] underline underline-offset-4"
              >
                View jurisdiction comparisons →
              </Link>
            </article>

            <article className="rounded-2xl bg-[#1A1A1A] p-6 text-white sm:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#D4BE82]">
                Private advisory
              </p>

              <h2 className="mt-3 text-2xl font-semibold">
                Need help identifying the right jurisdiction path?
              </h2>

              <p className="mt-4 text-sm leading-7 text-[#D4D0C8]">
                FertilityCareHub can structure the jurisdiction decision around
                your treatment profile, priorities, legal position, donor
                needs, timeline, budget, travel capacity, documentation, and
                tolerance for complexity.
              </p>

              <p className="mt-4 text-sm leading-7 text-[#D4D0C8]">
                Advisory is selective and decision-focused. It is not a public
                clinic directory, paid ranking system, or substitute for
                licensed professional advice.
              </p>

              <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row">
                <Link
                  href="/advisory"
                  className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#B89B5E] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#A88B50]"
                >
                  View Advisory Tiers
                </Link>

                <Link
                  href="/consultation"
                  className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#D4BE82] px-5 py-3 text-sm font-medium text-[#F2E4BC] transition hover:bg-[#2D2D2D]"
                >
                  Request Client Intake
                </Link>
              </div>
            </article>
          </div>
        </section>

        <section className="border-t border-[#E5DDC8] py-12 sm:py-16">
          <div className="rounded-2xl border border-[#D8C89F] bg-[#EEE5D2] p-6 sm:p-8">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#7B6A3A]">
              Important planning note
            </p>

            <h2 className="mt-4 text-2xl font-semibold">
              Country rules and clinic practices can change
            </h2>

            <p className="mt-5 max-w-4xl text-sm leading-7 text-[#5F584D]">
              Laws, eligibility criteria, donor availability, NHS or public
              funding, clinic policies, waiting times, documentation
              requirements, treatment prices, and clinical practices may
              change. Information should always be verified directly with
              appropriately licensed clinics, medical professionals, lawyers,
              and relevant regulatory bodies before treatment or travel is
              arranged.
            </p>
          </div>
        </section>

        <section className="border-t border-[#E5DDC8] py-10">
          <p className="mx-auto max-w-4xl text-center text-sm leading-7 text-[#6A6256]">
            FertilityCareHub provides general educational and strategic
            planning information. It does not provide medical, legal,
            financial, immigration, or regulatory advice. No country, clinic,
            treatment, donor pathway, or outcome is guaranteed. All material
            decisions should be independently confirmed with appropriately
            licensed professionals.
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
