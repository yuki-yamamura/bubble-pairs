import { forwardRef } from 'react';

type Props = React.ComponentPropsWithRef<'textarea'>;

const Textarea = forwardRef<HTMLTextAreaElement, Props>(function Textarea(
  { ...args }: Props,
  ref,
) {
  return <textarea ref={ref} {...args} />;
});

export default Textarea;
