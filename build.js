const fs = require('fs');
const { execSync } = require('child_process');

// 检查app/favicon.ico是否存在
if (fs.existsSync('app/favicon.ico')) {
  console.log('Removing problematic favicon.ico...');
  fs.unlinkSync('app/favicon.ico');
}

// 创建有效的favicon.ico在public目录
if (!fs.existsSync('public')) {
  fs.mkdirSync('public');
}

// 运行Next.js构建
console.log('Running Next.js build...');
execSync('next build', { stdio: 'inherit' }); 