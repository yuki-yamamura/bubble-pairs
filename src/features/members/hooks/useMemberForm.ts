import { memberFormSchema } from '@/features/members/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import * as ReactHookForm from 'react-hook-form';

import type { MemberFormSchema } from '@/features/members/validation';

type SubmitHandler = ReactHookForm.UseFormHandleSubmit<MemberFormSchema>;

export type FieldValues = {
  [P in keyof MemberFormSchema]: ReactHookForm.UseFormRegisterReturn<P>;
};

export type FieldErrors = ReactHookForm.FieldErrors<MemberFormSchema>;

export const useMemberForm = (
  defaultValues: MemberFormSchema,
): {
  fieldValues: FieldValues;
  fieldErrors: FieldErrors;
  submitHandler: SubmitHandler;
} => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = ReactHookForm.useForm<MemberFormSchema>({
    defaultValues,
    resolver: zodResolver(memberFormSchema),
  });

  const fieldValues: FieldValues = {
    name: register('name'),
    kana: register('kana'),
    displayName: register('displayName'),
    sex: register('sex'),
    level: register('level'),
    note: register('note'),
  };

  return {
    fieldValues,
    fieldErrors: errors,
    submitHandler: handleSubmit,
  };
};
