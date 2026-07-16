import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "../components/Breadcrumbs";

const baseUrl = "https://fertilitycarehub.com";
const pageUrl = `${baseUrl}/hidden-costs-of-fertility-treatment-abroad`;

const costCategories = [
  {
    number: "01",
    title: "Initial consultations and pre-treatment testing",
    description:
      "Quoted treatment packages may not include consultations, ultrasound monitoring, infectious-disease screening, hormone testing, semen analysis, genetic testing, or medical-record review.",
    questions: [
      "Which consultations are included?",
      "Which tests must be completed before treatment?",
      "Can testing be completed in the home country?",
      "Will the clinic accept recent external results?",
    ],
  },
  {
    number: "02",
    title: "Medication and pharmacy costs",
    description:
      "Medication can represent a substantial expense and is often excluded from headline pricing. Dosage, duration, pharmacy location, and protocol changes can alter the final amount.",
    questions: [
      "Are medications included in the package?",
      "Which medicines are likely to be prescribed?",
      "What happens if the dose or treatment duration changes?",
      "Can medication be purchased safely in the home country?",
    ],
  },
  {
    number: "03",
    title: "Laboratory procedures and treatment add-ons",
    description:
      "ICSI, assisted hatching, time-lapse imaging, embryo biopsy, genetic testing, sperm preparation, cryopreservation, and other laboratory services may be charged separately.",
    questions: [
      "Which laboratory procedures are included?",
      "Which add-ons are optional or recommended?",
      "What evidence supports the proposed add-on?",
      "Are biopsy and laboratory fees separate from testing fees?",
    ],
  },
  {
    number: "04",
    title: "Donor pathway expenses",
    description:
      "Donor recruitment, screening, matching, compensation, coordination, legal documents, travel, medication, and replacement guarantees may create several separate charges.",
    questions: [
      "What does the donor fee include?",
      "Are screening and matching charged separately?",
      "Are there waiting-list or reservation fees?",
      "What happens if the donor cycle is cancelled?",
    ],
  },
  {
    number: "05",
    title: "Freezing, storage, and future-use fees",
    description:
      "Embryo, egg, or sperm freezing may involve an initial cryopreservation fee followed by annual storage charges and later thaw, transfer, transport, or disposal fees.",
    questions: [
      "Is freezing included in the treatment package?",
      "How much storage time is included?",
      "What are the annual renewal charges?",
      "What are the future thaw and transfer costs?",
    ],
  },
  {
    number: "06",
    title: "Embryo transfer and frozen-transfer costs",
    description:
      "Some packages include one transfer only. Additional frozen embryo transfers can involve preparation medication, monitoring, thawing, laboratory work, and physician fees.",
    questions: [
      "How many transfers are included?",
      "Is a frozen embryo transfer priced separately?",
      "Are preparation medications and monitoring included?",
      "What happens if no embryo is suitable for transfer?",
    ],
  },
  {
    number: "07",
    title: "Travel, accommodation, and local logistics",
    description:
      "Flights, flexible tickets, accommodation, ground transport, meals, translation, childcare, companion travel, and longer-than-planned stays can materially change the budget.",
    questions: [
      "How many trips are usually required?",
      "How much scheduling flexibility is needed?",
      "What happens if treatment dates change?",
      "How many recovery or follow-up days should be budgeted?",
    ],
  },
  {
    number: "08",
    title: "Cancellation, rescheduling, and refund exposure",
    description:
      "A cycle may be postponed or cancelled before retrieval or transfer. Refunds may be limited, and some payments may be non-refundable or transferable only under specific conditions.",
    questions: [
      "Which fees are refundable?",
      "Which deposits are non-refundable?",
      "Can payments be transferred to a future cycle?",
      "What happens if travel disruption causes a delay?",
    ],
  },
  {
    number: "09",
    title: "Legal, translation, and documentation costs",
    description:
      "Donor pathways, parentage questions, notarization, certified translation, consular documents, courier services, and independent legal review may fall outside the clinic package.",
    questions: [
      "Which documents require translation or notarization?",
      "Is independent legal advice recommended?",
      "Are donor or parentage documents included?",
      "Are courier, certification, or consular costs separate?",
    ],
  },
  {
    number: "10",
    title: "Repeat treatment and contingency costs",
    description:
      "The largest hidden cost may be the need for another retrieval, donor match, transfer, trip, or full treatment cycle. A realistic budget should include contingency planning.",
    questions: [
      "What costs would repeat if treatment is unsuccessful?",
      "Can unused services be credited toward another attempt?",
      "Would repeat treatment require another international trip?",
      "What financial limit should be set before treatment begins?",
    ],
  },
];

