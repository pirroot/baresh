import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
  },

  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.bareshco.com' }],
        destination: 'https://bareshco.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
