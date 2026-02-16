"use client";

import { useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/* ── Category data ──────────────────────────────────────────────── */
const CATEGORIES = [
  {
    title: "Classic Cakes",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800",
  },
  {
    title: "Signature Cakes",
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=800",
  },
  {
    title: "Fusion Cakes",
    image:
      "https://images.unsplash.com/photo-1626803775151-61d756612fcd?q=80&w=800",
  },
  {
    title: "Cheesecakes",
    image:
      "https://images.unsplash.com/photo-1567327613485-fbc7bf196198?q=80&w=800",
  },
  {
    title: "Brownies",
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=800",
  },
  {
    title: "Healthy Cookies",
    image:
      "https://images.unsplash.com/photo-1499636138143-bd649043ea52?q=80&w=800",
  },
  {
    title: "Pastries & Puffs",
    image:
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=800",
  },
  {
    title: "Chocolates",
    image:
      "https://images.unsplash.com/photo-1548907040-4baa42d10919?q=80&w=800",
  },
] as const;

/* ================================================================
   CategoryGrid
   ================================================================ */
export function CategoryGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  /* ── ScrollTrigger staggered entry ───────────────────────────── */
  useGSAP(
    () => {
      if (!gridRef.current) return;
      const cards = gridRef.current.querySelectorAll(".cat-card");

      gsap.fromTo(
        cards,
        { y: 40, autoAlpha: 0, scale: 0.95 },
        {
          y: 0,
          autoAlpha: 1,
          scale: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-6 lg:px-10 overflow-hidden"
    >
      {/* ── Section heading ────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl text-center mb-16">
        <h2 className="font-serif text-4xl sm:text-5xl text-brand-cocoa tracking-tight">
          Explore Our Creations
        </h2>
        <p className="mt-4 font-sans text-base sm:text-lg text-brand-charcoal/60 max-w-xl mx-auto leading-relaxed">
          Handcrafted with love, from classic pastries to designer masterpieces.
        </p>
      </div>

      {/* ── Grid ───────────────────────────────────────────────── */}
      <div
        ref={gridRef}
        className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 [&>*:nth-child(even)]:lg:translate-y-12"
      >
        {CATEGORIES.map((cat) => (
          <CategoryCard key={cat.title} title={cat.title} image={cat.image} />
        ))}
      </div>
    </section>
  );
}

/* ================================================================
   Individual Card — Clean White
   ================================================================ */
function CategoryCard({
  title,
  image,
}: {
  title: string;
  image: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  /* ── GSAP hover lift + shadow ────────────────────────────────── */
  const handleEnter = useCallback(() => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      y: -8,
      boxShadow:
        "0 20px 40px -12px rgba(61, 43, 31, 0.12), 0 8px 20px -8px rgba(61, 43, 31, 0.06)",
      duration: 0.4,
      ease: "power2.out",
    });
  }, []);

  const handleLeave = useCallback(() => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      y: 0,
      boxShadow:
        "0 1px 3px 0 rgba(61, 43, 31, 0.04), 0 1px 2px -1px rgba(61, 43, 31, 0.03)",
      duration: 0.4,
      ease: "power2.out",
    });
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="cat-card group cursor-pointer rounded-[2.5rem] bg-white p-5 pb-6
                 shadow-[0_1px_3px_0_rgba(61,43,31,0.04),0_1px_2px_-1px_rgba(61,43,31,0.03)]
                 transition-colors duration-300"
    >
      {/* Image */}
      <div className="relative w-full aspect-square rounded-3xl overflow-hidden bg-brand-cocoa/5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Title */}
      <p className="mt-5 text-center font-serif text-sm font-bold tracking-wider text-brand-cocoa">
        {title}
      </p>
    </div>
  );
}
