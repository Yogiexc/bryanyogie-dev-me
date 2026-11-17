"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function StickyScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set([".fade-in-element"], { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        ".fade-in-element",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
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
      className="relative w-full bg-[#090F0F] py-28 md:py-44 px-6 md:px-12 lg:px-24 overflow-hidden" 
      id="about"
    >
      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Minimalist Micro Label */}
        <div className="fade-in-element flex items-center gap-2 mb-10 text-xs font-mono tracking-[0.25em] text-[#B9F5D8] uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B9F5D8]" />
          <span>02 // BIOGRAPHY &amp; ENGINEERING PATH</span>
        </div>

        {/* Massive Editorial Headline Statement — Pure Typography, No Box */}
        <div ref={textRef} className="fade-in-element mb-16 md:mb-24">
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-outfit font-black tracking-tight text-[#F4F0E8] leading-[1.08] max-w-4xl">
            I build at the intersection of{" "}
            <span className="text-[#B9F5D8] underline decoration-[#B9F5D8]/30 decoration-2 underline-offset-8">
              physical network hardware
            </span>{" "}
            and high-throughput distributed software.
          </h2>
        </div>

        {/* Asymmetric Editorial Narrative (Text Left, Organic Visual Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left: Clean Prose Without Any Border Box */}
          <div className="lg:col-span-7 flex flex-col gap-8 text-[#F4F0E8]/75 font-sans text-base sm:text-lg leading-relaxed">
            <p className="fade-in-element">
              Currently studying <strong className="text-[#F4F0E8] font-bold">Informatics Engineering at Universitas Sebelas Maret (UNS)</strong>, Surakarta. But my engineering instincts began years earlier in Computer &amp; Network Engineering (SMK TKJ).
            </p>

            <p className="fade-in-element text-[#F4F0E8]/70">
              Before writing distributed cloud software, I was in server rooms crimping gigabit lines, configuring MikroTik VLAN topologies, and troubleshooting physical fiber optic trunks. That background gives me a distinct mental model: code doesn&rsquo;t run in abstract space; it moves through physical switches, memory registers, and fiber cables.
            </p>

            <p className="fade-in-element text-[#F4F0E8]/70">
              Today, I channel that foundation into designing modular fullstack web applications with Next.js &amp; NestJS, writing Python automated execution algorithms (MT5 quant bots), and building fluid, tactile interfaces for real people.
            </p>

            {/* Quick Minimalist Specs Bar */}
            <div className="fade-in-element pt-6 border-t border-[#B9F5D8]/15 flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-xs text-[#B9F5D8]">
              <span className="flex items-center gap-1.5">
                <span>01</span> Enterprise Networking
              </span>
              <span className="flex items-center gap-1.5">
                <span>02</span> Production Fullstack
              </span>
              <span className="flex items-center gap-1.5">
                <span>03</span> Quant Automation
              </span>
            </div>
          </div>

          {/* Right: Floating Frameless Photo (Proof of Field Work) */}
          <div className="lg:col-span-5 fade-in-element">
            <div className="relative group">
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                <Image 
                  src="/image/pkltkj.webp" 
                  alt="Bryan Yogie working on enterprise server rack" 
                  fill 
                  sizes="(max-width: 1024px) 100vw, 400px"
                  className="object-cover filter brightness-90 contrast-105 group-hover:scale-103 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090F0F] via-transparent to-transparent opacity-60" />
              </div>

              {/* Minimalist Image Caption */}
              <div className="mt-4 flex items-center justify-between text-xs font-mono text-[#F4F0E8]/50">
                <span>PKL FIELD ARCHIVE // SERVER RACK</span>
                <span className="text-[#B9F5D8]">TKJ ROOTS</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
