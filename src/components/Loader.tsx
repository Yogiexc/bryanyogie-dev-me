"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // Respect reduced motion: finish immediately
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onComplete();
      return;
    }

    const obj = { val: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    // Fast 0 -> 100% Studio Counter
    tl.to(obj, {
      val: 100,
      duration: 1.1,
      ease: "power2.inOut",
      onUpdate: () => {
        setCounter(Math.floor(obj.val));
      },
    })
      .to(".loader-fade-content", {
        opacity: 0,
        y: -15,
        duration: 0.3,
        ease: "power2.in",
      })
      // Smooth curtain split reveal upwards
      .to(curtainRef.current, {
        yPercent: -100,
        duration: 0.7,
        ease: "power4.inOut",
      })
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
      className="fixed inset-0 z-[99999] pointer-events-none select-none overflow-hidden"
    >
      <div
        ref={curtainRef}
        className="w-full h-full bg-[#090F0F] border-b border-[#B9F5D8]/20 flex flex-col justify-between p-8 sm:p-14 relative"
      >
        {/* Subtle background ambient halo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#142424]/40 rounded-full blur-[140px] pointer-events-none" />

        {/* Top Header */}
        <div className="loader-fade-content relative z-10 flex items-center justify-between text-xs font-mono text-[#F4F0E8]/40 tracking-widest uppercase">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#B9F5D8] inline-block animate-pulse" />
            <span className="text-[#F4F0E8]/70">BYS © 2026</span>
          </div>
          <span className="hidden sm:inline-block">INFORMATICS &amp; FULLSTACK ARCHITECT</span>
        </div>

        {/* Center: Massive Monospaced Studio Counter */}
        <div className="loader-fade-content relative z-10 flex flex-col items-center justify-center my-auto">
          <div className="flex items-baseline font-outfit font-black tracking-tighter text-[#F4F0E8] text-7xl sm:text-9xl md:text-[13vw] leading-none">
            <span>{counter < 10 ? `0${counter}` : counter}</span>
            <span className="text-2xl sm:text-4xl md:text-5xl font-mono text-[#B9F5D8] ml-2 font-normal">%</span>
          </div>
          <div className="flex items-center gap-3 mt-4 text-xs font-mono text-[#F4F0E8]/50 uppercase tracking-[0.25em]">
            <span>LOADING ARCHIVE</span>
            <span className="text-[#B9F5D8]">/</span>
            <span className="text-[#FF7043]">SURAKARTA, ID</span>
          </div>
        </div>

        {/* Bottom Progress Tracker */}
        <div className="loader-fade-content relative z-10 flex items-end justify-between border-t border-[#182A2A] pt-4 text-[11px] font-mono text-[#F4F0E8]/40">
          <span>INITIALIZING INTERACTIVE CANVAS</span>
          <span className="text-[#B9F5D8]">{counter === 100 ? "READY" : "DECODING"}</span>
        </div>
      </div>
    </div>
  );
}
