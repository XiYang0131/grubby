/** @type {import('next').NextConfig} */
const nextConfig = {
  // 移除或设置为false
  // output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  
  // 临时禁用严格模式
  reactStrictMode: false,
};

module.exports = nextConfig;
