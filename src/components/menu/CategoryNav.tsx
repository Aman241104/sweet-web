"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { CATEGORIES } from "@/data/menu";
import { slugify } from "@/utils/slugify";

gsap.registerPlugin(ScrollToPlugin);

export function CategoryNav() {
    const [activeCategory, setActiveCategory] = useState("Classic Cakes");
    const navRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    // Find which section is currently in view
                    for (const cat of CATEGORIES) {
                        if (cat === "All") continue;
                        const slug = slugify(cat);
                        const section = document.getElementById(slug);
                        if (section) {
                            const rect = section.getBoundingClientRect();
                            // Check if section is within the top-middle part of the viewport
                            // Adjust logic: 150px offset (navbar height)
                            if (rect.top >= 0 && rect.top < 350) {
                                setActiveCategory(cat);
                                break;
                            }
                        }
                    }
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToCategory = (cat: string) => {
        setActiveCategory(cat);
        const slug = slugify(cat);
        gsap.to(window, {
            duration: 1,
            scrollTo: { y: `#${slug}`, offsetY: 140 }, // Offset for navbar + category nav
            ease: "power2.out",
        });
    };

    return (
        <div
            ref={navRef}
            className="sticky top-[7.5rem] z-40 bg-brand-cream/95 backdrop-blur-md border-y border-brand-cocoa/10 shadow-sm py-4 mb-8 transition-all"
        >
            <div
                className="flex gap-3 px-6 lg:justify-center overflow-x-auto scroll-smooth
                   scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none]
                   [&::-webkit-scrollbar]:hidden"
            >
                {CATEGORIES.filter((c) => c !== "All").map((cat) => (
                    <button
                        key={cat}
                        onClick={() => scrollToCategory(cat)}
                        className={`shrink-0 rounded-full px-5 py-2 font-sans text-xs font-bold uppercase tracking-wider transition-all duration-300 border
              ${activeCategory === cat
                                ? "bg-brand-accent text-brand-cream border-brand-accent scale-105 shadow-md"
                                : "bg-white/50 text-brand-cocoa border-brand-cocoa/10 hover:border-brand-accent/40"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>
    );
}
