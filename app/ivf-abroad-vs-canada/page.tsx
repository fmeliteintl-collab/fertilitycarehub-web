import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "../components/Breadcrumbs";

const baseUrl = "https://fertilitycarehub.com";
const pageUrl = `${baseUrl}/ivf-abroad-vs-canada`;

const comparisonFactors = [
  {
    number: "01",
    title: "Access and eligibility",
    canada:
      "Eligibility and access can depend on provincial programs, clinic criteria, age, medical circumstances, and available services.",
    abroad:
      "Eligibility varies by destination and may depend on age, marital status, family structure, treatment type, donor pathway, and local law.",
    questions: [
      "Is the intended treatment legally and clinically available?",
      "Do age or family-status limits apply?",
      "Are international patients accepted?",
      "Which criteria are clinic-specific rather than national?",
    ],
  },
  {
    number: "02",
    title: "Funding and reimbursement",
    canada:
      "Public support varies by province or territory. Some programs fund selected services through participating clinics, while medication, testing, storage, or other costs may remain separate.",
    abroad:
      "International treatment is usually privately paid. Canadian provincial support, employer benefits, insurance, and tax treatment may not apply in the same way outside Canada.",
    questions: [
      "Which services are publicly funded or privately insured?",
      "Are medications and monitoring included?",
      "Are expenses outside Canada eligible for any reimbursement or credit?",
      "What documentation is required for a claim?",
    ],
  },
  {
    number: "03",
    title: "Wait times and scheduling",
    canada:
      "Wait times can vary by province, clinic, treatment type, funding stream, donor availability, and clinic capacity.",
    abroad:
      "Some destinations may offer faster private access, but treatment dates can still change because of clinical response, donor timing, laboratory scheduling, or legal requirements.",
    questions: [
      "How long is the current wait for consultation and treatment?",
      "Is the wait different for funded and self-paid care?",
      "How much scheduling flexibility is required?",
      "What happens if the cycle is delayed?",
    ],
  },
  {
    number: "04",
    title: "Donor pathways",
    canada:
      "Canadian law prohibits purchasing sperm or eggs from a donor, while permitted expenses may be reimbursed under federal rules. Donor sperm and ova are subject to safety and consent requirements.",
    abroad:
      "Donor compensation, anonymity, identity-release rules, screening, matching, record retention, and future access to information vary by jurisdiction.",
    questions: [
      "Is donation anonymous, identity-release, or known?",
      "What screening and consent rules apply?",
      "How long is the donor wait?",
      "What information may be available to a donor-conceived child?",
    ],
  },
  {
    number: "05",
    title: "Clinical and laboratory governance",
    canada:
      "Canadian treatment is delivered within federal, provincial, professional, and clinic-level frameworks, although oversight responsibilities differ by issue.",
    abroad:
      "Licensing, inspection, reporting, professional standards, and laboratory oversight vary significantly between countries.",
    questions: [
      "Which authority regulates the clinic and laboratory?",
      "Who leads the clinical and embryology teams?",
      "Are inspection or licensing details available?",
      "How are incidents and complaints handled?",
    ],
  },
  {
    number: "06",
    title: "Treatment options and clinic practice",
    canada:
      "Available treatment, testing, donor services, and clinic protocols vary among Canadian clinics and may be affected by funding rules or local practice.",
    abroad:
      "A destination may offer different donor models, testing options, transfer practices, laboratory services, or treatment packages.",
    questions: [
      "Is the proposed treatment clinically appropriate?",
      "Which services are standard, optional, or restricted?",
      "Are add-ons evidence-supported?",
      "Would the same protocol be recommended in Canada?",
    ],
  },
  {
    number: "07",
    title: "Total cost exposure",
    canada:
      "Treatment close to home may reduce travel and accommodation costs, but medication, testing, storage, donor services, and privately funded treatment can still create substantial expenses.",
    abroad:
      "Headline package prices may be lower, but flights, accommodation, medication, monitoring, translation, legal review, storage, transfers, and repeat trips can change the total.",
    questions: [
      "What is included in the written quotation?",
      "Which costs are variable or excluded?",
      "What would repeat after an unsuccessful attempt?",
      "What contingency reserve is realistic?",
    ],
  },
  {
    number: "08",
    title: "Travel and treatment coordination",
    canada:
      "Local treatment may simplify monitoring, urgent care, medication changes, and communication with the patient's regular health-care team.",
    abroad:
      "International treatment requires coordination of records, prescriptions, monitoring, flights, accommodation, recovery time, and schedule changes.",
    questions: [
      "Can monitoring be completed locally?",
      "How many international visits are required?",
      "Who coordinates medication changes?",
      "What happens if travel dates change?",
    ],
  },
  {
    number: "09",
    title: "Documentation and legal review",
    canada:
      "Canadian consent, donor, storage, and parentage questions remain important, especially when donor material, embryos, or surrogacy-related arrangements are involved.",
    abroad:
      "Treatment documents, donor records, parentage, birth registration, citizenship, import or export of reproductive material, and recognition at home may require separate review.",
    questions: [
      "Which consent and treatment records will be issued?",
      "Are certified translations needed?",
      "Could independent legal advice be required?",
      "Will the pathway be recognized in the home jurisdiction?",
    ],
  },
  {
    number: "10",
    title: "Continuity of care",
    canada:
      "Treatment within Canada may make follow-up, record transfer, complication management, and communication with local providers more straightforward.",
    abroad:
      "The plan should identify who manages care after return, how records are transferred, and where urgent questions or complications will be addressed.",
    questions: [
      "Who provides follow-up after treatment?",
      "When will complete records be released?",
      "Who handles urgent concerns after return?",
      "How will the clinic communicate with Canadian providers?",
    ],
  },
];

