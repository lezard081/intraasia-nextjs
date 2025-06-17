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
        {
            protocol: 'https',
            hostname: 'ponyitaly.com',
            pathname: '/pub/media/catalog/product/**',
        },
        {
            protocol: 'https',
            hostname: 'products.gabraun.com',
        },
    ],
  },
};

export default nextConfig;
