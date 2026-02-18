"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

export function MarqueeBar() {
    const trackRef = useRef<HTMLDivElement>(null);
    const text = "100% Eggless • Handcrafted • Premium Ingredients • Pre-Order Only • ";

    useEffect(() => {
        if (!trackRef.current) return;

        // Duplicate text for seamless loop
        const content = trackRef.current.innerHTML;
        trackRef.current.innerHTML = content + content + content + content;

        gsap.to(trackRef.current, {
            xPercent: -50,
            ease: "linear",
            duration: 40,
            repeat: -1,
        });
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full z-[60] h-10 flex items-center bg-brand-accent overflow-hidden text-white border-b border-brand-cocoa/5">
            <div ref={trackRef} className="whitespace-nowrap font-sans text-sm font-bold uppercase tracking-[0.2em]">
                <span className="inline-block px-4">{text}</span>
            </div>
        </div>
    );
}
