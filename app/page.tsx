"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ModelViewer from "@/components/ModelViewer";
import CodeBlock from "@/components/CodeBlock";
import SplashScreen from "@/components/SplashScreen";

import { 
  motion, 
  AnimatePresence, 
  useMotionValue, 
  useMotionTemplate,
} from "framer-motion";
import { 
  ArrowsPointingOutIcon, 
  XMarkIcon, 
  CubeTransparentIcon, 
  InformationCircleIcon, 
  PlusIcon, 
  UserCircleIcon,
} from "@heroicons/react/24/outline";

// --- Sample Code Data ---
const codeSnippet = `import { Canvas } from "@react-three/fiber";
import { useGLTF, Stage, PresentationControls } from "@react-three/drei";

function Model3D({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return (
    <Canvas dpr={[1, 2]} shadows camera={{ fov: 45 }}>
      <Stage environment="city" intensity={0.6}>
        <primitive object={scene} />
      </Stage>
    </Canvas>
  );
}`;

// --- Data Sections with Themes ---
const sections = [
  {
    id: 1,
    title: "Vase",
    subtitle: "Decor • Aesthetic",
    desc: "แจกันรูปทรงสวยงาม สำหรับจัดดอกไม้หรือวางประดับเพื่อเพิ่มสุนทรียภาพ",
    fullDesc: "แจกันเปรียบเสมือนงานศิลปะที่ช่วยเติมเต็มบรรยากาศในห้อง รูปทรงโค้งมนและวัสดุที่เลือกใช้ช่วยสะท้อนรสนิยม และนำความสดชื่นจากธรรมชาติเข้ามาสู่พื้นที่อยู่อาศัย",
    modelUrl: "/models/vase.glb", 
    imgUrl: "/1.png",
    themeColor: "from-emerald-900/40 via-zinc-950 to-black",
    accentColor: "rgba(16, 185, 129, 0.2)",
    shape: "circle"
  },
  {
    id: 2,
    title: "Geometry",
    subtitle: "Form • Abstract",
    desc: "วัตถุรูปทรงเรขาคณิต พื้นฐานแห่งการออกแบบที่เน้นความเรียบง่ายและสมดุล",
    fullDesc: "รูปทรงเรขาคณิต (Geometric Shapes) เป็นรากฐานของงานดีไซน์สามมิติ การจัดวางรูปทรงต่างๆ เช่น ทรงกลมหรือลูกบาศก์ ช่วยสร้างมิติของแสงและเงาที่น่าสนใจในงานศิลป์",
    modelUrl: "/models/geometry.glb", 
    imgUrl: "/2.png",
    themeColor: "from-indigo-900/40 via-zinc-950 to-black",
    accentColor: "rgba(99, 102, 241, 0.2)",
    shape: "square"
  },
  {
    id: 3,
    title: "Chair",
    subtitle: "Seat • Comfort",
    desc: "เก้าอี้ดีไซน์ทันสมัย ออกแบบตามหลักสรีรศาสตร์เพื่อการพักผ่อนที่สมบูรณ์",
    fullDesc: "เก้าอี้ไม่ได้มีไว้เพียงเพื่อนั่ง แต่คือเฟอร์นิเจอร์ชิ้นเอกที่ผสมผสานฟังก์ชันเข้ากับความงาม การเลือกเก้าอี้ที่ดีช่วยรองรับร่างกายและสร้างจุดดึงดูดสายตาภายในห้อง",
    modelUrl: "/models/chair.glb",
    imgUrl: "/3.png",
    themeColor: "from-orange-900/30 via-zinc-950 to-black",
    accentColor: "rgba(249, 115, 22, 0.2)",
    shape: "glow"
  },
  {
    id: 4,
    title: "Glass",
    subtitle: "Drinkware • Clear",
    desc: "แก้วน้ำใสสะอาด สะท้อนความบริสุทธิ์และการใช้งานที่เรียบง่าย",
    fullDesc: "แก้วน้ำรูปทรงเพรียวบาง ออกแบบมาให้จับถนัดมือ ความใสของวัสดุช่วยขับเน้นสีสันของเครื่องดื่ม และสะท้อนแสงไฟระยิบระยับเพิ่มความหรูหราบนโต๊ะอาหาร",
    modelUrl: "/models/glass.glb",
    imgUrl: "/4.png",
    themeColor: "from-cyan-900/30 via-zinc-950 to-black",
    accentColor: "rgba(6, 182, 212, 0.2)",
    shape: "triangle"
  },
  {
    id: 5,
    title: "Lamp",
    subtitle: "Light • Ambience",
    desc: "โคมไฟตั้งโต๊ะ แหล่งกำเนิดแสงที่ช่วยสร้างบรรยากาศอบอุ่นและนุ่มนวล",
    fullDesc: "โคมไฟทำหน้าที่ 'ระบายสีด้วยแสง' ให้กับห้อง ช่วยปรับเปลี่ยนอารมณ์จากความเคร่งขรึมเป็นความผ่อนคลาย เหมาะสำหรับการอ่านหนังสือหรือสร้างมุมพักผ่อนส่วนตัว",
    modelUrl: "/models/lamp.glb",
    imgUrl: "/5.png",
    themeColor: "from-yellow-900/20 via-zinc-950 to-black",
    accentColor: "rgba(234, 179, 8, 0.2)",
    shape: "glow"
  },
  {
    id: 6,
    title: "Table",
    subtitle: "Surface • Center",
    desc: "โต๊ะทำงานหรือโต๊ะกลาง พื้นที่ราบเรียบสำหรับวางสิ่งของและเชื่อมโยงกิจกรรม",
    fullDesc: "โต๊ะคือศูนย์กลางของการใช้งานในพื้นที่ ไม่ว่าจะใช้วางของโชว์หรือทำงาน โครงสร้างที่แข็งแรงและพื้นผิวที่กว้างขวางช่วยรองรับทุกกิจกรรมได้อย่างมั่นคง",
    modelUrl: "/models/table.glb",
    imgUrl: "/6.png",
    themeColor: "from-stone-900/40 via-zinc-950 to-black",
    accentColor: "rgba(120, 113, 108, 0.2)",
    shape: "line"
  },
];


