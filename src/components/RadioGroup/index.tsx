import { forwardRef } from 'react';

type Props = {
  defaultValue: string;
  flexDirection: 'row' | 'column';
  name: string;
  options: { label: string; value: string }[];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const RadioGroup = forwardRef<HTMLInputElement, Props>(function RadioGroup(
  { defaultValue, flexDirection, name, options, onChange }: Props,
  ref,
) {
  return (
    <div
      role="radiogroup"
      style={
        {
          '--flex-direction': flexDirection,
        } as React.CSSProperties
      }
    >
      {options.map(({ label, value }) => (
        <label key={value}>
          <input
            type="radio"
            name={name}
            value={value}
            defaultChecked={value === defaultValue}
            onChange={onChange}
            ref={ref}
          />
          {label}
        </label>
      ))}
    </div>
  );
});

export default RadioGroup;
