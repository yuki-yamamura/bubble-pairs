import type { IconType } from 'react-icons';

type Props = {
  Icon: IconType;
  isActive: boolean;
  label: string;
  onClick: () => void;
};

const FunctionButton = ({ Icon, isActive, label, onClick }: Props) => {
  return (
    <button type="button" data-active={isActive} onClick={onClick}>
      <Icon aria-hidden />
      {label}
    </button>
  );
};

export default FunctionButton;
