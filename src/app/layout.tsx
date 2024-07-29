import './globals.css';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';

const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
        <Header />
        <main>{children}</main>
        <Footer />
        <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
      </body>
    </html>
  );
}
