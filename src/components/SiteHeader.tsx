"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

const navLinks = [
  { title: "HOME", href: "/" },
  { title: "PROJECTS", href: "/projects" },
  { title: "CERTIFICATES", href: "/certificates" },
  { title: "JOURNEY", href: "/journey" },
];

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Top Floating Bar */}
      {!menuOpen && (
        <header
          className={`fixed top-0 left-0 w-full z-40 flex items-center justify-between px-6 md:px-12 transition-all duration-300 ${
            isScrolled
              ? "py-4 bg-[#1C121E]/40 backdrop-blur-md border-b border-[#FDF8F0]/5"
              : "py-6 bg-transparent"
          }`}
        >
          <Link
            href="/"
            className="text-2xl sm:text-3xl font-outfit font-black tracking-tighter text-[#FDF8F0] hover:text-[#FF6B00] transition-colors"
          >
            BRYAN YOGIE
          </Link>

          <button
            onClick={() => setMenuOpen(true)}
            className="flex items-center gap-2 group cursor-pointer text-[#FDF8F0] hover:text-[#FF6B00] transition-colors"
            aria-label="Open navigation menu"
          >
            <span className="hidden md:block font-mono text-xs uppercase tracking-widest font-bold">
              Menu
            </span>
            <Menu className="w-8 h-8 group-hover:scale-105 transition-transform" />
          </button>
        </header>
      )}

      {/* Fullscreen Split Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-50 flex flex-col md:flex-row overflow-hidden bg-[#4D354E]"
          >
            {/* Top Close Bar */}
            <div className="absolute top-0 left-0 w-full flex items-center justify-between px-6 md:px-12 py-6 z-50 pointer-events-none">
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="text-2xl sm:text-3xl font-outfit font-black tracking-tighter text-[#FDF8F0] select-none cursor-pointer pointer-events-auto hover:text-[#FF6B00] transition-colors"
              >
                BRYAN YOGIE
              </Link>
              <button
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 group cursor-pointer pointer-events-auto text-[#FDF8F0] hover:opacity-80 transition-opacity"
                aria-label="Close navigation menu"
              >
                <span className="hidden md:block font-mono text-xs uppercase tracking-widest font-bold">
                  Close
                </span>
                <X className="w-8 h-8 group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            {/* Left Column: Big Navigation Links */}
            <div className="flex-1 flex flex-col justify-center px-6 md:px-14 lg:px-20 py-20 bg-[#4D354E] overflow-hidden">
              <nav className="flex flex-col space-y-2 md:space-y-4" aria-label="Main Navigation">
                {navLinks.map((item, i) => {
                  const isActive = pathname === item.href;
                  return (
                    <motion.div
                      key={item.title}
                      initial={{ x: -30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -30, opacity: 0 }}
                      transition={{ delay: 0.1 + i * 0.04, duration: 0.3 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-outfit font-black tracking-tight transition-colors flex items-center group overflow-hidden w-fit cursor-pointer text-left ${
                          isActive ? "text-[#FF6B00]" : "text-[#FDF8F0] hover:text-[#FF6B00]"
                        }`}
                      >
                        <span className="relative overflow-hidden inline-block leading-[1.1]">
                          <span className="block group-hover:-translate-y-full transition-transform duration-500 ease-in-out">
                            {item.title}
                          </span>
                          <span className="absolute top-0 left-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out text-[#FF6B00]">
                            {item.title}
                          </span>
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Social Channels */}
              <div className="flex flex-wrap gap-5 sm:gap-7 pt-6 mt-6 border-t border-[#FDF8F0]/15 font-mono text-xs sm:text-sm text-[#FDF8F0]/70">
                <a
                  href="https://www.linkedin.com/in/bryanyogiesaputra/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FF6B00] transition-colors"
                >
                  LINKEDIN ↗
                </a>
                <a
                  href="https://github.com/Yogiexc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FF6B00] transition-colors"
                >
                  GITHUB ↗
                </a>
                <a
                  href="mailto:bryanyogie@student.uns.ac.id"
                  className="hover:text-[#FF6B00] transition-colors"
                >
                  EMAIL ↗
                </a>
                <a
                  href="https://wa.me/6285876941979"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FF6B00] transition-colors"
                >
                  WHATSAPP ↗
                </a>
              </div>
            </div>

            {/* Right Column: Statement Card (Desktop Only) */}
            <div className="hidden md:flex flex-1 bg-[#FF6B00] p-16 lg:p-20 flex-col justify-center relative overflow-hidden">
              <div className="space-y-6 relative z-10 text-white">
                <span className="text-xs font-mono opacity-85 uppercase tracking-widest block font-bold">
                  Surakarta, Indonesia • UNS Informatics
                </span>
                <h3 className="text-4xl lg:text-5xl font-outfit font-black leading-none max-w-md">
                  FULLSTACK DEVELOPER WITH NETWORK ENGINEERING ROOTS.
                </h3>
                <p className="opacity-95 max-w-sm font-sans text-sm leading-relaxed">
                  Combining physical network infrastructure instincts from vocational school with modern fullstack web applications and quantitative automation.
                </p>
                <Link
                  href="/projects"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider hover:translate-x-2 transition-transform cursor-pointer"
                >
                  Explore All Projects <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Ambient Watermark */}
              <span className="absolute -bottom-20 -right-20 text-[20rem] font-outfit font-black leading-none opacity-20 select-none pointer-events-none text-white">
                BYS
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
