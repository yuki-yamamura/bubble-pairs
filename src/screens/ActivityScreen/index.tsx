import NewGameButton from '@/features/games/components/NewGameButton';
import NoGameFound from '@/features/games/components/NoGameFound';

import styles from './index.module.scss';

const ActivityScreen = () => (
  <div className={styles.module}>
    <div className={styles.container}>
      <NoGameFound />
      <NewGameButton />
    </div>
  </div>
);

export default ActivityScreen;
