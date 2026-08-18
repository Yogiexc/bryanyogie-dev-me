"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function AuroraBackground() {
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const blob3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Smooth, slow moving blobs to simulate Aurora effect
    const ctx = gsap.context(() => {
      gsap.to(blob1Ref.current, {
        x: "30vw",
        y: "20vh",
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(blob2Ref.current, {
        x: "-40vw",
        y: "30vh",
        duration: 25,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(blob3Ref.current, {
        x: "20vw",
        y: "-30vh",
        duration: 30,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 mix-blend-screen opacity-60">
      <div 
        ref={blob1Ref}
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-600/30 blur-[120px]"
      />
      <div 
        ref={blob2Ref}
        className="absolute top-[20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-purple-600/30 blur-[150px]"
      />
      <div 
        ref={blob3Ref}
        className="absolute bottom-[-20%] left-[20%] w-[70vw] h-[70vw] rounded-full bg-emerald-500/20 blur-[130px]"
      />
      <div className="absolute inset-0 bg-background/50 backdrop-blur-[50px]" />
    </div>
  );
}
