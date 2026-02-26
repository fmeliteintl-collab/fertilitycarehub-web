import CountryWebPageSchema from "../../components/CountryWebPageSchema";
import Breadcrumbs from "../../components/Breadcrumbs";
import Link from "next/link";
import type { Metadata } from "next";
import FAQSchema from "../../components/FAQSchema";


export const metadata: Metadata = {
  title: "Spain Fertility Strategy Advisory | Regulatory & Clinical Alignment 2026",
  description:
    "Private strategic advisory for individuals and families evaluating fertility care in Spain. Jurisdiction assessment, regulatory clarity, and clinical pathway alignment across Europe.",
  alternates: {
    canonical: "https://fertilitycarehub.com/countries/spain",
  },
  openGraph: {
    title: "Spain Fertility Strategy Advisory | FertilityCareHub",
    description:
      "Strategic jurisdiction assessment and regulatory clarity for cross-border fertility care in Spain.",
    url: "https://fertilitycarehub.com/countries/spain",
    siteName: "FertilityCareHub",
    type: "article",
  },
};

export default function SpainDossierPage() {
  return (
    <main className="min-h-screen bg-[#F5F1E8] text-[#1A1A1A]">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Countries", href: "/countries" },
          { name: "Spain", href: "/countries/spain" },
        ]}
      />

      <CountryWebPageSchema
        countryName="Spain"
        countrySlug="spain"
        title="Spain: Fertility Jurisdiction Assessment"
        description="Strategic jurisdiction assessment and regulatory clarity for cross-border fertility care in Spain."
      />
      <FAQSchema
  id="faq-spain"
  items={[
    {
      question: "Is FertilityCareHub a clinic or broker?",
      answer:
        "No. FertilityCareHub is an independent strategic advisory platform. We do not provide medical treatment, sell medical services, or guarantee outcomes.",
    },
    {
      question: "What is Spain typically strong for in cross-border fertility planning?",
      answer:
        "Spain is often considered for mature clinic infrastructure, established donor pathways, and a predictable patient experience. Suitability depends on your legal, ethical, medical, and timeline constraints.",
    },
    {
      question: "Do you provide medical advice or diagnosis?",
      answer:
        "No. We provide structured navigation and decision support. Medical decisions should be made with licensed clinicians.",
    },
    {
      question: "What happens after I submit a consultation request?",
      answer:
        "Your request is routed to an internal review queue. A consultant reviews it for fit and follow-up, and then reaches out by email.",
    },
  ]}
