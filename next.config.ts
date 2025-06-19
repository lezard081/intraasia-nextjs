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
        {
            protocol: 'https',
            hostname: 'drive.google.com',
        },
        {
            protocol: 'https',
            hostname: 'www.giorik.com',
            pathname: '/imageimp/**',
        },
        {
            protocol: 'https',
            hostname: 'www.renzacci.it',
            pathname: '/cloud/**',
        },
        {
            protocol: 'https',
            hostname: 'www.uniondc.com',
            pathname: '/wp-content/uploads/**',
        },
        {
            protocol: 'https',
            hostname: 'ywramlwefsopnakxqlqp.supabase.co',
            pathname: '/storage/v1/object/public/intraasia-images/**',
        },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
