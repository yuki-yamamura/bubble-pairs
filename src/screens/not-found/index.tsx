import Link from '@/components/Link';
import { ArrowLeftIcon } from 'lucide-react';

const NotFoundScreen = () => (
  <div className="flex grow flex-col items-center justify-center">
    <div className="flex flex-col items-center gap-y-2 md:-translate-y-1/4">
      <img
        src="/images/not-found.png"
        alt="not-found"
        height={240}
        width={240}
      />
      <div className="flex flex-col items-center gap-y-2">
        <h1>ページが見つかりませんでした。</h1>
        <Link href="/" className="flex items-center gap-x-2">
          <ArrowLeftIcon size={16} />
          ホームに戻る
        </Link>
      </div>
    </div>
  </div>
);

export default NotFoundScreen;
