"use client";

import { memo } from "react";

interface MarqueeProps {
    items: string[];
    speed?: number;
    className?: string;
    itemClassName?: string;
}

const Marquee = memo(function Marquee({
    items,
    className = "",
    itemClassName = "",
}: MarqueeProps) {
    // 2× duplication is enough — CSS animation handles the seamless loop
    const repeated = [...items, ...items];

    return (
        <div
            className={`overflow-hidden whitespace-nowrap ${className}`}
            aria-hidden="true"
        >
            <div className="marquee-track">
                {repeated.map((item, i) => (
                    <span
                        key={i}
                        className={`inline-block px-6 ${itemClassName}`}
                    >
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
});

export default Marquee;
