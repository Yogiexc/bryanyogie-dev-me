"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowUpRight, 
  MessageSquare, 
  Terminal, 
  Music, 
  Layers, 
  HelpCircle, 
  BookOpen, 
  Send, 
  Headphones, 
  Check 
} from "lucide-react";

interface Writing {
  title: string;
  slug: string;
  date: string;
  readTime: string;
}

const writings: Writing[] = [
  {
    title: "From Bare-Metal Server Racks to Distributed Next.js Clouds",
    slug: "from-bare-metal-to-distributed-clouds-b8Yg1",
    date: "Feb 2026",
    readTime: "4 min read",
  },
  {
    title: "Designing Low-Latency Quantitative Execution with Python & MT5",
    slug: "low-latency-quant-execution-python-mt5-k9Jx2",
    date: "Jan 2026",
    readTime: "6 min read",
  },
  {
    title: "Deterministic State and Clean API Contracts in Production Monorepos",
    slug: "deterministic-state-api-contracts-monorepos-p3Mz9",
    date: "Nov 2025",
    readTime: "5 min read",
  },
  {
    title: "Why Network Engineering (TKJ) Makes You a Better Fullstack Developer",
    slug: "why-tkj-makes-better-fullstack-dev-v4Lq7",
    date: "Sep 2025",
    readTime: "3 min read",
  },
  {
    title: "Subnetting, VLAN Topologies, and Fiber Optic Troubleshooting Notes",
    slug: "subnetting-vlan-topologies-fiber-notes-w1Np5",
    date: "Jul 2025",
    readTime: "5 min read",
  },
];

const internalProjects = [
  {
    name: "Stack",
    desc: "My daily hardware workspace, terminal setup, and software tools.",
    badge: "Interactive",
    type: "stack",
  },
  {
    name: "AMA",
    desc: "Ask me anything about networking, fullstack web, or quant bots.",
    badge: "Open",
    type: "ama",
  },
  {
    name: "Listening",
    desc: "Coding soundtrack & curated ambient music on rotation.",
    badge: "Now Playing",
    type: "listening",
  },
  {
    name: "TIL",
    desc: "Today I Learned — engineering field notes, CLI tricks, and bug postmortems.",
    badge: "Archive",
    type: "til",
  },
];

const externalProjects = [
  {
    name: "SIPANDAI",
    desc: "Digital governance ecosystem for smart villages & regional administrative services.",
    tag: "Next.js · PostgreSQL",
    url: "https://github.com/Yogiexc/SIPANDAI---Sistem-Pintar-Ekosistem-Desa",
  },
  {
    name: "Journova",
    desc: "Academic journal publishing platform built as an NPM workspaces monorepo.",
    tag: "Next.js · NestJS · Prisma",
    url: "https://github.com/Yogiexc/Journova",
  },
  {
    name: "SemiAutoTrade by BYS",
    desc: "Institutional-grade algorithmic trading engine with MetaTrader 5 API.",
    tag: "Python · MT5 · Quant",
    url: "https://github.com/Yogiexc/SemiAutoTrade_byBYS",
  },
  {
    name: "Iky Barbershop",
    desc: "Real-time appointment scheduling & slot reservation web application.",
    tag: "React · Mobile First",
    url: "https://github.com/Yogiexc/iky_barbershop",
  },
];

