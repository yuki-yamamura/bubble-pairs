import type { Member } from '@/features/members/types/Member';

type Props = {
  members: Member[];
};

const MemberList = ({ members }: Props) => {
  return (
    <ul>
      {members.map((member) => (
        <li key={member.id}>{member.displayName ?? member.name}</li>
      ))}
    </ul>
  );
};

export default MemberList;
