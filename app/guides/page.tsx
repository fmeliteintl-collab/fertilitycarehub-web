import type { Metadata } from "next";
import Link from "next/link";

const baseUrl = "https://fertilitycarehub.com";
const pageUrl = `${baseUrl}/guides`;

export const metadata: Metadata = {
  title: "Fertility Guides and Cross-Border Planning Resources",
  description:
    "Explore independent fertility guides covering international treatment jurisdictions, clinic selection, success rates, costs, legal considerations, and cross-border planning.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Fertility Guides and Cross-Border Planning Resources",
    description:
      "Independent, structured guidance for evaluating fertility jurisdictions, clinics, costs, treatment reporting, regulations, and cross-border execution risks.",
    url: pageUrl,
    siteName: "FertilityCareHub",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fertility Guides and Cross-Border Planning Resources",
    description:
      "Independent planning resources for international fertility treatment decisions.",
  },
};

type Guide = {
  title: string;
  description: string;
  category: string;
  href: string | null;
  status: "Published" | "Coming soon";
  reviewed?: string;
};

const guides: Guide[] = [
  {
    title: "How to Compare Fertility Jurisdictions Strategically",
    description:
      "Use a structured framework to compare regulation, eligibility, donor pathways, clinic governance, costs, logistics, and execution risk across countries.",
    category: "Jurisdiction Comparison",
    href: "/how-to-compare-fertility-jurisdictions",
    status: "Published",
    reviewed: "July 12, 2026",
  },
  {
    title: "How to Choose a Fertility Clinic Abroad",
    description:
      "Evaluate licensing, laboratory governance, treatment transparency, communication standards, total costs, donor practices, and continuity of care.",
    category: "Clinic Selection",
    href: "/how-to-choose-a-fertility-clinic-abroad",
    status: "Published",
    reviewed: "July 12, 2026",
  },
  {
    title: "Understanding Fertility Clinic Success Rates",
    description:
      "Learn how pregnancy, ongoing-pregnancy, live-birth, per-cycle, per-transfer, cumulative, age-specific, and donor-treatment reporting measures differ.",
    category: "Success Rates",
    href: "/understanding-fertility-clinic-success-rates",
    status: "Published",
    reviewed: "July 15, 2026",
  },
  {
    title: "Hidden Costs of Fertility Treatment Abroad",
    description:
      "Identify medication, testing, donor, laboratory, storage, freezing, transfer, travel, accommodation, cancellation, and repeat-treatment expenses.",
    category: "Costs and Planning",
    href: "/hidden-costs-of-fertility-treatment-abroad",
    status: "Published",
    reviewed: "July 15, 2026",
  },
  {
    title: "Spain vs Greece for Fertility Treatment",
    description:
      "Compare two established European fertility destinations across eligibility, donor pathways, clinical infrastructure, costs, and travel complexity.",
    category: "Country Comparison",
    href: null,
    status: "Coming soon",
  },
  {
    title: "IVF Abroad vs Canada",
    description:
      "Assess the tradeoffs between pursuing treatment within Canada and considering an international fertility pathway.",
    category: "Country Comparison",
    href: null,
    status: "Coming soon",
  },
  {
    title: "Fertility Treatment Travel Checklist",
    description:
      "Organize medical records, medications, travel dates, accommodation, insurance, documentation, and continuity-of-care planning.",
    category: "Travel Planning",
    href: null,
    status: "Coming soon",
  },
  {
    title: "Questions to Ask a Fertility Clinic",
    description:
      "Use a structured question set to assess treatment protocols, laboratory practices, communication, pricing, cancellation policies, and follow-up care.",
    category: "Clinic Selection",
    href: null,
    status: "Coming soon",
  },
  {
    title: "IVF Costs in Spain",
    description:
      "Understand the components that may affect treatment pricing, including medication, testing, laboratory services, donor pathways, storage, and travel.",
    category: "Country Costs",
    href: null,
    status: "Coming soon",
  },
  {
    title: "Egg Donation in Spain",
    description:
      "Review the planning issues surrounding donor availability, eligibility, anonymity rules, clinic governance, costs, and cross-border logistics.",
    category: "Donor Pathways",
    href: null,
    status: "Coming soon",
  },
];

