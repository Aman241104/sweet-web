import { Gallery } from "@/components/home/Gallery";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery | Our Masterpieces",
  description: "Explore our collection of premium artisanal cakes, custom wedding cakes, and designer bakes in Ahmedabad.",
};

export default function GalleryPage() {
  return (
    <main className="pt-20">
      {/* ── Page Header ────────────────────────────────────────── */}
      <section className="bg-brand-cream py-20 px-6 lg:px-10 text-center">
        <div className="max-w-4xl mx-auto mt-12">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-brand-blush mb-4">
            Visual Indulgence
          </p>
          <h1 className="font-serif text-5xl md:text-7xl text-brand-cocoa tracking-tight mb-6">
            Our Gallery
          </h1>
          <div className="h-px w-24 bg-brand-accent mx-auto mb-8" />
          <p className="font-sans text-lg text-brand-charcoal/70 leading-relaxed max-w-2xl mx-auto">
            From sharp-edged structures to delicate floral masterpieces, 
            every creation is a blend of science, art, and premium ingredients.
          </p>
        </div>
      </section>

      <SectionDivider className="text-white -mt-1 relative z-20" />
      
      {/* ── Gallery Component ───────────────────────────────────── */}
      <Gallery />

      <SectionDivider className="text-brand-cocoa -mb-1" />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
