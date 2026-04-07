import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [process.env.IP || 'localhost'],
  basePath: process.env.BASEPATH || '',
  reactStrictMode: true,
};

export default nextConfig;
