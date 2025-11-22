/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // ESM compatibility for modern browsers
  experimental: {
    esmExternals: false,
  },
  // Image optimization (if you add images later)
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
