import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Advisory Request Received | FertilityCareHub",
  description:
    "Your FertilityCareHub advisory engagement has been received. Review next steps for onboarding, private portal activation, and client login access.",
  alternates: {
    canonical: "https://fertilitycarehub.com/advisory/success",
  },
  openGraph: {
    title: "Advisory Request Received | FertilityCareHub",
    description:
      "Review next steps for onboarding, private portal activation, and client login access.",
    url: "https://fertilitycarehub.com/advisory/success",
    siteName: "FertilityCareHub",
    type: "website",
  },
};

type AdvisorySuccessPageProps = {
  searchParams?: {
    tier?: string | string[];
  };
};

type TierKey = "tier1" | "tier2" | "default";

type TierContent = {
  badge: string;
  engagementTitle: string;
  engagementDescription: string;
  includedItems: string[];
  onboardingFocus: string;
};

const PRIMARY_BUTTON =
  "inline-flex items-center justify-center rounded-full border border-[#B89B5E] bg-[#1A1A1A] px-6 py-3 text-sm tracking-wide text-white transition hover:bg-[#2A2A2A]";

const SECONDARY_BUTTON =
  "inline-flex items-center justify-center rounded-full border border-[#E5DDC8] px-6 py-3 text-sm tracking-wide text-[#1A1A1A] transition hover:bg-[#EFE9DB]";

const TIER_CONTENT: Record<TierKey, TierContent> = {
  tier1: {
    badge: "SNAPSHOT ENGAGEMENT",
    engagementTitle: "Strategic Alignment Snapshot™️",
    engagementDescription:
      "Your engagement includes structured early-stage jurisdiction screening, primary constraint mapping, and directional advisory clarity across viable pathways.",
    includedItems: [
      "Structured advisory onboarding",
      "Private planning workspace access upon approved setup",
      "Early-stage jurisdiction screening context",
      "Primary regulatory and pathway constraint mapping",
      "Directional strategic clarity for next-step planning",
    ],
    onboardingFocus:
      "Your onboarding will focus on organizing pathway context, shortlist direction, and the initial decision structure around jurisdiction fit.",
  },
  tier2: {
    badge: "FULL BRIEF ENGAGEMENT",
    engagementTitle: "Global Fertility Intelligence Brief™️",
    engagementDescription:
      "Your engagement includes a deeper institutional framework application with comparative jurisdiction analysis, structural risk mapping, and execution-oriented planning guidance.",
    includedItems: [
      "Structured advisory onboarding",
      "Private planning workspace access upon approved setup",
      "Comparative jurisdiction and pathway analysis context",
      "Regulatory and structural risk review support",
      "Execution-oriented planning and readiness guidance",
    ],
    onboardingFocus:
      "Your onboarding will focus on deeper planning structure, comparative case organization, risk mapping, and execution-readiness support.",
  },
  default: {
    badge: "ADVISORY ENGAGEMENT",
    engagementTitle: "FertilityCareHub Advisory Engagement",
    engagementDescription:
      "Your engagement is now moving into structured onboarding review. Private portal activation is included as part of approved advisory setup.",
    includedItems: [
      "Structured advisory onboarding",
      "Private planning workspace access upon approved setup",
      "Client-specific planning continuity",
      "Jurisdiction and pathway strategy support",
      "Execution-oriented planning environment",
    ],
    onboardingFocus:
      "Your onboarding will focus on activating your planning structure, clarifying pathway context, and preparing private workspace access where appropriate.",
  },
};

function getTierValue(rawTier: string | string[] | undefined): TierKey {
  if (Array.isArray(rawTier)) {
    const first = rawTier[0]?.toLowerCase();
    if (first === "tier1" || first === "tier2") {
      return first;
    }
    return "default";
  }

  if (typeof rawTier === "string") {
    const normalized = rawTier.toLowerCase();
    if (normalized === "tier1" || normalized === "tier2") {
      return normalized;
    }
  }

  return "default";
}

