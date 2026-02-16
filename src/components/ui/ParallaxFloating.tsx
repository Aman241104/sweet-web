"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Wheat, ChefHat, Star, Heart } from "lucide-react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export function ParallaxFloating() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!containerRef.current) return;

            const elements = containerRef.current.children;

            Array.from(elements).forEach((el, i) => {
                // Random slight movement speed differences
                const speed = 1 + Math.random() * 2; // 1x to 3x speed

                gsap.to(el, {
                    y: -150 * speed, // Move up as we scroll down
                    ease: "none",
                    scrollTrigger: {
                        trigger: document.body,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 1, // Smooth scrubbing
                    },
                });
            });
        },
        { scope: containerRef }
    );

    return (
        <div
            ref={containerRef}
            className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        >
            {/* Icon 1: Wheat (Top Left) */}
            <div className="absolute top-[10%] left-[5%] text-brand-cocoa/5 opacity-20">
                <Wheat size={64} />
            </div>

            {/* Icon 2: Star (Top Right) */}
            <div className="absolute top-[15%] right-[10%] text-brand-cocoa/5 opacity-20">
                <Star size={48} />
            </div>

            {/* Icon 3: ChefHat (Middle Left) */}
            <div className="absolute top-[45%] left-[8%] text-brand-cocoa/5 opacity-20">
                <ChefHat size={56} />
            </div>

            {/* Icon 4: Heart (Middle Right) */}
            <div className="absolute top-[50%] right-[15%] text-brand-cocoa/5 opacity-20">
                <Heart size={40} />
            </div>

            {/* Icon 5: Wheat (Bottom Left) */}
            <div className="absolute top-[80%] left-[12%] text-brand-cocoa/5 opacity-20">
                <Wheat size={52} />
            </div>

            {/* Icon 6: Star (Bottom Right) */}
            <div className="absolute top-[85%] right-[5%] text-brand-cocoa/5 opacity-20">
                <Star size={60} />
            </div>
        </div>
    );
}
