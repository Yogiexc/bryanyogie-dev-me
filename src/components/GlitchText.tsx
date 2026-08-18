"use client";

import { useEffect, useRef, useState } from "react";

interface GlitchTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function GlitchText({ text, className, style }: GlitchTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const containerRef = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
    let interval: NodeJS.Timeout | null = null;
    
    const startGlitch = () => {
      let iteration = 0;
      clearInterval(interval!);
      
      interval = setInterval(() => {
        setDisplayText((prev) => 
          text
            .split("")
            .map((letter, index) => {
              if (index < iteration) {
                return text[index];
              }
              if (letter === " ") return " ";
              return letters[Math.floor(Math.random() * letters.length)];
            })
            .join("")
        );
        
        if (iteration >= text.length) {
          clearInterval(interval!);
        }
        
        iteration += 1 / 3;
      }, 30);
    };

    // Delay the glitch to happen after initial fade-in
    const timeout = setTimeout(() => {
      startGlitch();
    }, 1500);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [text]);

  return (
    <span ref={containerRef} className={className} style={style} onMouseEnter={() => {
        // Trigger again on hover for fun
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
        let iteration = 0;
        const interval = setInterval(() => {
            setDisplayText((prev) => 
            text
                .split("")
                .map((letter, index) => {
                if (index < iteration) return text[index];
                if (letter === " ") return " ";
                return letters[Math.floor(Math.random() * letters.length)];
                })
                .join("")
            );
            if (iteration >= text.length) clearInterval(interval);
            iteration += 1 / 2;
        }, 30);
    }}>
      {displayText}
    </span>
  );
}
