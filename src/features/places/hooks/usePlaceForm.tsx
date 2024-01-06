import { placeFormSchema } from '@/features/places/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import type { PlaceFormType } from '@/features/places/validation';
import type {
  FieldErrors,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegisterReturn,
  UseFormReturn,
} from 'react-hook-form';

type PlaceFormFieldValues = {
  [P in keyof PlaceFormType]: UseFormRegisterReturn<P>;
};

export const usePlaceForm = (
  defaultValues: PlaceFormType,
): {
  fieldValues: PlaceFormFieldValues;
  fieldErrors: FieldErrors<PlaceFormType>;
  getValues: UseFormGetValues<PlaceFormType>;
  submitHandler: UseFormHandleSubmit<PlaceFormType>;
  useFormReturn: UseFormReturn<PlaceFormType>;
} => {
  const useFormReturn = useForm<PlaceFormType>({
    defaultValues,
    resolver: zodResolver(placeFormSchema),
  });
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useFormReturn;

  const fieldValues: PlaceFormFieldValues = {
    name: register('name'),
    courtCount: register('courtCount'),
    isDefault: register('isDefault'),
  };

  return {
    useFormReturn,
    fieldValues,
    fieldErrors: errors,
    getValues,
    submitHandler: handleSubmit,
  };
};
