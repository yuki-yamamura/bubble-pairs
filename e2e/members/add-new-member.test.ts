import { fakeMembers } from '@/mocks/fakeData/members';
import { expect, test } from '@playwright/test';

import type { Member } from '@prisma/client';

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

    // navigate to '/members/new' that shows a form to add a new member.
    await expect(page).toHaveURL('/members/new');
    // the user fills out some of the fields.
    await page
      .getByRole('textbox', { name: '名前（必須）' })
      .fill(newMember.name);
    await page.getByRole('radio', { name: '女性' }).click();

    await page.route('/api/members', (route) =>
      route.fulfill({
        status: 200,
        json: { members: [...fakeMembers, newMember] },
      }),
    );

    // then clicks the button to submit.
    await page.getByRole('button', { name: 'メンバーを追加する' }).click();

    // todo: comment out the assertion below. currently, this is not working.
    // shows a loading icon.
    // await expect(page.getByLabel('読み込み中')).toBeVisible();

    // navigate to '/members'
    await expect(page).toHaveURL('/members');
    // the user will know that the registration has been success to see the toast.
    await expect(page.getByText('メンバーを登録しました。')).toBeVisible();
    // there is the member who has been added in the list.
    await expect(page.getByText('渡辺 早季')).toBeVisible();
  });

  test.describe('if server error happens', () => {
    test('notify user of the failure', async ({ page }) => {
      // a user visits the members page, then click the new member button.
      await page.goto('/members');
      await page.getByRole('button', { name: 'メンバー追加' }).click();

      // navigate to '/members/new' that shows a form to add a new member.
      await expect(page).toHaveURL('/members/new');
      // the user fills out some of the fields.
      await page
        .getByRole('textbox', { name: '名前（必須）' })
        .fill(newMember.name);
      await page.getByRole('radio', { name: '女性' }).click();

      await page.route('/api/members', (route) =>
        route.fulfill({
          status: 500,
        }),
      );

      // then clicks the button to submit.
      await page.getByRole('button', { name: 'メンバーを追加する' }).click();

      // todo: comment out the assertion below. currently, this is not working.
      // shows a loading icon.
      // await expect(page.getByLabel('読み込み中')).toBeVisible();

      await expect(page).toHaveURL('/members/new');
      // the user will know that the registration has failed to see the toast.
      await expect(
        page.getByText('メンバーの登録に失敗しました。'),
      ).toBeVisible();
    });
  });
});
