import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  allowedDevOrigins: [process.env.IP || 'localhost'],
  basePath: process.env.BASEPATH || '',
};

export default nextConfig;
