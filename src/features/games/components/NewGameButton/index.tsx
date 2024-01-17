import { FaPlay } from 'react-icons/fa';

import styles from './index.module.scss';

type Props = React.ComponentPropsWithoutRef<'button'>;

const NewGameButton = (props: Props) => (
  <button
    type="button"
    {...props}
    aria-label="ゲームをはじめる"
    className={styles.module}
  >
    <FaPlay aria-hidden size={20} className={styles.image} />
  </button>
);

export default NewGameButton;
