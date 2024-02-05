import { cn } from '@/lib/shadcn-ui';

type Props = React.PropsWithChildren<
  React.HTMLAttributes<HTMLImageElement> & {
    image: string;
  }
>;

const EmptyState = ({ image, children, className }: Props) => (
  <div className="flex h-full w-full flex-col items-center justify-center">
    <img src={image} alt="" className={cn('w-240 h-60', className)} />
    {children}
  </div>
);

export default EmptyState;
