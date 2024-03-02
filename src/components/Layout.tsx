import GlobalNavigation from './GlobalNavigation';
import Header from '@/components/Header';
import { Separator } from '@/components/ui/separator';
import Head from 'next/head';
import { useSession } from 'next-auth/react';

type Props = React.PropsWithChildren;

const Layout = ({ children }: Props) => {
  const { data: session } = useSession();

  return (
    <div className="mx-auto flex w-full flex-col pb-32">
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
        <div className="mx-auto min-h-screen w-full max-w-screen-lg px-4 lg:px-8">
          <Header />
          <main className="h-full">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
