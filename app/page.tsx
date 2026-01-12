"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ModelViewer from "@/components/ModelViewer";
import CodeBlock from "@/components/CodeBlock"; // Import CodeBlock ที่เพิ่งสร้าง
import { 
  motion, 
  AnimatePresence, 
  useMotionValue, 
  useMotionTemplate 
} from "framer-motion";
import { 
  ArrowsPointingOutIcon, 
  XMarkIcon, 
  CubeTransparentIcon, 
  InformationCircleIcon, 
  PlusIcon, 
  UserCircleIcon,
  CommandLineIcon
} from "@heroicons/react/24/outline";

// --- Sample Code Data (สำหรับโชว์ใน CodeBlock) ---
const codeSnippet = `import { Canvas } from "@react-three/fiber";
import { useGLTF, Stage, PresentationControls } from "@react-three/drei";

function Model3D({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  
  return (
    <Canvas dpr={[1, 2]} shadows camera={{ fov: 45 }}>
      <fog attach="fog" args={["#101010", 10, 20]} />
      
      <PresentationControls speed={1.5} global zoom={0.7} polar={[-0.1, Math.PI / 4]}>
        <Stage environment="city" intensity={0.6} contactShadow={false}>
          <primitive object={scene} />
        </Stage>
      </PresentationControls>
    </Canvas>
  );
}`;

