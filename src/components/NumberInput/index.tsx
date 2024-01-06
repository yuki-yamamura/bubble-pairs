import { forwardRef } from 'react';

import styles from './index.module.scss';

type Props = React.ComponentPropsWithRef<'input'> & {
  decrement: () => void;
  increment: () => void;
};

const NumberInput = forwardRef<HTMLInputElement, Props>(function NumberInput(
  { decrement, increment, ...rest }: Props,
  ref,
) {
  return (
    <div className={styles.module}>
      <button type="button" onClick={decrement} className={styles.button}>
        -
      </button>
      <input
        type="number"
        readOnly
        ref={ref}
        {...rest}
        className={styles.spinbutton}
      />
      <button type="button" onClick={increment} className={styles.button}>
        +
      </button>
    </div>
  );
});

export default NumberInput;
