"use client";
import { useState, type FormEvent } from "react";
import Link from "next/link";
export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");

  async function onJoinList(e: FormEvent<HTMLFormElement>)  {
    e.preventDefault();
    setStatus("loading");

    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      setEmail("");
      setStatus("ok");
    } else {
      setStatus("error");
    }
  }
  return (
    <main
      style={{
        fontFamily: "Georgia, serif",
        backgroundColor: "#f8f6f2",
        color: "#2b2b2b",
        lineHeight: 1.6,
      }}
    >
      {/* HERO */}
      <section
        style={{
          padding: "120px 20px 70px",
          textAlign: "center",
          maxWidth: "980px",
          margin: "0 auto",
        }}
      >
<h1
  style={{
    fontSize: "42px",
    fontWeight: 500,
    marginBottom: "20px",
    letterSpacing: "0.2px",
  }}
>
  Private Global Fertility Strategy Advisory
  <br />
  Discretion. Clarity. Cross-Border Direction.
</h1>

        <p style={{ fontSize: "18px", color: "#5a5a5a" }}>
  Strategic jurisdiction assessment and clinical alignment for individuals and families navigating cross-border reproductive care.
</p>

        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
  <Link
    href="/consultation"
    style={{
      padding: "12px 26px",
      backgroundColor: "#b8a77a",
      color: "#ffffff",
      borderRadius: "4px",
      textDecoration: "none",
      display: "inline-block",
    }}
  >
    Request Private Strategy Consultation
  </Link>
  <Link
    href="/countries"
    style={{
      padding: "12px 26px",
      backgroundColor: "transparent",
      border: "1px solid #b8a77a",
      color: "#b8a77a",
      borderRadius: "4px",
      textDecoration: "none",
      display: "inline-block",
    }}
  >
    Explore International Pathways
  </Link>
</div>

        {/* Credibility strip */}
        <div
          style={{
            marginTop: "36px",
            fontSize: "12px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#7a7a7a",
          }}
        >
          Structured Analysis Across 30+ Jurisdictions • Legal &amp; Clinical Intelligence • Cross-Border Strategic Advisory
        </div>
      </section>

      {/* POSITIONING */}
      <section
        style={{
          padding: "90px 20px",
          backgroundColor: "#ffffff",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "28px", marginBottom: "18px" }}>
            High-Stakes Decisions Require Structured Guidance
          </h2>

          <p style={{ color: "#555", marginBottom: 14 }}>
            Fertility treatment is one of the most emotionally and financially significant decisions a family will make.
            Legal environments differ. Donor anonymity regulations vary. Cost transparency is inconsistent. Success
            reporting standards are not universal.
          </p>

          <p style={{ color: "#555" }}>
            FertilityCareHub provides structured, independent global analysis — allowing families to make informed
            decisions across jurisdictions with clarity and confidence.
          </p>
        </div>
      </section>

      {/* FRAMEWORK */}
      <section style={{ padding: "100px 20px", textAlign: "center" }}>
        <div style={{ maxWidth: "1050px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "28px", marginBottom: "58px" }}>
            Our Global Advisory Framework
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "42px",
              textAlign: "left",
            }}
          >
            <div style={{ background: "#ffffff", padding: 26, borderRadius: 6 }}>
              <h3 style={{ marginTop: 0 }}>Country Intelligence</h3>
              <p style={{ color: "#555", marginBottom: 0 }}>
                Legal frameworks, storage regulations, donor eligibility policies,
                treatment access rules, and citizenship implications.
              </p>
            </div>

            <div style={{ background: "#ffffff", padding: 26, borderRadius: 6 }}>
              <h3 style={{ marginTop: 0 }}>Clinic Standards Insight</h3>
              <p style={{ color: "#555", marginBottom: 0 }}>
                Accreditation clarity, laboratory benchmarks, embryology standards,
                and transparency in outcome reporting.
              </p>
            </div>

            <div style={{ background: "#ffffff", padding: 26, borderRadius: 6 }}>
              <h3 style={{ marginTop: 0 }}>Strategic Fertility Planning</h3>
              <p style={{ color: "#555", marginBottom: 0 }}>
                Cross-border pathway mapping, jurisdictional risk assessment,
                cost structure evaluation, and confidential advisory planning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section style={{ padding: "90px 20px", backgroundColor: "#ffffff" }}>
        <div style={{ maxWidth: "980px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "28px", marginBottom: 18, textAlign: "center" }}>
            Who We Serve
          </h2>

          <div style={{ maxWidth: 760, margin: "0 auto", color: "#555" }}>
            <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.9 }}>
              <li>Families navigating international IVF</li>
              <li>Intended parents exploring donor or surrogacy pathways</li>
              <li>Professionals requiring structured cross-border clarity</li>
              <li>Individuals comparing treatment jurisdictions globally</li>
            </ul>
          </div>
        </div>
      </section>

      {/* DIFFERENTIATION */}
      <section style={{ padding: "100px 20px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "28px", marginBottom: 18 }}>
            Independent. Structured. Confidential.
          </h2>

          <p style={{ color: "#555", marginBottom: 14 }}>
            Unlike promotional clinic directories or commission-driven ranking platforms, FertilityCareHub provides
            structured global fertility strategy grounded in regulatory, clinical, and cost intelligence.
          </p>

          <p style={{ color: "#555", marginBottom: 0 }}>
            No bias. No rankings. No hidden incentives.
          </p>
        </div>
      </section>

      {/* PRIVATE STRATEGY CTA */}
      <section
        style={{
          padding: "95px 20px",
          backgroundColor: "#2b2b2b",
          color: "#ffffff",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <h2 style={{ marginBottom: "16px" }}>
            Private Fertility Strategy Consultation
          </h2>

          <p style={{ marginBottom: "14px", color: "#d4d4d4" }}>
            For families requiring structured, confidential global fertility guidance across jurisdictions.
          </p>

          <p style={{ marginBottom: "34px", color: "#d4d4d4", fontSize: 14 }}>
            Initial consultations available by application.
          </p>

<Link
  href="/consultation"
  style={{
    padding: "12px 26px",
    backgroundColor: "#b8a77a",
    color: "#ffffff",
    borderRadius: "4px",
    textDecoration: "none",
    display: "inline-block",
  }}
>
  Request Consultation
</Link>
        </div>
      </section>

      {/* EMAIL CAPTURE (placeholder UI only for now) */}
      <section style={{ padding: "95px 20px", backgroundColor: "#ffffff" }}>
        <div style={{ maxWidth: "820px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "28px", marginBottom: 14 }}>
            Join the Global Fertility Insight List
          </h2>

          <p style={{ color: "#555", marginBottom: 26 }}>
            Receive structured country intelligence updates, regulatory changes, and strategic fertility analysis.
          </p>

          <form
  onSubmit={onJoinList}
  style={{
    display: "flex",
    justifyContent: "center",
    gap: 12,
    flexWrap: "wrap",
  }}
>
  <input
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
    placeholder="Enter your email"
    style={{
      padding: "12px 14px",
      minWidth: "260px",
      borderRadius: 4,
      border: "1px solid #ccc",
      fontSize: "14px",
    }}
  />

  <button
    type="submit"
    style={{
      padding: "12px 20px",
      backgroundColor: "#b8a77a",
      color: "#ffffff",
      borderRadius: 4,
      border: "none",
      cursor: "pointer",
      fontWeight: 500,
    }}
  >
    {status === "loading" ? "Joining..." : "Join the List"}
  </button>
</form>

{status === "ok" && (
  <p style={{ marginTop: 18, color: "#2d6a4f" }}>You’re on the list.</p>
)}

{status === "error" && (
  <p style={{ marginTop: 18, color: "#c1121f" }}>
    Something went wrong. Please try again.
  </p>
)}

          <p style={{ marginTop: 14, fontSize: 12, color: "#777" }}>
            (We’ll reach out when consultation scheduling becomes available.)
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "34px 20px", textAlign: "center", color: "#777" }}>
        <div style={{ fontSize: 12 }}>
          © {new Date().getFullYear()} FertilityCareHub • Privacy • Terms • Disclaimer
        </div>
      </footer>
    </main>
  );
}
