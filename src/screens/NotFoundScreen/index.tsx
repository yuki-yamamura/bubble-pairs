import Link from 'next/link';

import styles from './index.module.scss';

const NotFoundScreen = () => (
  <div className={styles.module}>
    <div className={styles.container}>
      <img
        src="/images/not-found.png"
        alt="Not Found"
        height={320}
        width={320}
      />
      <h1 className={styles.heading}>ページが見つかりませんでした</h1>
      <Link href="/" className={styles.link}>
        ホームに戻る
      </Link>
    </div>
  </div>
);

export default NotFoundScreen;
