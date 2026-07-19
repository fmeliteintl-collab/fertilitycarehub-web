import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "../../components/Breadcrumbs";
import CountryWebPageSchema from "../../components/CountryWebPageSchema";
import FAQSchema from "../../components/FAQSchema";

const baseUrl = "https://fertilitycarehub.com";
const pageUrl = `${baseUrl}/countries/canada`;

export const metadata: Metadata = {
  title: "Canada IVF Regulations & Fertility Strategy 2026 | FertilityCareHub",
  description:
    "Structured analysis of fertility regulation, provincial access, clinic standards, costs, donor pathways, surrogacy, and treatment planning in Canada.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Canada IVF Regulations & Fertility Strategy 2026",
    description:
      "Strategic fertility-jurisdiction analysis covering regulation, provincial access, clinic standards, costs, donor pathways, surrogacy, and planning in Canada.",
    url: pageUrl,
    siteName: "FertilityCareHub",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Canada IVF Regulations & Fertility Strategy 2026",
    description:
      "Structured fertility-jurisdiction analysis for treatment planning in Canada.",
  },
};

const faqs = [
  {
    question: "Why do patients consider fertility treatment in Canada?",
    answer:
      "Canada is often considered for its regulated healthcare environment, established fertility clinics, ethical safeguards, and continuity of care. Suitability depends on province, clinic capacity, treatment eligibility, wait times, funding rules, total costs, and the patient’s required pathway.",
  },
  {
    question: "Is fertility treatment publicly funded across Canada?",
    answer:
      "Coverage and funding differ by province and may be limited by eligibility rules, treatment type, clinic participation, medication coverage, age criteria, and available program capacity. Patients should confirm current provincial and clinic-specific requirements directly.",
  },
  {
    question: "Are egg and sperm donation permitted in Canada?",
    answer:
      "Donor-assisted reproduction is available within a regulated framework, but compensation, reimbursement, sourcing, screening, consent, and clinic practices are subject to legal and professional requirements. Availability and timelines may differ between clinics.",
  },
  {
    question: "Is surrogacy legal in Canada?",
    answer:
      "Altruistic surrogacy is permitted within a regulated framework, while commercial payment is prohibited. Reimbursement, parentage, independent legal advice, provincial law, and medical eligibility require careful professional guidance.",
  },
  {
    question:
      "Does FertilityCareHub recommend specific fertility clinics in Canada?",
    answer:
      "FertilityCareHub does not publish public best-clinic rankings or paid promotional lists. Private advisory may include a curated shortlist based on licensing, medical leadership, laboratory governance, communication, transparency, access, costs, and pathway fit.",
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
    title: "IVF Abroad vs Canada",
    href: "/ivf-abroad-vs-canada",
    description:
      "Compare domestic treatment with international pathways across access, timelines, costs, travel, and continuity of care.",
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
    title: "United Kingdom",
    href: "/countries/united-kingdom",
    description:
      "A governance-focused system with centralized oversight, clinic reporting, and clearly structured treatment regulation.",
  },
  {
    title: "Spain",
    href: "/countries/spain",
    description:
      "A mature European destination with established international-patient pathways and significant donor-treatment experience.",
  },
];

