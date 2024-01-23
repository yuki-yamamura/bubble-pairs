import { useForm } from 'react-hook-form';

import type { ActivityFormType } from '@/features/activities/validation';
import type {
  Control,
  UseFormHandleSubmit,
  UseFormRegisterReturn,
} from 'react-hook-form';

type ActivityFormFieldValues = {
  [P in keyof ActivityFormType]: UseFormRegisterReturn<P>;
};

export const useActivityForm = (
  defaultValues: ActivityFormType,
): {
  control: Control<ActivityFormType>;
  fieldValues: ActivityFormFieldValues;
  handleSubmit: UseFormHandleSubmit<ActivityFormType>;
} => {
  const { control, register, handleSubmit } = useForm<ActivityFormType>({
    defaultValues,
  });

  const fieldValues = {
    members: register('members'),
    placeId: register('placeId'),
  } satisfies ActivityFormFieldValues;

  return {
    control,
    fieldValues,
    handleSubmit,
  };
};
