import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
        {
            protocol: 'https',
            hostname: 'storage.googleapis.com',
        },
        {
            protocol: 'https',
            hostname: 'primuslaundry.com',
        },
        {
            protocol: 'https',
            hostname: 'stefabprimus.com',
        },
        {
            protocol: 'https',
            hostname: 'www.jensen-group.com',
        },
    ],
  },
};

export default nextConfig;