// --- Animation Config ---
const containerVariants =  {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
}; 

const itemVariants =  {
  hidden: { x: -30, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 60, damping: 12 } }
};

// --- Decorative Components ---
const TechDecoration = () => (
    <div className="absolute inset-0 pointer-events-none hidden md:block opacity-20 z-10">
        <PlusIcon className="absolute top-8 left-8 w-4 h-4 text-zinc-500" />
        <PlusIcon className="absolute top-8 right-8 w-4 h-4 text-zinc-500" />
        <PlusIcon className="absolute bottom-8 left-8 w-4 h-4 text-zinc-500" />
        <PlusIcon className="absolute bottom-8 right-8 w-4 h-4 text-zinc-500" />
    </div>
);

// --- DYNAMIC BACKGROUND COMPONENT ---
const SectionBackground = ({ themeColor, shape }: { themeColor: string, accentColor?: string, shape: string }) => {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
             {/* 1. Base Gradient Theme */}
            <div className={`absolute inset-0 bg-gradient-to-br ${themeColor} opacity-60`}></div>
            
            {/* 2. Animated Floating Shapes */}
            <div className="absolute inset-0 opacity-30 mix-blend-screen">
                {shape === 'circle' && (
                    <>
                        <motion.div 
                            animate={{ y: [0, -50, 0], x: [0, 20, 0], scale: [1, 1.2, 1] }} 
                            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-500/20 rounded-full blur-[80px]" 
                        />
                        <motion.div 
                            animate={{ y: [0, 60, 0], x: [0, -30, 0] }} 
                            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                            className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-[100px]" 
                        />
                    </>
                )}

                {shape === 'square' && (
                    <>
                        <motion.div 
                            animate={{ rotate: 360 }} 
                            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                            className="absolute top-20 right-20 w-40 h-40 border border-indigo-500/30 blur-[2px]" 
                        />
                         <motion.div 
                            animate={{ rotate: -360, scale: [1, 1.5, 1] }} 
                            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                            className="absolute bottom-20 left-20 w-60 h-60 border border-purple-500/20 blur-[4px]" 
                        />
                         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] opacity-10"></div>
                    </>
                )}

                 {shape === 'glow' && (
                    <motion.div 
                        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }} 
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/10 rounded-full blur-[120px]" 
                    />
                )}

                {shape === 'triangle' && (
                    <>
                         <motion.div 
                            animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
                            transition={{ duration: 8, repeat: Infinity }}
                            className="absolute top-1/3 left-1/3 w-0 h-0 border-l-[50px] border-l-transparent border-b-[100px] border-b-cyan-500/20 border-r-[50px] border-r-transparent blur-md"
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px]"></div>
                    </>
                )}
                
                {shape === 'line' && (
                     <div className="absolute inset-0 flex justify-between opacity-20">
                         {[...Array(5)].map((_, i) => (
                             <motion.div 
                                key={i}
                                className="w-[1px] h-full bg-gradient-to-b from-transparent via-stone-500 to-transparent"
                                animate={{ height: ['0%', '100%', '0%'], top: ['0%', '0%', '100%'] }}
                                transition={{ duration: 5 + i, repeat: Infinity, ease: "linear", delay: i }}
                             />
                         ))}
                     </div>
                )}
            </div>
            
            {/* Global Noise Overlay */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay"></div>
        </div>
    );
}

