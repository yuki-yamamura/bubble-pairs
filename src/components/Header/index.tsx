import GlobalNavigation from './GlobalNavigation';
import Logo from '@/components/Logo';
import { useSession } from 'next-auth/react';

const Header = () => {
  const { data: session } = useSession();

  return (
    <header className="pb-4 pt-12">
      {session ? <GlobalNavigation /> : <Logo />}
    </header>
  );
};

export default Header;
