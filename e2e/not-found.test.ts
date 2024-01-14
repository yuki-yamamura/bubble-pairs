import { expect, test } from '@playwright/test';

test.describe('Not found page', () => {
  test('navigates users to the home page', async ({ page }) => {
    // a users visits a page that doesn't exist.
    await page.goto('/no-such-page');

    // shows a 404 not found page to let the user return to the home page.
    await expect(
      page.getByRole('heading', { name: 'ページが見つかりませんでした' }),
    ).toBeVisible();

    const link = page.getByRole('link', { name: 'ホームに戻る' });
    await link.click();
    await expect(page).toHaveURL('/');
  });
});
