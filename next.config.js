/** @type {import('next').NextConfig} */
const nextConfig = {
  // 移除或设置为false
  // output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
