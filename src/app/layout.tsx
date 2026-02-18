import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { MarqueeBar } from "@/components/ui/MarqueeBar";
import { Preloader } from "@/components/ui/Preloader";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ParallaxFloating } from "@/components/ui/ParallaxFloating";
import { SITE_CONFIG } from "@/config/site";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

import { Great_Vibes } from "next/font/google";

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-script",
  display: "swap",
});

/* ── SEO & Open Graph Metadata ──────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL("https://gourmettazone.com"),
  title: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
  description:
    "Order exotic brownies, bespoke cakes, and healthy cookies online. Freshly baked by Kavita and delivered in Ahmedabad. Chat with us on WhatsApp to customize.",
  keywords: [
    "Bakery",
    "Custom Cakes",
    "Wedding Cakes",
    "Eggless Desserts",
    "Cake Delivery",
    "Designer Pastries",
    "Birthday Cakes",
    "Cupcakes",
  ],
  authors: [{ name: SITE_CONFIG.name }],
  openGraph: {
    title: "Craving Something Sweet? 🍰",
    description:
      `Explore ${SITE_CONFIG.name}'s premium menu. Click to view our latest creations.`,
    url: "https://gourmettazone.com",
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
    description:
      "Order exotic brownies, bespoke cakes, and healthy cookies online.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${inter.variable} ${greatVibes.variable} antialiased`}
      >
        <Preloader />
        <MarqueeBar />
        <Navbar />
        <div
          className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.03] mix-blend-multiply"
          style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}
        />
        <CustomCursor />
        <ParallaxFloating />
        {children}
      </body>
    </html>
  );
}
