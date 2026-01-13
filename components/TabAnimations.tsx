"use client";

import { useEffect } from "react";

export default function TabAnimations() {
  useEffect(() => {
    // ข้อความที่จะให้วิ่ง (เว้นวรรคท้ายๆ หน่อยจะได้ไม่ติดกัน)
    const titleText = "INSIDE MACHINE — INTERACTIVE 3D PORTFOLIO — SYSTEM ONLINE — ";
    let index = 0;

    const intervalId = setInterval(() => {
      // Logic การตัดคำให้เหมือนตัวหนังสือวิ่ง
      document.title = titleText.substring(index) + titleText.substring(0, index);
      index = (index + 1) % titleText.length;
    }, 200); // ความเร็ว (ยิ่งน้อยยิ่งเร็ว)

    // Cleanup เมื่อเปลี่ยนหน้า (คืนค่าเดิม)
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return null; // Component นี้ไม่ต้องแสดงผลอะไรบนหน้าจอ
}