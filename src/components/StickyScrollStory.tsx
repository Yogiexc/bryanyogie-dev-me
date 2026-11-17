"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Server, Code, Terminal, ArrowUpRight, Cpu } from "lucide-react";
import Image from "next/image";

export default function StickyScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set([".story-header", ".story-card"], { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        ".story-header",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        ".story-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".story-cards-wrapper",
            start: "top 80%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full bg-[#090F0F] py-28 md:py-36 px-6 md:px-12 lg:px-20 border-t border-[#B9F5D8]/10 overflow-hidden" 
      id="about"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header: Editorial & Quiet Luxury */}
        <div className="story-header mb-16 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#B9F5D8]/10 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B9F5D8]" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#B9F5D8] font-semibold">
                02 // BACKGROUND &amp; ENGINEERING PATH
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-outfit font-black uppercase text-[#F4F0E8] tracking-tight leading-[0.95]">
              BEHIND <span className="text-[#B9F5D8]">THE</span> CODE
            </h2>
          </div>
          <p className="text-[#F4F0E8]/70 font-sans text-sm md:text-base max-w-md leading-relaxed border-l border-[#B9F5D8]/30 pl-4">
            A journey from bare-metal network racks and fiber optics to distributed cloud architecture and algorithmic trading systems.
          </p>
        </div>

        {/* Story Journey Grid: Asymmetric, Tactile, Anti-Slop Layout */}
        <div className="story-cards-wrapper grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left Column (7 cols): Editorial Manifesto + Authentic PKL Field Photo */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            
            {/* Card 1: Origin & Philosophy */}
            <div className="story-card bg-[#142424]/90 backdrop-blur-md rounded-3xl border border-[#B9F5D8]/15 hover:border-[#B9F5D8]/40 p-8 sm:p-10 transition-all duration-300 shadow-[0_15px_40px_rgba(0,0,0,0.4)] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#B9F5D8]/10">
                  <span className="font-mono text-xs text-[#B9F5D8] uppercase tracking-wider font-semibold">
                    ORIGIN // 01
                  </span>
                  <span className="text-xs font-mono text-[#F4F0E8]/60">
                    SURAKARTA, INDONESIA
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-outfit font-black text-[#F4F0E8] mb-4 leading-tight">
                  Where Physical Hardware Meets <span className="text-[#B9F5D8]">Scalable Web Systems</span>.
                </h3>

                <p className="text-[#F4F0E8]/75 font-sans text-sm sm:text-base leading-relaxed mb-4">
                  Currently pursuing <strong className="text-[#B9F5D8] font-semibold">Informatics Engineering at Universitas Sebelas Maret (UNS)</strong>. Before writing production fullstack code, my engineering foundations were shaped in Computer &amp; Network Engineering (SMK TKJ) — learning network diagnostic protocols, crimping gigabit lines, and managing physical enterprise routers.
                </p>

                <p className="text-[#F4F0E8]/65 font-sans text-xs sm:text-sm leading-relaxed">
                  Understanding physical hardware gives me an instinct for system bottlenecks, network latency, and memory constraints that pure high-level programmers often overlook.
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-[#B9F5D8]/10 flex flex-wrap items-center gap-4 text-xs font-mono text-[#F4F0E8]/60">
                <span className="text-[#B9F5D8]">• Cisco NetAcad Alum</span>
                <span>• Strict Typings</span>
                <span>• Zero Bloat Philosophy</span>
              </div>
            </div>

            {/* Card 2: Field Archive (Authentic Proof of Work Photo) */}
            <div className="story-card relative rounded-3xl overflow-hidden border border-[#B9F5D8]/15 hover:border-[#B9F5D8]/40 min-h-[300px] sm:min-h-[340px] group transition-all duration-300 shadow-[0_15px_40px_rgba(0,0,0,0.4)]">
              <Image 
                src="/image/pkltkj.webp" 
                alt="Bryan Yogie working on enterprise server rack" 
                fill 
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover filter brightness-[0.78] contrast-105 group-hover:scale-103 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090F0F] via-[#090F0F]/60 to-transparent" />
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <span className="font-mono text-[11px] text-[#B9F5D8] uppercase tracking-widest font-semibold mb-2">
                  ARCHIVE // PKL FIELD WORK
                </span>
                <h4 className="text-xl sm:text-2xl font-outfit font-black text-[#F4F0E8] mb-2 leading-tight">
                  Enterprise Server Racks &amp; Fiber Splicing
                </h4>
                <p className="text-[#F4F0E8]/75 text-xs sm:text-sm font-sans max-w-lg leading-relaxed">
                  Direct hands-on experience in server rooms, rack cabling, and MikroTik routing configurations laid the groundwork for low-latency cloud deployments.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column (5 cols): Focused Deep Dive Cards */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            
            {/* Card 3: Modern Fullstack Architecture */}
            <div className="story-card bg-[#142424]/90 backdrop-blur-md rounded-3xl border border-[#B9F5D8]/15 hover:border-[#B9F5D8]/40 p-8 transition-all duration-300 shadow-[0_15px_40px_rgba(0,0,0,0.4)] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="p-3 rounded-2xl bg-[#182A2A] text-[#B9F5D8] border border-[#B9F5D8]/20">
                    <Code size={22} strokeWidth={1.5} />
                  </div>
                  <span className="font-mono text-[11px] text-[#B9F5D8] tracking-widest uppercase">
                    02 // ARCHITECTURE
                  </span>
                </div>

                <h4 className="text-xl font-outfit font-bold text-[#F4F0E8] mb-3">
                  Production Web Ecosystems
                </h4>

                <p className="text-[#F4F0E8]/70 text-xs sm:text-sm leading-relaxed font-sans mb-6">
                  Building modular web platforms with Next.js App Router, TypeScript, and NestJS/SQL backend microservices. I prioritize component isolation, fast Time-To-Interactive, and deterministic data contracts.
                </p>
              </div>

              <div className="pt-4 border-t border-[#B9F5D8]/10 flex items-center justify-between font-mono text-xs text-[#B9F5D8]">
                <span>Next.js · TypeScript · NestJS</span>
                <ArrowUpRight size={14} />
              </div>
            </div>

            {/* Card 4: Quantitative Automation & Bots */}
            <div className="story-card bg-[#142424]/90 backdrop-blur-md rounded-3xl border border-[#B9F5D8]/15 hover:border-[#B9F5D8]/40 p-8 transition-all duration-300 shadow-[0_15px_40px_rgba(0,0,0,0.4)] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="p-3 rounded-2xl bg-[#182A2A] text-[#B9F5D8] border border-[#B9F5D8]/20">
                    <Terminal size={22} strokeWidth={1.5} />
                  </div>
                  <span className="font-mono text-[11px] text-[#B9F5D8] tracking-widest uppercase">
                    03 // AUTOMATION
                  </span>
                </div>

                <h4 className="text-xl font-outfit font-bold text-[#F4F0E8] mb-3">
                  Algorithmic Execution &amp; Quant
                </h4>

                <p className="text-[#F4F0E8]/70 text-xs sm:text-sm leading-relaxed font-sans mb-6">
                  Designing automated trading algorithms and execution engines with Python and MetaTrader 5 API. Strict risk parameters, data logging, and low-latency order dispatching.
                </p>
              </div>

              <div className="pt-4 border-t border-[#B9F5D8]/10 flex items-center justify-between font-mono text-xs text-[#B9F5D8]">
                <span>Python · MT5 API · WebSocket</span>
                <ArrowUpRight size={14} />
              </div>
            </div>

            {/* Card 5: Core Engineering Values */}
            <div className="story-card bg-[#142424]/90 backdrop-blur-md rounded-3xl border border-[#B9F5D8]/15 hover:border-[#B9F5D8]/40 p-8 transition-all duration-300 shadow-[0_15px_40px_rgba(0,0,0,0.4)]">
              <div className="flex items-center gap-3 mb-4">
                <Cpu size={18} className="text-[#B9F5D8]" />
                <span className="font-mono text-xs uppercase tracking-wider text-[#F4F0E8] font-bold">
                  Core Craft Principle
                </span>
              </div>
              <p className="text-[#F4F0E8]/75 text-xs sm:text-sm italic font-sans leading-relaxed">
                &ldquo;Master the physical metal so you understand the cloud. Keep code deterministic, interfaces tactile, and eliminate unnecessary complexity.&rdquo;
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