/>

  

    {/* rest of your existing page */}

      {/* Top utility row */}
      <section
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          padding: "28px 20px 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <Link
          href="/countries"
          style={{
            color: "#7B6A3A",
            textDecoration: "none",
            fontSize: 14,
            letterSpacing: "0.04em",
          }}
        >
          ← Back to countries
        </Link>

        {/* Soft CTA (outlined, understated) */}
        <Link
          href="/consultation"
          style={{
            border: "1px solid #B89B5E",
            color: "#7B6A3A",
            padding: "10px 16px",
            borderRadius: 999,
            textDecoration: "none",
            fontSize: 13,
            letterSpacing: "0.06em",
            whiteSpace: "nowrap",
          }}
        >
          Request Spain Strategy Review
        </Link>
      </section>

      {/* Hero */}
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "56px 20px" }}>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: 12,
              letterSpacing: "0.22em",
              color: "#7B6A3A",
              textTransform: "uppercase",
              marginBottom: 14,
            }}
          >
            Strategic Advisory Dossier
          </div>

          <h1
            style={{
              fontSize: 64,
              lineHeight: 1.02,
              margin: "0 0 18px",
              fontWeight: 500,
              letterSpacing: "-0.02em",
            }}
          >
            Spain: Fertility Jurisdiction Assessment
          </h1>

          <p
            style={{
              maxWidth: 820,
              margin: "0 auto",
              fontSize: 18,
              lineHeight: 1.7,
              color: "#2A2A2A",
            }}
          >
            Spain occupies a distinctive position within the European fertility landscape.
            Its regulatory posture supports donor pathways under defined conditions while
            maintaining mature clinical standards. This dossier evaluates when Spain is a
            high-alignment jurisdiction, where structural constraints may appear, and how
            cross-border factors shape strategic decision-making.
          </p>
        </div>
      </section>

      {/* Two-column decision cards */}
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "0 20px 44px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gap: 18,
          }}
        >
          <div
            style={{
              gridColumn: "span 7",
              background: "#FBF8F1",
              border: "1px solid #E7DEC9",
              borderRadius: 18,
              padding: "26px 24px",
            }}
          >
            <h2 style={{ fontSize: 22, margin: "0 0 14px", fontWeight: 600 }}>
              When Spain is the right choice
            </h2>

            <ul
              style={{
                margin: 0,
                paddingLeft: 18,
                display: "grid",
                gap: 12,
                lineHeight: 1.7,
                color: "#2A2A2A",
                fontSize: 16,
              }}
            >
              <li>
                You want a permissive European framework with mature clinical depth and
                internationally experienced teams.
              </li>
              <li>
                Donor pathways matter. Spain’s ecosystem often supports donor availability
                and streamlined processes.
              </li>
              <li>
                You value a predictable clinic cadence (coordination, scheduling,
                standardized workflows) and want reduced friction.
              </li>
              <li>
                You prefer a strong balance of quality and access, without the strict
                governance constraints seen in more regulated systems.
              </li>
            </ul>
          </div>

          <div
            style={{
              gridColumn: "span 5",
              background: "#FBF8F1",
              border: "1px solid #E7DEC9",
              borderRadius: 18,
              padding: "26px 24px",
            }}
          >
            <h2 style={{ fontSize: 22, margin: "0 0 14px", fontWeight: 600 }}>
              When it’s not
            </h2>

            <ul
              style={{
                margin: 0,
                paddingLeft: 18,
                display: "grid",
                gap: 12,
                lineHeight: 1.7,
                color: "#2A2A2A",
                fontSize: 16,
              }}
            >
              <li>
                You require the strongest public reporting governance signals and highly
                standardized national oversight.
              </li>
              <li>
                Your pathway depends on a specific legal structure where another
                jurisdiction is clearly more aligned.
              </li>
              <li>
                You want a fully DIY approach with exhaustive lists — Spain performs best
                with curation, not database browsing.
              </li>
              <li>
                You need the broadest menu of edge-case options; Spain is strong, but not
                always the most permissive for every scenario.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Advisory Framework */}
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "0 20px 64px" }}>
        <div style={{ textAlign: "center", marginBottom: 22 }}>
          <h2 style={{ fontSize: 28, margin: 0, fontWeight: 600 }}>
            Advisory Framework
          </h2>
          <p
            style={{
              margin: "10px auto 0",
              maxWidth: 760,
              color: "#3A3A3A",
              lineHeight: 1.7,
            }}
          >
            This is intentionally not a public database. We focus on strategic decision
            points, the signals that matter, and what to exclude.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gap: 18,
          }}
        >
          <div
            style={{
              gridColumn: "span 4",
              background: "#FFFFFF",
              border: "1px solid #E7DEC9",
              borderRadius: 18,
              padding: "22px 20px",
            }}
          >
            <div
              style={{
                fontSize: 14,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#7B6A3A",
              }}
            >
              Country Intelligence
            </div>
            <p style={{ margin: "12px 0 0", lineHeight: 1.7, color: "#2A2A2A" }}>
              Legal environment, donor policy posture, cross-border eligibility friction,
              and timeline realism.
            </p>
          </div>

          <div
            style={{
              gridColumn: "span 4",
              background: "#FFFFFF",
              border: "1px solid #E7DEC9",
              borderRadius: 18,
              padding: "22px 20px",
            }}
          >
            <div
              style={{
                fontSize: 14,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#7B6A3A",
              }}
            >
              Clinic Standards Insight
            </div>
            <p style={{ margin: "12px 0 0", lineHeight: 1.7, color: "#2A2A2A" }}>
              Accreditation signals, lab quality indicators, process maturity, and how to
              avoid “pretty marketing.”
            </p>
          </div>

          <div
            style={{
              gridColumn: "span 4",
              background: "#FFFFFF",
              border: "1px solid #E7DEC9",
              borderRadius: 18,
              padding: "22px 20px",
            }}
          >
            <div
              style={{
                fontSize: 14,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#7B6A3A",
              }}
            >
              Strategic Advisory
            </div>
            <p style={{ margin: "12px 0 0", lineHeight: 1.7, color: "#2A2A2A" }}>
              What to choose, what to exclude, and when Spain should be primary vs.
              secondary in your plan.
            </p>
          </div>
        </div>

        {/* Private filter / what we exclude */}
        <div
          style={{
            marginTop: 18,
            background: "#FBF8F1",
            border: "1px solid #E7DEC9",
            borderRadius: 18,
            padding: "22px 20px",
          }}
        >
          <h3 style={{ margin: 0, fontSize: 20, fontWeight: 600 }}>
            The “Private” filter — what we deliberately exclude
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(12, 1fr)",
              gap: 12,
              marginTop: 14,
              color: "#2A2A2A",
              lineHeight: 1.7,
            }}
          >
            <div style={{ gridColumn: "span 6" }}>
              <div>❌ Exhaustive clinic lists (we curate, not index)</div>
              <div>❌ Step-by-step visa instructions (we guide strategically)</div>
            </div>

            <div style={{ gridColumn: "span 6" }}>
              <div>❌ Hotel price comparisons (we recommend vetted options)</div>
              <div>❌ Every treatment detail (we focus on decision points)</div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
