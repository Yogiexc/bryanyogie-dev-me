"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StickyScrollStory from "@/components/StickyScrollStory";
import FeaturedWorks from "@/components/FeaturedWorks";
import PhotoGallery from "@/components/PhotoGallery";
import Services from "@/components/Services";
import TechMarquee from "@/components/TechMarquee";
import HorizontalTimeline from "@/components/HorizontalTimeline";
import Highlights from "@/components/Highlights";
import MyWorld from "@/components/MyWorld/MyWorld";
import Footer from "@/components/Footer";

// Lazy-loaded heavy WebGL & Three.js interactive sections with graceful Cyberpunk skeleton placeholders
const CertificatesGallery = dynamic(() => import("@/components/CertificatesGallery"), {
  ssr: false,
  loading: () => (
    <section className="w-full bg-[#090f0f] py-28 md:py-36 border-t border-mint/20 flex flex-col items-center justify-center">
      <div className="text-center mb-12">
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-outfit font-black uppercase text-foreground tracking-tighter">
          My <span className="text-mint">Certifications</span>
        </h2>
        <p className="text-foreground/70 font-mono mt-3 uppercase tracking-widest text-xs md:text-sm animate-pulse">
          INITIALIZING 3D CERTIFICATE CYPHER...
        </p>
      </div>
      <div className="w-full h-[600px] flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border-2 border-mint border-t-transparent animate-spin" />
      </div>
    </section>
  ),
});

const VirtualOffice = dynamic(() => import("@/components/VirtualOffice"), {
  ssr: false,
  loading: () => (
    <section className="relative w-full py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-[#090f0f] border-t border-mint/20 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center py-24 text-center">
        <div className="w-14 h-14 rounded-2xl bg-mint/10 border border-mint/30 flex items-center justify-center mb-4">
          <div className="w-6 h-6 border-2 border-mint border-t-transparent rounded-full animate-spin" />
        </div>
        <h3 className="text-2xl md:text-3xl font-outfit font-black uppercase text-white mb-2">
          Connecting to BYS 3D Virtual Office
        </h3>
        <p className="text-mint font-mono text-xs tracking-widest uppercase animate-pulse">
          STREAMING VOXEL AGENTS & THREE.JS SHADER ENGINE...
        </p>
      </div>
    </section>
  ),
});

export default function Home() {
  const [showLoader, setShowLoader] = useState(true);

  return (
    <main className="relative min-h-screen">
      {/* 
        Koreksi Arsitektur Performa:
        Loader diperlakukan murni sebagai visual overlay non-blocking (pointer-events-none).
        Hero dan seluruh konten utama ter-render secara instan di DOM tanpa menunggu loader selesai,
        sehingga elemen LCP (H1 & Foto Profil) langsung tercatat oleh browser di fase render pertama.
      */}
      {showLoader && <Loader onComplete={() => setShowLoader(false)} />}
      
      <div>
        <Navbar />
        <Hero />
        <StickyScrollStory />
        <FeaturedWorks />
        <PhotoGallery />
        <Services />
        <TechMarquee />
        <HorizontalTimeline />
        <Highlights />
        <MyWorld />
        <CertificatesGallery />
        <VirtualOffice />
        <Footer />
      </div>
    </main>
  );
}
