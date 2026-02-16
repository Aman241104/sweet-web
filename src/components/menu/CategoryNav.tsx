"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { CATEGORIES } from "@/data/menu";

gsap.registerPlugin(ScrollToPlugin);

export function CategoryNav() {
    const [activeCategory, setActiveCategory] = useState("Classic Cakes");
    const navRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            // Find which section is currently in view
            // This is a simple implementation; heavily debounced or intersection observer is better for perf
            // but for this scale, checking rects is okay.
            for (const cat of CATEGORIES) {
                if (cat === "All") continue; // "All" isn't a section in the new layout
                const section = document.getElementById(cat);
                if (section) {
                    const rect = section.getBoundingClientRect();
                    if (rect.top >= 0 && rect.top < 300) {
                        setActiveCategory(cat);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToCategory = (cat: string) => {
        setActiveCategory(cat);
        gsap.to(window, {
            duration: 1,
            scrollTo: { y: `#${cat}`, offsetY: 140 }, // Offset for navbar + category nav
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
                                ? "bg-brand-cocoa text-brand-cream border-brand-cocoa scale-105 shadow-md"
                                : "bg-white/50 text-brand-cocoa border-brand-cocoa/10 hover:border-brand-cocoa/40"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>
    );
}
