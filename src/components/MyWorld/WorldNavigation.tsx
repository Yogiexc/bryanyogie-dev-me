"use client";

import React from "react";
import { ZONES, ZoneData } from "./worldData";

interface WorldNavigationProps {
  activeZoneId: ZoneData["id"];
  onSelectZone: (id: ZoneData["id"]) => void;
  onResetView: () => void;
}

export default function WorldNavigation({
  activeZoneId,
  onSelectZone,
  onResetView,
}: WorldNavigationProps) {
  return (
    <div className="w-full flex flex-wrap items-center justify-between gap-3 py-4 border-b border-[#182A2A]">
      {/* Zone Switcher Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {ZONES.map((zone) => {
          const isActive = activeZoneId === zone.id;
          return (
            <button
              key={zone.id}
              type="button"
              onClick={() => onSelectZone(zone.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-300 flex items-center gap-2 ${
                isActive
                  ? "bg-[#B9F5D8] text-[#090F0F] font-bold shadow-[0_0_15px_rgba(185,245,216,0.3)]"
                  : "bg-[#142424] text-[#F4F0E8]/70 hover:text-[#F4F0E8] border border-[#182A2A] hover:border-[#B9F5D8]/40"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isActive ? "bg-[#FF7043]" : "bg-[#B9F5D8]/40"
                }`}
              />
              <span>{zone.title}</span>
            </button>
          );
        })}
      </div>

      {/* Overview / Reset Control */}
      <button
        type="button"
        onClick={onResetView}
        className="text-xs font-mono uppercase tracking-widest text-[#F4F0E8]/50 hover:text-[#B9F5D8] transition-colors flex items-center gap-1.5 py-1 px-2.5 rounded-lg hover:bg-[#142424]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="m4.93 4.93 4.24 4.24"/>
          <path d="m14.83 9.17 4.24-4.24"/>
          <path d="m14.83 14.83 4.24 4.24"/>
          <path d="m9.17 14.83-4.24 4.24"/>
        </svg>
        <span>Lihat Semua Zona</span>
      </button>
    </div>
  );
}

