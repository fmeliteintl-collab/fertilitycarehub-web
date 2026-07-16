import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "../components/Breadcrumbs";

const baseUrl = "https://fertilitycarehub.com";
const pageUrl = `${baseUrl}/questions-to-ask-a-fertility-clinic`;

const questionSections = [
  {
    number: "01",
    title: "Licensing and regulatory standing",
    description:
      "Begin by confirming that the clinic is legally authorized to provide the treatment being discussed and that its current licensing position can be verified.",
    questions: [
      "Which public authority licenses or regulates the clinic?",
      "Can the clinic provide its current licence or registration details?",
      "Which services is the clinic authorized to provide?",
      "Are inspection, accreditation, or compliance records available?",
      "Has the clinic been subject to any recent restrictions or sanctions?",
    ],
  },
  {
    number: "02",
    title: "Clinical leadership and accountability",
    description:
      "Clarify who is responsible for treatment decisions, who reviews complex cases, and how continuity is maintained if the primary physician is unavailable.",
    questions: [
      "Who will be the responsible physician for my case?",
      "What are the physician&apos;s relevant qualifications and experience?",
      "How are treatment plans reviewed?",
      "Who makes decisions if the primary physician is unavailable?",
      "How are disagreements or complications escalated?",
    ],
  },
  {
    number: "03",
    title: "Embryology laboratory governance",
    description:
      "The laboratory is central to treatment quality. Ask about leadership, staffing, traceability, quality control, equipment monitoring, and incident procedures.",
    questions: [
      "Who directs the embryology laboratory?",
      "What quality-control systems are used?",
      "How are eggs, sperm, and embryos identified and tracked?",
      "How is equipment monitored and maintained?",
      "How are laboratory incidents documented and communicated?",
    ],
  },
  {
    number: "04",
    title: "Treatment-plan rationale",
    description:
      "The clinic should be able to explain why the proposed protocol fits the patient&apos;s circumstances rather than simply offering a standard package.",
    questions: [
      "Why is this protocol appropriate for me?",
      "Which alternatives were considered?",
      "What factors could cause the plan to change?",
      "What would lead to cancellation or postponement?",
      "Which parts of the plan are evidence-based versus optional?",
    ],
  },
  {
    number: "05",
    title: "Medication and monitoring",
    description:
      "Cross-border treatment can depend on local monitoring and rapid communication. Confirm who prescribes, who reviews results, and how medication changes are handled.",
    questions: [
      "Who will prescribe the medication?",
      "Can medication be purchased safely in my home country?",
      "Where can monitoring be completed?",
      "Who reviews ultrasound and bloodwork results?",
      "How quickly are medication changes communicated?",
    ],
  },
  {
    number: "06",
    title: "Success rates and reporting",
    description:
      "Success rates should be interpreted by outcome, denominator, patient group, treatment type, age, donor use, and reporting period.",
    questions: [
      "Is the reported outcome pregnancy, ongoing pregnancy, or live birth?",
      "Is the rate per cycle, retrieval, transfer, or patient?",
      "Are donor and own-egg cycles reported separately?",
      "Are fresh and frozen transfers separated?",
      "How are cancelled cycles and patients lost to follow-up handled?",
    ],
  },
  {
    number: "07",
    title: "Donor pathways",
    description:
      "Where donor eggs, sperm, or embryos are involved, review eligibility, identity rules, screening, matching, consent, record retention, and future information access.",
    questions: [
      "Is donation anonymous, identity-release, or known?",
      "What medical and genetic screening is performed?",
      "How are donors recruited and matched?",
      "What happens if the donor cycle is cancelled?",
      "What information may be available to the child later?",
    ],
  },
  {
    number: "08",
    title: "Embryo transfer practices",
    description:
      "Ask how embryo stage, embryo number, testing status, and transfer policy are determined, including the clinic&apos;s approach to multiple-pregnancy risk.",
    questions: [
      "How many embryos do you usually recommend transferring?",
      "How is the embryo-transfer decision made?",
      "What is the clinic&apos;s single-embryo transfer policy?",
      "How are multiple-pregnancy risks explained?",
      "What happens if no embryo is suitable for transfer?",
    ],
  },
  {
    number: "09",
    title: "Pricing and total financial exposure",
    description:
      "A headline package may exclude medication, testing, donor services, laboratory procedures, freezing, storage, transfers, travel, or repeat treatment.",
    questions: [
      "What exactly is included in the written quotation?",
      "Which mandatory costs are excluded?",
      "Which costs are variable?",
      "How long is the quote valid?",
      "What would another transfer or full repeat cycle cost?",
    ],
  },
  {
    number: "10",
    title: "Cancellation, refund, and storage terms",
    description:
      "Financial and practical consequences should be clear if the cycle is cancelled, delayed, produces no eggs, produces no embryo, or does not reach transfer.",
    questions: [
      "Which fees are refundable?",
      "Which deposits are non-refundable?",
      "Can unused fees be transferred to another cycle?",
      "What are the freezing and annual storage charges?",
      "What happens if storage fees are not renewed?",
    ],
  },
  {
    number: "11",
    title: "Communication and patient coordination",
    description:
      "International treatment requires reliable communication, clear response standards, named contacts, language support, and escalation procedures.",
    questions: [
      "Who is my primary point of contact?",
      "What are the response times for routine and urgent questions?",
      "Are consultations and documents available in a language I understand?",
      "Who should I contact outside normal hours?",
      "How are important changes confirmed in writing?",
    ],
  },
  {
    number: "12",
    title: "Travel, records, and continuity of care",
    description:
      "Confirm the expected travel schedule, how records are exchanged, and who manages care before arrival and after the patient returns home.",
    questions: [
      "How many trips are normally required?",
      "How flexible must travel dates remain?",
      "When will complete medical records be provided?",
      "Who coordinates with my local physician?",
      "Who manages urgent concerns after I return home?",
    ],
  },
];

