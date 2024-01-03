import { forwardRef } from 'react';

import styles from './index.module.scss';

type Props = React.ComponentPropsWithRef<'input'>;

const ToggleSwitch = forwardRef<HTMLInputElement, Props>(
  function ToggleSwitch(props, ref) {
    return (
      <label className={styles.module}>
        <input
          type="checkbox"
          {...props}
          ref={ref}
          className={styles.checkbox}
        />
        <span className={styles.switch} aria-hidden />
      </label>
    );
  },
);

export default ToggleSwitch;
