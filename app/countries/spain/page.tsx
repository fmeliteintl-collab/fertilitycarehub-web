const COLORS = {
  bg: "#f5f4f1",
  card: "#ffffff",
  text: "#1e1e1e",
  muted: "#5b5b5b",
  soft: "#8a8a8a",
  ink: "#161616",
  divider: "rgba(0,0,0,0.08)",
  accent: "#b8a77a",
  dark: "#1e1e1e",
  darkMuted: "#c9c9c9",
};

const CONTAINER: React.CSSProperties = {
  maxWidth: 920,
  margin: "0 auto",
};

const SECTION: React.CSSProperties = {
  padding: "72px 20px",
};

const CARD_SECTION: React.CSSProperties = {
  ...SECTION,
  backgroundColor: COLORS.card,
};

const LABEL: React.CSSProperties = {
  fontSize: 12,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: COLORS.soft,
  marginBottom: 14,
};

const H2: React.CSSProperties = {
  fontSize: 26,
  fontWeight: 500,
  margin: "0 0 14px 0",
  color: COLORS.ink,
};

const P: React.CSSProperties = {
  color: COLORS.muted,
  fontSize: 17,
  margin: "0 0 16px 0",
};

const UL: React.CSSProperties = {
  margin: "12px 0 0 0",
  paddingLeft: 18,
  color: COLORS.muted,
  fontSize: 17,
  lineHeight: 1.85,
};

const DIVIDER: React.CSSProperties = {
  height: 1,
  backgroundColor: COLORS.divider,
  marginTop: 44,
};

