import Layout from '@/components/Layout';
import { BreadcrumbsProvider } from '@/context/breadcrumbs/useBreadcrumbs';
import ErrorScreen from '@/screens/error';
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
        <Layout>
          <ErrorBoundary fallback={<ErrorScreen />}>
            <BreadcrumbsProvider>
              <Component {...pageProps} />
            </BreadcrumbsProvider>
          </ErrorBoundary>
        </Layout>
      </SessionProvider>
    </div>
  );
};

export default App;
