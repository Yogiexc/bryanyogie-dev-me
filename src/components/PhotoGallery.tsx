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
      
      {/* Background DriftWall */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <DriftWall 
          items={photos.map((p) => ({ image: p.src }))} 
          overlayColor="#050505"
          grayscale={true}
          speed={18}
          columns={4}
          tileWidth={160}
          tileHeight={110}
          gap={12}
        />
      </div>

      <ImageTrail images={photos.map((p) => p.src)}>
        <div className="gallery-content flex flex-col items-center justify-center h-full px-6 md:px-12 lg:px-24 pointer-events-none relative z-10 pt-24">
          
          <div className="text-center bg-[#050505]/70 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-2xl pointer-events-auto">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-outfit font-black tracking-tighter uppercase text-white mb-4">
              Behind The Scenes
            </h2>
            <p className="text-white/60 font-mono text-sm md:text-base max-w-lg mx-auto">
              A glimpse into my daily life, late-night coding sessions, and random moments caught on camera.
            </p>
          </div>
          
        </div>
      </ImageTrail>
    </section>
  );
}
