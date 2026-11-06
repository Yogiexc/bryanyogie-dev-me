"use client";

import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";
import dynamic from "next/dynamic";
import AuroraBackground from "@/components/AuroraBackground";
import GlitchText from "@/components/GlitchText";
import ProfileCard from "@/components/ProfileCard";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const title1Ref = useRef<HTMLHeadingElement>(null);
  const title2Ref = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Respect reduced motion: no entrance displacement
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      gsap.set([subtitleRef.current, title1Ref.current, title2Ref.current, scrollHintRef.current], {
        opacity: 1,
        y: 0,
      });
      return;
    }

    const isMobile = window.innerWidth < 768;

    // Non-blocking instant paint: start at full visibility so LCP registers immediately
    gsap.fromTo(
      [subtitleRef.current, title1Ref.current, title2Ref.current],
      { y: isMobile ? 8 : 20, opacity: 1 },
      {
        y: 0,
        opacity: 1,
        duration: isMobile ? 0.3 : 0.5,
        stagger: 0.04,
        ease: "power2.out",
      }
    );

    gsap.fromTo(
      scrollHintRef.current,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", delay: 0.2 }
    );

    // Parallax effect on scroll
    gsap.to(".hero-content", {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full flex flex-col justify-center px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      <AuroraBackground />

      {/* Engineering Blueprint Corner Crosshairs & Framing Lines */}
      <div className="absolute top-28 left-6 md:left-12 lg:left-24 text-[#B9F5D8]/30 font-mono text-xs select-none pointer-events-none hidden sm:block">
        + SYS.COORD // 7°33&apos;S 110°49&apos;E
      </div>
      <div className="absolute top-28 right-6 md:right-12 lg:right-24 text-[#FF7043]/40 font-mono text-xs select-none pointer-events-none hidden sm:block">
        PORT.V4 // 2026 EDITION +
      </div>
      
      <div className="relative z-10 flex flex-col lg:flex-row items-center w-full h-full pt-20 lg:pt-0">
        {/* Text Section */}
        <div className="w-full lg:w-3/5 mt-10 lg:mt-0 hero-content pointer-events-none flex flex-col justify-center h-auto lg:h-full flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#142424] border border-[#B9F5D8]/30 text-[#B9F5D8] font-mono text-[11px] uppercase tracking-widest shadow-[0_0_15px_rgba(185,245,216,0.15)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B9F5D8] animate-ping" />
              AVAILABLE FOR INTERNSHIP & SELECTIVE CONTRACTS
            </span>
          </div>

          <p
            ref={subtitleRef}
            className="text-[#F4F0E8]/70 font-mono text-xs sm:text-sm uppercase tracking-[0.25em] mb-4 flex items-center gap-2.5 will-change-transform"
          >
            <span className="w-2 h-2 rounded-full bg-[#FF7043] inline-block shadow-[0_0_8px_#FF7043]" />
            Informatics Engineering <span className="text-[#B9F5D8]">/</span> Network &amp; Web Architect
          </p>
          <div className="relative">
            <h1
              ref={title1Ref}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-[5vw] xl:text-[5.5vw] font-outfit font-black tracking-tight leading-none text-[#F4F0E8] uppercase will-change-transform drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
            >
              <GlitchText text="BRYAN YOGIE" />
            </h1>
          </div>
          <div className="relative mt-2">
            <h1
              ref={title2Ref}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-[5vw] xl:text-[5.5vw] font-outfit font-black tracking-tight leading-none text-[#B9F5D8] uppercase pb-4 will-change-transform drop-shadow-[0_0_35px_rgba(185,245,216,0.25)]"
            >
              <GlitchText text="SAPUTRA" />
            </h1>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-mono text-[#F4F0E8]/60 pointer-events-auto">
            <span className="px-3 py-1.5 rounded-lg bg-[#142424]/80 border border-[#182A2A] text-[#F4F0E8]/80">
              LOC // SURAKARTA, ID
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-[#142424]/80 border border-[#182A2A] text-[#B9F5D8]">
              UNS SEBELAS MARET
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-[#142424]/80 border border-[#182A2A] text-[#FF7043]">
              FULLSTACK + IOT
            </span>
          </div>
        </div>

        {/* Interactive 3D Tilt Profile Card */}
        <div className="w-full lg:w-2/5 h-auto lg:h-full z-20 pointer-events-auto flex flex-1 items-center justify-center lg:justify-end mt-4 lg:mt-0 pb-10 lg:pb-0 relative">
          <div className="w-full h-full flex items-center justify-center scale-[0.65] sm:scale-75 md:scale-90 lg:scale-100 transform origin-center">
            <ProfileCard />
          </div>
        </div>
      </div>

      <div
        ref={scrollHintRef}
        className="absolute bottom-10 lg:bottom-20 left-6 md:left-12 lg:left-24 flex flex-col items-center gap-4 opacity-0 z-10"
      >
        <span className="text-xs font-mono uppercase tracking-widest text-white/50" style={{ writingMode: 'vertical-rl' }}>
          Scroll
        </span>
        <div className="w-[1px] h-12 md:h-16 bg-white/30 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-scroll-down" />
        </div>
      </div>
    </section>
  );
}