const budgetingSteps = [
  {
    title: "Request a fully itemized quotation",
    description:
      "Ask the clinic to identify included services, exclusions, optional services, validity period, payment schedule, and refund conditions in writing.",
  },
  {
    title: "Map the complete treatment pathway",
    description:
      "List every stage from initial testing through medication, retrieval, laboratory work, transfer, storage, follow-up, and possible repeat treatment.",
  },
  {
    title: "Separate fixed and variable costs",
    description:
      "Fixed costs are predictable; variable costs change with medication dosage, donor requirements, treatment response, schedule changes, or additional procedures.",
  },
  {
    title: "Add travel and contingency reserves",
    description:
      "Include flexible travel, extended accommodation, local transport, companion costs, currency movement, and a reserve for delays or additional appointments.",
  },
  {
    title: "Compare total exposure, not package price",
    description:
      "Evaluate the likely full cost of reaching a meaningful treatment milestone rather than comparing only the advertised entry price.",
  },
];

const redFlags = [
  "The clinic provides only a package price and refuses to itemize it.",
  "Medication is excluded but no realistic estimate is provided.",
  "Laboratory add-ons are recommended without clear pricing or evidence.",
  "Donor, freezing, storage, or transfer fees are disclosed late.",
  "Cancellation and refund terms are difficult to obtain in writing.",
  "The quote excludes taxes, administrative fees, or mandatory monitoring.",
  "The clinic pressures the patient to pay before documents are reviewed.",
  "Travel timing is described as fixed even though treatment dates may change.",
  "Currency, card, bank-transfer, or financing charges are ignored.",
  "The budget assumes one successful attempt with no contingency reserve.",
];

const budgetChecklist = [
  "Consultations and medical-record review",
  "Baseline bloodwork and diagnostic testing",
  "Medication and pharmacy charges",
  "Monitoring at home and abroad",
  "Retrieval, sedation, and theatre fees",
  "Laboratory procedures and add-ons",
  "Donor recruitment, screening, and matching",
  "Embryo testing, biopsy, and reporting",
  "Freezing, storage, thawing, and transfer",
  "Flights, accommodation, transport, and meals",
  "Translation, notarization, legal review, and courier costs",
  "Cancellation, repeat-treatment, and emergency reserve",
];

const faqs = [
  {
    question: "Why is the advertised IVF price often lower than the final cost?",
    answer:
      "Advertised prices may cover only selected clinical steps. Medication, testing, monitoring, laboratory services, donor expenses, storage, transfer, travel, and repeat-treatment exposure may be separate.",
  },
  {
    question: "Are fertility treatment add-ons always necessary?",
    answer:
      "No. Some add-ons may be appropriate in specific circumstances, while others may have limited or uncertain evidence. Patients should ask why an add-on is recommended, what evidence supports it, and whether it changes the expected outcome.",
  },
  {
    question: "Should I budget for more than one cycle?",
    answer:
      "A contingency plan is prudent because no clinic can guarantee success. The appropriate reserve depends on the treatment pathway, personal limits, available embryos, travel burden, and financial circumstances.",
  },
  {
    question: "Can treatment abroad still be less expensive overall?",
    answer:
      "It can be, but only after comparing the full cost of treatment, medication, travel, accommodation, legal or documentation needs, storage, and possible repeat attempts.",
  },
  {
    question: "How should I compare clinic quotations?",
    answer:
      "Use the same checklist for every clinic and compare included services, exclusions, payment timing, cancellation terms, storage, transfers, travel requirements, and repeat-treatment exposure.",
  },
  {
    question: "Does FertilityCareHub provide financial advice?",
    answer:
      "No. FertilityCareHub provides general strategic planning information. Personal financial decisions should be reviewed with appropriately qualified professionals where necessary.",
  },
];

