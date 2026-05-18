"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { WheatStalk } from "@/components/ui/Decorations";
import { SketchRollingPin, SketchCookie } from "@/components/ui/HandDrawnIcons";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    image: "/products/dutch_truffle_cake.png",
    title: "Customized Cakes",
    desc: "Bespoke designs for weddings, birthdays, and special occasions.",
  },
  {
    image: "/products/healthy_seeds_cookies.png",
    title: "Healthy Choice",
    desc: "Healthy cookies, whole wheat brownies, and guilt-free indulgences.",
  },
  {
    image: "/products/kunafa_bar.png",
    title: "Corporate Gifting",
    desc: "Premium assorted chocolates and gift hampers for your business needs.",
  },
  {
    image: "/products/donuts.png",
    title: "Wide Variety",
    desc: "From cheesecakes and brownies to savory puffs and exotic pastries.",
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
    <section ref={sectionRef} className="relative py-24 px-6 lg:px-10 overflow-hidden bg-brand-accent-light/30">
      <WheatStalk className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] text-brand-cocoa/5 pointer-events-none" />

      {/* Hand-Drawn Decorations */}
      <div className="pointer-events-none select-none">
        <SketchRollingPin className="absolute -top-10 -left-10 w-40 h-40 text-brand-cocoa/5 -rotate-12" />
        <SketchCookie className="absolute bottom-10 -right-5 w-24 h-24 text-brand-cocoa/10 rotate-12 animate-float-slow" />
      </div>
      <div className="mx-auto max-w-5xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl sm:text-5xl text-brand-cocoa tracking-tight mb-4">
            The Gourmettazone Promise
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
              className="feat-card bg-white rounded-[2rem] p-6 shadow-sm
                         text-center flex flex-col items-center group
                         transition-all duration-300 ease-out
                         hover:-translate-y-1
                         hover:shadow-[0_10px_30px_-10px_rgba(61,43,31,0.1)]"
            >
              {/* Photo Image */}
              <div className="mb-6 w-full aspect-[4/3] relative rounded-[1.25rem] overflow-hidden">
                <Image
                  src={f.image}
                  alt={f.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
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
