import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title:
    "FertilityCareHub | Cross-Border Fertility Planning, Portal, and Advisory",
  description:
    "FertilityCareHub is a private cross-border fertility planning and advisory platform with a gated portal to help individuals and families navigate international reproductive care with greater clarity, structure, and control.",
  alternates: {
    canonical: "https://fertilitycarehub.com",
  },
  openGraph: {
    title:
      "FertilityCareHub | Cross-Border Fertility Planning, Portal, and Advisory",
    description:
      "A private fertility planning platform with framework-based guidance, a gated planning portal, and personalized cross-border fertility strategy advisory.",
    url: "https://fertilitycarehub.com",
    siteName: "FertilityCareHub",
    type: "website",
  },
};

const WEBSITE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "FertilityCareHub",
  url: "https://fertilitycarehub.com",
  description:
    "A private cross-border fertility planning and advisory platform with a gated portal for structured fertility journey management.",
  publisher: {
    "@type": "Organization",
    name: "FertilityCareHub",
    url: "https://fertilitycarehub.com",
    logo: "https://fertilitycarehub.com/logo.png",
  },
} as const;

const WEBPAGE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "FertilityCareHub",
  url: "https://fertilitycarehub.com",
  isPartOf: {
    "@type": "WebSite",
    url: "https://fertilitycarehub.com",
  },
  about: {
    "@type": "Thing",
    name: "Cross-border fertility planning and advisory",
  },
  description:
    "Framework-based fertility planning, gated portal access, and personalized advisory for international fertility journeys.",
} as const;

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_JSON_LD) }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBPAGE_JSON_LD) }}
      />

      <HomeClient />
    </>
  );
}