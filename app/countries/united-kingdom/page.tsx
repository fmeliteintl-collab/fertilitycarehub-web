import Link from "next/link";

export default function UnitedKingdomDossierPage() {
  const COUNTRY = "United Kingdom";
  const SLUG = "united-kingdom";

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
            The UK is a regulation-forward environment with a strong patient safety culture and a
            centralized quality signal through the HFEA. Its strategic strength is governance and
            structured oversight — the tradeoff is variability in access and timing depending on pathway.
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
              When the UK is the right choice
            </h2>

            <ul style={{ margin: "16px 0 0", paddingLeft: 18, color: "#3A342C", lineHeight: 1.75 }}>
              <li>
                You want a jurisdiction where <b>regulatory structure</b> is a major trust signal (HFEA oversight).
              </li>
              <li>
                You value a <b>patient safety-forward</b> culture and clear clinic accountability standards.
              </li>
              <li>
                You prefer a pathway that feels <b>methodical and governed</b>, even if it’s not the fastest option.
              </li>
              <li>
                You want strong clinical capability and an English-first environment, with broad access to private clinics.
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
                Your top priority is fastest access with minimal waiting time — UK timelines can vary.
              </li>
              <li>
                You want a “most permissive in Europe” posture; some profiles may find better fit elsewhere.
              </li>
              <li>
                Cost sensitivity is dominant — the UK is often mid-to-high priced relative to some European alternatives.
              </li>
              <li>
                You want an advisory experience without friction; the UK’s strength is structure, which can feel procedural.
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
              In the UK, the main question isn’t “is it good?” — it’s “is it the correct regulatory-and-access tradeoff for your profile?”
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
                title: "Governance advantage",
                text: "Use the UK’s regulatory posture as a trust anchor — but interpret clinic-level differences carefully.",
              },
              {
                title: "Access & timing reality",
                text: "Plan for timeline variability and choose pathways that match urgency and travel cadence.",
              },
              {
                title: "Clinic selection criteria",
                text: "Prioritize communication clarity, lab capability, and process maturity for international coordination.",
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
              We don’t replicate public directories. We interpret and curate.
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
              <li>❌ Full HFEA tables (we interpret what matters for your profile instead of overwhelming).</li>
              <li>❌ Every clinic in every city (we shortlist based on fit, not geography).</li>
              <li>❌ “Best clinic” claims (we align strategy to your case, timeline, and risk profile).</li>
              <li>❌ Mass-market booking language (this is discreet advisory, not a marketplace pitch).</li>
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
              If the UK is on your shortlist, we’ll assess fit against your profile (timing, pathway, clinic selection,
              and governance tradeoffs) and propose a structured plan.
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
