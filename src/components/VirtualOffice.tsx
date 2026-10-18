"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Coffee, Server, Users, Eye, Sparkles, Activity, ShieldCheck, Zap } from "lucide-react";

interface AgentData {
  id: string;
  name: string;
  role: string;
  dept: string;
  status: string;
  badgeCol: string;
  x: number;
  z: number;
  chairX: number;
  chairZ: number;
  hair: string;
  cloth: string;
}

export default function VirtualOffice() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<AgentData | null>(null);
  const [metrics, setMetrics] = useState({ coffeeCount: 184, deploysCount: 89, packetRate: "1.2 Gbps" });

  const agentDefs: AgentData[] = [
    { id: "bryan", name: "Bryan Yogie", role: "Lead Fullstack & Network", dept: "Dev Lead", status: "Designing Next.js scalable architecture & microservices.", badgeCol: "#FF7043", x: -5.5, z: -2.4, chairX: -5.5, chairZ: -2.4, hair: "#111827", cloth: "#FF7043" },
    { id: "jarwo", name: "Jarwo AI", role: "Chief AI Orchestrator", dept: "AI Operations", status: "Orchestrating agent workflows & load-balancing edge tasks.", badgeCol: "#B9F5D8", x: -2.0, z: -2.4, chairX: -2.0, chairZ: -2.4, hair: "#334155", cloth: "#B9F5D8" },
    { id: "maya", name: "Maya UI", role: "Design Systems & 3D Web", dept: "Creative Tech", status: "Refining 3D Three.js PBR shaders & layout responsiveness.", badgeCol: "#F472B6", x: 1.5, z: -2.4, chairX: 1.5, chairZ: -2.4, hair: "#64748b", cloth: "#F472B6" },
    { id: "backend", name: "Backend Bot", role: "Distributed DB & API", dept: "Systems", status: "Optimizing indexed SQL query caching under 1.8ms.", badgeCol: "#38BDF8", x: -5.5, z: 2.1, chairX: -5.5, chairZ: 2.1, hair: "#1e293b", cloth: "#38BDF8" },
    { id: "sentinel_qa", name: "Sentinel QA", role: "E2E Mobile Tester", dept: "Quality Assurance", status: "Simulating mobile touch gestures on 375px viewports.", badgeCol: "#A78BFA", x: -2.0, z: 2.1, chairX: -2.0, chairZ: 2.1, hair: "#475569", cloth: "#A78BFA" },
    { id: "pipeline_ops", name: "Pipeline Ops", role: "CI/CD & Serverless Deploy", dept: "DevOps", status: "Zero downtime verified on Vercel Edge networks.", badgeCol: "#34D399", x: 1.5, z: 2.1, chairX: 1.5, chairZ: 2.1, hair: "#0f172a", cloth: "#34D399" },
    { id: "cisco_net", name: "Cisco Agent", role: "Network Security & Router", dept: "Infrastructure", status: "Monitoring patch cables, fiber switches & VLAN tunnels.", badgeCol: "#FBBF24", x: 7.2, z: -3.5, chairX: 7.2, chairZ: -3.5, hair: "#1e1e1e", cloth: "#FBBF24" },
    { id: "growth_agent", name: "Growth Agent", role: "Global Traffic & Telemetry", dept: "Analytics", status: "Streaming real-time global visitor analytics.", badgeCol: "#FB923C", x: 6.8, z: 4.0, chairX: 6.8, chairZ: 4.0, hair: "#78350f", cloth: "#FB923C" },
    { id: "barista_bot", name: "Barista Bot", role: "Executive Fuel & Pantry", dept: "Refreshment", status: "Fresh Arabica double-shot espresso brewed! ☕", badgeCol: "#E2E8F0", x: -7.5, z: 5.2, chairX: -7.5, chairZ: 5.2, hair: "#3f3f46", cloth: "#FFFFFF" },
  ];

  const createTextSprite = (text: string, color: string, subText?: string) => {
    const canvas = document.createElement("canvas");
    canvas.width = 320;
    canvas.height = 110;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "rgba(10, 20, 20, 0.92)";
      ctx.strokeStyle = color;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.roundRect(10, 10, 300, 90, 18);
      ctx.fill();
      ctx.stroke();

      ctx.font = "bold 30px sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.fillText(text, 160, 50);

      if (subText) {
        ctx.font = "bold 20px monospace";
        ctx.fillStyle = color;
        ctx.fillText(subText, 160, 80);
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

    // 1. SCENE SETUP
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#0c1515");
    scene.fog = new THREE.Fog("#0c1515", 35, 80);

    const width = container.clientWidth || 980;
    const height = isMobile ? 420 : 560;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    // Dynamic camera for mobile vs desktop
    if (isMobile) {
      camera.position.set(20, 24, 24); // Wider viewpoint on mobile
    } else {
      camera.position.set(16, 17, 20);
    }
    camera.lookAt(0, 1.2, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2.15;
    controls.minDistance = 9;
    controls.maxDistance = 45;
    controls.target.set(0, 1.2, 0);

    // 2. STUDIO LIGHTING
    const hemiLight = new THREE.HemisphereLight("#b9f5d8", "#111827", 2.2);
    scene.add(hemiLight);

    const mainSun = new THREE.DirectionalLight("#ffffff", 2.8);
    mainSun.position.set(16, 28, 16);
    mainSun.castShadow = true;
    mainSun.shadow.mapSize.width = 2048;
    mainSun.shadow.mapSize.height = 2048;
    const d = 18;
    mainSun.shadow.camera.left = -d;
    mainSun.shadow.camera.right = d;
    mainSun.shadow.camera.top = d;
    mainSun.shadow.camera.bottom = -d;
    scene.add(mainSun);

    const flareKey = new THREE.PointLight("#ff7043", 4.5, 25);
    flareKey.position.set(-6, 6, 4);
    scene.add(flareKey);

    const mintKey = new THREE.PointLight("#b9f5d8", 4.0, 25);
    mintKey.position.set(2, 6, -4);
    scene.add(mintKey);

    const serverGlow = new THREE.PointLight("#38bdf8", 5.0, 20);
    serverGlow.position.set(7.5, 5, -4);
    scene.add(serverGlow);

    // 3. ARCHITECTURAL WALLS & FLOORS
    // Main Floor
    const floorGeo = new THREE.BoxGeometry(26, 0.4, 20);
    const floorMat = new THREE.MeshStandardMaterial({
      color: "#142424",
      roughness: 0.35,
      metalness: 0.15,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.position.y = -0.2;
    floor.receiveShadow = true;
    scene.add(floor);

    // Background Architectural Back Wall with Glass Window Strips
    const wallGeo = new THREE.BoxGeometry(26, 7, 0.5);
    const wallMat = new THREE.MeshStandardMaterial({ color: "#0e1a1a", roughness: 0.8 });
    const backWall = new THREE.Mesh(wallGeo, wallMat);
    backWall.position.set(0, 3.3, -10);
    backWall.receiveShadow = true;
    scene.add(backWall);

    // Side Wall (Left)
    const sideWallGeo = new THREE.BoxGeometry(0.5, 7, 20);
    const leftWall = new THREE.Mesh(sideWallGeo, wallMat);
    leftWall.position.set(-13, 3.3, 0);
    leftWall.receiveShadow = true;
    scene.add(leftWall);

    // Glowing Neon Wall Sign "BYS LAB // CLOUD METAVERSE"
    const signGeo = new THREE.PlaneGeometry(8, 1.4);
    const signCanvas = document.createElement("canvas");
    signCanvas.width = 400;
    signCanvas.height = 70;
    const signCtx = signCanvas.getContext("2d");
    if (signCtx) {
      signCtx.fillStyle = "#162828";
      signCtx.fillRect(0, 0, 400, 70);
      signCtx.strokeStyle = "#b9f5d8";
      signCtx.lineWidth = 4;
      signCtx.strokeRect(4, 4, 392, 62);
      signCtx.font = "bold 26px monospace";
      signCtx.fillStyle = "#b9f5d8";
      signCtx.fillText("BYS LAB // DEV METAVERSE", 24, 44);
    }
    const signTex = new THREE.CanvasTexture(signCanvas);
    const signMesh = new THREE.Mesh(signGeo, new THREE.MeshBasicMaterial({ map: signTex }));
    signMesh.position.set(-4, 5.0, -9.7);
    scene.add(signMesh);

    // Floor Inset Rugs
    const engRug = new THREE.Mesh(
      new THREE.BoxGeometry(13.5, 0.04, 9.5),
      new THREE.MeshStandardMaterial({ color: "#182c2c", roughness: 0.7 })
    );
    engRug.position.set(-2, 0.02, -0.5);
    engRug.receiveShadow = true;
    scene.add(engRug);

    // Data Center Platform
    const dataPlatform = new THREE.Mesh(
      new THREE.BoxGeometry(7.5, 0.08, 7.5),
      new THREE.MeshStandardMaterial({ color: "#0c1824", roughness: 0.2, metalness: 0.8 })
    );
    dataPlatform.position.set(7.5, 0.04, -4.5);
    dataPlatform.receiveShadow = true;
    scene.add(dataPlatform);

    // 4. REALISTIC DETAILED WORKSTATIONS (DESKS, MONITORS, TOWER PC, CABLES)
    const deskMat = new THREE.MeshStandardMaterial({ color: "#1e3535", roughness: 0.4, metalness: 0.3 });
    const monitorMat = new THREE.MeshStandardMaterial({ color: "#050a0a", roughness: 0.2 });
    const mintScreen = new THREE.MeshBasicMaterial({ color: "#b9f5d8" });
    const flareScreen = new THREE.MeshBasicMaterial({ color: "#ff7043" });

    const createRealWorkstation = (x: number, z: number) => {
      const g = new THREE.Group();
      g.position.set(x, 0, z);

      // Wooden Top with bevel
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

      // Realistic Gaming / Dev PC Case (Under the desk)
      const tower = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.9, 0.9),
        new THREE.MeshStandardMaterial({ color: "#0f172a", roughness: 0.3, metalness: 0.7 })
      );
      tower.position.set(-1.0, 0.45, 0.2);
      tower.castShadow = true;
      g.add(tower);

      // PC Case Glass RGB Fan Glow
      const fanGlow = new THREE.Mesh(
        new THREE.CircleGeometry(0.18, 16),
        new THREE.MeshBasicMaterial({ color: (x < 0) ? "#ff7043" : "#38bdf8" })
      );
      fanGlow.position.set(-1.0, 0.55, 0.66);
      g.add(fanGlow);

      // Dual Curved Monitors
      const scrGeo = new THREE.BoxGeometry(0.95, 0.6, 0.05);
      const faceGeo = new THREE.PlaneGeometry(0.88, 0.52);

      const m1 = new THREE.Mesh(scrGeo, monitorMat);
      m1.position.set(-0.55, 1.9, -0.2);
      m1.rotation.y = 0.18;
      g.add(m1);

      const f1 = new THREE.Mesh(faceGeo, mintScreen);
      f1.position.set(-0.55, 1.9, -0.17);
      f1.rotation.y = 0.18;
      g.add(f1);

      const m2 = new THREE.Mesh(scrGeo, monitorMat);
      m2.position.set(0.55, 1.9, -0.2);
      m2.rotation.y = -0.18;
      g.add(m2);

      const f2 = new THREE.Mesh(faceGeo, flareScreen);
      f2.position.set(0.55, 1.9, -0.17);
      f2.rotation.y = -0.18;
      g.add(f2);

      // Curved Cable Tubes dropping from desk to PC
      const cableCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.2, 1.3, -0.2),
        new THREE.Vector3(-0.4, 0.9, 0.0),
        new THREE.Vector3(-0.8, 0.5, 0.2),
      ]);
      const cableMesh = new THREE.Mesh(
        new THREE.TubeGeometry(cableCurve, 12, 0.025, 6, false),
        new THREE.MeshStandardMaterial({ color: "#0f172a", roughness: 0.9 })
      );
      g.add(cableMesh);

      // Ergonomic Mesh Swivel Chair
      const chairGroup = new THREE.Group();
      chairGroup.position.set(0, 0, 0.65);

      const seat = new THREE.Mesh(
        new THREE.BoxGeometry(0.75, 0.1, 0.75),
        new THREE.MeshStandardMaterial({ color: "#090d16", roughness: 0.6 })
      );
      seat.position.y = 0.85;
      seat.castShadow = true;
      chairGroup.add(seat);

      const back = new THREE.Mesh(
        new THREE.BoxGeometry(0.75, 0.9, 0.08),
        new THREE.MeshStandardMaterial({ color: "#1e293b", roughness: 0.5 })
      );
      back.position.set(0, 1.3, 0.36);
      back.castShadow = true;
      chairGroup.add(back);

      // Armrests
      [-0.4, 0.4].forEach((ax) => {
        const arm = new THREE.Mesh(
          new THREE.BoxGeometry(0.08, 0.4, 0.5),
          new THREE.MeshStandardMaterial({ color: "#334155" })
        );
        arm.position.set(ax, 1.05, 0.05);
        chairGroup.add(arm);
      });

      // Five-star chair base & cylinder
      const basePillar = new THREE.Mesh(
        new THREE.CylinderGeometry(0.06, 0.06, 0.85),
        new THREE.MeshStandardMaterial({ color: "#64748b", metalness: 0.9 })
      );
      basePillar.position.y = 0.425;
      chairGroup.add(basePillar);

      g.add(chairGroup);
      scene.add(g);
    };

    // 6 Full Dev Workstations
    createRealWorkstation(-5.5, -3.5);
    createRealWorkstation(-2.0, -3.5);
    createRealWorkstation(1.5, -3.5);
    createRealWorkstation(-5.5, 1.0);
    createRealWorkstation(-2.0, 1.0);
    createRealWorkstation(1.5, 1.0);

    // 5. DATA CENTER WITH VISIBLE TANGLED FIBER PATCH CABLES & SWITCHES
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

      // Realistic Patch Cables hanging down the front of the server racks
      const colors = ["#ef4444", "#3b82f6", "#eab308", "#10b981", "#8b5cf6"];
      for (let c = 0; c < 4; c++) {
        const cableCurve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(rx - 0.4 + c * 0.25, 3.2 - c * 0.4, -4.7),
          new THREE.Vector3(rx - 0.3 + c * 0.2, 2.2 - c * 0.3, -4.55),
          new THREE.Vector3(rx - 0.4 + c * 0.25, 1.2 - c * 0.2, -4.7),
        ]);
        const tube = new THREE.Mesh(
          new THREE.TubeGeometry(cableCurve, 10, 0.02, 6, false),
          new THREE.MeshStandardMaterial({ color: colors[c % colors.length], roughness: 0.5 })
        );
        scene.add(tube);
      }
    }

    // Overhead Cable Tray running from Server Room to Desks
    const trayGeo = new THREE.BoxGeometry(12, 0.15, 0.6);
    const trayMat = new THREE.MeshStandardMaterial({ color: "#1e293b", metalness: 0.7 });
    const cableTray = new THREE.Mesh(trayGeo, trayMat);
    cableTray.position.set(1.0, 5.2, -4.5);
    scene.add(cableTray);

    // Hanging Yellow & Cyan Network Trunk Cables
    const trunkCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(6.5, 4.2, -5.0),
      new THREE.Vector3(2.0, 5.1, -4.5),
      new THREE.Vector3(-3.5, 3.5, -3.5),
    ]);
    const trunkMesh = new THREE.Mesh(
      new THREE.TubeGeometry(trunkCurve, 20, 0.045, 6, false),
      new THREE.MeshStandardMaterial({ color: "#eab308", roughness: 0.6 })
    );
    scene.add(trunkMesh);

    // 6. EXECUTIVE CONFERENCE ROOM & PANTRY
    const confTable = new THREE.Mesh(
      new THREE.BoxGeometry(5.0, 0.15, 3.0),
      new THREE.MeshPhysicalMaterial({ color: "#1e293b", roughness: 0.1, transmission: 0.5, thickness: 0.4 })
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

    // 7. AGENTS WITH SEATED / WALKING STATE MACHINE
    interface AgentRuntime {
      data: AgentData;
      group: THREE.Group;
      targetPos: THREE.Vector3;
      homePos: THREE.Vector3;
      isMoving: boolean;
      isSeated: boolean;
      bodyMesh: THREE.Mesh;
      legL: THREE.Mesh;
      legR: THREE.Mesh;
    }

    const agentsRuntime: AgentRuntime[] = [];

    const createVoxelCharacter = (hairCol: string, clothCol: string) => {
      const g = new THREE.Group();

      const body = new THREE.Mesh(
        new THREE.BoxGeometry(0.7, 0.85, 0.42),
        new THREE.MeshStandardMaterial({ color: clothCol, roughness: 0.4 })
      );
      body.position.y = 1.05;
      body.castShadow = true;
      g.add(body);

      const head = new THREE.Mesh(
        new THREE.BoxGeometry(0.55, 0.55, 0.55),
        new THREE.MeshStandardMaterial({ color: "#fecdd3", roughness: 0.6 })
      );
      head.position.y = 1.75;
      head.castShadow = true;
      g.add(head);

      const hair = new THREE.Mesh(
        new THREE.BoxGeometry(0.6, 0.22, 0.6),
        new THREE.MeshStandardMaterial({ color: hairCol, roughness: 0.8 })
      );
      hair.position.y = 2.05;
      g.add(hair);

      const legGeo = new THREE.BoxGeometry(0.24, 0.65, 0.24);
      const legMat = new THREE.MeshStandardMaterial({ color: "#0f172a" });

      const legL = new THREE.Mesh(legGeo, legMat);
      legL.position.set(-0.18, 0.35, 0);
      legL.name = "legL";
      legL.castShadow = true;
      g.add(legL);

      const legR = new THREE.Mesh(legGeo, legMat);
      legR.position.set(0.18, 0.35, 0);
      legR.name = "legR";
      legR.castShadow = true;
      g.add(legR);

      const aura = new THREE.Mesh(
        new THREE.RingGeometry(0.5, 0.65, 32),
        new THREE.MeshBasicMaterial({ color: clothCol, side: THREE.DoubleSide })
      );
      aura.rotation.x = Math.PI / 2;
      aura.position.y = 0.05;
      g.add(aura);

      return { group: g, body, legL, legR };
    };

    agentDefs.forEach((d) => {
      const { group: charGroup, body, legL, legR } = createVoxelCharacter(d.hair, d.cloth);
      charGroup.position.set(d.x, 0, d.z);
      scene.add(charGroup);

      const sprite = createTextSprite(d.name, d.badgeCol, d.dept);
      sprite.position.set(0, 2.9, 0);
      charGroup.add(sprite);

      agentsRuntime.push({
        data: d,
        group: charGroup,
        targetPos: new THREE.Vector3(d.x, 0, d.z),
        homePos: new THREE.Vector3(d.chairX, 0, d.chairZ),
        isMoving: false,
        isSeated: true, // Initially seated comfortably at desk
        bodyMesh: body,
        legL,
        legR,
      });
    });

    setSelectedAgent(agentDefs[0]);

    // AUTONOMOUS ROUTINE: AGENTS SIT AT DESKS & OCCASIONALLY STAND UP TO WALK
    const routineTimer = setInterval(() => {
      agentsRuntime.forEach((a) => {
        if (!a.isMoving) {
          const rand = Math.random();
          if (a.isSeated && rand < 0.28) {
            // Stand up and walk!
            a.isSeated = false;
            a.isMoving = true;
            if (rand < 0.1) {
              // Visit Pantry
              a.targetPos.set(-7.5 + (Math.random() - 0.5) * 2, 0, 4.5 + (Math.random() - 0.5) * 1.5);
              a.data.status = "Standing up to grab espresso from barista pantry ☕";
              setMetrics((m) => ({ ...m, coffeeCount: m.coffeeCount + 1 }));
            } else if (rand < 0.2) {
              // Visit Server Room
              a.targetPos.set(7.5 + (Math.random() - 0.5) * 2, 0, -3.5 + (Math.random() - 0.5) * 1.5);
              a.data.status = "Walking to server room to check patch cables & packet logs ⚡";
              setMetrics((m) => ({ ...m, deploysCount: m.deploysCount + 1 }));
            } else {
              // Visit Meeting Table
              a.targetPos.set(6.5 + (Math.random() - 0.5) * 2.5, 0, 4.5 + (Math.random() - 0.5) * 1.5);
              a.data.status = "Joining executive architecture sprint at glass table 💡";
            }
          } else if (!a.isSeated && rand < 0.45) {
            // Return to chair and sit down!
            a.targetPos.copy(a.homePos);
            a.isMoving = true;
            a.data.status = `Returning to desk, sitting down & coding ${a.data.dept} services.`;
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
        const hits = raycaster.intersectObjects(a.group.children, true);
        if (hits.length > 0) {
          clickedAgent = a;
          break;
        }
      }

      if (clickedAgent) {
        setSelectedAgent((clickedAgent as AgentRuntime).data);
        return;
      }

      // Floor click -> direct Bryan
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
          bryan.data.status = "Walking to requested coordinates! 🚶‍♂️";
          setSelectedAgent(bryan.data);
        }
      }
    };

    renderer.domElement.addEventListener("pointerdown", handlePointerDown);

    // Responsive resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 980;
      const h = window.innerWidth < 768 ? 420 : 560;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // 8. RENDER 60FPS LOOP WITH SITTING & WALKING KINEMATICS
    let frameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      agentsRuntime.forEach((a) => {
        if (a.isMoving) {
          const dir = new THREE.Vector3().subVectors(a.targetPos, a.group.position);
          const dist = dir.length();

          if (dist > 0.12) {
            dir.normalize();
            a.group.position.addScaledVector(dir, delta * 3.8);

            const angle = Math.atan2(dir.x, dir.z);
            a.group.rotation.y = angle;

            // Character is standing up & walking
            a.group.position.y = 0;
            a.bodyMesh.position.y = 1.05;
            a.legL.rotation.x = Math.sin(time * 14) * 0.65;
            a.legR.rotation.x = -Math.sin(time * 14) * 0.65;
          } else {
            a.group.position.copy(a.targetPos);
            a.isMoving = false;

            // Check if arrived at home chair
            if (a.targetPos.distanceTo(a.homePos) < 0.2) {
              a.isSeated = true;
            }
          }
        } else if (a.isSeated) {
          // SEATED POSE: Legs bent horizontally on chair, lower body height
          a.group.rotation.y = 0; // Face forward towards monitor
          a.group.position.y = -0.22; // Lower to sit comfortably
          a.bodyMesh.position.y = 1.05;
          a.legL.rotation.x = Math.PI / 2.2; // Legs bent forward sitting
          a.legR.rotation.x = Math.PI / 2.2;
        } else {
          // Idle Standing
          a.group.position.y = 0;
          a.legL.rotation.x = 0;
          a.legR.rotation.x = 0;
        }
      });

      controls.update();
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
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
              Real-time 3D metaverse powered by Three.js: 9 voxel agents sitting at ergonomic desks, walking to espresso bars, with detailed network cabling, RGB gaming rigs & fiber racks.
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
                bys_cyber_studio // mobile_responsive_pbr
              </span>
            </div>

            <div className="flex items-center gap-2 text-[11px] md:text-xs font-mono text-mint">
              <Eye size={13} />
              <span className="hidden sm:inline">Left-Click Orbit • Right-Click Pan • Pinch / Scroll Zoom</span>
              <span className="sm:hidden">Drag to Rotate 3D</span>
            </div>
          </div>

          {/* 3D Canvas Mount (Responsive Height) */}
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

            <div className="flex items-center gap-2 text-foreground/80 bg-[#090f0f] px-3.5 py-2 rounded-xl border border-white/10 max-w-xl w-full md:w-auto">
              <span className="text-flare font-bold text-[11px]">STATUS:</span>
              <span className="text-mint font-sans text-xs truncate">
                &quot;{selectedAgent?.status}&quot;
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
