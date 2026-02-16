"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { GlowOrb, OrganicSwirl } from "@/components/ui/Decorations";
import {
  SketchStar,
  SketchHeart,
  SketchLeaf,
  SketchSparkle,
  SketchSwirl
} from "@/components/ui/HandDrawnIcons";

/* ── Hero image ─────────────────────────────────────────────────── */
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1000&auto=format&fit=crop";

/* ================================================================
   Hero Section — Editorial Premium
   ================================================================ */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);

  /* ── GSAP orchestrated entry ─────────────────────────────────── */
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      /* 1 — Headline: animate each word from below */
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll(".hero-word");
        tl.from(words, {
          y: 60,
          opacity: 0,
          stagger: 0.08,
          duration: 1.4,
        });
      }

      /* 2 — Sub-headline & buttons: fade up after headline */
      if (subtextRef.current) {
        tl.from(
          subtextRef.current.children,
          {
            y: 20,
            opacity: 0,
            stagger: 0.12,
            duration: 0.9,
          },
          "-=0.6"
        );
      }

      /* 3 — Hero image: scale & fade reveal */
      if (imageWrapRef.current) {
        tl.from(
          imageWrapRef.current,
          {
            scale: 1.1, // Updated to 1.1 as per prompt
            opacity: 0,
            duration: 1.2, // Updated to 1.2s
            ease: "power2.out",
          },
          "-=1"
        );

        /* 4 — Floating animation (infinite yoyo) */
        gsap.to(imageWrapRef.current, {
          y: -12,
          duration: 3,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 1.5,
        });
      }

      /* 5 — Mobile image reveal */
      const mobileImg = sectionRef.current?.querySelector(".hero-mobile-img");
      if (mobileImg) {
        gsap.from(mobileImg, {
          scale: 1.1,
          opacity: 0,
          duration: 1.2,
          ease: "power2.out",
          delay: 0.5, // Slight delay for mobile
        });
      }
    },
    { scope: sectionRef }
  );

  /* ── Split headline into spans ───────────────────────────────── */
  const headlineText = `Crafting Sweet Moments at ${SITE_CONFIG.name}.`;
  const words = headlineText.split(" ");

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-[90vh] flex items-center overflow-hidden pt-40 pb-16 px-6 lg:px-10"
    >
      {/* ── Ambient depth orbs ───────────────────────────────── */}
      <div className="pointer-events-none absolute -top-20 -left-20 h-[600px] w-[600px] rounded-full bg-brand-blush/20 blur-[120px] -z-10" />
      <div className="pointer-events-none absolute -bottom-48 -right-48 h-[500px] w-[500px] rounded-full bg-brand-blush/10 blur-[100px] -z-10" />

      {/* Decorative Elements */}
      <GlowOrb className="w-[500px] h-[500px] top-1/2 left-0 -translate-y-1/2 -ml-20" />
      <OrganicSwirl className="absolute -bottom-24 -right-24 w-96 h-96 text-brand-accent/5 -rotate-12 pointer-events-none" />

      {/* Floating Sketches */}
      <div className="pointer-events-none select-none">
        <SketchStar className="absolute top-24 left-10 w-12 h-12 text-brand-cocoa/10 animate-float-slow -rotate-12" />
        <SketchHeart className="absolute top-40 right-20 w-16 h-16 text-brand-accent/10 animate-float-slow delay-1000 rotate-12" />
        <SketchLeaf className="absolute bottom-20 left-1/4 w-14 h-14 text-brand-cocoa/5 animate-float-slow delay-500 -rotate-45" />
        <SketchSparkle className="absolute bottom-40 left-10 w-10 h-10 text-brand-blush/20 animate-float-slow delay-200" />
        <SketchSwirl className="absolute top-1/2 right-10 w-20 h-20 text-brand-cocoa/5 -rotate-90" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20 relative z-10">
        {/* ── Left column: Text ──────────────────────────────── */}
        <div className="order-1 lg:order-1">
          <span className="font-script text-3xl text-brand-accent -rotate-6 mb-4 block origin-bottom-left">
            Est. 2015
          </span>
          <h1
            ref={headlineRef}
            className="font-serif text-6xl md:text-8xl tracking-tighter leading-[0.9] text-brand-cocoa"
          >
            {words.map((word, i) => (
              <span key={i} className="hero-word inline-block mr-[0.22em]">
                {word}
              </span>
            ))}
          </h1>

          {/* On mobile: image appears here, between headline and subtext */}
          <div className="mt-8 block lg:hidden">
            <div className="hero-mobile-img relative w-full aspect-4/5 mask-arch overflow-hidden
                            bg-brand-cocoa/10 border border-white/40
                            shadow-[0_20px_50px_-12px_rgba(61,43,31,0.15)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={HERO_IMAGE}
                alt="Artisan minimalist cake"
                className="absolute inset-0 h-full w-full object-cover transform hover:scale-105 transition-transform duration-700 ease-out"
                loading="eager"
              />
              {/* Backup Gradient */}
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-cocoa/5 to-transparent -z-10" />
            </div>
          </div>

          <div ref={subtextRef} className="mt-8 lg:mt-10">
            <p className="font-sans text-lg md:text-xl text-brand-charcoal/80 max-w-md leading-relaxed">
              Bespoke artisan cakes delivered to your doorstep. Every slice
              tells a story of quality and passion.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="/menu"
                className="group inline-flex items-center gap-2 rounded-full
                           bg-brand-cocoa text-brand-cream px-8 py-4
                           font-sans text-sm tracking-wider uppercase
                           shadow-lg shadow-brand-cocoa/20
                           hover:scale-105 transition-transform duration-300"
              >
                Explore Collection
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full
                           border border-brand-cocoa/30 text-brand-cocoa px-8 py-4
                           font-sans text-sm tracking-wider uppercase
                           hover:bg-brand-cocoa/5 transition-colors duration-300"
              >
                Custom Order
              </a>
            </div>
          </div>
        </div>

        {/* ── Right column: Visual (Desktop Only) ─────────────── */}
        <div className="order-2 hidden lg:block">
          <div className="relative w-full h-[500px] md:h-[700px] flex justify-center items-center">
            {/* Glow Effect Behind Image */}
            <div className="absolute inset-0 bg-brand-blush/20 blur-[100px] rounded-full scale-75" />

            {/* Image Container */}
            <div
              ref={imageWrapRef}
              className="relative w-full h-full mask-arch overflow-hidden shadow-[0_20px_50px_-12px_rgba(61,43,31,0.15)] border border-white/40"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={HERO_IMAGE}
                alt="Artisan minimalist cake"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 ease-out"
                loading="eager"
              />

              {/* Backup Gradient (In case image fails, this shows instead of white box) */}
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-cocoa/5 to-transparent -z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
