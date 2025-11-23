import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "rflpqejsnhzgyjrjyikt.supabase.co",
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  // JavaScript bundle optimizasyonu
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
  // Compress output
  compress: true,
  // Note: swcMinify is default in Next.js 16, no need to specify
};

export default nextConfig;