import { AiOutlineUserAdd } from 'react-icons/ai';

import styles from './index.module.scss';

type Props = React.ComponentPropsWithoutRef<'button'>;

const NewMemberButton = (props: Props) => (
  <button
    type="button"
    {...props}
    aria-label="メンバー追加"
    className={styles.module}
  >
    <AiOutlineUserAdd aria-hidden size={20} className={styles.image} />
  </button>
);

export default NewMemberButton;
