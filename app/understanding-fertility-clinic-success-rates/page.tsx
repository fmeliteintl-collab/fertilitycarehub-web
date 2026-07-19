import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "../components/Breadcrumbs";

const baseUrl = "https://fertilitycarehub.com";
const pageUrl = `${baseUrl}/understanding-fertility-clinic-success-rates`;

const outcomeDefinitions = [
  {
    number: "01",
    title: "Biochemical pregnancy rate",
    description:
      "This generally refers to a pregnancy detected through a positive hormone test. It is an early outcome and does not confirm that a pregnancy is developing normally.",
    questions: [
      "Is the result based only on a positive pregnancy test?",
      "How many days after transfer is testing performed?",
      "Are biochemical losses reported separately?",
      "Is this figure clearly distinguished from clinical pregnancy?",
    ],
  },
  {
    number: "02",
    title: "Clinical pregnancy rate",
    description:
      "A clinical pregnancy is usually confirmed by ultrasound evidence, but clinics may differ in the precise definition and timing used.",
    questions: [
      "What ultrasound finding is required?",
      "At what gestational stage is the pregnancy counted?",
      "Is the rate reported per transfer, cycle, or patient?",
      "Are ectopic pregnancies included or separated?",
    ],
  },
  {
    number: "03",
    title: "Ongoing pregnancy rate",
    description:
      "This generally refers to a pregnancy continuing beyond a stated gestational point. The threshold can vary and should always be identified.",
    questions: [
      "What gestational week defines an ongoing pregnancy?",
      "Is fetal cardiac activity required?",
      "Is the figure reported per transfer or per cycle started?",
      "How are pregnancy losses before that point recorded?",
    ],
  },
  {
    number: "04",
    title: "Live birth rate",
    description:
      "Live birth is usually the most meaningful patient-centred endpoint, but interpretation still depends on the denominator, treatment type, age group, and number of embryos transferred.",
    questions: [
      "Is the rate per cycle, retrieval, transfer, or patient?",
      "Are singleton and multiple births reported separately?",
      "Are fresh and frozen transfers combined?",
      "Are donor and non-donor cycles separated?",
    ],
  },
  {
    number: "05",
    title: "Implantation rate",
    description:
      "Implantation rate usually compares the number of gestational sacs with the number of embryos transferred. It is not the same as the chance of live birth for an individual patient.",
    questions: [
      "How is implantation defined?",
      "What embryo stage is included?",
      "Are euploid and untested embryos reported separately?",
      "How many embryos were transferred in the underlying cases?",
    ],
  },
  {
    number: "06",
    title: "Cumulative live birth rate",
    description:
      "A cumulative rate may include the fresh transfer and later frozen transfers arising from the same retrieval. It can be useful, but only when the time period, included transfers, and patient follow-up are clear.",
    questions: [
      "Does the rate include all embryos from one retrieval?",
      "Over what time period is follow-up measured?",
      "How are patients lost to follow-up handled?",
      "Does the figure include more than one retrieval?",
    ],
  },
];

const denominators = [
  {
    title: "Per cycle started",
    description:
      "Includes patients from the beginning of treatment, including cycles that do not reach retrieval or transfer. This usually gives a broader picture of the overall treatment pathway.",
  },
  {
    title: "Per egg retrieval",
    description:
      "Excludes cycles cancelled before retrieval. It can appear stronger than a per-cycle-started rate because some unsuccessful cycles are removed from the denominator.",
  },
  {
    title: "Per embryo transfer",
    description:
      "Includes only cases that reached transfer. It does not show the proportion of patients who never produced an embryo suitable for transfer.",
  },
  {
    title: "Per patient",
    description:
      "May combine more than one treatment attempt for the same person. The timeframe and number of included cycles must be understood.",
  },
];

const contextFactors = [
  {
    number: "01",
    title: "Patient age",
    description:
      "Age can materially affect outcomes when a patient's own eggs are used. Broad clinic-wide averages may be misleading if age groups are not separated.",
  },
  {
    number: "02",
    title: "Own eggs versus donor eggs",
    description:
      "Donor-egg outcomes often reflect donor age more than recipient age. Combining donor and non-donor treatment can distort comparisons.",
  },
  {
    number: "03",
    title: "Fresh versus frozen transfer",
    description:
      "Fresh and frozen embryo transfers involve different clinical circumstances. Combined reporting can hide meaningful differences.",
  },
  {
    number: "04",
    title: "Embryo stage",
    description:
      "Cleavage-stage and blastocyst transfers are not directly equivalent. Clinics may also differ in which patients reach blastocyst transfer.",
  },
  {
    number: "05",
    title: "Embryo testing",
    description:
      "Results involving tested embryos should not be compared directly with untested embryo transfers without understanding patient selection and reporting methods.",
  },
  {
    number: "06",
    title: "Number of embryos transferred",
    description:
      "Transferring more embryos may increase pregnancy rates while also increasing multiple-pregnancy risk. A higher rate is not automatically a safer or better result.",
  },
  {
    number: "07",
    title: "Diagnosis and case complexity",
    description:
      "Clinics treating more complex patients may report lower headline outcomes despite strong clinical capability. Patient mix matters.",
  },
  {
    number: "08",
    title: "Cancellation policy",
    description:
      "Clinics differ in when they cancel cycles or decline transfer. Aggressive selection can improve published rates while excluding more difficult cases.",
  },
];

