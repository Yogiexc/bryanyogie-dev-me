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
      className="relative w-full bg-[#090f0f] py-28 md:py-36 px-6 md:px-12 lg:px-24 border-t border-mint/20 overflow-hidden" 
      id="about"
    >
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-mint/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-flare/5 rounded-full blur-[140px] pointer-events-none" />
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#b9f5d8 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="story-header mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-mint/20 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-flare animate-ping" />
              <span className="font-mono text-xs uppercase tracking-widest text-mint font-semibold flex items-center gap-1.5">
                <Sparkles size={13} className="text-flare" /> Engineering Biography & Philosophy
              </span>
            </div>
            <h2 className="text-4xl md:text-7xl font-outfit font-black uppercase text-[#f4f0e8] tracking-tighter leading-[0.9]">
              BEHIND <span className="text-mint">THE</span> CODE
            </h2>
          </div>
          <p className="text-[#f4f0e8]/70 font-mono text-xs md:text-sm max-w-md leading-relaxed">
            Bridging hardware network infrastructure with high-scale fullstack web architectures and quantitative systems.
          </p>
        </div>

        {/* High-End Bento Architecture Grid */}
        <div className="bento-grid grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {/* 1. Main Manifesto Hero Card (Large 2-col) */}
          <div className="bento-card md:col-span-2 lg:col-span-2 bg-[#121f1f] rounded-3xl border border-mint/25 p-8 md:p-10 flex flex-col justify-between relative overflow-hidden group hover:border-mint/50 transition-all duration-500 shadow-xl">
            <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-mint/10 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />
            
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-xs text-mint uppercase tracking-widest font-bold px-3 py-1 rounded-full bg-mint/10 border border-mint/30">
                  01 // ORIGIN & SNAPSHOT
                </span>
                <span className="text-xs font-mono text-flare font-bold">UNS SURAKARTA</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-outfit font-black text-[#f4f0e8] mb-4 tracking-tight leading-snug">
                Where Hardware Meets Modern Distributed Software.
              </h3>
              <p className="text-[#f4f0e8]/75 font-sans text-sm md:text-base leading-relaxed mb-6">
                Currently pursuing <strong className="text-mint font-semibold">Informatics Engineering</strong> at Universitas Sebelas Maret (UNS). My journey started deep in Computer & Network Engineering (TKJ), configuring physical routers, crimping cables, and designing topology before writing my first line of production code.
              </p>
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-4 text-xs font-mono text-[#f4f0e8]/70">
              <span className="flex items-center gap-1.5 text-mint">
                <ShieldCheck size={16} /> Cisco NetAcad Certified
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-flare">
                <Cpu size={16} /> IoT & Embedded Systems
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-[#f4f0e8]">
                <Layers size={16} /> Monorepo Architectures
              </span>
            </div>
          </div>

          {/* 2. Visual Photo Feature Card (TKJ Hardware Roots) */}
          <div className="bento-card md:col-span-1 lg:col-span-2 bg-[#142424] rounded-3xl border border-mint/20 overflow-hidden relative group hover:border-mint/50 transition-all duration-500 min-h-[300px] shadow-xl">
            <Image 
              src="/image/pkltkj.jpg" 
              alt="Hardware Networking Roots" 
              fill 
              className="object-cover filter brightness-70 group-hover:brightness-90 group-hover:scale-105 transition-all duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090f0f] via-[#090f0f]/40 to-transparent" />
            
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <span className="font-mono text-xs text-mint uppercase tracking-widest font-semibold mb-2">
                Field Experience // PKL TKJ
              </span>
              <h4 className="text-xl md:text-2xl font-outfit font-black text-[#f4f0e8] mb-2 leading-tight">
                Hands-On Infrastructure Grounding
              </h4>
              <p className="text-[#f4f0e8]/80 text-xs md:text-sm font-sans line-clamp-2">
                Real-world server racks, fiber deployment, and enterprise networking hardware created the foundation for scalable serverless and cloud design.
              </p>
            </div>
          </div>

          {/* 3. Engineering Philosophy & Execution */}
          <div className="bento-card md:col-span-1 lg:col-span-1 bg-[#121f1f] rounded-3xl border border-mint/20 p-8 flex flex-col justify-between group hover:border-mint/50 transition-all duration-500 shadow-xl">
            <div>
              <div className="p-3 w-fit rounded-2xl bg-flare/10 border border-flare/30 text-flare mb-6">
                <Terminal size={24} />
              </div>
              <span className="font-mono text-xs text-mint uppercase tracking-widest font-bold block mb-2">
                02 // PHILOSOPHY
              </span>
              <h4 className="text-xl font-outfit font-black text-[#f4f0e8] mb-3">
                Relentless Problem Solving
              </h4>
              <p className="text-[#f4f0e8]/70 text-xs md:text-sm leading-relaxed font-sans">
                Every bug is a diagnostic signal; every constraint is an optimization opportunity. Clean syntax, strict typing, and zero downtime.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 font-mono text-[11px] text-flare">
              // Continuous Growth Mindset
            </div>
          </div>

          {/* 4. Fullstack Mastery Stack */}
          <div className="bento-card md:col-span-2 lg:col-span-2 bg-[#121f1f] rounded-3xl border border-mint/20 p-8 flex flex-col justify-between group hover:border-mint/50 transition-all duration-500 shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-xs text-mint uppercase tracking-widest font-bold px-3 py-1 rounded-full bg-mint/10 border border-mint/30">
                  03 // CORE TECHNICAL STACK
                </span>
                <Code2 size={20} className="text-mint" />
              </div>
              <h4 className="text-xl md:text-2xl font-outfit font-black text-[#f4f0e8] mb-3">
                Production-Ready Fullstack Tooling
              </h4>
              <p className="text-[#f4f0e8]/75 text-xs md:text-sm leading-relaxed mb-6 font-sans">
                Specialized in rapid, modern web development with Next.js App Router, TypeScript, and Tailwind CSS on frontend; complemented by robust backend engines in NestJS, PHP, Java, and MySQL/PostgreSQL databases.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10">
              {[
                { name: "Next.js App Router", type: "Frontend" },
                { name: "TypeScript & React", type: "Logic" },
                { name: "NestJS / Prisma", type: "Backend" },
                { name: "Tailwind CSS & GSAP", type: "UI / Motion" },
              ].map((tech, idx) => (
                <div key={idx} className="bg-[#182a2a] p-3 rounded-xl border border-mint/15">
                  <span className="text-[10px] font-mono text-mint uppercase block">{tech.type}</span>
                  <span className="text-xs font-outfit font-bold text-[#f4f0e8]">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Quantitative Systems & IoT Spotlight */}
          <div className="bento-card md:col-span-1 lg:col-span-1 bg-[#121f1f] rounded-3xl border border-mint/20 p-8 flex flex-col justify-between group hover:border-mint/50 transition-all duration-500 shadow-xl">
            <div>
              <div className="p-3 w-fit rounded-2xl bg-mint/10 border border-mint/30 text-mint mb-6">
                <Compass size={24} />
              </div>
              <span className="font-mono text-xs text-flare uppercase tracking-widest font-bold block mb-2">
                04 // INNOVATION
              </span>
              <h4 className="text-xl font-outfit font-black text-[#f4f0e8] mb-3">
                Quant Algorithms & IoT
              </h4>
              <p className="text-[#f4f0e8]/70 text-xs md:text-sm leading-relaxed font-sans">
                Extending code into automated financial quantitative bots (Python MT5 sniper algorithms) and embedded hardware microcontrollers.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 font-mono text-[11px] text-mint">
              // Beyond Standard Web Apps
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
