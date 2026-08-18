"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    let progressValue = { val: 0 };
    tl.to(progressValue, {
      val: 100,
      duration: 2.5,
      ease: "power2.inOut",
      onUpdate: () => {
        if (progressRef.current) {
          progressRef.current.innerText = `${Math.round(progressValue.val)}%`;
        }
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${progressValue.val}%`;
        }
      },
    })
      .to(
        textRef.current,
        {
          opacity: 0,
          y: -20,
          duration: 0.5,
          ease: "power2.out",
        },
        "+=0.2"
      )
      .to(
        loaderRef.current,
        {
          yPercent: -100,
          duration: 1,
          ease: "power4.inOut",
        },
        "-=0.1"
      );
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center text-white"
    >
      <div className="flex flex-col items-center gap-6" ref={textRef}>
        <h1 className="text-4xl md:text-6xl font-outfit font-bold tracking-tighter">
          BRYAN YOGIE SAPUTRA
        </h1>
        <div className="flex flex-col items-center w-64 gap-2">
          <div className="w-full h-[2px] bg-white/20 relative overflow-hidden">
            <div
              ref={progressBarRef}
              className="absolute top-0 left-0 h-full bg-accent w-0"
            />
          </div>
          <div ref={progressRef} className="text-sm font-mono tracking-widest text-white/50">
            0%
          </div>
        </div>
      </div>
    </div>
  );
}
