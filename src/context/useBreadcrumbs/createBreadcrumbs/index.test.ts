import { createBreadcrumbs } from '.';

import type { Breadcrumb } from '..';

describe('createBreadcrumbs', () => {
  describe("if the path is '/'", () => {
    test('returns an empty array because no breadcrumbs need in the home page', () => {
      // arrange
      const path = '/';
      const expected: Breadcrumb[] = [];

      // act
      const result = createBreadcrumbs(path);

      // assert
      expect(result.sort()).toEqual(expected);
    });
  });

  describe('if the path indicates a new member page', () => {
    test('returns the correct breadcrumbs', () => {
      // arrange
      const path = '/members/new';
      const expected: Breadcrumb[] = [
        { path: '/', label: 'ホーム' },
        { path: '/members', label: 'メンバー' },
        { path: '/members/new', label: '追加' },
      ];

      // act
      const result = createBreadcrumbs(path);

      // assert
      expect(result.sort()).toEqual(expected);
    });
  });

  describe('if the path indicates a game detail page', () => {
    test('return the correct breadcrumbs', () => {
      // arrange
      const path =
        '/activities/clsm7h1vi0006dam59dq1legc/games/cltai9xl8000ycxxl6e251jod';
      const expected: Breadcrumb[] = [
        {
          path: '/',
          label: 'ホーム',
        },
        {
          path: '/activities',
          label: 'アクティビティ',
        },
        {
          path: '/activities/clsm7h1vi0006dam59dq1legc',
          label: 'clsm7h1vi0006dam59dq1legc',
        },
        {
          path: '/activities/clsm7h1vi0006dam59dq1legc/games',
          label: 'ゲーム',
        },
        {
          path: '/activities/clsm7h1vi0006dam59dq1legc/games/cltai9xl8000ycxxl6e251jod',
          label: 'cltai9xl8000ycxxl6e251jod',
        },
      ];

      // act
      const result = createBreadcrumbs(path);

      // assert
      expect(result.sort()).toEqual(expected);
    });
  });
});
