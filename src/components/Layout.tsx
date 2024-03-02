import Header from '@/components/Header';
import Head from 'next/head';

type Props = React.PropsWithChildren;

const Layout = ({ children }: Props) => {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-screen-lg flex-col px-4 pb-32 sm:px-8">
      <Head>
        <title>Bubble Pairs</title>
      </Head>
      <Header />
      <div className="flex grow flex-col">{children}</div>
    </div>
  );
};

export default Layout;
