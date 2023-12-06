import type { AppProps } from 'next/app';

import '@unocss/reset/tailwind.css';
import '@/styles/globals.scss';

const App = ({ Component, pageProps }: AppProps) => {
  void import('@/mocks/initMocks').then(async ({ initMocks }) => {
    await initMocks();
  });

  return <Component {...pageProps} />;
};

export default App;
