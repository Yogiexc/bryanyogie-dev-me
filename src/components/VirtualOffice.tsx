"use client";

import React, { useEffect, useRef, useState } from "react";
import { Play, Pause, Coffee, Server, Bot, Users, Sparkles, Compass } from "lucide-react";

interface Agent {
  id: string;
  name: string;
  role: string;
  department: "Dev" | "Ops" | "AI" | "Design" | "Growth";
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  hairColor: string;
  clothColor: string;
  direction: "left" | "right" | "up" | "down";
  isMoving: boolean;
  frame: number;
  bubble: string;
  bubbleTimer: number;
  homeDesk: { x: number; y: number };
}

interface Furniture {
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: "desk" | "server" | "coffee" | "meeting_table" | "plant" | "water_cooler" | "bookshelf" | "arcade";
  zone?: string;
}

export default function VirtualOffice() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [stats, setStats] = useState({ coffeeCups: 128, deployments: 46, activeAgents: 9 });

  // 10 Detailed agents across distinct company divisions
  const initialAgents: Agent[] = [
    {
      id: "bryan",
      name: "Bryan Yogie",
      role: "Lead Fullstack & Network",
      department: "Dev",
      x: 180,
      y: 190,
      targetX: 180,
      targetY: 190,
      hairColor: "#0f172a",
      clothColor: "#FF7043", // Flare Orange Hero
      direction: "down",
      isMoving: false,
      frame: 0,
      bubble: "Architecting Next.js 16 & edge computing services.",
      bubbleTimer: 180,
      homeDesk: { x: 180, y: 190 },
    },
    {
      id: "jarwo",
      name: "Jarwo AI",
      role: "AI Chief Dispatcher",
      department: "AI",
      x: 320,
      y: 190,
      targetX: 320,
      targetY: 190,
      hairColor: "#334155",
      clothColor: "#B9F5D8", // Mint
      direction: "down",
      isMoving: false,
      frame: 0,
      bubble: "Assigning automated sprints across active agents.",
      bubbleTimer: 200,
      homeDesk: { x: 320, y: 190 },
    },
    {
      id: "maya_ui",
      name: "Maya UI",
      role: "Design Systems & 3D",
      department: "Design",
      x: 460,
      y: 190,
      targetX: 460,
      targetY: 190,
      hairColor: "#64748b",
      clothColor: "#F472B6", // Pink/Rose
      direction: "down",
      isMoving: false,
      frame: 0,
      bubble: "Crafting micro-interactions and smooth GSAP eases.",
      bubbleTimer: 190,
      homeDesk: { x: 460, y: 190 },
    },
    {
      id: "dev_bot",
      name: "Backend Bot",
      role: "Distributed Systems & DB",
      department: "Dev",
      x: 180,
      y: 310,
      targetX: 180,
      targetY: 310,
      hairColor: "#1e293b",
      clothColor: "#38BDF8", // Cyan
      direction: "down",
      isMoving: false,
      frame: 0,
      bubble: "Indexing SQL query execution plans for sub-millisecond response.",
      bubbleTimer: 170,
      homeDesk: { x: 180, y: 310 },
    },
    {
      id: "sentinel_qa",
      name: "Sentinel QA",
      role: "Automated E2E Suite",
      department: "Ops",
      x: 320,
      y: 310,
      targetX: 320,
      targetY: 310,
      hairColor: "#475569",
      clothColor: "#A78BFA", // Violet
      direction: "down",
      isMoving: false,
      frame: 0,
      bubble: "Simulating cross-browser touch gestures & coarse pointers.",
      bubbleTimer: 210,
      homeDesk: { x: 320, y: 310 },
    },
    {
      id: "ops_pipeline",
      name: "Pipeline Ops",
      role: "CI/CD & Serverless Deploy",
      department: "Ops",
      x: 460,
      y: 310,
      targetX: 460,
      targetY: 310,
      hairColor: "#0f172a",
      clothColor: "#34D399", // Emerald
      direction: "down",
      isMoving: false,
      frame: 0,
      bubble: "Vercel edge build successful. 0 errors reported.",
      bubbleTimer: 160,
      homeDesk: { x: 460, y: 310 },
    },
    {
      id: "cisco_net",
      name: "Cisco Agent",
      role: "Network Security & Router",
      department: "Ops",
      x: 820,
      y: 190,
      targetX: 820,
      targetY: 190,
      hairColor: "#1e1e1e",
      clothColor: "#FBBF24", // Amber
      direction: "up",
      isMoving: false,
      frame: 0,
      bubble: "VLAN trunks & BGP routing synchronized.",
      bubbleTimer: 220,
      homeDesk: { x: 820, y: 190 },
    },
    {
      id: "seo_growth",
      name: "Growth Agent",
      role: "SEO & Traffic Telemetry",
      department: "Growth",
      x: 750,
      y: 360,
      targetX: 750,
      targetY: 360,
      hairColor: "#78350f",
      clothColor: "#FB923C", // Tangerine
      direction: "left",
      isMoving: false,
      frame: 0,
      bubble: "Tracking global organic visitors on bryanyogie-dev-me.",
      bubbleTimer: 230,
      homeDesk: { x: 750, y: 360 },
    },
    {
      id: "coffee_buddy",
      name: "Pantry Bot",
      role: "Barista & Refreshment",
      department: "AI",
      x: 80,
      y: 430,
      targetX: 80,
      targetY: 430,
      hairColor: "#3f3f46",
      clothColor: "#E2E8F0", // Clean White
      direction: "up",
      isMoving: false,
      frame: 0,
      bubble: "Double-shot espresso freshly brewed! ☕",
      bubbleTimer: 180,
      homeDesk: { x: 80, y: 430 },
    },
  ];

  const furnitureList: Furniture[] = [
    // DESKS ROW 1 (Core Engineering Pod)
    { name: "Bryan's Station", x: 130, y: 130, width: 100, height: 50, type: "desk", zone: "Engineering Pod" },
    { name: "Jarwo AI Pod", x: 270, y: 130, width: 100, height: 50, type: "desk", zone: "Engineering Pod" },
    { name: "Maya Design Lab", x: 410, y: 130, width: 100, height: 50, type: "desk", zone: "Engineering Pod" },

    // DESKS ROW 2 (Infrastructure & QA Pod)
    { name: "Backend Core", x: 130, y: 250, width: 100, height: 50, type: "desk", zone: "Infra Pod" },
    { name: "QA Suite", x: 270, y: 250, width: 100, height: 50, type: "desk", zone: "Infra Pod" },
    { name: "CI/CD Terminal", x: 410, y: 250, width: 100, height: 50, type: "desk", zone: "Infra Pod" },

    // SERVER ROOM (Right Wing Top)
    { name: "Edge Rack #01", x: 770, y: 70, width: 45, height: 95, type: "server", zone: "Data Center" },
    { name: "Core Rack #02", x: 830, y: 70, width: 45, height: 95, type: "server", zone: "Data Center" },
    { name: "Network Cisco #03", x: 890, y: 70, width: 45, height: 95, type: "server", zone: "Data Center" },

    // EXECUTIVE CONFERENCE ROOM (Bottom Right)
    { name: "Conference Table", x: 670, y: 320, width: 150, height: 80, type: "meeting_table", zone: "Conference Room" },
    { name: "Arcade Machine", x: 890, y: 390, width: 40, height: 50, type: "arcade", zone: "Chill Corner" },

    // PANTRY & BARISTA CAFE (Bottom Left)
    { name: "Italian Espresso Bar", x: 50, y: 370, width: 90, height: 50, type: "coffee", zone: "Cafe Pantry" },
    { name: "Water Cooler", x: 45, y: 320, width: 30, height: 35, type: "water_cooler", zone: "Cafe Pantry" },

    // DECORATIVE GREENERY & STORAGE
    { name: "Ficus Tree", x: 45, y: 65, width: 35, height: 45, type: "plant" },
    { name: "Monstera Palm", x: 560, y: 65, width: 35, height: 45, type: "plant" },
    { name: "Tech Bookshelf", x: 260, y: 60, width: 120, height: 30, type: "bookshelf" },
  ];

  const agentsRef = useRef<Agent[]>(initialAgents);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let ticks = 0;

    // Routine AI wandering behavior
    const routineInterval = setInterval(() => {
      if (isPaused) return;

      agentsRef.current.forEach((agent) => {
        // Chance to wander
        if (Math.random() < 0.35 && !agent.isMoving) {
          const rand = Math.random();
          if (rand < 0.25) {
            // Visit Cafe Pantry
            agent.targetX = 110 + Math.random() * 40;
            agent.targetY = 400 + Math.random() * 30;
            agent.bubble = "Grabbing an espresso shot! ☕";
            agent.bubbleTimer = 200;
            setStats((s) => ({ ...s, coffeeCups: s.coffeeCups + 1 }));
          } else if (rand < 0.55) {
            // Join Conference Table
            agent.targetX = 690 + Math.random() * 110;
            agent.targetY = 340 + Math.random() * 40;
            agent.bubble = "Collaborating in executive sprint sync 📊";
            agent.bubbleTimer = 220;
          } else if (rand < 0.75) {
            // Check Data Center / Server Room
            agent.targetX = 800 + Math.random() * 100;
            agent.targetY = 175 + Math.random() * 25;
            agent.bubble = "Auditing fiber-optic latency & SSL certificates 🔒";
            agent.bubbleTimer = 220;
            setStats((s) => ({ ...s, deployments: s.deployments + 1 }));
          } else {
            // Head back to Assigned Desk
            agent.targetX = agent.homeDesk.x;
            agent.targetY = agent.homeDesk.y;
            agent.bubble = `Writing high-performance ${agent.department} code 💻`;
            agent.bubbleTimer = 190;
          }
          agent.isMoving = true;
        }
      });
    }, 3800);

    // Interactive Click-To-Move
    const handleCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const clickX = (e.clientX - rect.left) * scaleX;
      const clickY = (e.clientY - rect.top) * scaleY;

      // Check agent click
      let clicked: Agent | null = null;
      agentsRef.current.forEach((a) => {
        if (Math.hypot(a.x - clickX, a.y - clickY) < 25) {
          clicked = a;
        }
      });

      if (clicked) {
        setSelectedAgent(clicked);
        (clicked as Agent).bubble = `Hi! I'm ${(clicked as Agent).name} (${(clicked as Agent).role}). How can I assist you?`;
        (clicked as Agent).bubbleTimer = 240;
      } else {
        // Command Bryan
        const bryan = agentsRef.current.find((a) => a.id === "bryan");
        if (bryan) {
          bryan.targetX = Math.max(50, Math.min(canvas.width - 50, clickX));
          bryan.targetY = Math.max(60, Math.min(canvas.height - 50, clickY));
          bryan.isMoving = true;
          bryan.bubble = "Heading over to inspected station... 🚶‍♂️";
          bryan.bubbleTimer = 160;
          setSelectedAgent(bryan);
        }
      }
    };

    canvas.addEventListener("click", handleCanvasClick);

    // Render 60 FPS Loop
    const render = () => {
      ticks++;

      // 1. FLOOR PLAN - Multi-Zone Modern Architectural Layout
      ctx.fillStyle = "#0a1313"; // Deep Slate base
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Parquet & Carpet zone dividing
      // Main Engineering Bay (Dark Cinder Slate)
      ctx.fillStyle = "#111f1f";
      ctx.fillRect(110, 50, 440, 275);
      ctx.strokeStyle = "rgba(185, 245, 216, 0.2)";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(110, 50, 440, 275);

      // Server Data Center (Cold Metal Floor)
      ctx.fillStyle = "#0d1b2a";
      ctx.fillRect(730, 40, 225, 185);
      ctx.strokeStyle = "rgba(56, 189, 248, 0.3)";
      ctx.strokeRect(730, 40, 225, 185);

      // Conference Lounge (Wood Inlay)
      ctx.fillStyle = "#1e1e24";
      ctx.fillRect(630, 270, 325, 195);
      ctx.strokeStyle = "rgba(255, 112, 67, 0.25)";
      ctx.strokeRect(630, 270, 325, 195);

      // Pantry & Barista Cafe
      ctx.fillStyle = "#1a1615";
      ctx.fillRect(25, 290, 155, 175);
      ctx.strokeStyle = "rgba(251, 146, 60, 0.25)";
      ctx.strokeRect(25, 290, 155, 175);

      // Grid line textures across walkway
      ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
      ctx.lineWidth = 1;
      const step = 28;
      for (let x = 0; x < canvas.width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Room Headers / Architectural Signage
      ctx.font = "bold 9px monospace";
      ctx.fillStyle = "#b9f5d8";
      ctx.fillText("ZONE 01 // CORE ENGINEERING POD", 125, 45);

      ctx.fillStyle = "#38bdf8";
      ctx.fillText("ZONE 02 // TIER-3 EDGE DATA CENTER", 745, 35);

      ctx.fillStyle = "#ff7043";
      ctx.fillText("ZONE 03 // EXECUTIVE BRIEFING ROOM", 645, 265);

      ctx.fillStyle = "#fb923c";
      ctx.fillText("ZONE 04 // ESPRESSO PANTRY & BREAK", 35, 285);

      // 2. FURNITURE & PROPS
      furnitureList.forEach((f) => {
        if (f.type === "desk") {
          // Industrial Tech Desk
          ctx.fillStyle = "#182a2a";
          ctx.fillRect(f.x, f.y, f.width, f.height);
          ctx.strokeStyle = "#2e4848";
          ctx.lineWidth = 1;
          ctx.strokeRect(f.x, f.y, f.width, f.height);

          // Dual curved monitors
          ctx.fillStyle = "#020617";
          ctx.fillRect(f.x + 10, f.y + 6, 36, 20);
          ctx.fillRect(f.x + 54, f.y + 6, 36, 20);

          // Glowing IDE syntax highlights
          const isFlicker = (ticks + f.x) % 60 < 30;
          ctx.fillStyle = isFlicker ? "#b9f5d8" : "#ff7043";
          ctx.fillRect(f.x + 14, f.y + 10, 18, 2);
          ctx.fillRect(f.x + 14, f.y + 14, 28, 2);
          ctx.fillRect(f.x + 14, f.y + 18, 22, 2);

          ctx.fillStyle = "#38bdf8";
          ctx.fillRect(f.x + 58, f.y + 10, 24, 2);
          ctx.fillRect(f.x + 58, f.y + 14, 16, 2);

          // Keyboard & Mousepad
          ctx.fillStyle = "#0f172a";
          ctx.fillRect(f.x + 32, f.y + 32, 36, 12);
          ctx.fillStyle = "#475569";
          ctx.fillRect(f.x + 36, f.y + 34, 20, 8);

          // Label
          ctx.font = "9px sans-serif";
          ctx.fillStyle = "#94a3b8";
          ctx.fillText(f.name, f.x + 8, f.y + 46);
        } else if (f.type === "server") {
          // Server Tall Rack
          ctx.fillStyle = "#020617";
          ctx.fillRect(f.x, f.y, f.width, f.height);
          ctx.strokeStyle = "#38bdf8";
          ctx.lineWidth = 1.5;
          ctx.strokeRect(f.x, f.y, f.width, f.height);

          // Server Blades & Blinking LEDs
          for (let b = 0; b < 7; b++) {
            const by = f.y + 8 + b * 12;
            ctx.fillStyle = "#1e293b";
            ctx.fillRect(f.x + 4, by, f.width - 8, 8);

            // Blinking Lights
            const isGreen = (ticks + b * 10) % 36 > 16;
            ctx.fillStyle = isGreen ? "#22c55e" : "#ef4444";
            ctx.fillRect(f.x + 8, by + 2.5, 3, 3);

            ctx.fillStyle = "#38bdf8";
            ctx.fillRect(f.x + 14, by + 2.5, 3, 3);
          }
        } else if (f.type === "meeting_table") {
          // Glass Conference Table
          ctx.fillStyle = "rgba(30, 41, 59, 0.85)";
          ctx.fillRect(f.x, f.y, f.width, f.height);
          ctx.strokeStyle = "#94a3b8";
          ctx.lineWidth = 2;
          ctx.strokeRect(f.x, f.y, f.width, f.height);

          // Conference Laptops
          ctx.fillStyle = "#cbd5e1";
          ctx.fillRect(f.x + 25, f.y + 25, 20, 15);
          ctx.fillRect(f.x + 70, f.y + 25, 20, 15);
          ctx.fillRect(f.x + 115, f.y + 25, 20, 15);

          ctx.font = "bold 10px monospace";
          ctx.fillStyle = "#f8fafc";
          ctx.fillText("AI SPRINT BOARD", f.x + 30, f.y + 65);
        } else if (f.type === "coffee") {
          // Modern Espresso Counter
          ctx.fillStyle = "#451a03";
          ctx.fillRect(f.x, f.y, f.width, f.height);
          ctx.strokeStyle = "#fb923c";
          ctx.lineWidth = 1.5;
          ctx.strokeRect(f.x, f.y, f.width, f.height);

          // Coffee Machine Body
          ctx.fillStyle = "#94a3b8";
          ctx.fillRect(f.x + 25, f.y + 8, 40, 25);
          ctx.fillStyle = "#0f172a";
          ctx.fillRect(f.x + 35, f.y + 22, 12, 10);

          // Steam Animation
          if (ticks % 30 < 15) {
            ctx.strokeStyle = "rgba(255,255,255,0.7)";
            ctx.beginPath();
            ctx.moveTo(f.x + 40, f.y + 6);
            ctx.lineTo(f.x + 40, f.y);
            ctx.stroke();
          }

          ctx.font = "bold 9px sans-serif";
          ctx.fillStyle = "#ffedd5";
          ctx.fillText("BYS CAFE", f.x + 22, f.y + 44);
        } else if (f.type === "arcade") {
          // Retro Arcade Machine
          ctx.fillStyle = "#7c3aed";
          ctx.fillRect(f.x, f.y, f.width, f.height);
          ctx.strokeStyle = "#c084fc";
          ctx.strokeRect(f.x, f.y, f.width, f.height);

          // Screen
          ctx.fillStyle = "#000000";
          ctx.fillRect(f.x + 6, f.y + 8, f.width - 12, 20);
          ctx.fillStyle = (ticks % 40 < 20) ? "#38bdf8" : "#f43f5e";
          ctx.fillRect(f.x + 12, f.y + 14, 10, 8);
        } else if (f.type === "plant") {
          // Designer Potted Indoor Tree
          ctx.fillStyle = "#78350f";
          ctx.beginPath();
          ctx.arc(f.x + f.width / 2, f.y + f.height / 2 + 5, 10, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = "#16a34a";
          ctx.beginPath();
          ctx.arc(f.x + f.width / 2, f.y + f.height / 2 - 4, 15, 0, Math.PI * 2);
          ctx.fill();
        } else if (f.type === "bookshelf") {
          ctx.fillStyle = "#334155";
          ctx.fillRect(f.x, f.y, f.width, f.height);
          ctx.strokeStyle = "#475569";
          ctx.strokeRect(f.x, f.y, f.width, f.height);
          // Colorful books
          const colors = ["#ef4444", "#3b82f6", "#10b981", "#f59e0b", "#8b5cf6"];
          for (let i = 0; i < 9; i++) {
            ctx.fillStyle = colors[i % colors.length];
            ctx.fillRect(f.x + 6 + i * 12, f.y + 6, 8, f.height - 12);
          }
        }
      });

      // 3. AGENTS ANIMATION & RENDERING
      agentsRef.current.forEach((agent) => {
        // Walking physics
        if (agent.isMoving && !isPaused) {
          const dx = agent.targetX - agent.x;
          const dy = agent.targetY - agent.y;
          const dist = Math.hypot(dx, dy);

          if (dist > 3) {
            const speed = 2.4;
            agent.x += (dx / dist) * speed;
            agent.y += (dy / dist) * speed;

            if (Math.abs(dx) > Math.abs(dy)) {
              agent.direction = dx > 0 ? "right" : "left";
            } else {
              agent.direction = dy > 0 ? "down" : "up";
            }

            if (ticks % 8 === 0) {
              agent.frame = (agent.frame + 1) % 4;
            }
          } else {
            agent.x = agent.targetX;
            agent.y = agent.targetY;
            agent.isMoving = false;
            agent.frame = 0;
          }
        }

        const cx = agent.x;
        const cy = agent.y;

        // Shadow
        ctx.fillStyle = "rgba(0, 0, 0, 0.45)";
        ctx.beginPath();
        ctx.ellipse(cx, cy + 9, 12, 6, 0, 0, Math.PI * 2);
        ctx.fill();

        // Legs with gait cycle
        ctx.fillStyle = "#0f172a";
        const stepOffset = agent.isMoving ? Math.sin(ticks * 0.45) * 4 : 0;
        ctx.fillRect(cx - 6, cy + 3 + stepOffset, 5, 8);
        ctx.fillRect(cx + 1, cy + 3 - stepOffset, 5, 8);

        // Body / Shirt
        ctx.fillStyle = agent.clothColor;
        ctx.fillRect(cx - 8, cy - 11, 16, 14);
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 1;
        ctx.strokeRect(cx - 8, cy - 11, 16, 14);

        // Head
        ctx.fillStyle = "#fecdd3"; // Neutral skin
        ctx.beginPath();
        ctx.arc(cx, cy - 19, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Hair
        ctx.fillStyle = agent.hairColor;
        ctx.beginPath();
        ctx.arc(cx, cy - 23, 8, Math.PI, Math.PI * 2);
        ctx.fill();

        // Eyes
        ctx.fillStyle = "#000000";
        if (agent.direction === "right") {
          ctx.fillRect(cx + 2, cy - 20, 2, 2.5);
          ctx.fillRect(cx + 5, cy - 20, 2, 2.5);
        } else if (agent.direction === "left") {
          ctx.fillRect(cx - 7, cy - 20, 2, 2.5);
          ctx.fillRect(cx - 4, cy - 20, 2, 2.5);
        } else if (agent.direction === "down") {
          ctx.fillRect(cx - 3, cy - 19, 2, 2.5);
          ctx.fillRect(cx + 2, cy - 19, 2, 2.5);
        }

        // Name & Role Tag
        ctx.font = "bold 9.5px sans-serif";
        const nameW = ctx.measureText(agent.name).width;
        ctx.fillStyle = "rgba(0,0,0,0.85)";
        ctx.fillRect(cx - nameW / 2 - 4, cy - 38, nameW + 8, 14);
        ctx.fillStyle = agent.clothColor;
        ctx.fillText(agent.name, cx - nameW / 2, cy - 27);

        // Speech Bubble
        if (agent.bubble && agent.bubbleTimer > 0) {
          agent.bubbleTimer--;
          ctx.font = "11px monospace";
          const bubbleW = ctx.measureText(agent.bubble).width + 16;
          const bubbleX = cx - bubbleW / 2;
          const bubbleY = cy - 60;

          ctx.fillStyle = "#ffffff";
          ctx.strokeStyle = "#182a2a";
          ctx.lineWidth = 1.5;

          ctx.beginPath();
          ctx.roundRect(bubbleX, bubbleY, bubbleW, 22, 6);
          ctx.fill();
          ctx.stroke();

          // Tail
          ctx.beginPath();
          ctx.moveTo(cx - 4, bubbleY + 22);
          ctx.lineTo(cx, bubbleY + 28);
          ctx.lineTo(cx + 4, bubbleY + 22);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = "#0f172a";
          ctx.fillText(agent.bubble, bubbleX + 8, bubbleY + 15);
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(routineInterval);
      canvas.removeEventListener("click", handleCanvasClick);
    };
  }, [isPaused]);

  return (
    <section className="relative w-full py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-[#090f0f] border-t border-mint/20 overflow-hidden" id="virtual-office">
      {/* Background Ambience */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#b9f5d8 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header (100% Consistent English) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6 border-b border-mint/20 pb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mint opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-mint"></span>
              </span>
              <span className="font-mono text-xs uppercase tracking-widest text-mint font-semibold">
                Autonomous 2D RPG Office Simulation
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-outfit font-black uppercase text-foreground tracking-tighter">
              BYS <span className="text-mint">Virtual Office</span>
            </h2>
            <p className="text-foreground/70 font-mono text-xs md:text-sm max-w-2xl mt-2 leading-relaxed">
              Explore my digital company workspace inspired by Gather Town: 9 autonomous AI agents collaborating across engineering, edge serverless, design, and growth.
              <span className="text-flare font-bold block mt-1">💡 Click or tap anywhere on the office floor to guide Bryan around!</span>
            </p>
          </div>

          {/* Realtime Telemetry Dashboard */}
          <div className="flex items-center gap-4 bg-[#121f1f] p-3 rounded-2xl border border-mint/20 text-xs font-mono">
            <div className="flex items-center gap-1.5 text-mint">
              <Coffee size={15} className="text-flare" />
              <span>{stats.coffeeCups} Coffees</span>
            </div>
            <div className="w-[1px] h-4 bg-white/20" />
            <div className="flex items-center gap-1.5 text-mint">
              <Server size={15} className="text-mint" />
              <span>{stats.deployments} Deploys</span>
            </div>
            <div className="w-[1px] h-4 bg-white/20" />
            <div className="flex items-center gap-1.5 text-white">
              <Users size={15} className="text-flare" />
              <span>9 Employees Active</span>
            </div>
          </div>
        </div>

        {/* 2D CANVAS STAGE CONTAINER */}
        <div className="w-full bg-[#101b1b] rounded-3xl border-2 border-mint/30 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden relative">
          
          {/* Top Canvas Controls Bar */}
          <div className="bg-[#142323] px-6 py-3.5 flex items-center justify-between border-b border-mint/20">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              <span className="ml-3 font-mono text-xs text-foreground/60 tracking-wider hidden sm:inline">
                interactive_office_engine.canvas // 60fps
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="px-3 py-1.5 rounded-lg bg-[#0c1515] hover:bg-mint hover:text-cinder text-foreground font-mono text-xs transition-colors flex items-center gap-1.5 border border-white/10"
              >
                {isPaused ? <Play size={12} /> : <Pause size={12} />}
                <span>{isPaused ? "Resume Agents" : "Pause Simulation"}</span>
              </button>
            </div>
          </div>

          {/* Interactive HTML5 Canvas (Responsive High-Res) */}
          <div className="w-full overflow-x-auto relative flex justify-center bg-[#0a1313] p-2 md:p-4">
            <canvas
              ref={canvasRef}
              width={980}
              height={490}
              className="rounded-2xl cursor-crosshair shadow-2xl max-w-full h-auto border border-mint/20"
            />
          </div>

          {/* Active Agent Status Bar */}
          <div className="bg-[#121f1f] p-4 md:px-8 border-t border-mint/20 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-flare animate-ping" />
              <span className="text-foreground/80">
                Active Selection: <strong className="text-mint">{selectedAgent ? selectedAgent.name : "Bryan Yogie"}</strong> — {selectedAgent ? selectedAgent.role : "Lead Fullstack & Network Engineer"}
              </span>
            </div>

            <div className="text-foreground/60 text-[11px] flex items-center gap-1.5">
              <Compass size={13} className="text-mint" />
              <span>Click any floor tile to walk. Click an employee to initiate conversation.</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
