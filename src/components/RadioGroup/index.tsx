import { forwardRef } from 'react';

import type { Options } from '@/types/Options';

import styles from './index.module.scss';

type Props = {
  defaultValue: string;
  flexDirection: 'row' | 'column';
  name: string;
  options: Options;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const RadioGroup = forwardRef<HTMLInputElement, Props>(function RadioGroup(
  { defaultValue, flexDirection, name, options, onChange }: Props,
  ref,
) {
  return (
    <div
      role="radiogroup"
      className={styles.module}
      style={
        {
          '--flex-direction': flexDirection,
        } as React.CSSProperties
      }
    >
      {options.map(({ label, value }) => (
        <label key={value} className={styles.label}>
          <input
            type="radio"
            name={name}
            value={value}
            defaultChecked={value === defaultValue}
            onChange={onChange}
            ref={ref}
            className={styles.radio}
          />
          {label}
        </label>
      ))}
    </div>
  );
});

export default RadioGroup;
