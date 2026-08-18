"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const techStack = [
  "Next.js",
  "React",
  "Tailwind CSS",
  "GSAP",
  "Lenis",
  "PHP",
  "MySQL",
  "Java",
  "Git",
];

export default function TechMarquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!marqueeRef.current) return;

    const marquee = marqueeRef.current;
    
    // We duplicate the content to make it seamless
    const contentWidth = marquee.scrollWidth / 2;

    const tl = gsap.to(marquee, {
      x: -contentWidth,
      ease: "none",
      duration: 20,
      repeat: -1,
    });

    const handleMouseEnter = () => tl.timeScale(2.5); // Speed up on hover
    const handleMouseLeave = () => tl.timeScale(1);   // Return to normal

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
      tl.kill();
    };
  }, []);

  return (
    <section ref={containerRef} className="w-full overflow-hidden bg-accent text-white py-12 md:py-20 border-y border-white/20 select-none flex">
      <div ref={marqueeRef} className="flex whitespace-nowrap items-center will-change-transform">
        {/* Render the list twice for seamless loop */}
        {[...techStack, ...techStack].map((tech, index) => (
          <div key={index} className="flex items-center px-8 md:px-16">
            <span className="text-4xl md:text-7xl font-outfit font-black tracking-tighter uppercase text-transparent" style={{ WebkitTextStroke: "2px white" }}>
              {tech}
            </span>
            <span className="ml-8 md:ml-16 text-3xl text-white/50">*</span>
          </div>
        ))}
      </div>
    </section>
  );
}
