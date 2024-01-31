import { forwardRef } from 'react';

type Props = Omit<React.ComponentPropsWithRef<'input'>, 'type'> & {
  label: string;
};

const Checkbox = forwardRef<HTMLInputElement, Props>(function Checkbox(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  { checked, label, ...rest },
  ref,
) {
  return (
    <label>
      {label}
      <input type="checkbox" ref={ref} {...rest} />
    </label>
  );
});

export default Checkbox;
