"use client";

import { useRef, useCallback } from "react";
import Link from "next/link";
import gsap from "gsap";
import { MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

/* ── Types ──────────────────────────────────────────────────────── */
export interface ProductCardProps {
  id: string;
  name: string;
  price: string;
  image: string;
  badge?: string; // e.g. "Best Seller"
  whatsappNumber?: string;
  /** Extra width/layout classes. Defaults to `w-[280px] shrink-0` for carousel use. */
  className?: string;
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
  whatsappNumber = SITE_CONFIG.whatsappNumber,
  className = "w-[280px] shrink-0",
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
    gsap.to(cardRef.current, {
      y: -5,
      boxShadow:
        "0 20px 40px -12px rgba(61,43,31,0.12), 0 8px 20px -8px rgba(61,43,31,0.06)",
      duration: 0.35,
      ease: "power2.out",
    });
  }, []);

  const handleLeave = useCallback(() => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      y: 0,
      boxShadow:
        "0 1px 3px 0 rgba(61,43,31,0.04), 0 1px 2px -1px rgba(61,43,31,0.03)",
      duration: 0.35,
      ease: "power2.out",
    });
  }, []);

  return (
    <Link
      href={`/menu/${id}`}
      ref={cardRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={`group flex flex-col overflow-hidden rounded-[1.5rem] bg-white
                 shadow-[0_1px_3px_0_rgba(61,43,31,0.04),0_1px_2px_-1px_rgba(61,43,31,0.03)]
                 ${className}`}
    >
      {/* ── Image ──────────────────────────────────────────────── */}
      <div className="relative aspect-square overflow-hidden bg-brand-cocoa/5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={name}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {badge && (
          <span className="absolute left-3 top-3 rounded-full bg-brand-blush px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white shadow-sm">
            {badge}
          </span>
        )}
      </div>

      {/* ── Content ────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-serif text-xl text-brand-cocoa leading-snug">
          {name}
        </h3>
        <p className="mt-1 font-sans text-sm text-brand-charcoal/70">{price}</p>

        {/* Order button */}
        <button
          onClick={handleOrder}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-cocoa py-3
                     font-sans text-xs font-medium uppercase tracking-wider text-brand-cream
                     transition-colors duration-300 hover:bg-green-600"
        >
          <MessageCircle size={14} className="text-green-400" />
          Order via WhatsApp
        </button>
      </div>
    </Link>
  );
}
