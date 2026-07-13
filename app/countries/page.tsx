import type { Metadata } from "next";
import Breadcrumbs from "../components/Breadcrumbs";
import Link from "next/link";

const baseUrl = "https://fertilitycarehub.com";
const pageUrl = `${baseUrl}/countries`;

export const metadata: Metadata = {
  title: "Fertility Treatment Countries and Jurisdiction Dossiers",
  description:
    "Explore FertilityCareHub country dossiers covering fertility regulation, donor pathways, clinical infrastructure, access, logistics, and cross-border planning.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Fertility Treatment Countries and Jurisdiction Dossiers",
    description:
      "Explore structured fertility jurisdiction dossiers covering regulation, access, donor pathways, clinical infrastructure, logistics, and execution risk.",
    url: pageUrl,
    siteName: "FertilityCareHub",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fertility Treatment Countries and Jurisdiction Dossiers",
    description:
      "Structured international fertility intelligence by country.",
  },
};

const countries = [
  {
    slug: "spain",
    name: "Spain",
    status: "Live",
    oneLiner:
      "A permissive, high-standard European option with strong donor depth and clinic maturity.",
  },
  {
    slug: "greece",
    name: "Greece",
    status: "Live",
    oneLiner:
      "Value-aligned European access with structured donor pathways and logistical flexibility.",
  },
  {
    slug: "portugal",
    name: "Portugal",
    status: "Live",
    oneLiner:
      "A modern regulatory environment with growing clinical maturity and strong patient experience.",
  },
  {
    slug: "czech-republic",
    name: "Czech Republic",
    status: "Live",
    oneLiner:
      "A structured Central European option with predictable logistics and disciplined clinic models.",
  },
  {
    slug: "united-kingdom",
    name: "United Kingdom",
    status: "Live",
    oneLiner:
      "Highly regulated care with clear governance when oversight and structure matter most.",
  },
  {
    slug: "canada",
    name: "Canada",
    status: "Live",
    oneLiner:
      "Governance-forward care within a tightly regulated and ethically bounded framework.",
  },
  {
    slug: "united-states",
    name: "United States",
    status: "Live",
    oneLiner:
      "A premium market with broad capability, suited to complex or highly structured cases.",
  },
  {
    slug: "india",
    name: "India",
    status: "Live",
    oneLiner:
      "A cost-differentiated, high-volume market where clinic selection and regulatory clarity are decisive.",
  },
  {
    slug: "turkey",
    name: "Turkey",
    status: "Live",
    oneLiner:
      "A cross-continental medical hub combining relative affordability with developed private infrastructure.",
  },
  {
    slug: "mexico",
    name: "Mexico",
    status: "Live",
    oneLiner:
      "A proximity-driven option where clinic vetting and execution discipline are especially important.",
  },
  {
    slug: "china",
    name: "China",
    status: "Live",
    oneLiner:
      "A highly regulated domestic system where eligibility, governance, and institutional access define strategy.",
  },
];

const collectionPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "FertilityCareHub Country Intelligence",
  description:
    "Structured fertility jurisdiction dossiers covering regulation, access, donor pathways, clinical infrastructure, logistics, and execution risk.",
  url: pageUrl,
  isPartOf: {
    "@type": "WebSite",
    name: "FertilityCareHub",
    url: baseUrl,
  },
  hasPart: countries.map((country) => ({
    "@type": "WebPage",
    name: `${country.name} Fertility Jurisdiction Dossier`,
    url: `${baseUrl}/countries/${country.slug}`,
    description: country.oneLiner,
  })),
};

