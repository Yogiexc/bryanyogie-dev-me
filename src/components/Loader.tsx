"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const irisRef = useRef<HTMLDivElement>(null);

  const [counter, setCounter] = useState(0);

  // 3D Three.js Morphing Crystal Scene
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = 280;
    const height = 280;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 4.2;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    mount.appendChild(renderer.domElement);

    // Core Crystal (Icosahedron / Octahedron dual layer)
    const innerGeo = new THREE.OctahedronGeometry(1.0, 0);
    const innerMat = new THREE.MeshPhysicalMaterial({
      color: "#182a2a",
      emissive: "#0c1515",
      roughness: 0.1,
      metalness: 0.9,
      transmission: 0.6,
      transparent: true,
      opacity: 0.85,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    scene.add(innerMesh);

    // Glowing Neon Wireframe Cage
    const wireMat = new THREE.MeshBasicMaterial({
      color: "#b9f5d8",
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });
    const wireMesh = new THREE.Mesh(innerGeo, wireMat);
    wireMesh.scale.setScalar(1.02);
    scene.add(wireMesh);

    // Orbiting Geometric Ring 1 (Flare Orange)
    const ring1Geo = new THREE.TorusGeometry(1.5, 0.02, 16, 64);
    const ring1Mat = new THREE.MeshBasicMaterial({ color: "#ff7043", transparent: true, opacity: 0.75 });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    scene.add(ring1);

    // Orbiting Geometric Ring 2 (Electric Mint)
    const ring2Geo = new THREE.TorusGeometry(1.8, 0.015, 16, 64);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: "#b9f5d8", transparent: true, opacity: 0.5 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    scene.add(ring2);

    // Studio Lighting
    const pointLight = new THREE.PointLight("#b9f5d8", 4, 10);
    pointLight.position.set(2, 3, 3);
    scene.add(pointLight);

    const flareLight = new THREE.PointLight("#ff7043", 3, 10);
    flareLight.position.set(-2, -3, 2);
    scene.add(flareLight);

    let frameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth multi-axis rotation
      innerMesh.rotation.x = elapsed * 0.7;
      innerMesh.rotation.y = elapsed * 0.9;
      wireMesh.rotation.x = elapsed * 0.7;
      wireMesh.rotation.y = elapsed * 0.9;

      ring1.rotation.z = elapsed * 0.6;
      ring1.rotation.x = Math.PI / 3 + Math.sin(elapsed * 1.5) * 0.2;

      ring2.rotation.z = -elapsed * 0.4;
      ring2.rotation.y = Math.PI / 4 + Math.cos(elapsed * 1.2) * 0.2;

      // Subtle breathing pulse
      const scale = 1.0 + Math.sin(elapsed * 2.5) * 0.04;
      innerMesh.scale.set(scale, scale, scale);
      wireMesh.scale.set(scale * 1.02, scale * 1.02, scale * 1.02);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  // GSAP Counter & Smooth Transition
  useEffect(() => {
    const val = { p: 0 };
    const radius = 64;
    const circumference = 2 * Math.PI * radius;

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    tl.to(val, {
      p: 100,
      duration: 2.4,
      ease: "power2.inOut",
      onUpdate: () => {
        const rounded = Math.round(val.p);
        setCounter(rounded);
        if (counterRef.current) {
          counterRef.current.innerText = rounded < 10 ? `0${rounded}` : `${rounded}`;
        }
        if (ringRef.current) {
          const offset = circumference - (val.p / 100) * circumference;
          ringRef.current.style.strokeDashoffset = `${offset}`;
        }
      },
    })
      // Fade & elevate the center card
      .to(cardRef.current, {
        scale: 0.92,
        opacity: 0,
        filter: "blur(12px)",
        duration: 0.5,
        ease: "power3.in",
      })
      // Smooth circular iris clip-path reveal into the portfolio
      .to(
        irisRef.current,
        {
          clipPath: "circle(150% at 50% 50%)",
          duration: 0.9,
          ease: "power4.inOut",
        },
        "-=0.2"
      )
      .to(containerRef.current, {
        display: "none",
        duration: 0.01,
      });
  }, [onComplete]);

  const radius = 64;
  const circumference = 2 * Math.PI * radius;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] bg-[#090f0f] flex items-center justify-center overflow-hidden font-mono select-none"
    >
      {/* Expanding Iris Mask Revealer */}
      <div
        ref={irisRef}
        className="absolute inset-0 bg-[#060a0a] pointer-events-none z-0"
        style={{ clipPath: "circle(0% at 50% 50%)" }}
      />

      {/* Cyber Grid Texture Overlay */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none opacity-20"
        style={{
          backgroundImage: "radial-gradient(#b9f5d8 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Center 3D Floating Interactive Element */}
      <div
        ref={cardRef}
        className="relative z-20 flex flex-col items-center justify-center p-6 text-center"
      >
        {/* Minimalist Top Tag */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-mint/20 bg-mint/5 text-[11px] text-mint font-semibold mb-4 tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-mint animate-ping" />
          <span>BYS ARCHITECTURE &bull; 2026</span>
        </div>

        {/* 3D Morphing Crystal Container with Circular Progress Ring */}
        <div className="relative w-72 h-72 flex items-center justify-center">
          {/* SVG Progress Dial */}
          <svg className="absolute w-64 h-64 -rotate-90 pointer-events-none z-10">
            <circle
              cx="128"
              cy="128"
              r={radius}
              className="stroke-white/10 fill-transparent"
              strokeWidth="2.5"
            />
            <circle
              ref={ringRef}
              cx="128"
              cy="128"
              r={radius}
              className="stroke-mint fill-transparent transition-all"
              strokeWidth="3.5"
              strokeDasharray={circumference}
              strokeDashoffset={circumference}
              strokeLinecap="round"
              style={{ filter: "drop-shadow(0 0 10px rgba(185,245,216,0.6))" }}
            />
          </svg>

          {/* 3D Three.js Canvas Mount */}
          <div ref={mountRef} className="relative z-20 w-[280px] h-[280px] pointer-events-none" />

          {/* Precision Percentage Counter Badge */}
          <div className="absolute bottom-2 z-30 flex items-center gap-1 px-3 py-1 rounded-xl bg-[#090f0f]/90 border border-mint/30 shadow-[0_4px_20px_rgba(0,0,0,0.8)] backdrop-blur-md">
            <span ref={counterRef} className="text-sm font-outfit font-black text-white tracking-wider">
              00
            </span>
            <span className="text-[10px] text-mint font-bold">%</span>
          </div>
        </div>

        {/* Brand Typography */}
        <div className="mt-4 flex flex-col items-center">
          <h2 className="text-xl md:text-2xl font-outfit font-black tracking-tight text-white uppercase">
            BRYAN <span className="text-mint">YOGIE</span> SAPUTRA
          </h2>
          <p className="text-[11px] font-mono text-[#f4f0e8]/50 tracking-widest uppercase mt-1">
            Assembling 3D Spatial Virtual Space
          </p>
        </div>
      </div>
    </div>
  );
}
