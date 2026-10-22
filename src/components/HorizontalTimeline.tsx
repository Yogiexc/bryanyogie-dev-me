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
    
    if (sectionRef.current && containerRef.current) {
      const containerWidth = containerRef.current.scrollWidth;
      const windowWidth = window.innerWidth;
      
      // Horizontal scroll animation
      gsap.to(containerRef.current, {
        x: () => -(containerWidth - windowWidth),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${containerWidth}`,
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
    <section ref={sectionRef} className="h-screen w-full bg-[#090f0f] border-t border-mint/15 overflow-hidden flex flex-col justify-center relative">
      <div className="absolute top-12 md:top-20 left-6 md:left-24">
        <h2 className="text-3xl md:text-6xl font-outfit font-black uppercase tracking-tighter text-[#f4f0e8]">
          My <span className="text-mint">Journey</span>
        </h2>
      </div>

      <div ref={containerRef} className="flex h-1/2 items-center px-6 md:px-24 gap-8 md:gap-32 w-max mt-16 md:mt-10">
        {timelineEvents.map((event, index) => (
          <div key={index} className="flex flex-col w-[260px] sm:w-[320px] md:w-[450px] relative">
            {/* Timeline line */}
            <div className="absolute top-8 left-0 w-[150%] h-[2px] bg-mint/30 -z-10" />
            
            <div className="flex items-center gap-4 mb-8">
              <div className="w-4 h-4 rounded-full bg-flare relative shadow-[0_0_12px_rgba(255,112,67,0.8)]">
                <div className="absolute inset-0 bg-flare rounded-full animate-ping opacity-75" />
              </div>
              <span className="text-flare font-mono text-xl font-bold">{event.year}</span>
            </div>
            
            <h3 className="text-2xl md:text-4xl font-outfit font-black text-[#f4f0e8] mb-4">
              {event.title}
            </h3>
            
            <p className="text-[#f4f0e8]/70 text-base md:text-lg leading-relaxed font-sans">
              {event.description}
            </p>
          </div>
        ))}
        {/* Empty space at the end so the last item isn't flush against the screen edge */}
        <div className="w-[10vw]"></div>
      </div>
      
      {/* Decorative large background text */}
      <div className="absolute -bottom-10 left-0 text-[15vw] font-outfit font-black text-mint/5 whitespace-nowrap pointer-events-none select-none">
        TIMELINE
      </div>
    </section>
  );
}
