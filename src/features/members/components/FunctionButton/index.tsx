import type { IconType } from 'react-icons';

import styles from './index.module.scss';

type Props = {
  Icon: IconType;
  isActive: boolean;
  label: string;
  onClick: () => void;
};

const FunctionButton = ({ Icon, isActive, label, onClick }: Props) => {
  return (
    <button
      type="button"
      data-active={isActive}
      onClick={onClick}
      className={styles.module}
    >
      <Icon aria-hidden />
      {label}
    </button>
  );
};

export default FunctionButton;
