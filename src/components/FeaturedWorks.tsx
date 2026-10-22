"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

const curatedProjects = [
  {
    id: "01",
    title: "SIPANDAI",
    subtitle: "Sistem Pintar Ekosistem Desa",
    category: "Fullstack Architecture",
    description: "Digital governance and administrative ecosystem for smart villages, empowering regional public services with modern web technologies.",
    color: "#b9f5d8",
    badge: "Public Sector Tech",
    tags: ["Next.js", "Fullstack", "PostgreSQL", "Tailwind CSS"],
    image: "/image/projek/SiPandai.png",
    url: "https://github.com/Yogiexc/SIPANDAI---Sistem-Pintar-Ekosistem-Desa",
  },
  {
    id: "02",
    title: "Journova",
    subtitle: "Academic Journal Publishing Platform",
    category: "Monorepo Fullstack Platform",
    description: "Enterprise-grade academic journal management platform built as an NPM workspaces monorepo with Next.js App Router, NestJS REST API, and Prisma ORM.",
    color: "#ff7043",
    badge: "Production Monorepo",
    tags: ["Next.js App Router", "NestJS API", "Prisma", "TypeScript"],
    image: "/image/projek/Journova.png",
    url: "https://github.com/Yogiexc/Journova",
  },
  {
    id: "03",
    title: "SemiAutoTrade by BYS",
    subtitle: "Hedge Fund Sniper Quantitative Algo",
    category: "Algorithmic Finance & Python",
    description: "Institutional-grade quantitative algorithmic trading engine integrated with MetaTrader 5 (MT5), real-time scoring filters, strict risk management, and automated Telegram telemetry.",
    color: "#b9f5d8",
    badge: "Quant Automation",
    tags: ["Python 3", "MetaTrader 5", "Algorithmic Trading", "Telegram Bot API"],
    image: "/image/projek/botTrading.png",
    url: "https://github.com/Yogiexc/SemiAutoTrade_byBYS",
  },
  {
    id: "04",
    title: "Iky Barbershop",
    subtitle: "Digital Booking & Slot Reservation",
    category: "Modern Web App",
    description: "Fast-loading appointment scheduling and customer queue reservation web application with responsive mobile-first UI.",
    color: "#ff7043",
    badge: "Client Service",
    tags: ["Next.js", "React", "Mobile First", "Vercel"],
    image: "/image/projek/Iky-Barber.png",
    url: "https://github.com/Yogiexc/iky_barbershop",
  },
];

export default function FeaturedWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (containerRef.current) {
      gsap.fromTo(
        ".work-item",
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    }
  }, []);

  return (
    <section ref={containerRef} className="py-24 md:py-40 px-6 md:px-12 lg:px-24 bg-background text-foreground min-h-screen" id="works">
      <div className="mb-20">
        <h2 className="text-5xl md:text-8xl font-outfit font-black tracking-tighter uppercase mb-6">
          Featured Works
        </h2>
        <div className="w-full h-[1px] bg-white/20" />
      </div>

      <div className="flex flex-col gap-12 md:gap-24">
        {curatedProjects.map((project) => (
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            key={project.id}
            className="work-item group relative flex flex-col md:flex-row items-start md:items-center justify-between cursor-pointer border-b border-white/10 pb-12 md:pb-24"
            onMouseEnter={() => setHoveredProject(project.id)}
            onMouseLeave={() => setHoveredProject(null)}
            data-cursor-hover="true"
          >
            {/* Background color transition on hover */}
            <div 
              className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none blur-3xl"
              style={{ backgroundColor: project.color }}
            />

            <div className="flex flex-col md:w-1/2">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-accent font-mono text-xs tracking-widest uppercase">
                  {project.id} // {project.category}
                </span>
                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full border border-mint/40 bg-mint/10 text-mint font-semibold">
                  {project.badge}
                </span>
              </div>
              <h3 className="text-3xl md:text-5xl lg:text-6xl font-outfit font-black mb-2 group-hover:pl-3 group-hover:text-mint transition-all duration-300">
                {project.title}
              </h3>
              <h4 className="text-lg md:text-xl font-outfit text-white/80 mb-4 group-hover:pl-3 transition-all duration-300">
                {project.subtitle}
              </h4>
              <p className="text-[#f4f0e8]/70 md:w-4/5 text-base md:text-lg leading-relaxed mb-6 font-sans">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="text-xs font-mono text-[#f4f0e8]/60 bg-[#142424] px-3 py-1 rounded-lg border border-mint/15">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="md:w-5/12 h-[260px] md:h-[380px] w-full mt-8 md:mt-0 bg-[#142424] rounded-2xl overflow-hidden relative group-hover:scale-[1.02] transition-transform duration-500 flex items-center justify-center border border-mint/25 shadow-xl">
              <img 
                src={project.image} 
                alt={project.title} 
                className="absolute inset-0 w-full h-full object-cover filter brightness-75 group-hover:brightness-95 group-hover:scale-105 transition-all duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090f0f] via-transparent to-transparent opacity-80" />
              
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white font-mono gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 bg-black/50 backdrop-blur-sm">
                 <div className="p-4 rounded-full bg-mint text-cinder shadow-[0_0_25px_rgba(185,245,216,0.6)]">
                   <ArrowUpRight size={32} className="group-hover:rotate-45 transition-transform duration-300" />
                 </div>
                 <span className="text-white font-outfit font-bold tracking-wider uppercase text-sm">Explore Repository & Demo</span>
              </div>
              
              <div className="text-white/20 font-outfit font-black text-6xl md:text-8xl tracking-tighter absolute -bottom-4 -right-4 opacity-40 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none select-none">
                {project.id}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