const comparisonSteps = [
  {
    title: "Identify the outcome",
    description:
      "Determine whether the clinic is reporting biochemical pregnancy, clinical pregnancy, ongoing pregnancy, live birth, implantation, or cumulative live birth.",
  },
  {
    title: "Identify the denominator",
    description:
      "Confirm whether the number is calculated per cycle started, retrieval, transfer, or patient.",
  },
  {
    title: "Match the patient group",
    description:
      "Compare results only when age, diagnosis, egg source, embryo stage, treatment type, and testing status are reasonably aligned.",
  },
  {
    title: "Review exclusions and cancellations",
    description:
      "Ask which patients or cycles are excluded and how cancelled cycles, no-transfer cycles, and lost follow-up are handled.",
  },
  {
    title: "Compare safety and transparency",
    description:
      "Review multiple-birth rates, transfer practices, adverse outcomes, and whether the clinic explains limitations without relying on marketing claims.",
  },
];

const redFlags = [
  "A clinic guarantees pregnancy or live birth.",
  "A success rate is presented without naming the outcome being measured.",
  "The denominator is missing or unclear.",
  "Donor-egg and own-egg results are combined without explanation.",
  "Age groups are absent or unusually broad.",
  "Fresh, frozen, tested, and untested embryo transfers are blended together.",
  "Cancellation and no-transfer cycles are not disclosed.",
  "The clinic highlights pregnancy rates but does not provide live birth data where available.",
  "Multiple-birth rates or embryo-transfer practices are omitted.",
  "The clinic refuses to explain how its figures were calculated.",
];

const clinicQuestions = [
  "What exact outcome does this percentage measure?",
  "Is the rate calculated per cycle started, retrieval, transfer, or patient?",
  "Which patient age group is represented?",
  "Are donor-egg and own-egg cycles reported separately?",
  "Are fresh and frozen transfers separated?",
  "Are tested and untested embryos separated?",
  "How many embryos were transferred in the underlying cases?",
  "What proportion of cycles were cancelled before retrieval or transfer?",
  "What is the singleton live birth rate?",
  "What is the multiple-pregnancy or multiple-birth rate?",
  "What time period and sample size does the figure cover?",
  "Are the results independently reported or audited?",
];

const faqs = [
  {
    question: "What fertility success rate matters most?",
    answer:
      "For many patients, live birth rate is more meaningful than pregnancy rate because it measures a later outcome. However, it still must be interpreted with the correct denominator, patient group, treatment type, and embryo-transfer context.",
  },
  {
    question: "Why can a per-transfer rate look higher than a per-cycle rate?",
    answer:
      "A per-transfer rate excludes cycles that did not reach embryo transfer. A per-cycle-started rate includes more of the treatment pathway, including cancellations and cycles that produced no transferable embryo.",
  },
  {
    question: "Can I compare donor-egg success rates with own-egg success rates?",
    answer:
      "Not directly. Donor-egg outcomes often reflect the donor's age and selection criteria, while own-egg outcomes are strongly influenced by the patient's age and individual clinical circumstances.",
  },
  {
    question: "Does a higher pregnancy rate mean a clinic is better?",
    answer:
      "Not necessarily. Patient selection, transfer practices, number of embryos transferred, reporting definitions, case complexity, and exclusion rules can all affect the published percentage.",
  },
  {
    question: "Are online clinic success-rate calculators reliable?",
    answer:
      "They can provide general context, but their usefulness depends on the quality of the underlying data and whether the inputs reflect the patient's circumstances. They should not replace individualized clinical advice.",
  },
  {
    question: "Does FertilityCareHub rank clinics using success rates?",
    answer:
      "No. FertilityCareHub uses structured evaluation principles and does not treat a single published rate as proof of clinic quality or patient suitability.",
  },
];

