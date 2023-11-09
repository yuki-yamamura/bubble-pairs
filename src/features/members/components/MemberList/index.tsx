import ListItem from './ListItem';

import type { Member } from '@prisma/client';

import styles from './index.module.scss';

type Props = {
  members: Member[];
};

const MemberList = ({ members }: Props) => {
  return (
    <ul className={styles.module}>
      {members.map((member) => (
        <li key={member.id}>
          <ListItem member={member} />
        </li>
      ))}
    </ul>
  );
};

export default MemberList;
