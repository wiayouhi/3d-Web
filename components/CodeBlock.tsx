"use client";

import { motion } from "framer-motion";
// Import โลโก้สวยๆ จาก react-icons (หมวด Simple Icons)
import { 
  SiReact, 
  SiNextdotjs, 
  SiTypescript, 
  SiTailwindcss, 
  SiNodedotjs, 
  SiPostgresql, 
  SiPrisma, 
  SiDocker, 
  SiFigma, 
  SiGithub, 
  SiVercel,
  SiFramer
} from "react-icons/si";

// กำหนดข้อมูล: ชื่อ, สีแบรนด์, และ Component ไอคอน
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
  // สร้าง Array ซ้ำเพื่อให้ Loop เนียนๆ
  const marqueeItems = [...technologies, ...technologies];

  return (
    <div className="w-full py-10 bg-[#050505] border-y border-white/5 relative overflow-hidden">
      
      {/* Label เล็กๆ ด้านบน */}
      <div className="absolute left-0 top-0 bg-zinc-900/80 px-3 py-1 text-[10px] tracking-widest text-zinc-500 font-mono border-b border-r border-white/5 z-20 backdrop-blur-sm">
        TECH STACK
      </div>

      {/* Gradient Fade Edges (เงาบังขอบซ้ายขวา) */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

      {/* Marquee Track */}
      <div className="flex overflow-hidden my-4">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{
            duration: 30, // ความเร็วในการเลื่อน (ยิ่งมากยิ่งช้า)
            ease: "linear",
            repeat: Infinity,
          }}
          className="flex gap-12 md:gap-20 px-10 min-w-max"
        >
          {marqueeItems.map((tech, index) => (
            <div
              key={`${tech.name}-${index}`}
              className="group flex flex-col items-center justify-center gap-4 cursor-default"
            >
              {/* Icon Wrapper */}
              <div 
                className="relative flex items-center justify-center transition-all duration-300 transform group-hover:-translate-y-1"
              >
                {/* ไอคอน */}
                <tech.icon 
                    className="text-4xl md:text-5xl text-zinc-600 transition-all duration-300 group-hover:text-[var(--brand-color)] group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                    // ส่งค่าสีเข้าไปผ่าน CSS Variable เพื่อให้ Tailwind class ข้างบนทำงานได้
                    style={{ "--brand-color": tech.color } as React.CSSProperties}
                />
              </div>

              {/* Name (แสดงเมื่อ Hover) */}
              <span 
                className="text-[10px] md:text-xs font-medium tracking-widest text-zinc-500 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                style={{ color: tech.color }}
              >
                {tech.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}