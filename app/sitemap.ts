import type { MetadataRoute } from "next";

const baseUrl = "https://appliedleverage.io";

const routeEntries = [
  { route: "", lastModified: "2026-03-13T14:44:00Z", changeFrequency: "weekly", priority: 1 },
  { route: "/why", lastModified: "2026-03-12T23:52:00Z", changeFrequency: "monthly", priority: 0.8 },
  {
    route: "/diagnostic",
    lastModified: "2026-03-13T12:26:00Z",
    changeFrequency: "weekly",
    priority: 0.9
  },
  { route: "/sprint", lastModified: "2026-03-12T20:37:00Z", changeFrequency: "monthly", priority: 0.8 },
  { route: "/about", lastModified: "2026-03-12T23:52:00Z", changeFrequency: "monthly", priority: 0.7 },
  { route: "/apply", lastModified: "2026-03-13T01:04:00Z", changeFrequency: "weekly", priority: 0.8 },
  { route: "/workbook", lastModified: "2026-03-13T12:35:00Z", changeFrequency: "weekly", priority: 0.9 },
  { route: "/blog", lastModified: "2026-03-13T14:44:00Z", changeFrequency: "weekly", priority: 0.8 },
  {
    route: "/blog/5-signs-ready-for-automation",
    lastModified: "2026-03-12T21:56:00Z",
    changeFrequency: "monthly",
    priority: 0.7
  },
  {
    route: "/blog/client-onboarding-automation-for-small-service-businesses",
    lastModified: "2026-03-13T13:33:00Z",
    changeFrequency: "monthly",
    priority: 0.7
  },
  {
    route: "/blog/what-to-automate-first-in-a-small-service-business",
    lastModified: "2026-03-13T14:44:00Z",
    changeFrequency: "monthly",
    priority: 0.7
  }
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routeEntries.map(({ route, lastModified, changeFrequency, priority }) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(lastModified),
    changeFrequency,
    priority
  }));
}
