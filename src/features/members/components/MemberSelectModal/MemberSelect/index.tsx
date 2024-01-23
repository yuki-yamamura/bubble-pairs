import type { Member } from '@prisma/client';

type Props = {
  memberOptions: {
    member: Member;
    isSelected: boolean;
  }[];
  updateMemberOptions: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const MemberSelect = ({ memberOptions, updateMemberOptions }: Props) => {
  return (
    <select onChange={updateMemberOptions}>
      <option value="">please choose one or more members</option>
      {memberOptions.map((memberOption) => (
        <option
          key={memberOption.member.id}
          value={memberOption.member.id}
          // todo: use default values instead
          selected={memberOption.isSelected}
        >
          {memberOption.member.name}
        </option>
      ))}
    </select>
  );
};

export default MemberSelect;
