import GlobalNavigation from './GlobalNavigation';
import Header from '@/components/Header';
import { Separator } from '@/components/ui/separator';
import Head from 'next/head';
import { useSession } from 'next-auth/react';

type Props = React.PropsWithChildren;

const Layout = ({ children }: Props) => {
  const { data: session } = useSession();

  return (
    <div className="mx-auto flex w-full flex-col">
      <Head>
        <title>Bubble Pairs</title>
      </Head>
      <div className="flex">
        {session && (
          <aside className="sticky top-0 hidden h-screen lg:flex">
            <GlobalNavigation />
            <Separator orientation="vertical" />
          </aside>
        )}
        <div className="mx-auto flex min-h-svh w-full max-w-screen-lg flex-col px-4 lg:px-8">
          <Header />
          <main className="grow">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
