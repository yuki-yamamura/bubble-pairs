import { createBreadcrumbs } from './createBreadcrumbs';
import { useRouter } from 'next/router';
import { createContext, useContext } from 'react';

export type Breadcrumb = {
  path: string;
  label: string;
};
type BreadcrumbsContextType = {
  breadcrumbs: Breadcrumb[];
};

const BreadcrumbsContext = createContext<BreadcrumbsContextType | null>(null);

export const BreadcrumbsProvider = ({ children }: React.PropsWithChildren) => {
  const router = useRouter();
  const value = { breadcrumbs: createBreadcrumbs(router.asPath) };

  return (
    <BreadcrumbsContext.Provider value={value}>
      {children}
    </BreadcrumbsContext.Provider>
  );
};

export const useBreadcrumbs = () => {
  const context = useContext(BreadcrumbsContext);

  if (!context) {
    throw new Error('useBreadcrumbs must be used within BreadcrumbsProvider.');
  }

  return context;
};
