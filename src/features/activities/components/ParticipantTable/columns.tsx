import DecoratedMember from '@/features/members/components/DecoratedMember';

import type { Participant } from '@/types/models/Participant';
import type { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Participant>[] = [
  {
    accessorKey: 'name',
    header: '名前',
    cell: ({ row }) => <DecoratedMember member={row.original.member} />,
  },
];
