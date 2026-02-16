"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        // Move cursor with mouse
        const moveCursor = (e: MouseEvent) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1, // Smooth lag
                ease: "power2.out",
            });
        };

        // Hover effects
        const onMouseEnterLink = () => {
            gsap.to(cursor, {
                scale: 2.5,
                backgroundColor: "rgba(217, 56, 86, 0.1)", // brand-accent/10
                borderColor: "transparent",
                duration: 0.3,
            });
        };

        const onMouseLeaveLink = () => {
            gsap.to(cursor, {
                scale: 1,
                backgroundColor: "transparent",
                borderColor: "#D93856", // brand-accent
                duration: 0.3,
            });
        };

        window.addEventListener("mousemove", moveCursor);

        // Attach to all interactive elements
        const links = document.querySelectorAll("a, button, input, textarea, select");
        links.forEach((link) => {
            link.addEventListener("mouseenter", onMouseEnterLink);
            link.addEventListener("mouseleave", onMouseLeaveLink);
        });

        // Observer for new elements (like dynamically loaded content)
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === "childList") {
                    const newLinks = (mutation.target as Element).querySelectorAll(
                        "a, button, input, textarea, select"
                    );
                    newLinks.forEach((link) => {
                        link.removeEventListener("mouseenter", onMouseEnterLink); // Prevent dupes
                        link.removeEventListener("mouseleave", onMouseLeaveLink);
                        link.addEventListener("mouseenter", onMouseEnterLink);
                        link.addEventListener("mouseleave", onMouseLeaveLink);
                    });
                }
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            links.forEach((link) => {
                link.removeEventListener("mouseenter", onMouseEnterLink);
                link.removeEventListener("mouseleave", onMouseLeaveLink);
            });
            observer.disconnect();
        };
    }, []);

    return (
        <div
            ref={cursorRef}
            className="fixed top-0 left-0 z-[10000] pointer-events-none hidden md:block" // Hidden on mobile
            style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                border: "1px solid #D93856", // brand-accent
                transform: "translate(-50%, -50%)", // Center on mouse
            }}
        />
    );
}
