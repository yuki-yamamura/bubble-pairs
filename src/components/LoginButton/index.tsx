import { signIn } from 'next-auth/react';

import styles from './index.module.scss';

const LoginButton = () => {
  const handleClick = () => signIn();

  return (
    <button type="button" onClick={handleClick} className={styles.module}>
      はじめる
    </button>
  );
};

export default LoginButton;
