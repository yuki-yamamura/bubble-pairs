import { expect, test } from '@playwright/test';

test.describe('error page', () => {
  test.describe('if an error happens in the server', () => {
    test('shows the error page', async ({ page }) => {
      await page.goto('/500');

      await expect(
        page.getByRole('heading', { name: '問題が発生しました' }),
      ).toBeVisible();
    });
  });
});
