"use client";

import React from "react";

interface ZoneSvgProps {
  isActive: boolean;
  isHovered: boolean;
}

export default function GardenZone({ isActive, isHovered }: ZoneSvgProps) {
  return (
    <svg
      viewBox="0 0 320 260"
      className="w-full h-full overflow-visible transition-transform duration-500 ease-out"
      style={{
        transform: isActive ? "scale(1.04)" : isHovered ? "scale(1.02)" : "scale(1)",
      }}
    >
      <defs>
        {/* Soft garden shadow */}
        <radialGradient id="gardenShadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#000000" stop-opacity="0.5" />
          <stop offset="100%" stop-color="#000000" stop-opacity="0" />
        </radialGradient>
        {/* Terracotta Planter Gradient */}
        <linearGradient id="terracotta" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#D35400" />
          <stop offset="60%" stop-color="#A04000" />
          <stop offset="100%" stop-color="#6E2C00" />
        </linearGradient>
        {/* Deep Foliage Mint Greens */}
        <linearGradient id="foliageMint" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stop-color="#145A32" />
          <stop offset="60%" stop-color="#27AE60" />
          <stop offset="100%" stop-color="#B9F5D8" />
        </linearGradient>
        <linearGradient id="stemGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stop-color="#1E3F20" />
          <stop offset="100%" stop-color="#52BE80" />
        </linearGradient>
      </defs>

      {/* 1. Base Garden Terrarium Plinth (Stone / Earth Isometric) */}
      <polygon points="160,175 270,225 160,260 50,225" fill="#142424" stroke="#182A2A" strokeWidth="1.2" />
      <polygon points="50,225 160,260 160,270 50,235" fill="#0D1616" stroke="#182A2A" strokeWidth="1" />
      <polygon points="160,260 270,225 270,235 160,270" fill="#111F1F" stroke="#182A2A" strokeWidth="1" />

      {/* Soil / Earth Layer inside Plinth */}
      <polygon points="160,185 250,225 160,252 70,225" fill="#1B120C" stroke="#2E1D13" strokeWidth="1" />

      {/* Scattered Garden River Stones */}
      <ellipse cx="110" cy="235" rx="6" ry="3.5" fill="#3E4A4A" stroke="#253232" strokeWidth="0.6" />
      <ellipse cx="124" cy="240" rx="4" ry="2.5" fill="#5D6D6D" stroke="#3E4A4A" strokeWidth="0.6" />
      <ellipse cx="205" cy="238" rx="8" ry="4.5" fill="#3E4A4A" stroke="#253232" strokeWidth="0.6" />
      <ellipse cx="220" cy="233" rx="5" ry="3" fill="#5D6D6D" stroke="#3E4A4A" strokeWidth="0.6" />

      {/* 2. Main Large Terracotta Pot & Monstera / Ficus Leaf Arrangement */}
      <g>
        <ellipse cx="160" cy="225" rx="28" ry="10" fill="url(#gardenShadow)" />

        {/* Pot Base Body (Isometric Tapered Cylinder) */}
        <polygon points="144,185 176,185 170,222 150,222" fill="url(#terracotta)" stroke="#512E1B" strokeWidth="1" />
        {/* Pot Top Rim */}
        <ellipse cx="160" cy="185" rx="18" ry="7" fill="#E59866" stroke="#A04000" strokeWidth="1" />
        <ellipse cx="160" cy="185" rx="14" ry="5" fill="#2E1D13" />

        {/* Stems branching out */}
        <path d="M 160 185 Q 150 155 130 145" fill="none" stroke="url(#stemGrad)" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 160 185 Q 162 140 160 115" fill="none" stroke="url(#stemGrad)" strokeWidth="3" strokeLinecap="round" />
        <path d="M 160 185 Q 175 150 195 135" fill="none" stroke="url(#stemGrad)" strokeWidth="2.5" strokeLinecap="round" />

        {/* Monstera Cutaway Leaf 1 (Left, gently bobbing) */}
        <path
          d="M 130 145 C 105 130, 95 150, 110 168 C 122 172, 135 162, 130 145 Z"
          fill="url(#foliageMint)"
          stroke="#0E3D1D"
          strokeWidth="0.8"
        />
        {/* Leaf 1 Slit / Fenestration */}
        <path d="M 112 150 L 122 155" stroke="#142424" strokeWidth="1.2" strokeLinecap="round" />

        {/* Top Dominant Broad Leaf (Center upright) */}
        <path
          d="M 160 115 C 140 90, 180 85, 172 110 C 168 122, 162 120, 160 115 Z"
          fill="url(#foliageMint)"
          stroke="#0E3D1D"
          strokeWidth="1"
        />

        {/* Right Architectural Leaf */}
        <path
          d="M 195 135 C 220 120, 228 145, 208 160 C 196 162, 190 150, 195 135 Z"
          fill="url(#foliageMint)"
          stroke="#0E3D1D"
          strokeWidth="0.8"
        />
        <path d="M 212 140 L 202 146" stroke="#142424" strokeWidth="1.2" strokeLinecap="round" />
      </g>

      {/* 3. Small Ceramic Succulent Pot on Left */}
      <g>
        <polygon points="98,206 114,206 111,222 101,222" fill="#2C3E50" stroke="#1A252F" strokeWidth="0.8" />
        <ellipse cx="106" cy="206" rx="9" ry="4" fill="#34495E" />
        {/* Succulent Rosette Petals */}
        <circle cx="106" cy="202" r="6" fill="#B9F5D8" opacity="0.9" />
        <circle cx="103" cy="200" r="3.5" fill="#7DCEA0" />
        <circle cx="109" cy="200" r="3.5" fill="#7DCEA0" />
      </g>

      {/* 4. Mini Craft Watering Can (Mint & Copper) */}
      <g id="watering-can">
        {/* Body Cylindrical isometric prism */}
        <polygon points="214,198 226,192 232,204 220,210" fill="#B9F5D8" stroke="#182A2A" strokeWidth="0.8" />
        <ellipse cx="220" cy="195" rx="7" ry="3.5" fill="#E8F8F5" stroke="#182A2A" strokeWidth="0.6" />
        {/* Spout */}
        <line x1="214" y1="202" x2="200" y2="190" stroke="#FF7043" strokeWidth="1.8" strokeLinecap="round" />
        {/* Rose head */}
        <circle cx="200" cy="190" r="2.5" fill="#F4F0E8" stroke="#FF7043" strokeWidth="0.6" />
        {/* Arched Handle */}
        <path d="M 226 195 Q 236 192 228 208" fill="none" stroke="#FF7043" strokeWidth="1.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

