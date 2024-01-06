import ToggleSwitch from '@/components/ToggleSwitch';

import type { PlaceFormType } from '@/features/places/validation';
import type { UseFormReturn } from 'react-hook-form';

type Props = {
  useFormReturn: UseFormReturn<PlaceFormType>;
};

const DefaultToggleSwitch = ({ useFormReturn }: Props) => {
  const { register, getValues, setValue } = useFormReturn;

  const handleClick = () => setValue('isDefault', !getValues('isDefault'));

  return (
    <ToggleSwitch
      aria-label="既定として使う"
      onClick={handleClick}
      {...register('isDefault')}
    />
  );
};

export default DefaultToggleSwitch;
