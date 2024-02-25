import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/shadcn-ui';
import {
  ActivityIcon,
  HomeIcon,
  Menu,
  SettingsIcon,
  SmileIcon,
} from 'lucide-react';
import { Nunito } from 'next/font/google';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

import type { LucideIcon } from 'lucide-react';

const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
});

const Navigation = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  if (!session) {
    // throw new Error();
  }

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
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger hidden={open} className="max-w-fit">
        <Menu size={36} onClick={() => setOpen(true)} className="p-2" />
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader className="mt-8">
          <div className={cn('mb-8 text-center text-xl', nunito.className)}>
            Bubble Pairs
          </div>
        </SheetHeader>
        <div className="flex items-center gap-x-4">
          <Avatar className="h-12 w-12 border border-border p-2">
            <AvatarImage src="/images/dolphin.png" alt="guest" />
          </Avatar>
          <div className="flex flex-col">
            <div>{session?.user.name}</div>
            <div className="text-xs text-slate-400">{session?.user.email}</div>
          </div>
        </div>
        <Separator className="mb-8 mt-4" />
        <nav className="flex flex-col space-y-4">
          {navigationItems.map(({ href, label, Icon }) => (
            <Link
              onClick={() => setOpen(false)}
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
