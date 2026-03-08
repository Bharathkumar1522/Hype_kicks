"use client";

import { memo, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface RevealLineProps {
    children: React.ReactNode;
    delay?: number;
    className?: string;
}

const RevealLine = memo(function RevealLine({
    children,
    delay = 0,
    className = "",
}: RevealLineProps) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });
    return (
        <div className={`clip-reveal ${className}`} ref={ref}>
            <motion.div
                initial={{ y: "105%", opacity: 0 }}
                animate={inView ? { y: "0%", opacity: 1 } : {}}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
            >
                {children}
            </motion.div>
        </div>
    );
});

export default RevealLine;
