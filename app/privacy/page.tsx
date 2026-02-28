import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | FertilityCareHub",
  description:
    "How FertilityCareHub collects, uses, stores, and safeguards personal information.",
  alternates: { canonical: "https://fertilitycarehub.com/privacy" },
  openGraph: {
    title: "Privacy Policy | FertilityCareHub",
    description:
      "How FertilityCareHub collects, uses, stores, and safeguards personal information.",
    url: "https://fertilitycarehub.com/privacy",
    siteName: "FertilityCareHub",
    type: "website",
  },
};

const SUPPORT_EMAIL = "support@fertilitycarehub.com";

export default function PrivacyPage() {
  return (
    <main style={{ backgroundColor: "#F5F1E8", minHeight: "100vh" }}>
  <div style={{ maxWidth: 900, margin: "0 auto", padding: "64px 20px" }}>
      <h1 style={{ fontSize: 36, margin: 0, letterSpacing: "-0.02em" }}>
        Privacy Policy
      </h1>

      <p style={{ marginTop: 14, lineHeight: 1.7, color: "rgba(0,0,0,0.72)" }}>
        FertilityCareHub respects your privacy and is committed to protecting
        your personal information. This Privacy Policy explains how we collect,
        use, store, and safeguard your information when you use our platform.
      </p>

      <h2 style={{ marginTop: 28, fontSize: 20 }}>Information We Collect</h2>
      <ul style={{ lineHeight: 1.8, color: "rgba(0,0,0,0.72)" }}>
        <li>Email address when you subscribe to updates.</li>
        <li>
          Consultation intake information you voluntarily provide (e.g., name,
          email, country, contextual details).
        </li>
        <li>
          Limited technical data such as referral source and page context for
          operational and security purposes.
        </li>
      </ul>

      <h2 style={{ marginTop: 28, fontSize: 20 }}>How We Use Your Information</h2>
      <ul style={{ lineHeight: 1.8, color: "rgba(0,0,0,0.72)" }}>
        <li>To respond to advisory inquiries.</li>
        <li>To provide updates you have opted into.</li>
        <li>To operate, maintain, and secure the platform.</li>
        <li>To improve clarity and service delivery.</li>
      </ul>

      <h2 style={{ marginTop: 28, fontSize: 20 }}>Legal Basis for Processing</h2>
      <p style={{ lineHeight: 1.7, color: "rgba(0,0,0,0.72)" }}>
        We process personal data based on user consent, legitimate business
        interests related to advisory services, and contractual necessity where
        applicable.
      </p>

      <h2 style={{ marginTop: 28, fontSize: 20 }}>Data Storage &amp; Security</h2>
      <p style={{ lineHeight: 1.7, color: "rgba(0,0,0,0.72)" }}>
        Consultation and subscriber data may be stored using secure third-party
        infrastructure providers, including Supabase or comparable cloud
        database systems. We implement reasonable administrative and technical
        safeguards to protect personal information against unauthorized access,
        alteration, or disclosure.
      </p>

      <h2 style={{ marginTop: 28, fontSize: 20 }}>Third-Party Services</h2>
      <p style={{ lineHeight: 1.7, color: "rgba(0,0,0,0.72)" }}>
        We may use third-party service providers for hosting, email delivery,
        analytics, and payment processing (such as Stripe). These providers
        process data solely for operational purposes and in accordance with
        their own privacy standards.
      </p>

      <h2 style={{ marginTop: 28, fontSize: 20 }}>International Users</h2>
      <p style={{ lineHeight: 1.7, color: "rgba(0,0,0,0.72)" }}>
        FertilityCareHub operates from Ontario, Canada. By using this platform,
        you understand that your information may be processed and stored in
        Canada or other jurisdictions where service providers operate.
      </p>

      <h2 style={{ marginTop: 28, fontSize: 20 }}>Data Retention</h2>
      <p style={{ lineHeight: 1.7, color: "rgba(0,0,0,0.72)" }}>
        We retain personal information only as long as necessary to fulfill
        advisory communication, maintain records, and comply with legal
        obligations. You may request deletion of your personal data by
        contacting us.
      </p>

      <h2 style={{ marginTop: 28, fontSize: 20 }}>No Sale of Data</h2>
      <p style={{ lineHeight: 1.7, color: "rgba(0,0,0,0.72)" }}>
        We do not sell, rent, or trade your personal information to third
        parties.
      </p>

      <h2 style={{ marginTop: 28, fontSize: 20 }}>Your Rights</h2>
      <p style={{ lineHeight: 1.7, color: "rgba(0,0,0,0.72)" }}>
        You may request access to, correction of, or deletion of your personal
        data by contacting us at{" "}
        <a
          href={"mailto:" + SUPPORT_EMAIL}
          style={{ textDecoration: "underline" }}
        >
          {SUPPORT_EMAIL}
        </a>
        .
      </p>

      <h2 style={{ marginTop: 28, fontSize: 20 }}>Policy Updates</h2>
      <p style={{ lineHeight: 1.7, color: "rgba(0,0,0,0.72)" }}>
        We may update this Privacy Policy periodically. Continued use of the
        platform constitutes acceptance of the revised policy.
      </p>

      <p style={{ marginTop: 28 }}>
        <Link href="/" style={{ textDecoration: "underline" }}>
          Back to home
        </Link>
      </p>
      </div>
    </main>
  );
}