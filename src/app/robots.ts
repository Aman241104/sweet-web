import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    host: "https://gourmettazone.com",
    sitemap: "https://gourmettazone.com/sitemap.xml",
  };
}
