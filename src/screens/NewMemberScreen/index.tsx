import NewMemberForm from '@/features/members/components/NewMemberForm';

import styles from './index.module.scss';

const NewMemberScreen = () => (
  <>
    <h1 className={styles.title}>チームにメンバーを追加する</h1>
    <NewMemberForm />
  </>
);

export default NewMemberScreen;
