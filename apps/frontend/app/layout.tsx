// apps/frontend/app/layout.tsx
import { Inter } from "next/font/google";
import "../app/globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "RIDA | DevOps Assistant",
  description: "Real-time Intelligent DevOps Assistant powered by GPT-4o Mini.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // FINAL FIX: HTML par dark mode aur body par deep black background
    <html lang="en" className="dark bg-black"> 
      <body className={`${inter.className} bg-black text-gray-100 antialiased`}>
        {children}
      </body>
    </html>
  );
}