"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { Menu, X, MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { SITE_CONFIG } from "@/config/site";

/* ── Constants ──────────────────────────────────────────────────── */
const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Our Story", href: "#our-story" },
  { label: "Contact", href: "#contact" },
] as const;

/* ================================================================
   Navbar — Editorial Premium
   ================================================================ */
export function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  /* ── Scroll listener ─────────────────────────────────────────── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── GSAP Entry animation ────────────────────────────────────── */
  useGSAP(
    () => {
      gsap.from(navRef.current, {
        y: -100,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
      });
    },
    { scope: navRef }
  );

  /* ── CTA hover (GSAP) ───────────────────────────────────────── */
  const handleCtaEnter = useCallback(() => {
    if (ctaRef.current) gsap.to(ctaRef.current, { scale: 1.05, duration: 0.3, ease: "power2.out" });
  }, []);
  const handleCtaLeave = useCallback(() => {
    if (ctaRef.current) gsap.to(ctaRef.current, { scale: 1, duration: 0.3, ease: "power2.out" });
  }, []);

  /* ── Toggle mobile drawer ────────────────────────────────────── */
  const toggleMobile = useCallback(() => setMobileOpen((prev) => !prev), []);

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-10 left-0 w-full z-50 h-20 transition-all duration-500 ${scrolled || !isHome
          ? "bg-brand-cream/80 backdrop-blur-md shadow-sm border-t-4 border-brand-accent"
          : "bg-transparent border-t-4 border-transparent"
          }`}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 lg:px-10">
          {/* ── Logo ─────────────────────────────────────────── */}
          <Link
            href={isHome ? "#home" : "/"}
            className="flex items-center gap-3 select-none"
          >
            {/* Logo Image */}
            <div className="relative h-12 w-12 shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={SITE_CONFIG.logo}
                alt={SITE_CONFIG.name}
                className="h-full w-full object-contain"
              />
            </div>
            {/* Text Logo */}
            <span className="font-serif text-xl tracking-[-0.04em] text-brand-cocoa leading-tight max-w-[12rem]">
              {SITE_CONFIG.name}
            </span>
          </Link>

          {/* ── Desktop links (centred) ──────────────────────── */}
          <ul className="hidden md:flex items-center gap-9">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={
                    !isHome && link.href.startsWith("#")
                      ? `/${link.href}`
                      : link.href
                  }
                  className="nav-link text-[13px] font-medium tracking-[0.15em] uppercase
                             text-brand-cocoa/80 hover:text-brand-cocoa transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* ── Desktop CTA ──────────────────────────────────── */}
          <a
            ref={ctaRef}
            href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=Hi! I have a query about your cakes.`}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={handleCtaEnter}
            onMouseLeave={handleCtaLeave}
            className="hidden md:inline-flex items-center gap-2 rounded-full
                       border-[1.5px] border-brand-cocoa px-6 py-2.5
                       text-[13px] font-medium tracking-[0.15em] uppercase text-brand-cocoa
                       transition-all duration-300
                       hover:bg-brand-cocoa hover:text-brand-cream"
          >
            <MessageCircle size={14} />
            WhatsApp Inquiry
          </a>

          {/* ── Mobile buttons ───────────────────────────────── */}
          <div className="flex items-center gap-3 md:hidden">
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=Hi! I have a query about your cakes.`}
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-10 w-10 place-items-center rounded-full
                         border-[1.5px] border-brand-cocoa text-brand-cocoa
                         transition-colors duration-300 hover:bg-brand-cocoa hover:text-brand-cream"
              aria-label="WhatsApp"
            >
              <MessageCircle size={16} />
            </a>

            <button
              onClick={toggleMobile}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className="grid h-10 w-10 place-items-center rounded-full text-brand-cocoa"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Drawer ──────────────────────────────────────── */}
      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}

/* ================================================================
   Mobile Drawer
   ================================================================ */
function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useGSAP(
    () => {
      if (!drawerRef.current) return;
      if (open) {
        gsap.to(drawerRef.current, {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.6,
          ease: "expo.out",
        });
        if (linksRef.current) {
          gsap.from(linksRef.current.children, {
            y: 30,
            opacity: 0,
            stagger: 0.07,
            duration: 0.5,
            ease: "power3.out",
            delay: 0.15,
          });
        }
      } else {
        gsap.to(drawerRef.current, {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 0.4,
          ease: "power3.in",
        });
      }
    },
    { dependencies: [open] }
  );

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <div
      ref={drawerRef}
      style={{ clipPath: "inset(0% 0% 100% 0%)" }}
      className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-brand-cream md:hidden"
    >
      <ul ref={linksRef} className="flex flex-col items-center gap-8">
        {NAV_LINKS.map((link) => (
          <li key={link.label}>
            <Link
              href={
                !isHome && link.href.startsWith("#")
                  ? `/${link.href}`
                  : link.href
              }
              onClick={onClose}
              className="font-serif text-3xl tracking-tight text-brand-cocoa hover:text-brand-blush transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}

        <li className="mt-4">
          <a
            href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=Hi! I have a query about your cakes.`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="inline-flex items-center gap-2 rounded-full
                       border-[1.5px] border-brand-cocoa px-7 py-3
                       text-sm font-medium tracking-[0.15em] uppercase text-brand-cocoa
                       transition-colors duration-300
                       hover:bg-brand-cocoa hover:text-brand-cream"
          >
            <MessageCircle size={16} />
            WhatsApp Inquiry
          </a>
        </li>
      </ul>
    </div>
  );
}
