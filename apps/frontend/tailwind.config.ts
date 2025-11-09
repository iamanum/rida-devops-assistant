// apps/frontend/tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  // CRITICAL FIX: Ensure ALL content paths are explicitly included
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // App directory
    './components/**/*.{js,ts,jsx,tsx,mdx}', // Components directory
    './pages/**/*.{js,ts,jsx,tsx,mdx}', // Fallback for Pages directory (if used)
  ],
  
  // Base theme and colors (unchanged, but necessary for the wow factor)
  darkMode: 'class', 
  theme: {
    extend: {
      colors: {
        'rida-cyan': '#06B6D4',
        'rida-red': '#DC2626',
      },
    },
  },
  plugins: [],
};
export default config;
```
