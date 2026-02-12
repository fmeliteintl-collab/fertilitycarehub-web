const COLORS = {
  bg: "#f6f5f2",
  card: "#ffffff",
  text: "#1c1c1c",
  muted: "#545454",
  soft: "#8e8e8e",
  ink: "#121212",
  divider: "rgba(0,0,0,0.06)",
  accent: "#b7a46a",
  dark: "#171717",
  darkMuted: "#cfcfcf",
};

const CONTAINER: React.CSSProperties = {
  maxWidth: 860,
  margin: "0 auto",
};

const SECTION: React.CSSProperties = {
  padding: "68px 20px",
};

const CARD_SECTION: React.CSSProperties = {
  ...SECTION,
  backgroundColor: COLORS.card,
};

const LABEL: React.CSSProperties = {
  fontSize: 11,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: COLORS.soft,
  marginBottom: 16,
};

const H2: React.CSSProperties = {
  fontSize: 24,
  fontWeight: 500,
  margin: "0 0 14px 0",
  color: COLORS.ink,
};

const P: React.CSSProperties = {
  color: COLORS.muted,
  fontSize: 16.5,
  margin: "0 0 18px 0",
};

const UL: React.CSSProperties = {
  margin: "12px 0 0 0",
  paddingLeft: 18,
  color: COLORS.muted,
  fontSize: 16.5,
  lineHeight: 1.9,
};

const DIVIDER: React.CSSProperties = {
  height: 1,
  backgroundColor: COLORS.divider,
  marginTop: 48,
};

export default function SpainPage() {
  return (
    <main
      style={{
        fontFamily: "Georgia, serif",
        backgroundColor: COLORS.bg,
        color: COLORS.text,
        lineHeight: 1.9,
      }}
    >
      {/* HEADER */}
      <section style={{ padding: "130px 20px 80px", textAlign: "center" }}>
        <div style={CONTAINER}>
          <div style={LABEL}>Confidential Jurisdiction Brief</div>

          <h1
            style={{
              fontSize: 48,
              fontWeight: 500,
              margin: 0,
              color: COLORS.ink,
              letterSpacing: "-0.01em",
            }}
          >
            Spain — Fertility Strategy Dossier
          </h1>

          <p
            style={{
              ...P,
              maxWidth: 720,
              margin: "22px auto 0",
            }}
          >
            Strategic intelligence for families evaluating Spain as a
            cross-border reproductive jurisdiction.
          </p>
        </div>
      </section>

      {/* SECTION TEMPLATE */}

      <section style={CARD_SECTION}>
        <div style={CONTAINER}>
          <div style={LABEL}>Section I</div>
          <h2 style={H2}>Executive Positioning</h2>
          <p style={P}>
            Spain occupies a structurally distinct position within European
            fertility regulation. Unlike neighboring jurisdictions that impose
            restrictions on donor frameworks, Spain permits anonymous gamete
            donation under nationally regulated standards.
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

      <section style={SECTION}>
        <div style={CONTAINER}>
          <div style={LABEL}>Section II</div>
          <h2 style={H2}>Regulatory Context Within Europe</h2>
          <p style={P}>
            Anonymous donation materially reduces donor scarcity risk within
            the European framework. Spain’s legislative posture contrasts with
            jurisdictions that have transitioned toward identity disclosure.
          </p>
          <p style={{ ...P, marginBottom: 0 }}>
            Surrogacy is not legally recognized. Families requiring gestational
            pathways must structure arrangements externally.
          </p>
          <div style={DIVIDER} />
        </div>
      </section>

      <section style={CARD_SECTION}>
        <div style={CONTAINER}>
          <div style={LABEL}>Section III</div>
          <h2 style={H2}>Donor Framework Implications</h2>
          <p style={{ ...P, marginBottom: 0 }}>
            Spain’s anonymity model affects long-term disclosure philosophy,
            genetic traceability, and future identity access considerations.
            While operationally efficient, it requires deliberate alignment
            with family governance perspectives.
          </p>
          <div style={DIVIDER} />
        </div>
      </section>

      <section style={SECTION}>
        <div style={CONTAINER}>
          <div style={LABEL}>Section IV</div>
          <h2 style={H2}>Cost Structure in Strategic Context</h2>
          <p style={P}>
            Spain presents a mid-tier global cost profile. IVF cycles typically
            range between €4,000–€7,000. Donor cycles extend higher depending
            on laboratory protocol.
          </p>
          <p style={{ ...P, marginBottom: 0 }}>
            Relative to the United States, Spain may represent cost efficiency.
            Relative to lower-cost jurisdictions, it trades price for European
            regulatory stability.
          </p>
          <div style={DIVIDER} />
        </div>
      </section>

      <section style={CARD_SECTION}>
        <div style={CONTAINER}>
          <div style={LABEL}>Section V</div>
          <h2 style={H2}>Ideal Candidate Profiles</h2>
          <ul style={UL}>
            <li>Families requiring anonymous donor frameworks</li>
            <li>Patients prioritizing European regulatory standards</li>
            <li>Lesbian couples utilizing ROPA structures</li>
            <li>Families seeking reduced donor waiting periods</li>
          </ul>
          <div style={DIVIDER} />
        </div>
      </section>

      <section style={SECTION}>
        <div style={CONTAINER}>
          <div style={LABEL}>Section VI</div>
          <h2 style={H2}>Jurisdictional Limitations</h2>
          <p style={{ ...P, marginBottom: 0 }}>
            Spain is unsuitable for intended parents requiring gestational
            surrogacy within the same jurisdiction. Additionally, open donor
            identity frameworks may require alternative strategy.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: "90px 20px",
          backgroundColor: COLORS.dark,
          textAlign: "center",
        }}
      >
        <div style={CONTAINER}>
          <div style={{ ...LABEL, color: "rgba(255,255,255,0.5)" }}>
            Advisory Engagement
          </div>

          <h2
            style={{
              fontSize: 28,
              fontWeight: 500,
              color: "#ffffff",
              margin: "0 0 14px 0",
            }}
          >
            Schedule Private Advisory Review
          </h2>

          <a
            href="/"
            style={{
              display: "inline-block",
              marginTop: 18,
              padding: "11px 20px",
              borderRadius: 3,
              textDecoration: "none",
              backgroundColor: COLORS.accent,
              color: "#ffffff",
              fontSize: 15,
            }}
          >
            Schedule Private Advisory Review
          </a>
        </div>
      </section>
    </main>
  );
}
