import { fakeMembers } from '@/mocks/fakeData/members';
import { expect, test } from '@playwright/test';

import type { Member } from '@prisma/client';

test.beforeEach(async ({ page }) => {
  await page.route('/api/members', async (route) => {
    await route.fulfill({
      status: 200,
      json: { members: fakeMembers },
    });
  });
});

test.describe('New member page', () => {
  test('allows users to add a new member', async ({ page }) => {
    // a user visits the members page, then click the new member button.
    await page.goto('/members');
    await page.getByRole('button', { name: 'メンバー追加' }).click();

    // navigate to '/members/new' that shows the new member form.
    await expect(page).toHaveURL('/members/new');
    await page.getByRole('textbox', { name: '名前（必須）' }).fill('渡辺 早季');
    await page.getByRole('radio', { name: '女性' }).click();

    const newMember: Member = {
      id: 5,
      createdAt: new Date('2023-04-30T13:00:00+09:00'),
      updatedAt: new Date('2023-04-30T13:00:00+09:00'),
      name: '渡辺 早季',
      kana: null,
      displayName: null,
      sex: 'FEMALE',
      level: 'BEGINNER',
      avatar: 'https://picsum.photos/200/300.jpg?random=5',
      note: null,
    };
    await page.route('/api/members', (route) =>
      route.fulfill({
        status: 200,
        json: { members: [...fakeMembers, newMember] },
      }),
    );

    // the user fills out some of the fields.
    await page.getByRole('button', { name: 'メンバーを追加する' }).click();
    // await page.goto('/members');
    await expect(page.getByText('渡辺 早季')).toBeVisible();
  });
});
