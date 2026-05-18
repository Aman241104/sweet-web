import { MetadataRoute } from "next";
import { MENU_ITEMS, CATEGORIES } from "@/data/menu";
import { slugify } from "@/utils/slugify";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://gourmettazone.com";

  const productEntries = MENU_ITEMS.map((item) => ({
    url: `${baseUrl}/menu/${item.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const categoryEntries = CATEGORIES.map((cat) => ({
    url: `${baseUrl}/menu/${slugify(cat)}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const mainPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/menu`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/classes`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
  ];

  return [...mainPages, ...categoryEntries, ...productEntries];
}
