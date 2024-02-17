import Link from '@/components/Link';
import { ArrowLeft } from 'lucide-react';

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
        <Link href="/" text="ホームに戻る" Icon={ArrowLeft}></Link>
      </div>
    </div>
  </div>
);

export default NotFoundScreen;
