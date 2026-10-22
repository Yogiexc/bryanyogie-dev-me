"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // We could add entry animations for the footer here
  }, []);

  return (
    <footer ref={containerRef} className="relative w-full bg-[#090f0f] pt-24 pb-8 px-6 md:px-12 lg:px-24 border-t border-mint/20" id="contact">
      <div className="flex flex-col items-center text-center mb-32">
        <h2 className="text-5xl md:text-8xl lg:text-[8vw] font-outfit font-black tracking-tighter uppercase leading-[0.9] text-[#f4f0e8] mb-12 max-w-6xl">
          Let’s build something <span className="text-flare italic">unforgettable.</span>
        </h2>
        
        <a 
          href="mailto:bryanyogie@student.ac.id.com"
          className="group flex items-center gap-4 bg-mint text-cinder px-8 py-4 md:px-12 md:py-6 rounded-full font-outfit font-black text-xl md:text-3xl hover:bg-flare hover:text-white transition-all duration-300 shadow-[0_0_30px_rgba(185,245,216,0.3)] hover:shadow-[0_0_40px_rgba(255,112,67,0.5)]"
          data-cursor-hover="true"
        >
          Get in touch
          <ArrowUpRight className="group-hover:rotate-45 transition-transform duration-300" size={32} />
        </a>
      </div>

      <div className="w-full h-[1px] bg-mint/20 mb-8 relative overflow-hidden">
        {/* Animated accent gradient line */}
        <div className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-mint to-transparent animate-pulse" />
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[#f4f0e8]/60 font-mono text-sm">
        <div className="flex items-center gap-6">
          <a href="https://github.com/Yogiexc" target="_blank" rel="noreferrer" className="hover:text-mint transition-colors">GitHub</a>
          <a href="https://www.linkedin.com/in/bryan-yogie-saputra-264306270" target="_blank" rel="noreferrer" className="hover:text-mint transition-colors">LinkedIn</a>
          <a href="https://instagram.com/yogiexct" target="_blank" rel="noreferrer" className="hover:text-mint transition-colors">Instagram</a>
        </div>
        
        <div className="flex items-center gap-2">
          <span>&copy; {new Date().getFullYear()} Bryan Yogie Saputra. All rights reserved.</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-mint animate-pulse" />
          <span className="text-mint font-semibold">Available for freelance</span>
        </div>
      </div>
    </footer>
  );
}
