import GlobalNavigation from '@/components/GlobalNavigation';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { useState } from 'react';

const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const closeNavigation = () => setIsOpen(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger
        hidden={isOpen}
        className="max-w-fit rounded-md hover:bg-accent focus:bg-accent"
      >
        <Menu size={20} onClick={() => setIsOpen(true)} />
      </SheetTrigger>
      <SheetContent side="left">
        <GlobalNavigation onLinkClick={closeNavigation} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
