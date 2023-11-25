import type { Options } from '@/types/Options';

import styles from './index.module.scss';

type Props = {
  defaultValue: string | string[];
  flexDirection: 'row' | 'column';
  name: string;
  options: Options;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CheckboxGroup = ({
  defaultValue,
  flexDirection,
  name,
  options,
  onChange,
}: Props) => (
  <div
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
          type="checkbox"
          name={name}
          value={value}
          defaultChecked={defaultValue.includes(value)}
          onChange={onChange}
          className={styles.checkbox}
        />
        {label}
      </label>
    ))}
  </div>
);

export default CheckboxGroup;
