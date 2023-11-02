import '@/styles/globals.css';

import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head />
      <body className='flex min-h-screen flex-col'>
        <Navbar />
        <div className='container mx-auto px-3 py-6'>{children}</div>
        <Footer />
      </body>
    </html>
  );
}
