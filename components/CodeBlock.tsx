"use client";

import { motion } from "framer-motion";
import { 
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, 
  SiPostgresql, SiPrisma, SiDocker, SiFigma, SiGithub, SiVercel, SiFramer
} from "react-icons/si";

const technologies = [
  { name: "React", color: "#61DAFB", icon: SiReact },
  { name: "Next.js", color: "#FFFFFF", icon: SiNextdotjs },
  { name: "TypeScript", color: "#3178C6", icon: SiTypescript },
  { name: "Tailwind", color: "#38B2AC", icon: SiTailwindcss },
  { name: "Framer", color: "#0055FF", icon: SiFramer },
  { name: "Node.js", color: "#339933", icon: SiNodedotjs },
  { name: "PostgreSQL", color: "#4169E1", icon: SiPostgresql },
  { name: "Prisma", color: "#2D3748", icon: SiPrisma },
  { name: "Docker", color: "#2496ED", icon: SiDocker },
  { name: "Figma", color: "#F24E1E", icon: SiFigma },
  { name: "GitHub", color: "#FFFFFF", icon: SiGithub },
  { name: "Vercel", color: "#FFFFFF", icon: SiVercel },
];

export default function TechMarquee() {
  const marqueeItems = [...technologies, ...technologies, ...technologies];

  return (
    // แก้ไข className ตรงนี้: เพิ่ม w-screen left-1/2 -translate-x-1/2
    <section className="relative w-screen left-1/2 -translate-x-1/2 py-20 bg-zinc-950 overflow-hidden border-y border-white/5">
      
      {/* --- Background Effects --- */}
      <div className="absolute inset-0 opacity-[0.05]" 
           style={{ 
             backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', 
             backgroundSize: '40px 40px' 
           }}>
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#09090b_100%)] pointer-events-none z-10" />
    
      {/* --- Marquee Container --- */}
      <div className="relative flex overflow-hidden group/track">
        
        {/* Gradients ด้านข้าง */}
        <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-zinc-950 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-zinc-950 to-transparent z-20 pointer-events-none" />

        {/* The Moving Track */}
        <motion.div
          className="flex gap-8 md:gap-12 min-w-max py-4"
          animate={{ x: "-33.33%" }} 
          transition={{ 
            duration: 30, 
            ease: "linear", 
            repeat: Infinity 
          }}
        >
          {marqueeItems.map((tech, index) => (
            <div 
                key={`${tech.name}-${index}`} 
                className="group/item relative flex flex-col items-center justify-center w-24 md:w-32 aspect-square cursor-pointer"
            >
              {/* Card Background */}
              <div 
                className="absolute inset-0 bg-white/5 rounded-xl border border-white/5 transition-all duration-500 group-hover/item:border-white/20 group-hover/item:bg-white/10"
                style={{ backdropFilter: "blur(2px)" }}
              />
              
              {/* Glow Effect */}
              <div 
                className="absolute inset-0 opacity-0 group-hover/item:opacity-40 transition-opacity duration-500 rounded-xl blur-xl"
                style={{ backgroundColor: tech.color }}
              />

              {/* Icon */}
              <div className="relative z-10 transition-transform duration-300 group-hover/item:-translate-y-2">
                <tech.icon 
                    className="text-4xl md:text-5xl text-zinc-600 transition-all duration-500 group-hover/item:text-white"
                    style={{ filter: "drop-shadow(0 0 0 transparent)" }}
                />
              </div>

              {/* Text Label */}
              <span 
                className="absolute bottom-3 text-[10px] md:text-xs font-bold tracking-wider opacity-0 transform translate-y-2 transition-all duration-300 group-hover/item:opacity-100 group-hover/item:translate-y-0"
                style={{ color: tech.color }}
              >
                {tech.name}
              </span>

              {/* Bottom Line */}
              <div 
                className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 bg-current transition-all duration-500 group-hover/item:w-1/2 rounded-full shadow-[0_0_10px_currentColor]"
                style={{ color: tech.color }}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}