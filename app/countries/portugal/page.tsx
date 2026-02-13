import Link from "next/link";

export default function PortugalDossierPage() {
  const COUNTRY = "Portugal";
  const SLUG = "portugal";

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
            gap: 16,
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
              whiteSpace: "nowrap",
              background: "transparent",
            }}
          >
            Request Private Advisory Review
          </Link>
        </div>
      </header>

      {/* Body */}
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "28px 20px 80px" }}>
        {/* Back link */}
        <div style={{ marginTop: 6 }}>
          <Link
            href="/countries"
            style={{
              textDecoration: "none",
              color: MUTED,
              fontSize: 13,
              letterSpacing: 0.4,
            }}
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

          <h1
            style={{
              margin: 0,
              fontSize: 56,
              lineHeight: 1.05,
              letterSpacing: -0.6,
            }}
          >
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
            Portugal can be a disciplined European option when you want a calm operational
            environment and clear planning. Its advantage is often a balanced “quality-to-friction”
            profile — but success depends on choosing clinics that communicate well and run
            predictable international workflows.
          </p>
        </section>

        {/* 2-up decision boxes */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 18,
            marginTop: 18,
          }}
        >
          {/* Right choice */}
          <div
            style={{
              background: CARD_BG,
              border: `1px solid ${BORDER}`,
              borderRadius: 18,
              padding: "22px 22px",
              boxShadow: "0 1px 0 rgba(0,0,0,0.02)",
            }}
          >
            <h2 style={{ margin: 0, fontSize: 20, letterSpacing: -0.2 }}>
              When Portugal is the right choice
            </h2>

            <ul style={{ margin: "16px 0 0", paddingLeft: 18, color: "#3A342C", lineHeight: 1.75 }}>
              <li>
                You want a European pathway with <b>balanced planning</b> — good clinical standards without
                aggressive bureaucracy.
              </li>
              <li>
                You value a <b>calmer, more coordinated experience</b> and prefer a “measured” pace.
              </li>
              <li>
                You’re comparing within Europe and want a destination that can be <b>high value when clinic-selected carefully</b>.
              </li>
              <li>
                You want reasonable access and a destination that supports a <b>comfortable recovery environment</b>.
              </li>
            </ul>
          </div>

          {/* Not */}
          <div
            style={{
              background: CARD_BG,
              border: `1px solid ${BORDER}`,
              borderRadius: 18,
              padding: "22px 22px",
              boxShadow: "0 1px 0 rgba(0,0,0,0.02)",
            }}
          >
            <h2 style={{ margin: 0, fontSize: 20, letterSpacing: -0.2 }}>When it’s not</h2>

            <ul style={{ margin: "16px 0 0", paddingLeft: 18, color: "#3A342C", lineHeight: 1.75 }}>
              <li>
                You need the most “industrial-scale” donor ecosystem and want the largest possible system maturity signals (Spain may lead).
              </li>
              <li>
                Your case is highly complex and you want the broadest subspecialist bench and research depth (U.S. top hubs may fit).
              </li>
              <li>
                You want a highly standardized government-level reporting environment as your primary confidence signal.
              </li>
              <li>
                You need maximum speed regardless of clinic load — Portugal can be strong, but timelines vary by clinic.
              </li>
            </ul>
          </div>
        </section>

        {/* Advisory framework */}
        <section style={{ marginTop: 34 }}>
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <h2 style={{ margin: 0, fontSize: 30, letterSpacing: -0.3 }}>
              Advisory framework for {COUNTRY}
            </h2>
            <p
              style={{
                margin: "10px auto 0",
                maxWidth: 820,
                color: MUTED,
                lineHeight: 1.7,
                fontSize: 15,
              }}
            >
              This page is a decision structure. We curate what matters, remove noise, and
              prevent expensive missteps.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 14,
            }}
          >
            {[
              {
                title: "Eligibility & pathway fit",
                text: "Clarify who qualifies, what is realistic for your profile, and where friction typically emerges.",
              },
              {
                title: "Clinic selection signals",
                text: "Assess international workflow maturity, communication quality, and operational reliability.",
              },
              {
                title: "Planning & logistics realism",
                text: "Travel cadence, time-in-country expectations, and practical sequencing to reduce delays.",
              },
            ].map((c) => (
              <div
                key={c.title}
                style={{
                  background: CARD_BG,
                  border: `1px solid ${BORDER}`,
                  borderRadius: 16,
                  padding: 18,
                }}
              >
                <div style={{ fontSize: 16, marginBottom: 8, letterSpacing: -0.2 }}>{c.title}</div>
                <div style={{ color: "#3A342C", lineHeight: 1.7, fontSize: 14 }}>{c.text}</div>
              </div>
            ))}
          </div>
        </section>

        {/* What we exclude */}
        <section style={{ marginTop: 34 }}>
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <h2 style={{ margin: 0, fontSize: 30, letterSpacing: -0.3 }}>
              The “private” filter — what we deliberately exclude
            </h2>
            <p
              style={{
                margin: "10px auto 0",
                maxWidth: 860,
                color: MUTED,
                lineHeight: 1.7,
                fontSize: 15,
              }}
            >
              You are not here for a database. You’re here for clarity.
            </p>
          </div>

          <div
            style={{
              background: CARD_BG,
              border: `1px solid ${BORDER}`,
              borderRadius: 18,
              padding: 22,
            }}
          >
            <ul style={{ margin: 0, paddingLeft: 18, color: "#3A342C", lineHeight: 1.85 }}>
              <li>❌ Exhaustive clinic lists (we curate 4–5, not 400).</li>
              <li>❌ DIY visa/legal step-by-step (we guide strategically, and connect vetted partners where needed).</li>
              <li>❌ Hotel price tables (we recommend a small set of reliable stays when relevant).</li>
              <li>❌ Every treatment detail (we focus on decision points and risk control).</li>
            </ul>
          </div>
        </section>

        {/* Consultation anchor */}
        <section
          id="consultation"
          style={{
            marginTop: 44,
            paddingTop: 22,
            borderTop: `1px solid ${BORDER}`,
          }}
        >
          <div
            style={{
              background: CARD_BG,
              border: `1px solid ${BORDER}`,
              borderRadius: 18,
              padding: 24,
              textAlign: "center",
            }}
          >
            <h2 style={{ margin: 0, fontSize: 28, letterSpacing: -0.2 }}>
              Private advisory review
            </h2>
            <p style={{ margin: "12px auto 0", maxWidth: 820, color: MUTED, lineHeight: 1.7 }}>
              If Portugal is on your shortlist, we’ll assess fit against your profile (timeline, eligibility,
              donor pathway, complexity) and propose a structured next-step plan.
            </p>

            <div style={{ marginTop: 18 }}>
              <Link
                href="/consultation"
                style={{
                  display: "inline-block",
                  textDecoration: "none",
                  border: `1px solid ${GOLD}`,
                  padding: "12px 16px",
                  borderRadius: 999,
                  color: INK,
                  fontSize: 13,
                  letterSpacing: 0.9,
                  textTransform: "uppercase",
                  background: "transparent",
                }}
              >
                Review {COUNTRY} Strategy Privately
              </Link>

              <div style={{ marginTop: 10, fontSize: 13, color: MUTED }}>
                Discreet, structured guidance aligned to your profile and priorities.
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 900px) {
          section[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
          section div[style*="grid-template-columns: repeat(3, 1fr)"] {
            grid-template-columns: 1fr !important;
          }
          h1 { font-size: 40px !important; }
        }
      `}</style>
    </main>
  );
}
