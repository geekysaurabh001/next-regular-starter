/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  productionBrowserSourceMaps: true,
  images: {
    domains: ["localhost"],
    formats: ["image/avif", "image/webp"],
  },
};

module.exports = nextConfig;
