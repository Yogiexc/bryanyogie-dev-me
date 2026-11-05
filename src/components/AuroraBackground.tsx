"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function AuroraBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const blob3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect user's reduced motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let tween1: gsap.core.Tween;
    let tween2: gsap.core.Tween;
    let tween3: gsap.core.Tween;

    const ctx = gsap.context(() => {
      tween1 = gsap.to(blob1Ref.current, {
        x: "30vw",
        y: "20vh",
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      tween2 = gsap.to(blob2Ref.current, {
        x: "-40vw",
        y: "30vh",
        duration: 25,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      tween3 = gsap.to(blob3Ref.current, {
        x: "20vw",
        y: "-30vh",
        duration: 30,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);

    // Pause heavy blur animation when offscreen
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          tween1?.play();
          tween2?.play();
          tween3?.play();
        } else {
          tween1?.pause();
          tween2?.pause();
          tween3?.pause();
        }
      },
      { rootMargin: "100px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-40">
      <div 
        ref={blob1Ref}
        className="absolute top-[-10%] left-[-10%] w-[45vw] h-[45vw] rounded-full bg-[#182a2a]/70 blur-[90px]"
      />
      <div 
        ref={blob2Ref}
        className="absolute top-[20%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-[#b9f5d8]/15 blur-[100px]"
      />
      <div 
        ref={blob3Ref}
        className="absolute bottom-[-15%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-[#142424]/80 blur-[80px]"
      />
    </div>
  );
}
