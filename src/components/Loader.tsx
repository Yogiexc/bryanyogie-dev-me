"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const BOOT_LOGS = [
  "INITIALIZING NEURAL RUNTIME v4.2...",
  "RESOLVING ASSETS & SHADERS (WebGL 2.0)...",
  "CONNECTING 9 VIRTUAL OFFICE AGENTS...",
  "CALIBRATING THREE.JS PBR RAYMARCHING...",
  "ESTABLISHING SECURE EDGE TUNNEL [1.6 Gbps]...",
  "BYS ARCHITECTURAL SYSTEM READY.",
];

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const leftCurtainRef = useRef<HTMLDivElement>(null);
  const rightCurtainRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const progressNumRef = useRef<HTMLSpanElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const circleProgressRef = useRef<SVGCircleElement>(null);

  const [currentLog, setCurrentLog] = useState(BOOT_LOGS[0]);
  const [glitchText, setGlitchText] = useState("BRYAN YOGIE SAPUTRA");

  useEffect(() => {
    // Holographic Scramble / Decode effect on author name
    const targetText = "BRYAN YOGIE SAPUTRA";
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&*";
    let iteration = 0;
    const scrambleInterval = setInterval(() => {
      setGlitchText(
        targetText
          .split("")
          .map((letter, index) => {
            if (letter === " ") return " ";
            if (index < iteration) return targetText[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= targetText.length) {
        clearInterval(scrambleInterval);
      }
      iteration += 1 / 2;
    }, 45);

    // Timeline for cinematic boot
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    const progressValue = { val: 0 };
    const radius = 46;
    const circumference = 2 * Math.PI * radius;

    tl.to(progressValue, {
      val: 100,
      duration: 2.8,
      ease: "power2.inOut",
      onUpdate: () => {
        const rounded = Math.round(progressValue.val);
        if (progressNumRef.current) {
          progressNumRef.current.innerText = `${rounded < 10 ? "0" + rounded : rounded}`;
        }
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${progressValue.val}%`;
        }
        if (circleProgressRef.current) {
          const offset = circumference - (progressValue.val / 100) * circumference;
          circleProgressRef.current.style.strokeDashoffset = `${offset}`;
        }

        // Cycle through boot logs dynamically as progress advances
        const logIndex = Math.min(
          Math.floor((progressValue.val / 100) * BOOT_LOGS.length),
          BOOT_LOGS.length - 1
        );
        setCurrentLog(BOOT_LOGS[logIndex]);
      },
    })
      .to(contentRef.current, {
        scale: 0.96,
        opacity: 0,
        duration: 0.45,
        ease: "power3.in",
      })
      // Cinematic Mechanical Dual-Shutter Reveal (Left & Right Split)
      .to(leftCurtainRef.current, {
        xPercent: -100,
        duration: 0.9,
        ease: "power4.inOut",
      })
      .to(
        rightCurtainRef.current,
        {
          xPercent: 100,
          duration: 0.9,
          ease: "power4.inOut",
        },
        "<"
      )
      .to(loaderRef.current, {
        display: "none",
        duration: 0.01,
      });

    return () => {
      clearInterval(scrambleInterval);
    };
  }, [onComplete]);

  const radius = 46;
  const circumference = 2 * Math.PI * radius;

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[99999] overflow-hidden flex items-center justify-center select-none"
    >
      {/* Dual Split Shutter Curtains */}
      <div
        ref={leftCurtainRef}
        className="absolute top-0 left-0 w-1/2 h-full bg-[#070d0d] border-r border-mint/20 z-10"
      />
      <div
        ref={rightCurtainRef}
        className="absolute top-0 right-0 w-1/2 h-full bg-[#070d0d] border-l border-mint/20 z-10"
      />

      {/* Cyber Grid Background Matrix */}
      <div
        className="absolute inset-0 z-20 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(185,245,216,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(185,245,216,0.12) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Center Holographic HUD Content */}
      <div
        ref={contentRef}
        className="relative z-30 flex flex-col items-center justify-center px-6 max-w-xl w-full text-[#f4f0e8] font-mono"
      >
        {/* Top Status Badges */}
        <div className="flex items-center justify-between w-full mb-8 text-[11px] text-mint/70 border-b border-mint/20 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-mint animate-ping" />
            <span className="tracking-widest font-bold">BYS // QUANTUM PROTOCOL</span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[10px] text-flare">
            <span>SYS_INIT</span>
            <span>[ONLINE]</span>
          </div>
        </div>

        {/* Circular Holographic HUD Speedometer with Number Counter */}
        <div className="relative flex items-center justify-center mb-8">
          <svg className="w-36 h-36 -rotate-90">
            {/* Background Track */}
            <circle
              cx="72"
              cy="72"
              r={radius}
              className="stroke-mint/15 fill-transparent"
              strokeWidth="4"
            />
            {/* Animated Glowing Progress Ring */}
            <circle
              ref={circleProgressRef}
              cx="72"
              cy="72"
              r={radius}
              className="stroke-mint fill-transparent transition-all"
              strokeWidth="5"
              strokeDasharray={circumference}
              strokeDashoffset={circumference}
              strokeLinecap="round"
              style={{ filter: "drop-shadow(0 0 10px rgba(185,245,216,0.8))" }}
            />
          </svg>

          {/* Rotating Outer Reticle Rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-32 h-32 rounded-full border border-dashed border-flare/40 animate-[spin_10s_linear_infinite]" />
            <div className="w-40 h-40 rounded-full border border-mint/20 animate-[spin_18s_linear_infinite_reverse]" />
          </div>

          {/* Big Digital Percentage Counter */}
          <div className="absolute flex flex-col items-center">
            <div className="flex items-baseline font-outfit font-black tracking-tighter text-white">
              <span ref={progressNumRef} className="text-4xl md:text-5xl">
                00
              </span>
              <span className="text-sm text-mint ml-0.5">%</span>
            </div>
            <span className="text-[9px] text-mint/60 uppercase tracking-widest -mt-1">
              Booting
            </span>
          </div>
        </div>

        {/* Glitch / Decoded Title */}
        <div className="flex flex-col items-center text-center mb-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-outfit font-black tracking-tight text-white mb-1.5 drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]">
            {glitchText}
          </h1>
          <p className="text-[11px] md:text-xs text-mint uppercase tracking-[0.22em] font-semibold">
            Informatics Engineer & Fullstack Architect
          </p>
        </div>

        {/* Horizontal Neon Bar with Flare Glow Accent */}
        <div className="w-full max-w-md h-[4px] bg-[#142323] relative rounded-full overflow-hidden mb-5 border border-mint/20">
          <div
            ref={progressBarRef}
            className="h-full bg-gradient-to-r from-mint via-mint to-flare w-0 rounded-full shadow-[0_0_15px_#b9f5d8]"
          />
        </div>

        {/* Terminal Boot Telemetry Logs (Typewriter style) */}
        <div className="w-full max-w-md bg-[#0a1414]/90 border border-mint/25 rounded-xl px-4 py-2.5 flex items-center justify-between text-[11px] shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
          <div className="flex items-center gap-2 overflow-hidden truncate">
            <span className="text-flare font-bold">›</span>
            <span className="text-[#f4f0e8]/80 truncate font-mono text-[10px] md:text-[11px]">
              {currentLog}
            </span>
          </div>
          <span className="w-1.5 h-3.5 bg-mint animate-pulse ml-2 flex-shrink-0" />
        </div>

        {/* Bottom Coordinates & Watermark */}
        <div className="mt-8 flex items-center justify-between w-full text-[10px] text-white/40 tracking-wider">
          <span>PORT 443 // TURBOPACK</span>
          <span>LAT: -7.5561° S | LON: 110.8540° E</span>
        </div>
      </div>
    </div>
  );
}
