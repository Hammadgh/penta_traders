import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize images
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    unoptimized: false,
  },
  
  // Enable compression
  compress: true,
  
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  
  // Output configuration for static export compatibility
  output: 'standalone',
  
  // Ensure compatibility with deployment platforms
  trailingSlash: false,
};

export default nextConfig;
