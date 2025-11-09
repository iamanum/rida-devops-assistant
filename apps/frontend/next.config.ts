import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  
  // CRITICAL FIX: Setting esmExternals to false is often needed to force 
  // Next.js to process dependencies (like Tailwind PostCSS plugins) correctly.
  experimental: {
    esmExternals: false, // Changed to false for stability
  },
};

export default nextConfig;