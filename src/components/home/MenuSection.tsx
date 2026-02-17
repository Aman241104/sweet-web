"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MENU_ITEMS, CATEGORIES } from "@/data/menu";
import { ProductCard } from "@/components/ui/ProductCard";
import { CategoryNav } from "@/components/menu/CategoryNav";
import { OrganicSwirl } from "@/components/ui/Decorations";
import { slugify } from "@/utils/slugify";

/* ================================================================
   MenuSection — filterable product grid
   ================================================================ */
export function MenuSection() {
  const sectionRef = useRef<HTMLElement>(null);

  /* ── Reveal animations on scroll ────────────────────────────── */
  useGSAP(
    () => {
      const sections = gsap.utils.toArray<HTMLElement>(".menu-category-section");
      sections.forEach((section) => {
        gsap.from(section.children, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="menu" className="relative pb-24">
      {/* ── Sticky Nav ─────────────────────────────────────────── */}
      <CategoryNav />

      {/* ── Sections Loop ──────────────────────────────────────── */}
      {CATEGORIES.filter((cat) => cat !== "All").map((category, index) => {
        const categoryProducts = MENU_ITEMS.filter((p) => p.category === category);
        const isEven = index % 2 === 0;
        const slug = slugify(category);

        return (
          <div
            key={category}
            id={slug}
            className={`menu-category-section relative py-20 px-6 lg:px-10 scroll-mt-32
              ${isEven ? "bg-brand-cream" : "bg-brand-pista-light/30"}
            `}
          >
            {/* Decorative divider for odd sections */}
            {!isEven && (
              <OrganicSwirl className="absolute -top-12 right-0 w-64 h-64 text-brand-cocoa/5 pointer-events-none rotate-180" />
            )}

            <div className="mx-auto max-w-7xl">
              {/* ── Section Title (Editorial) ──────────────────── */}
              <div className="relative mb-12 py-6 overflow-hidden">
                {/* Giant Watermark Number */}
                <span className="absolute -top-10 -left-6 text-9xl font-serif font-bold text-brand-cocoa/5 select-none pointer-events-none z-0">
                  0{index + 1}
                </span>

                {/* Actual Title */}
                <div className="relative z-10 flex items-center gap-4">
                  <h2 className="text-4xl md:text-5xl font-serif text-brand-cocoa">
                    {category}
                  </h2>
                  <span className="h-[1px] w-24 bg-brand-accent/50 hidden md:block"></span>
                  <span className="font-sans text-xs font-medium text-brand-accent uppercase tracking-widest bg-brand-accent/5 px-2 py-1 rounded-md">
                    {categoryProducts.length} Items
                  </span>
                </div>
              </div>

              {/* ── Grid ───────────────────────────────────────── */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {categoryProducts.map((product, i) => (
                  <ProductCard
                    key={product.id}
                    {...product}
                    isSpotlight={i === 0} // First item is spotlight
                    className="w-full"
                  />
                ))}
              </div>

              {/* Empty state (unlikely but safe) */}
              {categoryProducts.length === 0 && (
                <p className="text-center font-sans text-brand-charcoal/40 mt-8 italic">
                  Seasonal specials coming soon.
                </p>
              )}
            </div>
          </div>
        );
      })}
    </section>
  );
}

