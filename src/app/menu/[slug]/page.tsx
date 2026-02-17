"use client";

import { useParams, useRouter } from "next/navigation";
import { useRef, useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  MessageCircle,
  Star,
  Clock,
  Info,
  Leaf,
  Heart,
  Plus,
  Minus
} from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { MENU_ITEMS } from "@/data/menu";
import { SITE_CONFIG } from "@/config/site";
import { ProductCard } from "@/components/ui/ProductCard";
import { MarqueeBar } from "@/components/ui/MarqueeBar";
import { Navbar } from "@/components/layout/Navbar";

export default function ProductDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const product = MENU_ITEMS.find((p) => p.id === slug);

  // Suggested Pairings (Deterministic selection to stay "Pure")
  const suggestedProducts = useMemo(() => {
    if (!product) return [];
    // Show products from same category or fallback to first 3
    const sameCategory = MENU_ITEMS.filter((p) => p.category === product.category && p.id !== product.id);
    if (sameCategory.length >= 3) return sameCategory.slice(0, 3);

    // Fallback if not enough in same category
    const others = MENU_ITEMS.filter((p) => p.id !== product.id && p.category !== product.category);
    return [...sameCategory, ...others].slice(0, 3);
  }, [product]);

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product?.weightOptions[0] || "");

  useGSAP(() => {
    if (!product) return;
    const tl = gsap.timeline();

    tl.fromTo(
      ".product-image",
      { x: -100, autoAlpha: 0 },
      { x: 0, autoAlpha: 1, duration: 1.2, ease: "power4.out" }
    )
      .fromTo(
        ".animate-text",
        { y: 30, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" },
        "-=0.8"
      )
      .fromTo(
        ".suggested-section",
        { y: 50, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 1, ease: "power3.out" },
        "-=0.4"
      );
  }, { scope: containerRef, dependencies: [product] });

  if (!product) {
    return (
      <div className="min-h-screen bg-brand-cream flex flex-col items-center justify-center p-6 text-center">
        <h1 className="font-serif text-4xl text-brand-cocoa mb-4">Product Not Found</h1>
        <p className="font-sans text-brand-charcoal/60 mb-8 text-lg">
          The sweet treat you&rsquo;re looking for seems to have vanished!
        </p>
        <Link
          href="/#menu"
          className="font-sans font-bold text-brand-cocoa border-b-2 border-brand-cocoa pb-1 hover:text-brand-blush hover:border-brand-blush transition-colors"
        >
          Back to Menu
        </Link>
      </div>
    );
  }

  const handleOrder = () => {
    const message = encodeURIComponent(
      `Hi! I'd like to order ${quantity} x ${product.name} (${selectedSize}). Please share the booking details.`
    );
    window.open(`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${message}`, "_blank");
  };

  return (
    <main ref={containerRef} className="min-h-screen bg-brand-cream">
      <MarqueeBar />
      <Navbar />
      <div className="pt-32 sm:pt-40 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          {/* Breadcrumb / Back Button */}
          <button
            onClick={() => router.back()}
            className="group mb-6 sm:mb-12 flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-[0.2em] text-brand-cocoa/40 hover:text-brand-cocoa transition-colors"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
            Back to Menu
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 lg:gap-16 items-start mb-12 sm:mb-24">
            {/* Left Column: Image */}
            <div className="product-image relative aspect-[4/3] sm:aspect-4/5 rounded-2xl sm:rounded-[2.5rem] overflow-hidden shadow-2xl">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <div className="absolute top-4 left-4 sm:top-8 sm:left-8 bg-white/90 backdrop-blur-md px-4 sm:px-6 py-1.5 sm:py-2 rounded-full shadow-sm">
                  <span className="font-sans text-xs font-bold uppercase tracking-widest text-brand-cocoa">
                    {product.badge}
                  </span>
                </div>
              )}
            </div>

            {/* Right Column: Info */}
            <div className="product-info space-y-6 sm:space-y-10">
              <div className="space-y-4 sm:space-y-6">
                <div className="animate-text space-y-2">
                  <p className="font-sans text-xs uppercase tracking-[0.3em] text-brand-blush font-bold">
                    {product.category}
                  </p>
                  <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-brand-cocoa tracking-tight leading-[1.1]">
                    {product.name}
                  </h1>
                </div>

                <div className="animate-text flex items-center justify-between py-2 border-b border-brand-cocoa/10">
                  <p className="text-2xl sm:text-4xl font-serif text-brand-cocoa/90">
                    {product.price}
                  </p>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={14} className="fill-[#D4AF37] text-[#D4AF37]" />
                    ))}
                    <span className="ml-2 font-sans text-[10px] font-bold text-brand-cocoa/40 uppercase tracking-widest">
                      Best Rated
                    </span>
                  </div>
                </div>

                {/* Ingredients Highlight */}
                <div className="animate-text flex flex-wrap gap-2 pt-2">
                  {product.ingredients?.map((ing) => (
                    <span
                      key={ing}
                      className="text-[10px] uppercase font-medium tracking-wider px-3 py-1.5 rounded-md border border-brand-cocoa/10 text-brand-cocoa/60 bg-white"
                    >
                      {ing}
                    </span>
                  ))}
                </div>

                {/* Specialty Badges - Quality Seals */}
                <div className="animate-text flex flex-wrap gap-3 sm:gap-6 text-[10px] uppercase font-bold tracking-widest text-brand-cocoa/60">
                  <div className="flex items-center gap-2">
                    <Leaf size={14} className="text-green-600/60" />
                    <span>100% Eggless</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star size={14} className="text-brand-blush/60" />
                    <span>Gourmettazone Handcrafted</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart size={14} className="text-red-400/60" />
                    <span>No Refined Sugar</span>
                  </div>
                </div>
              </div>

              <div className="animate-text space-y-3 sm:space-y-6">
                <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-brand-cocoa">
                  The Story
                </h3>
                <p className="font-sans text-base sm:text-lg text-brand-charcoal/70 leading-relaxed font-light max-w-xl">
                  {product.longDescription}
                </p>
              </div>

              {/* Selection Controls */}
              <div className="animate-text space-y-5 sm:space-y-8 pt-2 sm:pt-4">
                {/* Weight/Size Selection */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-brand-cocoa">
                    <Clock size={16} />
                    <h4 className="font-sans text-xs font-bold uppercase tracking-widest">Select Weight/Size</h4>
                  </div>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {product.weightOptions.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setSelectedSize(opt)}
                        className={`px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-sans transition-all duration-300 border
                                 ${selectedSize === opt
                            ? "bg-brand-cocoa text-brand-cream border-brand-cocoa shadow-md scale-105"
                            : "bg-white text-brand-charcoal/60 border-brand-cocoa/10 hover:border-brand-cocoa shadow-sm"}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Order Actions */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-4 sm:pt-6">
                  {/* Quantity Selector */}
                  <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 rounded-full border border-brand-cocoa/10 bg-white/50 w-full sm:w-auto min-w-[140px]">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-1 hover:text-brand-blush transition-colors"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="font-serif text-xl px-4 min-w-[32px] text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-1 hover:text-brand-blush transition-colors"
                    >
                      <Plus size={18} />
                    </button>
                  </div>

                  <OrderButton onClick={handleOrder} />
                </div>

                <div className="flex items-center gap-3 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-brand-cocoa/5 border border-brand-cocoa/5">
                  <Info size={16} className="text-brand-cocoa/40 shrink-0" />
                  <p className="font-sans text-xs text-brand-charcoal/50 leading-relaxed">
                    We bake everything fresh per order. Custom messages or decorative requests can be shared directly on WhatsApp.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Suggested Pairings */}
          <section className="suggested-section pt-12 sm:pt-24 border-t border-brand-cocoa/10">
            <div className="flex items-end justify-between mb-6 sm:mb-12">
              <div>
                <p className="font-sans text-xs uppercase tracking-widest text-brand-blush mb-2">
                  Make it a feast
                </p>
                <h2 className="font-serif text-2xl sm:text-4xl text-brand-cocoa tracking-tight">
                  Perfect with this
                </h2>
              </div>
              <Link
                href="/#menu"
                className="hidden sm:inline-flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-widest text-brand-cocoa border-b border-brand-cocoa pb-1 opacity-60 hover:opacity-100 transition-opacity"
              >
                Explore Full Menu
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8">
              {suggestedProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  id={p.id}
                  name={p.name}
                  price={p.price}
                  image={p.image}
                  badge={p.badge}
                  className="w-full shadow-none hover:shadow-xl"
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function OrderButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group relative overflow-hidden flex-1"
    >
      <div className="relative flex items-center justify-center gap-2 sm:gap-3 bg-brand-cocoa px-6 sm:px-10 py-3.5 sm:py-5 rounded-full 
                      transition-all duration-500 group-hover:bg-brand-blush group-hover:scale-[1.02] active:scale-95 shadow-lg">
        <MessageCircle size={20} className="text-brand-cream fill-brand-cream/10" />
        <span className="font-sans text-sm font-bold uppercase tracking-[0.2em] text-brand-cream">
          Inquire on WhatsApp
        </span>
      </div>
    </button>
  );
}
