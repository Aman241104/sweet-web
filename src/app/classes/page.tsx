"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MessageCircle, Clock, Star, ArrowRight } from "lucide-react";
import { WORKSHOPS } from "@/data/classes";
import { SITE_CONFIG } from "@/config/site";
import { Footer } from "@/components/layout/Footer";
import { SectionDivider } from "@/components/ui/SectionDivider";
import {
    SketchWhisk,
    SketchCupcake,
    SketchWheat,
    SketchStar,
    SketchRollingPin,
    SketchLeaf,
    SketchDoodle,
} from "@/components/ui/HandDrawnIcons";

gsap.registerPlugin(ScrollTrigger);

export default function ClassesPage() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Wait for the DOM to be fully painted
        const ctx = gsap.context(() => {
            // 1. Hero Animations
            const tl = gsap.timeline();
            tl.from(".hero-content > *", {
                y: 40,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out",
                delay: 0.2,
            })
                .from(".hero-image-container", {
                    x: 40,
                    opacity: 0,
                    scale: 0.95,
                    duration: 1.2,
                    ease: "power3.out",
                }, "-=0.8")
                .from(".floating-element", {
                    scale: 0,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "back.out(1.7)",
                }, "-=0.5");

            // 2. Instructor Section - Parallax & Reveal
            gsap.from(".instructor-polaroid", {
                scrollTrigger: {
                    trigger: ".instructor-section",
                    start: "top 70%",
                },
                rotate: -5,
                y: 100,
                opacity: 0,
                duration: 1.2,
                ease: "power3.out",
            });

            gsap.from(".instructor-text > *", {
                scrollTrigger: {
                    trigger: ".instructor-section",
                    start: "top 70%",
                },
                x: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out",
            });

            // 3. Workshop Cards - Staggered Lift
            gsap.from(".workshop-card", {
                scrollTrigger: {
                    trigger: ".workshops-grid",
                    start: "top 80%",
                },
                y: 80,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power2.out",
                clearProps: "all" // Fix: Allow CSS hover effects to work after animation
            });

            // 4. USP Icons - Pop in
            gsap.from(".usp-icon", {
                scrollTrigger: {
                    trigger: ".usps-section",
                    start: "top 80%",
                },
                scale: 0,
                rotation: -45,
                duration: 0.8,
                ease: "back.out(2)",
                stagger: 0.1,
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="bg-brand-cream min-h-screen pt-20 overflow-x-hidden">

            {/* ── Hero Section: "The Invitation" ─────────────────────────── */}
            <section className="relative min-h-[90vh] flex items-center py-20 overflow-hidden">
                {/* Background Texture */}
                <div className="absolute inset-0 z-0 opacity-[0.03]"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233d2b1f' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}
                />

                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                        {/* Left: Content */}
                        <div className="w-full lg:w-1/2 hero-content z-20">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-accent-light/50 border border-brand-accent/10 mb-8 backdrop-blur-sm">
                                <SketchStar className="w-4 h-4 text-brand-accent " />
                                <span className="text-xs font-bold tracking-widest uppercase text-brand-accent">Admissions Open 2026</span>
                            </div>

                            <h1 className="font-serif text-5xl lg:text-7xl/none text-brand-cocoa mb-6">
                                Unleash Your <br />
                                <span className="relative inline-block text-brand-accent italic pr-4">
                                    Inner Chef
                                    <SketchDoodle className="absolute -bottom-2 left-0 w-full text-brand-accent-light -z-10" />
                                </span>
                            </h1>

                            <p className="text-lg lg:text-xl text-brand-charcoal/80 mb-10 leading-relaxed max-w-lg">
                                Step into Kavita Ma'am's kitchen and master the science of <strong className="text-brand-cocoa">eggless baking</strong>. From sharp-edge strucutres to delicate macarons, we turn home bakers into professionals.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    href="#workshops"
                                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-brand-cocoa text-brand-cream rounded-full font-medium tracking-wider uppercase hover:bg-brand-accent transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
                                >
                                    Explore Classes
                                    <ArrowRight size={18} />
                                </Link>
                                <a
                                    href="https://instagram.com/gourmettazone"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent border border-brand-cocoa/20 text-brand-cocoa rounded-full font-medium tracking-wider uppercase hover:bg-brand-cocoa/5 transition-all duration-300"
                                >
                                    See Stduent Work
                                </a>
                            </div>
                        </div>

                        {/* Right: Image with Blob Mask */}
                        <div className="w-full lg:w-1/2 relative hero-image-container">
                            <div className="relative aspect-[4/5] w-full max-w-lg mx-auto lg:ml-auto">
                                {/* Floating Elements */}

                                <div className="floating-element absolute top-1/2 -right-16 w-32 h-32 bg-brand-accent-light rounded-full p-6 flex items-center justify-center shadow-lg z-30 animate-float-slow" style={{ animationDelay: '1.5s' }}>
                                    <SketchCupcake className="w-16 h-16 text-brand-accent" />
                                </div>

                                {/* Main Image Blob */}
                                <div className="w-full h-full relative z-20 overflow-hidden shadow-2xl bg-brand-cocoa/10" style={{ borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%" }}>
                                    <Image
                                        src="https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=1200"
                                        alt="Baking Workshop"
                                        fill
                                        priority
                                        className="object-cover scale-110 hover:scale-100 transition-transform duration-[2s] ease-in-out"
                                    />
                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-0 bg-brand-cocoa/10 mix-blend-multiply" />
                                </div>

                                {/* Decorative Back Blob */}
                                <div className="absolute inset-0 bg-brand-accent/5 z-10 transform translate-x-4 translate-y-4" style={{ borderRadius: "50% 50% 50% 70% / 50% 50% 70% 60%" }} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* ── Instructor Section: "The Mentor" ───────────────────────── */}
            <section className="py-24 bg-white relative overflow-hidden instructor-section">
                {/* Background Pattern */}


                <div className="container mx-auto px-6 max-w-6xl relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                        {/* Polaroid Image */}
                        <div className="w-full lg:w-5/12 relative instructor-polaroid">
                            <div className="relative bg-white p-4 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700 ease-out border border-gray-100">
                                {/* Tape Effect */}
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-32 h-8 bg-yellow-100/80 shadow-sm rotate-2 z-20" style={{ transform: "translate(-50%) rotate(-2deg)" }} />

                                <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden mb-4">
                                    <Image
                                        src="https://images.unsplash.com/photo-1583394293214-28ded15ee548?q=80&w=800&auto=format&fit=crop"
                                        alt="Kavita Ma'am"
                                        fill
                                        className="object-cover grayscale-0 lg:grayscale hover:grayscale-0 transition-all duration-700"
                                    />
                                </div>
                                <div className="text-center font-font-script text-2xl text-brand-cocoa pt-2">
                                    Kavita
                                </div>
                            </div>

                            {/* Floating Badge */}
                            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-brand-cocoa rounded-full flex flex-col items-center justify-center text-brand-cream shadow-xl border-4 border-white animate-float-slow">
                                <span className="font-serif text-3xl leading-none">12+</span>
                                <span className="text-[10px] uppercase tracking-widest opacity-80 mt-1">Years Exp.</span>
                            </div>
                        </div>

                        {/* Text Content */}
                        <div className="w-full lg:w-7/12 instructor-text">
                            <h2 className="font-serif text-4xl lg:text-5xl text-brand-cocoa mb-8 leading-tight">
                                Teaching the art of <br />
                                <span className="text-brand-accent italic font-script text-6xl lg:text-7xl -ml-2">Passion & Precision</span>
                            </h2>

                            <div className="space-y-6 text-lg text-brand-charcoal/80 leading-relaxed font-light">
                                <p>
                                    "Baking is as much about science as it is about art. In my classes, I don't just teach you recipes; I teach you the 'why' and 'how' behind every step."
                                </p>
                                <p>
                                    Since 2013, I have had the privilege of mentoring over <strong>5,000 students</strong>. My goal is simple: to help you crack the code of eggless baking so you can create bakery-style results in your own home kitchen.
                                </p>
                            </div>

                            <div className="mt-10 pt-10 border-t border-brand-cocoa/10 flex gap-12">
                                <div>
                                    <div className="font-serif text-4xl text-brand-cocoa mb-1">5k+</div>
                                    <div className="text-xs uppercase tracking-widest text-brand-charcoal/50">Students</div>
                                </div>
                                <div>
                                    <div className="font-serif text-4xl text-brand-cocoa mb-1">100%</div>
                                    <div className="text-xs uppercase tracking-widest text-brand-charcoal/50">Eggless</div>
                                </div>
                                <div>
                                    <div className="font-serif text-4xl text-brand-cocoa mb-1">4.9</div>
                                    <div className="text-xs uppercase tracking-widest text-brand-charcoal/50">Rating</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ── Workshops Grid: "The Curriculum" ───────────────────────── */}
            <section id="workshops" className="py-32 bg-brand-cream relative">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <div className="text-center mb-20">
                        <span className="text-brand-accent font-bold tracking-widest uppercase text-sm mb-4 block">Education</span>
                        <h2 className="font-serif text-5xl lg:text-6xl text-brand-cocoa mb-6">Upcoming Masterclasses</h2>
                        <div className="w-24 h-1 bg-brand-cocoa mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 workshops-grid">
                        {WORKSHOPS.map((workshop) => (
                            <div
                                key={workshop.id}
                                className="workshop-card group relative bg-white rounded-none shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_60px_-10px_rgba(0,0,0,0.15)] transition-all duration-500 overflow-hidden"
                            >
                                {/* 1. Image Area (Magazine Cover Style) */}
                                <div className="relative h-[400px] w-full overflow-hidden">
                                    <Image
                                        src={workshop.image}
                                        alt={workshop.title}
                                        fill
                                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                    />
                                    {/* Gradient Overlay for Text Readability */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-brand-cocoa via-transparent to-transparent opacity-90" />

                                    {/* 2. Top Badge */}
                                    <div className="absolute top-0 right-6 bg-brand-accent text-white px-4 py-3 shadow-lg rounded-b-lg flex flex-col items-center">
                                        <span className="text-xs uppercase tracking-tighter opacity-80">Duration</span>
                                        <span className="font-serif text-xl leading-none">{workshop.duration}</span>
                                    </div>

                                    {/* 3. Title & Price Overlay */}
                                    <div className="absolute bottom-0 left-0 w-full p-8 text-white">
                                        <div className="inline-block px-2 py-1 bg-white/20 backdrop-blur-md rounded text-[10px] font-bold uppercase tracking-widest mb-3 border border-white/10">
                                            {workshop.level} Level
                                        </div>
                                        <h3 className="font-serif text-3xl leading-tight mb-2 group-hover:text-brand-pista transition-colors duration-300">
                                            {workshop.title}
                                        </h3>
                                        <div className="text-xl font-medium font-sans opacity-90">
                                            {workshop.price}
                                        </div>
                                    </div>
                                </div>

                                {/* 4. Sliding Details Panel */}
                                <div className="bg-white p-8 border-t border-brand-cocoa/5">
                                    <div className="mb-6">
                                        <ul className="space-y-3">
                                            {workshop.curriculum.slice(0, 4).map((item, i) => (
                                                <li key={i} className="flex items-start gap-3 text-brand-charcoal/80 text-sm group-hover:text-brand-cocoa transition-colors">
                                                    <Star size={14} className="mt-1 text-brand-accent fill-brand-accent" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <a
                                        href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(`Hi, I am interested in the "${workshop.title}" workshop. Please send me the syllabus and details.`)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full py-4 border border-brand-cocoa text-brand-cocoa font-bold uppercase tracking-widest hover:bg-brand-cocoa hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group-hover:gap-4"
                                    >
                                        Enquire Now <MessageCircle size={16} />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Why Learn With Us: "The Difference" ────────────────────── */}
            <section className="py-32 bg-white relative overflow-hidden usps-section">
                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
                        {/* USP 1 */}
                        <div className="flex flex-col items-center text-center group">
                            <div className="usp-icon w-32 h-32 mb-8 relative flex items-center justify-center">
                                <div className="absolute inset-0 bg-white rounded-full scale-100 lg:scale-0 lg:group-hover:scale-100 transition-transform duration-500 opacity-50" />
                                <SketchRollingPin className="w-full h-full text-brand-cocoa group-hover:rotate-12 transition-transform duration-500" strokeWidth={1} />
                            </div>
                            <h3 className="font-serif text-2xl text-brand-cocoa mb-4">100% Hands-on</h3>
                            <p className="text-brand-charcoal/70 leading-relaxed max-w-xs">
                                Roll up your sleeves! You don't just watch here; you bake every single element yourself.
                            </p>
                        </div>

                        {/* USP 2 */}
                        <div className="flex flex-col items-center text-center group">
                            <div className="usp-icon w-32 h-32 mb-8 relative flex items-center justify-center">
                                <div className="absolute inset-0 bg-white rounded-full scale-100 lg:scale-0 lg:group-hover:scale-100 transition-transform duration-500 opacity-50" />
                                <SketchLeaf className="w-full h-full text-green-700/80 group-hover:scale-110 transition-transform duration-500" strokeWidth={1} />
                            </div>
                            <h3 className="font-serif text-2xl text-brand-cocoa mb-4">Certified Eggless</h3>
                            <p className="text-brand-charcoal/70 leading-relaxed max-w-xs">
                                Master the science of vegetarian baking without compromising on texture or structural integrity.
                            </p>
                        </div>

                        {/* USP 3 */}
                        <div className="flex flex-col items-center text-center group">
                            <div className="usp-icon w-32 h-32 mb-8 relative flex items-center justify-center">
                                <div className="absolute inset-0 bg-white rounded-full scale-100 lg:scale-0 lg:group-hover:scale-100 transition-transform duration-500 opacity-50" />
                                <SketchWhisk className="w-full h-full text-brand-accent group-hover:-rotate-12 transition-transform duration-500" strokeWidth={1} />
                            </div>
                            <h3 className="font-serif text-2xl text-brand-cocoa mb-4">Personal Mentor</h3>
                            <p className="text-brand-charcoal/70 leading-relaxed max-w-xs">
                                Small batches ensure you get individual feedback and correction from Kavita Ma'am.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CTA Section ────────────────────────────────────────────── */}
            <section className="relative py-32 bg-brand-cocoa overflow-hidden flex items-center justify-center">
                {/* Background Image with Parallax feeling */}
                <div className="absolute inset-0 opacity-20">
                    <Image
                        src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=2000"
                        alt="Dark Chocolate Background"
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-brand-cocoa via-brand-cocoa/80 to-transparent" />

                <div className="container mx-auto px-6 relative z-10 text-center max-w-3xl">
                    <SketchDoodle className="w-48 h-12 text-brand-accent/30 mx-auto mb-8 " />
                    <h2 className="font-serif text-5xl lg:text-7xl text-brand-cream mb-8 leading-tight">
                        Your Baking Journey <br />
                        <span className="text-brand-accent">Starts Here</span>
                    </h2>
                    <p className="text-xl text-brand-cream/70 mb-12 font-light">
                        Secure your spot in our next batch. Reach out via WhatsApp for the detailed curriculum and schedule.
                    </p>
                    <a
                        href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=Hi Kavita Ma'am, I am interested in your baking classes.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-4 px-10 py-5 bg-brand-accent text-white rounded-full text-lg font-bold uppercase tracking-widest hover:bg-white hover:text-brand-accent transition-all transform hover:scale-105 shadow-[0_20px_50px_-10px_rgba(217,56,86,0.3)]"
                    >
                        <MessageCircle size={24} />
                        Enquire Now
                    </a>
                </div>
            </section>

            <Footer />
        </div>
    );
}
