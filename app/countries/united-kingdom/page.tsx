import Link from "next/link";

export default function UnitedKingdomDossier() {
  return (
    <main style={{ maxWidth: 980, margin: "0 auto", padding: "72px 24px" }}>
      <div style={{ fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(0,0,0,0.55)" }}>
        Strategic Advisory Dossier
      </div>

      <h1 style={{ fontSize: 44, lineHeight: 1.1, margin: "10px 0 0" }}>
        United Kingdom
      </h1>

      <p style={{ marginTop: 14, fontSize: 18, lineHeight: 1.7, color: "rgba(0,0,0,0.72)", maxWidth: 760 }}>
        This dossier is in preparation. The UK is a governance-forward jurisdiction with a highly regulated framework (HFEA),
        and it requires strategy-level clarity on eligibility, donor rules, timelines, and private vs NHS pathways.
      </p>

      <section
        style={{
          marginTop: 26,
          border: "1px solid rgba(0,0,0,0.10)",
          borderRadius: 18,
          padding: 18,
          background: "rgba(255,255,255,0.55)",
        }}
      >
        <h2 style={{ margin: 0, fontSize: 18 }}>Want the UK dossier prioritized?</h2>
        <p style={{ marginTop: 10, marginBottom: 0, color: "rgba(0,0,0,0.72)", lineHeight: 1.7 }}>
          Request a consultation and we’ll fast-track a UK pathway based on your profile and constraints.
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
