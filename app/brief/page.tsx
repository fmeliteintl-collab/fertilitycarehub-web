import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Global Fertility Intelligence Brief™️ | FertilityCareHub",
  description:
    "Tier 2 Global Fertility Intelligence Brief™️ under the FCH Global Fertility Intelligence Framework™️.",
  alternates: {
    canonical: "https://fertilitycarehub.com/brief",
  },
};

const CTA_PRIMARY =
  "inline-flex items-center justify-center rounded-full border border-[#B89B5E] px-6 py-3 text-sm tracking-wide text-[#1A1A1A] hover:bg-[#F0E7D6]";

const CTA_SECONDARY =
  "inline-flex items-center justify-center rounded-full border border-[#E5DDC8] px-6 py-3 text-sm tracking-wide text-[#1A1A1A] hover:bg-[#EFE9DB]";

const STRIPE_TIER2_URL = "https://buy.stripe.com/aFa8wO5N8gnK8nZ0Ab4AU01";

const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the Global Fertility Intelligence Brief™️?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "The Global Fertility Intelligence Brief™️ is a Tier 2 institutional advisory deliverable applying the FCH Global Fertility Intelligence Framework™️ to your case profile, including comparative analysis, risk mapping, and an execution roadmap.",
      },
    },
    {
      "@type": "Question",
      name: "What is included in Tier 2?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Tier 2 includes jurisdiction elimination logic, pillar-based comparative analysis across shortlisted options, structural risk mapping with mitigation pathways, and a readiness-focused execution roadmap.",
      },
    },
    {
      "@type": "Question",
      name: "Should I start with Tier 1 or Tier 2?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "If you are uncertain about jurisdiction fit, start with Tier 1. If your case is complex, time-sensitive, multi-jurisdiction, or requires a documented roadmap, Tier 2 is typically more appropriate.",
      },
    },
    {
      "@type": "Question",
      name: "Does FertilityCareHub provide medical or legal advice?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "No. FertilityCareHub provides structured strategic analysis only and does not replace licensed medical or legal professionals in the relevant jurisdiction.",
      },
    },
  ],
} as const;

export default function BriefPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://fertilitycarehub.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Advisory",
        item: "https://fertilitycarehub.com/advisory",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Global Fertility Intelligence Brief™️",
        item: "https://fertilitycarehub.com/brief",
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#F5F1E8] text-[#1A1A1A]">
      {/* JSON-LD: Breadcrumbs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* JSON-LD: FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Breadcrumb UI */}
        <nav className="text-sm text-[#6A6256] mb-6" aria-label="Breadcrumb">
          <Link href="/" className="underline textUnderlineOffset-4">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/advisory" className="underline textUnderlineOffset-4">
            Advisory
          </Link>
          <span className="mx-2">/</span>
          <span aria-current="page">Global Brief</span>
        </nav>

        <h1 className="text-4xl font-medium leading-tight">
          Global Fertility Intelligence Brief™️
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-[#2A2A2A]">
          The Global Fertility Intelligence Brief™️ is a Tier 2 institutional
          advisory deliverable applying the FCH Global Fertility Intelligence
          Framework™️ to your case profile. It includes jurisdiction elimination
          logic, pillar-based comparative analysis, structural risk mapping, and
          an execution roadmap designed for real-world implementation.
        </p>

        <section className="mt-12">
          <h2 className="text-2xl font-medium">What This Includes</h2>
          <ul className="mt-4 space-y-3 text-[#6A6256]">
            <li>• Case variable profile &amp; pathway classification</li>
            <li>• Jurisdiction elimination summary (defensible rationale)</li>
            <li>• Pillar-based comparative analysis across shortlisted options</li>
            <li>• Structural risk brief with mitigation pathways</li>
            <li>• Execution roadmap + readiness checklist</li>
          </ul>
        </section>

        <section className="mt-12 border-t border-[#E5DDC8] pt-10">
          <h2 className="text-2xl font-medium">Delivery Format</h2>
          <p className="mt-4 text-[#6A6256] leading-relaxed">
            Delivered as a structured PDF brief. Designed for complex donor
            structures, multi-jurisdiction constraints, regulatory sensitivity,
            or cases requiring a documented execution roadmap.
          </p>
        </section>

        <p className="mt-4 text-sm text-[#6A6256] leading-relaxed">
          This engagement provides structured strategic analysis only. Medical,
          clinical, and legal decisions must be made with appropriately licensed
          professionals in the relevant jurisdiction.
        </p>

        {/* CTA */}
        <section className="mt-14 text-center">
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={STRIPE_TIER2_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={CTA_PRIMARY}
            >
              Engage Global Fertility Intelligence Brief™️ — US$2,500
            </a>

            <Link href="/snapshot" className={CTA_SECONDARY}>
              Prefer to start with Snapshot (Tier 1)
            </Link>
          </div>

          <div className="mt-6">
            <Link
              href="/advisory"
              className="text-sm underline textUnderlineOffset-4 text-[#6A6256]"
            >
              Return to Advisory Overview
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}