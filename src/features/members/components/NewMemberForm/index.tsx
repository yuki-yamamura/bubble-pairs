import { levelOptions } from '@/features/members/constants/levelOptions';
import { sexOptions } from '@/features/members/constants/sexOptions';
import { schema } from '@/features/members/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import type { MemberWithoutMeta } from '@/features/members/types/MemberWithoutMeta';
import type { SubmitHandler } from 'react-hook-form';

import styles from './index.module.scss';

const NewMemberForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MemberWithoutMeta>({
    defaultValues: {
      name: '',
      kana: null,
      displayName: null,
      sex: 'MALE',
      level: 'BEGINNER',
      note: null,
    },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<MemberWithoutMeta> = (data) => {
    // todo: implement logic to submit form data.
    console.log(data);
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
            {errors.name.message}
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
        {/* todo: separate this radio group as a component. */}
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
        {/* todo: separate this radio group as a component. */}
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
      {/* todo: separate this radio group as a component. */}
      <button type="submit" className={styles.submitButton}>
        メンバーを追加する
      </button>
    </form>
  );
};

export default NewMemberForm;
