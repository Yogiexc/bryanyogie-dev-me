"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import PageTransition from "@/components/PageTransition";
import { Search, ExternalLink, ArrowLeft, ArrowUpRight, Terminal, Cpu, Layers } from "lucide-react";

interface ProjectItem {
  id: string;
  name: string;
  category: "Fullstack" | "Quant & Algo" | "Systems & Backend" | "Mobile" | "UI & Experiments";
  role?: string;
  lang: string;
  desc: string;
  url: string;
  image?: string;
  featured?: boolean;
  metrics?: string;
}

const allProjects: ProjectItem[] = [
  {
    id: "journova",
    name: "Journova",
    category: "Fullstack",
    role: "Fullstack Developer (Solo)",
    lang: "TypeScript / NestJS",
    desc: "Open-access academic journal publishing monorepo connecting Next.js App Router with NestJS REST API and Prisma ORM.",
    url: "https://github.com/Yogiexc/Journova",
    image: "/image/projek/Journova.webp",
    featured: true,
    metrics: "Monorepo • PostgreSQL • REST",
  },
  {
    id: "sipandai",
    name: "SIPANDAI",
    category: "Fullstack",
    role: "Fullstack Developer",
    lang: "TypeScript / Next.js",
    desc: "Smart village public administration ecosystem for citizen demographic registries and municipal service requests.",
    url: "https://github.com/Yogiexc/SIPANDAI---Sistem-Pintar-Ekosistem-Desa",
    image: "/image/projek/SiPandai.webp",
    featured: true,
    metrics: "Production • Central Java • PostgreSQL",
  },
  {
    id: "semiauto",
    name: "SemiAutoTrade by BYS",
    category: "Quant & Algo",
    role: "Algorithm Developer",
    lang: "Python / MT5 API",
    desc: "Semi-automated scalping bot connected to MetaTrader 5 API with multi-timeframe risk filters and real-time Telegram telemetry.",
    url: "https://github.com/Yogiexc/SemiAutoTrade_byBYS",
    image: "/image/projek/botTrading.webp",
    featured: true,
    metrics: "Low Latency • MT5 Socket • Async",
  },
  {
    id: "iky",
    name: "Iky Barbershop",
    category: "Fullstack",
    role: "Frontend Developer (Client Work)",
    lang: "React / TypeScript",
    desc: "Digital reservation and live waiting queue booking interface with an adaptive mobile-first architecture.",
    url: "https://github.com/Yogiexc/iky_barbershop",
    image: "/image/projek/Iky-Barber.webp",
    featured: true,
    metrics: "Client Production • Mobile First",
  },
  {
    id: "go-queue",
    name: "go-job-queue",
    category: "Systems & Backend",
    lang: "Go",
    desc: "High-throughput asynchronous job queue implementing the Worker Pool concurrency pattern with graceful shutdown.",
    url: "https://github.com/Yogiexc/go-job-queue",
    metrics: "Goroutines • Channel Sync • Concurrency",
  },
  {
    id: "pbb-mobile",
    name: "e-layanan-pbb-mobile",
    category: "Mobile",
    lang: "Dart / Flutter",
    desc: "Regional property tax billing and public e-service mobile application built for Surakarta municipal administration.",
    url: "https://github.com/Yogiexc/e-layanan-pbb-mobile",
    metrics: "Flutter • Surakarta Gov • REST",
  },
  {
    id: "enterprise-go",
    name: "Enterprise-REST-API-GO",
    category: "Systems & Backend",
    lang: "Go",
    desc: "Clean architecture REST API implementation with structured database migrations and JWT auth pipeline.",
    url: "https://github.com/Yogiexc/Enterprise-REST-API-GO",
    metrics: "Clean Arch • PostgreSQL • JWT",
  },
  {
    id: "fastapi-mon",
    name: "fastapi-api-monitor",
    category: "Systems & Backend",
    lang: "Python / FastAPI",
    desc: "Lightweight API health and endpoint telemetry monitoring service with asynchronous heartbeat checks.",
    url: "https://github.com/Yogiexc/fastapi-api-monitor",
    metrics: "FastAPI • Async Heartbeat • Metrics",
  },
  {
    id: "trading-sim",
    name: "node-trading-bot-simulator",
    category: "Quant & Algo",
    lang: "JavaScript / Node",
    desc: "Educational orderbook simulator and algorithmic backtesting engine written in Node.js.",
    url: "https://github.com/Yogiexc/node-trading-bot-simulator",
    metrics: "Orderbook • Backtesting • Node.js",
  },
  {
    id: "code-lab",
    name: "code-lab",
    category: "Systems & Backend",
    lang: "Assembly / Zig / Nim",
    desc: "Low-level polyglot systems playground exploring x86-64 Assembly routines, Zig memory allocators, and Nim concurrency.",
    url: "https://github.com/Yogiexc/code-lab",
    metrics: "x86-64 • Allocators • Systems Lab",
  },
  {
    id: "geofield",
    name: "GeoField",
    category: "Mobile",
    lang: "Dart / Flutter",
    desc: "Geospatial land mapping and field surveying mobile application built with Flutter.",
    url: "https://github.com/Yogiexc/GeoField",
    metrics: "Geospatial • GPS Tracking • Offline",
  },
  {
    id: "pajak-jambi",
    name: "Mobile_Pajak_Jambi",
    category: "Mobile",
    lang: "Dart / Flutter",
    desc: "Regional municipal tax checking and citizen payment tracking mobile client for Jambi Province.",
    url: "https://github.com/Yogiexc/Mobile_Pajak_Jambi",
    metrics: "Municipal Tax • Payment Status",
  },
  {
    id: "cahaya-travel",
    name: "cahaya-travel-initial-design",
    category: "Fullstack",
    lang: "TypeScript",
    desc: "Fleet scheduling and passenger booking interface for inter-city travel services.",
    url: "https://github.com/Yogiexc/cahaya-travel-initial-design",
    metrics: "Fleet Booking • Next.js UI",
  },
  {
    id: "rawmap",
    name: "rawmap",
    category: "Systems & Backend",
    lang: "TypeScript",
    desc: "Local-first interactive mapping tools and geospatial utilities built for developers.",
    url: "https://github.com/Yogiexc/rawmap",
    metrics: "GeoJSON • Local-First • Canvas",
  },
  {
    id: "native-wc",
    name: "native-web-components",
    category: "UI & Experiments",
    lang: "HTML / Web Components",
    desc: "Framework-agnostic design system primitives crafted purely with Web Components and Shadow DOM.",
    url: "https://github.com/Yogiexc/native-web-components",
    metrics: "Zero Deps • Shadow DOM • Custom Elements",
  },
  {
    id: "zig-wasm",
    name: "zig-wasm-frontend-core",
    category: "Systems & Backend",
    lang: "Zig / WASM",
    desc: "Compiling Zig algorithms to WebAssembly runtimes for high-performance browser computations.",
    url: "https://github.com/Yogiexc/zig-wasm-frontend-core",
    metrics: "WebAssembly • Linear Memory • Zero JS",
  },
  {
    id: "leptos-rust",
    name: "leptos-rust-ui",
    category: "UI & Experiments",
    lang: "Rust / Leptos",
    desc: "Experimental fine-grained reactive fullstack web UI written in Rust using Leptos WASM framework.",
    url: "https://github.com/Yogiexc/leptos-rust-ui",
    metrics: "Rust • WASM • Fine-Grained Signals",
  },
  {
    id: "svelte5",
    name: "svelte5-admin-panel",
    category: "UI & Experiments",
    lang: "Svelte 5",
    desc: "Admin interface benchmark exploring Svelte 5 Runes reactivity model and zero-bundle overhead.",
    url: "https://github.com/Yogiexc/svelte5-admin-panel",
    metrics: "Runes • Zero Overhead • Signals",
  },
  {
    id: "jadwalkita",
    name: "jadwalkita",
    category: "Fullstack",
    lang: "PHP / MySQL",
    desc: "Academic timetable scheduling and classroom resource management portal.",
    url: "https://github.com/Yogiexc/jadwalkita",
    metrics: "Scheduling • Relational DB",
  },
  {
    id: "classform",
    name: "classform-product-dashboard",
    category: "Fullstack",
    lang: "PHP / PDO",
    desc: "Product CRUD inventory dashboard implementing PHP OOP patterns with PDO and MySQL.",
    url: "https://github.com/Yogiexc/classform-product-dashboard",
    metrics: "OOP PHP • MySQL PDO",
  },
];

