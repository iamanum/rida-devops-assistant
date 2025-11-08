// apps/frontend/app/layout.tsx

import { Inter } from 'next/font/google'; // <--- CRITICAL FIX: Yeh line zaroori hai

// import './globals.css'; // Yeh line already maujood hogi

const inter = Inter({ subsets: ['latin'] });
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // CRITICAL CHANGE: bg-gray-950 ko bg-black ya bg-gray-900 karen
    <html lang="en" className="dark"> 
      {/* Black background aur soft white text */}
      <body className={`${inter.className} bg-black text-gray-100 antialiased`}>
        {children}
      </body>
    </html>
  );
}