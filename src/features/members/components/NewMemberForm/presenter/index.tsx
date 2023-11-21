import Button from '@/components/Button';
import RadioGroup from '@/components/RadioGroup';
import Textarea from '@/components/Textarea';
import Textbox from '@/components/Textbox';
import { levelOptions } from '@/features/members/constants/levelOptions';
import { sexOptions } from '@/features/members/constants/sexOptions';

import type { FieldErrors, FieldValues } from '../hooks/useMemberForm';

import styles from './index.module.scss';

type Props = {
  fieldValues: FieldValues;
  fieldErrors: FieldErrors;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const Component = ({ fieldValues, fieldErrors, onSubmit }: Props) => {
  return (
    <form onSubmit={onSubmit} className={styles.module}>
      <div className={styles.field}>
        <label htmlFor="name" className={styles.label}>
          名前（必須）
        </label>
        <Textbox id="name" {...fieldValues.name} />
        {fieldErrors.name && (
          <div role="alert" className={styles.alert}>
            {fieldErrors.name?.message}
          </div>
        )}
      </div>
      <div className={styles.field}>
        <label htmlFor="kana" className={styles.label}>
          かな
        </label>
        <Textbox id="kana" {...fieldValues.kana} />
      </div>
      <div className={styles.field}>
        <label htmlFor="displayName" className={styles.label}>
          表示名
        </label>
        <Textbox id="displayName" {...fieldValues.displayName} />
      </div>
      <div className={styles.field}>
        <label htmlFor="sex" className={styles.label}>
          性別（必須）
        </label>
        <RadioGroup
          id="sex"
          defaultValue={sexOptions[0].value}
          flexDirection="row"
          options={sexOptions}
          {...fieldValues.sex}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="level" className={styles.label}>
          レベル（必須）
        </label>
        <RadioGroup
          id="level"
          defaultValue={levelOptions[0].value}
          flexDirection="row"
          options={levelOptions}
          {...fieldValues.level}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="note" className={styles.label}>
          メモ
        </label>
        <Textarea id="note" {...fieldValues.note} />
      </div>
      <Button type="submit" text="メンバーを追加する" color="green" />
    </form>
  );
};

export default Component;
