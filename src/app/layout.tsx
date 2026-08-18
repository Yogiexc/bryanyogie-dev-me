import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

import LenisProvider from "@/components/LenisProvider";
import CustomCursor from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: "Bryan Yogie Saputra | Portfolio",
  description: "Interactive portfolio of Bryan Yogie Saputra, Informatics Engineering Student & Aspiring Web Developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} antialiased dark`}>
      <body className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-white flex flex-col overflow-x-hidden">
        <div className="noise-bg"></div>
        <CustomCursor />
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