const topics = [
  {
    title: "Country Intelligence",
    description:
      "Review jurisdiction-specific information about access, regulation, donor pathways, clinical infrastructure, costs, and execution considerations.",
    href: "/countries",
    linkLabel: "Explore Country Dossiers",
  },
  {
    title: "Jurisdiction Comparisons",
    description:
      "Compare countries using consistent decision factors rather than promotional rankings or isolated package prices.",
    href: "/compare",
    linkLabel: "View Jurisdiction Comparisons",
  },
  {
    title: "Clinic Selection",
    description:
      "Learn how to evaluate licensing, laboratory governance, treatment transparency, communication, pricing, and continuity of care.",
    href: "/how-to-choose-a-fertility-clinic-abroad",
    linkLabel: "Read the Clinic Selection Guide",
  },
  {
    title: "Costs and Financial Planning",
    description:
      "Understand treatment-package limitations, medications, testing, donor costs, travel expenses, cancellation exposure, storage, and repeat-cycle risk.",
    href: "/hidden-costs-of-fertility-treatment-abroad",
    linkLabel: "Read the Hidden Costs Guide",
  },
  {
    title: "Success Rates and Reporting",
    description:
      "Interpret clinic outcome statistics carefully by identifying the denominator, patient population, treatment type, age group, donor use, and reported endpoint.",
    href: "/understanding-fertility-clinic-success-rates",
    linkLabel: "Read the Success Rates Guide",
  },
  {
    title: "Legal and Regulatory Planning",
    description:
      "Identify jurisdiction-specific questions involving eligibility, donor anonymity, parentage, documentation, storage, and cross-border compliance.",
    href: null,
    linkLabel: null,
  },
  {
    title: "Treatment and Travel Planning",
    description:
      "Prepare for timelines, medical-record transfers, medications, accommodation, appointment coordination, and post-treatment continuity.",
    href: null,
    linkLabel: null,
  },
];

const faqs = [
  {
    question: "Why does FertilityCareHub not rank fertility clinics?",
    answer:
      "Clinic quality and suitability depend on the patient, treatment pathway, laboratory capabilities, regulatory environment, communication needs, cost structure, and continuity-of-care requirements. FertilityCareHub uses structured evaluation principles rather than promotional rankings.",
  },
  {
    question: "How are FertilityCareHub guides reviewed?",
    answer:
      "Guides are developed using the FertilityCareHub strategic framework and are reviewed for structure, clarity, jurisdiction relevance, planning usefulness, and appropriate qualification of medical, legal, regulatory, and financial information.",
  },
  {
    question: "Are these guides medical or legal advice?",
    answer:
      "No. The guides provide general educational and strategic planning information. They do not replace advice from licensed medical, legal, financial, or regulatory professionals who understand the reader's individual circumstances.",
  },
  {
    question: "Who should use these fertility guides?",
    answer:
      "The guides are intended for individuals, couples, intended parents, and families comparing fertility-treatment jurisdictions, clinics, donor pathways, costs, travel requirements, and cross-border planning considerations.",
  },
];

const collectionPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "FertilityCareHub Guides and Knowledge Hub",
  description:
    "Independent fertility planning guides covering international jurisdictions, clinic selection, treatment costs, success rates, legal considerations, and cross-border execution.",
  url: pageUrl,
  isPartOf: {
    "@type": "WebSite",
    name: "FertilityCareHub",
    url: baseUrl,
  },
  hasPart: guides
    .filter((guide) => guide.href)
    .map((guide) => ({
      "@type": "Article",
      headline: guide.title,
      description: guide.description,
      url: `${baseUrl}${guide.href}`,
    })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: baseUrl,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Guides",
      item: pageUrl,
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function GuidesPage() {
  const publishedGuides = guides.filter(
    (guide) => guide.status === "Published"
  );
  const upcomingGuides = guides.filter(
    (guide) => guide.status === "Coming soon"
  );

  return (
    <main
      style={{
        fontFamily: "Georgia, serif",
        backgroundColor: "#f8f6f2",
        color: "#2b2b2b",
        lineHeight: 1.65,
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionPageSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <section
        style={{
          padding: "34px 20px 0",
          maxWidth: 1120,
          margin: "0 auto",
        }}
      >
        <nav aria-label="Breadcrumb" style={{ fontSize: 13, color: "#6a6256" }}>
          <Link
            href="/"
            style={{
              color: "inherit",
              textDecoration: "underline",
              textUnderlineOffset: 3,
            }}
          >
            Home
          </Link>{" "}
          <span aria-hidden="true">/</span> <span>Guides</span>
        </nav>
      </section>

      <section
        style={{
          padding: "90px 20px 80px",
          textAlign: "center",
          maxWidth: 960,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            fontSize: 12,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#8a7a55",
            marginBottom: 14,
          }}
        >
          FertilityCareHub Knowledge Hub
        </div>

        <h1
          style={{
            fontSize: "clamp(38px, 6vw, 58px)",
            lineHeight: 1.12,
            fontWeight: 500,
            margin: "0 0 24px",
          }}
        >
          Fertility Guides for Cross-Border Planning
        </h1>

        <p
          style={{
            maxWidth: 790,
            margin: "0 auto",
            color: "#555",
            fontSize: 18,
          }}
        >
          Independent, structured resources for evaluating fertility
          jurisdictions, clinics, donor pathways, costs, reporting standards,
          legal considerations, travel logistics, and execution risk.
        </p>

        <div
          style={{
            marginTop: 30,
            display: "flex",
            justifyContent: "center",
            gap: 14,
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/countries"
            style={{
              display: "inline-block",
              padding: "12px 24px",
              backgroundColor: "#b8a77a",
              color: "#ffffff",
              borderRadius: 4,
              textDecoration: "none",
            }}
          >
            Explore Country Intelligence
          </Link>

          <Link
            href="/consultation"
            style={{
              display: "inline-block",
              padding: "12px 24px",
              border: "1px solid #b8a77a",
              color: "#78683f",
              borderRadius: 4,
              textDecoration: "none",
            }}
          >
            Request Private Intake
          </Link>
        </div>

        <div
          style={{
            margin: "36px auto 0",
            maxWidth: 820,
            padding: "24px 26px",
            backgroundColor: "#ffffff",
            border: "1px solid #e5ddc8",
            borderRadius: 8,
            textAlign: "left",
          }}
        >
          <div
            style={{
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#8a7a55",
              marginBottom: 8,
            }}
          >
            Need Personalized Guidance?
          </div>

          <p style={{ margin: "0 0 14px", color: "#555", fontSize: 15 }}>
            Explore structured advisory support for complex cross-border
            fertility planning, jurisdiction selection, clinic evaluation,
            costs, documentation, and execution risk.
          </p>

          <Link
            href="/advisory"
            style={{
              color: "#78683f",
              textDecoration: "underline",
              textUnderlineOffset: 4,
            }}
          >
            View Advisory Options →
          </Link>
        </div>
      </section>

      <section
        style={{
          padding: "80px 20px",
          backgroundColor: "#ffffff",
          borderTop: "1px solid #ece3d1",
          borderBottom: "1px solid #ece3d1",
        }}
      >
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div style={{ maxWidth: 760, marginBottom: 34 }}>
            <div
              style={{
                fontSize: 12,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#8a7a55",
                marginBottom: 10,
              }}
            >
              Published Guides
            </div>

            <h2 style={{ fontSize: 32, lineHeight: 1.25, margin: "0 0 14px" }}>
              Begin with the Core Strategic Frameworks
            </h2>

            <p style={{ color: "#555", margin: "0 0 18px" }}>
              Start with jurisdiction fit, then evaluate individual clinics
              within the destinations that remain aligned.
            </p>

            <p
              style={{
                margin: 0,
                padding: "16px 18px",
                backgroundColor: "#f8f6f2",
                borderLeft: "3px solid #b8a77a",
                color: "#5d5850",
                fontSize: 14,
              }}
            >
              Every FertilityCareHub guide is developed using the FCH Global
              Fertility Intelligence Framework™ to support structured,
              evidence-aware decision-making rather than promotional clinic
              rankings.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 24,
            }}
          >
            {publishedGuides.map((guide) => (
              <article
                key={guide.title}
                style={{
                  padding: "clamp(28px, 5vw, 42px)",
                  border: "1px solid #d9cba8",
                  borderRadius: 10,
                  backgroundColor: "#f8f6f2",
                  boxShadow: "0 12px 34px rgba(43, 43, 43, 0.05)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 20,
                    flexWrap: "wrap",
                    marginBottom: 20,
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "#6d5a2d",
                    }}
                  >
                    Published • {guide.category}
                  </div>

                  <div style={{ fontSize: 12, color: "#6a6256" }}>
                    Reviewed {guide.reviewed}
                  </div>
                </div>

                <h2
                  style={{
                    fontSize: "clamp(26px, 4vw, 36px)",
                    lineHeight: 1.22,
                    margin: "0 0 18px",
                  }}
                >
                  {guide.title}
                </h2>

                <p
                  style={{
                    color: "#555",
                    fontSize: 16,
                    maxWidth: 820,
                    margin: "0 0 28px",
                  }}
                >
                  {guide.description}
                </p>

                {guide.href ? (
                  <Link
                    href={guide.href}
                    style={{
                      display: "inline-block",
                      padding: "12px 22px",
                      backgroundColor: "#2b2b2b",
                      color: "#ffffff",
                      borderRadius: 4,
                      textDecoration: "none",
                    }}
                  >
                    Read the Full Guide
                  </Link>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "95px 20px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <div
            style={{
              maxWidth: 760,
              margin: "0 auto 48px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: 12,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#8a7a55",
                marginBottom: 10,
              }}
            >
              Authority Library
            </div>

            <h2 style={{ fontSize: 32, margin: "0 0 16px" }}>
              Upcoming Planning Guides
            </h2>

            <p style={{ color: "#555", margin: 0 }}>
              The FertilityCareHub library is being developed as a permanent
              collection of decision resources rather than a stream of
              promotional or generic blog content.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 24,
            }}
          >
            {upcomingGuides.map((guide) => (
              <article
                key={guide.title}
                style={{
                  padding: 26,
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5ddc8",
                  borderRadius: 8,
                  opacity: 0.82,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 12,
                    alignItems: "center",
                    marginBottom: 17,
                  }}
                >
                  <span
                    style={{
                      fontSize: 11,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "#8a8377",
                    }}
                  >
                    Coming soon
                  </span>

                  <span
                    style={{
                      fontSize: 11,
                      color: "#8a7a55",
                      textAlign: "right",
                    }}
                  >
                    {guide.category}
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: 20,
                    lineHeight: 1.35,
                    margin: "0 0 13px",
                  }}
                >
                  {guide.title}
                </h3>

                <p style={{ color: "#5d5850", fontSize: 14, margin: "0 0 12px" }}>
                  {guide.description}
                </p>

                <p
                  style={{
                    margin: 0,
                    fontSize: 12,
                    color: "#8a8377",
                    fontStyle: "italic",
                  }}
                >
                  Available soon
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        style={{
          padding: "95px 20px",
          backgroundColor: "#f3efe7",
          borderTop: "1px solid #ece3d1",
          borderBottom: "1px solid #ece3d1",
        }}
      >
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <div style={{ maxWidth: 760, marginBottom: 46 }}>
            <div
              style={{
                fontSize: 12,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#8a7a55",
                marginBottom: 10,
              }}
            >
              Browse by Topic
            </div>

            <h2 style={{ fontSize: 32, margin: "0 0 16px" }}>
              A Structured Fertility Intelligence Library
            </h2>

            <p style={{ color: "#555", margin: 0 }}>
              Each topic supports a different part of the decision process,
              from early jurisdiction research through clinic assessment,
              treatment preparation, and cross-border execution.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
              gap: 24,
            }}
          >
            {topics.map((topic) => (
              <article
                key={topic.title}
                style={{
                  backgroundColor: "#ffffff",
                  padding: 26,
                  border: "1px solid #e5ddc8",
                  borderRadius: 8,
                }}
              >
                <h3 style={{ margin: "0 0 12px", fontSize: 21 }}>
                  {topic.title}
                </h3>

                <p
                  style={{
                    color: "#555",
                    fontSize: 14,
                    margin: topic.href ? "0 0 18px" : 0,
                  }}
                >
                  {topic.description}
                </p>

                {topic.href && topic.linkLabel ? (
                  <Link
                    href={topic.href}
                    style={{
                      color: "#78683f",
                      textDecoration: "underline",
                      textUnderlineOffset: 4,
                    }}
                  >
                    {topic.linkLabel}
                  </Link>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "95px 20px", backgroundColor: "#ffffff" }}>
        <div style={{ maxWidth: 1020, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 42,
              alignItems: "start",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 12,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "#8a7a55",
                  marginBottom: 10,
                }}
              >
                Independent Methodology
              </div>

              <h2
                style={{
                  fontSize: 32,
                  lineHeight: 1.25,
                  margin: "0 0 18px",
                }}
              >
                Why These Guides Are Different
              </h2>

              <p style={{ color: "#555", margin: 0 }}>
                FertilityCareHub is designed as an independent strategic
                advisory and intelligence platform. The guides are intended to
                improve decision quality, expose hidden complexity, and help
                readers ask better questions before committing to treatment.
              </p>
            </div>

            <div
              style={{
                backgroundColor: "#f8f6f2",
                border: "1px solid #e5ddc8",
                borderRadius: 8,
                padding: 28,
              }}
            >
              <ul
                style={{
                  margin: 0,
                  paddingLeft: 20,
                  color: "#555",
                  lineHeight: 1.9,
                }}
              >
                <li>Independent analysis rather than clinic promotion</li>
                <li>Structured comparisons rather than unsupported rankings</li>
                <li>Attention to regulation, governance, and execution risk</li>
                <li>Careful treatment of medical and legal information</li>
                <li>Transparent distinction between education and advice</li>
                <li>No guaranteed outcomes or success-rate promises</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section
        style={{
          padding: "95px 20px",
          backgroundColor: "#2b2b2b",
          color: "#ffffff",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div
            style={{
              fontSize: 12,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#d6c79e",
              marginBottom: 12,
            }}
          >
            Private Advisory
          </div>

          <h2 style={{ fontSize: 32, margin: "0 0 16px" }}>
            Move from General Research to a Structured Pathway
          </h2>

          <p
            style={{
              color: "#d4d4d4",
              margin: "0 auto 30px",
              maxWidth: 690,
            }}
          >
            FertilityCareHub provides private strategic support for individuals
            and families who need help evaluating jurisdictions, treatment
            pathways, clinics, costs, documentation, and execution risks.
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 14,
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/advisory"
              style={{
                display: "inline-block",
                padding: "12px 24px",
                backgroundColor: "#b8a77a",
                color: "#ffffff",
                borderRadius: 4,
                textDecoration: "none",
              }}
            >
              View Advisory Tiers
            </Link>

            <Link
              href="/consultation"
              style={{
                display: "inline-block",
                padding: "12px 24px",
                border: "1px solid #b8a77a",
                color: "#ffffff",
                borderRadius: 4,
                textDecoration: "none",
              }}
            >
              Request Client Intake
            </Link>
          </div>
        </div>
      </section>

      <section style={{ padding: "95px 20px", backgroundColor: "#ffffff" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div
            style={{
              maxWidth: 720,
              margin: "0 auto 42px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: 12,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#8a7a55",
                marginBottom: 10,
              }}
            >
              Frequently Asked Questions
            </div>

            <h2 style={{ fontSize: 32, margin: 0 }}>
              About the FertilityCareHub Guides
            </h2>
          </div>

          <div style={{ display: "grid", gap: 18 }}>
            {faqs.map((faq) => (
              <article
                key={faq.question}
                style={{
                  padding: 26,
                  backgroundColor: "#f8f6f2",
                  border: "1px solid #e5ddc8",
                  borderRadius: 8,
                }}
              >
                <h3 style={{ fontSize: 19, margin: "0 0 10px" }}>
                  {faq.question}
                </h3>

                <p style={{ color: "#555", margin: 0 }}>{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        style={{
          padding: "42px 20px",
          textAlign: "center",
          borderTop: "1px solid #ece3d1",
        }}
      >
        <p
          style={{
            maxWidth: 820,
            margin: "0 auto",
            color: "#777",
            fontSize: 12,
          }}
        >
          FertilityCareHub guides provide general educational and strategic
          planning information. They do not constitute medical, legal,
          financial, or regulatory advice. Rules, clinical practices, costs,
          and eligibility requirements may change. Confirm current information
          with appropriately licensed professionals.
        </p>

        <div style={{ marginTop: 16, fontSize: 13 }}>
          <Link
            href="/disclaimer"
            style={{
              color: "#6a6256",
              textDecoration: "underline",
              textUnderlineOffset: 3,
            }}
          >
            Read the full disclaimer
          </Link>
        </div>
      </section>
    </main>
  );
}
