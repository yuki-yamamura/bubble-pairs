import ApplyButton from './ApplyButton';
import CloseButton from './CloseButton';
import Modal from '@/components/Modal';

import styles from './index.module.scss';

type Props = {
  title: string;
  onApplyButtonClick: () => void;
  onCloseButtonClick: () => void;
  children: React.ReactNode;
};

const FunctionModal = ({
  title,
  onApplyButtonClick,
  onCloseButtonClick,
  children,
}: Props) => (
  <Modal>
    <header className={styles.header}>
      <CloseButton onClick={onCloseButtonClick} />
      <div>{title}</div>
      <ApplyButton onClick={onApplyButtonClick} />
    </header>
    {children}
  </Modal>
);

export default FunctionModal;
