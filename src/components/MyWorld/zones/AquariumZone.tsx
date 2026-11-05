"use client";

import React from "react";

interface ZoneSvgProps {
  isActive: boolean;
  isHovered: boolean;
}

export default function AquariumZone({ isActive, isHovered }: ZoneSvgProps) {
  return (
    <svg
      viewBox="0 0 320 260"
      className="w-full h-full overflow-visible transition-transform duration-500 ease-out"
      style={{
        transform: isActive ? "scale(1.04)" : isHovered ? "scale(1.02)" : "scale(1)",
      }}
    >
      <defs>
        {/* Soft shadow */}
        <radialGradient id="aquaShadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#000000" stop-opacity="0.6" />
          <stop offset="100%" stop-color="#000000" stop-opacity="0" />
        </radialGradient>
        {/* Luminous Clean Aquatic Water Gradient */}
        <linearGradient id="aquaticWater" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#113333" stop-opacity="0.8" />
          <stop offset="60%" stop-color="#0E2828" stop-opacity="0.85" />
          <stop offset="100%" stop-color="#0A1D1D" stop-opacity="0.95" />
        </linearGradient>
        {/* Water Surface Shimmer */}
        <linearGradient id="waterSurface" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#B9F5D8" stop-opacity="0.5" />
          <stop offset="50%" stop-color="#E8F8F5" stop-opacity="0.7" />
          <stop offset="100%" stop-color="#76D7C4" stop-opacity="0.5" />
        </linearGradient>
        {/* Flare Neon Betta / Tetra Fish Gradient */}
        <linearGradient id="fishGlow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#FF7043" />
          <stop offset="50%" stop-color="#FF5722" />
          <stop offset="100%" stop-color="#B9F5D8" />
        </linearGradient>
      </defs>

      {/* 1. Base Pedestal Plinth (Isometric Furniture Stand) */}
      <polygon points="160,175 270,225 160,260 50,225" fill="#142424" stroke="#182A2A" strokeWidth="1.2" />
      <polygon points="50,225 160,260 160,270 50,235" fill="#0A1414" stroke="#182A2A" strokeWidth="1" />
      <polygon points="160,260 270,225 270,235 160,270" fill="#0E1B1B" stroke="#182A2A" strokeWidth="1" />

      {/* Plinth Shadow */}
      <ellipse cx="160" cy="226" rx="60" ry="14" fill="url(#aquaShadow)" />

      {/* Aquarium Protective Foam Base Mat */}
      <polygon points="160,165 240,205 160,238 80,205" fill="#090F0F" stroke="#182A2A" strokeWidth="0.8" />

      {/* 2. Glass Rimless Tank Back Faces & Interior Volume */}
      {/* Substrate / Dark Aquasoil Layer */}
      <polygon points="160,195 236,201 160,234 84,201" fill="#1A1816" stroke="#2C2724" strokeWidth="0.8" />
      
      {/* Water Volume Body (Translucent Deep Emerald) */}
      <polygon points="160,105 236,145 236,201 160,234 84,201 84,145" fill="url(#aquaticWater)" />

      {/* Water Surface Plane (Top Shimmer) */}
      <polygon points="160,105 236,145 160,176 84,145" fill="url(#waterSurface)" stroke="#B9F5D8" strokeWidth="0.8" strokeOpacity="0.8" />

      {/* 3. Aquascape Hardscape & Underwater Botanicals */}
      {/* Seiryu Stone Cluster */}
      <g>
        {/* Main Jagged Rock */}
        <polygon points="135,160 148,152 155,185 130,195 125,180" fill="#2C3E50" stroke="#1A252F" strokeWidth="0.7" />
        <polygon points="148,152 155,185 165,182 160,158" fill="#34495E" stroke="#1A252F" strokeWidth="0.6" />
        {/* Mineral Strata Streaks */}
        <line x1="134" y1="170" x2="152" y2="162" stroke="#BDC3C7" strokeWidth="0.6" opacity="0.6" />
        
        {/* Secondary Supporting Stone */}
        <polygon points="170,178 185,170 190,190 172,196" fill="#1C2833" stroke="#111818" strokeWidth="0.6" />
      </g>

      {/* Lush Aquatic Stem Plants (Rotala / Anubias) */}
      <g stroke="#2ECC71" strokeWidth="1.2" fill="none">
        {/* Plant Stem 1 */}
        <path d="M 115 195 Q 110 165 118 140" strokeLinecap="round" />
        <path d="M 115 170 Q 106 166 108 160" stroke="#B9F5D8" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 116 155 Q 124 150 122 144" stroke="#B9F5D8" strokeWidth="1.5" strokeLinecap="round" />

        {/* Plant Stem 2 */}
        <path d="M 195 190 Q 205 165 198 138" strokeLinecap="round" />
        <path d="M 198 165 Q 206 160 205 154" stroke="#7DCEA0" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 196 150 Q 188 146 190 140" stroke="#7DCEA0" strokeWidth="1.5" strokeLinecap="round" />
      </g>

      {/* 4. Elegant Fish Swimming Across Tank */}
      {/* Primary Red & Mint Betta/Neon Tetra */}
      <g id="fish-primary">
        {/* Slender Sleek Body */}
        <ellipse cx="145" cy="148" rx="11" ry="4.5" transform="rotate(-8 145 148)" fill="url(#fishGlow)" />
        {/* Flowing Tail Fin */}
        <path d="M 134 149 Q 120 142 118 156 Q 128 152 135 151 Z" fill="#FF7043" opacity="0.9" />
        {/* Dorsal Fin */}
        <path d="M 142 144 Q 146 138 150 143 Z" fill="#B9F5D8" opacity="0.8" />
        {/* Eye */}
        <circle cx="152" cy="147" r="0.9" fill="#F4F0E8" />
      </g>

      {/* Secondary Schooling Nano Fish */}
      <g id="fish-secondary">
        <ellipse cx="178" cy="135" rx="6" ry="2" fill="#B9F5D8" opacity="0.9" />
        <polygon points="172,135 168,132 168,138" fill="#FF7043" opacity="0.85" />
      </g>

      {/* 5. Rising Oxygen Air Bubbles */}
      <g fill="#B9F5D8" opacity="0.6">
        <circle cx="138" cy="178" r="1.5" />
        <circle cx="140" cy="162" r="1.2" />
        <circle cx="137" cy="145" r="1.8" />
        <circle cx="141" cy="128" r="1.2" />
        <circle cx="139" cy="114" r="1.6" />
      </g>

      {/* 6. Ultra-Clear Rimless Glass Edges & Reflections */}
      {/* Front Left Glass Edge */}
      <line x1="84" y1="145" x2="84" y2="201" stroke="#B9F5D8" strokeWidth="1.5" strokeOpacity="0.85" />
      {/* Front Center Corner Glass Seam */}
      <line x1="160" y1="176" x2="160" y2="234" stroke="#B9F5D8" strokeWidth="1.8" strokeOpacity="0.9" />
      {/* Front Right Glass Edge */}
      <line x1="236" y1="145" x2="236" y2="201" stroke="#B9F5D8" strokeWidth="1.5" strokeOpacity="0.85" />
      {/* Bottom Front Edges */}
      <line x1="84" y1="201" x2="160" y2="234" stroke="#B9F5D8" strokeWidth="1.2" strokeOpacity="0.7" />
      <line x1="160" y1="234" x2="236" y2="201" stroke="#B9F5D8" strokeWidth="1.2" strokeOpacity="0.7" />

      {/* Top Glass Perimeter Rim */}
      <polygon points="160,105 236,145 160,176 84,145" fill="none" stroke="#F4F0E8" strokeWidth="0.8" strokeOpacity="0.6" />

      {/* Clean Diagonal Glass Reflection Stripe */}
      <polygon points="100,165 115,160 145,215 130,220" fill="#FFFFFF" opacity="0.04" />
      <polygon points="180,185 195,180 220,210 205,215" fill="#FFFFFF" opacity="0.04" />
    </svg>
  );
}

