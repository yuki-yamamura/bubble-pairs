import { buttonVariants } from './ui/button';
import { useBreadcrumbs } from '@/context/breadcrumbs/useBreadcrumbs';
import { cn } from '@/lib/shadcn-ui';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Breadcrumbs = () => {
  const { breadcrumbs } = useBreadcrumbs();
  const router = useRouter();

  return (
    <nav className="flex gap-x-1">
      {breadcrumbs.map(({ path, label, notFound }, index) => (
        <div className="flex items-center" key={path}>
          <Link
            href={path}
            aria-disabled={notFound || path === router.asPath}
            className={cn(
              buttonVariants({ variant: 'link' }),
              'h-5 px-1',
              (notFound || path === router.asPath) &&
                'pointer-events-none opacity-50',
            )}
          >
            {label}
          </Link>
          {index + 1 !== breadcrumbs.length && (
            <ChevronRight size={14} className="ml-2" />
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
