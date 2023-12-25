import { fakeMembers } from '@/mocks/fakeData/members';
import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.route('/api/members', async (route) => {
    await route.fulfill({
      status: 200,
      json: { members: fakeMembers },
    });
  });
});

test.describe('Members page', () => {
  test('allows users to sort and filter members', async ({ page }) => {
    await page.goto('/members');

    const members = page.getByRole('list').getByRole('listitem');

    // a user can see the list of the members sorted by registration time.
    await expect(members).toHaveText(['ミノ', 'Sさん', '吉田 茂', 'ユカリ']);

    // the user would like to sort the members by level.
    await page.getByRole('button', { name: '並び替え' }).click();
    await page.getByRole('radio', { name: 'レベル順' }).click();
    await page.getByRole('button', { name: '適用' }).click();

    // the user can see the list of the members sorted by level.
    await expect(members).toHaveText(['吉田 茂', 'Sさん', 'ミノ', 'ユカリ']);

    // after checking the members, the user would like to filter members without females.
    await page.getByRole('button', { name: '絞り込み' }).click();
    await page.getByRole('checkbox', { name: '女性' }).click();
    await page.getByRole('button', { name: '適用' }).click();

    // now, the user can see the list of female members sorted by level.
    const filteredMemberNames = ['Sさん', 'ユカリ'];
    await expect(members).toHaveText(filteredMemberNames);
  });
});
