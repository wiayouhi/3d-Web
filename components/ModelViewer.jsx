"use client";
import { Canvas } from "@react-three/fiber";
import { 
  useGLTF, 
  Stage, 
  OrbitControls, 
  Html, 
  AdaptiveDpr,      // ✅ เพิ่ม: ปรับความละเอียดอัตโนมัติ
  AdaptiveEvents,   // ✅ เพิ่ม: ลดการคำนวณ event เมื่อหน่วง
  BakeShadows       // ✅ เพิ่ม: ถ้ามีเงา ให้คำนวณทีเดียวแล้วจบ (ประหยัดแรงเครื่อง)
} from "@react-three/drei";
import { Suspense, useEffect } from "react";

// ส่วนแสดงผลโมเดลจริง
function Model({ url }) {
  const { scene } = useGLTF(url);
  
  // Preload โมเดลเพื่อให้โหลดครั้งถัดไปเร็วขึ้น
  useEffect(() => {
    useGLTF.preload(url);
  }, [url]);

  return <primitive object={scene} scale={0.01} />;
}

// Loading Spinner (คงเดิม)
function Loader() {
  return (
    <Html center>
      <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur rounded-full shadow-sm text-blue-600 text-xs font-bold tracking-widest animate-pulse border border-blue-100">
        <svg className="animate-spin h-4 w-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        LOADING 3D...
      </div>
    </Html>
  );
}

// Fallback Box (คงเดิม)
function FallbackBox() {
  return (
    <mesh rotation={[0.4, 0.2, 0]}>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial color="#e2e8f0" wireframe={true} />
    </mesh>
  );
}

export default function ModelViewer({ modelUrl, isExpanded = false }) {
  return (
    <div className={`w-full h-full transition-colors duration-500 ${isExpanded ? 'bg-white' : 'bg-slate-100'}`}>
      <Canvas 
        // ✅ ปรับ: dpr (Device Pixel Ratio) ไม่ให้เกิน 1.5 บนจอมือถือ/Retina ช่วยให้ลื่นขึ้นมาก
        dpr={[1, 1.5]} 
        camera={{ fov: 50 }} 
        shadows={false}
        // ✅ ปรับ: ลดการคำนวณ Anti-aliasing และ Alpha ถ้าไม่จำเป็น
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        {/* ✅ เครื่องมือช่วย Performance */}
        <AdaptiveDpr pixelated /> {/* ลดความละเอียดภาพขณะหมุนกล้อง */}
        <AdaptiveEvents />        {/* ข้าม Event ขณะเฟรมเรตตก */}
        <BakeShadows />           {/* อบเงาให้อยู่นิ่งๆ ไม่คำนวณใหม่ทุกเฟรม */}

        <Suspense fallback={<Loader />}>
          <Stage 
            environment="city" 
            intensity={0.3} 
            contactShadow={false} // ยืนยันปิดเงาพื้น
            shadows={false}       // ยืนยันปิดเงาโมเดล
            adjustCamera={isExpanded ? 1.0 : 1.3}
          >
            {modelUrl ? <Model url={modelUrl} /> : <FallbackBox />}
          </Stage>
        </Suspense>

        <OrbitControls 
          makeDefault 
          autoRotate={!isExpanded} 
          autoRotateSpeed={0.8}
          enableZoom={true} 
          // ✅ ปรับ: เปิด Damping (แรงเฉื่อย) ทำให้การหมุนดูลื่น นุ่มนวล ไม่กระตุกมือ
          enableDamping={true}
          dampingFactor={0.05}
          minDistance={isExpanded ? 1 : 2}
          maxDistance={isExpanded ? 20 : 10}
        />
      </Canvas>
    </div>
  );
}