import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Private Advisory — Institutional Cross-Border Fertility Strategy | FertilityCareHub",
  description:
    "Institutional cross-border fertility strategy advisory. Engage the Strategic Alignment Snapshot™️ (US$500) or the Global Fertility Intelligence Brief™️ (US$2,500).",
  alternates: {
    canonical: "https://fertilitycarehub.com/advisory",
  },
  openGraph: {
    title: "Private Advisory — Institutional Cross-Border Fertility Strategy",
    description:
      "Institutional cross-border fertility strategy advisory using the FCH Global Fertility Intelligence Framework™️.",
    url: "https://fertilitycarehub.com/advisory",
    siteName: "FertilityCareHub",
    type: "website",
  },
};

const STRIPE_TIER1_URL = "https://buy.stripe.com/14A8wOcbw7RedIjgz94AU00";
const STRIPE_TIER2_URL = "https://buy.stripe.com/aFa8wO5N8gnK8nZ0Ab4AU01";

export default function AdvisoryPage() {
  return (
    <main className="min-h-screen bg-[#F5F1E8] text-[#1A1A1A]">
      {/* Back */}
      <div className="max-w-6xl mx-auto px-6 pt-10">
        <Link
          href="/"
          className="text-sm tracking-wide text-[#6A6256] hover:text-[#1A1A1A]"
        >
          ← Back to home
        </Link>
      </div>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-12 pb-12 text-center">
        <div className="text-xs tracking-[0.28em] text-[#6A6256]">
          INSTITUTIONAL ADVISORY
        </div>

        <h1 className="mt-5 text-4xl md:text-6xl leading-tight font-medium">
          Structured Cross-Border Fertility Strategy
        </h1>

        {/* ✅ Replaced paragraph */}
        <p className="mt-6 max-w-3xl mx-auto text-lg leading-relaxed text-[#2A2A2A]">
          FertilityCareHub is an institutional, process-driven cross-border
          fertility strategy advisory — not a clinic and not a broker. Our work
          is delivered through the{" "}
          <strong>FCH Global Fertility Intelligence Framework™</strong>, a
          structured model that evaluates jurisdictions across regulatory
          alignment, donor pathway constraints, clinical infrastructure, and
          execution risk — so clients can make high-stakes decisions with
          clarity and discretion.
        </p>
      </section>

      {/* Framework Section */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="rounded-2xl border border-[#E5DDC8] bg-white/70 p-8">
          <h2 className="text-2xl font-medium">
            The FCH Global Fertility Intelligence Framework™️
          </h2>

          <div className="mt-6 grid md:grid-cols-2 gap-6 text-sm leading-relaxed text-[#2A2A2A]">
            <div>
              <strong>1. Regulatory Alignment</strong>
              <p className="mt-2 text-[#6A6256]">
                Legal eligibility, donor governance, storage law, and
                citizenship implications.
              </p>
            </div>

            <div>
              <strong>2. Clinical Infrastructure Depth</strong>
              <p className="mt-2 text-[#6A6256]">
                Laboratory standards, transparency posture, and embryology
                environment.
              </p>
            </div>

            <div>
              <strong>3. Governance &amp; Donor Policy Structure</strong>
              <p className="mt-2 text-[#6A6256]">
                Anonymity rules, disclosure requirements, and long-term
                compliance risk.
              </p>
            </div>

            <div>
              <strong>4. Execution Complexity Mapping</strong>
              <p className="mt-2 text-[#6A6256]">
                Travel coordination, documentation friction, and timeline
                realism.
              </p>
            </div>
          </div>

          <p className="mt-6 text-sm text-[#6A6256]">
            Internally, jurisdictions are evaluated using weighted scoring logic.
            Clients receive clear qualitative risk bands for strategic clarity.
          </p>
        </div>
      </section>

      {/* Tiers */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Tier 1 */}
          <div className="rounded-2xl border border-[#E5DDC8] bg-[#FAF7F1] p-8">
            <div className="text-xs tracking-[0.25em] text-[#6A6256]">
              TIER 1
            </div>
            <h2 className="mt-3 text-2xl font-medium">
              Strategic Alignment Snapshot™️ — US$500
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-[#2A2A2A]">
  A structured diagnostic application of the FCH Framework designed to establish
  jurisdiction fit and identify primary regulatory and execution risks across
  2–3 viable pathways.
</p>

<ul className="mt-5 space-y-2 text-sm text-[#6A6256] list-disc pl-5">
  <li>Case variable profile & constraint mapping</li>
  <li>Shortlist identification (2–3 structurally viable jurisdictions)</li>
  <li>Pillar-level qualitative risk bands</li>
  <li>Primary regulatory friction flags</li>
  <li>Strategic direction with rationale</li>
</ul>

<p className="mt-4 text-xs text-[#6A6256] leading-relaxed">
  This engagement provides directional clarity. It does not include full
  comparative modeling, weighted scoring matrices, or execution roadmap design.
</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={STRIPE_TIER1_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-[#B89B5E] px-6 py-3 text-sm tracking-wide text-[#1A1A1A] hover:bg-[#F0E7D6]"
              >
                Engage Tier 1
              </a>
            </div>
          </div>

          {/* Tier 2 */}
          <div className="rounded-2xl border border-[#E5DDC8] bg-[#FAF7F1] p-8">
            <div className="text-xs tracking-[0.25em] text-[#6A6256]">
              TIER 2
            </div>
            <h2 className="mt-3 text-2xl font-medium">
              Global Fertility Intelligence Brief™️ — US$2,500
            </h2>

           <p className="mt-4 text-sm leading-relaxed text-[#2A2A2A]">
  A full institutional application of the FCH Global Fertility Intelligence Framework™,
  incorporating jurisdiction elimination logic, pillar-based comparative analysis,
  structural risk mapping, and a formal execution roadmap tailored to your
  pathway complexity.
</p>

            <ul className="mt-5 space-y-2 text-sm text-[#6A6256] list-disc pl-5">
              <li>Jurisdiction shortlist rationale</li>
              <li>Pillar-based deep comparative analysis</li>
              <li>Weighted scoring matrix (internally applied)</li>
              <li>Regulatory risk briefing</li>
              <li>Conditional scenario modeling</li>
              <li>Execution roadmap &amp; readiness checklist</li>
            </ul>
           <p className="mt-6 text-xs leading-relaxed text-[#6A6256]">
  Appropriate for complex donor structures, multi-jurisdiction requirements,
  regulatory sensitivity, or cases requiring a documented execution roadmap.
</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={STRIPE_TIER2_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-[#B89B5E] px-6 py-3 text-sm tracking-wide text-[#1A1A1A] hover:bg-[#F0E7D6]"
              >
                Engage Tier 2
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Capacity */}
      <section className="max-w-6xl mx-auto px-6 pb-20 text-center">
        <div className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-8">
          <h2 className="text-2xl font-medium">Advisory Capacity</h2>
          <p className="mt-4 text-sm text-[#6A6256] leading-relaxed max-w-3xl mx-auto">
            To preserve analytical rigor, advisory engagements are accepted in
            controlled intake cycles. Each case undergoes structured framework
            application and internal review. If your timeline is compressed,
            begin with the Strategic Alignment Snapshot™️.
          </p>
        </div>
      </section>
      <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Is FertilityCareHub a clinic or broker?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "No. FertilityCareHub is an independent cross-border fertility strategy advisory platform. We do not sell clinics, provide medical treatment, or receive referral commissions.",
          },
        },
        {
          "@type": "Question",
          name: "What is included in the Strategic Alignment Snapshot™?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "The Strategic Alignment Snapshot™ is a structured diagnostic engagement applying the FCH Global Fertility Intelligence Framework™ to identify viable jurisdictions, primary regulatory risks, and directional strategy.",
          },
        },
        {
          "@type": "Question",
          name: "What is the difference between Tier 1 and Tier 2?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Tier 1 provides directional clarity across shortlisted jurisdictions. Tier 2 applies the full framework with adaptive comparative modeling, deeper regulatory analysis, and structured execution roadmap design.",
          },
        },
        {
          "@type": "Question",
          name: "Does FertilityCareHub guarantee fertility outcomes?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "No. FertilityCareHub provides structured strategic planning support and jurisdictional clarity. Medical outcomes depend on licensed clinical providers and individual medical factors.",
          },
        },
      ],
    }),
  }}
/>
    </main>
  );
}