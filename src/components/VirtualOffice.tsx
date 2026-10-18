"use client";

import React, { useState, useEffect } from "react";
import { Terminal, Bot, Cpu, Sparkles, Activity, ShieldCheck, Zap } from "lucide-react";

interface AgentStatus {
  id: string;
  name: string;
  role: string;
  status: string;
  badgeColor: string;
  avatarChar: string;
}

const agents: AgentStatus[] = [
  {
    id: "bryan",
    name: "Bryan (Dev)",
    role: "Lead Fullstack & Network",
    status: "Designing Next.js Scalable Architecture...",
    badgeColor: "bg-mint text-cinder border-mint",
    avatarChar: "👨‍💻",
  },
  {
    id: "ai-copilot",
    name: "Copilot Agent",
    role: "Automated Code Reviewer",
    status: "Auditing responsive CSS & clean code patterns...",
    badgeColor: "bg-flare text-white border-flare",
    avatarChar: "🤖",
  },
  {
    id: "ai-deployer",
    name: "Vercel Ops Bot",
    role: "CI/CD & Serverless Pipeline",
    status: "All health checks passed. Zero downtime.",
    badgeColor: "bg-emerald-400 text-black border-emerald-400",
    avatarChar: "⚡",
  },
  {
    id: "ai-qa",
    name: "Sentinel QA",
    role: "E2E Mobile Emulator",
    status: "Simulating 375px mobile viewport interactions...",
    badgeColor: "bg-purple-400 text-black border-purple-400",
    avatarChar: "🛰️",
  },
];

const mockLogs = [
  "[SYSTEM] Virtual Office Environment initialized: Cinder Mint Workspace",
  "[NETWORK] TCP handshake verified (1Gbps optical duplex)",
  "[DEV-AGENT] Bryan committed: Rebranding & Squircle App Badge",
  "[QA-AGENT] Pixel Swap interaction validated on coarse pointer",
  "[OPS-AGENT] Turbopack compiled 6 static routes in 3.1s",
  "[AI-COPILOT] Optimization score: 100/100. Scalable & Clean.",
];

