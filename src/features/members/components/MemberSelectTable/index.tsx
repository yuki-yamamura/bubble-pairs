import { createColumns } from './columns';
import DataTable from '@/components/DataTable';

import type { MemberForTable } from './columns';
import type { Member } from '@prisma/client';

type Props = {
  members: Member[];
  selectedMembers: Member[];
  updateSelectedMembers: (selectedMember: Member) => void;
};
const MemberSelectTable = ({
  members,
  selectedMembers,
  updateSelectedMembers,
}: Props) => {
  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const updatedMember = members.find(
      (member) => member.id === parseInt(e.currentTarget.value),
    );

    if (!updatedMember) return;

    updateSelectedMembers(updatedMember);
  };
  const columns = createColumns(handleOnClick);
  const data = members.map((member) => ({
    member,
    isSelected: selectedMembers.some(
      (selectedMember) => selectedMember.id === member.id,
    ),
  })) satisfies MemberForTable[];

  return <DataTable columns={columns} data={data} />;
};

export default MemberSelectTable;
