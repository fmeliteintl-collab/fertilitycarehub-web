import Link from "next/link";
import type { Metadata } from "next";
import ResendSetupLinkForm from "./ResendSetupLinkForm";


export const metadata: Metadata = {
  title: "Advisory Access Activated | FertilityCareHub",
  description:
    "Your FertilityCareHub advisory payment has been confirmed. Complete your secure portal setup using the onboarding email sent after checkout.",
  alternates: {
    canonical: "https://fertilitycarehub.com/advisory/success",
  },
  openGraph: {
    title: "Advisory Access Activated | FertilityCareHub",
    description:
      "Your FertilityCareHub advisory payment has been confirmed. Complete your secure portal setup using the onboarding email sent after checkout.",
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
  paymentConfirmation: string;
  accessInstruction: string;
  referenceDescription: string;
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
      "Your advisory payment has been confirmed for the Strategic Alignment Snapshot™️. Your private FertilityCareHub planning workspace has now been activated through the secure onboarding flow.",
    includedItems: [
      "Structured advisory onboarding",
      "Private planning workspace access linked to your checkout email",
      "Early-stage jurisdiction screening context",
      "Primary regulatory and pathway constraint mapping",
      "Directional strategic clarity for next-step planning",
    ],
    onboardingFocus:
      "Your onboarding will focus on organizing pathway context, shortlist direction, and the initial decision structure around jurisdiction fit.",
    paymentConfirmation:
      "Your Strategic Alignment Snapshot™️ purchase has been received and connected to the email address used at checkout.",
    accessInstruction:
      "Please check that email address now for your secure FertilityCareHub portal setup link.",
    referenceDescription:
      "This page reflects your Strategic Alignment Snapshot™️ engagement. Your onboarding emphasis is on directional clarity, shortlist logic, and early structural review.",
  },
  tier2: {
    badge: "FULL BRIEF ENGAGEMENT",
    engagementTitle: "Global Fertility Intelligence Brief™️",
    engagementDescription:
      "Your advisory payment has been confirmed for the Global Fertility Intelligence Brief™️. Your private FertilityCareHub planning workspace has now been activated through the secure onboarding flow.",
    includedItems: [
      "Structured advisory onboarding",
      "Private planning workspace access linked to your checkout email",
      "Comparative jurisdiction and pathway analysis context",
      "Regulatory and structural risk review support",
      "Execution-oriented planning and readiness guidance",
    ],
    onboardingFocus:
      "Your onboarding will focus on deeper planning structure, comparative case organization, risk mapping, and execution-readiness support.",
    paymentConfirmation:
      "Your Global Fertility Intelligence Brief™️ purchase has been received and connected to the email address used at checkout.",
    accessInstruction:
      "Please check that email address now for your secure FertilityCareHub portal setup link.",
    referenceDescription:
      "This page reflects your Global Fertility Intelligence Brief™️ engagement. Your onboarding emphasis is on deeper comparative structure, risk logic, and execution-readiness support.",
  },
  default: {
    badge: "ADVISORY ENGAGEMENT",
    engagementTitle: "FertilityCareHub Advisory Engagement",
    engagementDescription:
      "Your advisory payment has been confirmed. Your private FertilityCareHub planning workspace has now been activated through the secure onboarding flow.",
    includedItems: [
      "Structured advisory onboarding",
      "Private planning workspace access linked to your checkout email",
      "Client-specific planning continuity",
      "Jurisdiction and pathway strategy support",
      "Execution-oriented planning environment",
    ],
    onboardingFocus:
      "Your onboarding will focus on activating your planning structure, clarifying pathway context, and preparing your private workspace access.",
    paymentConfirmation:
      "Your advisory engagement has been received and connected to the email address used at checkout.",
    accessInstruction:
      "Please check that email address now for your secure FertilityCareHub portal setup link.",
    referenceDescription:
      "This page is showing the standard advisory onboarding flow. If a tier-specific redirect parameter is provided, the page will adapt automatically to the purchased engagement.",
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
        name: "Advisory Access Activated",
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
          PAYMENT CONFIRMED
        </div>

        <h1 className="mt-5 text-4xl font-medium leading-tight md:text-6xl">
          Your advisory access has been activated
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-[#2A2A2A]">
          Your FertilityCareHub advisory payment has been confirmed. We have
          created your private planning workspace and sent the secure setup link
          to the email address used at checkout.
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

        <div className="mx-auto mt-6 max-w-3xl rounded-2xl border border-[#DCCFB3] bg-white/75 px-6 py-5 text-left">
          <div className="text-xs tracking-[0.22em] text-[#8A7652]">
            CHECK YOUR EMAIL NOW
          </div>

          <p className="mt-3 text-sm leading-relaxed text-[#5F584C]">
            Look for an email from{" "}
            <strong className="font-medium text-[#1A1A1A]">
              FertilityCareHub
            </strong>{" "}
            at{" "}
            <strong className="font-medium text-[#1A1A1A]">
              onboarding@fertilitycarehub.com
            </strong>
            .
          </p>

          <p className="mt-3 text-sm leading-relaxed text-[#5F584C]">
            The secure setup link is time-sensitive and should be completed as
            soon as possible. If you do not see the email, check your junk or
            spam folder before contacting the advisory team.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href="#email-next-step" className={PRIMARY_BUTTON}>
            Check Your Email First
          </a>

          <Link href="/auth/login" className={SECONDARY_BUTTON}>
            Already Set Up? Go to Login
          </Link>
        </div>

        <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-[#6A6256]">
          Your portal access is linked to the email address you entered during
          Stripe checkout. Please use that same email address when setting up or
          accessing your FertilityCareHub client portal.
        </p>
      </section>

      <section id="email-next-step" className="mx-auto max-w-6xl px-6 pb-12">
        <div className="rounded-2xl border border-[#DCCFB3] bg-[#FFF8EC] p-8">
          <div className="max-w-4xl">
            <div className="text-xs tracking-[0.24em] text-[#8A7652]">
              IMPORTANT NEXT STEP
            </div>

            <h2 className="mt-3 text-2xl font-medium">
              Complete your secure portal setup from your email
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-[#5F584C]">
              {tierContent.paymentConfirmation}
            </p>

            <p className="mt-4 text-sm leading-relaxed text-[#5F584C]">
              {tierContent.accessInstruction}
            </p>

            <p className="mt-4 text-sm leading-relaxed text-[#5F584C]">
              The message will direct you to a secure FertilityCareHub setup
              page where you can create your portal password. After setup, you
              can access your private planning workspace.
            </p>

            <p className="mt-4 text-sm leading-relaxed text-[#5F584C]">
              {tierContent.onboardingFocus}
            </p>

            <div className="mt-6 rounded-xl border border-[#DCCFB3] bg-white/75 p-5">
              <h3 className="text-base font-medium text-[#1A1A1A]">
                Email details to look for
              </h3>

              <dl className="mt-4 grid gap-3 text-sm text-[#5F584C] md:grid-cols-2">
                <div>
                  <dt className="font-medium text-[#1A1A1A]">Sender</dt>
                  <dd className="mt-1">FertilityCareHub</dd>
                </div>

                <div>
                  <dt className="font-medium text-[#1A1A1A]">Email address</dt>
                  <dd className="mt-1">onboarding@fertilitycarehub.com</dd>
                </div>

                <div>
                  <dt className="font-medium text-[#1A1A1A]">Purpose</dt>
                  <dd className="mt-1">Secure portal password setup</dd>
                </div>

                <div>
                  <dt className="font-medium text-[#1A1A1A]">Important</dt>
                  <dd className="mt-1">The setup link is time-sensitive</dd>
                </div>
              </dl>
            </div>
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

              <div className="mt-2 font-medium">Payment confirmed</div>

              <p className="mt-2 text-sm leading-relaxed text-[#6A6256]">
                Your advisory purchase has been completed and captured securely
                through Stripe.
              </p>
            </div>

            <div className="rounded-xl border border-[#E5DDC8] bg-[#FAF7F1] p-5">
              <div className="text-xs tracking-[0.22em] text-[#6A6256]">
                STEP 2
              </div>

              <div className="mt-2 font-medium">Workspace activated</div>

              <p className="mt-2 text-sm leading-relaxed text-[#6A6256]">
                FertilityCareHub links your checkout email to private portal
                access.
              </p>
            </div>

            <div className="rounded-xl border border-[#E5DDC8] bg-[#FAF7F1] p-5">
              <div className="text-xs tracking-[0.22em] text-[#6A6256]">
                STEP 3
              </div>

              <div className="mt-2 font-medium">Setup email sent</div>

              <p className="mt-2 text-sm leading-relaxed text-[#6A6256]">
                You receive a secure setup link from FertilityCareHub to create
                your portal password.
              </p>
            </div>

            <div className="rounded-xl border border-[#E5DDC8] bg-[#FAF7F1] p-5">
              <div className="text-xs tracking-[0.22em] text-[#6A6256]">
                STEP 4
              </div>

              <div className="mt-2 font-medium">Enter your portal</div>

              <p className="mt-2 text-sm leading-relaxed text-[#6A6256]">
                Complete password setup and access your private planning
                workspace.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-[#DCCFB3] bg-[#FFF8EC] p-5">
            <p className="text-sm leading-relaxed text-[#5F584C]">
              For security, FertilityCareHub does not operate as a public signup
              system. Portal setup is available only after a completed advisory
              payment or approved client access.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-8">
            <div className="text-xs tracking-[0.25em] text-[#6A6256]">
              INCLUDED IN YOUR ENGAGEMENT
            </div>

            <h2 className="mt-3 text-2xl font-medium">
              What your advisory access includes
            </h2>

            <ul className="mt-6 list-disc space-y-3 pl-5 text-sm leading-relaxed text-[#6A6256]">
              {tierContent.includedItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <p className="mt-6 text-xs leading-relaxed text-[#6A6256]">
              Access is connected to a completed advisory payment and is not
              part of an open public signup system.
            </p>
          </div>

          <div className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-8">
            <div className="text-xs tracking-[0.25em] text-[#6A6256]">
              CLIENT LOGIN
            </div>

            <h2 className="mt-3 text-2xl font-medium">
              Already completed setup?
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-[#6A6256]">
              If you have already created your FertilityCareHub portal password,
              you can go directly to the client login page below.
            </p>

            <p className="mt-4 text-sm leading-relaxed text-[#6A6256]">
              If you have not created your password yet, please use the secure
              setup link sent to the same email address used at checkout.
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
              If your payment was completed but you cannot find the onboarding
              email, please check your junk or spam folder first.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-12">
        <div className="rounded-2xl border border-[#DCCFB3] bg-[#FFF8EC] p-8">
          <div className="text-xs tracking-[0.24em] text-[#8A7652]">
            EMAIL DELIVERY SUPPORT
          </div>

          <h2 className="mt-3 text-2xl font-medium">
            Need another setup link?
          </h2>

          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-[#5F584C]">
            If the email does not arrive, the next system improvement will allow
            clients to request a new secure setup link directly from this page.
          </p>

          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-[#5F584C]">
            For now, please check your inbox, junk folder, and spam folder for a
            message from FertilityCareHub at onboarding@fertilitycarehub.com.
          </p>

          <ResendSetupLinkForm />

<div className="mt-6">
  <Link href="/consultation" className={SECONDARY_BUTTON}>
    Contact Advisory Team
  </Link>
</div>

          <p className="mt-5 text-xs leading-relaxed text-[#6A6256]">
            This button is intentionally inactive until the resend API route is
            added. Keeping it visible prepares the user experience without
            introducing a broken action.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-12">
        <div className="rounded-2xl border border-[#E5DDC8] bg-[#FAF7F1] p-8">
          <div className="text-xs tracking-[0.24em] text-[#6A6256]">
            ENGAGEMENT REFERENCE
          </div>

          <h2 className="mt-3 text-2xl font-medium">
            Your advisory tier has been captured
          </h2>

          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-[#6A6256]">
            {tierContent.referenceDescription}
          </p>

          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-[#6A6256]">
            Your portal access is connected to the checkout email used during
            payment. For security and continuity, use that same email address
            when creating your password or signing into the portal.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-12">
        <div className="rounded-2xl border border-[#DCCFB3] bg-[#FFF8EC] p-8">
          <div className="text-xs tracking-[0.24em] text-[#8A7652]">
            EMAIL DELIVERY NOTE
          </div>

          <h2 className="mt-3 text-2xl font-medium">
            Your setup email may take a few moments
          </h2>

          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-[#5F584C]">
            Your onboarding email is sent automatically after payment
            confirmation. In some cases, delivery may take a short time.
          </p>

          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-[#5F584C]">
            The email will come from FertilityCareHub and will include your
            secure setup link for the private planning workspace.
          </p>

          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-[#5F584C]">
            The setup link is designed for security and is time-sensitive. If it
            expires, the advisory team can issue a new setup link once your
            payment and checkout email are verified.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="rounded-2xl border border-[#E5DDC8] bg-white/60 p-8">
          <h2 className="text-2xl font-medium">Need help with onboarding?</h2>

          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#6A6256]">
            If you have completed your advisory payment and need clarification
            regarding onboarding, login, or access status, you can contact the
            advisory team for assistance.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/consultation" className={PRIMARY_BUTTON}>
              Contact Advisory Team
            </Link>

            <Link href="/auth/login" className={SECONDARY_BUTTON}>
              Go to Client Login
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