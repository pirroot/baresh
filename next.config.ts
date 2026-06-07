import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  async redirects() {
    return [
      // www → non-www
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.bareshco.com' }],
        destination: 'https://bareshco.com/:path*',
        permanent: true,
      },
      // www با http → non-www با https
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
