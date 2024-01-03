import { forwardRef, useState } from 'react';

import styles from './index.module.scss';

type Props = {
  defaultValue: number;
};

const NumberInput = forwardRef<HTMLInputElement, Props>(function NumberInput(
  { defaultValue },
  ref,
) {
  const [value, setValue] = useState(defaultValue);
  const decrement = () => setValue((previousValue) => previousValue - 1);
  const increment = () => setValue((previousValue) => previousValue + 1);

  return (
    <div className={styles.module}>
      <button type="button" onClick={decrement} className={styles.button}>
        -
      </button>
      <input
        type="number"
        value={value}
        readOnly
        className={styles.spinbutton}
        ref={ref}
      />
      <button type="button" onClick={increment} className={styles.button}>
        +
      </button>
    </div>
  );
});

export default NumberInput;
