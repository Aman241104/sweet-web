"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Instagram, Twitter, ArrowRight } from "lucide-react";
import { SketchCupcake, SketchWheat, SketchWhisk } from "@/components/ui/HandDrawnIcons";
import { SITE_CONFIG } from "@/config/site";

gsap.registerPlugin(ScrollTrigger);

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Creative Cooking", href: "/classes" },
  { label: "Our Story", href: "/#our-story" },
  { label: "Contact", href: "/#contact" },
];

const SOCIALS = [
  { icon: Instagram, href: SITE_CONFIG.instagramUrl, label: "Instagram" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
];

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const cols = footerRef.current?.querySelectorAll(".footer-col");
      if (!cols?.length) return;
      gsap.fromTo(
        cols,
        { y: 30, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          stagger: 0.1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: footerRef }
  );

  return (
    <footer ref={footerRef} className="relative bg-brand-cocoa pt-20 pb-8 px-6 lg:px-10 overflow-hidden">
      {/* ── Top Border Decoration (Hand-Drawn) ────────────────── */}
      <div className="absolute top-0 left-0 w-full overflow-hidden flex justify-center gap-12 py-4 opacity-20 pointer-events-none select-none">
        <SketchCupcake className="h-8 w-8 text-brand-pista animate-float-slow" strokeWidth={2} />
        <SketchWheat className="h-8 w-8 text-brand-accent animate-float-slow delay-75" strokeWidth={2} />
        <SketchWhisk className="h-8 w-8 text-brand-pista animate-float-slow delay-150" strokeWidth={2} />
        <SketchWheat className="h-8 w-8 text-brand-accent animate-float-slow delay-75" strokeWidth={2} />
        <SketchCupcake className="h-8 w-8 text-brand-pista animate-float-slow" strokeWidth={2} />
      </div>

      {/* ── Background watermark ──────────────────────────────── */}
      <span
        className="absolute bottom-0 left-0 -mb-10 font-serif text-[8rem] md:text-[12rem]
                   leading-none text-brand-cream/5 pointer-events-none select-none whitespace-nowrap"
        aria-hidden="true"
      >
        Gourmettazone
      </span>

      <div className="relative mx-auto max-w-7xl">
        {/* ── 4-column grid ────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-10 mb-16">
          {/* Column 1 — Brand */}
          <div className="footer-col">
            <Link href="/" className="block w-48 mb-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={SITE_CONFIG.logo}
                alt={SITE_CONFIG.name}
                // Removed filters to show original logo color (red/white)
                className="h-auto w-full object-contain"
              />
            </Link>
            <p className="mt-4 font-sans text-sm text-brand-cream/60 leading-relaxed max-w-[240px]">
              {SITE_CONFIG.tagline}
            </p>
            <div className="flex gap-3 mt-6">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full
                             border border-brand-cream/20 text-brand-cream
                             transition-all duration-300
                             hover:bg-brand-cream hover:text-brand-cocoa hover:border-brand-cream"
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 — Quick Links */}
          <div className="footer-col">
            <h4 className="font-serif text-xl text-brand-cream tracking-wide mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="inline-block font-sans text-sm text-brand-cream/70 tracking-wide
                               transition-all duration-300 hover:text-white hover:translate-x-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Contact */}
          <div className="footer-col">
            <h4 className="font-serif text-xl text-brand-cream tracking-wide mb-6">
              Get in Touch
            </h4>
            <ul className="space-y-3 font-sans text-sm text-brand-cream/70 tracking-wide leading-loose">
              <li className="font-semibold text-brand-cream">{SITE_CONFIG.contactPerson}</li>
              <li>{SITE_CONFIG.address}</li>
              {SITE_CONFIG.contactNumbers.map((number) => (
                <li key={number}>
                  <a
                    href={`tel:${number.replace(/\s/g, "")}`}
                    className="inline-block transition-all duration-300 hover:text-white hover:translate-x-1"
                  >
                    {number}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="inline-block transition-all duration-300 hover:text-white hover:translate-x-1"
                >
                  {SITE_CONFIG.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ───────────────────────────────────────── */}
        <div className="border-t border-brand-cream/10 mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans text-xs text-brand-cream/40">
            © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <p className="font-sans text-xs text-brand-cream/30">
            Made with ❤️ and plenty of butter.
          </p>
        </div>
      </div>
    </footer>
  );
}
