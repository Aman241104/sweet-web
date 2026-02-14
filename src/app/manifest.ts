import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_CONFIG.name,
    short_name: "Gourmetttazone",
    description: SITE_CONFIG.tagline,
    start_url: "/",
    display: "standalone",
    background_color: "#FFF8F0",
    theme_color: "#3D2B1F",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
