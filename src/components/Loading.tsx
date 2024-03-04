import { Loader2 } from 'lucide-react';

type Props = {
  text?: string;
};

const Loading = ({ text }: Props) => {
  return (
    <div className="fixed left-0 top-0 flex h-screen w-screen justify-center bg-background/70">
      <div className="flex items-center justify-center gap-x-1">
        <Loader2
          size={32}
          aria-busy
          className="top-20 animate-spin text-slate-200"
        />
        {text}
      </div>
    </div>
  );
};

export default Loading;
