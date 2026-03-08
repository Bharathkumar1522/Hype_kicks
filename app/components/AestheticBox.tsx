"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import RevealLine from "./RevealLine";

export default function AestheticBox() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    // suppress unused var warning — inView used for RevealLine children context
    void inView;

    return (
        <section ref={ref} className="relative w-full min-h-[45vh] md:min-h-[60vh] flex flex-col items-center justify-center overflow-hidden bg-[#E2E1DF] px-6 py-16 md:py-20">

            {/* ── AESTHETIC BLUR ORBS (reduced blur radius for perf) ── */}
            <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[#FF9900] rounded-full mix-blend-multiply filter blur-[100px] opacity-20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[60vw] h-[60vw] bg-[#A855F7] rounded-full mix-blend-multiply filter blur-[120px] opacity-15 pointer-events-none" />

            {/* ── GRAIN OVERLAY (static SVG via CSS class) ── */}
            <div className="grain-overlay absolute inset-0 pointer-events-none mix-blend-overlay z-0 opacity-[0.4]" />

            {/* ── CONTENT ── */}
            <div className="relative z-10 w-full max-w-[1400px] flex flex-col items-center text-center">
                <RevealLine delay={0.1}>
                    <p className="font-[family-name:var(--font-inter)] text-[#0A0A0A77] uppercase tracking-[0.4em] text-xs sm:text-sm font-bold mb-6">
                        — Future Archive
                    </p>
                </RevealLine>

                <RevealLine delay={0.2}>
                    <h2
                        className="font-[family-name:var(--font-syne)] font-bold text-[#0A0A0A] leading-[0.9] tracking-tighter"
                        style={{ fontSize: "clamp(3.5rem, 14vw, 11rem)" }}
                    >
                        Design
                        <br />
                        Language
                    </h2>
                </RevealLine>

                <RevealLine delay={0.3}>
                    <p className="font-[family-name:var(--font-inter)] text-[#0A0A0A99] max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed mt-10 md:mt-16 mx-auto font-medium">
                        Exploring the intersection of brutalist architecture and organic form. Every line, every shape, and every texture is meticulously crafted to evoke a sense of raw emotion and physical presence in a digital world.
                    </p>
                </RevealLine>

                <RevealLine delay={0.4}>
                    <button
                        className="
              mt-12 md:mt-16
              font-[family-name:var(--font-syne)] font-bold tracking-wide text-lg
              px-10 py-5 rounded-full
              bg-transparent border border-[#0A0A0A] text-[#0A0A0A]
              hover:bg-[#0A0A0A] hover:text-[#E2E1DF]
              transition-all duration-500 ease-in-out
              shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] hover:-translate-y-1
            "
                    >
                        Explore Philosophy
                    </button>
                </RevealLine>
            </div>
        </section>
    );
}
