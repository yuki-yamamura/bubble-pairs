import { FormItem } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import {
  RadioGroupItem,
  RadioGroup as RadioGroupPrimitive,
} from '@/components/ui/radio-group';

import type { Options } from '@/types/Options';
import type { RadioGroupProps } from '@radix-ui/react-radio-group';

type Props = {
  options: Options;
  value: RadioGroupProps['value'];
  onValueChange: RadioGroupProps['onValueChange'];
};

const RadioGroup = ({ options, value, onValueChange }: Props) => (
  <RadioGroupPrimitive
    defaultValue={value}
    onValueChange={onValueChange}
    className="flex gap-x-4"
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
