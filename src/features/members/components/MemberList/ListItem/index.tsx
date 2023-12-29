import Emoji from '@/components/Emoji';
import Link from 'next/link';

import type { Member } from '@prisma/client';

import styles from './index.module.scss';

type Props = {
  member: Member;
};

const ListItem = ({ member }: Props) => {
  const { id, displayName, emojiUnicode, name } = member;
  const href = `/members/${id}`;

  return (
    <Link href={href} className={styles.module}>
      <Emoji unified={emojiUnicode} size={24} />
      {displayName ?? name}
    </Link>
  );
};

export default ListItem;
