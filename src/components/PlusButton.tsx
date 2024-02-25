import Button from '@/components/Button';
import { PlusIcon } from 'lucide-react';

type Props = {
  onClick: () => void;
};
const PlusButton = ({ onClick }: Props) => (
  <Button
    type="button"
    onClick={onClick}
    variant="outline"
    className="fixed bottom-32 right-0 z-50 mx-10 h-10 w-10 rounded-full p-0 shadow-md sm:mx-20"
  >
    <PlusIcon size={16} className="text-slate-400" />
  </Button>
);

export default PlusButton;
