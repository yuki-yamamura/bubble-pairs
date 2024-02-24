import Link from '@/components/Link';
import { useBreadcrumbs } from '@/context/breadcrumbs/useBreadcrumbs';
import { ChevronRightIcon } from 'lucide-react';

const Breadcrumbs = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <nav className="flex gap-x-1 text-sm">
      {breadcrumbs.map(({ path, label }, index) => {
        const isLastItem = index + 1 === breadcrumbs.length;

        return (
          <div className="flex items-center" key={path}>
            {isLastItem ? (
              <div className="text-slate-400">{label}</div>
            ) : (
              <Link text={label} href={path} />
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
