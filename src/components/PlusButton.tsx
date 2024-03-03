import Button from '@/components/Button';
import { PlusIcon } from 'lucide-react';

type Props = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};
const PlusButton = ({ onClick }: Props) => (
  <Button
    type="button"
    onClick={onClick}
    variant="outline"
    className="fixed bottom-32 left-8 z-50 h-10 w-10 rounded-full p-0 shadow-sm lg:left-32"
  >
    <PlusIcon size={16} className="text-slate-400" />
  </Button>
);

export default PlusButton;
