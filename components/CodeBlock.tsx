"use client";

import React from "react";
// ถ้ายังไม่มี icon ให้ติดตั้ง: npm install react-icons
import { SiTypescript } from "react-icons/si"; 

// Interface นี้สำคัญมาก ทำให้ TypeScript รู้จัก props
interface CodeBlockProps {
  code: string;
  filename?: string;
  language?: string;
}

export default function CodeBlock({ 
  code, 
  filename = "Example.tsx", 
  language = "TSX" 
}: CodeBlockProps) {
  
  return (
    <div className="rounded-xl overflow-hidden bg-[#0d1117] border border-white/10 shadow-2xl group text-left my-4">
      
      {/* Header Bar (เลียนแบบ VS Code) */}
      <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
        <div className="flex items-center gap-2">
          {/* ปุ่มสีๆ (Window Controls) */}
          <div className="flex gap-1.5 mr-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          
          {/* ชื่อไฟล์ */}
          <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono bg-black/20 px-2 py-1 rounded border border-white/5">
            <SiTypescript className="text-blue-400" />
            {filename}
          </div>
        </div>
        
        <span className="text-[10px] text-zinc-600 font-bold tracking-wider">{language}</span>
      </div>

      {/* Code Area */}
      <div className="p-4 overflow-x-auto custom-scrollbar">
        <pre className="font-mono text-sm leading-relaxed">
          <code className="text-zinc-300">
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
}
