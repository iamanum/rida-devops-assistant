// apps/frontend/app/layout.tsx
import { Inter } from "next/font/google";
import "./globals.css";

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
    // Body ko deep black (Space Black) aur soft white text de rahe hain
    <html lang="en" className="dark"> 
      <body className={`${inter.className} bg-black text-gray-100 antialiased`}>
        {children}
      </body>
    </html>
  );
}