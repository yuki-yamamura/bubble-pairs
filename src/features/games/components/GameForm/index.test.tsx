import GameForm from '.';
import { fakeActivities } from '@/mocks/fakeData/activities';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { GameCreateSchema } from '../../validation';

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
// const getParticipantByLabel = (label: string) =>
//   within(screen.getByRole('table')).getByText(label);
const getParticipantByLabel = (label: string) =>
  within(screen.getByRole('table')).getByText(label);
const getSinglesCountCombobox = () =>
  screen.getByRole('combobox', { name: 'シングルス数' });
const getDoublesCountCombobox = () =>
  screen.getByRole('combobox', { name: 'ダブルス数' });
const getSubmitButton = () =>
  screen.getByRole('button', { name: 'ゲームをはじめる' });
const getOptionByLabel = (label: string) =>
  screen.getByRole<HTMLOptionElement>('option', { name: label });

// variables using within the test.
const activity = fakeActivities[0];

describe('GameForm', () => {
  describe('initialization', () => {
    test('should render necessary fields and have the correct state', () => {
      // act
      render(
        <GameForm activity={activity} isSubmitting={false} onSubmit={mockFn} />,
      );

      // assert
      // unless user remove a participant, the button to add a participant is disabled.
      expect(getParticipantsButton()).toBeDisabled();
      // all the participants in the activity are selected as default members.
      activity.participants.forEach(({ member }) => {
        expect(getParticipantByLabel(member.name)).toBeVisible();
      });

      expect(getSinglesCountCombobox()).toHaveTextContent('0');
      expect(getDoublesCountCombobox()).toHaveTextContent('0');

      // before making a change, the submit button is disabled.
      expect(getSubmitButton()).toBeDisabled();
    });
  });

  describe('if user picks the five of the participants and selects doubles count', () => {
    test('should call a callback function with the correct values', async () => {
      // arrange
      const memberIds = activity.participants.map((participant) => ({
        memberId: participant.memberId,
      }));
      const expected = {
        activityId: activity.id,
        memberIds,
        singlesCount: 0,
        doublesCount: 1,
      } satisfies GameCreateSchema;
      const user = userEvent.setup();

      render(
        <GameForm activity={activity} isSubmitting={false} onSubmit={mockFn} />,
      );

      await user.click(getDoublesCountCombobox());
      await user.click(getOptionByLabel('1'));

      await user.click(getSubmitButton());

      expect(mockFn).toHaveBeenCalledWith(expected);
    });
  });

  describe('if user set singles and doubles count as 0, then submit the form', () => {
    test('should show the correct error message', async () => {
      // arrange
      const user = userEvent.setup();

      render(
        <GameForm activity={activity} isSubmitting={false} onSubmit={mockFn} />,
      );

      // act
      await user.click(getSinglesCountCombobox());
      await user.click(getOptionByLabel('1'));
      await user.click(getSinglesCountCombobox());
      await user.click(getOptionByLabel('0'));

      expect(
        screen.queryByText('試合数を選択してください。'),
      ).not.toBeInTheDocument();

      await user.click(getSubmitButton());

      // assert
      expect(
        screen.getByText('試合数を選択してください。'),
      ).toBeInTheDocument();

      expect(mockFn).not.toHaveBeenCalled();
    });
  });

  describe('if the total of singles and doubles that user selected is greater than the court count', () => {
    test('should show the correct error message', async () => {
      // arrange
      const user = userEvent.setup();

      render(
        <GameForm activity={activity} isSubmitting={false} onSubmit={mockFn} />,
      );

      // act
      await user.click(getSinglesCountCombobox());
      await user.click(getOptionByLabel('2'));

      await user.click(getDoublesCountCombobox());
      await user.click(getOptionByLabel('3'));

      expect(
        screen.queryByText('試合数の合計をコート数以下に変更してください。'),
      ).not.toBeInTheDocument();

      await user.click(getSubmitButton());

      // assert
      expect(
        screen.getByText('試合数の合計をコート数以下に変更してください。'),
      ).toBeInTheDocument();

      expect(mockFn).not.toHaveBeenCalled();
    });
  });

  describe('if the number of participants is not enough to play the game', () => {
    test('should show the correct error message', async () => {
      // arrange
      const user = userEvent.setup();

      render(
        <GameForm activity={activity} isSubmitting={false} onSubmit={mockFn} />,
      );

      // act
      await user.click(getDoublesCountCombobox());
      await user.click(getOptionByLabel('2'));

      expect(
        screen.queryByText('参加者を追加するか、試合数を変更してください。'),
      ).not.toBeInTheDocument();

      await user.click(getSubmitButton());

      // assert
      expect(
        screen.getByText('参加者を追加するか、試合数を変更してください。'),
      ).toBeInTheDocument();

      expect(mockFn).not.toHaveBeenCalled();
    });
  });
});