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
  
  // 添加webpack配置
  webpack: (config) => {
    // 忽略favicon.ico相关错误
    config.resolve.alias = {
      ...config.resolve.alias,
      // 重定向favicon.ico请求到一个空模块
      './favicon.ico': require.resolve('next/dist/lib/empty-object.js'),
    };
    
    return config;
  },
};

module.exports = nextConfig;
