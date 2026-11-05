"use client";

import React from "react";

interface ZoneSvgProps {
  isActive: boolean;
  isHovered: boolean;
}

export default function RideZone({ isActive, isHovered }: ZoneSvgProps) {
  return (
    <svg
      viewBox="0 0 320 260"
      className="w-full h-full overflow-visible transition-transform duration-500 ease-out"
      style={{
        transform: isActive ? "scale(1.04)" : isHovered ? "scale(1.02)" : "scale(1)",
      }}
    >
      <defs>
        {/* Subtle ground shadow */}
        <radialGradient id="rideShadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#000000" stop-opacity="0.6" />
          <stop offset="100%" stop-color="#000000" stop-opacity="0" />
        </radialGradient>
        {/* Matte Red Gradient for Fino Body */}
        <linearGradient id="matteRed" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#C0392B" />
          <stop offset="60%" stop-color="#962D22" />
          <stop offset="100%" stop-color="#641E16" />
        </linearGradient>
        {/* Classic Brown Stitched Leather Seat */}
        <linearGradient id="classicLeather" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#8D6E63" />
          <stop offset="50%" stop-color="#6D4C41" />
          <stop offset="100%" stop-color="#4E342E" />
        </linearGradient>
        {/* Chrome / Metallic Trim */}
        <linearGradient id="chromeTrim" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#F4F0E8" />
          <stop offset="50%" stop-color="#BDC3C7" />
          <stop offset="100%" stop-color="#7F8C8D" />
        </linearGradient>
      </defs>

      {/* 1. Base Garage Plinth (Isometric Slab) */}
      <polygon points="160,180 270,225 160,258 50,225" fill="#142424" stroke="#182A2A" strokeWidth="1.2" />
      <polygon points="50,225 160,258 160,268 50,235" fill="#0A1414" stroke="#182A2A" strokeWidth="1" />
      <polygon points="160,258 270,225 270,235 160,268" fill="#0E1A1A" stroke="#182A2A" strokeWidth="1" />

      {/* Garage Floor Parking Guide Line */}
      <polyline points="90,210 160,238 230,210" fill="none" stroke="#B9F5D8" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
      
      {/* Scooter Ground Shadow */}
      <ellipse cx="160" cy="226" rx="55" ry="14" fill="url(#rideShadow)" />

      {/* 2. Yamaha Fino Grande 125 (Isometric Precision Parts) */}
      {/* Rear Wheel (Metallic Rim + Tire) */}
      <g>
        <ellipse cx="120" cy="208" rx="14" ry="24" fill="#111818" stroke="#7F8C8D" strokeWidth="2.5" />
        <ellipse cx="120" cy="208" rx="8" ry="14" fill="#BDC3C7" />
        <circle cx="120" cy="208" r="3" fill="#111818" />
        {/* Exhaust Muffler Pipe with Chrome Heat Shield */}
        <path d="M 125 214 L 152 202 L 155 208 L 128 220 Z" fill="#2C3E50" />
        <rect x="135" y="202" width="16" height="5" rx="1.5" transform="rotate(-26 135 202)" fill="url(#chromeTrim)" />
      </g>

      {/* Front Wheel */}
      <g>
        <ellipse cx="206" cy="188" rx="13" ry="22" fill="#111818" stroke="#7F8C8D" strokeWidth="2.5" />
        <ellipse cx="206" cy="188" rx="7" ry="12" fill="#BDC3C7" />
        <circle cx="206" cy="188" r="2.5" fill="#111818" />
        {/* Front Telescopic Fork */}
        <line x1="206" y1="188" x2="196" y2="152" stroke="url(#chromeTrim)" strokeWidth="3" strokeLinecap="round" />
      </g>

      {/* Main Scooter Curved Chassis (Matte Red #C0392B) */}
      <path
        d="M 120 195 C 110 175, 130 165, 155 170 C 170 173, 178 185, 185 180 C 190 172, 192 155, 196 142 C 198 136, 186 136, 180 148 C 172 160, 150 160, 132 178 Z"
        fill="url(#matteRed)"
        stroke="#5C1610"
        strokeWidth="1.2"
      />

      {/* Floorboard / Footrest Mat */}
      <polygon points="152,185 180,172 172,168 145,180" fill="#182A2A" stroke="#111818" strokeWidth="1" />

      {/* Classic Brown Stitched Leather Seat */}
      <path
        d="M 124 172 C 122 165, 142 156, 168 158 C 172 163, 162 172, 128 178 Z"
        fill="url(#classicLeather)"
        stroke="#3E2723"
        strokeWidth="1"
      />
      {/* Horizontal Saddle Stitching Accents */}
      <line x1="136" y1="171" x2="140" y2="164" stroke="#D7CCC8" strokeWidth="0.8" opacity="0.75" />
      <line x1="146" y1="168" x2="150" y2="161" stroke="#D7CCC8" strokeWidth="0.8" opacity="0.75" />
      <line x1="156" y1="166" x2="160" y2="160" stroke="#D7CCC8" strokeWidth="0.8" opacity="0.75" />

      {/* Front Apron Shield (Matte Red Curves) */}
      <path
        d="M 182 148 C 185 136, 196 130, 204 142 C 206 156, 198 172, 184 178 Z"
        fill="url(#matteRed)"
        stroke="#641E16"
        strokeWidth="1"
      />

      {/* Distinctive Fino Grande Front Crown Emblem */}
      <polygon points="196,145 198,142 200,145 199,148 197,148" fill="#F1C40F" stroke="#B7950B" strokeWidth="0.5" />

      {/* Diamond-Cut LED Headlight with Silver Chrome Bezel */}
      <polygon points="202,142 208,138 210,144 204,148" fill="#ECF0F1" stroke="url(#chromeTrim)" strokeWidth="1.2" />
      <circle cx="206" cy="143" r="1.8" fill="#B9F5D8" opacity="0.9" />

      {/* Retro Round Chrome Side Mirror */}
      <g>
        <line x1="194" y1="130" x2="190" y2="118" stroke="url(#chromeTrim)" strokeWidth="1.2" />
        <circle cx="190" cy="118" r="3.5" fill="#2C3E50" stroke="url(#chromeTrim)" strokeWidth="1" />
        <circle cx="189" cy="117" r="1.2" fill="#FFFFFF" opacity="0.8" />
      </g>

      {/* Handlebar Grip */}
      <line x1="188" y1="134" x2="198" y2="128" stroke="#182A2A" strokeWidth="2.5" strokeLinecap="round" />

      {/* Small Precision Garage Toolbox / Wall Cabinet in background */}
      <g opacity="0.85">
        <polygon points="90,150 115,138 115,160 90,172" fill="#182A2A" stroke="#253D3D" strokeWidth="0.8" />
        <line x1="90" y1="161" x2="115" y2="149" stroke="#0F1C1C" strokeWidth="0.8" />
        {/* Flare orange handle */}
        <line x1="102" y1="154" x2="105" y2="152" stroke="#FF7043" strokeWidth="1.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

