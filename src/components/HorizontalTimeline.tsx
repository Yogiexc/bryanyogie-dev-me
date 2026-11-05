"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const timelineEvents = [
  {
    year: "2020",
    title: "TKJ Background",
    description: "Started my journey in Computer & Network Engineering. Learned the fundamentals of hardware, networking, and system administration.",
  },
  {
    year: "2023",
    title: "SMK Graduation",
    description: "Graduated vocational high school with hands-on experience in networking infrastructure and basic programming.",
  },
  {
    year: "2023-24",
    title: "Freelance & Operational Work",
    description: "Worked on freelance web development projects and handled administrative tasks, building real-world problem-solving skills.",
  },
  {
    year: "Present",
    title: "Informatics Engineering",
    description: "Pursuing my degree at Universitas Sebelas Maret, diving deep into software engineering, web development, and algorithms.",
  },
];

export default function HorizontalTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const isMobile = window.innerWidth < 768;
    
    // On desktop, pin and horizontal scroll. On mobile, allow standard responsive flow or pinned with auto height
    if (sectionRef.current && containerRef.current) {
      const containerWidth = containerRef.current.scrollWidth;
      const windowWidth = window.innerWidth;
      
      const pinTrigger = gsap.to(containerRef.current, {
        x: () => -(containerWidth - windowWidth),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${containerWidth * (isMobile ? 1.2 : 0.9)}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === sectionRef.current) st.kill();
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="h-screen min-h-[640px] w-full bg-[#090F0F] border-t border-[#182A2A] overflow-hidden flex flex-col justify-center relative">
      <div className="absolute top-8 sm:top-12 md:top-20 left-6 md:left-24 z-10">
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-outfit font-black uppercase tracking-tight text-[#F4F0E8]">
          My <span className="text-[#B9F5D8]">Journey</span>
        </h2>
      </div>

      <div ref={containerRef} className="flex h-auto items-center px-6 md:px-24 gap-6 sm:gap-10 md:gap-24 w-max mt-20 sm:mt-16 md:mt-10">
        {timelineEvents.map((event, index) => (
          <div key={index} className="flex flex-col w-[280px] sm:w-[340px] md:w-[420px] bg-[#142424] border border-[#182A2A] rounded-2xl p-6 sm:p-8 relative shrink-0 shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF7043]" />
              <span className="text-[#FF7043] font-mono text-lg font-bold">{event.year}</span>
            </div>
            
            <h3 className="text-xl sm:text-2xl md:text-3xl font-outfit font-bold text-[#F4F0E8] mb-3 leading-snug">
              {event.title}
            </h3>
            
            <p className="text-[#F4F0E8]/70 text-xs sm:text-sm md:text-base leading-relaxed font-sans">
              {event.description}
            </p>
          </div>
        ))}
        {/* Empty space at the end so the last card isn't cut off */}
        <div className="w-[15vw] sm:w-[10vw]"></div>
      </div>
      
      {/* Decorative large background text */}
      <div className="absolute -bottom-10 left-0 text-[14vw] font-outfit font-black text-[#142424]/40 whitespace-nowrap pointer-events-none select-none">
        TIMELINE
      </div>
    </section>
  );
}
