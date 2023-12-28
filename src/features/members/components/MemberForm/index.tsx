import Button from '@/components/Button';
import Emoji from '@/components/Emoji';
import EmojiPickerModal from '@/components/EmojiPIckerModal';
import RadioGroup from '@/components/RadioGroup';
import Textarea from '@/components/Textarea';
import Textbox from '@/components/Textbox';
import { levelOptions } from '@/features/members/constants/levelOptions';
import { sexOptions } from '@/features/members/constants/sexOptions';
import { useMemberForm } from '@/features/members/hooks/useMemberForm';
import { useRef, useState } from 'react';

import type { MemberFormSchema } from '../../validation';
import type { EmojiClickData } from 'emoji-picker-react';

import styles from './index.module.scss';

type Props = {
  defaultValues: MemberFormSchema;
  submitButtonLabel: string;
  submitMember: (fieldValues: MemberFormSchema) => void;
};

const MemberForm = ({
  defaultValues,
  submitButtonLabel,
  submitMember,
}: Props) => {
  const { fieldValues, fieldErrors, setAvatar, submitHandler } =
    useMemberForm(defaultValues);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [currentEmojiUnified, setCurrentEmojiUnified] = useState(
    defaultValues.avatar,
  );
  const handleSubmit = submitHandler(
    (fieldValues: MemberFormSchema) => void submitMember(fieldValues),
  );
  const handleAvatarClick = () => {
    dialogRef.current?.showModal();
  };
  const handleEmojiSelect = (emoji: EmojiClickData, _e: MouseEvent) => {
    setCurrentEmojiUnified(emoji.unified);
    setAvatar(emoji);
  };

  return (
    <div className={styles.module}>
      <button
        type="button"
        onClick={handleAvatarClick}
        className={styles.emoji}
      >
        <Emoji unified={currentEmojiUnified} size={64} {...fieldValues} />
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
        <div className={styles.buttonContainer}>
          <Button type="submit" text={submitButtonLabel} color="green" />
        </div>
      </form>
    </div>
  );
};

export default MemberForm;
