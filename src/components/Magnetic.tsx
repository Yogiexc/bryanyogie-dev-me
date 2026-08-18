"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Magnetic({ children }: { children: React.ReactElement }) {
  const magneticRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const magnetic = magneticRef.current;
    if (!magnetic) return;

    const xTo = gsap.quickTo(magnetic, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(magnetic, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = magnetic.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      
      // Calculate pull strength
      const pullStrength = 0.5; // adjust to make it stronger/weaker
      xTo(x * pullStrength);
      yTo(y * pullStrength);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    magnetic.addEventListener("mousemove", handleMouseMove);
    magnetic.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      magnetic.removeEventListener("mousemove", handleMouseMove);
      magnetic.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return React.cloneElement(children as React.ReactElement<any>, { ref: magneticRef });
}
