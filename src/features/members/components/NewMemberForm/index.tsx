import { levelOptions } from '@/features/members/constants/levelOptions';
import { sexOptions } from '@/features/members/constants/sexOptions';
import { schema } from '@/features/members/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import type { Member } from '@prisma/client';
import type { SubmitHandler } from 'react-hook-form';

import styles from './index.module.scss';

type Inputs = Omit<Member, 'id' | 'createdAt' | 'updatedAt' | 'avatar'>;

const NewMemberForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<Inputs> = () => {
    console.log('this is a dummy function');
  };

  return (
    <form
      onSubmit={(...args) => void handleSubmit(onSubmit)(...args)}
      className={styles.module}
    >
      <label className={styles.label}>
        <span className={styles.labelText}>名前（必須）</span>
        <input type="text" {...register('name')} className={styles.textbox} />
        {errors.name && (
          <div role="alert" className={styles.error}>
            名前を入力してください。
          </div>
        )}
      </label>
      <label className={styles.label}>
        <span className={styles.labelText}>かな</span>
        <input type="text" {...register('kana')} className={styles.textbox} />
      </label>
      <label className={styles.label}>
        <span className={styles.labelText}>表示名</span>
        <input
          type="text"
          {...register('displayName')}
          className={styles.textbox}
        />
      </label>
      <label className={styles.label}>
        <span className={styles.labelText}>性別（必須）</span>
        <div radioGroup="sex" className={styles.radioGroup}>
          {sexOptions.map(({ label, value }) => (
            <label key={value}>
              <span className={styles.radioLabel}>{label}</span>
              <input
                type="radio"
                value={value}
                {...register('sex')}
                checked={value === 'MALE'}
              />
            </label>
          ))}
        </div>
      </label>
      <label className={styles.label}>
        <span className={styles.labelText}>レベル（必須）</span>
        <div radioGroup="level" className={styles.radioGroup}>
          {levelOptions.map(({ label, value }) => (
            <label key={value}>
              <span className={styles.radioLabel}>{label}</span>
              <input type="radio" value={value} {...register('level')} />
            </label>
          ))}
        </div>
      </label>
      <label className={styles.label}>
        <span className={styles.labelText}>メモ</span>
        <textarea {...register('note')} className={styles.textbox} />
      </label>
      <button type="submit" className={styles.submitButton}>
        メンバーを追加する
      </button>
    </form>
  );
};

export default NewMemberForm;
