"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bars3Icon, 
  XMarkIcon, 
  CubeTransparentIcon, 
  ArrowRightIcon,
  SparklesIcon,
  CpuChipIcon
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

// --- Animation Variants ---
const menuVars = {
  initial: { scaleY: 0 },
  animate: { 
    scaleY: 1, 
    transition: { duration: 0.5, ease: [0.12, 0, 0.39, 0] as const } 
  },
  exit: { 
    scaleY: 0, 
    transition: { delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } 
  }
};

const mobileLinkVars = {
  initial: { y: "30vh", transition: { duration: 0.5, ease: [0.37, 0, 0.63, 1] as const} },
  open: { y: 0, transition: { duration: 0.7, ease: [0, 0.55, 0.45, 1]  as const} }
};

const containerVars = {
  initial: { transition: { staggerChildren: 0.09, staggerDirection: -1 } },
  open: { transition: { delayChildren: 0.3, staggerChildren: 0.09, staggerDirection: 1 } }
};

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // --- Scroll Logic ---
  useEffect(() => {
    const mainContainer = document.getElementById("main-scroll-container");
    const handleScroll = () => {
      if (mainContainer) setScrolled(mainContainer.scrollTop > 50);
      else setScrolled(window.scrollY > 50); // Fallback
    };

    if (mainContainer) mainContainer.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", handleScroll);

    return () => {
      if (mainContainer) mainContainer.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollTo = (e: any, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      {/* --- NAVBAR MAIN --- */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} // Smooth entry
        className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-center transition-all duration-500 ${
          scrolled ? "py-4" : "py-6 md:py-8"
        }`}
      >
        <div 
            className={`
                w-full transition-all duration-700 ease-out grid grid-cols-2 md:grid-cols-3 items-center px-6 md:px-12
                ${scrolled 
                    ? "max-w-[90%] bg-zinc-950/70 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl py-3" 
                    : "max-w-7xl bg-transparent border-transparent"
                }
            `}
        >
          
          {/* LOGO AREA - "Machine Heart" */}
          <motion.div 
            className="flex items-center gap-4 cursor-pointer group select-none justify-start w-fit" 
            onClick={() => {
                const container = document.getElementById("main-scroll-container");
                if(container) container.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative flex items-center justify-center w-11 h-11 bg-gradient-to-br from-zinc-800 to-black rounded-xl border border-zinc-700 shadow-lg overflow-hidden group-hover:border-cyan-500/50 transition-all duration-500">
               {/* Animated Scanline inside Logo */}
               <div className="absolute inset-0 bg-gradient-to-t from-transparent via-cyan-400/20 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-700 ease-in-out" />
               
               <CubeTransparentIcon className="w-5 h-5 text-zinc-300 group-hover:text-cyan-400 transition-colors relative z-10" />
            </div>
            
            <div className="hidden md:flex flex-col leading-none">
              <span className="text-sm font-bold tracking-wider text-white group-hover:text-cyan-100 transition-colors">INSIDE</span>
              <div className="flex items-center gap-1">
                 <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_8px_#06b6d4]"></span>
                 <span className="text-[10px] tracking-[0.2em] text-cyan-600 font-bold uppercase group-hover:text-cyan-400 transition-colors">Machine</span>
              </div>
            </div>
          </motion.div>

          {/* --- DESKTOP MENU - "Floating Control Panel" --- */}
          <div className="hidden md:flex items-center justify-center">
            <motion.div 
               layout
               className="flex items-center p-1.5 rounded-full border border-white/5 bg-zinc-900/50 backdrop-blur-md shadow-xl"
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
                        className="absolute inset-0 bg-zinc-800/80 rounded-full border border-white/10"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ type: "spring" , stiffness: 300, damping: 25 }}
                      >
                         {/* Glow Effect behind the pill */}
                         <div className="absolute inset-0 bg-cyan-500/20 blur-md rounded-full" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                  
                  <span className={`relative z-10 text-xs font-bold uppercase tracking-wider transition-colors duration-200 ${
                      hoveredIndex === index ? "text-white" : "text-zinc-400"
                  }`}>
                    {link.name}
                  </span>
                </a>
              ))}
            </motion.div>
          </div>

          {/* MOBILE HAMBURGER */}
          <div className="flex md:hidden justify-end">
            <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`w-12 h-12 flex items-center justify-center text-white border rounded-full backdrop-blur-md transition-all duration-300 ${
                    isMobileMenuOpen 
                    ? "bg-cyan-500/10 border-cyan-500 text-cyan-400" 
                    : "bg-zinc-900/80 border-zinc-700 hover:border-zinc-500"
                }`}
            >
              <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div 
                        key="close" 
                        initial={{ rotate: -90, opacity: 0 }} 
                        animate={{ rotate: 0, opacity: 1 }} 
                        exit={{ rotate: 90, opacity: 0 }}
                    >
                        <XMarkIcon className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div 
                        key="menu" 
                        initial={{ rotate: 90, opacity: 0 }} 
                        animate={{ rotate: 0, opacity: 1 }} 
                        exit={{ rotate: -90, opacity: 0 }}
                    >
                        <Bars3Icon className="w-6 h-6" />
                    </motion.div>
                  )}
              </AnimatePresence>
            </motion.button>
          </div>
          
        </div>
      </motion.nav>

      {/* --- MOBILE MENU OVERLAY (HUD Style) --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 z-[99] bg-black origin-top md:hidden flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black opacity-90"></div>
            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.07]" 
                 style={{ 
                    backgroundImage: 'linear-gradient(#06b6d4 1px, transparent 1px), linear-gradient(90deg, #06b6d4 1px, transparent 1px)', 
                    backgroundSize: '30px 30px' 
                 }}>
            </div>
            
            {/* Content Container */}
            <div className="w-full h-full px-8 relative z-10 flex flex-col justify-between py-24">
                
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center justify-between border-b border-white/10 pb-4"
                >
                    <div className="flex items-center gap-2">
                         <CpuChipIcon className="w-5 h-5 text-cyan-500" />
                         <span className="text-sm font-mono text-cyan-500">SYSTEM_NAV</span>
                    </div>
                    <span className="text-xs text-zinc-600 font-mono">v.2.0.4</span>
                </motion.div>

                {/* Links List */}
                <motion.div 
                    variants={containerVars}
                    initial="initial"
                    animate="open"
                    exit="initial"
                    className="flex flex-col gap-1"
                >
                {navLinks.map((link) => (
                    <div key={link.name} className="overflow-hidden">
                        <motion.a
                            variants={mobileLinkVars}
                            href={link.href}
                            onClick={(e) => handleScrollTo(e, link.href)}
                            className="group flex items-center justify-between py-3 cursor-pointer"
                        >
                            <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 to-zinc-700 group-hover:from-white group-hover:to-cyan-200 transition-all duration-300 tracking-tighter uppercase">
                              {link.name}
                            </span>
                            <div className="relative">
                                <ArrowRightIcon className="w-6 h-6 text-zinc-800 group-hover:text-cyan-400 group-hover:-rotate-45 transition-all duration-500" />
                                <div className="absolute inset-0 bg-cyan-400 blur-lg opacity-0 group-hover:opacity-50 transition-opacity" />
                            </div>
                        </motion.a>
                    </div>
                ))}
                </motion.div>

                {/* Footer Status */}
                <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ delay: 0.8 }}
                    className="text-center"
                >
                    <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400">All Systems Nominal</span>
                    </div>
                </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}