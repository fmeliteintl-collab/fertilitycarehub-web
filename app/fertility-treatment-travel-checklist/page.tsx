import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "../components/Breadcrumbs";

const baseUrl = "https://fertilitycarehub.com";
const pageUrl = `${baseUrl}/fertility-treatment-travel-checklist`;

const checklistSections = [
  {
    number: "01",
    title: "Medical records and treatment documents",
    description:
      "Prepare a complete, portable record set before departure so the clinic and any local provider can access the information needed for safe decision-making.",
    items: [
      "Passport-name-consistent patient identification",
      "Referral letters and physician summaries",
      "Recent bloodwork and ultrasound reports",
      "Semen analysis and relevant diagnostic testing",
      "Previous cycle summaries and embryology reports",
      "Medication list, allergies, and medical conditions",
      "Consent forms and treatment agreements",
      "Emergency contact and local physician details",
    ],
  },
  {
    number: "02",
    title: "Medication and prescription planning",
    description:
      "Medication timing, transport, storage, replacement, and prescription validity should be resolved before travel.",
    items: [
      "Complete medication list with generic and brand names",
      "Written dosing schedule and time-zone plan",
      "Copies of prescriptions and clinic instructions",
      "Original pharmacy-labelled packaging",
      "Temperature-control plan where required",
      "Backup supply for delays",
      "Needles, syringes, and sharps-disposal plan",
      "Replacement-pharmacy and emergency-contact information",
    ],
  },
  {
    number: "03",
    title: "Monitoring before and during travel",
    description:
      "Clarify which appointments can be completed at home, who reviews results, and how quickly treatment changes will be communicated.",
    items: [
      "Baseline scan and bloodwork schedule",
      "Local monitoring clinic confirmed",
      "Result-transmission method tested",
      "Named clinician reviewing results",
      "Expected response time for medication changes",
      "Weekend and after-hours procedure",
      "Plan for delayed or missed monitoring",
      "Copies of all monitoring results retained",
    ],
  },
  {
    number: "04",
    title: "Flights and date flexibility",
    description:
      "Treatment dates can change with clinical response, donor timing, laboratory scheduling, or unexpected delays.",
    items: [
      "Flexible or changeable airfare",
      "Arrival buffer before first appointment",
      "Departure buffer after procedure or transfer",
      "Alternative flight options researched",
      "Baggage allowance for medication and supplies",
      "Travel-disruption contact plan",
      "Passport validity confirmed",
      "Entry and transit requirements reviewed",
    ],
  },
  {
    number: "05",
    title: "Accommodation and local transport",
    description:
      "Choose accommodation that supports clinic access, rest, medication storage, and schedule changes.",
    items: [
      "Accommodation near clinic or reliable transport",
      "Flexible cancellation or extension terms",
      "Refrigeration where medication requires it",
      "Elevator or mobility access if needed",
      "Safe transport after sedation or procedures",
      "Local taxi, rideshare, or driver options",
      "Nearby pharmacy and urgent-care location",
      "Quiet recovery environment",
    ],
  },
  {
    number: "06",
    title: "Travel insurance and health coverage",
    description:
      "Standard travel insurance may exclude planned fertility treatment or complications related to elective procedures.",
    items: [
      "Policy wording reviewed in full",
      "Fertility-treatment exclusions identified",
      "Complication coverage confirmed in writing",
      "Trip-cancellation coverage reviewed",
      "Medication-loss coverage checked",
      "Pre-existing-condition rules reviewed",
      "Emergency-assistance number saved",
      "Out-of-country health coverage understood",
    ],
  },
  {
    number: "07",
    title: "Money, payments, and contingency funds",
    description:
      "International treatment may involve deposits, balance payments, currency conversion, card limits, and unexpected clinical or travel costs.",
    items: [
      "Itemized clinic quotation saved",
      "Payment deadlines recorded",
      "Accepted payment methods confirmed",
      "Bank and card limits increased if needed",
      "Currency-conversion charges reviewed",
      "Emergency reserve available",
      "Receipt and invoice folder created",
      "Refund and cancellation terms saved",
    ],
  },
  {
    number: "08",
    title: "Legal, consent, and translation documents",
    description:
      "Donor, embryo, parentage, storage, and treatment documents may require legal review, translation, notarization, or certification.",
    items: [
      "Consent documents reviewed before travel",
      "Certified translations arranged where required",
      "Independent legal advice obtained where appropriate",
      "Donor and parentage documents retained",
      "Storage instructions and renewal terms saved",
      "Marriage or civil-status documents prepared if required",
      "Notarization or apostille requirements checked",
      "Courier and document-delivery plan confirmed",
    ],
  },
  {
    number: "09",
    title: "Companion and support planning",
    description:
      "A companion may be required after sedation, retrieval, or another procedure and can provide practical and emotional support.",
    items: [
      "Clinic companion requirements confirmed",
      "Companion travel documents ready",
      "Work and caregiving coverage arranged",
      "Emergency contact available at home",
      "Transport after procedures confirmed",
      "Communication plan with family or support network",
      "Childcare or dependent-care arrangements completed",
      "Recovery assistance planned",
    ],
  },
  {
    number: "10",
    title: "Emergency and complication planning",
    description:
      "Know where to seek help, who should be called first, and how the international clinic will coordinate with local providers.",
    items: [
      "Clinic urgent-contact number saved",
      "Nearest emergency department identified",
      "Local emergency number saved",
      "Warning signs reviewed with the clinic",
      "Medical summary accessible on phone and paper",
      "Insurance assistance number saved",
      "Home-country physician contact available",
      "Plan for extended stay if travel is not advised",
    ],
  },
  {
    number: "11",
    title: "Post-treatment and return-home plan",
    description:
      "Before leaving, confirm follow-up testing, medication continuation, record transfer, and responsibility for care after return.",
    items: [
      "Discharge instructions received",
      "Medication continuation plan confirmed",
      "Pregnancy-test timing recorded",
      "Follow-up appointment scheduled",
      "Complete records requested",
      "Embryology report requested",
      "Local physician informed",
      "Urgent-contact process after return confirmed",
    ],
  },
  {
    number: "12",
    title: "Digital and paper backup system",
    description:
      "Keep critical documents accessible even if a phone, email account, or internet connection fails.",
    items: [
      "Secure cloud folder created",
      "Offline copies stored on phone",
      "Paper copies packed separately",
      "Important numbers written down",
      "Passwords and two-factor access tested",
      "Clinic portal login confirmed",
      "Copies shared with trusted companion",
      "Sensitive documents protected appropriately",
    ],
  },
];

