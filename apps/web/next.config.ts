import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  env: {
    MAINTENANCE_MODE: process.env.MAINTENANCE_MODE,
  },
};

export default nextConfig;