export default function AdvisorySuccessPage({
  searchParams,
}: AdvisorySuccessPageProps) {
  const selectedTier = getTierValue(searchParams?.tier);
  const tierContent = TIER_CONTENT[selectedTier];

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
        name: "Success",
        item: "https://fertilitycarehub.com/advisory/success",
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#F5F1E8] text-[#1A1A1A]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="mx-auto max-w-6xl px-6 pt-10">
        <nav className="mb-4 text-sm text-[#6A6256]" aria-label="Breadcrumb">
          <Link href="/" className="underline underline-offset-4">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/advisory" className="underline underline-offset-4">
            Advisory
          </Link>
          <span className="mx-2">/</span>
          <span aria-current="page">Success</span>
        </nav>

        <Link
          href="/advisory"
          className="text-sm tracking-wide text-[#6A6256] transition hover:text-[#1A1A1A]"
        >
          ← Back to advisory
        </Link>
      </div>

      <section className="mx-auto max-w-5xl px-6 pb-12 pt-14 text-center">
        <div className="text-xs tracking-[0.28em] text-[#6A6256]">
          ADVISORY ONBOARDING
        </div>

        <h1 className="mt-5 text-4xl font-medium leading-tight md:text-6xl">
          Your advisory request has been received
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-[#2A2A2A]">
          Thank you for choosing FertilityCareHub. Your engagement is now moving
          into structured onboarding review.
        </p>

        <div className="mx-auto mt-6 max-w-3xl rounded-2xl border border-[#DCCFB3] bg-[#FFF8EC] px-6 py-5 text-left">
          <div className="text-xs tracking-[0.22em] text-[#8A7652]">
            {tierContent.badge}
          </div>
          <h2 className="mt-2 text-2xl font-medium text-[#1A1A1A]">
            {tierContent.engagementTitle}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#5F584C]">
            {tierContent.engagementDescription}
          </p>
        </div>

        <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-[#6A6256]">
          FertilityCareHub operates as a private, approved-access advisory
          model. Portal access is included as part of onboarding, but it is not
          issued through public self-registration.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/auth/login" className={SECONDARY_BUTTON}>
            Client Login
          </Link>

          <Link href="/consultation" className={PRIMARY_BUTTON}>
            Contact Advisory Team
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-12">
        <div className="rounded-2xl border border-[#DCCFB3] bg-[#FFF8EC] p-8">
          <div className="max-w-4xl">
            <div className="text-xs tracking-[0.24em] text-[#8A7652]">
              IMPORTANT NEXT STEP
            </div>

            <h2 className="mt-3 text-2xl font-medium">
              You do not need to create a public account at this stage
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-[#5F584C]">
              Your advisory request has already entered the onboarding process.
              FertilityCareHub will review your engagement, prepare your client
              setup, and activate private workspace access where appropriate.
            </p>

            <p className="mt-4 text-sm leading-relaxed text-[#5F584C]">
              Once your portal access has been issued, you can sign in through
              the client login page using the email associated with your
              advisory engagement.
            </p>

            <p className="mt-4 text-sm leading-relaxed text-[#5F584C]">
              {tierContent.onboardingFocus}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-2xl border border-[#E5DDC8] bg-white/70 p-8">
          <h2 className="text-2xl font-medium">What happens next</h2>

          <div className="mt-6 grid gap-6 md:grid-cols-4">
            <div className="rounded-xl border border-[#E5DDC8] bg-[#FAF7F1] p-5">
              <div className="text-xs tracking-[0.22em] text-[#6A6256]">
                STEP 1
              </div>
              <div className="mt-2 font-medium">Engagement received</div>
              <p className="mt-2 text-sm leading-relaxed text-[#6A6256]">
                Your advisory purchase or engagement request has been captured
                and queued for onboarding review.
              </p>
            </div>

            <div className="rounded-xl border border-[#E5DDC8] bg-[#FAF7F1] p-5">
              <div className="text-xs tracking-[0.22em] text-[#6A6256]">
                STEP 2
              </div>
              <div className="mt-2 font-medium">Client setup review</div>
              <p className="mt-2 text-sm leading-relaxed text-[#6A6256]">
                FertilityCareHub reviews your advisory fit, case structure, and
                onboarding requirements before portal activation.
              </p>
            </div>

            <div className="rounded-xl border border-[#E5DDC8] bg-[#FAF7F1] p-5">
              <div className="text-xs tracking-[0.22em] text-[#6A6256]">
                STEP 3
              </div>
              <div className="mt-2 font-medium">Private access issued</div>
              <p className="mt-2 text-sm leading-relaxed text-[#6A6256]">
                Approved clients are issued private planning workspace access as
                part of advisory onboarding.
              </p>
            </div>

            <div className="rounded-xl border border-[#E5DDC8] bg-[#FAF7F1] p-5">
              <div className="text-xs tracking-[0.22em] text-[#6A6256]">
                STEP 4
              </div>
              <div className="mt-2 font-medium">Login to your workspace</div>
              <p className="mt-2 text-sm leading-relaxed text-[#6A6256]">
                Once access is active, sign in through the FertilityCareHub
                client login page to enter your portal.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-8">
            <div className="text-xs tracking-[0.25em] text-[#6A6256]">
              INCLUDED IN ONBOARDING
            </div>

            <h2 className="mt-3 text-2xl font-medium">
              What your engagement includes
            </h2>

            <ul className="mt-6 list-disc space-y-3 pl-5 text-sm leading-relaxed text-[#6A6256]">
              {tierContent.includedItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <p className="mt-6 text-xs leading-relaxed text-[#6A6256]">
              Access is issued selectively as part of client activation and is
              not part of an open public signup system.
            </p>
          </div>

          <div className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-8">
            <div className="text-xs tracking-[0.25em] text-[#6A6256]">
              CLIENT LOGIN
            </div>

            <h2 className="mt-3 text-2xl font-medium">
              Already received portal access?
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-[#6A6256]">
              If your advisory onboarding has already been completed and your
              access has been activated, you can sign in to your private client
              workspace below.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/auth/login" className={PRIMARY_BUTTON}>
                Go to Client Login
              </Link>

              <Link href="/advisory" className={SECONDARY_BUTTON}>
                Return to Advisory
              </Link>
            </div>

            <p className="mt-6 text-xs leading-relaxed text-[#6A6256]">
              If you believe you should already have access but cannot sign in,
              please contact FertilityCareHub for assistance.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-12">
        <div className="rounded-2xl border border-[#E5DDC8] bg-[#FAF7F1] p-8">
          <div className="text-xs tracking-[0.24em] text-[#6A6256]">
            ENGAGEMENT REFERENCE
          </div>

          <h2 className="mt-3 text-2xl font-medium">
            Your onboarding path has been tagged to the correct advisory tier
          </h2>

          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-[#6A6256]">
            {selectedTier === "tier1"
              ? "This page reflects your Strategic Alignment Snapshot™️ engagement. Your onboarding emphasis is on directional clarity, shortlist logic, and early structural review."
              : selectedTier === "tier2"
                ? "This page reflects your Global Fertility Intelligence Brief™️ engagement. Your onboarding emphasis is on deeper comparative structure, risk logic, and execution-readiness support."
                : "This page is showing the standard advisory onboarding flow. If a tier-specific redirect parameter is later provided, the page will adapt automatically to the purchased engagement."}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-8">
          <h2 className="text-2xl font-medium">Need help with onboarding?</h2>

          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#6A6256]">
            If you have completed your advisory engagement and need clarification
            regarding onboarding, login, or access status, you can return to the
            consultation page and request assistance.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/consultation" className={PRIMARY_BUTTON}>
              Contact Advisory Team
            </Link>

            <Link href="/auth/signup" className={SECONDARY_BUTTON}>
              Private Access Information
            </Link>
          </div>

          <p className="mt-6 text-xs leading-relaxed text-[#6A6256]">
            FertilityCareHub does not provide medical treatment, legal advice,
            or guaranteed outcomes. The platform provides structured strategic
            planning support for cross-border fertility decision-making.
          </p>
        </div>
      </section>
    </main>
  );
}