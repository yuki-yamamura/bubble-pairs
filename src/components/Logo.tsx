import { cn } from '@/lib/shadcn-ui';
import { Nunito } from 'next/font/google';

const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
});

type Props = React.ComponentPropsWithoutRef<'div'>;

const Logo = ({ className, ...rest }: Props) => (
  <div
    className={cn('max-w-fit px-2 py-1 text-xl', className, nunito.className)}
    {...rest}
  >
    Bubble Pairs
  </div>
);

export default Logo;
