// apps/frontend/tailwind.config.ts

import type { Config } from 'tailwindcss';

const config: Config = {
  // Yeh paths Next.js App Router ke liye standard hain
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', 
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  
  // Dark Mode ko class based rakhenge
  darkMode: 'class', 
  
  theme: {
    // Extend block ko khaali rakhte hain taaki koi Type Error na aaye
    extend: {}, 
  },
  plugins: [],
};

export default config;