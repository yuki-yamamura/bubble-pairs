import NoActivityFound from '@/features/activities/components/NoActivityFound';

import styles from './index.module.scss';

const ActivitiesScreen = () => (
  <div className={styles.module}>
    <div className={styles.container}>
      <NoActivityFound />
    </div>
  </div>
);

export default ActivitiesScreen;
