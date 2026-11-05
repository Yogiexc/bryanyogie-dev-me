"use client";

import React from "react";
import RideZone from "./zones/RideZone";
import GardenZone from "./zones/GardenZone";
import AviaryZone from "./zones/AviaryZone";
import AquariumZone from "./zones/AquariumZone";
import { ZoneData } from "./worldData";

interface WorldMapProps {
  activeZoneId: string | null;
  hoveredZoneId: string | null;
  onSelectZone: (id: ZoneData["id"]) => void;
  onHoverZone: (id: ZoneData["id"] | null) => void;
}

export default function WorldMap({
  activeZoneId,
  hoveredZoneId,
  onSelectZone,
  onHoverZone,
}: WorldMapProps) {
  return (
    <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] md:aspect-[16/10] bg-[#0A1212] border border-[#182A2A] rounded-2xl md:rounded-3xl p-3 sm:p-6 lg:p-8 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
      {/* Subtle organic ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-[#142424]/40 rounded-full blur-[100px] pointer-events-none" />

      {/* Isometric Pathway Connector Grids */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" xmlns="http://www.w3.org/2000/svg">
        <line x1="25%" y1="28%" x2="50%" y2="50%" stroke="#B9F5D8" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="75%" y1="28%" x2="50%" y2="50%" stroke="#B9F5D8" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="25%" y1="72%" x2="50%" y2="50%" stroke="#B9F5D8" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="75%" y1="72%" x2="50%" y2="50%" stroke="#B9F5D8" strokeWidth="1" strokeDasharray="4 4" />
        {/* Central Hub Marker */}
        <circle cx="50%" cy="50%" r="4" fill="#B9F5D8" />
        <circle cx="50%" cy="50%" r="14" fill="none" stroke="#FF7043" strokeWidth="1" opacity="0.6" strokeDasharray="2 2" />
      </svg>

      {/* 2x2 Isometric Quadrants Grid */}
      <div className="relative z-10 w-full h-full grid grid-cols-2 grid-rows-2 gap-2 sm:gap-4 md:gap-6">
        
        {/* Zone 01: THE RIDE (Top-Left) */}
        <button
          type="button"
          onClick={() => onSelectZone("ride")}
          onMouseEnter={() => onHoverZone("ride")}
          onMouseLeave={() => onHoverZone(null)}
          onFocus={() => onHoverZone("ride")}
          onBlur={() => onHoverZone(null)}
          className={`relative group flex flex-col items-center justify-center p-2 sm:p-4 rounded-xl sm:rounded-2xl transition-all duration-300 text-left outline-none ${
            activeZoneId === "ride"
              ? "bg-[#142424]/90 border border-[#B9F5D8]/50 shadow-[0_0_30px_rgba(185,245,216,0.15)] ring-1 ring-[#B9F5D8]/30"
              : "bg-[#0F1C1C]/60 hover:bg-[#142424]/70 border border-[#182A2A] hover:border-[#B9F5D8]/30"
          }`}
          aria-label="Jelajahi Zona The Ride — Yamaha Fino Grande 125"
        >
          <div className="absolute top-2.5 left-3 sm:top-4 sm:left-4 z-20 flex items-center gap-2">
            <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#B9F5D8]">
              01 // THE RIDE
            </span>
            {activeZoneId === "ride" && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF7043] animate-ping" />
            )}
          </div>
          <div className="w-full h-full flex items-center justify-center pt-5 sm:pt-4">
            <RideZone isActive={activeZoneId === "ride"} isHovered={hoveredZoneId === "ride"} />
          </div>
        </button>

        {/* Zone 02: KEBUN (Top-Right) */}
        <button
          type="button"
          onClick={() => onSelectZone("garden")}
          onMouseEnter={() => onHoverZone("garden")}
          onMouseLeave={() => onHoverZone(null)}
          onFocus={() => onHoverZone("garden")}
          onBlur={() => onHoverZone(null)}
          className={`relative group flex flex-col items-center justify-center p-2 sm:p-4 rounded-xl sm:rounded-2xl transition-all duration-300 text-left outline-none ${
            activeZoneId === "garden"
              ? "bg-[#142424]/90 border border-[#B9F5D8]/50 shadow-[0_0_30px_rgba(185,245,216,0.15)] ring-1 ring-[#B9F5D8]/30"
              : "bg-[#0F1C1C]/60 hover:bg-[#142424]/70 border border-[#182A2A] hover:border-[#B9F5D8]/30"
          }`}
          aria-label="Jelajahi Zona Kebun — Tanaman dan dedaunan"
        >
          <div className="absolute top-2.5 left-3 sm:top-4 sm:left-4 z-20 flex items-center gap-2">
            <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#B9F5D8]">
              02 // KEBUN
            </span>
            {activeZoneId === "garden" && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF7043] animate-ping" />
            )}
          </div>
          <div className="w-full h-full flex items-center justify-center pt-5 sm:pt-4">
            <GardenZone isActive={activeZoneId === "garden"} isHovered={hoveredZoneId === "garden"} />
          </div>
        </button>

        {/* Zone 03: SANGKAR BURUNG (AVIARY) (Bottom-Left) */}
        <button
          type="button"
          onClick={() => onSelectZone("aviary")}
          onMouseEnter={() => onHoverZone("aviary")}
          onMouseLeave={() => onHoverZone(null)}
          onFocus={() => onHoverZone("aviary")}
          onBlur={() => onHoverZone(null)}
          className={`relative group flex flex-col items-center justify-center p-2 sm:p-4 rounded-xl sm:rounded-2xl transition-all duration-300 text-left outline-none ${
            activeZoneId === "aviary"
              ? "bg-[#142424]/90 border border-[#B9F5D8]/50 shadow-[0_0_30px_rgba(185,245,216,0.15)] ring-1 ring-[#B9F5D8]/30"
              : "bg-[#0F1C1C]/60 hover:bg-[#142424]/70 border border-[#182A2A] hover:border-[#B9F5D8]/30"
          }`}
          aria-label="Jelajahi Zona Sangkar Burung — Aviary"
        >
          <div className="absolute top-2.5 left-3 sm:top-4 sm:left-4 z-20 flex items-center gap-2">
            <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#B9F5D8]">
              03 // AVIARY
            </span>
            {activeZoneId === "aviary" && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF7043] animate-ping" />
            )}
          </div>
          <div className="w-full h-full flex items-center justify-center pt-5 sm:pt-4">
            <AviaryZone isActive={activeZoneId === "aviary"} isHovered={hoveredZoneId === "aviary"} />
          </div>
        </button>

        {/* Zone 04: AKUARIUM (Bottom-Right) */}
        <button
          type="button"
          onClick={() => onSelectZone("aquarium")}
          onMouseEnter={() => onHoverZone("aquarium")}
          onMouseLeave={() => onHoverZone(null)}
          onFocus={() => onHoverZone("aquarium")}
          onBlur={() => onHoverZone(null)}
          className={`relative group flex flex-col items-center justify-center p-2 sm:p-4 rounded-xl sm:rounded-2xl transition-all duration-300 text-left outline-none ${
            activeZoneId === "aquarium"
              ? "bg-[#142424]/90 border border-[#B9F5D8]/50 shadow-[0_0_30px_rgba(185,245,216,0.15)] ring-1 ring-[#B9F5D8]/30"
              : "bg-[#0F1C1C]/60 hover:bg-[#142424]/70 border border-[#182A2A] hover:border-[#B9F5D8]/30"
          }`}
          aria-label="Jelajahi Zona Akuarium — Ekosistem Air"
        >
          <div className="absolute top-2.5 left-3 sm:top-4 sm:left-4 z-20 flex items-center gap-2">
            <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#B9F5D8]">
              04 // AKUARIUM
            </span>
            {activeZoneId === "aquarium" && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF7043] animate-ping" />
            )}
          </div>
          <div className="w-full h-full flex items-center justify-center pt-5 sm:pt-4">
            <AquariumZone isActive={activeZoneId === "aquarium"} isHovered={hoveredZoneId === "aquarium"} />
          </div>
        </button>

      </div>
    </div>
  );
}

