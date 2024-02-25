import { cn } from '@/lib/shadcn-ui';
import { Nunito } from 'next/font/google';

const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
});
const Logo = () => (
  <div className={cn('max-w-fit px-2 py-1 text-xl', nunito.className)}>
    Bubble Pairs
  </div>
);

export default Logo;
