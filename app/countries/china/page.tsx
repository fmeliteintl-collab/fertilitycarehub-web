import Link from "next/link";

export default function ChinaPage() {
  return (
    <main className="min-h-screen bg-[#F5F1E8] text-[#1A1A1A]">
      {/* Top utility bar */}
      <div className="max-w-6xl mx-auto px-6 pt-10">
        <div className="flex items-center justify-between">
          <Link
            href="/countries"
            className="text-sm tracking-wide text-[#6A6256] hover:text-[#1A1A1A]"
          >
            ← Back to countries
          </Link>

          <Link
            href="/consultation"
            className="inline-flex items-center justify-center rounded-full border border-[#B89B5E] px-5 py-2 text-sm tracking-wide text-[#1A1A1A] hover:bg-[#F0E7D6]"
          >
            Review China Strategy Privately
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-14 pb-10">
        <div className="text-center">
          <div className="text-xs tracking-[0.28em] text-[#6A6256]">
            STRATEGIC ADVISORY DOSSIER
          </div>

          <h1 className="mt-5 text-5xl md:text-6xl leading-tight font-medium">
            China
          </h1>

          <p className="mt-6 max-w-3xl mx-auto text-lg leading-relaxed text-[#2A2A2A]">
            China is a highly regulated fertility market where access, eligibility, and approved
            pathways require careful navigation. The strategic advantage can be strong clinical
            capacity inside major centers, but international pathways are not “medical tourism by default.”
            This dossier focuses on governance and execution: when China is appropriate, when it isn’t,
            and how to approach it with precision if it is on your shortlist.
          </p>
        </div>
      </section>

      {/* Two-column decision block */}
      <section className="max-w-6xl mx-auto px-6 pb-10">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-[#E5DDC8] bg-[#FAF7F1] p-8">
            <h2 className="text-xl font-medium">When China is the right choice</h2>
            <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-[#2A2A2A] list-disc pl-5">
              <li>
                You are eligible within the local regulatory model and can meet documentation requirements.
              </li>
              <li>
                You are prioritizing care inside a tightly governed system rather than a medical tourism marketplace.
              </li>
              <li>
                You value large-center capability and institutional structure.
              </li>
              <li>
                Your planning includes structured coordination and clearly defined treatment scope.
              </li>
              <li>
                You prefer a conservative pathway that aligns with local approvals.
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-[#E5DDC8] bg-[#FAF7F1] p-8">
            <h2 className="text-xl font-medium">When it’s not</h2>
            <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-[#2A2A2A] list-disc pl-5">
              <li>
                You want an open-access international medical tourism model.
              </li>
              <li>
                Your pathway requires frameworks that are restricted or not supported locally.
              </li>
              <li>
                You need maximum flexibility in family structure pathways.
              </li>
              <li>
                You want minimal documentation and fast cross-border logistics.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Framework */}
      <section className="max-w-6xl mx-auto px-6 pb-12">
        <div className="rounded-2xl border border-[#E5DDC8] bg-[#FAF7F1] p-8">
          <h2 className="text-2xl font-medium">Advisor framework: how to evaluate China</h2>

          <div className="mt-6 grid md:grid-cols-3 gap-6">
            <div>
              <div className="text-xs tracking-[0.25em] text-[#6A6256]">ELIGIBILITY</div>
              <p className="mt-3 text-[15px] leading-relaxed text-[#2A2A2A]">
                Strategy starts with eligibility. We confirm what is permitted, what is restricted, and what
                documentation is required before any clinical planning.
              </p>
            </div>

            <div>
              <div className="text-xs tracking-[0.25em] text-[#6A6256]">INSTITUTION MODEL</div>
              <p className="mt-3 text-[15px] leading-relaxed text-[#2A2A2A]">
                China is not “clinic shopping.” The right question is which institutional model
                matches your needs — and whether access is feasible.
              </p>
            </div>

            <div>
              <div className="text-xs tracking-[0.25em] text-[#6A6256]">EXECUTION</div>
              <p className="mt-3 text-[15px] leading-relaxed text-[#2A2A2A]">
                Execution requires disciplined coordination: record readiness, scheduling, local follow-up,
                and clarity on what must occur on-site versus remotely.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core sections */}
      <section className="max-w-6xl mx-auto px-6 pb-12">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-[#E5DDC8] bg-[#FAF7F1] p-8">
            <h3 className="text-xl font-medium">Governance and constraints</h3>
            <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-[#2A2A2A] list-disc pl-5">
              <li>
                China operates with tight governance; pathway scope must align with local approvals.
              </li>
              <li>
                Documentation, marital/eligibility rules, and clinic access norms should be clarified early.
              </li>
              <li>
                We identify what can be done outside the country versus what must be executed on-site.
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-[#E5DDC8] bg-[#FAF7F1] p-8">
            <h3 className="text-xl font-medium">Clinic selection approach</h3>
            <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-[#2A2A2A] list-disc pl-5">
              <li>
                We shortlist selectively (typically 4–5), focusing on institutional stability and planning discipline.
              </li>
              <li>
                We prioritize written planning, clear scheduling, and consistent patient communication cadence.
              </li>
              <li>
                We avoid “directory browsing” and structure selection around eligibility and execution.
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-[#E5DDC8] bg-[#FAF7F1] p-8">
            <h3 className="text-xl font-medium">Cost structure (strategic view)</h3>
            <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-[#2A2A2A] list-disc pl-5">
              <li>
                Cost is not the primary variable — access and pathway eligibility often are.
              </li>
              <li>
                We model total cost only after feasibility is confirmed: clinical + monitoring + travel + time.
              </li>
              <li>
                We avoid publishing static pricing without verification and context.
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-[#E5DDC8] bg-[#FAF7F1] p-8">
            <h3 className="text-xl font-medium">Logistics and travel (including accommodation)</h3>
            <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-[#2A2A2A] list-disc pl-5">
              <li>
                China is not optimized for casual medical tourism; travel planning must be structured.
              </li>
              <li>
                We include <strong>accommodation</strong> as execution support: calm, proximity-based options chosen for stability.
              </li>
              <li>
                The priority is minimizing friction during monitoring and procedure windows.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* What we exclude */}
      <section className="max-w-6xl mx-auto px-6 pb-12">
        <div className="rounded-2xl border border-[#E5DDC8] bg-[#FAF7F1] p-8">
          <h3 className="text-xl font-medium">What we deliberately exclude (the private filter)</h3>
          <div className="mt-5 grid md:grid-cols-2 gap-6">
            <ul className="space-y-3 text-[15px] leading-relaxed text-[#2A2A2A] list-disc pl-5">
              <li>Exhaustive clinic directories.</li>
              <li>DIY bureaucracy playbooks.</li>
              <li>Generic “best clinic” rankings without feasibility analysis.</li>
            </ul>
            <ul className="space-y-3 text-[15px] leading-relaxed text-[#2A2A2A] list-disc pl-5">
              <li>Hotel price comparison tables.</li>
              <li>Static pricing without verification.</li>
              <li>One-size-fits-all pathway templates.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="rounded-2xl border border-[#E5DDC8] bg-[#FAF7F1] p-10 text-center">
          <h3 className="text-2xl font-medium">Private advisory, not a public database.</h3>
          <p className="mt-4 max-w-2xl mx-auto text-[15px] leading-relaxed text-[#2A2A2A]">
            If China is on your shortlist, the decisive step is confirming eligibility and feasibility before planning.
            We structure the pathway around governance, access, and execution — not marketing claims.
          </p>

          <div className="mt-7 flex items-center justify-center">
            <Link
              href="/consultation"
              className="inline-flex items-center justify-center rounded-full border border-[#B89B5E] px-6 py-3 text-sm tracking-wide text-[#1A1A1A] hover:bg-[#F0E7D6]"
            >
              Request Private Advisory Review
            </Link>
          </div>

          <div className="mt-3 text-xs tracking-wide text-[#6A6256]">
            Discreet, structured guidance aligned to your profile and jurisdictional constraints.
          </div>
        </div>
      </section>
    </main>
  );
}
