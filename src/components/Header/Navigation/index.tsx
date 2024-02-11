import { Avatar, AvatarImage } from '@/components/ui/avatar';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const Navigation = () => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Menu size={20} onClick={() => setOpen(true)} />
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <div className="mb-8">Bubble Pairs</div>
        </SheetHeader>
        <div className="mb-8 flex items-center gap-x-4">
          <Avatar>
            <AvatarImage src="/images/dolphin.png" alt="guest" />
          </Avatar>
          <div>ゲストユーザー</div>
        </div>
        <SheetClose className="flex flex-col space-y-3">
          <Link onClick={() => setOpen(false)} href="/">
            ホーム
          </Link>
          <Link onClick={() => setOpen(false)} href="/members">
            メンバー
          </Link>
          <Link onClick={() => setOpen(false)} href="activities">
            アクティビティ
          </Link>
          <Link onClick={() => setOpen(false)} href="settings">
            設定
          </Link>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
};

export default Navigation;
