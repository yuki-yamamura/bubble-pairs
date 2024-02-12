import { Loader2 } from 'lucide-react';

type Props = {
  text?: string;
};

const Loading = ({ text }: Props) => {
  return (
    <div className="flex items-center justify-center gap-x-1">
      <Loader2 size={20} aria-busy className="animate-spin text-slate-300" />
      {text}
    </div>
  );
};

export default Loading;
