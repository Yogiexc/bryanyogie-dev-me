import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import PageTransition from "@/components/PageTransition";
import NetworkConsole from "@/components/NetworkConsole";
import FloatingProjectList from "@/components/FloatingProjectList";
import ShinyText from "@/components/reactbits/ShinyText";
import DecryptedText from "@/components/reactbits/DecryptedText";
import TiltedCard from "@/components/reactbits/TiltedCard";
import { ArrowUpRight, FolderGit2, Award, Mail, GraduationCap, ArrowRight, Network, Code2, Server } from "lucide-react";

export default function Home() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-[#1C121E] text-[#FDF8F0] selection:bg-[#FF6B00] selection:text-white antialiased relative overflow-hidden">
        
        {/* Subtle Ambient Background Light */}
        <div className="pointer-events-none absolute top-[-5%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#FF6B00]/8 blur-[160px] rounded-full -z-10" />
        <div className="pointer-events-none absolute top-[55%] right-[-10%] w-[600px] h-[500px] bg-[#FF6B00]/5 blur-[180px] rounded-full -z-10" />

        <SiteHeader />

        <main className="max-w-5xl mx-auto px-6 md:px-12 pt-36 pb-28 flex flex-col gap-24">
          
          {/* 1. HERO: EDITORIAL ASYMMETRIC HEADLINE */}
          <section className="flex flex-col gap-10">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
              
              {/* Left Column: Big Headline & Bio */}
              <div className="flex flex-col gap-6 max-w-2xl">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B00] animate-pulse" />
                  <span className="text-xs font-mono font-bold tracking-widest text-[#FF6B00] uppercase">
                    <DecryptedText text="SURAKARTA, ID // UNS INFORMATICS" speed={30} />
                  </span>
                </div>

                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-outfit font-black tracking-tight text-[#FDF8F0] leading-[1.05]">
                  Bryan Yogie <br />
                  <span className="text-[#FF6B00]">Saputra.</span>
                </h1>

                <p className="text-lg sm:text-xl font-outfit font-bold text-[#FDF8F0]/90 leading-snug">
                  <ShinyText text="Fullstack developer with grounded network engineering roots." speed={4} />
                </p>

                <p className="text-sm sm:text-base text-[#FDF8F0]/75 font-sans leading-relaxed">
                  Informatics Engineering student at Universitas Sebelas Maret (UNS). Three years in vocational network engineering (SMK TKJ) gave me a visceral intuition for packet flows, VLANs, and server hardware before touching high-level code. Now I engineer high-performance web monorepos with Next.js &amp; NestJS, alongside quantitative Python automation.
                </p>

                {/* Primary Action Row */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    href="mailto:bryanyogie@student.uns.ac.id"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FF6B00] text-white font-mono text-xs font-bold hover:bg-[#FF8533] transition-all shadow-lg shadow-[#FF6B00]/25 cursor-pointer hover:translate-y-[-1px]"
                  >
                    <Mail size={14} />
                    <span>Get in Touch</span>
                  </a>
                  <a
                    href="https://wa.me/6285876941979"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full bg-[#2D1D31] text-[#FDF8F0] hover:text-[#FF6B00] border border-[#FDF8F0]/15 hover:border-[#FF6B00]/50 transition-colors font-mono text-xs font-semibold"
                  >
                    <span>WhatsApp</span>
                    <ArrowUpRight size={13} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/bryanyogiesaputra/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full bg-[#2D1D31] text-[#FDF8F0] hover:text-[#FF6B00] border border-[#FDF8F0]/15 hover:border-[#FF6B00]/50 transition-colors font-mono text-xs font-semibold"
                  >
                    <span>LinkedIn</span>
                    <ArrowUpRight size={13} />
                  </a>
                  <a
                    href="https://github.com/Yogiexc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full bg-[#2D1D31] text-[#FDF8F0] hover:text-[#FF6B00] border border-[#FDF8F0]/15 hover:border-[#FF6B00]/50 transition-colors font-mono text-xs font-semibold"
                  >
                    <span>GitHub</span>
                    <ArrowUpRight size={13} />
                  </a>
                </div>
              </div>

              {/* Right Column: Physical Badge & Photo */}
              <div className="flex flex-col items-start md:items-end gap-5">
                <TiltedCard maxTilt={12} scale={1.03}>
                  <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-3xl overflow-hidden border-2 border-[#FF6B00]/50 shadow-2xl shadow-[#FF6B00]/20 bg-[#2D1D31]">
                    <Image
                      src="/image/profil.webp"
                      alt="Bryan Yogie Saputra"
                      fill
                      priority
                      sizes="144px"
                      className="object-cover"
                    />
                  </div>
                </TiltedCard>

                <div className="text-left md:text-right flex flex-col gap-1 text-xs font-mono">
                  <span className="text-[#FF6B00] font-bold">STATUS: AVAILABLE</span>
                  <span className="text-[#FDF8F0]/60">Open for Internship 2026</span>
                  <span className="text-[#FDF8F0]/40 text-[11px]">Surakarta / Remote</span>
                </div>
              </div>

            </div>
          </section>

          {/* 2. REAL ENGINEERING EVIDENCE: LIVE PACKET CONSOLE (No boring boxes) */}
          <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-[#FDF8F0]/10 pb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF6B00]">
                Engineering Roots Telemetry
              </span>
              <span className="text-xs font-mono text-[#FDF8F0]/50">
                L2/L3 Network Intuition
              </span>
            </div>
            
            <NetworkConsole />
          </section>

          {/* 3. SHOWCASE: INTERACTIVE FLOATING PROJECT LIST */}
          <section className="flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-[#FDF8F0]/10 pb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF6B00]">
                Selected Production Work
              </span>
              <Link
                href="/projects"
                className="text-xs font-mono text-[#FF6B00] hover:underline inline-flex items-center gap-1.5 font-bold"
              >
                <FolderGit2 size={13} />
                <span>All 20+ Repositories ↗</span>
              </Link>
            </div>

            <FloatingProjectList />
          </section>

          {/* 4. FOUNDATIONS SUMMARY: ASYMMETRIC STRIP */}
          <section className="flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-[#FDF8F0]/10 pb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF6B00]">
                Academic &amp; Field Milestones
              </span>
              <div className="flex items-center gap-4 text-xs font-mono text-[#FF6B00]">
                <Link href="/certificates" className="hover:underline inline-flex items-center gap-1 font-bold">
                  <Award size={13} />
                  <span>Certificates (9) ↗</span>
                </Link>
                <Link href="/journey" className="hover:underline inline-flex items-center gap-1 font-bold">
                  <GraduationCap size={13} />
                  <span>Photo Journey (14) ↗</span>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-2">
              <div className="flex flex-col gap-2 border-l-2 border-[#FF6B00] pl-4">
                <span className="text-xs font-mono text-[#FF6B00] font-bold">2023 - PRESENT // HIGHER EDUCATION</span>
                <h3 className="text-xl font-outfit font-bold text-[#FDF8F0]">Diploma 3 Informatics Engineering</h3>
                <span className="text-xs font-mono text-[#FDF8F0]/60">Universitas Sebelas Maret (UNS), Surakarta</span>
                <p className="text-xs text-[#FDF8F0]/75 font-sans leading-relaxed pt-1">
                  Focusing on fullstack architectures, relational schema optimizations, and algorithm design.
                </p>
              </div>

              <div className="flex flex-col gap-2 border-l-2 border-[#FDF8F0]/20 pl-4">
                <span className="text-xs font-mono text-[#FDF8F0]/50 font-bold">GRADUATED // VOCATIONAL FOUNDATION</span>
                <h3 className="text-xl font-outfit font-bold text-[#FDF8F0]">Computer &amp; Network Engineering (TKJ)</h3>
                <span className="text-xs font-mono text-[#FDF8F0]/60">SMK Vocational High School</span>
                <p className="text-xs text-[#FDF8F0]/75 font-sans leading-relaxed pt-1">
                  Three years configuring physical patch panels, crimping cables, MikroTik routers, and server racks.
                </p>
              </div>
            </div>
          </section>

          {/* 5. FOOTER */}
          <footer className="border-t border-[#FDF8F0]/15 pt-10 pb-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-[#FDF8F0]/60">
            <div>
              <span>&copy; {new Date().getFullYear()} Bryan Yogie Saputra</span>
            </div>
            <div className="flex items-center gap-5">
              <a href="mailto:bryanyogie@student.uns.ac.id" className="hover:text-[#FF6B00] transition-colors">
                Email
              </a>
              <a href="https://wa.me/6285876941979" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF6B00] transition-colors">
                WhatsApp
              </a>
              <a href="https://www.linkedin.com/in/bryanyogiesaputra/" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF6B00] transition-colors">
                LinkedIn
              </a>
              <a href="https://github.com/Yogiexc" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF6B00] transition-colors">
                GitHub
              </a>
              <Link href="/projects" className="text-[#FF6B00] hover:underline font-bold">
                Projects
              </Link>
              <Link href="/journey" className="text-[#FF6B00] hover:underline font-bold">
                Journey
              </Link>
            </div>
          </footer>

        </main>
      </div>
    </PageTransition>
  );
}
