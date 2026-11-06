"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Terminal, Cpu, Network, ShieldCheck, Sparkles, Layers, ArrowUpRight, Compass, Code2 } from "lucide-react";
import Image from "next/image";

export default function StickyScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header entrance animation
      gsap.fromTo(
        ".story-header",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );

      // Bento cards staggered entrance
      gsap.fromTo(
        ".bento-card",
        { opacity: 0, y: 50, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".bento-grid",
            start: "top 75%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full bg-[#0D1717] py-24 md:py-32 px-6 md:px-12 lg:px-24 border-t border-[#182A2A] overflow-hidden" 
      id="about"
    >
      {/* Subtle architectural background grid & radial ambiance */}
      <div className="absolute inset-0 bg-[radial-gradient(#182A2A_1px,transparent_1px)] [background-size:28px_28px] opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#B9F5D8]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="story-header mb-14 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#182A2A] pb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#FF7043] inline-block animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#B9F5D8] font-semibold flex items-center gap-1.5">
                02 // Engineering Biography & Philosophy
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-outfit font-black uppercase text-[#F4F0E8] tracking-tight leading-[0.95]">
              BEHIND <span className="text-[#B9F5D8]">THE</span> CODE
            </h2>
          </div>
          <p className="text-[#F4F0E8]/70 font-sans text-sm md:text-base max-w-md leading-relaxed border-l-2 border-[#B9F5D8]/30 pl-4">
            Bridging hardware network infrastructure with high-scale fullstack web architectures and quantitative systems.
          </p>
        </div>

        {/* High-End Bento Architecture Grid */}
        <div className="bento-grid grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {/* 1. Main Manifesto Hero Card (Large 2-col) */}
          <div className="bento-card md:col-span-2 lg:col-span-2 bg-[#142424] rounded-2xl border border-[#182A2A] hover:border-[#B9F5D8]/50 p-7 md:p-9 flex flex-col justify-between relative overflow-hidden transition-all duration-300 shadow-[0_15px_35px_rgba(0,0,0,0.5)] group">
            {/* Massive Background Index Number */}
            <span className="absolute -top-6 -right-3 text-[140px] font-outfit font-black text-white/[0.02] select-none pointer-events-none group-hover:text-[#B9F5D8]/[0.05] transition-colors duration-500">
              01
            </span>
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#B9F5D8]/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[#B9F5D8]/10 transition-colors duration-500" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-[11px] text-[#B9F5D8] uppercase tracking-widest font-bold px-3 py-1 rounded-full bg-[#B9F5D8]/10 border border-[#B9F5D8]/20">
                  SECTION 01 // ORIGIN DOSSIER
                </span>
                <span className="text-xs font-mono text-[#FF7043] font-bold px-2 py-0.5 rounded bg-[#FF7043]/10 border border-[#FF7043]/20">
                  UNS SURAKARTA
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-outfit font-black text-[#F4F0E8] mb-4 tracking-tight leading-tight">
                Where Physical Hardware Meets <span className="text-[#B9F5D8]">Modern Distributed Systems</span>.
              </h3>
              <p className="text-[#F4F0E8]/75 font-sans text-sm sm:text-base leading-relaxed mb-6">
                Currently pursuing <strong className="text-[#B9F5D8] font-semibold">Informatics Engineering</strong> at Universitas Sebelas Maret (UNS). My engineering instincts were forged deep in Computer &amp; Network Engineering (TKJ) — diagnosing physical router topologies, crimping gigabit lines, and building bare-metal networks before architecting production cloud code.
              </p>
            </div>

            <div className="relative z-10 pt-6 border-t border-[#182A2A] flex flex-wrap items-center gap-4 text-xs font-mono text-[#F4F0E8]/70">
              <span className="flex items-center gap-1.5 text-[#B9F5D8]">
                <ShieldCheck size={16} /> Cisco NetAcad Certified
              </span>
              <span className="text-[#182A2A]">•</span>
              <span className="flex items-center gap-1.5 text-[#FF7043]">
                <Cpu size={16} /> IoT &amp; Embedded Systems
              </span>
              <span className="text-[#182A2A]">•</span>
              <span className="flex items-center gap-1.5 text-[#F4F0E8]">
                <Layers size={16} /> Monorepo Scalability
              </span>
            </div>
          </div>

          {/* 2. Visual Photo Feature Card (TKJ Hardware Roots) */}
          <div className="bento-card md:col-span-1 lg:col-span-2 bg-[#142424] rounded-2xl border border-[#182A2A] hover:border-[#B9F5D8]/50 overflow-hidden relative group transition-all duration-500 min-h-[320px] shadow-[0_15px_35px_rgba(0,0,0,0.5)]">
            <span className="absolute top-4 right-5 z-20 font-mono text-[11px] text-[#B9F5D8] bg-[#090F0F]/80 backdrop-blur-md px-3 py-1 rounded-full border border-[#B9F5D8]/30">
              FIELD ARCHIVE // PKL TKJ
            </span>
            <Image 
              src="/image/pkltkj.webp" 
              alt="Hardware Networking Roots" 
              fill 
              className="object-cover filter brightness-[0.72] contrast-105 group-hover:brightness-95 group-hover:scale-105 transition-all duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090F0F] via-[#090F0F]/50 to-transparent" />
            
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <span className="font-mono text-xs text-[#FF7043] uppercase tracking-widest font-semibold mb-2">
                INFRASTRUCTURE FOUNDATIONS
              </span>
              <h4 className="text-xl md:text-2xl font-outfit font-black text-[#F4F0E8] mb-2 leading-tight">
                Enterprise Network Racks &amp; Fiber Splicing
              </h4>
              <p className="text-[#F4F0E8]/80 text-xs md:text-sm font-sans line-clamp-2">
                Hands-on server infrastructure and routing topology created the foundation for high-throughput, low-latency fullstack cloud software.
              </p>
            </div>
          </div>

          {/* 3. Engineering Philosophy & Execution */}
          <div className="bento-card md:col-span-1 lg:col-span-1 bg-[#142424] rounded-2xl border border-[#182A2A] hover:border-[#FF7043]/50 p-8 flex flex-col justify-between group transition-all duration-500 shadow-[0_15px_35px_rgba(0,0,0,0.5)] relative overflow-hidden">
            <span className="absolute -bottom-6 -right-3 text-[110px] font-outfit font-black text-white/[0.02] select-none pointer-events-none group-hover:text-[#FF7043]/[0.05] transition-colors duration-500">
              02
            </span>
            <div className="relative z-10">
              <div className="p-3 w-fit rounded-xl bg-[#FF7043]/10 border border-[#FF7043]/30 text-[#FF7043] mb-6 shadow-[0_0_15px_rgba(255,112,67,0.15)]">
                <Terminal size={22} />
              </div>
              <span className="font-mono text-xs text-[#B9F5D8] uppercase tracking-widest font-bold block mb-2">
                02 // PHILOSOPHY
              </span>
              <h4 className="text-xl font-outfit font-black text-[#F4F0E8] mb-3">
                Relentless Problem Solving
              </h4>
              <p className="text-[#F4F0E8]/70 text-xs md:text-sm leading-relaxed font-sans">
                Every bug is diagnostic telemetry; every constraint is an optimization parameter. Strict types, deterministic state, and zero bloat.
              </p>
            </div>
            <div className="relative z-10 mt-6 pt-4 border-t border-[#182A2A] font-mono text-[11px] text-[#FF7043]">
              // Continuous Growth Mindset
            </div>
          </div>

          {/* 4. Fullstack Mastery Stack */}
          <div className="bento-card md:col-span-2 lg:col-span-2 bg-[#142424] rounded-2xl border border-[#182A2A] hover:border-[#B9F5D8]/50 p-8 flex flex-col justify-between group transition-all duration-500 shadow-[0_15px_35px_rgba(0,0,0,0.5)] relative overflow-hidden">
            <span className="absolute -top-6 -right-3 text-[140px] font-outfit font-black text-white/[0.02] select-none pointer-events-none group-hover:text-[#B9F5D8]/[0.05] transition-colors duration-500">
              03
            </span>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-xs text-[#B9F5D8] uppercase tracking-widest font-bold px-3 py-1 rounded-full bg-[#B9F5D8]/10 border border-[#B9F5D8]/20">
                  03 // CORE TECHNICAL STACK
                </span>
                <Code2 size={20} className="text-[#B9F5D8]" />
              </div>
              <h4 className="text-xl md:text-2xl font-outfit font-black text-[#F4F0E8] mb-3">
                Production Fullstack &amp; Microservice Tooling
              </h4>
              <p className="text-[#F4F0E8]/75 text-xs md:text-sm leading-relaxed mb-6 font-sans">
                Expertise in rapid modern web engineering using Next.js App Router, TypeScript, and Tailwind CSS on frontend; paired with clean backend architectures in NestJS, PHP, Java, and MySQL/PostgreSQL relational engines.
              </p>
            </div>

            <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#182A2A]">
              {[
                { name: "Next.js 16 App Router", type: "Frontend" },
                { name: "TypeScript & React", type: "Type Logic" },
                { name: "NestJS / Prisma", type: "Backend API" },
                { name: "Tailwind & GSAP", type: "UI Motion" },
              ].map((tech, idx) => (
                <div key={idx} className="bg-[#182A2A] p-3 rounded-xl border border-[#B9F5D8]/15 hover:border-[#B9F5D8]/50 transition-colors">
                  <span className="text-[10px] font-mono text-[#B9F5D8] uppercase block">{tech.type}</span>
                  <span className="text-xs font-outfit font-bold text-[#F4F0E8]">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Quantitative Systems & IoT Spotlight */}
          <div className="bento-card md:col-span-1 lg:col-span-1 bg-[#142424] rounded-2xl border border-[#182A2A] hover:border-[#B9F5D8]/50 p-8 flex flex-col justify-between group transition-all duration-500 shadow-[0_15px_35px_rgba(0,0,0,0.5)] relative overflow-hidden">
            <span className="absolute -bottom-6 -right-3 text-[110px] font-outfit font-black text-white/[0.02] select-none pointer-events-none group-hover:text-[#B9F5D8]/[0.05] transition-colors duration-500">
              04
            </span>
            <div className="relative z-10">
              <div className="p-3 w-fit rounded-xl bg-[#B9F5D8]/10 border border-[#B9F5D8]/30 text-[#B9F5D8] mb-6 shadow-[0_0_15px_rgba(185,245,216,0.15)]">
                <Compass size={22} />
              </div>
              <span className="font-mono text-xs text-[#FF7043] uppercase tracking-widest font-bold block mb-2">
                04 // INNOVATION
              </span>
              <h4 className="text-xl font-outfit font-black text-[#F4F0E8] mb-3">
                Quant Algorithms &amp; IoT
              </h4>
              <p className="text-[#F4F0E8]/70 text-xs md:text-sm leading-relaxed font-sans">
                Extending engineering into automated financial quantitative algorithms (Python MT5 sniper engines) and embedded microcontrollers.
              </p>
            </div>
            <div className="relative z-10 mt-6 pt-4 border-t border-[#182A2A] font-mono text-[11px] text-[#B9F5D8]">
              // Beyond Standard Web Apps
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
