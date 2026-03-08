"use client";

import Image from "next/image";
import { useRef, useState, useEffect, useCallback, memo } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import RevealLine from "./RevealLine";

const PRODUCTS = [
    { id: 1, name: "CHROME RUNNER", price: "$289", tag: "ARCHIVE", image: "/shoe-1.png" },
    { id: 2, name: "AESTHETIC BOOT", price: "$349", tag: "NEW DROP", image: "/shoe-2.png" },
    { id: 3, name: "SYNE PLATFORM", price: "$210", tag: "HOT", image: "/shoe-3.png" },
];

const LOOPED_PRODUCTS = [...PRODUCTS, ...PRODUCTS, ...PRODUCTS, ...PRODUCTS, ...PRODUCTS];

export default function ProductSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollX } = useScroll({ container: containerRef });
    const [containerWidth, setContainerWidth] = useState(0);
    const [setWidth, setSetWidth] = useState(0);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const totalItems = LOOPED_PRODUCTS.length;
        const init = () => {
            const sw = container.scrollWidth * (3 / totalItems);
            setSetWidth(sw);
            setContainerWidth(container.offsetWidth);
            container.scrollLeft = sw * 2;
        };
        init();

        // ── 1. Infinite loop teleport (rAF polling) ──
        let rafId: number;
        let prevScrollLeft = container.scrollLeft;

        const tick = () => {
            const sw = container.scrollWidth * (3 / totalItems);
            const { scrollLeft } = container;
            if (scrollLeft !== prevScrollLeft) {
                prevScrollLeft = scrollLeft;
                if (scrollLeft < sw) {
                    container.scrollLeft = scrollLeft + sw * 2;
                    // Also update drag start so drag math doesn't break after teleport
                    touchStartScrollLeft.current = container.scrollLeft;
                } else if (scrollLeft > sw * 3) {
                    container.scrollLeft = scrollLeft - sw * 2;
                    touchStartScrollLeft.current = container.scrollLeft;
                }
            }
            rafId = requestAnimationFrame(tick);
        };
        rafId = requestAnimationFrame(tick);

        let resizeRaf: number;
        const onResize = () => {
            cancelAnimationFrame(resizeRaf);
            resizeRaf = requestAnimationFrame(init);
        };
        window.addEventListener("resize", onResize, { passive: true });

        return () => {
            cancelAnimationFrame(rafId);
            cancelAnimationFrame(resizeRaf);
            window.removeEventListener("resize", onResize);
        };
    }, []);

    // ── 2. One-Card-at-a-Time Swift Swipe Logic ──
    const touchStartX = useRef(0);
    const touchStartScrollLeft = useRef(0);
    const touchStartTime = useRef(0);
    const isDragging = useRef(false);

    const handleTouchStart = (e: React.TouchEvent) => {
        if (!containerRef.current) return;
        isDragging.current = true;
        touchStartX.current = e.touches[0].clientX;
        touchStartScrollLeft.current = containerRef.current.scrollLeft;
        touchStartTime.current = Date.now();
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (!isDragging.current || !containerRef.current) return;
        isDragging.current = false;

        const touchEndX = e.changedTouches[0].clientX;
        const distance = touchStartX.current - touchEndX; // positive = swiped left (next)
        const time = Date.now() - touchStartTime.current;
        const velocity = Math.abs(distance / time); // px per ms

        const container = containerRef.current;
        const slotWidth = container.scrollWidth / LOOPED_PRODUCTS.length;

        const currentIdx = Math.round(touchStartScrollLeft.current / slotWidth);
        let targetIdx = currentIdx;

        // If swiped fast enough OR dragged more than 20% of a card
        if (velocity > 0.4 || Math.abs(distance) > slotWidth * 0.2) {
            targetIdx = distance > 0 ? currentIdx + 1 : currentIdx - 1;
        }

        container.scrollTo({ left: targetIdx * slotWidth, behavior: "smooth" });
    };

    const scrollByStep = useCallback((direction: "left" | "right") => {
        const container = containerRef.current;
        if (!container) return;
        const slotWidth = container.scrollWidth / LOOPED_PRODUCTS.length;
        const currentIdx = Math.round(container.scrollLeft / slotWidth);
        const targetIdx = direction === "left" ? currentIdx - 1 : currentIdx + 1;
        container.scrollTo({ left: targetIdx * slotWidth, behavior: "smooth" });
    }, []);

    return (
        <section id="drops" className="relative bg-[#fafafa] px-0 py-12 sm:py-20 md:py-24 overflow-hidden min-h-[750px] flex flex-col justify-center">
            <div className="absolute top-10 right-10 w-[40vw] h-[40vw] bg-[#FF9900] rounded-full mix-blend-multiply filter blur-[100px] opacity-15 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-[#A855F7] rounded-full mix-blend-multiply filter blur-[120px] opacity-10 pointer-events-none" />
            <div className="grain-overlay absolute inset-0 pointer-events-none mix-blend-overlay z-0 opacity-[0.2]" />

            <div className="relative z-10 px-5 sm:px-10 md:px-14 mb-4 sm:mb-8 text-center sm:text-left">
                <RevealLine className="mb-2">
                    <p className="font-[family-name:var(--font-inter)] text-[#0A0A0A99] uppercase tracking-[0.3em] text-[10px] sm:text-xs font-bold">— The Vault</p>
                </RevealLine>
                <RevealLine delay={0.05}>
                    <h2 className="font-[family-name:var(--font-syne)] font-bold text-[#0A0A0A] leading-[0.9] tracking-tighter" style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}>
                        Vault<br />Drops
                    </h2>
                </RevealLine>
            </div>

            <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 right-0 hidden sm:flex items-center justify-between pointer-events-none px-4 sm:px-12 z-40">
                    <button onClick={() => scrollByStep("left")} className="pointer-events-auto w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-black/10 bg-white/40 hover:bg-black group transition-all duration-300 backdrop-blur-xl shadow-xl flex items-center justify-center -translate-x-2 sm:-translate-x-4" aria-label="Previous">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:text-white transition-colors text-black"><path d="M15 18l-6-6 6-6" /></svg>
                    </button>
                    <button onClick={() => scrollByStep("right")} className="pointer-events-auto w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-black/10 bg-white/40 hover:bg-black group transition-all duration-300 backdrop-blur-xl shadow-xl flex items-center justify-center translate-x-2 sm:translate-x-4" aria-label="Next">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:text-white transition-colors text-black"><path d="M9 18l6-6-6-6" /></svg>
                    </button>
                </div>

                {/* JS touch tracking restricts swipe distance to 1 card */}
                <div
                    ref={containerRef}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                    className="relative flex items-center overflow-x-scroll hide-scrollbar py-20"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {LOOPED_PRODUCTS.map((p, i) => (
                        <ProductCard
                            key={`${p.id}-${i}`}
                            product={p}
                            scrollX={scrollX}
                            containerWidth={containerWidth}
                            setWidth={setWidth}
                        />
                    ))}
                </div>
            </div>

            <div className="mt-4 flex justify-center opacity-20">
                <span className="font-[family-name:var(--font-inter)] text-[8px] uppercase tracking-[0.5em] font-black">Hold &amp; Slide • Endless Loop</span>
            </div>
        </section>
    );
}