// --- MAIN COMPONENT ---
export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [readMoreId, setReadMoreId] = useState<number | null>(null);
  const [expandedImgUrl, setExpandedImgUrl] = useState<string | null>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ clientX, clientY }: React.MouseEvent) {
    if (!isLoading) {
        mouseX.set(clientX);
        mouseY.set(clientY);
    }
  }

  useEffect(() => {
    if (isLoading) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'unset';
    }
  }, [isLoading]);

  const expandedItem = sections.find(item => item.id === expandedId);
  const readMoreItem = sections.find(item => item.id === readMoreId);

  return (
    <>
      <AnimatePresence>
        {isLoading && <SplashScreen onFinish={() => setIsLoading(false)} />}
      </AnimatePresence>

      <div 
        onMouseMove={handleMouseMove}
        className={`h-[100dvh] w-full overflow-y-scroll snap-y snap-mandatory bg-black text-white scroll-smooth no-scrollbar relative selection:bg-white/30 selection:text-black transition-opacity duration-1000 ${isLoading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
      
        {/* ================= HERO SECTION ================= */}
        <section className="h-[100dvh] w-full snap-start relative flex flex-col items-center justify-center overflow-hidden px-4 text-center z-10 bg-black">
             {/* Hero Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                 <motion.div 
                    className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/20 blur-[150px]"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 10, repeat: Infinity }}
                 />
                 <motion.div 
                    className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/20 blur-[150px]"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 8, repeat: Infinity, delay: 1 }}
                 />
                 {/* Hero Spotlight */}
                 <motion.div
                    className="absolute -inset-px opacity-30"
                    style={{
                        background: useMotionTemplate`
                            radial-gradient(
                                600px circle at ${mouseX}px ${mouseY}px,
                                rgba(255, 255, 255, 0.1),
                                transparent 80%
                            )
                        `,
                    }}
                />
            </div>
            
            {/* Hero Content */}
            <motion.div variants={containerVariants} initial="hidden" animate={!isLoading ? "visible" : "hidden"} className="relative z-10">
                <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 mb-8 border border-zinc-800 rounded-full bg-zinc-900/50 backdrop-blur group hover:border-zinc-600 transition-colors cursor-default">
                    <CubeTransparentIcon className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
                    <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] text-zinc-400 uppercase group-hover:text-white transition-colors">Interactive 3D Experience</span>
                </motion.div>
                
                <h1 className="text-5xl md:text-[10rem] font-black tracking-tighter text-white mb-6 leading-[0.85]">
                    <motion.span variants={itemVariants} className="block text-zinc-600">Sketchup</motion.span>
                    <motion.span variants={itemVariants} className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-800">
                    Models
                    </motion.span>
                </h1>
                
                <motion.p variants={itemVariants} className="text-zinc-500 text-sm md:text-xl font-light max-w-xs md:max-w-2xl mx-auto leading-relaxed">
                    ---- Sketchup ---- <br className="hidden md:block"/> เก้าอี้ โต๊ะ แจกัน แก้ว โคมไฟ และรูปทรงเรขาคณิตสามมิติ ที่คุณสามารถหมุน ดูรายละเอียด และโต้ตอบได้อย่างอิสระ
                </motion.p>
            </motion.div>

            {/* SCROLL INDICATOR: Modern Mouse Style */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={!isLoading ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 2.5, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20 cursor-pointer group"
                onClick={() => document.getElementById('creator')?.scrollIntoView({ behavior: 'smooth' })}
            >
                <span className="text-[10px] md:text-xs font-bold tracking-[0.4em] text-zinc-500 uppercase group-hover:text-white transition-colors duration-300">
                    Scroll to Explore
                </span>
                <div className="w-[26px] h-[42px] rounded-full border-2 border-zinc-700 flex justify-center pt-2 backdrop-blur-sm bg-black/20 group-hover:border-white/50 transition-colors duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                    <motion.div
                        animate={{ 
                            y: [0, 8, 0],
                            opacity: [1, 0, 1]
                        }}
                        transition={{ 
                            duration: 1.5, 
                            repeat: Infinity, 
                            ease: "easeInOut" 
                        }}
                        className="w-1 h-2 bg-white rounded-full shadow-[0_0_5px_white]"
                    />
                </div>
                <div className="flex flex-col items-center -mt-1 space-y-[-6px] opacity-50">
                    <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}>
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </motion.div>
                </div>
            </motion.div>
        </section>

        {/* --- CREDITS / SUBMISSION SECTION --- */}
        <section id="creator" className="h-[100dvh] w-full snap-start relative flex flex-col md:flex-row overflow-hidden border-t border-zinc-900 z-10 bg-zinc-950">
            <TechDecoration />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:50px_50px] pointer-events-none"></div>

            {/* Left: Text Details */}
            <div className="h-[50%] md:h-full w-full md:w-[50%] relative z-20 flex flex-col justify-center px-8 md:px-24 bg-gradient-to-b from-transparent to-black/50 md:border-r border-zinc-800/50">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    variants={containerVariants}
                    className="relative space-y-6"
                >
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <UserCircleIcon className="w-5 h-5 text-zinc-500" />
                            <span className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-500">Project Submission</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mt-2">
                            Thanawat Nuanchan
                        </h2>
                    </div>

                    <div className="space-y-6 text-zinc-300 pt-4">
                        <div className="border-l-2 border-zinc-700 pl-4">
                            <span className="block text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Name - Surname</span>
                            <p className="text-xl md:text-2xl font-bold text-white">นาย ธนวัฒน์ นวนจันทร์</p>
                        </div>
                        <div className="flex gap-8 border-l-2 border-zinc-700 pl-4">
                            <div>
                                <span className="block text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Class</span>
                                <p className="text-lg font-semibold">ม.5/14</p>
                            </div>
                            <div>
                                <span className="block text-[10px] text-zinc-500 uppercase tracking-wider mb-1">No.</span>
                                <p className="text-lg font-mono font-semibold">เลขที่ 3</p>
                            </div>
                        </div>
                        <div className="border-l-2 border-zinc-700 pl-4">
                            <span className="block text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Contact Email</span>
                            <p className="text-base md:text-lg font-mono text-zinc-400">34733@spa.ac.th</p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Right: Profile Image */}
            <div className="h-[50%] md:h-full w-full md:w-[50%] relative flex items-center justify-center p-10 bg-zinc-900/20">
                <div className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full border-[1px] border-zinc-800 opacity-50 animate-[spin_20s_linear_infinite]"></div>
                <div className="absolute w-[280px] h-[280px] md:w-[480px] md:h-[480px] rounded-full border-[1px] border-zinc-800 opacity-30 animate-[spin_15s_linear_infinite_reverse]"></div>

                <div className="relative w-64 h-64 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-zinc-800/80 shadow-2xl transition-all duration-500 group z-10">
                    <img 
                        src="/profile.png" 
                        alt="Creator" 
                        className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-500"
                    />
                </div>
            </div>
        </section>

        {/* --- CONTENT SECTIONS --- */}
        {sections.map((item, index) => (
        <section 
            key={item.id} 
            id={item.title.toLowerCase()}
            className="h-[100dvh] w-full snap-start relative flex flex-col md:flex-row overflow-hidden border-t border-zinc-800/50 z-10"
        >
            {/* Dynamic Background */}
            <SectionBackground themeColor={item.themeColor} accentColor={item.accentColor} shape={item.shape} />
            <TechDecoration />

             {/* Spotlight per section */}
             <motion.div
                className="absolute inset-0 pointer-events-none hidden md:block mix-blend-soft-light z-0"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                            500px circle at ${mouseX}px ${mouseY}px,
                            ${item.accentColor},
                            transparent 70%
                        )
                    `,
                }}
            />

            {/* 1. Text Area */}
            <div className="h-[40%] md:h-full w-full md:w-[45%] relative z-20 flex flex-col justify-center px-6 md:px-16 lg:px-24 pt-20 md:pt-0 md:bg-black/10 md:backdrop-blur-[2px] md:border-r border-white/5">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    variants={containerVariants}
                    viewport={{ once: false, amount: 0.5 }}
                    className="relative"
                >
                    <span className="hidden md:block absolute -left-16 -top-20 text-[180px] font-black text-white/5 select-none z-[-1] font-outline-2">
                        {index + 1}
                    </span>

                    <motion.div variants={itemVariants} className="flex items-center gap-3 mb-3 md:mb-6">
                        <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.5)]"></span>
                        <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-zinc-400">
                            {item.subtitle}
                        </span>
                    </motion.div>
                    
                    <motion.h2 variants={itemVariants} className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4 md:mb-8 tracking-tight drop-shadow-2xl">
                        {item.title}
                    </motion.h2>
                    
                    <motion.p variants={itemVariants} className="text-sm md:text-lg text-zinc-300 font-light leading-relaxed max-w-sm md:max-w-md mix-blend-plus-lighter">
                        {item.desc}
                        <span className="hidden md:inline"> {item.fullDesc}</span>
                    </motion.p>

                    {/* Desktop Reference Image */}
                    <motion.div variants={itemVariants} className="hidden md:block mt-10">
                        <motion.div 
                            whileHover={{ scale: 1.05, x: 10 }}
                            onClick={() => setExpandedImgUrl(item.imgUrl)}
                            className="relative w-full max-w-[280px] h-40 rounded-lg overflow-hidden border border-white/10 group cursor-pointer shadow-lg bg-black/50"
                        >
                            <img src={item.imgUrl} alt="ref" className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000 ease-in-out"></div>
                            <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/80 px-2 py-1 rounded pointer-events-none">
                                <InformationCircleIcon className="w-3 h-3 text-white" />
                                <span className="text-[9px] text-white uppercase tracking-wider">Click to Expand</span>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Mobile Read More */}
                    <motion.button 
                        variants={itemVariants}
                        onClick={() => setReadMoreId(item.id)}
                        className="md:hidden mt-4 flex items-center gap-2 text-xs font-bold text-white border border-white/20 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur"
                    >
                        <InformationCircleIcon className="w-4 h-4" /> รายละเอียด
                    </motion.button>
                </motion.div>
            </div>

            {/* 2. Model Area */}
            <div className="h-[60%] md:h-full w-full md:w-[55%] relative group">
                    <div className="absolute inset-0 w-full h-full z-10">
                    <ModelViewer modelUrl={item.modelUrl} />
                    </div>

                    <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black/50 to-transparent pointer-events-none md:hidden z-20"></div>

                    {/* Expand Button */}
                    <motion.button 
                    whileHover={{ scale: 1.1, backgroundColor: "#fff", color: "#000" }} 
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setExpandedId(item.id)}
                    className="absolute bottom-5 right-5 md:bottom-12 md:right-12 bg-black/60 backdrop-blur p-3 md:p-5 rounded-full border border-white/20 text-white z-30 shadow-2xl transition-all"
                    >
                    <ArrowsPointingOutIcon className="w-5 h-5 md:w-6 md:h-6" />
                    </motion.button>
                    
                    {/* Desktop Hint */}
                    <div className="hidden md:flex absolute top-8 right-8 items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        <span className="text-xs font-bold text-zinc-300 uppercase tracking-widest">Interactive Mode</span>
                    </div>

                    {/* Mobile Index */}
                    <div className="absolute top-4 right-4 md:hidden pointer-events-none z-20">
                    <span className="text-[100px] font-black text-white/10 leading-none">
                        {index + 1}
                    </span>
                    </div>
            </div>
        </section>
        ))}

        {/* --- CODE BLOCK SECTION --- */}
        <section className="min-h-[50vh] md:h-[100dvh] w-full snap-start relative flex flex-col items-center justify-center bg-zinc-950 border-t border-zinc-900 z-10 px-4">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-5"></div>
            <TechDecoration />
            <div className="w-full relative z-30 px-2 md:px-0">
                <CodeBlock/>
            </div>
        </section>

        {/* --- MODALS --- */}
        
        {/* 1. Mobile Read More Modal */}
        <AnimatePresence>
        {readMoreId && readMoreItem && (
            <motion.div
                initial={{ opacity: 0, y: "100%" }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: "100%" }}
                transition={{ type: "spring",  damping: 25, stiffness: 200 }}
                className="fixed inset-0 z-50 flex items-end justify-center pointer-events-none md:hidden"
            >
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto" onClick={() => setReadMoreId(null)}></div>
                <div className="bg-zinc-900 w-full rounded-t-[2rem] p-8 pb-12 relative z-10 pointer-events-auto border-t border-zinc-700">
                    <div className="w-12 h-1.5 bg-zinc-700 rounded-full mx-auto mb-6"></div>
                    <h3 className="text-2xl font-bold text-white mb-2">{readMoreItem.title}</h3>
                    <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest mb-6">{readMoreItem.subtitle}</p>
                    <p className="text-zinc-300 leading-relaxed font-light mb-6">{readMoreItem.fullDesc}</p>
                    
                    <div className="w-full h-40 rounded-xl overflow-hidden mb-6 relative grayscale hover:grayscale-0 transition-all cursor-pointer">
                        <img 
                            src={readMoreItem.imgUrl} 
                            onClick={() => setExpandedImgUrl(readMoreItem.imgUrl)}
                            className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" 
                            alt="ref" 
                        />
                            <div className="absolute bottom-2 left-3 text-[10px] bg-black/70 px-2 py-1 rounded text-white pointer-events-none">Tap to Expand</div>
                    </div>
                    <button onClick={() => setReadMoreId(null)} className="w-full py-3 bg-white text-black font-bold rounded-xl active:scale-95 transition-transform">Close</button>
                </div>
            </motion.div>
        )}
        </AnimatePresence>

        {/* 2. Fullscreen 3D Modal */}
        <AnimatePresence>
        {expandedId && expandedItem && (
            <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-black flex flex-col"
            >
                <div className="absolute top-6 left-6 md:top-8 md:left-8 z-[1010] pointer-events-none">
                    <div className="bg-black/60 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10 shadow-lg">
                    <h3 className="text-white font-bold text-lg md:text-2xl leading-none">{expandedItem.title}</h3>
                    <span className="text-zinc-400 text-[10px] md:text-sm uppercase tracking-wider">{expandedItem.subtitle}</span>
                    </div>
                </div>

                <button 
                    onClick={() => setExpandedId(null)}
                    className="fixed top-6 right-6 md:top-8 md:right-8 z-[1050] w-12 h-12 flex items-center justify-center bg-white text-black rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-110 active:scale-95 transition-all cursor-pointer pointer-events-auto"
                >
                    <XMarkIcon className="w-6 h-6 stroke-[2.5]" />
                </button>

                <div className="w-full h-full bg-gradient-to-b from-zinc-900 to-black cursor-grab active:cursor-grabbing relative z-[1000]">
                    <ModelViewer modelUrl={expandedItem.modelUrl} isExpanded={true} />
                </div>
                
                <div className="absolute bottom-10 w-full text-center pointer-events-none z-[1010]">
                    <span className="inline-block bg-black/50 backdrop-blur px-4 py-2 rounded-lg text-zinc-500 text-xs border border-white/5 uppercase tracking-widest">
                        Drag to Rotate • Scroll to Zoom
                    </span>
                </div>
            </motion.div>
        )}
        </AnimatePresence>

        {/* 3. Expanded Image Modal */}
        <AnimatePresence>
        {expandedImgUrl && (
            <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[1000] bg-black/95 flex items-center justify-center p-4 md:p-10 backdrop-blur-md cursor-zoom-out"
            onClick={() => setExpandedImgUrl(null)}
            >
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        setExpandedImgUrl(null);
                    }}
                    className="fixed top-6 right-6 md:top-8 md:right-8 z-[1050] w-12 h-12 flex items-center justify-center bg-zinc-800 text-white rounded-full border border-zinc-600 hover:bg-white hover:text-black transition-all shadow-2xl cursor-pointer pointer-events-auto active:scale-90"
                >
                    <XMarkIcon className="w-6 h-6" />
                </button>

                <motion.img 
                src={expandedImgUrl} 
                alt="Expanded Reference" 
                className="w-full h-auto max-h-[85dvh] md:max-w-5xl object-contain rounded-lg shadow-2xl shadow-white/5 relative z-[1005]"
                initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
                onClick={(e) => e.stopPropagation()}
                />
            </motion.div>
        )}
        </AnimatePresence>

        <div className="w-full snap-start relative z-20">
            <Footer/> 
        </div>

      </div>
      <Navbar />
    </>
  );
}