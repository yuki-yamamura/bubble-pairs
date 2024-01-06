import { forwardRef } from 'react';

import styles from './index.module.scss';

type Props = React.ComponentPropsWithRef<'input'>;

const ToggleSwitch = forwardRef<HTMLInputElement, Props>(function ToggleSwitch(
  { onClick, ...rest },
  ref,
) {
  return (
    <div onClick={onClick} className={styles.module}>
      <input type="checkbox" ref={ref} {...rest} className={styles.checkbox} />
      <span className={styles.switch} aria-hidden />
    </div>
  );
});

export default ToggleSwitch;
