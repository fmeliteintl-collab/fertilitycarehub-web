import Link from "next/link";

export default function UnitedKingdomDossierPage() {
  return (
    <main className="min-h-screen bg-[#FBF7EC] text-[#1A1A1A]">
      <div className="max-w-5xl mx-auto px-6 py-14 md:py-16">
        {/* Top Nav */}
        <div className="flex items-center justify-between gap-4 mb-10">
          <Link
            href="/countries"
            className="text-sm underline underline-offset-4 text-[#6A5A2A]"
          >
            ← Back to countries
          </Link>

          <Link
            href="/consultation#request"
            className="text-sm px-4 py-2 rounded-xl border border-[#B89B5E] bg-[#FFFDF7] text-[#6A5A2A]"
          >
            Request Advisory Consultation
          </Link>
        </div>

        {/* Header */}
        <header className="text-center mb-12 md:mb-14">
          <div className="text-xs tracking-[0.18em] uppercase text-[#6A5A2A]">
            Strategic Advisory Dossier
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl tracking-tight">
            United Kingdom
          </h1>

          <p className="mt-6 text-base md:text-lg leading-relaxed text-[#3F3F3F] max-w-3xl mx-auto">
            The UK is a governance-first jurisdiction. Its regulatory environment can
            reduce uncertainty — but it also introduces constraints, eligibility
            rules, and pathway complexity (private vs NHS). This dossier outlines
            when the UK is the right strategic choice, when it is not, and how to
            navigate it with precision.
          </p>
        </header>

        {/* Advisor’s Call: Who UK fits */}
        <section className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="md:col-span-2 rounded-2xl border border-[#E5DDC8] bg-[#FFFDF7] p-7">
            <h2 className="text-xl tracking-wide">When the UK is the right choice</h2>
            <ul className="mt-4 space-y-3 text-[#3F3F3F] leading-relaxed list-disc pl-5">
              <li>
                You value a highly regulated framework and clear oversight (HFEA),
                especially when you want strong governance signals.
              </li>
              <li>
                You need a structured, clinically conservative approach and want to
                compare outcomes using consistent public reporting.
              </li>
              <li>
                You can tolerate longer timelines and selection criteria — particularly
                if exploring NHS pathways or high-demand private clinics.
              </li>
              <li>
                You want clarity on donor rules and long-term child access to donor
                identity (UK is transparent compared to anonymous systems).
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-[#E5DDC8] bg-[#FFFDF7] p-7">
            <h2 className="text-xl tracking-wide">When it’s not</h2>
            <ul className="mt-4 space-y-3 text-[#3F3F3F] leading-relaxed list-disc pl-5">
              <li>Speed is your primary objective.</li>
              <li>
                Your plan relies on commercial surrogacy (not permitted).
              </li>
              <li>
                You want fully anonymous donor pathways (UK rules are non-anonymous).
              </li>
              <li>
                You require the broadest permissive access profiles (the UK can be
                more administratively strict depending on pathway).
              </li>
            </ul>
          </div>
        </section>

        {/* Pricing & timeline */}
        <section className="rounded-2xl border border-[#E5DDC8] bg-[#FFFDF7] p-7 mb-12">
          <h2 className="text-xl tracking-wide">Cost architecture (private)</h2>

          <div className="mt-5 grid md:grid-cols-3 gap-5">
            <div className="rounded-xl border border-[#E5DDC8] bg-[#FBF7EC] p-5">
              <div className="text-xs tracking-[0.18em] uppercase text-[#6A5A2A]">
                Low
              </div>
              <div className="mt-2 text-lg">£2,950 – £4,500</div>
              <p className="mt-2 text-sm leading-relaxed text-[#4A4A4A]">
                Budget models and limited add-ons. Typically excludes medications and
                optional lab enhancements.
              </p>
            </div>

            <div className="rounded-xl border border-[#E5DDC8] bg-[#FBF7EC] p-5">
              <div className="text-xs tracking-[0.18em] uppercase text-[#6A5A2A]">
                Mid
              </div>
              <div className="mt-2 text-lg">£4,500 – £7,500</div>
              <p className="mt-2 text-sm leading-relaxed text-[#4A4A4A]">
                Standard private IVF/ICSI structures with typical monitoring cadence
                and broader clinician time.
              </p>
            </div>

            <div className="rounded-xl border border-[#E5DDC8] bg-[#FBF7EC] p-5">
              <div className="text-xs tracking-[0.18em] uppercase text-[#6A5A2A]">
                High
              </div>
              <div className="mt-2 text-lg">£7,500 – £12,000+</div>
              <p className="mt-2 text-sm leading-relaxed text-[#4A4A4A]">
                Premium clinic pathways and add-ons (including genetic testing,
                multiple consult touchpoints, and enhanced lab options).
              </p>
            </div>
          </div>

          <div className="mt-6 text-sm leading-relaxed text-[#4A4A4A]">
            Notes: UK pricing varies heavily by clinic and add-on stack. NHS funding can
            reduce cost materially but is subject to strict eligibility and waiting
            times (often long).
          </div>
        </section>

        {/* Legal & ethics */}
        <section className="rounded-2xl border border-[#E5DDC8] bg-[#FFFDF7] p-7 mb-12">
          <h2 className="text-xl tracking-wide">Legal & regulatory posture (high-level)</h2>

          <div className="mt-5 grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg">Surrogacy</h3>
              <ul className="mt-3 space-y-2 text-[#3F3F3F] leading-relaxed list-disc pl-5">
                <li>Commercial surrogacy is not permitted.</li>
                <li>Altruistic surrogacy exists, but agreements are complex.</li>
                <li>Not ideal if your strategy requires enforceable commercial structures.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg">Donors & anonymity</h3>
              <ul className="mt-3 space-y-2 text-[#3F3F3F] leading-relaxed list-disc pl-5">
                <li>Donor anonymity is not the default (identity access at adulthood).</li>
                <li>
                  Strong for governance and future transparency, weaker for strict privacy
                  preferences.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg">Embryo / egg storage</h3>
              <ul className="mt-3 space-y-2 text-[#3F3F3F] leading-relaxed list-disc pl-5">
                <li>Storage limits exist, with extensions in certain circumstances.</li>
                <li>Plan early for cross-border continuity if you may relocate.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg">Regulator signal</h3>
              <ul className="mt-3 space-y-2 text-[#3F3F3F] leading-relaxed list-disc pl-5">
                <li>HFEA oversight supports public comparability of outcomes.</li>
                <li>Patients can use consistent reporting to pressure-test claims.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Curated shortlist */}
        <section className="rounded-2xl border border-[#E5DDC8] bg-[#FFFDF7] p-7 mb-12">
          <h2 className="text-xl tracking-wide">Curated starting shortlist (private view)</h2>
          <p className="mt-4 text-[#3F3F3F] leading-relaxed">
            We deliberately do not publish exhaustive clinic directories. The UK landscape
            is best approached with a curated shortlist aligned to your profile and pathway.
            Below are reputable starting points to anchor early conversations.
          </p>

          <div className="mt-6 grid md:grid-cols-3 gap-5">
            <div className="rounded-xl border border-[#E5DDC8] bg-[#FBF7EC] p-5">
              <div className="text-base">London Women’s Clinic</div>
              <div className="mt-2 text-sm text-[#4A4A4A] leading-relaxed">
                London — premium private option; broad services.
              </div>
            </div>

            <div className="rounded-xl border border-[#E5DDC8] bg-[#FBF7EC] p-5">
              <div className="text-base">Manchester Fertility</div>
              <div className="mt-2 text-sm text-[#4A4A4A] leading-relaxed">
                Manchester — established clinic model with standard pathways.
              </div>
            </div>

            <div className="rounded-xl border border-[#E5DDC8] bg-[#FBF7EC] p-5">
              <div className="text-base">Essential Fertility (network model)</div>
              <div className="mt-2 text-sm text-[#4A4A4A] leading-relaxed">
                Multi-city — lower-cost structures; evaluate inclusions carefully.
              </div>
            </div>
          </div>

          <p className="mt-6 text-sm text-[#4A4A4A] leading-relaxed">
            If you request advisory, we convert the shortlist into a profile-matched plan:
            clinic fit, add-on stack, timeline, and risk controls.
          </p>
        </section>

        {/* Travel & logistics */}
        <section className="rounded-2xl border border-[#E5DDC8] bg-[#FFFDF7] p-7 mb-12">
          <h2 className="text-xl tracking-wide">Travel & logistics (executive summary)</h2>

          <div className="mt-5 grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg">Main hubs</h3>
              <ul className="mt-3 space-y-2 text-[#3F3F3F] leading-relaxed list-disc pl-5">
                <li>London (LHR / LGW), Manchester (MAN), Birmingham (BHX), Edinburgh (EDI)</li>
                <li>Best for multi-visit schedules and predictable clinical monitoring cadence</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg">Local transport</h3>
              <ul className="mt-3 space-y-2 text-[#3F3F3F] leading-relaxed list-disc pl-5">
                <li>London: Tube + taxi/rideshare; regional: taxi + rail</li>
                <li>Clinic travel is simple; appointment access is the variable</li>
              </ul>
            </div>
          </div>

          <p className="mt-6 text-sm text-[#4A4A4A] leading-relaxed">
            We do not publish step-by-step visa instructions. For international clients, we
            provide a partner-led checklist and documentation guidance during advisory.
          </p>
        </section>

        {/* Closing CTA */}
        <section className="text-center border border-[#E5DDC8] bg-[#FFFDF7] rounded-2xl p-9">
          <h2 className="text-2xl tracking-wide">Want a UK pathway designed for your profile?</h2>
          <p className="mt-4 text-[#3F3F3F] leading-relaxed max-w-2xl mx-auto">
            Advisory converts broad information into a decision-ready plan: jurisdiction fit,
            clinic shortlist, timeline, cost band, and legal constraints — without noise.
          </p>

          <div className="mt-7 flex items-center justify-center gap-3 flex-wrap">
            <Link
              href="/consultation#request"
              className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm tracking-wide"
              style={{ background: "#B89B5E", color: "#fff" }}
            >
              Request Advisory Consultation
            </Link>

            <Link
              href="/countries"
              className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm tracking-wide border border-[#D7C9A6] text-[#6A5A2A] bg-[#FBF7EC]"
            >
              Browse countries
            </Link>
          </div>
        </section>

        {/* Footer note */}
        <div className="mt-10 text-center text-xs text-[#6A6A6A] leading-relaxed">
          This dossier is informational and does not replace medical or legal advice.
          For profile-specific planning, request advisory consultation.
        </div>
      </div>
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
      Review United-Kingdom Strategy Privately
    </a>

    <p style={{ marginTop: 10, fontSize: 14, color: "rgba(0,0,0,0.55)" }}>
      Discreet, structured guidance aligned to your profile and timeline.
    </p>
  </div>
</section>
