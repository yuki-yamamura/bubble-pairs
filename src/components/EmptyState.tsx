import { cn } from '@/lib/shadcn-ui';

type Props = React.PropsWithChildren<React.ImgHTMLAttributes<HTMLImageElement>>;

const EmptyState = ({ alt, className, children, ...rest }: Props) => (
  <div className="flex flex-col items-center justify-center">
    <img alt={alt} className={cn('h-60 w-60', className)} {...rest} />
    {children}
  </div>
);

export default EmptyState;
