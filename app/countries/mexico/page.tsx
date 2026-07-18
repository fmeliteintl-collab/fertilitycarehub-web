import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "../../components/Breadcrumbs";
import CountryWebPageSchema from "../../components/CountryWebPageSchema";
import FAQSchema from "../../components/FAQSchema";

const baseUrl = "https://fertilitycarehub.com";
const pageUrl = `${baseUrl}/countries/mexico`;

export const metadata: Metadata = {
  title: "Mexico IVF Regulations & Fertility Strategy 2026 | FertilityCareHub",
  description:
    "Structured analysis of fertility regulation, clinic standards, costs, travel planning, documentation, and cross-border treatment strategy in Mexico.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Mexico IVF Regulations & Fertility Strategy 2026",
    description:
      "Strategic fertility-jurisdiction analysis covering clinic standards, costs, logistics, documentation, and cross-border planning in Mexico.",
    url: pageUrl,
    siteName: "FertilityCareHub",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mexico IVF Regulations & Fertility Strategy 2026",
    description:
      "Structured fertility-jurisdiction analysis for cross-border treatment planning in Mexico.",
  },
};

const faqs = [
  {
    question:
      "Why do international patients consider Mexico for fertility treatment?",
    answer:
      "Mexico is often considered for its proximity to Canada and the United States, broad private-clinic market, international-patient experience, and potentially competitive overall costs. Suitability depends on the patient’s medical needs, clinic governance, regulatory context, documentation, budget, timeline, and continuity-of-care requirements.",
  },
  {
    question:
      "Does FertilityCareHub recommend specific fertility clinics in Mexico?",
    answer:
      "FertilityCareHub does not publish public best-clinic rankings or paid promotional lists. Private advisory may include a curated shortlist based on licensing, medical leadership, laboratory governance, communication, transparency, international-patient coordination, and pathway fit.",
  },
  {
    question:
      "How should fertility-clinic success rates in Mexico be evaluated?",
    answer:
      "Success rates should be reviewed by treatment type, age group, patient population, donor use where relevant, denominator, reporting period, and outcome endpoint. Patients should distinguish pregnancy rates from live-birth rates and confirm whether results are reported per cycle started, retrieval, transfer, or cumulative pathway.",
  },
  {
    question:
      "What costs should be considered beyond a Mexican clinic package price?",
    answer:
      "A complete estimate should include medication, preliminary testing, monitoring, laboratory procedures, donor services where applicable, freezing, storage, embryo transfer, additional consultations, travel, accommodation, local transportation, cancellation exposure, and possible repeat treatment.",
  },
  {
    question:
      "Can treatment in Mexico reduce the number of required trips?",
    answer:
      "Some clinics may support remote consultations, external monitoring, and compressed treatment travel, but the actual number and timing of trips depend on the protocol, medication response, procedure schedule, clinic policy, and follow-up needs. These details should be confirmed before travel is booked.",
  },
];

const relatedGuides = [
  {
    title: "How to Compare Fertility Jurisdictions Strategically",
    href: "/how-to-compare-fertility-jurisdictions",
    description:
      "Compare regulation, eligibility, governance, costs, logistics, documentation, and execution risk.",
  },
  {
    title: "How to Choose a Fertility Clinic Abroad",
    href: "/how-to-choose-a-fertility-clinic-abroad",
    description:
      "Evaluate licensing, laboratory governance, transparency, communication, costs, and continuity of care.",
  },
  {
    title: "Understanding Fertility Clinic Success Rates",
    href: "/understanding-fertility-clinic-success-rates",
    description:
      "Interpret pregnancy, live-birth, per-cycle, per-transfer, cumulative, age-specific, and donor-treatment reporting.",
  },
  {
    title: "Fertility Treatment Travel Checklist",
    href: "/fertility-treatment-travel-checklist",
    description:
      "Prepare records, medication, travel windows, accommodation, emergency contacts, and follow-up arrangements.",
  },
];

