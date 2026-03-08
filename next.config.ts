import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [375, 640, 750, 828, 1080, 1200, 1600, 1920],
    imageSizes: [50, 96, 128, 256, 384],
  },
};

export default nextConfig;
