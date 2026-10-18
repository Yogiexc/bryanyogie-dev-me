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
  const springConfig = { damping: 20, stiffness: 300 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Map mouse position to rotation values (tilt effect)
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Calculate normalized mouse position from center (-0.5 to 0.5)
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
    <div className="w-full h-full flex items-center justify-center p-8 lg:p-16">
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
        className="relative w-full max-w-md aspect-[3/4] rounded-2xl cursor-pointer"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        {/* Glow effect behind the card */}
        <div className="absolute inset-0 bg-gradient-to-tr from-accent/40 to-blue-500/40 rounded-2xl blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Card Content */}
        <div className="absolute inset-0 bg-secondary/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col items-center justify-center p-6">
          
          {/* Picture Frame */}
          <div 
            className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-full border-4 border-accent/30 overflow-hidden shadow-lg mb-6"
            style={{ transform: "translateZ(50px)" }} // Pop out effect
          >
            <PixelSwap 
              className="w-full h-full aspect-square cursor-pointer"
              trigger="click"
              pixelSize={32}
              duration={900}
              pixelDuration={350}
              firstContent={
                <Image
                  src="/image/profil.jpg"
                  alt="Profile Picture"
                  fill
                  className="object-cover"
                />
              }
              secondContent={
                <Image
                  src="/image/aku_dipantai.png"
                  alt="Profile Picture Alternate"
                  fill
                  className="object-cover"
                />
              }
            />
          </div>

          <motion.div 
            style={{ transform: "translateZ(30px)" }}
            className="text-center"
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight">
              Bryan Yogie Saputra
            </h3>
            <p className="text-sm sm:text-base text-gray-400 uppercase tracking-widest font-mono">
              Informatics Engineering
            </p>
          </motion.div>

          {/* Decorative Elements */}
          <div className="absolute top-4 right-4 flex space-x-2">
            <div className="w-2 h-2 rounded-full bg-red-500/80" />
            <div className="w-2 h-2 rounded-full bg-yellow-500/80" />
            <div className="w-2 h-2 rounded-full bg-green-500/80" />
          </div>

          <div 
            className="absolute bottom-4 left-4 right-4 flex justify-between items-end"
            style={{ transform: "translateZ(20px)" }}
          >
            <div className="text-xs font-mono text-white/50">ID: BYS-2026</div>
            <div className="text-xs font-mono text-white/50">ACCESS: GRANTED</div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