const ProductCard = memo(function ProductCard({
    product, scrollX, containerWidth, setWidth,
}: {
    product: { name: string; price: string; tag: string; image: string };
    scrollX: ReturnType<typeof useScroll>["scrollX"];
    containerWidth: number;
    setWidth: number;
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [layout, setLayout] = useState({ offsetLeft: 0, cardWidth: 0 });

    useEffect(() => {
        if (cardRef.current) {
            setLayout({ offsetLeft: cardRef.current.offsetLeft, cardWidth: cardRef.current.offsetWidth });
        }
    }, [containerWidth]);

    const distance = useTransform(scrollX, (val: number) => {
        if (!containerWidth || !setWidth || !layout.cardWidth) return 999;
        const viewportCenter = val + containerWidth / 2;
        const cardPhase = (layout.offsetLeft + layout.cardWidth / 2) % setWidth;
        const nearest = [cardPhase, cardPhase + setWidth, cardPhase - setWidth].map(pos => {
            const absCenter = Math.floor(viewportCenter / setWidth) * setWidth + pos;
            return Math.abs(absCenter - viewportCenter);
        });
        return Math.min(...nearest);
    });

    const springConfig = { stiffness: 80, damping: 20 };
    const scale = useTransform(distance, [0, 150, 400], [1.2, 1, 0.9]);
    const opacity = useTransform(distance, [0, 300, 600], [1, 0.9, 0.7]);
    const blur = useTransform(distance, [150, 400, 800], ["blur(0px)", "blur(1px)", "blur(4px)"]);
    const rotate = useTransform(distance, [0, 500], [0, 5]);
    const zIndex = useTransform(distance, [0, 100], [50, 0]);
    const smoothScale = useSpring(scale, springConfig);
    const smoothOpacity = useSpring(opacity, springConfig);
    const smoothRotate = useSpring(rotate, springConfig);

    return (
        <motion.div
            ref={cardRef}
            style={{ scale: smoothScale, opacity: smoothOpacity, filter: blur, rotate: smoothRotate, zIndex, willChange: "transform, opacity, filter" }}
            className="relative shrink-0 w-[260px] sm:w-[320px] md:w-[420px] aspect-[4/5] sm:aspect-[3.5/4] mx-4 sm:mx-10 flex flex-col group"
        >
            <div className="relative w-full h-full bg-white rounded-[3rem] border border-black/5 shadow-[0_30px_70px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col items-center justify-center p-6 sm:p-10">
                <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-2/3 h-8 bg-black/5 blur-[40px] rounded-full" />
                <div className="absolute top-8 left-8 bg-[#0A0A0A] text-white text-[8px] sm:text-[9px] font-bold tracking-[0.2em] px-4 py-2 rounded-full z-10 uppercase shadow-lg">{product.tag}</div>
                <div className="relative w-full h-[60%] lg:h-[75%] mb-2">
                    <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="w-full h-full">
                        <Image src={product.image} alt={product.name} fill loading="lazy" className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.1)] group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 640px) 260px, 420px" />
                    </motion.div>
                </div>
                <div className="mt-auto text-center z-10">
                    <h3 className="font-[family-name:var(--font-syne)] font-bold text-[#0A0A0A] text-xl sm:text-2xl md:text-3xl tracking-tighter uppercase leading-none">{product.name}</h3>
                    <div className="flex items-center justify-center gap-2 mt-4">
                        <span className="font-[family-name:var(--font-syne)] font-bold text-[#FF6600] text-lg sm:text-xl">{product.price}</span>
                        <div className="w-1 h-3 rounded-full bg-black opacity-10" />
                        <span className="font-[family-name:var(--font-inter)] text-[#0A0A0A55] text-[0.55rem] font-bold tracking-[0.2em] uppercase mt-0.5">Elite</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
});
