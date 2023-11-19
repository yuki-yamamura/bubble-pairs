import React, { forwardRef } from 'react';

import styles from './index.module.scss';

type Props = {
  children: React.ReactNode;
};

const Modal = forwardRef<HTMLDialogElement, Props>(function Modal(
  { children },
  ref,
) {
  return (
    <dialog ref={ref} className={styles.module}>
      <div className={styles.inner}>{children}</div>
    </dialog>
  );
});

export default Modal;