export default function VirtualOffice() {
  const [selectedAgent, setSelectedAgent] = useState<AgentStatus>(agents[0]);
  const [activeTab, setActiveTab] = useState<"workspace" | "terminal">("workspace");
  const [terminalLogs, setTerminalLogs] = useState<string[]>(mockLogs);
  const [typedInput, setTypedInput] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const dynamicStatuses = [
        "Analyzing latency between client and server edge...",
        "Refactoring GSAP ticker handlers for zero jank...",
        "Monitoring memory footprint: 18.4MB (Optimal)...",
        "Synching live state across distributed nodes...",
      ];
      const randomStatus = dynamicStatuses[Math.floor(Math.random() * dynamicStatuses.length)];
      
      setTerminalLogs((prev) => [
        ...prev.slice(-8),
        `[LOG ${new Date().toLocaleTimeString()}] ${randomStatus}`,
      ]);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const handleSendPrompt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedInput.trim()) return;
    setTerminalLogs((prev) => [
      ...prev,
      `> user@workspace:~$ ${typedInput}`,
      `[AI-AGENT] Acknowledged: Processing "${typedInput}" for Bryan's portfolio...`,
    ]);
    setTypedInput("");
  };

  return (
    <section className="relative w-full py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-[#090f0f] border-t border-mint/20 overflow-hidden" id="virtual-office">
      {/* Background Cyber Grid */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(to right, #b9f5d8 1px, transparent 1px), linear-gradient(to bottom, #b9f5d8 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-mint/20 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mint opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-mint"></span>
              </span>
              <span className="font-mono text-xs uppercase tracking-widest text-mint font-semibold">
                Live Simulation Engine
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-outfit font-black uppercase text-foreground tracking-tighter">
              AI Agent <span className="text-mint">Virtual Office</span>
            </h2>
            <p className="text-foreground/70 font-mono text-sm max-w-xl mt-2">
              Inside my 24/7 digital workspace where human craft meets autonomous AI agents collaborating on code, testing, and deployment.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#121f1f] p-1.5 rounded-xl border border-mint/20">
            <button
              onClick={() => setActiveTab("workspace")}
              className={`px-4 py-2 rounded-lg font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                activeTab === "workspace" ? "bg-mint text-cinder font-bold shadow-lg shadow-mint/20" : "text-foreground/70 hover:text-white"
              }`}
            >
              Pixel Office
            </button>
            <button
              onClick={() => setActiveTab("terminal")}
              className={`px-4 py-2 rounded-lg font-mono text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
                activeTab === "terminal" ? "bg-flare text-white font-bold shadow-lg shadow-flare/20" : "text-foreground/70 hover:text-white"
              }`}
            >
              <Terminal size={14} /> Agent Logs
            </button>
          </div>
        </div>

        {/* Main Office Window Box */}
        <div className="w-full bg-[#101b1b] rounded-3xl border-2 border-mint/30 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden">
          {/* Mac/Linux Title Bar */}
          <div className="bg-[#142323] px-6 py-4 flex items-center justify-between border-b border-mint/20">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              <span className="ml-4 font-mono text-xs text-foreground/50 tracking-wider">
                office_v2.0_cinder_mint.env // active
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono text-mint">
              <span className="flex items-center gap-1.5">
                <Cpu size={14} className="animate-spin text-flare" style={{ animationDuration: "8s" }} /> 4 Active Cores
              </span>
            </div>
          </div>

          {activeTab === "workspace" ? (
            /* TAB 1: RETRO PIXEL ART VIRTUAL OFFICE */
            <div className="p-6 md:p-10 flex flex-col lg:flex-row gap-8 items-center justify-between">
              
              {/* Retro RPG Isometric/Flat Office Room Representation */}
              <div className="w-full lg:w-3/5 bg-[#090f0f] rounded-2xl p-6 md:p-8 border border-mint/20 relative min-h-[380px] flex flex-col justify-between overflow-hidden shadow-inner">
                {/* Office Wall Decor */}
                <div className="flex justify-between items-start z-10">
                  <div className="bg-[#121f1f] px-3 py-1.5 rounded-md border border-mint/30 font-mono text-[11px] text-mint flex items-center gap-2">
                    <Sparkles size={13} className="text-flare" />
                    <span>BYS LAB // 24°C</span>
                  </div>
                  
                  {/* Miniature Server Rack Indicator */}
                  <div className="flex gap-1.5 items-center bg-[#121f1f] px-3 py-1.5 rounded-md border border-white/10">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-mono text-[10px] text-foreground/60 uppercase">Server Online</span>
                  </div>
                </div>

                {/* Pixel Art Interactive Character Desks */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-8 z-10">
                  {agents.map((agent) => {
                    const isSelected = selectedAgent.id === agent.id;
                    return (
                      <button
                        key={agent.id}
                        onClick={() => setSelectedAgent(agent)}
                        className={`group p-4 rounded-xl flex flex-col items-center text-center transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                          isSelected
                            ? "bg-[#162727] border-2 border-mint shadow-[0_0_20px_rgba(185,245,216,0.3)]"
                            : "bg-[#101b1b]/80 border border-white/10 hover:border-mint/50"
                        }`}
                      >
                        {/* Avatar */}
                        <div className="w-14 h-14 rounded-2xl bg-[#090f0f] border border-white/10 flex items-center justify-center text-3xl mb-3 shadow-md group-hover:rotate-6 transition-transform">
                          {agent.avatarChar}
                        </div>
                        <span className="font-outfit font-bold text-xs text-foreground truncate max-w-full">
                          {agent.name}
                        </span>
                        <span className="text-[10px] font-mono text-mint/80 truncate max-w-full">
                          {agent.role.split(" ")[0]}
                        </span>
                        <span className="mt-2 w-2 h-2 rounded-full bg-mint animate-pulse" />
                      </button>
                    );
                  })}
                </div>

                {/* Active Agent Speech Bubble */}
                <div className="bg-[#142323] p-4 rounded-xl border border-mint/30 flex items-start gap-3 z-10 shadow-lg">
                  <div className="text-2xl mt-0.5">{selectedAgent.avatarChar}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-outfit font-bold text-sm text-white">
                        {selectedAgent.name}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-mint/10 text-mint border border-mint/30">
                        {selectedAgent.role}
                      </span>
                    </div>
                    <p className="font-mono text-xs text-foreground/80 leading-relaxed">
                      💬 &quot;{selectedAgent.status}&quot;
                    </p>
                  </div>
                </div>

                {/* Room Floor Perspective Lines */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-mint/5 to-transparent pointer-events-none" />
              </div>

              {/* Office Stats & Automation Panel */}
              <div className="w-full lg:w-2/5 flex flex-col gap-4">
                <div className="bg-[#090f0f] p-6 rounded-2xl border border-mint/20">
                  <h4 className="font-outfit font-bold text-lg text-white mb-4 flex items-center gap-2">
                    <Activity size={18} className="text-flare" /> Live Workspace Telemetry
                  </h4>
                  
                  <div className="space-y-4 font-mono text-xs">
                    <div>
                      <div className="flex justify-between text-foreground/70 mb-1">
                        <span>Code Optimization Rate</span>
                        <span className="text-mint">99.8%</span>
                      </div>
                      <div className="w-full h-2 bg-[#142323] rounded-full overflow-hidden">
                        <div className="w-[99.8%] h-full bg-mint rounded-full" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-foreground/70 mb-1">
                        <span>Mobile Responsiveness</span>
                        <span className="text-flare">100% Verified</span>
                      </div>
                      <div className="w-full h-2 bg-[#142323] rounded-full overflow-hidden">
                        <div className="w-full h-full bg-flare rounded-full" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-foreground/70 mb-1">
                        <span>Autonomous Task Queue</span>
                        <span className="text-mint">0 Errors / Active</span>
                      </div>
                      <div className="w-full h-2 bg-[#142323] rounded-full overflow-hidden">
                        <div className="w-4/5 h-full bg-gradient-to-r from-mint to-flare rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#090f0f] p-6 rounded-2xl border border-mint/20 flex flex-col justify-between">
                  <div className="flex items-center gap-3 mb-3">
                    <ShieldCheck size={20} className="text-mint" />
                    <div>
                      <h5 className="font-outfit font-bold text-sm text-white">Fullstack Architecture</h5>
                      <p className="text-[11px] font-mono text-foreground/60">Next.js 16 • Turbopack • GSAP • Lenis</p>
                    </div>
                  </div>
                  <p className="text-xs text-foreground/70 font-mono leading-relaxed mt-2 border-t border-white/10 pt-3">
                    Setiap modul kode dibuat scalable, modular, dan siap menampung penambahan fitur enterprise maupun personal project masa depan.
                  </p>
                </div>
              </div>

            </div>
          ) : (
            /* TAB 2: INTERACTIVE DEV TERMINAL */
            <div className="p-6 md:p-8 font-mono text-xs bg-[#060a0a]">
              <div className="h-80 overflow-y-auto space-y-2 pr-2 scrollbar-thin scrollbar-thumb-mint/30">
                {terminalLogs.map((log, index) => (
                  <div key={index} className="flex gap-2 text-foreground/80 leading-relaxed">
                    <span className="text-mint select-none">&gt;</span>
                    <span className={log.startsWith("[SYSTEM]") ? "text-mint font-bold" : log.startsWith("[OPS") ? "text-flare" : ""}>
                      {log}
                    </span>
                  </div>
                ))}
              </div>

              {/* Interactive prompt input */}
              <form onSubmit={handleSendPrompt} className="mt-6 pt-4 border-t border-mint/20 flex items-center gap-3">
                <span className="text-flare font-bold">bryan@office:~$</span>
                <input
                  type="text"
                  value={typedInput}
                  onChange={(e) => setTypedInput(e.target.value)}
                  placeholder="Ketik perintah (contoh: ping agents, audit, deploy)..."
                  className="flex-1 bg-transparent border-none outline-none text-mint placeholder:text-foreground/30 font-mono text-xs"
                />
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-mint text-cinder font-bold hover:bg-white transition-colors"
                >
                  Send
                </button>
              </form>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
