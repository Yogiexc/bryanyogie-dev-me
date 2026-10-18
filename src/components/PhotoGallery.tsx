"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DriftWall from "@/components/DriftWall";
import ImageTrail from "@/components/ImageTrail";

const photos = [
  { id: 1, title: "University Life", span: "col-span-1 md:col-span-2 row-span-2", color: "#3b82f6", src: "/image/dikampus.jpg" },
  { id: 2, title: "Late Night Coding", span: "col-span-1 row-span-1", color: "#8b5cf6", src: "/image/malam.png" },
  { id: 3, title: "Office / Freelance", span: "col-span-1 row-span-1", color: "#10b981", src: "/image/bordir.jpg" },
  { id: 4, title: "Networking Lab", span: "col-span-1 md:col-span-2 row-span-1", color: "#f59e0b", src: "/image/pkltkj.jpg" },
  { id: 5, title: "Achievement", span: "col-span-1 row-span-1", color: "#ef4444", src: "/image/akudapatpenghargaan.png" },
  { id: 6, title: "PBL at Kodegiri", span: "col-span-1 row-span-1", color: "#eab308", src: "/image/ditempatPBL_kodegiri.png" },
  { id: 7, title: "Group Project", span: "col-span-1 row-span-1", color: "#14b8a6", src: "/image/dokumentasi_saat ngerjain tugas bareng.png" },
  { id: 8, title: "Campus Competition", span: "col-span-1 row-span-1", color: "#a855f7", src: "/image/lombadikampus.png" },
  { id: 9, title: "Lecture with Mr. Fiddin", span: "col-span-1 row-span-1", color: "#3b82f6", src: "/image/matkul_pakFiddin.png" },
  { id: 10, title: "Coding at Shelter", span: "col-span-1 row-span-1", color: "#10b981", src: "/image/ngoding-diShelter_manahan.png" },
  { id: 11, title: "Hardware / IoT", span: "col-span-1 row-span-1", color: "#f59e0b", src: "/image/nyetingIOT_arduinoUNO.png" },
  { id: 12, title: "Chilling at Beach", span: "col-span-1 row-span-1", color: "#0ea5e9", src: "/image/aku_dipantai.png" },
];

export default function PhotoGallery() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (containerRef.current) {
      gsap.fromTo(
        ".gallery-content",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );
    }
  }, []);

  return (
    <section ref={containerRef} className="bg-background w-full relative h-[100vh] md:h-[120vh] overflow-hidden">
      
      {/* DriftWall 3D Wall */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <DriftWall 
          items={photos.map((p) => ({ image: p.src, title: p.title }))} 
          overlayColor="#0a0a0a"
          grayscale={false}
          dim={0.75}
          fade={0.3}
          speed={22}
          columns={5}
          tileWidth={220}
          tileHeight={150}
          gap={16}
          tilt={12}
          turn={-8}
        />
      </div>

      <ImageTrail images={photos.map((p) => p.src)}>
        <div className="gallery-content flex flex-col items-center justify-center h-full px-6 md:px-12 lg:px-24 pointer-events-none relative z-10 pt-20">
          
          <div className="text-center bg-[#050505]/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] pointer-events-auto max-w-xl">
            <span className="text-accent font-mono text-xs uppercase tracking-widest px-3 py-1 rounded-full border border-accent/40 bg-accent/10 inline-block mb-3">
              Interactive 3D Canvas
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-outfit font-black tracking-tighter uppercase text-white mb-3">
              Behind The Scenes
            </h2>
            <p className="text-white/70 font-mono text-xs md:text-sm leading-relaxed">
              Hover & explore the moving memory wall. A glimpse into my daily life, coding sessions, and college journey.
            </p>
          </div>
          
        </div>
      </ImageTrail>
    </section>
  );
}
