import type { Option } from '@/types/Option';

import styles from './index.module.scss';

type Props = {
  radioGroup: string;
  selectedValue: string;
  options: Option[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const RadioGroup = ({
  radioGroup,
  selectedValue,
  options,
  onChange,
}: Props) => (
  <div radioGroup={radioGroup} role="radiogroup" className={styles.module}>
    {options.map(({ labelText, value }) => (
      <label key={value}>
        <input
          type="radio"
          name={radioGroup}
          value={value}
          checked={selectedValue === value}
          onChange={onChange}
          className={styles.radio}
        />
        {labelText}
      </label>
    ))}
  </div>
);

export default RadioGroup;
