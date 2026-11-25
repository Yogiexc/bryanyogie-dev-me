"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div key={pathname} className="relative min-h-screen">
      {/* Orange Curtain Reveal Animation */}
      <motion.div
        className="fixed inset-0 z-[100] bg-[#FF6B00] pointer-events-none origin-top"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
      />

      {/* Page Content Fade & Slide in */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.45, delay: 0.2, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </div>
  );
}
