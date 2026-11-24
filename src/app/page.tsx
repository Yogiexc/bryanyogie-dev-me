"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowUpRight, 
  Menu, 
  X, 
  ArrowRight,
  MessageSquare, 
  FolderGit2,
  ExternalLink,
  Search
} from "lucide-react";

interface Writing {
  title: string;
  slug: string;
  date: string;
  category: string;
  excerpt: string;
}

const writingsData: Writing[] = [
  {
    title: "From Bare-Metal Server Racks to Distributed Next.js Clouds",
    slug: "from-bare-metal-to-distributed-clouds-b8Yg1",
    date: "Feb 2026",
    category: "Infrastructure",
    excerpt: "Bagaimana pengalaman langsung crimping kabel gigabit, konfigurasi router MikroTik, dan troubleshooting fiber optic di masa SMK TKJ membentuk cara pandang saya dalam membangun arsitektur web modern yang deterministik dan minim latensi."
  },
  {
    title: "Designing Low-Latency Quantitative Execution with Python & MT5",
    slug: "low-latency-quant-execution-python-mt5-k9Jx2",
    date: "Jan 2026",
    category: "Algo Trading",
    excerpt: "Studi arsitektur bot semi-otomatis MetaTrader 5: transisi dari polling loop interval ke event-driven tick callbacks untuk memotong latensi eksekusi dari 45ms menjadi di bawah 8ms dengan filter risiko ketat."
  },
  {
    title: "Deterministic State & Clean API Contracts in Production Monorepos",
    slug: "deterministic-state-api-contracts-monorepos-p3Mz9",
    date: "Nov 2025",
    category: "Fullstack Architecture",
    excerpt: "Pelajaran membangun platform publikasi jurnal ilmiah Journova dengan arsitektur NPM workspaces monorepo: menghubungkan Next.js App Router dengan NestJS backend REST API dan Prisma ORM."
  },
  {
    title: "Why Network Engineering (TKJ) Makes You a Better Fullstack Developer",
    slug: "why-tkj-makes-better-fullstack-dev-v4Lq7",
    date: "Sep 2025",
    category: "Engineering Philosophy",
    excerpt: "Software tidak berjalan di ruang hampa. Memahami packet switching, memory registers, dan batasan bandwidth fisik jaringan memberikan engineer intuisi yang tidak dimiliki programmer yang hanya belajar framework."
  },
  {
    title: "Subnetting, VLAN Topologies, and Fiber Splicing Field Notes",
    slug: "subnetting-vlan-topologies-fiber-notes-w1Np5",
    date: "Jul 2025",
    category: "Networking",
    excerpt: "Catatan lapangan saat instalasi rack server dan manajemen bandwidth enterprise di Surakarta: isolasi broadcast domain dan protokol routing dinamis."
  },
];

const featuredProjects = [
  {
    name: "Journova",
    desc: "Academic Journal Publishing Platform: Arsitektur monorepo enterprise untuk pengelolaan naskah ilmiah, peer-review, dan publikasi jurnal multi-tenant.",
    tag: "Next.js · NestJS · Prisma · Monorepo",
    category: "Fullstack Web",
    year: "2024",
    url: "https://github.com/Yogiexc/Journova",
    image: "/image/projek/Journova.webp",
  },
  {
    name: "SemiAutoTrade by BYS",
    desc: "Institutional Sniper Quantitative Algorithm: Mesin eksekusi trading otomatis terintegrasi MetaTrader 5 API dengan kalkulasi risiko real-time dan notifikasi telemetri Telegram.",
    tag: "Python 3 · MT5 API · Quant",
    category: "Quant & Algo",
    year: "2024",
    url: "https://github.com/Yogiexc/SemiAutoTrade_byBYS",
    image: "/image/projek/botTrading.webp",
  },
  {
    name: "SIPANDAI",
    desc: "Sistem Pintar Ekosistem Desa: Platform tata kelola digital publik untuk administrasi kependudukan dan layanan warga desa cerdas.",
    tag: "Next.js · PostgreSQL · Fullstack",
    category: "Fullstack Web",
    year: "2024",
    url: "https://github.com/Yogiexc/SIPANDAI---Sistem-Pintar-Ekosistem-Desa",
    image: "/image/projek/SiPandai.webp",
  },
  {
    name: "Iky Barbershop",
    desc: "Digital Booking & Slot Reservation: Aplikasi web reservasi antrean dan janji temu pelanggan dengan antarmuka responsif mobile-first.",
    tag: "React · Mobile First · Client Work",
    category: "Client Work",
    year: "2023",
    url: "https://github.com/Yogiexc/iky_barbershop",
    image: "/image/projek/Iky-Barber.webp",
  },
];

