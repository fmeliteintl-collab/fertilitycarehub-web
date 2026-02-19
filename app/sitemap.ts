import type { MetadataRoute } from "next";

const baseUrl = "https://fertilitycarehub.com";

const countries = [
  "spain",
  "greece",
  "portugal",
  "czech-republic",
  "mexico",
  "united-states",
  "united-kingdom",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      // FIXED: Added backticks around the template literal
      url: `${baseUrl}/consultation`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const countryRoutes: MetadataRoute.Sitemap = countries.map((country) => ({
    // FIXED: Added backticks around the template literal
    url: `${baseUrl}/countries/${country}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...countryRoutes];
}