import { useMemberForm } from './useMemberForm';
import Button from '@/components/Button';
import Emoji from '@/components/Emoji';
import EmojiPicker from '@/components/EmojiPicker';
import RadioGroup from '@/components/form/RadioGroup';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { levelMap, sexMap } from '@/constants';
import { Sex } from '@prisma/client';
import { useEffect } from 'react';

import type { MemberCreateSchema } from '@/features/members/validation';
import type { Options } from '@/types/Options';

type Props = {
  defaultValues: MemberCreateSchema;
  buttonLabel: string;
  isSubmitting: boolean;
  onSubmit: (fieldValues: MemberCreateSchema) => Promise<void>;
};
const MemberForm = ({
  defaultValues,
  buttonLabel,
  isSubmitting,
  onSubmit,
}: Props) => {
  const {
    control,
    errors,
    form,
    register,
    onEmojiSelect,
    setFocus,
    shouldDisableSubmitButton,
    submitHandler,
    watch,
  } = useMemberForm({ defaultValues, onSubmit });

  // use array to sort checkboxes (male -> female -> not-known).
  const sexOptions: Options = [Sex.MALE, Sex.FEMALE, Sex.NOT_KNOWN].map(
    (value) => ({
      value,
      label: sexMap.get(value) as string,
    }),
  );
  const levelOptions: Options = Array.from(levelMap).map(([value, label]) => ({
    value,
    label,
  }));

  useEffect(() => {
    setFocus('name');
  }, [setFocus]);

  return (
    <Form {...form}>
      <div className="mb-8 flex items-center justify-center gap-x-6">
        <div className="rounded-full bg-slate-50 p-3">
          <Emoji unified={watch('emojiUnicode')} size={32} />
        </div>
        <EmojiPicker
          initialUnicode={watch('emojiUnicode')}
          onEmojiClick={onEmojiSelect}
        />
      </div>
      <form
        onSubmit={submitHandler}
        className="mx-auto flex w-full max-w-sm flex-col gap-y-4"
      >
        <FormItem>
          <FormLabel htmlFor="name" className="required">
            名前
          </FormLabel>
          <Input id="name" placeholder="山田 太郎" {...register('name')} />
          {errors.name && <FormMessage>名前を入力してください。</FormMessage>}
        </FormItem>
        <FormField
          control={control}
          name="sex"
          render={({ field }) => (
            <FormItem>
              <FormLabel id="sex" className="required">
                性別
              </FormLabel>
              <FormControl>
                <RadioGroup
                  options={sexOptions}
                  value={field.value}
                  onValueChange={field.onChange}
                  aria-labelledby="sex"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="level"
          render={({ field }) => (
            <FormItem>
              <FormLabel id="level" className="required">
                レベル
              </FormLabel>
              <FormControl>
                <RadioGroup
                  options={levelOptions}
                  value={field.value}
                  onValueChange={field.onChange}
                  aria-labelledby="level"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormItem>
          <FormLabel htmlFor="note">メモ</FormLabel>
          <Textarea id="note" {...register('note')} />
        </FormItem>
        <Button
          type="submit"
          isBusy={isSubmitting}
          disabled={shouldDisableSubmitButton}
          variant="primary-green"
          className="self-center"
        >
          {buttonLabel}
        </Button>
      </form>
    </Form>
  );
};

export default MemberForm;
