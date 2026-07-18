import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "../../components/Breadcrumbs";
import CountryWebPageSchema from "../../components/CountryWebPageSchema";
import FAQSchema from "../../components/FAQSchema";

const baseUrl = "https://fertilitycarehub.com";
const pageUrl = `${baseUrl}/countries/czech-republic`;

export const metadata: Metadata = {
  title:
    "Czech Republic IVF Regulations & Fertility Law 2026 | FertilityCareHub",
  description:
    "Structured analysis of IVF regulations, donor pathways, clinic operations, travel planning, costs, and fertility access considerations in the Czech Republic.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Czech Republic IVF Regulations & Fertility Law 2026",
    description:
      "Strategic fertility-jurisdiction analysis covering clinic operations, donor pathways, costs, logistics, documentation, and cross-border planning in the Czech Republic.",
    url: pageUrl,
    siteName: "FertilityCareHub",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Czech Republic IVF Regulations & Fertility Law 2026",
    description:
      "Structured fertility-jurisdiction analysis for cross-border treatment planning in the Czech Republic.",
  },
};

const faqs = [
  {
    question:
      "Why do international patients consider the Czech Republic for fertility treatment?",
    answer:
      "The Czech Republic is often considered for its established fertility-clinic infrastructure, experience coordinating international patients, relatively predictable treatment workflows, and Central European location. Suitability depends on the patient’s treatment pathway, eligibility, donor requirements, medical circumstances, budget, and travel constraints.",
  },
  {
    question:
      "Is the Czech Republic automatically the least expensive European fertility destination?",
    answer:
      "No. Advertised package prices do not necessarily represent the complete treatment cost. Medication, preliminary testing, donor services, laboratory procedures, freezing, storage, additional transfers, travel, accommodation, monitoring, and repeat-treatment exposure should all be considered.",
  },
  {
    question:
      "How should a fertility clinic in the Czech Republic be evaluated?",
    answer:
      "Patients should assess licensing, laboratory governance, embryology-team stability, communication standards, treatment transparency, success-rate reporting, donor practices, pricing, cancellation policies, and continuity of care. Clinic suitability should be evaluated within the patient’s overall jurisdiction and treatment strategy.",
  },
  {
    question:
      "How much travel may be required for fertility treatment in the Czech Republic?",
    answer:
      "Travel requirements vary by treatment type, clinic protocol, monitoring arrangements, medication response, and whether preliminary testing can be completed locally. Patients should obtain a written schedule identifying remote steps, required arrival dates, procedure windows, recovery time, and follow-up arrangements.",
  },
  {
    question:
      "Can FertilityCareHub compare the Czech Republic with Spain or Greece?",
    answer:
      "Yes. FertilityCareHub provides structured comparisons examining regulation, eligibility, donor pathways, clinical infrastructure, costs, logistics, documentation, and execution risk. Published comparisons currently include Spain versus the Czech Republic and Greece versus the Czech Republic.",
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
    title: "Hidden Costs of Fertility Treatment Abroad",
    href: "/hidden-costs-of-fertility-treatment-abroad",
    description:
      "Identify medication, laboratory, donor, storage, travel, cancellation, and repeat-treatment expenses.",
  },
  {
    title: "Fertility Treatment Travel Checklist",
    href: "/fertility-treatment-travel-checklist",
    description:
      "Prepare medical records, medications, monitoring, accommodation, insurance, and follow-up arrangements.",
  },
];

const comparisons = [
  {
    title: "Spain vs Czech Republic IVF Regulations",
    href: "/compare/spain-vs-czech-republic-ivf-regulations",
    description:
      "Compare donor pathways, governance, clinical infrastructure, cost context, logistics, and execution considerations.",
  },
  {
    title: "Greece vs Czech Republic IVF Regulations",
    href: "/compare/greece-vs-czech-republic-ivf-regulations",
    description:
      "Compare donor-pathway potential, clinic operations, costs, documentation, travel, and execution risk.",
  },
];

