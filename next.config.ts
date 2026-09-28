import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/cruiseline-os',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
