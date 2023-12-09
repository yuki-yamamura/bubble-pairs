import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import styles from './index.module.scss';

const Loading = () => {
  return (
    <AiOutlineLoading3Quarters
      aria-label="読み込み中"
      className={styles.loading}
    />
  );
};

export default Loading;
