// import { BreadcrumbsProvider } from '@/context/breadcrumbs/useBreadcrumbs';
import Layout from '@/features/members/components/Layout';
import ErrorScreen from '@/screens/ErrorScreen';
import { Inter } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import { ErrorBoundary } from 'react-error-boundary';
import { Toaster } from 'react-hot-toast';

import type { AppProps } from 'next/app';
import type { Session } from 'next-auth';

import '@/styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

const App = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) => {
  void import('@/mocks/initMocks').then(async ({ initMocks }) => {
    await initMocks();
  });

  return (
    <div className={inter.className}>
      <Toaster />
      <SessionProvider session={session}>
        {/* <BreadcrumbsProvider> */}
        <Layout>
          <ErrorBoundary fallback={<ErrorScreen />}>
            <Component {...pageProps} />
          </ErrorBoundary>
        </Layout>
        {/* </BreadcrumbsProvider> */}
      </SessionProvider>
    </div>
  );
};

export default App;
