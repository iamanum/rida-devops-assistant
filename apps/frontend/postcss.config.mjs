// apps/frontend/postcss.config.mjs (Final Correct Code)
export default {
  plugins: {
    // CRITICAL FIX: 'tailwindcss' ko '@tailwindcss/postcss' se replace karen
    '@tailwindcss/postcss': {}, 
    'autoprefixer': {},
  },
};