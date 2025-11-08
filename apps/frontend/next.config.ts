import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typescript: {
    // Build errors ko ignore karna avoid karein unless zaroori ho
    ignoreBuildErrors: false,
  },
  eslint: {
    // ESLint warnings ko deploy build mein skip kar deta hai
    ignoreDuringBuilds: true,
  },
  // Agar aap experimental features use kar rahe hain, yahaan add kar sakte hain
  // example:
  // experimental: {
  //   serverActions: true,
  // },
};

export default nextConfig;
