import type { MetadataRoute } from "next";

const baseUrl = "https://fertilitycarehub.com";

const lastReviewed = new Date("2026-07-17");

const publicRoutes = [
  {
    path: "",
    changeFrequency: "monthly" as const,
    priority: 1,
  },
  {
    path: "/guides",
    changeFrequency: "weekly" as const,
    priority: 0.9,
  },
  {
    path: "/countries",
    changeFrequency: "weekly" as const,
    priority: 0.9,
  },
  {
    path: "/compare",
    changeFrequency: "monthly" as const,
    priority: 0.8,
  },
  {
    path: "/advisory",
    changeFrequency: "monthly" as const,
    priority: 0.8,
  },
  {
    path: "/consultation",
    changeFrequency: "monthly" as const,
    priority: 0.8,
  },
  {
    path: "/brief",
    changeFrequency: "monthly" as const,
    priority: 0.7,
  },
  {
    path: "/snapshot",
    changeFrequency: "monthly" as const,
    priority: 0.6,
  },
  {
    path: "/how-to-compare-fertility-jurisdictions",
    changeFrequency: "monthly" as const,
    priority: 0.9,
  },
  {
    path: "/privacy",
    changeFrequency: "yearly" as const,
    priority: 0.3,
  },
  {
    path: "/terms",
    changeFrequency: "yearly" as const,
    priority: 0.3,
  },
  {
    path: "/disclaimer",
    changeFrequency: "yearly" as const,
    priority: 0.3,
  },
];

const countries = [
  "canada",
  "china",
  "czech-republic",
  "greece",
  "india",
  "mexico",
  "portugal",
  "spain",
  "turkey",
  "united-kingdom",
  "united-states",
];

const comparisons = [
  "spain-vs-greece-ivf-regulations",
  "spain-vs-portugal-ivf-regulations",
  "spain-vs-italy-ivf-regulations",
  "spain-vs-czech-republic-ivf-regulations",
  "spain-vs-north-cyprus-ivf-regulations",
  "greece-vs-czech-republic-ivf-regulations",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = publicRoutes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: lastReviewed,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const countryRoutes: MetadataRoute.Sitemap = countries.map((country) => ({
    url: `${baseUrl}/countries/${country}`,
    lastModified: lastReviewed,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const comparisonRoutes: MetadataRoute.Sitemap = comparisons.map(
    (comparison) => ({
      url: `${baseUrl}/compare/${comparison}`,
      lastModified: lastReviewed,
      changeFrequency: "monthly",
      priority: 0.75,
    }),
  );

  return [...staticRoutes, ...countryRoutes, ...comparisonRoutes];
}