export default function Home() {
  // Interactive modal states for Brian Lovin internal features
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // AMA form state
  const [question, setQuestion] = useState("");
  const [amaSent, setAmaSent] = useState(false);

  const handleSendAMA = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    setAmaSent(true);
    setTimeout(() => {
      setQuestion("");
      setAmaSent(false);
      setActiveModal(null);
    }, 1800);
  };

  return (
    <main className="min-h-screen bg-[#6E536F] text-[#FDF8F0] selection:bg-[#93F1E3] selection:text-[#6E536F] antialiased">
      {/* Brian Lovin Focused Single-Column Layout (max-w-2xl / ~672px) */}
      <div className="max-w-2xl mx-auto px-6 py-16 sm:py-24 md:py-28 flex flex-col gap-14 md:gap-16">

        {/* 1. Header / Profile */}
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
              Software designer and network engineer at Universitas Sebelas Maret (UNS). Building distributed web platforms, high-throughput cloud architectures, and algorithmic trading systems.
            </p>
          </div>

          {/* Social Icons & Quick Contacts */}
          <nav className="flex items-center gap-3 pt-1 text-xs font-mono">
            <a
              href="https://github.com/Yogiexc"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-[#5C435D] text-[#FDF8F0] hover:text-[#93F1E3] hover:bg-[#4D354E] border border-[#FDF8F0]/10 transition-colors inline-flex items-center gap-1"
            >
              <span>GitHub</span>
              <ArrowUpRight size={12} />
            </a>
            <a
              href="https://linkedin.com/in/bryanyogie"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-[#5C435D] text-[#FDF8F0] hover:text-[#93F1E3] hover:bg-[#4D354E] border border-[#FDF8F0]/10 transition-colors inline-flex items-center gap-1"
            >
              <span>LinkedIn</span>
              <ArrowUpRight size={12} />
            </a>
            <a
              href="https://wa.me/62882005703770"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-[#5C435D] text-[#FDF8F0] hover:text-[#93F1E3] hover:bg-[#4D354E] border border-[#FDF8F0]/10 transition-colors inline-flex items-center gap-1.5"
            >
              <MessageSquare size={13} />
              <span>WhatsApp</span>
            </a>
          </nav>
        </header>

        {/* 2. Section: Writing (Brian Lovin 5 Recent Posts with Slug IDs) */}
        <section className="flex flex-col gap-5 border-t border-[#FDF8F0]/15 pt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-[#93F1E3] font-semibold">
              Writing
            </h2>
            <button 
              onClick={() => setActiveModal("writing-archive")}
              className="text-xs font-mono text-[#FDF8F0]/60 hover:text-[#93F1E3] transition-colors"
            >
              All writings &rarr;
            </button>
          </div>

          <div className="flex flex-col divide-y divide-[#FDF8F0]/10">
            {writings.map((post) => (
              <button
                key={post.slug}
                onClick={() => setActiveModal(`post-${post.slug}`)}
                className="py-3.5 flex items-baseline justify-between gap-4 text-left group -mx-2 px-2 rounded-lg hover:bg-[#5C435D]/40 transition-colors"
              >
                <span className="text-sm sm:text-[15px] font-medium text-[#FDF8F0] group-hover:text-[#93F1E3] transition-colors line-clamp-1">
                  {post.title}
                </span>
                <span className="text-xs font-mono text-[#FDF8F0]/50 shrink-0">
                  {post.date}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* 3. Section: Projects (Brian Lovin Internal Apps & External Products) */}
        <section className="flex flex-col gap-8 border-t border-[#FDF8F0]/15 pt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-[#93F1E3] font-semibold">
              Projects
            </h2>
            <span className="text-xs font-mono text-[#FDF8F0]/50">
              Apps &amp; Software
            </span>
          </div>

          {/* A. Internal Sub-Pages (Brian Lovin Signature Apps) */}
          <div className="flex flex-col gap-3">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#FDF8F0]/50">
              Internal Interactive Tools
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {internalProjects.map((item) => (
                <button
                  key={item.name}
                  onClick={() => setActiveModal(item.type)}
                  className="p-4 rounded-xl bg-[#5C435D]/50 hover:bg-[#5C435D] border border-[#FDF8F0]/10 hover:border-[#93F1E3]/40 text-left transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-sm text-[#FDF8F0] group-hover:text-[#93F1E3] transition-colors">
                        {item.name}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#4D354E] text-[#93F1E3] border border-[#93F1E3]/20">
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-xs text-[#FDF8F0]/70 font-sans leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <div className="mt-3 text-[11px] font-mono text-[#93F1E3] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Open view</span> &rarr;
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* B. External Production Systems & Open Source */}
          <div className="flex flex-col gap-3 pt-4 border-t border-[#FDF8F0]/10">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#FDF8F0]/50">
              Production Systems &amp; Repos
            </span>
            <div className="flex flex-col divide-y divide-[#FDF8F0]/10">
              {externalProjects.map((proj) => (
                <a
                  key={proj.name}
                  href={proj.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-4 flex items-baseline justify-between gap-4 group -mx-2 px-2 rounded-lg hover:bg-[#5C435D]/40 transition-colors"
                >
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-sm sm:text-base text-[#FDF8F0] group-hover:text-[#93F1E3] transition-colors">
                        {proj.name}
                      </span>
                      <ArrowUpRight size={13} className="text-[#93F1E3] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-xs text-[#FDF8F0]/70 font-sans">
                      {proj.desc}
                    </p>
                  </div>
                  <span className="text-xs font-mono text-[#93F1E3]/80 shrink-0 hidden sm:inline">
                    {proj.tag}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Minimalist Footer */}
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

      {/* =========================================================================
          INTERACTIVE MODALS / SUB-PAGES (Brian Lovin Features: Stack, AMA, Listening, TIL, Post)
          ========================================================================= */}
      {activeModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveModal(null);
          }}
        >
          <div className="relative w-full max-w-lg bg-[#5C435D] rounded-2xl border border-[#FDF8F0]/20 p-6 sm:p-8 shadow-2xl flex flex-col max-h-[85vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#FDF8F0]/15 mb-6">
              <span className="font-mono text-xs uppercase tracking-widest text-[#93F1E3]">
                brianlovin.com/sub-feature
              </span>
              <button
                onClick={() => setActiveModal(null)}
                className="text-xs font-mono px-2 py-1 rounded bg-[#4D354E] hover:bg-[#FDF8F0] text-[#FDF8F0] hover:text-[#6E536F] transition-colors"
              >
                Close [Esc]
              </button>
            </div>

            {/* Modal: STACK */}
            {activeModal === "stack" && (
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#4D354E] text-[#93F1E3]">
                    <Layers size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#FDF8F0]">Bryan's Tech Stack</h3>
                    <p className="text-xs text-[#FDF8F0]/60 font-mono">Hardware &amp; Software Weapons of Choice</p>
                  </div>
                </div>

                <div className="flex flex-col gap-4 text-xs font-mono">
                  <div className="p-3.5 rounded-lg bg-[#4D354E]/60 border border-[#FDF8F0]/10">
                    <span className="text-[#93F1E3] block mb-1 font-bold">// HARDWARE &amp; WORKSTATION</span>
                    <p className="text-[#FDF8F0]/80">Lenovo ThinkPad / Custom Dual Monitor Rig · Mechanical Keyboard · MikroTik Routerboard</p>
                  </div>
                  <div className="p-3.5 rounded-lg bg-[#4D354E]/60 border border-[#FDF8F0]/10">
                    <span className="text-[#93F1E3] block mb-1 font-bold">// DEVELOPMENT ENVIRONMENT</span>
                    <p className="text-[#FDF8F0]/80">VS Code + Neovim Keybindings · Turbopack · Git · Warp Terminal · Linux WSL2</p>
                  </div>
                  <div className="p-3.5 rounded-lg bg-[#4D354E]/60 border border-[#FDF8F0]/10">
                    <span className="text-[#93F1E3] block mb-1 font-bold">// PRODUCTION STACK</span>
                    <p className="text-[#FDF8F0]/80">Next.js 16 App Router · TypeScript · NestJS · PostgreSQL · Python 3.12 · Tailwind CSS</p>
                  </div>
                </div>
              </div>
            )}

            {/* Modal: AMA */}
            {activeModal === "ama" && (
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#4D354E] text-[#93F1E3]">
                    <HelpCircle size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#FDF8F0]">Ask Me Anything (AMA)</h3>
                    <p className="text-xs text-[#FDF8F0]/60 font-mono">Send a question directly to my inbox</p>
                  </div>
                </div>

                {amaSent ? (
                  <div className="p-6 rounded-xl bg-[#4D354E] text-center flex flex-col items-center gap-2">
                    <Check size={28} className="text-[#93F1E3]" />
                    <span className="text-sm font-bold text-[#FDF8F0]">Question dispatched!</span>
                    <p className="text-xs text-[#FDF8F0]/70 font-mono">I usually reply via email or public notes.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSendAMA} className="flex flex-col gap-4">
                    <textarea
                      required
                      rows={4}
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      placeholder="Ask about TKJ networking, monorepo architectures, or quant bots..."
                      className="w-full p-3.5 rounded-xl bg-[#4D354E] border border-[#FDF8F0]/15 text-sm text-[#FDF8F0] placeholder-[#FDF8F0]/40 focus:outline-none focus:border-[#93F1E3] resize-none font-sans"
                    />
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#FDF8F0] text-[#6E536F] hover:bg-[#93F1E3] font-bold text-xs uppercase tracking-wider transition-colors"
                    >
                      <Send size={13} />
                      <span>Send Anonymous Question</span>
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* Modal: LISTENING */}
            {activeModal === "listening" && (
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#4D354E] text-[#93F1E3]">
                    <Headphones size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#FDF8F0]">Currently Listening</h3>
                    <p className="text-xs text-[#FDF8F0]/60 font-mono">Audio telemetry for deep engineering focus</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#4D354E]/70 border border-[#FDF8F0]/10 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#93F1E3] animate-ping" />
                    <div>
                      <h4 className="text-sm font-bold text-[#FDF8F0]">Deep Techno &amp; Ambient Modular</h4>
                      <p className="text-xs text-[#FDF8F0]/60 font-mono">Focus playlist for algorithm construction</p>
                    </div>
                  </div>
                  <Music size={18} className="text-[#93F1E3]" />
                </div>

                <p className="text-xs text-[#FDF8F0]/75 font-sans leading-relaxed">
                  I listen to uninterrupted minimal rhythmic frequencies while debugging server logs and designing zero-latency trading state loops.
                </p>
              </div>
            )}

            {/* Modal: TIL */}
            {activeModal === "til" && (
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#4D354E] text-[#93F1E3]">
                    <Terminal size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#FDF8F0]">Today I Learned (TIL)</h3>
                    <p className="text-xs text-[#FDF8F0]/60 font-mono">Field snippets &amp; micro-learnings</p>
                  </div>
                </div>

                <div className="flex flex-col gap-3 text-xs font-mono">
                  <div className="p-3 rounded-lg bg-[#4D354E] border border-[#FDF8F0]/10">
                    <span className="text-[#93F1E3] block mb-1 font-bold">2026-02 // Next.js Turbopack Bundle Splitting</span>
                    <p className="text-[#FDF8F0]/80">Removing unnecessary client wrappers and using pure server components dropped TBT by 140ms on mobile throttled networks.</p>
                  </div>
                  <div className="p-3 rounded-lg bg-[#4D354E] border border-[#FDF8F0]/10">
                    <span className="text-[#93F1E3] block mb-1 font-bold">2026-01 // MetaTrader 5 Zero-Sleep Tick Dispatch</span>
                    <p className="text-[#FDF8F0]/80">Switching from polled loop intervals to event-driven tick callbacks reduced order latency from 45ms to 8ms.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Modal: WRITING READ VIEW */}
            {activeModal.startsWith("post-") && (
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#4D354E] text-[#93F1E3]">
                    <BookOpen size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#FDF8F0]">Reading Note</h3>
                    <p className="text-xs text-[#FDF8F0]/60 font-mono">Archive article view</p>
                  </div>
                </div>

                <div className="flex flex-col gap-4 text-sm text-[#FDF8F0]/80 leading-relaxed font-sans">
                  <p>
                    This note explores the architectural crossover between hardware networking diagnostics and high-throughput cloud microservices.
                  </p>
                  <p className="text-xs font-mono text-[#93F1E3] p-3 rounded-lg bg-[#4D354E]">
                    // Key Takeway: When software engineers understand the physical NIC switches and packet transmission limits, they write more resilient, deterministic data structures.
                  </p>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </main>
  );
}
