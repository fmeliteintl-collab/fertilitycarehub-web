import Link from "next/link";

export default function TermsPage() {
  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "64px 20px" }}>
      <h1 style={{ fontSize: 36, margin: 0, letterSpacing: "-0.02em" }}>
        Terms of Service
      </h1>

      <p style={{ marginTop: 14, lineHeight: 1.7, color: "rgba(0,0,0,0.72)" }}>
        By accessing or using FertilityCareHub, you agree to the following Terms of Service.
        If you do not agree, please discontinue use of the platform.
      </p>

      <h2 style={{ marginTop: 28, fontSize: 20 }}>Advisory Scope</h2>
      <p style={{ lineHeight: 1.7, color: "rgba(0,0,0,0.72)" }}>
        FertilityCareHub provides independent strategic advisory services related to
        cross-border fertility planning. We are not a medical provider, clinic,
        healthcare institution, legal firm, or brokerage service. We do not arrange
        medical treatment or act as an intermediary for clinics.
      </p>

      <h2 style={{ marginTop: 28, fontSize: 20 }}>No Medical or Legal Advice</h2>
      <p style={{ lineHeight: 1.7, color: "rgba(0,0,0,0.72)" }}>
        All content and advisory guidance is informational and strategic in nature.
        It does not constitute medical, legal, financial, or regulatory advice.
        Always consult qualified licensed professionals regarding your specific
        medical or legal circumstances.
      </p>

      <h2 style={{ marginTop: 28, fontSize: 20 }}>No Guarantees</h2>
      <p style={{ lineHeight: 1.7, color: "rgba(0,0,0,0.72)" }}>
        FertilityCareHub does not guarantee treatment outcomes, clinical success,
        pricing stability, eligibility, regulatory approval, timelines, or access.
        Cross-border fertility decisions involve variables outside our control.
      </p>

      <h2 style={{ marginTop: 28, fontSize: 20 }}>Independent Status</h2>
      <p style={{ lineHeight: 1.7, color: "rgba(0,0,0,0.72)" }}>
        FertilityCareHub operates independently and is not owned by, affiliated with,
        or controlled by any fertility clinic, medical provider, or treatment center.
        We do not receive commission-based compensation tied to patient treatment decisions.
      </p>

      <h2 style={{ marginTop: 28, fontSize: 20 }}>Limitation of Liability</h2>
      <p style={{ lineHeight: 1.7, color: "rgba(0,0,0,0.72)" }}>
        To the fullest extent permitted by law, FertilityCareHub shall not be liable
        for any indirect, incidental, consequential, special, or punitive damages
        arising from your use of the platform or reliance on advisory guidance.
        Users assume full responsibility for decisions made based on the information provided.
      </p>

      <h2 style={{ marginTop: 28, fontSize: 20 }}>Payment & Refund Policy</h2>
      <p style={{ lineHeight: 1.7, color: "rgba(0,0,0,0.72)" }}>
        Paid advisory services are governed by separate service agreements provided
        at the time of engagement. Fees are disclosed prior to booking. Refund
        policies, if applicable, are outlined within the advisory agreement.
      </p>

      <h2 style={{ marginTop: 28, fontSize: 20 }}>Intellectual Property</h2>
      <p style={{ lineHeight: 1.7, color: "rgba(0,0,0,0.72)" }}>
        All content, materials, frameworks, and documentation provided by
        FertilityCareHub are protected intellectual property and may not be
        reproduced, redistributed, or commercially exploited without written consent.
      </p>

      <h2 style={{ marginTop: 28, fontSize: 20 }}>Governing Law</h2>
      <p style={{ lineHeight: 1.7, color: "rgba(0,0,0,0.72)" }}>
        These Terms shall be governed by and construed in accordance with the laws
        of the Province of Ontario and the applicable federal laws of Canada.
      </p>

      <h2 style={{ marginTop: 28, fontSize: 20 }}>Modifications</h2>
      <p style={{ lineHeight: 1.7, color: "rgba(0,0,0,0.72)" }}>
        FertilityCareHub reserves the right to update or modify these Terms at any time.
        Continued use of the platform constitutes acceptance of the revised Terms.
      </p>

      <p style={{ marginTop: 28 }}>
        <Link href="/" style={{ textDecoration: "underline" }}>
          Back to home
        </Link>
      </p>
    </main>
  );
}