import { expect, test } from '@playwright/test';

const initialMemberNames = ['ミノ', 'Sさん', '吉田 茂', 'ユカリ'];

test.describe('Members page', () => {
  test('allows users to sort members', async ({ page }) => {
    await page.goto('/');

    const members = page
      .getByRole('list', { name: /members/i })
      .getByRole('listitem');

    // a user can see the list of the members sorted by registration time.
    await expect(members).toHaveText(initialMemberNames);

    // clicks the sort button to change the sort order.
    const sortButton = page.getByRole('button', { name: '並び替え' });
    await sortButton.click();

    // the user would like to sort the members by level.
    await page.getByRole('radio', { name: 'レベル順' }).click();
    const applyButton = page.getByRole('button', { name: '適用' });
    await applyButton.click();

    // now, the user can see the list of the members sorted by level.
    await expect(members).toHaveText(['吉田 茂', 'Sさん', 'ミノ', 'ユカリ']);

    // after checking, the user would like to revert the sort order.
    await sortButton.click();
    await page.getByRole('radio', { name: '登録順' }).click();
    await applyButton.click();

    // the user can see the list of the members as expected.
    await expect(members).toHaveText(initialMemberNames);

    // the user has changed his mind and would like to know
    // how many members are females and elementary level.
    await page.getByRole('button', { name: '絞り込み' }).click();
    await page.getByRole('checkbox', { name: '女性' }).click();
    await page.getByRole('checkbox', { name: '初級' }).click();
    await applyButton.click();

    // now, the user can see there's only one member who matches the condition.
    const filteredMemberNames = ['Sさん'];
    await expect(page.getByRole('list')).toHaveText(filteredMemberNames);
  });
});
