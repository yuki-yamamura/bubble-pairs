import { FormControl, FormItem } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

type Props = React.ComponentPropsWithoutRef<typeof RadioGroup> & {
  options: {
    value: string;
    label: string;
  }[];
};

const FormRadioGroup = ({ defaultValue, onValueChange, options }: Props) => (
  <RadioGroup
    defaultValue={defaultValue}
    onValueChange={onValueChange}
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
);

export default FormRadioGroup;
