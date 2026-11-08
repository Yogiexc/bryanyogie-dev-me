"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ArrowUpRight } from "lucide-react";
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
        duration: isMobile ? 0.35 : 0.55,
        stagger: 0.05,
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
      yPercent: -40,
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
      className="relative min-h-screen w-full flex flex-col justify-center px-6 md:px-12 lg:px-24 overflow-hidden pt-24 pb-12 lg:py-0"
    >
      <AuroraBackground />
      
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between w-full h-full max-w-7xl mx-auto my-auto gap-12 lg:gap-8">
        
        {/* Left: Clean & Powerful Editorial Typographic Block */}
        <div className="w-full lg:w-3/5 hero-content flex flex-col justify-center">
          
          {/* Subtle Status Pill */}
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#B9F5D8] inline-block animate-pulse shadow-[0_0_8px_#B9F5D8]" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#B9F5D8] font-semibold">
              Available for Q1/Q2 Projects • Solo, ID
            </span>
          </div>

          {/* Subtitle Role */}
          <p
            ref={subtitleRef}
            className="text-[#F4F0E8]/70 font-mono text-xs sm:text-sm uppercase tracking-[0.2em] mb-3 will-change-transform"
          >
            Informatics Engineering <span className="text-[#B9F5D8]">•</span> Network &amp; Web Architect
          </p>

          {/* Massive Editorial Headline */}
          <div className="relative mb-6">
            <h1
              ref={title1Ref}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.2vw] font-outfit font-black tracking-tight leading-[0.92] text-[#F4F0E8] uppercase will-change-transform"
            >
              <GlitchText text="BRYAN YOGIE" />
            </h1>
            <h1
              ref={title2Ref}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.2vw] font-outfit font-black tracking-tight leading-[0.92] text-[#B9F5D8] uppercase mt-2 will-change-transform drop-shadow-[0_0_40px_rgba(185,245,216,0.25)]"
            >
              <GlitchText text="SAPUTRA" />
            </h1>
          </div>

          {/* Single High-Impact Mission Statement */}
          <p className="text-sm sm:text-base md:text-lg text-[#F4F0E8]/75 leading-relaxed max-w-xl mb-8 font-sans border-l-2 border-[#B9F5D8]/40 pl-5">
            Bridging bare-metal network routing infrastructure with high-scale distributed web architectures, interactive creative code, and quantitative automated systems.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#about"
              className="px-7 py-3.5 rounded-full bg-[#B9F5D8] text-[#090F0F] font-outfit font-black text-sm uppercase tracking-wider hover:bg-[#FF7043] hover:text-[#F4F0E8] transition-all duration-300 shadow-[0_10px_30px_rgba(185,245,216,0.25)] active:scale-95 flex items-center gap-2"
            >
              Explore Works <ArrowDown size={16} />
            </a>
            <a
              href="#services"
              className="px-7 py-3.5 rounded-full bg-[#142424] text-[#F4F0E8] border border-[#182A2A] hover:border-[#B9F5D8]/50 font-mono text-xs uppercase tracking-widest transition-all duration-300 flex items-center gap-2"
            >
              Capabilities <ArrowUpRight size={14} className="text-[#B9F5D8]" />
            </a>
          </div>

        </div>

        {/* Right: Frameless 3D Tilt Portrait Card */}
        <div className="w-full lg:w-2/5 flex items-center justify-center lg:justify-end">
          <ProfileCard />
        </div>

      </div>

      {/* Clean Minimalist Vertical Scroll Indicator */}
      <div
        ref={scrollHintRef}
        className="hidden md:flex absolute bottom-8 left-12 lg:left-24 items-center gap-3 text-xs font-mono uppercase tracking-widest text-[#F4F0E8]/40 select-none pointer-events-none"
      >
        <div className="w-[1px] h-8 bg-[#182A2A] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-[#B9F5D8] animate-scroll-down" />
        </div>
        <span>SCROLL DOWN</span>
      </div>
    </section>
  );
}
