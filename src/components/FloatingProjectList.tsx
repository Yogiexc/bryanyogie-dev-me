"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectPreviewItem {
  id: string;
  name: string;
  category: string;
  tagline: string;
  year: string;
  stack: string[];
  github: string;
  image: string;
}

const previewProjects: ProjectPreviewItem[] = [
  {
    id: "journova",
    name: "Journova",
    category: "Fullstack Architecture",
    tagline: "Academic Journal Monorepo & Publishing Engine",
    year: "2024",
    stack: ["Next.js", "NestJS", "Prisma", "PostgreSQL"],
    github: "https://github.com/Yogiexc/Journova",
    image: "/image/projek/Journova.webp",
  },
  {
    id: "sipandai",
    name: "SIPANDAI",
    category: "Digital Governance",
    tagline: "Smart Village Records & Municipal Services",
    year: "2024",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    github: "https://github.com/Yogiexc/SIPANDAI---Sistem-Pintar-Ekosistem-Desa",
    image: "/image/projek/SiPandai.webp",
  },
  {
    id: "semiauto",
    name: "SemiAutoTrade by BYS",
    category: "Quantitative Bot",
    tagline: "High-Frequency MetaTrader 5 Execution Engine",
    year: "2024",
    stack: ["Python 3", "MetaTrader 5 API", "Telegram Telemetry"],
    github: "https://github.com/Yogiexc/SemiAutoTrade_byBYS",
    image: "/image/projek/botTrading.webp",
  },
  {
    id: "iky",
    name: "Iky Barbershop",
    category: "Client Product",
    tagline: "Real-time Queue & Appointment Booking Client",
    year: "2024",
    stack: ["React", "TypeScript", "Mobile-First"],
    github: "https://github.com/Yogiexc/iky_barbershop",
    image: "/image/projek/Iky-Barber.webp",
  },
];

export default function FloatingProjectList() {
  const [activeProject, setActiveProject] = useState<ProjectPreviewItem>(previewProjects[0]);

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      {/* Left: Interactive Editorial List (Lines, not boxes) */}
      <div className="lg:col-span-7 flex flex-col divide-y divide-[#FDF8F0]/10">
        {previewProjects.map((item) => {
          const isSelected = activeProject.id === item.id;
          return (
            <div
              key={item.id}
              onMouseEnter={() => setActiveProject(item)}
              className="py-5 sm:py-6 group flex items-baseline justify-between gap-4 cursor-pointer transition-colors"
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-mono transition-colors ${isSelected ? "text-[#FF6B00] font-bold" : "text-[#FDF8F0]/40"}`}>
                    // {item.category}
                  </span>
                  <span className="text-[11px] font-mono text-[#FDF8F0]/40">
                    {item.year}
                  </span>
                </div>

                <h3
                  className={`text-2xl sm:text-3xl font-outfit font-black tracking-tight transition-all duration-300 ${
                    isSelected
                      ? "text-[#FF6B00] translate-x-2"
                      : "text-[#FDF8F0] group-hover:text-[#FDF8F0]/90"
                  }`}
                >
                  {item.name}
                </h3>

                <p className="text-xs sm:text-sm text-[#FDF8F0]/70 font-sans">
                  {item.tagline}
                </p>

                <div className="flex items-center gap-1.5 pt-1">
                  {item.stack.map((s) => (
                    <span
                      key={s}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1C121E] text-[#FDF8F0]/60 border border-[#FDF8F0]/10"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <a
                href={item.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className={`p-2.5 rounded-full transition-all duration-300 shrink-0 ${
                  isSelected
                    ? "bg-[#FF6B00] text-white rotate-45"
                    : "bg-[#2D1D31] text-[#FDF8F0]/50 group-hover:text-[#FDF8F0]"
                }`}
              >
                <ArrowUpRight size={16} />
              </a>
            </div>
          );
        })}
      </div>

      {/* Right: Dynamic Floating Preview Screen */}
      <div className="lg:col-span-5 relative w-full h-[280px] sm:h-[340px] rounded-2xl overflow-hidden border border-[#FDF8F0]/15 bg-[#150D17] shadow-2xl p-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative w-full h-full rounded-xl overflow-hidden"
          >
            <Image
              src={activeProject.image}
              alt={activeProject.name}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover filter brightness-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#150D17] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono">
              <span className="text-[#FDF8F0] font-bold">{activeProject.name}</span>
              <span className="text-[#FF6B00]">Preview Feed</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
