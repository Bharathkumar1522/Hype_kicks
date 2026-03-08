import type { Metadata } from "next";
import { Anton, Inter, Syne, Oswald } from "next/font/google";
import "./globals.css";

// Critical path fonts — preloaded (used above the fold)
const anton = Anton({
  weight: "400",
  variable: "--font-anton",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

// Syne is used in the Hero ('HYPE'), must be preloaded to prevent FOUT layout shift
const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "HYPE KICKS — Street Culture Elevated",
  description:
    "The latest drops. Engineered for the streets. Gen Z streetwear, chunky sneakers, and editorial fashion culture.",
  openGraph: {
    title: "HYPE KICKS — Street Culture Elevated",
    description: "The latest drops. Engineered for the streets.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${oswald.variable} ${anton.variable} ${inter.variable} ${syne.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
