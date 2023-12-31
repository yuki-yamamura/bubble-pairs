import { siteFormSchema, type SiteFormType } from '@/features/sites/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import type {
  FieldErrors,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegisterReturn,
} from 'react-hook-form';

type SiteFormFieldValues = {
  [P in keyof SiteFormType]: UseFormRegisterReturn<P>;
};

export const useSiteForm = (
  defaultValues: SiteFormType,
): {
  fieldValues: SiteFormFieldValues;
  fieldErrors: FieldErrors<SiteFormType>;
  getValues: UseFormGetValues<SiteFormType>;
  submitHandler: UseFormHandleSubmit<SiteFormType>;
} => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<SiteFormType>({
    defaultValues,
    resolver: zodResolver(siteFormSchema),
  });

  const fieldValues: SiteFormFieldValues = {
    name: register('name'),
    courtCount: register('courtCount'),
    isDefault: register('isDefault'),
  };

  return {
    fieldValues,
    fieldErrors: errors,
    getValues,
    submitHandler: handleSubmit,
  };
};
