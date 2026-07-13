import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "../components/Breadcrumbs";

const baseUrl = "https://fertilitycarehub.com";
const pageUrl = `${baseUrl}/how-to-choose-a-fertility-clinic-abroad`;

const evaluationFactors = [
  {
    number: "01",
    title: "Licensing and regulatory standing",
    description:
      "Confirm that the clinic is licensed or otherwise authorized to provide fertility treatment in its jurisdiction and identify the public authority responsible for oversight.",
    questions: [
      "Which authority licenses or regulates the clinic?",
      "Can the clinic provide its current registration or licence details?",
      "Are inspection standards or compliance requirements publicly available?",
      "Has the clinic clearly explained which services it is authorized to provide?",
    ],
  },
  {
    number: "02",
    title: "Clinical leadership and accountability",
    description:
      "Evaluate who leads the medical team, how treatment decisions are reviewed, and whether responsibility remains clear throughout the patient journey.",
    questions: [
      "Who is the responsible physician for the treatment plan?",
      "What are the physician's relevant qualifications and experience?",
      "How are complex or changing cases reviewed?",
      "Who is accountable when the primary physician is unavailable?",
    ],
  },
  {
    number: "03",
    title: "Laboratory governance",
    description:
      "The embryology laboratory is central to treatment quality. Assess leadership, quality-control systems, equipment monitoring, traceability, staffing, and incident procedures.",
    questions: [
      "Who directs the embryology laboratory?",
      "Which quality-assurance standards are followed?",
      "How are specimens identified, tracked, and protected?",
      "How are laboratory incidents documented and communicated?",
    ],
  },
  {
    number: "04",
    title: "Treatment protocols and personalization",
    description:
      "A credible clinic should be able to explain why a proposed protocol is appropriate for the patient rather than presenting a standard package as suitable for everyone.",
    questions: [
      "How is the treatment protocol selected?",
      "Which alternatives were considered and why?",
      "How are medication changes handled during monitoring?",
      "What would cause the clinic to delay, modify, or cancel treatment?",
    ],
  },
  {
    number: "05",
    title: "Success-rate reporting",
    description:
      "Clinic outcomes should be interpreted in context. Compare definitions, denominators, patient age, donor use, treatment type, embryo stage, and reporting period.",
    questions: [
      "Is the outcome pregnancy, ongoing pregnancy, or live birth?",
      "Is the rate reported per cycle, retrieval, transfer, or patient?",
      "Are donor and non-donor cycles separated?",
      "Are cancellation and multiple-birth rates disclosed?",
    ],
  },
  {
    number: "06",
    title: "Donor program governance",
    description:
      "Where donor eggs, sperm, or embryos are involved, examine eligibility, screening, identity rules, matching, record retention, consent, and future information access.",
    questions: [
      "What medical and genetic screening is required?",
      "Is donation anonymous, identity-release, or known?",
      "How are donors recruited and matched?",
      "What records are retained and who may access them later?",
    ],
  },
  {
    number: "07",
    title: "Communication and coordination",
    description:
      "Cross-border treatment depends on timely, accurate communication. Review response standards, language support, named contacts, escalation procedures, and coordination with local clinicians.",
    questions: [
      "Who is the patient's primary point of contact?",
      "How quickly are routine and urgent questions answered?",
      "Are instructions and consent documents provided in an understandable language?",
      "How does the clinic coordinate monitoring completed at home?",
    ],
  },
  {
    number: "08",
    title: "Complete cost transparency",
    description:
      "A headline package price may exclude medications, testing, donor fees, freezing, storage, transfers, sedation, legal review, travel, or repeat-cycle costs.",
    questions: [
      "Which services are included in the written quotation?",
      "Which medicines, tests, and laboratory procedures are excluded?",
      "What additional costs may arise if the plan changes?",
      "How long is the quoted price valid?",
    ],
  },
  {
    number: "09",
    title: "Cancellation, refund, and storage terms",
    description:
      "Review the financial and practical consequences of cancellation, failed stimulation, no retrieval, no transferable embryo, postponed travel, or long-term storage.",
    questions: [
      "What happens financially if treatment is cancelled?",
      "Are any fees refundable or transferable?",
      "What are the storage charges and renewal terms?",
      "What happens to stored material if payments stop or circumstances change?",
    ],
  },
  {
    number: "10",
    title: "Continuity of care and follow-up",
    description:
      "A clinic should explain what happens before arrival, during treatment, after return home, and if complications, unexpected results, or urgent questions arise.",
    questions: [
      "What records will be provided after treatment?",
      "Who communicates with the patient's local physician?",
      "What follow-up is offered after the patient returns home?",
      "Who should be contacted for urgent concerns?",
    ],
  },
];

