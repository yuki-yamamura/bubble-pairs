import Header from '@/components/Header';

type Props = React.PropsWithChildren;

const Layout = ({ children }: Props) => {
  return (
    <div className="mx-auto mt-12 flex min-h-screen w-full max-w-screen-lg flex-col px-4 pb-32 sm:px-8">
      <Header />
      <div className="flex grow flex-col">{children}</div>
    </div>
  );
};

export default Layout;
