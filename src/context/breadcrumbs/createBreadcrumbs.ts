import type { Breadcrumb } from '@/types/Breadcrumb';

const toBreadcrumb = (path: string): Breadcrumb => {
  const activityDetailRegex = /^\/activities\/(.+)$/;
  const gameDetailRegex = /^\/activities\/(.+)\/games\/(.+)$/;
  const memberDetailRegex = /^\/members\/(.+)$/;

  switch (true) {
    // for the routes under `/activities`
    case /^\/activities\/(.+)\/games\/new$/.test(path): {
      return {
        path,
        label: 'ゲームの作成',
        notFound: false,
      };
    }
    case gameDetailRegex.test(path): {
      const gameId = path.match(gameDetailRegex)?.at(2) as string;

      return {
        path,
        label: gameId,
        notFound: false,
      };
    }
    case /^\/activities\/(.+)\/games\/?$/.test(path): {
      return {
        path,
        label: 'ゲーム',
        notFound: true,
      };
    }
    case /^\/activities\/new$/.test(path): {
      return {
        path,
        label: 'アクティビティの作成',
        notFound: false,
      };
    }
    case activityDetailRegex.test(path): {
      const activityId = path.match(activityDetailRegex)?.at(1) as string;

      return {
        path,
        label: activityId,
        notFound: false,
      };
    }
    case /^\/activities\/?$/.test(path): {
      return {
        path,
        label: 'アクティビティ',
        notFound: false,
      };
    }

    // for the route under `/members`
    case /^\/members\/new$/.test(path): {
      return {
        path,
        label: 'メンバー追加',
        notFound: false,
      };
    }
    case memberDetailRegex.test(path): {
      const memberId = path.match(memberDetailRegex)?.at(1) as string;

      return {
        path,
        label: memberId,
        notFound: false,
      };
    }
    case /^\/members\/?$/.test(path): {
      return {
        path,
        label: 'メンバー',
        notFound: false,
      };
    }

    // for the root
    case /^\/$/.test(path): {
      return {
        path,
        label: 'ホーム',
        notFound: false,
      };
    }

    // otherwise not accepted
    default: {
      throw new Error('useBreadcrumbs must be used in the known paths.');
    }
  }
};

export const createBreadcrumbs = (path: string): Breadcrumb[] => {
  const params = path.split('/');

  return params
    .map((_, index) => params.slice(0, index + 1).join('/'))
    .map((path, index) => (index === 0 ? '/' : path))
    .map((path) => toBreadcrumb(path));
};
