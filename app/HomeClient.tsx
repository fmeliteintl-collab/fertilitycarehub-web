"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import Link from "next/link";

const knowledgeGuides = [
  {
    title: "How to Compare Fertility Jurisdictions Strategically",
    description:
      "Use a structured framework to compare regulation, eligibility, donor pathways, clinic governance, costs, logistics, and execution risk.",
    href: "/how-to-compare-fertility-jurisdictions",
    status: "Published",
  },
  {
    title: "How to Choose a Fertility Clinic Abroad",
    description:
      "Evaluate licensing, laboratory governance, treatment transparency, communication standards, total costs, and continuity of care.",
    href: null,
    status: "Coming soon",
  },
  {
    title: "Understanding Fertility Clinic Success Rates",
    description:
      "Learn how to interpret pregnancy, ongoing-pregnancy, live-birth, cycle, transfer, and age-specific reporting measures.",
    href: null,
    status: "Coming soon",
  },
  {
    title: "Hidden Costs of Fertility Treatment Abroad",
    description:
      "Identify medication, testing, donor, storage, freezing, travel, accommodation, cancellation, and repeat-treatment costs.",
    href: null,
    status: "Coming soon",
  },
];

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">(
    "idle"
  );

  // Deep-link context: /?from=country
  const [from, setFrom] = useState("");

  useEffect(() => {
    const handleRouteChange = () => {
      const params = new URLSearchParams(window.location.search);
      const raw = (params.get("from") || "").trim().toLowerCase();

      // Allow only slugs such as "spain" or "united-states".
      const safe = /^[a-z-]+$/.test(raw) ? raw : "";
      setFrom(safe);
    };

    const timeoutId = setTimeout(handleRouteChange, 0);

    return () => clearTimeout(timeoutId);
  }, []);

  const countryLink = useMemo(() => {
    if (!from) {
      return null;
    }

    return `/countries/${encodeURIComponent(from)}`;
  }, [from]);

  const countryLabel = useMemo(() => {
    if (!from) {
      return "";
    }

    return from
      .split("-")
      .map((word) =>
        word ? `${word[0].toUpperCase()}${word.slice(1)}` : ""
      )
      .join(" ");
  }, [from]);

  async function onJoinList(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setEmail("");
        setStatus("ok");
        return;
      }

      setStatus("error");
    } catch {
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
          Strategic jurisdiction assessment and clinical alignment for
          individuals and families navigating cross-border reproductive care.
        </p>

        <p style={{ fontSize: 14, color: "#6a6256", marginTop: 14 }}>
          Powered by the{" "}
          <strong>FCH Global Fertility Intelligence Framework(TM)</strong> — a
          structured model that evaluates jurisdictions across regulatory
          alignment, donor pathway constraints, clinical infrastructure, and
          execution risk.
        </p>

        <div
          style={{
            display: "flex",
            gap: 14,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/advisory"
            style={{
              padding: "12px 26px",
              backgroundColor: "#b8a77a",
              color: "#ffffff",
              borderRadius: "4px",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            View Advisory Tiers (US$500 / US$2,500)
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

          <div style={{ marginTop: 14, fontSize: 13, color: "#6A6256" }}>
            <Link
              href="/compare"
              style={{ textDecoration: "underline", color: "inherit" }}
            >
              View Jurisdiction Comparisons
            </Link>
          </div>

          {countryLink ? (
            <Link
              href={countryLink}
              style={{
                padding: "12px 26px",
                backgroundColor: "transparent",
                border: "1px solid #e5ddc8",
                color: "#6a6256",
                borderRadius: "4px",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              From {countryLabel}? Start Here →
            </Link>
          ) : null}
        </div>

        <div
          style={{
            marginTop: 18,
            display: "flex",
            gap: 10,
            justifyContent: "center",
            flexWrap: "wrap",
            fontSize: 12,
            color: "#6a6256",
          }}
        >
          {[
            "Regulatory Alignment",
            "Donor Pathway Constraints",
            "Clinical Infrastructure",
            "Execution Risk",
          ].map((label) => (
            <span
              key={label}
              style={{
                padding: "6px 10px",
                border: "1px solid #e5ddc8",
                borderRadius: 999,
              }}
            >
              {label}
            </span>
          ))}
        </div>

        <div style={{ marginTop: 12 }}>
          <Link
            href="/consultation"
            style={{
              fontSize: 13,
              color: "#6a6256",
              textDecoration: "underline",
              textUnderlineOffset: 4,
            }}
          >
            Or request intake first (Phase 1)
          </Link>
        </div>

        <div
          style={{
            marginTop: "36px",
            fontSize: "12px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#7a7a7a",
          }}
        >
          Structured Analysis Across 30+ Jurisdictions • Legal and Clinical
          Intelligence • Cross-Border Strategic Advisory
        </div>
      </section>

      {/* START YOUR JOURNEY */}
      <section
        style={{
          padding: "90px 20px",
          backgroundColor: "#f3efe7",
          textAlign: "center",
          borderTop: "1px solid #ece3d1",
          borderBottom: "1px solid #ece3d1",
        }}
      >
        <div style={{ maxWidth: "980px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "28px", marginBottom: 18 }}>
            Start Your Fertility Planning Journey
          </h2>

          <p
            style={{
              color: "#555",
              marginBottom: 44,
              maxWidth: 760,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            FertilityCareHub follows a structured three-step advisory process:
            first understand the framework, then choose the advisory path that
            fits your situation, and then receive private client workspace access
            as part of eligible engagement and onboarding.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "28px",
              textAlign: "left",
            }}
          >
            <div
              style={{
                backgroundColor: "#ffffff",
                padding: 28,
                borderRadius: 6,
                border: "1px solid #e5ddc8",
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#8a7a55",
                  marginBottom: 10,
                }}
              >
                Step 1
              </div>

              <h3 style={{ marginTop: 0, marginBottom: 12 }}>
                Understand the Framework
              </h3>

              <p style={{ color: "#555", marginBottom: 18 }}>
                Begin with the FertilityCareHub planning framework to understand
                how cross-border fertility decisions should be evaluated across
                regulatory, clinical, financial, and execution dimensions.
              </p>

              <p style={{ color: "#555", marginBottom: 18, fontSize: 14 }}>
                This is the strategic foundation behind the system, not generic
                fertility content or promotional ranking logic.
              </p>

              <Link
                href="/brief"
                style={{
                  color: "#8a7a55",
                  textDecoration: "underline",
                  textUnderlineOffset: 4,
                }}
              >
                Review the Planning Framework
              </Link>
            </div>

            <div
              style={{
                backgroundColor: "#ffffff",
                padding: 28,
                borderRadius: 6,
                border: "1px solid #e5ddc8",
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#8a7a55",
                  marginBottom: 10,
                }}
              >
                Step 2
              </div>

              <h3 style={{ marginTop: 0, marginBottom: 12 }}>
                Choose Your Advisory Path
              </h3>

              <p style={{ color: "#555", marginBottom: 18 }}>
                Review the appropriate advisory pathway for your fertility goals,
                jurisdictional complexity, donor or surrogacy exposure, and level
                of strategic support required.
              </p>

              <p style={{ color: "#555", marginBottom: 18, fontSize: 14 }}>
                This is where public research transitions into structured client
                engagement and guided strategic decision-making.
              </p>

              <Link
                href="/advisory"
                style={{
                  color: "#8a7a55",
                  textDecoration: "underline",
                  textUnderlineOffset: 4,
                }}
              >
                View Advisory Tiers
              </Link>
            </div>

            <div
              style={{
                backgroundColor: "#ffffff",
                padding: 28,
                borderRadius: 6,
                border: "1px solid #e5ddc8",
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#8a7a55",
                  marginBottom: 10,
                }}
              >
                Step 3
              </div>

              <h3 style={{ marginTop: 0, marginBottom: 12 }}>
                Receive Private Client Workspace Access
              </h3>

              <p style={{ color: "#555", marginBottom: 18 }}>
                Eligible advisory clients receive access to a private planning
                workspace used to organize pathway decisions, shortlisted
                jurisdictions, timeline milestones, and key documents throughout
                the engagement.
              </p>

              <p style={{ color: "#555", marginBottom: 18, fontSize: 14 }}>
                Workspace access is issued selectively as part of structured
                advisory onboarding. It is not a public sign-up portal.
              </p>

              <Link
                href="/consultation"
                style={{
                  color: "#8a7a55",
                  textDecoration: "underline",
                  textUnderlineOffset: 4,
                }}
              >
                Request Client Intake
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* KNOWLEDGE HUB */}
      <section
        style={{
          padding: "100px 20px",
          backgroundColor: "#f8f6f2",
          borderBottom: "1px solid #ece3d1",
        }}
      >
        <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
          <div
            style={{
              maxWidth: 760,
              margin: "0 auto 50px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: 12,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#8a7a55",
                marginBottom: 12,
              }}
            >
              FertilityCareHub Knowledge Hub
            </div>

            <h2 style={{ fontSize: "30px", marginBottom: 18 }}>
              Structured Guidance for Cross-Border Fertility Decisions
            </h2>

            <p style={{ color: "#555", margin: 0 }}>
              Explore independent planning guides designed to help individuals
              and families evaluate jurisdictions, clinics, costs, reporting
              standards, and execution risks before making high-stakes fertility
              decisions.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 24,
            }}
          >
            {knowledgeGuides.map((guide) => {
              const cardContent = (
                <>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 12,
                      marginBottom: 18,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 11,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color:
                          guide.status === "Published" ? "#6d5a2d" : "#8a8377",
                      }}
                    >
                      {guide.status}
                    </span>

                    <span
                      aria-hidden="true"
                      style={{
                        fontSize: 18,
                        color:
                          guide.status === "Published" ? "#8a7a55" : "#aaa398",
                      }}
                    >
                      {guide.status === "Published" ? "→" : "○"}
                    </span>
                  </div>

                  <h3
                    style={{
                      marginTop: 0,
                      marginBottom: 14,
                      fontSize: 20,
                      lineHeight: 1.35,
                    }}
                  >
                    {guide.title}
                  </h3>

                  <p
                    style={{
                      color: "#5d5850",
                      marginBottom: 0,
                      fontSize: 14,
                      lineHeight: 1.75,
                    }}
                  >
                    {guide.description}
                  </p>
                </>
              );

              if (guide.href) {
                return (
                  <Link
                    key={guide.title}
                    href={guide.href}
                    aria-label={`Read ${guide.title}`}
                    style={{
                      display: "block",
                      backgroundColor: "#ffffff",
                      padding: 26,
                      borderRadius: 8,
                      border: "1px solid #d9cba8",
                      color: "#2b2b2b",
                      textDecoration: "none",
                      boxShadow: "0 8px 24px rgba(43, 43, 43, 0.04)",
                    }}
                  >
                    {cardContent}
                  </Link>
                );
              }

              return (
                <div
                  key={guide.title}
                  style={{
                    backgroundColor: "#f3efe7",
                    padding: 26,
                    borderRadius: 8,
                    border: "1px solid #e5ddc8",
                    color: "#2b2b2b",
                  }}
                >
                  {cardContent}
                </div>
              );
            })}
          </div>

          <div style={{ textAlign: "center", marginTop: 34 }}>
            <Link
              href="/how-to-compare-fertility-jurisdictions"
              style={{
                display: "inline-block",
                padding: "12px 22px",
                border: "1px solid #b8a77a",
                borderRadius: 4,
                color: "#78683f",
                textDecoration: "none",
              }}
            >
              Read the Jurisdiction Comparison Guide
            </Link>
          </div>
        </div>
      </section>

      {/* INSTITUTIONAL MODEL */}
      <section
        style={{
          padding: "70px 20px",
          backgroundColor: "#ffffff",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "880px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "24px", marginBottom: "18px" }}>
            Our Advisory Model
          </h2>

          <p style={{ color: "#555", marginBottom: 16 }}>
            FertilityCareHub operates under the{" "}
            <strong>FCH Global Fertility Intelligence Framework(TM)</strong> — a
            documented, version-controlled jurisdiction evaluation model.
          </p>

          <p
            style={{
              color: "#555",
              marginBottom: 32,
              maxWidth: 780,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Framework application adapts conditionally based on pathway type,
            donor structure complexity, regulatory exposure, and execution
            sensitivity.
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: 10,
              fontSize: 13,
              color: "#6a6256",
              marginBottom: 18,
            }}
          >
            {[
              "Weighted Regulatory Analysis",
              "Clinical Infrastructure Assessment",
              "Adaptive Donor Governance Weighting",
              "Execution Complexity Mapping",
            ].map((label) => (
              <span
                key={label}
                style={{
                  padding: "6px 10px",
                  border: "1px solid #e5ddc8",
                  borderRadius: 999,
                }}
              >
                {label}
              </span>
            ))}
          </div>

          <p style={{ color: "#555", marginBottom: 0 }}>
            Each engagement follows structured internal scoring discipline with
            qualitative client-facing risk translation. This is institutional
            advisory — not clinic referral, not rankings, and not promotional
            comparison.
          </p>
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
            Fertility treatment is one of the most emotionally and financially
            significant decisions a family will make. Legal environments differ.
            Donor anonymity regulations vary. Cost transparency is inconsistent.
            Success reporting standards are not universal.
          </p>

          <p style={{ color: "#555" }}>
            FertilityCareHub applies a documented four-pillar jurisdictional
            framework designed to evaluate regulatory alignment, governance
            structure, clinical infrastructure depth, and execution complexity.
            Advisory outputs are derived from structured internal scoring
            discipline and qualitative risk translation, not promotional ranking
            models.
          </p>
        </div>
      </section>

      {/* FRAMEWORK */}
      <section style={{ padding: "100px 20px", textAlign: "center" }}>
        <div style={{ maxWidth: "1050px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "28px", marginBottom: "18px" }}>
            The FCH Global Fertility Intelligence Framework(TM)
          </h2>

          <p
            style={{
              color: "#555",
              marginBottom: "58px",
              maxWidth: 720,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Our institutional methodology evaluates cross-border fertility
            pathways across four structural pillars. Each jurisdiction is
            assessed using weighted internal scoring and translated into clear
            qualitative risk bands for strategic clarity.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "42px",
              textAlign: "left",
            }}
          >
            <div style={{ background: "#ffffff", padding: 26, borderRadius: 6 }}>
              <h3 style={{ marginTop: 0 }}>Regulatory Alignment</h3>
              <p style={{ color: "#555", marginBottom: 0 }}>
                Legal eligibility, donor governance rules, storage regulations,
                and citizenship implications. Regulatory misalignment invalidates
                strategy.
              </p>
            </div>

            <div style={{ background: "#ffffff", padding: 26, borderRadius: 6 }}>
              <h3 style={{ marginTop: 0 }}>Clinical Infrastructure Depth</h3>
              <p style={{ color: "#555", marginBottom: 0 }}>
                Laboratory standards, transparency posture, embryology
                capability, and institutional quality signals.
              </p>
            </div>

            <div style={{ background: "#ffffff", padding: 26, borderRadius: 6 }}>
              <h3 style={{ marginTop: 0 }}>
                Governance and Donor Policy Structure
              </h3>
              <p style={{ color: "#555", marginBottom: 0 }}>
                Anonymity frameworks, disclosure requirements, donor eligibility
                rules, and long-term compliance exposure.
              </p>
            </div>

            <div style={{ background: "#ffffff", padding: 26, borderRadius: 6 }}>
              <h3 style={{ marginTop: 0 }}>Execution Complexity Mapping</h3>
              <p style={{ color: "#555", marginBottom: 0 }}>
                Travel cadence, documentation friction, coordination burden, and
                timeline realism across jurisdictions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section style={{ padding: "90px 20px", backgroundColor: "#ffffff" }}>
        <div style={{ maxWidth: "980px", margin: "0 auto" }}>
          <h2
            style={{ fontSize: "28px", marginBottom: 18, textAlign: "center" }}
          >
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
            Unlike promotional clinic directories or commission-driven treatment
            intermediaries, FertilityCareHub operates as an independent
            analytical advisory platform. Jurisdictional comparisons are
            produced under structured elimination protocols and weighted
            framework modeling, not referral incentives.
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
            For families requiring structured, confidential global fertility
            guidance across jurisdictions.
          </p>

          <p style={{ marginBottom: "34px", color: "#d4d4d4", fontSize: 14 }}>
            Advisory capacity is managed through structured intake cycles to
            preserve analytical rigor.
          </p>

          <Link
            href="/advisory"
            style={{
              padding: "12px 26px",
              backgroundColor: "#b8a77a",
              color: "#ffffff",
              borderRadius: "4px",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            View Advisory Tiers (US$500 / US$2,500)
          </Link>

          <div style={{ marginTop: 14 }}>
            <Link
              href="/consultation"
              style={{
                color: "#d4d4d4",
                fontSize: 13,
                textDecoration: "underline",
                textUnderlineOffset: 4,
              }}
            >
              Prefer to start with intake first? Request Intake (Phase 1)
            </Link>
          </div>
        </div>
      </section>

      {/* EMAIL CAPTURE */}
      <section style={{ padding: "95px 20px", backgroundColor: "#ffffff" }}>
        <div style={{ maxWidth: "820px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "28px", marginBottom: 14 }}>
            Join the Global Fertility Insight List
          </h2>

          <p style={{ color: "#555", marginBottom: 26 }}>
            Receive structured country intelligence updates, regulatory changes,
            and strategic fertility analysis.
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
              onChange={(event) => setEmail(event.target.value)}
              required
              placeholder="Enter your email"
              aria-label="Email address"
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
              disabled={status === "loading"}
              style={{
                padding: "12px 20px",
                backgroundColor: "#b8a77a",
                color: "#ffffff",
                borderRadius: 4,
                border: "none",
                cursor: status === "loading" ? "not-allowed" : "pointer",
                fontWeight: 500,
                opacity: status === "loading" ? 0.75 : 1,
              }}
            >
              {status === "loading" ? "Joining..." : "Join the List"}
            </button>
          </form>

          {status === "ok" ? (
            <p style={{ marginTop: 18, color: "#2d6a4f" }}>
              You are on the list.
            </p>
          ) : null}

          {status === "error" ? (
            <p style={{ marginTop: 18, color: "#c1121f" }}>
              Something went wrong. Please try again.
            </p>
          ) : null}

          <p style={{ marginTop: 14, fontSize: 12, color: "#777" }}>
            We will reach out when consultation scheduling becomes available.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "34px 20px", textAlign: "center", color: "#777" }}>
        <div style={{ fontSize: 12 }}>
          Copyright {new Date().getFullYear()} FertilityCareHub •{" "}
          <Link
            href="/how-to-compare-fertility-jurisdictions"
            style={{ textDecoration: "underline" }}
          >
            Knowledge Guide
          </Link>{" "}
          •{" "}
          <Link href="/privacy" style={{ textDecoration: "underline" }}>
            Privacy
          </Link>{" "}
          •{" "}
          <Link href="/terms" style={{ textDecoration: "underline" }}>
            Terms
          </Link>{" "}
          •{" "}
          <Link href="/disclaimer" style={{ textDecoration: "underline" }}>
            Disclaimer
          </Link>
        </div>

        <div style={{ marginTop: 10, fontSize: 11, color: "#8a8a8a" }}>
          Independent advisory platform. Not medical or legal advice.
        </div>
      </footer>
    </main>
  );
}