export const metadata: Metadata = {
  title: "Understanding Fertility Clinic Success Rates | IVF Guide",
  description:
    "Learn how to interpret fertility clinic success rates, including pregnancy, live birth, per-cycle, per-transfer, cumulative, donor, age-specific, and embryo-transfer reporting.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Understanding Fertility Clinic Success Rates | FertilityCareHub",
    description:
      "A structured guide to pregnancy, live birth, implantation, cumulative, per-cycle, per-transfer, age-specific, and donor-treatment success rates.",
    url: pageUrl,
    siteName: "FertilityCareHub",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Understanding Fertility Clinic Success Rates | FertilityCareHub",
    description:
      "Learn how to compare fertility clinic outcome statistics without relying on misleading headline percentages.",
  },
};

export default function FertilityClinicSuccessRatesPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Understanding Fertility Clinic Success Rates",
    description:
      "A structured guide to interpreting fertility clinic success rates, including pregnancy, live birth, implantation, cumulative, per-cycle, per-transfer, age-specific, and donor-treatment reporting.",
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
    publisher: {
      "@type": "Organization",
      name: "FertilityCareHub",
      url: baseUrl,
    },
    author: { "@type": "Organization", name: "FertilityCareHub" },
    datePublished: "2026-07-15",
    dateModified: "2026-07-15",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "Guides",
        item: `${baseUrl}/guides`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Understanding Fertility Clinic Success Rates",
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
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
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
                name: "Understanding Fertility Clinic Success Rates",
                href: "/understanding-fertility-clinic-success-rates",
              },
            ]}
          />

          <section className="border-b border-[#E5DDC8] pb-12 pt-10 text-center sm:pb-16 sm:pt-14">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-[#7B6A3A]">
              Success Rates and Reporting Guide
            </p>
            <h1 className="mx-auto max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.03em] sm:text-5xl lg:text-6xl">
              Understanding Fertility Clinic Success Rates
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-[#5F584D] sm:text-lg">
              Fertility clinic percentages cannot be compared reliably until
              the outcome, denominator, patient group, treatment type, embryo
              stage, donor use, and reporting period are understood.
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
                    <dt className="font-semibold text-[#2A2824]">Last reviewed</dt>
                    <dd className="mt-1">July 15, 2026</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-[#2A2824]">Framework version</dt>
                    <dd className="mt-1">FCH Global Fertility Intelligence Framework™ v1.0</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-[#2A2824]">Estimated reading time</dt>
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
                    "Patients comparing clinic outcome statistics",
                    "Couples reviewing IVF treatment options",
                    "Intended parents evaluating donor pathways",
                    "Families comparing clinics across jurisdictions",
                  ].map((item) => (
                    <li key={item} className="flex gap-3">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#B89B5E]" />
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
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#7B6A3A]">Executive summary</p>
                <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">A percentage is meaningful only when its definition is clear</h2>
                <div className="mt-5 space-y-4 leading-8 text-[#5F584D]">
                  <p>Two clinics can publish very different percentages while measuring different outcomes or using different denominators. A pregnancy rate per transfer is not equivalent to a live birth rate per cycle started.</p>
                  <p>Patient selection also matters. Age, diagnosis, donor use, embryo stage, genetic testing, transfer policy, and case complexity can materially affect a clinic&apos;s results.</p>
                  <p>Success-rate analysis should therefore focus on comparable definitions, appropriate patient groups, transparent exclusions, and clinically meaningful outcomes rather than the largest headline number.</p>
                </div>
              </div>
              <aside className="rounded-2xl border border-[#D8C89F] bg-[#EEE5D2] p-6 sm:p-8">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#7B6A3A]">Core principle</p>
                <blockquote className="mt-4 text-xl font-medium leading-8">Never compare fertility clinic percentages until you know what happened, to whom, and out of how many treatment attempts.</blockquote>
                <p className="mt-5 text-sm leading-7 text-[#625A4C]">Outcome, denominator, patient group, treatment type, and reporting period must all align before a comparison becomes meaningful.</p>
              </aside>
            </div>
          </section>

          <section className="border-t border-[#E5DDC8] py-12 sm:py-16">
            <div className="max-w-3xl">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#7B6A3A]">Outcome definitions</p>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Six commonly reported outcomes</h2>
              <p className="mt-5 leading-8 text-[#5F584D]">Clinics may use several valid outcome measures. The problem arises when the measure is not identified clearly or is presented as though it were directly comparable with a different endpoint.</p>
            </div>
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {outcomeDefinitions.map((outcome) => (
                <article key={outcome.number} className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-6 sm:p-7">
                  <div className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#CDBA86] text-sm font-semibold text-[#7B6A3A]">{outcome.number}</span>
                    <div>
                      <h3 className="text-xl font-semibold">{outcome.title}</h3>
                      <p className="mt-3 leading-7 text-[#5F584D]">{outcome.description}</p>
                    </div>
                  </div>
                  <div className="mt-6 border-t border-[#E5DDC8] pt-5">
                    <p className="text-sm font-semibold text-[#37332D]">Questions to ask</p>
                    <ul className="mt-3 space-y-2 text-sm leading-6 text-[#625A4C]">
                      {outcome.questions.map((question) => (
                        <li key={question} className="flex gap-3">
                          <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#B89B5E]" />
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
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#7B6A3A]">Denominator matters</p>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Per cycle, retrieval, transfer, or patient</h2>
              <p className="mt-5 leading-8 text-[#5F584D]">The denominator determines which treatment attempts are counted. Rates based on later stages of treatment often appear higher because earlier unsuccessful or cancelled stages are excluded.</p>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {denominators.map((item) => (
                <article key={item.title} className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-6">
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 leading-7 text-[#5F584D]">{item.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="border-t border-[#E5DDC8] py-12 sm:py-16">
            <div className="max-w-3xl">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#7B6A3A]">Comparison context</p>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Eight factors that can change the result</h2>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {contextFactors.map((factor) => (
                <article key={factor.number} className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-6">
                  <div className="flex items-start gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#CDBA86] text-xs font-semibold text-[#7B6A3A]">{factor.number}</span>
                    <div>
                      <h3 className="text-lg font-semibold">{factor.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-[#5F584D]">{factor.description}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="border-t border-[#E5DDC8] py-12 sm:py-16">
            <div className="max-w-3xl">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#7B6A3A]">Practical process</p>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">A five-step comparison method</h2>
            </div>
            <ol className="mt-10 grid gap-5">
              {comparisonSteps.map((step, index) => (
                <li key={step.title} className="grid gap-4 rounded-2xl border border-[#E5DDC8] bg-white/60 p-6 sm:grid-cols-[64px_1fr] sm:p-7">
                  <div className="text-3xl font-semibold text-[#B89B5E]">{String(index + 1).padStart(2, "0")}</div>
                  <div>
                    <h3 className="text-xl font-semibold">{step.title}</h3>
                    <p className="mt-2 leading-7 text-[#5F584D]">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="border-t border-[#E5DDC8] py-12 sm:py-16">
            <div className="grid gap-8 lg:grid-cols-2">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#7B6A3A]">Comparison matrix</p>
                <h2 className="mt-4 text-3xl font-semibold">Compare like with like</h2>
                <p className="mt-5 leading-8 text-[#5F584D]">Before comparing two percentages, confirm that every row in the matrix is reasonably aligned. A mismatch in any major category can make the comparison unreliable.</p>
              </div>
              <div className="overflow-hidden rounded-2xl border border-[#E5DDC8] bg-white/60">
                <div className="grid grid-cols-[1fr_100px_100px] border-b border-[#E5DDC8] bg-[#EEE5D2] px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[#625A4C] sm:grid-cols-[1fr_130px_130px] sm:px-6">
                  <span>Comparison field</span><span className="text-center">Clinic A</span><span className="text-center">Clinic B</span>
                </div>
                {["Reported outcome", "Denominator", "Patient age group", "Egg source", "Fresh or frozen transfer", "Embryo stage and testing", "Number transferred", "Reporting period"].map((field) => (
                  <div key={field} className="grid grid-cols-[1fr_100px_100px] border-b border-[#E5DDC8] px-4 py-4 text-sm last:border-b-0 sm:grid-cols-[1fr_130px_130px] sm:px-6">
                    <span className="pr-3">{field}</span><span className="text-center text-[#777064]">Confirm</span><span className="text-center text-[#777064]">Confirm</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="border-t border-[#E5DDC8] py-12 sm:py-16">
            <div className="rounded-2xl border border-[#D8C89F] bg-[#EEE5D2] p-6 sm:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#7B6A3A]">Red flags</p>
              <h2 className="mt-4 text-3xl font-semibold">Reasons to question a headline percentage</h2>
              <div className="mt-7 grid gap-4 md:grid-cols-2">
                {redFlags.map((redFlag) => (
                  <div key={redFlag} className="flex gap-3 rounded-xl border border-[#D6C69C] bg-white/50 p-4">
                    <span aria-hidden="true" className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#A88947] text-xs font-bold text-[#7B6A3A]">!</span>
                    <p className="text-sm leading-6 text-[#5F584D]">{redFlag}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="border-t border-[#E5DDC8] py-12 sm:py-16">
            <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#7B6A3A]">Clinic-question checklist</p>
                <h2 className="mt-4 text-3xl font-semibold">Questions to ask before relying on a rate</h2>
                <p className="mt-5 leading-8 text-[#5F584D]">Ask for written definitions and context. Transparent clinics should be able to explain how their published figures were calculated and what their limitations are.</p>
              </div>
              <ul className="grid gap-3 rounded-2xl border border-[#E5DDC8] bg-white/60 p-6 sm:grid-cols-2 sm:p-8">
                {clinicQuestions.map((question) => (
                  <li key={question} className="flex gap-3 text-sm leading-6 text-[#5F584D]">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#B89B5E]" />
                    <span>{question}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="border-t border-[#E5DDC8] py-12 sm:py-16">
            <div className="max-w-3xl">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#7B6A3A]">Related resources</p>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Continue your research</h2>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { title: "Choose a Fertility Clinic", description: "Use a structured framework to evaluate clinic suitability.", href: "/how-to-choose-a-fertility-clinic-abroad" },
                { title: "Compare Jurisdictions", description: "Assess country fit before comparing individual providers.", href: "/how-to-compare-fertility-jurisdictions" },
                { title: "Country Intelligence", description: "Explore jurisdiction dossiers and regulatory context.", href: "/countries" },
                { title: "Jurisdiction Comparisons", description: "Review available country-to-country comparisons.", href: "/compare" },
                { title: "Guides Library", description: "Browse FertilityCareHub planning resources.", href: "/guides" },
                { title: "Private Advisory", description: "Review structured advisory pathways.", href: "/advisory" },
              ].map((resource) => (
                <Link key={resource.href} href={resource.href} className="group rounded-xl border border-[#E5DDC8] bg-white/60 p-5 transition hover:border-[#B89B5E] hover:bg-white">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-semibold">{resource.title}</h3>
                    <span aria-hidden="true" className="text-[#8C7541] transition group-hover:translate-x-1">→</span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-[#625A4C]">{resource.description}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="border-t border-[#E5DDC8] py-12 sm:py-16">
            <div className="max-w-3xl">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#7B6A3A]">Frequently asked questions</p>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">FAQ</h2>
            </div>
            <div className="mt-8 space-y-4">
              {faqs.map((faq) => (
                <details key={faq.question} className="group rounded-xl border border-[#E5DDC8] bg-white/60 p-5 sm:p-6">
                  <summary className="cursor-pointer list-none pr-8 text-lg font-medium">
                    <span className="flex items-start justify-between gap-4"><span>{faq.question}</span><span aria-hidden="true" className="text-xl text-[#8C7541] transition group-open:rotate-45">+</span></span>
                  </summary>
                  <p className="mt-4 max-w-4xl leading-7 text-[#5F584D]">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="border-t border-[#E5DDC8] py-12 sm:py-16">
            <div className="rounded-2xl bg-[#1A1A1A] px-6 py-10 text-center text-white sm:px-10 sm:py-14">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#D4BE82]">Private strategic advisory</p>
              <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-semibold sm:text-4xl">Compare clinic claims against your actual treatment pathway</h2>
              <p className="mx-auto mt-5 max-w-2xl leading-8 text-[#D4D0C8]">FertilityCareHub helps structure clinic evaluation around comparable definitions, patient context, jurisdiction fit, treatment needs, costs, documentation, and execution risk.</p>
              <Link href="/consultation" className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full border border-[#D4BE82] px-6 py-3 text-sm font-medium text-[#F2E4BC] transition hover:bg-[#2D2D2D]">Request a strategy review</Link>
            </div>
          </section>

          <section className="border-t border-[#E5DDC8] py-10">
            <div className="grid gap-8 text-sm leading-7 text-[#6A6256] md:grid-cols-2">
              <div>
                <h2 className="font-semibold text-[#2A2824]">Review and methodology</h2>
                <p className="mt-3">Last reviewed: July 15, 2026. This guide explains common fertility outcome measures and reporting limitations. It does not independently validate any clinic&apos;s published results or rank providers.</p>
              </div>
              <div>
                <h2 className="font-semibold text-[#2A2824]">Important limitation</h2>
                <p className="mt-3">FertilityCareHub does not provide medical diagnosis, treatment, or guaranteed outcomes. A clinic&apos;s statistics cannot predict an individual result. Discuss personal prognosis and treatment decisions with a licensed fertility specialist.</p>
                <Link href="/disclaimer" className="mt-3 inline-block font-medium text-[#715F33] underline underline-offset-4">Read the full disclaimer</Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
