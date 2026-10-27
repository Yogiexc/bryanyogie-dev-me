"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);
  const slatRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const val = { n: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    // 1. Smooth, prestigious counter animation
    tl.to(val, {
      n: 100,
      duration: 2.2,
      ease: "power2.inOut",
      onUpdate: () => {
        const rounded = Math.round(val.n);
        setCounter(rounded);
        if (counterRef.current) {
          counterRef.current.innerText = rounded < 10 ? `0${rounded}` : `${rounded}`;
        }
      },
    })
      // 2. Fade out typography elements gracefully
      .to([titleRef.current, counterRef.current, bottomBarRef.current], {
        opacity: 0,
        y: -30,
        duration: 0.5,
        ease: "power3.in",
        stagger: 0.06,
      })
      // 3. Staggered Horizontal Slat Curtain Blinds Opening (Awwwards Style)
      .to(slatRefs.current, {
        scaleY: 0,
        duration: 0.85,
        ease: "power4.inOut",
        stagger: 0.08,
        transformOrigin: "top",
      })
      .to(containerRef.current, {
        display: "none",
        duration: 0.01,
      });
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] pointer-events-auto select-none overflow-hidden"
    >
      {/* 4 Staggered Horizontal Architectural Slat Panels */}
      <div className="absolute inset-0 flex flex-col z-0">
        {[0, 1, 2, 3].map((idx) => (
          <div
            key={idx}
            ref={(el) => {
              slatRefs.current[idx] = el;
            }}
            className="w-full flex-1 bg-[#090f0f] border-b border-white/[0.04]"
          />
        ))}
      </div>

      {/* Elegant Editorial Forefront Content */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between p-8 md:p-14 lg:p-20 text-[#f4f0e8] pointer-events-none">
        
        {/* Top Minimalist Header */}
        <div ref={titleRef} className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-mint" />
            <span className="font-mono text-xs md:text-sm tracking-[0.25em] uppercase text-white/80 font-bold">
              BYS / PORTFOLIO &copy;{new Date().getFullYear()}
            </span>
          </div>
          <span className="font-mono text-xs tracking-widest text-mint uppercase hidden sm:inline">
            SURAKARTA, ID
          </span>
        </div>

        {/* Center Editorial Title */}
        <div className="flex flex-col items-start my-auto">
          <p className="font-mono text-xs md:text-sm text-flare font-bold tracking-[0.3em] uppercase mb-2">
            DESIGN &bull; CODE &bull; NETWORK
          </p>
          <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-outfit font-black tracking-tighter text-[#f4f0e8] uppercase leading-[0.9]">
            BRYAN <span className="text-mint">YOGIE</span>
          </h1>
          <p className="font-mono text-xs md:text-sm text-white/50 tracking-wider mt-3 max-w-md">
            Fullstack Web Engineering & Network Architecture
          </p>
        </div>

        {/* Bottom Giant Kinetic Counter & Progress Info */}
        <div ref={bottomBarRef} className="flex items-end justify-between w-full border-t border-white/10 pt-6">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[11px] uppercase tracking-widest text-white/40">
              System Loading
            </span>
            <div className="w-32 md:w-48 h-[2px] bg-white/10 rounded-full overflow-hidden mt-1">
              <div
                className="h-full bg-gradient-to-r from-mint to-flare transition-all duration-100 ease-out"
                style={{ width: `${counter}%` }}
              />
            </div>
          </div>

          {/* Giant Minimalist Counter */}
          <div className="flex items-baseline">
            <h2
              ref={counterRef}
              className="font-outfit font-black text-6xl sm:text-8xl md:text-9xl tracking-tighter leading-none text-white/90"
            >
              00
            </h2>
            <span className="font-mono text-base md:text-2xl text-mint ml-1 font-bold">
              %
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
