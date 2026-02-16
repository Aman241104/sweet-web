import { SITE_CONFIG } from "@/config/site";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-brand-cream">
      {/* Pulsing logo */}
      <div className="animate-pulse">
        <div className="w-48 mx-auto">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={SITE_CONFIG.logo}
            alt={SITE_CONFIG.name}
            className="w-full h-auto object-contain"
          />
        </div>
      </div>

      {/* Subtle loading bar */}
      <div className="mt-8 h-0.5 w-24 overflow-hidden rounded-full bg-brand-cocoa/10">
        <div className="h-full w-1/2 animate-[shimmer_1.2s_ease-in-out_infinite] rounded-full bg-brand-cocoa/40" />
      </div>

      {/* Inline keyframe for shimmer */}
      <style>{`
        @keyframes shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
}
