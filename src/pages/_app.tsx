import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppType } from 'next/app';
import { useRouter } from 'next/router';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import NProgress from 'nprogress';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

import '@/styles/globals.css';
import '@/styles/nprogress.css';

const App: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const queryClient = new QueryClient();
  const router = useRouter();
  useEffect(() => {
    const handleRouteStart = () => NProgress.start();
    const handleRouteDone = () => NProgress.done();

    router.events.on('routeChangeStart', handleRouteStart);
    router.events.on('routeChangeComplete', handleRouteDone);
    router.events.on('routeChangeError', handleRouteDone);

    return () => {
      router.events.off('routeChangeStart', handleRouteStart);
      router.events.off('routeChangeComplete', handleRouteDone);
      router.events.off('routeChangeError', handleRouteDone);
    };
  }, [router]);

  return (
    <>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <Toaster />
          <Component {...pageProps} />
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
};

export default App;
