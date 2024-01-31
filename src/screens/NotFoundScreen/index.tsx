import Link from 'next/link';

const NotFoundScreen = () => (
  <div>
    <div>
      <img
        src="/images/not-found.png"
        alt="Not Found"
        height={320}
        width={320}
      />
      <h1>ページが見つかりませんでした</h1>
      <Link href="/">ホームに戻る</Link>
    </div>
  </div>
);

export default NotFoundScreen;
