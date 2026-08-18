"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface ImageTrailProps {
  images: string[];
  children?: React.ReactNode;
}

export default function ImageTrail({ images, children }: ImageTrailProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [trail, setTrail] = useState<{ x: number; y: number; img: string; id: number }[]>([]);
  const lastPos = useRef({ x: 0, y: 0 });
  const index = useRef(0);
  const idCounter = useRef(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const dx = x - lastPos.current.x;
    const dy = y - lastPos.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 100) { // Spawn a new image every 100px
      const img = images[index.current % images.length];
      const newId = idCounter.current++;
      
      setTrail((prev) => [...prev.slice(-15), { x, y, img, id: newId }]); // keep max 15 images
      lastPos.current = { x, y };
      index.current++;

      // Remove the image after a delay
      setTimeout(() => {
        setTrail((prev) => prev.filter((item) => item.id !== newId));
      }, 1500);
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-full overflow-hidden"
    >
      <AnimatePresence>
        {trail.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0, x: "-50%", y: "-50%" }}
            animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.5 } }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute pointer-events-none rounded-2xl overflow-hidden shadow-2xl border border-white/20 z-0"
            style={{ 
              left: item.x, 
              top: item.y,
              width: "200px",
              height: "250px",
              rotate: (item.id % 2 === 0 ? 1 : -1) * (10 + (item.id % 10))
            }}
          >
            <Image src={item.img} alt="Trail" fill className="object-cover" />
          </motion.div>
        ))}
      </AnimatePresence>
      <div className="relative z-10 pointer-events-none h-full w-full">
        {children}
      </div>
    </div>
  );
}