export const metadata: Metadata = {
  title: "Hidden Costs of Fertility Treatment Abroad | IVF Cost Guide",
  description:
    "Understand hidden fertility treatment costs abroad, including medication, testing, donor fees, laboratory procedures, freezing, storage, transfers, travel, cancellations, and repeat cycles.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title:
      "Hidden Costs of Fertility Treatment Abroad | FertilityCareHub",
    description:
      "A structured guide to medication, testing, donor, laboratory, storage, transfer, travel, cancellation, and repeat-treatment costs.",
    url: pageUrl,
    siteName: "FertilityCareHub",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Hidden Costs of Fertility Treatment Abroad | FertilityCareHub",
    description:
      "Learn how to compare the full financial exposure of international fertility treatment.",
  },
};

export default function HiddenFertilityTreatmentCostsPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Hidden Costs of Fertility Treatment Abroad",
    description:
      "A structured guide to the medication, testing, donor, laboratory, storage, transfer, travel, cancellation, documentation, and repeat-treatment costs associated with fertility treatment abroad.",
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
        name: "Hidden Costs of Fertility Treatment Abroad",
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
                name: "Hidden Costs of Fertility Treatment Abroad",
                href: "/hidden-costs-of-fertility-treatment-abroad",
              },
            ]}
          />

          <section className="border-b border-[#E5DDC8] pb-12 pt-10 text-center sm:pb-16 sm:pt-14">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-[#7B6A3A]">
              Costs and Financial Planning Guide
            </p>

            <h1 className="mx-auto max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.03em] sm:text-5xl lg:text-6xl">
              Hidden Costs of Fertility Treatment Abroad
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-[#5F584D] sm:text-lg">
              The advertised package price may represent only part of the real
              financial exposure. A complete budget should include medication,
              testing, laboratory work, donor expenses, storage, transfers,
              travel, documentation, cancellation risk, and possible repeat
              treatment.
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
                    <dd className="mt-1">Approximately 15 minutes</dd>
                  </div>
                </dl>
              </aside>

              <div className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-6 sm:p-7">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#7B6A3A]">
                  Who this guide is for
                </p>

                <ul className="mt-5 grid gap-3 text-sm leading-6 text-[#5F584D] sm:grid-cols-2">
                  {[
                    "Patients comparing international treatment packages",
                    "Couples building a realistic IVF budget",
                    "Intended parents evaluating donor pathways",
                    "Families planning treatment-related travel",
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
                  Compare total financial exposure, not headline price
                </h2>

                <div className="mt-5 space-y-4 leading-8 text-[#5F584D]">
                  <p>
                    A clinic package may include only selected treatment stages.
                    Medication, testing, monitoring, laboratory procedures,
                    donor-related services, freezing, storage, and future
                    transfers may be billed separately.
                  </p>

                  <p>
                    Cross-border treatment also creates non-clinical expenses.
                    Travel changes, accommodation extensions, translation,
                    legal review, currency conversion, and repeat visits can
                    materially affect the final cost.
                  </p>

                  <p>
                    A reliable comparison therefore requires a written,
                    itemized quotation and a pathway-based budget that includes
                    exclusions, variable costs, cancellation exposure, and a
                    contingency reserve.
                  </p>
                </div>
              </div>

              <aside className="rounded-2xl border border-[#D8C89F] bg-[#EEE5D2] p-6 sm:p-8">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#7B6A3A]">
                  Core principle
                </p>

                <blockquote className="mt-4 text-xl font-medium leading-8">
                  The lowest package price is not necessarily the lowest total
                  cost of reaching treatment completion.
                </blockquote>

                <p className="mt-5 text-sm leading-7 text-[#625A4C]">
                  Compare what is included, what may be added, what could repeat,
                  and what happens if the original plan changes.
                </p>
              </aside>
            </div>
          </section>

          <section className="border-t border-[#E5DDC8] py-12 sm:py-16">
            <div className="max-w-3xl">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#7B6A3A]">
                Cost framework
              </p>

              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
                Ten cost categories to investigate
              </h2>

              <p className="mt-5 leading-8 text-[#5F584D]">
                Use the same cost categories for every clinic. A complete
                comparison should account for clinical, laboratory, donor,
                administrative, travel, documentation, and contingency
                expenses.
              </p>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {costCategories.map((category) => (
                <article
                  key={category.number}
                  className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-6 sm:p-7"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#CDBA86] text-sm font-semibold text-[#7B6A3A]">
                      {category.number}
                    </span>

                    <div>
                      <h3 className="text-xl font-semibold">{category.title}</h3>
                      <p className="mt-3 leading-7 text-[#5F584D]">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-[#E5DDC8] pt-5">
                    <p className="text-sm font-semibold text-[#37332D]">
                      Questions to ask
                    </p>

                    <ul className="mt-3 space-y-2 text-sm leading-6 text-[#625A4C]">
                      {category.questions.map((question) => (
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
                A five-step budgeting method
              </h2>
            </div>

            <ol className="mt-10 grid gap-5">
              {budgetingSteps.map((step, index) => (
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
                  Budget matrix
                </p>

                <h2 className="mt-4 text-3xl font-semibold">
                  Build a complete cost comparison
                </h2>

                <p className="mt-5 leading-8 text-[#5F584D]">
                  Record both the quoted amount and the potential additional
                  exposure. Unknown costs should be treated as unresolved rather
                  than assumed to be included.
                </p>
              </div>

              <div className="overflow-hidden rounded-2xl border border-[#E5DDC8] bg-white/60">
                <div className="grid grid-cols-[1fr_100px_100px] border-b border-[#E5DDC8] bg-[#EEE5D2] px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[#625A4C] sm:grid-cols-[1fr_130px_130px] sm:px-6">
                  <span>Cost category</span>
                  <span className="text-center">Included</span>
                  <span className="text-center">Estimate</span>
                </div>

                {[
                  "Consultations and testing",
                  "Medication and monitoring",
                  "Retrieval and laboratory work",
                  "Donor or embryo testing",
                  "Freezing, storage, and transfer",
                  "Travel and accommodation",
                  "Legal and documentation",
                  "Contingency and repeat treatment",
                ].map((field) => (
                  <div
                    key={field}
                    className="grid grid-cols-[1fr_100px_100px] border-b border-[#E5DDC8] px-4 py-4 text-sm last:border-b-0 sm:grid-cols-[1fr_130px_130px] sm:px-6"
                  >
                    <span className="pr-3">{field}</span>
                    <span className="text-center text-[#777064]">Confirm</span>
                    <span className="text-center text-[#777064]">Record</span>
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
                Reasons to question a treatment quotation
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
                  Budget checklist
                </p>

                <h2 className="mt-4 text-3xl font-semibold">
                  Items to include before committing
                </h2>

                <p className="mt-5 leading-8 text-[#5F584D]">
                  Build the budget before paying a non-refundable deposit.
                  Confirm uncertain items in writing and keep a reserve for
                  changes that cannot be predicted precisely.
                </p>
              </div>

              <ul className="grid gap-3 rounded-2xl border border-[#E5DDC8] bg-white/60 p-6 sm:grid-cols-2 sm:p-8">
                {budgetChecklist.map((item) => (
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
                    "Evaluate clinic suitability, transparency, and governance.",
                  href: "/how-to-choose-a-fertility-clinic-abroad",
                },
                {
                  title: "Understand Success Rates",
                  description:
                    "Interpret clinic outcome statistics in the correct context.",
                  href: "/understanding-fertility-clinic-success-rates",
                },
                {
                  title: "Compare Jurisdictions",
                  description:
                    "Assess country fit before comparing providers.",
                  href: "/how-to-compare-fertility-jurisdictions",
                },
                {
                  title: "Country Intelligence",
                  description:
                    "Explore jurisdiction dossiers and planning considerations.",
                  href: "/countries",
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
                Compare total cost exposure across your shortlist
              </h2>

              <p className="mx-auto mt-5 max-w-2xl leading-8 text-[#D4D0C8]">
                FertilityCareHub helps structure treatment comparisons around
                complete costs, clinic transparency, jurisdiction fit, donor
                pathways, travel, documentation, and execution risk.
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
                  Last reviewed: July 15, 2026. This guide presents general
                  budgeting categories rather than country-specific prices.
                  Clinic fees, exchange rates, taxes, travel costs, policies,
                  and treatment requirements can change.
                </p>
              </div>

              <div>
                <h2 className="font-semibold text-[#2A2824]">
                  Important limitation
                </h2>

                <p className="mt-3">
                  FertilityCareHub does not provide medical, legal, tax, or
                  financial advice. Confirm treatment recommendations with
                  licensed clinicians and obtain professional advice for legal,
                  tax, insurance, or financial questions where appropriate.
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
