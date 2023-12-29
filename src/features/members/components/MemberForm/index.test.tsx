import MemberForm from '.';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { MemberFormSchema } from '../../validation';

const mockFn = jest.fn();

beforeEach(() => {
  mockFn.mockReset();
});

describe('MemberForm', () => {
  describe('initialization', () => {
    test('should render necessary fields to represent a member', async () => {
      const defaultValues: MemberFormSchema = {
        emojiUnicode: '1f9d1',
        name: '',
        kana: null,
        displayName: null,
        sex: 'MALE',
        level: 'BEGINNER',
        note: null,
      };

      render(
        <MemberForm
          defaultValues={defaultValues}
          submitButtonLabel="メンバーを追加する"
          submitMember={mockFn}
        />,
      );

      // check for name field.
      expect(
        await screen.findByRole('textbox', { name: '名前（必須）' }),
      ).toBeInTheDocument();

      // check for kana field.
      expect(screen.getByRole('textbox', { name: 'かな' })).toBeInTheDocument();

      // check for display name field.
      expect(
        screen.getByRole('textbox', { name: '表示名' }),
      ).toBeInTheDocument();

      // check for sex field.
      const sexGroup = screen.getByRole('group', { name: '性別（必須）' });
      const sexRadioButtons = within(sexGroup).getAllByRole('radio');
      expect(sexRadioButtons[0]).toHaveAccessibleName('男性');
      expect(sexRadioButtons[0]).toBeChecked();
      expect(sexRadioButtons[1]).toHaveAccessibleName('女性');
      expect(sexRadioButtons[2]).toHaveAccessibleName('不明');

      // check for level field.
      const levelGroup = screen.getByRole('group', { name: 'レベル（必須）' });
      const levelRadioButtons = within(levelGroup).getAllByRole('radio');
      expect(levelRadioButtons[0]).toHaveAccessibleName('入門');
      expect(levelRadioButtons[0]).toBeChecked();
      expect(levelRadioButtons[1]).toHaveAccessibleName('初級');
      expect(levelRadioButtons[2]).toHaveAccessibleName('中級');
      expect(levelRadioButtons[3]).toHaveAccessibleName('上級');

      // check for note field.
      expect(screen.getByRole('textbox', { name: 'メモ' })).toBeInTheDocument();
    });
  });

  describe('if a user fills out all the filed, then clicks the submit button', () => {
    test('should call a callback function with the field values', async () => {
      const user = userEvent.setup();
      const defaultValues: MemberFormSchema = {
        emojiUnicode: '1f9d1',
        name: '',
        kana: null,
        displayName: null,
        sex: 'MALE',
        level: 'BEGINNER',
        note: null,
      };

      render(
        <MemberForm
          defaultValues={defaultValues}
          submitButtonLabel="メンバーを追加する"
          submitMember={mockFn}
        />,
      );

      // a user fills out all the filed to register a member.
      await user.type(
        await screen.findByRole('textbox', { name: '名前（必須）' }),
        '森 拓郎',
      );
      await user.type(
        screen.getByRole('textbox', { name: 'かな' }),
        'もり たくろう',
      );
      await user.type(screen.getByRole('textbox', { name: '表示名' }), '森');
      await user.click(screen.getByRole('radio', { name: '不明' }));
      await user.click(screen.getByRole('radio', { name: '中級' }));
      await user.type(
        screen.getByRole('textbox', { name: 'メモ' }),
        '水曜日のみ参加',
      );

      await user.click(
        screen.getByRole('button', { name: 'メンバーを追加する' }),
      );

      expect(mockFn).toHaveBeenCalledWith({
        emojiUnicode: '1f9d1',
        name: '森 拓郎',
        kana: 'もり たくろう',
        displayName: '森',
        sex: 'NOT_KNOWN',
        level: 'INTERMEDIATE',
        note: '水曜日のみ参加',
      });
    });
  });

  describe('if a user only fills out the required fields, then clicks the submit button', () => {
    test('should call a callback function with the field values including null', async () => {
      const user = userEvent.setup();
      const defaultValues: MemberFormSchema = {
        emojiUnicode: '1f9d1',
        name: '',
        kana: null,
        displayName: null,
        sex: 'MALE',
        level: 'BEGINNER',
        note: null,
      };

      render(
        <MemberForm
          defaultValues={defaultValues}
          submitButtonLabel="メンバーを追加する"
          submitMember={mockFn}
        />,
      );

      // a user fills out the required field to register a member.
      await user.type(
        screen.getByRole('textbox', { name: '名前（必須）' }),
        '渡辺 早季',
      );
      await user.click(screen.getByRole('radio', { name: '女性' }));

      await user.click(
        screen.getByRole('button', { name: 'メンバーを追加する' }),
      );

      expect(mockFn).toHaveBeenCalledWith({
        emojiUnicode: '1f9d1',
        name: '渡辺 早季',
        kana: null,
        displayName: null,
        sex: 'FEMALE',
        level: 'BEGINNER',
        note: null,
      });
    });
  });

  describe('if a user missed the name field', () => {
    test('should warn the user of the mistake instead of submitting the form values', async () => {
      const user = userEvent.setup();
      const defaultValues: MemberFormSchema = {
        emojiUnicode: '1f9d1',
        name: '',
        kana: null,
        displayName: null,
        sex: 'MALE',
        level: 'BEGINNER',
        note: null,
      };

      render(
        <MemberForm
          defaultValues={defaultValues}
          submitButtonLabel="メンバーを追加する"
          submitMember={mockFn}
        />,
      );

      // a user missed the name field.
      await user.type(
        screen.getByRole('textbox', { name: '表示名' }),
        '宮下さん',
      );
      await user.click(screen.getByRole('radio', { name: '上級' }));

      expect(
        screen.queryByText('名前を入力してください。'),
      ).not.toBeInTheDocument();

      await user.click(
        screen.getByRole('button', { name: 'メンバーを追加する' }),
      );

      // notify that the name field is required, and move the focus to the textbox.
      expect(screen.getByText('名前を入力してください。')).toBeInTheDocument();
      expect(
        screen.getByRole('textbox', { name: '名前（必須）' }),
      ).toHaveFocus();
      expect(mockFn).not.toHaveBeenCalled();
    });
  });
});
