import localFont from 'next/font/local';
import './globals.css';
import Nav from '@/components/nav';
import Footer from '@/components/footer';
import Providers from './providers';
import React from 'react';
import Head from 'next/head';

const pretendard = localFont({
  src: '../fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scrollbar-hide sm:bg-gray-2">
      <Head>
        {' '}
        {/* Next.js의 Head 컴포넌트 사용 */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <body className={`${pretendard.variable} font-pretendard`}>
        <Nav />
        <Providers>{children}</Providers>
        <Footer />
      </body>
    </html>
  );
}
