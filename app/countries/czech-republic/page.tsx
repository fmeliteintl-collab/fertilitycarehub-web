import Link from "next/link";

export default function CzechRepublicDossier() {
  const COUNTRY = "Czech Republic";
  const SLUG = "czech-republic";

  return (
    <main
      style={{
        background: "#F5F1E8",
        color: "#1A1A1A",
        minHeight: "100vh",
        fontFamily:
          'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
      }}
    >
      {/* Header */}
      <header
        style={{
          width: "100%",
          borderBottom: "1px solid #E5DDC8",
          background: "#F5F1E8",
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
              color: "#1A1A1A",
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
              border: "1px solid #B89B5E",
              color: "#1A1A1A",
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
              color: "#6A6256",
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
              color: "#6A6256",
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
            The Czech Republic is a disciplined, clinic-structured Central Europe option.
            Its strength is predictability: clear clinic pathways, reliable scheduling signals,
            and a pragmatic operational culture — making it a strong fit when you want order,
            not ambiguity.
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
              background: "#FBFAF7",
              border: "1px solid #E5DDC8",
              borderRadius: 18,
              padding: "22px 22px",
              boxShadow: "0 1px 0 rgba(0,0,0,0.02)",
            }}
          >
            <h2 style={{ margin: 0, fontSize: 20, letterSpacing: -0.2 }}>
              When the Czech Republic is the right choice
            </h2>

            <ul style={{ margin: "16px 0 0", paddingLeft: 18, color: "#3A342C", lineHeight: 1.75 }}>
              <li>
                You want a <b>structured clinic model</b> with clear steps and practical onboarding.
              </li>
              <li>
                You prefer <b>predictable logistics</b> — planning trips and timelines with fewer moving parts.
              </li>
              <li>
                You value a <b>pragmatic, process-driven approach</b> over marketing-heavy “luxury” positioning.
              </li>
              <li>
                You want <b>strong comparative value</b> while still operating inside an established EU medical ecosystem.
              </li>
            </ul>
          </div>

          {/* Not */}
          <div
            style={{
              background: "#FBFAF7",
              border: "1px solid #E5DDC8",
              borderRadius: 18,
              padding: "22px 22px",
              boxShadow: "0 1px 0 rgba(0,0,0,0.02)",
            }}
          >
            <h2 style={{ margin: 0, fontSize: 20, letterSpacing: -0.2 }}>When it’s not</h2>

            <ul style={{ margin: "16px 0 0", paddingLeft: 18, color: "#3A342C", lineHeight: 1.75 }}>
              <li>
                You require the <b>most permissive</b> access profiles across Europe (you may prefer Spain).
              </li>
              <li>
                Your case depends on <b>niche, highly bespoke protocols</b> where you need multiple elite centres to compare.
              </li>
              <li>
                You want a destination with <b>maximum global prestige signaling</b> (you may prefer U.S. top-tier hubs).
              </li>
              <li>
                You need a pathway that is extremely fast regardless of clinic capacity constraints.
              </li>
            </ul>
          </div>
        </section>

        {/* Framework */}
        <section style={{ marginTop: 34 }}>
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <h2 style={{ margin: 0, fontSize: 30, letterSpacing: -0.3 }}>
              Advisory framework for {COUNTRY}
            </h2>
            <p
              style={{
                margin: "10px auto 0",
                maxWidth: 820,
                color: "#6A6256",
                lineHeight: 1.7,
                fontSize: 15,
              }}
            >
              The purpose of this page is not “everything” — it’s the decision structure that prevents expensive missteps.
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
                title: "Regulatory posture",
                text: "Clarify who qualifies, what the pathway permits, and what is realistically navigable without surprises.",
              },
              {
                title: "Clinic pathway clarity",
                text: "Assess intake friction, cycle scheduling predictability, and communication quality — the real operational risk.",
              },
              {
                title: "Cost logic & planning",
                text: "Understand total cost structure (treatment + travel + buffers) and avoid false ‘cheap’ signals.",
              },
            ].map((c) => (
              <div
                key={c.title}
                style={{
                  background: "#FBFAF7",
                  border: "1px solid #E5DDC8",
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

        {/* Vetted options */}
        <section style={{ marginTop: 34 }}>
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <h2 style={{ margin: 0, fontSize: 30, letterSpacing: -0.3 }}>
              What we deliberately exclude
            </h2>
            <p
              style={{
                margin: "10px auto 0",
                maxWidth: 860,
                color: "#6A6256",
                lineHeight: 1.7,
                fontSize: 15,
              }}
            >
              This is a private advisory posture — we don’t publish exhaustive lists. We curate what matters.
            </p>
          </div>

          <div
            style={{
              background: "#FBFAF7",
              border: "1px solid #E5DDC8",
              borderRadius: 18,
              padding: 22,
            }}
          >
            <ul style={{ margin: 0, paddingLeft: 18, color: "#3A342C", lineHeight: 1.85 }}>
              <li>❌ Exhaustive clinic directories (we curate a short list, not 300+).</li>
              <li>❌ DIY visa/legal step-by-step (we guide and connect vetted partners if needed).</li>
              <li>❌ Hotel price tables (we recommend a small set of reliable options when relevant).</li>
              <li>❌ Every treatment detail (we focus on strategic decisions and risk control).</li>
            </ul>
          </div>
        </section>

        {/* Consultation anchor */}
        <section
          id="consultation"
          style={{
            marginTop: 44,
            paddingTop: 22,
            borderTop: "1px solid #E5DDC8",
          }}
        >
          <div
            style={{
              background: "#FBFAF7",
              border: "1px solid #E5DDC8",
              borderRadius: 18,
              padding: 24,
              textAlign: "center",
            }}
          >
            <h2 style={{ margin: 0, fontSize: 28, letterSpacing: -0.2 }}>
              Private advisory review
            </h2>
            <p style={{ margin: "12px auto 0", maxWidth: 820, color: "#6A6256", lineHeight: 1.7 }}>
              If you want this assessed against your profile (timeline, eligibility, donor pathway, complexity),
              we’ll review your options privately and propose a structured next-step plan.
            </p>

            <div style={{ marginTop: 18 }}>
              <Link
                href="/consultation"
                style={{
                  display: "inline-block",
                  textDecoration: "none",
                  border: "1px solid #B89B5E",
                  padding: "12px 16px",
                  borderRadius: 999,
                  color: "#1A1A1A",
                  fontSize: 13,
                  letterSpacing: 0.9,
                  textTransform: "uppercase",
                  background: "transparent",
                }}
              >
                Review {COUNTRY} Strategy Privately
              </Link>

              <div style={{ marginTop: 10, fontSize: 13, color: "#6A6256" }}>
                Discreet, structured guidance aligned to your profile and priorities.
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Responsive fallback */}
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
