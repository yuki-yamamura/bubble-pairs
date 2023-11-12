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
  });

  describe('if a user clicks the sort button', () => {
    test('should render a modal to select a sort key', async () => {
      render(<Members />);
      const user = userEvent.setup();

      const sortButton = screen.getByRole('button', { name: '並び替え' });
      await user.click(sortButton);

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
      let user: UserEvent;

      beforeEach(async () => {
        user = userEvent.setup();

        render(<Members />);
        await user.click(screen.getByRole('button', { name: '並び替え' }));
      });

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
});
