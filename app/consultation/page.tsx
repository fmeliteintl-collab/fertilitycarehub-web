import type { Metadata } from "next";
import ConsultationClient from "./ConsultationClient";

const pageUrl = "https://fertilitycarehub.com/consultation";

export const metadata: Metadata = {
  title: "Request Private Fertility Advisory Review",
  description:
    "Submit a private intake request for structured cross-border fertility strategy covering jurisdiction fit, clinic-selection logic, timelines, documentation, and execution risk.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Request Private Fertility Advisory Review | FertilityCareHub",
    description:
      "Submit a confidential intake request for structured cross-border fertility strategy and jurisdiction planning.",
    url: pageUrl,
    siteName: "FertilityCareHub",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Request Private Fertility Advisory Review",
    description:
      "Private intake for structured cross-border fertility strategy and planning.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://fertilitycarehub.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Consultation",
      item: pageUrl,
    },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "FertilityCareHub Private Advisory Intake",
  description:
    "Private intake for cross-border fertility strategy, jurisdiction assessment, clinic-selection logic, timeline planning, documentation, and execution-risk review.",
  provider: {
    "@type": "Organization",
    name: "FertilityCareHub",
    url: "https://fertilitycarehub.com",
  },
  areaServed: "Worldwide",
  serviceType: "Cross-border fertility strategy intake",
  url: pageUrl,
};

export default function ConsultationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
      <ConsultationClient />
    </>
  );
}
