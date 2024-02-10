import Emoji from '@/components/Emoji';
import EmojiPickerModal from '@/components/EmojiPickerModal';
import RadioGroupField from '@/components/form/fields/RadioGroupField';
import { Button } from '@/components/ui/button';
import { Form, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { levelMap, sexMap } from '@/constants';
import { memberCreateSchema } from '@/features/members/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Sex } from '@prisma/client';
import { useForm } from 'react-hook-form';

import type { MemberCreateSchemaType } from '@/features/members/validation';
import type { EmojiClickData } from 'emoji-picker-react';
import type { Control, FieldValues } from 'react-hook-form';

type Props = {
  defaultValues: MemberCreateSchemaType;
  submitButtonLabel: string;
  onSubmit: (fieldValues: MemberCreateSchemaType) => void;
};
const MemberForm = ({ defaultValues, submitButtonLabel, onSubmit }: Props) => {
  const form = useForm<MemberCreateSchemaType>({
    defaultValues,
    resolver: zodResolver(memberCreateSchema),
  });
  const {
    handleSubmit,
    control,
    register,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const submitHandler = handleSubmit((fieldValues) => {
    onSubmit(fieldValues);
  });
  const handleEmojiSelect = (emoji: EmojiClickData, _e: MouseEvent) => {
    setValue('emojiUnicode', emoji.unified);
  };

  const sexOptions = [Sex.MALE, Sex.FEMALE, Sex.NOT_KNOWN].map((value) => ({
    value,
    label: sexMap.get(value) as string,
  }));
  const levelOptions = Array.from(levelMap).map(([value, label]) => ({
    value,
    label,
  }));
  const isAnyFormValueChanged =
    JSON.stringify(defaultValues) === JSON.stringify(watch());

  return (
    <Form {...form}>
      <div className="mb-8 flex items-center justify-center gap-x-6">
        <div className="rounded-full bg-gray-50 p-3">
          <Emoji unified={watch('emojiUnicode')} size={32} />
        </div>
        <EmojiPickerModal
          initialEmojiUnicode={watch('emojiUnicode')}
          onEmojiClick={handleEmojiSelect}
        />
      </div>
      <form
        onSubmit={submitHandler}
        className="mx-auto flex w-full max-w-md flex-col gap-y-6"
      >
        <FormItem>
          <FormLabel className="required-field">名前</FormLabel>
          <Input {...register('name')} />
          {errors.name && <FormMessage>名前を入力してください。</FormMessage>}
        </FormItem>
        <RadioGroupField
          // I don't know why this type error happens.
          control={control as unknown as Control<FieldValues>}
          name="sex"
          label="性別"
          required
          options={sexOptions}
        />
        <RadioGroupField
          // I don't know why this type error happens.
          control={control as unknown as Control<FieldValues>}
          name="level"
          label="レベル"
          required
          options={levelOptions}
        />
        <FormItem>
          <FormLabel>メモ</FormLabel>
          <Textarea {...register('note')} />
        </FormItem>
        <Button
          type="submit"
          variant="accent"
          disabled={isAnyFormValueChanged}
          className="mx-auto max-w-fit"
        >
          {submitButtonLabel}
        </Button>
      </form>
    </Form>
  );
};

export default MemberForm;
