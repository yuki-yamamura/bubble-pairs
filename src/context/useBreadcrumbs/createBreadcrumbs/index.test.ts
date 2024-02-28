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

  describe('if the path is more complex', () => {
    test('returns two of the breadcrumbs to navigate user', () => {
      // arrange
      const path = '/members/new';
      const expected: Breadcrumb[] = [
        { path: '/members', label: 'メンバー' },
        { path: '/members/new', label: '追加' },
      ];

      // act
      const result = createBreadcrumbs(path);

      // assert
      expect(result.sort()).toEqual(expected);
    });

    test('returns the breadcrumbs including id correctly', () => {
      // arrange
      const path = '/activities/clsm7h1vi0006dam59dq1legc/games/new';
      const expected: Breadcrumb[] = [
        {
          path: '/activities/clsm7h1vi0006dam59dq1legc/games',
          label: 'ゲーム',
        },
        {
          path: '/activities/clsm7h1vi0006dam59dq1legc/games/new',
          label: '追加',
        },
      ];

      // act
      const result = createBreadcrumbs(path);

      // assert
      expect(result.sort()).toEqual(expected);
    });
  });
});
