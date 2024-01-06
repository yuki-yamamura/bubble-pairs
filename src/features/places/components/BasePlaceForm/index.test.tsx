import BasePlaceForm from '.';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { PlaceFormType } from '@/features/places/validation';

const mockFn = jest.fn();

beforeEach(() => {
  mockFn.mockReset();
});

describe('BasePlaceForm', () => {
  describe('initialization', () => {
    test('should render necessary fields to represent a place', () => {
      const defaultValues: PlaceFormType = {
        name: 'A市総合公園',
        courtCount: 4,
        isDefault: true,
      };

      render(
        <BasePlaceForm
          defaultValues={defaultValues}
          submitButtonLabel="保存"
          submitPlace={mockFn}
        />,
      );

      expect(
        screen.getByRole('textbox', { name: '場所名（必須）' }),
      ).toHaveValue('A市総合公園');

      // check for court count field.
      expect(screen.getByRole('spinbutton', { name: 'コート数' })).toHaveValue(
        4,
      );

      // check for default field.
      expect(
        screen.getByRole('checkbox', { name: '既定として使う' }),
      ).toBeChecked();
    });
  });

  describe('if a user fills out all the field, then clicks the submit button', () => {
    test('should call a callback function with the field values', async () => {
      const user = userEvent.setup();
      const defaultValues: PlaceFormType = {
        name: '',
        courtCount: 1,
        isDefault: false,
      };

      render(
        <BasePlaceForm
          defaultValues={defaultValues}
          submitButtonLabel="場所を追加する"
          submitPlace={mockFn}
        />,
      );

      await user.type(
        screen.getByRole('textbox', { name: '場所名（必須）' }),
        'A市総合公園',
      );

      // make sure that court count equals 2.
      await user.click(screen.getByRole('button', { name: '+' }));
      await user.click(screen.getByRole('button', { name: '+' }));
      await user.click(screen.getByRole('button', { name: '-' }));

      await user.click(
        screen.getByRole('checkbox', { name: '既定として使う' }),
      );

      // set the place as default.
      await user.click(screen.getByRole('button', { name: '場所を追加する' }));

      expect(mockFn).toHaveBeenCalledWith({
        name: 'A市総合公園',
        courtCount: 2,
        isDefault: true,
      });
    });
  });

  describe('if a user missed the place name field', () => {
    test('should warn the user of the mistake, not submitting the form values', async () => {
      const user = userEvent.setup();
      const defaultValues: PlaceFormType = {
        name: '',
        courtCount: 1,
        isDefault: false,
      };

      render(
        <BasePlaceForm
          defaultValues={defaultValues}
          submitButtonLabel="場所を追加する"
          submitPlace={mockFn}
        />,
      );

      // a user missed the place name field, and submit the form.
      await user.click(screen.getByRole('button', { name: '場所を追加する' }));

      // notify that the place name field is required, and move the focus to the textbox.
      expect(
        screen.getByText('場所名を入力してください。'),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('textbox', { name: '場所名（必須）' }),
      ).toHaveFocus();
    });
  });

  describe('if a user inputs less than 1 court count', () => {
    test('should warn the user to input grater than or equals to 1 court count', async () => {
      const user = userEvent.setup();
      const defaultValues: PlaceFormType = {
        name: '',
        courtCount: 1,
        isDefault: false,
      };

      render(
        <BasePlaceForm
          defaultValues={defaultValues}
          submitButtonLabel="場所を追加する"
          submitPlace={mockFn}
        />,
      );

      await user.type(
        screen.getByRole('textbox', { name: '場所名（必須）' }),
        'A市総合公園',
      );

      // a user clicks the decrement button, and the court count will be 0.
      await user.click(screen.getByText('-'));

      // the user submit the form.
      await user.click(screen.getByRole('button', { name: '場所を追加する' }));

      // notify that the court count must be grater than or equal to 1, and move the focus to the spinbutton.
      expect(
        screen.getByText('1 つ以上のコート数を入力してください。'),
      ).toBeInTheDocument();
      expect(screen.getByRole('spinbutton')).toHaveFocus();
    });
  });
});
