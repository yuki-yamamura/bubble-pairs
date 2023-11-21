import { forwardRef } from 'react';

import styles from './index.module.scss';

type Props = Omit<React.ComponentPropsWithRef<'input'>, 'type'>;

const Textbox = forwardRef<HTMLInputElement, Props>(function Textbox(
  { ...args }: Props,
  ref,
) {
  return <input ref={ref} type="text" {...args} className={styles.module} />;
});

export default Textbox;
