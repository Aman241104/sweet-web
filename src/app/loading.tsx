import Image from "next/image";
import { SITE_CONFIG } from "@/config/site";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-brand-cream">
      <div className="flex flex-col items-center">
        <div className="relative w-32 h-32 mb-4">
          <Image
            src={SITE_CONFIG.logo}
            alt="Loading..."
            fill
            className="object-contain animate-pulse"
            priority
          />
        </div>
        <div className="h-1 w-48 bg-brand-cocoa/10 rounded-full overflow-hidden">
          <div className="h-full bg-brand-accent animate-loading-bar" />
        </div>
      </div>
    </div>
  );
}
