import { useEffect, useState } from 'react';

import type { AppProps } from 'next/app';

import '@/styles/globals.scss';

const App = ({ Component, pageProps }: AppProps) => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    void import('@/mocks/init-mocks').then(async ({ initMocks }) => {
      await initMocks();
      setShouldRender(true);
    });
  }, []);

  if (!shouldRender) {
    return null;
  }

  return <Component {...pageProps} />;
};

export default App;
