"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import PixelSwap from "@/components/PixelSwap";

export default function ProfileCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isFinePointer, setIsFinePointer] = useState(false);

  useEffect(() => {
    // Only enable 3D mouse tilt on desktop mouse devices (prevents jumpy touch scroll on mobile)
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches && !window.matchMedia("(pointer: coarse)").matches;
    setIsFinePointer(hasFinePointer);
  }, []);

  // Mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out mouse spring values
  const springConfig = { damping: 28, stiffness: 180 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Subtle 3D tilt mapping
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isFinePointer || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div className="w-full flex items-center justify-center [perspective:1000px]">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={
          isFinePointer
            ? { rotateX, rotateY, transformStyle: "preserve-3d" }
            : undefined
        }
        className="relative w-64 sm:w-72 md:w-80 aspect-[4/5] cursor-pointer group"
      >
        {/* Soft Ambient Backdrop Aura */}
        <div className="absolute inset-0 bg-[#93F1E3]/10 rounded-3xl blur-2xl opacity-40 group-hover:opacity-70 transition-opacity duration-500 pointer-events-none" />

        {/* Minimalist Precision Studio Card */}
        <div className="absolute inset-0 bg-[#5C435D]/90 backdrop-blur-md rounded-3xl border border-[#93F1E3]/15 group-hover:border-[#93F1E3]/40 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-all duration-300 flex flex-col justify-between p-5">
          
          {/* Header Bar */}
          <div className="flex items-center justify-between text-[11px] font-mono text-[#FDF8F0]/50 z-20">
            <span className="flex items-center gap-1.5 text-[#93F1E3] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#93F1E3]" />
              ID: BYS-2026
            </span>
            <span className="text-[#FF7043] text-[10px] tracking-wider uppercase font-mono">TAP TO SWAP</span>
          </div>

          {/* Portrait Photo Container */}
          <div className="relative w-full aspect-square my-auto rounded-2xl overflow-hidden border border-[#4D354E] shadow-inner group-hover:border-[#93F1E3]/25 transition-colors">
            <PixelSwap 
              className="w-full h-full aspect-square cursor-pointer"
              trigger="click"
              pixelSize={20}
              duration={600}
              pixelDuration={200}
              firstContent={
                <Image
                  src="/image/profil.webp"
                  alt="Bryan Yogie Portrait"
                  fill
                  priority
                  sizes="(max-width: 640px) 250px, (max-width: 1024px) 300px, 320px"
                  className="object-cover object-center filter brightness-95 contrast-105 group-hover:scale-102 transition-transform duration-500"
                />
              }
              secondContent={
                <Image
                  src="/image/aku_dipantai.webp"
                  alt="Bryan Yogie Beach Portrait"
                  fill
                  sizes="(max-width: 640px) 250px, (max-width: 1024px) 300px, 320px"
                  className="object-cover object-center filter brightness-95 contrast-105 group-hover:scale-102 transition-transform duration-500"
                />
              }
            />
          </div>

          {/* Footer Bar */}
          <div className="flex items-center justify-between text-[11px] font-mono text-[#FDF8F0]/60 pt-2 border-t border-[#93F1E3]/10 z-20">
            <span>SURAKARTA</span>
            <span className="text-[#93F1E3] text-[10px]">UNS INFORMATICS</span>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
