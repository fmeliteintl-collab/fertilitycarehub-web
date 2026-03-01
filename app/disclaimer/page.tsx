import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Medical Disclaimer | FertilityCareHub",
  description:
    "Medical disclaimer for FertilityCareHub. Advisory-only. Not medical treatment or diagnosis.",
  alternates: { canonical: "https://fertilitycarehub.com/disclaimer" },
  openGraph: {
    title: "Medical Disclaimer | FertilityCareHub",
    description:
      "Advisory-only. Not medical treatment or diagnosis.",
    url: "https://fertilitycarehub.com/disclaimer",
    siteName: "FertilityCareHub",
    type: "website",
  },
};

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-[#F5F1E8] text-[#1A1A1A]">
      <div className="max-w-4xl mx-auto px-6 pt-10 pb-16">
        <Link
          href="/"
          className="text-sm tracking-wide text-[#6A6256] hover:text-[#1A1A1A]"
        >
          ← Back to home
        </Link>

        <h1 className="mt-8 text-3xl md:text-4xl font-medium">
          Medical Disclaimer
        </h1>

        <div className="mt-8 space-y-6 text-[15px] leading-relaxed text-[#2A2A2A]">
          <p className="text-[#6A6256]">
            FertilityCareHub is not a medical provider. We do not diagnose,
            treat, or provide medical care. Nothing on this site constitutes
            medical advice.
          </p>

          <p className="text-[#6A6256]">
            Always consult licensed clinicians and qualified professionals for
            medical decisions, treatment planning, and legal/regulatory matters.
          </p>

          <p className="text-[#6A6256]">
            Advisory outputs are strategic and informational. Regulations and
            clinic practices change and vary by jurisdiction.
          </p>
        </div>
      </div>
    </main>
  );
}