export default function CzechRepublicPage() {
  return (
    <main className="min-h-screen bg-[#F5F1E8] text-[#1A1A1A]">
      <CountryWebPageSchema
        countryName="Czech Republic"
        countrySlug="czech-republic"
        title="Czech Republic: Fertility Jurisdiction Assessment"
        description="Strategic jurisdiction assessment covering fertility access, clinic operations, costs, logistics, and cross-border planning in the Czech Republic."
      />

      <FAQSchema id="faq-czech-republic" items={faqs} />

      <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-6 sm:py-14 lg:px-8">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Countries", href: "/countries" },
            {
              name: "Czech Republic",
              href: "/countries/czech-republic",
            },
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
            Review Czech Republic Strategy Privately
          </Link>
        </section>

        <section className="border-b border-[#E5DDC8] pb-12 pt-14 text-center sm:pb-16 sm:pt-20">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-[#7B6A3A]">
            Strategic Advisory Dossier
          </p>

          <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.03em] sm:text-5xl lg:text-6xl">
            Czech Republic Fertility Jurisdiction Assessment
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-[#5F584D] sm:text-lg">
            The Czech Republic is often considered for its structured Central
            European treatment environment, established clinic operations, and
            experience coordinating international patients. Its strategic value
            lies less in promotional claims about low prices and more in whether
            the jurisdiction, clinic model, treatment pathway, and travel plan
            can be aligned with limited avoidable uncertainty.
          </p>
        </section>

        <section className="py-12 sm:py-16">
          <div className="grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-6 sm:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#7B6A3A]">
                Strategic alignment
              </p>

              <h2 className="mt-3 text-2xl font-semibold">
                When the Czech Republic may be a strong fit
              </h2>

              <ul className="mt-5 space-y-3 pl-5 text-[15px] leading-7 text-[#5F584D] marker:text-[#B89B5E]">
                <li>
                  You want an established European fertility environment with
                  internationally experienced clinic teams.
                </li>
                <li>
                  You value structured scheduling, written treatment plans, and
                  predictable coordination.
                </li>
                <li>
                  You want to balance clinical capability, travel practicality,
                  and total pathway cost.
                </li>
                <li>
                  You prefer a carefully evaluated shortlist rather than a
                  broad clinic directory.
                </li>
                <li>
                  You can complete medical, documentation, and travel planning
                  before treatment begins.
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
                  Your pathway requires eligibility or donor options that may
                  be better aligned elsewhere.
                </li>
                <li>
                  Your case requires unusually complex multidisciplinary
                  treatment or specialist coordination.
                </li>
                <li>
                  You want to choose solely from the lowest advertised package
                  price.
                </li>
                <li>
                  You cannot accommodate treatment-related travel uncertainty
                  or possible schedule changes.
                </li>
                <li>
                  You have not yet confirmed how treatment will be monitored
                  before and after travel.
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
              How to evaluate the Czech Republic as a treatment destination
            </h2>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <div>
                <h3 className="text-lg font-semibold">Clinical operations</h3>
                <p className="mt-3 text-sm leading-7 text-[#5F584D]">
                  Examine laboratory governance, embryology-team continuity,
                  treatment protocols, quality controls, and international
                  patient coordination.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold">Planning structure</h3>
                <p className="mt-3 text-sm leading-7 text-[#5F584D]">
                  Confirm record requirements, testing, medication planning,
                  monitoring responsibilities, procedure windows, travel dates,
                  and follow-up care.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold">Execution risk</h3>
                <p className="mt-3 text-sm leading-7 text-[#5F584D]">
                  Identify where costs, timelines, communication gaps,
                  eligibility questions, add-on procedures, or travel changes
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
              The pathway should be evaluated as a complete system
            </h2>

            <p className="mt-5 leading-8 text-[#5F584D]">
              Clinic selection is only one part of the decision. A workable
              cross-border plan must align clinical quality, treatment access,
              pricing, documentation, travel, monitoring, and continuity of
              care.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <article className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-6">
              <h3 className="text-xl font-semibold">
                Clinic model and quality signals
              </h3>

              <ul className="mt-4 space-y-3 pl-5 text-sm leading-7 text-[#5F584D] marker:text-[#B89B5E]">
                <li>
                  Confirm the clinic’s licensing and responsible medical
                  leadership.
                </li>
                <li>
                  Ask who directs the laboratory and whether the embryology team
                  is stable.
                </li>
                <li>
                  Review how outcomes are reported and which patient groups are
                  included.
                </li>
                <li>
                  Require clarity about recommended add-ons and the evidence
                  supporting them.
                </li>
              </ul>
            </article>

            <article className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-6">
              <h3 className="text-xl font-semibold">
                Cost structure and financial exposure
              </h3>

              <ul className="mt-4 space-y-3 pl-5 text-sm leading-7 text-[#5F584D] marker:text-[#B89B5E]">
                <li>
                  Separate the base treatment price from medication,
                  laboratory, donor, storage, and transfer costs.
                </li>
                <li>
                  Confirm which tests and monitoring services are included.
                </li>
                <li>
                  Ask how cancellation, poor response, freezing, and repeat
                  treatment are charged.
                </li>
                <li>
                  Add travel, accommodation, local transport, meals, and
                  schedule-change exposure.
                </li>
              </ul>
            </article>

            <article className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-6">
              <h3 className="text-xl font-semibold">
                Eligibility, donor pathways, and documentation
              </h3>

              <ul className="mt-4 space-y-3 pl-5 text-sm leading-7 text-[#5F584D] marker:text-[#B89B5E]">
                <li>
                  Confirm current treatment eligibility before paying a
                  deposit.
                </li>
                <li>
                  Clarify donor rules, matching processes, waiting periods, and
                  information available to recipients.
                </li>
                <li>
                  Verify identity, relationship, consent, translation, and
                  medical-record requirements.
                </li>
                <li>
                  Obtain professional legal guidance where parentage or
                  cross-border recognition may be relevant.
                </li>
              </ul>
            </article>

            <article className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-6">
              <h3 className="text-xl font-semibold">
                Communication and continuity of care
              </h3>

              <ul className="mt-4 space-y-3 pl-5 text-sm leading-7 text-[#5F584D] marker:text-[#B89B5E]">
                <li>
                  Identify the person responsible for coordinating your case.
                </li>
                <li>
                  Confirm response times and how urgent questions are handled.
                </li>
                <li>
                  Agree on how local test results and monitoring scans will be
                  transmitted.
                </li>
                <li>
                  Establish a post-treatment follow-up and emergency plan before
                  travel.
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
                Build the travel plan around the medical pathway
              </h2>

              <p className="mt-5 leading-8 text-[#5F584D]">
                Treatment timing can change in response to test results,
                medication response, laboratory scheduling, or clinical
                decisions. Travel arrangements should remain flexible enough to
                support the medical plan rather than constrain it.
              </p>
            </div>

            <div className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-6 sm:p-8">
              <ol className="space-y-6">
                <li>
                  <div className="text-xs font-medium uppercase tracking-[0.14em] text-[#7B6A3A]">
                    Before treatment
                  </div>
                  <p className="mt-2 text-sm leading-7 text-[#5F584D]">
                    Complete required records, testing, consultations,
                    medication planning, financial estimates, and travel
                    documentation.
                  </p>
                </li>

                <li>
                  <div className="text-xs font-medium uppercase tracking-[0.14em] text-[#7B6A3A]">
                    Before departure
                  </div>
                  <p className="mt-2 text-sm leading-7 text-[#5F584D]">
                    Confirm the expected appointment sequence, arrival window,
                    accommodation location, transport plan, medication supply,
                    and emergency contacts.
                  </p>
                </li>

                <li>
                  <div className="text-xs font-medium uppercase tracking-[0.14em] text-[#7B6A3A]">
                    During treatment
                  </div>
                  <p className="mt-2 text-sm leading-7 text-[#5F584D]">
                    Keep written instructions, receipts, medication records,
                    laboratory reports, and a clear point of contact for
                    schedule changes.
                  </p>
                </li>

                <li>
                  <div className="text-xs font-medium uppercase tracking-[0.14em] text-[#7B6A3A]">
                    After returning home
                  </div>
                  <p className="mt-2 text-sm leading-7 text-[#5F584D]">
                    Confirm testing dates, medication instructions, transfer of
                    records, emergency guidance, and responsibility for
                    continued care.
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
                <li>Public “best clinic” rankings or paid promotional lists</li>
                <li>Guaranteed treatment outcomes or success-rate promises</li>
                <li>Unverified package prices presented as complete costs</li>
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
              Compare the Czech Republic with other jurisdictions
            </h2>

            <p className="mt-5 leading-8 text-[#5F584D]">
              Use the published comparison briefs to identify structural
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
              Czech Republic fertility-planning FAQ
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
              Evaluate the Czech Republic against your actual pathway
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-8 text-[#D4D0C8]">
              FertilityCareHub helps structure jurisdiction, clinic, cost,
              travel, documentation, and execution decisions around your
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
            regulations, clinic policies, costs, treatment availability, and
            clinical practices may change and should be independently confirmed
            with appropriately licensed professionals.
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