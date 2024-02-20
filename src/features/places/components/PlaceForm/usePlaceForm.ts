import { placeCreateSchema } from '@/features/places/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import type PlaceForm from '.';
import type { PlaceCreateSchema } from '@/features/places/validation';
import type { BaseSyntheticEvent } from 'react';
import type {
  FieldErrors,
  UseFormRegister,
  UseFormReturn,
} from 'react-hook-form';

type Props = Pick<
  React.ComponentPropsWithoutRef<typeof PlaceForm>,
  'defaultValues' | 'onSubmit'
>;

export const usePlaceForm = ({
  defaultValues,
  onSubmit,
}: Props): {
  form: UseFormReturn<PlaceCreateSchema>;
  errors: FieldErrors<PlaceCreateSchema>;
  register: UseFormRegister<PlaceCreateSchema>;
  shouldDisableSubmitButton: boolean;
  submitHandler: (
    e?: BaseSyntheticEvent<object, unknown, unknown> | undefined,
  ) => Promise<void>;
} => {
  const form = useForm<PlaceCreateSchema>({
    defaultValues,
    resolver: zodResolver(placeCreateSchema),
  });
  const {
    formState: { errors },
    handleSubmit,
    register,
    watch,
  } = form;

  const submitHandler = handleSubmit((fieldValues) => {
    onSubmit(fieldValues);
  });
  const shouldDisableSubmitButton =
    JSON.stringify(defaultValues) === JSON.stringify(watch());

  return {
    form,
    errors,
    register,
    shouldDisableSubmitButton,
    submitHandler,
  };
};
