"use client";

import React from "react";

interface ZoneSvgProps {
  isActive: boolean;
  isHovered: boolean;
}

export default function AviaryZone({ isActive, isHovered }: ZoneSvgProps) {
  return (
    <svg
      viewBox="0 0 320 260"
      className="w-full h-full overflow-visible transition-transform duration-500 ease-out"
      style={{
        transform: isActive ? "scale(1.04)" : isHovered ? "scale(1.02)" : "scale(1)",
      }}
    >
      <defs>
        {/* Soft aviary ground shadow */}
        <radialGradient id="aviaryShadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#000000" stop-opacity="0.5" />
          <stop offset="100%" stop-color="#000000" stop-opacity="0" />
        </radialGradient>
        {/* Wooden Perch Gradient */}
        <linearGradient id="perchWood" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#A0522D" />
          <stop offset="60%" stop-color="#6E3A1C" />
          <stop offset="100%" stop-color="#3D1E0C" />
        </linearGradient>
        {/* Bird Feather Mint/Azure Gradient */}
        <linearGradient id="birdFeather1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#B9F5D8" />
          <stop offset="60%" stop-color="#48C9B0" />
          <stop offset="100%" stop-color="#117864" />
        </linearGradient>
        {/* Bird Feather Warm Flare Gradient */}
        <linearGradient id="birdFeather2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#F9E79F" />
          <stop offset="50%" stop-color="#FF7043" />
          <stop offset="100%" stop-color="#C0392B" />
        </linearGradient>
      </defs>

      {/* 1. Base Sanctuary Plinth (Architectural Isometric Pavilion) */}
      <polygon points="160,175 270,225 160,260 50,225" fill="#142424" stroke="#182A2A" strokeWidth="1.2" />
      <polygon points="50,225 160,260 160,270 50,235" fill="#0A1515" stroke="#182A2A" strokeWidth="1" />
      <polygon points="160,260 270,225 270,235 160,270" fill="#0F1F1F" stroke="#182A2A" strokeWidth="1" />

      {/* Clean sand/gravel aviary flooring */}
      <polygon points="160,183 252,225 160,253 68,225" fill="#182A2A" stroke="#253D3D" strokeWidth="0.8" />
      <ellipse cx="160" cy="226" rx="60" ry="14" fill="url(#aviaryShadow)" />

      {/* 2. Architectural Minimalist Open Aviary Stand (Four Polished Wooden Pillars & Canopy Ring) */}
      {/* Back Support Pillar */}
      <line x1="160" y1="185" x2="160" y2="90" stroke="url(#perchWood)" strokeWidth="3" strokeLinecap="round" />
      {/* Left Pillar */}
      <line x1="105" y1="210" x2="105" y2="115" stroke="url(#perchWood)" strokeWidth="2.5" strokeLinecap="round" />
      {/* Right Pillar */}
      <line x1="215" y1="210" x2="215" y2="115" stroke="url(#perchWood)" strokeWidth="2.5" strokeLinecap="round" />

      {/* Top Geometric Pavilion Dome Ring */}
      <ellipse cx="160" cy="100" rx="58" ry="18" fill="none" stroke="#B9F5D8" strokeWidth="1.2" opacity="0.4" />
      <ellipse cx="160" cy="100" rx="42" ry="13" fill="none" stroke="#FF7043" strokeWidth="0.8" opacity="0.3" strokeDasharray="3 3" />

      {/* Cross Branch Wooden Perch (The Main Perch) */}
      <g>
        {/* Horizontal Branch Bar */}
        <path d="M 112 145 Q 160 148 208 140" fill="none" stroke="url(#perchWood)" strokeWidth="4.5" strokeLinecap="round" />
        
        {/* Natural bark knots */}
        <circle cx="135" cy="146" r="2" fill="#2E1D13" />
        <circle cx="188" cy="142" r="1.8" fill="#2E1D13" />
      </g>

      {/* 3. Primary Songbird (Singing on Perch Center) */}
      <g id="songbird-main">
        {/* Claws gripping branch */}
        <line x1="156" y1="147" x2="157" y2="149" stroke="#E67E22" strokeWidth="1.5" />
        <line x1="162" y1="147" x2="163" y2="149" stroke="#E67E22" strokeWidth="1.5" />

        {/* Tail Feathers */}
        <path d="M 152 144 L 140 162 L 146 162 Z" fill="#117864" stroke="#0E6251" strokeWidth="0.5" />
        
        {/* Plump Body (Isometric Side-3/4 View) */}
        <ellipse cx="160" cy="136" rx="10" ry="13" transform="rotate(-18 160 136)" fill="url(#birdFeather1)" stroke="#0E6251" strokeWidth="0.8" />
        
        {/* Folded Wing Covert */}
        <path d="M 154 133 C 152 125, 166 128, 164 142 Z" fill="#148F77" stroke="#0B5345" strokeWidth="0.6" />

        {/* Head */}
        <circle cx="168" cy="126" r="6" fill="#A2D9CE" stroke="#16A085" strokeWidth="0.8" />
        {/* Intelligent Shiny Eye */}
        <circle cx="169" cy="125" r="1.3" fill="#111818" />
        <circle cx="169.3" cy="124.7" r="0.4" fill="#FFFFFF" />
        {/* Tiny Sharp Beak */}
        <polygon points="174,126 179,127 174,129" fill="#F39C12" stroke="#B9770E" strokeWidth="0.4" />
      </g>

      {/* 4. Second Bird (Small Finch on Lower Left Twig) */}
      <g id="songbird-secondary">
        {/* Lower Perch extension */}
        <line x1="105" y1="175" x2="128" y2="170" stroke="url(#perchWood)" strokeWidth="2.5" strokeLinecap="round" />
        
        {/* Finch Body (Warm Flare tones) */}
        <ellipse cx="120" cy="165" rx="6.5" ry="8.5" fill="url(#birdFeather2)" stroke="#922B21" strokeWidth="0.6" />
        {/* Head */}
        <circle cx="124" cy="158" r="4.2" fill="#FAD7A0" stroke="#D35400" strokeWidth="0.5" />
        <circle cx="125" cy="157" r="0.9" fill="#111818" />
        <polygon points="128,158 132,159 128,160" fill="#E67E22" />
        {/* Tail */}
        <line x1="114" y1="170" x2="108" y2="178" stroke="#922B21" strokeWidth="1.5" />
      </g>

      {/* 5. Ceramic Feeder & Fresh Water Trough */}
      {/* Water Fountain Bowl */}
      <g>
        <polygon points="190,185 204,178 214,188 200,195" fill="#1B2631" stroke="#2C3E50" strokeWidth="0.8" />
        <ellipse cx="202" cy="186" rx="9" ry="4.5" fill="#34495E" />
        {/* Clean Water Surface Reflection */}
        <ellipse cx="202" cy="186" rx="7.5" ry="3.2" fill="#B9F5D8" opacity="0.75" />
      </g>

      {/* Seed Feeder Cup */}
      <g>
        <ellipse cx="92" cy="195" rx="7" ry="3.5" fill="#2E1D13" stroke="#512E1B" strokeWidth="0.6" />
        <polygon points="85,195 99,195 97,205 87,205" fill="#5D4037" stroke="#3E2723" strokeWidth="0.6" />
        {/* Golden Millet Seeds */}
        <circle cx="90" cy="194" r="0.9" fill="#F1C40F" />
        <circle cx="93" cy="195" r="0.9" fill="#F39C12" />
        <circle cx="95" cy="194" r="0.9" fill="#F1C40F" />
      </g>
    </svg>
  );
}

