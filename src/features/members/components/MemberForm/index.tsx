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
import { memberCreateSchema } from '@/features/members/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Sex } from '@prisma/client';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import type { MemberCreateSchemaType } from '@/features/members/validation';
import type { Options } from '@/types/Options';
import type { EmojiClickData } from 'emoji-picker-react';

type Props = {
  defaultValues: MemberCreateSchemaType;
  buttonLabel: string;
  isSubmitting: boolean;
  onSubmit: (fieldValues: MemberCreateSchemaType) => Promise<void>;
};
const MemberForm = ({
  defaultValues,
  buttonLabel,
  isSubmitting,
  onSubmit,
}: Props) => {
  const form = useForm<MemberCreateSchemaType>({
    defaultValues,
    resolver: zodResolver(memberCreateSchema),
  });
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    setFocus,
    setValue,
    watch,
  } = form;

  const handleEmojiSelect = (emoji: EmojiClickData, _: MouseEvent) => {
    setValue('emojiUnicode', emoji.unified);
  };

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
          defaultUnicode={watch('emojiUnicode')}
          onEmojiClick={handleEmojiSelect}
        />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto flex w-full max-w-sm flex-col gap-y-4"
      >
        <FormItem>
          <FormLabel className="required">名前</FormLabel>
          <Input placeholder="山田 太郎" {...register('name')} />
          {errors.name && <FormMessage>名前を入力してください。</FormMessage>}
        </FormItem>
        <FormField
          control={control}
          name="sex"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="required">性別</FormLabel>
              <FormControl>
                <RadioGroup
                  options={sexOptions}
                  value={field.value}
                  onValueChange={field.onChange}
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
              <FormLabel className="required">レベル</FormLabel>
              <FormControl>
                <RadioGroup
                  options={levelOptions}
                  value={field.value}
                  onValueChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormItem>
          <FormLabel>メモ</FormLabel>
          <Textarea {...register('note')} />
        </FormItem>
        <Button
          type="submit"
          isBusy={isSubmitting}
          variant="accent-secondary"
          className="mx-auto max-w-fit"
        >
          {buttonLabel}
        </Button>
      </form>
    </Form>
  );
};

export default MemberForm;
