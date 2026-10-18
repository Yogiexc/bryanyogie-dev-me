"use client";

import React, { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles, User, Bot, Server, Coffee } from "lucide-react";

interface Agent {
  id: string;
  name: string;
  role: string;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  color: string;
  hairColor: string;
  clothColor: string;
  direction: "left" | "right" | "up" | "down";
  isMoving: boolean;
  frame: number;
  bubble: string;
  bubbleTimer: number;
  homeDesk: { x: number; y: number };
  state: "working" | "walking" | "coffee" | "meeting";
}

interface Furniture {
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: "desk" | "server" | "coffee" | "plant" | "board" | "couch";
}

export default function VirtualOffice() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeAgent, setActiveAgent] = useState<Agent | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [stats, setStats] = useState({ coffeeBrewed: 42, commitsPushed: 18, tasksDone: 129 });

  const furnitureList: Furniture[] = [
    // Bryan's Workstation
    { name: "Bryan's Desk", x: 140, y: 150, width: 110, height: 60, type: "desk" },
    // AI Dev Desk
    { name: "Dev Bot Desk", x: 340, y: 150, width: 110, height: 60, type: "desk" },
    // AI QA & Ops Desk
    { name: "QA / Ops Desk", x: 540, y: 150, width: 110, height: 60, type: "desk" },
    // Server Rack Room (Top Right)
    { name: "Mainframe Rack A", x: 700, y: 60, width: 50, height: 80, type: "server" },
    { name: "Mainframe Rack B", x: 760, y: 60, width: 50, height: 80, type: "server" },
    // Coffee Pantry (Bottom Left)
    { name: "Espresso Pantry", x: 60, y: 350, width: 80, height: 50, type: "coffee" },
    // Meeting Whiteboard & Lounge (Bottom Right)
    { name: "Architecture Board", x: 650, y: 340, width: 120, height: 20, type: "board" },
    { name: "Lounge Couch", x: 660, y: 380, width: 100, height: 40, type: "couch" },
    // Decorative Plants
    { name: "Bonsai Plant", x: 50, y: 60, width: 30, height: 30, type: "plant" },
    { name: "Potted Ficus", x: 480, y: 60, width: 30, height: 30, type: "plant" },
  ];

  const initialAgents: Agent[] = [
    {
      id: "bryan",
      name: "Bryan Yogie",
      role: "Lead Fullstack & Network",
      x: 180,
      y: 220,
      targetX: 180,
      targetY: 220,
      color: "#FF7043",
      hairColor: "#1A1A1A",
      clothColor: "#FF7043", // Flare Orange
      direction: "up",
      isMoving: false,
      frame: 0,
      bubble: "Reviewing pull requests & Next.js Turbopack...",
      bubbleTimer: 180,
      homeDesk: { x: 180, y: 220 },
      state: "working",
    },
    {
      id: "jarwo",
      name: "Jarwo (Ops)",
      role: "AI Lead Dispatcher",
      x: 390,
      y: 220,
      targetX: 390,
      targetY: 220,
      color: "#B9F5D8",
      hairColor: "#4B5563",
      clothColor: "#B9F5D8", // Mint
      direction: "down",
      isMoving: false,
      frame: 0,
      bubble: "Routing serverless edge tasks...",
      bubbleTimer: 240,
      homeDesk: { x: 390, y: 220 },
      state: "working",
    },
    {
      id: "qa_bot",
      name: "Sentinel QA",
      role: "E2E Mobile Tester",
      x: 590,
      y: 220,
      targetX: 590,
      targetY: 220,
      color: "#60A5FA",
      hairColor: "#38BDF8",
      clothColor: "#3B82F6",
      direction: "up",
      isMoving: false,
      frame: 0,
      bubble: "375px mobile viewport 100% responsive!",
      bubbleTimer: 200,
      homeDesk: { x: 590, y: 220 },
      state: "working",
    },
    {
      id: "deploy_bot",
      name: "Deployer Bot",
      role: "CI/CD Vercel Worker",
      x: 730,
      y: 160,
      targetX: 730,
      targetY: 160,
      color: "#A78BFA",
      hairColor: "#8B5CF6",
      clothColor: "#7C3AED",
      direction: "up",
      isMoving: false,
      frame: 0,
      bubble: "Edge node latency: 12ms. Green status.",
      bubbleTimer: 150,
      homeDesk: { x: 730, y: 160 },
      state: "working",
    },
  ];

  const agentsRef = useRef<Agent[]>(initialAgents);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let ticks = 0;

    // Routine AI wandering behavior (simulating Gather Town people moving)
    const routineInterval = setInterval(() => {
      if (isPaused) return;

      agentsRef.current.forEach((agent) => {
        // 25% chance every 4 seconds to change action
        if (Math.random() < 0.35 && !agent.isMoving) {
          const action = Math.random();
          if (action < 0.35) {
            // Walk to coffee machine
            agent.targetX = 100 + Math.random() * 40;
            agent.targetY = 360 + Math.random() * 20;
            agent.bubble = "Taking a fresh espresso break ☕";
            agent.bubbleTimer = 220;
            agent.state = "coffee";
            setStats(s => ({ ...s, coffeeBrewed: s.coffeeBrewed + 1 }));
          } else if (action < 0.65) {
            // Walk to whiteboard or lounge
            agent.targetX = 640 + Math.random() * 60;
            agent.targetY = 350 + Math.random() * 30;
            agent.bubble = "Brainstorming AI Agent architecture 💡";
            agent.bubbleTimer = 220;
            agent.state = "meeting";
            setStats(s => ({ ...s, tasksDone: s.tasksDone + 1 }));
          } else if (action < 0.85) {
            // Walk to server room
            agent.targetX = 720 + Math.random() * 40;
            agent.targetY = 150 + Math.random() * 30;
            agent.bubble = "Optimizing socket streams & caching ⚡";
            agent.bubbleTimer = 220;
            setStats(s => ({ ...s, commitsPushed: s.commitsPushed + 1 }));
          } else {
            // Return to home desk
            agent.targetX = agent.homeDesk.x;
            agent.targetY = agent.homeDesk.y;
            agent.bubble = "Back at desk, coding high-performance frontend 💻";
            agent.bubbleTimer = 200;
            agent.state = "working";
          }
          agent.isMoving = true;
        }
      });
    }, 4000);

    // Canvas click to command Bryan
    const handleCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const clickX = (e.clientX - rect.left) * scaleX;
      const clickY = (e.clientY - rect.top) * scaleY;

      // Check if user clicked on any specific agent
      let clickedAgent: Agent | null = null;
      agentsRef.current.forEach((a) => {
        const dist = Math.hypot(a.x - clickX, a.y - clickY);
        if (dist < 30) {
          clickedAgent = a;
        }
      });

      if (clickedAgent) {
        setActiveAgent(clickedAgent);
        (clickedAgent as Agent).bubble = `Hello! I'm ${(clickedAgent as Agent).name}. Need help with ${(clickedAgent as Agent).role}?`;
        (clickedAgent as Agent).bubbleTimer = 250;
      } else {
        // Move Bryan to clicked point!
        const bryan = agentsRef.current.find((a) => a.id === "bryan");
        if (bryan) {
          bryan.targetX = Math.max(40, Math.min(canvas.width - 40, clickX));
          bryan.targetY = Math.max(40, Math.min(canvas.height - 40, clickY));
          bryan.isMoving = true;
          bryan.bubble = "Walking to selected coordinates... 🚶‍♂️";
          bryan.bubbleTimer = 150;
          setActiveAgent(bryan);
        }
      }
    };

    canvas.addEventListener("click", handleCanvasClick);

    // Render loop
    const render = () => {
      ticks++;

      // 1. CLEAR & DRAW TILE FLOOR (RPG Office Carpet / Tiles)
      ctx.fillStyle = "#0c1515"; // Deep Cinder Mint floor
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Grid tile texture
      const tileSize = 32;
      ctx.strokeStyle = "rgba(185, 245, 216, 0.04)";
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += tileSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += tileSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Office zones boundary lines (Pantry, Server room, Working zone)
      ctx.strokeStyle = "rgba(185, 245, 216, 0.15)";
      ctx.setLineDash([4, 4]);
      // Server Room border
      ctx.strokeRect(670, 20, 160, 160);
      // Lounge Area border
      ctx.strokeRect(620, 310, 210, 130);
      // Pantry border
      ctx.strokeRect(30, 310, 160, 130);
      ctx.setLineDash([]);

      // Zone Labels
      ctx.font = "bold 9px monospace";
      ctx.fillStyle = "rgba(185, 245, 216, 0.4)";
      ctx.fillText("[ SERVER FARM / CI/CD ]", 680, 35);
      ctx.fillText("[ COLLAB & LOUNGE ]", 630, 325);
      ctx.fillText("[ COFFEE BREAK PANTRY ]", 40, 325);
      ctx.fillText("[ DEV CORE WORKSTATION ]", 150, 80);

      // 2. DRAW FURNITURE
      furnitureList.forEach((f) => {
        if (f.type === "desk") {
          // Wooden/Industrial tech desk
          ctx.fillStyle = "#182a2a";
          ctx.fillRect(f.x, f.y, f.width, f.height);
          ctx.strokeStyle = "#b9f5d8";
          ctx.lineWidth = 1.5;
          ctx.strokeRect(f.x, f.y, f.width, f.height);

          // Dual Monitor screens
          ctx.fillStyle = "#070b0b";
          ctx.fillRect(f.x + 15, f.y + 8, 35, 20);
          ctx.fillRect(f.x + 60, f.y + 8, 35, 20);

          // Monitor glowing code display
          ctx.fillStyle = (ticks % 60 < 30) ? "#b9f5d8" : "#ff7043";
          ctx.fillRect(f.x + 18, f.y + 12, 12, 2);
          ctx.fillRect(f.x + 18, f.y + 16, 25, 2);
          ctx.fillRect(f.x + 22, f.y + 20, 18, 2);

          ctx.fillStyle = "#60a5fa";
          ctx.fillRect(f.x + 65, f.y + 12, 20, 2);
          ctx.fillRect(f.x + 65, f.y + 16, 15, 2);

          // Keyboard
          ctx.fillStyle = "#334155";
          ctx.fillRect(f.x + 40, f.y + 35, 30, 10);

          // Label
          ctx.font = "10px sans-serif";
          ctx.fillStyle = "#f4f0e8";
          ctx.fillText(f.name, f.x + 12, f.y + 55);
        } else if (f.type === "server") {
          // Server racks
          ctx.fillStyle = "#0f172a";
          ctx.fillRect(f.x, f.y, f.width, f.height);
          ctx.strokeStyle = "#38bdf8";
          ctx.lineWidth = 1;
          ctx.strokeRect(f.x, f.y, f.width, f.height);

          // Blinking LED slots
          for (let row = 0; row < 6; row++) {
            const ledY = f.y + 10 + row * 11;
            ctx.fillStyle = "#1e293b";
            ctx.fillRect(f.x + 5, ledY, f.width - 10, 7);

            // Blinking green/red lights
            const isGreen = (ticks + row * 15) % 40 > 15;
            ctx.fillStyle = isGreen ? "#4ade80" : "#ef4444";
            ctx.fillRect(f.x + 8, ledY + 2, 3, 3);
            ctx.fillStyle = "#38bdf8";
            ctx.fillRect(f.x + 15, ledY + 2, 3, 3);
          }
        } else if (f.type === "coffee") {
          // Coffee machine & counter
          ctx.fillStyle = "#3e2723";
          ctx.fillRect(f.x, f.y, f.width, f.height);
          ctx.strokeStyle = "#ff7043";
          ctx.lineWidth = 1.5;
          ctx.strokeRect(f.x, f.y, f.width, f.height);

          // Machine box
          ctx.fillStyle = "#94a3b8";
          ctx.fillRect(f.x + 20, f.y + 10, 40, 25);
          // Coffee spout
          ctx.fillStyle = "#1e293b";
          ctx.fillRect(f.x + 35, f.y + 25, 10, 10);
          // Steam animation
          if (ticks % 30 < 15) {
            ctx.strokeStyle = "rgba(255,255,255,0.6)";
            ctx.beginPath();
            ctx.moveTo(f.x + 40, f.y + 8);
            ctx.lineTo(f.x + 40, f.y + 2);
            ctx.stroke();
          }
        } else if (f.type === "board") {
          ctx.fillStyle = "#f8fafc";
          ctx.fillRect(f.x, f.y, f.width, f.height);
          ctx.strokeStyle = "#64748b";
          ctx.strokeRect(f.x, f.y, f.width, f.height);
          // Diagram sketches on whiteboard
          ctx.fillStyle = "#3b82f6";
          ctx.fillRect(f.x + 10, f.y + 4, 15, 12);
          ctx.fillStyle = "#ef4444";
          ctx.fillRect(f.x + 35, f.y + 4, 15, 12);
        } else if (f.type === "couch") {
          ctx.fillStyle = "#1e293b";
          ctx.fillRect(f.x, f.y, f.width, f.height);
          ctx.strokeStyle = "#b9f5d8";
          ctx.strokeRect(f.x, f.y, f.width, f.height);
        } else if (f.type === "plant") {
          // Decorative Plant pot
          ctx.fillStyle = "#b45309";
          ctx.fillRect(f.x + 5, f.y + 15, 20, 15);
          ctx.fillStyle = "#16a34a";
          ctx.beginPath();
          ctx.arc(f.x + 15, f.y + 12, 12, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // 3. UPDATE & DRAW AGENTS (2D Pixel RPG Walking Characters)
      agentsRef.current.forEach((agent) => {
        // Movement Logic towards Target
        if (agent.isMoving && !isPaused) {
          const dx = agent.targetX - agent.x;
          const dy = agent.targetY - agent.y;
          const dist = Math.hypot(dx, dy);

          if (dist > 3) {
            const speed = 2.2;
            agent.x += (dx / dist) * speed;
            agent.y += (dy / dist) * speed;

            // Direction orientation
            if (Math.abs(dx) > Math.abs(dy)) {
              agent.direction = dx > 0 ? "right" : "left";
            } else {
              agent.direction = dy > 0 ? "down" : "up";
            }

            // Animate leg frames
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

        // DRAW CHARACTER PIXEL BODY (Top-down 16-bit RPG sprite representation)
        const charX = agent.x;
        const charY = agent.y;

        // Shadow beneath character
        ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
        ctx.beginPath();
        ctx.ellipse(charX, charY + 8, 12, 6, 0, 0, Math.PI * 2);
        ctx.fill();

        // Legs (Walking animation wobble)
        ctx.fillStyle = "#1e293b";
        const legOffset = agent.isMoving ? Math.sin(ticks * 0.4) * 4 : 0;
        ctx.fillRect(charX - 6, charY + 2 + legOffset, 5, 8);
        ctx.fillRect(charX + 1, charY + 2 - legOffset, 5, 8);

        // Torso / Shirt (Color of agent)
        ctx.fillStyle = agent.clothColor;
        ctx.fillRect(charX - 8, charY - 12, 16, 15);
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 1;
        ctx.strokeRect(charX - 8, charY - 12, 16, 15);

        // Head (Skin tone)
        ctx.fillStyle = "#fbcfe8";
        ctx.beginPath();
        ctx.arc(charX, charY - 20, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Hair / Hat
        ctx.fillStyle = agent.hairColor;
        ctx.beginPath();
        ctx.arc(charX, charY - 24, 8, Math.PI, Math.PI * 2);
        ctx.fill();

        // Eyes (facing direction)
        ctx.fillStyle = "#000";
        if (agent.direction === "right") {
          ctx.fillRect(charX + 2, charY - 21, 2, 3);
          ctx.fillRect(charX + 5, charY - 21, 2, 3);
        } else if (agent.direction === "left") {
          ctx.fillRect(charX - 7, charY - 21, 2, 3);
          ctx.fillRect(charX - 4, charY - 21, 2, 3);
        } else if (agent.direction === "down") {
          ctx.fillRect(charX - 3, charY - 20, 2, 3);
          ctx.fillRect(charX + 2, charY - 20, 2, 3);
        }

        // Name Tag above character
        ctx.font = "bold 10px sans-serif";
        ctx.fillStyle = "#000000";
        const nameWidth = ctx.measureText(agent.name).width;
        ctx.fillRect(charX - nameWidth / 2 - 4, charY - 38, nameWidth + 8, 14);
        ctx.fillStyle = agent.color;
        ctx.fillText(agent.name, charX - nameWidth / 2, charY - 27);

        // SPEECH BUBBLE (Gather Town Style Dialog)
        if (agent.bubble && agent.bubbleTimer > 0) {
          agent.bubbleTimer--;
          ctx.font = "11px monospace";
          const bubbleWidth = ctx.measureText(agent.bubble).width + 16;
          const bubbleX = charX - bubbleWidth / 2;
          const bubbleY = charY - 60;

          // Bubble background & pointer
          ctx.fillStyle = "#ffffff";
          ctx.strokeStyle = "#182a2a";
          ctx.lineWidth = 1.5;

          ctx.beginPath();
          ctx.roundRect(bubbleX, bubbleY, bubbleWidth, 22, 6);
          ctx.fill();
          ctx.stroke();

          // Bubble tail
          ctx.beginPath();
          ctx.moveTo(charX - 4, bubbleY + 22);
          ctx.lineTo(charX, bubbleY + 28);
          ctx.lineTo(charX + 4, bubbleY + 22);
          ctx.fill();
          ctx.stroke();

          // Bubble text
          ctx.fillStyle = "#090f0f";
          ctx.fillText(agent.bubble, bubbleX + 8, bubbleY + 15);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
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
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6 border-b border-mint/20 pb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mint opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-mint"></span>
              </span>
              <span className="font-mono text-xs uppercase tracking-widest text-mint font-semibold">
                Autonomous 2D RPG Simulation
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-outfit font-black uppercase text-foreground tracking-tighter">
              BYS <span className="text-mint">Virtual Office</span>
            </h2>
            <p className="text-foreground/70 font-mono text-xs md:text-sm max-w-xl mt-2">
              Inspired by Gather Town & Digidaya: Agen AI berjalan otomatis, membuat kopi, memeriksa server, dan berkolaborasi. 
              <span className="text-flare font-bold block mt-1">💡 Klik di mana saja pada lantai untuk menggerakkan Bryan!</span>
            </p>
          </div>

          {/* Quick Realtime Counters */}
          <div className="flex items-center gap-3 bg-[#121f1f] p-3 rounded-2xl border border-mint/20 text-xs font-mono">
            <div className="flex items-center gap-1.5 text-mint">
              <Coffee size={15} className="text-flare" />
              <span>{stats.coffeeBrewed} Cups</span>
            </div>
            <div className="w-[1px] h-4 bg-white/20" />
            <div className="flex items-center gap-1.5 text-mint">
              <Server size={15} className="text-mint" />
              <span>{stats.commitsPushed} Deploys</span>
            </div>
            <div className="w-[1px] h-4 bg-white/20" />
            <div className="flex items-center gap-1.5 text-white">
              <Bot size={15} className="text-flare" />
              <span>4 Active Agents</span>
            </div>
          </div>
        </div>

        {/* 2D CANVAS CONTAINER */}
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
                <span>{isPaused ? "Resume" : "Pause AI"}</span>
              </button>
            </div>
          </div>

          {/* Interactive HTML5 Canvas */}
          <div className="w-full overflow-x-auto relative flex justify-center bg-[#0c1515] p-2 md:p-4">
            <canvas
              ref={canvasRef}
              width={850}
              height={460}
              className="rounded-2xl cursor-crosshair shadow-2xl max-w-full h-auto border border-mint/20"
            />
          </div>

          {/* Action / Selected Agent Footer */}
          <div className="bg-[#121f1f] p-4 md:px-8 border-t border-mint/20 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-flare animate-ping" />
              <span className="text-foreground/80">
                Active Focus: <strong className="text-mint">{activeAgent ? activeAgent.name : "Bryan Yogie"}</strong> — {activeAgent ? activeAgent.role : "Lead Developer"}
              </span>
            </div>

            <div className="text-foreground/60 text-[11px]">
              Tip: Sentuh atau klik lantai kantor untuk memanggil Bryan berjalan ke sana.
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
