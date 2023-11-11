import Members from '.';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Members', () => {
  describe('initialization', () => {
    test("should render member's names in the correct order", async () => {
      render(<Members />);

      // if a member has a display name, use it instead of his/her name.
      const expectedNames = ['ミノ', 'Sさん', '吉田 茂', 'ユカリ'];

      const memberList = await screen.findByRole('list');
      const members = within(memberList).getAllByRole('listitem');

      // members should be ordered by id.
      expect(members).toHaveLength(4);
      for (let i = 0; i < members.length; i++) {
        expect(members[i]).toHaveTextContent(expectedNames[i]);
      }
    });

    test('should render a button to sort members', async () => {
      render(<Members />);

      const button = await screen.findByRole('button', { name: '並び替え' });

      expect(button).toBeInTheDocument();
    });
  });

  describe('if a user clicks the sort button', () => {
    test('should render the radio buttons in the correct order', async () => {
      render(<Members />);
      const user = userEvent.setup();

      const sortButton = screen.getByRole('button', { name: '並び替え' });
      await user.click(sortButton);

      const radioGroup = screen.getByRole('radiogroup');
      const radioButtons = within(radioGroup).getAllByRole('radio');

      expect(radioButtons).toHaveLength(4);
      const expectedLabels = ['登録順', '名前順', '性別順', 'レベル順'];
      for (let i = 0; i < radioButtons.length; i++) {
        expect(radioButtons[i]).toHaveAccessibleName(expectedLabels[i]);
      }
    });
  });
});
