"use client";

import { useState } from "react";
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
import CertificatesGallery from "@/components/CertificatesGallery";
import VirtualOffice from "@/components/VirtualOffice";
import Footer from "@/components/Footer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="relative min-h-screen">
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      
      <div className={`${isLoading ? "h-screen overflow-hidden" : ""}`}>
        <Navbar />
        <Hero />
        <StickyScrollStory />
        <FeaturedWorks />
        <PhotoGallery />
        <Services />
        <TechMarquee />
        <HorizontalTimeline />
        <Highlights />
        <CertificatesGallery />
        <VirtualOffice />
        <Footer />
      </div>
    </main>
  );
}
