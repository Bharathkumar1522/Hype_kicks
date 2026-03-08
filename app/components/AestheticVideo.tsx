"use client";

import { useRef, useEffect } from "react";
import { useInView } from "framer-motion";
import RevealLine from "./RevealLine";

export default function AestheticVideo() {
    const ref = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    // Play video only when it enters the viewport — avoids eager MP4 buffering
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    video.play().catch(() => {/* autoplay blocked — silent fail */ });
                } else {
                    video.pause();
                }
            },
            { threshold: 0.15 }
        );

        observer.observe(video);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={ref} className="relative w-full h-[50vh] sm:h-[75vh] min-h-[400px] sm:min-h-[600px] flex items-center justify-center overflow-hidden bg-[#0A0A0A]">
            {/* Background Video — preload="none" stops eager MP4 buffering */}
            <video
                ref={videoRef}
                muted
                loop
                playsInline
                preload="none"
                className="absolute inset-0 w-full h-full object-cover z-0 opacity-100"
            >
                <source src="/Teens_Skate_and_Play_Video.mp4" type="video/mp4" />
            </video>

            {/* Dark & Textured Overlay */}
            <div className="absolute inset-0 bg-black/60 z-10" />

            {/* Grain Overlay (static SVG) */}
            <div className="grain-overlay absolute inset-0 mix-blend-overlay z-10 opacity-[0.9]" />

            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-[#0a0a0ab3] z-10 pointer-events-none" />

            {/* Content */}
            <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 w-full h-full">
                <RevealLine delay={0.1}>
                    <h2
                        className="font-[family-name:var(--font-anton)] text-white/90 leading-none tracking-tight uppercase drop-shadow-2xl"
                        style={{ fontSize: "clamp(4rem, 10vw, 8rem)" }}
                    >
                        RAW MOTION
                    </h2>
                </RevealLine>
                <RevealLine delay={0.2}>
                    <p className="font-[family-name:var(--font-inter)] text-[#E9FF26] mt-4 max-w-md text-xs sm:text-sm font-bold tracking-[0.4em] uppercase drop-shadow-md">
                        Capture the energy of the concrete.
                    </p>
                </RevealLine>
            </div>
        </section>
    );
}
