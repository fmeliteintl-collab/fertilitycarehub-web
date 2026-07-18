import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "../../components/Breadcrumbs";
import CountryWebPageSchema from "../../components/CountryWebPageSchema";
import FAQSchema from "../../components/FAQSchema";

const baseUrl = "https://fertilitycarehub.com";
const pageUrl = `${baseUrl}/countries/united-kingdom`;

export const metadata: Metadata = {
  title:
    "United Kingdom IVF Regulations & Fertility Strategy 2026 | FertilityCareHub",
  description:
    "Structured analysis of UK fertility regulation, HFEA oversight, clinic access, donor pathways, costs, waiting times, and treatment planning.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "United Kingdom IVF Regulations & Fertility Strategy 2026",
    description:
      "Strategic fertility-jurisdiction analysis covering HFEA oversight, clinic access, donor pathways, costs, waiting times, and treatment planning in the United Kingdom.",
    url: pageUrl,
    siteName: "FertilityCareHub",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "United Kingdom IVF Regulations & Fertility Strategy 2026",
    description:
      "Structured fertility-jurisdiction analysis for treatment planning in the United Kingdom.",
  },
};

const faqs = [
  {
    question:
      "Why do patients consider fertility treatment in the United Kingdom?",
    answer:
      "The United Kingdom is often considered for its nationally regulated fertility sector, HFEA-licensed clinics, published inspection information, established donor rules, and strong clinical governance. Suitability depends on clinic access, NHS or private funding, waiting times, treatment eligibility, donor availability, total costs, and the patient’s required pathway.",
  },
  {
    question: "What is the HFEA?",
    answer:
      "The Human Fertilisation and Embryology Authority regulates fertility clinics and embryo research in the United Kingdom. It licenses clinics, maintains regulatory information, publishes inspection material, and oversees compliance within the statutory framework.",
  },
  {
    question: "Is IVF funded by the NHS across the United Kingdom?",
    answer:
      "NHS fertility funding is not uniform. Eligibility, cycle limits, age criteria, prior children, local commissioning decisions, waiting times, and treatment coverage may vary by nation and local area. Patients should verify current rules directly with the relevant NHS body and clinic.",
  },
  {
    question: "Are donor treatments available in the United Kingdom?",
    answer:
      "Donor-assisted treatment is available within a regulated framework. Availability, waiting times, donor characteristics, identity-release rules, screening, consent, counselling, and clinic policy should all be reviewed before treatment.",
  },
  {
    question:
      "Does FertilityCareHub recommend specific fertility clinics in the United Kingdom?",
    answer:
      "FertilityCareHub does not publish public best-clinic rankings or paid promotional lists. Private advisory may include a curated shortlist based on HFEA licensing, inspection history, medical leadership, laboratory governance, success-rate reporting, communication, costs, access, and pathway fit.",
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
    title: "Questions to Ask a Fertility Clinic",
    href: "/questions-to-ask-a-fertility-clinic",
    description:
      "Use a structured checklist to verify access, protocols, costs, laboratory standards, communication, and follow-up.",
  },
];

const relatedCountries = [
  {
    title: "Canada",
    href: "/countries/canada",
    description:
      "A regulated, ethics-forward system where provincial access, clinic capacity, funding, and continuity of care shape the pathway.",
  },
  {
    title: "United States",
    href: "/countries/united-states",
    description:
      "A large and highly varied fertility market with broad specialist depth, higher costs, and important state-level considerations.",
  },
  {
    title: "Spain",
    href: "/countries/spain",
    description:
      "A mature European destination with established international-patient pathways and significant donor-treatment experience.",
  },
];

