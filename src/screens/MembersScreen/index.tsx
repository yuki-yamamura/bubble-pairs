import Members from '@/features/members/components/Members/container';

import styles from './index.module.scss';

const MembersScreen = () => {
  return (
    <>
      <h1 className={styles.title}>メンバー</h1>
      <Members />
    </>
  );
};

export default MembersScreen;
