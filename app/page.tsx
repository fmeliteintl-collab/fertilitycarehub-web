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

export default function Page() {
  return <HomeClient />;
}