"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Database, Network } from "lucide-react";

const services = [
  {
    icon: <Code2 size={40} className="text-blue-400 mb-6" />,
    title: "Frontend Engineering",
    description: "Transforming Figma designs into interactive, accessible, and highly performant web applications using Next.js, React, and Tailwind CSS. Focus on flawless user experiences.",
    color: "from-blue-500/10 to-transparent",
    borderColor: "group-hover:border-blue-500/50"
  },
  {
    icon: <Database size={40} className="text-purple-400 mb-6" />,
    title: "Backend Development",
    description: "Architecting robust and secure server-side logic and database structures with PHP, Java, and MySQL. Building APIs that scale and handle complex data workflows.",
    color: "from-purple-500/10 to-transparent",
    borderColor: "group-hover:border-purple-500/50"
  },
  {
    icon: <Network size={40} className="text-emerald-400 mb-6" />,
    title: "Network & Systems",
    description: "Solid foundation in Computer & Network Engineering (TKJ). Proficient in networking fundamentals, server deployment, and ensuring infrastructure runs smoothly and securely.",
    color: "from-emerald-500/10 to-transparent",
    borderColor: "group-hover:border-emerald-500/50"
  },
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (containerRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".service-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          },
        }
      );
    }
  }, []);

  return (
    <section ref={containerRef} className="py-32 px-6 md:px-12 lg:px-24 bg-background relative overflow-hidden">
      {/* Decorative background flare */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="flex flex-col md:flex-row gap-12 md:gap-24 mb-20 relative z-10">
        <div className="md:w-1/2">
          <h2 ref={titleRef} className="text-5xl md:text-7xl font-outfit font-black tracking-tighter uppercase text-white leading-tight">
            Ready to Build. <br />
            <span className="text-mint pb-2">
              Ready to Impact.
            </span>
          </h2>
        </div>
        <div className="md:w-1/2 flex items-center">
          <p className="text-lg md:text-xl text-white/70 leading-relaxed font-outfit border-l-2 border-accent/50 pl-6">
            Currently seeking an <strong>internship opportunity</strong> for the upcoming semester and open to freelance collaborations. I bring a blend of strong software engineering principles and a practical, problem-solving mindset to every team I join. Let's create something profitable and impactful.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        {services.map((service, index) => (
          <div
            key={index}
            className={`service-card group p-10 rounded-3xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.05] transition-all duration-500 ${service.borderColor} overflow-hidden relative`}
          >
            {/* Hover Gradient Background */}
            <div className={`absolute inset-0 bg-gradient-to-b ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />
            
            <div className="relative z-10">
              {service.icon}
              <h3 className="text-2xl font-outfit font-bold text-white mb-4">
                {service.title}
              </h3>
              <p className="text-white/60 leading-relaxed">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Call to action button */}
      <div className="mt-20 flex justify-center">
        <a 
          href="#contact" 
          className="px-8 py-4 rounded-full bg-white text-background font-outfit font-bold tracking-wide uppercase hover:bg-accent hover:text-white transition-colors duration-300 transform hover:scale-105 active:scale-95"
        >
          Hire Me for Internship
        </a>
      </div>
    </section>
  );
}
