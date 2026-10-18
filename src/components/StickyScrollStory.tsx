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

    const frameCount = 240;
    const currentFrame = (index: number) => 
      `/Secuence-BYS/ezgif-frame-${(index + 1).toString().padStart(3, '0')}.jpg`;

    const images: HTMLImageElement[] = [];
    const seq = { frame: 0 };

    for (let i = 0; i < frameCount; i++) {
      const img = new window.Image();
      img.src = currentFrame(i);
      images.push(img);
    }

    images[0].onload = render;

    function render() {
      if (images[seq.frame]) {
        context!.clearRect(0, 0, canvas!.width, canvas!.height);
        // Add a grayscale & high contrast filter to match Lando Norris style
        context!.filter = 'grayscale(100%) contrast(1.2)';
        context!.drawImage(images[seq.frame], 0, 0, canvas!.width, canvas!.height);
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
    <section ref={containerRef} className="relative w-full bg-black flex flex-col md:flex-row px-0 py-0" id="about">
      
      {/* Infinite Marquee Background Strip */}
      <div className="absolute top-0 -left-[5vw] w-[110vw] h-24 bg-gradient-to-r from-cinder via-[#1f3838] to-cinder overflow-hidden flex items-center z-0 border-y-4 border-mint/30 origin-top-left -skew-y-2 shadow-2xl">
        <div className="marquee-content flex whitespace-nowrap text-mint font-outfit font-black text-6xl uppercase tracking-tighter">
          <span className="mx-4">BUILD YOUR STORY //</span>
          <span className="mx-4 text-flare">BRYAN YOGIE //</span>
          <span className="mx-4">BEHIND THE CODE //</span>
          <span className="mx-4 text-flare">BRYAN YOGIE //</span>
          <span className="mx-4">BUILD YOUR STORY //</span>
          <span className="mx-4 text-flare">BRYAN YOGIE //</span>
        </div>
      </div>

      {/* Left Column - Sticky Title & Canvas (Sticky on mobile using CSS, Pin on Desktop via GSAP) */}
      <div className="w-full md:w-1/2 h-screen sticky top-0 flex items-center justify-center p-6 md:p-12 lg:p-24 z-10" ref={leftColumnRef}>
        <div className="w-full max-w-xl relative mt-24 md:mt-0">
          <h2 className="text-5xl md:text-8xl lg:text-9xl font-outfit font-black tracking-tighter uppercase mb-6 text-white leading-[0.8] mix-blend-difference z-20 relative drop-shadow-[0_0_15px_rgba(185,245,216,0.4)] pt-24 md:pt-12">
            BEHIND <br /> <span className="text-mint">THE</span> <br /> CODE
          </h2>
          <p className="text-white/80 font-mono text-xs md:text-sm uppercase tracking-widest leading-loose mb-12 mix-blend-difference">
            My journey from hardware networking to full-stack web development.
          </p>
          
          {/* GSAP Scroll Sequence Canvas */}
          <div className="relative w-full aspect-video rounded-none overflow-hidden">
            <canvas 
              ref={canvasRef} 
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Dark/Neon gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/80 to-mint/20 pointer-events-none mix-blend-overlay" />
          </div>
        </div>
      </div>

      {/* Right Column - Scrolling Content */}
      <div className="w-full md:w-1/2 flex flex-col pt-[30vh] pb-[30vh] md:pt-[50vh] md:pb-[50vh] gap-32 px-6 md:px-12 lg:px-24 z-30 relative bg-black/60 md:bg-transparent backdrop-blur-md md:backdrop-blur-none">
        {stories.map((story, index) => (
          <div key={index} className="story-card flex flex-col gap-4">
            <span className="text-mint font-mono text-sm tracking-widest uppercase border border-mint/40 bg-mint/5 self-start px-3 py-1 rounded-full">
              0{index + 1} // {story.title}
            </span>
            <div className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-outfit font-black text-white leading-tight md:leading-[0.9] tracking-tighter uppercase uppercase-text-shadow">
              {story.content}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
