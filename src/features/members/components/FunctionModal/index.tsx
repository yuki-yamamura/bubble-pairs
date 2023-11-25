import Modal from '@/components/Modal';
import { forwardRef } from 'react';

import styles from './index.module.scss';

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
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
        {children}
        <div className={styles.buttons}>
          <button
            type="button"
            onClick={onCancelButtonClick}
            className={styles.button}
          >
            キャンセル
          </button>
          <button
            type="submit"
            onClick={onApplyButtonClick}
            className={styles.button}
          >
            適用
          </button>
        </div>
      </Modal>
    );
  },
);

export default FunctionModal;
