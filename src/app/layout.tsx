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
  title: {
    default: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description:
    "Gourmettazone by Kavita offers premium artisanal cakes, exotic brownies, and healthy cookies in Ahmedabad. Best bakery in Vastrapur for custom wedding & birthday cakes. Order online via WhatsApp.",
  keywords: [
    "Bakery in Ahmedabad",
    "Custom Cakes Ahmedabad",
    "Best Cakes in Vastrapur",
    "Wedding Cakes Ahmedabad",
    "Eggless Cakes Ahmedabad",
    "Birthday Cake Delivery Ahmedabad",
    "Artisanal Bakery Gujarat",
    "Healthy Cookies Ahmedabad",
    "Designer Cakes Satellite Ahmedabad",
    "Bespoke Brownies Bopal",
  ],
  authors: [{ name: SITE_CONFIG.name }],
  category: "Food & Beverage",
  openGraph: {
    title: `Premium Cakes & Bakes in Ahmedabad | ${SITE_CONFIG.name}`,
    description:
      `Order artisanal cakes, exotic brownies, and healthy cookies from ${SITE_CONFIG.name}. Freshly baked and delivered across Ahmedabad.`,
    url: "https://gourmettazone.com",
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} — Premium Bakery in Ahmedabad`,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} | Best Bakery in Ahmedabad`,
    description:
      "Order exotic brownies, bespoke cakes, and healthy cookies online. Delivered in Ahmedabad.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://gourmettazone.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Bakery",
    "name": SITE_CONFIG.name,
    "image": "https://gourmettazone.com/logo.png",
    "@id": "https://gourmettazone.com",
    "url": "https://gourmettazone.com",
    "telephone": SITE_CONFIG.whatsappDisplay,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": SITE_CONFIG.address,
      "addressLocality": "Ahmedabad",
      "postalCode": SITE_CONFIG.zipCode,
      "addressRegion": "Gujarat",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 23.0360,
      "longitude": 72.5284
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "09:00",
      "closes": "21:00"
    },
    "sameAs": [
      SITE_CONFIG.instagramUrl,
      "https://www.facebook.com/gourmettazone"
    ],
    "priceRange": "₹₹",
    "servesCuisine": "Bakery, Desserts, Cakes",
    "areaServed": SITE_CONFIG.neighborhoods.map(n => ({
      "@type": "City",
      "name": n
    }))
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
