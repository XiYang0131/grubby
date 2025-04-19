import './globals.css';
import type { Metadata } from 'next';
import { Inter, Noto_Sans_SC } from 'next/font/google';
import Script from 'next/script';

// 加载Inter字体（拉丁字符）
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// 加载Noto Sans SC字体（中文字符）
const notoSansSC = Noto_Sans_SC({ 
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans-sc',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Grubby AI | Advanced AI Assistant Powered by HumanizeAI',
  description: 'Grubby AI is an intelligent assistant that understands context, learns from feedback, and delivers accurate results in real-time.',
  // 暂时移除icons配置
  // icons: {
  //   icon: '/favicon.ico',
  // },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <head>
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-KKX9VGJWXM"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-KKX9VGJWXM');
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${notoSansSC.variable} font-sans`}>{children}</body>
    </html>
  );
}
