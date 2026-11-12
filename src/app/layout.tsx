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
  metadataBase: new URL("https://bryanyogie.is-a.dev"),
  title: "BYS | Bryan Yogie Saputra — Build Your Story",
  description: "Personal Portfolio & Creative Space of Bryan Yogie Saputra. Informatics Engineering Student, Network & Fullstack Developer.",
  alternates: {
    canonical: "https://bryanyogie.is-a.dev",
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png?v=3", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png?v=3", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico?v=3" },
    ],
    apple: [
      { url: "/apple-touch-icon.png?v=3", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Bryan Yogie",
  "alternateName": ["BYS", "Bryan Yogie Saputra"],
  "url": "https://bryanyogie.is-a.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} antialiased dark`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
