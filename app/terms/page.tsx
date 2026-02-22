import Link from "next/link";

export default function TermsPage() {
  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "64px 20px" }}>
      <h1 style={{ fontSize: 36, margin: 0, letterSpacing: "-0.02em" }}>Terms</h1>

      <p style={{ marginTop: 14, lineHeight: 1.7, color: "rgba(0,0,0,0.72)" }}>
        By using FertilityCareHub, you agree that the platform provides informational content and
        strategic advisory support only. It does not provide medical or legal advice and does not
        replace consultations with licensed professionals.
      </p>

      <h2 style={{ marginTop: 28, fontSize: 20 }}>No medical advice</h2>
      <p style={{ lineHeight: 1.7, color: "rgba(0,0,0,0.72)" }}>
        Content on this site is for informational purposes and does not constitute medical advice,
        diagnosis, or treatment. Always seek guidance from qualified clinicians and legal advisors
        for your situation.
      </p>

      <h2 style={{ marginTop: 28, fontSize: 20 }}>No guarantees</h2>
      <p style={{ lineHeight: 1.7, color: "rgba(0,0,0,0.72)" }}>
        FertilityCareHub does not guarantee outcomes, access, timelines, pricing, or treatment
        success. Cross-border fertility decisions involve variables outside our control.
      </p>

      <p style={{ marginTop: 28 }}>
        <Link href="/" style={{ textDecoration: "underline" }}>
          Back to home
        </Link>
      </p>
    </main>
  );
}