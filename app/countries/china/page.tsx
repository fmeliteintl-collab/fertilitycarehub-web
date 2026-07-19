import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "../../components/Breadcrumbs";
import CountryWebPageSchema from "../../components/CountryWebPageSchema";
import FAQSchema from "../../components/FAQSchema";

const baseUrl = "https://fertilitycarehub.com";
const pageUrl = `${baseUrl}/countries/china`;

export const metadata: Metadata = {
  title: "China IVF Regulations & Fertility Strategy 2026 | FertilityCareHub",
  description:
    "Structured analysis of fertility regulation, eligibility, clinic access, costs, documentation, travel, and treatment planning in China.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "China IVF Regulations & Fertility Strategy 2026",
    description:
      "Strategic fertility-jurisdiction analysis covering eligibility, clinic access, governance, costs, documentation, travel, and treatment planning in China.",
    url: pageUrl,
    siteName: "FertilityCareHub",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "China IVF Regulations & Fertility Strategy 2026",
    description:
      "Structured fertility-jurisdiction analysis for treatment planning in China.",
  },
};

const faqs = [
  {
    question: "Why do patients consider fertility treatment in China?",
    answer:
      "China may be considered for its large hospital systems, specialist depth, major urban medical centres, and established reproductive-medicine capacity. Practical suitability depends on current eligibility rules, institutional access, documentation, language support, treatment availability, and continuity-of-care planning.",
  },
  {
    question:
      "Can international patients access all fertility treatments in China?",
    answer:
      "No. Access may be limited by current national rules, institutional policy, residency or identity requirements, marital-status documentation, treatment type, and clinic eligibility. The proposed pathway should be confirmed directly before payments, medication orders, or travel.",
  },
  {
    question: "Are donor treatment and surrogacy available in China?",
    answer:
      "Donor treatment and surrogacy are subject to significant legal and policy restrictions. Availability, eligibility, documentation, and lawful alternatives should be confirmed with appropriately licensed medical and legal professionals.",
  },
  {
    question:
      "Does FertilityCareHub recommend specific fertility clinics in China?",
    answer:
      "FertilityCareHub does not publish public best-clinic rankings or paid promotional lists. Private advisory may include a carefully screened institutional shortlist based on eligibility, medical leadership, laboratory governance, communication, documentation, cost transparency, and pathway feasibility.",
  },
  {
    question:
      "What should international patients verify before planning treatment in China?",
    answer:
      "Patients should verify eligibility, required documents, treatment availability, responsible institution, consultation process, language support, monitoring requirements, medication access, cost estimates, visa and travel logistics, payment methods, records transfer, and follow-up responsibility.",
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
    title: "Questions to Ask a Fertility Clinic",
    href: "/questions-to-ask-a-fertility-clinic",
    description:
      "Use a structured checklist to verify access, protocols, costs, laboratory standards, communication, and follow-up.",
  },
  {
    title: "Fertility Treatment Travel Checklist",
    href: "/fertility-treatment-travel-checklist",
    description:
      "Plan medical records, medication, appointments, accommodation, transport, contingency time, and post-treatment care.",
  },
];

const relatedCountries = [
  {
    title: "United States",
    href: "/countries/united-states",
    description:
      "A large and highly varied fertility market with broad specialist depth, higher costs, and important state-level considerations.",
  },
  {
    title: "Canada",
    href: "/countries/canada",
    description:
      "A regulated, ethics-forward system where provincial access, clinic capacity, funding, and continuity of care shape the pathway.",
  },
  {
    title: "Spain",
    href: "/countries/spain",
    description:
      "A mature European destination with established international-patient pathways and significant donor-treatment experience.",
  },
];

