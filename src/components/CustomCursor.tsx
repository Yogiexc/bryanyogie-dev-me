"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsMobile(true);
      return;
    }
    
    // Slight delay to ensure DOM is ready
    setTimeout(() => {
      const cursor = cursorRef.current;
      const follower = followerRef.current;
      if (!cursor || !follower) return;

      let mouseX = window.innerWidth / 2;
      let mouseY = window.innerHeight / 2;
      let cursorX = mouseX;
      let cursorY = mouseY;
      let followerX = mouseX;
      let followerY = mouseY;

      const onMouseMove = (e: MouseEvent) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Solid dot moves instantly
        gsap.to(cursor, {
          x: mouseX,
          y: mouseY,
          duration: 0,
        });
      };

      // Ticker for smooth follower
      const ticker = gsap.ticker.add(() => {
        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;
        
        gsap.set(follower, {
          x: followerX,
          y: followerY
        });
      });

      const onMouseEnterLink = () => {
        gsap.to(cursor, { scale: 0, duration: 0.3 });
        gsap.to(follower, { scale: 1.5, backgroundColor: "rgba(185,245,216,0.25)", duration: 0.3 });
      };

      const onMouseLeaveLink = () => {
        gsap.to(cursor, { scale: 1, duration: 0.3 });
        gsap.to(follower, { scale: 1, backgroundColor: "transparent", duration: 0.3 });
      };

      window.addEventListener("mousemove", onMouseMove);
      
      const attachHoverEvents = () => {
        const interactiveElements = document.querySelectorAll("a, button, input, textarea, [class*='cursor-pointer']");
        interactiveElements.forEach(el => {
          el.addEventListener("mouseenter", onMouseEnterLink);
          el.addEventListener("mouseleave", onMouseLeaveLink);
        });
      };

      attachHoverEvents();

      return () => {
        window.removeEventListener("mousemove", onMouseMove);
        gsap.ticker.remove(ticker);
        const interactiveElements = document.querySelectorAll("a, button, input, textarea, [class*='cursor-pointer']");
        interactiveElements.forEach(el => {
          el.removeEventListener("mouseenter", onMouseEnterLink);
          el.removeEventListener("mouseleave", onMouseLeaveLink);
        });
      };
    }, 100);
  }, []);

  if (!isClient || isMobile) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        * { cursor: none !important; }
      `}} />
      
      {/* Solid dot */}
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-3 h-3 bg-[#ff7043] rounded-full pointer-events-none z-[99999] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_12px_rgba(255,112,67,0.9)]"
      />
      
      {/* Smooth follower outline */}
      <div 
        ref={followerRef} 
        className="fixed top-0 left-0 w-10 h-10 border-2 border-[#b9f5d8] rounded-full pointer-events-none z-[99998] -translate-x-1/2 -translate-y-1/2"
      />
    </>
  );
}
