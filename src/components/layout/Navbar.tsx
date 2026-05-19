"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, MessageCircle, Instagram, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { SITE_CONFIG } from "@/config/site";
import { CATEGORIES } from "@/data/menu";
import { slugify } from "@/utils/slugify";

/* ── Constants ──────────────────────────────────────────────────── */
const NAV_LINKS = [
  { label: "Home", href: "/", hasDropdown: false },
  { label: "Menu", href: "/menu", hasDropdown: true },
  { label: "Cooking Classes", href: "/classes", hasDropdown: false },
  { label: "Our Story", href: "#our-story", hasDropdown: false },
  { label: "Contact", href: "#contact", hasDropdown: false },
] as const;

const MENU_CATEGORIES = CATEGORIES.filter(c => c !== "All").map(cat => ({
  label: cat,
  href: `/menu/${slugify(cat)}`
}));

let isNavAnimated = false;

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
      if (!isNavAnimated) {
        gsap.from(navRef.current, {
          y: -100,
          opacity: 0,
          duration: 1.2,
          delay: 2.4,
          ease: "expo.out",
          onComplete: () => {
            isNavAnimated = true;
          },
        });
      } else {
        gsap.set(navRef.current, { y: 0, opacity: 1 });
      }
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
        className={`fixed top-10 left-0 w-full z-50 h-20 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 ${scrolled || !isHome
          ? "bg-brand-cream/90 backdrop-blur-md shadow-sm border-t-[6px] border-brand-accent"
          : "bg-transparent border-t-[6px] border-transparent"
          }`}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 lg:px-10">
          {/* ── Logo ─────────────────────────────────────────── */}
          <Link
            href={isHome ? "#home" : "/"}
            className="flex items-center gap-3 select-none"
          >
            <div className="relative h-12 w-12 shrink-0">
              <Image
                src={SITE_CONFIG.logo}
                alt={SITE_CONFIG.name}
                fill
                className="object-contain"
                sizes="48px"
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
              <li key={link.label} className={link.hasDropdown ? "relative group/menu" : ""}>
                <Link
                  href={
                    !isHome && link.href.startsWith("#")
                      ? `/${link.href}`
                      : link.href
                  }
                  className="nav-link flex items-center gap-1 text-[13px] font-medium tracking-[0.15em] uppercase
                             text-brand-cocoa/80 hover:text-brand-cocoa transition-colors"
                >
                  {link.label}
                  {link.hasDropdown && (
                    <ChevronDown size={14} className="opacity-40 group-hover/menu:rotate-180 transition-transform duration-300" />
                  )}
                </Link>

                {link.hasDropdown && (
                  <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all duration-300 translate-y-2 group-hover/menu:translate-y-0 z-50">
                    <div className="bg-brand-cream border border-brand-cocoa/10 shadow-xl rounded-2xl p-5 min-w-[240px]">
                      <ul className="flex flex-col gap-3">
                        {MENU_CATEGORIES.map((cat) => (
                          <li key={cat.label}>
                            <Link
                              href={cat.href}
                              className="text-[11px] uppercase tracking-[0.1em] font-medium text-brand-cocoa/60 hover:text-brand-cocoa transition-colors block py-1"
                            >
                              {cat.label}
                            </Link>
                          </li>
                        ))}
                        <li className="pt-2 mt-2 border-t border-brand-cocoa/5">
                          <Link
                            href="/menu"
                            className="text-[11px] uppercase tracking-[0.1em] font-bold text-brand-cocoa hover:text-brand-blush transition-colors block py-1"
                          >
                            View All Categories
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* ── Desktop CTA ──────────────────────────────────── */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={SITE_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-[42px] w-[42px] place-items-center rounded-full
                         border-[1.5px] border-brand-cocoa text-brand-cocoa
                         transition-colors duration-300 hover:bg-brand-cocoa hover:text-brand-cream"
              aria-label="Instagram"
            >
              <Instagram size={16} />
            </a>
            <a
              ref={ctaRef}
              href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=Hi! I have a query about your cakes.`}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={handleCtaEnter}
              onMouseLeave={handleCtaLeave}
              className="inline-flex items-center gap-2 rounded-full
                         border-[1.5px] border-brand-cocoa px-6 py-2.5
                         text-[13px] font-medium tracking-[0.15em] uppercase text-brand-cocoa
                         transition-all duration-300
                         hover:bg-brand-cocoa hover:text-brand-cream"
            >
              <MessageCircle size={14} />
              WhatsApp Inquiry
            </a>
          </div>

          {/* ── Mobile buttons ───────────────────────────────── */}
          <div className="flex items-center gap-2 md:hidden">
            <a
              href={SITE_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-10 w-10 place-items-center rounded-full
                         border-[1.5px] border-brand-cocoa text-brand-cocoa
                         transition-colors duration-300 hover:bg-brand-cocoa hover:text-brand-cream"
              aria-label="Instagram"
            >
              <Instagram size={16} />
            </a>
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
  const [menuExpanded, setMenuExpanded] = useState(false);

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
        setMenuExpanded(false);
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
      className="fixed inset-0 z-40 flex flex-col bg-brand-cream md:hidden overflow-y-auto"
    >
      <ul ref={linksRef} className="flex flex-col items-center gap-8 py-24 min-h-full">
        {NAV_LINKS.map((link) => (
          <li key={link.label} className="flex flex-col items-center gap-6 w-full">
            <div className="flex items-center gap-4">
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
              {link.hasDropdown && (
                <button
                  onClick={() => setMenuExpanded(!menuExpanded)}
                  className="p-2 text-brand-cocoa/40"
                  aria-label="Toggle Submenu"
                >
                  <ChevronDown
                    size={24}
                    className={`transition-transform duration-300 ${menuExpanded ? 'rotate-180' : ''}`}
                  />
                </button>
              )}
            </div>

            {link.hasDropdown && menuExpanded && (
              <div className="grid grid-cols-1 gap-y-4 w-full px-12 transition-all duration-300">
                {MENU_CATEGORIES.map((cat) => (
                  <Link
                    key={cat.label}
                    href={cat.href}
                    onClick={onClose}
                    className="text-center text-[13px] uppercase tracking-[0.2em] font-bold text-brand-cocoa/60 active:text-brand-blush"
                  >
                    {cat.label}
                  </Link>
                ))}
                <Link
                  href="/menu"
                  onClick={onClose}
                  className="text-center text-[13px] uppercase tracking-[0.2em] font-bold text-brand-blush pt-4 border-t border-brand-cocoa/5"
                >
                  View All
                </Link>
              </div>
            )}
          </li>
        ))}

        <li className="mt-4 flex flex-col items-center gap-4">
          <a
            href={SITE_CONFIG.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="inline-flex items-center gap-2 rounded-full
                       border-[1.5px] border-brand-cocoa px-7 py-3
                       text-sm font-medium tracking-[0.15em] uppercase text-brand-cocoa
                       transition-colors duration-300
                       hover:bg-brand-cocoa hover:text-brand-cream"
          >
            <Instagram size={16} />
            Follow on Instagram
          </a>
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
