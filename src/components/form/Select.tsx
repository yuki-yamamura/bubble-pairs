import { FormControl } from '@/components/ui/form';
import {
  SelectContent,
  SelectItem,
  Select as SelectPrimitive,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import type { Options } from '@/types/Options';
import type { SelectProps } from '@radix-ui/react-select';
import type { NonUndefined } from 'react-hook-form';

type Props = SelectProps & {
  options: Options;
  value: NonUndefined<SelectProps['value']>;
  defaultValue: NonUndefined<SelectProps['defaultValue']>;
  onValueChange: NonUndefined<SelectProps['onValueChange']>;
};

const Select = ({ options, value, defaultValue, onValueChange }: Props) => {
  return (
    <SelectPrimitive onValueChange={onValueChange} defaultValue={defaultValue}>
      <FormControl>
        <SelectTrigger>
          <SelectValue
            placeholder={
              options.find((option) => option.value === value)?.label
            }
          />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {options.map(({ value, label }) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectPrimitive>
  );
};

export default Select;
