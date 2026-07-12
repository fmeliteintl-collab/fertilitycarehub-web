import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";

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
  sameAs: [],
} as const;

const navigationLinks = [
  {
    label: "Countries",
    href: "/countries",
  },
  {
    label: "Guides",
    href: "/guides",
  },
  {
    label: "Compare",
    href: "/compare",
  },
  {
    label: "Advisory",
    href: "/advisory",
  },
];

export const metadata: Metadata = {
  title: {
    default:
      "Global Fertility Strategy Advisory — Europe & Beyond | FertilityCareHub",
    template: "%s | FertilityCareHub",
  },
  description:
    "Private global fertility strategy advisory for cross-border care across Europe and select international destinations — jurisdiction clarity, pathway alignment, and discreet planning.",
  metadataBase: new URL("https://fertilitycarehub.com"),
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
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(ORG_JSON_LD),
          }}
        />
      </head>

      <body
        suppressHydrationWarning
        className="bg-[#F5F1E8] font-serif text-[#1A1A1A]"
      >
        <header className="w-full border-b border-[#E5DDC8] bg-[#F5F1E8]">
          <div className="mx-auto flex max-w-6xl flex-col gap-5 px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between lg:justify-start">
              <Link
                href="/"
                aria-label="FertilityCareHub homepage"
                className="text-xl tracking-wide text-[#1A1A1A] no-underline"
              >
                FertilityCareHub
              </Link>

              <nav
                aria-label="Primary navigation"
                className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-[#5F584C] lg:ml-7"
              >
                {navigationLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="tracking-wide transition hover:text-[#8A7A55]"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            <Link
              href="/consultation#request"
              className="inline-flex w-fit items-center justify-center border border-[#B89B5E] px-5 py-2 text-sm tracking-wide transition hover:bg-[#B89B5E] hover:text-white"
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