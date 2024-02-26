import Logo from '@/components/Logo';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useUser } from '@/context/useUser';
import { cn } from '@/lib/shadcn-ui';
import {
  ActivityIcon,
  HomeIcon,
  Menu,
  SettingsIcon,
  SmileIcon,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import type { LucideIcon } from 'lucide-react';

const Navigation = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
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
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger hidden={isOpen} className="max-w-fit">
        <Menu size={36} onClick={() => setIsOpen(true)} className="p-2" />
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader className="mb-8 mt-20">
          <div className="flex justify-center">
            <Logo />
          </div>
        </SheetHeader>
        <div className="flex items-center gap-x-4">
          <Avatar className="h-12 w-12 border border-border p-2">
            <AvatarImage src="/images/dolphin.png" />
          </Avatar>
          <div className="flex flex-col">
            <div className="line-clamp-1">{user.name}</div>
            <div className="line-clamp-1 text-xs text-slate-400">
              {user.email}
            </div>
          </div>
        </div>
        <Separator className="mb-8 mt-3" />
        <nav className="flex flex-col space-y-4">
          {navigationItems.map(({ href, label, Icon }) => (
            <Link
              onClick={() => setIsOpen(false)}
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
      </SheetContent>
    </Sheet>
  );
};

export default Navigation;
