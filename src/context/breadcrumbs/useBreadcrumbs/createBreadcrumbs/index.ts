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
  const placeDetailRegex = /^\/settings\/places\/(.+)$/;

  switch (true) {
    // for paths under '/members'
    case /^\/members\/new$/.test(path): {
      return '追加';
    }
    case memberDetailRegex.test(path): {
      return path.match(memberDetailRegex)?.at(1) as string;
    }
    case /^\/members\/?$/.test(path): {
      return 'メンバー';
    }

    // for paths under `/activities/[activityId]/games'
    case /^\/activities\/.+\/games\/new$/.test(path): {
      return '追加';
    }
    case gameDetailRegex.test(path): {
      return path.match(gameDetailRegex)?.at(1) as string;
    }
    case /^\/activities\/.+\/games\/?$/.test(path): {
      return 'ゲーム';
    }

    // for paths under '/activities'
    case /^\/activities\/new$/.test(path): {
      return '追加';
    }
    case activityDetailRegex.test(path): {
      return path.match(activityDetailRegex)?.at(1) as string;
    }
    case /^\/activities\/?$/.test(path): {
      return 'アクティビティ';
    }

    // for paths under '/settings'
    case /^\/settings\/places\/new$/.test(path): {
      return '追加';
    }
    case placeDetailRegex.test(path): {
      return path.match(placeDetailRegex)?.at(1) as string;
    }
    case /^\/settings\/places\/?$/.test(path): {
      return '活動場所';
    }
    case /^\/settings\/?$/.test(path): {
      return '設定';
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
