"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Coffee, Server, Users, Eye, Sparkles, Activity, ShieldCheck, Zap, MessageSquare, Send, X, Bot, Loader2 } from "lucide-react";

interface AgentData {
  id: string;
  name: string;
  role: string;
  dept: string;
  status: string;
  badgeCol: string;
  chairPos: [number, number, number];
  deskFacing: number;
  hair: string;
  cloth: string;
}

interface ChatMessage {
  sender: "user" | "agent";
  text: string;
}

export default function VirtualOffice() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<AgentData | null>(null);
  const [metrics, setMetrics] = useState({ coffeeCount: 210, deploysCount: 104, packetRate: "1.6 Gbps" });
  
  // LIVE INTERACTIVE AGENT CHAT STATE
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleOpenChat = (agent: AgentData) => {
    setSelectedAgent(agent);
    setIsChatOpen(true);
    setChatMessages([
      {
        sender: "agent",
        text: `Halo! Aku ${agent.name} (${agent.role}). Ada yang bisa kubantu seputar pekerjaanku di virtual office atau proyek Bryan?`,
      },
    ]);
  };

  const handleSendMessage = async (e?: React.FormEvent, directText?: string) => {
    if (e) e.preventDefault();
    const textToSend = directText || userInput;
    if (!textToSend.trim() || isTyping || !selectedAgent) return;

    const userText = textToSend.trim();
    setUserInput("");
    setChatMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setIsTyping(true);

    try {
      const res = await fetch("/api/agent-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agentId: selectedAgent.id,
          message: userText,
        }),
      });

      const data = await res.json();
      setChatMessages((prev) => [
        ...prev,
        {
          sender: "agent",
          text: data.reply || "Sinyal terputus sebentar, silakan coba lagi!",
        },
      ]);
    } catch {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: "agent",
          text: "Gagal terhubung ke neural grid. Coba lagi dalam beberapa detik!",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isTyping]);

  const agentDefs: AgentData[] = [
    { id: "bryan", name: "Bryan Yogie", role: "Lead Fullstack & Network", dept: "Dev Lead", status: "Designing Next.js scalable architecture & microservices.", badgeCol: "#FF7043", chairPos: [-5.5, 0, -2.6], deskFacing: 0, hair: "#111827", cloth: "#FF7043" },
    { id: "nexus_core", name: "Nexus Core", role: "Chief AI Orchestrator", dept: "AI Operations", status: "Orchestrating agent neural workflows & low-latency edge inference.", badgeCol: "#B9F5D8", chairPos: [-2.0, 0, -2.6], deskFacing: 0, hair: "#334155", cloth: "#B9F5D8" },
    { id: "maya", name: "Aura Nova", role: "Creative Director & Spatial UX", dept: "Creative Tech", status: "Refining 3D Three.js PBR shaders & layout responsiveness.", badgeCol: "#F472B6", chairPos: [1.5, 0, -2.6], deskFacing: 0, hair: "#64748b", cloth: "#F472B6" },
    { id: "backend", name: "Backend Bot", role: "Distributed DB & API", dept: "Systems", status: "Optimizing indexed SQL query caching under 1.8ms.", badgeCol: "#38BDF8", chairPos: [-5.5, 0, 1.9], deskFacing: 0, hair: "#1e293b", cloth: "#38BDF8" },
    { id: "sentinel_qa", name: "Sentinel QA", role: "E2E Mobile Tester", dept: "Quality Assurance", status: "Simulating mobile touch gestures on 375px viewports.", badgeCol: "#A78BFA", chairPos: [-2.0, 0, 1.9], deskFacing: 0, hair: "#475569", cloth: "#A78BFA" },
    { id: "pipeline_ops", name: "Pipeline Ops", role: "CI/CD & Serverless Deploy", dept: "DevOps", status: "Zero downtime verified on Vercel Edge networks.", badgeCol: "#34D399", chairPos: [1.5, 0, 1.9], deskFacing: 0, hair: "#0f172a", cloth: "#34D399" },
    { id: "cisco_net", name: "Cisco Agent", role: "Network Security & Router", dept: "Infrastructure", status: "Monitoring patch cables, fiber switches & VLAN tunnels.", badgeCol: "#FBBF24", chairPos: [7.2, 0, -3.5], deskFacing: Math.PI, hair: "#1e1e1e", cloth: "#FBBF24" },
    { id: "growth_agent", name: "Growth Agent", role: "Global Traffic & Telemetry", dept: "Analytics", status: "Streaming real-time global visitor analytics.", badgeCol: "#FB923C", chairPos: [6.8, 0, 4.0], deskFacing: -Math.PI / 2, hair: "#78350f", cloth: "#FB923C" },
    { id: "barista_bot", name: "Barista Bot", role: "Executive Fuel & Pantry", dept: "Refreshment", status: "Fresh Arabica double-shot espresso brewed! ☕", badgeCol: "#E2E8F0", chairPos: [-7.5, 0, 5.2], deskFacing: 0, hair: "#3f3f46", cloth: "#FFFFFF" },
  ];

  // Helper to generate distinct realistic animated screens
  const createSpecializedScreenTexture = (roleType: "bryan_code" | "jarwo_ai" | "maya_figma" | "backend_sql" | "qa_mobile" | "devops_terminal") => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 320;
    const ctx = canvas.getContext("2d");
    if (!ctx) return new THREE.CanvasTexture(canvas);

    if (roleType === "bryan_code") {
      // Bryan: Next.js Turbopack Fullstack IDE
      ctx.fillStyle = "#0a0f1d";
      ctx.fillRect(0, 0, 512, 320);

      ctx.fillStyle = "#162032";
      ctx.fillRect(0, 0, 512, 32);
      ctx.fillStyle = "#ff5f56"; ctx.beginPath(); ctx.arc(16, 16, 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#ffbd2e"; ctx.beginPath(); ctx.arc(32, 16, 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#27c93f"; ctx.beginPath(); ctx.arc(48, 16, 5, 0, Math.PI * 2); ctx.fill();

      ctx.font = "bold 13px monospace";
      ctx.fillStyle = "#94a3b8";
      ctx.fillText("page.tsx - Bryan (Fullstack Architecture)", 70, 21);

      ctx.fillStyle = "#1e293b";
      ctx.fillRect(0, 32, 40, 288);
      ctx.font = "11px monospace";
      ctx.fillStyle = "#475569";
      for (let i = 1; i <= 13; i++) ctx.fillText(String(i).padStart(2, " "), 8, 35 + i * 20);

      const lines = [
        { c: "#f43f5e", t: "import" }, { c: "#f8fafc", t: " { useState } from 'react';" },
        { c: "#38bdf8", t: "\nexport async" }, { c: "#fbbf24", t: " function loadCluster() {" },
        { c: "#b9f5d8", t: "\n  const nodes" }, { c: "#e2e8f0", t: " = await Edge.ping();" },
        { c: "#ff7043", t: "\n  return" }, { c: "#f8fafc", t: " <BYSVirtualOffice nodes={9} />;" },
        { c: "#64748b", t: "\n} // High-Scale Turbo Turbopack" },
      ];
      let y = 60;
      ctx.font = "bold 13px monospace";
      ctx.fillStyle = "#f43f5e"; ctx.fillText("import", 50, y);
      ctx.fillStyle = "#f8fafc"; ctx.fillText(" { useState } from 'react';", 105, y);
      y += 24;
      ctx.fillStyle = "#38bdf8"; ctx.fillText("export async", 50, y);
      ctx.fillStyle = "#fbbf24"; ctx.fillText(" function loadCluster() {", 155, y);
      y += 24;
      ctx.fillStyle = "#b9f5d8"; ctx.fillText("  const nodes", 50, y);
      ctx.fillStyle = "#e2e8f0"; ctx.fillText(" = await Edge.ping(); // 12ms", 155, y);
      y += 24;
      ctx.fillStyle = "#ff7043"; ctx.fillText("  return", 50, y);
      ctx.fillStyle = "#f8fafc"; ctx.fillText(" <BYSVirtualOffice nodes={9} />;", 115, y);
      y += 24;
      ctx.fillStyle = "#64748b"; ctx.fillText("} // 100% Clean Architecture", 50, y);

      ctx.fillStyle = "#ff7043";
      ctx.fillRect(50, y + 20, 8, 16);
    } else if (roleType === "jarwo_ai") {
      // Nexus Core: Neural Network / Agent Orchestration Dispatcher
      ctx.fillStyle = "#0c1717";
      ctx.fillRect(0, 0, 512, 320);

      ctx.fillStyle = "#142828";
      ctx.fillRect(0, 0, 512, 32);
      ctx.font = "bold 13px monospace";
      ctx.fillStyle = "#b9f5d8";
      ctx.fillText("NEXUS_CORE // NEURAL_ORCHESTRATION_HUB", 20, 21);

      // Node Topology Diagram
      ctx.strokeStyle = "rgba(185, 245, 216, 0.4)";
      ctx.lineWidth = 2;
      const nodes = [{ x: 100, y: 100 }, { x: 250, y: 70 }, { x: 250, y: 160 }, { x: 400, y: 110 }, { x: 250, y: 250 }, { x: 400, y: 230 }];
      ctx.beginPath();
      ctx.moveTo(nodes[0].x, nodes[0].y); ctx.lineTo(nodes[1].x, nodes[1].y);
      ctx.moveTo(nodes[0].x, nodes[0].y); ctx.lineTo(nodes[2].x, nodes[2].y);
      ctx.moveTo(nodes[1].x, nodes[1].y); ctx.lineTo(nodes[3].x, nodes[3].y);
      ctx.moveTo(nodes[2].x, nodes[2].y); ctx.lineTo(nodes[4].x, nodes[4].y);
      ctx.moveTo(nodes[4].x, nodes[4].y); ctx.lineTo(nodes[5].x, nodes[5].y);
      ctx.stroke();

      nodes.forEach((n, idx) => {
        ctx.fillStyle = idx === 0 ? "#ff7043" : "#b9f5d8";
        ctx.beginPath(); ctx.arc(n.x, n.y, 10, 0, Math.PI * 2); ctx.fill();
        ctx.font = "bold 10px monospace";
        ctx.fillStyle = "#ffffff";
        ctx.fillText(`A${idx + 1}`, n.x - 7, n.y + 3);
      });

      ctx.fillStyle = "#b9f5d8";
      ctx.font = "bold 12px monospace";
      ctx.fillText("[ACTIVE] Queue: 14 Tasks | Routing: Optimal (0ms drop)", 50, 300);
    } else if (roleType === "maya_figma") {
      // Maya: Figma UI / 3D Design Canvas
      ctx.fillStyle = "#1e1e1e";
      ctx.fillRect(0, 0, 512, 320);

      ctx.fillStyle = "#2d2d2d";
      ctx.fillRect(0, 0, 512, 32);
      ctx.font = "bold 13px sans-serif";
      ctx.fillStyle = "#f472b6";
      ctx.fillText("Figma - Portfolio_Rebrand_v3.0.fig", 20, 21);

      // Wireframe mobile app mockup on canvas
      ctx.fillStyle = "#121212";
      ctx.fillRect(60, 60, 110, 220);
      ctx.strokeStyle = "#f472b6";
      ctx.lineWidth = 2;
      ctx.strokeRect(60, 60, 110, 220);

      ctx.fillStyle = "#f472b6";
      ctx.fillRect(75, 80, 80, 20); // Header mockup
      ctx.fillStyle = "#b9f5d8";
      ctx.fillRect(75, 115, 80, 50); // Hero card
      ctx.fillStyle = "#ff7043";
      ctx.fillRect(75, 180, 80, 25); // Button

      // Color Swatches on right side
      ctx.font = "bold 12px sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.fillText("PALETTE #02 (CINDER MINT)", 210, 80);

      const swatches = [
        { name: "Deep Cinder #182A2A", c: "#182a2a" },
        { name: "Electric Mint #B9F5D8", c: "#b9f5d8" },
        { name: "Flare Orange #FF7043", c: "#ff7043" },
        { name: "Bone White #F4F0E8", c: "#f4f0e8" },
      ];
      swatches.forEach((s, idx) => {
        ctx.fillStyle = s.c;
        ctx.fillRect(210, 105 + idx * 40, 30, 25);
        ctx.fillStyle = "#94a3b8";
        ctx.font = "11px monospace";
        ctx.fillText(s.name, 250, 122 + idx * 40);
      });
    } else if (roleType === "backend_sql") {
      // Backend: PostgreSQL Queries & Tables
      ctx.fillStyle = "#0b1320";
      ctx.fillRect(0, 0, 512, 320);

      ctx.fillStyle = "#1c2a3e";
      ctx.fillRect(0, 0, 512, 32);
      ctx.font = "bold 13px monospace";
      ctx.fillStyle = "#38bdf8";
      ctx.fillText("PostgreSQL 16 // DB_Cluster: Active (Master)", 20, 21);

      ctx.font = "bold 12px monospace";
      ctx.fillStyle = "#38bdf8"; ctx.fillText("SELECT", 30, 65);
      ctx.fillStyle = "#f8fafc"; ctx.fillText(" id, name, latency_ms, status", 85, 65);
      ctx.fillStyle = "#38bdf8"; ctx.fillText("FROM", 30, 85);
      ctx.fillStyle = "#f8fafc"; ctx.fillText(" distributed_agents", 75, 85);
      ctx.fillStyle = "#38bdf8"; ctx.fillText("WHERE", 30, 105);
      ctx.fillStyle = "#f8fafc"; ctx.fillText(" health = 'HEALTHY' ORDER BY latency ASC;", 85, 105);

      // Data table grid
      ctx.fillStyle = "#1c2a3e";
      ctx.fillRect(30, 130, 450, 25);
      ctx.fillStyle = "#38bdf8";
      ctx.fillText("ID  | AGENT_NAME       | LATENCY | MEMORY | STATUS", 40, 147);

      const rows = [
        "01  | Bryan Yogie      |  0.4ms  | 24 MB  | ACTIVE",
        "02  | Nexus Core       |  0.7ms  | 42 MB  | RUNNING",
        "03  | Sentinel QA      |  1.1ms  | 18 MB  | VERIFIED",
        "04  | Cisco Gateway    |  0.2ms  | 12 MB  | ONLINE",
      ];
      rows.forEach((r, idx) => {
        ctx.fillStyle = idx % 2 === 0 ? "rgba(255,255,255,0.05)" : "transparent";
        ctx.fillRect(30, 155 + idx * 28, 450, 25);
        ctx.fillStyle = "#e2e8f0";
        ctx.fillText(r, 40, 172 + idx * 28);
      });
    } else if (roleType === "qa_mobile") {
      // Sentinel QA: Mobile Emulator Viewport & Pass/Fail Checks
      ctx.fillStyle = "#140e1f";
      ctx.fillRect(0, 0, 512, 320);

      ctx.fillStyle = "#271b3d";
      ctx.fillRect(0, 0, 512, 32);
      ctx.font = "bold 13px monospace";
      ctx.fillStyle = "#a78bfa";
      ctx.fillText("E2E Mobile Test Emulator (iPhone 15 - 393x852)", 20, 21);

      // Mobile Device Preview
      ctx.fillStyle = "#000000";
      ctx.fillRect(40, 50, 120, 240);
      ctx.strokeStyle = "#a78bfa";
      ctx.strokeRect(40, 50, 120, 240);

      ctx.fillStyle = "#ff7043"; ctx.fillRect(55, 70, 90, 15);
      ctx.fillStyle = "#b9f5d8"; ctx.fillRect(55, 95, 90, 70);
      ctx.fillStyle = "#38bdf8"; ctx.fillRect(55, 175, 90, 40);

      // Test Suite Results
      ctx.font = "bold 13px monospace";
      const tests = [
        { status: "✔ PASS", name: "375px Viewport Overflow (0px horizontal)", c: "#22c55e" },
        { status: "✔ PASS", name: "Touch-to-Move Gesture Responsiveness", c: "#22c55e" },
        { status: "✔ PASS", name: "Pixel Swap Tap Trigger (100% firing)", c: "#22c55e" },
        { status: "✔ PASS", name: "DriftWall GPU Framerate (60.0 FPS)", c: "#22c55e" },
        { status: "✔ PASS", name: "Next.js Static Turbopack SSG Build", c: "#22c55e" },
      ];
      tests.forEach((t, idx) => {
        const y = 80 + idx * 36;
        ctx.fillStyle = t.c; ctx.fillText(t.status, 180, y);
        ctx.fillStyle = "#f8fafc"; ctx.fillText(t.name, 250, y);
      });
    } else {
      // DevOps: CI/CD Pipeline & Terminal Logs
      ctx.fillStyle = "#06130b";
      ctx.fillRect(0, 0, 512, 320);

      ctx.fillStyle = "#0e2a18";
      ctx.fillRect(0, 0, 512, 32);
      ctx.font = "bold 13px monospace";
      ctx.fillStyle = "#34d399";
      ctx.fillText("VERCEL CI/CD PIPELINE // PRODUCTION DEPLOY", 20, 21);

      ctx.font = "12px monospace";
      const logs = [
        "[13:50:12] git push origin main (Commit: 87d52b1) ... OK",
        "[13:50:15] Next.js Turbopack building 6 static routes ... OK",
        "[13:50:19] Generating /icon.png, /favicon.ico ... OK",
        "[13:50:21] Edge Lambdas deployed to 18 global regions ... OK",
        "[13:50:23] Healthcheck URL: https://bryanyogie-dev-me.vercel.app [200]",
        "[13:50:25] STATUS: READY (Zero Downtime Continuous Deployment)",
      ];
      logs.forEach((log, idx) => {
        ctx.fillStyle = idx === 5 ? "#34d399" : "#e2e8f0";
        ctx.fillText(log, 20, 70 + idx * 32);
      });

      // Status Bar
      ctx.fillStyle = "#22c55e";
      ctx.fillRect(20, 275, 472, 20);
      ctx.fillStyle = "#000000";
      ctx.font = "bold 11px monospace";
      ctx.fillText("● PIPELINE SUCCESSFUL - 0 CRITICAL VULNERABILITIES", 30, 289);
    }

    return new THREE.CanvasTexture(canvas);
  };

  const createTextSprite = (text: string, color: string, subText?: string) => {
    const canvas = document.createElement("canvas");
    canvas.width = 340;
    canvas.height = 110;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "rgba(10, 20, 20, 0.94)";
      ctx.strokeStyle = color;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.roundRect(10, 10, 320, 90, 18);
      ctx.fill();
      ctx.stroke();

      ctx.font = "bold 30px sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.fillText(text, 170, 50);

      if (subText) {
        ctx.font = "bold 20px monospace";
        ctx.fillStyle = color;
        ctx.fillText(subText, 170, 80);
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    const spriteMat = new THREE.SpriteMaterial({ map: texture, depthTest: false });
    const sprite = new THREE.Sprite(spriteMat);
    sprite.scale.set(3.0, 1.05, 1);
    return sprite;
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;

    // 1. SCENE & CAMERA SETUP
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#0c1515");
    scene.fog = new THREE.Fog("#0c1515", 35, 80);

    const width = container.clientWidth || 980;
    const height = isMobile ? 420 : 560;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    if (isMobile) {
      camera.position.set(19, 22, 23);
    } else {
      camera.position.set(15, 16, 19);
    }
    camera.lookAt(0, 1.2, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: !isMobile, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.shadowMap.enabled = !isMobile;
    renderer.shadowMap.type = THREE.BasicShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.maxPolarAngle = Math.PI / 2.15;
    controls.minDistance = 9;
    controls.maxDistance = 45;
    controls.target.set(0, 1.2, 0);

    // 2. STUDIO LIGHTING (Optimized)
    const hemiLight = new THREE.HemisphereLight("#b9f5d8", "#111827", 2.2);
    scene.add(hemiLight);

    const mainSun = new THREE.DirectionalLight("#ffffff", 2.8);
    mainSun.position.set(16, 28, 16);
    if (!isMobile) {
      mainSun.castShadow = true;
      mainSun.shadow.mapSize.width = 1024;
      mainSun.shadow.mapSize.height = 1024;
      const d = 18;
      mainSun.shadow.camera.left = -d;
      mainSun.shadow.camera.right = d;
      mainSun.shadow.camera.top = d;
      mainSun.shadow.camera.bottom = -d;
    }
    scene.add(mainSun);

    const flareKey = new THREE.PointLight("#ff7043", 3.0, 20);
    flareKey.position.set(-6, 6, 4);
    scene.add(flareKey);

    const mintKey = new THREE.PointLight("#b9f5d8", 3.0, 20);
    mintKey.position.set(2, 6, -4);
    scene.add(mintKey);

    const serverGlow = new THREE.PointLight("#38bdf8", 4.0, 18);
    serverGlow.position.set(7.5, 5, -4);
    scene.add(serverGlow);

    // 3. CYBERPUNK HIGH-TECH GLASS HQ ARCHITECTURE
    // High-Gloss Reflective Cyber Grid Floor
    const floorCanvas = document.createElement("canvas");
    floorCanvas.width = 1024;
    floorCanvas.height = 1024;
    const floorCtx = floorCanvas.getContext("2d");
    if (floorCtx) {
      // Dark cyber metallic base
      floorCtx.fillStyle = "#0a1313";
      floorCtx.fillRect(0, 0, 1024, 1024);

      // Hexagonal / Grid Matrix with glowing circuits
      floorCtx.strokeStyle = "rgba(185, 245, 216, 0.12)";
      floorCtx.lineWidth = 2;
      const step = 64;
      for (let x = 0; x <= 1024; x += step) {
        floorCtx.beginPath();
        floorCtx.moveTo(x, 0);
        floorCtx.lineTo(x, 1024);
        floorCtx.stroke();
      }
      for (let y = 0; y <= 1024; y += step) {
        floorCtx.beginPath();
        floorCtx.moveTo(0, y);
        floorCtx.lineTo(1024, y);
        floorCtx.stroke();
      }

      // Circuit Pathway Highlights (Flare & Mint)
      floorCtx.strokeStyle = "rgba(185, 245, 216, 0.35)";
      floorCtx.lineWidth = 4;
      floorCtx.strokeRect(128, 128, 768, 768);
      floorCtx.strokeStyle = "rgba(255, 112, 67, 0.4)";
      floorCtx.strokeRect(256, 256, 512, 512);

      // Micro LED Nodes on floor junctions
      floorCtx.fillStyle = "#b9f5d8";
      for (let x = 128; x <= 896; x += 128) {
        for (let y = 128; y <= 896; y += 128) {
          floorCtx.beginPath();
          floorCtx.arc(x, y, 4, 0, Math.PI * 2);
          floorCtx.fill();
        }
      }
    }
    const floorTex = new THREE.CanvasTexture(floorCanvas);
    floorTex.wrapS = THREE.RepeatWrapping;
    floorTex.wrapT = THREE.RepeatWrapping;
    floorTex.repeat.set(2, 2);

    const floorGeo = new THREE.BoxGeometry(28, 0.4, 22);
    const floorMat = new THREE.MeshStandardMaterial({
      map: floorTex,
      roughness: 0.15, // High-gloss wet cyberpunk reflection
      metalness: 0.75,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.position.y = -0.2;
    floor.receiveShadow = true;
    scene.add(floor);

    // Glowing Floor Perimeter Neon Rails
    const railMat = new THREE.MeshBasicMaterial({ color: "#b9f5d8" });
    const railL = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.15, 22), railMat);
    railL.position.set(-14, 0.05, 0);
    scene.add(railL);
    const railR = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.15, 22), railMat);
    railR.position.set(14, 0.05, 0);
    scene.add(railR);

    // PANORAMIC PENTHOUSE GLASS WINDOW WITH NIGHT CYBER SKYLINE BACKDROP
    // City Skyline Canvas Texture
    const cityCanvas = document.createElement("canvas");
    cityCanvas.width = 1024;
    cityCanvas.height = 512;
    const cityCtx = cityCanvas.getContext("2d");
    if (cityCtx) {
      // Midnight gradient
      const skyGrad = cityCtx.createLinearGradient(0, 0, 0, 512);
      skyGrad.addColorStop(0, "#04070a");
      skyGrad.addColorStop(0.7, "#08151c");
      skyGrad.addColorStop(1, "#122a2e");
      cityCtx.fillStyle = skyGrad;
      cityCtx.fillRect(0, 0, 1024, 512);

      // Distant Skyscrapers Silhouettes with glowing windows
      const buildings = [
        { x: 20, w: 70, h: 320 }, { x: 100, w: 90, h: 420 }, { x: 200, w: 60, h: 260 },
        { x: 270, w: 110, h: 460 }, { x: 390, w: 80, h: 350 }, { x: 480, w: 130, h: 490 },
        { x: 620, w: 75, h: 290 }, { x: 710, w: 100, h: 440 }, { x: 820, w: 85, h: 370 },
        { x: 915, w: 90, h: 430 }
      ];

      buildings.forEach((b) => {
        cityCtx.fillStyle = "#081017";
        cityCtx.fillRect(b.x, 512 - b.h, b.w, b.h);

        // Neon roof beacons
        cityCtx.fillStyle = Math.random() > 0.5 ? "#ff7043" : "#38bdf8";
        cityCtx.fillRect(b.x + b.w / 2 - 3, 512 - b.h - 8, 6, 8);

        // Glowing window matrix
        for (let wy = 512 - b.h + 20; wy < 490; wy += 22) {
          for (let wx = b.x + 8; wx < b.x + b.w - 8; wx += 16) {
            if (Math.random() > 0.3) {
              cityCtx.fillStyle = Math.random() > 0.7 ? "#b9f5d8" : "rgba(56, 189, 248, 0.75)";
              cityCtx.fillRect(wx, wy, 8, 12);
            }
          }
        }
      });
    }
    const cityTex = new THREE.CanvasTexture(cityCanvas);

    // City Backdrop Plane behind windows
    const cityBackdrop = new THREE.Mesh(
      new THREE.PlaneGeometry(38, 16),
      new THREE.MeshBasicMaterial({ map: cityTex })
    );
    cityBackdrop.position.set(0, 6.5, -12.5);
    scene.add(cityBackdrop);

    // Floor-to-Ceiling Glass Penthouse Window Panels (Back wall replacement)
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: "#b9f5d8",
      metalness: 0.1,
      roughness: 0.05,
      transmission: 0.88,
      thickness: 0.4,
      transparent: true,
      opacity: 0.45,
    });
    const backWindow = new THREE.Mesh(new THREE.BoxGeometry(28, 8, 0.2), glassMat);
    backWindow.position.set(0, 4.0, -10.5);
    scene.add(backWindow);

    // Modern Window Mullions / Metallic Pillars (Matte dark titanium)
    const mullionMat = new THREE.MeshStandardMaterial({ color: "#111c24", metalness: 0.85, roughness: 0.25 });
    [-13.8, -9.2, -4.6, 0, 4.6, 9.2, 13.8].forEach((mx) => {
      const mullion = new THREE.Mesh(new THREE.BoxGeometry(0.35, 8.2, 0.4), mullionMat);
      mullion.position.set(mx, 4.0, -10.45);
      scene.add(mullion);
    });
    // Horizontal transom beam
    const transom = new THREE.Mesh(new THREE.BoxGeometry(28, 0.35, 0.4), mullionMat);
    transom.position.set(0, 5.0, -10.45);
    scene.add(transom);

    // Sleek Left High-Tech Accent Wall with Cyber Slits
    const leftWallMat = new THREE.MeshStandardMaterial({ color: "#0c171a", roughness: 0.4, metalness: 0.6 });
    const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.5, 8, 22), leftWallMat);
    leftWall.position.set(-14, 4.0, 0);
    leftWall.receiveShadow = true;
    scene.add(leftWall);

    // Vertical Neon Light Slits on Left Wall
    [-6, -2, 2, 6].forEach((lz, idx) => {
      const slit = new THREE.Mesh(
        new THREE.BoxGeometry(0.55, 5.5, 0.15),
        new THREE.MeshBasicMaterial({ color: idx % 2 === 0 ? "#b9f5d8" : "#ff7043" })
      );
      slit.position.set(-13.95, 3.8, lz);
      scene.add(slit);
    });

    // Holographic Futuristic BYS Brand Sign (Glass Prism Plaque with Neon Text)
    const signGeo = new THREE.PlaneGeometry(8.5, 1.6);
    const signCanvas = document.createElement("canvas");
    signCanvas.width = 512;
    signCanvas.height = 96;
    const signCtx = signCanvas.getContext("2d");
    if (signCtx) {
      signCtx.fillStyle = "rgba(10, 24, 24, 0.9)";
      signCtx.fillRect(0, 0, 512, 96);
      signCtx.strokeStyle = "#b9f5d8";
      signCtx.lineWidth = 4;
      signCtx.strokeRect(4, 4, 504, 88);
      signCtx.font = "900 28px monospace";
      signCtx.fillStyle = "#b9f5d8";
      signCtx.fillText("BYS LAB // QUANTUM STUDIO", 32, 45);
      signCtx.font = "bold 13px monospace";
      signCtx.fillStyle = "#ff7043";
      signCtx.fillText("AUTONOMOUS AGENT ORCHESTRATION • 60 FPS", 34, 72);
    }
    const signTex = new THREE.CanvasTexture(signCanvas);
    const signMesh = new THREE.Mesh(signGeo, new THREE.MeshBasicMaterial({ map: signTex, transparent: true, opacity: 0.95 }));
    signMesh.position.set(0, 6.2, -10.3);
    scene.add(signMesh);

    // FLOATING HOLOGRAPHIC CENTRAL CORE (High-Tech centerpiece)
    const holoCoreGroup = new THREE.Group();
    holoCoreGroup.position.set(-2, 3.8, -0.5);

    const octGeo = new THREE.OctahedronGeometry(0.7, 0);
    const octMat = new THREE.MeshBasicMaterial({ color: "#b9f5d8", wireframe: true });
    const octMesh = new THREE.Mesh(octGeo, octMat);
    holoCoreGroup.add(octMesh);

    const ringGeo = new THREE.TorusGeometry(1.2, 0.03, 16, 50);
    const ringMat = new THREE.MeshBasicMaterial({ color: "#38bdf8" });
    const ringMesh1 = new THREE.Mesh(ringGeo, ringMat);
    ringMesh1.rotation.x = Math.PI / 3;
    holoCoreGroup.add(ringMesh1);

    const ringMesh2 = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({ color: "#ff7043" }));
    ringMesh2.rotation.y = Math.PI / 4;
    holoCoreGroup.add(ringMesh2);

    // Pedestal for Hologram Core
    const pedestal = new THREE.Mesh(
      new THREE.CylinderGeometry(0.6, 0.8, 1.2, 8),
      new THREE.MeshStandardMaterial({ color: "#091216", metalness: 0.9, roughness: 0.2 })
    );
    pedestal.position.set(-2, 0.6, -0.5);
    scene.add(pedestal);
    scene.add(holoCoreGroup);

    // FLOATING CYBER DUST PARTICLES (Ambient living atmosphere)
    const particleCount = isMobile ? 60 : 160;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let p = 0; p < particleCount * 3; p += 3) {
      particlePositions[p] = (Math.random() - 0.5) * 24;
      particlePositions[p + 1] = Math.random() * 6 + 0.5;
      particlePositions[p + 2] = (Math.random() - 0.5) * 18;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: "#b9f5d8",
      size: isMobile ? 0.08 : 0.12,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const cyberParticles = new THREE.Points(particleGeo, particleMat);
    scene.add(cyberParticles);

    // 4. REALISTIC WORKSTATIONS WITH UNIQUE SPECIALIZED MONITORS
    const deskMat = new THREE.MeshStandardMaterial({ color: "#1e3535", roughness: 0.4, metalness: 0.3 });
    const monitorBezelMat = new THREE.MeshStandardMaterial({ color: "#050a0a", roughness: 0.1, metalness: 0.9 });

    // Distinct textures per role
    const bryanTex = createSpecializedScreenTexture("bryan_code");
    const jarwoTex = createSpecializedScreenTexture("jarwo_ai");
    const mayaTex = createSpecializedScreenTexture("maya_figma");
    const backendTex = createSpecializedScreenTexture("backend_sql");
    const qaTex = createSpecializedScreenTexture("qa_mobile");
    const devopsTex = createSpecializedScreenTexture("devops_terminal");

    const terminalTex = createSpecializedScreenTexture("devops_terminal");

    const createRealWorkstation = (x: number, z: number, mainTex: THREE.CanvasTexture, sideTex: THREE.CanvasTexture) => {
      const g = new THREE.Group();
      g.position.set(x, 0, z);

      // Desk Top
      const top = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.14, 1.6), deskMat);
      top.position.y = 1.35;
      top.castShadow = true;
      top.receiveShadow = true;
      g.add(top);

      // Metal Legs
      const legMat = new THREE.MeshStandardMaterial({ color: "#475569", metalness: 0.8 });
      [[-1.2, -0.6], [1.2, -0.6], [-1.2, 0.6], [1.2, 0.6]].forEach(([lx, lz]) => {
        const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.35), legMat);
        leg.position.set(lx, 0.675, lz);
        leg.castShadow = true;
        g.add(leg);
      });

      // Gaming / Dev PC Case under desk
      const tower = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.9, 0.9),
        new THREE.MeshStandardMaterial({ color: "#0f172a", roughness: 0.3, metalness: 0.7 })
      );
      tower.position.set(-1.0, 0.45, 0.2);
      tower.castShadow = true;
      g.add(tower);

      // RGB Fan Ring on PC
      const fanGlow = new THREE.Mesh(
        new THREE.CircleGeometry(0.18, 16),
        new THREE.MeshBasicMaterial({ color: x < 0 ? "#ff7043" : "#38bdf8" })
      );
      fanGlow.position.set(-1.0, 0.55, 0.66);
      g.add(fanGlow);

      // DUAL CURVED SPECIALIZED MONITORS
      const scrGeo = new THREE.BoxGeometry(1.05, 0.68, 0.05);
      const faceGeo = new THREE.PlaneGeometry(0.98, 0.6);

      // Main Left Monitor (Distinct per desk!)
      const m1 = new THREE.Mesh(scrGeo, monitorBezelMat);
      m1.position.set(-0.6, 1.95, -0.2);
      m1.rotation.y = 0.18;
      g.add(m1);

      const f1 = new THREE.Mesh(faceGeo, new THREE.MeshBasicMaterial({ map: mainTex }));
      f1.position.set(-0.6, 1.95, -0.17);
      f1.rotation.y = 0.18;
      g.add(f1);

      // Auxiliary Right Monitor
      const m2 = new THREE.Mesh(scrGeo, monitorBezelMat);
      m2.position.set(0.6, 1.95, -0.2);
      m2.rotation.y = -0.18;
      g.add(m2);

      const f2 = new THREE.Mesh(faceGeo, new THREE.MeshBasicMaterial({ map: sideTex }));
      f2.position.set(0.6, 1.95, -0.17);
      f2.rotation.y = -0.18;
      g.add(f2);

      // Professional Cable Bundle running down desk leg (No random messy curves!)
      const deskCable = new THREE.Mesh(
        new THREE.CylinderGeometry(0.03, 0.03, 1.35),
        new THREE.MeshStandardMaterial({ color: "#090d16", roughness: 0.9 })
      );
      deskCable.position.set(-1.18, 0.675, -0.58);
      g.add(deskCable);

      // Ergonomic Swivel Chair
      const chairGroup = new THREE.Group();
      chairGroup.position.set(0, 0, 0.9);

      const seat = new THREE.Mesh(
        new THREE.BoxGeometry(0.8, 0.12, 0.8),
        new THREE.MeshStandardMaterial({ color: "#090d16", roughness: 0.6 })
      );
      seat.position.y = 0.85;
      seat.castShadow = true;
      chairGroup.add(seat);

      const back = new THREE.Mesh(
        new THREE.BoxGeometry(0.78, 0.95, 0.1),
        new THREE.MeshStandardMaterial({ color: "#1e293b", roughness: 0.5 })
      );
      back.position.set(0, 1.35, 0.42);
      back.castShadow = true;
      chairGroup.add(back);

      [-0.42, 0.42].forEach((ax) => {
        const arm = new THREE.Mesh(
          new THREE.BoxGeometry(0.08, 0.42, 0.55),
          new THREE.MeshStandardMaterial({ color: "#334155" })
        );
        arm.position.set(ax, 1.1, 0.05);
        chairGroup.add(arm);
      });

      const basePillar = new THREE.Mesh(
        new THREE.CylinderGeometry(0.06, 0.06, 0.85),
        new THREE.MeshStandardMaterial({ color: "#64748b", metalness: 0.9 })
      );
      basePillar.position.y = 0.425;
      chairGroup.add(basePillar);

      g.add(chairGroup);
      scene.add(g);
    };

    // 6 Workstations with CHARACTER SPECIFIC SCREENS
    createRealWorkstation(-5.5, -3.5, bryanTex, terminalTex);    // Bryan: Next.js + Terminal
    createRealWorkstation(-2.0, -3.5, jarwoTex, terminalTex);    // Jarwo: Neural Dispatcher + Terminal
    createRealWorkstation(1.5, -3.5, mayaTex, bryanTex);         // Aura Nova: Figma UI Mockup + Code
    createRealWorkstation(-5.5, 1.0, backendTex, terminalTex);   // Backend: PostgreSQL Tables + Terminal
    createRealWorkstation(-2.0, 1.0, qaTex, bryanTex);           // QA: Mobile Emulator + Code
    createRealWorkstation(1.5, 1.0, devopsTex, terminalTex);     // DevOps: Vercel Pipeline + Terminal

    // 5. SERVER ROOM WITH PROFESSIONAL STRUCTURED CABLE MANAGEMENT (NO MESSY FLOATING LINES)
    const rackGeo = new THREE.BoxGeometry(1.4, 4.2, 1.5);
    const rackMat = new THREE.MeshStandardMaterial({ color: "#020617", metalness: 0.8, roughness: 0.2 });
    for (let s = 0; s < 3; s++) {
      const rack = new THREE.Mesh(rackGeo, rackMat);
      const rx = 5.8 + s * 1.8;
      rack.position.set(rx, 2.1, -5.5);
      rack.castShadow = true;
      rack.receiveShadow = true;
      scene.add(rack);

      const ledFace = new THREE.Mesh(
        new THREE.PlaneGeometry(1.1, 3.4),
        new THREE.MeshBasicMaterial({ color: s % 2 === 0 ? "#38bdf8" : "#22c55e" })
      );
      ledFace.position.set(rx, 2.1, -4.74);
      scene.add(ledFace);

      // Clean Vertical Wire Duct / Cable Organizer on side of racks
      const duct = new THREE.Mesh(
        new THREE.BoxGeometry(0.12, 3.8, 0.25),
        new THREE.MeshStandardMaterial({ color: "#334155" })
      );
      duct.position.set(rx - 0.65, 2.1, -4.7);
      scene.add(duct);

      // U-shape Structured Patch Cords entering side duct neatly
      const patchColors = ["#38bdf8", "#b9f5d8", "#ff7043", "#a78bfa", "#facc15"];
      for (let p = 0; p < 4; p++) {
        const py = 3.2 - p * 0.6;
        const cord = new THREE.CatmullRomCurve3([
          new THREE.Vector3(rx - 0.2, py, -4.72),
          new THREE.Vector3(rx - 0.45, py - 0.08, -4.68),
          new THREE.Vector3(rx - 0.62, py - 0.04, -4.7),
        ]);
        const tube = new THREE.Mesh(
          new THREE.TubeGeometry(cord, 8, 0.018, 6, false),
          new THREE.MeshStandardMaterial({ color: patchColors[p % patchColors.length] })
        );
        scene.add(tube);
      }
    }

    // Overhead Structured Cable Tray (Mounted cleanly along back wall)
    const cableTray = new THREE.Mesh(
      new THREE.BoxGeometry(18, 0.12, 0.45),
      new THREE.MeshStandardMaterial({ color: "#1e293b", metalness: 0.8 })
    );
    cableTray.position.set(0, 5.2, -9.6);
    scene.add(cableTray);

    // Neat Trunk Cable Bundles along tray (Cyan, Yellow, Orange)
    [0.08, -0.08].forEach((offsetY, idx) => {
      const trunkLine = new THREE.Mesh(
        new THREE.CylinderGeometry(0.035, 0.035, 17.5),
        new THREE.MeshStandardMaterial({ color: idx === 0 ? "#eab308" : "#38bdf8" })
      );
      trunkLine.rotation.z = Math.PI / 2;
      trunkLine.position.set(0, 5.2 + offsetY, -9.6);
      scene.add(trunkLine);
    });

    // Vertical Riser Duct dropping cables down from tray into Server Rack
    const riserDuct = new THREE.Mesh(
      new THREE.BoxGeometry(0.3, 3.2, 0.3),
      new THREE.MeshStandardMaterial({ color: "#1e293b", metalness: 0.8 })
    );
    riserDuct.position.set(5.8, 3.6, -9.6);
    scene.add(riserDuct);

    // 6. EXECUTIVE CONFERENCE ROOM & PANTRY
    const confTable = new THREE.Mesh(
      new THREE.BoxGeometry(5.0, 0.15, 3.0),
      new THREE.MeshStandardMaterial({ color: "#1e293b", roughness: 0.2, metalness: 0.8 })
    );
    confTable.position.set(6.5, 1.3, 4.5);
    confTable.castShadow = true;
    scene.add(confTable);

    [[-1.5, 0], [0, 0], [1.5, 0]].forEach(([lx, lz]) => {
      const lap = new THREE.Mesh(
        new THREE.BoxGeometry(0.6, 0.04, 0.45),
        new THREE.MeshStandardMaterial({ color: "#cbd5e1", metalness: 0.9 })
      );
      lap.position.set(6.5 + lx, 1.4, 4.5 + lz);
      scene.add(lap);
    });

    const barCounter = new THREE.Mesh(
      new THREE.BoxGeometry(3.5, 1.5, 1.8),
      new THREE.MeshStandardMaterial({ color: "#3e2723", roughness: 0.6 })
    );
    barCounter.position.set(-8, 0.75, 5.8);
    barCounter.castShadow = true;
    scene.add(barCounter);

    const espressoMachine = new THREE.Mesh(
      new THREE.BoxGeometry(1.2, 0.9, 0.9),
      new THREE.MeshStandardMaterial({ color: "#94a3b8", metalness: 0.9, roughness: 0.2 })
    );
    espressoMachine.position.set(-8, 1.95, 5.8);
    espressoMachine.castShadow = true;
    scene.add(espressoMachine);

    // Decorative Plants
    const potGeo = new THREE.CylinderGeometry(0.35, 0.25, 0.7);
    const potMat = new THREE.MeshStandardMaterial({ color: "#78350f" });
    const leafGeo = new THREE.DodecahedronGeometry(0.6);
    const leafMat = new THREE.MeshStandardMaterial({ color: "#16a34a", roughness: 0.8 });

    [[-10.5, -7.5], [-10.5, 7.5], [10.5, -7.5], [10.5, 7.5]].forEach(([px, pz]) => {
      const pot = new THREE.Mesh(potGeo, potMat);
      pot.position.set(px, 0.35, pz);
      scene.add(pot);
      const leaf = new THREE.Mesh(leafGeo, leafMat);
      leaf.position.set(px, 0.95, pz);
      scene.add(leaf);
    });

    // 7. ARTICULATED SITTING / WALKING VOXEL AGENTS (TRUE 90° SITTING)
    interface AgentRuntime {
      data: AgentData;
      rootGroup: THREE.Group;
      bodyMesh: THREE.Mesh;
      headMesh: THREE.Mesh;
      thighL: THREE.Mesh;
      thighR: THREE.Mesh;
      shinL: THREE.Mesh;
      shinR: THREE.Mesh;
      armL: THREE.Mesh;
      armR: THREE.Mesh;
      targetPos: THREE.Vector3;
      chairPos: THREE.Vector3;
      isMoving: boolean;
      isSeated: boolean;
    }

    const agentsRuntime: AgentRuntime[] = [];

    const buildArticulatedVoxel = (hairCol: string, clothCol: string) => {
      const root = new THREE.Group();

      const body = new THREE.Mesh(
        new THREE.BoxGeometry(0.7, 0.8, 0.4),
        new THREE.MeshStandardMaterial({ color: clothCol, roughness: 0.4 })
      );
      body.castShadow = true;
      root.add(body);

      const head = new THREE.Mesh(
        new THREE.BoxGeometry(0.55, 0.55, 0.55),
        new THREE.MeshStandardMaterial({ color: "#fecdd3", roughness: 0.6 })
      );
      head.position.y = 0.68;
      head.castShadow = true;
      body.add(head);

      const hair = new THREE.Mesh(
        new THREE.BoxGeometry(0.6, 0.22, 0.6),
        new THREE.MeshStandardMaterial({ color: hairCol, roughness: 0.8 })
      );
      hair.position.y = 0.32;
      head.add(hair);

      const armGeo = new THREE.BoxGeometry(0.2, 0.65, 0.2);
      const armMat = new THREE.MeshStandardMaterial({ color: clothCol });

      const armL = new THREE.Mesh(armGeo, armMat);
      armL.position.set(-0.45, 0.1, 0);
      body.add(armL);

      const armR = new THREE.Mesh(armGeo, armMat);
      armR.position.set(0.45, 0.1, 0);
      body.add(armR);

      // Two-segment legs
      const legMat = new THREE.MeshStandardMaterial({ color: "#0f172a" });

      const thighL = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.42, 0.22), legMat);
      thighL.position.set(-0.18, -0.4, 0);
      body.add(thighL);

      const shinL = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.42, 0.2), legMat);
      shinL.position.set(0, -0.38, 0);
      thighL.add(shinL);

      const thighR = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.42, 0.22), legMat);
      thighR.position.set(0.18, -0.4, 0);
      body.add(thighR);

      const shinR = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.42, 0.2), legMat);
      shinR.position.set(0, -0.38, 0);
      thighR.add(shinR);

      const aura = new THREE.Mesh(
        new THREE.RingGeometry(0.5, 0.65, 32),
        new THREE.MeshBasicMaterial({ color: clothCol, side: THREE.DoubleSide })
      );
      aura.rotation.x = Math.PI / 2;
      aura.position.y = 0.05;
      root.add(aura);

      return { root, body, head, thighL, thighR, shinL, shinR, armL, armR };
    };

    agentDefs.forEach((d) => {
      const char = buildArticulatedVoxel(d.hair, d.cloth);
      char.root.position.set(d.chairPos[0], 0, d.chairPos[2]);
      scene.add(char.root);

      const sprite = createTextSprite(d.name, d.badgeCol, d.dept);
      sprite.position.set(0, 3.0, 0);
      char.root.add(sprite);

      agentsRuntime.push({
        data: d,
        rootGroup: char.root,
        bodyMesh: char.body,
        headMesh: char.head,
        thighL: char.thighL,
        thighR: char.thighR,
        shinL: char.shinL,
        shinR: char.shinR,
        armL: char.armL,
        armR: char.armR,
        targetPos: new THREE.Vector3(...d.chairPos),
        chairPos: new THREE.Vector3(...d.chairPos),
        isMoving: false,
        isSeated: true,
      });
    });

    setSelectedAgent(agentDefs[0]);

    // AUTONOMOUS ROUTINE
    const routineTimer = setInterval(() => {
      agentsRuntime.forEach((a) => {
        if (!a.isMoving) {
          const rand = Math.random();
          if (a.isSeated && rand < 0.25) {
            a.isSeated = false;
            a.isMoving = true;
            if (rand < 0.1) {
              a.targetPos.set(-7.5 + (Math.random() - 0.5) * 2, 0, 4.5 + (Math.random() - 0.5) * 1.5);
              a.data.status = "Walking to espresso bar for freshly brewed Arabica ☕";
              setMetrics((m) => ({ ...m, coffeeCount: m.coffeeCount + 1 }));
            } else if (rand < 0.2) {
              a.targetPos.set(7.5 + (Math.random() - 0.5) * 2, 0, -3.5 + (Math.random() - 0.5) * 1.5);
              a.data.status = "Auditing structured cable ducts & fiber rack telemetry ⚡";
              setMetrics((m) => ({ ...m, deploysCount: m.deploysCount + 1 }));
            } else {
              a.targetPos.set(6.5 + (Math.random() - 0.5) * 2.5, 0, 4.5 + (Math.random() - 0.5) * 1.5);
              a.data.status = "Collaborating at glass conference table on sprint design 💡";
            }
          } else if (!a.isSeated && rand < 0.45) {
            a.targetPos.copy(a.chairPos);
            a.isMoving = true;
            a.data.status = `Seated at workstation, actively typing on ${a.data.dept} monitors.`;
          }
        }
      });
    }, 4200);

    // CLICK TO MOVE OR INSPECT
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerDown = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      let clickedAgent: AgentRuntime | null = null;
      for (const a of agentsRuntime) {
        const hits = raycaster.intersectObjects(a.rootGroup.children, true);
        if (hits.length > 0) {
          clickedAgent = a;
          break;
        }
      }

      if (clickedAgent) {
        setSelectedAgent((clickedAgent as AgentRuntime).data);
        return;
      }

      const floorHits = raycaster.intersectObject(floor);
      if (floorHits.length > 0) {
        const pt = floorHits[0].point;
        const bryan = agentsRuntime.find((a) => a.data.id === "bryan");
        if (bryan) {
          bryan.isSeated = false;
          bryan.targetPos.set(
            Math.max(-11.5, Math.min(11.5, pt.x)),
            0,
            Math.max(-8.5, Math.min(8.5, pt.z))
          );
          bryan.isMoving = true;
          bryan.data.status = "Walking to selected office station! 🚶‍♂️";
          setSelectedAgent(bryan.data);
        }
      }
    };

    renderer.domElement.addEventListener("pointerdown", handlePointerDown);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 980;
      const h = window.innerWidth < 768 ? 420 : 560;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // 8. RENDER LOOP WITH INTERSECTION OBSERVER (Offscreen throttle)
    let frameId: number;
    let clock = new THREE.Clock();
    let isVisible = true;

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) {
        clock.getDelta(); // reset delta so no sudden jumps
      }
    }, { threshold: 0.05 });
    observer.observe(container);

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      if (!isVisible) return; // Don't burn GPU cycles when user is reading other sections!

      const delta = Math.min(clock.getDelta(), 0.1);
      const time = clock.getElapsedTime();

      agentsRuntime.forEach((a) => {
        if (a.isMoving) {
          const dir = new THREE.Vector3().subVectors(a.targetPos, a.rootGroup.position);
          const dist = dir.length();

          if (dist > 0.12) {
            dir.normalize();
            a.rootGroup.position.addScaledVector(dir, delta * 3.8);

            const angle = Math.atan2(dir.x, dir.z);
            a.rootGroup.rotation.y = angle;

            // WALKING POSE
            a.bodyMesh.position.y = 1.05;
            a.thighL.rotation.x = Math.sin(time * 14) * 0.65;
            a.thighR.rotation.x = -Math.sin(time * 14) * 0.65;
            a.shinL.rotation.x = 0;
            a.shinR.rotation.x = 0;
            a.armL.rotation.x = -Math.sin(time * 14) * 0.5;
            a.armR.rotation.x = Math.sin(time * 14) * 0.5;
          } else {
            a.rootGroup.position.copy(a.targetPos);
            a.isMoving = false;

            if (a.targetPos.distanceTo(a.chairPos) < 0.25) {
              a.isSeated = true;
            }
          }
        } else if (a.isSeated) {
          // NATURAL SITTING KINEMATICS
          a.rootGroup.rotation.y = a.data.deskFacing;
          a.bodyMesh.position.y = 0.95;
          a.thighL.rotation.x = Math.PI / 2;
          a.thighR.rotation.x = Math.PI / 2;
          a.shinL.rotation.x = -Math.PI / 2;
          a.shinR.rotation.x = -Math.PI / 2;
          // Typing movement
          a.armL.rotation.x = -Math.PI / 3 + Math.sin(time * 4) * 0.05;
          a.armR.rotation.x = -Math.PI / 3 - Math.sin(time * 4) * 0.05;
        } else {
          a.bodyMesh.position.y = 1.05;
          a.thighL.rotation.x = 0;
          a.thighR.rotation.x = 0;
          a.shinL.rotation.x = 0;
          a.shinR.rotation.x = 0;
          a.armL.rotation.x = 0;
          a.armR.rotation.x = 0;
        }
      });

      // Animate Floating Holographic Central Core
      holoCoreGroup.rotation.y = time * 0.8;
      octMesh.rotation.x = time * 0.5;
      octMesh.rotation.z = time * 0.6;
      ringMesh1.rotation.z = time * 0.4;
      ringMesh2.rotation.x = -time * 0.4;

      // Animate Cyber Dust Particles gentle drift
      cyberParticles.rotation.y = time * 0.04;

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
      clearInterval(routineTimer);
      window.removeEventListener("resize", handleResize);
      renderer.domElement.removeEventListener("pointerdown", handlePointerDown);
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <section className="relative w-full py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-[#090f0f] border-t border-mint/20 overflow-hidden" id="virtual-office">
      {/* Background Ambience */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#b9f5d8 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6 border-b border-mint/20 pb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mint opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-mint"></span>
              </span>
              <span className="font-mono text-xs uppercase tracking-widest text-mint font-semibold flex items-center gap-1.5">
                <Sparkles size={13} className="text-flare" /> Live 3D AI Voxel Headquarters
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-outfit font-black uppercase text-foreground tracking-tighter">
              BYS <span className="text-mint">3D Virtual Office</span>
            </h2>
            <p className="text-foreground/70 font-mono text-xs md:text-sm max-w-2xl mt-2 leading-relaxed">
              Real-time 3D metaverse powered by Three.js: 9 voxel agents seated at workstations with custom IDE screens (Next.js, Neural AI, Figma UI & SQL), plus structured fiber cable trays.
              <span className="text-flare font-bold block mt-1">
                🕹️ Touch or drag to orbit in 3D • Tap any floor tile to command Bryan!
              </span>
            </p>
          </div>

          {/* Realtime Metrics */}
          <div className="flex flex-wrap items-center gap-3 md:gap-4 bg-[#121f1f] p-3 rounded-2xl border border-mint/20 text-xs font-mono">
            <div className="flex items-center gap-1.5 text-mint">
              <Coffee size={15} className="text-flare" />
              <span>{metrics.coffeeCount} Coffees</span>
            </div>
            <div className="w-[1px] h-4 bg-white/20" />
            <div className="flex items-center gap-1.5 text-mint">
              <Server size={15} className="text-mint" />
              <span>{metrics.deploysCount} Deploys</span>
            </div>
            <div className="w-[1px] h-4 bg-white/20" />
            <div className="flex items-center gap-1.5 text-white">
              <Zap size={15} className="text-amber-400" />
              <span>{metrics.packetRate}</span>
            </div>
          </div>
        </div>

        {/* 3D STAGE CONTAINER */}
        <div className="w-full bg-[#101b1b] rounded-3xl border-2 border-mint/30 shadow-[0_25px_70px_rgba(0,0,0,0.85)] overflow-hidden relative">
          
          {/* Top Control Bar */}
          <div className="bg-[#142323] px-4 md:px-6 py-3 flex items-center justify-between border-b border-mint/20">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              <span className="ml-3 font-mono text-[11px] md:text-xs text-foreground/70 tracking-wider">
                bys_cyber_studio // custom_role_monitors_pbr
              </span>
            </div>

            <div className="flex items-center gap-2 text-[11px] md:text-xs font-mono text-mint">
              <Eye size={13} />
              <span className="hidden sm:inline">Left-Click Orbit • Right-Click Pan • Pinch / Scroll Zoom</span>
              <span className="sm:hidden">Drag to Rotate 3D</span>
            </div>
          </div>

          {/* 3D Canvas Mount */}
          <div 
            ref={mountRef} 
            className="w-full h-[420px] md:h-[560px] bg-[#0c1515] relative cursor-grab active:cursor-grabbing overflow-hidden"
          />

          {/* LIVE AGENT INSPECTOR HUD */}
          <div className="bg-[#121f1f] p-4 md:px-8 border-t border-mint/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-mono text-xs">
            <div className="flex items-center gap-3">
              <span 
                className="w-3.5 h-3.5 rounded-full animate-ping" 
                style={{ backgroundColor: selectedAgent?.badgeCol || "#FF7043" }} 
              />
              <div className="text-foreground/90">
                <span className="text-foreground/50">Inspecting: </span>
                <strong className="text-white text-sm">{selectedAgent?.name}</strong>
                <span className="text-mint ml-2 px-2 py-0.5 rounded-md bg-mint/10 border border-mint/30 text-[10px]">
                  {selectedAgent?.role}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
              <div className="flex items-center gap-2 text-foreground/80 bg-[#090f0f] px-3.5 py-2 rounded-xl border border-white/10 max-w-md w-full md:w-auto truncate">
                <span className="text-flare font-bold text-[11px]">STATUS:</span>
                <span className="text-mint font-sans text-xs truncate">
                  &quot;{selectedAgent?.status}&quot;
                </span>
              </div>

              {selectedAgent && (
                <button
                  onClick={() => handleOpenChat(selectedAgent)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-mint text-cinder font-outfit font-black text-xs hover:bg-flare hover:text-white transition-all shadow-[0_0_20px_rgba(185,245,216,0.4)] whitespace-nowrap active:scale-95 cursor-pointer"
                >
                  <MessageSquare size={14} />
                  <span>Chat AI</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* INTERACTIVE CYBER TERMINAL AI CHAT MODAL */}
        {isChatOpen && selectedAgent && (
          <div className="fixed inset-0 z-[99999] bg-black/75 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
            <div className="w-full max-w-lg bg-[#0e1a1a] border-2 border-mint/40 rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col h-[520px] font-mono">
              
              {/* Modal Header */}
              <div className="bg-[#142626] px-5 py-4 border-b border-mint/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-3.5 h-3.5 rounded-full animate-ping"
                    style={{ backgroundColor: selectedAgent.badgeCol }}
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-outfit font-black text-white text-base tracking-wide">
                        {selectedAgent.name}
                      </h3>
                      <span className="text-[10px] text-mint bg-mint/10 px-2 py-0.5 rounded-md border border-mint/30">
                        {selectedAgent.dept}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#f4f0e8]/60">{selectedAgent.role}</p>
                  </div>
                </div>

                <button 
                  onClick={() => setIsChatOpen(false)}
                  className="p-1.5 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Chat Messages Log */}
              <div className="flex-1 p-4 sm:p-5 overflow-y-auto flex flex-col gap-3.5 text-xs">
                {chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                  >
                    <div className="flex items-center gap-1.5 mb-1 text-[10px] text-[#f4f0e8]/40">
                      {msg.sender === "agent" ? (
                        <>
                          <Bot size={12} className="text-mint" />
                          <span>{selectedAgent.name}</span>
                        </>
                      ) : (
                        <span>You (Visitor)</span>
                      )}
                    </div>
                    <div
                      className={`p-3.5 rounded-2xl max-w-[85%] leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-flare text-white rounded-br-xs font-sans text-[13px] shadow-md"
                          : "bg-[#162a2a] text-[#f4f0e8] border border-mint/20 rounded-bl-xs font-sans text-[13px]"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-center gap-2 text-mint text-xs font-mono p-2">
                    <Loader2 size={14} className="animate-spin text-mint" />
                    <span>{selectedAgent.name} is thinking...</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Prompt Suggestions */}
              <div className="px-4 py-2 bg-[#122222] border-t border-mint/10 flex items-center gap-2 overflow-x-auto text-[11px]">
                {[
                  selectedAgent.id === "bryan" ? "Apa proyek andalanmu?" : "Bagaimana caramu bekerja?",
                  selectedAgent.id === "bryan" ? "Bisa ceritakan latar belakangmu?" : "Apa status infrastruktur saat ini?",
                  "Siapa Bryan Yogie?",
                ].map((sug, sIdx) => (
                  <button
                    key={sIdx}
                    onClick={() => {
                      handleSendMessage(undefined, sug);
                    }}
                    disabled={isTyping}
                    className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-[#182e2e] text-mint hover:bg-mint hover:text-cinder transition-colors border border-mint/20 cursor-pointer disabled:opacity-50"
                  >
                    {sug}
                  </button>
                ))}
              </div>

              {/* Chat Input Field */}
              <form onSubmit={handleSendMessage} className="p-3.5 bg-[#142626] border-t border-mint/20 flex items-center gap-2">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder={`Tanya ${selectedAgent.name}...`}
                  className="flex-1 bg-[#0b1414] border border-mint/20 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-[#f4f0e8]/40 focus:outline-none focus:border-mint transition-colors"
                />
                <button
                  type="submit"
                  disabled={!userInput.trim() || isTyping}
                  className="p-2.5 rounded-xl bg-mint text-cinder hover:bg-flare hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  <Send size={15} />
                </button>
              </form>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
