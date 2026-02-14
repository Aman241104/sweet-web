"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";


export function FloatingWhatsApp() {
  const btnRef = useRef<HTMLAnchorElement>(null);
  const [visible, setVisible] = useState(false);

  /* ── Show after 200px scroll ─────────────────────────────────── */
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── GSAP slide-up entry / exit ──────────────────────────────── */
  useGSAP(
    () => {
      if (!btnRef.current) return;
      gsap.to(btnRef.current, {
        y: visible ? 0 : 100,
        opacity: visible ? 1 : 0,
        duration: 0.5,
        ease: "back.out(1.4)",
        pointerEvents: visible ? "auto" : "none",
      });
    },
    { dependencies: [visible] }
  );

  const message = encodeURIComponent(
    "Hi! I'm browsing your website and have a question."
  );

  const handleEnter = useCallback(() => {
    if (btnRef.current) gsap.to(btnRef.current, { scale: 1.1, duration: 0.25, ease: "power2.out" });
  }, []);
  const handleLeave = useCallback(() => {
    if (btnRef.current) gsap.to(btnRef.current, { scale: 1, duration: 0.25, ease: "power2.out" });
  }, []);

  return (
    <a
      ref={btnRef}
      href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{ opacity: 0, transform: "translateY(100px)" }}
      className="fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center
                 rounded-full bg-green-500 text-white shadow-2xl
                 ring-4 ring-green-500/20 animate-pulse-soft"
    >
      <MessageCircle size={26} />
    </a>
  );
}
