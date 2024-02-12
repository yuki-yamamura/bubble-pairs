import { Button as ButtonPrimitive } from './ui/button';
import { cn } from '@/lib/shadcn-ui';
import { Loader2 } from 'lucide-react';

type Props = React.ComponentPropsWithoutRef<typeof ButtonPrimitive> & {
  isBusy?: boolean;
};

const Button = ({ isBusy, className, children, ...rest }: Props) => (
  <ButtonPrimitive
    disabled={isBusy}
    aria-busy={isBusy}
    className={cn('inline-flex gap-x-1 rounded-3xl py-3', className)}
    {...rest}
  >
    {isBusy && <Loader2 size={16} className="animate-spin text-slate-300" />}
    {children}
  </ButtonPrimitive>
);

export default Button;
