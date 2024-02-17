import type { Breadcrumb } from '@/types/Breadcrumb';

export const createBreadcrumbs = (path: string): Breadcrumb[] => {
  const params = path.split('/');

  if (path === '/') {
    return [{ path, label: 'ホーム' }];
  }

  return (
    params
      .map((_, index) => params.slice(0, index + 1).join('/'))
      // replace the first param with '/'.
      .map((path, index) => (index === 0 ? '/' : path))
      // requires two breadcrumbs.
      .slice(-2, params.length)
      .map((path) => toBreadcrumb(path))
      .filter((path): path is Breadcrumb => path !== null)
  );
};

const toBreadcrumb = (path: string): Breadcrumb | null => {
  const activityDetailRegex = /^\/activities\/(.+)$/;
  const gameDetailRegex = /^\/activities\/(.+)\/games\/(.+)$/;
  const memberDetailRegex = /^\/members\/(.+)$/;

  switch (true) {
    // paths under '/members'
    case /^\/members\/new$/.test(path): {
      return {
        path,
        label: 'メンバー追加',
      };
    }
    case memberDetailRegex.test(path): {
      return {
        path,
        label: formatId(path.match(memberDetailRegex)?.at(1) as string),
      };
    }
    case /^\/members\/?$/.test(path): {
      return {
        path,
        label: 'メンバー',
      };
    }

    // paths under '/activities/[activityId]/games'
    case /^\/activities\/.+\/games\/new$/.test(path): {
      return {
        path,
        label: 'ゲーム追加',
      };
    }
    case gameDetailRegex.test(path): {
      return {
        path,
        label: formatId(path.match(gameDetailRegex)?.at(1) as string),
      };
    }
    case /^\/activities\/.+\/games\/?$/.test(path): {
      // since this route does not exist, return nul to exclude it from breadcrumbs.
      return null;
    }

    // paths under '/activities'
    case /^\/activities\/new$/.test(path): {
      return {
        path,
        label: 'アクティビティ追加',
      };
    }
    case activityDetailRegex.test(path): {
      return {
        path,
        label: formatId(path.match(activityDetailRegex)?.at(1) as string),
      };
    }
    case /^\/activities\/?$/.test(path): {
      return {
        path,
        label: 'アクティビティ',
      };
    }
    case /^\/$/.test(path): {
      return {
        path,
        label: 'ホーム',
      };
    }

    // otherwise return null.
    default: {
      return null;
    }
  }
};

const formatId = (id: string): string => {
  return `ID:${id.substring(7, -1)}...`;
};
