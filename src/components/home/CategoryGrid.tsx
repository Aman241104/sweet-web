"use client";

import { useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { SketchDoodle, SketchLeaf, SketchSparkle } from "@/components/ui/HandDrawnIcons";
import { slugify } from "@/utils/slugify";

gsap.registerPlugin(ScrollTrigger);

/* ── Category data ──────────────────────────────────────────────── */
const CATEGORIES = [
  {
    title: "Classic Cakes",
    image: "/products/black_forest.png",
  },
  {
    title: "Signature Cakes",
    image: "/products/hazelnut_cake.png",
  },
  {
    title: "Fusion Cakes",
    image: "/products/rasmalai_cake.png",
  },
  {
    title: "Cheesecakes",
    image: "/products/blueberry_cheesecake_new.png",
  },
  {
    title: "Brownies",
    image: "/products/walnut_fudge_brownie_new.png",
  },
  {
    title: "Healthy Cookies",
    image: "/products/healthy_seeds_cookies.png",
  },
  {
    title: "Pastries & Puffs",
    image: "/products/chinese_puff.png",
  },
  {
    title: "Chocolates",
    image: "/products/kunafa_bar.png",
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
      {/* ── Background Decors ──────────────────────────────────── */}
      <div className="pointer-events-none select-none">
        <SketchDoodle className="absolute top-32 left-10 w-48 text-brand-cocoa/5 -rotate-3" />
        <SketchLeaf className="absolute top-20 right-10 w-16 h-16 text-brand-accent/10 rotate-45 animate-float-slow" />
        <SketchSparkle className="absolute bottom-40 right-20 w-8 h-8 text-brand-cocoa/10 animate-float-slow delay-500" />
      </div>

      {/* ── Section heading ────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl text-center mb-16 relative z-10">
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
          <CategoryCard key={cat.title} title={cat.title} image={cat.image} href={`/menu/${slugify(cat.title)}`} />
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
  href,
}: {
  title: string;
  image: string;
  href: string;
}) {
  const cardRef = useRef<HTMLAnchorElement>(null);

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
    <Link
      href={href}
      ref={cardRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="cat-card group cursor-pointer rounded-[2.5rem] bg-white p-5 pb-6 block
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
      <p className="mt-5 text-center font-serif text-base md:text-lg font-bold tracking-wider text-brand-cocoa">
        {title}
      </p>
    </Link>
  );
}
