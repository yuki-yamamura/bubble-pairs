import NewPlaceForm from '@/features/places/components/NewPlaceForm';

import styles from './index.module.scss';

const NewPlaceScreen = () => (
  <>
    <h1 className={styles.title}>場所を追加</h1>
    <NewPlaceForm />
  </>
);

export default NewPlaceScreen;
