import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "../components/Breadcrumbs";

const baseUrl = "https://fertilitycarehub.com";
const pageUrl = `${baseUrl}/spain-vs-greece-for-fertility-treatment`;

const comparisonFactors = [
  {
    number: "01",
    title: "Regulatory framework",
    spain:
      "Spain regulates assisted reproduction through national legislation, including requirements for treatment centres, consent, donation, and permitted techniques. Clinic authorization and regional implementation should be verified directly.",
    greece:
      "Greece regulates medically assisted reproduction through national law and oversight by the Hellenic National Authority of Medically Assisted Reproduction. Clinic licensing and current operational status should be confirmed.",
    questions: [
      "Which authority licenses the clinic?",
      "Is the clinic's licence current?",
      "Which rules are national and which are clinic-specific?",
      "How are complaints or incidents handled?",
    ],
  },
  {
    number: "02",
    title: "Eligibility and patient profile",
    spain:
      "Access may depend on the treatment requested, medical suitability, age, clinic policy, and the legal framework applying to the patient.",
    greece:
      "Access may depend on medical suitability, age, treatment type, required approvals, clinic policy, and current national rules.",
    questions: [
      "Does the clinic accept the patient's age and family circumstances?",
      "Is prior approval required?",
      "Are there treatment-specific restrictions?",
      "Which eligibility rules could change before treatment begins?",
    ],
  },
  {
    number: "03",
    title: "Egg and sperm donation",
    spain:
      "Spain has an established donor-treatment sector. Donor anonymity, screening, matching, consent, and record-retention rules should be reviewed carefully with the clinic.",
    greece:
      "Greece also offers donor pathways. Current rules on donor identity, screening, matching, consent, and future information access should be confirmed before treatment.",
    questions: [
      "Is donation anonymous or identity-release?",
      "What medical and genetic screening is performed?",
      "How are donors matched?",
      "What information may be available later?",
    ],
  },
  {
    number: "04",
    title: "Clinic and laboratory governance",
    spain:
      "Spain has a large fertility-treatment market with significant clinic choice. Patients should compare laboratory leadership, quality systems, traceability, and clinical accountability rather than relying on brand visibility.",
    greece:
      "Greece has a substantial assisted-reproduction sector overseen by a national authority. Patients should still verify laboratory governance, staffing, quality control, and clinic-specific accountability.",
    questions: [
      "Who leads the medical and embryology teams?",
      "What quality-assurance systems are used?",
      "How are specimens tracked and protected?",
      "What happens if laboratory or treatment incidents occur?",
    ],
  },
  {
    number: "05",
    title: "Treatment protocols and add-ons",
    spain:
      "Clinics may offer a wide range of protocols and laboratory services. Recommendations should be linked to the patient's circumstances and supported by a clear explanation.",
    greece:
      "Clinics may also offer varied protocols and treatment add-ons. Patients should distinguish clinically necessary services from optional or promotional additions.",
    questions: [
      "Why is the proposed protocol appropriate?",
      "Which add-ons are optional?",
      "What evidence supports each recommendation?",
      "Would another clinic recommend the same pathway?",
    ],
  },
  {
    number: "06",
    title: "Success-rate reporting",
    spain:
      "Published rates may use different outcomes, denominators, patient groups, donor categories, or reporting periods. Clinic comparisons require like-for-like definitions.",
    greece:
      "The same caution applies in Greece. A headline percentage should not be treated as proof of suitability or quality without understanding the underlying data.",
    questions: [
      "Is the rate pregnancy, ongoing pregnancy, or live birth?",
      "Is it per cycle, retrieval, transfer, or patient?",
      "Are donor and own-egg cycles separated?",
      "Are age groups and cancellations disclosed?",
    ],
  },
  {
    number: "07",
    title: "Costs and package structure",
    spain:
      "Spain may offer broad clinic choice across different price levels. Medication, testing, donor services, genetic testing, freezing, storage, and future transfers may be separate.",
    greece:
      "Greece may also present competitive private treatment pricing. Full cost comparison should include the same exclusions, variable expenses, and repeat-treatment exposure.",
    questions: [
      "What is included in the written quotation?",
      "Which services are mandatory but excluded?",
      "How long is the quote valid?",
      "What would a repeat attempt cost?",
    ],
  },
  {
    number: "08",
    title: "Travel and treatment logistics",
    spain:
      "Spain offers multiple major treatment hubs with broad international transport links, but the practical burden depends on clinic location, monitoring requirements, and treatment timing.",
    greece:
      "Greece also has established treatment centres and international access, though route availability, island or mainland location, seasonal travel, and local transport may affect planning.",
    questions: [
      "How many visits are required?",
      "Can monitoring be completed at home?",
      "How flexible must travel dates remain?",
      "What happens if treatment is delayed?",
    ],
  },
  {
    number: "09",
    title: "Language and communication",
    spain:
      "Many clinics serving international patients provide English-language coordination, but written consent, emergency communication, and clinical records should be confirmed.",
    greece:
      "Many Greek clinics also support international patients. Patients should verify language access for medical discussions, consent documents, medication instructions, and follow-up.",
    questions: [
      "Who is the named coordinator?",
      "Are all key documents available in an understandable language?",
      "How are urgent questions handled?",
      "Will complete records be supplied after treatment?",
    ],
  },
  {
    number: "10",
    title: "Continuity of care and documentation",
    spain:
      "Patients should confirm how records, prescriptions, monitoring plans, and follow-up instructions will be transferred to providers at home.",
    greece:
      "The same continuity planning is essential in Greece, especially when treatment changes, complications, or pregnancy follow-up must be managed after return.",
    questions: [
      "Who manages care before arrival and after return?",
      "How quickly are records released?",
      "Who handles complications or urgent concerns?",
      "Are certified translations needed?",
    ],
  },
];