const decisionSteps = [
  {
    title: "Define the intended pathway",
    description:
      "Clarify the proposed treatment, donor needs, medical constraints, timeline, family structure, and documentation concerns.",
  },
  {
    title: "Confirm Canadian options",
    description:
      "Review available clinics, provincial or territorial support, wait times, private costs, donor availability, and treatment alternatives in Canada.",
  },
  {
    title: "Shortlist suitable jurisdictions",
    description:
      "Exclude destinations that do not meet essential legal, eligibility, donor, documentation, or clinical requirements.",
  },
  {
    title: "Compare complete pathways",
    description:
      "Compare total cost, time, travel, coordination, clinic governance, follow-up, and repeat-treatment exposure rather than package prices alone.",
  },
  {
    title: "Verify current information",
    description:
      "Funding rules, tax treatment, clinic policies, laws, costs, and waiting periods can change. Confirm them directly before committing.",
  },
];

const canadaMayFit = [
  "The required treatment and donor pathway are available.",
  "Continuity with local clinicians is a high priority.",
  "Provincial funding, insurance, or employer benefits materially improve affordability.",
  "Travel or extended absence would be difficult.",
  "The patient prefers treatment and follow-up within one health-care system.",
];

const abroadMayFit = [
  "A suitable pathway is unavailable or materially restricted in Canada.",
  "Wait time is incompatible with the patient's clinical timeline.",
  "A destination offers a better-aligned donor framework or treatment model.",
  "The complete international pathway remains financially and practically manageable.",
  "The patient can support the travel, legal, documentation, and continuity requirements.",
];

const redFlags = [
  "A destination is selected only because the advertised package price is lower.",
  "The clinic guarantees pregnancy or live birth.",
  "Canadian funding, benefits, or tax assumptions have not been verified.",
  "Donor identity, screening, consent, or record-retention rules are unclear.",
  "There is no plan for monitoring before travel or follow-up after return.",
  "Important documents are unavailable in a language the patient understands.",
  "The clinic cannot clearly identify its licensing or laboratory leadership.",
  "Travel dates are treated as fixed despite possible clinical changes.",
  "Parentage, citizenship, transport, or recognition questions are dismissed as unimportant.",
  "The budget assumes one attempt and excludes cancellation or repeat-treatment risk.",
];

const faqs = [
  {
    question: "Is IVF abroad always cheaper than IVF in Canada?",
    answer:
      "No. An international package may have a lower headline price, but the full comparison should include medication, testing, monitoring, laboratory procedures, donor expenses, storage, transfers, travel, accommodation, documentation, and possible repeat treatment.",
  },
  {
    question: "Is IVF publicly funded everywhere in Canada?",
    answer:
      "No. Health-care coverage and fertility support vary by province and territory. Eligibility, covered services, participating clinics, and wait times should be confirmed directly with the relevant program and clinic.",
  },
  {
    question: "Can Canadians use donor eggs or sperm abroad?",
    answer:
      "Potentially, but donor rules vary by destination. Patients should review screening, identity, consent, record retention, legal recognition, and any requirements that apply when returning to Canada.",
  },
  {
    question: "Can treatment costs outside Canada qualify for tax relief?",
    answer:
      "Tax treatment depends on the specific expense and current rules. Canadian federal and provincial credits may apply differently, and some fertility-specific supports require services to be provided in Canada. Obtain current tax advice before relying on a credit.",
  },
  {
    question: "Should I choose a country before choosing a clinic?",
    answer:
      "Usually yes. Jurisdiction-level eligibility, donor rules, documentation, and legal requirements should be assessed before comparing individual clinics within that destination.",
  },
  {
    question: "Does FertilityCareHub recommend treatment abroad?",
    answer:
      "FertilityCareHub does not assume that treatment abroad or in Canada is inherently better. The appropriate pathway depends on individual medical needs, eligibility, timing, donor requirements, cost exposure, legal considerations, and acceptable execution risk.",
  },
];

export const metadata: Metadata = {
  title: "IVF Abroad vs Canada | Fertility Treatment Comparison",
  description:
    "Compare IVF abroad with fertility treatment in Canada across access, funding, wait times, donor pathways, clinic governance, costs, travel, documentation, and continuity of care.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "IVF Abroad vs Canada | FertilityCareHub",
    description:
      "A structured comparison of fertility treatment abroad and in Canada across access, funding, donors, costs, logistics, documentation, and follow-up.",
    url: pageUrl,
    siteName: "FertilityCareHub",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "IVF Abroad vs Canada | FertilityCareHub",
    description:
      "Compare the practical, financial, regulatory, and clinical considerations of IVF abroad and treatment in Canada.",
  },
};

export default function IvfAbroadVsCanadaPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "IVF Abroad vs Canada",
    description:
      "A structured comparison of fertility treatment abroad and in Canada across access, funding, wait times, donor pathways, clinical governance, costs, travel, documentation, and continuity of care.",
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
        name: "IVF Abroad vs Canada",
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
              { name: "IVF Abroad vs Canada", href: "/ivf-abroad-vs-canada" },
            ]}
          />

          <section className="border-b border-[#E5DDC8] pb-12 pt-10 text-center sm:pb-16 sm:pt-14">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-[#7B6A3A]">
              Cross-Border Treatment Comparison
            </p>

            <h1 className="mx-auto max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.03em] sm:text-5xl lg:text-6xl">
              IVF Abroad vs Canada
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-[#5F584D] sm:text-lg">
              Choosing between treatment in Canada and an international pathway
              requires more than comparing wait times or package prices.
              Evaluate access, funding, donor rules, clinic governance, total
              costs, travel, documentation, and continuity of care.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/countries/canada"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#1A1A1A] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#343434]"
              >
                Review the Canada dossier
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
                    "Canadian patients comparing domestic and international IVF",
                    "Couples facing funding or wait-time decisions",
                    "Intended parents evaluating donor pathways",
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
                  Neither pathway is automatically better
                </h2>

                <div className="mt-5 space-y-4 leading-8 text-[#5F584D]">
                  <p>
                    Treatment in Canada may support stronger continuity with
                    local health-care providers and may provide access to
                    provincial programs, insurance benefits, or tax support.
                    Availability and eligibility vary.
                  </p>
                  <p>
                    Treatment abroad may provide faster access, a different
                    donor framework, or another clinic option, but it also adds
                    travel, coordination, documentation, currency, legal, and
                    follow-up requirements.
                  </p>
                  <p>
                    The correct comparison is therefore between complete,
                    executable pathways rather than between two clinic prices.
                  </p>
                </div>
              </div>

              <aside className="rounded-2xl border border-[#D8C89F] bg-[#EEE5D2] p-6 sm:p-8">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#7B6A3A]">
                  Core principle
                </p>
                <blockquote className="mt-4 text-xl font-medium leading-8">
                  Compare the full pathway from eligibility through follow-up,
                  not only the treatment procedure.
                </blockquote>
                <p className="mt-5 text-sm leading-7 text-[#625A4C]">
                  A lower price or shorter wait should not override legal,
                  clinical, donor, documentation, or continuity requirements.
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
                    <div>
                      <h3 className="text-xl font-semibold">{factor.title}</h3>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <div className="rounded-xl border border-[#E5DDC8] bg-white/60 p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7B6A3A]">
                        Canada
                      </p>
                      <p className="mt-3 text-sm leading-7 text-[#5F584D]">
                        {factor.canada}
                      </p>
                    </div>
                    <div className="rounded-xl border border-[#E5DDC8] bg-white/60 p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7B6A3A]">
                        Abroad
                      </p>
                      <p className="mt-3 text-sm leading-7 text-[#5F584D]">
                        {factor.abroad}
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
                  Canada may fit when
                </p>
                <ul className="mt-6 space-y-3 text-sm leading-7 text-[#5F584D]">
                  {canadaMayFit.map((item) => (
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
                  Treatment abroad may fit when
                </p>
                <ul className="mt-6 space-y-3 text-sm leading-7 text-[#5F584D]">
                  {abroadMayFit.map((item) => (
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
                Reasons to pause before choosing a pathway
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
                  title: "Canada Dossier",
                  description:
                    "Review Canada-specific fertility planning considerations.",
                  href: "/countries/canada",
                },
                {
                  title: "Compare Jurisdictions",
                  description:
                    "Use the strategic country-comparison framework.",
                  href: "/how-to-compare-fertility-jurisdictions",
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
                {
                  title: "Private Advisory",
                  description:
                    "Review structured cross-border advisory pathways.",
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
                Compare Canadian and international pathways against your priorities
              </h2>
              <p className="mx-auto mt-5 max-w-2xl leading-8 text-[#D4D0C8]">
                FertilityCareHub helps structure decisions around eligibility,
                donor pathways, timing, complete costs, documentation, travel,
                clinic governance, and continuity of care.
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
                  Last reviewed: July 15, 2026. Canadian fertility funding,
                  clinic availability, tax rules, donor requirements, and
                  international regulations can change. Confirm current
                  information directly before making a decision.
                </p>
              </div>
              <div>
                <h2 className="font-semibold text-[#2A2824]">
                  Important limitation
                </h2>
                <p className="mt-3">
                  FertilityCareHub does not provide medical, legal, tax, or
                  financial advice and does not guarantee treatment outcomes.
                  Confirm medical decisions with licensed clinicians and obtain
                  qualified legal, tax, or financial advice where appropriate.
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