// Arsip Lengkap Semua Repositori Publik Milik Bryan Yogie Saputra
interface ArchiveRepo {
  name: string;
  category: "Fullstack" | "Quant & Algo" | "Systems & Backend" | "Mobile" | "UI & Experiments";
  lang: string;
  desc: string;
  url: string;
}

const allRepositories: ArchiveRepo[] = [
  {
    name: "Journova",
    category: "Fullstack",
    lang: "TypeScript",
    desc: "Open-access academic journal management & publishing platform with Next.js monorepo & NestJS API.",
    url: "https://github.com/Yogiexc/Journova"
  },
  {
    name: "SemiAutoTrade_byBYS",
    category: "Quant & Algo",
    lang: "Python",
    desc: "Semi-automatic MetaTrader 5 scalping bot with multi-timeframe signal filtering & Telegram telemetry.",
    url: "https://github.com/Yogiexc/SemiAutoTrade_byBYS"
  },
  {
    name: "SIPANDAI---Sistem-Pintar-Ekosistem-Desa",
    category: "Fullstack",
    lang: "TypeScript",
    desc: "Smart village ecosystem & citizen population administrative portal built with Next.js & PostgreSQL.",
    url: "https://github.com/Yogiexc/SIPANDAI---Sistem-Pintar-Ekosistem-Desa"
  },
  {
    name: "go-job-queue",
    category: "Systems & Backend",
    lang: "Go",
    desc: "High-throughput job queue system implementing the Worker Pool concurrency pattern in Go.",
    url: "https://github.com/Yogiexc/go-job-queue"
  },
  {
    name: "e-layanan-pbb-mobile",
    category: "Mobile",
    lang: "Dart",
    desc: "Aplikasi mobile E-Layanan Pajak Bumi & Bangunan (PBB P2) Kota Surakarta berbasis Flutter.",
    url: "https://github.com/Yogiexc/e-layanan-pbb-mobile"
  },
  {
    name: "node-trading-bot-simulator",
    category: "Quant & Algo",
    lang: "JavaScript",
    desc: "Orderbook emulator and educational quantitative trading bot simulator with historical tick backtesting.",
    url: "https://github.com/Yogiexc/node-trading-bot-simulator"
  },
  {
    name: "Enterprise-REST-API-GO",
    category: "Systems & Backend",
    lang: "Go",
    desc: "Clean architecture enterprise RESTful API template in Go with JWT authentication & database migrations.",
    url: "https://github.com/Yogiexc/Enterprise-REST-API-GO"
  },
  {
    name: "fastapi-api-monitor",
    category: "Systems & Backend",
    lang: "Python",
    desc: "Real-time endpoint health inspection & monitoring telemetry daemon built with FastAPI & AsyncIO.",
    url: "https://github.com/Yogiexc/fastapi-api-monitor"
  },
  {
    name: "code-lab",
    category: "Systems & Backend",
    lang: "Assembly",
    desc: "Polyglot Systems Lab: x86-64 Assembly routines, Zig allocators, Nim concurrency, and Elixir actors.",
    url: "https://github.com/Yogiexc/code-lab"
  },
  {
    name: "GeoField",
    category: "Mobile",
    lang: "Dart",
    desc: "Geospatial land mapping and field surveying mobile application built with Flutter.",
    url: "https://github.com/Yogiexc/GeoField"
  },
  {
    name: "Mobile_Pajak_Jambi",
    category: "Mobile",
    lang: "Dart",
    desc: "Regional tax billing and taxpayer identity verification mobile app for Jambi municipal systems.",
    url: "https://github.com/Yogiexc/Mobile_Pajak_Jambi"
  },
  {
    name: "iky_barbershop",
    category: "Fullstack",
    lang: "TypeScript",
    desc: "Digital reservation and queue booking client interface built for Iky Barbershop.",
    url: "https://github.com/Yogiexc/iky_barbershop"
  },
  {
    name: "cahaya-travel-initial-design",
    category: "Fullstack",
    lang: "TypeScript",
    desc: "Fleet scheduling, passenger booking engine, and ticketing interface for regional travel services.",
    url: "https://github.com/Yogiexc/cahaya-travel-initial-design"
  },
  {
    name: "rawmap",
    category: "Systems & Backend",
    lang: "TypeScript",
    desc: "Local-first interactive mapping tools and geospatial utilities built for developers.",
    url: "https://github.com/Yogiexc/rawmap"
  },
  {
    name: "native-web-components",
    category: "UI & Experiments",
    lang: "HTML / JS",
    desc: "Reusable, framework-agnostic design system primitives engineered strictly with Web Components & Shadow DOM.",
    url: "https://github.com/Yogiexc/native-web-components"
  },
  {
    name: "zig-wasm-frontend-core",
    category: "Systems & Backend",
    lang: "Zig",
    desc: "High-performance WebAssembly calculations compiled directly from Zig to browser runtime.",
    url: "https://github.com/Yogiexc/zig-wasm-frontend-core"
  },
  {
    name: "leptos-rust-ui",
    category: "UI & Experiments",
    lang: "Rust",
    desc: "Experimental fine-grained reactive fullstack web UI authored in Rust with Leptos WASM framework.",
    url: "https://github.com/Yogiexc/leptos-rust-ui"
  },
  {
    name: "svelte5-admin-panel",
    category: "UI & Experiments",
    lang: "Svelte",
    desc: "High-density admin dashboard exploring Svelte 5 Runes reactivity and zero-runtime bundle overhead.",
    url: "https://github.com/Yogiexc/svelte5-admin-panel"
  },
  {
    name: "qwik-resumable-ui",
    category: "UI & Experiments",
    lang: "JavaScript",
    desc: "Zero-hydration resumable web architecture experiment using Qwik framework.",
    url: "https://github.com/Yogiexc/qwik-resumable-ui"
  },
  {
    name: "React-Performance-Lab",
    category: "UI & Experiments",
    lang: "JavaScript",
    desc: "Benchmarking memoization patterns, concurrent rendering transitions, and virtualization in React.",
    url: "https://github.com/Yogiexc/React-Performance-Lab"
  },
  {
    name: "jadwalkita",
    category: "Fullstack",
    lang: "PHP",
    desc: "Academic timetable scheduling and institutional classroom resource optimizer.",
    url: "https://github.com/Yogiexc/jadwalkita"
  },
  {
    name: "classform-product-dashboard",
    category: "Fullstack",
    lang: "PHP",
    desc: "Modular product management dashboard implementing PHP OOP patterns with PDO & MySQL.",
    url: "https://github.com/Yogiexc/classform-product-dashboard"
  },
];

