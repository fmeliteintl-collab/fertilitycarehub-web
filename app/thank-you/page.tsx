import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment Received — Next Steps | FertilityCareHub",
  description:
    "Thank you. Your payment has been received. Here are the next steps to begin your private fertility strategy advisory.",
  alternates: { canonical: "https://fertilitycarehub.com/thank-you" },
  openGraph: {
    title: "Payment Received — Next Steps",
    description:
      "Thank you. Your payment has been received. Here are the next steps to begin your private fertility strategy advisory.",
    url: "https://fertilitycarehub.com/thank-you",
    siteName: "FertilityCareHub",
    type: "website",
  },
};

type Props = {
  searchParams?: { tier?: string };
};

function normalizeTier(tier?: string) {
  const t = (tier || "").toLowerCase().trim();
  if (t === "1" || t === "tier1" || t === "strategy" || t === "session") return "tier1";
  if (t === "2" || t === "tier2" || t === "premium" || t === "package") return "tier2";
  return "unknown";
}

export default function ThankYouPage({ searchParams }: Props) {
  const tier = normalizeTier(searchParams?.tier);

  const headline =
    tier === "tier1"
      ? "Payment received — Strategy Session (US$500)"
      : tier === "tier2"
      ? "Payment received — Premium Advisory (US$2,500)"
      : "Payment received — Next steps";

  const sub =
    tier === "tier1"
      ? "Next, complete a short intake so we can route your session efficiently and focus on the right jurisdiction decisions."
      : tier === "tier2"
      ? "Next, complete a short intake so we can structure your jurisdiction plan, checkpoints, and risk brief efficiently."
      : "Next, complete a short intake so we can route you to the right tier and structure your next steps.";

  return (
    <main className="min-h-screen bg-[#F5F1E8] text-[#1A1A1A]">
      <div className="max-w-4xl mx-auto px-6 pt-10">
        <Link
          href="/"
          className="text-sm tracking-wide text-[#6A6256] hover:text-[#1A1A1A]"
        >
          ← Back to home
        </Link>
      </div>

      <section className="max-w-4xl mx-auto px-6 pt-10 pb-16">
        <div className="rounded-2xl border border-[#E5DDC8] bg-white/70 p-8">
          <div className="text-xs tracking-[0.28em] text-[#6A6256]">
            PAYMENT CONFIRMATION
          </div>

          <h1 className="mt-4 text-3xl md:text-4xl font-medium leading-tight">
            {headline}
          </h1>

          <p className="mt-4 text-[15px] leading-relaxed text-[#2A2A2A]">
            Thank you. {sub}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/consultation"
              className="inline-flex items-center justify-center rounded-full border border-[#B89B5E] px-6 py-3 text-sm tracking-wide text-[#1A1A1A] hover:bg-[#F0E7D6]"
            >
              Start Intake (Phase 1)
            </Link>

            <Link
              href="/advisory"
              className="inline-flex items-center justify-center rounded-full border border-[#E5DDC8] px-6 py-3 text-sm tracking-wide text-[#1A1A1A] hover:bg-white/40"
            >
              Back to Advisory Options
            </Link>

            <Link
              href="/countries"
              className="inline-flex items-center justify-center rounded-full border border-[#E5DDC8] px-6 py-3 text-sm tracking-wide text-[#1A1A1A] hover:bg-white/40"
            >
              Explore Country Dossiers
            </Link>
          </div>

          <div className="mt-8 rounded-xl border border-[#E5DDC8] bg-white/60 p-5">
            <h2 className="text-lg font-medium">What happens next</h2>
            <ol className="mt-3 space-y-2 text-sm text-[#6A6256] leading-relaxed list-decimal pl-5">
              <li>Complete the short intake (Phase 1).</li>
              <li>We review your context and route you to the right next step.</li>
              <li>We’ll contact you by email for scheduling / next actions.</li>
            </ol>

            <p className="mt-4 text-sm text-[#6A6256] leading-relaxed">
              Support:{" "}
              <a
                href="mailto:support@fertilitycarehub.com"
                className="underline textUnderlineOffset-4"
              >
                support@fertilitycarehub.com
              </a>
            </p>
          </div>

          <p className="mt-6 text-xs text-[#6A6256] leading-relaxed">
            Advisory only. No medical diagnosis, no guarantees, and no clinic sales.
            FertilityCareHub provides strategic planning support and jurisdiction clarity.
          </p>
        </div>
      </section>
    </main>
  );
}