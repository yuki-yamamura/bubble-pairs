import { Checkbox } from '@/components/ui/checkbox';
import { getDisplayName } from '@/features/members/utils';

import type { Member } from '@prisma/client';
import type { ColumnDef } from '@tanstack/react-table';

export type MemberForTable = {
  member: Member;
  isSelected: boolean;
};

export const createColumns = (
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void,
): ColumnDef<MemberForTable>[] => {
  return [
    {
      accessorKey: 'isSelected',
      header: '参加する',
      cell: ({ row }) => {
        const { member, isSelected } = row.original;

        return (
          <Checkbox checked={isSelected} onClick={onClick} value={member.id} />
        );
      },
    },
    {
      accessorKey: 'displayName',
      header: '名前',
      cell: ({ row }) => {
        const { member } = row.original;

        return getDisplayName(member);
      },
    },
  ];
};
