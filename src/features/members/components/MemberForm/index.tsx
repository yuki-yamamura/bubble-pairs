import Button from '@/components/Button';
import RadioGroup from '@/components/RadioGroup';
import Textarea from '@/components/Textarea';
import Textbox from '@/components/Textbox';
import { levelOptions } from '@/features/members/constants/levelOptions';
import { sexOptions } from '@/features/members/constants/sexOptions';
import { useMemberForm } from '@/features/members/hooks/useMemberForm';

import type { MemberSchema } from '../../validation';

import styles from './index.module.scss';

type Props = {
  submitButtonLabel: string;
  submitMember: (fieldValues: MemberSchema) => void;
};

const MemberForm = ({ submitButtonLabel, submitMember }: Props) => {
  const { fieldValues, fieldErrors, submitHandler } = useMemberForm();
  const handleSubmit = submitHandler((fieldValues: MemberSchema) =>
    submitMember(fieldValues),
  );

  return (
    <form onSubmit={handleSubmit} className={styles.module}>
      <label>
        <span className={styles.label}>名前（必須）</span>
        <Textbox id="name" {...fieldValues.name} />
      </label>
      {fieldErrors.name && (
        <div role="alert" className={styles.alert}>
          {fieldErrors.name?.message}
        </div>
      )}
      <label>
        <span className={styles.label}>かな</span>
        <Textbox id="kana" {...fieldValues.kana} />
      </label>
      <label>
        <span className={styles.label}>表示名</span>
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
        <Button type="submit" text={submitButtonLabel} color="green" />
      </div>
    </form>
  );
};

export default MemberForm;
