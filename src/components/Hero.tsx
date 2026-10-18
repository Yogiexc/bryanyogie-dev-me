"use client";

import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";
import dynamic from "next/dynamic";
import AuroraBackground from "@/components/AuroraBackground";
import GlitchText from "@/components/GlitchText";
import ProfileCard from "@/components/ProfileCard";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const title1Ref = useRef<HTMLHeadingElement>(null);
  const title2Ref = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const tl = gsap.timeline({ delay: 0.2 });

    tl.fromTo(
      [subtitleRef.current, title1Ref.current, title2Ref.current],
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out",
      }
    ).fromTo(
      scrollHintRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
      "-=0.5"
    );

    // Parallax effect on scroll
    gsap.to(".hero-content", {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full flex flex-col justify-center px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      <AuroraBackground />
      
      <div className="relative z-10 flex flex-col lg:flex-row items-center w-full h-full pt-20 lg:pt-0">
        {/* Text Section */}
        <div className="w-full lg:w-3/5 mt-10 lg:mt-0 hero-content pointer-events-none flex flex-col justify-center h-auto lg:h-full flex-1">
          <p
            ref={subtitleRef}
            className="text-mint font-mono text-sm md:text-base uppercase tracking-widest mb-4 opacity-0 flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-flare animate-ping inline-block" />
            Informatics Engineering • Network & Web Developer
          </p>
          <div className="relative">
            <h1
              ref={title1Ref}
              className="text-5xl md:text-7xl lg:text-[5vw] xl:text-[6vw] font-outfit font-black tracking-tighter leading-none text-foreground opacity-0 uppercase"
            >
              <GlitchText text="BRYAN YOGIE" />
            </h1>
          </div>
          <div className="relative mt-2">
            <h1
              ref={title2Ref}
              className="text-5xl md:text-7xl lg:text-[5vw] xl:text-[6vw] font-outfit font-black tracking-tighter leading-none text-mint opacity-0 uppercase pb-6"
              style={{ WebkitTextStroke: "1px rgba(185,245,216,0.3)" }}
            >
              <GlitchText text="SAPUTRA" />
            </h1>
          </div>
        </div>

        {/* Interactive 3D Tilt Profile Card */}
        <div className="w-full lg:w-2/5 h-auto lg:h-full z-20 pointer-events-auto flex flex-1 items-center justify-center lg:justify-end mt-4 lg:mt-0 pb-10 lg:pb-0 relative">
          <div className="w-full h-full flex items-center justify-center scale-[0.65] sm:scale-75 md:scale-90 lg:scale-100 transform origin-center">
            <ProfileCard />
          </div>
        </div>
      </div>

      <div
        ref={scrollHintRef}
        className="absolute bottom-10 lg:bottom-20 left-6 md:left-12 lg:left-24 flex flex-col items-center gap-4 opacity-0 z-10"
      >
        <span className="text-xs font-mono uppercase tracking-widest text-white/50" style={{ writingMode: 'vertical-rl' }}>
          Scroll
        </span>
        <div className="w-[1px] h-12 md:h-16 bg-white/30 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-scroll-down" />
        </div>
      </div>
    </section>
  );
}
