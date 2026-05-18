"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Instagram, Heart } from "lucide-react";
import { SketchSparkle, SketchSwirl, SketchHeart } from "@/components/ui/HandDrawnIcons";
import { SITE_CONFIG } from "@/config/site";

gsap.registerPlugin(ScrollTrigger);

const FEED = [
  {
    src: "/products/rasmalai_cake.png",
    url: "https://www.instagram.com/reel/DX7DE_0hgRn/",
    likes: "1.2k",
  },
  {
    src: "/products/biscoff_cake.png",
    url: "https://www.instagram.com/reel/DX4ywvDOWOm/",
    likes: "987",
  },
  {
    src: "/products/hazelnut_cake.png",
    url: "https://www.instagram.com/reel/DX18xhYsdcT/",
    likes: "1.5k",
  },
  {
    src: "/products/burnt_basque_cheesecake_new.png",
    url: "https://www.instagram.com/reel/DXmFym6DErV/",
    likes: "2.1k",
  },
  {
    src: "/products/kunafa_bar.png",
    url: "https://www.instagram.com/reel/DXa29pJDOIc/",
    likes: "856",
  },
  {
    src: "/products/donuts.png",
    url: "https://www.instagram.com/reel/DXKOsOxDLqf/",
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
    <section ref={sectionRef} className="relative py-24 px-6 lg:px-10 overflow-hidden">
      {/* Hand-Drawn Decorations */}
      <div className="pointer-events-none select-none">
        <SketchSwirl className="absolute top-10 left-10 w-24 h-24 text-brand-cocoa/5 rotate-12" />
        <SketchSparkle className="absolute top-20 right-[15%] w-12 h-12 text-brand-accent/20 animate-float-slow delay-300" />
        <SketchHeart className="absolute bottom-10 left-[20%] w-16 h-16 text-brand-blush/10 -rotate-12 animate-float-slow delay-700" />
      </div>

      <div className="mx-auto max-w-7xl relative z-10">
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
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="ig-item group relative aspect-square overflow-hidden rounded-xl bg-brand-cocoa/5"
            >
              <Image
                src={item.src}
                alt={`Instagram post ${i + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
                sizes="(max-width: 640px) 50vw, 33vw"
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
