"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Star } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

gsap.registerPlugin(ScrollTrigger);

const REVIEWS = [
  {
    quote:
      `Our wedding cake was an absolute masterpiece. Every guest was asking about it — ${SITE_CONFIG.name} made our day unforgettable!`,
    name: "Priya & Arjun",
    context: "Wedding Cake",
    date: "Jan 2025",
  },
  {
    quote:
      "Ordered a surprise birthday cake for my daughter. The look on her face was priceless. Fluffy, delicious, and stunning!",
    name: "Sneha M.",
    context: "Birthday Cake",
    date: "Nov 2024",
  },
  {
    quote:
      "Best cupcakes in the city, hands down. The salted caramel swirl is dangerously addictive. We order every weekend now.",
    name: "Rahul K.",
    context: "Cupcakes",
    date: "Dec 2024",
  },
  {
    quote:
      "The eggless chocolate truffle was so rich no one believed it was eggless. Incredible quality and gorgeous presentation.",
    name: "Ananya S.",
    context: "Eggless Cake",
    date: "Feb 2025",
  },
  {
    quote:
      "From the first consultation to delivery, the experience was premium. Our corporate event dessert table was a hit!",
    name: "Vikram J.",
    context: "Corporate Order",
    date: "Oct 2024",
  },
];

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const heading = sectionRef.current?.querySelector(".test-heading");
      const cards = sectionRef.current?.querySelectorAll(".test-card");

      if (heading) {
        gsap.fromTo(
          heading,
          { y: 30, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: heading, start: "top 85%", toggleActions: "play none none none" },
          }
        );
      }

      if (cards?.length) {
        gsap.fromTo(
          cards,
          { y: 30, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            stagger: 0.12,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: cards[0], start: "top 85%", toggleActions: "play none none none" },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="py-24 px-6 lg:px-10 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="test-heading text-center mb-16">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-brand-blush mb-3">
            Sweet Words
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl text-brand-cocoa tracking-tight">
            Loved by Our Community
          </h2>
        </div>

        {/* Card track — scroll-snap on mobile, 3-col grid on desktop */}
        <div
          className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4
                     lg:grid lg:grid-cols-3 lg:overflow-visible
                     scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none]
                     [&::-webkit-scrollbar]:hidden"
        >
          {REVIEWS.map((r, i) => (
            <div
              key={i}
              className="test-card relative shrink-0 w-[320px] lg:w-auto snap-center
                         flex flex-col bg-white rounded-2xl p-10
                         border border-brand-cocoa/5
                         shadow-[0_10px_40px_-10px_rgba(61,43,31,0.08)]
                         transition-all duration-300 hover:-translate-y-1
                         hover:shadow-[0_16px_50px_-12px_rgba(61,43,31,0.12)]"
            >
              {/* Decorative quote mark */}
              <span className="absolute top-6 right-8 font-serif text-8xl leading-none text-brand-blush/15 pointer-events-none select-none">
                &ldquo;
              </span>

              {/* Stars — muted gold */}
              <div className="flex gap-0.5 mb-5">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} size={15} className="fill-[#D4AF37] text-[#D4AF37]" />
                ))}
              </div>

              {/* Quote — italic serif */}
              <p className="font-serif italic text-lg md:text-xl text-brand-cocoa/80 leading-relaxed flex-1">
                &ldquo;{r.quote}&rdquo;
              </p>

              {/* Author — avatar + meta */}
              <div className="mt-8 flex items-center gap-4">
                {/* Avatar initial */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-cocoa text-brand-cream font-serif text-xl">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <p className="font-sans text-sm font-bold tracking-wide text-brand-cocoa">
                    {r.name}
                  </p>
                  <p className="font-sans text-xs uppercase tracking-wider text-brand-charcoal/50 mt-0.5">
                    {r.context} &bull; {r.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
