import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// 1. Import Component ที่เราสร้าง
import TabAnimations from "@/components/TabAnimations";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata พื้นฐาน (สำหรับ SEO เวลา Google มาเก็บข้อมูล)
export const metadata: Metadata = {
  title: "INSIDE MACHINE", // ค่า Default
  description: "Interactive 3D Experience by Thanawat",
  icons: {
    icon: '/favicon.ico', // ถ้ามี icon ใส่ตรงนี้ได้
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* 2. ใส่ Component ไว้ตรงนี้เพื่อให้ทำงานทุกหน้า */}
        <TabAnimations />
        
        {children}
      </body>
    </html>
  );
}