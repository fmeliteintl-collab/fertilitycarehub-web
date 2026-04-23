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

const CTA_PRIMARY =
  "inline-flex items-center justify-center rounded-full border border-[#B89B5E] px-6 py-3 text-sm tracking-wide text-[#1A1A1A] transition hover:bg-[#F0E7D6]";

const CTA_SECONDARY =
  "inline-flex items-center justify-center rounded-full border border-[#E5DDC8] px-6 py-3 text-sm tracking-wide text-[#1A1A1A] transition hover:bg-[#EFE9DB]";

const STRIPE_TIER1_URL = "https://buy.stripe.com/14A8wOcbw7RedIjgz94AU00";
const STRIPE_TIER2_URL = "https://buy.stripe.com/aFa8wO5N8gnK8nZ0Ab4AU01";

export default function AdvisoryPage() {
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
    ],
  };

  const faqJsonLd = {
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
        name: "What is included in the Strategic Alignment Snapshot™️?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "The Strategic Alignment Snapshot™️ is a structured diagnostic engagement applying the FCH Global Fertility Intelligence Framework™️ to identify viable jurisdictions, primary regulatory risks, and directional strategy.",
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
        name: "Does private client portal access come with an advisory engagement?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Yes. Approved advisory engagements include access to a private planning workspace as part of structured onboarding. FertilityCareHub is not an open public sign-up platform.",
        },
      },
      {
        "@type": "Question",
        name: "Do I create a public account immediately after payment?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "No. FertilityCareHub follows a selective onboarding model. After payment or engagement confirmation, your case enters onboarding review and private portal access is issued directly as part of approved engagement setup.",
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
  };

  return (
    <main className="min-h-screen bg-[#F5F1E8] text-[#1A1A1A]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="mx-auto max-w-6xl px-6 pt-10">
        <nav className="mb-4 text-sm text-[#6A6256]" aria-label="Breadcrumb">
          <Link href="/" className="underline underline-offset-4">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span aria-current="page">Advisory</span>
        </nav>

        <Link
          href="/"
          className="text-sm tracking-wide text-[#6A6256] transition hover:text-[#1A1A1A]"
        >
          ← Back to home
        </Link>
      </div>

      <section className="mx-auto max-w-6xl px-6 pb-12 pt-12 text-center">
        <div className="text-xs tracking-[0.28em] text-[#6A6256]">
          INSTITUTIONAL ADVISORY
        </div>

        <h1 className="mt-5 text-4xl font-medium leading-tight md:text-6xl">
          Structured Cross-Border Fertility Strategy
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-[#2A2A2A]">
          FertilityCareHub is an institutional, process-driven cross-border
          fertility strategy advisory — not a clinic and not a broker. Our work
          is delivered through the{" "}
          <strong>FCH Global Fertility Intelligence Framework™️</strong>, a
          structured model that evaluates jurisdictions across regulatory
          alignment, donor pathway constraints, clinical infrastructure, and
          execution risk so clients can make high-stakes decisions with greater
          clarity, structure, and discretion.
        </p>

        <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[#6A6256]">
          Designed for intended parents facing complex jurisdiction decisions,
          donor pathway constraints, legal uncertainty, or time-sensitive
          planning across borders.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href={STRIPE_TIER1_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={CTA_PRIMARY}
          >
            Engage Tier 1
          </a>

          <a
            href={STRIPE_TIER2_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={CTA_PRIMARY}
          >
            Engage Tier 2
          </a>

          <Link href="/consultation#request" className={CTA_SECONDARY}>
            Request Advisory Consultation
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-12">
        <div className="rounded-2xl border border-[#DCCFB3] bg-[#FFF8EC] p-8">
          <div className="max-w-4xl">
            <div className="text-xs tracking-[0.24em] text-[#8A7652]">
              CLIENT ACCESS MODEL
            </div>

            <h2 className="mt-3 text-2xl font-medium">
              Private portal access is included as part of approved advisory
              onboarding
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-[#5F584C]">
              FertilityCareHub is not an open public sign-up platform. Advisory
              clients engage through structured purchase and onboarding, and
              private planning workspace access is then issued directly as part
              of approved client setup.
            </p>

            <p className="mt-4 text-sm leading-relaxed text-[#5F584C]">
              This means the value of your engagement includes not only
              structured strategic analysis, but also a private client-facing
              planning environment where approved clients can later sign in,
              review planning materials, and work through their advisory process
              in a more organized way.
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-[#E5DDC8] bg-white/80 p-6">
              <div className="text-xs tracking-[0.22em] text-[#6A6256]">
                INCLUDED
              </div>
              <div className="mt-2 font-medium">
                Private planning workspace access
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[#6A6256]">
                Approved advisory clients receive private portal access as part
                of structured onboarding and client activation.
              </p>
            </div>

            <div className="rounded-xl border border-[#E5DDC8] bg-white/80 p-6">
              <div className="text-xs tracking-[0.22em] text-[#6A6256]">
                IMPORTANT
              </div>
              <div className="mt-2 font-medium">
                This is not a public self-registration system
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[#6A6256]">
                Payment does not open a public account creation flow. Workspace
                access is issued selectively as part of advisory onboarding.
              </p>
            </div>

            <div className="rounded-xl border border-[#E5DDC8] bg-white/80 p-6">
              <div className="text-xs tracking-[0.22em] text-[#6A6256]">
                CLIENT LOGIN
              </div>
              <div className="mt-2 font-medium">
                Approved clients later sign in through the portal login page
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[#6A6256]">
                Once access is activated, clients use the FertilityCareHub login
                page to enter their private planning workspace.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-2xl border border-[#E5DDC8] bg-white/70 p-8">
          <h2 className="text-2xl font-medium">
            The FCH Global Fertility Intelligence Framework™️
          </h2>

          <div className="mt-6 grid gap-6 text-sm leading-relaxed text-[#2A2A2A] md:grid-cols-2">
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
            Internally, jurisdictions are evaluated using weighted scoring
            logic. Clients receive clear qualitative risk bands and strategic
            rationale for decision-making clarity.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-2xl border border-[#E5DDC8] bg-white/70 p-8">
          <h2 className="text-2xl font-medium">How the advisory process works</h2>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-[#E5DDC8] bg-[#FAF7F1] p-6">
              <div className="text-xs tracking-[0.22em] text-[#6A6256]">
                STEP 1
              </div>
              <div className="mt-2 font-medium">Submit your pathway context</div>
              <p className="mt-2 text-sm leading-relaxed text-[#6A6256]">
                Share your case variables, intended destination preferences,
                constraints, and key planning concerns through consultation or
                direct engagement.
              </p>
            </div>

            <div className="rounded-xl border border-[#E5DDC8] bg-[#FAF7F1] p-6">
              <div className="text-xs tracking-[0.22em] text-[#6A6256]">
                STEP 2
              </div>
              <div className="mt-2 font-medium">
                We apply the FCH evaluation framework
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[#6A6256]">
                Your case is reviewed through jurisdiction filters, structural
                constraints, regulatory friction points, and execution-risk
                mapping.
              </p>
            </div>

            <div className="rounded-xl border border-[#E5DDC8] bg-[#FAF7F1] p-6">
              <div className="text-xs tracking-[0.22em] text-[#6A6256]">
                STEP 3
              </div>
              <div className="mt-2 font-medium">
                You receive directional clarity or a full roadmap
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[#6A6256]">
                Depending on tier, you receive either an early strategic screen
                or a fuller comparative brief with execution guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-2xl border border-[#E5DDC8] bg-white/70 p-8">
          <h2 className="text-2xl font-medium">Select the correct engagement</h2>
          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-[#6A6256]">
            This is a structured advisory funnel. If you are still determining
            jurisdiction fit, begin with Snapshot™️. If your pathway is more
            complex, time-sensitive, or requires a documented execution roadmap,
            engage Tier 2.
          </p>

          <div className="mt-6 grid gap-6 text-sm leading-relaxed text-[#2A2A2A] md:grid-cols-3">
            <div className="rounded-xl border border-[#E5DDC8] bg-[#FAF7F1] p-6">
              <div className="text-xs tracking-[0.22em] text-[#6A6256]">
                START HERE
              </div>
              <div className="mt-2 font-medium">
                Uncertain which jurisdiction fits
              </div>
              <p className="mt-2 text-[#6A6256]">
                Identify viable jurisdictions and primary friction risks before
                deeper comparative modeling.
              </p>
            </div>

            <div className="rounded-xl border border-[#E5DDC8] bg-[#FAF7F1] p-6">
              <div className="text-xs tracking-[0.22em] text-[#6A6256]">
                COMPLEX PATHWAYS
              </div>
              <div className="mt-2 font-medium">
                Donor structures / regulatory constraints
              </div>
              <p className="mt-2 text-[#6A6256]">
                Tier 2 applies elimination logic, pillar-based comparison, risk
                mapping, and a formal roadmap.
              </p>
            </div>

            <div className="rounded-xl border border-[#E5DDC8] bg-[#FAF7F1] p-6">
              <div className="text-xs tracking-[0.22em] text-[#6A6256]">
                TIME SENSITIVE
              </div>
              <div className="mt-2 font-medium">Compressed decision timelines</div>
              <p className="mt-2 text-[#6A6256]">
                Use Snapshot™️ as a screening layer when you need directional
                clarity quickly before deeper planning.
              </p>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/snapshot" className={CTA_SECONDARY}>
              View Strategic Alignment Snapshot™️
            </Link>

            <a
              href={STRIPE_TIER1_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={CTA_PRIMARY}
            >
              Engage Tier 1
            </a>

            <Link href="/brief" className={CTA_SECONDARY}>
              View Global Fertility Intelligence Brief™️
            </Link>

            <a
              href={STRIPE_TIER2_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={CTA_PRIMARY}
            >
              Engage Tier 2
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-[#E5DDC8] bg-[#FAF7F1] p-8">
            <div className="text-xs tracking-[0.25em] text-[#6A6256]">
              TIER 1
            </div>

            <h2 className="mt-3 text-2xl font-medium">
              Strategic Alignment Snapshot™️ — US$500
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-[#2A2A2A]">
              A structured diagnostic application of the FCH Framework designed
              to establish jurisdiction fit and identify primary regulatory and
              execution risks across 2–3 viable pathways.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/snapshot" className={CTA_SECONDARY}>
                View Strategic Alignment Snapshot™️
              </Link>

              <a
                href={STRIPE_TIER1_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={CTA_PRIMARY}
              >
                Engage Tier 1
              </a>
            </div>

            <ul className="mt-6 list-disc space-y-2 pl-5 text-sm text-[#6A6256]">
              <li>Case variable profile &amp; constraint mapping</li>
              <li>
                Shortlist identification (2–3 structurally viable jurisdictions)
              </li>
              <li>Pillar-level qualitative risk bands</li>
              <li>Primary regulatory friction flags</li>
              <li>Strategic direction with rationale</li>
              <li>Structured onboarding into the advisory process</li>
              <li>Private client workspace access included upon approved setup</li>
            </ul>

            <p className="mt-6 text-xs leading-relaxed text-[#6A6256]">
              Designed for early-stage jurisdiction screening before deeper
              comparative modeling or full execution planning.
            </p>

            <p className="mt-4 text-xs leading-relaxed text-[#6A6256]">
              This engagement provides directional clarity. It does not include
              full comparative modeling, weighted scoring matrices, or execution
              roadmap design.
            </p>
          </div>

          <div className="rounded-2xl border border-[#E5DDC8] bg-[#FAF7F1] p-8">
            <div className="text-xs tracking-[0.25em] text-[#6A6256]">
              TIER 2
            </div>

            <h2 className="mt-3 text-2xl font-medium">
              Global Fertility Intelligence Brief™️ — US$2,500
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-[#2A2A2A]">
              A full institutional application of the FCH Global Fertility
              Intelligence Framework™️, incorporating jurisdiction elimination
              logic, pillar-based comparative analysis, structural risk mapping,
              and a formal execution roadmap tailored to your pathway complexity.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/brief" className={CTA_SECONDARY}>
                View Global Fertility Intelligence Brief™️
              </Link>

              <a
                href={STRIPE_TIER2_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={CTA_PRIMARY}
              >
                Engage Tier 2
              </a>
            </div>

            <ul className="mt-6 list-disc space-y-2 pl-5 text-sm text-[#6A6256]">
              <li>Jurisdiction shortlist rationale</li>
              <li>Pillar-based deep comparative analysis</li>
              <li>Weighted scoring matrix (internally applied)</li>
              <li>Regulatory risk briefing</li>
              <li>Conditional scenario modeling</li>
              <li>Execution roadmap &amp; readiness checklist</li>
              <li>Structured onboarding into the advisory process</li>
              <li>Private client workspace access included upon approved setup</li>
            </ul>

            <p className="mt-6 text-xs leading-relaxed text-[#6A6256]">
              Appropriate for complex donor structures, multi-jurisdiction
              requirements, regulatory sensitivity, or cases requiring a
              documented execution roadmap.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-8">
          <h2 className="text-2xl font-medium">
            What happens immediately after purchase
          </h2>

          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-[#6A6256]">
            Once your advisory engagement is submitted, your case moves into a
            structured onboarding and review process. This is a private,
            selective advisory model — not an open public software signup flow.
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-4">
            <div className="rounded-xl border border-[#E5DDC8] bg-[#FAF7F1] p-5">
              <div className="text-xs tracking-[0.22em] text-[#6A6256]">
                STEP 1
              </div>
              <div className="mt-2 font-medium">Your engagement is received</div>
              <p className="mt-2 text-sm leading-relaxed text-[#6A6256]">
                Your advisory purchase and engagement details are captured and
                prepared for onboarding review.
              </p>
            </div>

            <div className="rounded-xl border border-[#E5DDC8] bg-[#FAF7F1] p-5">
              <div className="text-xs tracking-[0.22em] text-[#6A6256]">
                STEP 2
              </div>
              <div className="mt-2 font-medium">Onboarding review begins</div>
              <p className="mt-2 text-sm leading-relaxed text-[#6A6256]">
                FertilityCareHub reviews your engagement context, advisory fit,
                and client setup requirements before portal activation.
              </p>
            </div>

            <div className="rounded-xl border border-[#E5DDC8] bg-[#FAF7F1] p-5">
              <div className="text-xs tracking-[0.22em] text-[#6A6256]">
                STEP 3
              </div>
              <div className="mt-2 font-medium">
                Private workspace access is issued
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[#6A6256]">
                Approved clients are issued access to a private planning
                workspace as part of the advisory engagement.
              </p>
            </div>

            <div className="rounded-xl border border-[#E5DDC8] bg-[#FAF7F1] p-5">
              <div className="text-xs tracking-[0.22em] text-[#6A6256]">
                STEP 4
              </div>
              <div className="mt-2 font-medium">
                You sign in through the client login page
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[#6A6256]">
                Once your access is active, you use the FertilityCareHub login
                page to enter your private portal workspace.
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-[#DCCFB3] bg-[#FFF8EC] p-6">
            <p className="text-sm leading-relaxed text-[#5F584C]">
              <span className="font-medium text-[#1A1A1A]">Important:</span>{" "}
              You do not need to create a public account immediately after
              payment. FertilityCareHub client workspace access is issued
              directly as part of approved advisory onboarding.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/auth/login" className={CTA_SECONDARY}>
              Client Login
            </Link>

            <Link href="/consultation#request" className={CTA_PRIMARY}>
              Request Advisory Consultation
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-8">
          <h2 className="text-2xl font-medium">What happens after engagement</h2>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div>
              <div className="text-sm font-medium">1. Intake review</div>
              <p className="mt-2 text-sm leading-relaxed text-[#6A6256]">
                We review your pathway context, priorities, and structural
                constraints before analysis begins.
              </p>
            </div>

            <div>
              <div className="text-sm font-medium">2. Strategic analysis</div>
              <p className="mt-2 text-sm leading-relaxed text-[#6A6256]">
                Your case is assessed through jurisdiction filters, risk bands,
                and cross-border execution logic.
              </p>
            </div>

            <div>
              <div className="text-sm font-medium">3. Advisory output</div>
              <p className="mt-2 text-sm leading-relaxed text-[#6A6256]">
                You receive structured clarity designed to help you move forward
                with better decision logic, not clinic sales pressure.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/consultation#request" className={CTA_PRIMARY}>
              Request Advisory Consultation
            </Link>

            <Link href="/countries" className={CTA_SECONDARY}>
              Explore Country Intelligence
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-8">
          <h2 className="text-2xl font-medium">
            What approved clients can expect from portal access
          </h2>

          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-[#6A6256]">
            Private portal access is designed to support a more structured
            client experience after advisory onboarding. It is part of the
            engagement environment — not a public product subscription.
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-[#E5DDC8] bg-[#FAF7F1] p-6">
              <div className="text-sm font-medium">Planning structure</div>
              <p className="mt-2 text-sm leading-relaxed text-[#6A6256]">
                Approved clients can work within a dedicated planning space that
                supports cross-border fertility strategy, jurisdiction review,
                execution planning, and advisory continuity.
              </p>
            </div>

            <div className="rounded-xl border border-[#E5DDC8] bg-[#FAF7F1] p-6">
              <div className="text-sm font-medium">Client-specific access</div>
              <p className="mt-2 text-sm leading-relaxed text-[#6A6256]">
                Access is issued only to approved clients whose advisory
                engagement has been reviewed and activated through FertilityCareHub.
              </p>
            </div>

            <div className="rounded-xl border border-[#E5DDC8] bg-[#FAF7F1] p-6">
              <div className="text-sm font-medium">Protected environment</div>
              <p className="mt-2 text-sm leading-relaxed text-[#6A6256]">
                Portal access is controlled separately from the public website so
                clients receive a more private and structured workspace
                experience.
              </p>
            </div>

            <div className="rounded-xl border border-[#E5DDC8] bg-[#FAF7F1] p-6">
              <div className="text-sm font-medium">Login after activation</div>
              <p className="mt-2 text-sm leading-relaxed text-[#6A6256]">
                Once access is issued, approved clients use the client login page
                to enter the workspace. Access is not available through open
                public self-registration.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20 text-center">
        <div className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-8">
          <h2 className="text-2xl font-medium">Advisory Capacity</h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-[#6A6256]">
            To preserve analytical rigor and framework integrity, advisory
            engagements are accepted in controlled intake cycles. Each case
            undergoes structured internal review before acceptance. Where
            timelines are compressed, the Strategic Alignment Snapshot™️ may be
            used as an initial screening layer.
          </p>

          <p className="mx-auto mt-4 max-w-3xl text-xs leading-relaxed text-[#6A6256]">
            FertilityCareHub does not provide medical treatment, legal advice,
            or outcome guarantees. The platform provides structured strategic
            planning support for cross-border fertility decision-making.
          </p>

          <p className="mx-auto mt-4 max-w-3xl text-xs leading-relaxed text-[#6A6256]">
            Private workspace access is issued selectively as part of approved
            advisory onboarding and client activation.
          </p>
        </div>
      </section>
    </main>
  );
}