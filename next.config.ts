import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [process.env.IP || 'localhost'],
  basePath: process.env.BASEPATH || '',
  // output: 'export',   
  trailingSlash: true
};

export default nextConfig;
