import Checkbox from '@/components/Checkbox';

import type { Options } from '@/types/Options';

type Props = {
  currentValues: string[];
  defaultValue: string | string[];
  flexDirection: 'row' | 'column';
  name: string;
  options: Options;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CheckboxGroup = ({
  currentValues,
  defaultValue,
  flexDirection,
  name,
  options,
  onChange,
}: Props) => (
  <div
    style={
      {
        '--flex-direction': flexDirection,
      } as React.CSSProperties
    }
  >
    {options.map((option) => (
      <Checkbox
        label={option.label}
        name={name}
        value={option.value}
        defaultChecked={defaultValue.includes(option.value)}
        checked={currentValues.includes(option.value)}
        onChange={onChange}
        key={option.value}
      />
    ))}
  </div>
);

export default CheckboxGroup;
