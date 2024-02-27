import { cn } from '@/lib/shadcn-ui';
import LinkPrimitive from 'next/link';

type Props = React.ComponentPropsWithoutRef<typeof LinkPrimitive>;

const Link = ({ className, children, ...rest }: Props) => (
  <LinkPrimitive
    {...rest}
    className={cn(
      'text-primary-blue underline-offset-4  hover:underline',
      className,
    )}
  >
    {children}
  </LinkPrimitive>
);

export default Link;
