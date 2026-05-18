"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MessageCircle, X, Maximize2 } from "lucide-react";
import { SketchDoodle, SketchStar } from "@/components/ui/HandDrawnIcons";
import { GALLERY_ITEMS, type GalleryItem } from "@/data/gallery";
import { SITE_CONFIG } from "@/config/site";

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = ["All", "Birthday", "Anniversary", "Wedding", "Customised"] as const;
type Category = (typeof CATEGORIES)[number];

export function Gallery() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredItems = GALLERY_ITEMS.filter(
    (item) => activeCategory === "All" || item.category === activeCategory
  );

  /* ── Staggered reveal on category change ──────────────────────── */
  useGSAP(
    () => {
      if (!gridRef.current) return;
      const cards = gridRef.current.querySelectorAll(".gallery-card");

      gsap.fromTo(
        cards,
        { scale: 0.9, opacity: 0, y: 30 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          overwrite: "auto",
        }
      );
    },
    { dependencies: [activeCategory], scope: sectionRef }
  );

  /* ── WhatsApp Inquiry ─────────────────────────────────────────── */
  const handleInquiry = (item: GalleryItem) => {
    const message = encodeURIComponent(
      `Hi! I saw this design "${item.title}" in your gallery and would like to know more about it.`
    );
    window.open(`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${message}`, "_blank");
  };

  return (
    <section ref={sectionRef} className="relative py-24 px-6 lg:px-10 bg-white overflow-hidden">
      {/* Decors */}
      <div className="pointer-events-none select-none">
        <SketchDoodle className="absolute top-20 right-10 w-40 text-brand-cocoa/5 rotate-12" />
        <SketchStar className="absolute bottom-20 left-10 w-12 text-brand-accent/10 animate-pulse" />
      </div>

      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="text-center mb-16">
          <p className="font-sans text-xs uppercase tracking-widest text-brand-blush mb-2">
            Our Masterpieces
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl text-brand-cocoa tracking-tight">
            Celebration Gallery
          </h2>
          <p className="mt-4 font-sans text-base text-brand-charcoal/60 max-w-xl mx-auto">
            Browse through our collection of designer cakes for every special occasion. 
            Click on any design to see it clearly or inquire directly.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              aria-pressed={activeCategory === cat}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border
                ${activeCategory === cat
                  ? "bg-brand-cocoa text-brand-cream border-brand-cocoa shadow-md"
                  : "bg-transparent text-brand-cocoa border-brand-cocoa/20 hover:border-brand-cocoa/50"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="gallery-card group relative aspect-square overflow-hidden rounded-3xl bg-brand-cocoa/5 shadow-sm transition-all duration-500 hover:shadow-xl"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              
              {/* Overlay with Actions */}
              <div className="absolute inset-0 bg-brand-cocoa/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100 flex flex-col items-center justify-center p-6 text-center">
                <span className="text-[10px] uppercase tracking-widest text-brand-accent mb-2 font-bold">
                  {item.category}
                </span>
                <h3 className="text-white font-serif text-lg leading-tight mb-6">
                  {item.title}
                </h3>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-brand-cocoa transition-colors"
                    title="View Larger"
                  >
                    <Maximize2 size={20} />
                  </button>
                  <button
                    onClick={() => handleInquiry(item)}
                    className="p-3 bg-brand-accent rounded-full text-white hover:bg-white hover:text-brand-accent transition-colors"
                    title="Inquire on WhatsApp"
                  >
                    <MessageCircle size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Light-box Modal ────────────────────────────────────────── */}
      {selectedItem && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-cocoa/90 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedItem(null)}
        >
          <button 
            className="absolute top-6 right-6 p-2 text-white/50 hover:text-white transition-colors"
            onClick={() => setSelectedItem(null)}
          >
            <X size={32} />
          </button>
          
          <div 
            className="relative max-w-4xl w-full aspect-square md:aspect-video rounded-2xl overflow-hidden shadow-2xl bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedItem.image}
              alt={selectedItem.title}
              fill
              className="object-contain md:object-cover"
              sizes="90vw"
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent text-white">
              <span className="text-xs uppercase tracking-widest text-brand-accent font-bold mb-2 block">
                {selectedItem.category}
              </span>
              <h2 className="font-serif text-3xl mb-4">{selectedItem.title}</h2>
              <button
                onClick={() => handleInquiry(selectedItem)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-accent text-white rounded-full font-bold uppercase tracking-widest hover:bg-white hover:text-brand-accent transition-colors"
              >
                <MessageCircle size={18} />
                Inquire for this design
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
