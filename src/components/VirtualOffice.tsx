"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Coffee, Server, Users, Eye, Sparkles, Compass, CheckCircle2 } from "lucide-react";

interface AgentData {
  id: string;
  name: string;
  role: string;
  dept: string;
  status: string;
  badgeCol: string;
  x: number;
  z: number;
  hair: string;
  cloth: string;
}

export default function VirtualOffice() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<AgentData | null>(null);
  const [metrics, setMetrics] = useState({ coffeeCount: 164, deploysCount: 72, activeAgents: 9 });

  const agentDefs: AgentData[] = [
    { id: "bryan", name: "Bryan Yogie", role: "Lead Fullstack & Network", dept: "Dev Lead", status: "Architecting Next.js 16 core & network tunnels.", badgeCol: "#FF7043", x: -5.5, z: -2.8, hair: "#111827", cloth: "#FF7043" },
    { id: "jarwo", name: "Jarwo AI", role: "Chief AI Orchestrator", dept: "AI Operations", status: "Dispatching multi-agent tasks & balancing edge queues.", badgeCol: "#B9F5D8", x: -2.0, z: -2.8, hair: "#334155", cloth: "#B9F5D8" },
    { id: "maya", name: "Maya UI", role: "Design Systems & 3D Web", dept: "Creative Tech", status: "Fine-tuning PBR shaders, lighting & micro-interactions.", badgeCol: "#F472B6", x: 1.5, z: -2.8, hair: "#64748b", cloth: "#F472B6" },
    { id: "backend", name: "Backend Bot", role: "Distributed DB & API", dept: "Systems", status: "Indexing SQL query execution plans under 2ms.", badgeCol: "#38BDF8", x: -5.5, z: 1.8, hair: "#1e293b", cloth: "#38BDF8" },
    { id: "sentinel_qa", name: "Sentinel QA", role: "E2E Mobile Tester", dept: "Quality Assurance", status: "Simulating mobile touch viewports (375px) with 0 glitches.", badgeCol: "#A78BFA", x: -2.0, z: 1.8, hair: "#475569", cloth: "#A78BFA" },
    { id: "pipeline_ops", name: "Pipeline Ops", role: "CI/CD & Serverless Deploy", dept: "DevOps", status: "All Vercel edge build pipelines verified & live.", badgeCol: "#34D399", x: 1.5, z: 1.8, hair: "#0f172a", cloth: "#34D399" },
    { id: "cisco_net", name: "Cisco Agent", role: "Network Security & Router", dept: "Infrastructure", status: "Packet firewall, BGP route table & VLANs synchronized.", badgeCol: "#FBBF24", x: 7.2, z: -3.8, hair: "#1e1e1e", cloth: "#FBBF24" },
    { id: "growth_agent", name: "Growth Agent", role: "Global Traffic & Telemetry", dept: "Analytics", status: "Tracking global organic visitor conversion metrics.", badgeCol: "#FB923C", x: 6.5, z: 3.5, hair: "#78350f", cloth: "#FB923C" },
    { id: "barista_bot", name: "Barista Bot", role: "Executive Fuel & Pantry", dept: "Refreshment", status: "Double-shot espresso freshly extracted! ☕", badgeCol: "#E2E8F0", x: -7.5, z: 4.8, hair: "#3f3f46", cloth: "#FFFFFF" },
  ];

  // Helper to create 3D Sprite Billboard Name Tags
  const createTextSprite = (text: string, color: string, subText?: string) => {
    const canvas = document.createElement("canvas");
    canvas.width = 300;
    canvas.height = 100;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      // Rounded bubble
      ctx.fillStyle = "rgba(10, 20, 20, 0.9)";
      ctx.strokeStyle = color;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.roundRect(10, 10, 280, 80, 16);
      ctx.fill();
      ctx.stroke();

      // Text Title
      ctx.font = "bold 28px sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.fillText(text, 150, 48);

      // Sub text
      if (subText) {
        ctx.font = "bold 18px monospace";
        ctx.fillStyle = color;
        ctx.fillText(subText, 150, 74);
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    const spriteMat = new THREE.SpriteMaterial({ map: texture, depthTest: false });
    const sprite = new THREE.Sprite(spriteMat);
    sprite.scale.set(2.8, 0.95, 1);
    return sprite;
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. SCENE SETUP - Clean Bright Modern Studio
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#0c1515"); // Deep rich Cinder
    // Gentle fog that doesn't black out the room
    scene.fog = new THREE.Fog("#0c1515", 35, 75);

    const width = container.clientWidth || 980;
    const height = 540;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    // Positioned closer and higher so the whole office pops
    camera.position.set(16, 17, 20);
    camera.lookAt(0, 1, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35; // Bright, vibrant exposure
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2.15;
    controls.minDistance = 10;
    controls.maxDistance = 38;
    controls.target.set(0, 1.2, 0);

    // 2. BRIGHT COMPREHENSIVE LIGHTING
    const hemiLight = new THREE.HemisphereLight("#b9f5d8", "#111827", 2.2);
    scene.add(hemiLight);

    const mainSun = new THREE.DirectionalLight("#ffffff", 2.6);
    mainSun.position.set(16, 26, 16);
    mainSun.castShadow = true;
    mainSun.shadow.mapSize.width = 2048;
    mainSun.shadow.mapSize.height = 2048;
    mainSun.shadow.camera.near = 0.5;
    mainSun.shadow.camera.far = 65;
    const d = 18;
    mainSun.shadow.camera.left = -d;
    mainSun.shadow.camera.right = d;
    mainSun.shadow.camera.top = d;
    mainSun.shadow.camera.bottom = -d;
    scene.add(mainSun);

    // Warm Key Light (Flare Orange)
    const flareKey = new THREE.PointLight("#ff7043", 4.5, 25);
    flareKey.position.set(-6, 6, 4);
    scene.add(flareKey);

    // Cool Tech Light (Mint & Cyan)
    const mintKey = new THREE.PointLight("#b9f5d8", 4.0, 25);
    mintKey.position.set(2, 6, -4);
    scene.add(mintKey);

    // Server Bay Glow
    const serverGlow = new THREE.PointLight("#38bdf8", 5.0, 20);
    serverGlow.position.set(7.5, 5, -4);
    scene.add(serverGlow);

    // 3. ARCHITECTURAL FLOOR WITH WARM INLAYS
    const floorGeo = new THREE.BoxGeometry(26, 0.4, 20);
    const floorMat = new THREE.MeshStandardMaterial({
      color: "#142424", // Premium Cinder Floor
      roughness: 0.4,
      metalness: 0.15,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.position.y = -0.2;
    floor.receiveShadow = true;
    scene.add(floor);

    // Grid inlays
    const gridHelper = new THREE.GridHelper(26, 26, "#b9f5d8", "#1a3232");
    gridHelper.position.y = 0.01;
    (gridHelper.material as THREE.Material).opacity = 0.25;
    (gridHelper.material as THREE.Material).transparent = true;
    scene.add(gridHelper);

    // Engineering Rug (Dark Cinder)
    const engRug = new THREE.Mesh(
      new THREE.BoxGeometry(13.5, 0.04, 9.5),
      new THREE.MeshStandardMaterial({ color: "#182c2c", roughness: 0.7 })
    );
    engRug.position.set(-2, 0.02, -0.5);
    engRug.receiveShadow = true;
    scene.add(engRug);

    // Data Center Platform (Cold Metal Grate)
    const dataPlatform = new THREE.Mesh(
      new THREE.BoxGeometry(7.5, 0.08, 7.5),
      new THREE.MeshStandardMaterial({ color: "#0c1824", roughness: 0.2, metalness: 0.8 })
    );
    dataPlatform.position.set(7.5, 0.04, -4.5);
    dataPlatform.receiveShadow = true;
    scene.add(dataPlatform);

    // Executive Lounge Wood Rug
    const loungeRug = new THREE.Mesh(
      new THREE.BoxGeometry(8, 0.04, 7.5),
      new THREE.MeshStandardMaterial({ color: "#221d1b", roughness: 0.9 })
    );
    loungeRug.position.set(6.5, 0.02, 4.5);
    loungeRug.receiveShadow = true;
    scene.add(loungeRug);

    // Pantry Tile
    const pantryTile = new THREE.Mesh(
      new THREE.BoxGeometry(6.5, 0.04, 7),
      new THREE.MeshStandardMaterial({ color: "#251c17", roughness: 0.5 })
    );
    pantryTile.position.set(-8, 0.02, 5);
    pantryTile.receiveShadow = true;
    scene.add(pantryTile);

    // 4. FURNITURE BUILDER
    const deskMat = new THREE.MeshStandardMaterial({ color: "#1e3535", roughness: 0.4, metalness: 0.3 });
    const monitorMat = new THREE.MeshStandardMaterial({ color: "#050a0a", roughness: 0.2 });
    const mintScreen = new THREE.MeshBasicMaterial({ color: "#b9f5d8" });
    const flareScreen = new THREE.MeshBasicMaterial({ color: "#ff7043" });
    const chairMat = new THREE.MeshStandardMaterial({ color: "#0f172a", roughness: 0.7 });

    const createWorkstation = (x: number, z: number) => {
      const g = new THREE.Group();
      g.position.set(x, 0, z);

      // Top
      const top = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.14, 1.6), deskMat);
      top.position.y = 1.35;
      top.castShadow = true;
      top.receiveShadow = true;
      g.add(top);

      // Legs
      const legMat = new THREE.MeshStandardMaterial({ color: "#475569", metalness: 0.8 });
      [[-1.2, -0.6], [1.2, -0.6], [-1.2, 0.6], [1.2, 0.6]].forEach(([lx, lz]) => {
        const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.35), legMat);
        leg.position.set(lx, 0.675, lz);
        leg.castShadow = true;
        g.add(leg);
      });

      // Dual Monitors
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

      // Chair
      const seat = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.1, 0.75), chairMat);
      seat.position.set(0, 0.85, 0.65);
      g.add(seat);

      const back = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.85, 0.1), chairMat);
      back.position.set(0, 1.25, 0.98);
      g.add(back);

      scene.add(g);
    };

    // 6 Workstations
    createWorkstation(-5.5, -3.5);
    createWorkstation(-2.0, -3.5);
    createWorkstation(1.5, -3.5);
    createWorkstation(-5.5, 1.0);
    createWorkstation(-2.0, 1.0);
    createWorkstation(1.5, 1.0);

    // 3 Server Racks
    const rackGeo = new THREE.BoxGeometry(1.4, 4.0, 1.5);
    const rackMat = new THREE.MeshStandardMaterial({ color: "#020617", metalness: 0.8, roughness: 0.2 });
    for (let s = 0; s < 3; s++) {
      const rack = new THREE.Mesh(rackGeo, rackMat);
      rack.position.set(5.8 + s * 1.8, 2.0, -5.5);
      rack.castShadow = true;
      rack.receiveShadow = true;
      scene.add(rack);

      const ledFace = new THREE.Mesh(
        new THREE.PlaneGeometry(1.1, 3.2),
        new THREE.MeshBasicMaterial({ color: s % 2 === 0 ? "#38bdf8" : "#22c55e" })
      );
      ledFace.position.set(5.8 + s * 1.8, 2.0, -4.74);
      scene.add(ledFace);
    }

    // Glass Conference Table & Chairs
    const confTable = new THREE.Mesh(
      new THREE.BoxGeometry(5.0, 0.15, 3.0),
      new THREE.MeshPhysicalMaterial({ color: "#1e293b", roughness: 0.1, transmission: 0.5, thickness: 0.4 })
    );
    confTable.position.set(6.5, 1.3, 4.5);
    confTable.castShadow = true;
    scene.add(confTable);

    // Laptops on Conference table
    [[-1.5, 0], [0, 0], [1.5, 0]].forEach(([lx, lz]) => {
      const lap = new THREE.Mesh(
        new THREE.BoxGeometry(0.6, 0.04, 0.45),
        new THREE.MeshStandardMaterial({ color: "#cbd5e1", metalness: 0.9 })
      );
      lap.position.set(6.5 + lx, 1.4, 4.5 + lz);
      scene.add(lap);
    });

    // Espresso Bar & Machine
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

    // 5. AGENTS WITH PERSISTENT 3D BILLBOARD NAME TAGS
    interface AgentRuntime {
      data: AgentData;
      group: THREE.Group;
      targetPos: THREE.Vector3;
      homePos: THREE.Vector3;
      isMoving: boolean;
      tagSprite: THREE.Sprite;
    }

    const agentsRuntime: AgentRuntime[] = [];

    const createVoxelCharacter = (hairCol: string, clothCol: string) => {
      const g = new THREE.Group();

      // Torso
      const body = new THREE.Mesh(
        new THREE.BoxGeometry(0.7, 0.85, 0.42),
        new THREE.MeshStandardMaterial({ color: clothCol, roughness: 0.4 })
      );
      body.position.y = 1.05;
      body.castShadow = true;
      g.add(body);

      // Head
      const head = new THREE.Mesh(
        new THREE.BoxGeometry(0.55, 0.55, 0.55),
        new THREE.MeshStandardMaterial({ color: "#fecdd3", roughness: 0.6 })
      );
      head.position.y = 1.75;
      head.castShadow = true;
      g.add(head);

      // Hair
      const hair = new THREE.Mesh(
        new THREE.BoxGeometry(0.6, 0.22, 0.6),
        new THREE.MeshStandardMaterial({ color: hairCol, roughness: 0.8 })
      );
      hair.position.y = 2.05;
      g.add(hair);

      // Legs
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

      // Ground Aura
      const aura = new THREE.Mesh(
        new THREE.RingGeometry(0.5, 0.65, 32),
        new THREE.MeshBasicMaterial({ color: clothCol, side: THREE.DoubleSide })
      );
      aura.rotation.x = Math.PI / 2;
      aura.position.y = 0.05;
      g.add(aura);

      return g;
    };

    agentDefs.forEach((d) => {
      const charGroup = createVoxelCharacter(d.hair, d.cloth);
      charGroup.position.set(d.x, 0, d.z);
      scene.add(charGroup);

      // Create Overhead 3D Name Tag Sprite
      const sprite = createTextSprite(d.name, d.badgeCol, d.dept);
      sprite.position.set(0, 2.9, 0);
      charGroup.add(sprite);

      agentsRuntime.push({
        data: d,
        group: charGroup,
        targetPos: new THREE.Vector3(d.x, 0, d.z),
        homePos: new THREE.Vector3(d.x, 0, d.z),
        isMoving: false,
        tagSprite: sprite,
      });
    });

    // Default focus
    setSelectedAgent(agentDefs[0]);

    // AUTONOMOUS ROUTINE: Agents walk safely within office bounds (NO DISAPPEARING BUGS)
    const routineTimer = setInterval(() => {
      agentsRuntime.forEach((a) => {
        if (Math.random() < 0.32 && !a.isMoving) {
          const choice = Math.random();
          if (choice < 0.25) {
            // Visit Espresso Bar (Safe bounded zone)
            a.targetPos.set(-7.5 + (Math.random() - 0.5) * 2, 0, 4.5 + (Math.random() - 0.5) * 1.5);
            a.data.status = "Grabbing fresh double-shot espresso! ☕";
            setMetrics((m) => ({ ...m, coffeeCount: m.coffeeCount + 1 }));
          } else if (choice < 0.55) {
            // Visit Conference Table
            a.targetPos.set(6.5 + (Math.random() - 0.5) * 2.5, 0, 4.5 + (Math.random() - 0.5) * 1.5);
            a.data.status = "Syncing in sprint collaboration meeting 💡";
          } else if (choice < 0.75) {
            // Visit Server Room
            a.targetPos.set(7.5 + (Math.random() - 0.5) * 2, 0, -3.5 + (Math.random() - 0.5) * 1.5);
            a.data.status = "Inspecting edge telemetry & DNS routing ⚡";
            setMetrics((m) => ({ ...m, deploysCount: m.deploysCount + 1 }));
          } else {
            // Return to Assigned Desk
            a.targetPos.copy(a.homePos);
            a.data.status = `Executing ${a.data.dept} automated workload.`;
          }
          a.isMoving = true;
        }
      });
    }, 4000);

    // CLICK TO MOVE OR INSPECT
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerDown = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      // Check agent click
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

      // Check Floor hit -> Direct Bryan
      const floorHits = raycaster.intersectObject(floor);
      if (floorHits.length > 0) {
        const pt = floorHits[0].point;
        const bryan = agentsRuntime.find((a) => a.data.id === "bryan");
        if (bryan) {
          // Keep strictly inside bounds
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

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 980;
      camera.aspect = w / height;
      camera.updateProjectionMatrix();
      renderer.setSize(w, height);
    };

    window.addEventListener("resize", handleResize);

    // 6. RENDER 60FPS ANIMATION LOOP
    let frameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Update Walking Mechanics with Bound Clamping
      agentsRuntime.forEach((a) => {
        if (a.isMoving) {
          const dir = new THREE.Vector3().subVectors(a.targetPos, a.group.position);
          const dist = dir.length();

          if (dist > 0.12) {
            dir.normalize();
            a.group.position.addScaledVector(dir, delta * 3.8);

            // Rotate towards target
            const angle = Math.atan2(dir.x, dir.z);
            a.group.rotation.y = angle;

            // Leg stride
            const legL = a.group.getObjectByName("legL");
            const legR = a.group.getObjectByName("legR");
            if (legL && legR) {
              legL.rotation.x = Math.sin(time * 14) * 0.65;
              legR.rotation.x = -Math.sin(time * 14) * 0.65;
            }
          } else {
            a.group.position.copy(a.targetPos);
            a.isMoving = false;

            const legL = a.group.getObjectByName("legL");
            const legR = a.group.getObjectByName("legR");
            if (legL && legR) {
              legL.rotation.x = 0;
              legR.rotation.x = 0;
            }
          }
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
              Real-time 3D metaverse powered by Three.js: 9 autonomous voxel agents with visible nametags, live task telemetry, and real-time pathfinding.
              <span className="text-flare font-bold block mt-1">
                🕹️ Click & drag to rotate view • Click any floor tile to walk Bryan around!
              </span>
            </p>
          </div>

          {/* Realtime Telemetry */}
          <div className="flex items-center gap-4 bg-[#121f1f] p-3 rounded-2xl border border-mint/20 text-xs font-mono">
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
              <Users size={15} className="text-flare" />
              <span>9 Live Agents</span>
            </div>
          </div>
        </div>

        {/* 3D STAGE CONTAINER */}
        <div className="w-full bg-[#101b1b] rounded-3xl border-2 border-mint/30 shadow-[0_25px_70px_rgba(0,0,0,0.85)] overflow-hidden relative">
          
          {/* Top Control Bar */}
          <div className="bg-[#142323] px-6 py-3.5 flex items-center justify-between border-b border-mint/20">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              <span className="ml-3 font-mono text-xs text-foreground/70 tracking-wider hidden sm:inline">
                three_pbr_studio // high_exposure_vibrant
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono text-mint">
              <span className="flex items-center gap-1.5">
                <Eye size={13} /> Left-Click to Orbit • Right-Click to Pan • Scroll to Zoom
              </span>
            </div>
          </div>

          {/* 3D WebGL Canvas */}
          <div 
            ref={mountRef} 
            className="w-full h-[540px] bg-[#0c1515] relative cursor-grab active:cursor-grabbing overflow-hidden"
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
                <span className="text-mint ml-2 px-2 py-0.5 rounded-md bg-mint/10 border border-mint/30">
                  {selectedAgent?.role}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-foreground/80 bg-[#090f0f] px-4 py-2 rounded-xl border border-white/10 max-w-xl">
              <span className="text-flare font-bold">STATUS:</span>
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
