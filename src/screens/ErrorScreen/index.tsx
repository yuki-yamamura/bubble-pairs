import styles from './index.module.scss';

const ErrorScreen = () => (
  <div className={styles.module}>
    <div className={styles.container}>
      <img
        src="/images/coffee.png"
        alt="have a coffee"
        height={320}
        width={320}
      />
      <h1 className={styles.heading}>問題が発生しました</h1>
      <div>時間をおいてからお試しください。</div>
    </div>
  </div>
);

export default ErrorScreen;