// --- ข้อมูลเนื้อหา ---
const sections = [
  {
    id: 1,
    title: "Vase",
    subtitle: "Decor • Aesthetic",
    desc: "แจกันรูปทรงสวยงาม สำหรับจัดดอกไม้หรือวางประดับเพื่อเพิ่มสุนทรียภาพ",
    fullDesc: "แจกันเปรียบเสมือนงานศิลปะที่ช่วยเติมเต็มบรรยากาศในห้อง รูปทรงโค้งมนและวัสดุที่เลือกใช้ช่วยสะท้อนรสนิยม และนำความสดชื่นจากธรรมชาติเข้ามาสู่พื้นที่อยู่อาศัย",
    modelUrl: "/models/vase.glb", 
    imgUrl: "https://lh3.googleusercontent.com/drive-storage/AJQWtBPTzgDpJ-RK-cVXR4tEFlrI35mmcg1zMpR86UE_wP8o8d1M-YSlgGtzMy3mX_-BZPYB7OrQiX7velh-8BlCVlXHWcDESxRvs6_7jjrACu3VZgiNjA=w1912-h948?auditContext=forDisplay",
  },
  {
    id: 2,
    title: "Geometry",
    subtitle: "Form • Abstract",
    desc: "วัตถุรูปทรงเรขาคณิต พื้นฐานแห่งการออกแบบที่เน้นความเรียบง่ายและสมดุล",
    fullDesc: "รูปทรงเรขาคณิต (Geometric Shapes) เป็นรากฐานของงานดีไซน์สามมิติ การจัดวางรูปทรงต่างๆ เช่น ทรงกลมหรือลูกบาศก์ ช่วยสร้างมิติของแสงและเงาที่น่าสนใจในงานศิลป์",
    modelUrl: "/models/geometry.glb", 
    imgUrl: "https://lh3.googleusercontent.com/drive-storage/AJQWtBMIbUozeBpLI6ET4U0uHKeZ4h54BQsn-2C-sDNcm4uO2NEXnm3APf3rJRFv_o0VLVkJ2-JZo8fKY4UCs3nY2ew0a6IHZq9Ytr3AglTF91cJCO5ybg=w1912-h948?auditContext=forDisplay",
  },
  {
    id: 3,
    title: "Chair",
    subtitle: "Seat • Comfort",
    desc: "เก้าอี้ดีไซน์ทันสมัย ออกแบบตามหลักสรีรศาสตร์เพื่อการพักผ่อนที่สมบูรณ์",
    fullDesc: "เก้าอี้ไม่ได้มีไว้เพียงเพื่อนั่ง แต่คือเฟอร์นิเจอร์ชิ้นเอกที่ผสมผสานฟังก์ชันเข้ากับความงาม การเลือกเก้าอี้ที่ดีช่วยรองรับร่างกายและสร้างจุดดึงดูดสายตาภายในห้อง",
    modelUrl: "/models/chair.glb",
    imgUrl: "https://lh3.googleusercontent.com/drive-storage/AJQWtBOMDkYhLQR0-8CVTFrlPb6XLRyNAVcIRX-TFLny9uYnEflCFrCcnj_OVcoF2W-MWluBE-ARJoovIoug1tF9z88_sk0MSp86S1hbdfkV-BZno92REw=w1912-h948?auditContext=forDisplay",
  },
  {
    id: 4,
    title: "Glass",
    subtitle: "Drinkware • Clear",
    desc: "แก้วน้ำใสสะอาด สะท้อนความบริสุทธิ์และการใช้งานที่เรียบง่าย",
    fullDesc: "แก้วน้ำรูปทรงเพรียวบาง ออกแบบมาให้จับถนัดมือ ความใสของวัสดุช่วยขับเน้นสีสันของเครื่องดื่ม และสะท้อนแสงไฟระยิบระยับเพิ่มความหรูหราบนโต๊ะอาหาร",
    modelUrl: "/models/glass.glb",
    imgUrl: "https://lh3.googleusercontent.com/drive-storage/AJQWtBNVFAJjs0f29NecpZHrMrxQaLz0qDoPWImDIyn9ea9nlYblEozG8KaDHDHN-gGuu6NmiH3csnl-TDsd6RgDSDcQ_n6KEugKFMxSm-3rRGxDh2yu1w=w1912-h948?auditContext=forDisplay",
  },
  {
    id: 5,
    title: "Lamp",
    subtitle: "Light • Ambience",
    desc: "โคมไฟตั้งโต๊ะ แหล่งกำเนิดแสงที่ช่วยสร้างบรรยากาศอบอุ่นและนุ่มนวล",
    fullDesc: "โคมไฟทำหน้าที่ 'ระบายสีด้วยแสง' ให้กับห้อง ช่วยปรับเปลี่ยนอารมณ์จากความเคร่งขรึมเป็นความผ่อนคลาย เหมาะสำหรับการอ่านหนังสือหรือสร้างมุมพักผ่อนส่วนตัว",
    modelUrl: "/models/lamp.glb",
    imgUrl: "https://lh3.googleusercontent.com/drive-storage/AJQWtBMTKalpKZwq41L_iGXJunaManAwQjwcOwp1PWgO3iGVo9k7EWHrShXyJ1f9-rzE4HbifbOB98YcU0WZZ_NymDP-JtKGql6ydE7D8Tezh4gILiUB=w1912-h948?auditContext=forDisplay",
  },
  {
    id: 6,
    title: "Table",
    subtitle: "Surface • Center",
    desc: "โต๊ะทำงานหรือโต๊ะกลาง พื้นที่ราบเรียบสำหรับวางสิ่งของและเชื่อมโยงกิจกรรม",
    fullDesc: "โต๊ะคือศูนย์กลางของการใช้งานในพื้นที่ ไม่ว่าจะใช้วางของโชว์หรือทำงาน โครงสร้างที่แข็งแรงและพื้นผิวที่กว้างขวางช่วยรองรับทุกกิจกรรมได้อย่างมั่นคง",
    modelUrl: "/models/table.glb",
    imgUrl: "https://lh3.googleusercontent.com/drive-storage/AJQWtBNSDzIaxhFhp0Ij4y9TTDQl1KO7d6biAtARvQ6IMI0xNrnMzdU85cUXlglEYwCNRbZShoYzYjvRmDURzMOE6Lz-lbIse-K4qu9qZeE41C5imk5dVQ=w1912-h948?auditContext=forDisplay",
  },
];

// --- Animation Config ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};

const itemVariants = {
  hidden: { x: -30, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 60, damping: 12 } }
};

// Component: Tech Background Lines (Desktop Only) - ตกแต่งเส้นในแต่ละ Section
const TechDecoration = () => (
    <div className="absolute inset-0 pointer-events-none hidden md:block opacity-20 z-0">
        {/* Crosshairs */}
        <PlusIcon className="absolute top-8 left-8 w-4 h-4 text-zinc-600" />
        <PlusIcon className="absolute top-8 right-8 w-4 h-4 text-zinc-600" />
        <PlusIcon className="absolute bottom-8 left-8 w-4 h-4 text-zinc-600" />
        <PlusIcon className="absolute bottom-8 right-8 w-4 h-4 text-zinc-600" />
        
        {/* Lines */}
        <div className="absolute top-0 left-20 w-[1px] h-full bg-gradient-to-b from-transparent via-zinc-800 to-transparent"></div>
        <div className="absolute top-40 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>
    </div>
);

