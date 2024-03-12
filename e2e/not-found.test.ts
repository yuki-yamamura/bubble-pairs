import { expect, test } from '@playwright/test';

test.describe('not found page', () => {
  test.describe('if user visits a page that does not exist', () => {
    test.skip('show a page including a link to redirect to the home page', async ({
      page,
    }) => {
      await page.goto('/no-such-page');

      // shows the 404 page that contains a link to the home page.
      await expect(
        page.getByRole('heading', { name: 'ページが見つかりませんでした' }),
      ).toBeVisible();

      const link = page.getByRole('link', { name: 'ホームに戻る' });
      await link.click();
      await expect(page).toHaveURL('/');
    });
  });
});
