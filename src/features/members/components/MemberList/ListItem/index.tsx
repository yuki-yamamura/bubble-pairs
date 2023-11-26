import type { Member } from '@prisma/client';

import styles from './index.module.scss';

type Props = {
  member: Member;
};

const ListItem = ({ member }: Props) => (
  <div className={styles.module}>
    <img src={member.avatar} alt={'avatar'} className={styles.image} />
    {member.displayName ?? member.name}
  </div>
);

export default ListItem;
