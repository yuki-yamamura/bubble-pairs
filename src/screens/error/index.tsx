import Link from '@/components/Link';
import { ArrowLeftIcon } from 'lucide-react';

const ErrorScreen = () => (
  <div className="flex grow flex-col items-center justify-center">
    <div className="flex flex-col items-center gap-y-2 md:-translate-y-1/4">
      <img
        src="/images/coffee.png"
        alt="have a coffee"
        height={320}
        width={320}
      />
      <div className="flex flex-col items-center gap-y-2">
        <h1>問題が発生しました。</h1>
        <Link href="/" className="flex items-center gap-x-2">
          <ArrowLeftIcon size={16} />
          ホームに戻る
        </Link>
      </div>
    </div>
  </div>
);

export default ErrorScreen;
