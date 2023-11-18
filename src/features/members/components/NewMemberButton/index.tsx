import { AiOutlineUserAdd } from 'react-icons/ai';

import styles from './index.module.scss';

type Props = React.ComponentPropsWithoutRef<'button'>;

const NewMemberButton = (props: Props) => (
  <button type="button" {...props} className={styles.module}>
    <AiOutlineUserAdd aria-label="add user" size={20} color="white" />
  </button>
);

export default NewMemberButton;
