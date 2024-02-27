import { Head, Html, Main, NextScript } from 'next/document';

const Document = () => (
  <Html lang="ja">
    <Head>
      <link rel="icon" type="image/x-icon" href="/images/favicon.ico" />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
