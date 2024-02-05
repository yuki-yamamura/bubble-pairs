import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import type { Control, FieldPath, FieldValues } from 'react-hook-form';

type Props<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TControl extends Control<TFieldValues>,
> = {
  control: TControl;
  name: TName;
  label: string;
  options: { value: string; label: string }[];
};

const RadioGroupField = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TControl extends Control<TFieldValues>,
>({
  control,
  name,
  label,
  options,
}: Props<TFieldValues, TName, TControl>) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel className="required-field">{label}</FormLabel>
        <FormControl>
          <RadioGroup
            defaultValue={field.value}
            onValueChange={field.onChange}
            className="flex gap-x-4"
          >
            {options.map(({ value, label }) => (
              <FormItem key={value}>
                <FormControl>
                  <Label className="flex items-center gap-x-1">
                    <RadioGroupItem
                      value={value}
                      className="h-[14px] w-[14px] sm:h-4 sm:w-4"
                    />
                    {label}
                  </Label>
                </FormControl>
              </FormItem>
            ))}
          </RadioGroup>
        </FormControl>
      </FormItem>
    )}
  />
);

export default RadioGroupField;
