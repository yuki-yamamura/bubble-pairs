import type { Breadcrumb } from '..';

export const createBreadcrumbs = (path: string): Breadcrumb[] => {
  const params = path.split('/');

  if (path === '/') {
    return [{ path, label: 'ホーム' }];
  }

  return (
    params
      .map((_, index) => params.slice(0, index + 1).join('/'))
      // replace the first param with '/' to take care of the root path.
      .map((path, index) => (index === 0 ? '/' : path))
      .map((path) => toBreadcrumb(path))
      // exclude unexpected breadcrumbs.
      .filter((path): path is Breadcrumb => path !== null)
      // take two of them to avoid being too long.
      .slice(-2, params.length)
  );
};

const toBreadcrumb = (path: string): Breadcrumb | null => {
  const label = getLabel(path);
  if (!label) {
    return null;
  }

  return { path, label };
};

const getLabel = (path: string): string | null => {
  const activityDetailRegex = /^\/activities\/(.+)$/;
  const gameDetailRegex = /^\/activities\/(.+)\/games\/(.+)$/;
  const memberDetailRegex = /^\/members\/(.+)$/;

  switch (true) {
    // for paths under '/members' route
    case /^\/members\/new$/.test(path): {
      return 'メンバー追加';
    }
    case memberDetailRegex.test(path): {
      return path.match(memberDetailRegex)?.at(1) as string;
    }
    case /^\/members\/?$/.test(path): {
      return 'メンバー';
    }

    // for paths under `/activities/[activityId]/games' route
    case /^\/activities\/.+\/games\/new$/.test(path): {
      return 'ゲーム追加';
    }
    case gameDetailRegex.test(path): {
      return path.match(gameDetailRegex)?.at(1) as string;
    }

    // for paths under '/activities' route
    case /^\/activities\/new$/.test(path): {
      return 'アクティビティ追加';
    }
    case activityDetailRegex.test(path): {
      return path.match(activityDetailRegex)?.at(1) as string;
    }
    case /^\/activities\/?$/.test(path): {
      return 'アクティビティ';
    }

    // for the root path
    case /^\/$/.test(path): {
      return 'ホーム';
    }

    // otherwise return null
    default: {
      return null;
    }
  }
};
