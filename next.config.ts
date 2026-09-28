import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/cruiseline-os',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
