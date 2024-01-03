import NumberInput from '.';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';

describe('NumberInput', () => {
  describe('initialization', () => {
    test('should meet the specifications', () => {
      const ref = createRef<HTMLInputElement>();
      render(<NumberInput defaultValue={1} ref={ref} />);

      const spinbutton = screen.getByRole('spinbutton');

      expect(spinbutton).toHaveValue();
      expect(spinbutton).toHaveAttribute('readonly');
      expect(screen.getByRole('button', { name: '-' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '+' })).toBeInTheDocument();
    });
  });

  describe('user interactions', () => {
    describe('if user click the decrement button', () => {
      test('should increment the input value', async () => {
        const user = userEvent.setup();
        render(<NumberInput defaultValue={1} />);

        await user.click(screen.getByRole('button', { name: '-' }));

        expect(screen.getByRole('spinbutton')).toHaveValue(0);
      });
    });

    describe('if user click the increment button', () => {
      test('should increment the input value', async () => {
        const user = userEvent.setup();
        render(<NumberInput defaultValue={1} />);

        await user.click(screen.getByRole('button', { name: '+' }));

        expect(screen.getByRole('spinbutton')).toHaveValue(2);
      });
    });
  });
});
