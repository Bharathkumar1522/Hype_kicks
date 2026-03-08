"use client";

import Marquee from "./Marquee";

export default function Footer() {
    return (
        <footer className="bg-[#0A0A0A] w-full">
            {/* Top Banner Marquee */}
            <Marquee
                items={[
                    "HYPE KICKS", "//", "STREET CULTURE", "//",
                    "NEW DROPS WEEKLY", "//", "JOIN THE MOVEMENT", "//",
                ]}
                className="py-4 text-[#D55F06] font-[family-name:var(--font-oswald)] tracking-widest border-b border-[#ffffff10]"
                itemClassName="text-xl sm:text-2xl md:text-3xl"
            />

            <div className="px-6 py-12 md:px-8 md:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                {/* Col 1: Brand */}
                <div className="flex flex-col space-y-6">
                    <h3 className="font-[family-name:var(--font-oswald)] text-white text-3xl tracking-tight">
                        HYPE KICKS
                    </h3>
                    <p className="font-[family-name:var(--font-inter)] text-[#ffffff77] text-sm leading-relaxed max-w-xs">
                        Defining the future of street culture since 2025. We provide high-end urban gear, curated for the modern aesthetic.
                    </p>
                    <div className="flex items-center gap-4">
                        {/* Social Icons Placeholder */}
                        {[1, 2, 3, 4].map((i) => (
                            <a
                                key={i}
                                href="#"
                                className="w-10 h-10 rounded-full border border-[#ffffff20] flex items-center justify-center text-white hover:bg-[#FF6600] hover:border-transparent transition-all duration-300 group"
                            >
                                <div className="w-1.5 h-1.5 bg-white rounded-full group-hover:scale-150 transition-transform" />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Col 2: Shop */}
                <div className="flex flex-col space-y-6">
                    <h4 className="font-[family-name:var(--font-oswald)] text-white text-[10px] tracking-[0.3em] uppercase opacity-50">
                        Shop Selection
                    </h4>
                    <ul className="space-y-4">
                        {["New Drops", "Sneakers", "Limited Edition", "Archive Items"].map((item) => (
                            <li key={item}>
                                <a href="#" className="font-[family-name:var(--font-inter)] text-[#ffffff55] hover:text-[#FF6600] text-sm transition-colors duration-200">
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Col 3: Support */}
                <div className="flex flex-col space-y-6">
                    <h4 className="font-[family-name:var(--font-oswald)] text-white text-[10px] tracking-[0.3em] uppercase opacity-50">
                        Customer Care
                    </h4>
                    <ul className="space-y-4">
                        {["Shipping Policy", "Order Tracking", "Refunds", "Contact Support"].map((item) => (
                            <li key={item}>
                                <a href="#" className="font-[family-name:var(--font-inter)] text-[#ffffff55] hover:text-[#FF6600] text-sm transition-colors duration-200">
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Col 4: Newsletter */}
                <div className="flex flex-col space-y-6">
                    <h4 className="font-[family-name:var(--font-oswald)] text-white text-[10px] tracking-[0.3em] uppercase opacity-50">
                        Join the Movement
                    </h4>
                    <p className="font-[family-name:var(--font-inter)] text-[#ffffff77] text-sm leading-relaxed">
                        Get early access to exclusive drops and insider updates.
                    </p>
                    <div className="flex flex-col space-y-3">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="bg-[#1A1A1A] border border-[#ffffff10] px-4 py-3 text-white font-[family-name:var(--font-inter)] text-sm rounded-lg focus:outline-none focus:border-[#FF6600]/50 transition-colors w-full"
                        />
                        <button className="bg-[#FF6600] text-white font-[family-name:var(--font-oswald)] py-3 rounded-lg hover:bg-[#D55F06] transition-colors tracking-widest uppercase font-bold text-sm w-full">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer Bottom Bar */}
            <div className="px-6 py-8 md:px-8 md:py-6 border-t border-[#ffffff10] flex flex-col sm:flex-row items-center justify-between gap-6 bg-[#050505]">
                <p className="text-[#ffffff33] font-[family-name:var(--font-inter)] text-[10px] tracking-[0.2em] uppercase font-bold text-center sm:text-left">
                    © 2025 HYPE KICKS WORLDWIDE — ALL RIGHTS RESERVED.
                </p>
                <div className="flex gap-6">
                    {["Privacy", "Terms", "Cookies"].map((legal) => (
                        <a key={legal} href="#" className="text-[#ffffff33] hover:text-white transition-colors text-[10px] tracking-widest uppercase font-bold">
                            {legal}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}
