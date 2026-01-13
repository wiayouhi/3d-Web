import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com', // อนุญาตดึงรูปจาก Discord
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // เผื่อไว้สำหรับรูป Google (ถ้ามีใช้)
        pathname: '/**',
      },
      // ถ้ามีรูปจากเว็บอื่นอีก ให้เพิ่มตรงนี้
    ],
  },
};

export default nextConfig;