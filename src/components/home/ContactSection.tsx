"use client";

import { useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MessageCircle, MapPin, Clock } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

gsap.registerPlugin(ScrollTrigger);

const STUDIO_IMAGE =
  "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1000&auto=format&fit=crop";

/* shared input classes */
const INPUT_CLS =
  "w-full bg-white px-6 py-4 rounded-xl border border-brand-cocoa/10 font-sans text-base text-brand-cocoa placeholder:text-brand-charcoal/30 outline-none transition-all duration-300 focus:border-brand-cocoa focus:ring-1 focus:ring-brand-cocoa";

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    message: "",
  });

  /* ── GSAP slide-in from opposite sides ───────────────────────── */
  useGSAP(
    () => {
      const left = sectionRef.current?.querySelector(".contact-left");
      const right = sectionRef.current?.querySelector(".contact-right");
      if (left) {
        gsap.fromTo(
          left,
          { x: -50, autoAlpha: 0 },
          {
            x: 0,
            autoAlpha: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: left, start: "top 85%", toggleActions: "play none none none" },
          }
        );
      }
      if (right) {
        gsap.fromTo(
          right,
          { x: 50, autoAlpha: 0 },
          {
            x: 0,
            autoAlpha: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: right, start: "top 85%", toggleActions: "play none none none" },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  /* ── Handle input change ─────────────────────────────────────── */
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    },
    []
  );

  /* ── WhatsApp submit ─────────────────────────────────────────── */
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const text = encodeURIComponent(
        `Hi, I am ${form.name || "a visitor"}.\n` +
        `📞 Phone: ${form.phone || "N/A"}\n` +
        `📅 Event Date: ${form.date || "N/A"}\n` +
        `💬 ${form.message || "I'd like to discuss my order."}`
      );
      window.open(`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${text}`, "_blank");
    },
    [form]
  );

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-24 px-6 lg:px-10 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-brand-blush mb-3">
            Get in Touch
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl text-brand-cocoa tracking-tight">
            Let&rsquo;s Talk Cake.
          </h2>
          <p className="mt-4 font-sans text-base text-brand-charcoal/60 max-w-lg mx-auto">
            Have a vision for your event? Fill out the details below and
            we&rsquo;ll start sketching.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* ── Left: Form ─────────────────────────────────────── */}
          <form
            onSubmit={handleSubmit}
            className="contact-left space-y-5"
          >
            {/* Name */}
            <div>
              <label className="block font-sans text-xs font-bold uppercase tracking-widest text-brand-cocoa/60 mb-2">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Priya Sharma"
                className={INPUT_CLS}
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block font-sans text-xs font-bold uppercase tracking-widest text-brand-cocoa/60 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder={SITE_CONFIG.whatsappDisplay}
                className={INPUT_CLS}
              />
            </div>

            {/* Date */}
            <div>
              <label className="block font-sans text-xs font-bold uppercase tracking-widest text-brand-cocoa/60 mb-2">
                Date of Event
              </label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className={INPUT_CLS}
              />
            </div>

            {/* Message */}
            <div>
              <label className="block font-sans text-xs font-bold uppercase tracking-widest text-brand-cocoa/60 mb-2">
                Message
              </label>
              <textarea
                name="message"
                rows={3}
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us about your dream cake..."
                className={`${INPUT_CLS} resize-none`}
              />
            </div>

            {/* Submit — full width */}
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-cocoa px-8 py-4
                         font-sans text-sm font-medium uppercase tracking-wider text-brand-cream
                         shadow-lg transition-all duration-300
                         hover:-translate-y-1 hover:shadow-xl hover:bg-brand-charcoal"
            >
              <MessageCircle size={16} className="text-green-400" />
              Send via WhatsApp
            </button>
          </form>

          {/* ── Right: Studio image + info card ────────────────── */}
          <div className="contact-right relative">
            {/* Studio / bakery image -> REPLACED with Map Illustration */}
            <div className="relative aspect-4/3 rounded-[2rem] overflow-hidden shadow-lg bg-brand-cream border border-brand-cocoa/10">
              {/* Replace placeholder with an actual map image or illustration */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop"
                alt="Map illustration of Vastrapur, Ahmedabad"
                className="absolute inset-0 h-full w-full object-cover opacity-80 mix-blend-multiply"
                loading="lazy"
              />

              {/* Glassmorphism info card overlay */}
              <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:bottom-6
                              rounded-2xl bg-white/80 backdrop-blur-md border border-white/50 p-6 shadow-xl max-w-[280px]">
                <div className="flex items-start gap-3 mb-3">
                  <MapPin size={18} className="text-brand-blush mt-0.5 shrink-0" />
                  <p className="font-sans text-sm text-brand-cocoa leading-snug">
                    {SITE_CONFIG.address}<br />
                    <span className="font-semibold text-brand-cocoa/80">Contact: {SITE_CONFIG.contactPerson}</span>
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Clock size={18} className="text-brand-blush mt-0.5 shrink-0" />
                  <p className="font-sans text-sm text-brand-cocoa">
                    Open Daily: 9 am – 9 pm
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
