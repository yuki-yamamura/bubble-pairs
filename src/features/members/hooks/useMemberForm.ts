import { memberFormSchema } from '@/features/members/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import * as ReactHookForm from 'react-hook-form';

import type { MemberFormType } from '@/features/members/validation';
import type { EmojiClickData } from 'emoji-picker-react';

type SubmitHandler = ReactHookForm.UseFormHandleSubmit<MemberFormType>;

export type FieldValues = {
  [P in keyof MemberFormType]: ReactHookForm.UseFormRegisterReturn<P>;
};

export type FieldErrors = ReactHookForm.FieldErrors<MemberFormType>;

export const useMemberForm = (
  defaultValues: MemberFormType,
): {
  fieldValues: FieldValues;
  emojiUnicode: string;
  setEmojiUnicode: (emoji: EmojiClickData) => void;
  submitHandler: SubmitHandler;
  fieldErrors: FieldErrors;
} => {
  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
  } = ReactHookForm.useForm<MemberFormType>({
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

  const emoji = getValues().emojiUnicode;
  const setEmoji = (emoji: EmojiClickData) =>
    setValue('emojiUnicode', emoji.unified);

  return {
    fieldValues,
    emojiUnicode: emoji,
    setEmojiUnicode: setEmoji,
    submitHandler: handleSubmit,
    fieldErrors: errors,
  };
};