const categories = ["All", "Fullstack", "Quant & Algo", "Systems & Backend", "Mobile", "UI & Experiments"] as const;

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [search, setSearch] = useState("");
  const [hoveredProject, setHoveredProject] = useState<ProjectItem | null>(allProjects[0]);

  const filtered = allProjects.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.desc.toLowerCase().includes(search.toLowerCase()) ||
      item.lang.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#1C121E] text-[#FDF8F0] selection:bg-[#FF6B00] selection:text-white antialiased relative overflow-hidden">
        {/* Subtle Ambient Background */}
        <div className="pointer-events-none absolute top-[-5%] left-1/3 w-[700px] h-[350px] bg-[#FF6B00]/8 blur-[160px] rounded-full -z-10" />

        <SiteHeader />

        <main className="max-w-6xl mx-auto px-6 md:px-12 pt-32 pb-28 flex flex-col gap-10">
          
          {/* Top Bar / Navigation */}
          <div className="flex items-center justify-between border-b border-[#FDF8F0]/10 pb-4">
            <Link
              href="/"
              className="text-xs font-mono text-[#FDF8F0]/70 hover:text-[#FF6B00] inline-flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft size={13} />
              <span>Back to Home</span>
            </Link>
            <span className="text-xs font-mono text-[#FF6B00] font-bold">
              // SPEC SHEET INDEX: {filtered.length} REPOSITORIES
            </span>
          </div>

          {/* Editorial Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex flex-col gap-2 max-w-xl">
              <span className="text-xs font-mono text-[#FF6B00] uppercase tracking-widest font-bold">
                Code Repositories &amp; Systems Lab
              </span>
              <h1 className="text-4xl sm:text-5xl font-outfit font-black tracking-tight text-[#FDF8F0]">
                Engineering Spec Sheet.
              </h1>
              <p className="text-sm sm:text-base text-[#FDF8F0]/75 font-sans leading-relaxed">
                Fullstack platforms, high-throughput Go queues, low-latency MT5 execution scripts, and systems architectures by Bryan Yogie Saputra.
              </p>
            </div>

            {/* Filter Search Input */}
            <div className="w-full md:w-80 relative">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#FDF8F0]/40" />
              <input
                type="text"
                placeholder="Filter by language, keyword..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#2D1D31] border border-[#FDF8F0]/15 text-xs text-[#FDF8F0] placeholder-[#FDF8F0]/40 focus:outline-none focus:border-[#FF6B00]"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-mono scrollbar-none border-b border-[#FDF8F0]/10 pb-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#FF6B00] text-white font-bold"
                    : "text-[#FDF8F0]/60 hover:text-[#FDF8F0]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Spec Sheet Table View (Engineered layout, not just generic cards) */}
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left font-mono text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#FDF8F0]/15 text-[#FF6B00] text-[11px] uppercase tracking-wider">
                  <th className="py-3 px-3 font-bold">Project Name</th>
                  <th className="py-3 px-3 font-bold hidden sm:table-cell">Category</th>
                  <th className="py-3 px-3 font-bold">Stack / Runtime</th>
                  <th className="py-3 px-3 font-bold hidden md:table-cell">Architecture Highlights</th>
                  <th className="py-3 px-3 font-bold text-right">Source</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#FDF8F0]/8">
                {filtered.map((item) => (
                  <tr
                    key={item.id}
                    onMouseEnter={() => setHoveredProject(item)}
                    className="hover:bg-[#2D1D31]/60 transition-colors group cursor-pointer"
                  >
                    <td className="py-4 px-3">
                      <div className="flex items-center gap-2">
                        <span className="font-outfit font-bold text-sm text-[#FDF8F0] group-hover:text-[#FF6B00] transition-colors">
                          {item.name}
                        </span>
                        {item.featured && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#FF6B00]/20 text-[#FF6B00] font-bold border border-[#FF6B00]/30">
                            ★ Featured
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] font-sans text-[#FDF8F0]/70 pt-0.5 line-clamp-1 sm:hidden">
                        {item.desc}
                      </p>
                    </td>

                    <td className="py-4 px-3 text-[#FDF8F0]/60 hidden sm:table-cell">
                      {item.category}
                    </td>

                    <td className="py-4 px-3">
                      <span className="px-2 py-0.5 rounded bg-[#150D17] text-[#FF6B00] border border-[#FDF8F0]/10 text-[11px]">
                        {item.lang}
                      </span>
                    </td>

                    <td className="py-4 px-3 text-[#FDF8F0]/70 hidden md:table-cell font-sans">
                      <span className="line-clamp-1">{item.desc}</span>
                      {item.metrics && (
                        <span className="text-[10px] font-mono text-[#FF6B00]/80 block pt-0.5">
                          // {item.metrics}
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-3 text-right">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[#FF6B00] hover:underline font-bold"
                      >
                        <span>GitHub</span>
                        <ArrowUpRight size={13} />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer Link */}
          <footer className="border-t border-[#FDF8F0]/15 pt-8 flex items-center justify-between text-xs font-mono text-[#FDF8F0]/60">
            <span>&copy; {new Date().getFullYear()} Bryan Yogie Saputra</span>
            <a
              href="https://github.com/Yogiexc"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FF6B00] hover:underline font-bold"
            >
              github.com/Yogiexc ↗
            </a>
          </footer>
        </main>
      </div>
    </PageTransition>
  );
}
