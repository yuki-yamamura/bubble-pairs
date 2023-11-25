import { useEffect, useState } from 'react';

import type { AppProps } from 'next/app';

import '@unocss/reset/tailwind.css';
import '@/styles/globals.scss';

const App = ({ Component, pageProps }: AppProps) => {
  const [shouldRender, setShouldRender] = useState(false);

  // workaround for delaying initial render to make sure that MSW is enabled
  // see https://github.com/mswjs/msw/discussions/1049#discussioncomment-1941348
  useEffect(() => {
    void import('@/mocks/initMocks').then(async ({ initMocks }) => {
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
