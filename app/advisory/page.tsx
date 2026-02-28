import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Private Advisory — Strategy Session & Premium Package | FertilityCareHub",
  description:
    "Private cross-border fertility strategy advisory. Book a US$500 Strategy Session or engage a US$2,500 Premium Advisory Package.",
  alternates: {
    canonical: "https://fertilitycarehub.com/advisory",
  },
  openGraph: {
    title: "Private Advisory — Strategy Session & Premium Package",
    description:
      "Private cross-border fertility strategy advisory. Book a US$500 Strategy Session or engage a US$2,500 Premium Advisory Package.",
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
      <div className="max-w-6xl mx-auto px-6 pt-10">
        <Link
          href="/"
          className="text-sm tracking-wide text-[#6A6256] hover:text-[#1A1A1A]"
        >
          ← Back to home
        </Link>
      </div>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-12 pb-10 text-center">
        <div className="text-xs tracking-[0.28em] text-[#6A6256]">
          PRIVATE STRATEGY ADVISORY
        </div>

        <h1 className="mt-5 text-4xl md:text-6xl leading-tight font-medium">
          Choose the right jurisdiction — with clarity and discretion.
        </h1>

        <p className="mt-6 max-w-3xl mx-auto text-lg leading-relaxed text-[#2A2A2A]">
          FertilityCareHub is a cross-border fertility strategy advisory — not a
          clinic and not a broker. We help you reduce wasted time, travel, and
          financial leakage by mapping the right country pathway, the right
          decision checkpoints, and the execution risks to avoid.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/consultation"
            className="inline-flex items-center justify-center rounded-full border border-[#B89B5E] px-6 py-3 text-sm tracking-wide text-[#1A1A1A] hover:bg-[#F0E7D6]"
          >
            Request Intake (Phase 1)
          </Link>

          <Link
            href="/countries"
            className="inline-flex items-center justify-center rounded-full border border-[#E5DDC8] px-6 py-3 text-sm tracking-wide text-[#1A1A1A] hover:bg-white/40"
          >
            Explore Country Dossiers
          </Link>
        </div>

        <div className="mt-3 text-xs tracking-wide text-[#6A6256]">
          Advisory only. No medical diagnosis, no guarantees, no clinic sales.
        </div>
      </section>

      {/* Offers */}
      <section className="max-w-6xl mx-auto px-6 pb-14">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Tier 1 */}
          <div className="rounded-2xl border border-[#E5DDC8] bg-[#FAF7F1] p-8">
            <div className="text-xs tracking-[0.25em] text-[#6A6256]">TIER 1</div>

            <h2 className="mt-3 text-2xl font-medium">US$500 Strategy Session</h2>

            <p className="mt-4 text-[15px] leading-relaxed text-[#2A2A2A]">
              A focused 60–90 minute advisory session to establish your
              jurisdiction fit and decision logic.
            </p>

            <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-[#2A2A2A] list-disc pl-5">
              <li>Jurisdiction assessment and shortlist logic</li>
              <li>Eligibility and regulatory friction flags</li>
              <li>Donor pathway and governance posture fit</li>
              <li>Timeline realism and key execution checkpoints</li>
              <li>Next actions: what to do this week vs later</li>
            </ul>

            {/* Button order: Intake -> Pay -> Secondary */}
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/consultation"
                className="inline-flex items-center justify-center rounded-full border border-[#B89B5E] px-6 py-3 text-sm tracking-wide text-[#1A1A1A] hover:bg-[#F0E7D6]"
              >
                Start Intake (Phase 1)
              </Link>

              <a
                href={STRIPE_TIER1_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-[#B89B5E] px-6 py-3 text-sm tracking-wide text-[#1A1A1A] hover:bg-[#F0E7D6]"
              >
                Pay US$500 — Strategy Session
              </a>
              <p className="mt-3 text-xs text-[#6A6256]">
  Secure checkout via Stripe. After payment, you’ll be redirected to next steps.
</p>
<p className="mt-3 text-xs text-[#6A6256]">
  Secure checkout via Stripe. After payment, you’ll be redirected to next steps.
</p>
              <Link
                href="/how-to-compare-fertility-jurisdictions"
                className="inline-flex items-center justify-center rounded-full border border-[#E5DDC8] px-6 py-3 text-sm tracking-wide text-[#1A1A1A] hover:bg-white/40"
              >
                Read the Comparison Guide
              </Link>
            </div>

            <p className="mt-4 text-xs text-[#6A6256] leading-relaxed">
              Note: This is advisory planning support. It does not replace
              licensed medical or legal professionals.
            </p>
          </div>

          {/* Tier 2 */}
          <div className="rounded-2xl border border-[#E5DDC8] bg-[#FAF7F1] p-8">
            <div className="text-xs tracking-[0.25em] text-[#6A6256]">TIER 2</div>

            <h2 className="mt-3 text-2xl font-medium">
              US$2,500 Premium Advisory Package
            </h2>

            <p className="mt-4 text-[15px] leading-relaxed text-[#2A2A2A]">
              A deeper engagement for clients who want a structured, end-to-end
              jurisdiction plan and risk brief.
            </p>

            <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-[#2A2A2A] list-disc pl-5">
              <li>
                Country comparative assessment (focused set, not “every country”)
              </li>
              <li>
                Risk briefing: governance, donor pathway, eligibility friction,
                execution constraints
              </li>
              <li>Clinic model selection logic (curated shortlist principles)</li>
              <li>Logistics planning structure and decision checkpoints</li>
              <li>Document + timeline readiness checklist</li>
            </ul>

            {/* Button order: Intake -> Pay -> Secondary */}
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/consultation"
                className="inline-flex items-center justify-center rounded-full border border-[#B89B5E] px-6 py-3 text-sm tracking-wide text-[#1A1A1A] hover:bg-[#F0E7D6]"
              >
                Start Intake (Phase 1)
              </Link>

              <a
                href={STRIPE_TIER2_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-[#B89B5E] px-6 py-3 text-sm tracking-wide text-[#1A1A1A] hover:bg-[#F0E7D6]"
              >
                Pay US$2,500 — Premium Package
              </a>
              <p className="mt-3 text-xs text-[#6A6256]">
  Secure checkout via Stripe. After payment, you’ll be redirected to next steps.
</p>
              <p className="mt-3 text-xs text-[#6A6256]">
  Secure checkout via Stripe. After payment, you’ll be redirected to next steps.
</p>
              <Link
                href="/countries/spain"
                className="inline-flex items-center justify-center rounded-full border border-[#E5DDC8] px-6 py-3 text-sm tracking-wide text-[#1A1A1A] hover:bg-white/40"
              >
                View Example Dossier (Spain)
              </Link>
            </div>

            <p className="mt-4 text-xs text-[#6A6256] leading-relaxed">
              No outcome guarantees. We provide structured planning, not medical
              treatment.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ (short, offer-specific) */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-8">
          <h2 className="text-2xl font-medium">Offer FAQ</h2>

          <div className="mt-6 space-y-4">
            <details className="rounded-xl border border-[#E5DDC8] bg-white/60 p-5">
              <summary className="cursor-pointer text-lg font-medium">
                Is this medical advice?
              </summary>
              <p className="mt-3 text-sm text-[#6A6256] leading-relaxed">
                No. We provide strategic planning and jurisdiction clarity.
                Medical decisions should be made with licensed clinicians.
              </p>
            </details>

            <details className="rounded-xl border border-[#E5DDC8] bg-white/60 p-5">
              <summary className="cursor-pointer text-lg font-medium">
                What’s the difference between Tier 1 and Tier 2?
              </summary>
              <p className="mt-3 text-sm text-[#6A6256] leading-relaxed">
                Tier 1 is a focused strategy session to establish fit and
                direction. Tier 2 is a deeper engagement that structures the
                plan, risks, checkpoints, and readiness.
              </p>
            </details>

            <details className="rounded-xl border border-[#E5DDC8] bg-white/60 p-5">
              <summary className="cursor-pointer text-lg font-medium">
                How do I start?
              </summary>
              <p className="mt-3 text-sm text-[#6A6256] leading-relaxed">
                If you’re ready to proceed, you can pay directly above (Tier 1
                or Tier 2). If you have questions or want us to route you to the
                best tier, start with the intake form.
              </p>
            </details>
          </div>
        </div>
      </section>
    </main>
  );
}