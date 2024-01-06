import NumberInput from '@/components/NumberInput';

import type { PlaceFormType } from '@/features/places/validation';
import type { UseFormReturn } from 'react-hook-form';

type Props = {
  useFormReturn: UseFormReturn<PlaceFormType>;
};

const CourtCountInput = ({ useFormReturn }: Props) => {
  const { register, getValues, setValue } = useFormReturn;
  const decrement = () => setValue('courtCount', getValues('courtCount') - 1);
  const increment = () => setValue('courtCount', getValues('courtCount') + 1);

  return (
    <NumberInput
      decrement={decrement}
      increment={increment}
      aria-label="コート数"
      {...register('courtCount', { valueAsNumber: true })}
    />
  );
};

export default CourtCountInput;
