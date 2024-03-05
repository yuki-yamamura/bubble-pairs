import PlaceForm from '.';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { PlaceCreateSchema } from '@/features/places/validation';

const mockFn = jest.fn();

beforeEach(() => {
  mockFn.mockReset();
});

// constants using within the tests
const buttonLabel = '場所を登録';

// utility functions to get the element in the form
const getName = () => screen.getByRole('textbox', { name: '名前' });
const getCourtCount = () =>
  screen.getByRole('spinbutton', { name: 'コート数' });
const getSubmitButton = () => screen.getByRole('button', { name: buttonLabel });

describe('PlaceForm', () => {
  describe('initialization', () => {
    test('should render necessary fields having the correct default values', () => {
      // arrange
      const defaultValues: PlaceCreateSchema = {
        name: '',
        courtCount: 1,
        isDefault: true,
        isDeleted: false,
      };
      // act
      render(
        <PlaceForm
          defaultValues={defaultValues}
          buttonVariant="primary-green"
          buttonLabel={buttonLabel}
          isSubmitting={false}
          onSubmit={mockFn}
        />,
      );

      // assert
      expect(getName()).toBeInTheDocument();
      expect(getCourtCount()).toHaveValue(1);
    });
  });

  describe('if user fills out all the fields, the click the submit button', () => {
    test('should call a callback function with the correct values', async () => {
      // arrange
      const user = userEvent.setup();
      const defaultValues: PlaceCreateSchema = {
        name: '',
        courtCount: 1,
        isDefault: true,
        isDeleted: false,
      };

      render(
        <PlaceForm
          defaultValues={defaultValues}
          buttonVariant="primary-green"
          buttonLabel={buttonLabel}
          isSubmitting={false}
          onSubmit={mockFn}
        />,
      );

      // act
      await user.type(getName(), 'A市立体育館');
      await user.clear(getCourtCount());
      await user.type(getCourtCount(), '4');

      await user.click(getSubmitButton());

      // assert
      expect(mockFn).toHaveBeenCalledWith({
        name: 'A市立体育館',
        courtCount: 4,
        isDefault: true,
        isDeleted: false,
      });
    });
  });

  describe('if user missed the name field', () => {
    test('should warn the user of the mistake', async () => {
      // arrange
      const user = userEvent.setup();
      const defaultValues: PlaceCreateSchema = {
        name: '',
        courtCount: 1,
        isDefault: true,
        isDeleted: false,
      };

      render(
        <PlaceForm
          defaultValues={defaultValues}
          buttonVariant="primary-green"
          buttonLabel={buttonLabel}
          isSubmitting={false}
          onSubmit={mockFn}
        />,
      );

      // act
      await user.clear(getCourtCount());
      await user.type(getCourtCount(), '2');

      expect(
        screen.queryByText('場所名を入力してください。'),
      ).not.toBeInTheDocument();
      await user.click(getSubmitButton());

      // assert
      expect(
        screen.getByText('場所名を入力してください。'),
      ).toBeInTheDocument();
      expect(mockFn).not.toHaveBeenCalled();
    });
  });

  describe('if user types 0 in the court count field', () => {
    test('should show the correct error message', async () => {
      // arrange
      const user = userEvent.setup();
      const defaultValues: PlaceCreateSchema = {
        name: '',
        courtCount: 1,
        isDefault: true,
        isDeleted: false,
      };

      render(
        <PlaceForm
          defaultValues={defaultValues}
          buttonVariant="primary-green"
          buttonLabel={buttonLabel}
          isSubmitting={false}
          onSubmit={mockFn}
        />,
      );

      // act
      await user.type(getName(), 'A市立体育館');
      await user.clear(getCourtCount());
      await user.type(getCourtCount(), '0');

      expect(
        screen.queryByText('1 以上のコート数を入力してください。'),
      ).not.toBeInTheDocument();
      await user.click(getSubmitButton());

      // assert
      expect(
        screen.getByText('1 以上のコート数を入力してください。'),
      ).toBeInTheDocument();
      expect(mockFn).not.toHaveBeenCalled();
    });
  });
});
