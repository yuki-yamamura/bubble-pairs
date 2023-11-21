import { forwardRef } from 'react';

import styles from './index.module.scss';

type Props = React.ComponentPropsWithRef<'textarea'>;

const Textarea = forwardRef<HTMLTextAreaElement, Props>(function Textarea(
  { ...args }: Props,
  ref,
) {
  return <textarea ref={ref} {...args} className={styles.module} />;
});

export default Textarea;
