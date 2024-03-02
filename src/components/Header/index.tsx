import MobileNavigation from './MobileNavigation';
import Logo from '@/components/Logo';
import { cn } from '@/lib/shadcn-ui';
import { useSession } from 'next-auth/react';

const Header = () => {
  const { data: session } = useSession();

  return (
    <header className="flex-start flex w-full pb-4 pt-12">
      <div className={cn(session && 'absolute left-4 top-12 lg:hidden')}>
        {session ? <MobileNavigation /> : <Logo />}
      </div>
    </header>
  );
};

export default Header;
