import Link from "next/link";

export default function MexicoDossierPage() {
  const COUNTRY = "Mexico";
  const SLUG = "mexico";

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
            Mexico is often a high-value option when you want proximity to North America, a broad
            range of clinic offerings, and a faster operational cadence — but outcomes depend on
            clinic selection discipline. The strategic edge is speed and access; the risk is variability.
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
              When Mexico is the right choice
            </h2>

            <ul style={{ margin: "16px 0 0", paddingLeft: 18, color: "#3A342C", lineHeight: 1.75 }}>
              <li>
                You want a <b>North America-adjacent</b> destination that reduces travel friction and supports faster scheduling.
              </li>
              <li>
                You value <b>speed and access</b> and you’re willing to vet clinics carefully for lab quality and process integrity.
              </li>
              <li>
                You want a pathway that can be <b>cost-efficient</b> while still maintaining high standards in top-tier centres.
              </li>
              <li>
                You prefer practical coordination and are open to selecting a city based on clinic fit (not tourism).
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
                You want the highest possible concentration of publicly reported outcome metrics as your main confidence signal.
              </li>
              <li>
                You prefer a jurisdiction where regulation and governance are the dominant trust driver rather than clinic-level verification.
              </li>
              <li>
                You want a “set-and-forget” path with no diligence — Mexico rewards selection discipline.
              </li>
              <li>
                You are extremely risk-averse to variability in operational standards between clinics.
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
              Mexico’s upside is operational momentum. Your job is to keep that momentum while controlling clinic selection risk.
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
                title: "Clinic selection discipline",
                text: "Lab quality, embryology leadership, and international workflow maturity matter more here than “brand” alone.",
              },
              {
                title: "Cost structure transparency",
                text: "Clarify what’s bundled vs. variable: monitoring, medications, lab add-ons, and re-visit costs.",
              },
              {
                title: "Logistics realism",
                text: "Plan time-in-country and travel cadence carefully to avoid delays and avoid compressing critical monitoring windows.",
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
              We keep this advisory-first. Data is backend intelligence — not front-end overwhelm.
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
              <li>❌ Exhaustive clinic lists (we curate a shortlist based on fit).</li>
              <li>❌ DIY legal/visa instructions (we guide strategically and connect vetted support if needed).</li>
              <li>❌ Hotel price spreadsheets (we recommend 2–3 stays that fit the medical traveler profile).</li>
              <li>❌ Every procedure detail (we focus on the decision architecture and risk control).</li>
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
              If Mexico is on your shortlist, we’ll assess pathway fit against your profile (timeline,
              eligibility, complexity, donor needs) and propose a structured plan.
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
