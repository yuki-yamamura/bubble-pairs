import type { MemberWithoutMeta } from '../../../types/MemberWithoutMeta';
import type { Path, UseFormRegister } from 'react-hook-form';

import styles from './index.module.scss';

type Props = {
  name: Path<MemberWithoutMeta>;
  register: UseFormRegister<MemberWithoutMeta>;
};

const Textarea = ({ name, register }: Props) => (
  <textarea {...register(name)} className={styles.module} />
);

export default Textarea;
