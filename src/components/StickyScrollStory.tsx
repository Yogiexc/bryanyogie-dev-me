"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

const Badge = ({ src, alt }: { src: string; alt: string }) => (
  <span className="inline-block align-middle mx-2 w-20 md:w-32 aspect-[3/1] relative rounded-full overflow-hidden border-2 border-mint shadow-[0_0_15px_rgba(185,245,216,0.4)] hover:scale-110 transition-transform duration-300 z-50">
    <Image src={src} alt={alt} fill className="object-cover grayscale hover:grayscale-0 transition-all duration-300" />
  </span>
);

const FloatImg = ({ src, children }: { src: string; children: React.ReactNode }) => (
  <span className="relative group inline-block cursor-pointer text-mint hover:text-flare transition-colors duration-300">
    {children}
    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-500 pointer-events-none z-[100] w-64 md:w-80 aspect-video rounded-xl overflow-hidden border-4 border-mint shadow-[0_0_30px_rgba(185,245,216,0.6)] mix-blend-normal">
      <Image src={src} alt="Hover Reveal" fill className="object-cover" />
    </span>
  </span>
);

const stories = [
  {
    title: "About Snapshot",
    content: (
      <>
        <span className="text-mint">Informatics Engineering</span> student with a solid background in Computer & Network Engineering <Badge src="/image/pkltkj.jpg" alt="TKJ" /> (TKJ). Passionate about bridging the gap between <FloatImg src="/image/matkulJaringan.png">hardware infrastructure</FloatImg> and software engineering.
      </>
    ),
  },
  {
    title: "Philosophy",
    content: (
      <>
        I believe in continuous learning and practical <span className="text-flare">problem-solving</span>. Every bug is a lesson, and every challenge is an opportunity to build something better <Badge src="/image/ngoding-diShelter_manahan.png" alt="Coding" /> and more efficient.
      </>
    ),
  },
  {
    title: "Skills & Tools",
    content: (
      <>
        Proficient in <span className="text-mint">Next.js</span>, React, Tailwind CSS, and GSAP for the frontend. Experienced with PHP, MySQL, and Java for backend and systems design <Badge src="/image/kerkom_dikampus.png" alt="Teamwork" />. <FloatImg src="/image/nyetingIOT_arduinoUNO.png">IoT enthusiast</FloatImg> and Cisco NetAcad certified in networking fundamentals.
      </>
    ),
  },
];

