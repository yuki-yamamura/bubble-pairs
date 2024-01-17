import NewActivityButton from '@/features/activities/components/NewActivityButton';
import NoActivityFound from '@/features/activities/components/NoActivityFound';

import styles from './index.module.scss';

const ActivitiesScreen = () => (
  <div className={styles.module}>
    <div className={styles.container}>
      {/* todo: show empty state only if there's no activity. */}
      <NoActivityFound />
      <NewActivityButton />
    </div>
  </div>
);

export default ActivitiesScreen;
