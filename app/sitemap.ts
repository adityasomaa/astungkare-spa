import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { services } from "@/content/services";
import { areas } from "@/content/areas";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = site.url.replace(/\/$/, "");

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/services`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/policies`, lastModified: now, changeFrequency: "yearly", priority: 0.3 }
  ];

  const serviceUrls = services.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8
  }));

  const areaUrls = areas.map((a) => ({
    url: `${base}/areas/${a.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7
  }));

  return [...staticPages, ...serviceUrls, ...areaUrls];
}
