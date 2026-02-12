import Link from "next/link";

export default function GreeceDossier() {
  return (
    <main style={{ maxWidth: 980, margin: "0 auto", padding: "72px 24px" }}>
      <header style={{ marginBottom: 22 }}>
        <div style={{ fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(0,0,0,0.55)" }}>
          Strategic Advisory Dossier
        </div>
        <h1 style={{ fontSize: 44, lineHeight: 1.1, margin: "10px 0 0" }}>Greece</h1>
        <p style={{ marginTop: 14, fontSize: 18, lineHeight: 1.7, color: "rgba(0,0,0,0.72)", maxWidth: 760 }}>
          This dossier is currently in preparation. We are curating the decision-critical elements:
          legal environment, treatment availability, donor frameworks, clinic standards, cost architecture,
          and travel/logistics strategy.
        </p>
      </header>

      <section
        style={{
          marginTop: 26,
          border: "1px solid rgba(0,0,0,0.10)",
          borderRadius: 18,
          padding: 18,
          background: "rgba(255,255,255,0.55)",
        }}
      >
        <h2 style={{ margin: 0, fontSize: 18 }}>Want Greece prioritized?</h2>
        <p style={{ marginTop: 10, marginBottom: 0, color: "rgba(0,0,0,0.72)", lineHeight: 1.7 }}>
          Request a consultation and we’ll fast-track a tailored Greece pathway based on your profile.
        </p>

        <div style={{ marginTop: 14, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link
            href="/consultation#request"
            style={{
              textDecoration: "none",
              padding: "10px 14px",
              borderRadius: 12,
              border: "1px solid #B89B5E",
              background: "rgba(184,155,94,0.12)",
              color: "rgba(0,0,0,0.85)",
            }}
          >
            Request Advisory Consultation
          </Link>

          <Link
            href="/countries"
            style={{ textDecoration: "underline", color: "rgba(0,0,0,0.75)", padding: "10px 0" }}
          >
            Back to countries
          </Link>
        </div>
      </section>
    </main>
  );
}
<section
  style={{
    marginTop: 60,
    paddingTop: 40,
    borderTop: "1px solid rgba(0,0,0,0.08)",
  }}
>
  <h2 style={{ fontSize: 24, marginBottom: 12 }}>
    Strategic Fit Requires Context
  </h2>

  <p style={{ color: "rgba(0,0,0,0.70)", lineHeight: 1.7, maxWidth: 760 }}>
    Jurisdictional selection is rarely about cost alone. It is about legal comfort,
    donor preferences, timeline tolerance, and long-term family structure.
    A structured advisory review ensures Spain aligns with your broader objectives.
  </p>

  <div style={{ marginTop: 24 }}>
    <a
      href="/consultation#request"
      style={{
        display: "inline-block",
        padding: "12px 20px",
        borderRadius: 999,
        border: "1px solid #B89B5E",
        textDecoration: "none",
        color: "#2B2B2B",
        fontWeight: 500,
        letterSpacing: "0.02em",
      }}
    >
      Review Greece Strategy Privately
    </a>

    <p style={{ marginTop: 10, fontSize: 14, color: "rgba(0,0,0,0.55)" }}>
      Discreet, structured guidance aligned to your profile and timeline.
    </p>
  </div>
</section>