<div style={{ textAlign: "center", marginTop: 26 }}>
  <Link
    href="/consultation"
    style={{
      display: "inline-block",
      border: "1px solid #B89B5E",
      color: "#7B6A3A",
      padding: "12px 18px",
      borderRadius: 999,
      textDecoration: "none",
      fontSize: 13,
      letterSpacing: "0.06em",
    }}
  >
    Request Spain Strategy Review
  </Link>

  <div style={{ marginTop: 10, fontSize: 13, color: "#6A6A6A" }}>
    Discreet, structured guidance aligned to your profile and pathway.
  </div>
</div>
</section>


{/* FAQ */}
<section className="mt-16 border-t border-[#E5DDC8] pt-10">
  <h2 className="text-2xl font-semibold mb-6">FAQ</h2>

  <div className="space-y-4">
    <details className="rounded-xl border border-[#E5DDC8] bg-white/60 p-5">
      <summary className="cursor-pointer text-lg font-medium">
        Is FertilityCareHub providing medical advice?
      </summary>
      <p className="mt-3 text-sm text-[#6A6256] leading-relaxed">
        No. We provide structured, strategic advisory support only. Any medical decisions should be
        made with licensed clinicians. Our work focuses on clarity, jurisdiction fit, and planning.
      </p>
    </details>

    <details className="rounded-xl border border-[#E5DDC8] bg-white/60 p-5">
      <summary className="cursor-pointer text-lg font-medium">
        Do you recommend specific clinics in Spain?
      </summary>
      <p className="mt-3 text-sm text-[#6A6256] leading-relaxed">
        We don’t publish public “best clinic” lists or endorsements. If you engage advisory services,
        we can provide a curated shortlist aligned to your constraints and planning priorities.
      </p>
    </details>

    <details className="rounded-xl border border-[#E5DDC8] bg-white/60 p-5">
      <summary className="cursor-pointer text-lg font-medium">
        What information should I prepare before requesting advisory?
      </summary>
      <p className="mt-3 text-sm text-[#6A6256] leading-relaxed">
        Useful inputs include your target timeline, prior treatment history (if any), key constraints
        (budget, travel cadence, donor pathway), and any legal/eligibility considerations.
      </p>
    </details>

    <details className="rounded-xl border border-[#E5DDC8] bg-white/60 p-5">
      <summary className="cursor-pointer text-lg font-medium">
        Can advisory help compare Spain with other destinations?
      </summary>
      <p className="mt-3 text-sm text-[#6A6256] leading-relaxed">
        Yes. We help structure a comparison across a small set of relevant jurisdictions, focusing on
        decision factors like access, governance, donor pathway, and execution risk.
        For a structured framework, see our{" "}
        <Link
          href="/how-to-compare-fertility-jurisdictions"
          className="underline"
        >
          jurisdiction comparison guide
        </Link>.
      </p>
    </details>
  </div>
</section>


{/* Comparison Guide CTA — Internal Authority Boost */}
<section className="mt-10 border border-[#E5DDC8] bg-white/60 rounded-xl p-5">
  <h3 className="text-lg font-medium">
    Compare destinations before choosing
  </h3>
  <p className="mt-2 text-sm text-[#6A6256] leading-relaxed">
    Use our structured framework to compare governance, donor pathway,
    eligibility friction, timeline realism, and execution risk across countries.
  </p>
  <Link
    href="/how-to-compare-fertility-jurisdictions"
    className="inline-block mt-3 underline text-sm"
  >
    Read the comparison guide →
  </Link>
</section>



{/* Compare Other Jurisdictions */}
<section className="mt-16 border-t border-[#E5DDC8] pt-10">
  <h2 className="text-2xl font-semibold mb-6">
    Compare Other Jurisdictions
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <Link
      href="/countries/greece"
      className="border border-[#E5DDC8] p-6 rounded-xl hover:border-[#B89B5E] transition"
    >
      <h3 className="text-lg font-medium">Greece</h3>
      <p className="text-sm text-[#6A6256] mt-2">
        Often considered for access flexibility and streamlined entry pathways.
      </p>
    </Link>

    <Link
      href="/countries/portugal"
      className="border border-[#E5DDC8] p-6 rounded-xl hover:border-[#B89B5E] transition"
    >
      <h3 className="text-lg font-medium">Portugal</h3>
      <p className="text-sm text-[#6A6256] mt-2">
        Growing infrastructure with specific legal and access nuances.
      </p>
    </Link>

    <Link
      href="/countries/czech-republic"
      className="border border-[#E5DDC8] p-6 rounded-xl hover:border-[#B89B5E] transition"
    >
      <h3 className="text-lg font-medium">Czech Republic</h3>
      <p className="text-sm text-[#6A6256] mt-2">
        Frequently evaluated for cost-efficiency and clinic density.
      </p>
    </Link>
  </div>
</section>

    </main>
  );
}