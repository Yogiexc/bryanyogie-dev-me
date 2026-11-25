"use client";

import { useState, useEffect } from "react";
import { Terminal, ShieldCheck, Activity, Wifi } from "lucide-react";

const traceSteps = [
  { hop: "01", host: "gateway.tkj.local (192.168.88.1)", rtt: "0.4ms", note: "MikroTik CCR1009 / VLAN Trunk 10" },
  { hop: "02", host: "core-switch.uns.ac.id (10.20.0.1)", rtt: "1.2ms", note: "Layer 3 Switch / OSPF Routing" },
  { hop: "03", host: "api.journova.internal (10.20.14.88)", rtt: "2.1ms", note: "NestJS Service Mesh / Prisma Pool" },
  { hop: "04", host: "mt5-quant-feed.live (172.67.182.25)", rtt: "4.8ms", note: "MetaTrader 5 Low-Latency Socket" },
];

export default function NetworkConsole() {
  const [activeHop, setActiveHop] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHop((prev) => (prev + 1) % traceSteps.length);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full rounded-2xl bg-[#150D17] border border-[#FDF8F0]/10 overflow-hidden font-mono text-xs shadow-2xl">
      {/* Console Titlebar */}
      <div className="px-4 py-2.5 bg-[#1C121E] border-b border-[#FDF8F0]/10 flex items-center justify-between text-[#FDF8F0]/60">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF4444]/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBB00]/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#00CC66]/60" />
          </div>
          <span className="text-[11px] text-[#FDF8F0]/80 pl-2 flex items-center gap-1.5">
            <Terminal size={12} className="text-[#FF6B00]" />
            <span>bys@traceroute: ~ /packet-flow</span>
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-[#FF6B00]">
          <Activity size={11} className="animate-pulse" />
          <span>LIVE TELEMETRY</span>
        </div>
      </div>

      {/* Traceroute Output */}
      <div className="p-4 sm:p-5 flex flex-col gap-2.5">
        <div className="text-[11px] text-[#FDF8F0]/50 pb-1">
          $ traceroute -m 4 -q 1 packet.bryanyogie.dev
        </div>

        {traceSteps.map((step, idx) => {
          const isActive = idx === activeHop;
          return (
            <div
              key={step.hop}
              className={`flex flex-col sm:flex-row sm:items-center justify-between gap-1 p-2 rounded-lg transition-all duration-300 ${
                isActive
                  ? "bg-[#2D1D31] text-[#FDF8F0] border-l-2 border-[#FF6B00] pl-3"
                  : "text-[#FDF8F0]/60"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`text-[11px] font-bold ${isActive ? "text-[#FF6B00]" : "text-[#FDF8F0]/40"}`}>
                  HOP {step.hop}
                </span>
                <span className="font-semibold">{step.host}</span>
              </div>

              <div className="flex items-center gap-3 text-[11px] self-end sm:self-auto">
                <span className="text-[#FDF8F0]/50">{step.note}</span>
                <span className="text-[#FF6B00] font-bold">{step.rtt}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Status bar */}
      <div className="px-4 py-2 bg-[#1C121E]/70 border-t border-[#FDF8F0]/5 flex items-center justify-between text-[10px] text-[#FDF8F0]/50">
        <span className="flex items-center gap-1.5">
          <Wifi size={10} className="text-[#00CC66]" />
          <span>VLAN Trunk Active • MTU 1500 • 0% Packet Loss</span>
        </span>
        <span className="text-[#FF6B00]">SMK TKJ ➔ UNS INFORMATICS</span>
      </div>
    </div>
  );
}
