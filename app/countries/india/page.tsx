import Link from "next/link";

export default function IndiaDossierPage() {
  const COUNTRY = "India";
  const SLUG = "india";

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
            href={`/countries/${SLUG}#consultation`}
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
            Request Private Advisory Review
          </Link>
        </div>
      </header>

      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "28px 20px 80px" }}>
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
        <section style={{ paddingTop: 34, paddingBottom: 28, textAlign: "center" }}>
          <div
            style={{
              fontSize: 12,
              letterSpacing: 2.8,
              textTransform: "uppercase",
              color: MUTED,
              marginBottom: 16,
            }}
          >
            Strategic advisory dossier
          </div>

          <h1 style={{ margin: 0, fontSize: 56 }}>
            {COUNTRY}
          </h1>

          <p
            style={{
              margin: "18px auto 0",
              maxWidth: 860,
              fontSize: 18,
              lineHeight: 1.7,
              color: "#3A342C",
            }}
          >
            India offers cost differentiation and large clinical volume —
            but operates under tightly defined regulatory parameters.
            Strategic fit depends on eligibility, treatment scope,
            and compliance alignment.
          </p>
        </section>

        {/* 2 Column */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 18,
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
            <h2>When India is the right choice</h2>
            <ul style={{ paddingLeft: 18, lineHeight: 1.8 }}>
              <li>Cost sensitivity is a major decision factor.</li>
              <li>High-volume IVF experience is desirable.</li>
              <li>Domestic eligibility aligns with regulatory requirements.</li>
              <li>You are working within clearly defined treatment pathways.</li>
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
            <h2>When it’s not</h2>
            <ul style={{ paddingLeft: 18, lineHeight: 1.8 }}>
              <li>If international surrogacy flexibility is required.</li>
              <li>If donor structures outside domestic frameworks are essential.</li>
              <li>If regulatory certainty for cross-border cases is unclear.</li>
              <li>If speed without compliance friction is your priority.</li>
            </ul>
          </div>
        </section>

        {/* Framework */}
        <section style={{ marginTop: 40 }}>
          <h2 style={{ textAlign: "center" }}>
            Advisory framework for {COUNTRY}
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 14,
              marginTop: 20,
            }}
          >
            {[
              {
                title: "Regulatory gatekeeping",
                text: "India’s ART framework defines eligibility carefully; strategy must begin with qualification review.",
              },
              {
                title: "Clinic differentiation",
                text: "Volume varies widely in quality — vetting and lab standards matter significantly.",
              },
              {
                title: "Cross-border planning",
                text: "Legal documentation and compliance sequencing must be mapped before travel commitments.",
              },
            ].map((card) => (
              <div
                key={card.title}
                style={{
                  background: CARD_BG,
                  border: `1px solid ${BORDER}`,
                  borderRadius: 16,
                  padding: 18,
                }}
              >
                <div style={{ fontWeight: 500 }}>{card.title}</div>
                <div style={{ marginTop: 8, lineHeight: 1.7 }}>
                  {card.text}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section id="consultation" style={{ marginTop: 60, textAlign: "center" }}>
          <h2>Private advisory review</h2>
          <p style={{ maxWidth: 800, margin: "12px auto", color: MUTED }}>
            We assess India against your profile — regulatory eligibility,
            clinic quality differentiation, and cross-border sequencing.
          </p>

          <Link
            href="/consultation"
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
            }}
          >
            Review India Strategy Privately
          </Link>
        </section>
      </div>

      <style>{`
        @media (max-width: 900px) {
          section[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
          section[style*="repeat(3, 1fr)"] {
            grid-template-columns: 1fr !important;
          }
          h1 { font-size: 40px !important; }
        }
      `}</style>
    </main>
  );
}
