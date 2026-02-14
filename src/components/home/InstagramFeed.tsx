"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Instagram, Heart } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

gsap.registerPlugin(ScrollTrigger);

const FEED = [
  {
    src: "https://images.unsplash.com/photo-1587668178277-295251f900ce?q=80&w=500&auto=format&fit=crop",
    likes: "1.2k",
  },
  {
    src: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?q=80&w=500&auto=format&fit=crop",
    likes: "987",
  },
  {
    src: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=500&auto=format&fit=crop",
    likes: "1.5k",
  },
  {
    src: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=500&auto=format&fit=crop",
    likes: "2.1k",
  },
  {
    src: "https://images.unsplash.com/photo-1562440499-64c9a111f713?q=80&w=500&auto=format&fit=crop",
    likes: "856",
  },
  {
    src: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?q=80&w=500&auto=format&fit=crop",
    likes: "1.8k",
  },
];


export function InstagramFeed() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const items = sectionRef.current?.querySelectorAll(".ig-item");
      if (!items?.length) return;
      gsap.fromTo(
        items,
        { scale: 0.9, autoAlpha: 0 },
        {
          scale: 1,
          autoAlpha: 1,
          stagger: 0.08,
          duration: 0.6,
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
      <div className="mx-auto max-w-7xl">
        {/* ── Header ───────────────────────────────────────── */}
        <div className="text-center mb-14">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-brand-blush mb-3">
            Instagram
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl text-brand-cocoa tracking-tight">
            Fresh From the Oven
          </h2>
          <a
            href={SITE_CONFIG.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block font-sans text-sm font-medium text-brand-cocoa
                       border-b border-brand-cocoa/30 pb-0.5
                       transition-all duration-300 hover:text-brand-blush hover:border-brand-blush"
          >
            {SITE_CONFIG.instagram}
          </a>
          <p className="mt-2 font-sans text-xs text-brand-charcoal/40 tracking-wide">
            Tag us in your sweet moments{" "}
            <span className="font-medium text-brand-charcoal/60">#GourmetttazoneLove</span>
          </p>
        </div>

        {/* ── 3×2 Grid ─────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {FEED.map((item, i) => (
            <a
              key={i}
              href={SITE_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ig-item group relative aspect-square overflow-hidden rounded-xl bg-brand-cocoa/5"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.src}
                alt={`Instagram post ${i + 1}`}
                className="absolute inset-0 h-full w-full object-cover
                           transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />

              {/* Hover overlay */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center gap-3
                           bg-black/40 backdrop-blur-[2px]
                           opacity-0 transition-all duration-300 group-hover:opacity-100"
              >
                <Instagram
                  size={28}
                  className="text-white transition-transform duration-300
                             scale-75 group-hover:scale-100"
                />
                <span className="flex items-center gap-1.5 font-sans text-sm font-bold text-white">
                  <Heart size={14} className="fill-red-400 text-red-400" />
                  {item.likes}
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* ── Follow CTA ───────────────────────────────────── */}
        <div className="mt-12 text-center">
          <a
            href={SITE_CONFIG.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full
                       border border-brand-cocoa/20 bg-white px-8 py-3
                       font-sans text-sm font-medium tracking-wider text-brand-cocoa
                       transition-all duration-300
                       hover:bg-brand-cocoa hover:text-white hover:border-brand-cocoa"
          >
            <Instagram size={16} />
            Follow Us on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
