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
      <head>
        {/* Global Organization Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(ORG_JSON_LD),
          }}
        />
      </head>

      <body className="bg-[#F5F1E8] text-[#1A1A1A] font-serif">
        <header className="w-full py-6 border-b border-[#E5DDC8]">
          <div className="max-w-6xl mx-auto flex items-center justify-between px-6">
            <Link href="/" className="flex items-center gap-4">
              <span className="text-xl tracking-wide">FertilityCareHub</span>
            </Link>
            
            <div className="flex items-center gap-4">
  <Link
    href="/advisory"
    className="text-sm tracking-wide text-[#6A6256] hover:text-[#1A1A1A]"
  >
    Advisory Pricing
  </Link>

  <Link
    href="/consultation#request"
    className="border border-[#B89B5E] px-5 py-2 text-sm tracking-wide hover:bg-[#B89B5E] hover:text-white transition"
  >
    Request Advisory Consultation
  </Link>
</div>
          </div>
        </header>

        <main>{children}</main>

        <footer className="w-full border-t border-[#E5DDC8] mt-16">
          <div className="max-w-6xl mx-auto px-6 py-10 text-sm text-[#6A6256] space-y-4">
            <p className="leading-relaxed">
              <strong className="text-[#1A1A1A]">Medical disclaimer:</strong>{" "}
              FertilityCareHub provides informational and strategic advisory
              support only. Content is not medical, legal, or financial advice
              and should not be used as a substitute for professional guidance.
            </p>

            <p className="leading-relaxed">
              <strong className="text-[#1A1A1A]">Positioning:</strong> We are
              not a clinic, broker, or treatment provider. We do not sell
              medical services or make treatment outcome guarantees.
            </p>

            <p className="leading-relaxed">
              <strong className="text-[#1A1A1A]">Important:</strong>{" "}
              If you have urgent or emergency medical concerns, contact local
              emergency services or a licensed clinician. Submitting a form on
              this site does not create a medical, legal, or fiduciary
              relationship.
            </p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2">
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-[#1A1A1A]"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-[#1A1A1A]"
              >
                Terms
              </Link>
              <span aria-hidden="true">•</span>
              <span>© 2026 FertilityCareHub</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}