import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "../components/Breadcrumbs";

const pageUrl =
  "https://fertilitycarehub.com/how-to-compare-fertility-jurisdictions";

const comparisonFactors = [
  {
    number: "01",
    title: "Governance and regulatory oversight",
    description:
      "Review how fertility services are regulated, whether clinics operate under national licensing standards, how compliance is monitored, and what accountability mechanisms exist when concerns arise.",
    questions: [
      "Which public authority regulates fertility clinics?",
      "Are inspection or licensing requirements publicly available?",
      "How consistently are national rules applied?",
      "Are enforcement actions or clinic standards transparent?",
    ],
  },
  {
    number: "02",
    title: "Patient access and eligibility",
    description:
      "A jurisdiction may offer strong clinical infrastructure while still being unsuitable because of eligibility restrictions. Access can vary according to age, marital status, family structure, medical history, nationality, or treatment pathway.",
    questions: [
      "Are there legal or clinic-specific age limits?",
      "Are single patients and same-sex couples eligible?",
      "Does marital status affect access?",
      "Are international patients accepted for the intended treatment?",
    ],
  },
  {
    number: "03",
    title: "Donor pathway structure",
    description:
      "Where donor eggs, sperm, or embryos are being considered, compare identity rules, screening standards, availability, matching practices, waiting periods, and the information that may be available to intended parents or donor-conceived children.",
    questions: [
      "Is donation anonymous, identity-release, or known?",
      "What health and genetic screening is required?",
      "How are donors recruited and matched?",
      "What information is retained for future access?",
    ],
  },
  {
    number: "04",
    title: "Clinic and laboratory governance",
    description:
      "Clinic branding alone does not establish quality. Evaluate laboratory oversight, professional credentials, quality-assurance systems, incident procedures, treatment-volume context, and the transparency of the clinic team.",
    questions: [
      "Who leads the laboratory and clinical teams?",
      "Which quality-assurance standards are followed?",
      "How are laboratory incidents or deviations managed?",
      "Can the clinic explain its protocols without relying on marketing language?",
    ],
  },
  {
    number: "05",
    title: "Success-rate interpretation",
    description:
      "Published success rates are difficult to compare unless the underlying patient population, treatment type, age group, embryo stage, reporting period, and outcome definition are understood.",
    questions: [
      "Is the figure based on pregnancy, ongoing pregnancy, or live birth?",
      "Is the rate reported per cycle, transfer, or patient?",
      "Are donor and non-donor cycles separated?",
      "Does the clinic explain cancellation and multiple-birth rates?",
    ],
  },
  {
    number: "06",
    title: "Cost and financial transparency",
    description:
      "Headline package prices rarely capture the full financial exposure. Compare consultations, medication, testing, donor-related costs, storage, freezing, transfers, travel, accommodation, and possible repeat-cycle expenses.",
    questions: [
      "Which services are included in the quoted price?",
      "Which medications and tests are excluded?",
      "Are donor, storage, freezing, and transfer fees separate?",
      "What happens financially if a cycle is cancelled or changed?",
    ],
  },
  {
    number: "07",
    title: "Travel and treatment coordination",
    description:
      "Cross-border treatment requires more than booking flights. Consider appointment sequencing, medication monitoring, local testing, travel flexibility, recovery time, language support, and the consequences of schedule changes.",
    questions: [
      "How many in-person visits are normally required?",
      "Can monitoring be completed in the home country?",
      "How much notice is provided before travel?",
      "What support is available when treatment dates change?",
    ],
  },
  {
    number: "08",
    title: "Legal and documentation considerations",
    description:
      "Legal issues can extend beyond treatment eligibility. Depending on the pathway, parentage, donor documentation, birth registration, citizenship, consent records, and recognition in the home country may require separate review.",
    questions: [
      "Are treatment and consent documents available in an understandable language?",
      "Could parentage recognition require independent legal advice?",
      "What records will be issued after treatment or birth?",
      "Will the intended pathway be recognized in the home jurisdiction?",
    ],
  },
  {
    number: "09",
    title: "Continuity of care",
    description:
      "A well-designed plan should address what happens before departure, during treatment, after returning home, and if complications or unexpected results occur.",
    questions: [
      "Who coordinates with the patient’s local physician?",
      "How are medication changes communicated?",
      "What follow-up records are provided?",
      "Who is responsible for urgent questions after the patient returns home?",
    ],
  },
  {
    number: "10",
    title: "Execution risk and overall fit",
    description:
      "The strongest jurisdiction on paper may not be the strongest fit for a particular person. The final assessment should balance regulatory clarity, treatment access, clinical coordination, timing, cost exposure, and personal priorities.",
    questions: [
      "Which factors are essential rather than merely preferred?",
      "Where is the greatest execution risk?",
      "What would cause this jurisdiction to be excluded?",
      "Is there a better-aligned primary or backup destination?",
    ],
  },
];