export default function ChinaDossierPage() {
  return (
    <main className="min-h-screen bg-[#F5F1E8] text-[#1A1A1A]">
      <CountryWebPageSchema
        countryName="China"
        countrySlug="china"
        title="China: Fertility Jurisdiction Assessment"
        description="Strategic jurisdiction assessment covering fertility regulation, eligibility, clinic access, governance, costs, documentation, travel, and treatment planning in China."
      />

      <FAQSchema id="faq-china" items={faqs} />

      <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-6 sm:py-14 lg:px-8">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Countries", href: "/countries" },
            { name: "China", href: "/countries/china" },
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
            Review China Strategy Privately
          </Link>
        </section>

        <section className="border-b border-[#E5DDC8] pb-12 pt-14 text-center sm:pb-16 sm:pt-20">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-[#7B6A3A]">
            Strategic Advisory Dossier
          </p>

          <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.03em] sm:text-5xl lg:text-6xl">
            China Fertility Jurisdiction Assessment
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-[#5F584D] sm:text-lg">
            China has substantial reproductive-medicine capacity within major
            hospital systems, but access is shaped by a tightly controlled
            regulatory and institutional framework. Suitability depends first
            on eligibility, lawful treatment scope, documentation, institutional
            access, communication, travel feasibility, and continuity of care.
          </p>
        </section>

        <section className="py-12 sm:py-16">
          <div className="grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-6 sm:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#7B6A3A]">
                Strategic alignment
              </p>

              <h2 className="mt-3 text-2xl font-semibold">
                When China may be a viable fit
              </h2>

              <ul className="mt-5 space-y-3 pl-5 text-[15px] leading-7 text-[#5F584D] marker:text-[#B89B5E]">
                <li>
                  Your proposed treatment is clearly available under current
                  rules and institutional policy.
                </li>
                <li>
                  You can satisfy all identity, relationship-status, medical,
                  and documentation requirements.
                </li>
                <li>
                  You have access to a suitable hospital or authorized
                  reproductive-medicine centre.
                </li>
                <li>
                  You are prepared for structured communication, scheduling,
                  translation, and local coordination.
                </li>
                <li>
                  You have a clear plan for monitoring, records transfer, and
                  follow-up after treatment.
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
                  Your required pathway is restricted, unavailable, or cannot
                  be confirmed in writing.
                </li>
                <li>
                  You want an open international medical-tourism marketplace
                  with broad clinic choice.
                </li>
                <li>
                  Donor, surrogacy, family-status, or documentation constraints
                  conflict with your needs.
                </li>
                <li>
                  You require simple remote onboarding with minimal
                  administrative friction.
                </li>
                <li>
                  You cannot establish reliable language, payment, travel, or
                  follow-up support.
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
              How to evaluate China as a treatment jurisdiction
            </h2>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <div>
                <h3 className="text-lg font-semibold">Eligibility first</h3>
                <p className="mt-3 text-sm leading-7 text-[#5F584D]">
                  Confirm the lawful pathway, patient eligibility, required
                  documents, institutional policy, and treatment access before
                  comparing costs or scheduling travel.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold">
                  Institutional suitability
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#5F584D]">
                  Evaluate the responsible hospital or centre, medical
                  leadership, laboratory governance, treatment scope,
                  communication, and international-patient coordination.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold">Execution feasibility</h3>
                <p className="mt-3 text-sm leading-7 text-[#5F584D]">
                  Map consultation, monitoring, medication, payment, travel,
                  language support, procedures, records, and follow-up into one
                  workable plan.
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
              Establish feasibility before selecting a provider
            </h2>

            <p className="mt-5 leading-8 text-[#5F584D]">
              China should not be approached as a broad clinic-shopping market.
              The central questions are whether the pathway is lawful, whether
              the patient is eligible, whether the institution can accept the
              case, and whether the complete treatment process can be executed
              safely and predictably.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <article className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-6">
              <h3 className="text-xl font-semibold">
                Eligibility and legal scope
              </h3>

              <ul className="mt-4 space-y-3 pl-5 text-sm leading-7 text-[#5F584D] marker:text-[#B89B5E]">
                <li>
                  Confirm the treatment is permitted for the patient’s profile.
                </li>
                <li>
                  Clarify marital-status, identity, medical-indication, and
                  document requirements.
                </li>
                <li>
                  Verify restrictions affecting donor treatment, surrogacy, or
                  other specialized pathways.
                </li>
                <li>
                  Obtain professional guidance when legal interpretation is
                  required.
                </li>
              </ul>
            </article>

            <article className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-6">
              <h3 className="text-xl font-semibold">
                Institution and laboratory governance
              </h3>

              <ul className="mt-4 space-y-3 pl-5 text-sm leading-7 text-[#5F584D] marker:text-[#B89B5E]">
                <li>
                  Confirm that the institution is authorized for the proposed
                  treatment.
                </li>
                <li>
                  Identify responsible medical and laboratory leadership.
                </li>
                <li>
                  Ask how quality controls, embryology continuity, and case
                  escalation are managed.
                </li>
                <li>
                  Require written clarity on protocols, exclusions, and
                  responsibility.
                </li>
              </ul>
            </article>

            <article className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-6">
              <h3 className="text-xl font-semibold">
                Documentation and communication
              </h3>

              <ul className="mt-4 space-y-3 pl-5 text-sm leading-7 text-[#5F584D] marker:text-[#B89B5E]">
                <li>
                  Confirm which documents must be original, certified,
                  translated, or recently issued.
                </li>
                <li>
                  Establish the working language for consultations and written
                  instructions.
                </li>
                <li>
                  Identify a reliable coordination contact and expected
                  response times.
                </li>
                <li>
                  Confirm how records, consent forms, results, and treatment
                  plans will be shared.
                </li>
              </ul>
            </article>

            <article className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-6">
              <h3 className="text-xl font-semibold">
                Cost structure and payment exposure
              </h3>

              <ul className="mt-4 space-y-3 pl-5 text-sm leading-7 text-[#5F584D] marker:text-[#B89B5E]">
                <li>
                  Request a written estimate only after treatment access is
                  confirmed.
                </li>
                <li>
                  Separate consultation, testing, medication, monitoring,
                  procedures, laboratory services, freezing, and storage.
                </li>
                <li>
                  Confirm payment methods, deposits, cancellation, refunds,
                  and currency-conversion exposure.
                </li>
                <li>
                  Add translation, local support, travel, accommodation, and
                  schedule-change costs.
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
                Build the medical and travel plan together
              </h2>

              <p className="mt-5 leading-8 text-[#5F584D]">
                Treatment in China may require more than booking appointments
                and accommodation. Visa requirements, institutional onboarding,
                payment access, translation, medication, monitoring, local
                transport, digital communication, and post-treatment records
                should be resolved before departure.
              </p>
            </div>

            <div className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-6 sm:p-8">
              <ol className="space-y-6">
                <li>
                  <div className="text-xs font-medium uppercase tracking-[0.14em] text-[#7B6A3A]">
                    Before commitment
                  </div>
                  <p className="mt-2 text-sm leading-7 text-[#5F584D]">
                    Confirm eligibility, institution acceptance, treatment
                    scope, documentation, communication, and estimated costs.
                  </p>
                </li>

                <li>
                  <div className="text-xs font-medium uppercase tracking-[0.14em] text-[#7B6A3A]">
                    Before departure
                  </div>
                  <p className="mt-2 text-sm leading-7 text-[#5F584D]">
                    Confirm visa, appointments, payment methods, medication,
                    accommodation, transport, translation, and contingency time.
                  </p>
                </li>

                <li>
                  <div className="text-xs font-medium uppercase tracking-[0.14em] text-[#7B6A3A]">
                    During treatment
                  </div>
                  <p className="mt-2 text-sm leading-7 text-[#5F584D]">
                    Keep written instructions, receipts, medication records,
                    laboratory reports, and an escalation contact.
                  </p>
                </li>

                <li>
                  <div className="text-xs font-medium uppercase tracking-[0.14em] text-[#7B6A3A]">
                    After returning home
                  </div>
                  <p className="mt-2 text-sm leading-7 text-[#5F584D]">
                    Confirm testing, medication, records transfer, emergency
                    guidance, and responsibility for continuing care.
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
                <li>Guaranteed access, eligibility, or treatment outcomes</li>
                <li>Unverified package prices presented as complete costs</li>
              </ul>

              <ul className="space-y-3 pl-5 text-sm leading-7 text-[#5F584D] marker:text-[#B89B5E]">
                <li>Medical diagnosis or individualized treatment decisions</li>
                <li>Legal conclusions about restricted treatment pathways</li>
                <li>One-size-fits-all institution recommendations</li>
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
                Compare China before planning treatment
              </h2>

              <p className="mt-5 leading-8 text-[#5F584D]">
                Compare lawful access, eligibility, institution type,
                documentation, donor restrictions, costs, communication,
                travel, and continuity of care before deciding whether China is
                the strongest jurisdiction for your pathway.
              </p>
            </div>

            <div className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-6 sm:p-8">
              <h3 className="text-xl font-semibold">
                Use the comparison framework
              </h3>

              <p className="mt-4 text-sm leading-7 text-[#625A4C]">
                Begin with the structured jurisdiction guide, then review the
                complete comparison library to understand how China differs
                from more open international-treatment markets.
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
              China fertility-planning FAQ
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
              Evaluate China against your actual pathway
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-8 text-[#D4D0C8]">
              FertilityCareHub helps structure eligibility, institutional
              access, documentation, clinic, cost, language, travel, and
              continuity-of-care decisions around your priorities and
              constraints.
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
            financial, immigration, or regulatory advice. Eligibility,
            regulations, institutional policies, treatment access, costs,
            documentation, and clinical practices may change and should be
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
