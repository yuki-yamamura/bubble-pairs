import { useForm } from 'react-hook-form';

import type { ActivityCreateSchemaType } from '@/features/activities/validation';
import type {
  Control,
  UseFormHandleSubmit,
  UseFormRegisterReturn,
} from 'react-hook-form';

type ActivityFormFieldValues = {
  [P in keyof ActivityCreateSchemaType]: UseFormRegisterReturn<P>;
};

export const useActivityForm = (
  defaultValues: ActivityCreateSchemaType,
): {
  control: Control<ActivityCreateSchemaType>;
  fieldValues: ActivityFormFieldValues;
  handleSubmit: UseFormHandleSubmit<ActivityCreateSchemaType>;
} => {
  const { control, register, handleSubmit } = useForm<ActivityCreateSchemaType>(
    {
      defaultValues,
    },
  );

  const fieldValues = {
    participants: register('members'),
    placeId: register('placeId'),
  } satisfies ActivityFormFieldValues;

  return {
    control,
    fieldValues,
    handleSubmit,
  };
};
