import Link from "next/link";

export default function GreeceDossierPage() {
  const PAGE_BG = "#F5F1E8";
  const INK = "#1A1A1A";
  const MUTED = "#5F5F5F";
  const GOLD = "#B89B5E";
  const BORDER = "#E5DDC8";
  const CARD_BG = "rgba(255,255,255,0.55)";

  const container: React.CSSProperties = {
    maxWidth: 1120,
    margin: "0 auto",
    padding: "40px 24px 80px",
  };

  const topRow: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    marginBottom: 28,
  };

  const backLink: React.CSSProperties = {
    color: GOLD,
    textDecoration: "none",
    fontSize: 14,
    letterSpacing: 0.2,
  };

  const ctaBtn: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px 16px",
    border: `1px solid ${GOLD}`,
    borderRadius: 999,
    color: INK,
    background: "transparent",
    textDecoration: "none",
    fontSize: 13,
    letterSpacing: 0.2,
    whiteSpace: "nowrap",
  };

  const label: React.CSSProperties = {
    fontSize: 12,
    letterSpacing: 2.2,
    color: MUTED,
    textTransform: "uppercase",
    marginBottom: 12,
  };

  const h1: React.CSSProperties = {
    fontSize: 56,
    lineHeight: 1.05,
    letterSpacing: -0.8,
    margin: 0,
    color: INK,
  };

  const intro: React.CSSProperties = {
    maxWidth: 820,
    marginTop: 18,
    fontSize: 18,
    lineHeight: 1.7,
    color: "#2A2A2A",
  };

  const grid: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: 18,
    marginTop: 34,
  };

  const twoCol: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: 18,
    marginTop: 18,
  };

  const card: React.CSSProperties = {
    background: CARD_BG,
    border: `1px solid ${BORDER}`,
    borderRadius: 18,
    padding: "22px 22px",
  };

  const cardTitle: React.CSSProperties = {
    margin: 0,
    marginBottom: 12,
    fontSize: 18,
    letterSpacing: -0.2,
    color: INK,
  };

  const ul: React.CSSProperties = {
    margin: 0,
    paddingLeft: 18,
    color: "#2A2A2A",
    lineHeight: 1.8,
    fontSize: 15.5,
  };

  const sectionTitle: React.CSSProperties = {
    margin: 0,
    marginTop: 34,
    marginBottom: 10,
    fontSize: 22,
    letterSpacing: -0.3,
    color: INK,
  };

  const small: React.CSSProperties = {
    marginTop: 10,
    fontSize: 13,
    color: "#6A6A6A",
    lineHeight: 1.65,
  };

  const divider: React.CSSProperties = {
    height: 1,
    background: BORDER,
    marginTop: 34,
  };

  return (
    <main style={{ background: PAGE_BG, color: INK, minHeight: "100vh" }}>
      <div style={container}>
        {/* Top navigation */}
        <div style={topRow}>
          <Link href="/countries" style={backLink}>
            ← Back to countries
          </Link>

          <Link href="/consultation" style={ctaBtn}>
            Review Greece Strategy Privately
          </Link>
        </div>

        {/* Header */}
        <div style={{ textAlign: "center", paddingTop: 12 }}>
          <div style={label}>Strategic advisory dossier</div>
          <h1 style={h1}>Greece</h1>

          <p style={intro}>
            Greece can be a high-value European pathway when you want cost discipline without
            abandoning EU-grade clinic expectations. The tradeoff is variability: standards differ
            by clinic, and donor/surrogacy planning requires precision. This dossier clarifies when
            Greece is strategically strong, when it isn’t, and how to vet it properly.
          </p>
        </div>

        {/* Core decision cards */}
        <div style={twoCol}>
          <div style={card}>
            <h2 style={cardTitle}>When Greece is the right choice</h2>
            <ul style={ul}>
              <li>
                You want a European option with stronger affordability, while still targeting
                modern labs and experienced international clinics.
              </li>
              <li>
                You value flexible donor pathways and are willing to choose a clinic based on
                specific lab quality signals, not marketing.
              </li>
              <li>
                You are planning with a defined budget ceiling and want transparency on what is
                included vs. add-on costs.
              </li>
              <li>
                You can commit to a structured clinic-selection process (shortlist, verification,
                and disciplined comparisons).
              </li>
            </ul>
          </div>

          <div style={card}>
            <h2 style={cardTitle}>When it’s not</h2>
            <ul style={ul}>
              <li>
                You need “best-in-world” breadth across complex cases and want the deepest bench of
                subspecialists.
              </li>
              <li>
                You prefer a jurisdiction where public reporting and governance are the primary
                confidence signal (rather than clinic-level verification).
              </li>
              <li>
                You want a highly standardized experience without spending time on vetting and
                comparative diligence.
              </li>
              <li>
                You have a low tolerance for administrative friction across translations, paperwork,
                and coordination.
              </li>
            </ul>
          </div>
        </div>

        {/* What matters most */}
        <h3 style={sectionTitle}>What matters most in Greece</h3>
        <div style={grid}>
          <div style={card}>
            <h2 style={cardTitle}>The “private” filter (what we focus on)</h2>
            <ul style={ul}>
              <li>
                Clinic selection is the main risk reducer: lab maturity, embryology leadership, and
                international patient process quality.
              </li>
              <li>
                Donor pathway clarity: what is permitted, what is typical, and what varies by clinic.
              </li>
              <li>
                Cost structure transparency: what’s bundled, what’s variable, and what usually surprises
                families.
              </li>
              <li>
                Logistics realism: time in-country, sequencing, and where delays happen (and how to
                avoid them).
              </li>
            </ul>
          </div>

          <div style={card}>
            <h2 style={cardTitle}>Common failure modes (avoid these)</h2>
            <ul style={ul}>
              <li>Choosing based on price or marketing rather than lab signals.</li>
              <li>Assuming all clinics operate at the same standard level.</li>
              <li>Underestimating coordination: medication timing, travel cadence, and admin steps.</li>
              <li>Letting the pathway be designed “for you” instead of building a strategic plan first.</li>
            </ul>
          </div>
        </div>

        {/* CTA block */}
        <div style={divider} />

        <section style={{ marginTop: 34 }}>
          <div style={{ ...card, textAlign: "center", padding: "26px 22px" }}>
            <div style={label}>Private advisory</div>
            <div style={{ fontSize: 20, letterSpacing: -0.2 }}>
              If Greece is on your shortlist, the decision is mostly about <b>clinic selection</b> and{" "}
              <b>pathway fit</b>.
            </div>

            <div style={{ marginTop: 18 }}>
              <Link href="/consultation" style={ctaBtn}>
                Review Greece Strategy Privately
              </Link>
            </div>

            <div style={small}>
              Discreet, structured guidance aligned to your profile — not a public database.
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
