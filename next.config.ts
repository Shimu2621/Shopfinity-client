import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.freepik.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**", // allow all Cloudinary paths
      },
    ],
  },
};

export default nextConfig;
