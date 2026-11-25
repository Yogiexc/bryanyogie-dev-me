"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import PageTransition from "@/components/PageTransition";
import TiltedCard from "@/components/reactbits/TiltedCard";
import { ArrowLeft, MapPin, Calendar, Camera, X } from "lucide-react";

interface JourneyMoment {
  id: string;
  title: string;
  category: "University & Labs" | "Field & Networking" | "Projects & Hackathon" | "Life & Moments";
  period: string;
  location: string;
  desc: string;
  image: string;
  aspect: "landscape" | "portrait" | "square";
  tags: string[];
}

const journeyMoments: JourneyMoment[] = [
  {
    id: "pbl-kodegiri",
    title: "Project-Based Learning & Team Sprint",
    category: "Projects & Hackathon",
    period: "2024",
    location: "Kodegiri Office, Surakarta",
    desc: "Collaborative production sprints building real-world governance web portals alongside peers and industry mentors.",
    image: "/image/ditempatPBL_kodegiri.webp",
    aspect: "landscape",
    tags: ["PBL", "Next.js", "Team Sprint"],
  },
  {
    id: "penghargaan",
    title: "Academic Recognition & Milestone Award",
    category: "Projects & Hackathon",
    period: "2024",
    location: "Campus Auditorium, UNS",
    desc: "Honored with recognition during academic and technical evaluations in informatics engineering.",
    image: "/image/akudapatpenghargaan.webp",
    aspect: "portrait",
    tags: ["Award", "Academic Excellence", "Informatics"],
  },
  {
    id: "pkl-tkj",
    title: "Vocational Network Field Training (PKL TKJ)",
    category: "Field & Networking",
    period: "2022 - 2023",
    location: "Field Data & Server Room",
    desc: "Three formative years of structured cabling, routing tables, MikroTik RouterOS troubleshooting, and physical rack management.",
    image: "/image/pkltkj.webp",
    aspect: "landscape",
    tags: ["MikroTik", "Server Rack", "Structured Cabling", "VLAN"],
  },
  {
    id: "iot-arduino",
    title: "Embedded Systems & IoT Hardware Lab",
    category: "Field & Networking",
    period: "2024",
    location: "Informatics Hardware Lab",
    desc: "Prototyping sensor telemetry and logic controllers with Arduino UNO, breadboards, and virtual network simulations.",
    image: "/image/nyetingIOT_arduinoUNO.webp",
    aspect: "landscape",
    tags: ["Arduino UNO", "Sensors", "Microcontrollers"],
  },
  {
    id: "matkul-jaringan",
    title: "Advanced Computer Networks Coursework",
    category: "University & Labs",
    period: "2024",
    location: "UNS Computer Lab",
    desc: "Hands-on packet inspection, OSI layer diagnostics, Wireshark frame analysis, and routing protocol simulations.",
    image: "/image/matkulJaringan.webp",
    aspect: "landscape",
    tags: ["Network Architecture", "Wireshark", "Packet Analysis"],
  },
  {
    id: "matkul-fiddin",
    title: "Interactive Classroom & Software Systems Lecture",
    category: "University & Labs",
    period: "2023 - 2024",
    location: "UNS Lecture Hall",
    desc: "Studying algorithmic complexity, database design, and object-oriented software patterns under academic guidance.",
    image: "/image/matkul_pakFiddin.webp",
    aspect: "landscape",
    tags: ["Algorithms", "Database Design", "UNS"],
  },
  {
    id: "lomba-kampus",
    title: "University Tech Competition & Showcase",
    category: "Projects & Hackathon",
    period: "2024",
    location: "Surakarta",
    desc: "Presenting software prototypes and defending technical architectural choices in campus engineering competitions.",
    image: "/image/lombadikampus.webp",
    aspect: "landscape",
    tags: ["Competition", "Tech Pitch", "System Architecture"],
  },
  {
    id: "kerkom-kampus",
    title: "Engineering Team Collaboration",
    category: "University & Labs",
    period: "2024",
    location: "UNS Campus Grounds",
    desc: "Deep group coding sessions breaking down monolithic modules into clean API contracts and frontend views.",
    image: "/image/kerkom_dikampus.webp",
    aspect: "landscape",
    tags: ["Peer Review", "Git Monorepo", "Frontend Integration"],
  },
  {
    id: "dikampus",
    title: "Faculty Community & Informatics Brotherhood",
    category: "University & Labs",
    period: "2023 - Present",
    location: "Vocational College, UNS",
    desc: "Proud cohort of Diploma 3 Informatics Engineering students at Universitas Sebelas Maret.",
    image: "/image/dikampus.webp",
    aspect: "landscape",
    tags: ["UNS Surakarta", "D3 TI", "Cohort"],
  },
  {
    id: "tugas-bareng",
    title: "Late-Night Architecture & Debugging Session",
    category: "University & Labs",
    period: "2024",
    location: "Study Space, Surakarta",
    desc: "Working through schema migrations, edge cases, and asynchronous worker queues through the evening.",
    image: "/image/dokumentasi_saat_ngerjain_tugas_bareng.webp",
    aspect: "landscape",
    tags: ["Late Night Coding", "Debug Sprints"],
  },
  {
    id: "klaten-sprint",
    title: "Off-Campus Hack & Project Gathering",
    category: "Projects & Hackathon",
    period: "2024",
    location: "Klaten, Central Java",
    desc: "Weekend coding camp building client interfaces and refining database models in a relaxed team environment.",
    image: "/image/dokumentasi_dirumah_ilham_Klaten.webp",
    aspect: "landscape",
    tags: ["Off-Campus Sprint", "Peer Collaboration"],
  },
  {
    id: "ngoding-shelter",
    title: "Nomadic Engineering & Code Anywhere",
    category: "Life & Moments",
    period: "2024",
    location: "Shelter Manahan, Surakarta",
    desc: "Polishing UI states and testing API latency outdoors at Manahan shelter.",
    image: "/image/ngoding-diShelter_manahan.webp",
    aspect: "landscape",
    tags: ["Remote Coding", "Mobile Workstation"],
  },
  {
    id: "ngoding-zoom",
    title: "Remote Pair-Programming & Synchronous Calls",
    category: "University & Labs",
    period: "2023",
    location: "Home Office Workstation",
    desc: "Reviewing code merges, discussing system requirements, and pair debugging over screen shares.",
    image: "/image/ngoding+zoom.webp",
    aspect: "landscape",
    tags: ["Remote Pair Programming", "Virtual Sprints"],
  },
  {
    id: "pantai",
    title: "Reset & Horizon Reflection",
    category: "Life & Moments",
    period: "2024",
    location: "Coastal Java",
    desc: "Stepping away from terminals and glowing screens to recharge, maintain mental clarity, and broaden perspective.",
    image: "/image/aku_dipantai.webp",
    aspect: "portrait",
    tags: ["Life Beyond Terminal", "Mindset", "Clarity"],
  },
];

