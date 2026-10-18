"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Magnetic from "@/components/Magnetic";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 50) {
        setIsScrolled(false);
      } else if (currentScrollY > lastScrollY) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-12 lg:px-24 py-8 transition-transform duration-500 ease-in-out mix-blend-difference ${
        isScrolled ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="flex-1">
        <Magnetic>
          <Link 
            href="/" 
            className="group flex items-center gap-3 text-white font-outfit font-black text-2xl tracking-widest uppercase hover:text-accent transition-colors w-fit"
          >
            <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-white/20 shadow-[0_0_15px_rgba(185,245,216,0.3)] group-hover:scale-105 transition-transform">
              <img 
                src="/favicon-32x32.png" 
                alt="BYS Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <span>BYS<span className="text-[#FF7043]">.</span></span>
          </Link>
        </Magnetic>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        <Magnetic>
          <a 
            href="https://github.com/Yogiexc" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-accent transition-colors block"
            aria-label="GitHub"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
          </a>
        </Magnetic>

        <Magnetic>
          <a 
            href="https://instagram.com/yogiexct" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-accent transition-colors block"
            aria-label="Instagram"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          </a>
        </Magnetic>

        <Magnetic>
          <a 
            href="https://www.linkedin.com/in/bryan-yogie-saputra-264306270" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-accent transition-colors block"
            aria-label="LinkedIn"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
        </Magnetic>

        <Magnetic>
          <a 
            href="https://youtube.com/@bryanyogiexc" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-accent transition-colors block"
            aria-label="YouTube"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
          </a>
        </Magnetic>
      </div>
    </nav>
  );
}
