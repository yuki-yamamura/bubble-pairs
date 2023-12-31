import NewSiteForm from '@/features/sites/components/NewSiteForm';

import styles from './index.module.scss';

const NewSiteScreen = () => (
  <>
    <h1 className={styles.title}>場所を追加</h1>
    <NewSiteForm />
  </>
);

export default NewSiteScreen;
