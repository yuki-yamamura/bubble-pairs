import Header from '@/components/Header';

type Props = React.PropsWithChildren;

const Layout = ({ children }: Props) => {
  return (
    <div className="mx-auto mt-12 min-h-screen w-full max-w-screen-lg px-4 pb-32 sm:px-8">
      <Header />
      <div className="mx-auto sm:px-8">{children}</div>
    </div>
  );
};

export default Layout;
