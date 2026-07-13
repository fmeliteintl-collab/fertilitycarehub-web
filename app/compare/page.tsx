import type { Metadata } from "next";
import Link from "next/link";

const baseUrl = "https://fertilitycarehub.com";
const pageUrl = `${baseUrl}/compare`;

export const metadata: Metadata = {
  title: "Fertility Jurisdiction Comparisons",
  description:
    "Compare international fertility jurisdictions across regulation, eligibility, donor pathways, clinical infrastructure, costs, logistics, documentation, and execution risk.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Fertility Jurisdiction Comparisons | FertilityCareHub",
    description:
      "Structured country-to-country fertility comparisons across regulatory alignment, donor governance, clinical infrastructure, logistics, and execution risk.",
    url: pageUrl,
    siteName: "FertilityCareHub",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fertility Jurisdiction Comparisons | FertilityCareHub",
    description:
      "Structured country-to-country fertility comparisons for cross-border treatment planning.",
  },
};

const comparisons = [
  {
    title: "Spain vs Greece IVF Regulations",
    href: "/compare/spain-vs-greece-ivf-regulations",
    description:
      "Compare regulatory alignment, donor governance, clinical infrastructure, access, and execution complexity.",
  },
  {
    title: "Spain vs Portugal IVF Regulations",
    href: "/compare/spain-vs-portugal-ivf-regulations",
    description:
      "Review differences in donor frameworks, governance posture, treatment access, and operational planning.",
  },
  {
    title: "Spain vs Italy IVF Regulations",
    href: "/compare/spain-vs-italy-ivf-regulations",
    description:
      "Compare donor legality, regulatory stability, access conditions, and procedural alignment.",
  },
  {
    title: "Spain vs Czech Republic IVF Regulations",
    href: "/compare/spain-vs-czech-republic-ivf-regulations",
    description:
      "Evaluate governance, donor pathways, clinical infrastructure, cost context, and execution considerations.",
  },
  {
    title: "Spain vs North Cyprus IVF Regulations",
    href: "/compare/spain-vs-north-cyprus-ivf-regulations",
    description:
      "Compare regulatory predictability, donor governance, institutional oversight, and operational risk.",
  },
];

const comparisonFactors = [
  "Regulatory alignment",
  "Patient eligibility",
  "Donor pathway structure",
  "Clinical infrastructure",
  "Cost transparency",
  "Travel and coordination",
  "Documentation requirements",
  "Execution complexity",
];

const collectionPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Fertility Jurisdiction Comparisons",
  description:
    "Structured country-to-country fertility comparisons covering regulation, eligibility, donor pathways, clinical infrastructure, costs, logistics, documentation, and execution risk.",
  url: pageUrl,
  isPartOf: {
    "@type": "WebSite",
    name: "FertilityCareHub",
    url: baseUrl,
  },
  hasPart: comparisons.map((comparison) => ({
    "@type": "WebPage",
    name: comparison.title,
    description: comparison.description,
    url: `${baseUrl}${comparison.href}`,
  })),
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
      name: "Compare",
      item: pageUrl,
    },
  ],
};

