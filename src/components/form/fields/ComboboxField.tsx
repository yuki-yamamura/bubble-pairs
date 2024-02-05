import { Command, CommandGroup, CommandItem } from '../../ui/command';
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/shadcn-ui';
import { Check, ChevronDown } from 'lucide-react';
import { useState } from 'react';

import type {
  Control,
  FieldPath,
  FieldValues,
  PathValue,
  UseFormSetValue,
} from 'react-hook-form';

type Props<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TControl extends Control<TFieldValues>,
> = {
  control: TControl;
  name: TName;
  setValue: UseFormSetValue<TFieldValues>;
  fieldLabel: string;
  required: boolean;
  options: { value: string; label: string }[];
};

const ComboboxField = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TControl extends Control<TFieldValues>,
>({
  control,
  name,
  setValue,
  fieldLabel,
  required,
  options,
}: Props<TFieldValues, TName, TControl>) => {
  const [open, setOpen] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel className={cn({ 'required-field': required })}>
            {fieldLabel}
          </FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button variant="outline" role="combobox" aria-expanded={open}>
                  {options.find(({ value }) => value === field.value)?.label}
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent>
              <Command>
                <CommandGroup>
                  {options.map(({ label, value }) => (
                    <CommandItem
                      key={value}
                      value={value}
                      onSelect={(currentValue) => {
                        setValue(
                          field.name,
                          currentValue as PathValue<TFieldValues, TName>,
                        );
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          value === field.value ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                      {label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </FormItem>
      )}
    />
  );
};

export default ComboboxField;
