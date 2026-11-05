"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect reduced motion: finish immediately
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onComplete();
      return;
    }

    const isMobile = window.innerWidth < 768;
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    // 1. Initial State
    gsap.set(logoRef.current, { opacity: 0, scale: 0.95, y: 10 });
    gsap.set(titleRef.current, { opacity: 0, y: 12 });
    gsap.set(subtitleRef.current, { opacity: 0, y: 8 });
    gsap.set(lineRef.current, { scaleX: 0, opacity: 0 });

    // 2. Crisp & Snappy Editorial Reveal Sequence
    tl.to(logoRef.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: isMobile ? 0.35 : 0.5,
      ease: "power2.out",
    })
      .to(
        titleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: isMobile ? 0.35 : 0.5,
          ease: "power2.out",
        },
        "-=0.25"
      )
      .to(
        subtitleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: isMobile ? 0.3 : 0.45,
          ease: "power2.out",
        },
        "-=0.25"
      )
      .to(
        lineRef.current,
        {
          scaleX: 1,
          opacity: 1,
          duration: isMobile ? 0.45 : 0.6,
          ease: "power2.inOut",
        },
        "-=0.2"
      )
      // Smooth fade out
      .to(
        [logoRef.current, titleRef.current, subtitleRef.current, lineRef.current],
        {
          opacity: 0,
          duration: isMobile ? 0.25 : 0.35,
          ease: "power2.in",
        },
        "+=0.1"
      )
      .to(
        containerRef.current,
        {
          opacity: 0,
          duration: isMobile ? 0.25 : 0.35,
          ease: "power2.out",
        },
        "-=0.15"
      )
      .to(containerRef.current, {
        display: "none",
        duration: 0.01,
      });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] pointer-events-none bg-[#090F0F] flex items-center justify-center p-6 select-none"
    >
      {/* Subtle organic ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-96 h-80 sm:h-96 bg-[#182A2A]/40 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-md w-full">
        {/* Authentic BYS Brand Mark Logo */}
        <div
          ref={logoRef}
          className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#142424] border border-[#B9F5D8]/20 flex items-center justify-center p-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.5)] mb-6"
        >
          <img
            src="/favicon-32x32.png"
            alt="BYS Brand Mark"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Studio Name Title */}
        <h1
          ref={titleRef}
          className="text-2xl sm:text-3xl font-outfit font-black tracking-tight text-[#F4F0E8] uppercase mb-2"
        >
          Bryan Yogie Saputra
        </h1>

        {/* Editorial Subtitle */}
        <p
          ref={subtitleRef}
          className="text-xs sm:text-sm font-mono text-[#F4F0E8]/60 uppercase tracking-[0.25em] mb-8"
        >
          Creative Engineering <span className="text-[#B9F5D8]">•</span> Studio
        </p>

        {/* Minimalist Electric Mint Accent Progress Bar */}
        <div className="w-36 sm:w-44 h-[2px] bg-[#182A2A] rounded-full overflow-hidden">
          <div
            ref={lineRef}
            className="w-full h-full bg-gradient-to-r from-transparent via-[#B9F5D8] to-transparent origin-center"
          />
        </div>
      </div>
    </div>
  );
}
