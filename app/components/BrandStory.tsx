"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import RevealLine from "./RevealLine";

export default function BrandStory() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section
            ref={ref}
            className="relative bg-[#0A0A0A] px-6 py-12 sm:px-10 sm:py-20 md:px-14 md:py-28 overflow-hidden"
        >
            <div className="relative z-10 w-full flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-16">
                {/* ── LEFT: BOLD BRAND STORY ── */}
                <div className="flex-1 max-w-2xl">
                    <RevealLine className="mb-4" delay={0}>
                        <span className="text-[#FF6600] font-[family-name:var(--font-inter)] text-[10px] sm:text-xs font-bold tracking-[0.4em] uppercase">
                            Brand Manifesto
                        </span>
                    </RevealLine>

                    <RevealLine delay={0.1}>
                        <h2
                            className="font-[family-name:var(--font-anton)] text-white leading-[0.9] tracking-tight uppercase"
                            style={{ fontSize: "clamp(2.8rem, 8vw, 6.5rem)" }}
                        >
                            ENGINEERED FOR <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFCC00] to-[#FF6600]">THE STREETS.</span>
                        </h2>
                    </RevealLine>

                    <RevealLine delay={0.2}>
                        <p className="font-[family-name:var(--font-inter)] text-[#ffffff88] text-sm sm:text-base md:text-lg leading-relaxed mt-6 md:mt-10 font-medium">
                            We don&apos;t just follow trends, we build the foundation of urban culture. Every silhouette is crafted with aggressive proportions, hyper-reliable materials, and an unapologetic aesthetic designed to dominate the concrete.
                        </p>
                    </RevealLine>

                    <RevealLine delay={0.3}>
                        <a
                            href="#"
                            className="
                inline-flex items-center gap-3 group mt-4
                font-[family-name:var(--font-oswald)] text-white text-lg sm:text-xl uppercase tracking-widest
                border-b-2 border-[#FF6600] pb-1
                hover:text-[#FF6600] transition-colors duration-300
              "
                        >
                            Read The Manifesto
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5 group-hover:translate-x-2 transition-transform"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                            >
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </a>
                    </RevealLine>
                </div>

                {/* ── RIGHT: SIDE-BY-SIDE LIFESTYLE IMAGES ── */}
                <div className="flex-1 w-full relative grid grid-cols-2 gap-4 min-h-[350px] sm:min-h-[500px] md:min-h-[600px] mt-4 lg:mt-0 px-2 lg:px-0">
                    {/* Reduced blur radius for better compositing perf */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#FF6600] rounded-full filter blur-[80px] opacity-20 pointer-events-none" />

                    {/* Left Image (Staggered lower) */}
                    <motion.div
                        initial={{ y: 80, opacity: 0 }}
                        animate={inView ? { y: 30, opacity: 1 } : {}}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                        className="relative w-full h-[85%] mt-auto rounded-[16px] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 ease-out border border-[#ffffff15] shadow-2xl"
                    >
                        <Image
                            src="/lifestyle-thumb.jpg"
                            alt="Street Culture Look 1"
                            fill
                            loading="lazy"
                            className="object-cover scale-105 hover:scale-110 transition-transform duration-1000"
                            sizes="(max-width: 768px) 50vw, 33vw"
                        />
                    </motion.div>

                    {/* Right Image (Staggered higher) */}
                    <motion.div
                        initial={{ y: 80, opacity: 0 }}
                        animate={inView ? { y: -30, opacity: 1 } : {}}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                        className="relative w-full h-[85%] mb-auto rounded-[16px] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 ease-out border border-[#ffffff15] shadow-2xl"
                    >
                        <Image
                            src="/lifestyle-thumb.jpg"
                            alt="Street Culture Look 2"
                            fill
                            loading="lazy"
                            className="object-cover scale-150 object-top hover:scale-[1.6] transition-transform duration-1000"
                            sizes="(max-width: 768px) 50vw, 33vw"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
