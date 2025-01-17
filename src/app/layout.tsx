import localFont from 'next/font/local';
import './globals.css';
import Nav from '@/components/nav';
import Footer from '@/components/footer';
import Providers from './providers';
import React from 'react';
import Template from '@/components/template';
import Script from 'next/script';
import { Metadata } from 'next';

const pretendard = localFont({
  src: '../fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://fitculator.io'),
  description: '운동에 진심인 당신을 위한 운동량 계산기',
  keywords: [
    '핏큘레이터',
    'fitculator',
    '운동',
    '달리기',
    '러닝',
    '마라톤',
    '트레일러닝',
    '다이어트',
    '체중 관리',
    '식단관리',
    '운동관리',
    '비만탈출',
    '과체중',
    '운동 계획',
    '헬스',
    '체중감량',
    '고도비만',
    '다이어트 약',
    '위고비 다이어트',
    '위고비 효과',
    '위고비 감량',
    '위고비 체험',
    '비만치료제',
    '비만약',
    '다이어트주사',
    '오젬픽',
    '홈트레이닝',
    '체지방률 계산기',
    '피트니스 루틴',
    '개인 맞춤형 헬스 플랜',
    '칼로리 계산기',
    '초보자 운동',
    '체중 감량 여성',
    '근육 증가 남성',
  ],
  title: { default: 'Fitculator', template: `%s | Fitculator` },
  openGraph: {
    title: 'Fitculator',
    description: '운동에 진심인 당신을 위한 운동량 계산기',
    type: 'website',
    locale: 'ko_KR',
    siteName: 'Fitculator',
  },

  // Twitter 카드 추가
  twitter: {
    card: 'summary_large_image',
    title: 'Fitculator',
    description: '운동에 진심인 당신을 위한 운동량 계산기',
    images: ['/logo-favicon.png'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  alternates: {
    canonical: 'https://fitculator.io',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scrollbar-hide">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/logo-favicon.png" sizes="any" />
      </head>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-04DBE6VNLV"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-04DBE6VNLV');
        `}
      </Script>
      <Script
        id="schema-org"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Fitculator',
            description:
              '운동에 진심인 당신을 위한 운동량 계산기',
            applicationCategory: 'HealthApplication',
            operatingSystem: 'Web',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'KRW',
            },
          }),
        }}
      />

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
