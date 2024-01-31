import Modal from '@/components/Modal';
import { forwardRef } from 'react';

type Props = React.PropsWithChildren<{
  description: string;
  title: string;
  onApplyButtonClick: () => void;
  onCancelButtonClick: () => void;
}>;

const FunctionModal = forwardRef<HTMLDialogElement, Props>(
  function FunctionModal(
    { description, title, onApplyButtonClick, onCancelButtonClick, children },
    ref,
  ) {
    return (
      <Modal ref={ref}>
        <h2>{title}</h2>
        <p>{description}</p>
        {children}
        <div>
          <button type="button" onClick={onCancelButtonClick}>
            キャンセル
          </button>
          <button type="submit" onClick={onApplyButtonClick}>
            適用
          </button>
        </div>
      </Modal>
    );
  },
);

export default FunctionModal;
