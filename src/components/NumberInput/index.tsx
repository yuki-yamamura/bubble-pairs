import { forwardRef } from 'react';

type Props = React.ComponentPropsWithRef<'input'> & {
  decrement: () => void;
  increment: () => void;
};

const NumberInput = forwardRef<HTMLInputElement, Props>(function NumberInput(
  { decrement, increment, ...rest }: Props,
  ref,
) {
  return (
    <div>
      <button type="button" onClick={decrement}>
        -
      </button>
      <input type="number" readOnly ref={ref} {...rest} />
      <button type="button" onClick={increment}>
        +
      </button>
    </div>
  );
});

export default NumberInput;
