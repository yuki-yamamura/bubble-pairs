import { useForm } from 'react-hook-form';

import type { GameCreateSchemaType } from '@/features/games/validation';
import type {
  Control,
  UseFormHandleSubmit,
  UseFormRegisterReturn,
} from 'react-hook-form';

type GameFormFieldValues = {
  [P in keyof GameCreateSchemaType]: UseFormRegisterReturn<P>;
};

export const useGameForm = (
  defaultValues: GameCreateSchemaType,
): {
  control: Control<GameCreateSchemaType>;
  fieldValues: GameFormFieldValues;
  handleSubmit: UseFormHandleSubmit<GameCreateSchemaType>;
  decrementSinglesCount: () => void;
  incrementSinglesCount: () => void;
  decrementDoublesCount: () => void;
  incrementDoublesCount: () => void;
} => {
  const { control, register, handleSubmit, setValue, getValues } =
    useForm<GameCreateSchemaType>({
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
    candidates: register('members'),
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
