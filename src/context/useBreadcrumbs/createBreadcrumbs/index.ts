import type { Breadcrumb } from '..';

export const createBreadcrumbs = (path: string): Breadcrumb[] => {
  const params = path.split('/');

  if (path === '/') return [];

  return params
    .map((_, index) => params.slice(0, index + 1).join('/'))
    .map((path, index) => (index === 0 ? '/' : path)) // take care of the path to home
    .map((path) => toBreadcrumb(path))
    .filter((path): path is Breadcrumb => path !== null); // exclude unexpected breadcrumbs
};

const toBreadcrumb = (path: string): Breadcrumb | null => {
  const label = getLabel(path);
  if (!label) {
    return null;
  }

  return { path, label };
};

const getLabel = (path: string): string | null => {
  const gameDetailRegex = /^\/activities\/(.+)\/games\/(.+)$/;
  const activityDetailRegex = /^\/activities\/(.+)$/;
  const memberDetailRegex = /^\/members\/(.+)$/;
  const placeDetailRegex = /^\/settings\/places\/(.+)$/;

  switch (true) {
    // for the registration pages
    case /^\/members\/new$/.test(path):
    case /^\/activities\/.+\/games\/new$/.test(path):
    case /^\/activities\/new$/.test(path):
    case /^\/settings\/places\/new$/.test(path): {
      return '追加';
    }
    // for the game pages
    case gameDetailRegex.test(path): {
      return path.match(gameDetailRegex)?.at(2) as string;
    }
    case /^\/activities\/.+\/games\/?$/.test(path): {
      return '試合';
    }
    // for the activity pages
    case activityDetailRegex.test(path): {
      return path.match(activityDetailRegex)?.at(1) as string;
    }
    case /^\/activities\/?$/.test(path): {
      return 'アクティビティ';
    }
    // for the member pages
    case memberDetailRegex.test(path): {
      return path.match(memberDetailRegex)?.at(1) as string;
    }
    // for the setting pages
    case /^\/members\/?$/.test(path): {
      return 'メンバー';
    }
    case placeDetailRegex.test(path): {
      return path.match(placeDetailRegex)?.at(1) as string;
    }
    case /^\/settings\/places\/?$/.test(path): {
      return '場所';
    }
    case /^\/settings\/?$/.test(path): {
      return '設定';
    }
    // for the home page
    case /^\/$/.test(path): {
      return 'ホーム';
    }
    // otherwise, return null
    default: {
      return null;
    }
  }
};
