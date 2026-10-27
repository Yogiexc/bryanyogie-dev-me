"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface TerminalLine {
  prefix?: string;
  command?: string;
  text?: string;
  color?: string;
  delay: number;
}

const SCRIPT_SEQUENCE: TerminalLine[] = [
  { prefix: "λ", command: "npx create-portfolio @bryan/portfolio-v4", color: "#b9f5d8", delay: 150 },
  { text: "✔ Resolving Next.js 16 (Turbopack) & TypeScript AST...", color: "#64748b", delay: 500 },
  { prefix: "λ", command: "import { Bryan } from '@uns/informatics';", color: "#38bdf8", delay: 900 },
  { text: "✔ Connecting 9 Multi-Agent Workstations (BYS Studio)...", color: "#64748b", delay: 1300 },
  { prefix: "λ", command: "npm run deploy --edge-regions=global", color: "#ff7043", delay: 1650 },
  { text: "🚀 STATUS: 200 OK • PORTFOLIO READY [60 FPS]", color: "#34d399", delay: 2100 },
];

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [visibleLines, setVisibleLines] = useState<TerminalLine[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Reveal terminal lines sequentially
    const timeouts: NodeJS.Timeout[] = [];
    SCRIPT_SEQUENCE.forEach((item) => {
      const t = setTimeout(() => {
        setVisibleLines((prev) => [...prev, item]);
      }, item.delay);
      timeouts.push(t);
    });

    // Animate progress smoothly to 100%
    const val = { p: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    tl.to(val, {
      p: 100,
      duration: 2.6,
      ease: "power2.inOut",
      onUpdate: () => {
        const rounded = Math.round(val.p);
        setProgress(rounded);
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${rounded}%`;
        }
      },
    })
      // Smooth window expansion / zoom-in reveal into homepage
      .to(
        windowRef.current,
        {
          scale: 1.15,
          opacity: 0,
          filter: "blur(14px)",
          duration: 0.55,
          ease: "power3.in",
        },
        "+=0.2"
      )
      .to(
        containerRef.current,
        {
          opacity: 0,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.2"
      )
      .to(containerRef.current, {
        display: "none",
        duration: 0.01,
      });

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] bg-[#070d0d] flex items-center justify-center p-4 sm:p-6 overflow-hidden select-none font-mono"
    >
      {/* Background Matrix Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "linear-gradient(rgba(185,245,216,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(185,245,216,0.1) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Modern Developer macOS Window */}
      <div
        ref={windowRef}
        className="relative z-10 w-full max-w-xl bg-[#0c1616]/95 border border-mint/25 rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.85)] overflow-hidden backdrop-blur-xl transition-all"
      >
        {/* Window Top Titlebar */}
        <div className="bg-[#122222] px-4 py-3 border-b border-mint/15 flex items-center justify-between">
          {/* Traffic Light Buttons */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-[0_0_8px_rgba(255,95,86,0.5)]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-[0_0_8px_rgba(255,189,46,0.5)]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f] shadow-[0_0_8px_rgba(39,201,63,0.5)]" />
          </div>

          {/* Centered Title */}
          <div className="flex items-center gap-1.5 text-xs text-[#f4f0e8]/80 font-semibold tracking-wide">
            <span className="text-mint font-bold">bryan@studio</span>
            <span className="text-white/40">:</span>
            <span className="text-[#f4f0e8]/60">~/portfolio-app</span>
          </div>

          {/* Right Status Badge */}
          <div className="flex items-center gap-1.5 text-[10px] text-mint bg-mint/10 border border-mint/20 px-2 py-0.5 rounded-md">
            <span className="w-1.5 h-1.5 rounded-full bg-mint animate-pulse" />
            <span>NODE 22</span>
          </div>
        </div>

        {/* Terminal Content Body */}
        <div className="p-5 sm:p-6 min-h-[260px] flex flex-col justify-between text-xs leading-relaxed">
          <div className="flex flex-col gap-2.5">
            {visibleLines.map((line, idx) => (
              <div key={idx} className="flex items-start gap-2.5 animate-in fade-in duration-150">
                {line.prefix ? (
                  <>
                    <span className="text-mint font-bold select-none">{line.prefix}</span>
                    <span style={{ color: line.color || "#ffffff" }} className="font-semibold">
                      {line.command}
                    </span>
                  </>
                ) : (
                  <span style={{ color: line.color || "#94a3b8" }} className="pl-5 text-[11px]">
                    {line.text}
                  </span>
                )}
              </div>
            ))}

            {/* Blinking Prompt Cursor */}
            <div className="flex items-center gap-2 mt-1">
              <span className="text-mint font-bold select-none">λ</span>
              <span className="w-2 h-4 bg-mint animate-pulse" />
            </div>
          </div>

          {/* Bottom Execution Progress Bar */}
          <div className="pt-6 mt-4 border-t border-white/5 flex flex-col gap-2">
            <div className="flex items-center justify-between text-[11px] text-[#f4f0e8]/60 font-semibold">
              <span className="flex items-center gap-1.5">
                <span className="text-flare font-bold">BUILDING:</span>
                <span>bryanyogie-dev-me.vercel.app</span>
              </span>
              <span className="text-mint font-mono font-bold">{progress}%</span>
            </div>

            {/* Gradient Progress Track */}
            <div className="w-full h-[3px] bg-[#162a2a] rounded-full overflow-hidden">
              <div
                ref={progressBarRef}
                className="h-full bg-gradient-to-r from-mint via-mint to-flare w-0 rounded-full transition-all duration-75 shadow-[0_0_10px_#b9f5d8]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
