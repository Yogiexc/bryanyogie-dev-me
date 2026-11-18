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
  Layers, 
  HelpCircle, 
  Headphones, 
  Terminal, 
  Send, 
  Check 
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

const projectsData = [
  {
    name: "SIPANDAI",
    desc: "Sistem Pintar Ekosistem Desa — Platform tata kelola digital publik untuk administrasi kependudukan dan layanan warga desa cerdas.",
    tag: "Next.js · PostgreSQL · Fullstack",
    year: "2024",
    url: "https://github.com/Yogiexc/SIPANDAI---Sistem-Pintar-Ekosistem-Desa",
    image: "/image/projek/SiPandai.webp",
  },
  {
    name: "Journova",
    desc: "Academic Journal Publishing Platform — Arsitektur monorepo enterprise untuk pengelolaan naskah ilmiah, peer-review, dan publikasi jurnal multi-tenant.",
    tag: "Next.js · NestJS · Prisma · Monorepo",
    year: "2024",
    url: "https://github.com/Yogiexc/Journova",
    image: "/image/projek/Journova.webp",
  },
  {
    name: "SemiAutoTrade by BYS",
    desc: "Institutional Sniper Quantitative Algorithm — Mesin eksekusi trading otomatis terintegrasi MetaTrader 5 API dengan kalkulasi risiko real-time dan notifikasi telemetri Telegram.",
    tag: "Python 3 · MT5 API · Quant",
    year: "2024",
    url: "https://github.com/Yogiexc/SemiAutoTrade_byBYS",
    image: "/image/projek/botTrading.webp",
  },
  {
    name: "Iky Barbershop",
    desc: "Digital Booking & Slot Reservation — Aplikasi web reservasi antrean dan janji temu pelanggan dengan antarmuka responsif mobile-first.",
    tag: "React · Mobile First · Client Work",
    year: "2023",
    url: "https://github.com/Yogiexc/iky_barbershop",
    image: "/image/projek/Iky-Barber.webp",
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

  // Modals for Brian Lovin style tools
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<Writing | null>(null);

  // AMA form state
  const [question, setQuestion] = useState("");
  const [senderName, setSenderName] = useState("");
  const [amaSuccess, setAmaSuccess] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setActiveModal(null);
        setSelectedPost(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock body scroll when overlay menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleSendQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    const text = encodeURIComponent(
      `Halo Bryan! [Tanya Lewat Web Portofolio]\nDari: ${senderName || "Anonim"}\nPertanyaan: ${question}`
    );
    window.open(`https://wa.me/62882005703770?text=${text}`, "_blank");

    setAmaSuccess(true);
    setTimeout(() => {
      setQuestion("");
      setSenderName("");
      setAmaSuccess(false);
      setActiveModal(null);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#6E536F] text-[#FDF8F0] selection:bg-[#93F1E3] selection:text-[#6E536F] antialiased">
      
      {/* =========================================================================
          1. FLOATING HEADER BAR (Mix-Blend-Difference & Minimalist High-End)
          ========================================================================= */}
      <header 
        className={`fixed top-0 left-0 w-full z-40 flex items-center justify-between px-6 md:px-12 py-6 mix-blend-difference text-white transition-all duration-300 ${
          isScrolled ? "py-4 backdrop-blur-sm" : "py-6"
        }`}
      >
        {/* Brand / Logo */}
        <a 
          href="#hero" 
          className="text-2xl sm:text-3xl font-outfit font-black tracking-tight cursor-pointer hover:opacity-80 transition-opacity"
        >
          BRYAN YOGIE
        </a>

        {/* Trigger Button */}
        <button 
          onClick={() => setMenuOpen(true)}
          className="flex items-center gap-2.5 group cursor-pointer"
          aria-label="Open full navigation menu"
        >
          <span className="hidden md:block font-mono text-xs uppercase tracking-widest group-hover:opacity-60 transition-opacity">
            Menu
          </span>
          <Menu className="w-7 h-7 sm:w-8 sm:h-8 group-hover:scale-105 transition-transform" />
        </button>
      </header>

      {/* =========================================================================
          2. FULLSCREEN OVERLAY MENU (Split Screen Slide with Text Roll Effect)
          ========================================================================= */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-[#5C435D] z-50 flex flex-col md:flex-row text-[#FDF8F0] overflow-hidden"
          >
            {/* Overlay Header Bar with Close Trigger */}
            <div className="absolute top-0 left-0 w-full flex items-center justify-between px-6 md:px-12 py-6 z-50 mix-blend-difference text-white">
              <div className="text-2xl sm:text-3xl font-outfit font-black tracking-tight">
                BRYAN YOGIE
              </div>
              <button 
                onClick={() => setMenuOpen(false)} 
                className="flex items-center gap-2 group cursor-pointer"
                aria-label="Close navigation menu"
              >
                <span className="hidden md:block font-mono text-xs uppercase tracking-widest group-hover:opacity-60 transition-opacity">
                  Close
                </span>
                <X className="w-7 h-7 sm:w-8 sm:h-8 group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            {/* SISI KIRI: Big Typography Navigation Links with Rolling Slide Effect */}
            <div className="flex-1 flex flex-col justify-center px-6 md:px-20 space-y-3 md:space-y-5 pt-28 md:pt-0 bg-[#4D354E]/95">
              {navMenuItems.map((item, i) => (
                <motion.a
                  key={item.title}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ x: -80, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -80, opacity: 0 }}
                  transition={{ delay: 0.25 + i * 0.08, duration: 0.5 }}
                  className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-outfit font-black tracking-tight text-[#FDF8F0] hover:text-[#93F1E3] transition-colors flex items-center group overflow-hidden w-fit"
                >
                  <span className="relative overflow-hidden inline-block leading-[1.05]">
                    <span className="block group-hover:-translate-y-full transition-transform duration-500 ease-in-out">
                      {item.title}
                    </span>
                    <span className="absolute top-0 left-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out text-[#93F1E3]">
                      {item.title}
                    </span>
                  </span>
                </motion.a>
              ))}

              {/* Sub-Interactive Quick Links */}
              <div className="pt-4 flex flex-wrap items-center gap-3 font-mono text-xs">
                <button
                  onClick={() => { setMenuOpen(false); setActiveModal("stack"); }}
                  className="px-3 py-1.5 rounded-full bg-[#5C435D] text-[#93F1E3] hover:bg-[#FDF8F0] hover:text-[#6E536F] transition-colors"
                >
                  Stack // Tools
                </button>
                <button
                  onClick={() => { setMenuOpen(false); setActiveModal("ama"); }}
                  className="px-3 py-1.5 rounded-full bg-[#5C435D] text-[#93F1E3] hover:bg-[#FDF8F0] hover:text-[#6E536F] transition-colors"
                >
                  AMA // Tanya Bryan
                </button>
                <button
                  onClick={() => { setMenuOpen(false); setActiveModal("listening"); }}
                  className="px-3 py-1.5 rounded-full bg-[#5C435D] text-[#93F1E3] hover:bg-[#FDF8F0] hover:text-[#6E536F] transition-colors"
                >
                  Listening
                </button>
                <button
                  onClick={() => { setMenuOpen(false); setActiveModal("til"); }}
                  className="px-3 py-1.5 rounded-full bg-[#5C435D] text-[#93F1E3] hover:bg-[#FDF8F0] hover:text-[#6E536F] transition-colors"
                >
                  TIL // Snippets
                </button>
              </div>

              {/* Social Channels */}
              <div className="flex flex-wrap gap-6 pt-6 font-mono text-xs sm:text-sm text-[#FDF8F0]/60">
                <a href="https://github.com/Yogiexc" target="_blank" rel="noopener noreferrer" className="hover:text-[#93F1E3] transition-colors">
                  GITHUB ↗
                </a>
                <a href="https://linkedin.com/in/bryanyogie" target="_blank" rel="noopener noreferrer" className="hover:text-[#93F1E3] transition-colors">
                  LINKEDIN ↗
                </a>
                <a href="https://wa.me/62882005703770" target="_blank" rel="noopener noreferrer" className="hover:text-[#93F1E3] transition-colors">
                  WHATSAPP ↗
                </a>
                <a href="mailto:bryanyogie@student.uns.ac.id" className="hover:text-[#93F1E3] transition-colors">
                  EMAIL ↗
                </a>
              </div>
            </div>

            {/* SISI KANAN (Desktop Only): Featured Focus Card & Massive Ambient Watermark */}
            <div className="hidden md:flex flex-1 bg-[#5C435D] p-16 lg:p-20 flex-col justify-center relative overflow-hidden">
              <div className="absolute top-10 left-12 font-mono text-xs uppercase tracking-widest text-[#93F1E3]">
                // Active Engineering Focus
              </div>
              
              <div className="space-y-6 relative z-10">
                <div className="text-xs font-mono text-[#FDF8F0]/60">
                  SURAKARTA, ID • UNS INFORMATICS
                </div>
                <h3 className="text-3xl lg:text-4xl font-outfit font-black leading-tight max-w-md text-[#FDF8F0]">
                  BRIDGING HARDWARE TOPOLOGY WITH DISTRIBUTED WEB CODE.
                </h3>
                <p className="font-sans text-sm text-[#FDF8F0]/80 max-w-sm leading-relaxed">
                  Forged in Computer &amp; Network Engineering (SMK TKJ). Designing low-latency web apps in Next.js/NestJS and quantitative execution bots in Python.
                </p>
                <a
                  href="#projects"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#93F1E3] hover:translate-x-2 transition-transform"
                >
                  Explore Projects <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Watermark Besar Khas Split-Menu */}
              <span className="absolute -bottom-16 -right-16 text-[18rem] lg:text-[22rem] font-outfit font-black leading-none text-[#FDF8F0]/[0.03] select-none pointer-events-none">
                BYS
              </span>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          3. MAIN SINGLE-COLUMN CONTENT (brianlovin.com Layout Style)
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

            <div className="flex items-center gap-2 text-xs font-mono text-[#FDF8F0]/70 bg-[#5C435D] px-3.5 py-1.5 rounded-full border border-[#FDF8F0]/10">
              <span className="w-2 h-2 rounded-full bg-[#93F1E3] animate-pulse" />
              <span>Surakarta, ID</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#FDF8F0]">
              Bryan Yogie Saputra
            </h1>
            <p className="text-sm sm:text-base text-[#FDF8F0]/80 font-sans leading-relaxed">
              Software designer and network infrastructure engineer at Universitas Sebelas Maret (UNS). Forged in Computer &amp; Network Engineering (TKJ) — bridging bare-metal server racks with modern distributed fullstack web apps and quantitative trading algorithms.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-mono">
            <a
              href="https://wa.me/62882005703770"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#FDF8F0] text-[#6E536F] font-bold hover:bg-[#93F1E3] transition-colors"
            >
              <MessageSquare size={13} />
              <span>WhatsApp</span>
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
          </div>
        </header>

        {/* 2. Section: About & Engineering Roots */}
        <section id="about" className="flex flex-col gap-4 text-sm sm:text-[15px] text-[#FDF8F0]/80 leading-relaxed font-sans border-t border-[#FDF8F0]/15 pt-10">
          <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-[#93F1E3] font-semibold mb-1">
            01 // About &amp; Engineering Roots
          </h2>
          <p>
            My engineering instincts began deep in Computer &amp; Network Engineering (SMK TKJ). Long before architecting production cloud code, I was working inside enterprise server rooms crimping gigabit Ethernet trunks, setting up MikroTik routing topology, and troubleshooting physical fiber optic lines.
          </p>
          <p>
            Understanding physical switches, memory registers, and packet flows gives me an instinct for system throughput and network latency. Today, I combine that hardware foundation with modern fullstack engineering (Next.js, NestJS, PostgreSQL) and quantitative financial algorithms (Python &amp; MetaTrader 5).
          </p>
        </section>

        {/* 3. Section: Writing (5 Judul Artikel Asli Bryan) */}
        <section id="writing" className="flex flex-col gap-5 border-t border-[#FDF8F0]/15 pt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-[#93F1E3] font-semibold">
              02 // Writing
            </h2>
            <span className="text-xs font-mono text-[#FDF8F0]/50">
              5 Essays
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
                  <span className="text-sm sm:text-[15px] font-medium text-[#FDF8F0] group-hover:text-[#93F1E3] transition-colors line-clamp-1">
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

        {/* 4. Section: Projects (Karya Asli Milik Bryan) */}
        <section id="projects" className="flex flex-col gap-6 border-t border-[#FDF8F0]/15 pt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-[#93F1E3] font-semibold">
              03 // Selected Projects
            </h2>
            <span className="text-xs font-mono text-[#FDF8F0]/50">
              {projectsData.length} Software Systems
            </span>
          </div>

          <div className="flex flex-col divide-y divide-[#FDF8F0]/10">
            {projectsData.map((project) => (
              <a
                key={project.name}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group py-6 flex flex-col gap-3 -mx-3 px-3 rounded-xl hover:bg-[#5C435D]/50 transition-colors"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-base sm:text-lg font-bold text-[#FDF8F0] group-hover:text-[#93F1E3] transition-colors">
                      {project.name}
                    </h3>
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#93F1E3]" />
                  </div>
                  <span className="text-xs font-mono text-[#FDF8F0]/50 shrink-0">
                    {project.year}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#FDF8F0]/75 font-sans leading-relaxed">
                  {project.desc}
                </p>

                <div className="flex items-center gap-2 text-[11px] font-mono text-[#93F1E3]">
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
        </section>

        {/* 5. Section: Certifications */}
        <section id="certifications" className="flex flex-col gap-6 border-t border-[#FDF8F0]/15 pt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-[#93F1E3] font-semibold">
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

        {/* 6. Footer */}
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

      </main>

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
              <span className="font-mono text-xs uppercase tracking-widest text-[#93F1E3]">
                bryanyogie.is-a.dev/writing/{selectedPost.slug}
              </span>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-xs font-mono px-2 py-1 rounded bg-[#4D354E] hover:bg-[#FDF8F0] text-[#FDF8F0] hover:text-[#6E536F] transition-colors"
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
              <div className="p-4 rounded-xl bg-[#4D354E]/80 border border-[#FDF8F0]/10 text-xs font-mono text-[#93F1E3] mt-2">
                // Full technical essay and code repository logs maintained on GitHub.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODALS: FITUR KHUSUS (STACK, AMA, LISTENING, TIL)
          ========================================================================= */}
      {activeModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveModal(null);
          }}
        >
          <div className="relative w-full max-w-lg bg-[#5C435D] rounded-2xl border border-[#FDF8F0]/20 p-6 sm:p-8 shadow-2xl flex flex-col max-h-[85vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-[#FDF8F0]/15 mb-6">
              <span className="font-mono text-xs uppercase tracking-widest text-[#93F1E3]">
                bryanyogie.is-a.dev/{activeModal}
              </span>
              <button
                onClick={() => setActiveModal(null)}
                className="text-xs font-mono px-2 py-1 rounded bg-[#4D354E] hover:bg-[#FDF8F0] text-[#FDF8F0] hover:text-[#6E536F] transition-colors"
              >
                Close [Esc]
              </button>
            </div>

            {/* STACK MODAL */}
            {activeModal === "stack" && (
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#4D354E] text-[#93F1E3]">
                    <Layers size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#FDF8F0]">Bryan's Engineering Stack</h3>
                    <p className="text-xs text-[#FDF8F0]/60 font-mono">Tools &amp; Hardware yang Dipakai Sehari-hari</p>
                  </div>
                </div>

                <div className="flex flex-col gap-3.5 text-xs font-mono">
                  <div className="p-3.5 rounded-lg bg-[#4D354E]/70 border border-[#FDF8F0]/10">
                    <span className="text-[#93F1E3] block mb-1 font-bold">// WORKSTATION &amp; HARDWARE</span>
                    <p className="text-[#FDF8F0]/80">Laptop Lenovo + Dual Monitor Setup · MikroTik Routerboard · Gigabit Patch Panel</p>
                  </div>
                  <div className="p-3.5 rounded-lg bg-[#4D354E]/70 border border-[#FDF8F0]/10">
                    <span className="text-[#93F1E3] block mb-1 font-bold">// ENVIRONMENT &amp; CLI</span>
                    <p className="text-[#FDF8F0]/80">VS Code + Neovim Keybindings · Turbopack · Git · Warp Terminal · Linux WSL2</p>
                  </div>
                  <div className="p-3.5 rounded-lg bg-[#4D354E]/70 border border-[#FDF8F0]/10">
                    <span className="text-[#93F1E3] block mb-1 font-bold">// PRODUCTION TECH</span>
                    <p className="text-[#FDF8F0]/80">Next.js 16 App Router · TypeScript · NestJS · PostgreSQL · Python MT5 API · Tailwind CSS</p>
                  </div>
                </div>
              </div>
            )}

            {/* AMA MODAL */}
            {activeModal === "ama" && (
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#4D354E] text-[#93F1E3]">
                    <HelpCircle size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#FDF8F0]">Ask Bryan Anything (AMA)</h3>
                    <p className="text-xs text-[#FDF8F0]/60 font-mono">Kirim pertanyaan seputar jaringan, web, atau bot quant</p>
                  </div>
                </div>

                {amaSuccess ? (
                  <div className="p-6 rounded-xl bg-[#4D354E] text-center flex flex-col items-center gap-2">
                    <Check size={28} className="text-[#93F1E3]" />
                    <span className="text-sm font-bold text-[#FDF8F0]">Pesan Diteruskan!</span>
                    <p className="text-xs text-[#FDF8F0]/70 font-mono">Langsung tersambung ke WhatsApp Bryan.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSendQuestion} className="flex flex-col gap-3">
                    <input
                      type="text"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="Nama kamu (opsional)"
                      className="w-full p-3 rounded-xl bg-[#4D354E] border border-[#FDF8F0]/15 text-xs text-[#FDF8F0] placeholder-[#FDF8F0]/40 focus:outline-none focus:border-[#93F1E3] font-sans"
                    />
                    <textarea
                      required
                      rows={4}
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      placeholder="Tulis pertanyaanmu di sini..."
                      className="w-full p-3.5 rounded-xl bg-[#4D354E] border border-[#FDF8F0]/15 text-xs sm:text-sm text-[#FDF8F0] placeholder-[#FDF8F0]/40 focus:outline-none focus:border-[#93F1E3] resize-none font-sans"
                    />
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#FDF8F0] text-[#6E536F] hover:bg-[#93F1E3] font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      <Send size={13} />
                      <span>Kirim Pertanyaan</span>
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* LISTENING MODAL */}
            {activeModal === "listening" && (
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#4D354E] text-[#93F1E3]">
                    <Headphones size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#FDF8F0]">Listening Telemetry</h3>
                    <p className="text-xs text-[#FDF8F0]/60 font-mono">Audio background untuk fokus coding</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#4D354E]/70 border border-[#FDF8F0]/10 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#93F1E3] animate-ping" />
                    <div>
                      <h4 className="text-sm font-bold text-[#FDF8F0]">Deep Minimal Techno &amp; Ambient</h4>
                      <p className="text-xs text-[#FDF8F0]/60 font-mono">Fokus konstan saat memprogram logika sistem</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TIL MODAL */}
            {activeModal === "til" && (
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#4D354E] text-[#93F1E3]">
                    <Terminal size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#FDF8F0]">Today I Learned (TIL)</h3>
                    <p className="text-xs text-[#FDF8F0]/60 font-mono">Field snippets &amp; catatan teknis harian</p>
                  </div>
                </div>

                <div className="flex flex-col gap-3 text-xs font-mono">
                  <div className="p-3 rounded-lg bg-[#4D354E] border border-[#FDF8F0]/10">
                    <span className="text-[#93F1E3] block mb-1 font-bold">2026-02 // Next.js Turbopack Bundle Splitting</span>
                    <p className="text-[#FDF8F0]/80">Menghilangkan client wrapper yang tidak perlu memotong Total Blocking Time (TBT) hingga 140ms pada koneksi HP lambat.</p>
                  </div>
                  <div className="p-3 rounded-lg bg-[#4D354E] border border-[#FDF8F0]/10">
                    <span className="text-[#93F1E3] block mb-1 font-bold">2026-01 // MetaTrader 5 Zero-Sleep Tick Dispatch</span>
                    <p className="text-[#FDF8F0]/80">Beralih dari polling loop interval ke event-driven tick callbacks memangkas latensi eksekusi order trading dari 45ms ke 8ms.</p>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
