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
  setAvatar: (emoji: EmojiClickData) => void;
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
    avatar: register('avatar'),
    name: register('name'),
    kana: register('kana'),
    displayName: register('displayName'),
    sex: register('sex'),
    level: register('level'),
    note: register('note'),
  };

  const setAvatar = (emoji: EmojiClickData) =>
    setValue('avatar', emoji.unified);

  return {
    fieldValues,
    setAvatar,
    submitHandler: handleSubmit,
    fieldErrors: errors,
  };
};
