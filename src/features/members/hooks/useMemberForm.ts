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

import type { MemberFormType } from '@/features/members/validation';

type MemberFormFieldValues = {
  [P in keyof MemberFormType]: UseFormRegisterReturn<P>;
};

export const useMemberForm = (
  defaultValues: MemberFormType,
): {
  fieldValues: MemberFormFieldValues;
  getValues: UseFormGetValues<MemberFormType>;
  setValue: UseFormSetValue<MemberFormType>;
  submitHandler: UseFormHandleSubmit<MemberFormType>;
  fieldErrors: FieldErrors<MemberFormType>;
} => {
  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<MemberFormType>({
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
    getValues,
    setValue,
    submitHandler: handleSubmit,
    fieldErrors: errors,
  };
};