const planningSteps = [
  {
    title: "Map the treatment timeline",
    description:
      "List every medical, travel, payment, and documentation milestone from pre-treatment testing through return-home follow-up.",
  },
  {
    title: "Confirm what may change",
    description:
      "Identify which dates depend on stimulation response, donor timing, laboratory availability, or physician review.",
  },
  {
    title: "Assign responsibility",
    description:
      "Record who manages prescriptions, monitoring, transport, payments, records, emergency communication, and follow-up.",
  },
  {
    title: "Create backups",
    description:
      "Prepare backup medication, flexible travel, duplicate records, emergency funds, and alternative accommodation or transport.",
  },
  {
    title: "Reconfirm before departure",
    description:
      "Verify appointments, medication instructions, travel requirements, clinic contacts, payment status, and documentation shortly before leaving.",
  },
];

const redFlags = [
  "Flights are booked before the clinic confirms a realistic treatment window.",
  "Medication is packed without prescriptions or original labels.",
  "There is no plan for local monitoring or rapid result transmission.",
  "Travel insurance exclusions have not been reviewed.",
  "The patient does not know who to contact after hours.",
  "The clinic has not explained warning signs or emergency procedures.",
  "Accommodation cannot be extended if treatment dates change.",
  "Important consent or donor documents remain unread.",
  "The budget has no contingency reserve.",
  "There is no follow-up plan after returning home.",
];

const finalCheck = [
  "Passport, entry, and transit requirements",
  "Clinic appointment schedule",
  "Medical records and consent documents",
  "Medication, prescriptions, and supplies",
  "Monitoring and result-transmission plan",
  "Flights, accommodation, and local transport",
  "Insurance and emergency contacts",
  "Payment method and contingency funds",
  "Companion and recovery arrangements",
  "Follow-up and record-transfer plan",
];

