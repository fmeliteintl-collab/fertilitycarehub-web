import Link from "next/link";

export default function ConsultationPage() {
  const PAGE_BG = "#F5F1E8";
  const INK = "#1A1A1A";
  const MUTED = "#6A6256";
  const GOLD = "#B89B5E";
  const BORDER = "#E5DDC8";
  const CARD_BG = "#FBFAF7";

  return (
    <main
      style={{
        background: PAGE_BG,
        color: INK,
        minHeight: "100vh",
        fontFamily:
          'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
      }}
    >
      {/* Header */}
      <header
        style={{
          width: "100%",
          borderBottom: `1px solid ${BORDER}`,
          background: PAGE_BG,
        }}
      >
        <div
          style={{
            maxWidth: 1120,
            margin: "0 auto",
            padding: "18px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link
            href="/countries"
            style={{
              textDecoration: "none",
              color: INK,
              fontSize: 18,
              letterSpacing: 0.5,
            }}
          >
            FertilityCareHub
          </Link>

          <Link
            href="/countries"
            style={{
              textDecoration: "none",
              border: `1px solid ${GOLD}`,
              color: INK,
              padding: "10px 14px",
              borderRadius: 999,
              fontSize: 13,
              letterSpacing: 0.8,
              textTransform: "uppercase",
              background: "transparent",
            }}
          >
            View Countries
          </Link>
        </div>
      </header>

      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "28px 20px 90px" }}>
        {/* Back */}
        <div>
          <Link
            href="/countries"
            style={{ textDecoration: "none", color: MUTED, fontSize: 13 }}
          >
            ← Back to countries
          </Link>
        </div>

        {/* Hero */}
        <section style={{ paddingTop: 34, paddingBottom: 26, textAlign: "center" }}>
          <div
            style={{
              fontSize: 12,
              letterSpacing: 2.8,
              textTransform: "uppercase",
              color: MUTED,
              marginBottom: 16,
            }}
          >
            Private advisory intake
          </div>

          <h1 style={{ margin: 0, fontSize: 56 }}>
            Request Private Advisory Review
          </h1>

          <p
            style={{
              margin: "18px auto 0",
              maxWidth: 900,
              fontSize: 18,
              lineHeight: 1.7,
              color: "#3A342C",
            }}
          >
            This is a strategy-led review — not general medical advice.
            We help you choose the right country pathway, identify what matters,
            and reduce wasted time, travel, and financial leakage.
          </p>
        </section>

        {/* Two cards */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 18,
            marginTop: 10,
          }}
        >
          <div
            style={{
              background: CARD_BG,
              border: `1px solid ${BORDER}`,
              borderRadius: 18,
              padding: 22,
            }}
          >
            <h2>What we cover</h2>
            <ul style={{ paddingLeft: 18, lineHeight: 1.8 }}>
              <li>Country fit: legal posture, access constraints, travel cadence.</li>
              <li>Clinic selection logic (curated shortlist, not exhaustive lists).</li>
              <li>Timeline planning: trips, stages, and decision checkpoints.</li>
              <li>Risk flags: eligibility, documentation, and pathway friction.</li>
              <li>Next actions: what to do this week vs. later.</li>
            </ul>
          </div>

          <div
            style={{
              background: CARD_BG,
              border: `1px solid ${BORDER}`,
              borderRadius: 18,
              padding: 22,
            }}
          >
            <h2>What we deliberately don’t do</h2>
            <ul style={{ paddingLeft: 18, lineHeight: 1.8 }}>
              <li>We do not provide medical diagnosis or replace your physician.</li>
              <li>We do not publish “every clinic in the country.”</li>
              <li>We do not provide visa step-by-step instructions (we refer partners).</li>
              <li>We do not guarantee outcomes or success rates.</li>
              <li>We do not operate as a clinic or medical facility.</li>
            </ul>
          </div>
        </section>

        {/* Intake */}
        <section style={{ marginTop: 34 }}>
          <div
            style={{
              background: CARD_BG,
              border: `1px solid ${BORDER}`,
              borderRadius: 18,
              padding: 22,
              maxWidth: 920,
              margin: "0 auto",
            }}
          >
            <h2 style={{ textAlign: "center" }}>Intake (Phase 1)</h2>

            <p style={{ textAlign: "center", color: MUTED, marginTop: 10 }}>
              For now, this is a clean placeholder. Next phase will connect this form to a secure backend.
            </p>

            <div
              style={{
                marginTop: 18,
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
              }}
            >
              <Input label="Full name" placeholder="Your name" />
              <Input label="Email" placeholder="name@email.com" />
              <Input label="Country of residence" placeholder="e.g., Canada" />
              <Input label="Target country (if known)" placeholder="e.g., Spain" />
            </div>

            <div style={{ marginTop: 12 }}>
              <Label text="What are you optimizing for?" />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 10,
                  marginTop: 10,
                }}
              >
                <Chip text="Highest probability" />
                <Chip text="Speed & access" />
                <Chip text="Cost efficiency" />
                <Chip text="Donor pathway" />
                <Chip text="Ethical alignment" />
                <Chip text="Legal clarity" />
              </div>
              <p style={{ color: MUTED, fontSize: 12, marginTop: 10 }}>
                (Phase 1 UI only — selection logic comes later.)
              </p>
            </div>

            <div style={{ marginTop: 12 }}>
              <Label text="Brief context" />
              <textarea
                placeholder="Age range, prior cycles, diagnosis (if any), preferred timeline, and any constraints you want us to respect."
                style={{
                  width: "100%",
                  minHeight: 130,
                  padding: 12,
                  borderRadius: 14,
                  border: `1px solid ${BORDER}`,
                  outline: "none",
                  background: "#FFF",
                  fontFamily:
                    'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
                  fontSize: 14,
                  lineHeight: 1.6,
                }}
              />
            </div>

            {/* CTA row */}
            <div
              style={{
                marginTop: 18,
                display: "flex",
                justifyContent: "center",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              <a
                href="mailto:hello@fertilitycarehub.com?subject=Private%20Advisory%20Review%20Request"
                style={{
                  display: "inline-block",
                  border: `1px solid ${GOLD}`,
                  padding: "12px 16px",
                  borderRadius: 999,
                  textDecoration: "none",
                  color: INK,
                  fontSize: 13,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  background: "transparent",
                }}
              >
                Email Request (Phase 1)
              </a>

              <Link
                href="/countries"
                style={{
                  display: "inline-block",
                  border: `1px solid ${BORDER}`,
                  padding: "12px 16px",
                  borderRadius: 999,
                  textDecoration: "none",
                  color: INK,
                  fontSize: 13,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  background: "transparent",
                }}
              >
                Return to Countries
              </Link>
            </div>

            <p style={{ color: MUTED, fontSize: 12, textAlign: "center", marginTop: 14 }}>
              Note: This page is not medical advice. Emergency issues should be handled by licensed medical professionals.
            </p>
          </div>
        </section>
      </div>

      <style>{`
        @media (max-width: 900px) {
          section[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
          h1 { font-size: 40px !important; }
          div[style*="repeat(3, 1fr)"] {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}

function Label({ text }: { text: string }) {
  return (
    <div style={{ fontSize: 12, letterSpacing: 1.4, textTransform: "uppercase" }}>
      {text}
    </div>
  );
}

function Input({ label, placeholder }: { label: string; placeholder: string }) {
  const BORDER = "#E5DDC8";
  return (
    <div>
      <Label text={label} />
      <input
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: 12,
          borderRadius: 14,
          border: `1px solid ${BORDER}`,
          outline: "none",
          background: "#FFF",
          fontFamily:
            'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
          fontSize: 14,
        }}
      />
    </div>
  );
}

function Chip({ text }: { text: string }) {
  const BORDER = "#E5DDC8";
  return (
    <div
      style={{
        border: `1px solid ${BORDER}`,
        borderRadius: 999,
        padding: "10px 12px",
        fontSize: 13,
        background: "transparent",
        textAlign: "center",
        userSelect: "none",
      }}
    >
      {text}
    </div>
  );
}
