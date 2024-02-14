import { FormItem } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import {
  RadioGroupItem,
  RadioGroup as RadioGroupPrimitive,
} from '@/components/ui/radio-group';

import type { Options } from '@/types/Options';
import type { RadioGroupProps } from '@radix-ui/react-radio-group';
import type { NonUndefined } from 'react-hook-form';

type Props = RadioGroupProps & {
  options: Options;
  value: NonUndefined<RadioGroupProps['value']>;
  onValueChange: NonUndefined<RadioGroupProps['onValueChange']>;
};

const RadioGroup = ({ options, value, onValueChange, ...rest }: Props) => (
  <RadioGroupPrimitive
    value={value}
    onValueChange={onValueChange}
    className="flex gap-x-4"
    {...rest}
  >
    {options.map(({ value, label }) => (
      <FormItem key={value}>
        <Label className="flex items-center gap-x-1">
          <RadioGroupItem
            value={value}
            className="h-[14px] w-[14px] sm:w-4 md:h-4"
          />
          {label}
        </Label>
      </FormItem>
    ))}
  </RadioGroupPrimitive>
);

export default RadioGroup;