export default function CanadaDossierPage() {
  return (
    <main className="min-h-screen bg-[#F5F1E8] text-[#1A1A1A]">
      <CountryWebPageSchema
        countryName="Canada"
        countrySlug="canada"
        title="Canada: Fertility Jurisdiction Assessment"
        description="Strategic jurisdiction assessment covering fertility regulation, provincial access, clinic standards, costs, donor pathways, surrogacy, and treatment planning in Canada."
      />

      <FAQSchema id="faq-canada" items={faqs} />

      <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-6 sm:py-14 lg:px-8">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Countries", href: "/countries" },
            { name: "Canada", href: "/countries/canada" },
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
            Review Canada Strategy Privately
          </Link>
        </section>

        <section className="border-b border-[#E5DDC8] pb-12 pt-14 text-center sm:pb-16 sm:pt-20">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-[#7B6A3A]">
            Strategic Advisory Dossier
          </p>

          <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.03em] sm:text-5xl lg:text-6xl">
            Canada Fertility Jurisdiction Assessment
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-[#5F584D] sm:text-lg">
            Canada offers a regulated, ethics-forward fertility environment
            with established clinical infrastructure and strong continuity of
            care. Its practical fit depends on provincial access, clinic
            capacity, treatment eligibility, funding rules, donor or surrogacy
            requirements, timelines, and the complete cost of the pathway.
          </p>
        </section>

        <section className="py-12 sm:py-16">
          <div className="grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-6 sm:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#7B6A3A]">
                Strategic alignment
              </p>

              <h2 className="mt-3 text-2xl font-semibold">
                When Canada may be a strong fit
              </h2>

              <ul className="mt-5 space-y-3 pl-5 text-[15px] leading-7 text-[#5F584D] marker:text-[#B89B5E]">
                <li>
                  You value a regulated clinical environment with clearly
                  defined ethical safeguards.
                </li>
                <li>
                  Continuity with Canadian physicians, laboratories, and
                  follow-up care is important.
                </li>
                <li>
                  Your required treatment pathway is available within current
                  federal, provincial, and clinic rules.
                </li>
                <li>
                  You are prepared to compare provincial access, wait times,
                  funding, and private costs.
                </li>
                <li>
                  You prefer domestic treatment over the additional complexity
                  of cross-border care.
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
                  Your required pathway is restricted, unavailable, or
                  difficult to access under Canadian rules.
                </li>
                <li>
                  Provincial or clinic wait times conflict with your medical
                  or personal timeline.
                </li>
                <li>
                  You are seeking a substantially lower total treatment cost.
                </li>
                <li>
                  Donor availability or another pathway constraint creates
                  material delay.
                </li>
                <li>
                  You need a highly specialized option that is more accessible
                  elsewhere.
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
              How to evaluate Canada as a treatment jurisdiction
            </h2>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <div>
                <h3 className="text-lg font-semibold">Provincial access</h3>
                <p className="mt-3 text-sm leading-7 text-[#5F584D]">
                  Compare funding, eligibility, referral requirements, wait
                  times, medication coverage, and clinic participation within
                  the relevant province.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold">
                  Clinic and laboratory quality
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#5F584D]">
                  Examine medical leadership, laboratory governance,
                  embryology continuity, treatment protocols, communication,
                  and success-rate reporting.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold">Pathway feasibility</h3>
                <p className="mt-3 text-sm leading-7 text-[#5F584D]">
                  Confirm treatment access, donor availability, surrogacy
                  requirements, documentation, costs, timing, and follow-up
                  before committing.
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
              Evaluate the complete Canadian treatment pathway
            </h2>

            <p className="mt-5 leading-8 text-[#5F584D]">
              Canada should not be assessed as a single uniform market.
              Provincial programs, clinic capacity, eligibility, funding,
              medication coverage, donor access, wait times, and costs can
              differ substantially. The correct decision depends on the
              complete pathway rather than national reputation alone.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <article className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-6">
              <h3 className="text-xl font-semibold">
                Regulation and ethical boundaries
              </h3>

              <ul className="mt-4 space-y-3 pl-5 text-sm leading-7 text-[#5F584D] marker:text-[#B89B5E]">
                <li>
                  Confirm how federal law, provincial law, and clinic policy
                  apply to the proposed pathway.
                </li>
                <li>
                  Review donor compensation, reimbursement, consent, screening,
                  and record requirements.
                </li>
                <li>
                  Obtain independent legal guidance for surrogacy and parentage
                  matters.
                </li>
                <li>
                  Resolve uncertainty before deposits, medication, or treatment
                  scheduling.
                </li>
              </ul>
            </article>

            <article className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-6">
              <h3 className="text-xl font-semibold">
                Provincial funding and wait times
              </h3>

              <ul className="mt-4 space-y-3 pl-5 text-sm leading-7 text-[#5F584D] marker:text-[#B89B5E]">
                <li>
                  Confirm current funding eligibility and whether the clinic
                  participates.
                </li>
                <li>
                  Separate publicly funded services from medication and
                  uncovered costs.
                </li>
                <li>
                  Ask about consultation, funded-cycle, donor, and procedure
                  wait times.
                </li>
                <li>
                  Compare the value of waiting with privately funded or
                  international alternatives.
                </li>
              </ul>
            </article>

            <article className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-6">
              <h3 className="text-xl font-semibold">
                Clinic governance and success rates
              </h3>

              <ul className="mt-4 space-y-3 pl-5 text-sm leading-7 text-[#5F584D] marker:text-[#B89B5E]">
                <li>
                  Confirm licensing, responsible medical leadership, and
                  laboratory oversight.
                </li>
                <li>
                  Interpret outcomes by age, treatment type, donor use,
                  denominator, and endpoint.
                </li>
                <li>
                  Distinguish pregnancy rates from live-birth and cumulative
                  outcomes.
                </li>
                <li>
                  Ask how the clinic manages communication, cancellations, and
                  urgent questions.
                </li>
              </ul>
            </article>

            <article className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-6">
              <h3 className="text-xl font-semibold">
                Cost structure and financial exposure
              </h3>

              <ul className="mt-4 space-y-3 pl-5 text-sm leading-7 text-[#5F584D] marker:text-[#B89B5E]">
                <li>
                  Separate consultation, testing, medication, monitoring,
                  procedures, laboratory services, freezing, and storage.
                </li>
                <li>
                  Confirm donor, legal, counselling, shipping, and coordination
                  costs where applicable.
                </li>
                <li>
                  Review cancellation, low-response, repeat-cycle, and refund
                  policies.
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
                Domestic treatment planning
              </p>

              <h2 className="mt-4 text-3xl font-semibold">
                Reduce friction across province, clinic, and care team
              </h2>

              <p className="mt-5 leading-8 text-[#5F584D]">
                Domestic treatment may simplify continuity of care, but travel,
                monitoring, work leave, accommodation, referrals, and clinic
                scheduling can still create meaningful complexity. These
                responsibilities should be mapped before treatment begins.
              </p>
            </div>

            <div className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-6 sm:p-8">
              <ol className="space-y-6">
                <li>
                  <div className="text-xs font-medium uppercase tracking-[0.14em] text-[#7B6A3A]">
                    Before clinic selection
                  </div>
                  <p className="mt-2 text-sm leading-7 text-[#5F584D]">
                    Compare access, wait times, funding, treatment scope,
                    laboratory quality, communication, and total costs.
                  </p>
                </li>

                <li>
                  <div className="text-xs font-medium uppercase tracking-[0.14em] text-[#7B6A3A]">
                    Before treatment
                  </div>
                  <p className="mt-2 text-sm leading-7 text-[#5F584D]">
                    Complete referrals, records, testing, medication planning,
                    consent, financial estimates, and scheduling.
                  </p>
                </li>

                <li>
                  <div className="text-xs font-medium uppercase tracking-[0.14em] text-[#7B6A3A]">
                    During treatment
                  </div>
                  <p className="mt-2 text-sm leading-7 text-[#5F584D]">
                    Keep written instructions, medication records, results,
                    receipts, and a clear escalation contact.
                  </p>
                </li>

                <li>
                  <div className="text-xs font-medium uppercase tracking-[0.14em] text-[#7B6A3A]">
                    After treatment
                  </div>
                  <p className="mt-2 text-sm leading-7 text-[#5F584D]">
                    Confirm testing, medication, records transfer, pregnancy
                    care, emergency guidance, and future embryo or storage
                    decisions.
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
                <li>Outdated funding or pricing presented as universal</li>
              </ul>

              <ul className="space-y-3 pl-5 text-sm leading-7 text-[#5F584D] marker:text-[#B89B5E]">
                <li>Medical diagnosis or individualized treatment decisions</li>
                <li>Legal conclusions about donor, surrogacy, or parentage matters</li>
                <li>One-size-fits-all province or clinic recommendations</li>
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
                Compare Canada with international alternatives
              </h2>

              <p className="mt-5 leading-8 text-[#5F584D]">
                Compare access, regulation, clinic capacity, donor pathways,
                total costs, timelines, travel, and continuity of care before
                deciding whether domestic treatment or an international
                pathway is stronger.
              </p>
            </div>

            <div className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-6 sm:p-8">
              <h3 className="text-xl font-semibold">
                Use the comparison framework
              </h3>

              <p className="mt-4 text-sm leading-7 text-[#625A4C]">
                Start with the Canada-versus-abroad guide, then use the
                jurisdiction framework and comparison library to evaluate
                realistic alternatives.
              </p>

              <div className="mt-6 flex flex-col items-start gap-3">
                <Link
                  href="/ivf-abroad-vs-canada"
                  className="font-medium text-[#715F33] underline underline-offset-4"
                >
                  Read IVF Abroad vs Canada →
                </Link>

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
              Canada fertility-planning FAQ
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
              Evaluate Canada against your actual pathway
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-8 text-[#D4D0C8]">
              FertilityCareHub helps structure province, clinic, access,
              funding, cost, donor, surrogacy, timeline, and continuity-of-care
              decisions around your priorities and constraints.
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
            financial, or regulatory advice. Funding programs, eligibility,
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
