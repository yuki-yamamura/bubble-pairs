import Link from 'next/link';

import type { Member } from '@prisma/client';

import styles from './index.module.scss';

type Props = {
  member: Member;
};

const ListItem = ({ member }: Props) => {
  const { id, avatar, displayName, name } = member;
  const href = `/members/${id}`;

  return (
    <Link href={href} className={styles.module}>
      <img src={avatar} alt={'avatar'} className={styles.image} />
      {displayName ?? name}
    </Link>
  );
};

export default ListItem;
