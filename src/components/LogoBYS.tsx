import React from "react";

export default function LogoBYS({ className = "w-8 h-8", glow = true }: { className?: string; glow?: boolean }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} overflow-visible transition-transform duration-300 group-hover:scale-105`}
    >
      <defs>
        {/* Mint Neon Glow */}
        <filter id="bysMintGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#B9F5D8" floodOpacity="0.45" />
        </filter>
        {/* Flare Dot Glow */}
        <filter id="bysFlareGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#FF7043" floodOpacity="0.6" />
        </filter>
        <linearGradient id="bysStemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F4F0E8" />
          <stop offset="100%" stopColor="#B9F5D8" />
        </linearGradient>
      </defs>

      {/* Outer Hex / Architectural Diamond Shield (Ultra subtle) */}
      <rect
        x="2"
        y="2"
        width="36"
        height="36"
        rx="10"
        fill="#142424"
        stroke="#182A2A"
        strokeWidth="1.2"
        className="group-hover:stroke-[#B9F5D8]/40 transition-colors duration-300"
      />

      {/* Precision Geometric Monogram: B - Y - S Fusion */}
      {/* 1. Main Left Structural Spine */}
      <path
        d="M12 9V31"
        stroke="url(#bysStemGrad)"
        strokeWidth="2.8"
        strokeLinecap="round"
      />

      {/* 2. Upper B-Curve bridging into Y diagonal */}
      <path
        d="M12 11H21C24 11 26 13 26 15.5C26 18 24 20 21 20H13.5"
        stroke="#F4F0E8"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 3. Lower S / Y Architectural Flow terminating into Mint Apex */}
      <path
        d="M16 20H22C25.5 20 27.5 22.5 27.5 25.5C27.5 28.5 25 31 21 31H12"
        stroke="#B9F5D8"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter={glow ? "url(#bysMintGlow)" : undefined}
      />

      {/* 4. The Precision Engineering Core Point (Flare Orange Accent) */}
      <circle
        cx="21"
        cy="20"
        r="2"
        fill="#FF7043"
        filter={glow ? "url(#bysFlareGlow)" : undefined}
      />
    </svg>
  );
}