export default function SpainPage() {
  return (
    <main
      style={{
        fontFamily: "Georgia, serif",
        backgroundColor: COLORS.bg,
        color: COLORS.text,
        lineHeight: 1.85,
      }}
    >
      {/* CONFIDENTIAL HEADER */}
      <section style={{ padding: "120px 20px 70px", textAlign: "center" }}>
        <div style={{ ...CONTAINER, maxWidth: 960 }}>
          <div style={LABEL}>Confidential • Jurisdiction Brief</div>
          <h1 style={{ fontSize: 46, fontWeight: 500, margin: 0, color: COLORS.ink }}>
            Spain — Fertility Jurisdiction Dossier
          </h1>
          <p style={{ ...P, maxWidth: 760, margin: "18px auto 0" }}>
            A strategic intelligence briefing for families evaluating Spain as a
            cross-border reproductive jurisdiction.
          </p>
        </div>
      </section>

      {/* EXECUTIVE POSITIONING */}
      <section style={CARD_SECTION}>
        <div style={CONTAINER}>
          <div style={LABEL}>Section 01</div>
          <h2 style={H2}>Executive Positioning</h2>
          <p style={P}>
            Spain occupies a structurally distinct position within European
            fertility regulation. Unlike neighboring jurisdictions that impose
            restrictions on donor frameworks, Spain permits anonymous egg and
            sperm donation under nationally regulated standards.
          </p>
          <p style={{ ...P, marginBottom: 0 }}>
            This regulatory permissiveness — combined with advanced laboratory
            infrastructure and established cross-border patient pathways —
            creates measurable strategic advantages for specific patient
            profiles.
          </p>
          <div style={DIVIDER} />
        </div>
      </section>

      {/* REGULATORY CONTEXT */}
      <section style={SECTION}>
        <div style={CONTAINER}>
          <div style={LABEL}>Section 02</div>
          <h2 style={H2}>Regulatory Context Within Europe</h2>
          <p style={P}>
            Spain permits anonymous gamete donation, a position increasingly
            uncommon within the European Union. For intended parents prioritizing
            confidentiality or desiring broad donor availability, this asymmetry
            materially reduces scarcity risk.
          </p>
          <p style={{ ...P, marginBottom: 0 }}>
            Surrogacy is not legally recognized within Spain. Families requiring
            gestational pathways must structure arrangements in alternative
            jurisdictions.
          </p>
          <div style={DIVIDER} />
        </div>
      </section>

      {/* DONOR FRAMEWORK */}
      <section style={CARD_SECTION}>
        <div style={CONTAINER}>
          <div style={LABEL}>Section 03</div>
          <h2 style={H2}>Donor Framework Implications</h2>
          <p style={{ ...P, marginBottom: 0 }}>
            Anonymous donation materially affects long-term considerations related
            to identity disclosure, genetic history access, and cross-border
            recognition frameworks. While Spain’s model enhances operational
            efficiency and donor availability, families should evaluate future
            disclosure philosophies within their home jurisdiction.
          </p>
          <div style={DIVIDER} />
        </div>
      </section>

      {/* COST INTERPRETATION */}
      <section style={SECTION}>
        <div style={CONTAINER}>
          <div style={LABEL}>Section 04</div>
          <h2 style={H2}>Cost Structure in Strategic Context</h2>
          <p style={P}>
            Spain typically presents a mid-tier cost profile within global
            fertility markets. IVF cycles commonly range between €4,000–€7,000,
            with donor cycles extending higher depending on laboratory and
            genetic protocols.
          </p>
          <p style={{ ...P, marginBottom: 0 }}>
            Relative to the United States, Spain may represent material cost
            efficiency. Relative to lower-cost jurisdictions such as India or
            Turkey, Spain trades price advantage for European regulatory
            stability and infrastructure consistency.
          </p>
          <div style={DIVIDER} />
        </div>
      </section>

      {/* IDEAL PROFILE */}
      <section style={CARD_SECTION}>
        <div style={CONTAINER}>
          <div style={LABEL}>Section 05</div>
          <h2 style={H2}>Ideal Candidate Profiles</h2>
          <p style={P}>Spain is particularly suitable for:</p>
          <ul style={UL}>
            <li>Intended parents requiring anonymous donor frameworks</li>
            <li>Patients prioritizing European regulatory standards</li>
            <li>Lesbian couples seeking ROPA treatment structures</li>
            <li>Families desiring reduced donor waiting periods</li>
          </ul>
          <div style={DIVIDER} />
        </div>
      </section>

      {/* LIMITATIONS */}
      <section style={SECTION}>
        <div style={CONTAINER}>
          <div style={LABEL}>Section 06</div>
          <h2 style={H2}>Jurisdictional Limitations</h2>
          <p style={{ ...P, marginBottom: 0 }}>
            Spain is not suitable for intended parents requiring gestational
            surrogacy within the same jurisdiction. Additionally, families who
            prioritize open donor identity models may find regulatory misalignment.
          </p>
          <div style={DIVIDER} />
        </div>
      </section>

      {/* OPERATIONAL CONSIDERATIONS */}
      <section style={CARD_SECTION}>
        <div style={CONTAINER}>
          <div style={LABEL}>Section 07</div>
          <h2 style={H2}>Operational Considerations</h2>
          <p style={P}>
            Most IVF treatment cycles require a 7–14 day presence during
            stimulation and transfer phases. Major clinical hubs — including
            Barcelona and Madrid — offer strong transport connectivity and
            established medical accommodation infrastructure.
          </p>
          <p style={{ ...P, marginBottom: 0 }}>
            Strategic planning should consider transfer timing, embryo storage
            frameworks, and post-transfer follow-up within the patient’s home
            jurisdiction.
          </p>
        </div>
      </section>

      {/* ADVISORY INVITATION */}
      <section
        style={{
          padding: "96px 20px",
          backgroundColor: COLORS.dark,
          color: "#ffffff",
          textAlign: "center",
        }}
      >
        <div style={{ ...CONTAINER, maxWidth: 820 }}>
          <div style={{ ...LABEL, color: "rgba(255,255,255,0.55)" }}>Next Step</div>
          <h2 style={{ fontSize: 30, fontWeight: 500, margin: "0 0 12px 0" }}>
            Schedule Private Advisory Review
          </h2>
          <p style={{ margin: 0, color: COLORS.darkMuted, fontSize: 16 }}>
            For families requiring structured cross-border fertility strategy in Spain.
          </p>

          <div style={{ marginTop: 26 }}>
            <a
              href="/"
              style={{
                display: "inline-block",
                padding: "12px 22px",
                borderRadius: 4,
                textDecoration: "none",
                backgroundColor: COLORS.accent,
                color: "#ffffff",
              }}
            >
              Schedule Private Advisory Review
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
