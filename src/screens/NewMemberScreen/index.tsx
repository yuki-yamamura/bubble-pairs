import NewMemberForm from '@/features/members/components/NewMemberForm/container';

import styles from './index.module.scss';

const Page = () => (
  <>
    <h1 className={styles.title}>チームにメンバーを追加する</h1>
    <NewMemberForm />
  </>
);

export default Page;
