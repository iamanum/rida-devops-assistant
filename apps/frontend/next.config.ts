import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // reactStrictMode ko true rakhenge, jo modern standard hai
  reactStrictMode: true,

  // Yeh property Vercel ko batati hai ki Next.js project kahan se shuru hota hai
  // Isse Tailwind compilation theek hoti hai
  compiler: {
    // Agar aapko console mein se 'data-testid' attributes hatane hain to yeh use karen
    // removeConsole: process.env.NODE_ENV === 'production', 
  },
  
  // Aur koi 'experimental' ya 'images' configuration nahi daalenge stability ke liye
};

export default nextConfig;