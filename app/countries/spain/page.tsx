import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "../../components/Breadcrumbs";
import CountryWebPageSchema from "../../components/CountryWebPageSchema";
import FAQSchema from "../../components/FAQSchema";

const baseUrl = "https://fertilitycarehub.com";
const pageUrl = `${baseUrl}/countries/spain`;

export const metadata: Metadata = {
  title: "Spain IVF Regulations & Fertility Strategy 2026 | FertilityCareHub",
  description:
    "Structured analysis of fertility regulation, donor pathways, clinic standards, costs, travel planning, and cross-border treatment strategy in Spain.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Spain IVF Regulations & Fertility Strategy 2026",
    description:
      "Strategic fertility-jurisdiction analysis covering regulation, donor pathways, clinic standards, costs, logistics, and cross-border planning in Spain.",
    url: pageUrl,
    siteName: "FertilityCareHub",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Spain IVF Regulations & Fertility Strategy 2026",
    description:
      "Structured fertility-jurisdiction analysis for cross-border treatment planning in Spain.",
  },
};

const faqs = [
  {
    question: "Why do international patients consider Spain for fertility treatment?",
    answer:
      "Spain is often considered for its mature private fertility infrastructure, internationally experienced clinics, established donor pathways, and comparatively structured patient coordination. Suitability still depends on the patient’s medical profile, eligibility, donor requirements, budget, ethical preferences, and travel constraints.",
  },
  {
    question: "Does FertilityCareHub recommend specific fertility clinics in Spain?",
    answer:
      "FertilityCareHub does not publish public best-clinic rankings or paid promotional lists. Private advisory may include a curated shortlist based on licensing, laboratory governance, communication, treatment transparency, costs, donor practices, and continuity-of-care requirements.",
  },
  {
    question: "How should fertility-clinic success rates in Spain be evaluated?",
    answer:
      "Success rates should be reviewed by treatment type, age group, donor use, patient population, denominator, reporting period, and outcome endpoint. Patients should distinguish pregnancy rates from live-birth rates and ask whether results are reported per cycle started, retrieval, transfer, or cumulative treatment pathway.",
  },
  {
    question: "What costs should be considered beyond a Spanish clinic package price?",
    answer:
      "A complete estimate should include medication, preliminary testing, monitoring, donor services, laboratory procedures, freezing, storage, embryo transfer, additional consultations, travel, accommodation, local transportation, cancellation exposure, and possible repeat treatment.",
  },
  {
    question: "Can FertilityCareHub compare Spain with Greece or the Czech Republic?",
    answer:
      "Yes. FertilityCareHub provides structured comparisons across regulation, eligibility, donor pathways, clinical infrastructure, costs, logistics, documentation, and execution risk. Published comparisons currently include Spain versus Greece, Portugal, Italy, the Czech Republic, and North Cyprus.",
  },
];

const relatedGuides = [
  {
    title: "How to Compare Fertility Jurisdictions Strategically",
    href: "/how-to-compare-fertility-jurisdictions",
    description:
      "Compare regulation, eligibility, donor pathways, governance, costs, logistics, and execution risk.",
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
    title: "Hidden Costs of Fertility Treatment Abroad",
    href: "/hidden-costs-of-fertility-treatment-abroad",
    description:
      "Identify medication, laboratory, donor, storage, travel, cancellation, and repeat-treatment expenses.",
  },
];

const comparisons = [
  {
    title: "Spain vs Greece IVF Regulations",
    href: "/compare/spain-vs-greece-ivf-regulations",
    description:
      "Compare regulation, donor governance, clinical infrastructure, access, logistics, and execution complexity.",
  },
  {
    title: "Spain vs Portugal IVF Regulations",
    href: "/compare/spain-vs-portugal-ivf-regulations",
    description:
      "Review donor frameworks, governance posture, treatment access, and operational planning.",
  },
  {
    title: "Spain vs Czech Republic IVF Regulations",
    href: "/compare/spain-vs-czech-republic-ivf-regulations",
    description:
      "Evaluate governance, donor pathways, clinical infrastructure, cost context, and execution considerations.",
  },
  {
    title: "Spain vs Italy IVF Regulations",
    href: "/compare/spain-vs-italy-ivf-regulations",
    description:
      "Compare donor legality, regulatory stability, access conditions, and procedural alignment.",
  },
];