export default function StickyScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    // Set canvas to 16:9 ratio
    canvas.width = 1920;
    canvas.height = 1080;

    // Optimized On-Demand Frame Cache (prevents downloading 14MB / 240 images simultaneously at startup)
    const frameCount = 240;
    const currentFrame = (index: number) => 
      `/Secuence-BYS/ezgif-frame-${(index + 1).toString().padStart(3, '0')}.jpg`;

    const imageCache: Map<number, HTMLImageElement> = new Map();
    const seq = { frame: 0 };

    const loadFrame = (idx: number, onLoaded?: () => void) => {
      const clamped = Math.max(0, Math.min(frameCount - 1, idx));
      if (imageCache.has(clamped)) return imageCache.get(clamped)!;
      const img = new window.Image();
      img.src = currentFrame(clamped);
      if (onLoaded) img.onload = onLoaded;
      imageCache.set(clamped, img);
      return img;
    };

    // Preload initial frame + small buffer
    loadFrame(0, render);
    for (let i = 1; i < 8; i++) {
      loadFrame(i);
    }

    function render() {
      const img = loadFrame(seq.frame);
      if (img && img.complete && img.naturalWidth > 0) {
        context!.clearRect(0, 0, canvas!.width, canvas!.height);
        context!.filter = 'grayscale(100%) contrast(1.2)';
        context!.drawImage(img, 0, 0, canvas!.width, canvas!.height);
      } else if (img) {
        img.onload = () => {
          context!.clearRect(0, 0, canvas!.width, canvas!.height);
          context!.filter = 'grayscale(100%) contrast(1.2)';
          context!.drawImage(img, 0, 0, canvas!.width, canvas!.height);
        };
      }

      // Prefetch next 8 frames ahead of scroll
      for (let offset = 1; offset <= 8; offset++) {
        if (seq.frame + offset < frameCount) {
          loadFrame(seq.frame + offset);
        }
      }
    }

    const mm = gsap.matchMedia();

    if (containerRef.current && leftColumnRef.current) {
      
      mm.add("(min-width: 768px)", () => {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: leftColumnRef.current,
          id: "story-pin-desktop",
        });
      });

      // Animate the image sequence on scroll
      gsap.to(seq, {
        frame: frameCount - 1,
        snap: "frame",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
        },
        onUpdate: render,
      });

      // Animate the story cards
      const cards = gsap.utils.toArray<HTMLElement>(".story-card");
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0.1, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "center center",
              scrub: true,
            },
          }
        );
      });

      // Infinite Marquee animation
      gsap.to(".marquee-content", {
        xPercent: -50,
        repeat: -1,
        duration: 10,
        ease: "linear",
      });
    }

    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars.id?.startsWith('story-pin') || (t.vars.trigger instanceof Element && t.vars.trigger.classList.contains('story-card'))) t.kill();
      });
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-[#090f0f] border-t border-mint/20 flex flex-col md:flex-row px-0 py-0 overflow-hidden" id="about">
      
      {/* Infinite Marquee Background Strip */}
      <div className="absolute top-0 -left-[5vw] w-[110vw] h-20 bg-gradient-to-r from-cinder via-[#152727] to-cinder overflow-hidden flex items-center z-0 border-y-2 border-mint/30 origin-top-left -skew-y-2 shadow-2xl opacity-60 pointer-events-none">
        <div className="marquee-content flex whitespace-nowrap text-mint/40 font-outfit font-black text-5xl uppercase tracking-tighter">
          <span className="mx-4">BUILD YOUR STORY //</span>
          <span className="mx-4 text-flare/50">BRYAN YOGIE //</span>
          <span className="mx-4">BEHIND THE CODE //</span>
          <span className="mx-4 text-flare/50">BRYAN YOGIE //</span>
          <span className="mx-4">BUILD YOUR STORY //</span>
          <span className="mx-4 text-flare/50">BRYAN YOGIE //</span>
        </div>
      </div>

      {/* Left Column - Sticky Title & Cinematic Canvas Viewfinder (Pinned on Desktop) */}
      <div className="w-full md:w-1/2 h-screen sticky top-0 flex items-center justify-center p-6 md:p-12 lg:p-16 z-20" ref={leftColumnRef}>
        <div className="w-full max-w-xl relative flex flex-col justify-center">
          
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-flare animate-ping" />
            <span className="font-mono text-xs text-mint uppercase tracking-widest font-semibold">
              Visual Chronicle // BYS Sequence
            </span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-outfit font-black tracking-tighter uppercase mb-4 text-[#f4f0e8] leading-[0.9]">
            BEHIND <span className="text-mint">THE</span> CODE
          </h2>
          <p className="text-[#f4f0e8]/70 font-mono text-xs md:text-sm uppercase tracking-widest leading-relaxed mb-6">
            Scrub or scroll down to playback the visual narrative from hardware networking to fullstack engineering.
          </p>
          
          {/* Tech Viewfinder Canvas Frame */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden border-2 border-mint/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-[#0d1717]">
            {/* Viewfinder corner brackets */}
            <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-mint z-20" />
            <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-mint z-20" />
            <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-mint z-20" />
            <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-mint z-20" />

            {/* Live Sequence Canvas */}
            <canvas 
              ref={canvasRef} 
              className="absolute inset-0 w-full h-full object-cover filter contrast-125"
            />
            
            {/* HUD Status Bar */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-3 flex items-center justify-between z-20 text-[11px] font-mono text-white/80">
              <span className="flex items-center gap-1.5 text-mint font-semibold">
                <span className="w-2 h-2 rounded-full bg-mint animate-pulse" />
                FRAME STREAM: 240 FPS SYNC
              </span>
              <span className="text-flare font-bold">SCRUB TO PLAY ▶</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Scrolling Story Cards */}
      <div className="w-full md:w-1/2 flex flex-col pt-[20vh] pb-[40vh] md:pt-[35vh] md:pb-[45vh] gap-32 md:gap-48 px-6 md:px-12 lg:px-20 z-30 relative">
        {stories.map((story, index) => (
          <div 
            key={index} 
            className="story-card flex flex-col gap-5 p-8 md:p-10 rounded-3xl bg-[#142424]/80 backdrop-blur-xl border border-mint/20 shadow-[0_25px_60px_rgba(0,0,0,0.6)] hover:border-mint/50 transition-all duration-500"
          >
            <div className="flex items-center justify-between">
              <span className="text-mint font-mono text-xs tracking-widest uppercase border border-mint/40 bg-mint/10 px-3 py-1 rounded-full font-bold">
                0{index + 1} // {story.title}
              </span>
              <span className="text-flare/80 font-mono text-xs font-bold">STORY PHASE</span>
            </div>
            <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-outfit font-bold text-[#f4f0e8] leading-snug md:leading-tight tracking-tight">
              {story.content}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