const faqs = [
  {
    question: "When should I book flights for fertility treatment abroad?",
    answer:
      "Book only after the clinic provides a realistic treatment window and explains which dates may change. Flexible or changeable tickets are usually safer than rigid bookings.",
  },
  {
    question: "Can fertility medication be carried on a plane?",
    answer:
      "Often yes, but airline, airport, customs, and destination rules can differ. Keep medication in original labelled packaging with prescriptions and clinic documentation, and confirm storage requirements.",
  },
  {
    question: "Does normal travel insurance cover IVF treatment abroad?",
    answer:
      "Not necessarily. Many policies exclude planned treatment, fertility procedures, or related complications. Review the wording and obtain written clarification before relying on coverage.",
  },
  {
    question: "How long should I stay after egg retrieval or embryo transfer?",
    answer:
      "The appropriate period depends on the procedure, clinic advice, recovery, travel distance, and individual medical circumstances. Confirm directly with the treating clinician.",
  },
  {
    question: "Should I travel alone?",
    answer:
      "Some clinics require a responsible adult after sedation or certain procedures. Even when not mandatory, a companion may help with transport, medication, recovery, and emergencies.",
  },
  {
    question: "Does FertilityCareHub provide medical travel clearance?",
    answer:
      "No. FertilityCareHub provides general planning information. Travel fitness and medical decisions must be confirmed with licensed clinicians.",
  },
];

export const metadata: Metadata = {
  title: "Fertility Treatment Travel Checklist | IVF Abroad Planning",
  description:
    "Use a complete fertility treatment travel checklist covering medical records, medication, monitoring, flights, accommodation, insurance, payments, documents, emergencies, and follow-up.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Fertility Treatment Travel Checklist | FertilityCareHub",
    description:
      "A structured travel-planning guide for international fertility treatment, from medical records and medication to insurance, emergencies, and continuity of care.",
    url: pageUrl,
    siteName: "FertilityCareHub",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fertility Treatment Travel Checklist | FertilityCareHub",
    description:
      "Prepare for fertility treatment abroad with a structured medical, travel, financial, and continuity-of-care checklist.",
  },
};

export default function FertilityTreatmentTravelChecklistPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Fertility Treatment Travel Checklist",
    description:
      "A structured checklist for fertility treatment travel covering medical records, medication, monitoring, flights, accommodation, insurance, payments, legal documents, emergency planning, and follow-up.",
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
        name: "Fertility Treatment Travel Checklist",
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
                name: "Fertility Treatment Travel Checklist",
                href: "/fertility-treatment-travel-checklist",
              },
            ]}
          />

          <section className="border-b border-[#E5DDC8] pb-12 pt-10 text-center sm:pb-16 sm:pt-14">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-[#7B6A3A]">
              International Treatment Planning Guide
            </p>

            <h1 className="mx-auto max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.03em] sm:text-5xl lg:text-6xl">
              Fertility Treatment Travel Checklist
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-[#5F584D] sm:text-lg">
              International fertility treatment requires coordinated medical,
              travel, financial, legal, and follow-up planning. Use this
              checklist to reduce avoidable disruption and clarify responsibility
              before departure.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/hidden-costs-of-fertility-treatment-abroad"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#1A1A1A] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#343434]"
              >
                Review the hidden costs guide
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
                    "Patients travelling for IVF or donor treatment",
                    "Couples coordinating international monitoring",
                    "Intended parents planning clinic visits",
                    "Families preparing for treatment-related travel",
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
                  Treat the journey as part of the medical pathway
                </h2>

                <div className="mt-5 space-y-4 leading-8 text-[#5F584D]">
                  <p>
                    Travel planning is not separate from treatment planning.
                    Medication timing, monitoring, appointment changes, recovery,
                    emergency access, and record transfer can all affect safety
                    and execution.
                  </p>

                  <p>
                    The strongest plan includes flexibility. Clinical response
                    may change the retrieval, transfer, donor, or follow-up
                    schedule, which can affect flights, accommodation, work
                    leave, and companion availability.
                  </p>

                  <p>
                    Before departure, every critical task should have a named
                    owner, written instructions, a backup option, and an urgent
                    contact.
                  </p>
                </div>
              </div>

              <aside className="rounded-2xl border border-[#D8C89F] bg-[#EEE5D2] p-6 sm:p-8">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#7B6A3A]">
                  Core principle
                </p>

                <blockquote className="mt-4 text-xl font-medium leading-8">
                  The travel plan should remain flexible enough to follow the
                  treatment plan safely.
                </blockquote>

                <p className="mt-5 text-sm leading-7 text-[#625A4C]">
                  Avoid commitments that make it difficult to respond to
                  medication changes, delayed procedures, or follow-up needs.
                </p>
              </aside>
            </div>
          </section>

          <section className="border-t border-[#E5DDC8] py-12 sm:py-16">
            <div className="max-w-3xl">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#7B6A3A]">
                Complete checklist
              </p>

              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
                Twelve planning categories
              </h2>

              <p className="mt-5 leading-8 text-[#5F584D]">
                Adapt the checklist to the treatment type, destination, clinic,
                medical history, donor pathway, travel distance, and legal
                circumstances.
              </p>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {checklistSections.map((section) => (
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

                  <ul className="mt-6 space-y-2 border-t border-[#E5DDC8] pt-5 text-sm leading-6 text-[#625A4C]">
                    {section.items.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#B89B5E]"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
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
                A five-step travel-planning method
              </h2>
            </div>

            <ol className="mt-10 grid gap-5">
              {planningSteps.map((step, index) => (
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
                Travel-planning gaps that require attention
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
                  Final departure check
                </p>

                <h2 className="mt-4 text-3xl font-semibold">
                  Reconfirm before leaving
                </h2>

                <p className="mt-5 leading-8 text-[#5F584D]">
                  Complete a final review shortly before departure because
                  appointment times, medication instructions, travel rules, and
                  clinic requirements may change.
                </p>
              </div>

              <ul className="grid gap-3 rounded-2xl border border-[#E5DDC8] bg-white/60 p-6 sm:grid-cols-2 sm:p-8">
                {finalCheck.map((item) => (
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
                Continue your planning
              </h2>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Hidden Treatment Costs",
                  description:
                    "Include travel, accommodation, delays, and contingency costs.",
                  href: "/hidden-costs-of-fertility-treatment-abroad",
                },
                {
                  title: "Choose a Fertility Clinic",
                  description:
                    "Evaluate clinic coordination and continuity of care.",
                  href: "/how-to-choose-a-fertility-clinic-abroad",
                },
                {
                  title: "Questions for the Clinic",
                  description:
                    "Confirm travel, monitoring, emergency, and follow-up details.",
                  href: "/questions-to-ask-a-fertility-clinic",
                },
                {
                  title: "Compare Jurisdictions",
                  description:
                    "Assess travel and execution factors across destinations.",
                  href: "/how-to-compare-fertility-jurisdictions",
                },
                {
                  title: "Country Intelligence",
                  description:
                    "Review destination-specific planning considerations.",
                  href: "/countries",
                },
                {
                  title: "Private Advisory",
                  description:
                    "Review structured cross-border planning support.",
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
                Turn your treatment plan into an executable travel plan
              </h2>

              <p className="mx-auto mt-5 max-w-2xl leading-8 text-[#D4D0C8]">
                FertilityCareHub helps structure international treatment around
                records, medication, monitoring, travel, complete costs,
                documentation, emergency planning, and continuity of care.
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
                  Last reviewed: July 15, 2026. Travel, entry, insurance,
                  medication, airline, clinic, and health requirements can
                  change. Confirm current requirements directly before travel.
                </p>
              </div>

              <div>
                <h2 className="font-semibold text-[#2A2824]">
                  Important limitation
                </h2>

                <p className="mt-3">
                  FertilityCareHub does not provide medical clearance, emergency
                  care, legal advice, insurance advice, or guaranteed outcomes.
                  Confirm medical and travel decisions with appropriately
                  qualified professionals.
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
