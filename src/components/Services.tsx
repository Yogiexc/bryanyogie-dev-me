"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Database, Network } from "lucide-react";

const services = [
  {
    icon: <Code2 size={36} className="text-[#B9F5D8]" />,
    number: "01",
    spec: "FIGMA → PROD REACT / NEXT.JS",
    title: "Frontend Engineering",
    description: "Translating architectural design tokens and UI/UX systems into blazing-fast, accessible web experiences. Deep focus on micro-interactions, responsive fluidity, and clean component isolation.",
    latency: "< 50ms INP",
    tech: "Next.js 16 · Tailwind · GSAP",
    color: "from-[#B9F5D8]/15 via-transparent to-transparent",
    badgeColor: "text-[#B9F5D8] bg-[#B9F5D8]/10 border-[#B9F5D8]/30",
  },
  {
    icon: <Database size={36} className="text-[#FF7043]" />,
    number: "02",
    spec: "STRICT API & DISTRIBUTED DB",
    title: "Backend Architecture",
    description: "Designing deterministic, scalable API contracts, schema migrations, and secure authentication flows with PHP, Java, NestJS, and MySQL. Robust data validation and zero runtime surprises.",
    latency: "99.9% UPTIME",
    tech: "NestJS · PHP · Prisma · SQL",
    color: "from-[#FF7043]/15 via-transparent to-transparent",
    badgeColor: "text-[#FF7043] bg-[#FF7043]/10 border-[#FF7043]/30",
  },
  {
    icon: <Network size={36} className="text-[#B9F5D8]" />,
    number: "03",
    spec: "BARE-METAL & CLOUD TOPOLOGY",
    title: "Network & Systems",
    description: "Rooted in Computer & Network Engineering (TKJ). Proficient in enterprise routing, subnetting, hardware telemetry, server virtualization, and resilient edge deployment protocols.",
    latency: "GIGABIT TRUNK",
    tech: "Cisco · Linux · Cloudflare · IoT",
    color: "from-[#B9F5D8]/15 via-transparent to-transparent",
    badgeColor: "text-[#B9F5D8] bg-[#B9F5D8]/10 border-[#B9F5D8]/30",
  },
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (containerRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".service-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          },
        }
      );
    }
  }, []);

  return (
    <section ref={containerRef} className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-[#090F0F] relative overflow-hidden border-t border-[#182A2A]" id="services">
      {/* Editorial Studio backdrop accents */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#B9F5D8]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-[#FF7043]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 md:gap-20 mb-20 relative z-10 border-b border-[#182A2A] pb-14">
          <div className="md:w-1/2">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#B9F5D8] inline-block" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#B9F5D8] font-semibold">
                04 // Professional Capabilities & Impact
              </span>
            </div>
            <h2 ref={titleRef} className="text-4xl sm:text-5xl md:text-7xl font-outfit font-black tracking-tight uppercase text-[#F4F0E8] leading-[0.95]">
              Ready to Build. <br />
              <span className="text-[#B9F5D8]">
                Ready to Impact.
              </span>
            </h2>
          </div>
          <div className="md:w-1/2 flex items-center">
            <p className="text-base sm:text-lg md:text-xl text-[#F4F0E8]/75 leading-relaxed font-sans border-l-2 border-[#FF7043]/60 pl-6">
              Currently seeking an <strong className="text-[#B9F5D8] font-semibold">internship opportunity</strong> for the upcoming semester and open to selective freelance collaborations. I combine robust software architecture with practical, metric-driven execution.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        {services.map((service, index) => (
          <div
            key={index}
            className={`service-card group p-8 md:p-10 rounded-2xl bg-[#142424] border border-[#182A2A] hover:border-[#B9F5D8]/50 transition-all duration-500 shadow-[0_15px_35px_rgba(0,0,0,0.5)] overflow-hidden relative flex flex-col justify-between`}
          >
            {/* Ambient Backlight Flare */}
            <div className={`absolute -top-12 -right-12 w-48 h-48 bg-gradient-to-br ${service.color} rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

            {/* Spec Header: Module Number & Latency */}
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#182A2A]">
                <div className="flex items-center gap-2">
                  <span className={`font-mono text-[11px] font-bold px-2.5 py-0.5 rounded border ${service.badgeColor}`}>
                    MOD // {service.number}
                  </span>
                </div>
                <span className="font-mono text-[10px] text-[#F4F0E8]/50 tracking-wider">
                  {service.latency}
                </span>
              </div>

              <div className="p-3.5 w-fit rounded-xl bg-[#182A2A] border border-[#182A2A] group-hover:border-[#B9F5D8]/40 transition-colors mb-6 shadow-md">
                {service.icon}
              </div>

              <div className="font-mono text-[10px] text-[#F4F0E8]/40 uppercase tracking-widest mb-1">
                {service.spec}
              </div>
              <h3 className="text-2xl font-outfit font-black text-[#F4F0E8] mb-4 tracking-tight group-hover:text-[#B9F5D8] transition-colors">
                {service.title}
              </h3>
              <p className="text-[#F4F0E8]/70 leading-relaxed font-sans text-sm md:text-base mb-6">
                {service.description}
              </p>
            </div>

            {/* Tech Stack Pills at bottom of card */}
            <div className="relative z-10 pt-4 border-t border-[#182A2A] flex items-center justify-between text-xs font-mono">
              <span className="text-[#B9F5D8]">{service.tech}</span>
              <span className="text-[#F4F0E8]/40 group-hover:text-[#B9F5D8] transition-colors">↗</span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Call to action button */}
      <div className="mt-20 flex flex-col sm:flex-row items-center justify-center gap-4">
        <a 
          href="#contact" 
          className="px-8 py-4 rounded-full bg-[#B9F5D8] text-[#090F0F] font-outfit font-black tracking-wider uppercase hover:bg-[#FF7043] hover:text-[#F4F0E8] transition-colors duration-300 shadow-[0_10px_30px_rgba(185,245,216,0.3)] active:scale-95"
        >
          Hire Me for Internship
        </a>
        <a 
          href="https://github.com/Yogiexc" 
          target="_blank"
          rel="noreferrer"
          className="px-8 py-4 rounded-full bg-[#142424] text-[#F4F0E8] border border-[#182A2A] hover:border-[#B9F5D8]/40 font-mono text-xs uppercase tracking-widest transition-colors duration-300"
        >
          View GitHub Archive ↗
        </a>
      </div>
      </div>
    </section>
  );
}
