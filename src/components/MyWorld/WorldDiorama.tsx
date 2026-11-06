"use client";

import React, { useEffect, useRef } from "react";
import workstationData from "./workstationRig.json";

interface KeyMeta {
  index: number;
  code: string;
  rawCode: string;
  label: string;
  cx: number;
  cy: number;
}

interface WorkstationPart {
  id: string;
  depth: number;
  svg: string;
}

interface WorldDioramaProps {
  lampOn: boolean;
  onToggleLamp: () => void;
  pressedKeys: Set<string>;
  onPressKey: (code: string) => void;
  words: string[];
  currentWordIndex: number;
  typedInput: string;
  timeLeft: number;
  wpm: number;
  isFocused: boolean;
  clockStr: string;
  catPetCount: number;
  onPetCat: () => void;
}

export default function WorldDiorama({
  lampOn,
  onToggleLamp,
  pressedKeys,
  onPressKey,
  words,
  currentWordIndex,
  typedInput,
  timeLeft,
  wpm,
  isFocused,
  clockStr,
  catPetCount,
  onPetCat,
}: WorldDioramaProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const parts = workstationData.parts as WorkstationPart[];
  const keys = workstationData.keys as KeyMeta[];
  const downVec = workstationData.downVec as [number, number];
  const monMatrix = workstationData.monitorMatrix as string;
  const monBounds = workstationData.monitorBounds;
  const phMatrix = workstationData.phoneMatrix as string;
  const phBounds = workstationData.phoneBounds;
  const lampCenter = workstationData.lampSwitchCenter as [number, number];

  // Physical downward travel when a mechanical key is pressed
  useEffect(() => {
    if (!svgRef.current) return;
    const keyNodes = svgRef.current.querySelectorAll<SVGGElement>(".ws-key");
    keyNodes.forEach((node) => {
      const code = node.getAttribute("data-key-code") || "";
      const isDown = pressedKeys.has(code);
      if (isDown) {
        const dx = (downVec[0] * 2.4).toFixed(2);
        const dy = (downVec[1] * 2.4).toFixed(2);
        node.setAttribute("transform", `translate(${dx} ${dy})`);
        node.setAttribute("data-pressed", "true");
      } else {
        node.setAttribute("transform", "translate(0 0)");
        node.removeAttribute("data-pressed");
      }
    });
  }, [pressedKeys, downVec]);

  // Delegated click handler on SVG elements (Keys, Lamp, Cat)
  const handleSvgClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const target = e.target as Element;
    const keyGroup = target.closest(".ws-key");
    if (keyGroup) {
      const code = keyGroup.getAttribute("data-key-code");
      if (code) {
        onPressKey(code);
        return;
      }
    }

    const partGroup = target.closest("[data-part-id]");
    if (partGroup) {
      const pid = partGroup.getAttribute("data-part-id");
      if (pid === "architectural-lamp") {
        onToggleLamp();
        return;
      }
      if (pid === "companion-cat") {
        onPetCat();
        return;
      }
    }
  };

  // Split words into 2 display lines on the 3D monitor screen
  const line1Words = words.slice(0, 7);
  const line2Words = words.slice(7, 14);

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="relative w-full aspect-[16/10] sm:aspect-[900/560] flex items-center justify-center select-none overflow-hidden">
      <svg
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${workstationData.width} ${workstationData.height}`}
        className="iso iso-svg w-full h-full overflow-visible"
        data-theme="dark"
        onClick={handleSvgClick}
      >
        <defs>
          {/* Ambient Desk Glow */}
          <radialGradient id="deskStageGlow" cx="50%" cy="52%" r="50%">
            <stop offset="0%" stopColor="#182A2A" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#090F0F" stopOpacity="0" />
          </radialGradient>

          {/* Warm Architectural Desk Lamp Cone */}
          <radialGradient id="lampWarmPool" cx="50%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#FFE082" stopOpacity="0.42" />
            <stop offset="45%" stopColor="#FFB74D" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#FFB74D" stopOpacity="0" />
          </radialGradient>

          {/* Monitor Screen Subtle Glow */}
          <linearGradient id="monitorGlow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#142424" />
            <stop offset="100%" stopColor="#070D0D" />
          </linearGradient>
        </defs>

        {/* Background Stage Halo */}
        <ellipse
          cx="460"
          cy="310"
          rx="390"
          ry="220"
          fill="url(#deskStageGlow)"
          pointerEvents="none"
        />

        {/* Render all 28 depth-sorted 3D solid groups */}
        {parts.map((part) => {
          const isClickable =
            part.id === "architectural-lamp" ||
            part.id === "companion-cat" ||
            part.id === "keyboard-keys";
          return (
            <g
              key={part.id}
              data-part-id={part.id}
              className={isClickable ? "cursor-pointer" : undefined}
              dangerouslySetInnerHTML={{ __html: part.svg }}
            />
          );
        })}

        {/* =================================================================
            3D PROJECTED ULTRAWIDE MONITOR SCREEN UI (Typing Test Interface)
           ================================================================= */}
        <g transform={monMatrix} className="pointer-events-none">
          {/* Header Row: Mode Title & Countdown Timer */}
          <text
            x={monBounds.x0 + 4}
            y={-(monBounds.z1 - 8)}
            fill="#648888"
            fontSize="6.2"
            fontFamily="monospace"
            letterSpacing="0.06em"
          >
            BYS.TYPE // 65% MECH
          </text>
          <text
            x={monBounds.x1 - 4}
            y={-(monBounds.z1 - 8)}
            fill="#B9F5D8"
            fontSize="7.5"
            fontWeight="bold"
            fontFamily="monospace"
            textAnchor="end"
          >
            {formatTimer(timeLeft)}
          </text>

          {/* Target Words Line 1 */}
          <text
            x={monBounds.x0 + 4}
            y={-(monBounds.z1 - 24)}
            fontSize="7.6"
            fontFamily="monospace"
          >
            {line1Words.map((w, i) => {
              const isCurrent = i === currentWordIndex;
              const isPast = i < currentWordIndex;
              return (
                <tspan
                  key={i}
                  fill={isCurrent ? "#B9F5D8" : isPast ? "#486868" : "#9EABA8"}
                  fontWeight={isCurrent ? "bold" : "normal"}
                >
                  {w + " "}
                </tspan>
              );
            })}
          </text>

          {/* Target Words Line 2 */}
          <text
            x={monBounds.x0 + 4}
            y={-(monBounds.z1 - 36)}
            fontSize="7.6"
            fontFamily="monospace"
          >
            {line2Words.map((w, idx) => {
              const i = idx + 7;
              const isCurrent = i === currentWordIndex;
              const isPast = i < currentWordIndex;
              return (
                <tspan
                  key={i}
                  fill={isCurrent ? "#B9F5D8" : isPast ? "#486868" : "#9EABA8"}
                  fontWeight={isCurrent ? "bold" : "normal"}
                >
                  {w + " "}
                </tspan>
              );
            })}
          </text>

          {/* Active Input Prompt Line */}
          <text
            x={monBounds.x0 + 4}
            y={-(monBounds.z0 + 18)}
            fill={typedInput || isFocused ? "#F4F0E8" : "#648888"}
            fontSize="7.2"
            fontFamily="monospace"
          >
            {typedInput
              ? `> ${typedInput}▌`
              : isFocused
              ? "> type now...▌"
              : "> click and start typing..."}
          </text>

          {/* Footer Hints on Monitor */}
          <text
            x={monBounds.x0 + 4}
            y={-(monBounds.z0 + 4)}
            fill="#486868"
            fontSize="5.2"
            fontFamily="monospace"
          >
            space submits a word
          </text>
          <text
            x={monBounds.x1 - 4}
            y={-(monBounds.z0 + 4)}
            fill="#FF7043"
            fontSize="5.2"
            fontFamily="monospace"
            textAnchor="end"
          >
            {wpm > 0 ? `${wpm} WPM · esc restart` : "esc · restart"}
          </text>
        </g>

        {/* =================================================================
            3D PROJECTED SMARTPHONE SCREEN UI (Live Clock & Status Pill)
           ================================================================= */}
        <g transform={phMatrix} className="pointer-events-none">
          <text
            x={(phBounds.x0 + phBounds.x1) / 2}
            y={-(phBounds.z1 - 7)}
            fill="#F4F0E8"
            fontSize="4.2"
            fontWeight="bold"
            fontFamily="monospace"
            textAnchor="middle"
          >
            {clockStr}
          </text>
          <rect
            x={phBounds.x0 + 1.5}
            y={-(phBounds.z0 + 7)}
            width={phBounds.x1 - phBounds.x0 - 3}
            height="4.5"
            rx="2"
            fill="#2E8B57"
          />
          <text
            x={(phBounds.x0 + phBounds.x1) / 2}
            y={-(phBounds.z0 + 3.8)}
            fill="#B9F5D8"
            fontSize="2.8"
            fontFamily="monospace"
            textAnchor="middle"
          >
            ONLINE
          </text>
        </g>

        {/* =================================================================
            ARCHITECTURAL LAMP LIGHT POOL (Toggleable)
           ================================================================= */}
        {lampOn && (
          <ellipse
            cx={lampCenter[0]}
            cy={lampCenter[1] + 55}
            rx="125"
            ry="85"
            fill="url(#lampWarmPool)"
            className="pointer-events-none transition-opacity duration-500"
          />
        )}

        {/* Companion Cat Purr Floating Heart / Meow Bubble when petted */}
        {catPetCount > 0 && (
          <g
            transform="translate(262, 232)"
            className="pointer-events-none animate-bounce"
          >
            <rect
              x="-24"
              y="-14"
              width="48"
              height="18"
              rx="6"
              fill="#142424"
              stroke="#FF7043"
              strokeWidth="1"
            />
            <text
              x="0"
              y="-2"
              fill="#B9F5D8"
              fontSize="8.5"
              fontFamily="monospace"
              fontWeight="bold"
              textAnchor="middle"
            >
              purr~ ♥
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}
