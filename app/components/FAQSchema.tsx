import Script from "next/script";

type FAQItem = {
  question: string;
  answer: string;
};

export default function FAQSchema({
  id,
  items,
}: {
  id: string;
  items: FAQItem[];
}) {
  if (!items?.length) return null;

  return (
    <Script
      id={id}
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map((x) => ({
            "@type": "Question",
            name: x.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: x.answer,
            },
          })),
        }),
      }}
    />
  );
}