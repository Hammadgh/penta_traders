import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize images
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    unoptimized: true, // Set to true for static assets
  },
  
  // Enable compression
  compress: true,
  
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  
  // Remove output: 'export' for Vercel deployment
  // Vercel handles the build process automatically
  
  // Ensure compatibility with deployment platforms
  trailingSlash: false,
};

export default nextConfig;
