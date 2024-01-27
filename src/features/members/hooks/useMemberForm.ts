import { memberFormSchema } from '@/features/members/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  type FieldErrors,
  useForm,
  type UseFormGetValues,
  type UseFormHandleSubmit,
  type UseFormRegisterReturn,
  type UseFormSetValue,
} from 'react-hook-form';

import type { MemberForm } from '@/features/members/validation';

type MemberFormFieldValues = {
  [P in keyof MemberForm]: UseFormRegisterReturn<P>;
};

export const useMemberForm = (
  defaultValues: MemberForm,
): {
  fieldValues: MemberFormFieldValues;
  fieldErrors: FieldErrors<MemberForm>;
  getValues: UseFormGetValues<MemberForm>;
  setValue: UseFormSetValue<MemberForm>;
  submitHandler: UseFormHandleSubmit<MemberForm>;
} => {
  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<MemberForm>({
    defaultValues,
    resolver: zodResolver(memberFormSchema),
  });

  const fieldValues: MemberFormFieldValues = {
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
    fieldErrors: errors,
    getValues,
    setValue,
    submitHandler: handleSubmit,
  };
};
