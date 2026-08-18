"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const highlights = [
  { label: "Certifications", value: "9+ Earned", delay: 0 },
  { label: "Experience", value: "Freelance & Admin", delay: 0.1 },
  { label: "Projects", value: "5+ Completed", delay: 0.2 },
  { label: "Code", value: "Next.js & Java", delay: 0.3 },
];

export default function Highlights() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const cards = containerRef.current.querySelectorAll(".highlight-card");
      
      gsap.fromTo(
        cards,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          },
        }
      );

      // Subtle float animation
      cards.forEach((card, i) => {
        gsap.to(card, {
          y: "-=15",
          duration: 2 + i * 0.2,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
      });
    }
  }, []);

  return (
    <section ref={containerRef} className="py-32 px-6 md:px-24 bg-[#050505] relative z-10">
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {highlights.map((item, index) => (
          <div
            key={index}
            className="highlight-card bg-white/5 border border-white/10 rounded-3xl p-4 md:p-8 flex flex-col justify-center items-center text-center aspect-square md:aspect-auto md:h-64 backdrop-blur-sm hover:bg-white/10 transition-colors duration-500 cursor-default"
          >
            <h4 className="text-white/50 font-mono text-[10px] md:text-sm uppercase tracking-widest mb-2 md:mb-4">
              {item.label}
            </h4>
            <p className="text-xl md:text-3xl lg:text-4xl font-outfit font-bold text-white leading-tight">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
