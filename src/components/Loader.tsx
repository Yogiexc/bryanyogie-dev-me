"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

const TELEMETRY_MESSAGES = [
  "SYSTEM PURGE COMPLETED",
  "NEURAL CORES CALIBRATING...",
  "EDGE PROTOCOLS ONLINE [1.6 Gbps]",
  "VIRTUAL OFFICE GRID ASSEMBLED",
  "BIOMETRIC INTERACTION READY",
];

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const portalRingRef = useRef<HTMLDivElement>(null);
  const shockwaveRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const [progress, setProgress] = useState(0);
  const [isReadyToLaunch, setIsReadyToLaunch] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);
  const [statusText, setStatusText] = useState("INITIALIZING BYS PROTOCOL...");

  // Synthesize futuristic audio clicks & warp whoosh via Web Audio API (Zero external assets needed!)
  const playSynthesizerSound = useCallback((type: "ping" | "warp") => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      if (type === "ping") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5 Note
        osc.frequency.exponentialRampToValueAtTime(1174.66, ctx.currentTime + 0.15); // D6
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      } else if (type === "warp") {
        // Deep Cinematic Sub-Bass Drop + Hyperspace Frequency Sweep
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(90, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.4);
        osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 1.2);
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 1.35);
      }
    } catch {
      // AudioContext might be blocked until user gesture, safe fallback
    }
  }, []);

  // Starfield & Hyperspace Warp Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    const stars: { x: number; y: number; z: number; oZ: number }[] = [];
    const count = 180;
    for (let i = 0; i < count; i++) {
      stars.push({
        x: (Math.random() - 0.5) * width * 2,
        y: (Math.random() - 0.5) * height * 2,
        z: Math.random() * width,
        oZ: Math.random() * width,
      });
    }

    const render = () => {
      ctx.fillStyle = "rgba(7, 13, 13, 0.4)";
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const speed = isLaunching ? 45 : 3.5;

      for (let i = 0; i < count; i++) {
        const s = stars[i];
        s.z -= speed;
        if (s.z <= 0) {
          s.z = width;
          s.x = (Math.random() - 0.5) * width * 2;
          s.y = (Math.random() - 0.5) * height * 2;
        }

        const k = 250 / s.z;
        const px = s.x * k + cx;
        const py = s.y * k + cy;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const size = Math.max(0.6, (1 - s.z / width) * (isLaunching ? 4.5 : 2.5));
          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fillStyle = isLaunching ? "#ff7043" : i % 3 === 0 ? "#b9f5d8" : "#f4f0e8";
          ctx.fill();

          // Speed streak during launching warp
          if (isLaunching) {
            const prevK = 250 / (s.z + speed * 1.5);
            const prevPx = s.x * prevK + cx;
            const prevPy = s.y * prevK + cy;
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(prevPx, prevPy);
            ctx.strokeStyle = "rgba(185, 245, 216, 0.6)";
            ctx.lineWidth = size * 1.2;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animId);
    };
  }, [isLaunching]);

  // Initial Boot Progress Animation
  useEffect(() => {
    const val = { p: 0 };
    gsap.to(val, {
      p: 100,
      duration: 2.2,
      ease: "power2.out",
      onUpdate: () => {
        const cur = Math.round(val.p);
        setProgress(cur);
        const idx = Math.min(
          Math.floor((cur / 100) * TELEMETRY_MESSAGES.length),
          TELEMETRY_MESSAGES.length - 1
        );
        setStatusText(TELEMETRY_MESSAGES[idx]);
      },
      onComplete: () => {
        setIsReadyToLaunch(true);
        setStatusText("SYSTEM ARMED • CLICK OR TOUCH TO ENTER");
      },
    });
  }, []);

  // Handle Interactive Biometric / Reactor Launch Trigger
  const handleTriggerLaunch = () => {
    if (isLaunching || !isReadyToLaunch) return;
    setIsLaunching(true);
    playSynthesizerSound("warp");

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    // 1. Shockwave expansion
    if (shockwaveRef.current) {
      tl.to(shockwaveRef.current, {
        scale: 25,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
      });
    }

    // 2. Portal Ring Zoom & Flare
    if (portalRingRef.current) {
      tl.to(
        portalRingRef.current,
        {
          scale: 4,
          opacity: 0,
          filter: "blur(18px)",
          duration: 0.7,
          ease: "power2.in",
        },
        "-=0.7"
      );
    }

    // 3. Final Cinema Blackout / Warp Iris Reveal
    if (containerRef.current) {
      tl.to(
        containerRef.current,
        {
          scale: 1.15,
          opacity: 0,
          duration: 0.5,
          ease: "power4.inOut",
        },
        "-=0.2"
      );
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] bg-[#070d0d] flex items-center justify-center overflow-hidden font-mono select-none"
    >
      {/* Dynamic Starfield / Hyperspace Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

      {/* Cyber Grid HUD Overlay */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none opacity-25"
        style={{
          backgroundImage: "radial-gradient(circle at center, rgba(185,245,216,0.15) 0%, transparent 70%)",
        }}
      />

      {/* Expanding Shockwave Ring (Triggers on Click) */}
      <div
        ref={shockwaveRef}
        className="absolute z-20 w-32 h-32 rounded-full border-2 border-mint pointer-events-none opacity-0"
        style={{ transform: "scale(1)" }}
      />

      {/* Main Interactive Reactor Core */}
      <div className="relative z-30 flex flex-col items-center justify-center px-4 max-w-lg w-full text-center">
        
        {/* Top Header Label */}
        <div className="mb-6 flex items-center gap-2 text-[11px] text-mint/80 border border-mint/20 bg-[#0e1818]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-[0_0_20px_rgba(185,245,216,0.15)]">
          <span className="w-2 h-2 rounded-full bg-mint animate-ping" />
          <span className="font-bold tracking-widest">BYS LAB // SPATIAL OS</span>
          <span className="text-white/40">v4.2</span>
        </div>

        {/* Central Biometric Scanner / Quantum Reactor Trigger */}
        <div
          ref={portalRingRef}
          onClick={handleTriggerLaunch}
          className={`relative group flex items-center justify-center cursor-pointer transition-transform duration-300 ${
            isReadyToLaunch ? "hover:scale-105 active:scale-95" : ""
          }`}
        >
          {/* Outer Pulsing Kinetic Rings */}
          <div className="absolute w-52 h-52 rounded-full border border-mint/20 border-dashed animate-[spin_20s_linear_infinite]" />
          <div className="absolute w-44 h-44 rounded-full border border-flare/30 animate-[spin_12s_linear_infinite_reverse]" />
          
          {/* Hexagonal Glow Backdrop */}
          <div className="w-36 h-36 rounded-3xl bg-gradient-to-br from-[#122424] to-[#091515] border-2 border-mint/50 shadow-[0_0_50px_rgba(185,245,216,0.3)] flex flex-col items-center justify-center relative overflow-hidden group-hover:border-mint group-hover:shadow-[0_0_60px_rgba(185,245,216,0.6)] transition-all">
            
            {/* Glowing Scanning Laser Line */}
            <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-mint to-transparent animate-[bounce_2s_infinite] shadow-[0_0_12px_#b9f5d8]" />

            {/* Inner Content: Progress OR Biometric Fingerprint Trigger */}
            {!isReadyToLaunch ? (
              <div className="flex flex-col items-center">
                <span className="text-3xl font-outfit font-black text-white tracking-tighter">
                  {progress}%
                </span>
                <span className="text-[9px] text-mint uppercase tracking-widest mt-1">
                  SYNCING
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center animate-pulse">
                {/* Stylized Fingerprint / Core Icon */}
                <svg
                  className="w-12 h-12 text-mint group-hover:text-flare transition-colors drop-shadow-[0_0_12px_rgba(185,245,216,0.8)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 004 11m0 0a8.003 8.003 0 0115.357-2m1.527 8.01A19.957 19.957 0 0112 21"
                  />
                </svg>
                <span className="text-[10px] font-outfit font-black text-white uppercase tracking-wider mt-1.5 group-hover:text-flare transition-colors">
                  LAUNCH
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Telemetry Status */}
        <div className="mt-8 flex flex-col items-center gap-1.5">
          <p className="text-xs font-mono font-bold text-mint tracking-wider uppercase drop-shadow-[0_0_8px_rgba(185,245,216,0.5)]">
            {statusText}
          </p>
          <p className="text-[11px] text-[#f4f0e8]/50">
            {isReadyToLaunch
              ? "Tekan tombol di atas untuk masuk ke portfolio"
              : "Menyiapkan arsitektur web & 9 agen virtual..."}
          </p>
        </div>

        {/* Bottom System Specs */}
        <div className="mt-10 flex items-center justify-between w-full max-w-sm text-[10px] text-white/30 border-t border-white/10 pt-3">
          <span>HOST: BRYAN YOGIE</span>
          <span>LOCATION: UNS SURAKARTA</span>
          <span>LATENCY: 0.4MS</span>
        </div>

      </div>
    </div>
  );
}
