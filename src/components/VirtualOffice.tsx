"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Coffee, Server, Bot, Users, RotateCcw, Eye, Sparkles } from "lucide-react";

interface Agent3D {
  id: string;
  name: string;
  role: string;
  department: string;
  group: THREE.Group;
  targetPos: THREE.Vector3;
  homePos: THREE.Vector3;
  isMoving: boolean;
  bubbleText: string;
  bubbleTimer: number;
  color: number;
}

export default function VirtualOffice() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<{ name: string; role: string; bubble: string } | null>(null);
  const [cameraMode, setCameraMode] = useState<"isometric" | "orbit">("isometric");
  const [stats, setStats] = useState({ coffees: 142, deploys: 58, uptime: "99.98%" });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- 1. THREE.JS SCENE SETUP ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#090f0f");
    scene.fog = new THREE.FogExp2("#090f0f", 0.025);

    const width = container.clientWidth || 980;
    const height = 520;

    // Camera (Isometric angle)
    const aspect = width / height;
    const camera = new THREE.PerspectiveCamera(40, aspect, 0.1, 1000);
    camera.position.set(22, 20, 26);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2.1; // Don't allow camera under floor
    controls.minDistance = 12;
    controls.maxDistance = 45;
    controls.target.set(0, 1, 0);

    // --- 2. LIGHTING (Cyber Cinder Mint Ambient & Spotlights) ---
    const ambientLight = new THREE.AmbientLight("#182a2a", 1.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight("#b9f5d8", 2.2);
    dirLight.position.set(15, 25, 15);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 60;
    const d = 16;
    dirLight.shadow.camera.left = -d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = -d;
    scene.add(dirLight);

    // Warm Orange Accent Light (Flare)
    const flareLight = new THREE.PointLight("#ff7043", 3, 20);
    flareLight.position.set(-6, 4, 6);
    scene.add(flareLight);

    // Cyan Server Room Glow
    const serverLight = new THREE.PointLight("#38bdf8", 3.5, 18);
    serverLight.position.set(8, 4, -6);
    scene.add(serverLight);

    // --- 3. ARCHITECTURAL OFFICE FLOOR & ZONES ---
    // Main Floor
    const floorGeo = new THREE.BoxGeometry(28, 0.4, 22);
    const floorMat = new THREE.MeshStandardMaterial({
      color: "#0c1515",
      roughness: 0.6,
      metalness: 0.2,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.position.y = -0.2;
    floor.receiveShadow = true;
    scene.add(floor);

    // Cyber Grid lines on floor
    const grid = new THREE.GridHelper(28, 28, "#b9f5d8", "#182a2a");
    grid.position.y = 0.01;
    (grid.material as THREE.Material).opacity = 0.15;
    (grid.material as THREE.Material).transparent = true;
    scene.add(grid);

    // Room Inset Rugs
    const devRugGeo = new THREE.BoxGeometry(14, 0.05, 10);
    const devRugMat = new THREE.MeshStandardMaterial({ color: "#111f1f", roughness: 0.8 });
    const devRug = new THREE.Mesh(devRugGeo, devRugMat);
    devRug.position.set(-4, 0.02, -2);
    devRug.receiveShadow = true;
    scene.add(devRug);

    // Data Center Metal Tile
    const serverTileGeo = new THREE.BoxGeometry(8, 0.05, 8);
    const serverTileMat = new THREE.MeshStandardMaterial({ color: "#081018", roughness: 0.3, metalness: 0.7 });
    const serverTile = new THREE.Mesh(serverTileGeo, serverTileMat);
    serverTile.position.set(8, 0.02, -5);
    serverTile.receiveShadow = true;
    scene.add(serverTile);

    // Lounge Wooden Rug
    const loungeRugGeo = new THREE.BoxGeometry(9, 0.05, 8);
    const loungeRugMat = new THREE.MeshStandardMaterial({ color: "#181414", roughness: 0.9 });
    const loungeRug = new THREE.Mesh(loungeRugGeo, loungeRugMat);
    loungeRug.position.set(7, 0.02, 5);
    loungeRug.receiveShadow = true;
    scene.add(loungeRug);

    // --- 4. 3D FURNITURE GENERATOR ---
    const deskMat = new THREE.MeshStandardMaterial({ color: "#182a2a", roughness: 0.5, metalness: 0.4 });
    const monitorMat = new THREE.MeshStandardMaterial({ color: "#020617", roughness: 0.2 });
    const screenGlowMat = new THREE.MeshBasicMaterial({ color: "#b9f5d8" });
    const flareScreenMat = new THREE.MeshBasicMaterial({ color: "#ff7043" });

    const createWorkstation = (x: number, z: number, label: string) => {
      const deskGroup = new THREE.Group();
      deskGroup.position.set(x, 0, z);

      // Desk Top
      const topGeo = new THREE.BoxGeometry(3.2, 0.15, 1.8);
      const top = new THREE.Mesh(topGeo, deskMat);
      top.position.y = 1.4;
      top.castShadow = true;
      top.receiveShadow = true;
      deskGroup.add(top);

      // Legs
      const legGeo = new THREE.CylinderGeometry(0.06, 0.06, 1.4);
      const legMat = new THREE.MeshStandardMaterial({ color: "#334155", metalness: 0.8 });
      [[-1.4, -0.7], [1.4, -0.7], [-1.4, 0.7], [1.4, 0.7]].forEach(([lx, lz]) => {
        const leg = new THREE.Mesh(legGeo, legMat);
        leg.position.set(lx, 0.7, lz);
        leg.castShadow = true;
        deskGroup.add(leg);
      });

      // Dual Monitors
      const standGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.6);
      const m1Stand = new THREE.Mesh(standGeo, legMat);
      m1Stand.position.set(-0.6, 1.7, -0.2);
      deskGroup.add(m1Stand);

      const m2Stand = new THREE.Mesh(standGeo, legMat);
      m2Stand.position.set(0.6, 1.7, -0.2);
      deskGroup.add(m2Stand);

      const screenGeo = new THREE.BoxGeometry(1.1, 0.65, 0.06);
      const m1 = new THREE.Mesh(screenGeo, monitorMat);
      m1.position.set(-0.6, 2.0, -0.2);
      m1.rotation.y = 0.15;
      m1.castShadow = true;
      deskGroup.add(m1);

      // Glowing screen face
      const faceGeo = new THREE.PlaneGeometry(1.0, 0.55);
      const m1Face = new THREE.Mesh(faceGeo, screenGlowMat);
      m1Face.position.set(-0.6, 2.0, -0.16);
      m1Face.rotation.y = 0.15;
      deskGroup.add(m1Face);

      const m2 = new THREE.Mesh(screenGeo, monitorMat);
      m2.position.set(0.6, 2.0, -0.2);
      m2.rotation.y = -0.15;
      m2.castShadow = true;
      deskGroup.add(m2);

      const m2Face = new THREE.Mesh(faceGeo, flareScreenMat);
      m2Face.position.set(0.6, 2.0, -0.16);
      m2Face.rotation.y = -0.15;
      deskGroup.add(m2Face);

      // Ergonomic Office Chair
      const seatGeo = new THREE.BoxGeometry(0.8, 0.1, 0.8);
      const chairMat = new THREE.MeshStandardMaterial({ color: "#0f172a", roughness: 0.7 });
      const seat = new THREE.Mesh(seatGeo, chairMat);
      seat.position.set(0, 0.85, 0.7);
      deskGroup.add(seat);

      const backGeo = new THREE.BoxGeometry(0.8, 0.9, 0.1);
      const back = new THREE.Mesh(backGeo, chairMat);
      back.position.set(0, 1.3, 1.05);
      deskGroup.add(back);

      scene.add(deskGroup);
    };

    // 6 Workstations
    createWorkstation(-7, -4, "Bryan's Station");
    createWorkstation(-3, -4, "Jarwo AI Pod");
    createWorkstation(1, -4, "Maya Design Station");
    createWorkstation(-7, 1, "Backend Core");
    createWorkstation(-3, 1, "Sentinel QA");
    createWorkstation(1, 1, "Ops Pipeline");

    // 3 Server Racks in Data Center
    const serverGeo = new THREE.BoxGeometry(1.4, 4.2, 1.6);
    const serverMat = new THREE.MeshStandardMaterial({ color: "#020617", metalness: 0.8, roughness: 0.2 });
    for (let s = 0; s < 3; s++) {
      const rack = new THREE.Mesh(serverGeo, serverMat);
      rack.position.set(6.2 + s * 2.0, 2.1, -6.5);
      rack.castShadow = true;
      rack.receiveShadow = true;
      scene.add(rack);

      // LED Blinking light strips on rack
      const ledGeo = new THREE.PlaneGeometry(1.1, 3.4);
      const ledMat = new THREE.MeshBasicMaterial({ color: s % 2 === 0 ? "#38bdf8" : "#22c55e" });
      const led = new THREE.Mesh(ledGeo, ledMat);
      led.position.set(6.2 + s * 2.0, 2.1, -5.69);
      scene.add(led);
    }

    // Glass Conference Table & Chairs
    const confTableGeo = new THREE.BoxGeometry(5.5, 0.15, 3.2);
    const glassMat = new THREE.MeshPhysicalMaterial({ color: "#1e293b", roughness: 0.1, transmission: 0.6, thickness: 0.5 });
    const confTable = new THREE.Mesh(confTableGeo, glassMat);
    confTable.position.set(7, 1.3, 5);
    confTable.castShadow = true;
    scene.add(confTable);

    // Pantry Espresso Bar
    const barGeo = new THREE.BoxGeometry(3.5, 1.6, 2.0);
    const barMat = new THREE.MeshStandardMaterial({ color: "#3e2723", roughness: 0.6 });
    const bar = new THREE.Mesh(barGeo, barMat);
    bar.position.set(-8, 0.8, 6.5);
    bar.castShadow = true;
    scene.add(bar);

    // Espresso Machine
    const coffeeMachineGeo = new THREE.BoxGeometry(1.2, 1.0, 1.0);
    const machineMat = new THREE.MeshStandardMaterial({ color: "#94a3b8", metalness: 0.9, roughness: 0.2 });
    const coffeeMachine = new THREE.Mesh(coffeeMachineGeo, machineMat);
    coffeeMachine.position.set(-8, 2.1, 6.5);
    coffeeMachine.castShadow = true;
    scene.add(coffeeMachine);

    // Decorative Plants
    const potGeo = new THREE.CylinderGeometry(0.4, 0.3, 0.8);
    const potMat = new THREE.MeshStandardMaterial({ color: "#78350f" });
    const leavesGeo = new THREE.DodecahedronGeometry(0.7);
    const leavesMat = new THREE.MeshStandardMaterial({ color: "#16a34a", roughness: 0.9 });

    [[-11, -8], [-11, 8], [11, -8], [11, 8]].forEach(([px, pz]) => {
      const pot = new THREE.Mesh(potGeo, potMat);
      pot.position.set(px, 0.4, pz);
      scene.add(pot);
      const leaves = new THREE.Mesh(leavesGeo, leavesMat);
      leaves.position.set(px, 1.1, pz);
      scene.add(leaves);
    });

    // --- 5. 3D VOXEL / LOW-POLY EMPLOYEES ---
    const agents3D: Agent3D[] = [];

    const createCharacterMesh = (hairCol: string, clothCol: string) => {
      const group = new THREE.Group();

      // Body (Torso)
      const bodyGeo = new THREE.BoxGeometry(0.7, 0.9, 0.45);
      const bodyMat = new THREE.MeshStandardMaterial({ color: clothCol, roughness: 0.5 });
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      body.position.y = 1.05;
      body.castShadow = true;
      group.add(body);

      // Head
      const headGeo = new THREE.BoxGeometry(0.55, 0.55, 0.55);
      const headMat = new THREE.MeshStandardMaterial({ color: "#fed7aa", roughness: 0.6 });
      const head = new THREE.Mesh(headGeo, headMat);
      head.position.y = 1.8;
      head.castShadow = true;
      group.add(head);

      // Hair
      const hairGeo = new THREE.BoxGeometry(0.6, 0.25, 0.6);
      const hairMat = new THREE.MeshStandardMaterial({ color: hairCol, roughness: 0.8 });
      const hair = new THREE.Mesh(hairGeo, hairMat);
      hair.position.y = 2.1;
      group.add(hair);

      // Limbs (Legs)
      const legGeo = new THREE.BoxGeometry(0.24, 0.7, 0.24);
      const legMat = new THREE.MeshStandardMaterial({ color: "#0f172a" });

      const legL = new THREE.Mesh(legGeo, legMat);
      legL.position.set(-0.2, 0.35, 0);
      legL.castShadow = true;
      legL.name = "legL";
      group.add(legL);

      const legR = new THREE.Mesh(legGeo, legMat);
      legR.position.set(0.2, 0.35, 0);
      legR.castShadow = true;
      legR.name = "legR";
      group.add(legR);

      // Floating Aura Indicator (Cinder Mint / Flare Ring)
      const ringGeo = new THREE.RingGeometry(0.5, 0.6, 24);
      const ringMat = new THREE.MeshBasicMaterial({ color: clothCol, side: THREE.DoubleSide });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = 0.05;
      group.add(ring);

      return group;
    };

    const rawAgentDefs = [
      { id: "bryan", name: "Bryan Yogie", role: "Lead Fullstack & Network", dept: "Dev", x: -7, z: -3.2, hair: "#000000", cloth: "#FF7043", bubble: "Crafting real-time 3D Three.js Virtual Office engine!" },
      { id: "jarwo", name: "Jarwo AI", role: "AI Chief Dispatcher", dept: "AI", x: -3, z: -3.2, hair: "#334155", cloth: "#B9F5D8", bubble: "Balancing compute tasks between serverless edge nodes." },
      { id: "maya", name: "Maya UI", role: "Design Systems & 3D", dept: "Design", x: 1, z: -3.2, hair: "#64748b", cloth: "#F472B6", bubble: "Tuning ambient occlusion & PBR material shaders." },
      { id: "backend", name: "Backend Bot", role: "Distributed DB & API", dept: "Dev", x: -7, z: 1.8, hair: "#1e293b", cloth: "#38BDF8", bubble: "PostgreSQL query execution under 2 milliseconds." },
      { id: "qa", name: "Sentinel QA", role: "E2E Mobile Tester", dept: "QA", x: -3, z: 1.8, hair: "#475569", cloth: "#A78BFA", bubble: "Validating 60FPS mobile WebGL render stability." },
      { id: "ops", name: "Pipeline Ops", role: "CI/CD & Serverless Deploy", dept: "Ops", x: 1, z: 1.8, hair: "#0f172a", cloth: "#34D399", bubble: "Vercel edge build successfully deployed worldwide." },
      { id: "cisco", name: "Cisco Agent", role: "Network Security & Router", dept: "Network", x: 8, z: -4.5, hair: "#1e1e1e", cloth: "#FBBF24", bubble: "Optical fiber trunking & packet firewall clean." },
      { id: "growth", name: "Growth Agent", role: "Global Traffic & SEO", dept: "Growth", x: 7, z: 3.5, hair: "#78350f", cloth: "#FB923C", bubble: "Worldwide visitors spiking across tech portfolio." },
      { id: "barista", name: "Barista Bot", role: "Espresso & Fuel", dept: "Pantry", x: -8, z: 5.2, hair: "#3f3f46", cloth: "#E2E8F0", bubble: "Pouring double-ristretto for the engineering team! ☕" },
    ];

    rawAgentDefs.forEach((d) => {
      const charGroup = createCharacterMesh(d.hair, d.cloth);
      charGroup.position.set(d.x, 0, d.z);
      scene.add(charGroup);

      agents3D.push({
        id: d.id,
        name: d.name,
        role: d.role,
        department: d.dept,
        group: charGroup,
        targetPos: new THREE.Vector3(d.x, 0, d.z),
        homePos: new THREE.Vector3(d.x, 0, d.z),
        isMoving: false,
        bubbleText: d.bubble,
        bubbleTimer: 200,
        color: parseInt(d.cloth.replace("#", "0x")),
      });
    });

    // Default focus to Bryan
    setSelectedAgent({ name: agents3D[0].name, role: agents3D[0].role, bubble: agents3D[0].bubbleText });

    // Autonomous 3D Walking Routine
    const routineTimer = setInterval(() => {
      agents3D.forEach((a) => {
        if (Math.random() < 0.35 && !a.isMoving) {
          const choice = Math.random();
          if (choice < 0.3) {
            // Walk to Cafe Pantry
            a.targetPos.set(-7 + (Math.random() - 0.5) * 3, 0, 5 + (Math.random() - 0.5) * 2);
            a.bubbleText = "Stopping by the espresso bar for coffee ☕";
            setStats(s => ({ ...s, coffees: s.coffees + 1 }));
          } else if (choice < 0.6) {
            // Walk to Conference Lounge
            a.targetPos.set(7 + (Math.random() - 0.5) * 3, 0, 4 + (Math.random() - 0.5) * 2);
            a.bubbleText = "Brainstorming AI system architecture at conference table 💡";
          } else if (choice < 0.8) {
            // Walk to Server Farm
            a.targetPos.set(8 + (Math.random() - 0.5) * 2, 0, -4 + (Math.random() - 0.5) * 2);
            a.bubbleText = "Inspecting Tier-3 edge server rack telemetry ⚡";
            setStats(s => ({ ...s, deploys: s.deploys + 1 }));
          } else {
            // Return to Home Station
            a.targetPos.copy(a.homePos);
            a.bubbleText = `Back at workstation writing clean ${a.department} code.`;
          }
          a.isMoving = true;
          a.bubbleTimer = 220;
        }
      });
    }, 4200);

    // Interactive Raycaster (Click to move Bryan or select Agent)
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerDown = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      // Check agent hit
      let hitAgent: Agent3D | null = null;
      for (const a of agents3D) {
        const intersects = raycaster.intersectObjects(a.group.children, true);
        if (intersects.length > 0) {
          hitAgent = a;
          break;
        }
      }

      if (hitAgent) {
        setSelectedAgent({ name: (hitAgent as Agent3D).name, role: (hitAgent as Agent3D).role, bubble: (hitAgent as Agent3D).bubbleText });
        (hitAgent as Agent3D).bubbleTimer = 300;
        return;
      }

      // Check Floor hit -> Walk Bryan to point!
      const floorIntersects = raycaster.intersectObject(floor);
      if (floorIntersects.length > 0) {
        const pt = floorIntersects[0].point;
        const bryan = agents3D.find(a => a.id === "bryan");
        if (bryan) {
          bryan.targetPos.set(Math.max(-12, Math.min(12, pt.x)), 0, Math.max(-9, Math.min(9, pt.z)));
          bryan.isMoving = true;
          bryan.bubbleText = "Walking to selected office coordinates! 🚶‍♂️";
          bryan.bubbleTimer = 200;
          setSelectedAgent({ name: bryan.name, role: bryan.role, bubble: bryan.bubbleText });
        }
      }
    };

    renderer.domElement.addEventListener("pointerdown", handlePointerDown);

    // Responsive Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 980;
      camera.aspect = w / height;
      camera.updateProjectionMatrix();
      renderer.setSize(w, height);
    };

    window.addEventListener("resize", handleResize);

    // --- 6. RENDER LOOP WITH WALKING SINE ANIMATION ---
    let frameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Update 3D Character Walking Mechanics
      agents3D.forEach((a) => {
        if (a.isMoving) {
          const dir = new THREE.Vector3().subVectors(a.targetPos, a.group.position);
          const dist = dir.length();

          if (dist > 0.15) {
            dir.normalize();
            a.group.position.addScaledVector(dir, delta * 3.6);

            // Rotate character to face target
            const angle = Math.atan2(dir.x, dir.z);
            a.group.rotation.y = angle;

            // Leg stride animation
            const legL = a.group.getObjectByName("legL");
            const legR = a.group.getObjectByName("legR");
            if (legL && legR) {
              legL.rotation.x = Math.sin(time * 12) * 0.6;
              legR.rotation.x = -Math.sin(time * 12) * 0.6;
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

      // Subtle light pulsation
      flareLight.intensity = 2.5 + Math.sin(time * 3) * 0.8;
      serverLight.intensity = 3.0 + Math.cos(time * 4) * 0.7;

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
      {/* Background Cyber Grid */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#b9f5d8 1px, transparent 1px)",
          backgroundSize: "28px 28px",
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
              <span className="font-mono text-xs uppercase tracking-widest text-mint font-semibold flex items-center gap-1.5">
                <Sparkles size={13} className="text-flare" /> Real-time 3D WebGL Metaverse
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-outfit font-black uppercase text-foreground tracking-tighter">
              BYS <span className="text-mint">3D Virtual Office</span>
            </h2>
            <p className="text-foreground/70 font-mono text-xs md:text-sm max-w-2xl mt-2 leading-relaxed">
              Step inside my interactive 3D digital headquarters powered by Three.js: 9 autonomous voxel agents walking across engineering pods, conference rooms, and edge data centers.
              <span className="text-flare font-bold block mt-1">
                🕹️ Drag to orbit camera in 3D space • Click anywhere on the floor to direct Bryan!
              </span>
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-4 bg-[#121f1f] p-3 rounded-2xl border border-mint/20 text-xs font-mono">
            <div className="flex items-center gap-1.5 text-mint">
              <Coffee size={15} className="text-flare" />
              <span>{stats.coffees} Coffees</span>
            </div>
            <div className="w-[1px] h-4 bg-white/20" />
            <div className="flex items-center gap-1.5 text-mint">
              <Server size={15} className="text-mint" />
              <span>{stats.deploys} Deploys</span>
            </div>
            <div className="w-[1px] h-4 bg-white/20" />
            <div className="flex items-center gap-1.5 text-white">
              <Users size={15} className="text-flare" />
              <span>9 Voxel Employees</span>
            </div>
          </div>
        </div>

        {/* 3D WEBGL STAGE */}
        <div className="w-full bg-[#101b1b] rounded-3xl border-2 border-mint/30 shadow-[0_25px_70px_rgba(0,0,0,0.85)] overflow-hidden relative">
          
          {/* Top Control Bar */}
          <div className="bg-[#142323] px-6 py-3.5 flex items-center justify-between border-b border-mint/20">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              <span className="ml-3 font-mono text-xs text-foreground/60 tracking-wider hidden sm:inline">
                three_js_pbr_engine // 60fps_webgl
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono text-foreground/70">
              <span className="flex items-center gap-1.5 text-mint">
                <Eye size={13} /> Left Click + Drag to Orbit • Right Click to Pan
              </span>
            </div>
          </div>

          {/* 3D Canvas Mount Point */}
          <div 
            ref={mountRef} 
            className="w-full h-[520px] bg-[#090f0f] relative cursor-grab active:cursor-grabbing overflow-hidden"
          />

          {/* Agent Focus HUD */}
          <div className="bg-[#121f1f] p-4 md:px-8 border-t border-mint/20 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-flare animate-ping" />
              <div className="text-foreground/90">
                <span>Active 3D Agent: </span>
                <strong className="text-mint">{selectedAgent ? selectedAgent.name : "Bryan Yogie"}</strong>
                <span className="text-foreground/50"> ({selectedAgent ? selectedAgent.role : "Lead Engineer"})</span>
              </div>
            </div>

            {selectedAgent && (
              <div className="text-xs text-mint bg-[#0a1414] px-3.5 py-1.5 rounded-full border border-mint/30 max-w-md truncate">
                💬 &quot;{selectedAgent.bubble}&quot;
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
