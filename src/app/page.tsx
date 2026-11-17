"use client";

import Image from "next/image";
import { ArrowUpRight, MessageSquare, ExternalLink } from "lucide-react";

interface Project {
  title: string;
  subtitle: string;
  description: string;
  year: string;
  tag: string;
  url: string;
  image: string;
}

const projects: Project[] = [
  {
    title: "SIPANDAI",
    subtitle: "Sistem Pintar Ekosistem Desa",
    description: "Digital public administration platform empowering smart village governance, resident records, and regional citizen services.",
    year: "2024",
    tag: "Next.js · PostgreSQL · Fullstack",
    url: "https://github.com/Yogiexc/SIPANDAI---Sistem-Pintar-Ekosistem-Desa",
    image: "/image/projek/SiPandai.webp",
  },
  {
    title: "Journova",
    subtitle: "Academic Journal Publishing Platform",
    description: "Production monorepo built with Next.js App Router and NestJS REST API, supporting peer reviews and multi-tenant academic publication workflows.",
    year: "2024",
    tag: "Next.js · NestJS · Prisma · Monorepo",
    url: "https://github.com/Yogiexc/Journova",
    image: "/image/projek/Journova.webp",
  },
  {
    title: "SemiAutoTrade by BYS",
    subtitle: "Quantitative Algorithmic Sniper Engine",
    description: "Automated trading bot integrated with MetaTrader 5 (MT5), real-time quantitative scoring filters, strict risk controls, and Telegram telemetry.",
    year: "2024",
    tag: "Python · MetaTrader 5 · Algo Trading",
    url: "https://github.com/Yogiexc/SemiAutoTrade_byBYS",
    image: "/image/projek/botTrading.webp",
  },
  {
    title: "Iky Barbershop",
    subtitle: "Client Booking & Queue Reservation",
    description: "Fast-loading appointment scheduling application with responsive mobile-first UI for real-time slot reservation.",
    year: "2023",
    tag: "React · Mobile-First · Client Work",
    url: "https://github.com/Yogiexc/iky_barbershop",
    image: "/image/projek/Iky-Barber.webp",
  },
];

