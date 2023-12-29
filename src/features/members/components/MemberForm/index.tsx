import Button from '@/components/Button';
import Emoji from '@/components/Emoji';
import EmojiPickerModal from '@/components/EmojiPIckerModal';
import RadioGroup from '@/components/RadioGroup';
import Textarea from '@/components/Textarea';
import Textbox from '@/components/Textbox';
import { levelOptions } from '@/features/members/constants/levelOptions';
import { sexOptions } from '@/features/members/constants/sexOptions';
import { useMemberForm } from '@/features/members/hooks/useMemberForm';
import { useRef } from 'react';

import type { MemberFormType } from '../../validation';
import type { EmojiClickData } from 'emoji-picker-react';

import styles from './index.module.scss';

type Props = {
  defaultValues: MemberFormType;
  submitButtonLabel: string;
  submitMember: (fieldValues: MemberFormType) => void;
};

const MemberForm = ({
  defaultValues,
  submitButtonLabel,
  submitMember,
}: Props) => {
  const { fieldValues, fieldErrors, getValues, setValue, submitHandler } =
    useMemberForm(defaultValues);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleSubmit = submitHandler(
    (fieldValues: MemberFormType) => void submitMember(fieldValues),
  );
  const handleEmojiClick = () => {
    dialogRef.current?.showModal();
  };
  const handleEmojiSelect = (emoji: EmojiClickData, _e: MouseEvent) => {
    setValue('emojiUnicode', emoji.unified);
  };

  const emojiUnicode = getValues('emojiUnicode');
  const isSubmitButtonDisabled = Object.is(defaultValues, getValues());

  return (
    <div className={styles.module}>
      <button type="button" onClick={handleEmojiClick} className={styles.emoji}>
        <Emoji unified={emojiUnicode} size={64} {...fieldValues} />
      </button>
      <EmojiPickerModal
        dialogRef={dialogRef}
        onEmojiClick={handleEmojiSelect}
      />
      <form onSubmit={handleSubmit} className={styles.module}>
        <label className={styles.field}>
          <span className={styles.label}>名前（必須）</span>
          <Textbox id="name" {...fieldValues.name} />
        </label>
        {fieldErrors.name && (
          <div role="alert" className={styles.alert}>
            {fieldErrors.name?.message}
          </div>
        )}
        <label className={styles.field}>
          <span className={styles.label}>かな</span>
          <Textbox id="kana" {...fieldValues.kana} />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>表示名</span>
          <Textbox id="displayName" {...fieldValues.displayName} />
        </label>
        <fieldset className={styles.field}>
          <legend className={styles.legend}>性別（必須）</legend>
          <RadioGroup
            defaultValue={defaultValues.sex}
            flexDirection="row"
            options={sexOptions}
            {...fieldValues.sex}
          />
        </fieldset>
        <fieldset className={styles.field}>
          <legend className={styles.legend}>レベル（必須）</legend>
          <RadioGroup
            defaultValue={defaultValues.level}
            flexDirection="row"
            options={levelOptions}
            {...fieldValues.level}
          />
        </fieldset>
        <label className={styles.field}>
          <span className={styles.label}>メモ</span>
          <Textarea {...fieldValues.note} />
        </label>
        <div className={styles.submitButtonContainer}>
          <Button
            type="submit"
            text={submitButtonLabel}
            color="green"
            disabled={isSubmitButtonDisabled}
          />
        </div>
      </form>
    </div>
  );
};

export default MemberForm;
