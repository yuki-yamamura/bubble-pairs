import { createBreadcrumbs } from '.';

import type { Breadcrumb } from '..';

describe('createBreadcrumbs', () => {
  describe('returns the correct breadcrumb depending on the path', () => {
    test("if the path is '/'", () => {
      // arrange
      const path = '/';
      const expected: Breadcrumb[] = [{ path: '/', label: 'ホーム' }];

      // act
      const result = createBreadcrumbs(path);

      // assert
      expect(result.sort()).toEqual(expected);
    });

    test("if the path is '/members/new'", () => {
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

    test("if the path is '/activities/clsm7h1vi0006dam59dq1legc/games/new'", () => {
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
