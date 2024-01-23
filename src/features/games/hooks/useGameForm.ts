import { useForm } from 'react-hook-form';

import type { GameFormType } from '@/features/games/validation';
import type {
  Control,
  UseFormHandleSubmit,
  UseFormRegisterReturn,
} from 'react-hook-form';

type GameFormFieldValues = {
  [P in keyof GameFormType]: UseFormRegisterReturn<P>;
};

export const useGameForm = (
  defaultValues: GameFormType,
): {
  control: Control<GameFormType>;
  fieldValues: GameFormFieldValues;
  handleSubmit: UseFormHandleSubmit<GameFormType>;
  decrementSinglesCount: () => void;
  incrementSinglesCount: () => void;
  decrementDoublesCount: () => void;
  incrementDoublesCount: () => void;
} => {
  const { control, register, handleSubmit, setValue, getValues } =
    useForm<GameFormType>({
      defaultValues,
    });
  const decrementSinglesCount = () => {
    setValue('singlesCount', getValues('singlesCount') - 1);
  };
  const incrementSinglesCount = () => {
    setValue('singlesCount', getValues('singlesCount') + 1);
  };
  const decrementDoublesCount = () => {
    setValue('doublesCount', getValues('doublesCount') - 1);
  };
  const incrementDoublesCount = () => {
    setValue('doublesCount', getValues('doublesCount') + 1);
  };

  const fieldValues = {
    activityId: register('activityId'),
    members: register('members'),
    singlesCount: register('singlesCount'),
    doublesCount: register('doublesCount'),
  } satisfies GameFormFieldValues;

  return {
    control,
    fieldValues,
    handleSubmit,
    decrementSinglesCount,
    incrementSinglesCount,
    decrementDoublesCount,
    incrementDoublesCount,
  };
};
