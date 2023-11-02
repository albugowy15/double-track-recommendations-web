import { Inter } from 'next/font/google';

import '@/styles/globals.css';

import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={inter.className}>
      <head />
      <body className='flex min-h-screen flex-col bg-background font-sans antialiased'>
        <Navbar />
        <div className='px-3 pt-5 md:container'>{children}</div>
        <Footer />
      </body>
    </html>
  );
}
