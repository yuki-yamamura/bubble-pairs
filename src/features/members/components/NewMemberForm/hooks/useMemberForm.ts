import { schema } from '@/features/members/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import * as ReactHookForm from 'react-hook-form';

import type { Schema } from '@/features/members/validation';

type SubmitHandler = ReactHookForm.UseFormHandleSubmit<Schema>;

export type FieldValues = {
  [P in keyof Schema]: ReactHookForm.UseFormRegisterReturn<P>;
};

export type FieldErrors = ReactHookForm.FieldErrors<Schema>;

const defaultValues: Schema = {
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
  handleSubmit: SubmitHandler;
} => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = ReactHookForm.useForm<Schema>({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const fieldValues = {
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
    handleSubmit,
  };
};