const comparisonSteps = [
  {
    title: "Define the intended pathway",
    description:
      "Clarify the treatment being considered, relevant medical constraints, donor requirements, timeline, family structure, and legal concerns.",
  },
  {
    title: "Create non-negotiable criteria",
    description:
      "Separate essential requirements from preferences. A jurisdiction that fails an essential criterion should not remain on the shortlist.",
  },
  {
    title: "Shortlist two or three jurisdictions",
    description:
      "Avoid comparing too many destinations at once. A focused shortlist makes differences easier to evaluate and reduces decision fatigue.",
  },
  {
    title: "Assess clinics within the jurisdiction",
    description:
      "Country suitability and clinic suitability are separate decisions. A strong jurisdiction does not make every clinic within it equally suitable.",
  },
  {
    title: "Verify current rules directly",
    description:
      "Regulations, eligibility policies, clinic practices, costs, and waiting periods can change. Confirm current information with the appropriate licensed professionals and providers.",
  },
];

const warningSigns = [
  "A clinic or intermediary guarantees success or presents outcomes without meaningful context.",
  "The quoted package excludes important costs but does not clearly explain them.",
  "Eligibility or legal questions receive vague or inconsistent answers.",
  "The clinic avoids identifying its laboratory leadership or quality-assurance process.",
  "Donor screening, identity rules, or record-retention practices are unclear.",
  "The recommended destination appears driven by referral relationships rather than patient fit.",
  "Urgency or pressure is used to discourage independent review.",
  "There is no clear plan for follow-up care after the patient returns home.",
];

const countryLinks = [
  { name: "Canada", href: "/countries/canada" },
  { name: "China", href: "/countries/china" },
  { name: "Czech Republic", href: "/countries/czech-republic" },
  { name: "Greece", href: "/countries/greece" },
  { name: "India", href: "/countries/india" },
  { name: "Mexico", href: "/countries/mexico" },
  { name: "Portugal", href: "/countries/portugal" },
  { name: "Spain", href: "/countries/spain" },
  { name: "Turkey", href: "/countries/turkey" },
  { name: "United Kingdom", href: "/countries/united-kingdom" },
  { name: "United States", href: "/countries/united-states" },
];

const faqs = [
  {
    question: "What is a fertility jurisdiction?",
    answer:
      "A fertility jurisdiction is a country or legal territory whose regulations, eligibility rules, clinical infrastructure, donor policies, documentation requirements, and treatment practices shape access to fertility care.",
  },
  {
    question: "Is the least expensive destination usually the best choice?",
    answer:
      "No. Headline cost should be considered alongside regulatory clarity, eligibility, clinic quality, treatment coordination, travel requirements, legal considerations, and the financial effect of delays or repeat treatment.",
  },
  {
    question: "Can clinic success rates be compared directly?",
    answer:
      "Not reliably without understanding how each clinic defines and reports outcomes. Patient age, treatment type, donor use, embryo stage, reporting period, and whether results are measured per cycle or transfer can materially affect the figures.",
  },
  {
    question: "Should I choose the country before choosing the clinic?",
    answer:
      "Jurisdiction fit should usually be assessed first because national laws and access rules can eliminate unsuitable destinations. Clinic-level evaluation should then be completed within the jurisdictions that remain aligned.",
  },
  {
    question: "Does FertilityCareHub provide medical or legal advice?",
    answer:
      "No. FertilityCareHub provides structured strategic information and decision-support guidance. Medical decisions should be made with licensed clinicians, and legal questions should be reviewed by qualified legal professionals.",
  },
];

export const metadata: Metadata = {
  title:
    "How to Compare Fertility Jurisdictions | IVF Destination Guide",
  description:
    "Compare fertility destinations using a structured framework covering regulation, eligibility, donor pathways, clinic governance, costs, logistics, and execution risk.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title:
      "How to Compare Fertility Jurisdictions Strategically | FertilityCareHub",
    description:
      "A structured framework for comparing fertility destinations across regulation, access, donor pathways, clinic governance, costs, logistics, and execution risk.",
    url: pageUrl,
    siteName: "FertilityCareHub",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "How to Compare Fertility Jurisdictions Strategically | FertilityCareHub",
    description:
      "A structured framework for evaluating fertility destinations and cross-border treatment pathways.",
  },
};

export default function CompareFertilityJurisdictionsPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Compare Fertility Jurisdictions Strategically",
    description:
      "A structured framework to compare fertility destinations based on regulation, eligibility, donor pathways, clinic governance, costs, logistics, and execution risk.",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "FertilityCareHub",
      url: "https://fertilitycarehub.com",
    },
    author: {
      "@type": "Organization",
      name: "FertilityCareHub",
    },
    dateModified: "2026-07-12",
    datePublished: "2026-07-12",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://fertilitycarehub.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Country Comparison Guide",
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
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <main className="min-h-screen bg-[#F5F1E8] text-[#1A1A1A]">
        <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-6 sm:py-14 lg:px-8">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              {
                name: "Compare Fertility Jurisdictions",
                href: "/how-to-compare-fertility-jurisdictions",
              },
            ]}
          />

          <section className="border-b border-[#E5DDC8] pb-12 pt-10 text-center sm:pb-16 sm:pt-14">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-[#7B6A3A]">
              Strategic Planning Guide
            </p>

            <h1 className="mx-auto max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.03em] sm:text-5xl lg:text-6xl">
              How to Compare Fertility Jurisdictions Strategically
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-[#5F584D] sm:text-lg">
              Choosing a fertility destination should not be based only on clinic
              marketing, headline pricing, or a single success-rate figure. A
              reliable comparison requires a structured assessment of regulation,
              patient access, donor pathways, clinical governance, total cost,
              logistics, legal considerations, and execution risk.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/countries"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#1A1A1A] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#343434]"
              >
                Explore country dossiers
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
                    <dd className="mt-1">July 12, 2026</dd>
                  </div>

                  <div>
                    <dt className="font-semibold text-[#2A2824]">
                      Framework version
                    </dt>
                    <dd className="mt-1">FCH Global Fertility Intelligence Framework(TM) v1.0</dd>
                  </div>

                  <div>
                    <dt className="font-semibold text-[#2A2824]">
                      Estimated reading time
                    </dt>
                    <dd className="mt-1">Approximately 12 minutes</dd>
                  </div>
                </dl>
              </aside>

              <div className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-6 sm:p-7">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#7B6A3A]">
                  Who this guide is for
                </p>

                <ul className="mt-5 grid gap-3 text-sm leading-6 text-[#5F584D] sm:grid-cols-2">
                  {[
                    "Individuals beginning international fertility research",
                    "Couples comparing fertility-treatment jurisdictions",
                    "Intended parents evaluating donor pathways",
                    "Patients planning treatment abroad",
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
                  Compare jurisdictions before comparing clinics
                </h2>

                <div className="mt-5 space-y-4 leading-8 text-[#5F584D]">
                  <p>
                    Country-level rules can determine whether a treatment pathway
                    is legally available, whether the patient is eligible, how donor
                    information is handled, and which documentation may be required.
                  </p>

                  <p>
                    Once an appropriate jurisdiction has been identified, individual
                    clinics should be assessed separately. A well-regulated
                    destination can still contain clinics with different standards,
                    communication practices, costs, and levels of experience.
                  </p>

                  <p>
                    The strongest choice is therefore not necessarily the most
                    popular or least expensive destination. It is the jurisdiction
                    and clinic combination that best aligns with the patient&apos;s
                    pathway, constraints, priorities, and acceptable level of risk.
                  </p>
                </div>
              </div>

              <aside className="rounded-2xl border border-[#D8C89F] bg-[#EEE5D2] p-6 sm:p-8">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#7B6A3A]">
                  Core principle
                </p>

                <blockquote className="mt-4 text-xl font-medium leading-8">
                  A destination should be excluded when it fails a critical
                  requirement, even when its clinics appear attractive.
                </blockquote>

                <p className="mt-5 text-sm leading-7 text-[#625A4C]">
                  Begin with non-negotiable criteria. Price, convenience, and brand
                  recognition should not override legal, medical, ethical, or
                  documentation requirements.
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
                Use the following factors to compare a focused shortlist of
                jurisdictions. The relative importance of each factor will depend
                on the intended treatment pathway and the patient&apos;s individual
                circumstances.
              </p>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {comparisonFactors.map((factor) => (
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
                A five-step comparison method
              </h2>
            </div>

            <ol className="mt-10 grid gap-5">
              {comparisonSteps.map((step, index) => (
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
                  Comparison matrix
                </p>

                <h2 className="mt-4 text-3xl font-semibold">
                  Build a decision scorecard
                </h2>

                <p className="mt-5 leading-8 text-[#5F584D]">
                  A scorecard can make differences easier to identify, but the
                  weighting should reflect the patient&apos;s real priorities. A
                  critical legal or eligibility issue should not be offset by a
                  lower price or shorter waiting period.
                </p>
              </div>

              <div className="overflow-hidden rounded-2xl border border-[#E5DDC8] bg-white/60">
                <div className="grid grid-cols-[1fr_90px_90px] border-b border-[#E5DDC8] bg-[#EEE5D2] px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[#625A4C] sm:grid-cols-[1fr_120px_120px] sm:px-6">
                  <span>Factor</span>
                  <span className="text-center">Weight</span>
                  <span className="text-center">Score</span>
                </div>

                {[
                  "Eligibility and legal fit",
                  "Clinic and laboratory governance",
                  "Donor pathway alignment",
                  "Total financial exposure",
                  "Travel and coordination burden",
                  "Continuity of care",
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
                Warning signs
              </p>

              <h2 className="mt-4 text-3xl font-semibold">
                Reasons to pause before proceeding
              </h2>

              <div className="mt-7 grid gap-4 md:grid-cols-2">
                {warningSigns.map((warning) => (
                  <div
                    key={warning}
                    className="flex gap-3 rounded-xl border border-[#D6C69C] bg-white/50 p-4"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#A88947] text-xs font-bold text-[#7B6A3A]"
                    >
                      !
                    </span>

                    <p className="text-sm leading-6 text-[#5F584D]">{warning}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="border-t border-[#E5DDC8] py-12 sm:py-16">
            <div className="max-w-3xl">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#7B6A3A]">
                Country intelligence
              </p>

              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
                Explore FertilityCareHub country dossiers
              </h2>

              <p className="mt-5 leading-8 text-[#5F584D]">
                Country dossiers provide a jurisdiction-level starting point.
                Current eligibility, clinic policies, treatment availability, and
                regulatory requirements should always be independently verified.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {countryLinks.map((country) => (
                <Link
                  key={country.href}
                  href={country.href}
                  className="group flex items-center justify-between rounded-xl border border-[#E5DDC8] bg-white/60 px-5 py-4 transition hover:border-[#B89B5E] hover:bg-white"
                >
                  <span className="font-medium">{country.name}</span>
                  <span
                    aria-hidden="true"
                    className="text-[#8C7541] transition group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              ))}
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

              <p className="mt-5 leading-8 text-[#5F584D]">
                Use these resources to move from general comparison toward
                jurisdiction research, clinic-level evaluation, and private
                strategic planning.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Countries",
                  description:
                    "Explore FertilityCareHub jurisdiction dossiers.",
                  href: "/countries",
                },
                {
                  title: "Spain",
                  description:
                    "Review the Spain fertility jurisdiction assessment.",
                  href: "/countries/spain",
                },
                {
                  title: "Greece",
                  description:
                    "Review the Greece fertility jurisdiction assessment.",
                  href: "/countries/greece",
                },
                {
                  title: "Compare",
                  description:
                    "View available country-to-country fertility comparisons.",
                  href: "/compare",
                },
                {
                  title: "Guides",
                  description:
                    "Browse the FertilityCareHub authority library.",
                  href: "/guides",
                },
                {
                  title: "Consultation",
                  description:
                    "Request structured support for a focused shortlist.",
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
                Compare a focused shortlist against your actual pathway
              </h2>

              <p className="mx-auto mt-5 max-w-2xl leading-8 text-[#D4D0C8]">
                FertilityCareHub helps structure jurisdiction comparisons around
                your treatment pathway, constraints, priorities, timeline, and
                decision risks.
              </p>

              <Link
                href="/consultation"
                className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full border border-[#D4BE82] px-6 py-3 text-sm font-medium text-[#F2E4BC] transition hover:bg-[#2D2D2D]"
              >
                Request a strategy review
              </Link>
            </div>
          </section>

          <section className="border-t border-[#E5DDC8] py-12 sm:py-16">
            <div className="max-w-3xl">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#7B6A3A]">
                Continue your research
              </p>

              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
                Choose your next step
              </h2>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "Country Intelligence",
                  href: "/countries",
                  description:
                    "Explore jurisdiction dossiers and country-level planning considerations.",
                },
                {
                  title: "Jurisdiction Comparisons",
                  href: "/compare",
                  description:
                    "Review available country-to-country fertility comparisons.",
                },
                {
                  title: "Guides Library",
                  href: "/guides",
                  description:
                    "Browse structured fertility-planning resources and future guides.",
                },
                {
                  title: "Private Advisory",
                  href: "/advisory",
                  description:
                    "Review advisory pathways for personalized cross-border planning.",
                },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group rounded-2xl border border-[#E5DDC8] bg-white/60 p-5 transition hover:border-[#B89B5E] hover:bg-white"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <span
                      aria-hidden="true"
                      className="text-[#8C7541] transition group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-[#625A4C]">
                    {item.description}
                  </p>
                </Link>
              ))}
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
                  decision framework rather than a ranking of countries or clinics.
                  Jurisdiction rules, treatment availability, costs, and clinic
                  policies can change.
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