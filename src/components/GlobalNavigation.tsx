import Logo from '@/components/Logo';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { useUser } from '@/context/useUser';
import { cn } from '@/lib/shadcn-ui';
import { ActivityIcon, HomeIcon, SettingsIcon, SmileIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import type { LucideIcon } from 'lucide-react';

const GlobalNavigation = () => {
  const router = useRouter();
  const { user } = useUser();

  const isCurrentRoute = (path: string) => {
    if (path === '/') {
      return router.asPath === path;
    }

    return new RegExp(path).test(router.asPath);
  };

  const navigationItems: { href: string; label: string; Icon: LucideIcon }[] = [
    { href: '/', label: 'Home', Icon: HomeIcon },
    { href: '/members', label: 'Members', Icon: SmileIcon },
    { href: '/activities', label: 'Activity', Icon: ActivityIcon },
    { href: '/settings', label: 'Settings', Icon: SettingsIcon },
  ];

  return (
    <div className="lg:w-80">
      <div className="mb-8 mt-20 flex flex-col gap-y-16 lg:px-4">
        <Logo />
        <div className="flex items-center gap-x-4">
          <Avatar className="h-12 w-12 border-2 border-secondary p-2">
            <AvatarImage src="/images/dolphin.png" />
          </Avatar>
          <div className="flex flex-col">
            <div className="line-clamp-1">{user.name}</div>
            <div className="line-clamp-1 text-xs text-slate-400">
              {user.email}
            </div>
          </div>
        </div>
      </div>
      <nav className="flex flex-col space-y-4 lg:px-4">
        {navigationItems.map(({ href, label, Icon }) => (
          <Link
            href={href}
            key={href}
            onMouseOver={(e) => console.log(e.currentTarget.href)}
            className={cn(
              'flex items-center gap-x-3 rounded-lg py-2 pl-2 hover:bg-accent focus:bg-accent',
              isCurrentRoute(href) && 'bg-accent',
            )}
          >
            <Icon size={18} />
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default GlobalNavigation;
