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

export default function BriefPage() {
  return (
    <main className="min-h-screen bg-[#F5F1E8] text-[#1A1A1A]">
      <div className="max-w-4xl mx-auto px-6 py-16">
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
            <li>• Case variable profile & pathway classification</li>
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

        <section className="mt-16 text-center">
          <Link
            href="/advisory"
            className="underline textUnderlineOffset-4 text-sm text-[#6A6256]"
          >
            Return to Advisory Overview
          </Link>
        </section>
      </div>
    </main>
  );
}