const relatedCountries = [
  {
    title: "United States",
    href: "/countries/united-states",
    description:
      "A large and highly varied fertility market with substantial specialist depth, higher costs, and important state-level considerations.",
  },
  {
    title: "Canada",
    href: "/countries/canada",
    description:
      "A governance-forward system where provincial access, clinic capacity, costs, and treatment timelines require careful review.",
  },
  {
    title: "Turkey",
    href: "/countries/turkey",
    description:
      "A major international medical destination where eligibility, institution quality, costs, and coordinated travel are central.",
  },
];

export default function MexicoDossierPage() {
  return (
    <main className="min-h-screen bg-[#F5F1E8] text-[#1A1A1A]">
      <CountryWebPageSchema
        countryName="Mexico"
        countrySlug="mexico"
        title="Mexico: Fertility Jurisdiction Assessment"
        description="Strategic jurisdiction assessment covering fertility regulation, clinic standards, costs, logistics, documentation, and cross-border planning in Mexico."
      />

      <FAQSchema id="faq-mexico" items={faqs} />

      <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-6 sm:py-14 lg:px-8">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Countries", href: "/countries" },
            { name: "Mexico", href: "/countries/mexico" },
          ]}
        />

        <section className="flex flex-col gap-4 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/countries"
            className="text-sm tracking-wide text-[#6A6256] transition hover:text-[#1A1A1A]"
          >
            ← Back to countries
          </Link>

          <Link
            href="/consultation"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#B89B5E] px-5 py-3 text-sm font-medium tracking-wide text-[#1A1A1A] transition hover:bg-[#EEE5D2]"
          >
            Review Mexico Strategy Privately
          </Link>
        </section>

        <section className="border-b border-[#E5DDC8] pb-12 pt-14 text-center sm:pb-16 sm:pt-20">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-[#7B6A3A]">
            Strategic Advisory Dossier
          </p>

          <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.03em] sm:text-5xl lg:text-6xl">
            Mexico Fertility Jurisdiction Assessment
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-[#5F584D] sm:text-lg">
            Mexico can offer practical proximity, a broad private-clinic
            market, and potentially attractive treatment costs for North
            American patients. Its strategic value depends on disciplined
            clinic vetting and a pathway that aligns clinical quality,
            documentation, pricing, travel, communication, and follow-up.
          </p>
        </section>

        <section className="py-12 sm:py-16">
          <div className="grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-6 sm:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#7B6A3A]">
                Strategic alignment
              </p>

              <h2 className="mt-3 text-2xl font-semibold">
                When Mexico may be a strong fit
              </h2>

              <ul className="mt-5 space-y-3 pl-5 text-[15px] leading-7 text-[#5F584D] marker:text-[#B89B5E]">
                <li>
                  Proximity to Canada or the United States meaningfully reduces
                  travel burden.
                </li>
                <li>
                  You want to compare private treatment options across several
                  established medical centres.
                </li>
                <li>
                  You value remote coordination and potentially compressed
                  treatment travel.
                </li>
                <li>
                  You are prepared to evaluate laboratory quality,
                  communication, governance, and total cost carefully.
                </li>
                <li>
                  You can arrange local monitoring and post-treatment follow-up
                  before committing.
                </li>
              </ul>
            </article>

            <article className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-6 sm:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#7B6A3A]">
                Potential misalignment
              </p>

              <h2 className="mt-3 text-2xl font-semibold">
                When another jurisdiction may be more suitable
              </h2>

              <ul className="mt-5 space-y-3 pl-5 text-[15px] leading-7 text-[#5F584D] marker:text-[#B89B5E]">
                <li>
                  You need a highly standardized national system with uniform
                  reporting and governance expectations.
                </li>
                <li>
                  Your case requires unusually deep multidisciplinary capacity
                  or a highly specialized centre.
                </li>
                <li>
                  You are choosing primarily by marketing, convenience, or
                  headline package price.
                </li>
                <li>
                  You cannot independently confirm clinic standards,
                  documentation, costs, and treatment responsibilities.
                </li>
                <li>
                  You do not have a reliable plan for care after returning
                  home.
                </li>
              </ul>
            </article>
          </div>
        </section>

        <section className="border-t border-[#E5DDC8] py-12 sm:py-16">
          <div className="rounded-2xl border border-[#E5DDC8] bg-[#EEE5D2] p-6 sm:p-8">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#7B6A3A]">
              FertilityCareHub assessment framework
            </p>

            <h2 className="mt-4 text-3xl font-semibold">
              How to evaluate Mexico as a treatment destination
            </h2>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <div>
                <h3 className="text-lg font-semibold">Clinic vetting</h3>
                <p className="mt-3 text-sm leading-7 text-[#5F584D]">
                  Confirm licensing, medical leadership, laboratory governance,
                  embryology continuity, treatment protocols, and
                  international-patient experience.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold">
                  Pathway coordination
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#5F584D]">
                  Define records, testing, external monitoring, medication,
                  travel windows, procedure timing, and follow-up before the
                  cycle begins.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold">Execution risk</h3>
                <p className="mt-3 text-sm leading-7 text-[#5F584D]">
                  Identify where communication, scheduling, pricing,
                  documentation, travel, monitoring, or continuity of care
                  could create avoidable uncertainty.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-[#E5DDC8] py-12 sm:py-16">
          <div className="max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#7B6A3A]">
              Decision factors
            </p>

            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              Evaluate the complete treatment pathway
            </h2>

            <p className="mt-5 leading-8 text-[#5F584D]">
              Mexico should not be assessed only by proximity, affordability,
              clinic branding, or travel convenience. A workable plan must
              align regulation, clinical quality, treatment access, costs,
              documentation, monitoring, travel, communication, and continuity
              of care.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <article className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-6">
              <h3 className="text-xl font-semibold">
                Clinic governance and laboratory quality
              </h3>

              <ul className="mt-4 space-y-3 pl-5 text-sm leading-7 text-[#5F584D] marker:text-[#B89B5E]">
                <li>Confirm licensing and responsible medical leadership.</li>
                <li>
                  Ask who directs the laboratory and how quality controls are
                  maintained.
                </li>
                <li>
                  Review embryology-team stability and treatment-volume
                  relevance.
                </li>
                <li>
                  Require transparency about protocols, add-ons, and evidence.
                </li>
              </ul>
            </article>

            <article className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-6">
              <h3 className="text-xl font-semibold">
                Success-rate interpretation
              </h3>

              <ul className="mt-4 space-y-3 pl-5 text-sm leading-7 text-[#5F584D] marker:text-[#B89B5E]">
                <li>
                  Identify the reported endpoint: pregnancy, ongoing pregnancy,
                  or live birth.
                </li>
                <li>
                  Confirm whether the denominator is cycle started, retrieval,
                  transfer, or cumulative treatment.
                </li>
                <li>
                  Compare results within relevant age and treatment groups.
                </li>
                <li>
                  Ask whether international-patient outcomes differ from the
                  reported clinic population.
                </li>
              </ul>
            </article>

            <article className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-6">
              <h3 className="text-xl font-semibold">
                Documentation and communication
              </h3>

              <ul className="mt-4 space-y-3 pl-5 text-sm leading-7 text-[#5F584D] marker:text-[#B89B5E]">
                <li>
                  Confirm required records, tests, identity documents, consent,
                  and translations.
                </li>
                <li>
                  Establish who manages communication before, during, and after
                  treatment.
                </li>
                <li>
                  Ask how quickly results, instructions, and medical records are
                  provided.
                </li>
                <li>
                  Clarify escalation procedures for urgent clinical questions.
                </li>
              </ul>
            </article>

            <article className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-6">
              <h3 className="text-xl font-semibold">
                Cost structure and financial exposure
              </h3>

              <ul className="mt-4 space-y-3 pl-5 text-sm leading-7 text-[#5F584D] marker:text-[#B89B5E]">
                <li>
                  Separate base treatment from medication, testing, donor,
                  laboratory, freezing, storage, and transfer costs.
                </li>
                <li>
                  Confirm cancellation, low-response, and repeat-treatment
                  policies.
                </li>
                <li>
                  Add travel, accommodation, local transport, meals, and
                  schedule-change exposure.
                </li>
                <li>
                  Request a written estimate showing included and excluded
                  services.
                </li>
              </ul>
            </article>
          </div>
        </section>

        <section className="border-t border-[#E5DDC8] py-12 sm:py-16">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#7B6A3A]">
                Treatment travel planning
              </p>

              <h2 className="mt-4 text-3xl font-semibold">
                Use proximity as a planning advantage
              </h2>

              <p className="mt-5 leading-8 text-[#5F584D]">
                Shorter travel does not remove treatment uncertainty. Dates may
                change in response to testing, medication response, laboratory
                scheduling, or clinical decisions, so bookings and local
                coordination should remain flexible.
              </p>
            </div>

            <div className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-6 sm:p-8">
              <ol className="space-y-6">
                <li>
                  <div className="text-xs font-medium uppercase tracking-[0.14em] text-[#7B6A3A]">
                    Before treatment
                  </div>
                  <p className="mt-2 text-sm leading-7 text-[#5F584D]">
                    Complete records, testing, consultations, medication
                    planning, financial estimates, and documentation.
                  </p>
                </li>

                <li>
                  <div className="text-xs font-medium uppercase tracking-[0.14em] text-[#7B6A3A]">
                    Before departure
                  </div>
                  <p className="mt-2 text-sm leading-7 text-[#5F584D]">
                    Confirm appointment sequence, arrival windows,
                    accommodation, transport, medication supply, and emergency
                    contacts.
                  </p>
                </li>

                <li>
                  <div className="text-xs font-medium uppercase tracking-[0.14em] text-[#7B6A3A]">
                    During treatment
                  </div>
                  <p className="mt-2 text-sm leading-7 text-[#5F584D]">
                    Keep written instructions, receipts, medication records,
                    laboratory reports, and a named clinical contact for
                    changes.
                  </p>
                </li>

                <li>
                  <div className="text-xs font-medium uppercase tracking-[0.14em] text-[#7B6A3A]">
                    After returning home
                  </div>
                  <p className="mt-2 text-sm leading-7 text-[#5F584D]">
                    Confirm testing dates, medication instructions, transfer of
                    records, emergency guidance, and responsibility for
                    continuing care.
                  </p>
                </li>
              </ol>
            </div>
          </div>
        </section>

        <section className="border-t border-[#E5DDC8] py-12 sm:py-16">
          <div className="rounded-2xl border border-[#D8C89F] bg-[#EEE5D2] p-6 sm:p-8">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#7B6A3A]">
              Independent decision support
            </p>

            <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">
              What FertilityCareHub deliberately does not provide
            </h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <ul className="space-y-3 pl-5 text-sm leading-7 text-[#5F584D] marker:text-[#B89B5E]">
                <li>Public best-clinic rankings or paid promotional lists</li>
                <li>Guaranteed outcomes or success-rate promises</li>
                <li>Package prices presented as complete treatment costs</li>
              </ul>

              <ul className="space-y-3 pl-5 text-sm leading-7 text-[#5F584D] marker:text-[#B89B5E]">
                <li>Medical diagnosis or individualized treatment decisions</li>
                <li>Legal conclusions about eligibility or parentage</li>
                <li>One-size-fits-all country recommendations</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t border-[#E5DDC8] py-12 sm:py-16">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#7B6A3A]">
                Jurisdiction comparison
              </p>

              <h2 className="mt-4 text-3xl font-semibold">
                Compare Mexico before choosing a clinic
              </h2>

              <p className="mt-5 leading-8 text-[#5F584D]">
                Compare regulation, clinical infrastructure, treatment access,
                total costs, documentation, travel, follow-up, and execution
                risk before deciding whether Mexico is the strongest
                jurisdiction for your pathway.
              </p>
            </div>

            <div className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-6 sm:p-8">
              <h3 className="text-xl font-semibold">
                Use the comparison framework
              </h3>

              <p className="mt-4 text-sm leading-7 text-[#625A4C]">
                Start with the structured jurisdiction guide, then review the
                complete comparison library to understand how Mexico differs
                from other established destinations.
              </p>

              <div className="mt-6 flex flex-col items-start gap-3">
                <Link
                  href="/how-to-compare-fertility-jurisdictions"
                  className="font-medium text-[#715F33] underline underline-offset-4"
                >
                  Read the jurisdiction comparison guide →
                </Link>

                <Link
                  href="/compare"
                  className="font-medium text-[#715F33] underline underline-offset-4"
                >
                  Browse all comparison briefs →
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-[#E5DDC8] py-12 sm:py-16">
          <div className="max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#7B6A3A]">
              Related jurisdictions
            </p>

            <h2 className="mt-4 text-3xl font-semibold">
              Continue evaluating international options
            </h2>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {relatedCountries.map((country) => (
              <Link
                key={country.href}
                href={country.href}
                className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-6 transition hover:border-[#B89B5E] hover:bg-white"
              >
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#7B6A3A]">
                  Country dossier
                </p>

                <h3 className="mt-3 text-xl font-semibold">{country.title}</h3>

                <p className="mt-3 text-sm leading-7 text-[#625A4C]">
                  {country.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="border-t border-[#E5DDC8] py-12 sm:py-16">
          <div className="max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#7B6A3A]">
              Related planning resources
            </p>

            <h2 className="mt-4 text-3xl font-semibold">
              Continue your research with structured guides
            </h2>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {relatedGuides.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-6 transition hover:border-[#B89B5E] hover:bg-white"
              >
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#7B6A3A]">
                  FertilityCareHub guide
                </p>

                <h3 className="mt-3 text-xl font-semibold">{guide.title}</h3>

                <p className="mt-3 text-sm leading-7 text-[#625A4C]">
                  {guide.description}
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-6">
            <Link
              href="/guides"
              className="font-medium text-[#715F33] underline underline-offset-4"
            >
              Browse the complete Guides Library →
            </Link>
          </div>
        </section>

        <section className="border-t border-[#E5DDC8] py-12 sm:py-16">
          <div className="max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#7B6A3A]">
              Frequently asked questions
            </p>

            <h2 className="mt-4 text-3xl font-semibold">
              Mexico fertility-planning FAQ
            </h2>
          </div>

          <div className="mt-8 space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-5 sm:p-6"
              >
                <summary className="cursor-pointer pr-5 text-lg font-semibold">
                  {faq.question}
                </summary>

                <p className="mt-4 max-w-4xl text-sm leading-7 text-[#625A4C]">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section className="border-t border-[#E5DDC8] py-12 sm:py-16">
          <div className="rounded-2xl bg-[#1A1A1A] px-6 py-10 text-center text-white sm:px-10 sm:py-14">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#D4BE82]">
              Private strategic advisory
            </p>

            <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-semibold sm:text-4xl">
              Evaluate Mexico against your actual pathway
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-8 text-[#D4D0C8]">
              FertilityCareHub helps structure jurisdiction, clinic, cost,
              travel, documentation, monitoring, and execution decisions around
              your priorities and constraints.
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
            FertilityCareHub provides general educational and strategic
            planning information. It does not provide medical, legal,
            financial, or regulatory advice. Eligibility requirements,
            regulations, clinic policies, costs, treatment access, and clinical
            practices may change and should be independently confirmed with
            appropriately licensed professionals.
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
