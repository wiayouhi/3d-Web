"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bars3Icon, 
  XMarkIcon, 
  CubeTransparentIcon, 
  ArrowRightIcon,
  SparklesIcon 
} from "@heroicons/react/24/outline";

const navLinks = [
  { name: "Vase", href: "#vase" },
  { name: "Geometry", href: "#geometry" },
  { name: "Chair", href: "#chair" },
  { name: "Glass", href: "#glass" },
  { name: "Lamp", href: "#lamp" },
  { name: "Table", href: "#table" },
  { name: "Creator", href: "#creator" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // --- แก้ไข 1: ตรวจจับ Scroll จาก Element แทน Window ---
  useEffect(() => {
    const mainContainer = document.getElementById("main-scroll-container");

    const handleScroll = () => {
      if (mainContainer) {
        setScrolled(mainContainer.scrollTop > 50);
      }
    };

    if (mainContainer) {
      mainContainer.addEventListener("scroll", handleScroll);
    }
    
    // Fallback: เผื่อบางกรณีใช้ Window
    window.addEventListener("scroll", handleScroll);

    return () => {
      if (mainContainer) mainContainer.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // --- แก้ไข 2: ใช้ scrollIntoView เพื่อให้รองรับ div overflow ---
  const handleScrollTo = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    
    if (element) {
      element.scrollIntoView({ 
        behavior: "smooth",
        block: "start" 
      });
    }
  };

  return (
    <>
      {/* --- NAVBAR MAIN --- */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 flex items-center justify-center ${
          scrolled ? "py-4" : "py-6 md:py-8"
        }`}
      >
        <div 
            className={`
                w-full transition-all duration-500 grid grid-cols-2 md:grid-cols-3 items-center px-6 md:px-12
                ${scrolled 
                    ? "max-w-[95%] bg-black/40 backdrop-blur-md border border-white/10 rounded-full shadow-2xl py-3" 
                    : "max-w-7xl bg-transparent border-transparent"
                }
            `}
        >
          
          {/* LOGO AREA */}
          <div 
            className="flex items-center gap-4 cursor-pointer group select-none justify-start" 
            onClick={() => {
                // Scroll กลับบนสุด
                const container = document.getElementById("main-scroll-container");
                if(container) container.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="relative flex items-center justify-center w-10 h-10 bg-zinc-950 rounded-lg border border-zinc-800 shadow-inner group-hover:border-cyan-500/50 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all duration-300">
                <CubeTransparentIcon className="w-5 h-5 text-zinc-300 group-hover:text-cyan-400 transition-colors relative z-10" />
            </div>
            
            <div className="hidden md:flex flex-col leading-none">
              <span className="text-sm font-bold tracking-wider text-white group-hover:text-cyan-100 transition-colors">INSIDE</span>
              <span className="text-[10px] tracking-[0.2em] text-cyan-500 font-bold uppercase">Machine</span>
            </div>
          </div>

          {/* --- DESKTOP MENU --- */}
          <div className="hidden md:flex items-center justify-center">
            <motion.div 
               layout
               className="flex items-center p-1.5 rounded-full border border-zinc-800 bg-black/80 backdrop-blur-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]"
            >
              {navLinks.map((link, index) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="relative px-5 py-2 rounded-full transition-all duration-300 cursor-pointer"
                >
                  <AnimatePresence>
                    {hoveredIndex === index && (
                      <motion.span
                        layoutId="nav-item-bg"
                        className="absolute inset-0 bg-zinc-800 rounded-full border border-zinc-600"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </AnimatePresence>
                  
                  <span className={`relative z-10 text-xs font-bold uppercase tracking-wide transition-colors duration-200 ${
                      hoveredIndex === index ? "text-white" : "text-zinc-400"
                  }`}>
                    {link.name}
                  </span>

                  {hoveredIndex === index && (
                     <motion.div 
                        layoutId="nav-dot"
                        className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_8px_currentColor]"
                     />
                  )}
                </a>
              ))}
            </motion.div>
          </div>

          {/* MOBILE HAMBURGER */}
          <div className="flex md:hidden justify-end">
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-10 h-10 flex items-center justify-center text-white border border-zinc-700 rounded-full bg-zinc-900/80 backdrop-blur active:scale-95 transition-all hover:border-cyan-500 hover:text-cyan-400"
            >
                {isMobileMenuOpen ? (
                <XMarkIcon className="w-5 h-5" />
                ) : (
                <Bars3Icon className="w-5 h-5" />
                )}
            </button>
          </div>
          
        </div>
      </motion.nav>

      {/* --- MOBILE MENU --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { delay: 0.2 } }}
            className="fixed inset-0 z-[99] bg-black md:hidden flex flex-col items-center justify-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 via-black to-black"></div>
            <div className="absolute inset-0 opacity-20" 
                 style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
            </div>
            
            <div className="w-full max-w-sm px-6 relative z-10 flex flex-col h-full justify-center">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-center gap-2 mb-10 text-zinc-500"
                >
                    <SparklesIcon className="w-4 h-4 text-cyan-500" />
                    <span className="text-xs font-bold uppercase tracking-[0.3em]">Menu</span>
                </motion.div>

                <div className="flex flex-col gap-2">
                {navLinks.map((link, i) => (
                    <motion.a
                        key={link.name}
                        href={link.href}
                        onClick={(e) => handleScrollTo(e, link.href)}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.05 + 0.1 }}
                        className="group flex items-center justify-between p-4 rounded-xl hover:bg-zinc-900/50 border border-transparent hover:border-zinc-800 transition-all cursor-pointer"
                    >
                        <span className="text-3xl font-black text-zinc-500 group-hover:text-white transition-colors duration-300 tracking-tight">
                          {link.name}
                        </span>
                        <ArrowRightIcon className="w-5 h-5 text-zinc-700 group-hover:text-cyan-400 group-hover:-rotate-45 transition-all duration-300" />
                    </motion.a>
                ))}
                </div>

                <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ delay: 0.5 }}
                    className="mt-12 text-center"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-[10px] uppercase tracking-widest text-zinc-400">System Online</span>
                    </div>
                </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}