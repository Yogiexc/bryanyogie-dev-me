"use client";

import React from "react";
import dioramaData from "./unifiedDiorama.json";

interface UnifiedDioramaPart {
  name?: string;
  depth: number;
  svg: string;
}

interface WorldDioramaProps {
  headlightOn: boolean;
  hoveredPart: string | null;
  onHoverPart: (name: string | null) => void;
}

export default function WorldDiorama({
  headlightOn,
  hoveredPart,
  onHoverPart,
}: WorldDioramaProps) {
  const parts = dioramaData.parts as UnifiedDioramaPart[];

  return (
    <div className="relative w-full aspect-[16/10] sm:aspect-[16/10] md:aspect-[1000/640] flex items-center justify-center select-none overflow-hidden">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 640"
        className="iso iso-svg w-full h-full overflow-visible transition-all duration-500 ease-out"
        data-theme="dark"
      >
        <defs>
          {/* Subtle Ambient Garage Glow */}
          <radialGradient id="garageAmbientGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#182A2A" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#090F0F" stopOpacity="0" />
          </radialGradient>

          {/* Luminous LED Headlight Flare */}
          <radialGradient id="headlightCone" cx="35%" cy="50%" r="65%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
            <stop offset="30%" stopColor="#B9F5D8" stopOpacity="0.4" />
            <stop offset="70%" stopColor="#B9F5D8" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#B9F5D8" stopOpacity="0" />
          </radialGradient>

          {/* Soft Filter for Luminous Accents */}
          <filter id="lampGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ambient Stage Floor Glow */}
        <ellipse
          cx="500"
          cy="380"
          rx="380"
          ry="220"
          fill="url(#garageAmbientGlow)"
          pointerEvents="none"
        />

        {/* Unified Depth-Sorted Diorama Geometry */}
        {parts.map((part, idx) => {
          const isInteractive = part.name && !part.name.includes("halo");
          const isScooterPart =
            part.name &&
            (part.name.includes("cowl") ||
              part.name.includes("wheel") ||
              part.name.includes("saddle") ||
              part.name.includes("apron") ||
              part.name.includes("headlight") ||
              part.name.includes("exhaust") ||
              part.name.includes("handlebar") ||
              part.name.includes("fender"));

          return (
            <g
              key={idx}
              data-name={part.name}
              data-depth={Math.round(part.depth)}
              className={`transition-all duration-300 ${
                isInteractive ? "cursor-pointer" : "pointer-events-none"
              }`}
              onMouseEnter={() => {
                if (isInteractive && part.name) onHoverPart(part.name);
              }}
              onMouseLeave={() => onHoverPart(null)}
              dangerouslySetInnerHTML={{ __html: part.svg }}
            />
          );
        })}

        {/* Interactive Luminous Headlight Beam Cone */}
        {headlightOn && (
          <path
            d="M 645 372 L 880 320 L 920 460 L 648 402 Z"
            fill="url(#headlightCone)"
            className="pointer-events-none transition-opacity duration-500 ease-out animate-pulse"
            style={{ opacity: 0.85 }}
          />
        )}
      </svg>
    </div>
  );
}
