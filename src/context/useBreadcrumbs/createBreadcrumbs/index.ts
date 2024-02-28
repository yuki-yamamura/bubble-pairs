import type { Breadcrumb } from '..';

export const createBreadcrumbs = (path: string): Breadcrumb[] => {
  const params = path.split('/');

  if (path === '/') return [];

  return params
    .map((_, index) => params.slice(0, index + 1).join('/'))
    .map((path, index) => (index === 0 ? '/' : path)) // take care of the path to home
    .slice(-2, params.length) // pick the last two breadcrumbs because of the device width
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
  const activityDetailRegex = /^\/activities\/(^\/+)$/;
  const gameDetailRegex = /^\/activities\/(.+)\/games\/(^\/+)$/;
  const memberDetailRegex = /^\/members\/(^\/+)$/;
  const placeDetailRegex = /^\/settings\/places\/(^\/+)$/;

  switch (true) {
    // for the registration pages
    case /^\/members\/new$/.test(path):
    case /^\/activities\/.+\/games\/new$/.test(path):
    case /^\/activities\/new$/.test(path):
    case /^\/settings\/places\/new$/.test(path): {
      return '追加';
    }
    // for the detail pages
    case activityDetailRegex.test(path): {
      return path.match(activityDetailRegex)?.at(1) as string;
    }
    case gameDetailRegex.test(path): {
      return path.match(gameDetailRegex)?.at(2) as string;
    }
    case memberDetailRegex.test(path): {
      return path.match(memberDetailRegex)?.at(1) as string;
    }
    case placeDetailRegex.test(path): {
      return path.match(placeDetailRegex)?.at(1) as string;
    }
    // for the list pages
    case /^\/activities\/?$/.test(path): {
      return 'アクティビティ';
    }
    case /^\/activities\/.+\/games\/?$/.test(path): {
      return 'ゲーム';
    }
    case /^\/members\/?$/.test(path): {
      return 'メンバー';
    }
    case /^\/settings\/places\/?$/.test(path): {
      return '活動場所';
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