const decisionSteps = [
  {
    title: "Confirm jurisdiction-level suitability",
    description:
      "Verify current eligibility, donor rules, treatment availability, documentation, and any approvals required in each country.",
  },
  {
    title: "Compare equivalent clinics",
    description:
      "Shortlist clinics with similar services, patient profiles, laboratory capabilities, and treatment pathways.",
  },
  {
    title: "Normalize success-rate definitions",
    description:
      "Compare the same outcome, denominator, age group, donor category, and reporting period.",
  },
  {
    title: "Build a complete cost and travel model",
    description:
      "Include treatment, medication, testing, donor, storage, transfer, travel, accommodation, documentation, and contingency costs.",
  },
  {
    title: "Assess execution risk",
    description:
      "Review communication, scheduling, local monitoring, record transfer, legal review, follow-up, and the consequences of delay or cancellation.",
  },
];

const spainMayFit = [
  "The patient values a broad clinic market and multiple major treatment hubs.",
  "The preferred donor or treatment pathway is available and clearly explained.",
  "Direct travel and clinic coordination are practical from the patient's location.",
  "The selected clinic demonstrates strong laboratory and communication governance.",
  "The complete cost and repeat-treatment plan remains acceptable.",
];

const greeceMayFit = [
  "The patient's pathway aligns with current Greek eligibility and approval requirements.",
  "A suitable clinic offers clear donor, laboratory, and treatment governance.",
  "The travel plan remains practical despite timing or seasonal changes.",
  "The complete package and additional costs are transparent.",
  "Continuity of care and documentation can be coordinated reliably.",
];

const redFlags = [
  "The decision is based only on country reputation or package price.",
  "The clinic guarantees pregnancy or live birth.",
  "Donor identity, screening, consent, or record-retention rules are unclear.",
  "The clinic cannot identify its licensing authority or current licence.",
  "Success rates are presented without definitions or patient context.",
  "The quotation omits medication, storage, transfers, or mandatory services.",
  "Consent documents are not available in a language the patient understands.",
  "There is no plan for monitoring before travel or follow-up after return.",
  "Travel dates are treated as fixed despite possible clinical changes.",
  "The patient has not confirmed that the pathway is recognized at home.",
];

const faqs = [
  {
    question: "Is Spain or Greece better for IVF?",
    answer:
      "Neither country is inherently better for every patient. Suitability depends on eligibility, donor needs, treatment type, clinic governance, costs, travel, documentation, and continuity of care.",
  },
  {
    question: "Which country is usually cheaper?",
    answer:
      "Prices vary significantly by clinic and pathway. Compare complete costs, including medication, donor services, testing, freezing, storage, transfers, travel, accommodation, and repeat-treatment exposure.",
  },
  {
    question: "Can single women access treatment in Spain or Greece?",
    answer:
      "Access may be possible, but current eligibility depends on national law, treatment type, age, medical suitability, and clinic policy. Confirm directly before relying on general information.",
  },
  {
    question: "Are egg donors anonymous in Spain and Greece?",
    answer:
      "Both countries have donor frameworks, but current identity, disclosure, consent, screening, and record-retention rules should be confirmed with the clinic and qualified legal professionals.",
  },
  {
    question: "Should success rates decide between Spain and Greece?",
    answer:
      "No. Rates are useful only when definitions, patient groups, donor use, age, treatment type, and denominators match. Clinic governance and patient suitability remain equally important.",
  },
  {
    question: "Does FertilityCareHub recommend one country?",
    answer:
      "No. FertilityCareHub provides a structured comparison framework rather than a universal ranking or recommendation.",
  },
];

