"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SITE_CONFIG } from "@/config/site";

export function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsVisible(false);
          document.body.style.overflow = "auto";
        },
      });

      // Initially lock scroll
      document.body.style.overflow = "hidden";

      tl.to(logoRef.current, {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      })
        .to(logoRef.current, {
          opacity: 0,
          duration: 0.6,
          delay: 0.4,
          ease: "power2.in",
        })
        .to(containerRef.current, {
          yPercent: -100,
          duration: 1.2,
          ease: "power4.inOut",
        });
    },
    { scope: containerRef }
  );

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-9999 flex items-center justify-center bg-brand-cocoa"
    >
      <div
        ref={logoRef}
        className="opacity-0 text-center"
      >
        <span className="font-serif text-4xl sm:text-6xl tracking-[-0.04em] text-brand-cream select-none">
          {SITE_CONFIG.name}
        </span>
        <div className="mt-4 h-px w-12 bg-brand-blush/40 mx-auto" />
      </div>
    </div>
  );
}
