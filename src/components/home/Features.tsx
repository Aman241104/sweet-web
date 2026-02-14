"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Wheat, Leaf, Palette, Truck } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    icon: Wheat,
    title: "Freshly Baked",
    desc: "Baked fresh every morning using locally sourced, premium ingredients.",
  },
  {
    icon: Leaf,
    title: "100% Eggless Options",
    desc: "Premium egg-free recipes that taste just as divine — no compromise.",
  },
  {
    icon: Palette,
    title: "Custom Designs",
    desc: "You dream it, we sculpt it. Bespoke artistry for every occasion.",
  },
  {
    icon: Truck,
    title: "Doorstep Delivery",
    desc: "Carefully packaged and delivered to your door with a smile.",
  },
] as const;

export function Features() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const cards = sectionRef.current?.querySelectorAll(".feat-card");
      if (!cards?.length) return;
      gsap.fromTo(
        cards,
        { y: 30, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="py-24 px-6 lg:px-10">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl sm:text-5xl text-brand-cocoa tracking-tight mb-4">
            The L&rsquo;Artisan Promise
          </h2>
          <p className="font-sans text-base text-brand-charcoal/60 max-w-xl mx-auto">
            Elevating the art of baking, one detail at a time.
          </p>
        </div>

        {/* Card Grid — 2 cols tablet, 4 cols desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="feat-card bg-white rounded-[2rem] p-8 shadow-sm
                         text-center flex flex-col items-center
                         transition-all duration-300 ease-out
                         hover:-translate-y-1
                         hover:shadow-[0_10px_30px_-10px_rgba(61,43,31,0.1)]"
            >
              {/* Anchored icon */}
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-cream text-brand-cocoa">
                <f.icon size={32} strokeWidth={1.5} />
              </div>

              <h3 className="font-serif text-xl text-brand-cocoa mb-2">
                {f.title}
              </h3>
              <p className="font-sans text-sm text-brand-charcoal/70 leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
