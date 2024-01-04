import { forwardRef } from 'react';

import styles from './index.module.scss';

type Props = Omit<React.ComponentPropsWithRef<'input'>, 'type'> & {
  label: string;
};

const Checkbox = forwardRef<HTMLInputElement, Props>(function Checkbox(
  { checked, label, ...rest },
  ref,
) {
  return (
    <label className={`${styles.module} ${checked ? styles.checked : ''}`}>
      {label}
      <input
        type="checkbox"
        ref={ref}
        {...rest}
        className={`${styles.checkbox}`}
      />
    </label>
  );
});

export default Checkbox;