export default function Home() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [readMoreId, setReadMoreId] = useState<number | null>(null);
  const [expandedImgUrl, setExpandedImgUrl] = useState<string | null>(null);
  
  // --- Motion Values สำหรับ Background Effect ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ clientX, clientY }: React.MouseEvent) {
    mouseX.set(clientX);
    mouseY.set(clientY);
  }

  const expandedItem = sections.find(item => item.id === expandedId);
  const readMoreItem = sections.find(item => item.id === readMoreId);

  return (
    <div 
        // Capture Mouse Movement ทั่วทั้งหน้า
        onMouseMove={handleMouseMove}
        className="h-[100dvh] w-full overflow-y-scroll snap-y snap-mandatory bg-black text-white scroll-smooth no-scrollbar relative selection:bg-white/30 selection:text-black"
    >
      
      {/* ==============================================
          GLOBAL BACKGROUND EFFECTS (NEW)
          ============================================== */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          
          {/* 1. Moving Cyber Grid (ตารางวิ่งลงช้าๆ) */}
          <div className="absolute inset-0 opacity-[0.15]"
               style={{
                   backgroundImage: `linear-gradient(to right, #444 1px, transparent 1px), linear-gradient(to bottom, #444 1px, transparent 1px)`,
                   backgroundSize: '50px 50px',
                   maskImage: 'linear-gradient(to bottom, black 20%, transparent 90%)'
               }}
          >
              <motion.div 
                 animate={{ y: [0, 50] }}
                 transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                 className="w-full h-full"
              />
          </div>

          {/* 2. Carbon Fibre Texture (ของเดิม - ปรับบางลง) */}
          <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay"></div>

          {/* 3. Spotlight / Flashlight Effect (วงแสงตามเมาส์) */}
          <motion.div
            className="absolute -inset-px opacity-20 hidden md:block"
            style={{
              background: useMotionTemplate`
                radial-gradient(
                  600px circle at ${mouseX}px ${mouseY}px,
                  rgba(255, 255, 255, 0.15),
                  transparent 80%
                )
              `,
            }}
          />
          
          {/* 4. Global Floating Particles (ละอองฝุ่นลอยทั่วเว็บ) */}
           <div className="absolute inset-0">
               {[...Array(15)].map((_, i) => (
                   <motion.div
                       key={i}
                       className="absolute w-0.5 h-0.5 bg-white rounded-full opacity-30"
                       style={{
                           left: `${Math.random() * 100}%`,
                           top: `${Math.random() * 100}%`,
                       }}
                       animate={{
                           y: [0, -100, 0],
                           opacity: [0, 0.6, 0],
                           scale: [0, 1.2, 0]
                       }}
                       transition={{
                           duration: Math.random() * 15 + 10,
                           repeat: Infinity,
                           ease: "linear",
                           delay: Math.random() * 5
                       }}
                   />
               ))}
           </div>
      </div>
      
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="h-[100dvh] w-full snap-start relative flex flex-col items-center justify-center overflow-hidden px-4 text-center z-10">
        
        {/* Glow Effect (Hero Specific) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[800px] md:h-[600px] bg-white/5 rounded-full blur-[120px] pointer-events-none"></div>

        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="relative z-10">
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

        <motion.div 
             initial={{ opacity: 0 }} animate={{ opacity: 1, y: [0, 10, 0] }} transition={{ delay: 2, duration: 2, repeat: Infinity }}
             className="absolute bottom-8 md:bottom-12 text-zinc-600 flex flex-col items-center gap-3 cursor-pointer hover:text-white transition-colors"
             onClick={() => document.getElementById('creator')?.scrollIntoView({ behavior: 'smooth' })}
        >
            <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-bold">Scroll to Explore</span>
            <div className="h-8 w-[1px] bg-gradient-to-b from-current to-transparent"></div>
        </motion.div>
      </section>


      {/* --- CREDITS / SUBMISSION SECTION --- */}
      <section id="creator" className="h-[100dvh] w-full snap-start relative flex flex-col md:flex-row overflow-hidden border-t border-zinc-900 z-10 bg-black/20 backdrop-blur-sm">
            <TechDecoration />

            {/* Left: Text Details */}
            <div className="h-[50%] md:h-full w-full md:w-[50%] relative z-20 flex flex-col justify-center px-8 md:px-24 bg-gradient-to-b from-zinc-950 to-transparent md:bg-zinc-950/40 md:border-r border-zinc-800/50">
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
            <div className="h-[50%] md:h-full w-full md:w-[50%] relative flex items-center justify-center p-10">
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
            className="h-[100dvh] w-full snap-start relative flex flex-col md:flex-row overflow-hidden border-t border-zinc-900 z-10 bg-black/10 backdrop-blur-sm"
        >
            <TechDecoration />

            {/* 1. Text Area */}
            <div className="h-[40%] md:h-full w-full md:w-[45%] relative z-20 flex flex-col justify-center px-6 md:px-16 lg:px-24 pt-20 md:pt-0 bg-gradient-to-b from-zinc-950 via-zinc-950 to-transparent md:bg-zinc-950/60 md:border-r border-zinc-800/50">
                <motion.div
                   initial="hidden"
                   whileInView="visible"
                   variants={containerVariants}
                   viewport={{ once: false, amount: 0.5 }}
                   className="relative"
                >
                    <span className="hidden md:block absolute -left-16 -top-20 text-[180px] font-black text-zinc-900/40 select-none z-[-1] font-outline-2">
                        {index + 1}
                    </span>

                    <motion.div variants={itemVariants} className="flex items-center gap-3 mb-3 md:mb-6">
                        <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.5)]"></span>
                        <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-zinc-500">
                            {item.subtitle}
                        </span>
                    </motion.div>
                    
                    <motion.h2 variants={itemVariants} className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4 md:mb-8 tracking-tight">
                        {item.title}
                    </motion.h2>
                    
                    <motion.p variants={itemVariants} className="text-sm md:text-lg text-zinc-400 font-light leading-relaxed max-w-sm md:max-w-md">
                        {item.desc}
                        <span className="hidden md:inline"> {item.fullDesc}</span>
                    </motion.p>

                    {/* Desktop Reference Image */}
                    <motion.div variants={itemVariants} className="hidden md:block mt-10">
                        <motion.div 
                            whileHover={{ scale: 1.05, x: 10 }}
                            onClick={() => setExpandedImgUrl(item.imgUrl)}
                            className="relative w-full max-w-[280px] h-40 rounded-lg overflow-hidden border border-zinc-700 group cursor-pointer"
                        >
                            <img src={item.imgUrl} alt="ref" className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" />
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
                        className="md:hidden mt-4 flex items-center gap-2 text-xs font-bold text-white border border-zinc-700 px-3 py-1.5 rounded-full bg-zinc-900/50"
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

                 <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-zinc-950 to-transparent pointer-events-none md:hidden z-20"></div>

                 {/* Expand Button */}
                 <motion.button 
                    whileHover={{ scale: 1.1, backgroundColor: "#fff", color: "#000" }} 
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setExpandedId(item.id)}
                    className="absolute bottom-5 right-5 md:bottom-12 md:right-12 bg-zinc-900/90 backdrop-blur p-3 md:p-5 rounded-full border border-zinc-700 text-white z-30 shadow-2xl transition-all"
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
                    <span className="text-[100px] font-black text-white/5 leading-none">
                        {index + 1}
                    </span>
                 </div>
            </div>
        </section>
      ))}

      {/* ==========================================================
          NEW SECTION: CODE BLOCK (System Core / Developer Mode)
          ========================================================== */}
      <section className="min-h-[90vh] md:h-[100dvh] w-full snap-start relative flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm border-t border-zinc-900 z-10 px-4">
           <TechDecoration />

           <div className="w-full relative z-20 px-2 md:px-0">
               <CodeBlock 
                   code={codeSnippet} 
                   filename="ModelViewer.tsx" 
                   language="TSX" 
               />
           </div>
      </section>

      {/* --- MODALS (Layer สูงสุด) --- */}
      
      {/* 1. READ MORE (Mobile) */}
      <AnimatePresence>
        {readMoreId && readMoreItem && (
            <motion.div
                initial={{ opacity: 0, y: "100%" }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
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

      {/* 2. FULLSCREEN 3D */}
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

      {/* 3. EXPANDED IMAGE */}
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
         <Footer discordServerId="123456789" /> 
      </div>
    </div>
    
  );
}