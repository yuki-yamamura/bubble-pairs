import { memberFormSchema } from '@/features/members/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import * as ReactHookForm from 'react-hook-form';

import type { MemberFormType } from '@/features/members/validation';

type SubmitHandler = ReactHookForm.UseFormHandleSubmit<MemberFormType>;

export type FieldValues = {
  [P in keyof MemberFormType]: ReactHookForm.UseFormRegisterReturn<P>;
};

export type FieldErrors = ReactHookForm.FieldErrors<MemberFormType>;

export const useMemberForm = (
  defaultValues: MemberFormType,
): {
  fieldValues: FieldValues;
  getValues: ReactHookForm.UseFormGetValues<MemberFormType>;
  setValue: ReactHookForm.UseFormSetValue<MemberFormType>;
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

  return {
    fieldValues,
    getValues,
    setValue,
    submitHandler: handleSubmit,
    fieldErrors: errors,
  };
};
