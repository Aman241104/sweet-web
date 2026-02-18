"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SketchWhisk, SketchStrawberry } from "@/components/ui/HandDrawnIcons";
import { SITE_CONFIG } from "@/config/site";

gsap.registerPlugin(ScrollTrigger);

const ABOUT_IMAGE =
  "https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=1000&auto=format&fit=crop";

export function AboutBrief() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const img = sectionRef.current?.querySelector(".about-img");
      const text = sectionRef.current?.querySelector(".about-text");

      if (img) {
        gsap.fromTo(
          img,
          { x: -40, autoAlpha: 0 },
          {
            x: 0,
            autoAlpha: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: img, start: "top 85%", toggleActions: "play none none none" },
          }
        );
      }
      if (text) {
        gsap.fromTo(
          text,
          { x: 40, autoAlpha: 0 },
          {
            x: 0,
            autoAlpha: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: text, start: "top 85%", toggleActions: "play none none none" },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="our-story" className="relative py-24 px-6 lg:px-10 overflow-hidden bg-brand-accent-light/30">
      <SketchWhisk className="absolute top-20 left-10 w-32 h-32 text-brand-cocoa/5 -rotate-45 pointer-events-none select-none" />
      <SketchStrawberry className="absolute bottom-20 right-10 w-24 h-24 text-brand-accent/5 rotate-12 pointer-events-none select-none animate-float-slow" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20 relative z-10">
        {/* ── Image column ──────────────────────────────────── */}
        <div className="about-img relative">
          <div className="relative aspect-4/5 mask-arch overflow-hidden shadow-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ABOUT_IMAGE}
              alt="Baker carefully piping frosting on an artisan cake in a warm kitchen"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
            {/* Warm overlay */}
            <div className="absolute inset-0 bg-brand-cocoa/10 mix-blend-multiply pointer-events-none" />
          </div>

          {/* ── Floating "Est. 2015" badge ────────────────────── */}
          <div
            className="absolute -bottom-6 -right-6 z-10 flex h-24 w-24 flex-col items-center justify-center
                       rounded-full bg-brand-cream shadow-xl border border-brand-cocoa/8"
          >
            <span className="font-sans text-[10px] uppercase tracking-widest text-brand-charcoal/50">
              Est.
            </span>
            <span className="font-serif text-xl font-bold text-brand-cocoa leading-tight">
              2015
            </span>
            <span className="font-sans text-[9px] uppercase tracking-widest text-brand-charcoal/40">
              Bakery
            </span>
          </div>
        </div>

        {/* ── Text column ──────────────────────────────────── */}
        <div className="about-text lg:pl-4">
          {/* Philosophy label */}
          <span className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-brand-blush mb-4 block">
            The Philosophy
          </span>

          <h2 className="font-serif text-4xl sm:text-5xl text-brand-cocoa tracking-tight leading-tight mb-6">
            More Than Just Flour&nbsp;&amp;&nbsp;Sugar.
          </h2>

          <div className="space-y-4 font-sans text-base text-brand-charcoal/90 leading-loose max-w-lg">
            <p>
              Founded in 2015, {SITE_CONFIG.name} began in a small home kitchen
              with a single mission: to craft desserts that evoke emotion.
              What started as weekend batches for friends has blossomed into a
              beloved boutique bakery.
            </p>
            <p>
              Every ingredient is hand-selected, every recipe refined over
              years of passion. We believe that a perfect cake isn&rsquo;t just
              tasted — it&rsquo;s felt. From flour to frosting, we pour love
              into every layer.
            </p>
          </div>

          {/* CTA — text link style */}


          {/* Founder's signature */}
          <p className="mt-10 font-serif italic text-3xl text-brand-cocoa/50 -rotate-3 select-none">
            The {SITE_CONFIG.name} Team
          </p>
        </div>
      </div>
    </section>
  );
}
