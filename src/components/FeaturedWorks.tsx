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
    category: "Fullstack Development",
    description: "A comprehensive smart ecosystem platform for village administration and services, built with modern web technologies.",
    color: "#b9f5d8",
    url: "https://github.com/Yogiexc/SIPANDAI---Sistem-Pintar-Ekosistem-Desa",
  },
  {
    id: "02",
    title: "Iky Barbershop",
    subtitle: "Business Booking Platform",
    category: "Web Application",
    description: "A digital booking and management system designed for barbershops, streamlining the appointment process.",
    color: "#8b5cf6",
    url: "https://github.com/Yogiexc/iky_barbershop",
  },
  {
    id: "03",
    title: "Company Landing Page",
    subtitle: "Corporate Profile",
    category: "Frontend Development",
    description: "A highly responsive, cinematic corporate profile website with engaging animations.",
    color: "#10b981",
    url: "https://github.com/Yogiexc", // General fallback link
  },
  {
    id: "04",
    title: "Parking System",
    subtitle: "Java Application",
    category: "Software Engineering",
    description: "A console-based parking management simulation handling vehicle entry, exit, and automated payments.",
    color: "#f59e0b",
    url: "https://github.com/Yogiexc",
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
              <span className="text-accent font-mono text-sm tracking-widest mb-4">
                {project.id} // {project.category}
              </span>
              <h3 className="text-4xl md:text-6xl font-outfit font-bold mb-2 group-hover:pl-4 transition-all duration-500">
                {project.title}
              </h3>
              <h4 className="text-xl md:text-2xl font-outfit text-white/80 mb-6 group-hover:pl-4 transition-all duration-500 delay-75">
                {project.subtitle}
              </h4>
              <p className="text-white/60 md:w-4/5 text-lg leading-relaxed">
                {project.description}
              </p>
            </div>

            <div className="md:w-5/12 h-[250px] md:h-[400px] w-full mt-8 md:mt-0 bg-white/5 rounded-2xl overflow-hidden relative group-hover:scale-[1.02] transition-transform duration-700 flex items-center justify-center border border-white/10">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white/40 font-mono gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
                 <ArrowUpRight size={48} className="group-hover:rotate-45 transition-transform duration-500 text-white" />
                 <span className="text-white">View Project</span>
              </div>
              
              {/* Image hover overlay effect */}
              <div 
                className="absolute inset-0 mix-blend-overlay transition-opacity duration-700 opacity-20 group-hover:opacity-60"
                style={{ backgroundColor: project.color }}
              />
              
              <div className="text-white/20 font-outfit font-black text-6xl md:text-8xl tracking-tighter absolute -bottom-4 -right-4 opacity-50 group-hover:opacity-10 transition-opacity duration-500">
                {project.id}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
