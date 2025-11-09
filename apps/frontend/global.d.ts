// apps/frontend/global.d.ts

// Yeh declaration TypeScript ko batati hai ki woh .css files ko module ke taur par treat kare
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}