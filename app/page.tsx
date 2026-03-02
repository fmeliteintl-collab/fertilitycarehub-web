import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Private Global Fertility Strategy Advisory | FertilityCareHub",
  description:
    "Discreet, cross-border fertility jurisdiction advisory for individuals and families navigating international reproductive care. Strategic assessment, regulatory clarity, and curated clinical alignment.",
  alternates: {
    canonical: "https://fertilitycarehub.com",
  },
  openGraph: {
    title: "Private Global Fertility Strategy Advisory",
    description:
      "A private advisory for cross-border fertility care, jurisdiction strategy, and clinical alignment.",
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
  name: "Private Global Fertility Strategy Advisory",
  url: "https://fertilitycarehub.com",
  isPartOf: {
    "@type": "WebSite",
    url: "https://fertilitycarehub.com",
  },
  about: {
    "@type": "Thing",
    name: "Cross-border fertility strategy advisory",
  },
} as const;

export default function Page() {
  return (
    <>
      {/* JSON-LD: WebSite */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_JSON_LD) }}
      />

      {/* JSON-LD: WebPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBPAGE_JSON_LD) }}
      />

      <HomeClient />
    </>
  );
}