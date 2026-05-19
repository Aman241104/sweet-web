"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MessageCircle, Clock, ArrowRight, BookOpen, ChefHat, Download, Search, HelpCircle, CheckCircle2 } from "lucide-react";
import { BAKING_CATEGORIES, COOKING_CLASSES } from "@/data/classes";
import { SITE_CONFIG } from "@/config/site";
import { Footer } from "@/components/layout/Footer";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { GlowOrb, OrganicSwirl } from "@/components/ui/Decorations";
import {
    SketchWhisk,
    SketchCupcake,
    SketchStar,
    SketchRollingPin,
    SketchLeaf,
    SketchDoodle,
} from "@/components/ui/HandDrawnIcons";

gsap.registerPlugin(ScrollTrigger);

const FAQS = [
    {
        q: "Are the classes suitable for absolute beginners?",
        a: "Yes! Most of our courses are designed for beginners. We start from the basics and guide you step-by-step."
    },
    {
        q: "Do I need to bring my own ingredients?",
        a: "No, all ingredients, tools, and aprons are provided by us in the studio. You just need to bring your enthusiasm!"
    },
    {
        q: "Will I get a certificate after completion?",
        a: "Yes, we provide a 'Creative Cooking with Kavita' certificate for all our professional workshops."
    },
    {
        q: "Are all classes really eggless?",
        a: "Absolutely. 100% of our baking and cooking classes are pure vegetarian and eggless."
    },
    {
        q: "What is the batch size?",
        a: "To ensure personal attention, we keep our batches small, typically limited to 6 students."
    }
];

