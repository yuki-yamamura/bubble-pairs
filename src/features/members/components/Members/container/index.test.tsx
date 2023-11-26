import Members from '.';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';

// the workaround for useRouter function.
jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

// the workaround for using the methods provided by dialog element in Jest.
HTMLDialogElement.prototype.show = jest.fn(function mock(
  this: HTMLDialogElement,
) {
  this.open = true;
});

HTMLDialogElement.prototype.showModal = jest.fn(function mock(
  this: HTMLDialogElement,
) {
  this.open = true;
});

HTMLDialogElement.prototype.close = jest.fn(function mock(
  this: HTMLDialogElement,
) {
  this.open = false;
});

describe('Members', () => {
  describe('initialization', () => {
    test('should render member names in the correct order', async () => {
      render(<Members />);

      const members = within(await screen.findByRole('list')).getAllByRole(
        'listitem',
      );

      // if a member has a display name, show it; otherwise use his/her name instead.
      // show member names by registration time.
      expect(members).toHaveLength(4);
      expect(members[0]).toHaveTextContent('ミノ');
      expect(members[1]).toHaveTextContent('Sさん');
      expect(members[2]).toHaveTextContent('吉田 茂');
      expect(members[3]).toHaveTextContent('ユカリ');
    });
  });

  describe('if a user clicks the sort button', () => {
    let user: UserEvent;

    beforeEach(async () => {
      user = userEvent.setup();

      render(<Members />);
      await user.click(await screen.findByRole('button', { name: '並び替え' }));
    });

    test('should render a modal to select the sort key', () => {
      const dialog = screen.getByRole('dialog');
      const radioButtons = within(dialog).getAllByRole('radio');

      // check for the title.
      expect(within(dialog).getByText('並び替え')).toBeInTheDocument();

      // check for the order of sort keys.
      expect(radioButtons).toHaveLength(4);
      expect(radioButtons[0]).toHaveAccessibleName('登録順');
      expect(radioButtons[1]).toHaveAccessibleName('表示名順');
      expect(radioButtons[2]).toHaveAccessibleName('性別順');
      expect(radioButtons[3]).toHaveAccessibleName('レベル順');

      // check that the initial sort key is registration time.
      expect(radioButtons[0]).toBeChecked();
      expect(radioButtons[1]).not.toBeChecked();
      expect(radioButtons[2]).not.toBeChecked();
      expect(radioButtons[3]).not.toBeChecked();
    });

    describe('each sort key should work correctly', () => {
      describe('if a user selects the radio button labeled by "表示名順"', () => {
        test('should sort members by display name', async () => {
          await user.click(screen.getByRole('radio', { name: '表示名順' }));
          await user.click(screen.getByRole('button', { name: '適用' }));

          const members = within(await screen.findByRole('list')).getAllByRole(
            'listitem',
          );

          // if a member does not have his/her display name, use kana or name to compare.
          expect(members).toHaveLength(4);
          expect(members[0]).toHaveTextContent('Sさん');
          expect(members[1]).toHaveTextContent('ミノ');
          expect(members[2]).toHaveTextContent('ユカリ');
          expect(members[3]).toHaveTextContent('吉田 茂');
        });
      });

      describe('if a user selects the radio button labeled by "性別順"', () => {
        test('should sort members by sex', async () => {
          await user.click(screen.getByRole('radio', { name: '性別順' }));
          await user.click(screen.getByRole('button', { name: '適用' }));

          const members = within(await screen.findByRole('list')).getAllByRole(
            'listitem',
          );

          // the expected order is makes > females > people not-known.
          expect(members).toHaveLength(4);
          expect(members[0]).toHaveTextContent('吉田 茂');
          expect(members[1]).toHaveTextContent('Sさん');
          expect(members[2]).toHaveTextContent('ユカリ');
          expect(members[3]).toHaveTextContent('ミノ');
        });
      });

      describe('if a user selects the radio button labeled by "レベル順"', () => {
        test('should sort members by level', async () => {
          await user.click(screen.getByRole('radio', { name: 'レベル順' }));
          await user.click(screen.getByRole('button', { name: '適用' }));

          const members = within(await screen.findByRole('list')).getAllByRole(
            'listitem',
          );

          // the expected order is beginner > elementary > intermediate > advanced.
          expect(members).toHaveLength(4);
          expect(members[0]).toHaveTextContent('吉田 茂');
          expect(members[1]).toHaveTextContent('Sさん');
          expect(members[2]).toHaveTextContent('ミノ');
          expect(members[3]).toHaveTextContent('ユカリ');
        });
      });

      describe('if a user cancels to change the sort key', () => {
        test('should not change the sort order', async () => {
          await user.click(screen.getByRole('radio', { name: '表示名順' }));
          await user.click(screen.getByRole('button', { name: 'キャンセル' }));

          const members = within(await screen.findByRole('list')).getAllByRole(
            'listitem',
          );

          // because a user cancels to change the sort key, members are still sorted by registration time.
          expect(members).toHaveLength(4);
          expect(members[0]).toHaveTextContent('ミノ');
          expect(members[1]).toHaveTextContent('Sさん');
          expect(members[2]).toHaveTextContent('吉田 茂');
          expect(members[3]).toHaveTextContent('ユカリ');
        });
      });
    });
  });

  describe('if a user clicks the filter button', () => {
    let user: UserEvent;

    beforeEach(async () => {
      user = userEvent.setup();

      render(<Members />);
      await user.click(await screen.findByRole('button', { name: '絞り込み' }));
    });

    test('should render a modal to select filter conditions', () => {
      const sexOptions = within(
        screen.getByRole('group', { name: '性別' }),
      ).getAllByRole('checkbox');
      const levelOptions = within(
        screen.getByRole('group', { name: 'レベル' }),
      ).getAllByRole('checkbox');

      // check for the order and no value checked in sex group.
      expect(sexOptions[0]).toHaveAccessibleName('男性');
      expect(sexOptions[0]).not.toBeChecked();
      expect(sexOptions[1]).toHaveAccessibleName('女性');
      expect(sexOptions[1]).not.toBeChecked();
      expect(sexOptions[2]).toHaveAccessibleName('不明');
      expect(sexOptions[2]).not.toBeChecked();

      // check for the order and no value checked in level group.
      expect(levelOptions[0]).toHaveAccessibleName('入門');
      expect(levelOptions[0]).not.toBeChecked();
      expect(levelOptions[1]).toHaveAccessibleName('初級');
      expect(levelOptions[1]).not.toBeChecked();
      expect(levelOptions[2]).toHaveAccessibleName('中級');
      expect(levelOptions[2]).not.toBeChecked();
      expect(levelOptions[3]).toHaveAccessibleName('上級');
      expect(levelOptions[3]).not.toBeChecked();
    });

    describe('if a user selects the filter labelled by "男性"', () => {
      test('should filter members without males', async () => {
        await user.click(screen.getByRole('checkbox', { name: '男性' }));
        await user.click(screen.getByRole('button', { name: '適用' }));

        const members = within(screen.getByRole('list')).getAllByRole(
          'listitem',
        );

        expect(members).toHaveLength(1);
        expect(members[0]).toHaveTextContent('吉田 茂');
      });
    });

    describe('if a user selects the filter labelled by "中級"', () => {
      test('should filter members without intermediate level', async () => {
        await user.click(screen.getByRole('checkbox', { name: '中級' }));
        await user.click(screen.getByRole('button', { name: '適用' }));

        const members = within(screen.getByRole('list')).getAllByRole(
          'listitem',
        );

        expect(members).toHaveLength(1);
        expect(members[0]).toHaveTextContent('ミノ');
      });
    });

    describe('if a user selects the multiple filters', () => {
      test('should filter members by "AND" conditions', async () => {
        await user.click(screen.getByRole('checkbox', { name: '女性' }));
        await user.click(screen.getByRole('checkbox', { name: '入門' }));
        await user.click(screen.getByRole('checkbox', { name: '上級' }));
        await user.click(screen.getByRole('button', { name: '適用' }));

        const members = within(screen.getByRole('list')).getAllByRole(
          'listitem',
        );

        expect(members).toHaveLength(1);
        expect(members[0]).toHaveTextContent('ユカリ');
      });
    });

    describe('if a user cancels to filter members', () => {
      test('should not change the filter condition', async () => {
        await user.click(screen.getByRole('checkbox', { name: '初級' }));
        await user.click(screen.getByRole('checkbox', { name: '不明' }));
        await user.click(screen.getByRole('button', { name: 'キャンセル' }));

        const members = within(screen.getByRole('list')).getAllByRole(
          'listitem',
        );

        expect(members).toHaveLength(4);
        expect(members[0]).toHaveTextContent('ミノ');
        expect(members[1]).toHaveTextContent('Sさん');
        expect(members[2]).toHaveTextContent('吉田 茂');
        expect(members[3]).toHaveTextContent('ユカリ');
      });
    });

    describe('if a user selects filter conditions that do not match any members', () => {
      test('should show an empty state', async () => {
        // at first, there is no empty state.
        expect(
          screen.queryByText('条件に該当するメンバーがいません。'),
        ).not.toBeInTheDocument();

        await user.click(screen.getByRole('checkbox', { name: '上級' }));
        await user.click(screen.getByRole('checkbox', { name: '男性' }));
        await user.click(screen.getByRole('button', { name: '適用' }));

        // after some of the filter conditions are applied,
        // show an empty state instead of the member list, because there is no man in advanced level.
        expect(screen.queryByRole('list')).not.toBeInTheDocument();
        expect(
          screen.getByText('条件に該当するメンバーがいません。'),
        ).toBeInTheDocument();
      });
    });
  });
});
