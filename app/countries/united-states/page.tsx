import Link from "next/link";

export default function UnitedStatesDossierPage() {
  const COUNTRY = "United States";
  const SLUG = "united-states";

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
              maxWidth: 880,
              fontSize: 18,
              lineHeight: 1.7,
              color: "#3A342C",
            }}
          >
            The United States is the premium benchmark market: deep clinical specialization, advanced labs,
            and the broadest range of protocols — but it’s not one “system.” Strategy depends on selecting
            the right hub, the right clinic, and (when relevant) the right legal environment.
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
              When the United States is the right choice
            </h2>

            <ul style={{ margin: "16px 0 0", paddingLeft: 18, color: "#3A342C", lineHeight: 1.75 }}>
              <li>
                You want the <b>deepest bench</b> for complex cases and access to leading protocols and subspecialists.
              </li>
              <li>
                You prioritize <b>lab sophistication</b>, advanced testing options, and a wide range of clinical approaches.
              </li>
              <li>
                You value <b>maximum legal clarity</b> in specific contexts (e.g., state frameworks), and are willing to plan precisely.
              </li>
              <li>
                You want strong infrastructure for international coordination, premium care pathways, and specialized support services.
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
                Your primary constraint is cost — the U.S. is typically premium-priced even before travel and add-ons.
              </li>
              <li>
                You want a single, standardized national model — the U.S. varies significantly by clinic, state, and care pathway.
              </li>
              <li>
                You want a “set-and-forget” experience without careful clinic selection and coordination planning.
              </li>
              <li>
                You prefer shorter decision cycles; the U.S. often involves higher diligence expectations and higher documentation load.
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
                maxWidth: 860,
                color: MUTED,
                lineHeight: 1.7,
                fontSize: 15,
              }}
            >
              In the U.S., the strategy is not “pick the best clinic.” It’s: pick the right clinical ecosystem for your profile,
              then select the right clinic within that ecosystem.
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
                title: "Hub + clinic selection",
                text: "Choose the right city/clinic ecosystem for your case complexity, lab needs, and international coordination requirements.",
              },
              {
                title: "Protocol fit & lab strategy",
                text: "Match protocols and lab capabilities to your profile (age, diagnosis, prior cycles). Avoid generic pathway selection.",
              },
              {
                title: "Cost & timing realism",
                text: "Total planning includes cycle cost, medications, add-ons, and buffers. Timelines often depend on clinic scheduling cadence.",
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
              The U.S. has endless data. We don’t publish encyclopedias — we build decision clarity.
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
              <li>❌ State-by-state clinic directories (we shortlist based on your case profile).</li>
              <li>❌ Pricing tables pretending to be exact (we structure cost planning ranges and hidden add-ons).</li>
              <li>❌ Overwhelming success-rate dashboards (we interpret the signal relative to your profile).</li>
              <li>❌ “Book now” sales language (this is an advisory posture, not a marketplace pitch).</li>
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
            <p style={{ margin: "12px auto 0", maxWidth: 860, color: MUTED, lineHeight: 1.7 }}>
              If the United States is on your shortlist, we’ll assess fit against your profile (complexity, prior cycles,
              lab strategy, timeline) and propose a structured plan — including recommended hubs and a curated shortlist.
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
