import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/shadcn-ui';

import type { Control, FieldPath, FieldValues } from 'react-hook-form';

type Props<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TControl extends Control<TFieldValues>,
> = {
  control: TControl;
  name: TName;
  label: string;
  required: boolean;
  options: { value: string; label: string }[];
};

const SelectField = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TControl extends Control<TFieldValues>,
>({
  control,
  name,
  label,
  required,
  options,
}: Props<TFieldValues, TName, TControl>) => {
  return (
    <FormField
      control={control}
      name={name}
      rules={{ required: required }}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel className={cn({ 'required-field': required })}>
            {label}
          </FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue
                  placeholder={
                    options.find(({ value }) => value === field.value)?.label
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
          </Select>
        </FormItem>
      )}
    />
  );
};

export default SelectField;
