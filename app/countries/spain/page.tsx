import Link from "next/link";

export default function GreeceDossierPage() {
  return (
    <main className="bg-[#F5F1E8] text-[#1A1A1A]">
      {/* Top helper nav */}
      <section className="max-w-6xl mx-auto px-6 pt-10">
        <Link
          href="/countries"
          className="inline-flex items-center gap-2 text-sm tracking-wide text-[#6B5A2B] hover:opacity-80"
        >
          ← Back to countries
        </Link>
      </section>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-10 pb-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-xs tracking-[0.28em] uppercase text-[#6B6B6B]">
            Strategic Advisory Dossier
          </div>

          <h1 className="mt-4 text-4xl md:text-6xl leading-tight font-medium">
            Greece
          </h1>

          <p className="mt-5 text-base md:text-lg leading-relaxed text-[#2C2C2C]">
            Greece is often the “high-value” European option: accessible timelines,
            comparatively efficient logistics, and a clinic ecosystem that can work
            well for select donor and treatment pathways. The strategic question is
            not “Is Greece good?”—it’s whether Greece is the right match for your
            governance needs, donor preferences, and risk tolerance.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/consultation"
              className="inline-flex items-center justify-center rounded-full border border-[#B89B5E] px-6 py-3 text-sm tracking-wide hover:bg-[#EFE6D4] transition"
            >
              Request Advisory Consultation
            </Link>
            <Link
              href="#framework"
              className="inline-flex items-center justify-center rounded-full border border-[#D9CBAA] px-6 py-3 text-sm tracking-wide hover:bg-[#F0E8D8] transition"
            >
              Read the dossier framework
            </Link>
          </div>
        </div>
      </section>

      {/* Two-column decision cards */}
      <section className="max-w-6xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-[#E5DDC8] bg-[#FBF8F2] p-7">
            <h2 className="text-lg font-medium">When Greece is the right choice</h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[#2C2C2C] list-disc pl-5">
              <li>
                You want a <strong>value + access</strong> option inside Europe and
                prefer a relatively efficient pathway compared to higher-demand hubs.
              </li>
              <li>
                You are open to an advisor-led selection of <strong>4–5 vetted clinics</strong>{" "}
                rather than a long public list.
              </li>
              <li>
                You prioritize <strong>predictable planning</strong> (travel windows,
                scheduling, and structured next steps) over “maximum permissiveness.”
              </li>
              <li>
                You’re navigating a donor pathway and need <strong>clear execution</strong>{" "}
                with a clinic that can document standards and processes consistently.
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-[#E5DDC8] bg-[#FBF8F2] p-7">
            <h2 className="text-lg font-medium">When it’s not</h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[#2C2C2C] list-disc pl-5">
              <li>
                You require the strongest possible <strong>public reporting regime</strong>{" "}
                and a governance-first environment above all else.
              </li>
              <li>
                You need the broadest permissive access profile for a very niche pathway
                where <strong>one jurisdictional constraint breaks the plan</strong>.
              </li>
              <li>
                You are uncomfortable unless every step is backed by{" "}
                <strong>high-visibility institutional signals</strong> (e.g., large,
                internationally branded hospital systems).
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Framework */}
      <section id="framework" className="max-w-6xl mx-auto px-6 pb-14">
        <div className="rounded-2xl border border-[#E5DDC8] bg-[#FBF8F2] p-8">
          <h3 className="text-xl font-medium">Advisory framework</h3>
          <p className="mt-3 text-sm leading-relaxed text-[#2C2C2C]">
            This dossier is intentionally curated. We exclude exhaustive clinic lists and
            “DIY travel instructions.” The goal is decision clarity: when Greece should be
            considered, what risks to watch, and how to execute with control.
          </p>

          <div className="mt-7 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-xl border border-[#EFE6D4] bg-white p-6">
              <div className="text-xs tracking-[0.22em] uppercase text-[#6B6B6B]">
                Country intelligence
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[#2C2C2C]">
                Eligibility constraints, donor-policy realities, and the “gotchas” that
                matter in practice.
              </p>
            </div>

            <div className="rounded-xl border border-[#EFE6D4] bg-white p-6">
              <div className="text-xs tracking-[0.22em] uppercase text-[#6B6B6B]">
                Clinic standards insight
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[#2C2C2C]">
                What signals to demand: lab standards, documentation discipline, reporting
                behavior, and process transparency.
              </p>
            </div>

            <div className="rounded-xl border border-[#EFE6D4] bg-white p-6">
              <div className="text-xs tracking-[0.22em] uppercase text-[#6B6B6B]">
                Strategic execution
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[#2C2C2C]">
                A controlled plan: timeline framing, travel + accommodation planning,
                and decision checkpoints.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What we exclude */}
      <section className="max-w-6xl mx-auto px-6 pb-14">
        <div className="rounded-2xl border border-[#E5DDC8] bg-[#FBF8F2] p-8">
          <h3 className="text-xl font-medium">What we deliberately exclude</h3>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-[#2C2C2C]">
            <div className="rounded-xl border border-[#EFE6D4] bg-white p-5">
              ❌ Exhaustive clinic directories (we curate 4–5)
            </div>
            <div className="rounded-xl border border-[#EFE6D4] bg-white p-5">
              ❌ Step-by-step visa walkthroughs (we coordinate, not DIY)
            </div>
            <div className="rounded-xl border border-[#EFE6D4] bg-white p-5">
              ❌ Hotel price scraping (we recommend vetted accommodations)
            </div>
            <div className="rounded-xl border border-[#EFE6D4] bg-white p-5">
              ❌ Every treatment detail (we focus on strategic decision points)
            </div>
          </div>
        </div>
      </section>

      {/* Next actions */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="rounded-2xl border border-[#E5DDC8] bg-[#111111] text-[#F7F2E6] p-8">
          <h3 className="text-xl font-medium">If you’re considering Greece</h3>
          <p className="mt-3 text-sm leading-relaxed text-[#EDE6D6] max-w-3xl">
            The fastest way to reduce risk is to align the jurisdiction to your pathway,
            then shortlist clinics based on standards signals—not marketing. If you want,
            we’ll map your profile to the correct pathway, then curate options and a plan.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              href="/consultation"
              className="inline-flex items-center justify-center rounded-full bg-[#F5EAD2] text-[#1A1A1A] px-6 py-3 text-sm tracking-wide hover:opacity-90 transition"
            >
              Request Advisory Consultation
            </Link>

            <Link
              href="/countries"
              className="inline-flex items-center justify-center rounded-full border border-[#B89B5E] px-6 py-3 text-sm tracking-wide hover:bg-[#1A1A1A] hover:text-[#F7F2E6] transition"
            >
              Back to countries
            </Link>
          </div>
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
      Review Spain Strategy Privately
    </a>

    <p style={{ marginTop: 10, fontSize: 14, color: "rgba(0,0,0,0.55)" }}>
      Discreet, structured guidance aligned to your profile and timeline.
    </p>
  </div>
</section>