export default function UnitedKingdomDossierPage() {
  return (
    <main className="min-h-screen bg-[#F5F1E8] text-[#1A1A1A]">
      <CountryWebPageSchema
        countryName="United Kingdom"
        countrySlug="united-kingdom"
        title="United Kingdom: Fertility Jurisdiction Assessment"
        description="Strategic jurisdiction assessment covering HFEA oversight, clinic access, donor pathways, NHS and private funding, costs, waiting times, and treatment planning in the United Kingdom."
      />

      <FAQSchema id="faq-united-kingdom" items={faqs} />

      <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-6 sm:py-14 lg:px-8">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Countries", href: "/countries" },
            {
              name: "United Kingdom",
              href: "/countries/united-kingdom",
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
            Review UK Strategy Privately
          </Link>
        </section>

        <section className="border-b border-[#E5DDC8] pb-12 pt-14 text-center sm:pb-16 sm:pt-20">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-[#7B6A3A]">
            Strategic Advisory Dossier
          </p>

          <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.03em] sm:text-5xl lg:text-6xl">
            United Kingdom Fertility Jurisdiction Assessment
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-[#5F584D] sm:text-lg">
            The United Kingdom offers one of the world&apos;s most structured
            fertility-regulation environments, with HFEA licensing, inspection,
            reporting, and donor rules providing substantial transparency.
            Practical suitability depends on clinic access, NHS or private
            funding, waiting times, donor availability, treatment eligibility,
            total costs, and the fit between the regulatory framework and the
            required pathway.
          </p>
        </section>

        <section className="py-12 sm:py-16">
          <div className="grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-6 sm:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#7B6A3A]">
                Strategic alignment
              </p>

              <h2 className="mt-3 text-2xl font-semibold">
                When the United Kingdom may be a strong fit
              </h2>

              <ul className="mt-5 space-y-3 pl-5 text-[15px] leading-7 text-[#5F584D] marker:text-[#B89B5E]">
                <li>
                  You value national regulatory oversight, licensing, and
                  publicly available inspection information.
                </li>
                <li>
                  Your required treatment pathway fits within current UK law
                  and clinic policy.
                </li>
                <li>
                  You want clear donor, consent, record-keeping, and embryo
                  storage rules.
                </li>
                <li>
                  You are prepared to compare NHS access with private treatment
                  timelines and costs.
                </li>
                <li>
                  You prioritize governance, transparency, and continuity of
                  care over the lowest possible price.
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
                  You are optimizing primarily for lower treatment and
                  medication costs.
                </li>
                <li>
                  NHS eligibility or waiting times conflict with your medical
                  timeline.
                </li>
                <li>
                  Your required donor or family-building pathway is restricted
                  or difficult to access.
                </li>
                <li>
                  Donor availability or clinic capacity creates material delay.
                </li>
                <li>
                  You need a more commercially flexible international-treatment
                  model.
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
              How to evaluate the United Kingdom as a treatment jurisdiction
            </h2>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <div>
                <h3 className="text-lg font-semibold">
                  Regulatory transparency
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#5F584D]">
                  Review HFEA licensing, inspection information, treatment
                  permissions, donor rules, consent requirements, and clinic
                  compliance history.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold">
                  Clinic and laboratory quality
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#5F584D]">
                  Examine medical leadership, embryology governance,
                  treatment-specific outcomes, communication, waiting times,
                  and continuity of care.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold">
                  Pathway and funding fit
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#5F584D]">
                  Confirm NHS eligibility, private costs, donor availability,
                  treatment access, timing, travel requirements, and legal or
                  documentation needs.
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
              Look beyond national regulation to the complete pathway
            </h2>

            <p className="mt-5 leading-8 text-[#5F584D]">
              Strong national oversight does not make every clinic, funding
              route, or treatment pathway equivalent. Patients should compare
              HFEA information, clinic capability, NHS access, private costs,
              waiting times, donor availability, travel, and follow-up before
              deciding whether the United Kingdom is the best fit.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <article className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-6">
              <h3 className="text-xl font-semibold">
                HFEA licensing and inspection
              </h3>

              <ul className="mt-4 space-y-3 pl-5 text-sm leading-7 text-[#5F584D] marker:text-[#B89B5E]">
                <li>
                  Confirm that the clinic is licensed for the proposed
                  treatment and storage services.
                </li>
                <li>
                  Review inspection findings, ratings, conditions, and areas
                  requiring improvement.
                </li>
                <li>
                  Identify the responsible medical, laboratory, and quality
                  leadership.
                </li>
                <li>
                  Ask how the clinic addresses incidents, complaints, and
                  treatment escalation.
                </li>
              </ul>
            </article>

            <article className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-6">
              <h3 className="text-xl font-semibold">
                NHS access and private treatment
              </h3>

              <ul className="mt-4 space-y-3 pl-5 text-sm leading-7 text-[#5F584D] marker:text-[#B89B5E]">
                <li>
                  Verify current NHS eligibility, referral, funding, and cycle
                  rules for the relevant area.
                </li>
                <li>
                  Confirm expected consultation and funded-treatment waiting
                  times.
                </li>
                <li>
                  Compare uncovered medications, testing, storage, and
                  additional laboratory services.
                </li>
                <li>
                  Evaluate whether private treatment materially improves timing
                  or access.
                </li>
              </ul>
            </article>

            <article className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-6">
              <h3 className="text-xl font-semibold">
                Donor pathways and consent
              </h3>

              <ul className="mt-4 space-y-3 pl-5 text-sm leading-7 text-[#5F584D] marker:text-[#B89B5E]">
                <li>
                  Confirm donor availability, waiting times, screening, and
                  matching practices.
                </li>
                <li>
                  Understand identity-release, information-access, counselling,
                  and consent implications.
                </li>
                <li>
                  Clarify legal parenthood requirements for the patient&apos;s
                  family structure.
                </li>
                <li>
                  Review storage, future use, withdrawal of consent, and record
                  policies.
                </li>
              </ul>
            </article>

            <article className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-6">
              <h3 className="text-xl font-semibold">
                Success rates and cost exposure
              </h3>

              <ul className="mt-4 space-y-3 pl-5 text-sm leading-7 text-[#5F584D] marker:text-[#B89B5E]">
                <li>
                  Interpret outcomes by age, treatment type, donor use,
                  denominator, and endpoint.
                </li>
                <li>
                  Distinguish live-birth, pregnancy, per-transfer,
                  per-collection, and cumulative reporting.
                </li>
                <li>
                  Request a written estimate covering medication, procedures,
                  laboratory services, freezing, and storage.
                </li>
                <li>
                  Confirm cancellation, low-response, repeat-cycle, and refund
                  policies.
                </li>
              </ul>
            </article>
          </div>
        </section>

        <section className="border-t border-[#E5DDC8] py-12 sm:py-16">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#7B6A3A]">
                Treatment and travel planning
              </p>

              <h2 className="mt-4 text-3xl font-semibold">
                Coordinate clinic access, monitoring, and follow-up
              </h2>

              <p className="mt-5 leading-8 text-[#5F584D]">
                The United Kingdom can be operationally straightforward, but
                international or long-distance patients still need a clear plan
                for consultation, preliminary testing, medication, monitoring,
                accommodation, transport, procedure timing, and post-treatment
                care.
              </p>
            </div>

            <div className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-6 sm:p-8">
              <ol className="space-y-6">
                <li>
                  <div className="text-xs font-medium uppercase tracking-[0.14em] text-[#7B6A3A]">
                    Before clinic selection
                  </div>
                  <p className="mt-2 text-sm leading-7 text-[#5F584D]">
                    Compare licensing, inspection history, treatment scope,
                    outcomes, waiting times, donor access, costs, and
                    communication.
                  </p>
                </li>

                <li>
                  <div className="text-xs font-medium uppercase tracking-[0.14em] text-[#7B6A3A]">
                    Before treatment
                  </div>
                  <p className="mt-2 text-sm leading-7 text-[#5F584D]">
                    Complete records, testing, consent, medication planning,
                    financial estimates, monitoring arrangements, and travel
                    scheduling.
                  </p>
                </li>

                <li>
                  <div className="text-xs font-medium uppercase tracking-[0.14em] text-[#7B6A3A]">
                    During treatment
                  </div>
                  <p className="mt-2 text-sm leading-7 text-[#5F584D]">
                    Keep written instructions, medication records, results,
                    receipts, emergency contacts, and contingency time.
                  </p>
                </li>

                <li>
                  <div className="text-xs font-medium uppercase tracking-[0.14em] text-[#7B6A3A]">
                    After treatment
                  </div>
                  <p className="mt-2 text-sm leading-7 text-[#5F584D]">
                    Confirm testing, medication, records transfer, pregnancy
                    care, emergency guidance, and future storage decisions.
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
                <li>Outdated NHS criteria or pricing presented as universal</li>
              </ul>

              <ul className="space-y-3 pl-5 text-sm leading-7 text-[#5F584D] marker:text-[#B89B5E]">
                <li>Medical diagnosis or individualized treatment decisions</li>
                <li>Legal conclusions about donor, parenthood, or surrogacy matters</li>
                <li>One-size-fits-all clinic or funding recommendations</li>
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
                Compare the United Kingdom with other options
              </h2>

              <p className="mt-5 leading-8 text-[#5F584D]">
                Compare regulation, NHS and private access, donor pathways,
                clinic capability, waiting times, total costs, travel, and
                continuity of care before deciding whether the United Kingdom
                is the strongest jurisdiction for your treatment plan.
              </p>
            </div>

            <div className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-6 sm:p-8">
              <h3 className="text-xl font-semibold">
                Use the comparison framework
              </h3>

              <p className="mt-4 text-sm leading-7 text-[#625A4C]">
                Start with the jurisdiction framework, then review the full
                comparison library to evaluate the United Kingdom against
                realistic domestic and international alternatives.
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
              Continue evaluating treatment options
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
              United Kingdom fertility-planning FAQ
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
              Evaluate the United Kingdom against your actual pathway
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-8 text-[#D4D0C8]">
              FertilityCareHub helps structure HFEA, clinic, funding, donor,
              waiting-time, cost, travel, and continuity-of-care decisions
              around your priorities and constraints.
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
            financial, or regulatory advice. HFEA information, NHS funding,
            eligibility, clinic policies, waiting times, costs, donor
            availability, and clinical practices may change and should be
            independently confirmed with appropriately licensed professionals.
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
