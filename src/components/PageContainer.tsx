import Breadcrumbs from '@/components/Breadcrumbs';
import { Separator } from '@/components/ui/separator';

type Props = React.PropsWithChildren<{ title: string }>;

const PageContainer = ({ title, children }: Props) => (
  <div className="mx-auto w-full max-w-screen-md sm:px-10">
    <header className="flex flex-col pb-12 pt-8">
      <h1 className="text-lg sm:text-xl">{title}</h1>
      <Separator className="mb-2 mt-1" />
      <div className="self-end">
        <Breadcrumbs />
      </div>
    </header>
    {children}
  </div>
);

export default PageContainer;
