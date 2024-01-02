import Link from 'next/link';

import styles from './index.module.scss';

const HomeScreen = () => (
  <div className={styles.container}>
    {/* todo: add logo */}
    <section id="hero" className={styles.section}>
      <img src="/images/gestures.png" height={320} width={320} alt="gestures" />
      <h1 className={styles.heading}>いつものペア決めを簡単に</h1>
      <div className={styles.description}>
        <p>Bubble Pairs は、スポーツのペア決めを簡単にする Web アプリです。</p>
        <p className={styles.line}>
          試合前のペア決めが、意外と大変だと思うことはありませんか？
          このアプリを使うことで、入力から共有までを簡略化できます。
        </p>
        <p className={styles.line}>
          テニスやバドミントン、卓球といった様々なスポーツで活用していただけます。
        </p>
      </div>

      {/* todo: change the href after finishing implementation for signing up. */}
      <Link href="#" className={styles.link}>
        はじめる
      </Link>
    </section>

    <section id="features" className={`${styles.section} ${styles.features}`}>
      <div className={styles.card}>
        <h2 className={styles.heading}>
          <img
            src="/images/die.png"
            height={24}
            width={24}
            alt="die"
            aria-hidden
            className={styles.image}
          />
          平等なペア決め
        </h2>
        <div>
          アプリがペアを決めるため、平等かつランダムに試合を回すことができます。ペアの固定など、お好みの条件も対応しています。
        </div>
      </div>

      <div className={styles.card}>
        <h2 className={styles.heading}>
          <img
            src="/images/announcement.png"
            height={24}
            width={24}
            alt="announcement"
            aria-hidden
            className={styles.image}
          />
          簡単にシェア
        </h2>
        <p>
          シェア機能を使うことで、LINE
          グループ内でペアを共有できます。確認は各自で行えるため、ペアの読み上げは必要ありません。
        </p>
      </div>

      <div className={styles.card}>
        <h2 className={styles.heading}>
          <img
            src="/images/exam.png"
            height={20}
            width={20}
            alt="exam"
            aria-hidden
            className={styles.image}
          />
          入力は必要な分だけ
        </h2>
        <div>
          前回と同じ試合条件を使えるため、入力が負担になりません。アプリ全体で入力を減らす工夫がされています。
        </div>
      </div>
    </section>

    {/* footer */}
  </div>
);

export default HomeScreen;
