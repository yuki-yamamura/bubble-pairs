import { memberSchema } from '@/features/members/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import * as ReactHookForm from 'react-hook-form';

import type { MemberSchema } from '@/features/members/validation';

type SubmitHandler = ReactHookForm.UseFormHandleSubmit<MemberSchema>;

export type FieldValues = {
  [P in keyof MemberSchema]: ReactHookForm.UseFormRegisterReturn<P>;
};

export type FieldErrors = ReactHookForm.FieldErrors<MemberSchema>;

const defaultValues: MemberSchema = {
  name: '',
  kana: null,
  displayName: null,
  sex: 'MALE',
  level: 'BEGINNER',
  note: null,
};

export const useMemberForm = (): {
  fieldValues: FieldValues;
  fieldErrors: FieldErrors;
  submitHandler: SubmitHandler;
} => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = ReactHookForm.useForm<MemberSchema>({
    defaultValues,
    resolver: zodResolver(memberSchema),
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
