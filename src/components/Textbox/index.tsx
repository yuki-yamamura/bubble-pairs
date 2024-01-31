import { forwardRef } from 'react';

type Props = Omit<React.ComponentPropsWithRef<'input'>, 'type'>;

const Textbox = forwardRef<HTMLInputElement, Props>(function Textbox(
  { ...args }: Props,
  ref,
) {
  return <input ref={ref} type="text" {...args} />;
});

export default Textbox;
