import ActivityForm from '.';
import { fakeMembers } from '@/mocks/fakeData/members';
import { fakePlaces } from '@/mocks/fakeData/places';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// workaround to use Select component of Radix UI in test.
window.HTMLElement.prototype.scrollIntoView = jest.fn();
window.HTMLElement.prototype.hasPointerCapture = jest.fn();

const mockFn = jest.fn();

beforeEach(() => {
  mockFn.mockReset();
});

// utility function to get the element in the form.
const getParticipantsButton = () =>
  screen.getByRole('button', { name: '参加者を追加...' });
const getParticipantByLabel = (label: string) =>
  within(screen.getByRole('table')).getByText(label);
const getPlaceCombobox = () =>
  screen.getByRole('combobox', { name: '活動場所' });
const getSubmitButton = () =>
  screen.getByRole('button', { name: 'アクティビティをはじめる' });
const getCheckboxByLabel = (label: string) =>
  screen.getByRole('checkbox', { name: label });
const getApplyButton = () =>
  screen.getByRole('button', { name: '参加者を追加' });
const getOptionByLabel = (label: string) =>
  screen.getByRole<HTMLOptionElement>('option', { name: label });

describe('ActivityForm', () => {
  describe('initialization', () => {
    test('should render necessary fields having the default correct values', () => {
      // act
      render(
        <ActivityForm
          members={fakeMembers}
          places={fakePlaces}
          isSubmitting={false}
          onSubmit={mockFn}
        />,
      );

      // assert
      expect(getParticipantsButton()).toBeInTheDocument();
      expect(getPlaceCombobox()).toHaveTextContent(fakePlaces[0].name);
      expect(getSubmitButton()).toBeInTheDocument();

      // at first, there is no participant in the activity.
      expect(
        screen.getByText('参加者が選択されていません。'),
      ).toBeInTheDocument();
    });
  });

  describe('if user picks number of members that are more than or equal to 2, then click the submit button', () => {
    test('should call a callback function with the correct values', async () => {
      // arrange
      const user = userEvent.setup();
      render(
        <ActivityForm
          members={fakeMembers}
          places={fakePlaces}
          isSubmitting={false}
          onSubmit={mockFn}
        />,
      );

      // act
      await user.click(getParticipantsButton());
      // select four of the members as participants.
      await user.click(getCheckboxByLabel(fakeMembers[0].name));
      await user.click(getCheckboxByLabel(fakeMembers[1].name));
      await user.click(getCheckboxByLabel(fakeMembers[2].name));
      await user.click(getCheckboxByLabel(fakeMembers[3].name));
      await user.click(getApplyButton());

      // user can see the list of the participants who have been selected.
      expect(getParticipantByLabel(fakeMembers[0].name)).toBeVisible();
      expect(getParticipantByLabel(fakeMembers[1].name)).toBeVisible();
      expect(getParticipantByLabel(fakeMembers[2].name)).toBeVisible();
      expect(getParticipantByLabel(fakeMembers[3].name)).toBeVisible();

      // select the place
      await user.click(getPlaceCombobox());
      await user.click(getOptionByLabel(fakePlaces[1].name));

      // user can see the selected place.
      expect(screen.getByDisplayValue(fakePlaces[1].name)).toBeInTheDocument();

      // assert
      await user.click(getSubmitButton());
      expect(mockFn).toHaveBeenCalledWith({
        participants: [
          { memberId: fakeMembers[0].id },
          { memberId: fakeMembers[1].id },
          { memberId: fakeMembers[2].id },
          { memberId: fakeMembers[3].id },
        ],
        placeId: fakePlaces[1].id,
        isOpen: true,
      });
    });
  });

  describe('if user only selected less than two participants', () => {
    test('should show the error message', async () => {
      // arrange
      const user = userEvent.setup();
      render(
        <ActivityForm
          members={fakeMembers}
          places={fakePlaces}
          isSubmitting={false}
          onSubmit={mockFn}
        />,
      );

      // act
      await user.click(getParticipantsButton());
      // select only one member as a participant, then submit the form.
      await user.click(getCheckboxByLabel(fakeMembers[0].name));
      await user.click(getApplyButton());

      expect(
        screen.queryByText('参加者を 2 名以上選択してください。'),
      ).not.toBeInTheDocument();

      await user.click(getSubmitButton());

      // assert
      // a singles game requires two people at least.
      expect(
        screen.getByText('参加者を 2 名以上選択してください。'),
      ).toBeInTheDocument();
      expect(mockFn).not.toHaveBeenCalled();
    });
  });
});
