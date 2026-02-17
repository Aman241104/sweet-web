"use client";

import { useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Types ──────────────────────────────────────────────────────── */
export interface ProductCardProps {
  id: string;
  name: string;
  price: string;
  image: string;
  badge?: string; // e.g. "Best Seller"
  ingredients?: string[]; // Added this
  whatsappNumber?: string;
  /** Extra width/layout classes. Defaults to `w-[280px] shrink-0` for carousel use. */
  className?: string;
  isSpotlight?: boolean;
}


/* ================================================================
   ProductCard
   ================================================================ */
export function ProductCard({
  id,
  name,
  price,
  image,
  badge,
  ingredients,
  whatsappNumber = SITE_CONFIG.whatsappNumber,
  className = "w-[280px] shrink-0",
  isSpotlight = false,
}: ProductCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);

  /* ── WhatsApp CTA ────────────────────────────────────────────── */
  const handleOrder = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const message = encodeURIComponent(
      `Hi! I'd like to order the ${name}. Please share details.`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  }, [name, whatsappNumber]);

  /* ── GSAP hover ──────────────────────────────────────────────── */
  const handleEnter = useCallback(() => {
    if (!cardRef.current) return;
    const btn = cardRef.current.querySelector(".order-btn");

    // Card lift
    gsap.to(cardRef.current, {
      y: -8,
      boxShadow:
        "0 25px 50px -12px rgba(61,43,31,0.15), 0 10px 25px -8px rgba(61,43,31,0.08)",
      duration: 0.4,
      ease: "power2.out",
    });

    // Button slide up
    if (btn) {
      gsap.to(btn, {
        y: 0,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, []);

  const handleLeave = useCallback(() => {
    if (!cardRef.current) return;
    const btn = cardRef.current.querySelector(".order-btn");

    // Card reset
    gsap.to(cardRef.current, {
      y: 0,
      boxShadow:
        "0 1px 3px 0 rgba(61,43,31,0.04), 0 1px 2px -1px rgba(61,43,31,0.03)",
      duration: 0.4,
      ease: "power2.out",
    });

    // Button reset
    if (btn) {
      gsap.to(btn, {
        y: "100%",
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, []);

  /* ── Reveal Animation ────────────────────────────────────────── */
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = cardRef.current?.querySelector(".animate-reveal");
    if (img) {
      gsap.to(img, {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }

    // Initial hidden state for button
    const btn = cardRef.current?.querySelector(".order-btn");
    if (btn) {
      gsap.set(btn, { y: "100%", opacity: 0 });
    }
  }, []);

  return (
    <Link
      href={`/menu/${id}`}
      ref={cardRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={`group flex overflow-hidden rounded-xl sm:rounded-[1.5rem]
                 shadow-[0_1px_3px_0_rgba(61,43,31,0.04),0_1px_2px_-1px_rgba(61,43,31,0.03)]
                 ${isSpotlight
          ? "flex-col md:flex-row col-span-2 bg-brand-cocoa text-brand-cream"
          : "flex-col bg-white text-brand-cocoa"
        }
                 ${className}`}
    >
      {/* ── Image ──────────────────────────────────────────────── */}
      <div
        className={`relative overflow-hidden bg-brand-cocoa/5
          ${isSpotlight ? "aspect-[4/3] sm:aspect-square md:aspect-auto md:w-1/2" : "aspect-[4/3] sm:aspect-square"}
        `}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={name}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 animate-reveal opacity-0 scale-110"
          loading="lazy"
        />
        {badge && (
          <span className="absolute left-3 top-3 rounded-full bg-brand-accent px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white shadow-sm z-10">
            {badge}
          </span>
        )}
      </div>

      {/* ── Content ────────────────────────────────────────────── */}
      <div className={`flex flex-col p-3 sm:p-5 ${isSpotlight ? "md:w-1/2 md:p-8 md:justify-center" : "flex-1"}`}>
        <h3 className={`font-serif leading-snug ${isSpotlight ? "text-xl sm:text-2xl md:text-3xl mb-2 text-brand-cream" : "text-base sm:text-xl text-brand-cocoa"}`}>
          {name}
        </h3>

        {/* Price */}
        <p className={`mt-1 font-sans font-medium uppercase tracking-wide
          ${isSpotlight ? "text-4xl text-brand-cream/90" : "text-sm text-brand-accent"}
        `}>
          {price}
        </p>

        {/* Ingredient Pills */}
        <div className="hidden sm:flex flex-wrap gap-2 mt-4 mb-2">
          {ingredients?.slice(0, 3).map((ing) => (
            <span
              key={ing}
              className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded-md border ${isSpotlight
                ? 'border-brand-cream/20 text-brand-cream/70'
                : 'border-brand-cocoa/10 text-brand-cocoa/50'
                }`}
            >
              {ing}
            </span>
          ))}
        </div>

        {/* Helper text for spotlight */}
        {isSpotlight && (
          <p className="mt-4 text-brand-cream/80 leading-relaxed hidden md:block font-light">
            Our signature {name.toLowerCase()} is crafted with premium ingredients and passion. A perfect choice for celebrations or a personal treat.
          </p>
        )}

        {/* Spacer to push button to bottom or keep it tight */}
        <div className="hidden sm:block flex-1" />

        {/* Order button (Hidden initially, slides up) */}
        <button
          onClick={handleOrder}
          className={`order-btn mt-3 sm:mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-2 sm:py-3
                     font-sans text-xs font-medium uppercase tracking-wider
                     transition-colors duration-300 border-b
                     ${isSpotlight
              ? "bg-brand-cream text-brand-cocoa hover:bg-white border-transparent"
              : "bg-transparent text-brand-cocoa border-brand-cocoa/20 hover:bg-brand-cocoa hover:text-brand-cream hover:border-brand-cocoa"
            }`}
        >
          <MessageCircle size={14} className={isSpotlight ? "text-brand-cocoa" : "text-green-600"} />
          {isSpotlight ? "Order via WhatsApp" : "Quick Order"}
        </button>
      </div>
    </Link>
  );
}
