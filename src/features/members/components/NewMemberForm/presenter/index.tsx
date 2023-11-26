import Button from '@/components/Button';
import RadioGroup from '@/components/RadioGroup';
import Textarea from '@/components/Textarea';
import Textbox from '@/components/Textbox';

import type { FieldErrors, FieldValues } from '../hooks/useMemberForm';
import type { Options } from '@/types/Options';

import styles from './index.module.scss';

type Props = {
  fieldValues: FieldValues;
  fieldErrors: FieldErrors;
  levelOptions: Options;
  sexOptions: Options;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const Component = ({
  fieldValues,
  fieldErrors,
  levelOptions,
  sexOptions,
  onSubmit,
}: Props) => {
  return (
    <form onSubmit={onSubmit} className={styles.module}>
      <label className={styles.label}>
        名前（必須）
        <Textbox id="name" {...fieldValues.name} />
      </label>
      {fieldErrors.name && (
        <div role="alert" className={styles.alert}>
          {fieldErrors.name?.message}
        </div>
      )}
      <label className={styles.label}>
        かな
        <Textbox id="kana" {...fieldValues.kana} />
      </label>
      <label className={styles.label}>
        表示名
        <Textbox id="displayName" {...fieldValues.displayName} />
      </label>
      <fieldset>
        <legend className={styles.legend}>性別（必須）</legend>
        <RadioGroup
          defaultValue={sexOptions[0].value}
          flexDirection="row"
          options={sexOptions}
          {...fieldValues.sex}
        />
      </fieldset>
      <fieldset>
        <legend className={styles.legend}>レベル（必須）</legend>
        <RadioGroup
          defaultValue={levelOptions[0].value}
          flexDirection="row"
          options={levelOptions}
          {...fieldValues.level}
        />
      </fieldset>
      <label className={styles.label}>
        メモ
        <Textarea {...fieldValues.note} />
      </label>
      <div className={styles.buttonContainer}>
        <Button type="submit" text="メンバーを追加する" color="green" />
      </div>
    </form>
  );
};

export default Component;
