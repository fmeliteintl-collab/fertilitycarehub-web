import Link from "next/link";
import Script from "next/script";

export type BreadcrumbItem = {
  name: string;
  href: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

function toAbsoluteUrl(href: string) {
  if (href.startsWith("http://") || href.startsWith("https://")) return href;
  const base = "https://fertilitycarehub.com";
  if (href.startsWith("/")) return `${base}${href}`;
  return `${base}/${href}`;
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (!items || items.length === 0) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: toAbsoluteUrl(item.href),
    })),
  };

  return (
    <>
      <Script
        id="ld-breadcrumbs"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-6 pt-4">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-[#5A5244]">
          {items.map((item, idx) => {
            const isLast = idx === items.length - 1;

            return (
              <li key={`${item.href}-${idx}`} className="flex items-center gap-2">
                {!isLast ? (
                  <Link href={item.href} className="hover:underline">
                    {item.name}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-[#1A1A1A]">
                    {item.name}
                  </span>
                )}

                {!isLast && <span aria-hidden="true">/</span>}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}