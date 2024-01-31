import React, { forwardRef } from 'react';

type Props = React.PropsWithChildren;

// todo: prevent users from scrolling when modal is open.
// todo: close modal when clicking in backdrop.
const Modal = forwardRef<HTMLDialogElement, Props>(function Modal(
  { children },
  ref,
) {
  return (
    <dialog ref={ref}>
      <div>{children}</div>
    </dialog>
  );
});

export default Modal;
