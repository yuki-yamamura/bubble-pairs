import { Inter } from '@next/font/google';
import { Toaster } from 'react-hot-toast';

import type { AppProps } from 'next/app';

import '@unocss/reset/tailwind.css';
import '@/styles/globals.scss';

const inter = Inter({
  subsets: ['latin'],
});

const App = ({ Component, pageProps }: AppProps) => {
  void import('@/mocks/initMocks').then(async ({ initMocks }) => {
    await initMocks();
  });

  return (
    <div className={inter.className}>
      <Component {...pageProps} />
      <Toaster />
    </div>
  );
};

export default App;
