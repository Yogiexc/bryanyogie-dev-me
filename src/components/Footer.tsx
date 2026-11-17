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
    <footer ref={containerRef} className="relative w-full bg-[#6E536F] pt-20 md:pt-28 pb-12 px-6 md:px-12 lg:px-24 border-t border-[#4D354E]" id="contact">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-20 md:mb-28">
          <h2 className="text-3xl sm:text-5xl md:text-7xl lg:text-[6.5vw] font-outfit font-black tracking-tight uppercase leading-[0.98] text-[#FDF8F0] mb-8 max-w-5xl text-balance">
            Let’s build something <span className="text-[#FF7043] italic font-serif">unforgettable.</span>
          </h2>
          
          <a 
            href="mailto:bryanyogie@student.uns.ac.id"
            className="group flex items-center gap-3 bg-[#93F1E3] text-[#6E536F] px-8 py-4 sm:px-10 sm:py-5 rounded-full font-outfit font-bold text-base sm:text-xl hover:bg-[#FF7043] hover:text-white transition-colors duration-300 shadow-lg min-h-[48px]"
          >
            Get in touch
            <ArrowUpRight className="group-hover:rotate-45 transition-transform duration-300 w-5 h-5 sm:w-6 sm:h-6" />
          </a>
        </div>

        <div className="w-full h-[1px] bg-[#4D354E] mb-8 relative" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[#FDF8F0]/60 font-mono text-xs sm:text-sm">
          <div className="flex items-center gap-6">
            <a href="https://github.com/Yogiexc" target="_blank" rel="noreferrer" className="hover:text-[#93F1E3] transition-colors min-h-[44px] flex items-center">GitHub</a>
            <a href="https://www.linkedin.com/in/bryan-yogie-saputra-264306270" target="_blank" rel="noreferrer" className="hover:text-[#93F1E3] transition-colors min-h-[44px] flex items-center">LinkedIn</a>
            <a href="https://instagram.com/yogiexct" target="_blank" rel="noreferrer" className="hover:text-[#93F1E3] transition-colors min-h-[44px] flex items-center">Instagram</a>
          </div>
          
          <div className="flex items-center gap-2 text-center">
            <span>&copy; {new Date().getFullYear()} Bryan Yogie Saputra. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#93F1E3]" />
            <span className="text-[#93F1E3] font-semibold">Available for collaboration</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