const certificationsData = [
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

const navMenuItems = [
  { title: "HOME", href: "#hero" },
  { title: "ABOUT", href: "#about" },
  { title: "WRITING", href: "#writing" },
  { title: "PROJECTS", href: "#projects" },
  { title: "CREDENTIALS", href: "#certifications" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Writing | null>(null);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);
  const [archiveFilter, setArchiveFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setSelectedPost(null);
        setIsArchiveOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock body scroll when overlay menu or modal is open
  useEffect(() => {
    if (menuOpen || isArchiveOpen || selectedPost) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, isArchiveOpen, selectedPost]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 150);
  };

  const filteredArchive = allRepositories.filter((repo) => {
    const matchesFilter = archiveFilter === "All" || repo.category === archiveFilter;
    const matchesSearch = 
      repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repo.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repo.lang.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#6E536F] text-[#FDF8F0] selection:bg-[#FF6B00] selection:text-[#FDF8F0] antialiased">
      
      {/* =========================================================================
          1. FLOATING HEADER BAR (Tanpa mix-blend agar tidak terbalik jadi hijau lumut)
          ========================================================================= */}
      {!menuOpen && (
        <header 
          className={`fixed top-0 left-0 w-full z-40 flex items-center justify-between px-6 md:px-12 transition-all duration-300 ${
            isScrolled 
              ? "py-4 bg-[#5C435D]/90 backdrop-blur-md border-b border-[#FDF8F0]/10 shadow-sm" 
              : "py-6 bg-transparent"
          }`}
        >
          {/* Brand / Logo */}
          <a 
            href="#hero" 
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#hero");
            }}
            className="text-2xl sm:text-3xl font-outfit font-black tracking-tighter text-[#FDF8F0] cursor-pointer hover:text-[#FF6B00] transition-colors"
          >
            BRYAN YOGIE
          </a>

          {/* Trigger Button */}
          <button 
            onClick={() => setMenuOpen(true)}
            className="flex items-center gap-2 group cursor-pointer text-[#FDF8F0] hover:text-[#FF6B00] transition-colors"
            aria-label="Open navigation menu"
          >
            <span className="hidden md:block font-mono text-xs uppercase tracking-widest font-bold">
              Menu
            </span>
            <Menu className="w-8 h-8 group-hover:scale-105 transition-transform" />
          </button>
        </header>
      )}

      {/* =========================================================================
          2. FULLSCREEN OVERLAY MENU (Split Screen Slide with Text Roll Effect)
          ========================================================================= */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-50 flex flex-col md:flex-row overflow-hidden"
          >
            {/* Top Bar Overlay */}
            <div className="absolute top-0 left-0 w-full flex items-center justify-between px-6 md:px-12 py-6 z-50 pointer-events-none">
              <span 
                className="text-2xl sm:text-3xl font-outfit font-black tracking-tighter text-[#FDF8F0] select-none cursor-pointer pointer-events-auto hover:text-[#FF6B00] transition-colors" 
                onClick={() => setMenuOpen(false)}
              >
                BRYAN YOGIE
              </span>
              <button 
                onClick={() => setMenuOpen(false)} 
                className="flex items-center gap-2 group cursor-pointer pointer-events-auto text-[#FDF8F0] hover:opacity-80 transition-opacity"
                aria-label="Close navigation menu"
              >
                <span className="hidden md:block font-mono text-xs uppercase tracking-widest font-bold">
                  Close
                </span>
                <X className="w-8 h-8 group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            {/* SISI KIRI: Big Typography Navigation Links with Clean Spacing */}
            <div className="flex-1 flex flex-col justify-center px-6 md:px-14 lg:px-20 py-20 bg-[#4D354E] overflow-hidden">
              <nav className="flex flex-col space-y-1.5 md:space-y-3" aria-label="Main Navigation">
                {navMenuItems.map((item, i) => (
                  <motion.button
                    key={item.title}
                    onClick={() => handleNavClick(item.href)}
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -30, opacity: 0 }}
                    transition={{ delay: 0.1 + i * 0.04, duration: 0.3 }}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-outfit font-black tracking-tight text-[#FDF8F0] hover:text-[#FF6B00] transition-colors flex items-center group overflow-hidden w-fit cursor-pointer text-left"
                  >
                    <span className="relative overflow-hidden inline-block leading-[1.1]">
                      <span className="block group-hover:-translate-y-full transition-transform duration-500 ease-in-out">
                        {item.title}
                      </span>
                      <span className="absolute top-0 left-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out text-[#FF6B00]">
                        {item.title}
                      </span>
                    </span>
                  </motion.button>
                ))}
              </nav>

              {/* Social Channels - Clean & Spaced */}
              <div className="flex flex-wrap gap-5 sm:gap-7 pt-6 mt-4 border-t border-[#FDF8F0]/15 font-mono text-xs sm:text-sm text-[#FDF8F0]/70">
                <a href="https://github.com/Yogiexc" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF6B00] transition-colors">
                  GITHUB ↗
                </a>
                <a href="https://linkedin.com/in/bryanyogie" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF6B00] transition-colors">
                  LINKEDIN ↗
                </a>
                <a href="https://wa.me/62882005703770" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF6B00] transition-colors">
                  WHATSAPP ↗
                </a>
                <a href="mailto:bryanyogie@student.uns.ac.id" className="hover:text-[#FF6B00] transition-colors">
                  EMAIL ↗
                </a>
              </div>
            </div>

            {/* SISI KANAN (Desktop Only): Featured Focus Card & Ambient Watermark */}
            <div className="hidden md:flex flex-1 bg-[#FF6B00] p-16 lg:p-20 flex-col justify-center relative overflow-hidden">
              <div className="space-y-6 relative z-10 text-white">
                <span className="text-xs font-mono opacity-85 uppercase tracking-widest block font-bold">
                  Surakarta, ID • UNS Informatics
                </span>
                <h3 className="text-4xl lg:text-5xl font-outfit font-black leading-none max-w-md">
                  BRIDGING HARDWARE TOPOLOGY WITH DISTRIBUTED WEB CODE.
                </h3>
                <p className="opacity-95 max-w-sm font-sans text-sm leading-relaxed">
                  Forged in Computer &amp; Network Engineering (SMK TKJ). Designing low-latency web apps in Next.js/NestJS and quantitative execution algorithms in Python.
                </p>
                <button
                  onClick={() => handleNavClick("#projects")}
                  className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider hover:translate-x-2 transition-transform cursor-pointer"
                >
                  Explore Projects <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Watermark Besar Khas Split-Menu */}
              <span className="absolute -bottom-20 -right-20 text-[20rem] font-outfit font-black leading-none opacity-20 select-none pointer-events-none text-white">
                BYS
              </span>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          3. MAIN SINGLE-COLUMN CONTENT (brianlovin.com Clean Architecture)
          ========================================================================= */}
      <main id="hero" className="max-w-2xl mx-auto px-6 pt-32 pb-20 flex flex-col gap-16 md:gap-20">

        {/* 1. Header Profile */}
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

            <div className="flex items-center gap-2 text-xs font-mono text-[#FDF8F0]/90 bg-[#5C435D] px-3.5 py-1.5 rounded-full border border-[#FDF8F0]/15">
              <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse" />
              <span>Surakarta, ID</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#FDF8F0]">
              Bryan Yogie Saputra
            </h1>
            <p className="text-sm sm:text-base text-[#FDF8F0]/85 font-sans leading-relaxed">
              Software designer and network infrastructure engineer at Universitas Sebelas Maret (UNS). Forged in Computer &amp; Network Engineering (TKJ), bridging bare-metal server racks with modern distributed fullstack web apps and quantitative trading algorithms.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-mono">
            <a
              href="https://wa.me/62882005703770"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#FF6B00] text-[#FDF8F0] font-bold hover:bg-[#FDF8F0] hover:text-[#6E536F] transition-colors"
            >
              <MessageSquare size={13} />
              <span>WhatsApp</span>
            </a>
            <a
              href="https://github.com/Yogiexc"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#5C435D] text-[#FDF8F0] hover:text-[#FF6B00] border border-[#FDF8F0]/15 hover:border-[#FF6B00]/40 transition-colors"
            >
              <span>GitHub</span>
              <ArrowUpRight size={12} />
            </a>
            <a
              href="https://linkedin.com/in/bryanyogie"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#5C435D] text-[#FDF8F0] hover:text-[#FF6B00] border border-[#FDF8F0]/15 hover:border-[#FF6B00]/40 transition-colors"
            >
              <span>LinkedIn</span>
              <ArrowUpRight size={12} />
            </a>
          </div>
        </header>

        {/* 2. Section: About & Engineering Roots */}
        <section id="about" className="flex flex-col gap-4 text-sm sm:text-[15px] text-[#FDF8F0]/85 leading-relaxed font-sans border-t border-[#FDF8F0]/15 pt-10">
          <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-[#FF6B00] font-bold mb-1">
            01 // About &amp; Engineering Roots
          </h2>
          <p>
            My engineering instincts began deep in Computer &amp; Network Engineering (SMK TKJ). Long before architecting production cloud code, I was working inside enterprise server rooms crimping gigabit Ethernet trunks, setting up MikroTik routing topology, and troubleshooting physical fiber optic lines.
          </p>
          <p>
            Understanding physical switches, memory registers, and packet flows gives me an instinct for system throughput and network latency. Today, I combine that hardware foundation with modern fullstack engineering (Next.js, NestJS, PostgreSQL) and quantitative financial algorithms (Python &amp; MetaTrader 5).
          </p>
        </section>

        {/* 3. Section: Writing */}
        <section id="writing" className="flex flex-col gap-5 border-t border-[#FDF8F0]/15 pt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-[#FF6B00] font-bold">
              02 // Writing
            </h2>
            <span className="text-xs font-mono text-[#FDF8F0]/50">
              5 Technical Essays
            </span>
          </div>

          <div className="flex flex-col divide-y divide-[#FDF8F0]/10">
            {writingsData.map((post) => (
              <button
                key={post.slug}
                onClick={() => setSelectedPost(post)}
                className="py-3.5 flex items-baseline justify-between gap-4 text-left group -mx-2 px-2 rounded-lg hover:bg-[#5C435D]/50 transition-colors cursor-pointer"
              >
                <div className="flex items-baseline gap-2">
                  <span className="text-sm sm:text-[15px] font-medium text-[#FDF8F0] group-hover:text-[#FF6B00] transition-colors line-clamp-1">
                    {post.title}
                  </span>
                </div>
                <span className="text-xs font-mono text-[#FDF8F0]/50 shrink-0">
                  {post.date}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* 4. Section: Projects (4 Flagship Systems + Full Archive Directory Trigger) */}
        <section id="projects" className="flex flex-col gap-6 border-t border-[#FDF8F0]/15 pt-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-[#FF6B00] font-bold">
                03 // Selected Projects
              </h2>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#5C435D] text-[#FDF8F0]/70">
                {featuredProjects.length} Flagship
              </span>
            </div>
            
            <button
              onClick={() => setIsArchiveOpen(true)}
              className="text-xs font-mono text-[#FF6B00] hover:underline inline-flex items-center gap-1.5 cursor-pointer"
            >
              <FolderGit2 size={13} />
              <span>Full Repository Index ({allRepositories.length}) ↗</span>
            </button>
          </div>

          <div className="flex flex-col divide-y divide-[#FDF8F0]/10">
            {featuredProjects.map((project) => (
              <a
                key={project.name}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group py-6 flex flex-col gap-3 -mx-3 px-3 rounded-xl hover:bg-[#5C435D]/50 transition-colors"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-base sm:text-lg font-bold text-[#FDF8F0] group-hover:text-[#FF6B00] transition-colors">
                      {project.name}
                    </h3>
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#FF6B00]" />
                  </div>
                  <span className="text-xs font-mono text-[#FDF8F0]/50 shrink-0">
                    {project.year}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#FDF8F0]/75 font-sans leading-relaxed">
                  {project.desc}
                </p>

                <div className="flex items-center gap-2 text-[11px] font-mono text-[#FF6B00]">
                  <span>{project.tag}</span>
                </div>

                {/* Clean Project Thumbnail */}
                <div className="mt-2 relative w-full h-44 sm:h-56 rounded-lg overflow-hidden border border-[#FDF8F0]/10 bg-[#4D354E]">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 672px"
                    className="object-cover group-hover:scale-102 transition-transform duration-500 filter brightness-95"
                  />
                </div>
              </a>
            ))}
          </div>

          {/* Banner Tombol Jelajahi Semua Repo */}
          <div className="mt-2 p-5 rounded-xl bg-[#5C435D]/70 border border-[#FDF8F0]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-mono font-bold text-[#FDF8F0]">
                Eksplorasi Seluruh Repositori ({allRepositories.length}+ Sistem)
              </span>
              <p className="text-xs text-[#FDF8F0]/70 font-sans">
                Lihat direktori kode lengkap meliputi Quant MT5, Go worker pools, Flutter mobile, hingga x86 Assembly &amp; Zig.
              </p>
            </div>
            <button
              onClick={() => setIsArchiveOpen(true)}
              className="px-4 py-2 rounded-lg bg-[#FF6B00] text-[#FDF8F0] hover:bg-[#FDF8F0] hover:text-[#6E536F] text-xs font-mono font-bold tracking-wider transition-colors inline-flex items-center justify-center gap-2 shrink-0 cursor-pointer"
            >
              <FolderGit2 size={14} />
              <span>Buka Repository Index</span>
            </button>
          </div>
        </section>

        {/* 5. Section: Certifications */}
        <section id="certifications" className="flex flex-col gap-6 border-t border-[#FDF8F0]/15 pt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-[#FF6B00] font-bold">
              04 // Formal Certifications
            </h2>
            <span className="text-xs font-mono text-[#FDF8F0]/50">
              Verified
            </span>
          </div>

          <div className="flex flex-col divide-y divide-[#FDF8F0]/10">
            {certificationsData.map((cred) => (
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
                      className="text-xs font-mono text-[#FF6B00] hover:underline inline-flex items-center gap-0.5"
                    >
                      Verify <ArrowUpRight size={11} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Footer */}
        <footer className="border-t border-[#FDF8F0]/15 pt-10 pb-16 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-[#FDF8F0]/60">
          <div>
            <span>&copy; {new Date().getFullYear()} Bryan Yogie Saputra</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="mailto:bryanyogie@student.uns.ac.id" className="hover:text-[#FF6B00] transition-colors">
              Email
            </a>
            <a href="https://github.com/Yogiexc" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF6B00] transition-colors">
              GitHub
            </a>
            <a href="https://linkedin.com/in/bryanyogie" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF6B00] transition-colors">
              LinkedIn
            </a>
          </div>
        </footer>

      </main>

      {/* =========================================================================
          MODAL: ALL REPOSITORIES DIRECTORY (INDEX LENGKAP SEMUA KARYA BRYAN)
          ========================================================================= */}
      {isArchiveOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsArchiveOpen(false);
          }}
        >
          <div className="relative w-full max-w-2xl bg-[#5C435D] rounded-2xl border border-[#FDF8F0]/20 p-6 sm:p-8 shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
            
            {/* Header Modal */}
            <div className="flex items-center justify-between pb-4 border-b border-[#FDF8F0]/15 mb-4 shrink-0">
              <div className="flex items-center gap-2.5">
                <FolderGit2 className="text-[#FF6B00]" size={20} />
                <h3 className="font-outfit font-bold text-lg text-[#FDF8F0]">
                  Bryan Yogie / Full Repository Index
                </h3>
              </div>
              <button
                onClick={() => setIsArchiveOpen(false)}
                className="text-xs font-mono px-2.5 py-1 rounded bg-[#4D354E] hover:bg-[#FDF8F0] text-[#FDF8F0] hover:text-[#6E536F] transition-colors cursor-pointer"
              >
                Close [Esc]
              </button>
            </div>

            {/* Search & Category Filter Controls */}
            <div className="flex flex-col gap-3 pb-4 shrink-0">
              <div className="relative">
                <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#FDF8F0]/50" />
                <input
                  type="text"
                  placeholder="Cari repo, bahasa (Go, Python, Dart, Zig...), atau kata kunci..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#4D354E] border border-[#FDF8F0]/15 text-xs text-[#FDF8F0] placeholder-[#FDF8F0]/40 focus:outline-none focus:border-[#FF6B00]"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-mono scrollbar-none">
                {["All", "Fullstack", "Quant & Algo", "Systems & Backend", "Mobile", "UI & Experiments"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setArchiveFilter(cat)}
                    className={`px-2.5 py-1 rounded-full whitespace-nowrap transition-colors cursor-pointer ${
                      archiveFilter === cat 
                        ? "bg-[#FF6B00] text-white font-bold" 
                        : "bg-[#4D354E] text-[#FDF8F0]/70 hover:text-[#FDF8F0]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* List Repositories */}
            <div className="overflow-y-auto divide-y divide-[#FDF8F0]/10 pr-1 -mr-1">
              {filteredArchive.length === 0 ? (
                <div className="py-12 text-center text-xs font-mono text-[#FDF8F0]/50">
                  Tidak ada repositori yang cocok dengan pencarianmu.
                </div>
              ) : (
                filteredArchive.map((repo) => (
                  <a
                    key={repo.name}
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 flex flex-col gap-1 group hover:bg-[#4D354E]/40 px-2 rounded-lg transition-colors"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs sm:text-sm font-bold text-[#FDF8F0] group-hover:text-[#FF6B00] transition-colors">
                          {repo.name}
                        </span>
                        <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#FF6B00]" />
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#4D354E] text-[#FF6B00]">
                          {repo.lang}
                        </span>
                        <span className="text-[10px] font-mono text-[#FDF8F0]/50 hidden sm:inline">
                          {repo.category}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-[#FDF8F0]/70 font-sans leading-relaxed">
                      {repo.desc}
                    </p>
                  </a>
                ))
              )}
            </div>

            {/* Footer Modal */}
            <div className="pt-3 mt-3 border-t border-[#FDF8F0]/15 flex items-center justify-between text-[11px] font-mono text-[#FDF8F0]/60 shrink-0">
              <span>Menampilkan {filteredArchive.length} dari {allRepositories.length} repositori</span>
              <a
                href="https://github.com/Yogiexc?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FF6B00] hover:underline"
              >
                Lihat di GitHub Profile ↗
              </a>
            </div>

          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: BACA TULISAN ARTIKEL BRYAN
          ========================================================================= */}
      {selectedPost && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedPost(null);
          }}
        >
          <div className="relative w-full max-w-lg bg-[#5C435D] rounded-2xl border border-[#FDF8F0]/20 p-6 sm:p-8 shadow-2xl flex flex-col max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#FDF8F0]/15 mb-6">
              <span className="font-mono text-xs uppercase tracking-widest text-[#FF6B00]">
                bryanyogie.is-a.dev/writing/{selectedPost.slug}
              </span>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-xs font-mono px-2 py-1 rounded bg-[#4D354E] hover:bg-[#FDF8F0] text-[#FDF8F0] hover:text-[#6E536F] transition-colors cursor-pointer"
              >
                Close [Esc]
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <span className="text-xs font-mono text-[#FDF8F0]/60">
                {selectedPost.date} • {selectedPost.category}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#FDF8F0] leading-tight">
                {selectedPost.title}
              </h3>
              <p className="text-sm text-[#FDF8F0]/85 font-sans leading-relaxed pt-2">
                {selectedPost.excerpt}
              </p>
              <div className="p-4 rounded-xl bg-[#4D354E]/80 border border-[#FDF8F0]/10 text-xs font-mono text-[#FF6B00] mt-2">
                // Full technical essay and code repository logs maintained on GitHub.
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
