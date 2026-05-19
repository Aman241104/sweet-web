"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MessageCircle, Clock, ArrowRight, BookOpen, ChefHat, Download } from "lucide-react";
import { BAKING_CATEGORIES, COOKING_CLASSES } from "@/data/classes";
import { SITE_CONFIG } from "@/config/site";
import { Footer } from "@/components/layout/Footer";
import {
    SketchWhisk,
    SketchCupcake,
    SketchStar,
    SketchRollingPin,
    SketchLeaf,
    SketchDoodle,
} from "@/components/ui/HandDrawnIcons";

gsap.registerPlugin(ScrollTrigger);

export default function ClassesPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeTab, setActiveTab] = useState<"baking" | "cooking">("baking");

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

            // 3. USP Icons - Pop in
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
                                Creative Cooking With <br />
                                <span className="relative inline-block text-brand-accent italic pr-4">
                                    Kavita
                                    <SketchDoodle className="absolute -bottom-2 left-0 w-full text-brand-accent-light -z-10" />
                                </span>
                            </h1>

                            <p className="text-lg lg:text-xl text-brand-charcoal/80 mb-10 leading-relaxed max-w-lg">
                                Step into Kavita Ma&apos;am&apos;s kitchen and master the art of <strong className="text-brand-cocoa">eggless baking & gourmet cooking</strong>. From designer cakes to traditional sweets, we turn food enthusiasts into professionals.
                            </p>

                            <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                                <Link
                                    href="#curriculum"
                                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-brand-cocoa text-brand-cream rounded-full font-medium tracking-wider uppercase hover:bg-brand-accent transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
                                >
                                    Explore Curriculum
                                    <ArrowRight size={18} />
                                </Link>
                                <Link
                                    href="#curriculum"
                                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-brand-accent text-white rounded-full font-medium tracking-wider uppercase hover:bg-white hover:text-brand-accent border border-brand-accent transition-all duration-300 shadow-xl hover:-translate-y-1"
                                >
                                    Full Curriculum
                                </Link>
                                <a
                                    href="https://instagram.com/creativecookingwithkavitaa"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent border border-brand-cocoa/20 text-brand-cocoa rounded-full font-medium tracking-wider uppercase hover:bg-brand-cocoa/5 transition-all duration-300"
                                >
                                    See Student Work
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
                                        src="/products/rasmalai_cake.png"
                                        alt="Signature Rasmalai Cake"
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
                                        src="/owner.png"
                                        alt="Kavita Ma&apos;am"
                                        fill
                                        className="object-cover transition-all duration-700"
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
                                    &quot;Baking is as much about science as it is about art. In my classes, I don&apos;t just teach you recipes; I teach you the &apos;why&apos; and &apos;how&apos; behind every step.&quot;
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

            {/* ── Full Curriculum Section ───────────────────────────── */}
            <section id="curriculum" className="py-24 bg-white border-y border-brand-cocoa/5">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-4xl lg:text-5xl text-brand-cocoa mb-4">Complete Syllabus</h2>
                        <p className="text-brand-charcoal/60">Explore our wide range of professional baking and cooking courses.</p>
                    </div>

                    {/* Tabs */}
                    <div className="flex justify-center mb-12">
                        <div className="inline-flex p-1 bg-brand-cream rounded-xl border border-brand-cocoa/10">
                            <button
                                onClick={() => setActiveTab("baking")}
                                className={`flex items-center gap-2 px-8 py-3 rounded-lg text-sm font-bold uppercase tracking-widest transition-all duration-300 ${activeTab === "baking" ? "bg-brand-cocoa text-brand-cream shadow-lg" : "text-brand-cocoa/60 hover:text-brand-cocoa"}`}
                            >
                                <ChefHat size={18} />
                                Baking Courses
                            </button>
                            <button
                                onClick={() => setActiveTab("cooking")}
                                className={`flex items-center gap-2 px-8 py-3 rounded-lg text-sm font-bold uppercase tracking-widest transition-all duration-300 ${activeTab === "cooking" ? "bg-brand-cocoa text-brand-cream shadow-lg" : "text-brand-cocoa/60 hover:text-brand-cocoa"}`}
                            >
                                <BookOpen size={18} />
                                Cooking Courses
                            </button>
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="bg-brand-cream/30 rounded-3xl p-6 lg:p-10 border border-brand-cocoa/5">
                        {activeTab === "baking" ? (
                            <div className="space-y-16">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                                    <div>
                                        <h3 className="font-serif text-3xl text-brand-cocoa mb-2">Baking Workshops</h3>
                                        <p className="text-brand-charcoal/60 text-sm">Professional certified courses across 9 specialized categories.</p>
                                    </div>
                                    <a
                                        href="/products/CCWK-Baking%20Workshops.pdf"
                                        download
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-brand-accent text-white rounded-full text-sm font-bold uppercase tracking-widest hover:bg-brand-cocoa transition-colors"
                                    >
                                        <Download size={16} />
                                        Download PDF Syllabus
                                    </a>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {BAKING_CATEGORIES.map((category) => (
                                        <div key={category.name} className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-brand-cocoa/5 hover:shadow-xl transition-all duration-500 flex flex-col">
                                            {/* Category Image */}
                                            <div className="relative h-56 w-full overflow-hidden">
                                                <Image
                                                    src={category.image || "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=800"}
                                                    alt={category.name}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-brand-cocoa/60 to-transparent" />
                                                <div className="absolute bottom-4 left-6">
                                                    <h4 className="font-serif text-2xl text-white">{category.name}</h4>
                                                </div>
                                            </div>

                                            {/* Course List */}
                                            <div className="p-6 flex-grow">
                                                <ul className="space-y-4">
                                                    {category.courses.map((course) => (
                                                        <li key={course.id} className="flex justify-between items-start group/item">
                                                            <div className="flex-grow">
                                                                <span className="text-brand-cocoa font-medium text-sm leading-tight block group-hover/item:text-brand-accent transition-colors">{course.title}</span>
                                                                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-brand-charcoal/40 mt-1">
                                                                    <Clock size={10} />
                                                                    {course.duration}
                                                                </div>
                                                            </div>
                                                            <span className="text-brand-accent font-bold text-sm ml-4">{course.price}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* CTA */}
                                            <div className="p-4 bg-brand-cream/50 border-t border-brand-cocoa/5">
                                                <a
                                                    href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(`Hi, I am interested in the "${category.name}" baking courses. Please send me details.`)}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-full py-3 bg-brand-cocoa text-brand-cream text-[10px] font-bold uppercase tracking-[0.2em] rounded-lg text-center hover:bg-brand-accent transition-colors block"
                                                >
                                                    Enquire Category
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-16">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                                    <div>
                                        <h3 className="font-serif text-3xl text-brand-cocoa mb-2">Cooking Courses</h3>
                                        <p className="text-brand-charcoal/60 text-sm">From traditional sweets to global cuisines, master it all.</p>
                                    </div>
                                    <a
                                        href="/products/CCWK_Cooking%20Course.pdf"
                                        download
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-brand-accent text-white rounded-full text-sm font-bold uppercase tracking-widest hover:bg-brand-cocoa transition-colors"
                                    >
                                        <Download size={16} />
                                        Download PDF Syllabus
                                    </a>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {COOKING_CLASSES.map((course) => (
                                        <div key={course.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-brand-cocoa/5 hover:shadow-lg transition-all duration-300">
                                            {/* Course Image */}
                                            <div className="relative h-48 w-full overflow-hidden">
                                                <Image
                                                    src={course.image || "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=800"}
                                                    alt={course.title}
                                                    fill
                                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                                <div className="absolute top-4 right-4 bg-brand-accent text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-lg">
                                                    {course.price}
                                                </div>
                                            </div>

                                            {/* Course Content */}
                                            <div className="p-5">
                                                <h4 className="text-brand-cocoa font-serif text-lg leading-tight mb-2 group-hover:text-brand-accent transition-colors">
                                                    {course.title}
                                                </h4>
                                                <div className="flex items-center gap-2 text-xs text-brand-charcoal/50 uppercase tracking-widest">
                                                    <Clock size={12} className="text-brand-accent" />
                                                    {course.duration}
                                                </div>

                                                <a
                                                    href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(`Hi, I am interested in the "${course.title}" cooking class. Please send me details.`)}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="mt-6 w-full py-3 border border-brand-cocoa/10 text-brand-cocoa text-[10px] font-bold uppercase tracking-[0.2em] rounded-lg text-center hover:bg-brand-cocoa hover:text-white transition-all block"
                                                >
                                                    Enquire Now
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* General Notes */}
                        <div className="mt-12 p-6 bg-white/50 rounded-2xl border border-dashed border-brand-cocoa/20 text-center">
                            <p className="text-xs text-brand-charcoal/60 uppercase tracking-widest leading-relaxed">
                                *All classes are <strong className="text-green-700">pure veg and eggless</strong> • Prior registration mandatory • Maximum batch size: 6 students • individual classes available on request
                            </p>
                        </div>
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
                                Roll up your sleeves! You don&apos;t just watch here; you bake every single element yourself.
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
                                Small batches ensure you get individual feedback and correction from Kavita Ma&apos;am.
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
                        src="/products/dutch_truffle_cake.png"
                        alt="Dark Chocolate Truffle Background"
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-brand-cocoa via-brand-cocoa/80 to-transparent" />

                <div className="container mx-auto px-6 relative z-10 text-center max-w-3xl">
                    <SketchDoodle className="w-48 h-12 text-brand-accent/30 mx-auto mb-8 " />
                    <h2 className="font-serif text-5xl lg:text-7xl text-brand-cream mb-8 leading-tight">
                        Your Culinary Journey <br />
                        <span className="text-brand-accent">Starts Here</span>
                    </h2>
                    <p className="text-xl text-brand-cream/70 mb-12 font-light">
                        Secure your spot in our next batch. Reach out via WhatsApp for the detailed curriculum and schedule for our Baking and Cooking classes.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
                        <a
                            href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=Hi Kavita Ma&apos;am, I am interested in your baking and cooking classes.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-4 px-10 py-5 bg-brand-accent text-white rounded-full text-lg font-bold uppercase tracking-widest hover:bg-white hover:text-brand-accent transition-all transform hover:scale-105 shadow-[0_20px_50px_-10px_rgba(217,56,86,0.3)]"
                        >
                            <MessageCircle size={24} />
                            Enquire Now
                        </a>
                        <Link
                            href="#curriculum"
                            className="inline-flex items-center gap-4 px-10 py-5 bg-white text-brand-cocoa rounded-full text-lg font-bold uppercase tracking-widest hover:bg-brand-cocoa hover:text-white transition-all transform hover:scale-105 shadow-xl"
                        >
                            View Full Syllabus
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
