import { signInSchema } from '@/features/users/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';

import type { SignInSchema } from '@/features/users/validation';
import type { UseFormReturn } from 'react-hook-form';

export const useSignInForm = (): {
  email: string;
  form: UseFormReturn<SignInSchema>;
  submitHandler: () => Promise<void>;
} => {
  const form = useForm<SignInSchema>({
    defaultValues: {
      email: '',
    },
    mode: 'onChange',
    resolver: zodResolver(signInSchema),
  });
  const { handleSubmit, watch } = form;

  const email = watch('email');
  const submitHandler = handleSubmit(async (fieldValues) => {
    await signIn('email', { ...fieldValues, redirect: false });
  });

  return {
    email,
    form,
    submitHandler,
  };
};