export default function CompareIndexPage() {
  return (
    <main className="min-h-screen bg-[#F5F1E8] text-[#1A1A1A]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionPageSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-6 sm:py-14 lg:px-8">
        <nav
          aria-label="Breadcrumb"
          className="text-sm text-[#6A6256]"
        >
          <Link
            href="/"
            className="underline underline-offset-4"
          >
            Home
          </Link>

          <span className="mx-2" aria-hidden="true">
            /
          </span>

          <span>Compare</span>
        </nav>

        <section className="border-b border-[#E5DDC8] pb-12 pt-10 text-center sm:pb-16 sm:pt-14">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-[#7B6A3A]">
            FertilityCareHub Comparison Library
          </p>

          <h1 className="mx-auto max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.03em] sm:text-5xl lg:text-6xl">
            Fertility Jurisdiction Comparison Briefs
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-[#5F584D] sm:text-lg">
            Compare international fertility jurisdictions across regulation,
            eligibility, donor pathways, clinical infrastructure, costs,
            logistics, documentation, and execution risk.
          </p>

          <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-[#6A6256]">
            These comparisons are designed to support structured decision-making
            rather than rank countries or promote specific clinics.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/how-to-compare-fertility-jurisdictions"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#1A1A1A] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#343434]"
            >
              Read the comparison framework
            </Link>

            <Link
              href="/countries"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#B89B5E] px-6 py-3 text-sm font-medium text-[#6F5E31] transition hover:bg-[#EEE5D2]"
            >
              Explore country dossiers
            </Link>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-6 sm:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#7B6A3A]">
                Comparison methodology
              </p>

              <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">
                Compare jurisdictions using consistent decision factors
              </h2>

              <p className="mt-5 leading-8 text-[#5F584D]">
                FertilityCareHub comparisons are structured around the factors
                that most often determine whether a jurisdiction is suitable for
                a particular pathway. Final suitability depends on individual
                medical, legal, financial, ethical, and logistical circumstances.
              </p>

              <Link
                href="/guides"
                className="mt-6 inline-block font-medium text-[#715F33] underline underline-offset-4"
              >
                Browse the full Guides Library →
              </Link>
            </div>

            <aside className="rounded-2xl border border-[#D8C89F] bg-[#EEE5D2] p-6 sm:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#7B6A3A]">
                Core comparison factors
              </p>

              <ul className="mt-5 grid gap-3 text-sm leading-6 text-[#5F584D] sm:grid-cols-2 lg:grid-cols-1">
                {comparisonFactors.map((factor) => (
                  <li key={factor} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#B89B5E]"
                    />
                    <span>{factor}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        <section className="border-t border-[#E5DDC8] py-12 sm:py-16">
          <div className="max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#7B6A3A]">
              Published comparisons
            </p>

            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              Explore country-to-country fertility comparisons
            </h2>

            <p className="mt-5 leading-8 text-[#5F584D]">
              Use these briefs to identify major structural differences before
              conducting clinic-level research or requesting personalized
              strategic support.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {comparisons.map((comparison) => (
              <Link
                key={comparison.href}
                href={comparison.href}
                className="group rounded-2xl border border-[#E5DDC8] bg-white/60 p-6 transition hover:border-[#B89B5E] hover:bg-white"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-medium uppercase tracking-[0.14em] text-[#7B6A3A]">
                      Published comparison
                    </div>

                    <h3 className="mt-3 text-xl font-semibold leading-7">
                      {comparison.title}
                    </h3>
                  </div>

                  <span
                    aria-hidden="true"
                    className="text-xl text-[#8C7541] transition group-hover:translate-x-1"
                  >
                    →
                  </span>
                </div>

                <p className="mt-4 text-sm leading-7 text-[#625A4C]">
                  {comparison.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="border-t border-[#E5DDC8] py-12 sm:py-16">
          <div className="grid gap-5 md:grid-cols-3">
            <Link
              href="/how-to-compare-fertility-jurisdictions"
              className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-6 transition hover:border-[#B89B5E] hover:bg-white"
            >
              <div className="text-xs font-medium uppercase tracking-[0.14em] text-[#7B6A3A]">
                Planning framework
              </div>

              <h3 className="mt-3 text-xl font-semibold">
                How to Compare Fertility Jurisdictions
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#625A4C]">
                Learn the ten factors and five-step method used to structure
                country comparisons.
              </p>
            </Link>

            <Link
              href="/countries"
              className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-6 transition hover:border-[#B89B5E] hover:bg-white"
            >
              <div className="text-xs font-medium uppercase tracking-[0.14em] text-[#7B6A3A]">
                Country intelligence
              </div>

              <h3 className="mt-3 text-xl font-semibold">
                Explore Jurisdiction Dossiers
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#625A4C]">
                Review country-level information before narrowing your shortlist.
              </p>
            </Link>

            <Link
              href="/guides"
              className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-6 transition hover:border-[#B89B5E] hover:bg-white"
            >
              <div className="text-xs font-medium uppercase tracking-[0.14em] text-[#7B6A3A]">
                Knowledge library
              </div>

              <h3 className="mt-3 text-xl font-semibold">
                Browse Fertility Guides
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#625A4C]">
                Explore structured resources covering clinics, costs, success
                rates, donor pathways, and travel planning.
              </p>
            </Link>
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
              your treatment pathway, legal constraints, donor requirements,
              timeline, cost exposure, and execution risks.
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
            FertilityCareHub comparisons provide general strategic and
            educational information. They do not constitute medical, legal, or
            financial advice. Regulations, eligibility, clinic policies, costs,
            and treatment availability may change and should be independently
            confirmed.
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