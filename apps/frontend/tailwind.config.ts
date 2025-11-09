import type { Config } from 'tailwindcss';

const config: Config = {
  // Specify the files Tailwind should scan for class names
  content: [
    './app/**/*.{ts,tsx,js,jsx}',  // Next.js 15 app directory
    './components/**/*.{ts,tsx,js,jsx}',
    './pages/**/*.{ts,tsx,js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E40AF', // Custom primary color
        secondary: '#F59E0B', // Custom secondary color
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        mono: ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),   // For better form styling
    require('@tailwindcss/typography'), // For prose / content styling
  ],
  darkMode: 'class', // Enable class-based dark mode
};

export default config;
