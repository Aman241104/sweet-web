"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { products, CATEGORIES, type Category } from "@/data/products";
import { ProductCard } from "@/components/ui/ProductCard";

gsap.registerPlugin(ScrollTrigger);

/* ================================================================
   MenuSection — filterable product grid
   ================================================================ */
export function MenuSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  /* ── Filtered products ───────────────────────────────────────── */
  const filtered = useMemo(
    () =>
      activeCategory === "All"
        ? products
        : products.filter((p) => p.category === activeCategory),
    [activeCategory]
  );

  /* ── Section heading entry (once) ────────────────────────────── */
  useGSAP(
    () => {
      const heading = sectionRef.current?.querySelector(".menu-heading");
      if (!heading) return;
      gsap.from(heading, {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: heading,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: sectionRef }
  );

  /* ── GSAP cascade on category change ─────────────────────────── */
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll(".menu-card");
    if (!cards.length) return;

    // Kill any in-flight card animations
    gsap.killTweensOf(cards);

    gsap.fromTo(
      cards,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 0.4,
        ease: "power2.out",
      }
    );
  }, [activeCategory, filtered]);

  return (
    <section
      ref={sectionRef}
      id="menu"
      className="relative py-24 px-6 lg:px-10 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl">
        {/* ── Heading ──────────────────────────────────────────── */}
        <div className="menu-heading text-center mb-10">
          <p className="font-sans text-xs uppercase tracking-widest text-brand-blush mb-2">
            Taste the Difference
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl text-brand-cocoa tracking-tight">
            Our Signature Menu
          </h2>
        </div>

        {/* ── Filter pills ─────────────────────────────────────── */}
        <div
          className="flex gap-3 justify-center flex-wrap mb-14
                     overflow-x-auto scroll-smooth pb-2
                     scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none]
                     [&::-webkit-scrollbar]:hidden"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 rounded-full px-6 min-h-[44px] font-sans text-xs uppercase tracking-wider
                          transition-all duration-300 border
                          ${
                            activeCategory === cat
                              ? "bg-brand-cocoa text-brand-cream border-brand-cocoa scale-105 shadow-md"
                              : "bg-transparent text-brand-cocoa border-brand-cocoa/20 hover:border-brand-cocoa/50"
                          }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Product grid ─────────────────────────────────────── */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filtered.map((product) => (
            <div key={product.id} className="menu-card">
              <ProductCard
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                badge={product.badge}
                className="w-full"
              />
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <p className="text-center font-sans text-brand-charcoal/40 mt-12">
            No items in this category yet — check back soon!
          </p>
        )}
      </div>
    </section>
  );
}
