import React from "react";

/* Shared interface for props */
interface IconProps {
    className?: string;
    strokeWidth?: number;
}

/* =========================================================================
   1. SketchCupcake
   A playful cupcake with a swirl top.
   path: trapezoid bottom, cloud-like top, cherry on top.
   ========================================================================= */
export const SketchCupcake = ({ className, strokeWidth = 1.5 }: IconProps) => (
    <svg
        viewBox="0 0 100 100"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        {/* Wrapper/Cup */}
        <path d="M25,60 L35,90 L65,90 L75,60" />
        <path d="M25,60 Q50,70 75,60" />
        <path d="M35,90 Q50,95 65,90" />
        {/* Frosting Swirls */}
        <path d="M25,60 Q15,40 30,35 Q25,15 50,15 Q75,15 70,35 Q85,40 75,60" />
        <path d="M30,35 Q50,45 70,35" />
        {/* Cherry */}
        <circle cx="50" cy="15" r="5" />
    </svg>
);

/* =========================================================================
   2. SketchWhisk
   A baker's whisk.
   path: Handle cylinder, 3 intersecting loops.
   ========================================================================= */
export const SketchWhisk = ({ className, strokeWidth = 2 }: IconProps) => (
    <svg
        viewBox="0 0 100 100"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        {/* Handle */}
        <path d="M45,70 L45,95 L55,95 L55,70 Z" />
        <path d="M48,70 L48,95 M52,70 L52,95" className="opacity-40" />

        {/* Loops (Balloon shape) */}
        {/* Outer loop */}
        <path d="M45,70 C10,50 10,10 50,5 C90,10 90,50 55,70" />
        {/* Inner decorative loops */}
        <path d="M48,70 C30,55 30,20 50,15 C70,20 70,55 52,70" />
        <path d="M50,70 C40,60 40,30 50,25 C60,30 60,60 50,70" />
    </svg>
);

/* =========================================================================
   3. SketchWheat
   A single stalk of wheat (curved).
   ========================================================================= */
export const SketchWheat = ({ className, strokeWidth = 1.5 }: IconProps) => (
    <svg
        viewBox="0 0 100 100"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M50,90 Q60,50 50,10" />
        <path d="M50,10 L40,20 M50,10 L60,20" />
        <path d="M50,30 L35,40 M50,30 L65,40" />
        <path d="M52,50 L38,60 M52,50 L66,60" />
    </svg>
);

/* =========================================================================
   4. SketchTeapot
   A round teapot.
   ========================================================================= */
export const SketchTeapot = ({ className, strokeWidth = 1.5 }: IconProps) => (
    <svg
        viewBox="0 0 100 100"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        {/* Pot Body */}
        <path d="M20,50 Q20,20 50,20 Q80,20 80,50 Q80,85 50,85 Q20,85 20,50 Z" />
        {/* Spout */}
        <path d="M80,40 Q95,30 90,20" />
        {/* Handle */}
        <path d="M20,40 Q5,40 5,60 Q5,75 20,70" />
        {/* Lid */}
        <path d="M35,20 Q50,10 65,20" />
        <circle cx="50" cy="10" r="3" />
    </svg>
);

/* =========================================================================
   5. SketchDoodle
   A random squiggly line/underline.
   ========================================================================= */
export const SketchDoodle = ({ className, strokeWidth = 2 }: IconProps) => (
    <svg
        viewBox="0 0 100 20"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M5,10 Q20,5 35,10 T65,10 T95,10" />
    </svg>
);

/* =========================================================================
   6. SketchRollingPin
   ========================================================================= */
export const SketchRollingPin = ({ className, strokeWidth = 1.5 }: IconProps) => (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        {/* Body */}
        <rect x="30" y="35" width="40" height="30" rx="2" transform="rotate(-45 50 50)" />
        {/* Handles */}
        <path d="M25,25 L15,15" />
        <path d="M75,75 L85,85" />
        <path d="M15,15 Q10,20 18,22" />
        <path d="M85,85 Q90,80 82,78" />
    </svg>
);

/* =========================================================================
   7. SketchCookie
   ========================================================================= */
export const SketchCookie = ({ className, strokeWidth = 1.5 }: IconProps) => (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="50" cy="50" r="30" />
        {/* Chips */}
        <path d="M40,40 L41,41" strokeWidth={strokeWidth * 2} />
        <path d="M60,45 L61,46" strokeWidth={strokeWidth * 2} />
        <path d="M45,60 L46,61" strokeWidth={strokeWidth * 2} />
        <path d="M55,55 L56,56" strokeWidth={strokeWidth * 2} />
    </svg>
);

/* =========================================================================
   8. SketchStrawberry
   ========================================================================= */
export const SketchStrawberry = ({ className, strokeWidth = 1.5 }: IconProps) => (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        {/* Body */}
        <path d="M30,30 Q10,50 50,90 Q90,50 70,30 Q50,20 30,30 Z" />
        {/* Leaves */}
        <path d="M30,30 Q40,10 50,30" />
        <path d="M70,30 Q60,10 50,30" />
        <path d="M50,30 Q50,10 50,25" />
        {/* Seeds */}
        <path d="M40,50 L41,51" strokeWidth={strokeWidth} />
        <path d="M60,50 L61,51" strokeWidth={strokeWidth} />
        <path d="M50,65 L51,66" strokeWidth={strokeWidth} />
    </svg>
);

/* =========================================================================
   9. SketchStar
   ========================================================================= */
export const SketchStar = ({ className, strokeWidth = 1.5 }: IconProps) => (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <path d="M50,10 L60,40 L90,40 L65,60 L75,90 L50,70 L25,90 L35,60 L10,40 L40,40 Z" />
    </svg>
);

/* =========================================================================
   10. SketchHeart
   ========================================================================= */
export const SketchHeart = ({ className, strokeWidth = 1.5 }: IconProps) => (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <path d="M50,80 Q90,40 90,20 Q90,0 70,0 Q50,0 50,20 Q50,0 30,0 Q10,0 10,20 Q10,40 50,80" />
    </svg>
);

/* =========================================================================
   11. SketchLeaf
   ========================================================================= */
export const SketchLeaf = ({ className, strokeWidth = 1.5 }: IconProps) => (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <path d="M50,90 Q10,50 50,10 Q90,50 50,90" />
        <path d="M50,10 L50,90" />
        <path d="M50,30 L70,40" />
        <path d="M50,50 L30,60" />
        <path d="M50,70 L70,80" />
    </svg>
);

/* =========================================================================
   12. SketchArrow
   ========================================================================= */
export const SketchArrow = ({ className, strokeWidth = 1.5 }: IconProps) => (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <path d="M10,50 Q40,60 80,50" />
        <path d="M70,40 L90,50 L70,60" />
    </svg>
);

/* =========================================================================
   13. SketchSparkle
   ========================================================================= */
export const SketchSparkle = ({ className, strokeWidth = 1.5 }: IconProps) => (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <path d="M50,10 L50,90 M10,50 L90,50" />
        <path d="M50,10 L45,15 M50,10 L55,15" />
        <path d="M10,50 L15,45 M10,50 L15,55" />
        <path d="M90,50 L85,45 M90,50 L85,55" />
        <path d="M50,90 L45,85 M50,90 L55,85" />
    </svg>
);

/* =========================================================================
   14. SketchSwirl
   ========================================================================= */
export const SketchSwirl = ({ className, strokeWidth = 1.5 }: IconProps) => (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <path d="M50,50 Q60,60 50,70 Q30,70 30,50 Q30,20 60,10 Q90,10 90,50 Q90,90 50,90 Q20,90 10,50" />
    </svg>
);
