/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: isProd ? '/luxe-beauty-lounge-1' : '',
  assetPrefix: isProd ? '/luxe-beauty-lounge-1/' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
