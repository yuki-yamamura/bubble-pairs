type Props = {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const FunctionButton = ({ label, onClick }: Props) => {
  return (
    <button type="button" onClick={onClick}>
      {label}
    </button>
  );
};

export default FunctionButton;
