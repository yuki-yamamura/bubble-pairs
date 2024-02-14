import MemberForm from '.';
import { Level, Sex } from '@prisma/client';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { MemberCreateSchema } from '@/features/members/validation';

const mockFn = jest.fn();

beforeEach(() => {
  mockFn.mockReset();
});

// constants using within the tests
const buttonLabel = 'メンバーを登録';

// utility functions to get the element in the form
const getName = () => screen.getByRole('textbox', { name: '名前' });
const getSexGroup = () => screen.getByRole('radiogroup', { name: '性別' });
const getLevelGroup = () => screen.getByRole('radiogroup', { name: 'レベル' });
const getSexByLabel = (label: string) =>
  within(getSexGroup()).getByRole('radio', { name: label });
const getLevelByLabel = (label: string) =>
  within(getLevelGroup()).getByRole('radio', { name: label });
const getNote = () => screen.getByRole('textbox', { name: 'メモ' });
const getProfileImageButton = () =>
  screen.getByRole('button', { name: 'プロフィール画像を変更' });
const getSubmitButton = () => screen.getByRole('button', { name: buttonLabel });

describe('MemberForm', () => {
  describe('initialization', () => {
    test('should render necessary fields having the default values', () => {
      // arrange
      const defaultValues: MemberCreateSchema = {
        emojiUnicode: '1f9d1',
        name: '',
        sex: Sex.MALE,
        level: Level.BEGINNER,
        note: null,
      };

      // act
      render(
        <MemberForm
          defaultValues={defaultValues}
          buttonLabel={buttonLabel}
          isSubmitting={false}
          onSubmit={mockFn}
        />,
      );

      // assert
      expect(getName()).toHaveValue('');

      const sexRadioButtons = within(getSexGroup()).getAllByRole('radio');
      expect(sexRadioButtons[0]).toHaveAccessibleName('男性');
      expect(sexRadioButtons[1]).toHaveAccessibleName('女性');
      expect(sexRadioButtons[2]).toHaveAccessibleName('不明');
      expect(sexRadioButtons[0]).toBeChecked();

      const levelRadioButtons = within(getLevelGroup()).getAllByRole('radio');
      expect(levelRadioButtons[0]).toHaveAccessibleName('入門');
      expect(levelRadioButtons[1]).toHaveAccessibleName('初級');
      expect(levelRadioButtons[2]).toHaveAccessibleName('中級');
      expect(levelRadioButtons[3]).toHaveAccessibleName('上級');
      expect(levelRadioButtons[0]).toBeChecked();

      expect(getNote()).not.toHaveValue();
    });
  });

  describe('if user fills out all the fields, then clicks the submit button', () => {
    test('should call a callback function with correct values', async () => {
      // arrange
      const user = userEvent.setup();
      const defaultValues: MemberCreateSchema = {
        emojiUnicode: '1f9d1',
        name: '',
        sex: Sex.MALE,
        level: Level.BEGINNER,
        note: null,
      };

      render(
        <MemberForm
          defaultValues={defaultValues}
          buttonLabel={buttonLabel}
          isSubmitting={false}
          onSubmit={mockFn}
        />,
      );

      // act
      await user.type(getName(), '森 拓郎');
      await user.click(getLevelByLabel('中級'));
      await user.type(getNote(), '水曜日のみ参加');

      await user.click(getProfileImageButton());
      // pick the grinning face emoji.
      await user.click(screen.getByAltText('grinning'));

      await user.click(getSubmitButton());

      // assert
      expect(mockFn).toHaveBeenCalledWith({
        emojiUnicode: '1f600',
        name: '森 拓郎',
        sex: 'MALE',
        level: 'INTERMEDIATE',
        note: '水曜日のみ参加',
      });
    });
  });

  describe('if user missed the name field', () => {
    // arrange
    test('should warn the user of the mistake', async () => {
      const user = userEvent.setup();
      const defaultValues: MemberCreateSchema = {
        emojiUnicode: '1f9d1',
        name: '',
        sex: 'MALE',
        level: 'BEGINNER',
        note: null,
      };

      render(
        <MemberForm
          defaultValues={defaultValues}
          buttonLabel={buttonLabel}
          isSubmitting={false}
          onSubmit={mockFn}
        />,
      );

      // act
      // user have missed the name field.
      await user.click(getSexByLabel('女性'));
      await user.click(getLevelByLabel('上級'));

      // assert
      expect(
        screen.queryByText('名前を入力してください。'),
      ).not.toBeInTheDocument();

      await user.click(getSubmitButton());

      expect(screen.getByText('名前を入力してください。')).toBeInTheDocument();
      expect(getName()).toHaveFocus();
      expect(mockFn).not.toHaveBeenCalled();
    });
  });
});
