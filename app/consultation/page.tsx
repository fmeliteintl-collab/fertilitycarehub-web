"use client";
// app/consultation/page.tsx
import React, { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

/**
 * IMPORTANT:
  * This file is intentionally structured as:
   *  - Default export wraps the inner client component in <Suspense/>
    *  - Inner component uses useSearchParams()
     * This prevents the Cloudflare/Next build error:
      * "useSearchParams() should be wrapped in a suspense boundary"
       */
       
       export default function ConsultationPage() {
         return (
             <Suspense fallback={<div style={{ padding: 24 }}>Loading…</div>}>
                   <ConsultationPageInner />
                       </Suspense>
                         );
                         }
                         
                         function ConsultationPageInner() {
                           // Theme
                             const PAGE_BG = "#F5F1E8";
                               const INK = "#1A1A1A";
                                 const MUTED = "#6A6256";
                                   const GOLD = "#B89B5E";
                                     const BORDER = "#E5DDC8";
                                       const CARD_BG = "#FBFAF7";
                                       
                                         // Read ?from=spain (optional)
                                           const searchParams = useSearchParams();
                                             const fromSlug = (searchParams.get("from") || "").trim().toLowerCase();
                                             
                                               // Form state
                                                 const [fullName, setFullName] = useState("");
                                                   const [email, setEmail] = useState("");
                                                     const [residence, setResidence] = useState("");
                                                       const [targetCountry, setTargetCountry] = useState("");
                                                         const [optimizingFor, setOptimizingFor] = useState<string[]>([]);
                                                           const [context, setContext] = useState("");
                                                           
                                                             // UX state
                                                               const [submitting, setSubmitting] = useState(false);
                                                                 const [successMsg, setSuccessMsg] = useState<string | null>(null);
                                                                   const [errorMsg, setErrorMsg] = useState<string | null>(null);
                                                                   
                                                                     const OPTIONS = useMemo(
                                                                         () => [
                                                                               "Highest probability",
                                                                                     "Speed & access",
                                                                                           "Cost efficiency",
                                                                                                 "Donor pathway",
                                                                                                       "Ethical alignment",
                                                                                                             "Legal clarity",
                                                                                                                 ],
                                                                                                                     []
                                                                                                                       );
                                                                                                                       
                                                                                                                         const toggleOption = (label: string) => {
                                                                                                                             setOptimizingFor((prev) =>
                                                                                                                                   prev.includes(label) ? prev.filter((x) => x !== label) : [...prev, label]
                                                                                                                                       );
                                                                                                                                         };
                                                                                                                                         
                                                                                                                                           // Supabase client (public)
                                                                                                                                             const supabase = useMemo(() => {
                                                                                                                                                 const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
                                                                                                                                                     const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
                                                                                                                                                         if (!url || !key) return null;
                                                                                                                                                             return createClient(url, key);
                                                                                                                                                               }, []);
                                                                                                                                                               
                                                                                                                                                                 const canSubmit = useMemo(() => {
                                                                                                                                                                     // keep Phase 1 lightweight: email required
                                                                                                                                                                         return email.trim().length > 3 && email.includes("@");
                                                                                                                                                                           }, [email]);
                                                                                                                                                                           
                                                                                                                                                                             const buildMailto = () => {
                                                                                                                                                                                 const subject = encodeURIComponent("Private Advisory Review Request");
                                                                                                                                                                                     const bodyLines = [
                                                                                                                                                                                           `Full name: ${fullName || "-"}`,
                                                                                                                                                                                                 `Email: ${email || "-"}`,
                                                                                                                                                                                                       `Country of residence: ${residence || "-"}`,
                                                                                                                                                                                                             `Target country (if known): ${targetCountry || "-"}`,
                                                                                                                                                                                                                   `Optimizing for: ${optimizingFor.length ? optimizingFor.join(", ") : "-"}`,
                                                                                                                                                                                                                         `Brief context: ${context || "-"}`,
                                                                                                                                                                                                                               fromSlug ? `Source country slug: ${fromSlug}` : "",
                                                                                                                                                                                                                                     `Source page: ${typeof window !== "undefined" ? window.location.href : ""}`,
                                                                                                                                                                                                                                         ].filter(Boolean);
                                                                                                                                                                                                                                         
                                                                                                                                                                                                                                             const body = encodeURIComponent(bodyLines.join("\n"));
                                                                                                                                                                                                                                                 return `mailto:hello@fertilitycarehub.com?subject=${subject}&body=${body}`;
                                                                                                                                                                                                                                                   };
                                                                                                                                                                                                                                                   "
  const handleSubmit = async () => {
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!supabase) {
      setErrorMsg(
        "Supabase is not configured in this environment (missing NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY)."
      );
      return;
    }
    if (!canSubmit) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);
    try {
      const sourceUrl =
        typeof window !== "undefined" ? window.location.href : null;

      const payload = {
        full_name: fullName || null,
        email: email.trim(),
        country_of_residence: residence || null,
        target_country: targetCountry || null,
        optimizing_for: optimizingFor, // text[]
        brief_context: context || null,
        source_country_slug: fromSlug || null,
        source_url: sourceUrl,
        status: "new",
      };

      const { error } = await supabase
        .from("consultation_requests")
        .insert([payload]);

      if (error) throw error;

      setSuccessMsg(
        "Thank you — your request has been submitted. Once received, we’ll route it and a consultant will reach out."
      );

      // Optional: clear form
      setFullName("");
      setEmail("");
      setResidence("");
      setTargetCountry("");
      setOptimizingFor([]);
      setContext("");
    } catch (e: unknown) {
  const message =
    e instanceof Error
      ? e.message
      : "Submission failed. Most likely: RLS insert policy is missing for consultation_requests.";

  setErrorMsg(message);
} finally {
      setSubmitting(false);
    }
  };

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
            href="/countries"
            style={{
              textDecoration: "none",
              border: `1px solid ${GOLD}`,
              color: INK,
              padding: "10px 14px",
              borderRadius: 999,
              fontSize: 13,
              letterSpacing: 0.8,
              textTransform: "uppercase",
              background: "transparent",
            }}
          >
            View Countries
          </Link>
        </div>
      </header>

      <div
        style={{ maxWidth: 1120, margin: "0 auto", padding: "28px 20px 90px" }}
      >
        {/* Back */}
        <div>
          <Link
            href="/countries"
            style={{ textDecoration: "none", color: MUTED, fontSize: 13 }}
          >
            ← Back to countries
          </Link>
        </div>

        {/* Hero */}
        <section style={{ paddingTop: 34, paddingBottom: 26, textAlign: "center" }}>
          <div
            style={{
              fontSize: 12,
              letterSpacing: 2.8,
              textTransform: "uppercase",
              color: MUTED,
              marginBottom: 16,
            }}
          >
            Private advisory intake
          </div>

          <h1 style={{ margin: 0, fontSize: 56 }}>
            Request Private Advisory Review
          </h1>

          <p
            style={{
              margin: "18px auto 0",
              maxWidth: 900,
              fontSize: 18,
              lineHeight: 1.7,
              color: "#3A342C",
            }}
          >
            This is a strategy-led review — not general medical advice. We help you
            choose the right country pathway, identify what matters, and reduce
            wasted time, travel, and financial leakage.
          </p>
        </section>

        {/* Two cards */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 18,
            marginTop: 10,
          }}
        >
          <div
            style={{
              background: CARD_BG,
              border: `1px solid ${BORDER}`,
              borderRadius: 18,
              padding: 22,
            }}
          >
            <h2>What we cover</h2>
            <ul style={{ paddingLeft: 18, lineHeight: 1.8 }}>
              <li>Country fit: legal posture, access constraints, travel cadence.</li>
              <li>Clinic selection logic (curated shortlist, not exhaustive lists).</li>
              <li>Timeline planning: trips, stages, and decision checkpoints.</li>
              <li>Risk flags: eligibility, documentation, and pathway friction.</li>
              <li>Next actions: what to do this week vs. later.</li>
            </ul>
          </div>

          <div
            style={{
              background: CARD_BG,
              border: `1px solid ${BORDER}`,
              borderRadius: 18,
              padding: 22,
            }}
          >
            <h2>What we deliberately don’t do</h2>
            <ul style={{ paddingLeft: 18, lineHeight: 1.8 }}>
              <li>We do not provide medical diagnosis or replace your physician.</li>
              <li>We do not publish “every clinic in the country.”</li>
              <li>We do not provide visa step-by-step instructions (we refer partners).</li>
              <li>We do not guarantee outcomes or success rates.</li>
              <li>We do not operate as a clinic or medical facility.</li>
            </ul>
          </div>
        </section>

        {/* Intake */}
        <section style={{ marginTop: 34 }}>
          <div
            style={{
              background: CARD_BG,
              border: `1px solid ${BORDER}`,
              borderRadius: 18,
              padding: 22,
              maxWidth: 920,
              margin: "0 auto",
            }}
          >
            <h2 style={{ textAlign: "center" }}>Intake (Phase 1)</h2>

            <p style={{ textAlign: "center", color: MUTED, marginTop: 10 }}>
              For now, this submits to our internal queue. A consultant will review and reach out.
            </p>

            {/* Alerts */}
            {successMsg && (
              <div
                style={{
                  marginTop: 14,
                  padding: 12,
                  borderRadius: 14,
                  border: `1px solid ${BORDER}`,
                  background: "#FFFFFF",
                  color: "#2B2B2B",
                  lineHeight: 1.5,
                }}
              >
                {successMsg}
              </div>
            )}
            {errorMsg && (
              <div
                style={{
                  marginTop: 14,
                  padding: 12,
                  borderRadius: 14,
                  border: "1px solid #E0B4B4",
                  background: "#FFF7F7",
                  color: "#7A1E1E",
                  lineHeight: 1.5,
                }}
              >
                {errorMsg}
              </div>
            )}

            <div
              style={{
                marginTop: 18,
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
              }}
            >
              <Input label="Full name" placeholder="Your name" value={fullName} onChange={setFullName} />
              <Input label="Email" placeholder="name@email.com" value={email} onChange={setEmail} />
              <Input label="Country of residence" placeholder="e.g., Canada" value={residence} onChange={setResidence} />
              <Input label="Target country (if known)" placeholder="e.g., Spain" value={targetCountry} onChange={setTargetCountry} />
            </div>

            <div style={{ marginTop: 12 }}>
              <Label text="What are you optimizing for?" />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 10,
                  marginTop: 10,
                }}
              >
                {OPTIONS.map((opt) => (
                  <ChipButton
                    key={opt}
                    text={opt}
                    selected={optimizingFor.includes(opt)}
                    onClick={() => toggleOption(opt)}
                    border={BORDER}
                    gold={GOLD}
                    ink={INK}
                  />
                ))}
              </div>

              <p style={{ color: MUTED, fontSize: 12, marginTop: 10 }}>
                Select all that apply.
              </p>
            </div>

            <div style={{ marginTop: 12 }}>
              <Label text="Brief context" />
              <textarea
                placeholder="Age range, prior cycles, diagnosis (if any), preferred timeline, and any constraints you want us to respect."
                value={context}
                onChange={(e) => setContext(e.target.value)}
                style={{
                  width: "100%",
                  minHeight: 130,
                  padding: 12,
                  borderRadius: 14,
                  border: `1px solid ${BORDER}`,
                  outline: "none",
                  background: "#FFF",
                  fontFamily:
                    'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
                  fontSize: 14,
                  lineHeight: 1.6,
                }}
              />
            </div>

            {/* CTA row */}
            <div
              style={{
                marginTop: 18,
                display: "flex",
                justifyContent: "center",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting || !canSubmit}
                style={{
                  display: "inline-block",
                  border: `1px solid ${GOLD}`,
                  padding: "12px 16px",
                  borderRadius: 999,
                  textDecoration: "none",
                  color: INK,
                  fontSize: 13,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  background: submitting ? "#EFE7D6" : "transparent",
                  cursor: submitting || !canSubmit ? "not-allowed" : "pointer",
                  opacity: submitting || !canSubmit ? 0.7 : 1,
                }}
              >
                {submitting ? "Submitting…" : "Submit Request (Phase 1)"}
              </button>

              <a
                href={buildMailto()}
                style={{
                  display: "inline-block",
                  border: `1px solid ${BORDER}`,
                  padding: "12px 16px",
                  borderRadius: 999,
                  textDecoration: "none",
                  color: INK,
                  fontSize: 13,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  background: "transparent",
                }}
              >
                Email Instead
              </a>

              <Link
                href="/countries"
                style={{
                  display: "inline-block",
                  border: `1px solid ${BORDER}`,
                  padding: "12px 16px",
                  borderRadius: 999,
                  textDecoration: "none",
                  color: INK,
                  fontSize: 13,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  background: "transparent",
                }}
              >
                Return to Countries
              </Link>
            </div>

            <p
              style={{
                color: MUTED,
                fontSize: 12,
                textAlign: "center",
                marginTop: 14,
              }}
            >
              Note: This page is not medical advice. Emergency issues should be handled by licensed medical professionals.
            </p>
          </div>
        </section>
      </div>

      <style>{`
        @media (max-width: 900px) {
          section[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
          h1 { font-size: 40px !important; }
          div[style*="repeat(3, 1fr)"] {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}

function Label({ text }: { text: string }) {
  return (
    <div style={{ fontSize: 12, letterSpacing: 1.4, textTransform: "uppercase" }}>
      {text}
    </div>
  );
}

function Input({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const BORDER = "#E5DDC8";
  return (
    <div>
      <Label text={label} />
      <input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          padding: 12,
          borderRadius: 14,
          border: `1px solid ${BORDER}`,
          outline: "none",
          background: "#FFF",
          fontFamily:
            'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
          fontSize: 14,
        }}
      />
    </div>
  );
}

function ChipButton({
  text,
  selected,
  onClick,
  border,
  gold,
  ink,
}: {
  text: string;
  selected: boolean;
  onClick: () => void;
  border: string;
  gold: string;
  ink: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        border: `1px solid ${border}`,
        borderRadius: 999,
        padding: "10px 12px",
        fontSize: 13,
        background: selected ? gold : "transparent",
        color: ink,
        textAlign: "center",
        userSelect: "none",
        cursor: "pointer",
      }}
    >
      {text}
    </button>
  );
}