const credentials = [
  {
    title: "AWS Academy Graduate - Cloud Developing",
    issuer: "AWS Academy",
    year: "2026",
    link: "https://www.credly.com/go/rITbmwC8",
  },
  {
    title: "AWS Academy Graduate - Machine Learning Foundations",
    issuer: "AWS Academy",
    year: "2026",
    link: "https://www.credly.com/go/SiFq7oZL",
  },
  {
    title: "CCNA: Introduction to Networks",
    issuer: "Cisco Networking Academy",
    year: "2025",
  },
  {
    title: "JavaScript Essentials 1 & 2",
    issuer: "Cisco & OpenEDG JS Institute",
    year: "2025",
  },
  {
    title: "Exploring Internet of Things & Packet Tracer",
    issuer: "Cisco Networking Academy",
    year: "2025",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#6E536F] text-[#FDF8F0] selection:bg-[#93F1E3] selection:text-[#6E536F] antialiased">
      {/* Brian Lovin Focused Single-Column Layout (max-w-2xl / ~672px) */}
      <div className="max-w-2xl mx-auto px-6 py-16 sm:py-24 md:py-32 flex flex-col gap-16 md:gap-20">

        {/* 1. Header / Intro Profile */}
        <header className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-[#FDF8F0]/20 shadow-md">
              <Image
                src="/image/profil.webp"
                alt="Bryan Yogie Saputra"
                fill
                priority
                sizes="80px"
                className="object-cover"
              />
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-[#FDF8F0]/70 bg-[#5C435D] px-3 py-1.5 rounded-full border border-[#FDF8F0]/10">
              <span className="w-2 h-2 rounded-full bg-[#93F1E3] animate-pulse" />
              <span>Surakarta, ID</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#FDF8F0]">
              Bryan Yogie Saputra
            </h1>
            <p className="text-sm sm:text-base text-[#FDF8F0]/80 font-sans leading-relaxed">
              Informatics Engineering student at Universitas Sebelas Maret (UNS). Network and fullstack architect bridging bare-metal hardware infrastructure with modern distributed web software and quantitative automation.
            </p>
          </div>

          {/* Social / Quick Action Links */}
          <nav className="flex flex-wrap items-center gap-3 pt-1 text-xs font-mono">
            <a
              href="https://wa.me/62882005703770"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#FDF8F0] text-[#6E536F] font-bold hover:bg-[#93F1E3] transition-colors"
            >
              <MessageSquare size={13} />
              <span>Contact WhatsApp</span>
            </a>
            <a
              href="https://github.com/Yogiexc"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#5C435D] text-[#FDF8F0] hover:text-[#93F1E3] border border-[#FDF8F0]/10 hover:border-[#93F1E3]/40 transition-colors"
            >
              <span>GitHub</span>
              <ArrowUpRight size={12} />
            </a>
            <a
              href="https://linkedin.com/in/bryanyogie"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#5C435D] text-[#FDF8F0] hover:text-[#93F1E3] border border-[#FDF8F0]/10 hover:border-[#93F1E3]/40 transition-colors"
            >
              <span>LinkedIn</span>
              <ArrowUpRight size={12} />
            </a>
          </nav>
        </header>

        {/* 2. Personal Story / Biography (Clean Prose, No Boxes) */}
        <section className="flex flex-col gap-4 text-sm sm:text-[15px] text-[#FDF8F0]/80 leading-relaxed font-sans border-t border-[#FDF8F0]/15 pt-10">
          <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-[#93F1E3] font-semibold mb-1">
            01 // About &amp; Engineering Roots
          </h2>
          <p>
            My engineering instincts began deep in Computer &amp; Network Engineering (SMK TKJ). Long before designing cloud applications, I was working inside enterprise server rooms crimping gigabit Ethernet trunks, setting up MikroTik routing topology, and troubleshooting physical fiber optic lines.
          </p>
          <p>
            Understanding physical switches, memory registers, and packet flows gives me an instinct for system throughput and network latency. Today, I combine that hardware foundation with modern fullstack engineering (Next.js, NestJS, PostgreSQL) and quantitative financial algorithms (Python &amp; MetaTrader 5).
          </p>
        </section>

        {/* 3. Selected Projects (Brian Lovin Editorial List) */}
        <section className="flex flex-col gap-6 border-t border-[#FDF8F0]/15 pt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-[#93F1E3] font-semibold">
              02 // Selected Projects
            </h2>
            <span className="text-xs font-mono text-[#FDF8F0]/50">
              {projects.length} Works
            </span>
          </div>

          <div className="flex flex-col divide-y divide-[#FDF8F0]/10">
            {projects.map((project) => (
              <a
                key={project.title}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group py-6 flex flex-col gap-3 -mx-4 px-4 rounded-xl hover:bg-[#5C435D]/60 transition-colors"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-[#FDF8F0] group-hover:text-[#93F1E3] transition-colors">
                      {project.title}
                    </h3>
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#93F1E3]" />
                  </div>
                  <span className="text-xs font-mono text-[#FDF8F0]/50 shrink-0">
                    {project.year}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#FDF8F0]/70 font-sans leading-relaxed">
                  {project.description}
                </p>

                <div className="flex items-center gap-2 text-[11px] font-mono text-[#93F1E3]/80">
                  <span>{project.tag}</span>
                </div>

                {/* Subtle Image Preview on hover / clean thumbnail */}
                <div className="mt-2 relative w-full h-44 sm:h-56 rounded-lg overflow-hidden border border-[#FDF8F0]/10 bg-[#4D354E]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 672px"
                    className="object-cover group-hover:scale-102 transition-transform duration-500 filter brightness-95"
                  />
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* 4. Credentials & Certifications (Clean List) */}
        <section className="flex flex-col gap-6 border-t border-[#FDF8F0]/15 pt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-[#93F1E3] font-semibold">
              03 // Formal Certifications
            </h2>
            <span className="text-xs font-mono text-[#FDF8F0]/50">
              Verified
            </span>
          </div>

          <div className="flex flex-col divide-y divide-[#FDF8F0]/10">
            {credentials.map((cred) => (
              <div key={cred.title} className="py-4 flex items-center justify-between gap-4">
                <div className="flex flex-col gap-0.5">
                  <h4 className="text-sm font-semibold text-[#FDF8F0]">
                    {cred.title}
                  </h4>
                  <span className="text-xs font-mono text-[#FDF8F0]/60">
                    {cred.issuer}
                  </span>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-mono text-[#FDF8F0]/50">
                    {cred.year}
                  </span>
                  {cred.link && (
                    <a
                      href={cred.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-[#93F1E3] hover:underline inline-flex items-center gap-0.5"
                    >
                      Verify <ArrowUpRight size={11} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Minimalist Footer */}
        <footer className="border-t border-[#FDF8F0]/15 pt-10 pb-16 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-[#FDF8F0]/60">
          <div>
            <span>&copy; {new Date().getFullYear()} Bryan Yogie Saputra</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="mailto:bryanyogie@student.uns.ac.id" className="hover:text-[#93F1E3] transition-colors">
              Email
            </a>
            <a href="https://github.com/Yogiexc" target="_blank" rel="noopener noreferrer" className="hover:text-[#93F1E3] transition-colors">
              GitHub
            </a>
            <a href="https://linkedin.com/in/bryanyogie" target="_blank" rel="noopener noreferrer" className="hover:text-[#93F1E3] transition-colors">
              LinkedIn
            </a>
          </div>
        </footer>

      </div>
    </main>
  );
}
