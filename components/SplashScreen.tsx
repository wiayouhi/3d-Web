"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Zap, Cpu, Wifi, Radio } from 'lucide-react';

// --- GIF URL ---
const ANIMATION_GIF_URL = "https://media.tenor.com/1rkyTODR2qQAAAAj/rikka-takanashi-takanashi-rikka.gif"; 

// --- Component: มุมกรอบ (Corner Accents) เพื่อความเท่ ---
const CornerAccents = () => (
  <>
    <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-zinc-500 rounded-tl-sm" />
    <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-zinc-500 rounded-tr-sm" />
    <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-zinc-500 rounded-bl-sm" />
    <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-zinc-500 rounded-br-sm" />
  </>
);

// --- Component: หลอดโหลด (Progress Bar) ---
const TechProgressBar = ({ progress }: { progress: number }) => {
    return (
        <div className="w-full mt-4">
            <div className="flex justify-between text-[10px] text-zinc-500 font-mono mb-1 uppercase tracking-wider">
                <span>System Sync</span>
                <span>{progress}%</span>
            </div>
            <div className="h-1.5 w-full bg-zinc-900 border border-zinc-800 relative overflow-hidden rounded-sm">
                <motion.div 
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: "linear", duration: 0.2 }}
                    className="h-full bg-zinc-100 relative"
                >
                    {/* Sparkle effect on bar */}
                    <div className="absolute right-0 top-0 bottom-0 w-2 bg-white shadow-[0_0_10px_white]"></div>
                </motion.div>
            </div>
        </div>
    );
};

// --- Component: ข้อมูลจำลอง (System Info Grid) ---
// ส่วนนี้ช่วยให้ UI ดูเต็มและใช้พื้นที่คุ้มค่า
const SystemInfo = () => (
    <div className="grid grid-cols-3 gap-2 w-full mt-6 pt-6 border-t border-zinc-800/50 opacity-60">
        <div className="flex flex-col gap-1 items-center">
            <Cpu size={14} className="text-zinc-400" />
            <span className="text-[9px] text-zinc-600 font-mono">CPU: OK</span>
        </div>
        <div className="flex flex-col gap-1 items-center border-l border-r border-zinc-800/30">
            <Wifi size={14} className="text-zinc-400" />
            <span className="text-[9px] text-zinc-600 font-mono">NET: 1GB</span>
        </div>
        <div className="flex flex-col gap-1 items-center">
            <Zap size={14} className="text-zinc-400" />
            <span className="text-[9px] text-zinc-600 font-mono">PWR: 98%</span>
        </div>
    </div>
);

// --- Main Splash Screen ---
export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);
  const [logText, setLogText] = useState("> Initializing...");

  useEffect(() => {
    // จำลอง Log ข้อความวิ่งๆ
    const logs = [
        "> Connecting to server...",
        "> Verifying user identity...",
        "> Loading assets [||||||....]",
        "> Optimization complete.",
        "> Starting application..."
    ];
    let logIndex = 0;
    
    // จำลอง Progress Bar
    const interval = setInterval(() => {
        setProgress((prev) => {
            if (prev >= 100) {
                clearInterval(interval);
                return 100;
            }
            // เปลี่ยน log ตามช่วง %
            if (prev % 20 === 0 && logIndex < logs.length) {
                setLogText(logs[logIndex]);
                logIndex++;
            }
            return prev + 1; // ความเร็วในการโหลด
        });
    }, 40); // 40ms * 100 = 4000ms (4 วินาที)

    const timer = setTimeout(() => {
      setShow(false);
    }, 4500);

    return () => {
        clearTimeout(timer);
        clearInterval(interval);
    }
  }, []);

  return (
    <AnimatePresence mode='wait'>
        {show && (
            <motion.div
            key="splash-dark-ui"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            onAnimationComplete={() => onFinish()}
            className="fixed inset-0 z-[9999] bg-[#050505] text-zinc-100 font-sans flex flex-col overflow-hidden"
            >
                {/* --- Background Elements --- */}
                {/* Noise Texture */}
                <div className="absolute inset-0 opacity-15 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] contrast-125 brightness-75"></div>
                {/* Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>

                {/* --- Mobile Status Bar Mockup (Top) --- */}
                <div className="w-full flex justify-between items-center px-6 py-4 text-xs font-mono text-zinc-600 relative z-20">
                    <span className="flex items-center gap-2"><Radio size={12} className="animate-pulse text-green-500"/> SYSTEM ONLINE</span>
                    <span>v.2.0.4</span>
                </div>

                {/* --- Main Content Area (Center) --- */}
                <div className="flex-1 flex flex-col items-center justify-center p-6 relative z-10 w-full max-w-lg mx-auto md:max-w-2xl">
                    
                    {/* Main Card Panel */}
                    <motion.div 
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="relative w-full bg-zinc-900/40 backdrop-blur-md border border-zinc-800 p-6 md:p-8 rounded-lg shadow-2xl"
                    >
                        <CornerAccents />

                        {/* Layout: Desktop (Side-by-side) / Mobile (Stacked) */}
                        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                            
                            {/* Left: Image Area */}
                            <div className="w-full md:w-1/2 relative group">
                                <div className="absolute inset-0 bg-zinc-800/50 rounded-md transform rotate-1 group-hover:rotate-0 transition-transform"></div>
                                <div className="relative bg-black border border-zinc-700 rounded-md overflow-hidden shadow-inner p-1">
                                     {/* Scanline Overlay */}
                                     <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] opacity-20 pointer-events-none z-20"></div>
                                     
                                     {/* Image */}
                                    <img 
                                        src={ANIMATION_GIF_URL} 
                                        alt="Loading" 
                                        className="w-full h-auto object-contain grayscale contrast-125 block relative z-10 min-h-[180px]"
                                    />
                                </div>
                            </div>

                            {/* Right: Text & Progress */}
                            <div className="w-full md:w-1/2 flex flex-col">
                                <h1 className="text-3xl md:text-4xl font-bold tracking-tighter text-white mb-1">
                                    LOADING
                                </h1>
                                <p className="text-[10px] md:text-xs text-zinc-500 font-mono tracking-[0.2em] mb-4">
                                    INITIALIZING INTERFACE...
                                </p>

                                {/* Terminal Log (ข้อความวิ่งๆ) */}
                                <div className="h-6 overflow-hidden mb-2">
                                    <motion.p 
                                        key={logText}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="text-xs font-mono text-zinc-400"
                                    >
                                        {logText}
                                    </motion.p>
                                </div>

                                <TechProgressBar progress={progress} />
                                
                                {/* Desktop Only Details */}
                                <div className="hidden md:block">
                                    <SystemInfo />
                                </div>
                            </div>
                        </div>

                        {/* Mobile Only Details (Moved down) */}
                        <div className="block md:hidden">
                            <SystemInfo />
                        </div>

                    </motion.div>
                </div>

                {/* --- Bottom Footer Status --- */}
                <div className="w-full text-center py-6 text-[10px] text-zinc-700 font-mono tracking-widest uppercase">
                    SECURE CONNECTION ESTABLISHED • ID: 8X-992
                </div>

            </motion.div>
        )}
    </AnimatePresence>
  );
}