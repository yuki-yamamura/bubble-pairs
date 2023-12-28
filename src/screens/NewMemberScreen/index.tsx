import NewMemberForm from '@/features/members/components/NewMemberForm';

import styles from './index.module.scss';

const NewMemberScreen = () => (
  <>
    <h1 className={styles.title}>メンバー追加</h1>
    <NewMemberForm />
  </>
);

export default NewMemberScreen;
