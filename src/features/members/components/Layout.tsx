import Header from '@/components/Header';

type Props = React.PropsWithChildren;

const Layout = ({ children }: Props) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default Layout;
