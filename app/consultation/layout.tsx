import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Private Fertility Strategy Advisory",
  description:
    "Private strategic advisory for cross-border fertility planning. Jurisdiction fit, regulatory clarity, donor pathway constraints, and clinical sequencing.",
  alternates: { canonical: "/consultation" },
  openGraph: {
    title: "Private Fertility Strategy Advisory",
    description:
      "Discreet advisory intake for cross-border fertility planning. Jurisdiction assessment, regulatory clarity, and pathway strategy.",
    url: "https://fertilitycarehub.com/consultation",
    siteName: "FertilityCareHub",
    type: "website",
  },
};

export default function ConsultationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}