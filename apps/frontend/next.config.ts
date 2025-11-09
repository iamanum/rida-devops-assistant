import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  
  // CRITICAL FIX: Add this flag to ensure CSS is bundled correctly in App Router
  // Isse Tailwind ki compilation Vercel par theek hogi.
  experimental: {
    esmExternals: true,
  },
  
  // Aur koi 'experimental' ya 'images' configuration nahi dalenge stability ke liye
};

export default nextConfig;