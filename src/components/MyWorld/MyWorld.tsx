"use client";

import React, { useState, useRef, useEffect } from "react";
import WorldDiorama from "./WorldDiorama";

export default function MyWorld() {
  const [headlightOn, setHeadlightOn] = useState<boolean>(true);
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Smooth, gentle cursor-based parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xRatio = (e.clientX - rect.left) / rect.width - 0.5;
    const yRatio = (e.clientY - rect.top) / rect.height - 0.5;
    // Constrain to subtle translation (max ±8px x, ±5px y)
    setMouseOffset({
      x: xRatio * 16,
      y: yRatio * 10,
    });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
    setHoveredPart(null);
  };

  return (
    <section
      id="my-world"
      className="relative w-full py-20 md:py-32 px-4 sm:px-8 md:px-12 lg:px-20 bg-[#090F0F] border-t border-[#182A2A] overflow-hidden"
    >
      {/* Background Soft Organic Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#142424]/30 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Minimalist Editorial Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 md:mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#FF7043]" />
              <span className="text-xs sm:text-sm font-mono text-[#B9F5D8] uppercase tracking-[0.25em]">
                MY WORLD / 001
              </span>
            </div>
            
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-outfit font-black tracking-tight text-[#F4F0E8] uppercase leading-none">
              THE <span className="text-[#B9F5D8]">RIDE</span>
            </h2>

            <p className="text-xs sm:text-sm font-mono text-[#F4F0E8]/60 uppercase tracking-widest mt-2">
              YAMAHA FINO GRANDE 125 — RETRO GARAGE
            </p>
          </div>

          {/* Interactive Headlight Toggle */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setHeadlightOn(!headlightOn)}
              className="px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-300 flex items-center gap-2 bg-[#142424] text-[#F4F0E8]/80 hover:text-white border border-[#182A2A] hover:border-[#B9F5D8]/50"
              title="Saklar Lampu Depan LED"
            >
              <span
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  headlightOn ? "bg-[#B9F5D8] shadow-[0_0_8px_#B9F5D8]" : "bg-[#FF7043]/40"
                }`}
              />
              <span className="text-[11px] uppercase tracking-wider">
                {headlightOn ? "HEADLIGHT: ON" : "HEADLIGHT: OFF"}
              </span>
            </button>
          </div>
        </div>

        {/* -------------------------------------------------------------
            THE ARTWORK CARD (Heroic Stage Frame)
            Artwork dominates screen, no clutter, no specs, no quadrant tabs.
           ------------------------------------------------------------- */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative w-full rounded-2xl md:rounded-3xl bg-[#0B1414] border border-[#182A2A] p-3 sm:p-6 md:p-8 shadow-[0_30px_70px_rgba(0,0,0,0.7)] overflow-hidden"
        >
          {/* Parallax Container */}
          <div
            className="w-full h-full transition-transform duration-300 ease-out"
            style={{
              transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`,
            }}
          >
            <WorldDiorama
              headlightOn={headlightOn}
              hoveredPart={hoveredPart}
              onHoverPart={setHoveredPart}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
