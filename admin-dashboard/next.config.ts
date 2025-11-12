// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   images: {
//     domains: ["res.cloudinary.com", "images.remotePatterns.com"],
//   },
//   experimental: {
//     esmExternals: true,
//   },
// };

// export default nextConfig;

// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.remotePatterns.com",
      },
    ],
  },
};

module.exports = nextConfig;