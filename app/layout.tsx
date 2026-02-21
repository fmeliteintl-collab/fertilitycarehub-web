import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";

const ORG_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "FertilityCareHub",
  url: "https://fertilitycarehub.com",
  logo: "https://fertilitycarehub.com/logo.png",
  description:
    "Private global fertility strategy advisory for cross-border care across Europe and select international destinations — jurisdiction clarity, pathway alignment, and discreet planning.",
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "hello@fertilitycarehub.com",
      availableLanguage: ["en"],
    },
  ],
} as const;

export const metadata: Metadata = {
  title: {
    default:
      "Global Fertility Strategy Advisory — Europe & Beyond | FertilityCareHub",
    template: "%s | FertilityCareHub",
  },
  description:
    "Private global fertility strategy advisory for cross-border care across Europe and select international destinations — jurisdiction clarity, pathway alignment, and discreet planning.",
  metadataBase: new URL("https://fertilitycarehub.com"),

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Global Fertility Strategy Advisory — Europe & Beyond",
    description:
      "Private global fertility strategy advisory for cross-border care across Europe and select international destinations — jurisdiction clarity, pathway alignment, and discreet planning.",
    url: "https://fertilitycarehub.com",
    siteName: "FertilityCareHub",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(ORG_JSON_LD),
        }}
      />

      <body className="bg-[#F5F1E8] text-[#1A1A1A] font-serif">
        <header className="w-full py-6 border-b border-[#E5DDC8]">
          <div className="max-w-6xl mx-auto flex items-center justify-between px-6">
            <Link href="/" className="flex items-center gap-4">
              <span className="text-xl tracking-wide">FertilityCareHub</span>
            </Link>

            <Link
              href="/consultation#request"
              className="border border-[#B89B5E] px-5 py-2 text-sm tracking-wide hover:bg-[#B89B5E] hover:text-white transition"
            >
              Request Advisory Consultation
            </Link>
          </div>
        </header>

        <main>{children}</main>
      </body>
    </html>
  );
}