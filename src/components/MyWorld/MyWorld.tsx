"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import WorldDiorama from "./WorldDiorama";

const WORD_POOL = [
  "system",
  "design",
  "craft",
  "react",
  "nextjs",
  "world",
  "build",
  "logic",
  "clean",
  "space",
  "pixel",
  "frame",
  "light",
  "state",
  "model",
  "focus",
  "cloud",
  "cyber",
  "smart",
  "async",
  "token",
  "graph",
  "route",
  "scale",
  "solid",
  "depth",
  "layer",
  "panel",
];

function generateWords(count = 14): string[] {
  const result: string[] = [];
  for (let i = 0; i < count; i++) {
    const idx = (i * 7 + Math.floor(Math.random() * WORD_POOL.length)) % WORD_POOL.length;
    result.push(WORD_POOL[idx]);
  }
  return result;
}

export default function MyWorld() {
  const [lampOn, setLampOn] = useState<boolean>(true);
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const [words, setWords] = useState<string[]>([
    "of",
    "they",
    "early",
    "begin",
    "feel",
    "also",
    "much",
    "up",
    "world",
    "leave",
    "into",
    "will",
    "few",
    "feel",
  ]);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [typedInput, setTypedInput] = useState<string>("");
  const [completedWords, setCompletedWords] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [wpm, setWpm] = useState<number>(0);
  const [lastKeyName, setLastKeyName] = useState<string>("none");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [clockStr, setClockStr] = useState<string>("15:48:00");
  const [catPetCount, setCatPetCount] = useState<number>(0);
  const [arcadeScore, setArcadeScore] = useState<number>(1280);
  const [rippleWave, setRippleWave] = useState<number>(0);
  const [dialDeg, setDialDeg] = useState<number>(45);

  const stageRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef<number | null>(null);

  const handleArcadePlay = () => {
    setArcadeScore((s) => s + 100);
  };

  const handleTriggerRipple = () => {
    setRippleWave((w) => w + 1);
  };

  const handleRotateDial = () => {
    setDialDeg((d) => (d + 30) % 360);
  };

  // Live digital clock on the smartphone
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, "0");
      const mm = String(now.getMinutes()).padStart(2, "0");
      const ss = String(now.getSeconds()).padStart(2, "0");
      setClockStr(`${hh}:${mm}:${ss}`);
    };
    updateClock();
    const id = setInterval(updateClock, 1000);
    return () => clearInterval(id);
  }, []);

  // Countdown timer & live WPM calculation
  useEffect(() => {
    if (!timerActive) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setTimerActive(false);
          return 0;
        }
        return prev - 1;
      });

      if (startTimeRef.current) {
        const elapsedMin = Math.max((Date.now() - startTimeRef.current) / 60000, 0.05);
        setWpm(Math.round(completedWords / elapsedMin));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timerActive, completedWords]);

  // Trigger physical key press animation briefly
  const triggerKeyAnimation = useCallback((code: string) => {
    const normalized = code.toLowerCase();
    setPressedKeys((prev) => {
      const next = new Set(prev);
      next.add(normalized);
      return next;
    });

    setTimeout(() => {
      setPressedKeys((prev) => {
        const next = new Set(prev);
        next.delete(normalized);
        return next;
      });
    }, 140);
  }, []);

  // Reset typing test
  const resetTest = useCallback(() => {
    setWords(generateWords(14));
    setCurrentWordIndex(0);
    setTypedInput("");
    setCompletedWords(0);
    setTimeLeft(60);
    setTimerActive(false);
    setWpm(0);
    startTimeRef.current = null;
    setLastKeyName("esc");
  }, []);

  // Process a key input (from real keyboard or clicking a 3D keycap)
  const processKeyInput = useCallback(
    (rawKey: string) => {
      const key = rawKey.toLowerCase();
      triggerKeyAnimation(key);

      if (key === "escape") {
        resetTest();
        return;
      }

      if (key === "backspace") {
        setLastKeyName("backspace");
        setTypedInput((prev) => prev.slice(0, -1));
        return;
      }

      if (key === "enter") {
        setLastKeyName("enter");
        return;
      }

      if (key === " " || key === "space") {
        setLastKeyName("space");
        if (!timerActive && timeLeft > 0) {
          setTimerActive(true);
          startTimeRef.current = Date.now();
        }

        if (typedInput.trim().length > 0) {
          const nextIdx = currentWordIndex + 1;
          setCompletedWords((c) => {
            const updated = c + 1;
            if (startTimeRef.current) {
              const elapsedMin = Math.max((Date.now() - startTimeRef.current) / 60000, 0.05);
              setWpm(Math.round(updated / elapsedMin));
            }
            return updated;
          });
          setTypedInput("");

          if (nextIdx >= words.length) {
            setWords(generateWords(14));
            setCurrentWordIndex(0);
          } else {
            setCurrentWordIndex(nextIdx);
          }
        }
        return;
      }

      // Single printable character
      if (key.length === 1 && timeLeft > 0) {
        if (!timerActive) {
          setTimerActive(true);
          startTimeRef.current = Date.now();
        }
        setLastKeyName(key);
        setTypedInput((prev) => (prev.length < 18 ? prev + key : prev));
      }
    },
    [currentWordIndex, resetTest, timeLeft, timerActive, triggerKeyAnimation, typedInput, words.length]
  );

  // Keyboard listener when workstation stage is focused
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key === "Tab") return;

    if (
      e.key === " " ||
      e.key === "Backspace" ||
      e.key === "Escape" ||
      e.key === "Enter" ||
      e.key.length === 1
    ) {
      e.preventDefault();
      processKeyInput(e.key);
    } else {
      triggerKeyAnimation(e.key);
    }
  };

  // Pet the orange cat companion
  const handlePetCat = () => {
    setCatPetCount((c) => c + 1);
    setTimeout(() => {
      setCatPetCount(0);
    }, 1800);
  };

  return (
    <section
      id="my-world"
      className="relative w-full py-20 md:py-32 px-4 sm:px-8 md:px-12 lg:px-20 bg-[#090F0F] border-t border-[#182A2A] overflow-hidden"
    >
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#142424]/30 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Minimalist Editorial Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 md:mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#FF7043]" />
              <span className="text-xs sm:text-sm font-mono text-[#B9F5D8] uppercase tracking-[0.25em]">
                01 / THE CRAFT WE KEEP
              </span>
            </div>

            <h2 className="text-4xl sm:text-6xl md:text-7xl font-outfit font-black tracking-tight text-[#F4F0E8] uppercase leading-none">
              MY <span className="text-[#B9F5D8]">WORLD</span>
            </h2>

            <p className="text-xs sm:text-sm font-mono text-[#F4F0E8]/60 uppercase tracking-widest mt-2">
              INTERACTIVE WORKSTATION RIG — KLIK &amp; KETIK LANGSUNG DI KEYBOARD
            </p>
          </div>

          {/* Interactive Controls Pill Bar */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => setLampOn(!lampOn)}
              className="px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-300 flex items-center gap-2 bg-[#142424] text-[#F4F0E8]/80 hover:text-white border border-[#182A2A] hover:border-[#B9F5D8]/50"
            >
              <span
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  lampOn ? "bg-[#FFE082] shadow-[0_0_8px_#FFE082]" : "bg-[#FF7043]/40"
                }`}
              />
              <span className="text-[11px] uppercase tracking-wider">
                {lampOn ? "LAMP: ON" : "LAMP: OFF"}
              </span>
            </button>

            <button
              type="button"
              onClick={resetTest}
              className="px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-300 bg-[#142424] text-[#B9F5D8] hover:bg-[#182A2A] border border-[#182A2A] hover:border-[#B9F5D8]/50 text-[11px] uppercase tracking-wider"
            >
              RESET TYPING (ESC)
            </button>
          </div>
        </div>

        {/* =================================================================
            THE ANATOMY INTERACTIVE STAGE PLATE
            Matches the exact layout from the user's reference photo:
            - Top-left: 01 / THE CRAFT WE KEEP
            - Center: 3D Isometric Desk with Monitor, 65% Keyboard, Orange Cat, Plant Shelf, Phone & Lamp
            - Bottom-left: keyboard.layout = "65%" // type on it
            - Bottom-right: — wpm · key
           ================================================================= */}
        <div
          ref={stageRef}
          tabIndex={0}
          role="group"
          aria-label="Interactive Isometric Workstation Desk. Click and type on your keyboard to interact."
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onClick={() => stageRef.current?.focus({ preventScroll: true })}
          className={`relative w-full rounded-2xl md:rounded-3xl bg-[#0B1414] border transition-colors duration-300 p-4 sm:p-6 md:p-8 shadow-[0_30px_70px_rgba(0,0,0,0.7)] overflow-hidden outline-none ${
            isFocused ? "border-[#B9F5D8]/60" : "border-[#182A2A]"
          }`}
        >
          {/* Top-Left Subtle Technical Caption inside Card */}
          <div className="flex items-center justify-between text-[11px] font-mono text-[#F4F0E8]/70 pb-2">
            <span>01 / THE CRAFT WE KEEP</span>
            <span className="text-[#B9F5D8]">
              {isFocused ? "● KEYBOARD ACTIVE — TYPE NOW" : "○ CLICK DESK TO TYPE"}
            </span>
          </div>

          {/* Main Interactive Isometric SVG Figure */}
          <WorldDiorama
            lampOn={lampOn}
            onToggleLamp={() => setLampOn((v) => !v)}
            pressedKeys={pressedKeys}
            onPressKey={(code) => processKeyInput(code)}
            words={words}
            currentWordIndex={currentWordIndex}
            typedInput={typedInput}
            timeLeft={timeLeft}
            wpm={wpm}
            isFocused={isFocused}
            clockStr={clockStr}
            catPetCount={catPetCount}
            onPetCat={handlePetCat}
            arcadeClicks={arcadeScore}
            onArcadePlay={handleArcadePlay}
            rippleClicks={rippleWave}
            onTriggerRipple={handleTriggerRipple}
            dialAngle={dialDeg}
            onRotateDial={handleRotateDial}
          />

          {/* Bottom Technical Readout Bar (Exact Reference Footer) */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[#182A2A]/80 text-xs font-mono text-[#F4F0E8]/60">
            <div>
              <span className="text-[#B9F5D8]">keyboard.layout</span> = &quot;65%&quot;{" "}
              <span className="text-[#F4F0E8]/70">// type on it · click lamp or cat</span>
            </div>
            <div className="flex items-center gap-3 text-[#F4F0E8]/80">
              <span>{wpm > 0 ? `${wpm} wpm` : "— wpm"}</span>
              <span className="text-[#F4F0E8]/30">·</span>
              <span className="text-[#FF7043]">key: {lastKeyName}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