const consultationSteps = [
  {
    title: "Send the questions in advance",
    description:
      "Providing a structured question list before the consultation gives the clinic time to prepare complete answers and relevant documents.",
  },
  {
    title: "Ask for written confirmation",
    description:
      "Important medical, donor, financial, legal, and operational information should not rely only on verbal assurances.",
  },
  {
    title: "Use the same questions for every clinic",
    description:
      "Consistent questions make it easier to compare clinics without being influenced by different sales presentations.",
  },
  {
    title: "Separate unresolved items",
    description:
      "Record which questions were not answered, which require legal or medical review, and which depend on future testing.",
  },
  {
    title: "Do not rush the deposit",
    description:
      "Review the treatment plan, quotation, consent documents, cancellation terms, and continuity plan before paying a non-refundable amount.",
  },
];

const redFlags = [
  "The clinic guarantees pregnancy or live birth.",
  "The clinic will not provide licensing details.",
  "The medical or laboratory leadership is unclear.",
  "Important questions receive only vague or promotional answers.",
  "Success rates are quoted without definitions or patient context.",
  "Donor identity, screening, consent, or record-retention rules are unclear.",
  "The written quotation omits major mandatory costs.",
  "Cancellation, refund, and storage terms are difficult to obtain.",
  "The clinic pressures the patient to pay immediately.",
  "There is no clear plan for urgent questions or post-treatment follow-up.",
];

const writtenDocuments = [
  "Current clinic licence or registration details",
  "Responsible physician and laboratory director",
  "Proposed treatment plan and alternatives",
  "Medication and monitoring instructions",
  "Success-rate definitions and patient-group context",
  "Donor-screening and identity framework, where relevant",
  "Complete quotation with included and excluded services",
  "Cancellation, refund, freezing, and storage terms",
  "Consent forms and treatment agreements",
  "Travel schedule and continuity-of-care plan",
  "Emergency and after-hours contact process",
  "Post-treatment records and discharge information",
];

