import localFont from 'next/font/local';
import './globals.css';
import Nav from '@/components/nav';
import Footer from '@/components/footer';
import Providers from './providers';
import React from 'react';
import Head from 'next/head';
import Template from '@/components/template';
import Script from 'next/script';

const pretendard = localFont({
  src: '../fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export const metadata = {
  title: 'Fitculator',
  description: 'fitculator io',
  icons: {
    icon: '/images/logo-favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scrollbar-hide">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="핏큘레이터와 함께 요요 없는 지속가능한 다이어트를 하세요"
        />
        <meta
          name="keywords"
          content="다이어트, 핏큘레이터, fitculator, 체중 관리, 식단관리, 운동관리, 비만탈출, 과체중, 운동 계획, 헬스, 체중감량, 고도비만, 다이어트 약, 위고비 다이어트, 위고비 효과, 위고비 감량, 위고비 체험, 비만치료제, 비만약, 다이어트주사, 오젬픽, 홈트레이닝, 체지방률 계산기, 피트니스 루틴, 개인 맞춤형 헬스 플랜, 칼로리 계산기, 초보자 운동, 체중 감량 여성, 근육 증가 남성"
        />
      </Head>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-04DBE6VNLV"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
     window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-04DBE6VNLV');
  `}
      </Script>
      <body className={`${pretendard.variable} font-pretendard`}>
        <Nav smWidth="sm:w-[7rem]" />
        <Template>
          <Providers>{children}</Providers>
        </Template>
        <Footer />
      </body>
    </html>
  );
}
