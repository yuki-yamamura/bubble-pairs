import { forwardRef, useState } from 'react';

import styles from './index.module.scss';

type Props = {
  label: string;
};

const Checkbox = forwardRef<HTMLInputElement, Props>(function Checkbox(
  { label },
  ref,
) {
  const [isChecked, setIsChecked] = useState(false);

  const handleClick = () => setIsChecked(!isChecked);

  return (
    <div
      onClick={handleClick}
      className={`${styles.module} ${isChecked ? styles.checked : ''}`}
    >
      {label}
      <input
        type="checkbox"
        checked={isChecked}
        ref={ref}
        className={styles.checkbox}
      />
    </div>
  );
});

export default Checkbox;
