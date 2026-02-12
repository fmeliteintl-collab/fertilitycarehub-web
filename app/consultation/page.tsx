export default function ConsultationPage() {
  return (
    <main
      style={{
        maxWidth: "72rem",
        margin: "0 auto",
        padding: "72px 24px 96px",
        fontFamily:
          'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
        color: "#1A1A1A",
      }}
    >
      <h1 style={{ fontSize: "44px", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
        Request Advisory Consultation
      </h1>

      <p style={{ marginTop: 16, fontSize: 18, lineHeight: 1.7, maxWidth: "60ch" }}>
        Private, cross-border fertility strategy guidance for families making high-stakes
        decisions. Share your situation and we will respond with next steps and scheduling
        options.
      </p>

      <section style={{ marginTop: 36, maxWidth: "60ch" }}>
        <h2 style={{ fontSize: 22, marginBottom: 12 }}>What to include</h2>
        <ul style={{ paddingLeft: 18, lineHeight: 1.9 }}>
          <li>Country/countries you’re considering</li>
          <li>Timeline and urgency</li>
          <li>Any legal/eligibility constraints (age, donor, marital status, etc.)</li>
          <li>Your priorities (success rates, privacy, budget band, language, travel comfort)</li>
        </ul>
      </section>

      <section style={{ marginTop: 36, maxWidth: "60ch" }}>
        <h2 style={{ fontSize: 22, marginBottom: 12 }}>Contact</h2>
        <p style={{ lineHeight: 1.9 }}>
          For now, email us at{" "}
          <a href="mailto:advisory@fertilitycarehub.com" style={{ textDecoration: "underline" }}>
            advisory@fertilitycarehub.com
          </a>{" "}
          with the subject line: <strong>Consultation Request</strong>.
        </p>

        <div
          style={{
            marginTop: 18,
            padding: 18,
            border: "1px solid #E5DDC8",
            borderRadius: 12,
            background: "rgba(255,255,255,0.65)",
          }}
        >
          <p style={{ margin: 0, lineHeight: 1.7 }}>
            Next: we can replace this email step with a secure form + calendar booking.
          </p>
        </div>
      </section>
    </main>
  );
}
