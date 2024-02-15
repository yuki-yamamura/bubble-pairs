import { Button as ButtonPrimitive } from './ui/button';
import { cn } from '@/lib/shadcn-ui';
import { Loader2 } from 'lucide-react';
import { forwardRef } from 'react';

type Props = React.ComponentPropsWithRef<typeof ButtonPrimitive> & {
  isBusy?: boolean;
};

const Button = forwardRef<HTMLButtonElement, Props>(
  function Button(props, ref) {
    const { isBusy, className, children, ...rest } = props;

    return (
      <ButtonPrimitive
        disabled={isBusy}
        aria-busy={isBusy}
        className={cn('inline-flex gap-x-1 rounded-3xl py-3', className)}
        ref={ref}
        {...rest}
      >
        {isBusy && (
          <Loader2 size={16} className="animate-spin text-slate-300" />
        )}
        {children}
      </ButtonPrimitive>
    );
  },
);

export default Button;
