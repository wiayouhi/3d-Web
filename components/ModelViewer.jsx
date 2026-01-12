"use client";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Stage, OrbitControls, Html } from "@react-three/drei";
import { Suspense } from "react";

// ส่วนแสดงผลโมเดลจริง
function Model({ url }) {
  const { scene } = useGLTF(url);
  // เพิ่ม scale={0.01} เผื่อโมเดลมาใหญ่เกินไป (ปรับแก้ได้)
  return <primitive object={scene} scale={0.01} />;
}

// Loading Spinner
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

// กล่องสี่เหลี่ยมสำรอง (Fallback)
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
    // เปลี่ยนสีพื้นหลังตามโหมด: โหมดปกติ = เทาอ่อน / โหมดเต็มจอ = ขาว
    <div className={`w-full h-full transition-colors duration-500 ${isExpanded ? 'bg-white' : 'bg-slate-100'}`}>
      <Canvas dpr={[1, 2]} camera={{ fov: 50 }} shadows={false}> {/* shadows={false} ปิดเงา Global */}
        
        {/* ถ้าอยากได้พื้นหลังสีเดียวกับ div */}
        {/* <color attach="background" args={[isExpanded ? '#ffffff' : '#f1f5f9']} /> */}

        <Suspense fallback={<Loader />}>
          {/* ✨ จุดสำคัญ: การเอาเงาออก 
            contactShadow={false} -> ปิดเงาที่พื้น
            intensity={0.3} -> ลดความแรงแสงลงให้ดูนวลๆ ไม่แข็ง
          */}
          <Stage environment="city" intensity={0.3} contactShadow={false} adjustCamera={isExpanded ? 1.0 : 1.3}>
            {modelUrl ? <Model url={modelUrl} /> : <FallbackBox />}
          </Stage>
        </Suspense>

        <OrbitControls 
          makeDefault 
          autoRotate={!isExpanded} // ถ้าเต็มจอให้หยุดหมุน รอคนเล่น
          autoRotateSpeed={0.8}
          enableZoom={true} 
          minDistance={isExpanded ? 1 : 2}
          maxDistance={isExpanded ? 20 : 10}
        />
      </Canvas>
    </div>
  );
}