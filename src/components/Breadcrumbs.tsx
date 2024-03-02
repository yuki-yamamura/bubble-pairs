import Link from '@/components/Link';
import { useBreadcrumbs } from '@/context/useBreadcrumbs';
import { cn } from '@/lib/shadcn-ui';
import { ChevronRightIcon } from 'lucide-react';

const Breadcrumbs = () => {
  const { breadcrumbs } = useBreadcrumbs();

  // since the label of breadcrumbs are too long to contain in a mobile device,
  //   so only use the last two one for a mobile device.
  const isMust = (index: number): boolean =>
    breadcrumbs
      .map((_, index) => index)
      .slice(-2)
      .includes(index);

  return (
    <nav className="flex gap-x-1 text-sm">
      {breadcrumbs.map(({ path, label }, index) => {
        const isLastItem = index + 1 === breadcrumbs.length;

        return (
          <div
            className={cn(
              'hidden shrink-0 items-center md:flex',
              isMust(index) && 'flex',
            )}
            key={path}
          >
            {isLastItem ? (
              <div className="text-slate-400">{label}</div>
            ) : (
              <Link href={path}>{label}</Link>
            )}
            {!isLastItem && (
              <ChevronRightIcon size={14} className="ml-2 mr-1 stroke-1" />
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
