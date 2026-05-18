"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Star } from "lucide-react";
import { SketchCupcake, SketchTeapot } from "@/components/ui/HandDrawnIcons";

gsap.registerPlugin(ScrollTrigger);

const REVIEWS = [
  {
    quote: "Best cake shop I have visited. Cake is awesome in taste and design. 10/10.The owner is so polite. Other desserts are also amazing like cheesecake, brownie.",
    name: "AJAY BHAGORA",
    context: "Google Review",
    date: "4 months ago",
  },
  {
    quote: "I ordered a customised cake for for my sons birthday to Gourmetttazone. I got best cake in taste and design. I will highly recommend the Gourmetttazone, his address is GF 55, Satyam mall near Cross Ahmedabad.",
    name: "Hitesh Parmar",
    context: "Google Review",
    date: "3 months ago",
  },
  {
    quote: "Best Cake shop in vastrapur. Cheesecake is awesome. Walnut brownie is yummy",
    name: "Chauhan Sumit",
    context: "Google Review",
    date: "2 months ago",
  },
  {
    quote: "I got best customised cake from Gourmetttazone. Yaha ki hot walnut brownie to amazing h",
    name: "Thakkar Dhruv",
    context: "Google Review",
    date: "2 months ago",
  },
  {
    quote: "Triple strawberry chocolate at just ₹99 it unbelievable. Quality is superb and fresh. Walnut brownie is awesome",
    name: "Mohit Chouhan",
    context: "Google Review",
    date: "4 months ago",
  },
  {
    quote: "I got Best cheesecake from gourmettazone. Yaha ki walnut brownie to awesome h",
    name: "Aman Tomar",
    context: "Google Review",
    date: "2 months ago",
  }
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
    <section ref={sectionRef} className="relative py-24 px-6 lg:px-10 overflow-hidden">
      {/* Floating Decorations */}
      <div className="absolute top-10 left-0 lg:left-10 opacity-20 text-brand-accent pointer-events-none animate-float-slow">
        <SketchCupcake className="w-32 h-32 -rotate-12" />
      </div>
      <div className="absolute bottom-10 right-0 lg:right-10 opacity-20 text-brand-cocoa pointer-events-none animate-float-slow animation-delay-2000">
        <SketchTeapot className="w-40 h-40 rotate-6" />
      </div>

      <div className="mx-auto max-w-7xl relative z-10">
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
              <p className="font-serif italic text-lg md:text-xl text-brand-cocoa leading-relaxed flex-1">
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
