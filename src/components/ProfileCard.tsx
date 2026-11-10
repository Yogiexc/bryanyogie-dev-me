"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import PixelSwap from "@/components/PixelSwap";

export default function ProfileCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // Mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the mouse values
  const springConfig = { damping: 25, stiffness: 200 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Map mouse position to rotation values (subtle 3D tilt)
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-4 [perspective:1000px]">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-72 sm:w-80 md:w-96 aspect-[4/5] cursor-pointer group"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {/* Soft Organic Backlight Aura */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#FF7043]/20 via-[#B9F5D8]/25 to-transparent rounded-[2.5rem] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        {/* Frameless Editorial Studio Card */}
        <div className="absolute inset-0 bg-[#121F1F]/90 backdrop-blur-md rounded-[2.5rem] border border-[#B9F5D8]/20 group-hover:border-[#B9F5D8]/50 overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.7)] transition-colors duration-500 flex flex-col justify-between p-6">
          
          {/* Micro Editorial Header */}
          <div className="flex items-center justify-between text-[11px] font-mono text-[#F4F0E8]/50 z-20">
            <span className="flex items-center gap-1.5 text-[#B9F5D8] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B9F5D8] animate-ping" />
              PORTRAIT // 01
            </span>
            <span className="text-[#FF7043] font-semibold text-[10px] tracking-wider">CLICK TO SWAP</span>
          </div>

          {/* Clean PixelSwap Portrait Photo */}
          <div className="relative w-full aspect-square my-auto rounded-3xl overflow-hidden border border-[#182A2A] shadow-inner group-hover:border-[#B9F5D8]/30 transition-colors">
            <PixelSwap 
              className="w-full h-full aspect-square cursor-pointer"
              trigger="click"
              pixelSize={24}
              duration={700}
              pixelDuration={250}
              firstContent={
                <Image
                  src="/image/profil.webp"
                  alt="Bryan Yogie Portrait"
                  fill
                  priority
                  sizes="(max-width: 640px) 280px, (max-width: 1024px) 340px, 384px"
                  className="object-cover object-center filter brightness-95 contrast-105 group-hover:scale-105 transition-transform duration-700"
                />
              }
              secondContent={
                <Image
                  src="/image/aku_dipantai.webp"
                  alt="Bryan Yogie Beach Portrait"
                  fill
                  sizes="(max-width: 640px) 280px, (max-width: 1024px) 340px, 384px"
                  className="object-cover object-center filter brightness-95 contrast-105 group-hover:scale-105 transition-transform duration-700"
                />
              }
            />
          </div>

          {/* Bottom Minimalist Technical Footer */}
          <div className="z-20 pt-3 border-t border-[#182A2A] flex items-center justify-between font-mono text-xs text-[#F4F0E8]/70">
            <div>
              <span className="font-bold text-[#F4F0E8] block tracking-tight">Bryan Yogie Saputra</span>
              <span className="text-[10px] text-[#B9F5D8] uppercase tracking-wider">Informatics Engineer</span>
            </div>
            <span className="text-[10px] text-[#F4F0E8]/40">UNS 2026</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
