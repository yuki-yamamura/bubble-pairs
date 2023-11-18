import type { IconType } from 'react-icons';

import styles from './index.module.scss';

type Props = {
  label: string;
  Icon: IconType;
  isActive: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const FunctionButton = ({ label, Icon, isActive, onClick }: Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={styles.module}
      data-active={isActive}
    >
      <Icon />
      <span>{label}</span>
    </button>
  );
};

export default FunctionButton;