const categories = ["All", "Field & Networking", "University & Labs", "Projects & Hackathon", "Life & Moments"] as const;

export default function JourneyPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activePhoto, setActivePhoto] = useState<JourneyMoment | null>(null);

  const filtered = journeyMoments.filter(
    (item) => selectedCategory === "All" || item.category === selectedCategory
  );

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#1C121E] text-[#FDF8F0] selection:bg-[#FF6B00] selection:text-white antialiased relative overflow-hidden">
        {/* Subtle Ambient Backdrops */}
        <div className="pointer-events-none absolute top-[-5%] left-1/4 w-[700px] h-[350px] bg-[#FF6B00]/8 blur-[160px] rounded-full -z-10" />
        <div className="pointer-events-none absolute bottom-[10%] right-[-5%] w-[600px] h-[400px] bg-[#FF6B00]/5 blur-[180px] rounded-full -z-10" />

        <SiteHeader />

        <main className="max-w-6xl mx-auto px-6 md:px-12 pt-32 pb-28 flex flex-col gap-12">
          
          {/* Header Navigation */}
          <div className="flex items-center justify-between border-b border-[#FDF8F0]/10 pb-4">
            <Link
              href="/"
              className="text-xs font-mono text-[#FDF8F0]/70 hover:text-[#FF6B00] inline-flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft size={13} />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center gap-2 text-xs font-mono text-[#FF6B00]">
              <Camera size={13} />
              <span>{filtered.length} Authentic Archives</span>
            </div>
          </div>

          {/* Editorial Headline */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex flex-col gap-3 max-w-2xl">
              <span className="text-xs font-mono font-bold tracking-widest text-[#FF6B00] uppercase">
                Field Documentation // 2022 - 2026
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-outfit font-black tracking-tight text-[#FDF8F0] leading-[1.08]">
                Real Engineering, Real Journey.
              </h1>
              <p className="text-sm sm:text-base text-[#FDF8F0]/80 font-sans leading-relaxed pt-1">
                From crimping ethernet cables in vocational server rooms (SMK TKJ) to informatics lab sessions, competitive software prototypes, and collaborative hackathons across Central Java.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap ${
                    selectedCategory === cat
                      ? "bg-[#FF6B00] text-white font-bold shadow-md shadow-[#FF6B00]/25"
                      : "bg-[#2D1D31] text-[#FDF8F0]/70 hover:text-[#FDF8F0] border border-[#FDF8F0]/10 hover:border-[#FF6B00]/30"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Masonry Documentary Wall */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => setActivePhoto(item)}
                className="break-inside-avoid group cursor-pointer"
              >
                <TiltedCard maxTilt={6} scale={1.015}>
                  <div className="relative rounded-2xl bg-[#2D1D31]/80 border border-[#FDF8F0]/12 hover:border-[#FF6B00]/50 p-4 flex flex-col gap-3.5 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-[#FF6B00]/10 overflow-hidden">
                    
                    {/* Photo Container */}
                    <div className="relative w-full rounded-xl overflow-hidden bg-[#1C121E]">
                      <div className={item.aspect === "portrait" ? "aspect-[3/4]" : "aspect-[16/10]"}>
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover filter brightness-95 group-hover:scale-103 group-hover:brightness-105 transition-all duration-500"
                        />
                      </div>
                      
                      {/* Floating Meta Badge on image */}
                      <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md bg-[#1C121E]/80 backdrop-blur-md border border-[#FDF8F0]/15 text-[10px] font-mono text-[#FF6B00] font-bold">
                        {item.period}
                      </div>
                    </div>

                    {/* Captions & Story */}
                    <div className="flex flex-col gap-1.5 px-1">
                      <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#FDF8F0]/50">
                        <MapPin size={11} className="text-[#FF6B00]" />
                        <span>{item.location}</span>
                      </div>

                      <h3 className="text-base font-outfit font-bold text-[#FDF8F0] group-hover:text-[#FF6B00] transition-colors leading-snug">
                        {item.title}
                      </h3>

                      <p className="text-xs text-[#FDF8F0]/75 font-sans leading-relaxed line-clamp-3">
                        {item.desc}
                      </p>

                      {/* Micro Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1C121E] text-[#FDF8F0]/70 border border-[#FDF8F0]/10"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>
                </TiltedCard>
              </div>
            ))}
          </div>

          {/* Modal Photo Inspector */}
          {activePhoto && (
            <div
              className="fixed inset-0 z-50 bg-[#1C121E]/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
              onClick={() => setActivePhoto(null)}
            >
              <div
                className="relative max-w-4xl w-full bg-[#2D1D31] rounded-3xl border border-[#FDF8F0]/20 overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setActivePhoto(null)}
                  className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#1C121E]/80 text-[#FDF8F0] hover:text-[#FF6B00] flex items-center justify-center border border-[#FDF8F0]/20 cursor-pointer"
                >
                  <X size={18} />
                </button>

                {/* Left: Big Photo */}
                <div className="relative w-full md:w-3/5 min-h-[300px] sm:min-h-[420px] bg-[#1C121E]">
                  <Image
                    src={activePhoto.image}
                    alt={activePhoto.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 60vw"
                    className="object-contain p-2"
                  />
                </div>

                {/* Right: Detailed Context */}
                <div className="w-full md:w-2/5 p-6 sm:p-8 flex flex-col justify-between gap-6 overflow-y-auto">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full bg-[#FF6B00]/20 text-[#FF6B00] border border-[#FF6B00]/40 text-xs font-mono font-bold">
                        {activePhoto.period}
                      </span>
                      <span className="text-xs font-mono text-[#FDF8F0]/50">
                        {activePhoto.category}
                      </span>
                    </div>

                    <h2 className="text-2xl font-outfit font-black text-[#FDF8F0] leading-tight">
                      {activePhoto.title}
                    </h2>

                    <div className="flex items-center gap-1.5 text-xs font-mono text-[#FF6B00]">
                      <MapPin size={12} />
                      <span>{activePhoto.location}</span>
                    </div>

                    <p className="text-sm text-[#FDF8F0]/85 font-sans leading-relaxed pt-2">
                      {activePhoto.desc}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-3">
                      {activePhoto.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-[#1C121E] text-[#FDF8F0]/80 border border-[#FDF8F0]/15"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-[#FDF8F0]/10 pt-4 flex items-center justify-between text-xs font-mono text-[#FDF8F0]/40">
                    <span>Archive Entry // BYS</span>
                    <span>Surakarta, ID</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <footer className="border-t border-[#FDF8F0]/15 pt-8 flex items-center justify-between text-xs font-mono text-[#FDF8F0]/60">
            <span>&copy; {new Date().getFullYear()} Bryan Yogie Saputra</span>
            <Link href="/projects" className="text-[#FF6B00] hover:underline font-bold">
              Explore Projects ↗
            </Link>
          </footer>

        </main>
      </div>
    </PageTransition>
  );
}
