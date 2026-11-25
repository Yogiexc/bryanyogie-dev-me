"use client";

import React, { useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

interface TiltedCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
}

export default function TiltedCard({
  children,
  className = "",
  maxTilt = 12,
  scale = 1.02,
}: TiltedCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);
  const cardScale = useSpring(1, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;

    rotateX.set(-mouseY * maxTilt * 2);
    rotateY.set(mouseX * maxTilt * 2);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    cardScale.set(scale);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
    cardScale.set(1);
  };

  return (
    <div
      style={{ perspective: 1000 }}
      className={`relative inline-block w-full ${className}`}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          scale: cardScale,
          transformStyle: "preserve-3d",
        }}
        className="w-full h-full will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
