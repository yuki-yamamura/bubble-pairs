import { placeCreateSchema } from '@/features/places/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import type PlaceForm from '.';
import type { PlaceCreateSchema } from '@/features/places/validation';
import type { UseFormReturn } from 'react-hook-form';

type Props = Pick<
  React.ComponentPropsWithoutRef<typeof PlaceForm>,
  'defaultValues' | 'onSubmit'
>;

export const usePlaceForm = ({
  defaultValues,
  onSubmit,
}: Props): {
  form: UseFormReturn<PlaceCreateSchema>;
  submitHandler: () => Promise<void>;
} => {
  const form = useForm<PlaceCreateSchema>({
    defaultValues,
    resolver: zodResolver(placeCreateSchema),
  });
  const { handleSubmit } = form;

  const submitHandler = handleSubmit(async (fieldValues) => {
    await onSubmit(fieldValues);
  });

  return {
    form,
    submitHandler,
  };
};