export default function SpainDossierPage() {
  return (
    <main className="min-h-screen bg-[#F5F1E8] text-[#1A1A1A]">
      <CountryWebPageSchema
        countryName="Spain"
        countrySlug="spain"
        title="Spain: Fertility Jurisdiction Assessment"
        description="Strategic jurisdiction assessment covering fertility regulation, donor pathways, clinic standards, costs, logistics, and cross-border planning in Spain."
      />

      <FAQSchema id="faq-spain" items={faqs} />

      <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-6 sm:py-14 lg:px-8">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Countries", href: "/countries" },
            { name: "Spain", href: "/countries/spain" },
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
            Review Spain Strategy Privately
          </Link>
        </section>

        <section className="border-b border-[#E5DDC8] pb-12 pt-14 text-center sm:pb-16 sm:pt-20">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-[#7B6A3A]">
            Strategic Advisory Dossier
          </p>

          <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.03em] sm:text-5xl lg:text-6xl">
            Spain Fertility Jurisdiction Assessment
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-[#5F584D] sm:text-lg">
            Spain occupies a distinctive position in the European fertility
            landscape. Its mature clinic infrastructure, established donor
            pathways, and international-patient experience can create a highly
            workable treatment environment when legal, medical, ethical,
            financial, and logistical factors are properly aligned.
          </p>
        </section>

        <section className="py-12 sm:py-16">
          <div className="grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-6 sm:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#7B6A3A]">
                Strategic alignment
              </p>

              <h2 className="mt-3 text-2xl font-semibold">
                When Spain may be a strong fit
              </h2>

              <ul className="mt-5 space-y-3 pl-5 text-[15px] leading-7 text-[#5F584D] marker:text-[#B89B5E]">
                <li>
                  You want a mature European fertility market with extensive
                  international-patient experience.
                </li>
                <li>
                  Donor pathways are relevant and you value established clinic
                  systems and coordination.
                </li>
                <li>
                  You want strong clinical depth combined with relatively
                  predictable scheduling and communication.
                </li>
                <li>
                  You prefer a carefully evaluated shortlist rather than a
                  public directory or promotional ranking.
                </li>
                <li>
                  You can align treatment, travel, monitoring, and follow-up
                  before committing financially.
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
                  Your pathway requires legal or eligibility conditions that
                  may be better aligned elsewhere.
                </li>
                <li>
                  Your decision is based primarily on the lowest advertised
                  package price.
                </li>
                <li>
                  You require the strongest possible public-reporting or
                  national-governance structure.
                </li>
                <li>
                  You cannot accommodate medication-response changes,
                  monitoring requirements, or travel uncertainty.
                </li>
                <li>
                  You have not yet confirmed how care will be coordinated before
                  departure and after returning home.
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
              How to evaluate Spain as a treatment destination
            </h2>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <div>
                <h3 className="text-lg font-semibold">Regulatory alignment</h3>
                <p className="mt-3 text-sm leading-7 text-[#5F584D]">
                  Confirm current eligibility, donor rules, consent
                  requirements, documentation, storage policies, and any
                  cross-border legal considerations.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold">Clinical standards</h3>
                <p className="mt-3 text-sm leading-7 text-[#5F584D]">
                  Examine licensing, medical leadership, laboratory governance,
                  embryology-team continuity, outcome reporting, and patient
                  coordination.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold">Execution risk</h3>
                <p className="mt-3 text-sm leading-7 text-[#5F584D]">
                  Identify where costs, communication, scheduling, donor
                  matching, travel, monitoring, or follow-up could create
                  avoidable uncertainty.
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
              Spain should not be assessed only by reputation, clinic branding,
              donor availability, or package pricing. A workable plan must align
              regulation, clinical quality, treatment access, costs,
              documentation, travel, monitoring, and continuity of care.
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
                  Require transparency about add-ons, protocols, and evidence.
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
                  Separate donor-treatment outcomes from own-egg outcomes.
                </li>
              </ul>
            </article>

            <article className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-6">
              <h3 className="text-xl font-semibold">
                Donor pathway and documentation
              </h3>

              <ul className="mt-4 space-y-3 pl-5 text-sm leading-7 text-[#5F584D] marker:text-[#B89B5E]">
                <li>
                  Clarify donor matching, waiting periods, screening, and
                  information disclosure.
                </li>
                <li>
                  Confirm consent, identity, relationship, translation, and
                  medical-record requirements.
                </li>
                <li>
                  Ask how donor availability affects scheduling and total cost.
                </li>
                <li>
                  Obtain professional guidance where parentage or recognition
                  may be relevant.
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
                Build travel around the treatment protocol
              </h2>

              <p className="mt-5 leading-8 text-[#5F584D]">
                Treatment dates may change in response to test results,
                medication response, donor coordination, laboratory scheduling,
                or clinical decisions. Travel arrangements should support the
                medical pathway rather than restrict it.
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
                    planning, donor discussions, financial estimates, and
                    documentation.
                  </p>
                </li>

                <li>
                  <div className="text-xs font-medium uppercase tracking-[0.14em] text-[#7B6A3A]">
                    Before departure
                  </div>
                  <p className="mt-2 text-sm leading-7 text-[#5F584D]">
                    Confirm arrival windows, appointment sequence,
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
                    laboratory reports, and a clear point of contact for changes.
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
          <div className="max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#7B6A3A]">
              Published comparisons
            </p>

            <h2 className="mt-4 text-3xl font-semibold">
              Compare Spain with other fertility jurisdictions
            </h2>

            <p className="mt-5 leading-8 text-[#5F584D]">
              Use the published comparison briefs to identify major structural
              differences before evaluating individual clinics.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {comparisons.map((comparison) => (
              <Link
                key={comparison.href}
                href={comparison.href}
                className="group rounded-2xl border border-[#E5DDC8] bg-white/60 p-6 transition hover:border-[#B89B5E] hover:bg-white"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#7B6A3A]">
                      Jurisdiction comparison
                    </p>

                    <h3 className="mt-3 text-xl font-semibold">
                      {comparison.title}
                    </h3>
                  </div>

                  <span
                    aria-hidden="true"
                    className="text-xl text-[#8C7541] transition group-hover:translate-x-1"
                  >
                    →
                  </span>
                </div>

                <p className="mt-4 text-sm leading-7 text-[#625A4C]">
                  {comparison.description}
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-6">
            <Link
              href="/compare"
              className="font-medium text-[#715F33] underline underline-offset-4"
            >
              Browse all jurisdiction comparisons →
            </Link>
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
              Spain fertility-planning FAQ
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
              Evaluate Spain against your actual pathway
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-8 text-[#D4D0C8]">
              FertilityCareHub helps structure jurisdiction, clinic, donor,
              cost, travel, documentation, and execution decisions around your
              priorities and constraints.
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
            regulations, clinic policies, donor availability, costs, treatment
            access, and clinical practices may change and should be independently
            confirmed with appropriately licensed professionals.
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