export default function CountriesPage() {
  return (
    <main
      style={{
        maxWidth: 1100,
        margin: "0 auto",
        padding: "52px 20px 72px",
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionPageSchema),
        }}
      />

      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Countries", href: "/countries" },
        ]}
      />

      <header
        style={{
          textAlign: "center",
          marginTop: 34,
          marginBottom: 42,
        }}
      >
        <div
          style={{
            fontSize: 12,
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            color: "#7B6A3A",
            marginBottom: 12,
          }}
        >
          FertilityCareHub Country Intelligence
        </div>

        <h1
          style={{
            fontSize: "clamp(38px, 6vw, 56px)",
            lineHeight: 1.12,
            margin: 0,
            fontWeight: 500,
            letterSpacing: "-0.03em",
          }}
        >
          Global Fertility Jurisdiction Dossiers
        </h1>

        <p
          style={{
            marginTop: 18,
            marginBottom: 0,
            fontSize: 18,
            lineHeight: 1.7,
            maxWidth: 780,
            marginLeft: "auto",
            marginRight: "auto",
            color: "rgba(0,0,0,0.70)",
          }}
        >
          Explore structured country intelligence covering fertility regulation,
          eligibility, donor pathways, clinical infrastructure, logistics,
          documentation, costs, and execution risk.
        </p>

        <p
          style={{
            marginTop: 14,
            marginBottom: 0,
            fontSize: 14,
            lineHeight: 1.7,
            maxWidth: 760,
            marginLeft: "auto",
            marginRight: "auto",
            color: "#6A6256",
          }}
        >
          These dossiers are designed as strategic planning resources rather
          than public clinic rankings or promotional destination lists.
        </p>
      </header>

      <section
        style={{
          marginBottom: 26,
          background: "rgba(255,255,255,0.58)",
          border: "1px solid #E5DDC8",
          borderRadius: 18,
          padding: 22,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 20,
            alignItems: "start",
          }}
        >
          <div>
            <div
              style={{
                fontSize: 12,
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                color: "#7B6A3A",
                marginBottom: 8,
              }}
            >
              Before choosing a destination
            </div>

            <p
              style={{
                margin: 0,
                fontSize: 15,
                lineHeight: 1.7,
                color: "rgba(0,0,0,0.74)",
              }}
            >
              Use the strategic comparison framework to identify which
              jurisdictions fit your legal, medical, donor, financial, and
              logistical requirements before evaluating individual clinics.
            </p>

            <Link
              href="/how-to-compare-fertility-jurisdictions"
              style={{
                display: "inline-block",
                marginTop: 14,
                color: "#715F33",
                textDecoration: "underline",
                textUnderlineOffset: 4,
                fontSize: 14,
              }}
            >
              Read the jurisdiction comparison guide →
            </Link>
          </div>

          <div>
            <div
              style={{
                fontSize: 12,
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                color: "#7B6A3A",
                marginBottom: 8,
              }}
            >
              Browse the knowledge library
            </div>

            <p
              style={{
                margin: 0,
                fontSize: 15,
                lineHeight: 1.7,
                color: "rgba(0,0,0,0.74)",
              }}
            >
              Explore planning guides covering clinic selection, success rates,
              hidden costs, travel preparation, donor pathways, and cross-border
              decision risk.
            </p>

            <Link
              href="/guides"
              style={{
                display: "inline-block",
                marginTop: 14,
                color: "#715F33",
                textDecoration: "underline",
                textUnderlineOffset: 4,
                fontSize: 14,
              }}
            >
              Browse all fertility guides →
            </Link>
          </div>
        </div>
      </section>

      <section
        style={{
          marginBottom: 32,
          padding: "18px 20px",
          background: "#EEE5D2",
          border: "1px solid #D8C89F",
          borderRadius: 16,
        }}
      >
        <div
          style={{
            fontSize: 12,
            textTransform: "uppercase",
            letterSpacing: "0.14em",
            color: "#7B6A3A",
            marginBottom: 7,
          }}
        >
          Independent methodology
        </div>

        <p
          style={{
            margin: 0,
            fontSize: 14,
            lineHeight: 1.7,
            color: "#5F584D",
          }}
        >
          Country dossiers are developed using the FCH Global Fertility
          Intelligence Framework(TM). Jurisdictions are considered across
          regulatory alignment, access, donor policy, clinical infrastructure,
          coordination burden, documentation, and execution complexity. Current
          rules should always be confirmed with licensed professionals and
          providers.
        </p>
      </section>

      <section
        aria-labelledby="country-dossiers-heading"
        style={{
          marginTop: 8,
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: 26,
          }}
        >
          <h2
            id="country-dossiers-heading"
            style={{
              margin: 0,
              fontSize: 30,
              lineHeight: 1.25,
              fontWeight: 600,
            }}
          >
            Explore Country Dossiers
          </h2>

          <p
            style={{
              margin: "10px auto 0",
              maxWidth: 690,
              fontSize: 15,
              lineHeight: 1.7,
              color: "rgba(0,0,0,0.66)",
            }}
          >
            Begin with the countries most relevant to your pathway, then compare
            a focused shortlist rather than treating every destination as
            equally suitable.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 18,
          }}
        >
          {countries.map((country) => (
            <Link
              key={country.slug}
              href={`/countries/${country.slug}`}
              aria-label={`View the ${country.name} fertility jurisdiction dossier`}
              style={{
                textDecoration: "none",
                color: "inherit",
                borderRadius: 18,
                border: "1px solid rgba(0,0,0,0.10)",
                background: "rgba(255,255,255,0.58)",
                padding: 20,
                display: "block",
                boxShadow: "0 8px 24px rgba(43,43,43,0.03)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                  marginBottom: 11,
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    fontSize: 22,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {country.name}
                </h3>

                <span
                  style={{
                    fontSize: 11,
                    padding: "5px 9px",
                    borderRadius: 999,
                    border: "1px solid #D8C89F",
                    background: "#EEE5D2",
                    color: "#6F5E31",
                    whiteSpace: "nowrap",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  {country.status}
                </span>
              </div>

              <div
                style={{
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "rgba(0,0,0,0.52)",
                  marginBottom: 10,
                }}
              >
                Strategic Advisory Dossier
              </div>

              <p
                style={{
                  margin: 0,
                  fontSize: 15,
                  lineHeight: 1.65,
                  color: "rgba(0,0,0,0.72)",
                }}
              >
                {country.oneLiner}
              </p>

              <div
                style={{
                  marginTop: 16,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 14,
                  color: "#715F33",
                }}
              >
                View dossier <span aria-hidden="true">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section
        style={{
          marginTop: 42,
          paddingTop: 30,
          borderTop: "1px solid rgba(0,0,0,0.10)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 18,
          }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.58)",
              border: "1px solid #E5DDC8",
              borderRadius: 16,
              padding: 22,
            }}
          >
            <div
              style={{
                fontSize: 12,
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                color: "#7B6A3A",
                marginBottom: 8,
              }}
            >
              Compare jurisdictions
            </div>

            <p
              style={{
                margin: 0,
                fontSize: 15,
                lineHeight: 1.7,
                color: "rgba(0,0,0,0.70)",
              }}
            >
              Review available country-to-country comparisons and evaluate
              regulatory, donor, clinical, financial, and logistical differences.
            </p>

            <Link
              href="/compare"
              style={{
                display: "inline-block",
                marginTop: 14,
                color: "#715F33",
                textDecoration: "underline",
                textUnderlineOffset: 4,
                fontSize: 14,
              }}
            >
              View jurisdiction comparisons →
            </Link>
          </div>

          <div
            style={{
              background: "#1A1A1A",
              borderRadius: 16,
              padding: 22,
              color: "#FFFFFF",
            }}
          >
            <div
              style={{
                fontSize: 12,
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                color: "#D4BE82",
                marginBottom: 8,
              }}
            >
              Private advisory
            </div>

            <p
              style={{
                margin: 0,
                fontSize: 15,
                lineHeight: 1.7,
                color: "#D4D0C8",
              }}
            >
              Need help identifying the right jurisdiction path for your
              treatment profile, priorities, constraints, and timeline?
            </p>

            <Link
              href="/consultation"
              style={{
                display: "inline-block",
                marginTop: 14,
                border: "1px solid #D4BE82",
                padding: "10px 14px",
                borderRadius: 12,
                color: "#F2E4BC",
                textDecoration: "none",
                fontSize: 14,
              }}
            >
              Request Advisory Consultation
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}