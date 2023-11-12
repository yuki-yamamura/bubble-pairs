import { expect, test } from '@playwright/test';

test.describe('Members page', () => {
  test('allows users to sort members', async ({ page }) => {
    page.on('console', (message) => console.log(message.text()));

    await page.goto('/');

    await expect(page.getByRole('list', { name: /members/i })).toBeVisible();
    const members = await page.getByRole('list').getByRole('listitem').all();

    // a user can see the list of the members sorted by registration time.
    const initialMemberNames = ['ミノ', 'Sさん', '吉田 茂', 'ユカリ'];
    for (let i = 0; i < members.length; i++) {
      await expect(members[i]).toHaveText(initialMemberNames[i]);
    }

    // clicks the sort button to change the sort order.
    await page.getByRole('button', { name: '並び替え' }).click();

    // selects the level button, then clicks the apply button.
    await page.getByRole('radio', { name: 'レベル順' }).click();
    await page.getByRole('button', { name: '適用' }).click();

    // now, a user can see the list of the members sorted by level.
    const memberNamesSortedByLevel = ['吉田 茂', 'Sさん', 'ミノ', 'ユカリ'];
    for (let i = 0; i < memberNamesSortedByLevel.length; i++) {
      await expect(members[i]).toHaveText(memberNamesSortedByLevel[i]);
    }

    // changes the condition.
    await page.getByRole('button', { name: '並び替え' }).click();
    await page.getByRole('radio', { name: '登録順' }).click();
    await page.getByRole('button', { name: '適用' }).click();

    // after that, a user can see the list of the members as expected.
    for (let i = 0; i < members.length; i++) {
      await expect(members[i]).toHaveText(initialMemberNames[i]);
    }
  });
});