const faqs = [
  {
    question: "How many clinics should I interview?",
    answer:
      "A focused shortlist is usually more useful than contacting many clinics. Compare enough providers to identify meaningful differences in governance, treatment reasoning, communication, costs, and fit.",
  },
  {
    question: "Should I send questions before the consultation?",
    answer:
      "Yes. Sending questions in advance can improve the quality of the consultation and gives the clinic an opportunity to provide documents or written explanations.",
  },
  {
    question: "What if the clinic refuses to answer a question?",
    answer:
      "Some questions may require medical review or cannot be answered until testing is complete. However, repeated vagueness around licensing, laboratory governance, pricing, donor rules, refunds, or follow-up should be treated cautiously.",
  },
  {
    question: "Are online reviews enough to evaluate a clinic?",
    answer:
      "No. Reviews may describe communication or patient experience, but they do not establish regulatory standing, laboratory governance, clinical suitability, or treatment quality.",
  },
  {
    question: "Should I ask about success rates?",
    answer:
      "Yes, but the rate must be interpreted by outcome, denominator, patient age, treatment type, donor use, embryo stage, and reporting period.",
  },
  {
    question: "Does FertilityCareHub endorse specific clinics?",
    answer:
      "No. FertilityCareHub provides structured evaluation principles rather than promotional rankings or guaranteed endorsements.",
  },
];

export const metadata: Metadata = {
  title: "Questions to Ask a Fertility Clinic | IVF Consultation Guide",
  description:
    "Use a structured checklist of questions to assess fertility clinic licensing, medical and laboratory leadership, treatment plans, success rates, donor pathways, costs, communication, refunds, storage, and follow-up.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Questions to Ask a Fertility Clinic | FertilityCareHub",
    description:
      "A structured fertility clinic consultation checklist covering governance, treatment, laboratory practices, success rates, donors, pricing, communication, and continuity of care.",
    url: pageUrl,
    siteName: "FertilityCareHub",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Questions to Ask a Fertility Clinic | FertilityCareHub",
    description:
      "Prepare for a fertility clinic consultation with a structured evaluation checklist.",
  },
};

export default function QuestionsToAskFertilityClinicPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Questions to Ask a Fertility Clinic",
    description:
      "A structured question framework for evaluating fertility clinic licensing, clinical and laboratory governance, treatment plans, success rates, donor pathways, costs, communication, cancellation terms, storage, travel, and continuity of care.",
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
        name: "Questions to Ask a Fertility Clinic",
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
                name: "Questions to Ask a Fertility Clinic",
                href: "/questions-to-ask-a-fertility-clinic",
              },
            ]}
          />

          <section className="border-b border-[#E5DDC8] pb-12 pt-10 text-center sm:pb-16 sm:pt-14">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-[#7B6A3A]">
              Fertility Clinic Consultation Guide
            </p>

            <h1 className="mx-auto max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.03em] sm:text-5xl lg:text-6xl">
              Questions to Ask a Fertility Clinic
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-[#5F584D] sm:text-lg">
              A productive clinic consultation should clarify regulatory
              standing, medical and laboratory leadership, treatment rationale,
              outcome reporting, donor pathways, complete costs, communication,
              cancellation terms, and continuity of care.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/how-to-choose-a-fertility-clinic-abroad"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#1A1A1A] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#343434]"
              >
                Review the clinic selection guide
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
                    <dd className="mt-1">Approximately 17 minutes</dd>
                  </div>
                </dl>
              </aside>

              <div className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-6 sm:p-7">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#7B6A3A]">
                  Who this guide is for
                </p>

                <ul className="mt-5 grid gap-3 text-sm leading-6 text-[#5F584D] sm:grid-cols-2">
                  {[
                    "Patients preparing for clinic consultations",
                    "Couples comparing multiple fertility providers",
                    "Intended parents evaluating donor pathways",
                    "Families planning international treatment",
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
                  Good questions reveal whether a clinic is transparent and suitable
                </h2>

                <div className="mt-5 space-y-4 leading-8 text-[#5F584D]">
                  <p>
                    Clinic consultations are often short and may focus heavily on
                    treatment packages. A prepared question framework helps
                    patients examine the areas that matter beyond sales
                    presentation.
                  </p>

                  <p>
                    Strong answers should be clear, specific, and consistent
                    with written documents. Important details about treatment,
                    donors, success rates, costs, refunds, storage, and follow-up
                    should not remain vague.
                  </p>

                  <p>
                    The purpose is not to find perfect answers to every question.
                    It is to identify whether the clinic&apos;s approach is
                    accountable, transparent, clinically reasoned, and executable
                    for the patient&apos;s circumstances.
                  </p>
                </div>
              </div>

              <aside className="rounded-2xl border border-[#D8C89F] bg-[#EEE5D2] p-6 sm:p-8">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#7B6A3A]">
                  Core principle
                </p>

                <blockquote className="mt-4 text-xl font-medium leading-8">
                  A trustworthy clinic should be able to explain what it
                  recommends, why it recommends it, what it costs, and what
                  happens if the plan changes.
                </blockquote>

                <p className="mt-5 text-sm leading-7 text-[#625A4C]">
                  Ask for written confirmation where an answer affects medical,
                  donor, financial, legal, or travel decisions.
                </p>
              </aside>
            </div>
          </section>

          <section className="border-t border-[#E5DDC8] py-12 sm:py-16">
            <div className="max-w-3xl">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#7B6A3A]">
                Consultation framework
              </p>

              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
                Twelve question categories
              </h2>

              <p className="mt-5 leading-8 text-[#5F584D]">
                Use the same categories for every clinic. Add medical questions
                specific to the patient after reviewing the proposed treatment
                pathway with a licensed fertility specialist.
              </p>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {questionSections.map((section) => (
                <article
                  key={section.number}
                  className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-6 sm:p-7"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#CDBA86] text-sm font-semibold text-[#7B6A3A]">
                      {section.number}
                    </span>

                    <div>
                      <h3 className="text-xl font-semibold">{section.title}</h3>
                      <p className="mt-3 leading-7 text-[#5F584D]">
                        {section.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-[#E5DDC8] pt-5">
                    <p className="text-sm font-semibold text-[#37332D]">
                      Questions to ask
                    </p>

                    <ul className="mt-3 space-y-2 text-sm leading-6 text-[#625A4C]">
                      {section.questions.map((question) => (
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
            <div className="max-w-3xl">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#7B6A3A]">
                Practical process
              </p>

              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
                A five-step consultation method
              </h2>
            </div>

            <ol className="mt-10 grid gap-5">
              {consultationSteps.map((step, index) => (
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
                Answers that should cause concern
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
            <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#7B6A3A]">
                  Written-document checklist
                </p>

                <h2 className="mt-4 text-3xl font-semibold">
                  Information to obtain before committing
                </h2>

                <p className="mt-5 leading-8 text-[#5F584D]">
                  Written records support comparison and reduce the risk of
                  relying on incomplete verbal explanations.
                </p>
              </div>

              <ul className="grid gap-3 rounded-2xl border border-[#E5DDC8] bg-white/60 p-6 sm:grid-cols-2 sm:p-8">
                {writtenDocuments.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-6 text-[#5F584D]"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#B89B5E]"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
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
                  title: "Choose a Fertility Clinic",
                  description:
                    "Use the broader clinic-selection framework.",
                  href: "/how-to-choose-a-fertility-clinic-abroad",
                },
                {
                  title: "Understand Success Rates",
                  description:
                    "Interpret clinic outcome statistics correctly.",
                  href: "/understanding-fertility-clinic-success-rates",
                },
                {
                  title: "Hidden Treatment Costs",
                  description:
                    "Identify the costs that package prices may exclude.",
                  href: "/hidden-costs-of-fertility-treatment-abroad",
                },
                {
                  title: "Compare Jurisdictions",
                  description:
                    "Confirm country fit before selecting a clinic.",
                  href: "/how-to-compare-fertility-jurisdictions",
                },
                {
                  title: "Guides Library",
                  description:
                    "Browse FertilityCareHub authority resources.",
                  href: "/guides",
                },
                {
                  title: "Private Advisory",
                  description:
                    "Review structured advisory pathways.",
                  href: "/advisory",
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
                Turn clinic answers into a structured comparison
              </h2>

              <p className="mx-auto mt-5 max-w-2xl leading-8 text-[#D4D0C8]">
                FertilityCareHub helps organize clinic responses around
                jurisdiction fit, governance, treatment needs, donor pathways,
                success-rate context, complete costs, communication,
                documentation, and execution risk.
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
                  Last reviewed: July 15, 2026. This guide provides a general
                  consultation framework. Appropriate questions may vary by
                  treatment type, medical history, donor pathway, jurisdiction,
                  and legal circumstances.
                </p>
              </div>

              <div>
                <h2 className="font-semibold text-[#2A2824]">
                  Important limitation
                </h2>

                <p className="mt-3">
                  FertilityCareHub does not provide medical diagnosis,
                  treatment, legal advice, or guaranteed outcomes. Confirm
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
