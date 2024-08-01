import localFont from 'next/font/local'
import './globals.css';
import Header from '@/components/header';
import Footer from '@/components/footer';
import React from 'react';
import Providers from './providers';

const pretendard = localFont({
  src: '../fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
})


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className='scrollbar-hide'>
      <body className={`${pretendard.variable} font-pretendard`}>
        <Header />
        <Providers>{children}</Providers>
        <Footer />
      </body>
    </html>
  );
}

