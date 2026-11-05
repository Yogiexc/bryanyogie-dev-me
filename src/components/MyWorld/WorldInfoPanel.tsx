"use client";

import React from "react";
import { ZoneData } from "./worldData";

interface WorldInfoPanelProps {
  zone: ZoneData;
}

export default function WorldInfoPanel({ zone }: WorldInfoPanelProps) {
  return (
    <div className="w-full bg-[#142424] border border-[#182A2A] rounded-2xl md:rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-[0_15px_35px_rgba(0,0,0,0.5)]">
      <div>
        {/* Sector Metadata Tags */}
        <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-[#182A2A]">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#B9F5D8] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF7043]" />
            {zone.tag}
          </span>
          <span className="text-[11px] font-mono text-[#F4F0E8]/50 uppercase tracking-widest">
            {zone.coord}
          </span>
        </div>

        {/* Title & Subtitle */}
        <h3 className="text-2xl sm:text-3xl font-outfit font-black uppercase tracking-tight text-[#F4F0E8] mb-1">
          {zone.title}
        </h3>
        <p className="text-xs sm:text-sm font-mono text-[#B9F5D8] uppercase tracking-wider mb-4">
          {zone.subtitle}
        </p>

        {/* Narrative Description */}
        <p className="text-sm sm:text-base text-[#F4F0E8]/80 leading-relaxed font-sans mb-6">
          &ldquo;{zone.description}&rdquo;
        </p>

        {/* Detailed Characteristics List */}
        <div className="space-y-2.5 pt-4 border-t border-[#182A2A]">
          <div className="text-[11px] font-mono uppercase tracking-widest text-[#F4F0E8]/50 mb-2">
            Spesifikasi & Karakteristik:
          </div>
          {zone.highlights.map((highlight, index) => (
            <div key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F4F0E8]/90">
              <span className="text-[#B9F5D8] mt-0.5">•</span>
              <span>{highlight}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Pill */}
      <div className="mt-8 pt-4 border-t border-[#182A2A] flex items-center justify-between">
        <span className="text-[11px] font-mono text-[#F4F0E8]/40 uppercase tracking-widest">
          Personal Sanctuary Element
        </span>
        <span className="px-3 py-1 rounded-full bg-[#182A2A] text-[#B9F5D8] text-[11px] font-mono border border-[#B9F5D8]/20">
          {zone.badge}
        </span>
      </div>
    </div>
  );
}

