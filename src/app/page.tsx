import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { BestSellers } from "@/components/home/BestSellers";

import { Testimonials } from "@/components/home/Testimonials";
import { AboutBrief } from "@/components/home/AboutBrief";
import { InstagramFeed } from "@/components/home/InstagramFeed";
import { ContactSection } from "@/components/home/ContactSection";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";

import { MarqueeBar } from "@/components/ui/MarqueeBar";
import { SectionDivider } from "@/components/ui/SectionDivider";

export default function Home() {
  return (
    <main>
      <MarqueeBar />
      <Hero />
      <SectionDivider className="text-brand-cream -mt-1 relative z-20" />
      <Features />
      <CategoryGrid />
      <BestSellers />
      <div className="flex justify-center py-8">
        <a
          href="/menu"
          className="inline-flex items-center gap-2 rounded-full border border-brand-cocoa px-8 py-3 text-sm font-medium tracking-[0.15em] uppercase text-brand-cocoa transition-all duration-300 hover:bg-brand-cocoa hover:text-brand-cream"
        >
          View Full Menu
        </a>
      </div>
      <SectionDivider className="text-white rotate-180 -mb-1" />
      <Testimonials />
      <AboutBrief />
      <InstagramFeed />
      <ContactSection />
      <SectionDivider className="text-brand-cocoa -mb-1" />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
