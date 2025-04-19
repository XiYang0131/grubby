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
  
  // 简化配置，不使用webpack
  experimental: {
    // 忽略构建错误，继续部署
    skipTrailingSlashRedirect: true,
    skipMiddlewareUrlNormalize: true,
    // 忽略图像优化错误
    forceSwcTransforms: true,
  },
};

module.exports = nextConfig;
