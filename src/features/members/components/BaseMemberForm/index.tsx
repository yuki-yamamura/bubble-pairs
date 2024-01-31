import Button from '@/components/Button';
import Emoji from '@/components/Emoji';
import EmojiPickerModal from '@/components/EmojiPickerModal';
import RadioGroup from '@/components/RadioGroup';
import Textarea from '@/components/Textarea';
import Textbox from '@/components/Textbox';
import { levelMap, sexMap } from '@/features/members/constants';
import { useMemberForm } from '@/features/members/hooks/useMemberForm';
import { useRef } from 'react';

import type { MemberFormType } from '@/features/members/validation';
import type { EmojiClickData } from 'emoji-picker-react';

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

  const handleSubmit = submitHandler((fieldValues) =>
    submitMember(fieldValues),
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
    <div>
      <button type="button" onClick={handleEmojiClick}>
        <Emoji unified={emojiUnicode} size={64} {...fieldValues} />
      </button>
      <EmojiPickerModal
        onEmojiClick={handleEmojiSelect}
        initialEmojiUnicode=""
      />
      <form onSubmit={handleSubmit}>
        <label>
          <span>名前（必須）</span>
          <Textbox id="name" {...fieldValues.name} />
        </label>
        {fieldErrors.name && <div role="alert">{fieldErrors.name.message}</div>}
        <label>
          <span>かな</span>
          <Textbox id="kana" {...fieldValues.kana} />
        </label>
        <label>
          <span>表示名</span>
          <Textbox id="displayName" {...fieldValues.displayName} />
        </label>
        <fieldset>
          <legend>性別（必須）</legend>
          <RadioGroup
            defaultValue={defaultValues.sex}
            flexDirection="row"
            options={Array.from(sexMap).map(([value, label]) => ({
              label,
              value,
            }))}
            {...fieldValues.sex}
          />
        </fieldset>
        <fieldset>
          <legend>レベル（必須）</legend>
          <RadioGroup
            defaultValue={defaultValues.level}
            flexDirection="row"
            options={Array.from(levelMap).map(([value, label]) => ({
              label,
              value,
            }))}
            {...fieldValues.level}
          />
        </fieldset>
        <label>
          <span>メモ</span>
          <Textarea {...fieldValues.note} />
        </label>
        <div>
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
