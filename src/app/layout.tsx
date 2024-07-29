import './globals.css';
import Header from '@/components/header';
import Footer from '@/components/footer';
import React from 'react';
import Providers from './providers';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className='scrollbar-hide'>
      <body>
        <Header />
        <Providers>{children}</Providers>
        <Footer />
      </body>
    </html>
  );
}

