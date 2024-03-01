import { useUser } from '@/context/useUser';
import {
  userUpdateSchema,
  type UserUpdateSchema,
} from '@/features/users/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import useSWRMutation from 'swr/mutation';

import type { FormState, UseFormReturn } from 'react-hook-form';

export const useUserForm = (): {
  form: UseFormReturn<UserUpdateSchema>;
  formState: FormState<UserUpdateSchema>;
  isBusy: boolean;
  submitHandler: () => Promise<void>;
} => {
  const { user, updateUser } = useUser();

  const { trigger, isMutating } = useSWRMutation(
    `/api/users/${user.id}`,
    async (url: string, { arg }: { arg: UserUpdateSchema }) => {
      await axios.put(url, arg);
    },
  );

  const form = useForm<UserUpdateSchema>({
    defaultValues: user,
    mode: 'onChange',
    resolver: zodResolver(userUpdateSchema),
  });
  const { formState, handleSubmit } = form;

  const submitHandler = handleSubmit(async (fieldValues) => {
    await trigger(fieldValues);
    updateUser();
  });

  return {
    form,
    formState,
    isBusy: isMutating,
    submitHandler,
  };
};
