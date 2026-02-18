"use client";

import { useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MessageCircle, MapPin, Clock, Mail } from "lucide-react";
import { SketchArrow, SketchCookie } from "@/components/ui/HandDrawnIcons";
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
      className="relative py-24 px-6 lg:px-10 overflow-hidden bg-brand-accent-light/30"
    >
      {/* Decorations */}
      <SketchArrow className="hidden lg:block absolute top-32 left-[20%] w-24 h-24 text-brand-cocoa/10 rotate-[135deg] pointer-events-none" />
      <SketchCookie className="absolute bottom-10 left-10 w-20 h-20 text-brand-cocoa/5 -rotate-12 pointer-events-none animate-float-slow" />

      <div className="mx-auto max-w-7xl relative z-10">
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
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.697915724496!2d72.5293247!3d23.0333215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e84aa58d638c3%3A0xf0718dfd13564883!2sVastrapur%20Lake%2C%20Vastrapur%2C%20Ahmedabad%2C%20Gujarat%20380015!5e0!3m2!1sen!2sin!4v1709225725791!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full opacity-80 mix-blend-multiply grayscale-[0.2] contrast-[1.1]"
                title="Gourmettazone Location"
              />

              {/* Glassmorphism info card overlay */}
              <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:bottom-6
                              rounded-2xl bg-white/80 backdrop-blur-md border border-white/50 p-6 shadow-xl max-w-[280px]">
                <div className="flex items-start gap-3 mb-3">
                  <MapPin size={18} className="text-brand-blush mt-0.5 shrink-0" />
                  <p className="font-sans text-sm text-brand-cocoa leading-snug">
                    {SITE_CONFIG.address}<br />
                    <span className="font-semibold text-brand-cocoa/80">Contact: {SITE_CONFIG.contactPerson}</span>
                    <br />
                    <span className="block mt-1 text-brand-cocoa/80">
                      {SITE_CONFIG.contactNumbers.join(" / ")}
                    </span>
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Clock size={18} className="text-brand-blush mt-0.5 shrink-0" />
                  <p className="font-sans text-sm text-brand-cocoa">
                    Open Daily: 9 am – 9 pm
                  </p>
                </div>
                <div className="flex items-start gap-3 mt-3">
                  <Mail size={18} className="text-brand-blush mt-0.5 shrink-0" />
                  <a href={`mailto:${SITE_CONFIG.email}`} className="font-sans text-sm text-brand-cocoa hover:text-brand-blush transition-colors">
                    {SITE_CONFIG.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
