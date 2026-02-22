import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "64px 20px" }}>
      <h1 style={{ fontSize: 36, margin: 0, letterSpacing: "-0.02em" }}>
        Privacy Policy
      </h1>

      <p style={{ marginTop: 14, lineHeight: 1.7, color: "rgba(0,0,0,0.72)" }}>
        FertilityCareHub collects limited personal information when you subscribe to updates or
        request an advisory consultation. We use this information to respond to your request,
        improve the platform, and operate our services.
      </p>

      <h2 style={{ marginTop: 28, fontSize: 20 }}>Information we collect</h2>
      <ul style={{ lineHeight: 1.8, color: "rgba(0,0,0,0.72)" }}>
        <li>Email address (subscriber list)</li>
        <li>Consultation intake details you provide (e.g., name, email, country, context)</li>
        <li>Basic technical data (e.g., source page URL) for routing and troubleshooting</li>
      </ul>

      <h2 style={{ marginTop: 28, fontSize: 20 }}>How we use information</h2>
      <ul style={{ lineHeight: 1.8, color: "rgba(0,0,0,0.72)" }}>
        <li>To contact you about your advisory request</li>
        <li>To provide platform updates you opt into</li>
        <li>To maintain site security and operational integrity</li>
      </ul>

      <h2 style={{ marginTop: 28, fontSize: 20 }}>Data retention</h2>
      <p style={{ lineHeight: 1.7, color: "rgba(0,0,0,0.72)" }}>
        We retain submissions for as long as needed for advisory follow-up and recordkeeping.
        You can request deletion of your personal data by contacting{" "}
        <a href="mailto:hello@fertilitycarehub.com" style={{ textDecoration: "underline" }}>
          hello@fertilitycarehub.com
        </a>
        .
      </p>

      <p style={{ marginTop: 28 }}>
        <Link href="/" style={{ textDecoration: "underline" }}>
          Back to home
        </Link>
      </p>
    </main>
  );
}