export default function ClassesPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [activeTab, setActiveTab] = useState<"baking" | "cooking">("baking");
    const [searchQuery, setSearchQuery] = useState("");

    // Filtering logic
    const filteredBaking = BAKING_CATEGORIES.map(cat => ({
        ...cat,
        courses: cat.courses.filter(course =>
            course.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
    })).filter(cat => cat.courses.length > 0);

    const filteredCooking = COOKING_CLASSES.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useGSAP(() => {
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

        // 2. Section Reveals
        const sections = gsap.utils.toArray<HTMLElement>("section:not(.hero-section)");
        sections.forEach((section) => {
            gsap.from(section.querySelectorAll(".reveal-up"), {
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                },
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
            });
        });

        // 3. Instructor Section - Parallax & Reveal
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

        // 5. Parallax for background decorations
        gsap.to(".parallax-bg", {
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
            },
            y: (i, target) => -100 * (parseFloat(target.dataset.speed || "1")),
            ease: "none",
        });

    }, { scope: containerRef });

    // Handle tab change animation
    useEffect(() => {
        if (contentRef.current) {
            gsap.fromTo(contentRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
            );
        }
    }, [activeTab]);

    return (
        <div ref={containerRef} className="bg-brand-cream min-h-screen pt-20 overflow-x-hidden">

            {/* ── Hero Section: "The Invitation" ─────────────────────────── */}
            <section className="relative min-h-[90vh] flex items-center py-20 overflow-hidden hero-section">
                {/* Background Texture */}
                <div className="absolute inset-0 z-0 opacity-[0.03]"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233d2b1f' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}
                />
                
                <GlowOrb className="top-1/4 -left-20 w-[500px] h-[500px]" />
                <GlowOrb className="bottom-1/4 -right-20 w-[400px] h-[400px] bg-brand-accent/10" />

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
                                <div className="floating-element absolute top-10 -left-10 w-24 h-24 bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-xl z-30 animate-float-slow">
                                    <SketchWhisk className="w-full h-full text-brand-accent" />
                                </div>

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
                
                <div className="absolute bottom-0 left-0 w-full z-20">
                    <SectionDivider className="text-white" />
                </div>
            </section>


            {/* ── Instructor Section: "The Mentor" ───────────────────────── */}
            <section className="py-24 bg-white relative overflow-hidden instructor-section">
                <GlowOrb className="top-1/2 right-0 w-[600px] h-[600px] bg-brand-cream/50" />
                <OrganicSwirl className="absolute -top-10 -left-10 w-64 h-64 text-brand-accent/5 rotate-45" />

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
                            <h2 className="reveal-up font-serif text-4xl lg:text-5xl text-brand-cocoa mb-8 leading-tight">
                                Teaching the art of <br />
                                <span className="text-brand-accent italic font-script text-6xl lg:text-7xl -ml-2">Passion & Precision</span>
                            </h2>

                            <div className="reveal-up space-y-6 text-lg text-brand-charcoal/80 leading-relaxed font-light">
                                <p>
                                    &quot;Baking is as much about science as it is about art. In my classes, I don&apos;t just teach you recipes; I teach you the &apos;why&apos; and &apos;how&apos; behind every step.&quot;
                                </p>
                                <p>
                                    Since 2013, I have had the privilege of mentoring over <strong>5,000 students</strong>. My goal is simple: to help you crack the code of eggless baking so you can create bakery-style results in your own home kitchen.
                                </p>
                            </div>

                            <div className="reveal-up mt-10 pt-10 border-t border-brand-cocoa/10 flex gap-12">
                                <div className="group cursor-default">
                                    <div className="font-serif text-4xl text-brand-cocoa mb-1 group-hover:text-brand-accent transition-colors">5k+</div>
                                    <div className="text-xs uppercase tracking-widest text-brand-charcoal/50">Students</div>
                                </div>
                                <div className="group cursor-default">
                                    <div className="font-serif text-4xl text-brand-cocoa mb-1 group-hover:text-brand-accent transition-colors">100%</div>
                                    <div className="text-xs uppercase tracking-widest text-brand-charcoal/50">Eggless</div>
                                </div>
                                <div className="group cursor-default">
                                    <div className="font-serif text-4xl text-brand-cocoa mb-1 group-hover:text-brand-accent transition-colors">4.9</div>
                                    <div className="text-xs uppercase tracking-widest text-brand-charcoal/50">Rating</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            
            <div className="w-full rotate-180 -mt-1 relative z-10">
                <SectionDivider className="text-brand-cream/50" />
            </div>

            {/* ── Full Curriculum Section ───────────────────────────── */}
            <section id="curriculum" className="py-24 bg-brand-cream/30 relative overflow-hidden curriculum-section">
                <GlowOrb className="top-1/3 left-0 w-[400px] h-[400px] bg-brand-accent/5" />
                <GlowOrb className="bottom-0 right-0 w-[500px] h-[500px] bg-brand-cocoa/5" />

                <div className="container mx-auto px-6 max-w-6xl relative z-10">
                    <div className="text-center mb-16 reveal-up">
                        <h2 className="font-serif text-4xl lg:text-5xl text-brand-cocoa mb-4">Complete Syllabus</h2>
                        <p className="text-brand-charcoal/60">Explore our wide range of professional baking and cooking courses.</p>
                    </div>

                    {/* Search & Filter Bar */}
                    <div className="max-w-xl mx-auto mb-12 relative px-4 reveal-up">
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-cocoa/40 group-focus-within:text-brand-accent transition-colors" size={20} />
                            <input
                                type="text"
                                placeholder="Search for a course (e.g. 'Cake', 'Thai', 'Bread')..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-white border border-brand-cocoa/10 rounded-2xl shadow-sm focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all text-brand-cocoa"
                            />
                        </div>
                    </div>

                    {/* Tabs - Sticky */}
                    <div className="sticky top-24 z-30 flex justify-center mb-12 reveal-up">
                        <div className="inline-flex p-1 bg-white/80 backdrop-blur-md rounded-xl border border-brand-cocoa/10 shadow-lg">
                            <button
                                onClick={() => setActiveTab("baking")}
                                className={`flex items-center gap-2 px-8 py-3 rounded-lg text-sm font-bold uppercase tracking-widest transition-all duration-300 ${activeTab === "baking" ? "bg-brand-cocoa text-brand-cream" : "text-brand-cocoa/60 hover:text-brand-cocoa"}`}
                            >
                                <ChefHat size={18} />
                                Baking
                            </button>
                            <button
                                onClick={() => setActiveTab("cooking")}
                                className={`flex items-center gap-2 px-8 py-3 rounded-lg text-sm font-bold uppercase tracking-widest transition-all duration-300 ${activeTab === "cooking" ? "bg-brand-cocoa text-brand-cream" : "text-brand-cocoa/60 hover:text-brand-cocoa"}`}
                            >
                                <BookOpen size={18} />
                                Cooking
                            </button>
                        </div>
                    </div>

                    {/* No Results State */}
                    {searchQuery && (activeTab === "baking" ? filteredBaking : filteredCooking).length === 0 && (
                        <div className="text-center py-20 bg-white/30 rounded-3xl border border-dashed border-brand-cocoa/10">
                            <div className="w-16 h-16 bg-brand-cream rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search size={24} className="text-brand-cocoa/20" />
                            </div>
                            <h3 className="font-serif text-2xl text-brand-cocoa mb-2">No courses found</h3>
                            <p className="text-brand-charcoal/60">Try searching for something else or browse all courses.</p>
                            <button onClick={() => setSearchQuery("")} className="mt-6 text-brand-accent font-bold uppercase tracking-widest text-xs border-b border-brand-accent pb-1">Clear Search</button>
                        </div>
                    )}

                    {/* Tab Content */}
                    <div ref={contentRef} className="bg-white/50 backdrop-blur-sm rounded-3xl p-6 lg:p-10 border border-white">
                        {activeTab === "baking" ? (
                            <div className="space-y-16">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                                    <div>
                                        <h3 className="font-serif text-3xl text-brand-cocoa mb-2">Baking Workshops</h3>
                                        <p className="text-brand-charcoal/60 text-sm">Professional certified courses across {filteredBaking.length} categories.</p>
                                    </div>
                                    <a
                                        href="/products/CCWK-Baking%20Workshops.pdf"
                                        download
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-brand-accent text-white rounded-full text-sm font-bold uppercase tracking-widest hover:bg-brand-cocoa transition-colors shadow-lg shadow-brand-accent/20"
                                    >
                                        <Download size={16} />
                                        Download PDF Syllabus
                                    </a>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {filteredBaking.map((category) => (
                                        <div key={category.name} className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-brand-cocoa/5 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 flex flex-col">
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
                                        <p className="text-brand-charcoal/60 text-sm">Explore our {filteredCooking.length} professional cooking modules.</p>
                                    </div>
                                    <a
                                        href="/products/CCWK_Cooking%20Course.pdf"
                                        download
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-brand-accent text-white rounded-full text-sm font-bold uppercase tracking-widest hover:bg-brand-cocoa transition-colors shadow-lg shadow-brand-accent/20"
                                    >
                                        <Download size={16} />
                                        Download PDF Syllabus
                                    </a>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {filteredCooking.map((course) => (
                                        <div key={course.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-brand-cocoa/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
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
                        <div className="mt-12 p-6 bg-brand-cream/50 rounded-2xl border border-dashed border-brand-cocoa/20 text-center">
                            <p className="text-xs text-brand-charcoal/60 uppercase tracking-widest leading-relaxed">
                                *All classes are <strong className="text-green-700">pure veg and eggless</strong> • Prior registration mandatory • Maximum batch size: 6 students • individual classes available on request
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            
            <div className="w-full -mt-1 relative z-10 bg-white">
                 <SectionDivider className="text-brand-cream/30" />
            </div>

            {/* ── Why Learn With Us: "The Difference" ────────────────────── */}
            <section className="py-32 bg-white relative overflow-hidden usps-section">
                <GlowOrb className="top-0 left-1/4 w-[400px] h-[400px] bg-brand-accent/5" />
                
                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
                        {/* USP 1 */}
                        <div className="flex flex-col items-center text-center group reveal-up">
                            <div className="usp-icon w-32 h-32 mb-8 relative flex items-center justify-center">
                                <div className="absolute inset-0 bg-brand-cream rounded-full scale-100 lg:scale-0 lg:group-hover:scale-100 transition-transform duration-500 opacity-50" />
                                <SketchRollingPin className="w-full h-full text-brand-cocoa group-hover:rotate-12 transition-transform duration-500" strokeWidth={1} />
                            </div>
                            <h3 className="font-serif text-2xl text-brand-cocoa mb-4">100% Hands-on</h3>
                            <p className="text-brand-charcoal/70 leading-relaxed max-w-xs">
                                Roll up your sleeves! You don&apos;t just watch here; you bake every single element yourself.
                            </p>
                        </div>

                        {/* USP 2 */}
                        <div className="flex flex-col items-center text-center group reveal-up">
                            <div className="usp-icon w-32 h-32 mb-8 relative flex items-center justify-center">
                                <div className="absolute inset-0 bg-brand-cream rounded-full scale-100 lg:scale-0 lg:group-hover:scale-100 transition-transform duration-500 opacity-50" />
                                <SketchLeaf className="w-full h-full text-green-700/80 group-hover:scale-110 transition-transform duration-500" strokeWidth={1} />
                            </div>
                            <h3 className="font-serif text-2xl text-brand-cocoa mb-4">Certified Eggless</h3>
                            <p className="text-brand-charcoal/70 leading-relaxed max-w-xs">
                                Master the science of vegetarian baking without compromising on texture or structural integrity.
                            </p>
                        </div>

                        {/* USP 3 */}
                        <div className="flex flex-col items-center text-center group reveal-up">
                            <div className="usp-icon w-32 h-32 mb-8 relative flex items-center justify-center">
                                <div className="absolute inset-0 bg-brand-cream rounded-full scale-100 lg:scale-0 lg:group-hover:scale-100 transition-transform duration-500 opacity-50" />
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
            <section className="relative py-40 bg-brand-cocoa overflow-hidden flex items-center justify-center">
                {/* Background Image with Parallax feeling */}
                <div className="absolute inset-0 opacity-20 parallax-bg" data-speed="0.2">
                    <Image
                        src="/products/dutch_truffle_cake.png"
                        alt="Dark Chocolate Truffle Background"
                        fill
                        className="object-cover scale-110"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-brand-cocoa via-brand-cocoa/80 to-transparent" />
                
                <OrganicSwirl className="absolute top-0 right-0 w-96 h-96 text-white/5 -rotate-12" />
                <OrganicSwirl className="absolute bottom-0 left-0 w-96 h-96 text-white/5 rotate-180" />

                <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
                    <SketchDoodle className="reveal-up w-48 h-12 text-brand-accent/30 mx-auto mb-8 " />
                    <h2 className="reveal-up font-serif text-5xl lg:text-7xl text-brand-cream mb-8 leading-tight">
                        Your Culinary Journey <br />
                        <span className="text-brand-accent">Starts Here</span>
                    </h2>
                    <p className="reveal-up text-xl text-brand-cream/70 mb-12 font-light max-w-2xl mx-auto">
                        Secure your spot in our next batch. Reach out via WhatsApp for the detailed curriculum and schedule for our Baking and Cooking classes.
                    </p>
                    <div className="reveal-up flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
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

            {/* ── FAQ Section ─────────────────────────────────────────── */}
            <section className="py-24 bg-brand-cream relative overflow-hidden faq-section">
                <GlowOrb className="top-0 left-0 w-[400px] h-[400px] bg-brand-accent/5" />
                
                <div className="container mx-auto px-6 max-w-4xl relative z-10">
                    <div className="text-center mb-16 reveal-up">
                        <HelpCircle className="w-12 h-12 text-brand-accent/20 mx-auto mb-4" />
                        <h2 className="font-serif text-4xl text-brand-cocoa mb-4">Common Questions</h2>
                        <p className="text-brand-charcoal/60">Everything you need to know about our workshops.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {FAQS.map((faq, i) => (
                            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-brand-cocoa/5 hover:border-brand-accent/20 transition-all hover:shadow-xl group">
                                <h4 className="font-serif text-xl text-brand-cocoa mb-3 flex items-start gap-3 group-hover:text-brand-accent transition-colors">
                                    <span className="text-brand-accent shrink-0">Q.</span>
                                    {faq.q}
                                </h4>
                                <p className="text-brand-charcoal/70 text-sm leading-relaxed pl-7">
                                    {faq.a}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="absolute bottom-0 left-0 w-full z-0 translate-y-1/2">
                    <SectionDivider className="text-white" />
                </div>
            </section>

            {/* ── Learning Experience: What to Expect ─────────────────── */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="container mx-auto px-6 max-w-6xl relative z-10">
                    <div className="reveal-up bg-brand-cocoa rounded-[3rem] p-10 lg:p-20 relative overflow-hidden shadow-2xl">
                        {/* Decorative Background */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-accent/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="font-serif text-4xl lg:text-5xl text-brand-cream mb-8 leading-tight">
                                    A Learning Experience <br />
                                    <span className="text-brand-accent italic">Like No Other</span>
                                </h2>
                                <div className="space-y-6">
                                    {[
                                        { title: "Personal Attention", desc: "Small batches ensure you get one-on-one guidance." },
                                        { title: "Commercial Recipes", desc: "Learn recipes that are tested for bakery-style results." },
                                        { title: "Take Home Your Creation", desc: "Everything you bake/cook in class is yours to take home." },
                                        { title: "Lifetime Support", desc: "Access to our community and direct help for any future queries." }
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-4 group">
                                            <div className="w-6 h-6 rounded-full bg-brand-accent/20 flex items-center justify-center shrink-0 mt-1 group-hover:bg-brand-accent transition-colors">
                                                <CheckCircle2 size={14} className="text-brand-accent group-hover:text-white" />
                                            </div>
                                            <div>
                                                <h4 className="text-brand-cream font-bold text-sm uppercase tracking-widest mb-1 group-hover:text-brand-accent transition-colors">{item.title}</h4>
                                                <p className="text-brand-cream/60 text-sm">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="relative aspect-square rounded-3xl overflow-hidden border-8 border-white/5 shadow-2xl hover:scale-[1.02] transition-transform duration-700">
                                <Image
                                    src="/products/DSC_7577.JPG"
                                    alt="Learning in progress"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
