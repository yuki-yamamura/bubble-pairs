import { memberFormSchema } from '@/features/members/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import * as ReactHookForm from 'react-hook-form';

import type { MemberFormSchema } from '@/features/members/validation';
import type { EmojiClickData } from 'emoji-picker-react';

type SubmitHandler = ReactHookForm.UseFormHandleSubmit<MemberFormSchema>;

export type FieldValues = {
  [P in keyof MemberFormSchema]: ReactHookForm.UseFormRegisterReturn<P>;
};

export type FieldErrors = ReactHookForm.FieldErrors<MemberFormSchema>;

export const useMemberForm = (
  defaultValues: MemberFormSchema,
): {
  fieldValues: FieldValues;
  setEmoji: (emoji: EmojiClickData) => void;
  submitHandler: SubmitHandler;
  fieldErrors: FieldErrors;
} => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = ReactHookForm.useForm<MemberFormSchema>({
    defaultValues,
    resolver: zodResolver(memberFormSchema),
  });

  const fieldValues: FieldValues = {
    emojiUnicode: register('emojiUnicode'),
    name: register('name'),
    kana: register('kana'),
    displayName: register('displayName'),
    sex: register('sex'),
    level: register('level'),
    note: register('note'),
  };

  const setEmoji = (emoji: EmojiClickData) =>
    setValue('emojiUnicode', emoji.unified);

  return {
    fieldValues,
    setEmoji,
    submitHandler: handleSubmit,
    fieldErrors: errors,
  };
};
