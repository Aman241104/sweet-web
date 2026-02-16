"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "@/components/ui/ProductCard";
import { MENU_ITEMS } from "@/data/menu";

gsap.registerPlugin(ScrollTrigger);

/* ── Best-seller product data ───────────────────────────────────── */
const BEST_SELLER_NAMES = [
  "Hazelnut Cake",
  "Rasmalai Cake",
  "Biscoff Cake",
  "Burnt Basque Cheesecake",
  "Wheat Jaggery Brownie",
  "Kunafa Bar",
  "Coconut Jaggery Cookies",
  "Alphonso Mango Cake",
];

/* ================================================================
   BestSellers — horizontal-scroll carousel
   ================================================================ */
export function BestSellers() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  /* ── ScrollTrigger entry ─────────────────────────────────────── */
  useGSAP(
    () => {
      if (!trackRef.current) return;
      const cards = trackRef.current.querySelectorAll(".product-card-wrap");

      gsap.from(cards, {
        x: 80,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: sectionRef }
  );

  /* ── Manual scroll controls ──────────────────────────────────── */
  const scroll = (dir: "left" | "right") => {
    if (!trackRef.current) return;
    const amount = 310; // card width + gap
    trackRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden">
      {/* ── Heading row ────────────────────────────────────────── */}
      <div className="mx-auto flex max-w-7xl items-end justify-between px-6 lg:px-10 mb-12">
        <div>
          <p className="font-sans text-xs uppercase tracking-widest text-brand-blush mb-2">
            Crowd Favorites
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl text-brand-cocoa tracking-tight">
            Best Sellers
          </h2>
        </div>

        {/* Arrows (desktop) */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="grid h-11 w-11 place-items-center rounded-full border border-brand-cocoa/20
                       text-brand-cocoa transition-colors duration-300
                       hover:bg-brand-cocoa hover:text-brand-cream"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="grid h-11 w-11 place-items-center rounded-full border border-brand-cocoa/20
                       text-brand-cocoa transition-colors duration-300
                       hover:bg-brand-cocoa hover:text-brand-cream"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* ── Scrollable track ───────────────────────────────────── */}
      <div
        ref={trackRef}
        className="flex gap-6 overflow-x-auto scroll-smooth px-6 lg:px-10 pb-4
                   scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none]
                   [&::-webkit-scrollbar]:hidden"
      >
        {BEST_SELLER_NAMES.map((name) => {
          const product = MENU_ITEMS.find((p) => p.name === name);
          if (!product) return null;
          return (
            <div key={product.id} className="product-card-wrap shrink-0">
              <ProductCard {...product} />
            </div>
          );
        })}
        {/* Spacer so last card isn't clipped */}
        <div className="w-1 shrink-0" aria-hidden />
      </div>
    </section>
  );
}
