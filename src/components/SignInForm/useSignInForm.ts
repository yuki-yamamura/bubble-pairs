import { signInSchema } from '@/components/SignInForm/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';

import type { SignInSchema } from '@/components/SignInForm/validation';
import type {
  FormState,
  UseFormRegister,
  UseFormReturn,
  UseFormWatch,
} from 'react-hook-form';

export const useSignInForm = (): {
  form: UseFormReturn<SignInSchema>;
  formState: FormState<SignInSchema>;
  register: UseFormRegister<SignInSchema>;
  submitHandler: () => Promise<void>;
  watch: UseFormWatch<SignInSchema>;
} => {
  const form = useForm<SignInSchema>({
    defaultValues: {
      email: '',
    },
    mode: 'onChange',
    resolver: zodResolver(signInSchema),
  });
  const { formState, handleSubmit, register, watch } = form;

  const submitHandler = handleSubmit(async (fieldValues) => {
    await signIn('email', { ...fieldValues, redirect: false });
  });

  return {
    form,
    formState,
    register,
    submitHandler,
    watch,
  };
};
