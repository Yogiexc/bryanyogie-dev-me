"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowUpRight, MapPin, Clock, Terminal } from "lucide-react";
import AuroraBackground from "@/components/AuroraBackground";
import GlitchText from "@/components/GlitchText";
import ProfileCard from "@/components/ProfileCard";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const infoBarRef = useRef<HTMLDivElement>(null);

  // Live WIB Clock (Surakarta / Jakarta GMT+7)
  const [wibTime, setWibTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString("en-GB", {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setWibTime(`${timeStr} WIB`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      gsap.set([headlineRef.current, infoBarRef.current], { opacity: 1, y: 0 });
      return;
    }

    // Clean, weighted entrance without jank
    gsap.fromTo(
      headlineRef.current,
      { y: 24, opacity: 0.8 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
    );

    gsap.fromTo(
      infoBarRef.current,
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power2.out", delay: 0.15 }
    );
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] lg:min-h-screen w-full flex flex-col justify-center px-6 md:px-12 lg:px-20 overflow-hidden pt-28 pb-16 lg:py-0"
    >
      <AuroraBackground />

      <div className="relative z-10 w-full max-w-6xl mx-auto my-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 lg:gap-16">
        
        {/* Left Column: Authoritative Editorial Typography & Live Telemetry */}
        <div ref={headlineRef} className="w-full lg:max-w-2xl flex flex-col">
          
          {/* Telemetry Status Bar (Location + Live Clock + Availability) */}
          <div 
            ref={infoBarRef}
            className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6 text-[11px] font-mono tracking-wider text-[#F4F0E8]/60"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#142424]/80 border border-[#B9F5D8]/15 backdrop-blur-sm text-[#B9F5D8]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B9F5D8] animate-pulse" />
              <span>AVAILABLE FOR COLLAB</span>
            </div>

            <span className="inline-flex items-center gap-1 text-[#F4F0E8]/70">
              <MapPin size={12} className="text-[#B9F5D8]" /> SURAKARTA, ID
            </span>

            <span className="text-[#B9F5D8]/30 hidden sm:inline">•</span>

            <span className="inline-flex items-center gap-1 text-[#F4F0E8]/70">
              <Clock size={12} className="text-[#B9F5D8]" /> {wibTime || "LIVE WIB"}
            </span>
          </div>

          {/* Single Semantic H1 for Clean SEO & Visual Power */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-outfit font-black tracking-tight leading-[0.95] text-[#F4F0E8] uppercase mb-4">
            <span className="block">
              <GlitchText text="BRYAN YOGIE" />
            </span>
            <span className="block text-[#B9F5D8] mt-1">
              <GlitchText text="SAPUTRA" />
            </span>
          </h1>

          {/* Sub-headline: Precise Disciplines */}
          <p className="font-mono text-xs sm:text-sm uppercase tracking-[0.18em] text-[#B9F5D8]/90 mb-6">
            Informatics Engineering <span className="text-[#F4F0E8]/40">•</span> Network &amp; Fullstack Architect
          </p>

          {/* Concise Bio / Statement with Tactile Quote Border */}
          <p className="text-sm sm:text-base md:text-lg text-[#F4F0E8]/75 leading-relaxed font-sans max-w-xl mb-8 border-l border-[#B9F5D8]/30 pl-5">
            Forged in physical network cabling and enterprise routing topologies; now building high-throughput modern web architectures, algorithmic automation systems, and clean human interfaces.
          </p>

          {/* Minimalist Action Controls */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="https://wa.me/62882005703770"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#B9F5D8] text-[#090F0F] font-outfit font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-[#FF7043] hover:text-[#F4F0E8] transition-colors duration-200 active:scale-95 shadow-[0_4px_20px_rgba(185,245,216,0.2)]"
            >
              Contact Bryan <ArrowUpRight size={15} />
            </a>

            <a
              href="#about"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#142424] text-[#F4F0E8] border border-[#B9F5D8]/20 hover:border-[#B9F5D8]/60 font-mono text-xs uppercase tracking-wider transition-colors duration-200 active:scale-95"
            >
              <Terminal size={14} className="text-[#B9F5D8]" /> Read Story
            </a>
          </div>

        </div>

        {/* Right Column: Tactile Framed Portrait Card with 3D Tilt */}
        <div className="w-full lg:w-auto flex items-center justify-center lg:justify-end">
          <ProfileCard />
        </div>

      </div>

      {/* Subtle Bottom Accent Line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#B9F5D8]/15 to-transparent pointer-events-none" />
    </section>
  );
}