export const metadata: Metadata = {
  title: "Spain vs Greece for Fertility Treatment | IVF Comparison",
  description:
    "Compare Spain and Greece for fertility treatment across eligibility, donor pathways, clinic governance, success-rate reporting, costs, travel, communication, and continuity of care.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Spain vs Greece for Fertility Treatment | FertilityCareHub",
    description:
      "A structured comparison of Spain and Greece across fertility access, donor pathways, clinic governance, costs, travel, documentation, and follow-up.",
    url: pageUrl,
    siteName: "FertilityCareHub",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Spain vs Greece for Fertility Treatment | FertilityCareHub",
    description:
      "Compare two established European fertility destinations using a structured planning framework.",
  },
};

export default function SpainVsGreeceFertilityTreatmentPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Spain vs Greece for Fertility Treatment",
    description:
      "A structured comparison of Spain and Greece for fertility treatment across eligibility, donor pathways, clinic governance, treatment practices, success-rate reporting, costs, travel, communication, documentation, and continuity of care.",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "FertilityCareHub",
      url: baseUrl,
    },
    author: {
      "@type": "Organization",
      name: "FertilityCareHub",
    },
    datePublished: "2026-07-15",
    dateModified: "2026-07-15",
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
        name: "Guides",
        item: `${baseUrl}/guides`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Spain vs Greece for Fertility Treatment",
        item: pageUrl,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="min-h-screen bg-[#F5F1E8] text-[#1A1A1A]">
        <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-6 sm:py-14 lg:px-8">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Guides", href: "/guides" },
              {
                name: "Spain vs Greece for Fertility Treatment",
                href: "/spain-vs-greece-for-fertility-treatment",
              },
            ]}
          />

          <section className="border-b border-[#E5DDC8] pb-12 pt-10 text-center sm:pb-16 sm:pt-14">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-[#7B6A3A]">
              European Jurisdiction Comparison
            </p>

            <h1 className="mx-auto max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.03em] sm:text-5xl lg:text-6xl">
              Spain vs Greece for Fertility Treatment
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-[#5F584D] sm:text-lg">
              Spain and Greece are established European fertility destinations,
              but country reputation alone should not determine the choice.
              Compare eligibility, donor frameworks, clinic governance, costs,
              travel, documentation, and continuity of care.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/compare/spain-vs-greece-ivf-regulations"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#1A1A1A] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#343434]"
              >
                View the regulation comparison
              </Link>

              <Link
                href="/consultation"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#B89B5E] px-6 py-3 text-sm font-medium text-[#6F5E31] transition hover:bg-[#EEE5D2]"
              >
                Request a strategy review
              </Link>
            </div>
          </section>

          <section className="py-10 sm:py-12">
            <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
              <aside className="rounded-2xl border border-[#D8C89F] bg-[#EEE5D2] p-6 sm:p-7">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#7B6A3A]">
                  Guide information
                </p>

                <dl className="mt-5 space-y-4 text-sm leading-6 text-[#5F584D]">
                  <div>
                    <dt className="font-semibold text-[#2A2824]">
                      Last reviewed
                    </dt>
                    <dd className="mt-1">July 15, 2026</dd>
                  </div>

                  <div>
                    <dt className="font-semibold text-[#2A2824]">
                      Framework version
                    </dt>
                    <dd className="mt-1">
                      FCH Global Fertility Intelligence Framework™ v1.0
                    </dd>
                  </div>

                  <div>
                    <dt className="font-semibold text-[#2A2824]">
                      Estimated reading time
                    </dt>
                    <dd className="mt-1">Approximately 16 minutes</dd>
                  </div>
                </dl>
              </aside>

              <div className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-6 sm:p-7">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#7B6A3A]">
                  Who this guide is for
                </p>

                <ul className="mt-5 grid gap-3 text-sm leading-6 text-[#5F584D] sm:grid-cols-2">
                  {[
                    "Patients comparing Spain and Greece",
                    "Couples evaluating donor-treatment pathways",
                    "Intended parents comparing European clinics",
                    "Families planning cross-border fertility treatment",
                  ].map((item) => (
                    <li key={item} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#B89B5E]"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="py-12 sm:py-16">
            <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
              <div className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-6 sm:p-8">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#7B6A3A]">
                  Executive summary
                </p>

                <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">
                  Compare the pathway, not the destination label
                </h2>

                <div className="mt-5 space-y-4 leading-8 text-[#5F584D]">
                  <p>
                    Both countries offer established fertility sectors and
                    international-patient services, but clinic quality,
                    laboratory governance, communication, pricing, and treatment
                    suitability vary within each country.
                  </p>

                  <p>
                    Jurisdiction-level rules matter, especially for eligibility,
                    donor treatment, consent, and documentation. Clinic-level
                    execution then determines how safely and transparently the
                    pathway is delivered.
                  </p>

                  <p>
                    The strongest choice is the country-clinic combination that
best aligns with the patient&apos;s medical needs, legal
circumstances, budget, travel capacity, and continuity plan.
                  </p>
                </div>
              </div>

              <aside className="rounded-2xl border border-[#D8C89F] bg-[#EEE5D2] p-6 sm:p-8">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#7B6A3A]">
                  Core principle
                </p>

                <blockquote className="mt-4 text-xl font-medium leading-8">
                  A country cannot compensate for a poorly governed clinic, and
                  a strong clinic cannot override unsuitable national rules.
                </blockquote>

                <p className="mt-5 text-sm leading-7 text-[#625A4C]">
                  Evaluate jurisdiction fit first, then clinic fit, then the
                  complete execution plan.
                </p>
              </aside>
            </div>
          </section>

          <section className="border-t border-[#E5DDC8] py-12 sm:py-16">
            <div className="max-w-3xl">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#7B6A3A]">
                Comparison framework
              </p>

              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
                Ten factors to assess
              </h2>
            </div>

            <div className="mt-10 space-y-6">
              {comparisonFactors.map((factor) => (
                <article
                  key={factor.number}
                  className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-6 sm:p-8"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#CDBA86] text-sm font-semibold text-[#7B6A3A]">
                      {factor.number}
                    </span>

                    <h3 className="pt-1 text-xl font-semibold">{factor.title}</h3>
                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <div className="rounded-xl border border-[#E5DDC8] bg-white/60 p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7B6A3A]">
                        Spain
                      </p>
                      <p className="mt-3 text-sm leading-7 text-[#5F584D]">
                        {factor.spain}
                      </p>
                    </div>

                    <div className="rounded-xl border border-[#E5DDC8] bg-white/60 p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7B6A3A]">
                        Greece
                      </p>
                      <p className="mt-3 text-sm leading-7 text-[#5F584D]">
                        {factor.greece}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 border-t border-[#E5DDC8] pt-5">
                    <p className="text-sm font-semibold text-[#37332D]">
                      Questions to ask
                    </p>

                    <ul className="mt-3 grid gap-2 text-sm leading-6 text-[#625A4C] sm:grid-cols-2">
                      {factor.questions.map((question) => (
                        <li key={question} className="flex gap-3">
                          <span
                            aria-hidden="true"
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#B89B5E]"
                          />
                          <span>{question}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="border-t border-[#E5DDC8] py-12 sm:py-16">
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-6 sm:p-8">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#7B6A3A]">
                  Spain may fit when
                </p>

                <ul className="mt-6 space-y-3 text-sm leading-7 text-[#5F584D]">
                  {spainMayFit.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#B89B5E]"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-[#D8C89F] bg-[#EEE5D2] p-6 sm:p-8">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#7B6A3A]">
                  Greece may fit when
                </p>

                <ul className="mt-6 space-y-3 text-sm leading-7 text-[#5F584D]">
                  {greeceMayFit.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#B89B5E]"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="border-t border-[#E5DDC8] py-12 sm:py-16">
            <div className="max-w-3xl">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#7B6A3A]">
                Practical process
              </p>

              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
                A five-step decision method
              </h2>
            </div>

            <ol className="mt-10 grid gap-5">
              {decisionSteps.map((step, index) => (
                <li
                  key={step.title}
                  className="grid gap-4 rounded-2xl border border-[#E5DDC8] bg-white/60 p-6 sm:grid-cols-[64px_1fr] sm:p-7"
                >
                  <div className="text-3xl font-semibold text-[#B89B5E]">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold">{step.title}</h3>
                    <p className="mt-2 leading-7 text-[#5F584D]">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="border-t border-[#E5DDC8] py-12 sm:py-16">
            <div className="rounded-2xl border border-[#D8C89F] bg-[#EEE5D2] p-6 sm:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#7B6A3A]">
                Red flags
              </p>

              <h2 className="mt-4 text-3xl font-semibold">
                Reasons to pause before choosing a destination
              </h2>

              <div className="mt-7 grid gap-4 md:grid-cols-2">
                {redFlags.map((redFlag) => (
                  <div
                    key={redFlag}
                    className="flex gap-3 rounded-xl border border-[#D6C69C] bg-white/50 p-4"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#A88947] text-xs font-bold text-[#7B6A3A]"
                    >
                      !
                    </span>

                    <p className="text-sm leading-6 text-[#5F584D]">
                      {redFlag}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="border-t border-[#E5DDC8] py-12 sm:py-16">
            <div className="max-w-3xl">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#7B6A3A]">
                Related resources
              </p>

              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
                Continue your research
              </h2>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Spain Dossier",
                  description:
                    "Review Spain-specific fertility planning considerations.",
                  href: "/countries/spain",
                },
                {
                  title: "Greece Dossier",
                  description:
                    "Review Greece-specific fertility planning considerations.",
                  href: "/countries/greece",
                },
                {
                  title: "Regulation Comparison",
                  description:
                    "Compare Spain and Greece at the regulatory level.",
                  href: "/compare/spain-vs-greece-ivf-regulations",
                },
                {
                  title: "Choose a Fertility Clinic",
                  description:
                    "Evaluate licensing, laboratory governance, and transparency.",
                  href: "/how-to-choose-a-fertility-clinic-abroad",
                },
                {
                  title: "Understand Success Rates",
                  description:
                    "Interpret clinic outcomes in the correct context.",
                  href: "/understanding-fertility-clinic-success-rates",
                },
                {
                  title: "Hidden Treatment Costs",
                  description:
                    "Compare complete financial exposure.",
                  href: "/hidden-costs-of-fertility-treatment-abroad",
                },
              ].map((resource) => (
                <Link
                  key={resource.href}
                  href={resource.href}
                  className="group rounded-xl border border-[#E5DDC8] bg-white/60 p-5 transition hover:border-[#B89B5E] hover:bg-white"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-semibold">{resource.title}</h3>
                    <span
                      aria-hidden="true"
                      className="text-[#8C7541] transition group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-[#625A4C]">
                    {resource.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          <section className="border-t border-[#E5DDC8] py-12 sm:py-16">
            <div className="max-w-3xl">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#7B6A3A]">
                Frequently asked questions
              </p>

              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">FAQ</h2>
            </div>

            <div className="mt-8 space-y-4">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-xl border border-[#E5DDC8] bg-white/60 p-5 sm:p-6"
                >
                  <summary className="cursor-pointer list-none pr-8 text-lg font-medium">
                    <span className="flex items-start justify-between gap-4">
                      <span>{faq.question}</span>
                      <span
                        aria-hidden="true"
                        className="text-xl text-[#8C7541] transition group-open:rotate-45"
                      >
                        +
                      </span>
                    </span>
                  </summary>

                  <p className="mt-4 max-w-4xl leading-7 text-[#5F584D]">
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
                Compare Spain and Greece against your actual pathway
              </h2>

              <p className="mx-auto mt-5 max-w-2xl leading-8 text-[#D4D0C8]">
                FertilityCareHub helps structure decisions around eligibility,
                donor pathways, clinic governance, success-rate context, total
                costs, travel, documentation, and continuity of care.
              </p>

              <Link
                href="/consultation"
                className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full border border-[#D4BE82] px-6 py-3 text-sm font-medium text-[#F2E4BC] transition hover:bg-[#2D2D2D]"
              >
                Request a strategy review
              </Link>
            </div>
          </section>

          <section className="border-t border-[#E5DDC8] py-10">
            <div className="grid gap-8 text-sm leading-7 text-[#6A6256] md:grid-cols-2">
              <div>
                <h2 className="font-semibold text-[#2A2824]">
                  Review and methodology
                </h2>

                <p className="mt-3">
                  Last reviewed: July 15, 2026. Laws, clinic licences, age
                  requirements, donor rules, prices, travel access, and treatment
                  availability can change. Confirm current information directly.
                </p>
              </div>

              <div>
                <h2 className="font-semibold text-[#2A2824]">
                  Important limitation
                </h2>

                <p className="mt-3">
                  FertilityCareHub does not provide medical, legal, tax, or
                  financial advice and does not guarantee outcomes. Confirm
                  medical decisions with licensed clinicians and legal questions
                  with qualified professionals.
                </p>

                <Link
                  href="/disclaimer"
                  className="mt-3 inline-block font-medium text-[#715F33] underline underline-offset-4"
                >
                  Read the full disclaimer
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
