import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Strategic Alignment Snapshot™️ | FertilityCareHub",
  description:
    "Tier 1 Strategic Alignment Snapshot™️ under the FCH Global Fertility Intelligence Framework™️.",
  alternates: {
    canonical: "https://fertilitycarehub.com/snapshot",
  },
};

const CTA_PRIMARY =
  "inline-flex items-center justify-center rounded-full border border-[#B89B5E] px-6 py-3 text-sm tracking-wide text-[#1A1A1A] hover:bg-[#F0E7D6]";

const STRIPE_TIER1_URL = "https://buy.stripe.com/14A8wOcbw7RedIjgz94AU00";

export default function SnapshotPage() {
  return (
    <main className="min-h-screen bg-[#F5F1E8] text-[#1A1A1A]">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-medium leading-tight">
          Strategic Alignment Snapshot™️
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-[#2A2A2A]">
          The Strategic Alignment Snapshot™️ is a structured one-page evaluation
          applying the FCH Global Fertility Intelligence Framework™️ to your
          specific case profile. It identifies regulatory fit, governance risk,
          infrastructure alignment, and execution considerations across priority
          jurisdictions.
        </p>

        <section className="mt-12">
          <h2 className="text-2xl font-medium">What This Includes</h2>
          <ul className="mt-4 space-y-3 text-[#6A6256]">
            <li>• Top-line structural alignment scoring</li>
            <li>• Key regulatory and donor governance risks</li>
            <li>• 2–3 highlighted jurisdictions with summary rationale</li>
            <li>• Execution complexity indicators</li>
          </ul>
        </section>

        <section className="mt-12 border-t border-[#E5DDC8] pt-10">
          <h2 className="text-2xl font-medium">Delivery Format</h2>
          <p className="mt-4 text-[#6A6256] leading-relaxed">
            Delivered as a structured PDF brief with optional 30-minute review
            call to discuss findings and next steps.
          </p>
        </section>

        {/* CTA */}
        <section className="mt-14 text-center">
          <a
            href={STRIPE_TIER1_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={CTA_PRIMARY}
          >
            Engage Strategic Alignment Snapshot™️ — US$500
          </a>

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