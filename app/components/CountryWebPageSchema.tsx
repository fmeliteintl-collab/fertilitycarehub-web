import Script from "next/script";

type CountryWebPageSchemaProps = {
  countryName: string;
  countrySlug: string; // e.g. "spain"
  title: string;
  description: string;
};

export default function CountryWebPageSchema({
  countryName,
  countrySlug,
  title,
  description,
}: CountryWebPageSchemaProps) {
  const url = `https://fertilitycarehub.com/countries/${countrySlug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url,
    isPartOf: {
      "@type": "WebSite",
      name: "FertilityCareHub",
      url: "https://fertilitycarehub.com",
    },
    about: {
      "@type": "Place",
      name: countryName,
    },
    publisher: {
      "@type": "Organization",
      name: "FertilityCareHub",
      url: "https://fertilitycarehub.com",
      logo: "https://fertilitycarehub.com/logo.png",
    },
    inLanguage: "en",
  };

  return (
    <Script
      id={`ld-country-webpage-${countrySlug}`}
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}