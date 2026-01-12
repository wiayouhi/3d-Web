"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowUpRightIcon, 
  CpuChipIcon, 
  CodeBracketIcon,
  MusicalNoteIcon,
  MoonIcon,
  SunIcon,
  NoSymbolIcon
} from "@heroicons/react/24/outline";
import { SiDiscord, SiGithub, SiInstagram } from "@icons-pack/react-simple-icons"; // หรือใช้ icon เดิมก็ได้
import Image from "next/image";

// --- ICONS (ใช้ชุดเดิมของคุณได้เลย หรือจะใช้ lib ก็ได้) ---
const GithubIcon = ({ className }: { className?: string }) => (
  <svg fill="currentColor" viewBox="0 0 24 24" className={className}>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg fill="currentColor" viewBox="0 0 24 24" className={className}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.85-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const DiscordIcon = ({ className }: { className?: string }) => (
  <svg fill="currentColor" viewBox="0 0 24 24" className={className}>
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037 14.156 14.156 0 0 0-.648 1.332 18.337 18.337 0 0 0-5.41 0 14.136 14.136 0 0 0-.65-1.332.073.073 0 0 0-.078-.037 19.742 19.742 0 0 0-4.888 1.515.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.118.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-2.313-9.111-6.197-13.633a.075.075 0 0 0-.033-.027ZM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.956 2.419-2.157 2.419Zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.946 2.419-2.157 2.419Z" />
  </svg>
);

interface FooterProps {
    discordUserId?: string;
}

export default function Footer({ discordUserId = "902739412172046427" }: FooterProps) { 
  const [lanyardData, setLanyardData] = useState<any>(null);

  useEffect(() => {
    if (!discordUserId) return;
    const fetchLanyard = async () => {
        try {
            const res = await fetch(`https://api.lanyard.rest/v1/users/${discordUserId}`);
            const data = await res.json();
            if (data.success) setLanyardData(data.data);
        } catch (error) { console.error("Lanyard Error:", error); }
    };
    fetchLanyard();
    const interval = setInterval(fetchLanyard, 30000); 
    return () => clearInterval(interval);
  }, [discordUserId]);

  // Status Configuration
  const getStatusConfig = (status: string) => {
      switch(status) {
          case 'online': return { color: 'bg-emerald-500', glow: 'shadow-emerald-500/50', border: 'group-hover:border-emerald-500/50', label: 'Online', icon: <SunIcon className="w-3 h-3" /> };
          case 'idle': return { color: 'bg-amber-400', glow: 'shadow-amber-400/50', border: 'group-hover:border-amber-400/50', label: 'Away', icon: <MoonIcon className="w-3 h-3" /> };
          case 'dnd': return { color: 'bg-rose-500', glow: 'shadow-rose-500/50', border: 'group-hover:border-rose-500/50', label: 'DND', icon: <NoSymbolIcon className="w-3 h-3" /> };
          default: return { color: 'bg-zinc-500', glow: 'shadow-zinc-500/20', border: 'group-hover:border-zinc-700', label: 'Offline', icon: <div className="w-2 h-2 rounded-full border border-zinc-800" /> };
      }
  };

  const status = getStatusConfig(lanyardData?.discord_status || 'offline');
  const activity = lanyardData?.activities?.[0];
  const isSpotify = activity?.name === 'Spotify';

  return (
    <footer className="w-full bg-black relative overflow-hidden pt-20 pb-10">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-cyan-900/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8">
          
          {/* LEFT: Logo & Info */}
          <div className="md:col-span-5 flex flex-col justify-between h-full">
            <div>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 mb-6"
                >
                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 backdrop-blur-sm">
                        <CpuChipIcon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white">INSIDE MACHINE</span>
                </motion.div>
                
                <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
                    Bridging the gap between conceptual geometry and interactive experiences. 
                    Creating digital artifacts that breathe.
                </p>
            </div>
            
            <div className="mt-8 flex gap-2">
                 {['React', 'Three.js', 'Next.js'].map(tech => (
                     <span key={tech} className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] text-zinc-400 font-medium tracking-wide">
                        {tech}
                     </span>
                 ))}
            </div>
          </div>

          {/* RIGHT: Clean Discord Card */}
          <div className="md:col-span-7 flex flex-col md:items-end gap-6">
            
            {/* Main Card */}
            <motion.a 
                href={`https://discord.com/users/${discordUserId}`}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -5 }}
                className={`group relative w-full md:w-[420px] bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-3xl p-5 transition-all duration-500 ${status.border}`}
            >
                {/* Status Glow Background */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 bg-gradient-to-br from-white/10 to-transparent rounded-3xl`} />
                
                <div className="flex items-center gap-5 relative z-10">
                    
                    {/* Avatar with Animated Status Ring */}
                    <div className="relative shrink-0">
                         {/* Pulsing Ring */}
                        <div className={`absolute inset-0 rounded-full blur-md opacity-40 group-hover:opacity-70 transition-opacity ${status.color}`} />
                        
                        <div className={`relative w-20 h-20 rounded-full p-[3px] bg-gradient-to-tr from-zinc-800 to-black`}>
                             <div className="w-full h-full rounded-full overflow-hidden relative bg-zinc-800">
                                {lanyardData ? (
                                    <Image 
                                        src={`https://cdn.discordapp.com/avatars/${lanyardData.discord_user.id}/${lanyardData.discord_user.avatar}.png`}
                                        alt="User"
                                        width={80}
                                        height={80}
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-zinc-800 animate-pulse" />
                                )}
                             </div>
                             {/* Status Badge */}
                             <div className={`absolute bottom-0 right-0 w-6 h-6 bg-black rounded-full flex items-center justify-center border-2 border-black z-20`}>
                                 <div className={`w-3 h-3 rounded-full ${status.color} ${status.glow}`} />
                             </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                            <div>
                                <h3 className="text-white font-bold text-lg truncate">
                                    {lanyardData?.discord_user.username || "Loading..."}
                                </h3>
                                <p className="text-xs text-zinc-500 font-medium flex items-center gap-1.5">
                                    {status.icon}
                                    <span className="uppercase tracking-wider">{status.label}</span>
                                </p>
                            </div>
                            <div className="p-2 bg-white/5 rounded-full text-zinc-400 group-hover:text-white group-hover:bg-white/10 transition-colors">
                                <ArrowUpRightIcon className="w-4 h-4" />
                            </div>
                        </div>

                        {/* Activity Separator */}
                        <div className="h-px w-full bg-white/5 my-3 group-hover:bg-white/10 transition-colors" />

                        {/* Live Activity */}
                        <div className="flex items-center gap-3">
                             {isSpotify ? (
                                 <div className="flex items-center gap-3 w-full">
                                     <div className="w-10 h-10 rounded-lg bg-[#1DB954]/20 flex items-center justify-center shrink-0">
                                         <MusicalNoteIcon className="w-5 h-5 text-[#1DB954]" />
                                     </div>
                                     <div className="flex-1 min-w-0">
                                         <p className="text-xs text-zinc-400 mb-0.5">Listening to Spotify</p>
                                         <p className="text-xs text-white font-medium truncate">{activity.details}</p>
                                     </div>
                                     {/* Equalizer Animation */}
                                     <div className="flex gap-0.5 items-end h-4 pb-1">
                                         <motion.div animate={{ height: [4, 12, 6, 14, 4] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-1 bg-[#1DB954] rounded-full" />
                                         <motion.div animate={{ height: [8, 4, 12, 5, 8] }} transition={{ repeat: Infinity, duration: 0.9 }} className="w-1 bg-[#1DB954] rounded-full" />
                                         <motion.div animate={{ height: [5, 10, 4, 12, 5] }} transition={{ repeat: Infinity, duration: 0.7 }} className="w-1 bg-[#1DB954] rounded-full" />
                                     </div>
                                 </div>
                             ) : activity ? (
                                 <div className="flex items-center gap-3">
                                     <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center shrink-0">
                                         <CodeBracketIcon className="w-5 h-5 text-blue-400" />
                                     </div>
                                     <div className="min-w-0">
                                         <p className="text-xs text-zinc-400 mb-0.5">Current Activity</p>
                                         <p className="text-xs text-white font-medium truncate">{activity.name}</p>
                                     </div>
                                 </div>
                             ) : (
                                 <p className="text-xs text-zinc-600 italic">No active signal detected.</p>
                             )}
                        </div>
                    </div>
                </div>
            </motion.a>

            {/* Social Buttons (Minimalist) */}
            <div className="flex gap-3">
                <SocialPill href="https://github.com/wiayouhi" icon={<GithubIcon className="w-4 h-4" />} label="GitHub" />
                <SocialPill href="https://instagram.com/thanawat.wia" icon={<InstagramIcon className="w-4 h-4" />} label="Instagram" />
                <SocialPill href={`https://discord.com/users/${discordUserId}`} icon={<DiscordIcon className="w-4 h-4" />} label="Discord" />
            </div>

          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="mt-20 border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-500 font-medium">
            <p>© 2024 Thanawat. All Rights Reserved.</p>
            <p className="hover:text-white transition-colors cursor-pointer">Designed & Built by Human</p>
        </div>

      </div>
    </footer>
  );
}

// Minimal Social Button Component
const SocialPill = ({ href, icon, label }: { href: string, icon: any, label: string }) => (
    <a 
        href={href} 
        target="_blank" 
        rel="noreferrer"
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600 hover:bg-zinc-800 transition-all duration-300 text-xs font-medium"
    >
        {icon}
        <span>{label}</span>
    </a>
);