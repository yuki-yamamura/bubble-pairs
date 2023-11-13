import Members from '.';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';

describe('Members', () => {
  describe('initialization', () => {
    test('should render members name in the correct order', async () => {
      render(<Members />);

      // if a member has a display name, show it; otherwise use his/her name instead.
      const expectedMemberNames = ['ミノ', 'Sさん', '吉田 茂', 'ユカリ'];

      const memberList = await screen.findByRole('list');
      const members = within(memberList).getAllByRole('listitem');

      // at first, members should be ordered by registration time.
      expect(members).toHaveLength(4);
      for (let i = 0; i < members.length; i++) {
        expect(members[i]).toHaveTextContent(expectedMemberNames[i]);
      }
    });

    test('should render a button to sort members', async () => {
      render(<Members />);

      const button = await screen.findByRole('button', { name: '並び替え' });

      expect(button).toBeInTheDocument();
    });

    test('should render a button to filter members', () => {
      render(<Members />);

      const filterButton = screen.getByRole('button', { name: '絞り込み' });

      expect(filterButton).toBeInTheDocument();
    });
  });

  describe('if a user clicks the sort button', () => {
    let user: UserEvent;

    beforeEach(async () => {
      user = userEvent.setup();

      render(<Members />);
      await user.click(screen.getByRole('button', { name: '並び替え' }));
    });

    test('should render a modal to select a sort key', () => {
      const form = screen.getByRole('form');
      const radioButtons = within(form).getAllByRole<HTMLInputElement>('radio');

      expect(radioButtons).toHaveLength(4);
      // check for the order of the radio buttons.
      const expectedLabels = ['登録順', '表示名順', '性別順', 'レベル順'];
      for (let i = 0; i < radioButtons.length; i++) {
        expect(radioButtons[i]).toHaveAccessibleName(expectedLabels[i]);
      }

      // check that registration time is only selected as a sort key.
      expect(radioButtons[0]).toBeChecked();
      expect(radioButtons[1]).not.toBeChecked();
      expect(radioButtons[2]).not.toBeChecked();
      expect(radioButtons[3]).not.toBeChecked();
    });

    describe('each sort key should work correctly', () => {
      describe('if a user selects the radio button labeled by "表示名順"', () => {
        test('should sort members by display name or kana or name', async () => {
          await user.click(screen.getByRole('radio', { name: '表示名順' }));
          await user.click(screen.getByRole('button', { name: '適用' }));

          const memberList = screen.getByRole('list', { name: /members/i });
          const members = within(memberList).getAllByRole('listitem');

          const expectedMemberNames = ['Sさん', 'ミノ', 'ユカリ', '吉田 茂'];
          for (let i = 0; i < expectedMemberNames.length; i++) {
            expect(members[i]).toHaveTextContent(expectedMemberNames[i]);
          }
        });
      });

      describe('if a user selects the radio button labeled by "性別順', () => {
        test('should sort members by sex', async () => {
          await user.click(screen.getByRole('radio', { name: '性別順' }));
          await user.click(screen.getByRole('button', { name: '適用' }));

          const memberList = screen.getByRole('list', { name: /members/i });
          const members = within(memberList).getAllByRole('listitem');

          // the expected order is males and females, then people not known.
          const expectedMemberNames = ['吉田 茂', 'Sさん', 'ユカリ', 'ミノ'];
          for (let i = 0; i < expectedMemberNames.length; i++) {
            expect(members[i]).toHaveTextContent(expectedMemberNames[i]);
          }
        });
      });

      describe('if a user selects the radio button labeled by "レベル順', () => {
        test('should sort members by level', async () => {
          await user.click(screen.getByRole('radio', { name: 'レベル順' }));
          await user.click(screen.getByRole('button', { name: '適用' }));

          const memberList = screen.getByRole('list', { name: /members/i });
          const members = within(memberList).getAllByRole('listitem');

          // the expected order is beginner, and elementary, and intermediate, then advanced.
          const expectedMemberNames = ['吉田 茂', 'Sさん', 'ミノ', 'ユカリ'];
          for (let i = 0; i < expectedMemberNames.length; i++) {
            expect(members[i]).toHaveTextContent(expectedMemberNames[i]);
          }
        });
      });

      describe('if a user selects a radio button that is not checked, then clicks the cancel button', () => {
        test('should not change the sort order of the members', async () => {
          await user.click(screen.getByRole('radio', { name: '表示名順' }));
          await user.click(screen.getByRole('button', { name: 'キャンセル' }));

          const memberList = screen.getByRole('list', { name: /members/i });
          const members = within(memberList).getAllByRole('listitem');

          //
          const expectedNames = ['ミノ', 'Sさん', '吉田 茂', 'ユカリ'];
          expect(members).toHaveLength(4);
          for (let i = 0; i < members.length; i++) {
            expect(members[i]).toHaveTextContent(expectedNames[i]);
          }
        });
      });
    });
  });

  describe('if a user clicks the filter button', () => {
    let user: UserEvent;

    beforeEach(async () => {
      user = userEvent.setup();

      render(<Members />);
      await user.click(screen.getByRole('button', { name: '絞り込み' }));
    });

    test('should render a modal to select filter conditions', () => {
      const sexGroup = screen.getByRole('group', {
        name: '性別',
      });
      const levelGroup = screen.getByRole('group', {
        name: 'レベル',
      });
      const sexOptions = within(sexGroup).getAllByRole('checkbox');
      const levelOptions = within(levelGroup).getAllByRole('checkbox');

      const sexLabels = ['男性', '女性', '不明'];
      for (let i = 0; i < sexLabels.length; i++) {
        expect(sexOptions[i]).toHaveAccessibleName(sexLabels[i]);
        expect(sexOptions[i]).not.toBeChecked();
      }
      const levelLabels = ['入門', '初級', '中級', '上級'];
      for (let i = 0; i < levelLabels.length; i++) {
        expect(levelOptions[i]).toHaveAccessibleName(levelLabels[i]);
        expect(levelOptions[i]).not.toBeChecked();
      }
    });

    describe('if a user selects an options in the sex group', () => {
      test('should filter members correctly', async () => {
        await user.click(screen.getByRole('checkbox', { name: '男性' }));
        await user.click(screen.getByRole('button', { name: '適用' }));

        const members = within(
          screen.getByRole('list', { name: /members/i }),
        ).getAllByRole('listitem');
        expect(members).toHaveLength(1);

        const expectedNames = ['吉田 茂'];
        for (let i = 0; i < members.length; i++) {
          expect(members[i]).toHaveTextContent(expectedNames[i]);
        }
      });
    });

    describe('if a user selects an options in the level group', () => {
      test('should filter members correctly', async () => {
        await user.click(screen.getByRole('checkbox', { name: '中級' }));
        await user.click(screen.getByRole('button', { name: '適用' }));

        const members = within(
          screen.getByRole('list', { name: /members/i }),
        ).getAllByRole('listitem');
        expect(members).toHaveLength(1);

        const expectedNames = ['ミノ'];
        for (let i = 0; i < members.length; i++) {
          expect(members[i]).toHaveTextContent(expectedNames[i]);
        }
      });
    });

    describe('if a user selects both sex and level options', () => {
      test('should filter members correctly', async () => {
        await user.click(screen.getByRole('checkbox', { name: '上級' }));
        await user.click(screen.getByRole('checkbox', { name: '入門' }));
        await user.click(screen.getByRole('checkbox', { name: '女性' }));
        await user.click(screen.getByRole('button', { name: '適用' }));

        const members = within(
          screen.getByRole('list', { name: /members/i }),
        ).getAllByRole('listitem');
        expect(members).toHaveLength(1);

        const expectedNames = ['ユカリ'];
        for (let i = 0; i < members.length; i++) {
          expect(members[i]).toHaveTextContent(expectedNames[i]);
        }
      });
    });

    describe('if a user selects conditions that do not match any members', () => {
      test('should show an empty state', async () => {
        expect(
          screen.queryByText('該当するメンバーがいません。'),
        ).not.toBeInTheDocument();

        await user.click(screen.getByRole('checkbox', { name: '上級' }));
        await user.click(screen.getByRole('checkbox', { name: '男性' }));
        await user.click(screen.getByRole('button', { name: '適用' }));

        expect(
          screen.queryByRole('list', { name: /members/i }),
        ).not.toBeInTheDocument();
        expect(
          screen.getByText('該当するメンバーがいません。'),
        ).toBeInTheDocument();
      });
    });

    describe('if a user does not select any filter condition', () => {
      test('should show the same members before opening the modal', async () => {
        await user.click(screen.getByRole('button', { name: '適用' }));

        const members = within(
          screen.getByRole('list', { name: /members/i }),
        ).getAllByRole('listitem');
        expect(members).toHaveLength(4);

        const expectedNames = ['ミノ', 'Sさん', '吉田 茂', 'ユカリ'];
        for (let i = 0; i < members.length; i++) {
          expect(members[i]).toHaveTextContent(expectedNames[i]);
        }
      });
    });

    describe('if a user selects some of the conditions, then clicks the cancel button', () => {
      test('should show the same members before opening the modal', async () => {
        await user.click(screen.getByRole('checkbox', { name: '初級' }));
        await user.click(screen.getByRole('checkbox', { name: '不明' }));
        await user.click(screen.getByRole('button', { name: 'キャンセル' }));

        const members = within(
          screen.getByRole('list', { name: /members/i }),
        ).getAllByRole('listitem');
        expect(members).toHaveLength(4);

        const expectedNames = ['ミノ', 'Sさん', '吉田 茂', 'ユカリ'];
        for (let i = 0; i < members.length; i++) {
          expect(members[i]).toHaveTextContent(expectedNames[i]);
        }
      });
    });
  });
  test('array', () => {
    expect([].length === 0).toBeTruthy();
  });
});
