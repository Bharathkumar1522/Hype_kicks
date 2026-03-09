"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, useAnimation } from "framer-motion";

// Critical above-fold component — loaded immediately
import Marquee from "./components/Marquee";

// Below-fold components — lazy-loaded so they don't block initial render
const ProductSection = dynamic(() => import("./components/ProductSection"), { ssr: false });
const BrandStory = dynamic(() => import("./components/BrandStory"), { ssr: false });
const AestheticBox = dynamic(() => import("./components/AestheticBox"), { ssr: false });
const AestheticVideo = dynamic(() => import("./components/AestheticVideo"), { ssr: false });
const Footer = dynamic(() => import("./components/Footer"), { ssr: false });
const BackToTop = dynamic(() => import("./components/BackToTop"), { ssr: false });

export default function Home() {
  /* Parallax refs */
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const shoeY = useTransform(heroScroll, [0, 1], [0, -120]);
  const shoeScale = useTransform(heroScroll, [0, 1], [1, 0.85]);
  const textY = useTransform(heroScroll, [0, 1], [0, 60]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // ── SCROLL SPY — throttled with rAF to avoid layout thrashing ──
  useEffect(() => {
    const sections = ["drops", "culture", "design", "updates"] as const;
    let rafId: number;

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const scrollPosition = window.scrollY + 150;

        if (window.scrollY < 200) {
          setActiveSection("");
          return;
        }

        for (const sectionId of sections) {
          const element = document.getElementById(sectionId);
          if (element) {
            const { offsetTop, offsetHeight } = element;
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              setActiveSection(sectionId);
              break;
            }
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const handleMenuToggle = useCallback(() => setIsMenuOpen((o) => !o), []);
  const handleMenuClose = useCallback(() => setIsMenuOpen(false), []);

  // ── ANIMATION ORCHESTRATION ──
  // Defer heavy animations until after React Hydration and the first DOM Paint
  // to ensure the main thread is idle and 0 frames are dropped.
  const entranceControls = useAnimation();
  const hoverControls = useAnimation();

  useEffect(() => {
    // Wait for the browser to finish painting the initial DOM tree
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // 1. Fire entrance animations
        entranceControls.start({
          x: 0,
          y: 0,
          opacity: 1,
          transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.1 }
        }).then(() => {
          // 2. ONLY start the infinite continuous bounce AFTER the entrance sequence completes
          // This prevents overlapping scheduler strain during the heaviest animation phase.
          hoverControls.start({
            y: ["-50%", "-52%", "-50%"],
            filter: [
              "drop-shadow(0 30px 40px rgba(0,0,0,0.6))",
              "drop-shadow(0 45px 55px rgba(0,0,0,0.4))",
              "drop-shadow(0 30px 40px rgba(0,0,0,0.6))"
            ],
            transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          });
        });
      });
    });
  }, [entranceControls, hoverControls]);

  return (
    <div className="relative z-10 min-h-screen flex flex-col items-center justify-start p-1.5 sm:p-2 md:p-3 bg-gradient-to-br from-[#404144] to-[#212224] scroll-smooth">
      <div
        className="relative w-full overflow-hidden rounded-[24px] border border-[#ffffff10] border-b-[#ffffff40]"
        style={{
          background: "linear-gradient(to bottom, rgba(10,10,10,0.8) 0%, rgba(10,10,10,0) 25%, rgba(10,10,10,0) 60%, #0A0A0A 100%), radial-gradient(ellipse at 70% 30%, #E9FF26 0%, transparent 50%), radial-gradient(ellipse at 30% 60%, #A855F7 0%, transparent 60%), radial-gradient(circle at 10% 10%, #FF0066 0%, transparent 40%), radial-gradient(circle at 90% 80%, #FF6600 0%, transparent 40%), #1a1a1a",
          boxShadow: "0 30px 60px rgba(0,0,0,0.5), 0 10px 20px rgba(0,0,0,0.3), 0 15px 35px rgba(255,255,255,0.06)",
        }}
      >
        {/* Grain Overlay — static SVG file (no inline data-URI parsing) */}
        <div className="grain-overlay absolute inset-0 pointer-events-none mix-blend-overlay z-0 opacity-[0.3]" />

        {/* Hero Section */}
        <section ref={heroRef} className="relative min-h-[96svh] flex flex-col overflow-hidden rounded-[24px]">
          <nav className="relative z-40 flex items-center justify-between px-4 pt-6 sm:px-10 sm:pt-8 md:px-12 md:pt-10 w-full bg-transparent">
            {/* Logo */}
            <motion.div
              initial={{ x: -80, opacity: 0 }}
              animate={entranceControls}
              className="leading-none cursor-pointer group flex items-baseline"
            >
              <span className="text-white font-[family-name:var(--font-syne)] font-bold tracking-tighter drop-shadow-sm group-hover:text-[#FF6600] transition-colors duration-300" style={{ fontSize: "clamp(1.4rem, 2.6vw, 2.3rem)", lineHeight: 1 }}>HYPE</span>
              <span className="text-white/70 font-[family-name:var(--font-inter)] font-light tracking-wide uppercase drop-shadow-sm group-hover:text-white transition-colors duration-300 ml-1" style={{ fontSize: "clamp(1rem, 2vw, 1.8rem)", lineHeight: 1 }}>KICKS</span>
            </motion.div>

            {/* Desktop Nav */}
            <div className="hidden sm:flex flex-row items-center gap-6 md:gap-8">
              {["Drops", "Culture", "Design", "Updates"].map((item, i) => {
                const isActive = activeSection === item.toLowerCase();
                return (
                  <motion.a
                    key={item}
                    initial={{ x: 50, opacity: 0 }}
                    animate={entranceControls}
                    href={`#${item.toLowerCase()}`}
                    className={`text-white font-[family-name:var(--font-inter)] text-xs md:text-sm tracking-widest uppercase transition-all duration-300 pb-1 ${isActive ? "font-bold border-b-2 border-[#FF6600]" : "font-semibold text-white/80 border-b-2 border-transparent hover:border-white/50"}`}
                  >
                    {item}
                  </motion.a>
                );
              })}
            </div>

            {/* Mobile Menu Toggle */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={entranceControls}
              className="sm:hidden flex items-center"
            >
              <button onClick={handleMenuToggle} className="text-white font-[family-name:var(--font-oswald)] text-sm tracking-[0.3em] uppercase font-bold px-4 py-2 border border-white/20 rounded-full hover:bg-white/10 transition-all flex items-center gap-2">
                <div className="flex flex-col gap-0.5">
                  <motion.div animate={isMenuOpen ? { rotate: 45, y: 2 } : { rotate: 0, y: 0 }} className="w-3 h-[1.5px] bg-white rounded-full" />
                  <motion.div animate={isMenuOpen ? { rotate: -45, y: -2 } : { rotate: 0, y: 0 }} className="w-3 h-[1.5px] bg-white rounded-full" />
                </div>
                {isMenuOpen ? "CLOSE" : "MENU"}
              </button>
            </motion.div>
          </nav>

          {/* Mobile Menu Overlay */}
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={isMenuOpen ? { opacity: 1, scale: 1, pointerEvents: "auto" } : { opacity: 0, scale: 1.1, pointerEvents: "none" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] bg-[#0A0A0A] flex flex-col items-center justify-center p-8 xs:p-12 lg:hidden"
          >
            <div className="absolute top-0 left-0 w-full p-8 flex items-center justify-between">
              <div className="flex items-baseline">
                <span className="text-white font-[family-name:var(--font-syne)] font-bold text-2xl tracking-tighter">HYPE</span>
                <span className="text-white/50 font-[family-name:var(--font-inter)] font-light text-lg ml-1">KICKS</span>
              </div>
              <button onClick={handleMenuClose} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors" aria-label="Close menu">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            <div className="absolute top-1/4 left-1/4 w-[60vw] h-[60vw] bg-[#FF6600]/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="flex flex-col gap-6 sm:gap-8 text-center relative z-10">
              {["Drops", "Culture", "Design", "Updates"].map((item, i) => {
                const isActive = activeSection === item.toLowerCase();
                return (
                  <motion.a
                    key={item}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    href={`#${item.toLowerCase()}`}
                    onClick={handleMenuClose}
                    className={`font-[family-name:var(--font-syne)] text-4xl xs:text-5xl font-bold tracking-tight transition-colors ${isActive ? "text-[#FF6600]" : "text-white hover:text-[#FF6600]"}`}
                  >
                    {item}
                  </motion.a>
                );
              })}
            </div>
            <motion.p initial={{ opacity: 0 }} animate={isMenuOpen ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: 0.8 }} className="mt-16 text-white/20 font-[family-name:var(--font-inter)] text-[10px] tracking-[0.4em] uppercase text-center">The Future of Streetwear</motion.p>
          </motion.div>

          {/* Floating Sneaker — willChange only on the continuously animated element */}
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={entranceControls}
            className="absolute inset-0 pointer-events-none z-10"
          >
            <motion.div style={{ y: shoeY, scale: shoeScale }} className="absolute inset-0 w-full h-full flex items-center justify-center">
              <motion.div
                initial={{ y: "-50%", filter: "drop-shadow(0 30px 40px rgba(0,0,0,0.6))" }}
                animate={hoverControls}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[110vw] sm:w-[85vw] md:w-[70vw] lg:w-[60vw] max-w-[900px] select-none"
                style={{ willChange: "transform, filter" }}
              >
                <Image
                  src="/shoe-hero-optimized.png"
                  alt="HYPE KICKS — Featured Chunky Streetwear Sneaker"
                  width={1000}
                  height={1000}
                  priority
                  fetchPriority="high"
                  className="w-full h-auto object-contain"
                />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Hero Text */}
          <motion.div
            style={{ y: textY, willChange: "transform" }}
            className="relative z-20 mt-auto px-4 pb-12 sm:px-8 sm:pb-16 md:px-12 md:pb-16"
          >
            <motion.div
              initial={{ x: -120, opacity: 0 }}
              animate={entranceControls}
              className="relative"
            >
              <h1 className="font-[family-name:var(--font-anton)] leading-[0.8] tracking-tight uppercase text-white select-none relative z-20 drop-shadow-md" style={{ fontSize: "clamp(2.8rem, 15vw, 10rem)" }}>
                <span className="block">STREET</span>
                <span className="block">VIBES</span>
              </h1>
            </motion.div>

            {/* Bottom-right card */}
            <motion.div
              initial={{ x: 120, opacity: 0 }}
              animate={entranceControls}
              className="absolute right-4 bottom-10 sm:right-8 sm:bottom-16 md:right-16 md:bottom-16 flex flex-col items-end z-30"
            >
              <p className="font-[family-name:var(--font-inter)] font-semibold uppercase text-white text-right leading-[1.3] tracking-widest text-[0.4rem] sm:text-[0.55rem] md:text-[0.6rem] max-w-[100px] sm:max-w-[140px] md:max-w-[180px] mb-2 mr-[50px] sm:mr-[80px] md:mr-[105px]">WE HAVE YEARS<br />OF EXPERIENCE IN THE<br />FASHION INDUSTRY.</p>
              <div className="flex items-end justify-end gap-3 sm:gap-6 md:gap-8">
                <span className="text-white font-[family-name:var(--font-inter)] text-[10px] md:text-sm font-bold mb-0.5 tracking-wider">06/25</span>
                <div className="relative w-[45px] h-[60px] sm:w-[70px] sm:h-[90px] md:w-[90px] md:h-[110px] overflow-hidden shrink-0 border border-white/10 bg-[#0A0A0A]">
                  <Image src="/lifestyle-thumb.jpg" alt="Lifestyle Shot" fill className="object-cover grayscale" sizes="(max-width: 640px) 50px, 120px" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>
      </div>

      {/* Modular Content Sections */}
      <div className="relative w-full mt-6 md:mt-8 flex flex-col gap-6 md:gap-8">
        <div id="drops" className="overflow-hidden rounded-[24px] shadow-2xl border border-[#ffffff10]">
          <ProductSection />
        </div>

        <div id="culture" className="overflow-hidden rounded-[24px] shadow-2xl border border-[#ffffff10]">
          <BrandStory />
        </div>

        <div id="design" className="overflow-hidden rounded-[24px] shadow-2xl border border-[#ffffff10]">
          <AestheticBox />
        </div>

        <div className="overflow-hidden rounded-[24px] shadow-2xl border border-[#ffffff10]">
          <AestheticVideo />
        </div>
      </div>

      <div id="updates" className="relative w-full mt-12 md:mt-24 mb-6 md:mb-8 overflow-hidden rounded-[24px] shadow-2xl border border-[#ffffff10]">
        <Footer />
      </div>

      <BackToTop />
    </div>
  );
}
