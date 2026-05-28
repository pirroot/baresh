import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dkstatics-public.digikala.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
