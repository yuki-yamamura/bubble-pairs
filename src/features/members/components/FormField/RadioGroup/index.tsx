import type { MemberWithoutMeta } from '@/features/members/types/MemberWithoutMeta';
import type { Path, UseFormRegister } from 'react-hook-form';

import styles from './index.module.scss';

export type Options = {
  label: string;
  value: string;
}[];

type Props = {
  options: Options;
  name: Path<MemberWithoutMeta>;
  register: UseFormRegister<MemberWithoutMeta>;
};

const RadioGroup = ({ options, name, register }: Props) => (
  <div radioGroup={name} role="radiogroup" className={styles.module}>
    {options.map(({ label, value }) => (
      <label key={value}>
        <input
          type="radio"
          value={value}
          {...register(name)}
          className={styles.radio}
        />
        <span>{label}</span>
      </label>
    ))}
  </div>
);

export default RadioGroup;
