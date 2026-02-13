import Link from "next/link";
type Country = {
  slug: string;
  name: string;
  status: "Live" | "In build";
  oneLiner: string;
};
const COUNTRIES: Country[] = [
  {
    slug: "spain",
    name: "Spain",
    status: "Live",
    oneLiner: "A permissive, high-standard European option with strong donor and clinic depth.",
  },
  {
    slug: "greece",
    name: "Greece",
    status: "Live",
    oneLiner: "Value + accessibility in Europe, often strong for donor pathways and planning.",
  },
  {
    slug: "portugal",
    name: "Portugal",
    status: "Live",
    oneLiner: "A modern regulatory environment with growing clinic maturity and strong patient experience.",
  },
  {
    slug: "czech-republic",
    name: "Czech Republic",
    status: "Live",
    oneLiner: "A structured Central Europe choice with clear clinic models and predictable logistics.",
  },
  {
  slug: "united-kingdom",
  name: "United Kingdom",
  status: "Live",
  oneLiner: "Highly regulated (HFEA) with clear donor/surrogacy rules—strong when governance matters most.",
},
  {
    slug: "canada",
    name: "Canada",
    status: "Live",
    oneLiner: "Governance-forward care within a structured, ethically bounded framework",
  }
  {
    slug: "united-states",
    name: "United States",
    status: "Live",
    oneLiner: "The premium benchmark for breadth—best when complexity requires top-tier capabilities.",
  },
  {
    slug: "india",
    name: "India",
    status: "Live",
    oneLiner: "Cost-differntiated, high-volume market where clinic selection is decisive.",
  },
  {
    slug: "turkey",
    name: "Turkey",
    status: "Live",
    oneLiner: "A cross-continental medical hub combiningt affordability with advanced private hospital infrastructure.",
  },
  {
    slug: "mexico",
    name: "Mexico",
    status: "Live",
    oneLiner: "A proximity and cost-structure option where vetting and standards selection are key.",
  },
  {
    slug: "china",
    name: "China",
    status: "Live",
    oneLiner: "A highly regulated domestic market wheer access and eligibility require careful navigation.",
  },
];
export default function CountriesPage() {
  return (
    <main
      style={{
        maxWidth: 1100,
        margin: "0 auto",
        padding: "64px 20px",
      }}
    >
      <header style={{ textAlign: "center", marginBottom: 40 }}>
        <h1
          style={{
            fontSize: 40,
            lineHeight: 1.15,
            margin: 0,
            letterSpacing: "-0.02em",
          }}
        >
          Global Fertility Destinations
        </h1>
        <p
          style={{
            marginTop: 12,
            marginBottom: 0,
            fontSize: 18,
            lineHeight: 1.6,
            maxWidth: 720,
            marginLeft: "auto",
            marginRight: "auto",
            color: "rgba(0,0,0,0.70)",
          }}
        >
          Explore structured, strategic fertility intelligence by country — curated as
          advisor-style dossiers, not a public database.
        </p>
      </header>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 18,
        }}
      >
        {COUNTRIES.map((c) => (
          <Link
            key={c.slug}
            href={`/countries/${c.slug}`}
            style={{
              textDecoration: "none",
              color: "inherit",
              borderRadius: 18,
              border: "1px solid rgba(0,0,0,0.10)",
              background: "rgba(255,255,255,0.55)",
              padding: 18,
              display: "block",
              transition: "transform 120ms ease, box-shadow 120ms ease",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                marginBottom: 10,
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: 22,
                  letterSpacing: "-0.01em",
                }}
              >
                {c.name}
              </h2>

              <span
                style={{
                  fontSize: 12,
                  padding: "6px 10px",
                  borderRadius: 999,
                  border: "1px solid rgba(0,0,0,0.12)",
                  background: c.status === "Live" ? "rgba(184,155,94,0.18)" : "rgba(0,0,0,0.06)",
                  color: "rgba(0,0,0,0.75)",
                  whiteSpace: "nowrap",
                }}
              >
                {c.status}
              </span>
            </div>
            <div
              style={{
                fontSize: 12,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "rgba(0,0,0,0.55)",
                marginBottom: 10,
              }}
            >
              Strategic Advisory Dossier
            </div>

            <p
              style={{
                margin: 0,
                fontSize: 15,
                lineHeight: 1.6,
                color: "rgba(0,0,0,0.72)",
              }}
            >
              {c.oneLiner}
            </p>

            <div
              style={{
                marginTop: 14,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontSize: 14,
                color: "rgba(0,0,0,0.78)",
              }}
            >
              View dossier <span aria-hidden="true">→</span>
            </div>
          </Link>
        ))}
      </section>

      <section
        style={{
          marginTop: 34,
          paddingTop: 22,
          borderTop: "1px solid rgba(0,0,0,0.10)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <p style={{ margin: 0, color: "rgba(0,0,0,0.70)" }}>
          Want help choosing the right country path for your profile?
        </p>

        <Link
          href="/consultation"
          style={{
            textDecoration: "none",
            border: "1px solid #B89B5E",
            padding: "10px 14px",
            borderRadius: 12,
            color: "rgba(0,0,0,0.85)",
            background: "rgba(184,155,94,0.10)",
          }}
        >
          Request Advisory Consultation
        </Link>
      </section>
    </main>
  );
}
