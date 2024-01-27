import ListItem from './ListItem';

import type { Member } from '@prisma/client';

type Props = {
  members: Member[];
};

const MemberList = ({ members }: Props) => {
  return (
    <ul className="flex flex-col divide-y">
      {members.map((member) => (
        <li key={member.id} className="">
          <ListItem member={member} />
        </li>
      ))}
    </ul>
  );
};

export default MemberList;