const selectionSteps = [
  {
    title: "Confirm jurisdiction fit first",
    description:
      "Eliminate countries that do not meet the patient's legal, eligibility, donor-pathway, documentation, or treatment requirements.",
  },
  {
    title: "Create a focused clinic shortlist",
    description:
      "Compare a manageable group of clinics within suitable jurisdictions rather than collecting large numbers of unverified options.",
  },
  {
    title: "Request written information",
    description:
      "Ask for written explanations of licensing, laboratory leadership, treatment planning, success-rate definitions, pricing, cancellation terms, and follow-up.",
  },
  {
    title: "Compare answers consistently",
    description:
      "Use the same questions and scoring criteria for every clinic so that marketing presentation does not distort the comparison.",
  },
  {
    title: "Verify before committing",
    description:
      "Confirm current rules, medical suitability, costs, consent documents, legal implications, and travel requirements with appropriately licensed professionals.",
  },
];

const redFlags = [
  "The clinic guarantees pregnancy, live birth, or a specific outcome.",
  "Success rates are presented without explaining the patient group, denominator, treatment type, or reported endpoint.",
  "The clinic will not identify its medical or laboratory leadership.",
  "Important questions receive only sales language or vague reassurances.",
  "The written quotation excludes major costs without clearly identifying them.",
  "Donor screening, identity rules, matching, or record retention are unclear.",
  "Pressure is used to obtain payment before documents or terms can be reviewed.",
  "Cancellation, refund, storage, or repeat-cycle terms are difficult to obtain.",
  "There is no clear plan for urgent concerns or follow-up after returning home.",
  "The clinic discourages independent medical or legal review.",
];

const checklist = [
  "Current clinic licence or registration details",
  "Responsible physician and laboratory director",
  "Proposed treatment protocol and alternatives",
  "Success-rate definitions and patient-group context",
  "Donor screening and identity framework, where relevant",
  "Complete written quotation and exclusions",
  "Cancellation, refund, freezing, and storage terms",
  "Monitoring and travel schedule",
  "Communication and escalation process",
  "Post-treatment records and continuity-of-care plan",
];

const faqs = [
  {
    question: "Should I choose a country or a clinic first?",
    answer:
      "Jurisdiction suitability should usually be assessed first because national laws, eligibility rules, donor frameworks, and documentation requirements can eliminate otherwise attractive clinics. Clinic-level evaluation should follow within the jurisdictions that remain suitable.",
  },
  {
    question: "What is the most important sign of a good fertility clinic?",
    answer:
      "There is no single indicator. Strong clinics usually demonstrate clear regulatory standing, accountable medical and laboratory leadership, transparent treatment reasoning, contextual success-rate reporting, complete written costs, and reliable communication.",
  },
  {
    question: "Can I rely on online clinic reviews?",
    answer:
      "Reviews may reveal communication patterns or patient experience, but they do not establish medical quality, laboratory governance, regulatory compliance, or suitability for a particular treatment pathway. They should be treated as one limited input.",
  },
  {
    question: "Are the highest published success rates always best?",
    answer:
      "No. Rates may reflect different patient populations, age groups, donor use, embryo stages, transfer practices, and reporting methods. A meaningful comparison requires the underlying definitions and clinical context.",
  },
  {
    question: "Does FertilityCareHub recommend specific clinics?",
    answer:
      "FertilityCareHub provides structured decision support and evaluation principles rather than promotional rankings or guaranteed endorsements. Medical and legal decisions should be confirmed with appropriately licensed professionals.",
  },
];

export const metadata: Metadata = {
  title: "How to Choose a Fertility Clinic Abroad | Evaluation Guide",
  description:
    "Learn how to evaluate fertility clinics abroad using licensing, laboratory governance, treatment transparency, success-rate reporting, costs, communication, and continuity of care.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title:
      "How to Choose a Fertility Clinic Abroad | FertilityCareHub",
    description:
      "A structured clinic-selection framework covering licensing, laboratory governance, treatment protocols, success rates, costs, communication, and follow-up.",
    url: pageUrl,
    siteName: "FertilityCareHub",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "How to Choose a Fertility Clinic Abroad | FertilityCareHub",
    description:
      "A structured guide to evaluating fertility clinics for international treatment.",
  },
};

export default function ChooseFertilityClinicAbroadPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Choose a Fertility Clinic Abroad",
    description:
      "A structured framework for evaluating fertility clinics abroad based on licensing, clinical leadership, laboratory governance, treatment transparency, success rates, costs, communication, and continuity of care.",
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
    datePublished: "2026-07-12",
    dateModified: "2026-07-12",
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
        name: "How to Choose a Fertility Clinic Abroad",
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
                name: "Choose a Fertility Clinic Abroad",
                href: "/how-to-choose-a-fertility-clinic-abroad",
              },
            ]}
          />

          <section className="border-b border-[#E5DDC8] pb-12 pt-10 text-center sm:pb-16 sm:pt-14">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-[#7B6A3A]">
              Clinic Selection Guide
            </p>

            <h1 className="mx-auto max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.03em] sm:text-5xl lg:text-6xl">
              How to Choose a Fertility Clinic Abroad
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-[#5F584D] sm:text-lg">
              A clinic should not be selected on reputation, package price, or a
              single success-rate figure alone. A reliable assessment considers
              regulatory standing, medical and laboratory governance, treatment
              transparency, costs, communication, donor practices, and
              continuity of care.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/countries"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#1A1A1A] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#343434]"
              >
                Confirm jurisdiction fit
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
                    <dd className="mt-1">July 12, 2026</dd>
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
                    <dd className="mt-1">Approximately 14 minutes</dd>
                  </div>
                </dl>
              </aside>

              <div className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-6 sm:p-7">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#7B6A3A]">
                  Who this guide is for
                </p>

                <ul className="mt-5 grid gap-3 text-sm leading-6 text-[#5F584D] sm:grid-cols-2">
                  {[
                    "Patients comparing clinics in another country",
                    "Couples evaluating IVF or donor-treatment providers",
                    "Intended parents reviewing international options",
                    "Families seeking a disciplined clinic shortlist",
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
                  Country fit and clinic fit are separate decisions
                </h2>

                <div className="mt-5 space-y-4 leading-8 text-[#5F584D]">
                  <p>
                    A clinic can appear highly polished while operating in a
                    jurisdiction that does not align with the patient&apos;s
                    eligibility, donor pathway, documentation needs, or legal
                    circumstances.
                  </p>

                  <p>
                    Once the jurisdiction is suitable, the clinic must still be
                    assessed independently. Clinics within the same country may
                    differ materially in laboratory governance, treatment
                    philosophy, communication, pricing, donor practices, and
                    follow-up.
                  </p>

                  <p>
                    The strongest option is not necessarily the best-known clinic.
                    It is the provider that can clearly demonstrate suitability,
                    transparency, accountable care, and an executable plan for the
                    patient&apos;s circumstances.
                  </p>
                </div>
              </div>

              <aside className="rounded-2xl border border-[#D8C89F] bg-[#EEE5D2] p-6 sm:p-8">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#7B6A3A]">
                  Core principle
                </p>

                <blockquote className="mt-4 text-xl font-medium leading-8">
                  Marketing quality is not the same as clinical quality,
                  laboratory governance, or patient fit.
                </blockquote>

                <p className="mt-5 text-sm leading-7 text-[#625A4C]">
                  Require clear written answers. Important medical, legal,
                  financial, and operational questions should not depend on
                  assumptions or sales assurances.
                </p>
              </aside>
            </div>
          </section>

          <section className="border-t border-[#E5DDC8] py-12 sm:py-16">
            <div className="max-w-3xl">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#7B6A3A]">
                Evaluation framework
              </p>

              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
                Ten factors to assess
              </h2>

              <p className="mt-5 leading-8 text-[#5F584D]">
                Use the same criteria for every clinic on the shortlist. The
                relative weighting may change according to treatment type,
                donor requirements, medical history, timeline, and risk
                tolerance.
              </p>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {evaluationFactors.map((factor) => (
                <article
                  key={factor.number}
                  className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-6 sm:p-7"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#CDBA86] text-sm font-semibold text-[#7B6A3A]">
                      {factor.number}
                    </span>

                    <div>
                      <h3 className="text-xl font-semibold">{factor.title}</h3>
                      <p className="mt-3 leading-7 text-[#5F584D]">
                        {factor.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-[#E5DDC8] pt-5">
                    <p className="text-sm font-semibold text-[#37332D]">
                      Questions to ask
                    </p>

                    <ul className="mt-3 space-y-2 text-sm leading-6 text-[#625A4C]">
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
            <div className="max-w-3xl">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#7B6A3A]">
                Practical process
              </p>

              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
                A five-step clinic-selection method
              </h2>
            </div>

            <ol className="mt-10 grid gap-5">
              {selectionSteps.map((step, index) => (
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
            <div className="grid gap-8 lg:grid-cols-2">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#7B6A3A]">
                  Decision tool
                </p>

                <h2 className="mt-4 text-3xl font-semibold">
                  Build a clinic comparison scorecard
                </h2>

                <p className="mt-5 leading-8 text-[#5F584D]">
                  Scorecards improve consistency, but they should not hide
                  disqualifying issues. A clinic that fails a critical legal,
                  medical, laboratory, consent, or transparency requirement
                  should not remain on the shortlist simply because it scores
                  well elsewhere.
                </p>
              </div>

              <div className="overflow-hidden rounded-2xl border border-[#E5DDC8] bg-white/60">
                <div className="grid grid-cols-[1fr_90px_90px] border-b border-[#E5DDC8] bg-[#EEE5D2] px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[#625A4C] sm:grid-cols-[1fr_120px_120px] sm:px-6">
                  <span>Factor</span>
                  <span className="text-center">Weight</span>
                  <span className="text-center">Score</span>
                </div>

                {[
                  "Regulatory and licensing clarity",
                  "Medical and laboratory governance",
                  "Treatment-pathway suitability",
                  "Success-rate transparency",
                  "Complete financial exposure",
                  "Communication and continuity",
                ].map((factor) => (
                  <div
                    key={factor}
                    className="grid grid-cols-[1fr_90px_90px] border-b border-[#E5DDC8] px-4 py-4 text-sm last:border-b-0 sm:grid-cols-[1fr_120px_120px] sm:px-6"
                  >
                    <span className="pr-3">{factor}</span>
                    <span className="text-center text-[#777064]">1–5</span>
                    <span className="text-center text-[#777064]">1–5</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="border-t border-[#E5DDC8] py-12 sm:py-16">
            <div className="rounded-2xl border border-[#D8C89F] bg-[#EEE5D2] p-6 sm:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#7B6A3A]">
                Red flags
              </p>

              <h2 className="mt-4 text-3xl font-semibold">
                Reasons to pause before committing
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
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#7B6A3A]">
                  Clinic-question checklist
                </p>

                <h2 className="mt-4 text-3xl font-semibold">
                  Information to obtain in writing
                </h2>

                <p className="mt-5 leading-8 text-[#5F584D]">
                  Written information makes comparison easier and reduces the
                  risk of relying on incomplete verbal explanations.
                </p>
              </div>

              <ul className="grid gap-3 rounded-2xl border border-[#E5DDC8] bg-white/60 p-6 sm:grid-cols-2 sm:p-8">
                {checklist.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-[#5F584D]">
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
                  title: "Compare Jurisdictions",
                  description:
                    "Assess country fit before selecting an individual clinic.",
                  href: "/how-to-compare-fertility-jurisdictions",
                },
                {
                  title: "Country Intelligence",
                  description:
                    "Explore jurisdiction dossiers and access considerations.",
                  href: "/countries",
                },
                {
                  title: "Jurisdiction Comparisons",
                  description:
                    "Review available country-to-country comparisons.",
                  href: "/compare",
                },
                {
                  title: "Guides Library",
                  description:
                    "Browse FertilityCareHub planning resources.",
                  href: "/guides",
                },
                {
                  title: "Private Advisory",
                  description:
                    "Review structured advisory pathways.",
                  href: "/advisory",
                },
                {
                  title: "Consultation",
                  description:
                    "Request support for a focused clinic shortlist.",
                  href: "/consultation",
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
                Evaluate a focused clinic shortlist against your actual pathway
              </h2>

              <p className="mx-auto mt-5 max-w-2xl leading-8 text-[#D4D0C8]">
                FertilityCareHub helps structure clinic comparisons around
                jurisdiction fit, treatment needs, donor requirements, costs,
                communication, documentation, timeline, and execution risk.
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
                  Last reviewed: July 12, 2026. This guide presents a general
                  clinic-evaluation framework rather than a ranking or endorsement.
                  Licensing status, treatment availability, costs, personnel,
                  policies, and outcomes can change.
                </p>
              </div>

              <div>
                <h2 className="font-semibold text-[#2A2824]">
                  Important limitation
                </h2>

                <p className="mt-3">
                  FertilityCareHub does not provide medical diagnosis, treatment,
                  legal advice, or guaranteed outcomes. Confirm medical decisions
                  with licensed clinicians and legal questions with qualified legal
                  professionals.
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
