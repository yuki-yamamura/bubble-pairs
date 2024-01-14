import { expect, test } from '@playwright/test';

test.describe('error page', () => {
  test.describe('if internal server error happens', () => {
    test('shows a user error page', async ({ page }) => {
      await page.goto('/500');

      await expect(
        page.getByRole('heading', { name: '問題が発生しました' }),
      ).toBeVisible();
      await expect(
        page.getByText('時間をおいてからお試しください。'),
      ).toBeVisible();
    });
  });
});
