import Breadcrumbs from '@/components/Breadcrumbs';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/shadcn-ui';
import { Nunito } from 'next/font/google';

const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
});

type Props = React.PropsWithChildren<{ title: string }>;

const PageContainer = ({ title, children }: Props) => (
  <div className="mx-auto w-full max-w-screen-md pb-20 sm:px-10">
    <header className="flex flex-col pb-12 pt-8">
      <h1 className={cn('text-lg sm:text-xl', nunito.className)}>{title}</h1>
      <Separator className="mb-2 mt-1" />
      <div className="self-end">
        <Breadcrumbs />
      </div>
    </header>
    {children}
  </div>
);

export default PageContainer;
